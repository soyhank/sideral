import "server-only";

import { randomInt } from "node:crypto";
import { COMPANY_COLORS } from "@/engine/constants";
import { INDUSTRIES, getIndustry } from "@/engine/industries";
import { processRound, publicDilemma, publicNews } from "@/engine/round";
import { allModules, createGame } from "@/engine/setup";
import type { CompanyResult, Decisions, GameState, IndustryId, Intel, ModuleId, RoundResult, RoundScript } from "@/engine/types";
import { MODULE_IDS } from "@/engine/types";
import { MISSIONS, MISSION_BY_ID, WORLDS } from "@/lib/missions";
import { adminClient } from "@/lib/supabase/server";
import { notify, reward, rewardRound } from "./rewards";
import { drawScript, intelFor } from "./script";
import {
  ActionError,
  type BoardRow,
  type CompanyRow,
  type DecisionRow,
  type GameConfig,
  type GameRow,
  type HistoryRow,
  type MemberRow,
  type Rewards,
  type RoundResponse,
} from "./types";

const db = () => adminClient();

export const newSeed = () => randomInt(1, 2_000_000_000);

const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function newCode(length = 6): string {
  let out = "";
  for (let i = 0; i < length; i++) out += CODE_CHARS[randomInt(0, CODE_CHARS.length)];
  return out;
}

