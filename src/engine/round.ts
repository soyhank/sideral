import type { Dilemma, Effects, News } from "@/content/types";
import { REGION_IDS } from "@/content/types";
import { bestOption, botDecide, worstOption } from "./bots";
import {
  DEPRECIATION_Q,
  IGV,
  IR_GENERAL,
  IR_RMT_LOW,
  LABOR_LOAD,
  MANDATORY_AMORTIZATION,
  OUTSIDE_OPTION,
  OVERDRAFT_RATE,
  RMT_LOW_LIMIT_UIT,
  RMT_REVENUE_LIMIT_UIT,
  UIT,
} from "./constants";
import { channelEffect, clamp, derive, fxFactor, productScale, quarterRate, r2, r4, refPrice } from "./derive";
import { getIndustry, hasInventory } from "./industries";
import { hashSeed, makeRng } from "./rng";
import { expectedMargin, scorecard } from "./score";
import { sanitize } from "./setup";
import type {
  ActiveNews,
  CompanyResult,
  CompanyState,
  Decisions,
  DilemmaResult,
  GameState,
  Intel,
  ProductId,
  ProductResult,
  PublicDilemma,
  PublicNews,
  RegionId,
  RoundResult,
  RoundScript,
} from "./types";
import { PRODUCT_IDS } from "./types";

export interface ProcessOptions {
  /** Proyección: sin azar, sin guion, los rivales repiten su última decisión. */
  projection?: boolean;
  intel?: Intel | null;
}

/** Costo de abrir una región y costo fijo trimestral, como fracción de la venta base. */
export const REGION_SETUP = 0.12;
export const REGION_FIXED = 0.04;

/** Atractivo de cada competidor local que ocupa el lugar de una empresa ausente. */
const LOCAL_RIVAL = 0.8;

type PR<T> = Record<ProductId, Record<RegionId, T>>;

const grid = <T>(v: () => T): PR<T> =>
  Object.fromEntries(
    PRODUCT_IDS.map((p) => [p, Object.fromEntries(REGION_IDS.map((r) => [r, v()]))]),
  ) as PR<T>;

const perProduct = <T>(v: () => T): Record<ProductId, T> =>
  Object.fromEntries(PRODUCT_IDS.map((p) => [p, v()])) as Record<ProductId, T>;

interface Work {
  c: CompanyState;
  dec: Decisions;
  pct: { demand: number; cost: number; fixed: number; productivity: number };
  dilemma: DilemmaResult | null;
  extraordinary: number;
  personnel: number;
  training: number;
  turnover: number;
  effCap: number;
  capLeft: number;
  usage: number;
  capex: number;
  regionSetup: number;
  regionFixed: number;
  launch: number;
  researchCost: number;
  unitCost: Record<ProductId, number>;
  produced: Record<ProductId, number>;
  supply: Record<ProductId, number>;
  attract: PR<number>;
  demand: PR<number>;
  demand0: PR<number>;
  sold: PR<number>;
  mTotal: number;
  notes: string[];
  equityPrev: number;
  assetsPrev: number;
}

export function publicDilemma(d: Dilemma | null): PublicDilemma | null {
  if (!d) return null;
  return {
    id: d.id,
    title: d.title,
    category: d.category,
    situation: d.situation,
    concept: d.concept,
    options: d.options.map((o) => ({ id: o.id, label: o.label, detail: o.detail })),
  };
}

export function publicNews(n: News | null): PublicNews | null {
  if (!n) return null;
  const regional = Object.values(n.effects.regions ?? {}).reduce((s, v) => s + (v ?? 0), 0);
  return {
    id: n.id,
    title: n.title,
    pestel: n.pestel,
    text: n.text,
    severity: n.severity,
    rounds: n.rounds,
    lesson: n.lesson,
    signs: {
      demand: Math.sign((n.effects.demandPct ?? 0) + regional * 0.2),
      cost: Math.sign(n.effects.costPct ?? 0),
      rate: Math.sign(n.effects.ratePts ?? 0),
      wage: Math.sign(n.effects.wagePct ?? 0),
    },
  };
}

function balanceOf(c: CompanyState) {
  const inventory = PRODUCT_IDS.reduce((s, p) => s + c.products[p].inventory * c.products[p].avgCost, 0);
  const assets = c.cash + c.receivables + inventory + c.igvCredit + c.fixedAssets;
  const liabilities = c.payables + c.igvPayable + c.taxPayable + c.overdraft + c.debt;
  return { inventory, assets, liabilities, equity: c.capital + c.retained };
}

function applyPoints(c: CompanyState, e: Effects) {
  c.brand = clamp(c.brand + (e.brand ?? 0), 0, 100);
  c.morale = clamp(c.morale + (e.morale ?? 0), 0, 100);
  c.quality = clamp(c.quality + (e.quality ?? 0), 5, 100);
  c.satisfaction = clamp(c.satisfaction + (e.satisfaction ?? 0), 0, 100);
  c.reputation = clamp(c.reputation + (e.reputation ?? 0), 0, 100);
}

function pushEffect(c: CompanyState, source: string, e: Effects) {
  if (e.demandPct || e.costPct || e.fixedCostPct || e.productivityPct)
    c.effects.push({
      source,
      rounds: clamp(e.rounds ?? 1, 1, 4),
      demandPct: e.demandPct,
      costPct: e.costPct,
      fixedCostPct: e.fixedCostPct,
      productivityPct: e.productivityPct,
    });
}

