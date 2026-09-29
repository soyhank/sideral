"use client";

import { ArrowRight, ChevronsUp, Crown, Flame, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { GameState, RoundResult } from "@/engine/types";
import { companyColor } from "@/components/charts/base";
import { CountUp, Progress, Stars } from "@/components/ui/display";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";
import { cx, int, money, moneyShort, pct, periodLabel } from "@/lib/format";
import { levelProgress, titleFor } from "@/lib/gamification";
import type { GameRow, HistoryCell, Rewards } from "@/lib/game/types";
import { DilemmaOutcome, NewsCard } from "./Cards";

export async function celebrate(strong = false) {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const confetti = (await import("canvas-confetti")).default;
  const colors = ["#ffffff", "#d9d9e3", "#a8b0ff", "#ffe28a"];
  confetti({ particleCount: strong ? 140 : 70, spread: strong ? 100 : 70, startVelocity: 38, origin: { y: 0.62 }, colors, scalar: 0.9, disableForReducedMotion: true, zIndex: 300 });
  if (strong) {
    setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors, zIndex: 300 }), 220);
    setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors, zIndex: 300 }), 380);
  }
}

interface Props {
  open: boolean;
  /** El servidor aún procesa el trimestre. */
  pending: boolean;
  game: GameRow;
  state: GameState | null;
  result: RoundResult | null;
  idx: number;
  previous: HistoryCell | undefined;
  rewards: Rewards | null;
  finished: boolean;
  onDone: () => void;
}

type Step = "entorno" | "situacion" | "resultados" | "posicion" | "recompensas" | "final";

function Big({ label, value, format, tone, sub }: { label: string; value: number; format: (v: number) => string; tone?: "bad"; sub?: React.ReactNode }) {
  return (
    <div className="well rounded-2xl p-4">
      <div className="text-xs text-ink-3">{label}</div>
      <CountUp value={value} format={format} className={cx("mt-1 block text-2xl font-semibold tracking-tight", tone === "bad" && "text-bad")} />
      {sub && <div className="mt-1 text-xs text-ink-3">{sub}</div>}
    </div>
  );
}