export function cleanName(v: unknown, fallback: string, max = 32): string {
  const s = String(v ?? "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
  return s.length >= 2 ? s : fallback;
}

export function cleanModules(v: unknown): ModuleId[] {
  if (!Array.isArray(v)) return allModules();
  return MODULE_IDS.filter((m) => v.includes(m));
}

const isIndustry = (v: unknown): v is IndustryId => INDUSTRIES.some((i) => i.id === v);
const clampInt = (v: unknown, lo: number, hi: number, fallback: number) => {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : fallback;
};

export function historyRow(result: RoundResult): HistoryRow {
  return {
    r: result.round,
    c: result.companies.map((c) => ({
      i: c.idx,
      rev: Math.round(c.income.revenue),
      net: Math.round(c.income.net),
      cash: Math.round(c.balance.cash - c.balance.overdraft),
      od: Math.round(c.balance.overdraft),
      share: c.share,
      score: c.score,
      price: c.sharePrice,
      units: c.units,
      rank: c.rank,
      brand: Math.round(c.brand),
      quality: Math.round(c.quality),
      morale: Math.round(c.morale),
      sat: Math.round(c.satisfaction),
      rep: Math.round(c.reputation),
      tsr: c.ratios.tsr,
    })),
  };
}

function withCurrent(state: GameState, script: RoundScript[]): GameState {
  const next = script[state.round - 1];
  state.current = state.finished || !next ? { news: null, dilemma: null } : { news: publicNews(next.news), dilemma: publicDilemma(next.dilemma) };
  return state;
}

// ---------------------------------------------------------------------------
// Partidas individuales: libre, carrera, torneo y duelo
// ---------------------------------------------------------------------------

export interface NewSoloInput {
  mode: "libre" | "carrera" | "torneo" | "duelo";
  industry?: string;
  difficulty?: number;
  rounds?: number;
  size?: number;
  modules?: string[];
  company?: string;
  missionId?: string;
  tournamentId?: string;
  duelId?: string;
}

export async function createSolo(userId: string, input: NewSoloInput): Promise<{ id: string }> {
  const { data: profile } = await db().from("profiles").select("display_name").eq("id", userId).single();
  if (!profile) throw new ActionError("No encontramos tu perfil.", 404);

  let industry: IndustryId;
  let difficulty: 1 | 2 | 3 | 4;
  let rounds: number;
  let size: number;
  let modules: ModuleId[];
  let seed = newSeed();
  let name: string;
  const config: GameConfig = { modules: [], size: 4 };

  if (input.mode === "carrera") {
    const m = input.missionId ? MISSION_BY_ID.get(input.missionId) : undefined;
    if (!m) throw new ActionError("Esa misión no existe.");
    const { count } = await db().from("missions").select("mission_id", { count: "exact", head: true }).eq("user_id", userId).gt("stars", 0);
    const world = WORLDS.find((w) => w.id === m.world)!;
    if ((count ?? 0) < world.unlock) throw new ActionError(`Completa ${world.unlock} misiones para abrir este mundo.`);
    const previous = MISSIONS.filter((x) => x.order < m.order).length;
    if (previous > (count ?? 0) + 1) throw new ActionError("Primero supera las misiones anteriores.");
    industry = m.industry;
    difficulty = m.difficulty;
    rounds = m.rounds;
    size = m.size;
    modules = m.modules;
    name = m.title;
    config.missionId = m.id;
  } else if (input.mode === "torneo") {
    const { data: t } = await db().from("tournaments").select("*").eq("id", input.tournamentId ?? "").maybeSingle();
    if (!t) throw new ActionError("Ese torneo no existe.", 404);
    const now = Date.now();
    if (now < new Date(t.starts_at).getTime()) throw new ActionError("El torneo todavía no empieza.");
    if (now > new Date(t.ends_at).getTime()) throw new ActionError("El torneo ya terminó.");
    const { data: entry } = await db().from("tournament_entries").select("*").eq("tournament_id", t.id).eq("user_id", userId).maybeSingle();
    if (entry?.game_id) return { id: entry.game_id };
    industry = t.industry;
    difficulty = t.difficulty;
    rounds = t.rounds;
    size = t.config?.size ?? 5;
    modules = cleanModules(t.config?.modules);
    seed = t.seed;
    name = t.name;
    config.tournamentId = t.id;
  } else if (input.mode === "duelo") {
    const { data: duel } = await db().from("duels").select("*").eq("id", input.duelId ?? "").maybeSingle();
    if (!duel || (duel.challenger !== userId && duel.opponent !== userId)) throw new ActionError("Ese duelo no existe.", 404);
    if (duel.status === "rechazado" || duel.status === "vencido" || duel.status === "finalizado") throw new ActionError("Ese duelo ya no está disponible.");
    const mine = duel.challenger === userId ? duel.challenger_game : duel.opponent_game;
    if (mine) return { id: mine };
    industry = duel.industry;
    difficulty = duel.difficulty;
    rounds = duel.rounds;
    size = 4;
    modules = allModules();
    seed = duel.seed;
    name = "Duelo";
    config.duelId = duel.id;
  } else {
    if (!isIndustry(input.industry)) throw new ActionError("Elige una industria.");
    industry = input.industry;
    difficulty = clampInt(input.difficulty, 1, 4, 2) as 1 | 2 | 3 | 4;
    rounds = clampInt(input.rounds, 4, 12, 8);
    size = clampInt(input.size, 3, 6, 5);
    modules = cleanModules(input.modules);
    name = getIndustry(industry).name;
  }

  config.modules = modules;
  config.size = size;
  const companyName = cleanName(input.company, `Empresa de ${profile.display_name.split(" ")[0]}`);
  const state = createGame({ industry, seed, totalRounds: rounds, difficulty, modules, humans: [{ name: companyName }], size });
  const script = drawScript({ industry, rounds, difficulty, seed, situations: modules.includes("situaciones") });
  withCurrent(state, script);

  const { data: game, error } = await db()
    .from("games")
    .insert({ name, mode: input.mode, status: "activa", host_id: userId, industry, difficulty, total_rounds: rounds, round: 1, config, state })
    .select("id")
    .single();
  if (error || !game) throw new ActionError("No se pudo crear la partida.", 500);

  const { data: company } = await db()
    .from("companies")
    .insert({ game_id: game.id, idx: 0, name: companyName, color: COMPANY_COLORS[0] })
    .select("id")
    .single();
  await Promise.all([
    db().from("game_secrets").insert({ game_id: game.id, script }),
    db().from("company_members").insert({ company_id: company!.id, game_id: game.id, user_id: userId, role: "lider" }),
    input.mode === "torneo"
      ? db().from("tournament_entries").upsert({ tournament_id: config.tournamentId, user_id: userId, game_id: game.id }, { onConflict: "tournament_id,user_id" })
      : null,
    input.mode === "duelo" ? linkDuelGame(config.duelId!, userId, game.id) : null,
  ]);
  return { id: game.id };
}

async function linkDuelGame(duelId: string, userId: string, gameId: string) {
  const { data: duel } = await db().from("duels").select("*").eq("id", duelId).single();
  if (!duel) return;
  const patch: Record<string, unknown> = { status: "en_juego" };
  if (duel.challenger === userId) patch.challenger_game = gameId;
  else patch.opponent_game = gameId;
  await db().from("duels").update(patch).eq("id", duelId);
}

interface Loaded {
  game: GameRow;
  script: RoundScript[];
  companies: CompanyRow[];
  members: MemberRow[];
}

async function loadGame(gameId: string): Promise<Loaded> {
  const [g, s, c, m] = await Promise.all([
    db().from("games").select("*").eq("id", gameId).maybeSingle(),
    db().from("game_secrets").select("script").eq("game_id", gameId).maybeSingle(),
    db().from("companies").select("*").eq("game_id", gameId),
    db().from("company_members").select("*").eq("game_id", gameId),
  ]);
  if (!g.data) throw new ActionError("Esa partida no existe.", 404);
  return {
    game: g.data as GameRow,
    script: (s.data?.script as RoundScript[]) ?? [],
    companies: (c.data as CompanyRow[]) ?? [],
    members: (m.data as MemberRow[]) ?? [],
  };
}

interface Processed {
  state: GameState;
  result: RoundResult;
  history: HistoryRow[];
  finished: boolean;
  committed: boolean;
}

/** Ejecuta el motor y guarda el trimestre. Devuelve committed=false si otro proceso se adelantó. */
async function runAndCommit(
  loaded: Loaded,
  inputs: (Decisions | null)[],
  deadline: string | null,
): Promise<Processed> {
  const { game, script, companies } = loaded;
  const state = game.state!;
  const round = state.round;
  const out = processRound(state, inputs, script[round - 1] ?? null);
  withCurrent(out.state, script);
  const row = historyRow(out.result);
  const finished = out.state.finished;

  const intel: { company_id: string; intel: Intel }[] = [];
  if (!finished)
    for (const c of companies) {
      if (c.idx === null) continue;
      const last = out.state.companies[c.idx]?.last;
      if (last?.research.forecast) intel.push({ company_id: c.id, intel: intelFor(script[round]) });
    }

  const { data: ok, error } = await db().rpc("commit_round", {
    p_game: game.id,
    p_round: round,
    p_state: out.state,
    p_result: out.result,
    p_history: [row],
    p_finished: finished,
    p_deadline: finished ? null : deadline,
    p_intel: intel,
  });
  if (error) throw new ActionError("No se pudo guardar el trimestre.", 500);
  return { state: out.state, result: out.result, history: [...game.history, row], finished, committed: ok === true };
}

export async function playSoloRound(
  userId: string,
  gameId: string,
  body: { round: number; decisions: Decisions; forecast?: { revenue: number; net: number; units: number } | null },
): Promise<RoundResponse | { ok: false; stale: true }> {
  const loaded = await loadGame(gameId);
  const { game, members, companies } = loaded;
  if (game.mode === "sala") throw new ActionError("Las salas se cierran desde el panel de la sala.");
  const member = members.find((m) => m.user_id === userId);
  if (!member) throw new ActionError("No participas en esta partida.", 403);
  if (game.status !== "activa" || !game.state) throw new ActionError("Esta partida ya terminó.");
  if (body.round !== game.round) return { ok: false, stale: true };
  const company = companies.find((c) => c.id === member.company_id);
  const idx = company?.idx ?? 0;

  const inputs = game.state.companies.map((_, i) => (i === idx ? body.decisions : null));
  const done = await runAndCommit(loaded, inputs, null);
  if (!done.committed) return { ok: false, stale: true };

  const mine = done.result.companies[idx];
  const leader = mine.share >= Math.max(...done.result.companies.map((c) => c.share)) - 1e-9;
  const rewards = await rewardRound({
    userId,
    game,
    state: done.state,
    history: done.history,
    idx,
    result: mine,
    round: body.round,
    finished: done.finished,
    forecast: body.forecast ?? null,
    dividends: -mine.cashflow.dividends,
    leader,
  });

  if (done.finished) await closeSoloExtras(userId, game, mine);

  const lastDec = done.state.companies[idx].last;
  const intel = !done.finished && lastDec?.research.forecast ? intelFor(loaded.script[body.round]) : null;
  return {
    ok: true,
    result: done.result,
    state: done.state,
    history: done.history,
    status: done.finished ? "finalizada" : "activa",
    rewards,
    intel,
  };
}

/** Al terminar una partida de torneo o duelo, registra el puntaje y resuelve el enfrentamiento. */
async function closeSoloExtras(userId: string, game: GameRow, mine: CompanyResult) {
  if (game.config.tournamentId) {
    await db()
      .from("tournament_entries")
      .update({ score: mine.score, finished: true, finished_at: new Date().toISOString() })
      .eq("tournament_id", game.config.tournamentId)
      .eq("user_id", userId);
    const { data: top } = await db()
      .from("tournament_entries")
      .select("user_id, score")
      .eq("tournament_id", game.config.tournamentId)
      .eq("finished", true)
      .order("score", { ascending: false })
      .limit(3);
    const { count } = await db()
      .from("tournament_entries")
      .select("user_id", { count: "exact", head: true })
      .eq("tournament_id", game.config.tournamentId)
      .eq("finished", true);
    if ((count ?? 0) >= 4 && top?.some((t) => t.user_id === userId)) await reward(userId, { events: [], keys: ["torneo-podio"] });
  }
  if (game.config.duelId) {
    const { data: duel } = await db().from("duels").select("*").eq("id", game.config.duelId).single();
    if (!duel) return;
    const isChallenger = duel.challenger === userId;
    const patch: Record<string, unknown> = isChallenger ? { challenger_score: mine.score } : { opponent_score: mine.score };
    const other = isChallenger ? duel.opponent_score : duel.challenger_score;
    const rival = isChallenger ? duel.opponent : duel.challenger;
    if (other !== null && other !== undefined) {
      const winner = mine.score === other ? null : mine.score > other ? userId : rival;
      patch.status = "finalizado";
      patch.winner = winner;
      if (winner)
        await reward(winner, { events: [{ amount: 80, reason: "duelo", ref: `duel:${duel.id}`, label: "Duelo ganado" }], keys: ["duelo-ganado"], counters: { duels: 1 } });
      await notify(rival, "duelo", "Tu duelo terminó", winner === rival ? "Ganaste el duelo." : winner ? "Esta vez ganó tu rival." : "Empate.", "/duelos");
    } else {
      await notify(rival, "duelo", "Tu rival ya terminó su partida", `Hizo ${mine.score} puntos. Te toca.`, "/duelos");
    }
    await db().from("duels").update(patch).eq("id", duel.id);
  }
}

export async function abandonGame(userId: string, gameId: string) {
  const { data: game } = await db().from("games").select("id, host_id, mode, status").eq("id", gameId).maybeSingle();
  if (!game || game.host_id !== userId) throw new ActionError("No puedes cerrar esta partida.", 403);
  if (game.status === "finalizada") return { ok: true };
  await db().from("games").update({ status: "cancelada", updated_at: new Date().toISOString() }).eq("id", gameId);
  if (game.mode === "sala") await db().from("games").update({ status: "cancelada" }).eq("parent_id", gameId);
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Salas: competencia entre personas, en uno o varios mercados paralelos
// ---------------------------------------------------------------------------

export interface NewRoomInput {
  name?: string;
  industry?: string;
  difficulty?: number;
  rounds?: number;
  modules?: string[];
  teamMode?: string;
  teamSize?: number;
  timerMinutes?: number;
  autoAdvance?: boolean;
  hostPlays?: boolean;
  company?: string;
  classroomId?: string | null;
}

export async function createRoom(userId: string, input: NewRoomInput): Promise<{ id: string; code: string }> {
  if (!isIndustry(input.industry)) throw new ActionError("Elige una industria.");
  const { data: profile } = await db().from("profiles").select("display_name").eq("id", userId).single();
  if (!profile) throw new ActionError("No encontramos tu perfil.", 404);
  const config: GameConfig = {
    modules: cleanModules(input.modules),
    size: 5,
    teamMode: input.teamMode === "equipos" ? "equipos" : "individual",
    teamSize: clampInt(input.teamSize, 2, 6, 4),
    timerMinutes: clampInt(input.timerMinutes, 0, 10080, 0),
    autoAdvance: input.autoAdvance !== false,
    hostPlays: Boolean(input.hostPlays),
    marketSize: 6,
  };
  let classroomId: string | null = null;
  if (input.classroomId) {
    const { data: cls } = await db().from("classrooms").select("id, teacher_id").eq("id", input.classroomId).maybeSingle();
    if (cls?.teacher_id === userId) classroomId = cls.id;
  }
  let game: { id: string; code: string } | null = null;
  for (let attempt = 0; attempt < 5 && !game; attempt++) {
    const { data } = await db()
      .from("games")
      .insert({
        code: newCode(),
        name: cleanName(input.name, `Sala de ${profile.display_name.split(" ")[0]}`, 48),
        mode: "sala",
        status: "lobby",
        host_id: userId,
        classroom_id: classroomId,
        industry: input.industry,
        difficulty: clampInt(input.difficulty, 1, 4, 2),
        total_rounds: clampInt(input.rounds, 3, 12, 6),
        round: 1,
        config,
      })
      .select("id, code")
      .single();
    game = data;
  }
  if (!game) throw new ActionError("No se pudo crear la sala.", 500);
  if (config.hostPlays) await joinRoom(userId, game.code, { company: input.company });
  return game;
}

export async function joinRoom(
  userId: string,
  code: string,
  input: { company?: string; companyId?: string },
): Promise<{ id: string; code: string; companyId: string }> {
  const clean = String(code ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const { data: game } = await db().from("games").select("*").eq("code", clean).is("parent_id", null).maybeSingle();
  if (!game) throw new ActionError("No existe una sala con ese código.", 404);
  const { data: related } = await db().from("games").select("id").or(`id.eq.${game.id},parent_id.eq.${game.id}`);
  const { data: existing } = await db()
    .from("company_members")
    .select("company_id")
    .eq("user_id", userId)
    .in("game_id", (related ?? []).map((g) => g.id));
  if (existing?.length) return { id: game.id, code: clean, companyId: existing[0].company_id };
  if (game.status !== "lobby") throw new ActionError("Esta sala ya empezó y no admite nuevos participantes.");

  const { data: profile } = await db().from("profiles").select("display_name").eq("id", userId).single();
  const cfg = game.config as GameConfig;
  const [{ data: companies }, { data: members }] = await Promise.all([
    db().from("companies").select("*").eq("game_id", game.id),
    db().from("company_members").select("*").eq("game_id", game.id),
  ]);

  if (cfg.teamMode === "equipos" && input.companyId) {
    const team = companies?.find((c) => c.id === input.companyId);
    if (!team) throw new ActionError("Ese equipo ya no existe.");
    const size = members?.filter((m) => m.company_id === team.id).length ?? 0;
    if (size >= (cfg.teamSize ?? 4)) throw new ActionError("Ese equipo ya está completo.");
    const { error } = await db().from("company_members").insert({ company_id: team.id, game_id: game.id, user_id: userId, role: "miembro" });
    if (error) throw new ActionError("No se pudo unir al equipo.");
    await broadcast(game.id, "lobby", {});
    return { id: game.id, code: clean, companyId: team.id };
  }

  if ((companies?.length ?? 0) >= 60) throw new ActionError("La sala está llena.");
  const fallback = cfg.teamMode === "equipos" ? `Equipo ${(companies?.length ?? 0) + 1}` : `Empresa de ${profile?.display_name.split(" ")[0] ?? "gerente"}`;
  let name = cleanName(input.company, fallback);
  const taken = new Set((companies ?? []).map((c) => c.name.toLowerCase()));
  if (taken.has(name.toLowerCase())) name = `${name.slice(0, 28)} ${(companies?.length ?? 0) + 1}`;
  const { data: company, error } = await db()
    .from("companies")
    .insert({ game_id: game.id, idx: null, name, color: COMPANY_COLORS[(companies?.length ?? 0) % COMPANY_COLORS.length] })
    .select("id")
    .single();
  if (error || !company) throw new ActionError("No se pudo crear tu empresa.");
  const { error: e2 } = await db().from("company_members").insert({ company_id: company.id, game_id: game.id, user_id: userId, role: "lider" });
  if (e2) {
    await db().from("companies").delete().eq("id", company.id);
    throw new ActionError("No se pudo unir a la sala.");
  }
  await broadcast(game.id, "lobby", {});
  return { id: game.id, code: clean, companyId: company.id };
}

export async function leaveRoom(userId: string, roomId: string) {
  const { data: game } = await db().from("games").select("id, status").eq("id", roomId).maybeSingle();
  if (!game || game.status !== "lobby") throw new ActionError("Solo puedes salir antes de que empiece la sala.");
  const { data: mine } = await db().from("company_members").select("company_id").eq("game_id", roomId).eq("user_id", userId).maybeSingle();
  if (!mine) return { ok: true };
  await db().from("company_members").delete().eq("game_id", roomId).eq("user_id", userId);
  const { count } = await db().from("company_members").select("user_id", { count: "exact", head: true }).eq("company_id", mine.company_id);
  if (!count) await db().from("companies").delete().eq("id", mine.company_id);
  await broadcast(roomId, "lobby", {});
  return { ok: true };
}

export async function renameCompany(userId: string, roomId: string, name: string) {
  const { data: game } = await db().from("games").select("id, status").eq("id", roomId).maybeSingle();
  if (!game || game.status !== "lobby") throw new ActionError("El nombre solo se cambia antes de empezar.");
  const { data: mine } = await db().from("company_members").select("company_id").eq("game_id", roomId).eq("user_id", userId).maybeSingle();
  if (!mine) throw new ActionError("No participas en esta sala.", 403);
  await db().from("companies").update({ name: cleanName(name, "Mi empresa") }).eq("id", mine.company_id);
  await broadcast(roomId, "lobby", {});
  return { ok: true };
}

/** Reparte las empresas en mercados de tamaño parejo. */
function splitMarkets<T>(items: T[], max: number): T[][] {
  if (items.length <= max) return [items];
  const count = Math.ceil(items.length / max);
  const out: T[][] = Array.from({ length: count }, () => []);
  items.forEach((item, i) => out[i % count].push(item));
  return out;
}

export async function startRoom(userId: string, roomId: string): Promise<{ ok: true }> {
  const { data: game } = await db().from("games").select("*").eq("id", roomId).maybeSingle();
  if (!game || game.host_id !== userId) throw new ActionError("Solo quien creó la sala puede iniciarla.", 403);
  if (game.status !== "lobby") throw new ActionError("La sala ya empezó.");
  const room = game as GameRow;
  const { data: companies } = await db().from("companies").select("*").eq("game_id", roomId).order("created_at");
  if (!companies?.length) throw new ActionError("Todavía no hay participantes.");

  const seed = newSeed();
  const script = drawScript({
    industry: room.industry as IndustryId,
    rounds: room.total_rounds,
    difficulty: room.difficulty,
    seed,
    situations: room.config.modules.includes("situaciones"),
  });
  const markets = splitMarkets(companies as CompanyRow[], room.config.marketSize ?? 6);
  const deadline = room.config.timerMinutes ? new Date(Date.now() + room.config.timerMinutes * 60_000).toISOString() : null;

  for (let m = 0; m < markets.length; m++) {
    const group = markets[m];
    const size = Math.max(4, group.length);
    const state = createGame({
      industry: room.industry as IndustryId,
      seed,
      totalRounds: room.total_rounds,
      difficulty: room.difficulty,
      modules: room.config.modules,
      humans: group.map((c) => ({ name: c.name })),
      size,
    });
    withCurrent(state, script);
    let gameId = roomId;
    if (m === 0) {
      const { data: updated } = await db()
        .from("games")
        .update({ status: "activa", state, deadline, market: 1, updated_at: new Date().toISOString(), config: { ...room.config, size } })
        .eq("id", roomId)
        .eq("status", "lobby")
        .select("id");
      if (!updated?.length) throw new ActionError("La sala ya empezó.");
    } else {
      const { data: child } = await db()
        .from("games")
        .insert({
          name: room.name,
          mode: "sala",
          status: "activa",
          host_id: room.host_id,
          classroom_id: room.classroom_id,
          industry: room.industry,
          difficulty: room.difficulty,
          total_rounds: room.total_rounds,
          round: 1,
          config: { ...room.config, size },
          state,
          deadline,
          parent_id: roomId,
          market: m + 1,
        })
        .select("id")
        .single();
      gameId = child!.id;
    }
    await db().from("game_secrets").upsert({ game_id: gameId, script }, { onConflict: "game_id" });
    for (let i = 0; i < group.length; i++) {
      await db().from("companies").update({ idx: i, game_id: gameId, color: state.companies[i].color }).eq("id", group[i].id);
      if (gameId !== roomId) await db().from("company_members").update({ game_id: gameId }).eq("company_id", group[i].id);
    }
  }
  await refreshBoard(roomId);
  await broadcast(roomId, "started", {});
  return { ok: true };
}

async function roomGames(roomId: string): Promise<GameRow[]> {
  const { data } = await db().from("games").select("*").or(`id.eq.${roomId},parent_id.eq.${roomId}`).order("market");
  return (data as GameRow[]) ?? [];
}

/** Tabla general de la sala: todas las empresas de todos los mercados, ordenadas por puntaje. */
export async function refreshBoard(roomId: string): Promise<BoardRow[]> {
  const games = await roomGames(roomId);
  const ids = games.map((g) => g.id);
  const [{ data: companies }, { data: members }] = await Promise.all([
    db().from("companies").select("*").in("game_id", ids),
    db().from("company_members").select("company_id, user_id, profiles(display_name)").in("game_id", ids),
  ]);
  const rows: BoardRow[] = [];
  for (const g of games) {
    if (!g.state) continue;
    const lastRow = g.history.at(-1);
    for (const c of g.state.companies) {
      const row = (companies as CompanyRow[] | null)?.find((x) => x.game_id === g.id && x.idx === c.idx);
      const cell = lastRow?.c.find((x) => x.i === c.idx);
      rows.push({
        company: row?.id ?? `${g.id}:${c.idx}`,
        name: c.name,
        color: c.color,
        market: g.market,
        game: g.id,
        members: ((members as unknown as { company_id: string; profiles: { display_name: string } | null }[] | null) ?? [])
          .filter((m) => m.company_id === row?.id)
          .map((m) => m.profiles?.display_name ?? ""),
        score: cell?.score ?? 0,
        tsr: cell?.tsr ?? 0,
        net: c.cumProfit,
        rank: 0,
        bot: c.isBot,
      });
    }
  }
  rows.sort((a, b) => b.score - a.score || b.net - a.net);
  rows.forEach((r, i) => (r.rank = i + 1));
  await db().from("games").update({ board: rows }).in("id", ids);
  return rows;
}

export async function broadcast(roomId: string, event: string, payload: Record<string, unknown>) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/realtime/v1/api/broadcast`, {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SECRET_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SECRET_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: [{ topic: `room:${roomId}`, event, payload }] }),
      signal: AbortSignal.timeout(4000),
    });
  } catch {
    // El aviso en vivo es un extra: los clientes también consultan cada cierto tiempo.
  }
}

/**
 * Cierra el trimestre de toda la sala. Lo puede pedir quien la creó en cualquier momento.
 * Un participante solo lo logra si venció el plazo o si todos ya enviaron sus decisiones.
 */
export async function closeRoomRound(
  userId: string,
  roomId: string,
  opts: { force?: boolean } = {},
): Promise<{ ok: true; processed: boolean; finished: boolean; reason?: string }> {
  const games = await roomGames(roomId);
  const root = games.find((g) => g.id === roomId);
  if (!root) throw new ActionError("Esa sala no existe.", 404);
  if (root.status !== "activa") return { ok: true, processed: false, finished: root.status === "finalizada", reason: "La sala no está en juego." };
  const ids = games.map((g) => g.id);
  const round = root.round;
  const [{ data: companies }, { data: members }, { data: decisions }, { data: secrets }] = await Promise.all([
    db().from("companies").select("*").in("game_id", ids),
    db().from("company_members").select("*").in("game_id", ids),
    db().from("decisions").select("*").in("game_id", ids).eq("round", round),
    db().from("game_secrets").select("game_id, script").in("game_id", ids),
  ]);
  const isHost = root.host_id === userId;
  const isMember = (members as MemberRow[] | null)?.some((m) => m.user_id === userId);
  if (!isHost && !isMember) throw new ActionError("No participas en esta sala.", 403);

  const humanCompanies = ((companies as CompanyRow[] | null) ?? []).filter((c) => c.idx !== null);
  const rows = (decisions as DecisionRow[] | null) ?? [];
  const allSubmitted = humanCompanies.every((c) => rows.some((d) => d.company_id === c.id && d.submitted));
  const expired = root.deadline !== null && Date.now() >= new Date(root.deadline).getTime();
  const allowed = (isHost && opts.force) || expired || (allSubmitted && root.config.autoAdvance !== false);
  if (!allowed) return { ok: true, processed: false, finished: false, reason: "Todavía faltan decisiones y el plazo sigue abierto." };

  const deadline = root.config.timerMinutes ? new Date(Date.now() + root.config.timerMinutes * 60_000).toISOString() : null;
  const outcomes: { game: GameRow; done: Processed }[] = [];
  for (const game of games) {
    if (game.status !== "activa" || !game.state || game.round !== round) continue;
    const mine = humanCompanies.filter((c) => c.game_id === game.id);
    const inputs = game.state.companies.map((co) => {
      const row = mine.find((c) => c.idx === co.idx);
      if (!row) return null;
      const dec = rows.find((d) => d.company_id === row.id);
      // Sin decisiones guardadas, la empresa repite su jugada anterior.
      if (!dec || !dec.data || !Object.keys(dec.data).length) return co.last ?? ({} as Decisions);
      return dec.data as Decisions;
    });
    const script = (secrets?.find((s) => s.game_id === game.id)?.script as RoundScript[]) ?? [];
    const done = await runAndCommit(
      { game, script, companies: mine, members: ((members as MemberRow[] | null) ?? []).filter((m) => m.game_id === game.id) },
      inputs,
      deadline,
    );
    if (done.committed) outcomes.push({ game, done });
  }
  if (!outcomes.length) return { ok: true, processed: false, finished: false, reason: "El trimestre ya se había cerrado." };

  const board = await refreshBoard(roomId);
  const finished = outcomes.every((o) => o.done.finished);
  const champion = finished ? board.find((b) => !b.bot) : undefined;

  const pending: Promise<unknown>[] = [];
  for (const { game, done } of outcomes) {
    const mine = humanCompanies.filter((c) => c.game_id === game.id);
    const top = Math.max(...done.result.companies.map((c) => c.share));
    for (const company of mine) {
      const res = done.result.companies[company.idx!];
      const dec = rows.find((d) => d.company_id === company.id);
      const team = ((members as MemberRow[] | null) ?? []).filter((m) => m.company_id === company.id);
      for (const member of team)
        pending.push(
          rewardRound({
            userId: member.user_id,
            game,
            state: done.state,
            history: done.history,
            idx: company.idx!,
            result: res,
            round,
            finished: done.finished,
            forecast: dec?.forecast ?? null,
            dividends: -res.cashflow.dividends,
            leader: res.share >= top - 1e-9,
            wonRoom: finished && champion?.company === company.id && board.filter((b) => !b.bot).length > 1,
          }),
        );
    }
  }
  await Promise.all(pending);
  await broadcast(roomId, finished ? "finished" : "round", { round: round + 1 });
  return { ok: true, processed: true, finished };
}

/** Recompensas del último trimestre para mostrarlas a quien vuelve a entrar a la sala. */
export async function roundRewards(userId: string, gameId: string, round: number): Promise<Rewards | null> {
  const refs = [`round:${gameId}:${round}`, `forecast:${gameId}:${round}`, `finish:${gameId}`];
  const { data } = await db().from("xp_events").select("amount, reason, ref").eq("user_id", userId).in("ref", refs);
  if (!data?.length) return null;
  const { data: profile } = await db().from("profiles").select("xp, level, streak").eq("id", userId).single();
  const labels: Record<string, string> = { trimestre: `Cierre del trimestre ${round}`, pronostico: "Pronóstico certero", partida: "Partida terminada" };
  const items = data.map((e) => ({ label: labels[e.reason] ?? e.reason, xp: e.amount }));
  return {
    xp: items.reduce((s, i) => s + i.xp, 0),
    items,
    level: profile?.level ?? 1,
    levelUp: false,
    totalXp: profile?.xp ?? 0,
    streak: profile?.streak ?? 0,
    achievements: [],
    mission: null,
    final: null,
  };
}

/** Ficha de una sala a partir de su código. Mientras está en espera, cualquiera con el código puede verla. */
export async function roomPeek(userId: string, code: string) {
  const clean = String(code ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const { data: game } = await db().from("games").select("id").eq("code", clean).is("parent_id", null).maybeSingle();
  if (!game) throw new ActionError("No existe una sala con ese código.", 404);
  return roomStatus(userId, game.id, true);
}

/** Estado de la sala: quién ya envió sus decisiones y cuánto falta para el cierre. */
export async function roomStatus(userId: string, roomId: string, open = false) {
  const games = await roomGames(roomId);
  const root = games.find((g) => g.id === roomId);
  if (!root) throw new ActionError("Esa sala no existe.", 404);
  const ids = games.map((g) => g.id);
  const [{ data: companies }, { data: members }, { data: decisions }] = await Promise.all([
    db().from("companies").select("*").in("game_id", ids).order("created_at"),
    db().from("company_members").select("company_id, user_id, role, game_id, profiles(display_name, avatar)").in("game_id", ids),
    db().from("decisions").select("company_id, submitted, updated_at").in("game_id", ids).eq("round", root.round),
  ]);
  type M = { company_id: string; user_id: string; role: string; game_id: string; profiles: { display_name: string; avatar: string } | null };
  const list = (members as unknown as M[] | null) ?? [];
  const inside = root.host_id === userId || list.some((m) => m.user_id === userId);
  if (!inside && !(open && root.status === "lobby"))
    throw new ActionError(open ? "Esta sala ya empezó y no admite nuevos participantes." : "No participas en esta sala.", 403);
  const mine = list.find((m) => m.user_id === userId);
  return {
    id: root.id,
    code: root.code,
    name: root.name,
    status: root.status,
    round: root.round,
    totalRounds: root.total_rounds,
    deadline: root.deadline,
    industry: root.industry,
    difficulty: root.difficulty,
    config: root.config,
    hostId: root.host_id,
    markets: games.length,
    myGame: mine?.game_id ?? null,
    myCompany: mine?.company_id ?? null,
    companies: ((companies as CompanyRow[] | null) ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      color: c.color,
      game: c.game_id,
      market: games.find((g) => g.id === c.game_id)?.market ?? 1,
      submitted: Boolean(decisions?.some((d) => d.company_id === c.id && d.submitted)),
      members: list
        .filter((m) => m.company_id === c.id)
        .map((m) => ({ id: m.user_id, name: m.profiles?.display_name ?? "Integrante", avatar: m.profiles?.avatar ?? "orbita", role: m.role })),
    })),
    board: root.board,
  };
}