/** Reparte unidades enteras en proporción a la demanda, sin pasar del total disponible. */
function allocate(demand: number[], available: number): number[] {
  const total = demand.reduce((s, v) => s + v, 0);
  if (total <= available) return [...demand];
  const avail = Math.max(0, Math.floor(available));
  const raw = demand.map((v) => (v * avail) / total);
  const out = raw.map((v) => Math.floor(v));
  let left = avail - out.reduce((s, v) => s + v, 0);
  const order = raw.map((v, i) => ({ i, f: v - Math.floor(v) })).sort((a, b) => b.f - a.f);
  for (const o of order) {
    if (left <= 0) break;
    if (out[o.i] < demand[o.i]) {
      out[o.i]++;
      left--;
    }
  }
  return out;
}

export function processRound(
  state: GameState,
  inputs: (Decisions | null)[],
  script: RoundScript | null,
  opts: ProcessOptions = {},
): { state: GameState; result: RoundResult } {
  const ind = getIndustry(state.industry);
  const d = derive(ind);
  const s: GameState = JSON.parse(JSON.stringify(state));
  const projection = Boolean(opts.projection);
  const N = s.companies.length;
  const round = s.round;
  const q = (round - 1) % 4;
  const inventoryModel = hasInventory(ind);
  const useScript = !projection && script !== null && s.modules.includes("situaciones");
  // Los montos de las situaciones se expresan sobre la venta base. Se moderan según el margen
  // del rubro: 3 % de la venta pesa muy distinto en una concesionaria que en una consultora.
  const cashScale = d.r0 * 0.6 * clamp(expectedMargin(ind) / 0.12, 0.35, 1.3);
  const dilemma = useScript ? script!.dilemma : null;
  const news = useScript ? script!.news : null;

  // 1. Decisiones (con el estado previo al trimestre)
  const decisions = s.companies.map((c, i) => {
    let input = inputs[i] ?? null;
    if (!input && c.isBot && !projection)
      input = botDecide(state, state.companies[i], makeRng(hashSeed(s.seed, "bot", round, i)), dilemma);
    if (!input && projection) input = state.companies[i].last;
    return sanitize(input, state, state.companies[i]);
  });

  // 2. Entorno
  const m = s.market;
  m.costIndex = r4(m.costIndex * 1.006);
  m.wageIndex = r4(m.wageIndex * 1.005);
  if (!projection) {
    const fxRng = makeRng(hashSeed(s.seed, "fx", round));
    m.fx = r4(clamp(m.fx * fxRng.noise(0.025), 3.2, 4.6));
  }
  if (news) {
    const active: ActiveNews = {
      id: news.id,
      title: news.title,
      pestel: news.pestel,
      rounds: news.rounds,
      demandPct: news.effects.demandPct ?? 0,
      costPct: news.effects.costPct ?? 0,
      ratePts: news.effects.ratePts ?? 0,
      wagePct: news.effects.wagePct ?? 0,
      regions: news.effects.regions ?? {},
    };
    m.news.push(active);
  }
  const env = { demand: 0, cost: 0, rate: 0, wage: 0, regions: {} as Partial<Record<RegionId, number>> };
  for (const n of m.news) {
    env.demand += n.demandPct / 100;
    env.cost += n.costPct / 100;
    env.rate += n.ratePts / 100;
    env.wage += n.wagePct / 100;
    for (const r of REGION_IDS) if (n.regions[r]) env.regions[r] = (env.regions[r] ?? 0) + (n.regions[r] ?? 0) / 100;
  }
  env.demand = clamp(env.demand, -0.6, 0.6);
  env.cost = clamp(env.cost, -0.4, 0.6);
  const intelDemand = projection && opts.intel?.demandFactor ? opts.intel.demandFactor : 1;
  const intelCost = projection && opts.intel?.costFactor ? opts.intel.costFactor : 1;
  const annualRate = Math.max(0.04, m.rate + env.rate);
  const fxF = fxFactor(ind, m);

  // 3. Preparación de cada empresa
  const works: Work[] = s.companies.map((c, i) => {
    const dec = decisions[i];
    const rng = makeRng(hashSeed(s.seed, "co", round, i));
    const before = balanceOf(c);
    const w: Work = {
      c,
      dec,
      pct: { demand: 0, cost: 0, fixed: 0, productivity: 0 },
      dilemma: null,
      extraordinary: 0,
      personnel: 0,
      training: 0,
      turnover: 0,
      effCap: 0,
      capLeft: 0,
      usage: 0,
      capex: 0,
      regionSetup: 0,
      regionFixed: 0,
      launch: 0,
      researchCost: 0,
      unitCost: perProduct(() => 0),
      produced: perProduct(() => 0),
      supply: perProduct(() => 0),
      attract: grid(() => 0),
      demand: grid(() => 0),
      demand0: grid(() => 0),
      sold: grid(() => 0),
      mTotal: 1,
      notes: [],
      equityPrev: before.equity,
      assetsPrev: before.assets,
    };

    // Situación del trimestre
    if (dilemma) {
      let opt = dilemma.options.find((o) => o.id === dec.choice);
      if (!opt) {
        opt = worstOption(dilemma);
        w.notes.push("No respondiste la situación del trimestre y los hechos decidieron por ti.");
      }
      let cash = ((opt.effects.cashPct ?? 0) / 100) * cashScale;
      applyPoints(c, opt.effects);
      pushEffect(c, dilemma.id, opt.effects);
      let riskHit = false;
      if (opt.risk && rng.chance(opt.risk.prob)) {
        riskHit = true;
        cash += ((opt.risk.effects.cashPct ?? 0) / 100) * cashScale;
        applyPoints(c, opt.risk.effects);
        pushEffect(c, `${dilemma.id}-riesgo`, opt.risk.effects);
      }
      const best = bestOption(dilemma);
      w.extraordinary = cash;
      w.dilemma = {
        id: dilemma.id,
        title: dilemma.title,
        concept: dilemma.concept,
        lesson: dilemma.lesson,
        choice: opt.id,
        label: opt.label,
        verdict: opt.verdict,
        outcome: opt.outcome,
        riskHit,
        riskText: riskHit ? opt.risk!.text : null,
        cash: r2(cash),
        best: { id: best.id, label: best.label },
      };
    }
    for (const e of c.effects) {
      w.pct.demand += (e.demandPct ?? 0) / 100;
      w.pct.cost += (e.costPct ?? 0) / 100;
      w.pct.fixed += (e.fixedCostPct ?? 0) / 100;
      w.pct.productivity += (e.productivityPct ?? 0) / 100;
    }
    w.pct.demand = clamp(w.pct.demand, -0.7, 0.7);
    w.pct.cost = clamp(w.pct.cost, -0.4, 0.6);
    w.pct.fixed = clamp(w.pct.fixed, -0.4, 0.6);
    w.pct.productivity = clamp(w.pct.productivity, -0.5, 0.5);

    // Personas
    const prevHead = c.headcount;
    const H = dec.people.headcount;
    const hires = Math.max(0, H - prevHead);
    const fires = Math.max(0, prevHead - H);
    const salary = d.baseSalary * m.wageIndex * (1 + env.wage);
    const payroll = H * salary * dec.people.salaryIndex * 3 * (1 + LABOR_LOAD);
    const hiring = hires * salary;
    const severance = fires * salary * dec.people.salaryIndex * 1.5;
    const trainGain = Math.log(1 + dec.people.training / d.trainRef);
    const target = clamp(55 + 70 * (dec.people.salaryIndex - 1) + 8 * trainGain - 25 * (fires / Math.max(1, prevHead)), 0, 100);
    c.morale = clamp(c.morale + 0.45 * (target - c.morale), 0, 100);
    c.skill = clamp((c.skill * 0.96 + 0.02 * trainGain) * (1 - (0.5 * hires) / Math.max(1, H)), 0, 0.3);
    const rate = clamp(0.05 - 0.0015 * (c.morale - 60) - 0.12 * (dec.people.salaryIndex - 1), 0.01, 0.25);
    const leavers = Math.round(H * rate);
    w.turnover = rate;
    const replacement = leavers * salary * 1.2;
    c.headcount = H;
    c.salaryIndex = dec.people.salaryIndex;
    w.training = H * dec.people.training;
    w.personnel = payroll + hiring + severance + replacement;
    const productivity =
      ((1 + 0.004 * (c.morale - 60)) * (1 + c.skill) * (1 + w.pct.productivity) * (1 - 0.3 * rate)) / (1.05 * (1 - 0.3 * 0.05));

    // Capacidad
    c.capacity += c.capacityPending;
    c.capacityPending = dec.invest.capacity;
    w.capex = dec.invest.capacity * d.capexPerUnit * m.costIndex;
    w.effCap = Math.max(1, Math.min(c.capacity, H * d.outputPerWorker * productivity));
    if (w.effCap < c.capacity * 0.97 && s.modules.includes("personas") && dec.products.p1.volume * ind.products[0].capUse > w.effCap)
      w.notes.push("Tu personal no alcanza para producir todo lo que planeaste.");

    // Regiones y líneas
    for (const r of REGION_IDS) {
      if (dec.regions[r] && !c.regions[r]) {
        w.regionSetup += REGION_SETUP * d.r0 * ind.regionFit[r] * m.costIndex;
        c.regions[r] = true;
      }
      if (c.regions[r] && r !== "lima") w.regionFixed += REGION_FIXED * d.r0 * ind.regionFit[r] * m.costIndex;
    }
    for (const p of ind.products) {
      const ps = c.products[p.id];
      if (dec.products[p.id].active && !ps.active) {
        ps.active = true;
        ps.age = 0;
        w.launch += d.launchCost[p.id] * m.costIndex;
      }
      ps.price = dec.products[p.id].price;
    }

    // Calidad y eficiencia
    c.quality = clamp(c.quality - 1 + 6 * Math.log(1 + dec.invest.quality / d.qRef) + 8 * (c.skill - 0.05), 5, 100);
    c.efficiency = clamp(c.efficiency * 0.985 + 0.03 * Math.log(1 + dec.invest.efficiency / d.eRef), 0, 0.25);

    w.researchCost =
      (dec.research.forecast ? d.research.forecast : 0) +
      (dec.research.competitors ? d.research.competitors : 0) +
      (dec.research.consumer ? d.research.consumer : 0);

    // Costos unitarios y producción
    for (const p of ind.products) {
      w.unitCost[p.id] =
        p.price *
        p.costPct *
        m.costIndex *
        fxF *
        intelCost *
        (1 - c.efficiency) *
        (1 + 0.003 * (c.quality - 50)) *
        Math.max(0.3, 1 + env.cost + w.pct.cost);
    }
    if (inventoryModel) {
      let usage = 0;
      for (const p of ind.products) if (c.products[p.id].active) usage += dec.products[p.id].volume * p.capUse;
      const limit = w.effCap * 1.15;
      const factor = usage > limit ? limit / usage : 1;
      if (factor < 1) w.notes.push("Pediste más volumen del que permite tu capacidad. Se produjo el máximo posible.");
      usage = 0;
      for (const p of ind.products) {
        const ps = c.products[p.id];
        if (!ps.active) continue;
        const vol = Math.floor(dec.products[p.id].volume * factor);
        w.produced[p.id] = vol;
        usage += vol * p.capUse;
        const total = ps.inventory + vol;
        ps.avgCost = total > 0 ? (ps.inventory * ps.avgCost + vol * w.unitCost[p.id]) / total : w.unitCost[p.id];
        w.supply[p.id] = total;
      }
      w.usage = usage;
      if (usage > w.effCap) {
        const over = (usage - w.effCap) / w.effCap;
        w.personnel += over * payroll * 1.5;
        c.morale = clamp(c.morale - over * 25, 0, 100);
        w.notes.push("Se trabajaron horas extra para cumplir el plan de volumen.");
      }
    } else {
      w.capLeft = w.effCap * 1.1;
    }

    // Atractivo comercial
    const credit = Math.pow((1 + (0.3 * dec.creditDays) / 90) / (1 + (0.3 * ind.creditDays) / 90), ind.weights.credit);
    let mSum = 0;
    let mWeight = 0;
    for (const p of ind.products) {
      if (!c.products[p.id].active) continue;
      const pref = refPrice(p, m);
      const priceF = Math.pow(dec.products[p.id].price / pref, -p.elasticity);
      const qualityF = Math.pow((50 + c.quality) / 100, p.qualityWeight * 2);
      const brandF = Math.pow((60 + c.brand) / 100, ind.weights.brand * 2);
      const satF = Math.pow((40 + c.satisfaction) / 100, 0.5);
      const age = c.products[p.id].age;
      const novelty = age === 0 ? 0.6 : age === 1 ? 0.85 : 1;
      for (const r of REGION_IDS) {
        if (!c.regions[r]) continue;
        const ref = d.mRef * productScale(ind, p) * ind.regionFit[r];
        const budget = (dec.marketing.budget * dec.marketing.products[p.id] * dec.marketing.regions[r]) / 10000;
        const mk = channelEffect(ind, budget, dec.marketing.channels, ref) / (d.mBase * (ref / d.mRef));
        mSum += mk * ref;
        mWeight += ref;
        const mktF = Math.pow((1 + mk) / 2, ind.weights.marketing);
        w.attract[p.id][r] = priceF * qualityF * brandF * satF * mktF * credit * novelty;
      }
    }
    w.mTotal = mWeight > 0 ? mSum / mWeight : 0;
    return w;
  });

  // 4. Mercado
  const marketDemand = perProduct(() => 0);
  const marketSold = perProduct(() => 0);
  const marketRevenue = perProduct(() => 0);
  for (const p of ind.products) {
    for (const r of REGION_IDS) {
      const present = works.filter((w) => w.c.products[p.id].active && w.c.regions[r]);
      if (!present.length) continue;
      const noise = projection ? 1 : makeRng(hashSeed(s.seed, "mk", round, p.id, r)).noise(0.02 + 0.01 * s.difficulty);
      const size =
        p.units *
        (N + OUTSIDE_OPTION) *
        ind.regionFit[r] *
        Math.pow(1 + p.growth, round - 1) *
        ind.seasonality[q] *
        Math.max(0.2, 1 + env.demand + (env.regions[r] ?? 0)) *
        intelDemand *
        noise;
      const pool = p.retention > 0 ? size * (1 - p.retention) : size;
      const sumA = present.reduce((t, w) => t + w.attract[p.id][r], 0);
      // Donde faltan empresas del juego, el espacio lo ocupan competidores locales.
      const locals = (N - present.length) * LOCAL_RIVAL;
      const pref = refPrice(p, m);
      for (const w of present) {
        let retained = 0;
        if (p.retention > 0) {
          const keep = clamp(
            p.retention *
              Math.pow(pref / w.dec.products[p.id].price, 0.6) *
              Math.pow((40 + w.c.satisfaction) / 100, 0.6) *
              Math.pow((50 + w.c.quality) / 100, 0.3),
            0,
            0.97,
          );
          retained = state.companies[w.c.idx].products[p.id].sold[r] * keep;
        }
        const share = w.attract[p.id][r] / (OUTSIDE_OPTION + locals + sumA);
        const dem = Math.max(0, Math.round((retained + share * pool) * (1 + w.pct.demand)));
        w.demand[p.id][r] = dem;
        w.demand0[p.id][r] = dem;
      }
    }
  }

  // 5. Ventas según disponibilidad
  for (const w of works) {
    if (inventoryModel) {
      for (const p of ind.products) {
        if (!w.c.products[p.id].active) continue;
        const dem = REGION_IDS.map((r) => w.demand[p.id][r]);
        const sold = allocate(dem, w.supply[p.id]);
        REGION_IDS.forEach((r, i) => (w.sold[p.id][r] = sold[i]));
        w.supply[p.id] -= sold.reduce((t, v) => t + v, 0);
      }
    } else {
      let need = 0;
      for (const p of ind.products) for (const r of REGION_IDS) need += w.demand[p.id][r] * p.capUse;
      const limit = w.effCap * 1.1;
      const factor = need > limit ? limit / need : 1;
      let used = 0;
      for (const p of ind.products)
        for (const r of REGION_IDS) {
          const v = Math.floor(w.demand[p.id][r] * factor + (factor === 1 ? 0.5 : 0));
          w.sold[p.id][r] = Math.min(v, w.demand[p.id][r]);
          used += w.sold[p.id][r] * p.capUse;
        }
      w.usage = used;
      w.capLeft = Math.max(0, limit - used);
    }
  }

  // 6. Parte de la demanda no atendida pasa a quien tiene disponibilidad
  for (const p of ind.products) {
    for (const r of REGION_IDS) {
      const present = works.filter((w) => w.c.products[p.id].active && w.c.regions[r]);
      if (present.length < 2) continue;
      const unmet = present.map((w) => w.demand0[p.id][r] - w.sold[p.id][r]);
      const totalUnmet = unmet.reduce((t, v) => t + v, 0);
      if (totalUnmet <= 0) continue;
      const canTake = present.map((w) => (inventoryModel ? w.supply[p.id] : Math.floor(w.capLeft / p.capUse)));
      const sumA = present.reduce((t, w, i) => t + (canTake[i] > 0 && unmet[i] === 0 ? w.attract[p.id][r] : 0), 0);
      if (sumA <= 0) continue;
      present.forEach((w, i) => {
        if (canTake[i] <= 0 || unmet[i] > 0) return;
        const extra = Math.min(canTake[i], Math.round((0.35 * totalUnmet * w.attract[p.id][r]) / sumA));
        if (extra <= 0) return;
        w.demand[p.id][r] += extra;
        w.sold[p.id][r] += extra;
        if (inventoryModel) w.supply[p.id] -= extra;
        else {
          w.capLeft -= extra * p.capUse;
          w.usage += extra * p.capUse;
        }
      });
    }
  }
  for (const w of works)
    for (const p of ind.products)
      for (const r of REGION_IDS) {
        marketDemand[p.id] += w.demand0[p.id][r];
        marketSold[p.id] += w.sold[p.id][r];
        marketRevenue[p.id] += w.sold[p.id][r] * w.dec.products[p.id].price;
      }
  const totalRevenue = works.reduce(
    (t, w) => t + ind.products.reduce((u, p) => u + REGION_IDS.reduce((v, r) => v + w.sold[p.id][r] * w.dec.products[p.id].price, 0), 0),
    0,
  );

  // 7. Resultados financieros
  const odq = quarterRate(OVERDRAFT_RATE + env.rate);
  const results: CompanyResult[] = works.map((w) => {
    const { c, dec } = w;
    const products = {} as Record<ProductId, ProductResult>;
    let revenue = 0;
    let cogsInv = 0;
    let purchases = 0;
    let logistics = 0;
    let soldTotal = 0;
    let unmetTotal = 0;
    let demand0Total = 0;
    let priceRelSum = 0;
    for (const p of ind.products) {
      const ps = c.products[p.id];
      const price = dec.products[p.id].price;
      const sold = REGION_IDS.reduce((t, r) => t + w.sold[p.id][r], 0);
      const demand = REGION_IDS.reduce((t, r) => t + w.demand[p.id][r], 0);
      const demand0 = REGION_IDS.reduce((t, r) => t + w.demand0[p.id][r], 0);
      const soldOut = REGION_IDS.reduce((t, r) => t + (r === "lima" ? 0 : w.sold[p.id][r]), 0);
      let spoiled = 0;
      let unitCost = w.unitCost[p.id];
      if (ps.active) {
        if (inventoryModel) {
          unitCost = ps.avgCost;
          const left = ps.inventory + w.produced[p.id] - sold;
          spoiled = Math.round(left * ind.perishability);
          ps.inventory = Math.max(0, left - spoiled);
          cogsInv += (sold + spoiled) * ps.avgCost;
          purchases += w.produced[p.id] * w.unitCost[p.id];
        } else {
          w.produced[p.id] = sold;
          cogsInv += sold * unitCost;
          purchases += sold * unitCost;
        }
        logistics += soldOut * unitCost * ind.logisticsPct;
        revenue += sold * price;
        soldTotal += sold;
        demand0Total += demand0;
        unmetTotal += Math.max(0, demand0 - Math.min(sold, demand0));
        priceRelSum += (price / refPrice(p, m)) * sold * price;
        ps.age += 1;
        for (const r of REGION_IDS) ps.sold[r] = w.sold[p.id][r];
      }
      const byRegion: ProductResult["byRegion"] = {};
      for (const r of REGION_IDS) {
        if (!c.regions[r] || !ps.active) continue;
        const regionSold = works.reduce((t, x) => t + x.sold[p.id][r], 0);
        byRegion[r] = {
          demand: w.demand[p.id][r],
          sold: w.sold[p.id][r],
          share: regionSold > 0 ? r4(w.sold[p.id][r] / regionSold) : 0,
        };
      }
      products[p.id] = {
        active: ps.active,
        price,
        demand,
        sold,
        produced: w.produced[p.id],
        inventory: ps.inventory,
        spoiled,
        unitCost: r2(unitCost),
        revenue: r2(sold * price),
        share: marketSold[p.id] > 0 ? r4(sold / marketSold[p.id]) : 0,
        marketGrowth: r4(Math.pow(1 + p.growth, 4) - 1 + env.demand),
        byRegion,
      };
    }

    const creditFrac = Math.min(1, dec.creditDays / 90);
    const gross = revenue * (1 + IGV);
    const badDebt = gross * creditFrac * 0.005 * (dec.creditDays / 30) * (1 + Math.max(0, -env.demand));
    const admin =
      (d.overhead0 * (0.6 + (0.4 * c.capacity) / d.capacity0) * m.costIndex + w.regionFixed) * Math.max(0.3, 1 + w.pct.fixed);
    const marketing = dec.marketing.budget + w.launch;
    const other = w.researchCost + dec.invest.quality + dec.invest.efficiency + w.regionSetup + badDebt;
    const personnel = w.personnel + w.training;
    const cogs = cogsInv + logistics;
    const depreciation = DEPRECIATION_Q * c.fixedAssets;
    const ebitda = revenue - cogs - personnel - marketing - admin - other;
    const ebit = ebitda - depreciation;
    const debtRatioPrev = w.assetsPrev > 0 ? 1 - w.equityPrev / w.assetsPrev : 1;
    const spread = 0.04 * clamp((debtRatioPrev - 0.5) / 0.5, 0, 1) + ((70 - c.reputation) / 100) * 0.05;
    const interest = c.debt * quarterRate(Math.max(0.04, annualRate + spread)) + c.overdraft * odq;
    const pbt = ebit - interest + w.extraordinary;

    // Impuesto a la renta
    const annualized = revenue * 4;
    const regime: "RMT" | "General" = annualized <= RMT_REVENUE_LIMIT_UIT * UIT ? "RMT" : "General";
    const lossUsed = pbt > 0 ? Math.min(c.lossCarry, pbt * 0.5) : 0;
    const taxable = Math.max(0, pbt - lossUsed);
    let tax = 0;
    if (taxable > 0) {
      if (regime === "RMT") {
        const low = Math.min(taxable, (RMT_LOW_LIMIT_UIT * UIT) / 4);
        tax = low * IR_RMT_LOW + (taxable - low) * IR_GENERAL;
      } else tax = taxable * IR_GENERAL;
    }
    c.lossCarry = r2(pbt < 0 ? c.lossCarry - pbt : c.lossCarry - lossUsed);
    const net = pbt - tax;

    // IGV
    const igvable = marketing + logistics + w.researchCost + dec.invest.quality + dec.invest.efficiency + w.training + w.regionSetup + 0.7 * admin;
    const igvSales = IGV * revenue;
    const igvPurchases = IGV * (purchases + igvable + w.capex);
    const igvNet = igvSales - igvPurchases - c.igvCredit;
    const igvCreditUsed = Math.min(c.igvCredit, Math.max(0, igvSales - igvPurchases));
    const igvToPay = Math.max(0, igvNet);
    const igvCreditNext = Math.max(0, -igvNet);

    // Flujo de efectivo
    const start = c.cash;
    const overdraftPrev = c.overdraft;
    const collections = c.receivables + gross * (1 - creditFrac);
    const receivablesNew = gross * creditFrac - badDebt;
    const purchasesGross = purchases * (1 + IGV);
    const payablesNew = purchasesGross * Math.min(1, ind.supplierDays / 90);
    const suppliers = c.payables + purchasesGross - payablesNew;
    const payrollCash = w.personnel;
    const expensesCash = igvable * (1 + IGV) + 0.3 * admin - w.extraordinary;
    const taxesCash = c.igvPayable + c.taxPayable;
    const capexCash = w.capex * (1 + IGV);

    const limit = Math.max(0, 1.2 * Math.max(0, w.equityPrev) + 0.5 * c.fixedAssets);
    const loan = clamp(dec.finance.loan, 0, Math.max(0, limit - c.debt));
    if (loan < dec.finance.loan - 1)
      w.notes.push(`El banco aprobó S/ ${Math.round(loan).toLocaleString("es-PE")} de los S/ ${Math.round(dec.finance.loan).toLocaleString("es-PE")} solicitados.`);
    const mandatory = c.debt * MANDATORY_AMORTIZATION;
    const repay = Math.min(c.debt + loan, mandatory + Math.min(dec.finance.repay, Math.max(0, c.debt - mandatory)));

    const operating = collections - suppliers - payrollCash - expensesCash - taxesCash;
    let cashNet = start - overdraftPrev + operating - capexCash + loan - repay - interest;
    const dividends = clamp(Math.min(dec.finance.dividends, Math.max(0, c.retained + net)), 0, Math.max(0, cashNet));
    if (dividends < dec.finance.dividends - 1) w.notes.push("Los dividendos se limitaron a las utilidades y la caja disponibles.");
    cashNet -= dividends;

    // Actualiza el estado
    c.receivables = r2(receivablesNew);
    c.payables = r2(payablesNew);
    c.igvPayable = r2(igvToPay);
    c.igvCredit = r2(igvCreditNext);
    c.taxPayable = r2(tax);
    c.debt = r2(c.debt + loan - repay);
    c.fixedAssets = r2(c.fixedAssets - depreciation + w.capex);
    c.retained = r2(c.retained + net - dividends);
    c.dividendsPaid = r2(c.dividendsPaid + dividends);

    // Rescate si la empresa queda insolvente
    let rescue = 0;
    let rescued = false;
    const equityNow = c.capital + c.retained;
    if (!projection && (cashNet < -0.6 * d.r0 || equityNow < 0)) {
      rescue = Math.max(0, -cashNet) + 0.25 * d.r0 + Math.max(0, -equityNow);
      rescued = true;
      c.capital = r2(c.capital + rescue);
      c.shares += Math.round(rescue / Math.max(0.5, 0.7 * c.sharePrice));
      c.rescues += 1;
      c.reputation = clamp(c.reputation - 6, 0, 100);
      cashNet += rescue;
      w.notes.push("La empresa quedó sin caja y los inversionistas tuvieron que rescatarla. Tu participación se diluyó.");
    }
    c.cash = r2(Math.max(0, cashNet));
    c.overdraft = r2(Math.max(0, -cashNet));
    if (c.overdraft > 0) w.notes.push("Cerraste el trimestre en sobregiro. Es el financiamiento más caro que existe.");

    // Indicadores blandos
    const stockout = demand0Total > 0 ? unmetTotal / demand0Total : 0;
    const priceRel = revenue > 0 ? priceRelSum / revenue : 1;
    const satTarget = clamp(60 + 0.5 * (c.quality - 50) - 30 * (priceRel - 1) - 45 * stockout + 0.15 * (c.morale - 60), 0, 100);
    c.satisfaction = clamp(c.satisfaction + 0.5 * (satTarget - c.satisfaction), 0, 100);
    c.brand = clamp(c.brand * 0.93 + 2.8 * Math.pow(Math.min(2.5, Math.max(0, w.mTotal)), 0.7) + 0.03 * (c.satisfaction - 60), 0, 100);
    c.reputation = clamp(c.reputation + 0.05 * (75 - c.reputation), 0, 100);
    if (stockout > 0.08) w.notes.push("Hubo clientes que no pudiste atender. Eso resta satisfacción y regala ventas a tus rivales.");

    c.cumRevenue = r2(c.cumRevenue + revenue);
    c.cumProfit = r2(c.cumProfit + net);
    c.profits = [...c.profits, r2(net)].slice(-4);
    c.revenues = [...c.revenues, r2(revenue)].slice(-8);

    // Precio de la acción
    const bal = balanceOf(c);
    const annualProfit = (c.profits.reduce((t, v) => t + v, 0) * 4) / c.profits.length;
    const eps = annualProfit / c.shares;
    const bvps = bal.equity / c.shares;
    const refRev = c.revenues.length >= 5 ? c.revenues[c.revenues.length - 5] : d.r0 * ind.seasonality[q];
    const growth = clamp(revenue / Math.max(1, refRev) - 1, -0.3, 0.3);
    const pe = 7 * (1 + growth) * (0.8 + (0.4 * c.brand) / 100) * (0.85 + (0.3 * c.reputation) / 100);
    const debtRatio = bal.assets > 0 ? bal.liabilities / bal.assets : 1;
    const value = (0.5 * Math.max(0, eps) * pe + 0.5 * Math.max(0, bvps)) * (1 - 0.3 * clamp((debtRatio - 0.6) / 0.4, 0, 1));
    c.sharePrice = r2(Math.max(0.1, 0.5 * c.sharePrice + 0.5 * value));

    const tsr = (c.sharePrice + c.dividendsPaid / c.shares) / c.sharePrice0 - 1;
    const roe = bal.equity > 0 ? annualProfit / bal.equity : -1;
    const currentAssets = c.cash + c.receivables + bal.inventory + c.igvCredit;
    const currentLiab = c.payables + c.igvPayable + c.taxPayable + c.overdraft + c.debt * MANDATORY_AMORTIZATION * 4;
    const currentRatio = currentLiab > 0 ? currentAssets / currentLiab : 9;
    const share = totalRevenue > 0 ? revenue / totalRevenue : 0;
    const utilization = w.effCap > 0 ? w.usage / w.effCap : 0;
    const fillRate = 1 - stockout;
    const card = scorecard(c, ind, { tsr, roe, currentRatio, share, companies: N, utilization, fillRate, rounds: round });
    c.score = card.total;
    c.last = dec;

    const contribution = revenue - cogs;
    const fixedCosts = personnel + marketing + admin + other + depreciation + interest;
    const breakEven = contribution > 0 ? fixedCosts / (contribution / Math.max(1, revenue)) : 0;

    return {
      idx: c.idx,
      income: {
        revenue: r2(revenue),
        cogs: r2(cogs),
        gross: r2(revenue - cogs),
        personnel: r2(personnel),
        marketing: r2(marketing),
        admin: r2(admin),
        other: r2(other),
        ebitda: r2(ebitda),
        depreciation: r2(depreciation),
        ebit: r2(ebit),
        interest: r2(interest),
        extraordinary: r2(w.extraordinary),
        pbt: r2(pbt),
        tax: r2(tax),
        net: r2(net),
      },
      balance: {
        cash: c.cash,
        receivables: c.receivables,
        inventory: r2(bal.inventory),
        igvCredit: c.igvCredit,
        fixedAssets: c.fixedAssets,
        assets: r2(bal.assets),
        payables: c.payables,
        igvPayable: c.igvPayable,
        taxPayable: c.taxPayable,
        overdraft: c.overdraft,
        debt: c.debt,
        liabilities: r2(bal.liabilities),
        capital: c.capital,
        retained: c.retained,
        equity: r2(bal.equity),
      },
      cashflow: {
        start: r2(start),
        collections: r2(collections),
        suppliers: r2(-suppliers),
        payroll: r2(-payrollCash),
        expenses: r2(-expensesCash),
        taxes: r2(-taxesCash),
        operating: r2(operating),
        capex: r2(-capexCash),
        investing: r2(-capexCash),
        loans: r2(loan),
        repayments: r2(-repay),
        interest: r2(-interest),
        dividends: r2(-dividends),
        overdraft: r2(c.overdraft - overdraftPrev),
        rescue: r2(rescue),
        financing: r2(loan - repay - interest - dividends + (c.overdraft - overdraftPrev) + rescue),
        end: c.cash,
      },
      ratios: {
        grossMargin: revenue > 0 ? r4((revenue - cogs) / revenue) : 0,
        ebitdaMargin: revenue > 0 ? r4(ebitda / revenue) : 0,
        netMargin: revenue > 0 ? r4(net / revenue) : 0,
        roe: r4(roe),
        roa: bal.assets > 0 ? r4(annualProfit / bal.assets) : 0,
        currentRatio: r4(Math.min(9, currentRatio)),
        acidRatio: currentLiab > 0 ? r4(Math.min(9, (currentAssets - bal.inventory) / currentLiab)) : 9,
        debtRatio: r4(debtRatio),
        inventoryDays: cogsInv > 0 ? Math.round((bal.inventory / cogsInv) * 90) : 0,
        collectionDays: gross > 0 ? Math.round((c.receivables / gross) * 90) : 0,
        breakEven: r2(breakEven),
        utilization: r4(utilization),
        tsr: r4(tsr),
      },
      taxes: {
        igvSales: r2(igvSales),
        igvPurchases: r2(igvPurchases),
        igvCreditUsed: r2(igvCreditUsed),
        igvToPay: r2(igvToPay),
        igvCreditNext: r2(igvCreditNext),
        regime,
        taxableIncome: r2(taxable),
        lossUsed: r2(lossUsed),
        incomeTax: r2(tax),
        socialCharges: r2((c.headcount * d.baseSalary * m.wageIndex * (1 + env.wage) * dec.people.salaryIndex * 3 * LABOR_LOAD)),
      },
      products,
      share: r4(share),
      units: soldTotal,
      capacity: c.capacity,
      effectiveCapacity: Math.round(w.effCap),
      headcount: c.headcount,
      turnover: r4(w.turnover),
      morale: r2(c.morale),
      brand: r2(c.brand),
      quality: r2(c.quality),
      satisfaction: r2(c.satisfaction),
      reputation: r2(c.reputation),
      efficiency: r4(c.efficiency),
      sharePrice: c.sharePrice,
      scorecard: card,
      score: card.total,
      rank: 0,
      rescued,
      dilemma: w.dilemma,
      notes: w.notes,
    };
  });

  // 8. Posiciones y cierre
  const order = [...results].sort((a, b) => b.score - a.score || b.income.net - a.income.net);
  order.forEach((r, i) => (r.rank = i + 1));
  for (const c of s.companies) {
    c.morale = r2(c.morale);
    c.brand = r2(c.brand);
    c.quality = r2(c.quality);
    c.satisfaction = r2(c.satisfaction);
    c.reputation = r2(c.reputation);
    c.skill = r4(c.skill);
    c.efficiency = r4(c.efficiency);
    c.effects = c.effects.map((e) => ({ ...e, rounds: e.rounds - 1 })).filter((e) => e.rounds > 0);
  }
  m.news = m.news.map((n) => ({ ...n, rounds: n.rounds - 1 })).filter((n) => n.rounds > 0);
  m.rate = r4(m.rate);

  const result: RoundResult = {
    round,
    year: s.startYear + Math.floor((round - 1) / 4),
    quarter: q + 1,
    news: publicNews(news),
    market: {
      products: Object.fromEntries(
        ind.products.map((p) => [
          p.id,
          {
            demand: marketDemand[p.id],
            sold: marketSold[p.id],
            avgPrice: marketSold[p.id] > 0 ? r2(marketRevenue[p.id] / marketSold[p.id]) : 0,
            growth: r4(Math.pow(1 + p.growth, 4) - 1 + env.demand),
          },
        ]),
      ) as RoundResult["market"]["products"],
      revenue: r2(totalRevenue),
      rate: r4(annualRate),
      costIndex: m.costIndex,
    },
    companies: results,
  };

  s.round = round + 1;
  s.finished = s.round > s.totalRounds;
  s.current = { news: null, dilemma: null };
  return { state: s, result };
}

/** Proyección del trimestre para una empresa, suponiendo que los rivales repiten su jugada. */
export function project(state: GameState, idx: number, decisions: Decisions, intel?: Intel | null): CompanyResult {
  const inputs = state.companies.map((c, i) => (i === idx ? decisions : c.last));
  const { result } = processRound(state, inputs, null, { projection: true, intel });
  return result.companies[idx];
}
