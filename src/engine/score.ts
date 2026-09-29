import { DEPRECIATION_Q } from "./constants";
import { clamp } from "./derive";
import type { CompanyState, IndustryDef, Scorecard } from "./types";

const lin = (v: number, lo: number, hi: number) => clamp((v - lo) / (hi - lo), 0, 1);

/** Margen neto que se espera de una empresa promedio del rubro. */
export function expectedMargin(ind: IndustryDef): number {
  const p = ind.products[0];
  const ebit =
    1 - p.costPct - ind.shares.labor - ind.shares.overhead - ind.shares.marketing - DEPRECIATION_Q * ind.assetIntensity - 0.015;
  return Math.max(0.02, ebit * 0.62);
}

export interface ScoreInputs {
  tsr: number;
  roe: number;
  currentRatio: number;
  share: number;
  companies: number;
  utilization: number;
  fillRate: number;
  /** Trimestres jugados. */
  rounds: number;
}

export function scorecard(c: CompanyState, ind: IndustryDef, x: ScoreInputs): Scorecard {
  const margin = c.cumRevenue > 0 ? c.cumProfit / c.cumRevenue : 0;
  // El retorno se anualiza para que partidas cortas y largas sean comparables.
  const annual = Math.pow(Math.max(0.01, 1 + x.tsr), 4 / Math.max(4, x.rounds)) - 1;
  const finance =
    40 * lin(annual, -0.3, 1.2) +
    25 * lin(x.roe, -0.1, 0.4) +
    20 * lin(margin / expectedMargin(ind), -0.5, 1.5) +
    15 * (c.overdraft > 0 ? 0 : lin(x.currentRatio, 0.5, 1.5));
  const customers = 45 * lin(x.share * x.companies, 0.4, 1.8) + 25 * lin(c.brand, 20, 80) + 30 * lin(c.satisfaction, 20, 90);
  const u = x.utilization;
  const useScore = u < 0.85 ? lin(u, 0.3, 0.85) : u <= 1.02 ? 1 : 1 - lin(u, 1.02, 1.2) * 0.6;
  const processes = 30 * useScore + 30 * lin(c.quality, 30, 85) + 25 * lin(x.fillRate, 0.7, 1) + 15 * lin(c.efficiency, 0, 0.15);
  const people = 40 * lin(c.morale, 30, 85) + 25 * lin(c.skill, 0, 0.2) + 35 * lin(c.reputation, 40, 90);
  const total = clamp((0.4 * finance + 0.25 * customers + 0.2 * processes + 0.15 * people) * 10 - 80 * c.rescues, 0, 1000);
  return {
    finance: Math.round(finance),
    customers: Math.round(customers),
    processes: Math.round(processes),
    people: Math.round(people),
    total: Math.round(total),
  };
}
