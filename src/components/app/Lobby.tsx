"use client";

import { Check, Copy, Crown, LogOut, PencilLine, Play, Share2, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { useApp } from "@/components/app/AppProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Empty, Spinner } from "@/components/ui/display";
import { IndustryTile } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { DIFFICULTY_NAMES, MODULE_NAMES } from "@/engine/constants";
import { getIndustry } from "@/engine/industries";
import { act, ApiError } from "@/lib/api";
import { cx } from "@/lib/format";
import type { BoardRow, GameConfig, GameStatus } from "@/lib/game/types";
import { supabase } from "@/lib/supabase/client";

export interface RoomInfo {
  id: string;
  code: string;
  name: string;
  status: GameStatus;
  round: number;
  totalRounds: number;
  deadline: string | null;
  industry: string;
  difficulty: number;
  config: GameConfig;
  hostId: string;
  markets: number;
  myGame: string | null;
  myCompany: string | null;
  companies: { id: string; name: string; color: string; game: string; market: number; submitted: boolean; members: { id: string; name: string; avatar: string; role: string }[] }[];
  board: BoardRow[];
}

function timerLabel(min: number | undefined): string {
  if (!min) return "Sin plazo: cierra quien dirige";
  if (min < 60) return `${min} minutos por trimestre`;
  if (min < 1440) return `${Math.round(min / 60)} horas por trimestre`;
  return min >= 10080 ? "1 semana por trimestre" : `${Math.round(min / 1440)} ${min === 1440 ? "día" : "días"} por trimestre`;
}

export function Lobby({ code }: { code: string }) {
  const router = useRouter();
  const { userId, profile } = useApp();
  const { toast } = useToast();
  const { data: room, error, mutate } = useSWR(userId ? ["room", code, userId] : null, () => act<RoomInfo>("room.peek", { code }), {
    refreshInterval: 6000,
    revalidateOnFocus: true,
  });
  const [busy, setBusy] = useState(false);
  const [rename, setRename] = useState<string | null>(null);
  const [newTeam, setNewTeam] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const autoJoined = useRef(false);

  const isHost = room?.hostId === userId;
  const teams = room?.config.teamMode === "equipos";
  const mine = room?.companies.find((c) => c.id === room.myCompany) ?? null;

  // En salas individuales, entrar al vestíbulo ya es inscribirse.
  useEffect(() => {
    if (!room || autoJoined.current || room.status !== "lobby" || room.myCompany || teams) return;
    if (isHost && !room.config.hostPlays) return;
    autoJoined.current = true;
    act("room.join", { code })
      .then(() => mutate())
      .catch((e) => toast(e instanceof ApiError ? e.message : "No se pudo entrar a la sala.", "error"));
  }, [room, teams, isHost, code, mutate, toast]);

  useEffect(() => {
    if (!room) return;
    if (room.status === "activa" || room.status === "finalizada") {
      const target = room.myGame ?? (isHost ? room.id : null);
      if (target) router.replace(`/partida/${target}`);
    }
  }, [room, isHost, router]);

  useEffect(() => {
    if (!room?.id) return;
    const ch = supabase()
      .channel(`room:${room.id}`)
      .on("broadcast", { event: "lobby" }, () => mutate())
      .on("broadcast", { event: "started" }, () => mutate())
      .subscribe();
    return () => {
      supabase().removeChannel(ch);
    };
  }, [room?.id, mutate]);

  const run = async (fn: () => Promise<unknown>, fail: string) => {
    if (busy) return;
    setBusy(true);
    try {
      await fn();
      await mutate();
    } catch (e) {
      toast(e instanceof ApiError ? e.message : fail, "error");
    } finally {
      setBusy(false);
    }
  };

  const link = typeof window !== "undefined" ? `${window.location.origin}/registro?sala=${code}` : "";
  const share = async () => {
    const text = `Entra a mi sala de Sideral con el código ${code}`;
    try {
      if (navigator.share) await navigator.share({ title: "Sideral", text, url: link });
      else {
        await navigator.clipboard.writeText(`${text}: ${link}`);
        toast("Enlace copiado");
      }
    } catch {}
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  if (error)
    return (
      <div className="mx-auto max-w-xl py-12">
        <Empty
          title="No pudimos abrir la sala"
          text={error instanceof Error ? error.message : "Revisa el código e inténtalo otra vez."}
          action={
            <Link href="/salas" className="btn btn-primary">
              Volver a salas
            </Link>
          }
        />
      </div>
    );
  if (!room)
    return (
      <div className="grid place-items-center py-32 text-ink-3">
        <Spinner size={26} />
      </div>
    );

  const ind = getIndustry(room.industry);
  const people = room.companies.reduce((s, c) => s + c.members.length, 0);
  const markets = Math.max(1, Math.ceil(room.companies.length / (room.config.marketSize ?? 6)));

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-6">
          <section className="glass animate-rise rounded-[2rem] p-7 text-center">
            <div className="eyebrow">Código de la sala</div>
            <button onClick={copy} className="group mt-3 inline-flex items-center gap-3" aria-label={`Copiar el código ${code}`}>
              <span className="num text-5xl font-semibold tracking-[0.28em] sm:text-6xl">{code}</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/8 text-ink-2 ring-1 ring-white/10 transition group-hover:bg-white/14">
                {copied ? <Check size={16} className="text-good" /> : <Copy size={16} />}
              </span>
            </button>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-ink-3">Comparte este código. Quien no tenga cuenta puede crearla en un minuto con el enlace.</p>
            <button className="btn btn-ghost mt-5" onClick={share}>
              <Share2 size={16} />
              Compartir enlace
            </button>
          </section>

          <section className="panel rounded-3xl p-5">
            <div className="flex items-center gap-3.5">
              <IndustryTile id={ind.id} />
              <div className="min-w-0">
                <h1 className="truncate text-lg font-semibold tracking-tight">{room.name}</h1>
                <p className="truncate text-sm text-ink-3">{ind.name}</p>
              </div>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-2.5 text-sm">
              {[
                { l: "Dificultad", v: DIFFICULTY_NAMES[room.difficulty] },
                { l: "Duración", v: `${room.totalRounds} trimestres` },
                { l: "Participación", v: teams ? `Equipos de hasta ${room.config.teamSize}` : "Individual" },
                { l: "Cierre", v: timerLabel(room.config.timerMinutes) },
              ].map((x) => (
                <div key={x.l} className="well rounded-2xl p-3">
                  <dt className="text-[11px] text-ink-3">{x.l}</dt>
                  <dd className="mt-0.5 text-[13px] font-medium">{x.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="chip">Precio y volumen</span>
              {room.config.modules.map((m) => (
                <span key={m} className="chip">
                  {MODULE_NAMES[m]}
                </span>
              ))}
            </div>
          </section>
        </div>

        <section className="panel flex flex-col rounded-3xl">
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
            <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
              <Users size={17} />
              {teams ? "Equipos" : "Participantes"}
            </h2>
            <span className="chip num">
              {room.companies.length} {room.companies.length === 1 ? "empresa" : "empresas"} · {people} {people === 1 ? "persona" : "personas"}
            </span>
          </div>

          <div className="scroll-thin max-h-[52vh] flex-1 space-y-2 overflow-y-auto p-4">
            {room.companies.length === 0 && (
              <div className="py-12 text-center">
                <div className="mx-auto mb-3 h-2 w-2 animate-pulse-soft rounded-full bg-white" />
                <p className="text-sm text-ink-3">Esperando a los primeros participantes</p>
              </div>
            )}
            {room.companies.map((c) => {
              const self = c.id === room.myCompany;
              const full = c.members.length >= (room.config.teamSize ?? 4);
              return (
                <div key={c.id} className={cx("animate-rise rounded-2xl px-4 py-3 ring-1", self ? "bg-white/10 ring-white/35" : "bg-white/4 ring-white/8")}>
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: c.color }} />
                    <span className={cx("min-w-0 flex-1 truncate text-sm", self ? "font-semibold" : "font-medium")}>{c.name}</span>
                    {self && (
                      <button className="btn btn-quiet btn-icon btn-sm" onClick={() => setRename(c.name)} aria-label="Cambiar nombre">
                        <PencilLine size={15} />
                      </button>
                    )}
                    {teams && !room.myCompany && !full && room.status === "lobby" && (
                      <button className="btn btn-ghost btn-sm" disabled={busy} onClick={() => run(() => act("room.join", { code, companyId: c.id }), "No se pudo unir al equipo.")}>
                        Unirme
                      </button>
                    )}
                    {teams && full && !self && <span className="chip">Completo</span>}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
                    {c.members.map((m) => (
                      <span key={m.id} className="inline-flex items-center gap-1.5 text-xs text-ink-2">
                        <Avatar id={m.avatar} size={20} />
                        {m.name}
                        {m.id === room.hostId && <Crown size={12} className="text-warn" aria-label="Dirige la sala" />}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-3 border-t border-line p-5">
            {teams && !room.myCompany && !(isHost && !room.config.hostPlays) && (
              <button className="btn btn-ghost w-full" onClick={() => setNewTeam("")}>
                <UserPlus size={16} />
                Crear un equipo nuevo
              </button>
            )}
            {isHost ? (
              <>
                <button
                  className="btn btn-primary btn-lg w-full"
                  disabled={busy || room.companies.length === 0}
                  onClick={() => run(() => act("room.start", { roomId: room.id }), "No se pudo iniciar la sala.")}
                >
                  {busy ? <Spinner /> : <Play size={18} />}
                  Iniciar la competencia
                </button>
                <p className="text-center text-xs leading-relaxed text-ink-3">
                  {room.companies.length === 0
                    ? "Necesitas al menos una empresa inscrita."
                    : markets > 1
                      ? `Se formarán ${markets} mercados paralelos de tamaño parejo. Los cupos libres los ocupan rivales automáticos.`
                      : room.companies.length < 4
                        ? "Los cupos libres los ocupan rivales automáticos hasta completar 4 empresas."
                        : "Una vez iniciada, ya no podrán entrar más participantes."}
                </p>
              </>
            ) : (
              <div className="flex items-center justify-center gap-2.5 rounded-2xl bg-white/4 px-4 py-3.5 text-sm text-ink-2 ring-1 ring-white/8">
                <span className="h-2 w-2 animate-pulse-soft rounded-full bg-good" />
                {mine ? "Estás dentro. Espera a que inicien la competencia." : "Elige un equipo o crea el tuyo."}
              </div>
            )}
            {room.myCompany && room.status === "lobby" && (
              <button
                className="btn btn-quiet btn-sm w-full"
                disabled={busy}
                onClick={() =>
                  run(async () => {
                    autoJoined.current = true;
                    await act("room.leave", { roomId: room.id });
                    if (!teams) router.push("/salas");
                  }, "No se pudo salir de la sala.")
                }
              >
                <LogOut size={15} />
                Salir de la sala
              </button>
            )}
          </div>
        </section>
      </div>

      <Modal open={rename !== null} onClose={() => setRename(null)} title="Nombre de tu empresa" size="sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const v = rename ?? "";
            setRename(null);
            run(() => act("room.rename", { roomId: room.id, name: v }), "No se pudo cambiar el nombre.");
          }}
        >
          <input className="field" value={rename ?? ""} maxLength={32} onChange={(e) => setRename(e.target.value)} autoFocus aria-label="Nombre de tu empresa" />
          <button className="btn btn-primary mt-4 w-full" disabled={(rename ?? "").trim().length < 2}>
            Guardar
          </button>
        </form>
      </Modal>

      <Modal open={newTeam !== null} onClose={() => setNewTeam(null)} title="Nuevo equipo" size="sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const v = newTeam ?? "";
            setNewTeam(null);
            run(() => act("room.join", { code, company: v }), "No se pudo crear el equipo.");
          }}
        >
          <label className="label" htmlFor="team-name">
            Nombre de la empresa del equipo
          </label>
          <input id="team-name" className="field" value={newTeam ?? ""} maxLength={32} onChange={(e) => setNewTeam(e.target.value)} autoFocus placeholder={`Equipo de ${profile?.display_name.split(" ")[0] ?? ""}`} />
          <button className="btn btn-primary mt-4 w-full">Crear equipo</button>
        </form>
      </Modal>
    </div>
  );
}
