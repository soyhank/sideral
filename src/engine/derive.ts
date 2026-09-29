import { LABOR_LOAD } from "./constants";
import { baseRevenue } from "./industries";
import type { CompanyState, IndustryDef, MarketState, ProductDef, ProductId, RegionId } from "./types";
import { CHANNEL_IDS } from "./types";

/** Magnitudes de referencia que se calculan a partir de la definición de la industria. */
export interface Derived {
  r0: number;
  mRef: number;
  /** Sueldo mensual base por trabajador. */
  baseSalary: number;
  overhead0: number;
  capacity0: number;
  outputPerWorker: number;
  capexPerUnit: number;
  qRef: number;
  eRef: number;
  trainRef: number;
  research: { forecast: number; competitors: number; consumer: number };
  launchCost: Record<ProductId, number>;
  /** Efecto de marketing de una empresa con presupuesto base y mezcla pareja. */
  mBase: number;
}

const cache = new Map<string, Derived>();

export function derive(ind: IndustryDef): Derived {
  const hit = cache.get(ind.id);
  if (hit) return hit;
  const r0 = baseRevenue(ind);
  const capacity0 = Math.ceil(ind.products[0].units * 1.25);
  const mRef = ind.shares.marketing * r0;
  const baseSalary = (ind.shares.labor * r0) / (ind.headcount * 3 * (1 + LABOR_LOAD));
  const d: Derived = {
    r0,
    mRef,
    baseSalary,
    overhead0: ind.shares.overhead * r0,
    capacity0,
    outputPerWorker: capacity0 / ind.headcount,
    capexPerUnit: (ind.assetIntensity * r0) / capacity0,
    qRef: 0.02 * r0,
    eRef: 0.03 * r0,
    trainRef: baseSalary * 0.1,
    research: { forecast: 0.006 * r0, competitors: 0.008 * r0, consumer: 0.01 * r0 },
    launchCost: { p1: 0, p2: 0.12 * r0, p3: 0.15 * r0 },
    mBase: 0,
  };
  d.mBase = channelEffect(ind, mRef, { digital: 25, masivo: 25, btl: 25, directa: 25 }, mRef);
  cache.set(ind.id, d);
  return d;
}

/** Efecto del presupuesto según la mezcla de canales, con rendimientos decrecientes por canal. */
export function channelEffect(
  ind: IndustryDef,
  budget: number,
  weights: Record<string, number>,
  ref: number,
): number {
  const total = CHANNEL_IDS.reduce((s, c) => s + Math.max(0, weights[c] ?? 0), 0) || 1;
  const sat = ref * 0.5;
  let eff = 0;
  for (const c of CHANNEL_IDS) {
    const b = (budget * Math.max(0, weights[c] ?? 0)) / total;
    eff += ind.channels[c] * sat * Math.log(1 + b / sat);
  }
  return eff;
}

/** Tamaño relativo de cada línea respecto de la primera (por ingresos). */
export function productScale(ind: IndustryDef, p: ProductDef): number {
  return (p.price * p.units) / baseRevenue(ind);
}

export function refPrice(p: ProductDef, market: MarketState): number {
  return p.price * Math.pow(market.costIndex, 0.8);
}

export function fxFactor(ind: IndustryDef, market: MarketState): number {
  return 1 + ind.fxExposure * (market.fx / market.fx0 - 1);
}

export function activeRegions(c: CompanyState): RegionId[] {
  return (Object.keys(c.regions) as RegionId[]).filter((r) => c.regions[r]);
}

export function activeProducts(c: CompanyState): ProductId[] {
  return (Object.keys(c.products) as ProductId[]).filter((p) => c.products[p].active);
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
export const r2 = (v: number) => Math.round(v * 100) / 100;
export const r4 = (v: number) => Math.round(v * 10000) / 10000;
export const quarterRate = (annual: number) => Math.pow(1 + annual, 0.25) - 1;
