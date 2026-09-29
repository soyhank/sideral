import { BASE_RATE, COMPANY_COLORS, IGV, IR_GENERAL } from "./constants";
import { clamp, derive, productScale, r2, refPrice } from "./derive";
import { getIndustry, hasInventory } from "./industries";
import { makeRng, hashSeed, shuffle } from "./rng";
import { expectedMargin } from "./score";
import type {
  BotStyle,
  ChannelId,
  CompanyState,
  Decisions,
  GameState,
  IndustryDef,
  IndustryId,
  ModuleId,
  ProductId,
  ProductState,
  RegionId,
} from "./types";
import { CHANNEL_IDS, MODULE_IDS, PRODUCT_IDS } from "./types";
import { REGION_IDS } from "@/content/types";

export interface NewGameOptions {
  industry: IndustryId;
  seed: number;
  totalRounds: number;
  difficulty: 1 | 2 | 3 | 4;
  modules?: ModuleId[];
  /** Empresas de personas, en orden. */
  humans: { name: string; color?: string }[];
  /** Cantidad total de empresas en el mercado (se completa con rivales automáticos). */
  size: number;
  startYear?: number;
}

const BOT_NAMES: Record<string, string[]> = {
  default: [
    "Grupo Andino",
    "Corporación Pacífico",
    "Inversiones Qhapaq",
    "Norte Grande",
    "Altiplano S.A.C.",
    "Costa Verde",
    "Illari",
    "Wayra",
    "Kallpa",
    "Sumaq",
    "Tumi",
    "Inti Raymi",
    "Misti",
    "Huascarán",
    "Paracas",
  ],
};

const BOT_STYLES: BotStyle[] = ["equilibrado", "costos", "premium", "agresivo", "conservador"];

const CASH_FACTOR = [0, 0.45, 0.36, 0.3, 0.24];

export function allModules(): ModuleId[] {
  return [...MODULE_IDS];
}

function emptyRegions<T>(value: (r: RegionId) => T): Record<RegionId, T> {
  return Object.fromEntries(REGION_IDS.map((r) => [r, value(r)])) as Record<RegionId, T>;
}

function newCompany(
  idx: number,
  name: string,
  color: string,
  ind: IndustryDef,
  difficulty: number,
  bot: BotStyle | null,
): CompanyState {
  const d = derive(ind);
  const p1 = ind.products[0];
  const unitCost = p1.price * p1.costPct;
  const inv = hasInventory(ind) && ind.perishability < 0.8 ? Math.round(p1.units * 0.12) : 0;
  const fixedAssets = ind.assetIntensity * d.r0;
  const cash = CASH_FACTOR[difficulty] * d.r0;
  const creditFrac = Math.min(1, ind.creditDays / 90);
  const purchases0 = p1.units * unitCost;
  const receivables = d.r0 * (1 + IGV) * creditFrac;
  const payables = purchases0 * (1 + IGV) * Math.min(1, ind.supplierDays / 90);
  const igvable0 = d.mRef + 0.7 * d.overhead0;
  const igvPayable = Math.max(0, IGV * (d.r0 - purchases0 - igvable0));
  const taxPayable = IR_GENERAL * 0.1 * d.r0;
  const debt = 0.35 * fixedAssets;
  const assets = cash + receivables + inv * unitCost + fixedAssets;
  const liabilities = payables + igvPayable + taxPayable + debt;
  const equity = assets - liabilities;
  // Valor inicial: utilidad esperada del rubro y valor en libros.
  const value0 = 0.5 * (expectedMargin(ind) * d.r0 * 4) * 7 * 0.96 * 1.06 + 0.5 * Math.max(0, equity);
  const shares = Math.max(1000, Math.round(value0 / 10));
  const products = Object.fromEntries(
    PRODUCT_IDS.map((pid, i): [ProductId, ProductState] => [
      pid,
      {
        active: i === 0,
        age: i === 0 ? 8 : 0,
        inventory: i === 0 ? inv : 0,
        avgCost: ind.products[i].price * ind.products[i].costPct,
        sold: emptyRegions((r) => (i === 0 && r === "lima" ? p1.units : 0)),
        price: ind.products[i].price,
      },
    ]),
  ) as Record<ProductId, ProductState>;
  return {
    idx,
    name,
    color,
    isBot: bot !== null,
    botStyle: bot,
    cash: r2(cash),
    overdraft: 0,
    debt: r2(debt),
    capacity: d.capacity0,
    capacityPending: 0,
    fixedAssets: r2(fixedAssets),
    headcount: ind.headcount,
    salaryIndex: 1,
    skill: 0.05,
    morale: 60,
    brand: 40,
    quality: 50,
    satisfaction: 60,
    reputation: 70,
    efficiency: 0,
    products,
    regions: emptyRegions((r) => r === "lima"),
    receivables: r2(receivables),
    payables: r2(payables),
    igvPayable: r2(igvPayable),
    igvCredit: 0,
    taxPayable: r2(taxPayable),
    lossCarry: 0,
    capital: r2(equity),
    retained: 0,
    shares,
    sharePrice: 10,
    sharePrice0: 10,
    dividendsPaid: 0,
    effects: [],
    rescues: 0,
    cumRevenue: 0,
    cumProfit: 0,
    profits: [],
    revenues: [],
    score: 500,
    last: null,
  };
}

