"use client";

import { ArrowLeft, ArrowRight, CalendarClock, Clock, Crown, Medal } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { useApp } from "@/components/app/AppProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Empty, Spinner } from "@/components/ui/display";
import { IndustryTile } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { DIFFICULTY_NAMES } from "@/engine/constants";
import { getIndustry } from "@/engine/industries";
import { act, ApiError } from "@/lib/api";
import { cx, remaining } from "@/lib/format";
import { minutesPerRound } from "@/lib/gamification";
import { useNow, type Tournament } from "@/lib/hooks";
import { supabase } from "@/lib/supabase/client";

interface Entry {
  user_id: string;
  game_id: string | null;
  score: number;
  finished: boolean;
  finished_at: string | null;
  profiles: { display_name: string; avatar: string; level: number; institution: string | null } | null;
}

export default function TournamentPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { userId } = useApp();
  const { toast } = useToast();
  const [busy, setBusy] = useState(false);
  const now = useNow();
  const { data, error } = useSWR(userId ? ["tournament", id] : null, async () => {
    const sb = supabase();
    const [{ data: t }, { data: entries }] = await Promise.all([
      sb.from("tournaments").select("*").eq("id", id).maybeSingle(),
      sb
        .from("tournament_entries")
        .select("user_id, game_id, score, finished, finished_at, profiles(display_name, avatar, level, institution)")
        .eq("tournament_id", id)
        .order("score", { ascending: false })
        .limit(100),
    ]);
    if (!t) throw new Error("Ese torneo no existe o no tienes acceso.");
    return { t: t as Tournament & { config: { modules?: string[] } }, entries: (entries as unknown as Entry[]) ?? [] };
  });

  if (error)
    return (
      <div className="mx-auto max-w-xl py-12">
        <Empty title="No pudimos abrir el torneo" text={error instanceof Error ? error.message : ""} action={<Link href="/torneos" className="btn btn-primary">Volver a torneos</Link>} />
      </div>
    );
  if (!data)
    return (
      <div className="grid place-items-center py-32 text-ink-3">
        <Spinner size={26} />
      </div>
    );

  const { t, entries } = data;
  const ind = getIndustry(t.industry);
  const open = new Date(t.ends_at).getTime() > now;
  const mine = entries.find((e) => e.user_id === userId);
  const board = entries.filter((e) => e.finished);
  const playing = entries.filter((e) => !e.finished).length;
  const minutes = Math.round((t.rounds * minutesPerRound(t.config.modules?.length ?? 9)) / 5) * 5;

  const play = async () => {
    if (busy) return;
    if (mine?.game_id) return router.push(`/partida/${mine.game_id}`);
    setBusy(true);
    try {
      const res = await act<{ id: string }>("game.create", { mode: "torneo", tournamentId: t.id });
      router.push(`/partida/${res.id}`);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo entrar al torneo.", "error");
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/torneos" className="btn btn-quiet btn-sm mb-4 !px-2">
        <ArrowLeft size={15} />
        Torneos
      </Link>

      <section className="glass rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-wrap items-start gap-5">
          <IndustryTile id={ind.id} box={64} size={28} radius={22} solid />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-1.5">
              {t.official && <span className="chip chip-white">Oficial</span>}
              <span className={cx("chip", open ? "chip-good" : "")}>
                <CalendarClock size={12} />
                {remaining(t.ends_at)}
              </span>
            </div>
            <h1 className="display mt-2 text-4xl sm:text-5xl">{t.name}</h1>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{t.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              <span className="chip">{ind.name}</span>
              <span className="chip">{DIFFICULTY_NAMES[t.difficulty]}</span>
              <span className="chip">{t.rounds} trimestres</span>
              <span className="chip">
                <Clock size={12} />
                {minutes} min aprox.
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {mine?.finished ? (
            <div className="flex items-center gap-3">
              <span className="num display text-5xl">{mine.score}</span>
              <span className="text-sm text-ink-3">
                tu puntaje
                <br />
                puesto {board.findIndex((e) => e.user_id === userId) + 1} de {board.length}
              </span>
            </div>
          ) : open ? (
            <button className="btn btn-primary btn-lg" onClick={play} disabled={busy}>
              {busy ? <Spinner /> : null}
              {mine ? "Continuar mi partida" : "Participar"}
              {!busy && <ArrowRight size={18} />}
            </button>
          ) : (
            <span className="text-sm text-ink-3">El torneo terminó.</span>
          )}
          {mine?.finished && mine.game_id && (
            <Link href={`/partida/${mine.game_id}`} className="btn btn-ghost">
              Ver mis reportes
            </Link>
          )}
          <p className="min-w-0 flex-1 text-xs leading-relaxed text-ink-3">Solo tienes un intento. Puedes pausar y continuar mientras el torneo siga abierto.</p>
        </div>
      </section>

      <section className="panel mt-6 overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
            <Medal size={17} />
            Tabla de posiciones
          </h2>
          <span className="num text-xs text-ink-3">
            {board.length} {board.length === 1 ? "terminó" : "terminaron"}
            {playing > 0 && ` · ${playing} en juego`}
          </span>
        </div>
        {board.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-ink-3">Nadie ha terminado todavía. El primer puesto está libre.</p>
        ) : (
          <ol className="divide-y divide-white/6">
            {board.map((e, i) => (
              <li key={e.user_id} className={cx("flex items-center gap-3.5 px-5 py-3", e.user_id === userId && "bg-white/6")}>
                <span className={cx("num grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold", i === 0 ? "bg-white text-black" : i < 3 ? "bg-white/16" : "bg-white/6 text-ink-3")}>
                  {i === 0 ? <Crown size={15} /> : i + 1}
                </span>
                <Avatar id={e.profiles?.avatar ?? "orbita"} size={34} />
                <div className="min-w-0 flex-1">
                  <div className={cx("truncate text-sm", e.user_id === userId ? "font-semibold" : "font-medium")}>
                    {e.profiles?.display_name ?? "Participante"}
                    {e.user_id === userId && " (tú)"}
                  </div>
                  <div className="truncate text-[11px] text-ink-3">
                    Nivel {e.profiles?.level ?? 1}
                    {e.profiles?.institution ? ` · ${e.profiles.institution}` : ""}
                  </div>
                </div>
                <span className="num text-base font-semibold">{e.score}</span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
