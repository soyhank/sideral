"use client";

import { ArrowRight, Brain, Calculator, CalendarCheck, Check, ChevronRight, Flame, Grid2x2, Play, Route, Scale, Swords, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "@/components/app/AppProvider";
import { Quests } from "@/components/app/Quests";
import { Icon, IndustryTile } from "@/components/ui/Icon";
import { Avatar } from "@/components/ui/Avatar";
import { Progress, Ring, Stars } from "@/components/ui/display";
import { Modal } from "@/components/ui/Modal";
import { getIndustry } from "@/engine/industries";
import { act } from "@/lib/api";
import { cx, int, timeAgo } from "@/lib/format";
import { ACHIEVEMENT_BY_KEY, LEAGUE_UP, leagueOf, levelProgress, nextTitle, titleFor } from "@/lib/gamification";
import { MODE_LABEL, useAchievements, useDailyDone, useMissions, useMyGames } from "@/lib/hooks";
import { MISSIONS } from "@/lib/missions";

const DAILY = [
  { kind: "trivia", label: "Trivia", icon: Brain, text: "5 preguntas" },
  { kind: "dilema", label: "Dilema", icon: Scale, text: "1 situación" },
  { kind: "foda", label: "FODA", icon: Grid2x2, text: "8 afirmaciones" },
  { kind: "calculo", label: "Cálculo", icon: Calculator, text: "3 problemas" },
];

function greeting(): string {
  const h = Number(new Intl.DateTimeFormat("es-PE", { timeZone: "America/Lima", hour: "numeric", hour12: false }).format(new Date()));
  return h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches";
}

function Welcome({ open, onClose }: { open: boolean; onClose: (start: boolean) => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { icon: Play, title: "Diriges una empresa", text: "Cada trimestre decides precio, producción, publicidad, personal y finanzas. El mercado responde a lo que tú y tus rivales hagan." },
    { icon: Scale, title: "El entorno se mueve", text: "Aparecen noticias y situaciones tomadas de la realidad peruana: una inspección, un paro, el dólar, una campaña. Nada está escrito." },
    { icon: Trophy, title: "Compites y subes de nivel", text: "Ganas experiencia, insignias y estrellas. Puedes retar a un compañero, entrar a torneos o competir en la sala de tu clase." },
  ];
  const s = steps[step];
  return (
    <Modal open={open} locked size="sm">
      <div key={step} className="animate-rise text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-black">
          <s.icon size={26} />
        </div>
        <h2 className="display mt-5 text-4xl">{s.title}</h2>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-ink-2">{s.text}</p>
        <div className="mt-6 flex justify-center gap-1.5" aria-hidden>
          {steps.map((_, i) => (
            <span key={i} className={cx("h-1.5 rounded-full transition-all", i === step ? "w-6 bg-white" : "w-1.5 bg-white/25")} />
          ))}
        </div>
        <div className="mt-7 flex flex-col gap-2">
          {step < steps.length - 1 ? (
            <button className="btn btn-primary btn-lg" onClick={() => setStep(step + 1)} autoFocus>
              Siguiente
              <ArrowRight size={18} />
            </button>
          ) : (
            <button className="btn btn-primary btn-lg" onClick={() => onClose(true)} autoFocus>
              Empezar mi primera misión
              <ArrowRight size={18} />
            </button>
          )}
          <button className="btn btn-quiet btn-sm" onClick={() => onClose(false)}>
            Explorar por mi cuenta
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { profile, userId, patch } = useApp();
  const { data: games } = useMyGames(userId, 6);
  const { data: missions } = useMissions(userId);
  const { data: daily } = useDailyDone(userId);
  const { data: badges } = useAchievements(userId);
  const [welcome, setWelcome] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (profile && !profile.onboarded) setWelcome(true);
  }, [profile]);

  const closeWelcome = (start: boolean) => {
    setWelcome(false);
    patch({ onboarded: true });
    act("profile.update", { onboarded: true }).catch(() => {});
    if (start) router.push("/carrera?mision=m01");
  };

  const lp = levelProgress(profile?.xp ?? 0);
  const upcoming = nextTitle(lp.level);
  const league = leagueOf(profile?.league ?? 1);
  const active = games?.filter((g) => g.status === "activa" || g.status === "lobby") ?? [];
  const doneMissions = new Set((missions ?? []).filter((m) => m.stars > 0).map((m) => m.mission_id));
  const nextMission = MISSIONS.find((m) => !doneMissions.has(m.id)) ?? null;
  const stars = (missions ?? []).reduce((s, m) => s + m.stars, 0);
  const dailyDone = new Set((daily ?? []).map((d) => d.kind));

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <Welcome open={welcome} onClose={closeWelcome} />

      {/* Cabecera */}
      <section className="glass animate-rise overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-6">
          <Ring value={lp.progress} size={92} stroke={6}>
            <Avatar id={profile?.avatar ?? "orbita"} size={70} />
          </Ring>
          <div className="min-w-0 flex-1">
            <div className="eyebrow">{greeting()}</div>
            <h1 className="display mt-1.5 truncate text-4xl sm:text-5xl">{profile?.display_name.split(" ")[0] ?? "Gerente"}</h1>
            <p className="mt-2 text-sm text-ink-2">
              Nivel {lp.level} · {titleFor(lp.level)}
              {upcoming && <span className="text-ink-3"> · serás {upcoming.title} en el nivel {upcoming.level}</span>}
            </p>
            <div className="mt-3 max-w-md">
              <Progress value={lp.progress} height={6} />
              <div className="num mt-1.5 flex justify-between text-[11px] text-ink-3">
                <span>{int(profile?.xp ?? 0)} XP</span>
                <span>faltan {int(lp.missing)} para el nivel {lp.level + 1}</span>
              </div>
            </div>
          </div>
          <div className="grid w-full grid-cols-3 gap-2.5 sm:w-auto">
            {[
              { l: "Racha", v: profile?.streak ?? 0, s: (profile?.streak ?? 0) === 1 ? "día" : "días", icon: <Flame size={15} className={(profile?.streak ?? 0) > 0 ? "text-amber" : "text-ink-3"} /> },
              { l: "Estrellas", v: stars, s: `de ${MISSIONS.length * 3}`, icon: <Stars value={1} size={13} className="[&>svg:nth-child(n+2)]:hidden" /> },
              { l: "Victorias", v: profile?.games_won ?? 0, s: `de ${profile?.games_played ?? 0}`, icon: <Trophy size={15} className="text-ink-3" /> },
            ].map((s) => (
              <div key={s.l} className="well min-w-[92px] rounded-2xl px-3.5 py-3">
                <div className="flex items-center gap-1.5 text-[11px] text-ink-3">
                  {s.icon}
                  {s.l}
                </div>
                <div className="num mt-1 text-2xl leading-none font-semibold">{s.v}</div>
                <div className="mt-1 text-[10.5px] text-ink-4">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          {/* Continuar */}
          {active.length > 0 && (
            <section>
              <h2 className="mb-3 text-sm font-semibold text-ink-2">Continúa donde te quedaste</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {active.slice(0, 4).map((g) => {
                  const ind = getIndustry(g.industry);
                  return (
                    <Link key={g.id} href={g.status === "lobby" ? `/sala/${g.code}` : `/partida/${g.id}`} className="panel panel-hover rounded-3xl p-5">
                      <div className="flex items-start gap-3.5">
                        <IndustryTile id={ind.id} />
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[15px] font-semibold">{g.company || g.name}</div>
                          <div className="truncate text-xs text-ink-3">
                            {MODE_LABEL[g.mode]} · {ind.short}
                          </div>
                        </div>
                        <ChevronRight size={18} className="shrink-0 text-ink-3" />
                      </div>
                      <Progress value={(g.round - 1) / g.total_rounds} className="mt-4" height={4} />
                      <div className="num mt-2 flex justify-between text-[11px] text-ink-3">
                        <span>{g.status === "lobby" ? "Esperando que empiece" : `Trimestre ${Math.min(g.round, g.total_rounds)} de ${g.total_rounds}`}</span>
                        <span>{g.rank ? `Puesto ${g.rank} · ${g.score} pts` : timeAgo(g.updated_at)}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Carrera */}
          <section className="panel overflow-hidden rounded-3xl">
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
              <span className="icon-accent grid h-14 w-14 shrink-0 place-items-center rounded-2xl">
                <Route size={24} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="eyebrow">Carrera · {doneMissions.size} de {MISSIONS.length} misiones</div>
                {nextMission ? (
                  <>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight">{nextMission.title}</h2>
                    <p className="mt-1 text-sm leading-relaxed text-ink-3">
                      Aprenderás: {nextMission.teaches.toLowerCase()}. {getIndustry(nextMission.industry).name}, {nextMission.rounds} trimestres.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight">Completaste la carrera</h2>
                    <p className="mt-1 text-sm text-ink-3">Vuelve a cualquier misión para buscar las tres estrellas.</p>
                  </>
                )}
              </div>
              <Link href={nextMission ? `/carrera?mision=${nextMission.id}` : "/carrera"} className="btn btn-primary shrink-0">
                {doneMissions.size === 0 ? "Empezar" : "Continuar"}
                <ArrowRight size={17} />
              </Link>
            </div>
            <div className="flex gap-1 px-6 pb-5">
              {MISSIONS.map((m) => (
                <span key={m.id} className={cx("h-1.5 flex-1 rounded-full", doneMissions.has(m.id) ? "bg-white" : m.id === nextMission?.id ? "bg-white/40" : "bg-white/10")} title={m.title} />
              ))}
            </div>
          </section>

          {/* Modos */}
          <section className="grid gap-3 sm:grid-cols-3">
            {[
              { href: "/jugar", icon: Play, title: "Simulación libre", text: "22 industrias, tú eliges la dificultad", time: "15 a 45 min" },
              { href: "/torneos", icon: Trophy, title: "Torneo semanal", text: "Mismo escenario para todos", time: "20 min" },
              { href: "/duelos", icon: Swords, title: "Duelo", text: "Reta a un compañero", time: "10 min" },
            ].map((m) => (
              <Link key={m.href} href={m.href} className="panel panel-hover rounded-3xl p-5">
                <span className="icon-accent grid h-10 w-10 place-items-center rounded-xl">
                  <m.icon size={19} />
                </span>
                <div className="mt-3 text-[15px] font-semibold">{m.title}</div>
                <div className="mt-0.5 text-xs leading-relaxed text-ink-3">{m.text}</div>
                <div className="chip mt-3">{m.time}</div>
              </Link>
            ))}
          </section>

          <div className="grid items-start gap-6 md:grid-cols-2">
            {/* Liga */}
            <section className="panel rounded-3xl p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[15px] font-semibold tracking-tight">Liga {league.name}</h2>
                <span className="h-3 w-3 rounded-full" style={{ background: league.color, boxShadow: `0 0 14px ${league.color}` }} />
              </div>
              <div className="num mt-3 text-3xl font-semibold">
                {int(profile?.weekly_xp ?? 0)}
                <span className="ml-1.5 text-sm font-normal text-ink-3">XP esta semana</span>
              </div>
              <Progress value={(profile?.weekly_xp ?? 0) / LEAGUE_UP} className="mt-3" tone={(profile?.weekly_xp ?? 0) >= LEAGUE_UP ? "good" : "white"} />
              <p className="mt-2 text-xs leading-relaxed text-ink-3">
                {(profile?.weekly_xp ?? 0) >= LEAGUE_UP
                  ? "Ya aseguraste el ascenso de liga para la próxima semana."
                  : (profile?.league ?? 1) >= 5
                    ? "Estás en la liga más alta. Mantén el ritmo para no bajar."
                    : `Suma ${int(LEAGUE_UP - (profile?.weekly_xp ?? 0))} XP más antes del domingo para subir de liga.`}
              </p>
              <Link href="/ranking" className="btn btn-ghost btn-sm mt-4 w-full">
                Ver el ranking
              </Link>
            </section>

            {/* Insignias */}
            {badges && badges.length > 0 && (
              <section className="panel rounded-3xl p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-[15px] font-semibold tracking-tight">Últimas insignias</h2>
                  <Link href="/perfil" className="text-xs text-ink-3 hover:text-ink">
                    Ver todas
                  </Link>
                </div>
                <ul className="mt-4 space-y-3">
                  {badges.slice(0, 3).map((b) => {
                    const a = ACHIEVEMENT_BY_KEY.get(b.key);
                    if (!a) return null;
                    return (
                      <li key={b.key} className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                          <Icon name={a.icon} size={16} />
                        </span>
                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium">{a.name}</div>
                          <div className="truncate text-[11px] text-ink-3">{timeAgo(b.earned_at)}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Quests />

          {/* Retos del día */}
          <section className="panel rounded-3xl p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
                <span className="icon-accent grid h-8 w-8 place-items-center rounded-xl">
                  <CalendarCheck size={16} />
                </span>
                Retos de hoy
              </h2>
              <span className="chip num">
                {dailyDone.size} de {DAILY.length}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {DAILY.map((c) => {
                const done = dailyDone.has(c.kind);
                return (
                  <Link key={c.kind} href={`/retos?reto=${c.kind}`} className={cx("well rounded-2xl p-3.5 transition hover:border-white/20", done && "opacity-60")}>
                    <div className="flex items-center justify-between">
                      <c.icon size={17} className="text-ink-2" />
                      {done && (
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-good text-black">
                          <Check size={12} strokeWidth={3} />
                        </span>
                      )}
                    </div>
                    <div className="mt-2.5 text-sm font-medium">{c.label}</div>
                    <div className="text-[11px] text-ink-3">{done ? "Completado" : c.text}</div>
                  </Link>
                );
              })}
            </div>
            <p className="mt-3.5 text-xs leading-relaxed text-ink-3">Cinco minutos al día mantienen tu racha y suman experiencia.</p>
          </section>

          {/* Unirse a sala */}
          <section className="panel rounded-3xl p-5">
            <h2 className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight">
              <span className="icon-accent grid h-8 w-8 place-items-center rounded-xl">
                <Users size={16} />
              </span>
              Entrar a una sala
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-ink-3">Escribe el código que te dio tu docente o tu compañero.</p>
            <form
              className="mt-3.5 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (code.trim().length >= 4) router.push(`/salas?codigo=${encodeURIComponent(code.trim().toUpperCase())}`);
              }}
            >
              <input
                className="field num !h-11 flex-1 text-center !text-base font-semibold tracking-[0.3em] uppercase"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))}
                placeholder="CÓDIGO"
                aria-label="Código de la sala"
                autoComplete="off"
              />
              <button className="btn btn-primary btn-icon" disabled={code.trim().length < 4} aria-label="Entrar">
                <ArrowRight size={18} />
              </button>
            </form>
          </section>

        </div>
      </div>
    </div>
  );
}
