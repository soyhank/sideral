import "server-only";

import { INDUSTRIES, getIndustry } from "@/engine/industries";
import type { CompanyResult, GameState } from "@/engine/types";
import { ACHIEVEMENTS, ACHIEVEMENT_BY_KEY, finishXp, roundXp, type AchievementDef } from "@/lib/gamification";
import { MISSIONS, MISSION_BY_ID, evaluateMission, type FinalStats, type MissionOutcome } from "@/lib/missions";
import { adminClient } from "@/lib/supabase/server";
import type { GameRow, HistoryRow, Rewards } from "./types";

export interface XpEvent {
  amount: number;
  reason: string;
  ref: string;
  meta?: unknown;
  /** Texto que verá la persona. */
  label: string;
}

interface Rule {
  key: string;
  source: "stat" | "list" | "streak" | "level" | "missions";
  name?: string;
  min: number;
}

/** Insignias que dependen de contadores acumulados. Se evalúan dentro de la base de datos. */
const RULES: Rule[] = [
  { key: "criterio-5", source: "stat", name: "optimal", min: 5 },
  { key: "criterio-25", source: "stat", name: "optimal", min: 25 },
  { key: "retos-10", source: "stat", name: "dailies", min: 10 },
  { key: "industrias-5", source: "list", name: "industries", min: 5 },
  { key: "industrias-todas", source: "list", name: "industries", min: INDUSTRIES.length },
  { key: "racha-3", source: "streak", min: 3 },
  { key: "racha-7", source: "streak", min: 7 },
  { key: "racha-30", source: "streak", min: 30 },
  { key: "nivel-10", source: "level", min: 10 },
  { key: "nivel-20", source: "level", min: 20 },
  { key: "carrera-completa", source: "missions", min: MISSIONS.length },
];

const ACH_XP = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.key, a.xp]));

interface RewardResult {
  ok: boolean;
  granted: { ref: string; reason: string; amount: number }[];
  total: number;
  xp: number;
  level: number;
  levelBefore: number;
  streak: number;
  league: number;
  achievements: string[];
  stats: Record<string, unknown>;
  mission: { prevStars: number; newStars: number } | null;
}

export interface RewardInput {
  events: XpEvent[];
  keys?: string[];
  counters?: Record<string, number>;
  sets?: Record<string, string>;
  finish?: { won: boolean; score: number } | null;
  mission?: { id: string; stars: number; score: number; passed: boolean } | null;
  /** Reglas adicionales que dependen de contadores (por ejemplo, ganar en ambos mercados). */
  rules?: Rule[];
}

export interface RewardOutput {
  xp: number;
  items: { label: string; xp: number }[];
  level: number;
  levelUp: boolean;
  totalXp: number;
  streak: number;
  achievements: AchievementDef[];
  mission: { prevStars: number; newStars: number } | null;
}

/** Registra en una sola llamada todo lo que gana una persona. */
export async function reward(userId: string, input: RewardInput): Promise<RewardOutput> {
  const { data, error } = await adminClient().rpc("reward", {
    p_user: userId,
    p_events: input.events.map((e) => ({ amount: Math.max(0, Math.round(e.amount)), reason: e.reason, ref: e.ref, meta: e.meta ?? null })),
    p_keys: [...new Set(input.keys ?? [])].filter((k) => ACHIEVEMENT_BY_KEY.has(k)),
    p_rules: [...RULES, ...(input.rules ?? [])],
    p_ach_xp: ACH_XP,
    p_counters: input.counters ?? {},
    p_sets: input.sets ?? {},
    p_finish: input.finish ?? null,
    p_mission: input.mission ?? null,
  });
  const r = data as RewardResult | null;
  if (error || !r?.ok) {
    console.error("reward", error);
    return { xp: 0, items: [], level: 1, levelUp: false, totalXp: 0, streak: 0, achievements: [], mission: null };
  }
  const labels = new Map(input.events.map((e) => [e.ref, e.label]));
  const items = r.granted.map((g) => ({
    label: labels.get(g.ref) ?? (g.reason === "mision" ? `${r.mission?.newStars === 1 ? "1 estrella nueva" : `${r.mission?.newStars} estrellas nuevas`} en la misión` : g.reason),
    xp: g.amount,
  }));
  const achievements = r.achievements.map((k) => ACHIEVEMENT_BY_KEY.get(k)).filter((a): a is AchievementDef => !!a);
  for (const a of achievements) if (a.xp > 0) items.push({ label: `Insignia: ${a.name}`, xp: a.xp });
  return {
    xp: r.total,
    items,
    level: r.level,
    levelUp: r.level > r.levelBefore,
    totalXp: r.xp,
    streak: r.streak,
    achievements,
    mission: r.mission,
  };
}

export async function notify(userId: string, kind: string, title: string, body: string | null, link: string | null) {
  await adminClient().from("notifications").insert({ user_id: userId, kind, title, body, link });
}

