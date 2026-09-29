import type { Dilemma, Verdict } from "@/content/types";
import { REGION_IDS } from "@/content/types";
import { clamp, derive, refPrice } from "./derive";
import { getIndustry, hasInventory } from "./industries";
import type { Rng } from "./rng";
import { autoProductWeights, autoRegionWeights, defaultDecisions, footprint, roundPrice, staffFor } from "./setup";
import type { BotStyle, ChannelId, CompanyState, Decisions, GameState, ProductId, RegionId } from "./types";
import { CHANNEL_IDS } from "./types";

interface Style {
  price: number;
  marketing: number;
  quality: number;
  efficiency: number;
  salary: number;
  training: number;
  /** Trimestre a partir del cual abre regiones y lanza líneas (0 = nunca). */
  expandAt: number;
  launchAt: number;
  premiumFirst: boolean;
}

const STYLES: Record<BotStyle, Style> = {
  equilibrado: { price: 1.0, marketing: 1.0, quality: 0.7, efficiency: 0.4, salary: 1.0, training: 0.6, expandAt: 5, launchAt: 5, premiumFirst: false },
  costos: { price: 0.93, marketing: 0.8, quality: 0.3, efficiency: 1.0, salary: 0.97, training: 0.4, expandAt: 7, launchAt: 8, premiumFirst: false },
  premium: { price: 1.1, marketing: 1.15, quality: 1.6, efficiency: 0.2, salary: 1.08, training: 1.2, expandAt: 6, launchAt: 4, premiumFirst: true },
  agresivo: { price: 0.97, marketing: 1.45, quality: 0.6, efficiency: 0.4, salary: 1.0, training: 0.5, expandAt: 3, launchAt: 4, premiumFirst: false },
  conservador: { price: 1.03, marketing: 0.8, quality: 0.6, efficiency: 0.5, salary: 1.02, training: 0.7, expandAt: 0, launchAt: 9, premiumFirst: false },
};

const SKILL = [0, 0.5, 0.75, 0.9, 1];

const VERDICT_RANK: Record<Verdict, number> = { optima: 3, buena: 2, riesgosa: 1, mala: 0 };

export function bestOption(dilemma: Dilemma) {
  return [...dilemma.options].sort((a, b) => VERDICT_RANK[b.verdict] - VERDICT_RANK[a.verdict])[0];
}

export function worstOption(dilemma: Dilemma) {
  return [...dilemma.options].sort((a, b) => VERDICT_RANK[a.verdict] - VERDICT_RANK[b.verdict])[0];
}