export function createGame(opts: NewGameOptions): GameState {
  const ind = getIndustry(opts.industry);
  const rng = makeRng(hashSeed(opts.seed, "setup"));
  const size = clamp(Math.max(opts.size, opts.humans.length), 2, 8);
  const names = shuffle(BOT_NAMES.default, rng);
  const styles = shuffle(BOT_STYLES, rng);
  const companies: CompanyState[] = [];
  opts.humans.forEach((h, i) => {
    companies.push(newCompany(i, h.name, h.color ?? COMPANY_COLORS[i % COMPANY_COLORS.length], ind, opts.difficulty, null));
  });
  let b = 0;
  while (companies.length < size) {
    const i = companies.length;
    const taken = new Set(companies.map((c) => c.name.toLowerCase()));
    let name = names[b % names.length];
    while (taken.has(name.toLowerCase())) name = names[++b % names.length];
    companies.push(newCompany(i, name, COMPANY_COLORS[i % COMPANY_COLORS.length], ind, opts.difficulty, styles[b % styles.length]));
    b++;
  }
  return {
    v: 1,
    industry: opts.industry,
    round: 1,
    totalRounds: opts.totalRounds,
    seed: opts.seed,
    difficulty: opts.difficulty,
    modules: opts.modules ?? allModules(),
    startYear: opts.startYear ?? 2026,
    market: {
      costIndex: 1,
      wageIndex: 1,
      rate: BASE_RATE + (opts.difficulty - 2) * 0.015,
      fx: 3.75,
      fx0: 3.75,
      news: [],
    },
    companies,
    current: { news: null, dilemma: null },
    finished: false,
  };
}

const evenChannels = (): Record<ChannelId, number> => ({ digital: 25, masivo: 25, btl: 25, directa: 25 });

/** Cuánto presupuesto de marketing corresponde a la huella actual de la empresa. */
export function footprint(c: CompanyState, ind: IndustryDef, regions = c.regions, products?: Record<ProductId, boolean>): number {
  let scale = 0;
  for (const p of ind.products) {
    const on = products ? products[p.id] : c.products[p.id].active;
    if (!on) continue;
    for (const r of REGION_IDS) if (regions[r]) scale += productScale(ind, p) * ind.regionFit[r];
  }
  return scale;
}

/** Personal necesario para operar una cantidad de capacidad. */
export function staffFor(usage: number, ind: IndustryDef): number {
  const d = derive(ind);
  return Math.max(1, Math.ceil(usage / d.outputPerWorker));
}

/** Decisiones de partida para un trimestre: repite las anteriores o propone una base razonable. */
export function defaultDecisions(state: GameState, c: CompanyState): Decisions {
  const ind = getIndustry(state.industry);
  const d = derive(ind);
  const q = (state.round - 1) % 4;
  if (c.last) {
    const prev: Decisions = JSON.parse(JSON.stringify(c.last));
    prev.choice = null;
    prev.finance = { loan: 0, repay: 0, dividends: 0 };
    prev.invest = { ...prev.invest, capacity: 0 };
    prev.research = { forecast: false, competitors: false, consumer: false };
    prev.regions = { ...c.regions };
    for (const p of ind.products) {
      prev.products[p.id].active = c.products[p.id].active;
      if (hasInventory(ind) && c.products[p.id].active) {
        const lastSold = REGION_IDS.reduce((s, r) => s + c.products[p.id].sold[r], 0);
        const prevSeason = ind.seasonality[(q + 3) % 4];
        const forecast = (lastSold / prevSeason) * ind.seasonality[q] * (1 + p.growth);
        const carry = c.products[p.id].inventory * (1 - ind.perishability);
        prev.products[p.id].volume = Math.max(0, Math.round(forecast * 1.05 - carry));
      }
    }
    prev.people.headcount = c.headcount;
    return prev;
  }
  const products = Object.fromEntries(
    ind.products.map((p) => [
      p.id,
      {
        active: c.products[p.id].active,
        price: roundPrice(refPrice(p, state.market)),
        volume: c.products[p.id].active
          ? Math.max(0, Math.round(p.units * ind.seasonality[q] * 1.05 - c.products[p.id].inventory * (1 - ind.perishability)))
          : 0,
      },
    ]),
  ) as Decisions["products"];
  return {
    products,
    marketing: {
      budget: Math.round(d.mRef * footprint(c, ind)),
      channels: evenChannels(),
      products: autoProductWeights(c, ind),
      regions: autoRegionWeights(c.regions, ind),
    },
    people: { headcount: c.headcount, salaryIndex: 1, training: Math.round(d.trainRef * 0.5) },
    finance: { loan: 0, repay: 0, dividends: 0 },
    invest: { capacity: 0, quality: Math.round(d.qRef * 0.2), efficiency: 0 },
    regions: { ...c.regions },
    research: { forecast: false, competitors: false, consumer: false },
    creditDays: ind.creditDays,
    choice: null,
  };
}

