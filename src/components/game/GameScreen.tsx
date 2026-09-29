"use client";

import { ArrowLeft, BarChart3, ChartLine, Check, CircleDollarSign, Compass, Flag, LayoutDashboard, PencilLine, Send, SlidersHorizontal, Timer, Users } from "lucide-react";
import Link from "next/link";
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { useApp } from "@/components/app/AppProvider";
import { Icon } from "@/components/ui/Icon";
import { Empty, Spinner } from "@/components/ui/display";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { DIFFICULTY_NAMES } from "@/engine/constants";
import { derive } from "@/engine/derive";
import { getIndustry } from "@/engine/industries";
import { project } from "@/engine/round";
import { sanitize } from "@/engine/setup";
import type { Decisions, Intel, ModuleId, RoundResult } from "@/engine/types";
import { act, ApiError } from "@/lib/api";
import { cx, moneyShort, periodLabel } from "@/lib/format";
import type { HistoryCell, Rewards, RoundResponse } from "@/lib/game/types";
import { supabase } from "@/lib/supabase/client";
import { DilemmaCard, ProjectionPanel } from "./Cards";
import { GameProvider, type GameContext } from "./context";
import { DecisionsPanel } from "./Decisions";
import { FinancePanel } from "./Finance";
import { MarketPanel } from "./Market";
import { OverviewPanel } from "./Overview";
import { RankingPanel } from "./Ranking";
import { RoundReveal } from "./Reveal";
import { StrategyPanel } from "./Strategy";
import { clearDraft, loadDraft, saveDraft, useGame, type GameData } from "./useGame";

const TABS = [
  { id: "resumen", label: "Resumen", icon: LayoutDashboard },
  { id: "decisiones", label: "Decisiones", icon: SlidersHorizontal },
  { id: "mercado", label: "Mercado", icon: ChartLine },
  { id: "finanzas", label: "Finanzas", icon: CircleDollarSign },
  { id: "estrategia", label: "Estrategia", icon: Compass },
  { id: "posiciones", label: "Posiciones", icon: BarChart3 },
] as const;
type TabId = (typeof TABS)[number]["id"];

interface RevealState {
  open: boolean;
  pending: boolean;
  result: RoundResult | null;
  state: GameContext["state"] | null;
  rewards: Rewards | null;
  finished: boolean;
  previous: HistoryCell | undefined;
}

const CLOSED: RevealState = { open: false, pending: false, result: null, state: null, rewards: null, finished: false, previous: undefined };

