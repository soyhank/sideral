"use client";

import { createContext, useContext } from "react";
import type { Derived } from "@/engine/derive";
import type { CompanyResult, CompanyState, Decisions, GameState, IndustryDef, Intel, ModuleId, RoundResult } from "@/engine/types";
import type { GameRow, HistoryRow } from "@/lib/game/types";
import type { TeamMember } from "./useGame";

export interface GameContext {
  game: GameRow;
  state: GameState;
  ind: IndustryDef;
  d: Derived;
  /** Empresa que estoy viendo (la mía, o la elegida si soy observador). */
  idx: number;
  me: CompanyState;
  /** Verdadero si no puedo decidir: observo, la partida terminó o ya envié. */
  readOnly: boolean;
  spectator: boolean;
  isHost: boolean;
  result: RoundResult | null;
  mine: CompanyResult | null;
  history: HistoryRow[];
  draft: Decisions;
  update: (fn: (d: Decisions) => void) => void;
  projection: CompanyResult | null;
  intel: Intel | null;
  has: (m: ModuleId) => boolean;
  team: TeamMember[];
  submitted: boolean;
}

const Ctx = createContext<GameContext | null>(null);

export const GameProvider = Ctx.Provider;

export function useGameCtx(): GameContext {
  const v = useContext(Ctx);
  if (!v) throw new Error("useGameCtx fuera de una partida");
  return v;
}