export function roundPrice(v: number): number {
  if (v >= 10000) return Math.round(v / 100) * 100;
  if (v >= 1000) return Math.round(v / 10) * 10;
  if (v >= 100) return Math.round(v);
  if (v >= 10) return Math.round(v * 10) / 10;
  return Math.round(v * 20) / 20;
}

export function autoProductWeights(c: CompanyState, ind: IndustryDef, active?: Record<ProductId, boolean>): Record<ProductId, number> {
  const w = Object.fromEntries(
    ind.products.map((p) => [p.id, (active ? active[p.id] : c.products[p.id].active) ? productScale(ind, p) : 0]),
  ) as Record<ProductId, number>;
  return normalize(w);
}

export function autoRegionWeights(regions: Record<RegionId, boolean>, ind: IndustryDef): Record<RegionId, number> {
  const w = Object.fromEntries(REGION_IDS.map((r) => [r, regions[r] ? ind.regionFit[r] : 0])) as Record<RegionId, number>;
  return normalize(w);
}

export function normalize<K extends string>(w: Record<K, number>): Record<K, number> {
  const keys = Object.keys(w) as K[];
  const total = keys.reduce((s, k) => s + Math.max(0, Number(w[k]) || 0), 0);
  if (total <= 0) return Object.fromEntries(keys.map((k) => [k, 100 / keys.length])) as Record<K, number>;
  return Object.fromEntries(keys.map((k) => [k, (Math.max(0, Number(w[k]) || 0) / total) * 100])) as Record<K, number>;
}

const num = (v: unknown, fallback = 0) => (typeof v === "number" && Number.isFinite(v) ? v : fallback);

/**
 * Limpia las decisiones recibidas: corrige rangos y completa con piloto automático
 * las áreas cuyo módulo no está habilitado en la partida.
 */