export function finalStats(state: GameState, idx: number, last: CompanyResult, history: HistoryRow[]): FinalStats {
  const c = state.companies[idx];
  const cells = history.map((h) => h.c.find((x) => x.i === idx)).filter(Boolean);
  return {
    score: last.score,
    rank: last.rank,
    share: last.share,
    profit: c.cumProfit,
    cash: c.cash - c.overdraft,
    morale: c.morale,
    quality: c.quality,
    satisfaction: c.satisfaction,
    reputation: c.reputation,
    brand: c.brand,
    tsr: last.ratios.tsr,
    overdrafts: cells.filter((x) => (x?.od ?? 0) > 0).length,
    rescues: c.rescues,
    regions: Object.values(c.regions).filter(Boolean).length,
    products: Object.values(c.products).filter((p) => p.active).length,
  };
}

/** Calcula y registra lo que gana una persona al cerrar un trimestre y, si fue el último, la partida. */
export async function rewardRound(opts: {
  userId: string;
  game: GameRow;
  state: GameState;
  history: HistoryRow[];
  idx: number;
  result: CompanyResult;
  round: number;
  finished: boolean;
  forecast: { revenue: number } | null;
  dividends: number;
  leader: boolean;
  wonRoom?: boolean;
}): Promise<Rewards> {
  const { userId, game, state, idx, result, round, finished } = opts;
  const ind = getIndustry(game.industry);
  const c = state.companies[idx];
  const events: XpEvent[] = [];
  const keys: string[] = ["primer-trimestre"];
  const counters: Record<string, number> = { rounds: 1 };
  const rules: Rule[] = [];

  events.push({
    amount: roundXp({ score: result.score, profit: result.income.net, verdict: result.dilemma?.verdict ?? null, difficulty: game.difficulty }),
    reason: "trimestre",
    ref: `round:${game.id}:${round}`,
    meta: { score: result.score },
    label: `Cierre del trimestre ${round}`,
  });
  if (result.dilemma?.verdict === "optima") counters.optimal = 1;

  if (opts.forecast && result.income.revenue > 0) {
    const err = Math.abs(opts.forecast.revenue - result.income.revenue) / result.income.revenue;
    if (err < 0.05) {
      keys.push("pronostico");
      counters.forecasts = 1;
      events.push({ amount: 8, reason: "pronostico", ref: `forecast:${game.id}:${round}`, label: "Pronóstico certero" });
    }
  }

  if (result.income.net > 0) keys.push("utilidad-positiva");
  if (result.income.net > 0 && c.rescues > 0) keys.push("ave-fenix");
  if (opts.leader && state.companies.length > 1) keys.push("lider-mercado");
  if (c.brand >= 80) keys.push("marca-80");
  if (c.quality >= 85) keys.push("calidad-85");
  if (c.morale >= 85) keys.push("clima-85");
  if (Object.values(c.regions).every(Boolean)) keys.push("expansion-total");
  if (Object.values(c.products).every((p) => p.active)) keys.push("portafolio");
  if (opts.dividends > 0) keys.push("dividendos");

  let outcome: MissionOutcome | null = null;
  let mission: RewardInput["mission"] = null;
  let finish: RewardInput["finish"] = null;
  let final: Rewards["final"] = null;
  const m = game.config.missionId ? MISSION_BY_ID.get(game.config.missionId) : undefined;

  if (finished) {
    const fs = finalStats(state, idx, result, opts.history);
    const won = result.rank === 1;
    events.push({
      amount: finishXp({ score: result.score, rank: result.rank, companies: state.companies.length, rounds: game.total_rounds, difficulty: game.difficulty }),
      reason: "partida",
      ref: `finish:${game.id}`,
      meta: { score: result.score, rank: result.rank },
      label: won ? "Partida terminada en primer lugar" : "Partida terminada",
    });
    final = { rank: result.rank, score: result.score, companies: state.companies.length };
    finish = { won, score: result.score };
    counters.games = 1;
    if (won) counters[ind.kind === "B2B" ? "winsB2B" : "winsB2C"] = 1;

    keys.push("primera-partida");
    if (won) keys.push("campeon");
    if (won && game.difficulty >= 3) keys.push("campeon-experto");
    if (fs.overdrafts === 0 && fs.rescues === 0) keys.push("caja-sana");
    if (c.reputation >= 90) keys.push("reputacion-90");
    if (result.score >= 700) keys.push("puntaje-700");
    if (result.score >= 850) keys.push("puntaje-850");
    if (opts.wonRoom) keys.push("sala-ganada");
    // Ganar en ambos mercados: basta con que el contador del otro mercado ya sea mayor que cero.
    if (won) rules.push({ key: "b2b-b2c", source: "stat", name: ind.kind === "B2B" ? "winsB2C" : "winsB2B", min: 1 });

    if (m) {
      outcome = evaluateMission(m, fs);
      mission = { id: m.id, stars: outcome.stars, score: result.score, passed: outcome.passed };
      if (outcome.stars === 3) keys.push("tres-estrellas");
    }
  }

  const out = await reward(userId, { events, keys, counters, sets: { industries: game.industry }, finish, mission, rules });
  return {
    xp: out.xp,
    items: out.items,
    level: out.level,
    levelUp: out.levelUp,
    totalXp: out.totalXp,
    streak: out.streak,
    achievements: out.achievements,
    mission: outcome && m ? { ...outcome, id: m.id, title: m.title, newStars: out.mission?.newStars ?? 0 } : null,
    final,
  };
}