function Countdown({ deadline, onZero }: { deadline: string; onZero: () => void }) {
  const [left, setLeft] = useState(() => new Date(deadline).getTime() - Date.now());
  const fired = useRef(false);
  useEffect(() => {
    fired.current = false;
    const tick = () => {
      const ms = new Date(deadline).getTime() - Date.now();
      setLeft(ms);
      if (ms <= 0 && !fired.current) {
        fired.current = true;
        onZero();
      }
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [deadline, onZero]);
  const s = Math.max(0, Math.floor(left / 1000));
  const text = s >= 86400 ? `${Math.floor(s / 86400)} d ${Math.floor((s % 86400) / 3600)} h` : s >= 3600 ? `${Math.floor(s / 3600)} h ${Math.floor((s % 3600) / 60)} min` : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  return (
    <span className={cx("chip num", s <= 60 ? "chip-bad" : s <= 180 ? "chip-warn" : "")} title="Tiempo para el cierre del trimestre">
      <Timer size={13} />
      {s <= 0 ? "Cerrando" : text}
    </span>
  );
}

export function GameScreen({ gameId }: { gameId: string }) {
  const { userId } = useApp();
  const { data, error, mutate } = useGame(gameId, userId);
  if (error)
    return (
      <div className="mx-auto max-w-xl px-4 py-20">
        <Empty
          title="No pudimos abrir la partida"
          text={error instanceof Error ? error.message : "Revisa tu conexión e inténtalo otra vez."}
          action={
            <Link href="/inicio" className="btn btn-primary">
              Volver al inicio
            </Link>
          }
        />
      </div>
    );
  if (!data || !data.game.state)
    return (
      <div className="grid min-h-dvh place-items-center text-ink-3">
        <Spinner size={26} />
      </div>
    );
  return <Inner data={data} refetch={() => mutate()} setData={(fn) => mutate(fn, { revalidate: false })} />;
}

function Inner({ data, refetch, setData }: { data: GameData; refetch: () => Promise<unknown>; setData: (fn: (d: GameData | undefined) => GameData | undefined) => void }) {
  const { game, isHost, lastResult, decision, team } = data;
  const { userId, refresh: refreshProfile } = useApp();
  const { toast } = useToast();
  const state = game.state!;
  const ind = useMemo(() => getIndustry(state.industry), [state.industry]);
  const d = useMemo(() => derive(ind), [ind]);
  const spectator = data.idx < 0;
  const [watch, setWatch] = useState(0);
  const idx = spectator ? Math.min(watch, state.companies.length - 1) : data.idx;
  const me = state.companies[idx];
  const room = game.mode === "sala";
  const roomId = game.parent_id ?? game.id;
  const playing = game.status === "activa" && !state.finished;
  const submitted = Boolean(room && decision?.submitted);
  const readOnly = spectator || !playing || submitted;

  const [tab, setTab] = useState<TabId>("resumen");
  const [draft, setDraft] = useState<Decisions>(() => sanitize(null, state, me));
  const [intel, setIntel] = useState<Intel | null>(decision?.intel ?? null);
  const [confirm, setConfirm] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [busy, setBusy] = useState(false);
  const [reveal, setReveal] = useState<RevealState>(CLOSED);
  const channel = useRef<ReturnType<ReturnType<typeof supabase>["channel"]> | null>(null);
  const seenRound = useRef(state.round);
  const dirty = useRef(false);
  const lastEdit = useRef(0);

  // Carga el borrador de cada trimestre: primero el del equipo, luego el local, luego la propuesta base.
  useEffect(() => {
    const remote = room && decision?.data && Object.keys(decision.data).length ? (decision.data as Decisions) : null;
    const local = !room ? loadDraft<Decisions>(game.id, state.round) : null;
    setDraft(sanitize(remote ?? local, state, me));
    setIntel(decision?.intel ?? null);
    dirty.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.id, state.round, idx]);

  const update = useCallback(
    (fn: (x: Decisions) => void) => {
      if (readOnly) return;
      setDraft((prev) => {
        const next: Decisions = JSON.parse(JSON.stringify(prev));
        fn(next);
        return next;
      });
      dirty.current = true;
      lastEdit.current = Date.now();
    },
    [readOnly],
  );

  // Guardado automático: local en partidas individuales, compartido con el equipo en salas.
  useEffect(() => {
    if (!dirty.current || readOnly) return;
    const t = setTimeout(async () => {
      dirty.current = false;
      if (!room) return saveDraft(game.id, state.round, draft);
      if (!data.company) return;
      const { error } = await supabase()
        .from("decisions")
        .upsert({ company_id: data.company.id, game_id: game.id, round: state.round, data: draft, submitted: false }, { onConflict: "company_id,round" });
      if (error) toast("No se pudo guardar el borrador. Revisa tu conexión.", "error");
      else if (team.length > 1) channel.current?.send({ type: "broadcast", event: "draft", payload: { by: userId, data: draft } });
    }, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft]);

  const deferred = useDeferredValue(draft);
  const projection = useMemo(() => {
    if (spectator || !playing) return null;
    try {
      return project(state, idx, deferred, intel);
    } catch {
      return null;
    }
  }, [state, idx, deferred, intel, spectator, playing]);

  const mine = lastResult?.companies[idx] ?? null;
  const has = useCallback((m: ModuleId) => state.modules.includes(m), [state.modules]);

  const showRound = useCallback(
    (result: RoundResult, nextState: GameContext["state"], rewards: Rewards | null, finished: boolean) => {
      const previous = game.history.filter((h) => h.r < result.round).at(-1)?.c.find((c) => c.i === data.idx);
      setReveal({ open: true, pending: false, result, state: nextState, rewards, finished, previous });
    },
    [game.history, data.idx],
  );

  const rememberForecast = () => {
    if (!projection) return null;
    const f = { revenue: projection.income.revenue, net: projection.income.net, units: projection.units };
    try {
      const k = `sideral:presupuesto:${game.id}`;
      const all = JSON.parse(localStorage.getItem(k) ?? "{}");
      all[state.round] = f;
      localStorage.setItem(k, JSON.stringify(all));
    } catch {}
    return f;
  };

  // Cierre del trimestre en partidas individuales
  const closeSolo = async () => {
    if (busy) return;
    setConfirm(false);
    setBusy(true);
    const round = state.round;
    const forecast = rememberForecast();
    setReveal({ ...CLOSED, open: true, pending: true });
    try {
      const res = await act<RoundResponse | { ok: false; stale: true }>("game.round", { gameId: game.id, round, decisions: draft, forecast });
      if (!res.ok) {
        setReveal(CLOSED);
        await refetch();
        toast("Ese trimestre ya estaba cerrado. Actualizamos la partida.", "info");
        return;
      }
      clearDraft(game.id, round + 1);
      seenRound.current = res.state.round;
      setIntel(res.intel);
      showRound(res.result, res.state, res.rewards, res.status === "finalizada");
      setData((prev) =>
        prev
          ? {
              ...prev,
              game: { ...prev.game, state: res.state, round: res.state.round, history: res.history, status: res.status },
              lastResult: res.result,
              decision: res.intel ? ({ ...(prev.decision ?? {}), intel: res.intel, submitted: false, data: {} } as GameData["decision"]) : null,
            }
          : prev,
      );
      refreshProfile();
    } catch (e) {
      setReveal(CLOSED);
      toast(e instanceof ApiError ? e.message : "No se pudo cerrar el trimestre. Tus decisiones siguen guardadas.", "error");
    } finally {
      setBusy(false);
    }
  };

  // Salas: envío, espera y cierre
  const tryClose = useCallback(
    async (force = false) => {
      try {
        const res = await act<{ processed: boolean; reason?: string }>("room.close", { roomId, force });
        if (res.processed) await refetch();
        else if (force && res.reason) toast(res.reason, "info");
      } catch (e) {
        if (force) toast(e instanceof ApiError ? e.message : "No se pudo cerrar el trimestre.", "error");
      }
    },
    [roomId, refetch, toast],
  );

  const sendRoom = async (value: boolean) => {
    if (!data.company || busy) return;
    setConfirm(false);
    setBusy(true);
    const forecast = value ? rememberForecast() : null;
    const { error } = await supabase()
      .from("decisions")
      .upsert({ company_id: data.company.id, game_id: game.id, round: state.round, data: draft, forecast, submitted: value }, { onConflict: "company_id,round" });
    if (error) {
      toast("No se pudo enviar. Revisa tu conexión.", "error");
      setBusy(false);
      return;
    }
    setData((prev) => (prev ? { ...prev, decision: { ...(prev.decision ?? ({} as NonNullable<GameData["decision"]>)), data: draft, submitted: value, intel: prev.decision?.intel ?? null } } : prev));
    channel.current?.send({ type: "broadcast", event: "submitted", payload: { company: data.company.id, value } });
    toast(value ? "Decisiones enviadas. Esperando al resto." : "Puedes volver a editar tus decisiones.");
    setBusy(false);
    if (value) tryClose(false);
  };

  useEffect(() => {
    if (!room || game.status !== "activa") return;
    const ch = supabase().channel(`room:${roomId}`, { config: { broadcast: { self: false } } });
    ch.on("broadcast", { event: "round" }, () => refetch())
      .on("broadcast", { event: "finished" }, () => refetch())
      .on("broadcast", { event: "draft" }, ({ payload }) => {
        // Un compañero de equipo editó: se adopta su versión si yo no estoy escribiendo.
        if (!payload?.data || payload.by === userId || Date.now() - lastEdit.current < 2500) return;
        if (data.company && team.some((t) => t.user_id === payload.by)) setDraft(sanitize(payload.data as Decisions, state, me));
      })
      .on("broadcast", { event: "submitted" }, ({ payload }) => {
        if (data.company && payload?.company === data.company.id) refetch();
      })
      .subscribe();
    channel.current = ch;
    const poll = setInterval(() => refetch(), 12000);
    return () => {
      clearInterval(poll);
      supabase().removeChannel(ch);
      channel.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, roomId, game.status, state.round]);

  // Cuando la sala avanza de trimestre, muestra el resultado a quien estaba esperando.
  useEffect(() => {
    if (!room || spectator) {
      seenRound.current = state.round;
      return;
    }
    if (state.round > seenRound.current && lastResult && lastResult.round === state.round - 1) {
      const result = lastResult;
      seenRound.current = state.round;
      act<{ rewards: Rewards | null }>("room.rewards", { gameId: game.id, round: result.round })
        .then((r) => showRound(result, state, r.rewards, game.status === "finalizada"))
        .catch(() => showRound(result, state, null, game.status === "finalizada"));
      refreshProfile();
    } else if (game.status === "finalizada" && seenRound.current <= state.totalRounds && lastResult && seenRound.current === lastResult.round) {
      const result = lastResult;
      seenRound.current = state.totalRounds + 1;
      act<{ rewards: Rewards | null }>("room.rewards", { gameId: game.id, round: result.round })
        .then((r) => showRound(result, state, r.rewards, true))
        .catch(() => showRound(result, state, null, true));
      refreshProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.round, game.status, lastResult?.round]);

  const ctx: GameContext = {
    game,
    state,
    ind,
    d,
    idx,
    me,
    readOnly,
    spectator,
    isHost,
    result: lastResult,
    mine,
    history: game.history,
    draft,
    update,
    projection,
    intel,
    has,
    team,
    submitted,
  };

  const round = Math.min(state.round, state.totalRounds);
  const needsChoice = playing && !spectator && has("situaciones") && state.current.dilemma && !draft.choice;
  const back = game.mode === "carrera" ? "/carrera" : room ? "/salas" : game.mode === "torneo" ? "/torneos" : game.mode === "duelo" ? "/duelos" : "/inicio";
  const action = room ? (submitted ? "Editar decisiones" : "Enviar decisiones") : "Cerrar trimestre";

  const primary = playing && !spectator && (
    <button
      className={cx("btn", submitted ? "btn-ghost" : "btn-primary")}
      disabled={busy}
      onClick={() => (submitted ? sendRoom(false) : setConfirm(true))}
    >
      {busy ? <Spinner /> : submitted ? <PencilLine size={16} /> : room ? <Send size={16} /> : <Flag size={16} />}
      {action}
    </button>
  );

  return (
    <GameProvider value={ctx}>
      <div className="mx-auto min-h-dvh w-full max-w-[1400px] px-4 pb-36 lg:px-6 lg:pb-16">
        {/* Encabezado */}
        <header className="sticky top-0 z-30 -mx-4 px-4 pt-3 lg:-mx-6 lg:px-6 lg:pt-4">
          <div className="glass rounded-3xl px-4 py-3">
            <div className="flex items-center gap-3">
              <Link href={back} className="btn btn-ghost btn-icon btn-sm shrink-0" aria-label="Salir de la partida">
                <ArrowLeft size={17} />
              </Link>
              <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10 sm:grid">
                <Icon name={ind.icon} size={19} />
              </span>
              <div className="min-w-0 flex-1">
                <h1 className="truncate text-[15px] font-semibold tracking-tight">{spectator ? game.name : me.name}</h1>
                <div className="flex flex-wrap items-center gap-x-2 text-xs text-ink-3">
                  <span className="truncate">{ind.short}</span>
                  <span>·</span>
                  <span>{DIFFICULTY_NAMES[game.difficulty]}</span>
                  <span>·</span>
                  <span className="num">
                    {game.status === "finalizada" ? "Finalizada" : `${periodLabel(round, state.startYear)}, trimestre ${round} de ${state.totalRounds}`}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {room && game.deadline && playing && <Countdown deadline={game.deadline} onZero={() => tryClose(false)} />}
                {room && submitted && (
                  <span className="chip chip-good hidden sm:inline-flex">
                    <Check size={13} />
                    Enviado
                  </span>
                )}
                {isHost && room && playing && (
                  <button className="btn btn-ghost btn-sm hidden md:inline-flex" onClick={() => tryClose(true)}>
                    Cerrar trimestre ahora
                  </button>
                )}
                <span className="hidden lg:block">{primary}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex flex-1 gap-1" role="img" aria-label={`Trimestre ${round} de ${state.totalRounds}`}>
                {Array.from({ length: state.totalRounds }, (_, i) => (
                  <span
                    key={i}
                    className={cx("h-1 flex-1 rounded-full", i + 1 < state.round ? "bg-white" : i + 1 === state.round && playing ? "animate-pulse-soft bg-white/70" : "bg-white/12")}
                  />
                ))}
              </div>
            </div>
            <nav className="scroll-none -mx-1 mt-3 flex gap-1 overflow-x-auto px-1" role="tablist" aria-label="Secciones de la partida">
              {TABS.map((t) => (
                <button key={t.id} role="tab" aria-selected={tab === t.id} className="tab shrink-0" onClick={() => setTab(t.id)}>
                  <t.icon size={15} />
                  {t.label}
                  {t.id === "decisiones" && needsChoice && <span className="h-1.5 w-1.5 rounded-full bg-warn" />}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {spectator && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="chip chip-info">
              <Users size={13} />
              Observas como docente
            </span>
            {state.companies.map((c) => (
              <button key={c.idx} className={cx("chip transition", idx === c.idx && "chip-white")} onClick={() => setWatch(c.idx)}>
                {c.name}
              </button>
            ))}
          </div>
        )}

        {game.status === "cancelada" && <div className="mt-4 rounded-2xl bg-white/6 px-4 py-3 text-sm text-ink-2 ring-1 ring-white/10">Esta partida fue cerrada antes de terminar.</div>}

        <main className="mt-5 animate-fade" key={tab}>
          {tab === "resumen" && <OverviewPanel go={(t) => setTab(t as TabId)} />}
          {tab === "decisiones" &&
            (spectator ? (
              <Empty title="Las decisiones son privadas" text="Como docente observas los resultados de cada empresa, no sus borradores." />
            ) : !playing ? (
              <Empty title="La partida terminó" text="Revisa los reportes financieros, el mercado y las posiciones finales." />
            ) : (
              <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div className="space-y-4">
                  {submitted && (
                    <div className="flex items-center gap-3 rounded-2xl bg-good/10 px-4 py-3 text-sm text-[#8eeaa6] ring-1 ring-good/25">
                      <Check size={17} className="shrink-0" />
                      Tu equipo ya envió sus decisiones. Toca «Editar decisiones» si quieres cambiarlas antes del cierre.
                    </div>
                  )}
                  {room && team.length > 1 && (
                    <div className="flex items-center gap-2 text-xs text-ink-3">
                      <Users size={14} />
                      Decides con {team.filter((t) => t.user_id !== userId).map((t) => t.display_name.split(" ")[0]).join(", ")}. Los cambios se comparten al instante.
                    </div>
                  )}
                  {state.current.dilemma && has("situaciones") && <DilemmaCard dilemma={state.current.dilemma} />}
                  <DecisionsPanel />
                </div>
                <aside className="sticky top-[13.5rem] hidden lg:block">
                  <div className="glass scroll-thin max-h-[calc(100dvh-15rem)] overflow-y-auto rounded-3xl p-5">
                    <ProjectionPanel />
                  </div>
                </aside>
              </div>
            ))}
          {tab === "mercado" && <MarketPanel />}
          {tab === "finanzas" && <FinancePanel />}
          {tab === "estrategia" && <StrategyPanel />}
          {tab === "posiciones" && <RankingPanel />}
        </main>
      </div>

      {/* Barra inferior del celular */}
      {playing && !spectator && (
        <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
          <div className="glass-strong mx-auto flex max-w-xl items-center gap-3 rounded-[1.4rem] p-2.5 pl-4">
            <button className="min-w-0 flex-1 text-left" onClick={() => setSheet(true)} aria-label="Ver proyección completa">
              <div className="text-[10.5px] text-ink-3">Utilidad proyectada</div>
              <div className={cx("num truncate text-lg leading-tight font-semibold", (projection?.income.net ?? 0) < 0 && "text-bad")}>
                {projection ? moneyShort(projection.income.net) : "—"}
                <span className="ml-2 text-[11px] font-normal text-ink-3">caja {projection ? moneyShort(projection.balance.cash - projection.balance.overdraft) : ""}</span>
              </div>
            </button>
            {tab === "decisiones" ? (
              primary
            ) : (
              <button className="btn btn-primary" onClick={() => setTab("decisiones")}>
                <SlidersHorizontal size={16} />
                Decidir
              </button>
            )}
          </div>
        </div>
      )}

      <Modal open={sheet} onClose={() => setSheet(false)} title="Proyección" size="sm">
        <ProjectionPanel dense />
      </Modal>

      <Modal open={confirm} onClose={() => setConfirm(false)} title={room ? "Enviar decisiones" : "Cerrar el trimestre"} size="sm">
        <p className="text-sm leading-relaxed text-ink-2">
          {room
            ? "Podrás editarlas mientras el trimestre siga abierto. Se cierra cuando todos envían, cuando vence el plazo o cuando lo decide quien dirige la sala."
            : "Una vez cerrado no hay vuelta atrás: el mercado responde y pasas al siguiente trimestre."}
        </p>
        {projection && (
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {[
              { l: "Ventas proyectadas", v: moneyShort(projection.income.revenue), bad: false },
              { l: "Utilidad proyectada", v: moneyShort(projection.income.net), bad: projection.income.net < 0 },
              { l: "Caja al cierre", v: moneyShort(projection.balance.cash - projection.balance.overdraft), bad: projection.balance.overdraft > 0 },
              { l: "Uso de capacidad", v: `${Math.round(projection.ratios.utilization * 100)} %`, bad: false },
            ].map((s) => (
              <div key={s.l} className="well rounded-2xl p-3">
                <div className="text-[11px] text-ink-3">{s.l}</div>
                <div className={cx("num mt-0.5 text-base font-semibold", s.bad && "text-bad")}>{s.v}</div>
              </div>
            ))}
          </div>
        )}
        {needsChoice && (
          <div className="mt-4 rounded-2xl bg-warn/10 px-4 py-3 text-sm leading-relaxed text-[#ffe680] ring-1 ring-warn/25">
            No has respondido la situación del trimestre. Si continúas, los hechos decidirán por ti.
          </div>
        )}
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          {needsChoice ? (
            <button
              className="btn btn-ghost"
              onClick={() => {
                setConfirm(false);
                setTab("decisiones");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Responder la situación
            </button>
          ) : (
            <button className="btn btn-ghost" onClick={() => setConfirm(false)}>
              Seguir ajustando
            </button>
          )}
          <button className="btn btn-primary" onClick={() => (room ? sendRoom(true) : closeSolo())} disabled={busy} autoFocus>
            {room ? "Enviar" : "Cerrar trimestre"}
          </button>
        </div>
      </Modal>

      <RoundReveal
        open={reveal.open}
        pending={reveal.pending}
        game={game}
        state={reveal.state}
        result={reveal.result}
        idx={data.idx}
        previous={reveal.previous}
        rewards={reveal.rewards}
        finished={reveal.finished}
        onDone={() => {
          setReveal(CLOSED);
          setTab("resumen");
          window.scrollTo({ top: 0 });
        }}
      />
    </GameProvider>
  );
}