export function RoundReveal({ open, pending, game, state, result, idx, previous, rewards, finished, onDone }: Props) {
  const [at, setAt] = useState(0);
  const [minWait, setMinWait] = useState(true);
  const mine = result?.companies[idx] ?? null;

  const steps = useMemo<Step[]>(() => {
    if (!result || !mine) return [];
    const s: Step[] = [];
    if (result.news) s.push("entorno");
    if (mine.dilemma) s.push("situacion");
    s.push("resultados", "posicion");
    if (rewards && rewards.xp > 0) s.push("recompensas");
    if (finished) s.push("final");
    return s;
  }, [result, mine, rewards, finished]);

  useEffect(() => {
    if (!open) return;
    setAt(0);
    setMinWait(true);
    const t = setTimeout(() => setMinWait(false), 1100);
    return () => clearTimeout(t);
  }, [open, result?.round]);

  const step = steps[at];
  const loading = pending || minWait || !result || !mine || !state;

  useEffect(() => {
    if (loading) return;
    if (step === "recompensas" && (rewards?.levelUp || (rewards?.achievements.length ?? 0) > 0)) celebrate(Boolean(rewards?.levelUp));
    if (step === "final" && rewards?.final?.rank === 1) celebrate(true);
    if (step === "posicion" && mine?.rank === 1 && !finished) celebrate(false);
  }, [step, loading, rewards, mine?.rank, finished]);

  const next = () => (at < steps.length - 1 ? setAt((a) => a + 1) : onDone());

  return (
    <Modal open={open} locked size="md" scrollKey={loading ? "cargando" : step}>
      {loading ? (
        <div className="flex flex-col items-center py-14 text-center">
          <div className="relative grid h-24 w-24 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-white/8" style={{ animationDuration: "1.8s" }} />
            <LogoMark size={56} className="animate-pulse-soft" />
          </div>
          <h2 className="display mt-7 text-3xl">Cerrando el trimestre</h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-3">El mercado reparte la demanda, se pagan las cuentas y se arman los estados financieros.</p>
        </div>
      ) : (
        <div key={step} className="animate-rise">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="eyebrow">
              {periodLabel(result.round, state.startYear)} · trimestre {result.round} de {game.total_rounds}
            </span>
            <div className="flex gap-1" aria-hidden>
              {steps.map((s, i) => (
                <span key={s} className={cx("h-1 w-5 rounded-full transition-colors", i <= at ? "bg-white" : "bg-white/15")} />
              ))}
            </div>
          </div>

          {step === "entorno" && result.news && (
            <div>
              <h2 className="display mb-4 text-3xl">Esto pasó en el entorno</h2>
              <NewsCard news={result.news} />
            </div>
          )}

          {step === "situacion" && mine.dilemma && (
            <div>
              <h2 className="display mb-4 text-3xl">Tu decisión tuvo consecuencias</h2>
              <DilemmaOutcome d={mine.dilemma} />
            </div>
          )}

          {step === "resultados" && (
            <div>
              <h2 className="display text-3xl">{mine.income.net >= 0 ? "Cerraste con utilidad" : "Cerraste con pérdida"}</h2>
              <p className="mt-1.5 text-sm text-ink-3">
                Vendiste {int(mine.units)} unidades con un margen neto de {pct(mine.ratios.netMargin)}.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Big
                  label="Ventas"
                  value={mine.income.revenue}
                  format={moneyShort}
                  sub={previous && previous.rev > 0 ? `${mine.income.revenue >= previous.rev ? "+" : "−"}${Math.abs((mine.income.revenue / previous.rev - 1) * 100).toFixed(1)} % frente al anterior` : undefined}
                />
                <Big label="Utilidad neta" value={mine.income.net} format={moneyShort} tone={mine.income.net < 0 ? "bad" : undefined} sub={previous ? `Antes: ${moneyShort(previous.net)}` : undefined} />
                <Big
                  label="Caja al cierre"
                  value={mine.balance.cash - mine.balance.overdraft}
                  format={moneyShort}
                  tone={mine.balance.overdraft > 0 ? "bad" : undefined}
                  sub={mine.balance.overdraft > 0 ? "En sobregiro" : undefined}
                />
                <Big label="Cuota de mercado" value={mine.share} format={(v) => pct(v)} sub={previous ? `Antes: ${pct(previous.share)}` : undefined} />
              </div>
              {mine.notes.length > 0 && (
                <ul className="mt-4 space-y-1.5">
                  {mine.notes.slice(0, 3).map((n) => (
                    <li key={n} className="flex gap-2 text-xs leading-relaxed text-ink-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-warn" />
                      {n}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {step === "posicion" && (
            <div>
              <h2 className="display text-3xl">{mine.rank === 1 ? "Vas en primer lugar" : `Vas en el puesto ${mine.rank}`}</h2>
              <p className="mt-1.5 text-sm text-ink-3">
                Tu puntaje de gestión es {mine.score} de 1000
                {previous ? ` (${mine.score >= previous.score ? "+" : "−"}${Math.abs(mine.score - previous.score)} frente al trimestre anterior).` : "."}
              </p>
              <ol className="mt-5 space-y-2">
                {[...result.companies]
                  .sort((a, b) => a.rank - b.rank)
                  .map((c, i) => (
                    <li
                      key={c.idx}
                      className={cx("flex animate-rise items-center gap-3 rounded-2xl px-3.5 py-3", c.idx === idx ? "bg-white/12 ring-1 ring-white/40" : "bg-white/4 ring-1 ring-white/8")}
                      style={{ animationDelay: `${i * 90}ms` }}
                    >
                      <span className={cx("num grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold", c.rank === 1 ? "bg-white text-black" : "bg-white/10 text-ink-2")}>
                        {c.rank === 1 ? <Crown size={15} /> : c.rank}
                      </span>
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: companyColor(c.idx, idx) }} />
                      <span className={cx("min-w-0 flex-1 truncate text-sm", c.idx === idx && "font-semibold")}>
                        {state.companies[c.idx].name}
                        {c.idx === idx && " (tú)"}
                      </span>
                      <span className="num text-sm font-semibold">{c.score}</span>
                    </li>
                  ))}
              </ol>
            </div>
          )}

          {step === "recompensas" && rewards && <RewardsView rewards={rewards} />}

          {step === "final" && rewards && <FinalView game={game} rewards={rewards} profit={state.companies[idx].cumProfit} tsr={mine.ratios.tsr} />}

          <div className="mt-7 flex items-center justify-between gap-3">
            {at < steps.length - 1 ? (
              <button className="btn btn-quiet btn-sm" onClick={onDone}>
                Saltar
              </button>
            ) : (
              <span />
            )}
            {step === "final" ? (
              <div className="flex flex-wrap justify-end gap-2">
                <button className="btn btn-ghost" onClick={onDone}>
                  Ver reportes
                </button>
                <Link href={game.mode === "carrera" ? "/carrera" : game.mode === "torneo" ? `/torneos/${game.config.tournamentId}` : game.mode === "duelo" ? "/duelos" : "/inicio"} className="btn btn-primary">
                  Continuar
                  <ArrowRight size={17} />
                </Link>
              </div>
            ) : (
              <button className="btn btn-primary" onClick={next}>
                {at < steps.length - 1 ? "Continuar" : "Siguiente trimestre"}
                <ArrowRight size={17} />
              </button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

export function RewardsView({ rewards }: { rewards: Rewards }) {
  const lp = levelProgress(rewards.totalXp);
  const before = levelProgress(Math.max(0, rewards.totalXp - rewards.xp));
  const [shown, setShown] = useState(rewards.levelUp ? 0 : before.progress);
  useEffect(() => {
    const t = setTimeout(() => setShown(lp.progress), 350);
    return () => clearTimeout(t);
  }, [lp.progress]);
  return (
    <div>
      <div className="text-center">
        <div className="eyebrow">Experiencia ganada</div>
        <CountUp value={rewards.xp} format={(v) => `+${Math.round(v)} XP`} className="display mt-2 block text-6xl" />
      </div>
      <ul className="mt-5 space-y-1.5">
        {rewards.items.map((i, n) => (
          <li key={`${i.label}-${n}`} className="flex animate-rise items-center justify-between gap-3 rounded-xl bg-white/4 px-3.5 py-2.5 text-sm" style={{ animationDelay: `${n * 70}ms` }}>
            <span className="text-ink-2">{i.label}</span>
            <span className="num font-semibold">+{i.xp}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 text-sm font-semibold">
            {rewards.levelUp && <ChevronsUp size={16} className="text-good" />}
            Nivel {lp.level} · {titleFor(lp.level)}
          </span>
          <span className="chip">
            <Flame size={13} className={rewards.streak > 0 ? "text-amber" : ""} />
            {rewards.streak} {rewards.streak === 1 ? "día" : "días"}
          </span>
        </div>
        <Progress value={shown} className="mt-3" height={8} />
        <div className="num mt-1.5 text-right text-[11px] text-ink-3">Faltan {int(lp.missing)} XP para el nivel {lp.level + 1}</div>
        {rewards.levelUp && <p className="mt-2 text-sm text-good">Subiste de nivel.</p>}
      </div>
      {rewards.achievements.length > 0 && (
        <div className="mt-4 space-y-2">
          {rewards.achievements.map((a) => (
            <div key={a.key} className="flex animate-pop items-center gap-3.5 rounded-2xl bg-gradient-to-r from-white/14 to-white/4 p-3.5 ring-1 ring-white/25">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-black">
                <Icon name={a.icon} size={20} />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold tracking-[0.12em] text-ink-3 uppercase">Insignia nueva</div>
                <div className="text-sm font-semibold">{a.name}</div>
                <div className="text-xs text-ink-3">{a.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FinalView({ game, rewards, profit, tsr }: { game: GameRow; rewards: Rewards; profit: number; tsr: number }) {
  const f = rewards.final;
  const m = rewards.mission;
  return (
    <div className="text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-black">{f?.rank === 1 ? <Trophy size={28} /> : <LogoMark size={34} />}</div>
      <h2 className="display mt-5 text-4xl">{m ? (m.passed ? "Misión cumplida" : "Misión no superada") : f?.rank === 1 ? "Ganaste la partida" : "Partida terminada"}</h2>
      <p className="mt-2 text-sm text-ink-3">
        Terminaste en el puesto {f?.rank} de {f?.companies} con {f?.score} puntos.
      </p>
      {m && (
        <div className="mt-5">
          <Stars value={m.stars} size={34} className="justify-center" />
          <ul className="mx-auto mt-4 max-w-sm space-y-1.5 text-left">
            {m.goals.map((g) => (
              <li key={g.label} className="flex items-center gap-2.5 text-sm">
                <span className={cx("grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold", g.met ? "bg-good text-black" : "bg-bad/25 text-bad")}>{g.met ? "✓" : "×"}</span>
                <span className={g.met ? "text-ink-2" : "text-ink-3"}>{g.label}</span>
              </li>
            ))}
          </ul>
          {!m.passed && <p className="mt-3 text-xs text-ink-3">Puedes repetir la misión las veces que quieras.</p>}
        </div>
      )}
      <div className="mt-5 grid grid-cols-2 gap-3 text-left">
        <div className="well rounded-2xl p-4">
          <div className="text-xs text-ink-3">Utilidad acumulada</div>
          <div className={cx("num mt-1 text-xl font-semibold", profit < 0 && "text-bad")}>{money(profit)}</div>
        </div>
        <div className="well rounded-2xl p-4">
          <div className="text-xs text-ink-3">Retorno al accionista</div>
          <div className={cx("num mt-1 text-xl font-semibold", tsr < 0 && "text-bad")}>{pct(tsr, 0)}</div>
        </div>
      </div>
      {game.mode === "torneo" && <p className="mt-4 text-xs text-ink-3">Tu puntaje ya cuenta en la tabla del torneo.</p>}
    </div>
  );
}
