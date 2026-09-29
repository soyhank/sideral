import type { Decisions, GameState, Intel, ModuleId, RoundResult } from "@/engine/types";
import type { AchievementDef } from "@/lib/gamification";
import type { MissionOutcome } from "@/lib/missions";

export type GameMode = "libre" | "carrera" | "sala" | "torneo" | "duelo";
export type GameStatus = "lobby" | "activa" | "finalizada" | "cancelada";

export interface GameConfig {
  modules: ModuleId[];
  size: number;
  missionId?: string;
  tournamentId?: string;
  duelId?: string;
  /** Salas */
  teamMode?: "individual" | "equipos";
  teamSize?: number;
  timerMinutes?: number;
  autoAdvance?: boolean;
  hostPlays?: boolean;
  marketSize?: number;
}

export interface HistoryCell {
  i: number;
  rev: number;
  net: number;
  cash: number;
  od: number;
  share: number;
  score: number;
  price: number;
  units: number;
  rank: number;
  brand: number;
  quality: number;
  morale: number;
  sat: number;
  rep: number;
  tsr: number;
}

export interface HistoryRow {
  r: number;
  c: HistoryCell[];
}

export interface BoardRow {
  company: string;
  name: string;
  color: string;
  market: number;
  game: string;
  members: string[];
  score: number;
  tsr: number;
  net: number;
  rank: number;
  bot: boolean;
}

export interface GameRow {
  id: string;
  code: string | null;
  name: string;
  mode: GameMode;
  status: GameStatus;
  host_id: string;
  classroom_id: string | null;
  industry: string;
  difficulty: 1 | 2 | 3 | 4;
  total_rounds: number;
  round: number;
  config: GameConfig;
  state: GameState | null;
  history: HistoryRow[];
  deadline: string | null;
  parent_id: string | null;
  market: number;
  board: BoardRow[];
  created_at: string;
  updated_at: string;
  finished_at: string | null;
}

export interface CompanyRow {
  id: string;
  game_id: string;
  idx: number | null;
  name: string;
  color: string;
}

export interface MemberRow {
  company_id: string;
  game_id: string;
  user_id: string;
  role: "lider" | "miembro";
}

export interface DecisionRow {
  company_id: string;
  game_id: string;
  round: number;
  data: Partial<Decisions>;
  forecast: { revenue: number; net: number; units: number } | null;
  intel: Intel | null;
  submitted: boolean;
  submitted_by: string | null;
  submitted_at: string | null;
  updated_by: string | null;
  updated_at: string;
}

export interface RewardItem {
  label: string;
  xp: number;
}

export interface Rewards {
  xp: number;
  items: RewardItem[];
  level: number;
  levelUp: boolean;
  totalXp: number;
  streak: number;
  achievements: AchievementDef[];
  mission: (MissionOutcome & { id: string; title: string; newStars: number }) | null;
  final: { rank: number; score: number; companies: number } | null;
}

export interface RoundResponse {
  ok: true;
  result: RoundResult;
  state: GameState;
  history: HistoryRow[];
  status: GameStatus;
  rewards: Rewards | null;
  intel: Intel | null;
}

export interface Profile {
  id: string;
  username: string;
  display_name: string;
  avatar: string;
  role: "estudiante" | "docente" | "admin";
  institution: string | null;
  xp: number;
  level: number;
  streak: number;
  best_streak: number;
  last_active: string | null;
  week_key: string | null;
  weekly_xp: number;
  league: number;
  games_played: number;
  games_won: number;
  best_score: number;
  onboarded: boolean;
  stats: Record<string, unknown>;
  created_at: string;
}

export class ActionError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}
