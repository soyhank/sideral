"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { act } from "@/lib/api";
import type { GameConfig, GameMode, GameStatus, Profile } from "@/lib/game/types";
import { supabase } from "@/lib/supabase/client";

export interface GameSummary {
  id: string;
  code: string | null;
  name: string;
  mode: GameMode;
  status: GameStatus;
  industry: string;
  difficulty: number;
  total_rounds: number;
  round: number;
  config: GameConfig;
  host_id: string;
  parent_id: string | null;
  updated_at: string;
  finished_at: string | null;
  company: string;
  score: number | null;
  rank: number | null;
}

const GAME_FIELDS = "id, code, name, mode, status, industry, difficulty, total_rounds, round, config, host_id, parent_id, updated_at, finished_at, history";

/** Hora actual como estado, para no leer el reloj durante el dibujado. */
export function useNow(everyMs = 60000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), everyMs);
    return () => clearInterval(t);
  }, [everyMs]);
  return now;
}

export function limaToday(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Lima", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

/** Partidas en las que participo, las más recientes primero. */
export function useMyGames(userId: string | null, limit = 12) {
  return useSWR(userId ? ["my-games", userId, limit] : null, async () => {
    const { data, error } = await supabase()
      .from("company_members")
      .select(`company_id, companies(name, idx), games!inner(${GAME_FIELDS})`)
      .eq("user_id", userId!)
      .order("updated_at", { referencedTable: "games", ascending: false })
      .limit(40);
    if (error) throw error;
    type Row = { companies: { name: string; idx: number | null } | null; games: Omit<GameSummary, "company" | "score" | "rank"> & { history: { r: number; c: { i: number; score: number; rank: number }[] }[] } };
    const list = ((data as unknown as Row[]) ?? [])
      .filter((r) => r.games)
      .map((r) => {
        const last = r.games.history?.at(-1)?.c.find((c) => c.i === r.companies?.idx);
        const { history: _h, ...g } = r.games;
        void _h;
        return { ...g, company: r.companies?.name ?? "", score: last?.score ?? null, rank: last?.rank ?? null } as GameSummary;
      })
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    return list.slice(0, limit);
  });
}

/** Salas que dirijo como docente o anfitrión. */
export function useHostedRooms(userId: string | null) {
  return useSWR(userId ? ["hosted", userId] : null, async () => {
    const { data, error } = await supabase()
      .from("games")
      .select("id, code, name, status, industry, difficulty, total_rounds, round, config, updated_at, board")
      .eq("host_id", userId!)
      .eq("mode", "sala")
      .is("parent_id", null)
      .order("updated_at", { ascending: false })
      .limit(20);
    if (error) throw error;
    return data ?? [];
  });
}

export interface MissionRow {
  mission_id: string;
  stars: number;
  best_score: number;
  attempts: number;
  completed_at: string | null;
}

export function useMissions(userId: string | null) {
  return useSWR(userId ? ["missions", userId] : null, async () => {
    const { data, error } = await supabase().from("missions").select("mission_id, stars, best_score, attempts, completed_at").eq("user_id", userId!);
    if (error) throw error;
    return (data as MissionRow[]) ?? [];
  });
}

export function useAchievements(userId: string | null) {
  return useSWR(userId ? ["achievements", userId] : null, async () => {
    const { data, error } = await supabase().from("achievements").select("key, earned_at").eq("user_id", userId!).order("earned_at", { ascending: false });
    if (error) throw error;
    return (data as { key: string; earned_at: string }[]) ?? [];
  });
}

export function useDailyDone(userId: string | null) {
  const day = limaToday();
  return useSWR(userId ? ["daily-done", userId, day] : null, async () => {
    const { data, error } = await supabase().from("daily").select("kind, score").eq("user_id", userId!).eq("day", day);
    if (error) throw error;
    return (data as { kind: string; score: number }[]) ?? [];
  });
}

export type BoardKind = "semana" | "total" | "puntaje";

export function useLeaderboard(kind: BoardKind, weekKey: string | null) {
  return useSWR(["leaderboard", kind, weekKey], async () => {
    let q = supabase().from("profiles").select("id, username, display_name, avatar, xp, level, weekly_xp, week_key, league, best_score, games_won, streak, institution").limit(50);
    if (kind === "semana") q = q.eq("week_key", weekKey ?? "").gt("weekly_xp", 0).order("weekly_xp", { ascending: false });
    else if (kind === "total") q = q.gt("xp", 0).order("xp", { ascending: false });
    else q = q.gt("best_score", 0).order("best_score", { ascending: false });
    const { data, error } = await q;
    if (error) throw error;
    return (data as Profile[]) ?? [];
  });
}

export interface Tournament {
  id: string;
  name: string;
  description: string | null;
  industry: string;
  difficulty: number;
  rounds: number;
  official: boolean;
  classroom_id: string | null;
  starts_at: string;
  ends_at: string;
  created_by: string | null;
}

export function useTournaments(userId: string | null) {
  return useSWR(userId ? ["tournaments", userId] : null, async () => {
    await act("tournament.weekly").catch(() => null);
    const sb = supabase();
    const [{ data: list }, { data: entries }] = await Promise.all([
      sb.from("tournaments").select("*").order("ends_at", { ascending: false }).limit(30),
      sb.from("tournament_entries").select("tournament_id, game_id, score, finished").eq("user_id", userId!),
    ]);
    return { list: (list as Tournament[]) ?? [], entries: (entries as { tournament_id: string; game_id: string | null; score: number; finished: boolean }[]) ?? [] };
  });
}

export interface Classroom {
  id: string;
  code: string;
  name: string;
  teacher_id: string;
  institution: string | null;
  created_at: string;
}

export function useClassrooms(userId: string | null) {
  return useSWR(userId ? ["classrooms", userId] : null, async () => {
    const sb = supabase();
    const [{ data: all }, { data: counts }] = await Promise.all([
      sb.from("classrooms").select("*").order("created_at", { ascending: false }),
      sb.from("classroom_members").select("classroom_id, user_id"),
    ]);
    return ((all as Classroom[]) ?? []).map((c) => ({ ...c, students: (counts ?? []).filter((m) => m.classroom_id === c.id).length, mine: c.teacher_id === userId }));
  });
}

export const MODE_LABEL: Record<GameMode, string> = {
  libre: "Simulación libre",
  carrera: "Carrera",
  sala: "Sala",
  torneo: "Torneo",
  duelo: "Duelo",
};
