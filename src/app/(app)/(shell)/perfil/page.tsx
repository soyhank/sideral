"use client";

import { Check, Copy, Lock, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "@/components/app/AppProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Segmented } from "@/components/ui/controls";
import { PageHeader, Progress, Spinner } from "@/components/ui/display";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { INDUSTRIES, getIndustry } from "@/engine/industries";
import Link from "next/link";
import { act, ApiError } from "@/lib/api";
import { cx, int } from "@/lib/format";
import { ACHIEVEMENTS, AVATARS, AVATAR_LEVEL, leagueOf, levelProgress, titleFor } from "@/lib/gamification";
import { useAchievements, useMyGames } from "@/lib/hooks";

const TIER = { bronce: "#c98a5e", plata: "#c9d1dc", oro: "#f2c94c" };

export default function ProfilePage() {
  const { profile, userId, email, patch, refresh, signOut } = useApp();
  const { toast } = useToast();
  const { data: earned } = useAchievements(userId);
  const { data: games } = useMyGames(userId, 40);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [institution, setInstitution] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setName(profile.display_name);
    setUsername(profile.username);
    setInstitution(profile.institution ?? "");
  }, [profile]);

  if (!profile)
    return (
      <div className="grid place-items-center py-32 text-ink-3">
        <Spinner size={26} />
      </div>
    );

  const lp = levelProgress(profile.xp);
  const have = new Set((earned ?? []).map((e) => e.key));
  const played = Array.isArray(profile.stats?.industries) ? (profile.stats.industries as string[]) : [];
  const records = Object.values(
    (games ?? [])
      .filter((g) => g.status === "finalizada" && g.score !== null)
      .reduce<Record<string, { industry: string; score: number; games: number; wins: number }>>((acc, g) => {
        const r = (acc[g.industry] ??= { industry: g.industry, score: 0, games: 0, wins: 0 });
        r.score = Math.max(r.score, g.score ?? 0);
        r.games += 1;
        if (g.rank === 1) r.wins += 1;
        return acc;
      }, {}),
  ).sort((a, b) => b.score - a.score);
  const dirty = name.trim() !== profile.display_name || username.trim() !== profile.username || institution.trim() !== (profile.institution ?? "");

  const save = async (body: Record<string, unknown>, optimistic: Record<string, unknown>, ok: string) => {
    const before = { ...profile };
    patch(optimistic);
    setBusy(true);
    try {
      await act("profile.update", body);
      toast(ok);
      await refresh();
    } catch (e) {
      patch(before);
      toast(e instanceof ApiError ? e.message : "No se pudo guardar.", "error");
    }
    setBusy(false);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader eyebrow="Tu cuenta" title="Perfil" />

      <section className="glass rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-6">
          <Avatar id={profile.avatar} size={96} ring />
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-2xl font-semibold tracking-tight">{profile.display_name}</h2>
            <button
              className="num mt-0.5 inline-flex items-center gap-1.5 text-sm text-ink-3 hover:text-ink"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(profile.username);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1600);
                } catch {}
              }}
            >
              @{profile.username}
              {copied ? <Check size={13} className="text-good" /> : <Copy size={13} />}
            </button>
            <p className="mt-2 text-sm text-ink-2">
              Nivel {lp.level} · {titleFor(lp.level)} · Liga {leagueOf(profile.league).name}
            </p>
            <Progress value={lp.progress} className="mt-3 max-w-md" height={6} />
            <div className="num mt-1.5 text-[11px] text-ink-3">
              {int(profile.xp)} XP · faltan {int(lp.missing)} para el nivel {lp.level + 1}
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            { l: "Partidas", v: profile.games_played },
            { l: "Victorias", v: profile.games_won },
            { l: "Mejor puntaje", v: profile.best_score },
            { l: "Mejor racha", v: `${profile.best_streak} ${profile.best_streak === 1 ? "día" : "días"}` },
            { l: "Trimestres cerrados", v: Number(profile.stats?.rounds ?? 0) },
            { l: "Decisiones óptimas", v: Number(profile.stats?.optimal ?? 0) },
            { l: "Retos completados", v: Number(profile.stats?.dailies ?? 0) },
            { l: "Industrias jugadas", v: `${played.length} de ${INDUSTRIES.length}` },
          ].map((s) => (
            <div key={s.l} className="well rounded-2xl p-3.5">
              <div className="num text-xl font-semibold">{s.v}</div>
              <div className="text-[11px] text-ink-3">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-ink-2">Insignias</h2>
          <span className="num text-xs text-ink-3">
            {have.size} de {ACHIEVEMENTS.length}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {[...ACHIEVEMENTS]
            .sort((a, b) => Number(have.has(b.key)) - Number(have.has(a.key)))
            .map((a) => {
              const on = have.has(a.key);
              return (
                <div key={a.key} className={cx("panel rounded-2xl p-4", !on && "opacity-45")} title={a.description}>
                  <span className="grid h-11 w-11 place-items-center rounded-full ring-1" style={on ? { background: `${TIER[a.tier]}26`, borderColor: TIER[a.tier], color: TIER[a.tier], boxShadow: `inset 0 0 0 1px ${TIER[a.tier]}88` } : undefined}>
                    {on ? <Icon name={a.icon} size={19} /> : <Lock size={16} className="text-ink-3" />}
                  </span>
                  <div className="mt-3 text-[13px] leading-tight font-semibold">{a.name}</div>
                  <div className="mt-1 text-[11px] leading-snug text-ink-3">{a.description}</div>
                </div>
              );
            })}
        </div>
      </section>

      {records.length > 0 && (
        <section className="mt-6">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold text-ink-2">Mis récords por industria</h2>
            <span className="num text-xs text-ink-3">
              {played.length} de {INDUSTRIES.length} rubros
            </span>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {records.map((r) => {
              const ind = getIndustry(r.industry);
              return (
                <Link key={r.industry} href={`/jugar?industria=${r.industry}`} className="panel panel-hover flex items-center gap-3 rounded-2xl p-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/8 ring-1 ring-white/10">
                    <Icon name={ind.icon} size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{ind.short}</span>
                    <span className="num block text-[11px] text-ink-3">
                      {r.games} {r.games === 1 ? "partida" : "partidas"} · {r.wins} {r.wins === 1 ? "victoria" : "victorias"}
                    </span>
                  </span>
                  <span className="num text-lg font-semibold">{r.score}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="panel mt-6 rounded-3xl p-5 sm:p-6">
        <h2 className="text-[15px] font-semibold tracking-tight">Avatar</h2>
        <p className="mt-0.5 text-xs text-ink-3">Se desbloquean al subir de nivel.</p>
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6" role="radiogroup" aria-label="Avatar">
          {AVATARS.map((a) => {
            const locked = AVATAR_LEVEL[a] > profile.level;
            const on = profile.avatar === a;
            return (
              <button
                key={a}
                role="radio"
                aria-checked={on}
                disabled={locked || busy}
                onClick={() => !on && save({ avatar: a }, { avatar: a }, "Avatar actualizado")}
                className={cx("relative grid place-items-center rounded-2xl p-3 transition", on ? "bg-white/14 ring-1 ring-white/50" : "bg-white/4 ring-1 ring-white/8 hover:bg-white/8", locked && "cursor-not-allowed opacity-35")}
                title={locked ? `Se desbloquea en el nivel ${AVATAR_LEVEL[a]}` : a}
              >
                <Avatar id={a} size={52} />
                {locked && <span className="num mt-1.5 text-[10px] text-ink-3">Nivel {AVATAR_LEVEL[a]}</span>}
              </button>
            );
          })}
        </div>
      </section>

      <section className="panel mt-6 rounded-3xl p-5 sm:p-6">
        <h2 className="text-[15px] font-semibold tracking-tight">Datos</h2>
        <form
          className="mt-4 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            const body = { display_name: name.trim(), username: username.trim().toLowerCase(), institution: institution.trim() };
            save(body, { display_name: body.display_name, username: body.username, institution: body.institution || null }, "Datos guardados");
          }}
        >
          <div>
            <label className="label" htmlFor="p-name">
              Nombre y apellido
            </label>
            <input id="p-name" className="field" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="p-user">
              Usuario
            </label>
            <input id="p-user" className="field num" value={username} maxLength={24} autoCapitalize="none" onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_.]/g, ""))} />
          </div>
          <div>
            <label className="label" htmlFor="p-inst">
              Institución
            </label>
            <input id="p-inst" className="field" value={institution} maxLength={80} onChange={(e) => setInstitution(e.target.value)} placeholder="Instituto o universidad" />
          </div>
          <div>
            <div className="label">Correo</div>
            <div className="field flex items-center text-ink-3">{email}</div>
          </div>
          <div className="sm:col-span-2">
            <button className="btn btn-primary" disabled={!dirty || busy || name.trim().length < 2 || username.trim().length < 3}>
              {busy ? <Spinner /> : null}
              Guardar cambios
            </button>
          </div>
        </form>
      </section>

      <section className="panel mt-6 rounded-3xl p-5 sm:p-6">
        <h2 className="text-[15px] font-semibold tracking-tight">Tipo de cuenta</h2>
        <p className="mt-0.5 mb-4 text-xs leading-relaxed text-ink-3">El modo docente habilita las aulas, los torneos propios y el panel de seguimiento de estudiantes.</p>
        {profile.role === "admin" ? (
          <span className="chip chip-white">Administrador</span>
        ) : (
          <Segmented
            value={profile.role}
            onChange={(v) => v !== profile.role && save({ role: v }, { role: v }, v === "docente" ? "Modo docente activado" : "Modo estudiante activado")}
            className="max-w-sm"
            options={[
              { value: "estudiante", label: "Estudiante" },
              { value: "docente", label: "Docente" },
            ]}
          />
        )}
      </section>

      <button className="btn btn-ghost mt-6" onClick={signOut}>
        <LogOut size={16} />
        Cerrar sesión
      </button>
    </div>
  );
}