export function botDecide(state: GameState, c: CompanyState, rng: Rng, dilemma: Dilemma | null): Decisions {
  const ind = getIndustry(state.industry);
  const d = derive(ind);
  const st = STYLES[c.botStyle ?? "equilibrado"];
  const skill = SKILL[state.difficulty];
  const has = (m: string) => (state.modules as string[]).includes(m);
  const round = state.round;
  const q = (round - 1) % 4;
  const dec = defaultDecisions(state, c);
  const liquid = c.cash - c.overdraft;

  // Expansión
  const regions = { ...c.regions };
  if (has("regiones") && st.expandAt > 0 && round >= st.expandAt && liquid > d.r0 * 0.35 && (round - st.expandAt) % 4 === 0) {
    const next = (REGION_IDS as readonly RegionId[])
      .filter((r) => !regions[r])
      .sort((a, b) => ind.regionFit[b] - ind.regionFit[a])[0];
    if (next) regions[next] = true;
  }
  dec.regions = regions;

  const active: Record<ProductId, boolean> = { p1: true, p2: c.products.p2.active, p3: c.products.p3.active };
  if (has("productos") && round >= st.launchAt && liquid > d.r0 * 0.3) {
    const order: ProductId[] = st.premiumFirst ? ["p3", "p2"] : ["p2", "p3"];
    const next = order.find((p) => !active[p]);
    if (next && (round - st.launchAt) % 4 === 0) active[next] = true;
  }

  // Precio y volumen
  for (const p of ind.products) {
    const ps = c.products[p.id];
    const ref = refPrice(p, state.market);
    let price = ref * st.price * (p.id === "p3" ? 1.02 : 1);
    if (c.last && ps.active && state.difficulty >= 3) {
      const lastSold = REGION_IDS.reduce((s, r) => s + ps.sold[r], 0);
      const fair = p.units * ind.seasonality[(q + 3) % 4];
      if (lastSold < fair * 0.8) price *= 0.97;
      else if (lastSold > fair * 1.2) price *= 1.03;
    }
    price *= rng.noise((1 - skill) * 0.06);
    let volume = 0;
    if (active[p.id] && hasInventory(ind)) {
      const lastSold = REGION_IDS.reduce((s, r) => s + ps.sold[r], 0);
      const prevSeason = ind.seasonality[(q + 3) % 4];
      const base = ps.active && lastSold > 0 ? lastSold / prevSeason : p.units * 0.55;
      const forecast = base * ind.seasonality[q] * (1 + p.growth) * rng.noise((1 - skill) * 0.3);
      const carry = ps.inventory * (1 - ind.perishability);
      const buffer = ind.perishability > 0.5 ? 1.02 : 1.08;
      volume = Math.max(0, Math.round(forecast * buffer - carry));
    }
    dec.products[p.id] = { active: active[p.id], price: roundPrice(clamp(price, ref * 0.6, ref * 1.6)), volume };
  }

  // Marketing
  const scale = footprint(c, ind, regions, active);
  dec.marketing.budget = Math.round(d.mRef * scale * st.marketing * rng.noise(0.05));
  const smart = Object.fromEntries(CHANNEL_IDS.map((k) => [k, Math.pow(ind.channels[k], 2)])) as Record<ChannelId, number>;
  const smartTotal = CHANNEL_IDS.reduce((s, k) => s + smart[k], 0);
  dec.marketing.channels = Object.fromEntries(
    CHANNEL_IDS.map((k) => [k, skill * (smart[k] / smartTotal) * 100 + (1 - skill) * 25]),
  ) as Record<ChannelId, number>;
  dec.marketing.products = autoProductWeights(c, ind, active);
  dec.marketing.regions = autoRegionWeights(regions, ind);

  // Capacidad y personas
  let usage = 0;
  for (const p of ind.products) {
    if (!active[p.id]) continue;
    if (hasInventory(ind)) usage += dec.products[p.id].volume * p.capUse;
    else {
      const lastSold = REGION_IDS.reduce((s, r) => s + c.products[p.id].sold[r], 0);
      const prevSeason = ind.seasonality[(q + 3) % 4];
      usage += (lastSold > 0 ? lastSold / prevSeason : p.units * 0.55) * ind.seasonality[q] * (1 + p.growth) * p.capUse * 1.04;
    }
  }
  const cap = c.capacity + c.capacityPending;
  dec.invest.capacity = usage > cap * 0.92 && liquid > d.r0 * 0.25 ? Math.round(cap * 0.12) : 0;
  dec.invest.quality = Math.round(d.qRef * st.quality);
  dec.invest.efficiency = Math.round(d.eRef * st.efficiency);
  const need = staffFor(Math.min(usage, cap * 1.05), ind);
  dec.people = {
    headcount: clamp(Math.round(need * 1.03), Math.max(1, Math.round(c.headcount * 0.85)), Math.round(c.headcount * 1.3) + 1),
    salaryIndex: st.salary,
    training: Math.round(d.trainRef * st.training),
  };

  // Finanzas
  dec.finance = { loan: 0, repay: 0, dividends: 0 };
  if (liquid < d.r0 * 0.15) dec.finance.loan = Math.round(d.r0 * 0.3);
  else if (liquid > d.r0 * 0.7 && c.debt > 0 && c.botStyle === "conservador") dec.finance.repay = Math.round(Math.min(c.debt, d.r0 * 0.15));
  if (liquid > d.r0 * 0.6 && c.retained > 0)
    dec.finance.dividends = Math.round(Math.min(c.retained * 0.5, (liquid - d.r0 * 0.5) * 0.5));

  dec.research = { forecast: false, competitors: false, consumer: false };
  dec.creditDays = ind.creditDays;

  if (dilemma) {
    if (rng.chance(skill * 0.85)) dec.choice = bestOption(dilemma).id;
    else dec.choice = rng.pick(dilemma.options).id;
  } else dec.choice = null;
  return dec;
}
