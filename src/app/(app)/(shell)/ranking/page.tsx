"use client";

import { Crown, Flame, Swords } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/components/app/AppProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Segmented } from "@/components/ui/controls";
import { Empty, PageHeader } from "@/components/ui/display";
import { cx, int } from "@/lib/format";
import { LEAGUES, leagueOf, titleFor } from "@/lib/gamification";
import { useLeaderboard, type BoardKind } from "@/lib/hooks";

export default function RankingPage() {
  const { userId, profile } = useApp();
  const [kind, setKind] = useState<BoardKind>("semana");
  const { data, isLoading } = useLeaderboard(kind, profile?.week_key ?? null);
  const value = (p: { weekly_xp: number; xp: number; best_score: number }) => (kind === "semana" ? p.weekly_xp : kind === "total" ? p.xp : p.best_score);
  const unit = kind === "puntaje" ? "pts" : "XP";
  const mine = data?.findIndex((p) => p.id === userId) ?? -1;
  const league = leagueOf(profile?.league ?? 1);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Comunidad" title="Ranking" text="La tabla semanal se reinicia cada lunes. Con 400 XP en la semana subes de liga." />

      <section className="panel mb-6 rounded-3xl p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="eyebrow">Tu liga</div>
            <div className="mt-1 text-lg font-semibold">{league.name}</div>
          </div>
          <div className="flex items-center gap-1.5">
            {LEAGUES.map((l) => (
              <span
                key={l.id}
                title={l.name}
                className={cx("grid place-items-center rounded-full transition", l.id === league.id ? "h-9 w-9 ring-2 ring-white/70" : "h-6 w-6 opacity-40")}
                style={{ background: `radial-gradient(circle at 30% 30%, #fff8, transparent 60%), ${l.color}` }}
              />
            ))}
          </div>
        </div>
      </section>

      <Segmented
        value={kind}
        onChange={setKind}
        className="mb-4"
        options={[
          { value: "semana", label: "Esta semana" },
          { value: "total", label: "Histórico" },
          { value: "puntaje", label: "Mejor puntaje" },
        ]}
      />

      {isLoading && !data ? (
        <div className="space-y-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton h-16 !rounded-2xl" />
          ))}
        </div>
      ) : !data?.length ? (
        <Empty title={kind === "semana" ? "Nadie ha sumado experiencia esta semana" : "Todavía no hay datos"} text="Juega una partida o completa un reto y serás el primero de la tabla." />
      ) : (
        <ol className="panel divide-y divide-white/6 overflow-hidden rounded-3xl">
          {data.map((p, i) => (
            <li key={p.id} className={cx("flex items-center gap-3.5 px-4 py-3 sm:px-5", p.id === userId && "bg-white/8")}>
              <span className={cx("num grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold", i === 0 ? "bg-white text-black" : i < 3 ? "bg-white/16" : "text-ink-3")}>
                {i === 0 ? <Crown size={15} /> : i + 1}
              </span>
              <Avatar id={p.avatar} size={38} ring={p.id === userId} />
              <div className="min-w-0 flex-1">
                <div className={cx("truncate text-sm", p.id === userId ? "font-semibold" : "font-medium")}>
                  {p.display_name}
                  {p.id === userId && " (tú)"}
                </div>
                <div className="flex items-center gap-2 truncate text-[11px] text-ink-3">
                  <span>
                    Nivel {p.level} · {titleFor(p.level)}
                  </span>
                  {p.streak >= 3 && (
                    <span className="inline-flex items-center gap-0.5">
                      <Flame size={11} className="text-amber" />
                      {p.streak}
                    </span>
                  )}
                  {p.institution && <span className="hidden truncate sm:inline">· {p.institution}</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="num text-base font-semibold">{int(value(p))}</div>
                <div className="text-[10.5px] text-ink-3">{unit}</div>
              </div>
              {p.id !== userId && (
                <Link href={`/duelos?rival=${p.username}`} className="btn btn-ghost btn-icon btn-sm shrink-0" aria-label={`Retar a ${p.display_name}`} title="Retar a duelo">
                  <Swords size={15} />
                </Link>
              )}
            </li>
          ))}
        </ol>
      )}
      {data && data.length > 0 && mine < 0 && profile && (
        <p className="mt-4 text-center text-xs text-ink-3">
          {kind === "semana" ? "Aún no sumas experiencia esta semana." : "Todavía no apareces entre los 50 primeros."} Tienes {int(value(profile))} {unit}.
        </p>
      )}
    </div>
  );
}
