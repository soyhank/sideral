"use client";

import useSWR from "swr";
import type { RoundResult } from "@/engine/types";
import type { CompanyRow, DecisionRow, GameRow } from "@/lib/game/types";
import { supabase } from "@/lib/supabase/client";

export interface TeamMember {
  user_id: string;
  role: string;
  display_name: string;
  avatar: string;
}

export interface GameData {
  game: GameRow;
  company: CompanyRow | null;
  /** Posición de mi empresa dentro del mercado. -1 si solo observo (docente). */
  idx: number;
  isHost: boolean;
  lastResult: RoundResult | null;
  decision: DecisionRow | null;
  team: TeamMember[];
}

export async function fetchGame(gameId: string, userId: string): Promise<GameData> {
  const sb = supabase();
  const [g, m, r] = await Promise.all([
    sb.from("games").select("*").eq("id", gameId).maybeSingle(),
    sb.from("company_members").select("company_id, role, companies(*)").eq("game_id", gameId).eq("user_id", userId).maybeSingle(),
    sb.from("rounds").select("round, result").eq("game_id", gameId).order("round", { ascending: false }).limit(1),
  ]);
  if (g.error) throw g.error;
  if (!g.data) throw new Error("No encontramos esa partida o no participas en ella.");
  const game = g.data as GameRow;
  const company = (m.data?.companies as unknown as CompanyRow | null) ?? null;
  let decision: DecisionRow | null = null;
  let team: TeamMember[] = [];
  if (company) {
    const [d, t] = await Promise.all([
      sb.from("decisions").select("*").eq("company_id", company.id).eq("round", game.round).maybeSingle(),
      game.mode === "sala"
        ? sb.from("company_members").select("user_id, role, profiles(display_name, avatar)").eq("company_id", company.id)
        : Promise.resolve({ data: [] as unknown[] }),
    ]);
    decision = (d.data as DecisionRow) ?? null;
    team = ((t.data as unknown as { user_id: string; role: string; profiles: { display_name: string; avatar: string } | null }[]) ?? []).map((x) => ({
      user_id: x.user_id,
      role: x.role,
      display_name: x.profiles?.display_name ?? "Integrante",
      avatar: x.profiles?.avatar ?? "orbita",
    }));
  }
  return {
    game,
    company,
    idx: company?.idx ?? -1,
    isHost: game.host_id === userId,
    lastResult: (r.data?.[0]?.result as RoundResult) ?? null,
    decision,
    team,
  };
}

export function useGame(gameId: string, userId: string | null) {
  return useSWR(userId ? ["game", gameId, userId] : null, () => fetchGame(gameId, userId!), {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });
}

export async function fetchRound(gameId: string, round: number): Promise<RoundResult | null> {
  const { data } = await supabase().from("rounds").select("result").eq("game_id", gameId).eq("round", round).maybeSingle();
  return (data?.result as RoundResult) ?? null;
}

const key = (gameId: string, round: number) => `sideral:borrador:${gameId}:${round}`;

export function loadDraft<T>(gameId: string, round: number): T | null {
  try {
    const raw = localStorage.getItem(key(gameId, round));
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function saveDraft(gameId: string, round: number, value: unknown) {
  try {
    localStorage.setItem(key(gameId, round), JSON.stringify(value));
  } catch {
    // Sin espacio o en modo privado: el borrador vive solo en memoria.
  }
}

export function clearDraft(gameId: string, round: number) {
  try {
    localStorage.removeItem(key(gameId, round));
    // Limpia borradores viejos de la misma partida.
    for (let r = 1; r < round; r++) localStorage.removeItem(key(gameId, r));
  } catch {}
}