export function sanitize(input: Decisions | null, state: GameState, c: CompanyState): Decisions {
  const ind = getIndustry(state.industry);
  const d = derive(ind);
  const base = defaultDecisions(state, c);
  const src = input ?? base;
  const has = (m: ModuleId) => state.modules.includes(m);
  const out: Decisions = JSON.parse(JSON.stringify(base));

  // Regiones
  if (has("regiones")) {
    for (const r of REGION_IDS) out.regions[r] = c.regions[r] || Boolean(src.regions?.[r]);
  } else out.regions = { ...c.regions };
  out.regions.lima = true;

  // Productos
  for (const p of ind.products) {
    const s = src.products?.[p.id];
    const ref = refPrice(p, state.market);
    const wasActive = c.products[p.id].active;
    const active = p.id === "p1" ? true : has("productos") ? wasActive || Boolean(s?.active) : wasActive;
    out.products[p.id] = {
      active,
      price: r2(clamp(num(s?.price, ref), ref * 0.4, ref * 2.5)),
      volume: active ? Math.round(clamp(num(s?.volume, base.products[p.id].volume), 0, p.units * 40)) : 0,
    };
  }
  const activeMap = Object.fromEntries(ind.products.map((p) => [p.id, out.products[p.id].active])) as Record<ProductId, boolean>;

  // Marketing
  const scale = footprint(c, ind, out.regions, activeMap);
  if (has("marketing")) {
    out.marketing.budget = Math.round(clamp(num(src.marketing?.budget, d.mRef * scale), 0, d.r0 * 3));
    out.marketing.channels = normalize(
      Object.fromEntries(CHANNEL_IDS.map((k) => [k, num(src.marketing?.channels?.[k], 25)])) as Record<ChannelId, number>,
    );
  } else {
    out.marketing.budget = Math.round(d.mRef * scale);
    out.marketing.channels = evenChannels();
  }
  const pw = Object.fromEntries(
    ind.products.map((p) => [p.id, activeMap[p.id] ? num(src.marketing?.products?.[p.id], 0) : 0]),
  ) as Record<ProductId, number>;
  const pwTotal = Object.values(pw).reduce((s, v) => s + v, 0);
  out.marketing.products =
    has("marketing") && has("productos") && pwTotal > 0 ? normalize(pw) : autoProductWeights(c, ind, activeMap);
  const rw = Object.fromEntries(
    REGION_IDS.map((r) => [r, out.regions[r] ? num(src.marketing?.regions?.[r], 0) : 0]),
  ) as Record<RegionId, number>;
  const rwTotal = Object.values(rw).reduce((s, v) => s + v, 0);
  out.marketing.regions =
    has("marketing") && has("regiones") && rwTotal > 0 ? normalize(rw) : autoRegionWeights(out.regions, ind);

  // Inversión en capacidad (siempre disponible)
  out.invest.capacity = Math.round(clamp(num(src.invest?.capacity, 0), 0, c.capacity * 1.5));
  if (has("calidad")) {
    out.invest.quality = Math.round(clamp(num(src.invest?.quality, 0), 0, d.r0));
    out.invest.efficiency = Math.round(clamp(num(src.invest?.efficiency, 0), 0, d.r0));
  } else {
    out.invest.quality = Math.round(d.qRef * 0.2);
    out.invest.efficiency = 0;
  }

  // Personas
  if (has("personas")) {
    out.people = {
      headcount: Math.round(clamp(num(src.people?.headcount, c.headcount), 1, Math.max(ind.headcount * 8, c.headcount * 2))),
      salaryIndex: r2(clamp(num(src.people?.salaryIndex, 1), 0.8, 1.6)),
      training: Math.round(clamp(num(src.people?.training, 0), 0, d.baseSalary * 2)),
    };
  } else {
    const usage = plannedUsage(out, state, c, ind);
    out.people = {
      headcount: staffFor(Math.min(usage, c.capacity + c.capacityPending) * 1.04, ind),
      salaryIndex: 1,
      training: Math.round(d.trainRef * 0.5),
    };
  }

  // Finanzas
  if (has("finanzas")) {
    out.finance = {
      loan: Math.round(clamp(num(src.finance?.loan, 0), 0, d.r0 * 5)),
      repay: Math.round(clamp(num(src.finance?.repay, 0), 0, c.debt)),
      dividends: Math.round(clamp(num(src.finance?.dividends, 0), 0, d.r0 * 2)),
    };
  } else {
    out.finance = { loan: c.cash - c.overdraft < d.r0 * 0.12 ? Math.round(d.r0 * 0.25) : 0, repay: 0, dividends: 0 };
  }

  out.research = has("investigacion")
    ? {
        forecast: Boolean(src.research?.forecast),
        competitors: Boolean(src.research?.competitors),
        consumer: Boolean(src.research?.consumer),
      }
    : { forecast: false, competitors: false, consumer: false };

  const cd = num(src.creditDays, ind.creditDays);
  out.creditDays = has("credito") && [0, 30, 60, 90].includes(cd) ? (cd as 0 | 30 | 60 | 90) : ind.creditDays;

  const ch = src.choice;
  out.choice = ch === "a" || ch === "b" || ch === "c" || ch === "d" ? ch : null;
  return out;
}

/** Capacidad que pide el plan de volumen (en servicios, la demanda del último trimestre). */
export function plannedUsage(dec: Decisions, state: GameState, c: CompanyState, ind: IndustryDef): number {
  const q = (state.round - 1) % 4;
  let usage = 0;
  for (const p of ind.products) {
    if (!dec.products[p.id].active) continue;
    if (hasInventory(ind)) usage += dec.products[p.id].volume * p.capUse;
    else {
      const lastSold = REGION_IDS.reduce((s, r) => s + c.products[p.id].sold[r], 0);
      const prevSeason = ind.seasonality[(q + 3) % 4];
      const base = lastSold > 0 ? (lastSold / prevSeason) * ind.seasonality[q] : p.units * 0.6;
      usage += base * (1 + p.growth) * p.capUse;
    }
  }
  return usage;
}
