"use client";

import { ArrowRight, Check, Clock, Lock, Target } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useApp } from "@/components/app/AppProvider";
import { Icon } from "@/components/ui/Icon";
import { PageHeader, Spinner, Stars } from "@/components/ui/display";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { DIFFICULTY_NAMES, MODULE_NAMES } from "@/engine/constants";
import { getIndustry } from "@/engine/industries";
import { act, ApiError } from "@/lib/api";
import { cx } from "@/lib/format";
import { minutesPerRound } from "@/lib/gamification";
import { useMissions } from "@/lib/hooks";
import { MISSIONS, WORLDS, type Mission } from "@/lib/missions";

function minutes(m: Mission): number {
  return Math.round((m.rounds * minutesPerRound(m.modules.length)) / 5) * 5 || 5;
}

function Career() {
  const router = useRouter();
  const params = useSearchParams();
  const { userId, profile } = useApp();
  const { toast } = useToast();
  const { data: rows, isLoading } = useMissions(userId);
  const [open, setOpen] = useState<Mission | null>(null);
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);

  const byId = new Map((rows ?? []).map((r) => [r.mission_id, r]));
  const done = (rows ?? []).filter((r) => r.stars > 0).length;
  const stars = (rows ?? []).reduce((s, r) => s + r.stars, 0);
  const unlocked = (m: Mission) => {
    const world = WORLDS.find((w) => w.id === m.world)!;
    if (done < world.unlock) return false;
    const before = MISSIONS.filter((x) => x.order < m.order);
    return before.every((x) => (byId.get(x.id)?.stars ?? 0) > 0) || before.length <= done;
  };

  useEffect(() => {
    const id = params.get("mision");
    if (!id || isLoading) return;
    const m = MISSIONS.find((x) => x.id === id);
    if (m) setOpen(m);
  }, [params, isLoading]);

  const play = async () => {
    if (!open || busy) return;
    setBusy(true);
    try {
      const res = await act<{ id: string }>("game.create", { mode: "carrera", missionId: open.id, company: company.trim() || undefined });
      router.push(`/partida/${res.id}`);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo iniciar la misión.", "error");
      setBusy(false);
    }
  };

  const ind = open ? getIndustry(open.industry) : null;
  const row = open ? byId.get(open.id) : undefined;

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Modo individual"
        title="Carrera"
        text="Dieciséis misiones que van de una pastelería de barrio a un operador nacional. Cada una te entrega un área nueva de la empresa."
        action={
          <div className="flex gap-2.5">
            <div className="well rounded-2xl px-4 py-2.5 text-center">
              <div className="num text-xl font-semibold">
                {done}
                <span className="text-sm text-ink-3"> / {MISSIONS.length}</span>
              </div>
              <div className="text-[11px] text-ink-3">misiones</div>
            </div>
            <div className="well rounded-2xl px-4 py-2.5 text-center">
              <div className="num text-xl font-semibold">
                {stars}
                <span className="text-sm text-ink-3"> / {MISSIONS.length * 3}</span>
              </div>
              <div className="text-[11px] text-ink-3">estrellas</div>
            </div>
          </div>
        }
      />

      <div className="space-y-10">
        {WORLDS.map((w) => {
          const list = MISSIONS.filter((m) => m.world === w.id);
          const worldOpen = done >= w.unlock;
          return (
            <section key={w.id}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="eyebrow">Mundo {w.id}</div>
                  <h2 className="display mt-1 text-3xl">{w.name}</h2>
                  <p className="mt-0.5 text-sm text-ink-3">{w.tagline}</p>
                </div>
                {!worldOpen && (
                  <span className="chip">
                    <Lock size={12} />
                    Se abre con {w.unlock} misiones superadas
                  </span>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {list.map((m) => {
                  const r = byId.get(m.id);
                  const can = unlocked(m);
                  const mi = getIndustry(m.industry);
                  return (
                    <button
                      key={m.id}
                      disabled={!can}
                      onClick={() => setOpen(m)}
                      className={cx("panel rounded-3xl p-5 text-left transition", can ? "panel-hover" : "cursor-not-allowed opacity-45", (r?.stars ?? 0) === 0 && can && "!border-white/30")}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className={cx("grid h-11 w-11 place-items-center rounded-2xl ring-1", (r?.stars ?? 0) > 0 ? "bg-white text-black ring-white" : "bg-white/8 ring-white/10")}>
                          {can ? <Icon name={mi.icon} size={20} /> : <Lock size={17} />}
                        </span>
                        <span className="num text-xs text-ink-4">{String(m.order).padStart(2, "0")}</span>
                      </div>
                      <h3 className="mt-4 text-[15px] leading-snug font-semibold">{m.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-ink-3">{m.teaches}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <Stars value={r?.stars ?? 0} size={15} />
                        <span className="num text-[11px] text-ink-3">{r?.best_score ? `${r.best_score} pts` : `${minutes(m)} min`}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <Modal open={!!open} onClose={() => !busy && setOpen(null)} title={open ? `Misión ${open.order}` : ""} size="md">
        {open && ind && (
          <div>
            <h3 className="display text-4xl">{open.title}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="chip">
                <Icon name={ind.icon} size={12} />
                {ind.name}
              </span>
              <span className="chip">{DIFFICULTY_NAMES[open.difficulty]}</span>
              <span className="chip">{open.rounds} trimestres</span>
              <span className="chip">
                <Clock size={12} />
                {minutes(open)} min aprox.
              </span>
              <span className="chip">{open.size - 1} rivales</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">{open.brief}</p>

            <div className="mt-5 rounded-2xl bg-white/4 p-4 ring-1 ring-white/8">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] text-ink-2 uppercase">
                <Target size={14} />
                Objetivos
              </div>
              <ul className="mt-3 space-y-2">
                {open.goals.map((g) => (
                  <li key={g.label} className="flex items-center gap-2.5 text-sm">
                    <Check size={15} className="shrink-0 text-ink-3" />
                    {g.label}
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3 text-center text-[11px] text-ink-3">
                <div>
                  <Stars value={1} size={13} className="justify-center" />
                  <div className="mt-1">Cumplir objetivos</div>
                </div>
                <div>
                  <Stars value={2} size={13} className="justify-center" />
                  <div className="num mt-1">{open.stars[0]} puntos</div>
                </div>
                <div>
                  <Stars value={3} size={13} className="justify-center" />
                  <div className="num mt-1">{open.stars[1]} puntos</div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-xs text-ink-3">Áreas a tu cargo</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <span className="chip">Precio y volumen</span>
                {open.modules.map((m) => (
                  <span key={m} className="chip">
                    {MODULE_NAMES[m]}
                  </span>
                ))}
              </div>
            </div>

            {row && row.attempts > 0 && (
              <p className="num mt-4 text-xs text-ink-3">
                Tu mejor marca: {row.best_score} puntos en {row.attempts} {row.attempts === 1 ? "intento" : "intentos"}.
              </p>
            )}

            <div className="mt-5">
              <label className="label" htmlFor="company">
                Nombre de tu empresa <span className="text-ink-4">(opcional)</span>
              </label>
              <input
                id="company"
                className="field"
                value={company}
                maxLength={32}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={`Empresa de ${profile?.display_name.split(" ")[0] ?? "gerente"}`}
                onKeyDown={(e) => e.key === "Enter" && play()}
              />
            </div>
            <button className="btn btn-primary btn-lg mt-5 w-full" onClick={play} disabled={busy}>
              {busy ? <Spinner /> : null}
              {busy ? "Preparando el mercado" : row?.attempts ? "Jugar de nuevo" : "Empezar la misión"}
              {!busy && <ArrowRight size={18} />}
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function CareerPage() {
  return (
    <Suspense fallback={null}>
      <Career />
    </Suspense>
  );
}
