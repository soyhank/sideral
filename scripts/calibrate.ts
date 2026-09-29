/**
 * Calibración de dificultad. Juega cada misión con dos perfiles:
 *   pasivo: acepta la propuesta inicial y repite cada trimestre.
 *   aplicado: usa la proyección para afinar precio, volumen, publicidad y personal.
 * Sirve para fijar los puntajes de dos y tres estrellas.
 *
 * Uso: npx tsx --conditions=react-server scripts/calibrate.ts
 */
import { bestOption } from "../src/engine/bots";
import { derive } from "../src/engine/derive";
import { getIndustry, hasInventory } from "../src/engine/industries";
import { processRound, project, publicDilemma, publicNews } from "../src/engine/round";
import { createGame, footprint, sanitize, staffFor } from "../src/engine/setup";
import type { Decisions, GameState, RoundScript } from "../src/engine/types";
import { CHANNEL_IDS } from "../src/engine/types";
import { finalStats } from "../src/lib/game/rewards";
import { drawScript } from "../src/lib/game/script";
import { historyRow } from "../src/lib/game/service";
import type { HistoryRow } from "../src/lib/game/types";
import { MISSIONS, evaluateMission } from "../src/lib/missions";

type Policy = "pasivo" | "aplicado";

function smart(state: GameState, script: RoundScript | null): Decisions {
  const ind = getIndustry(state.industry);
  const d = derive(ind);
  const me = state.companies[0];
  const has = (m: string) => (state.modules as string[]).includes(m);
  let dec = sanitize(null, state, me);
  if (script?.dilemma) dec.choice = bestOption(script.dilemma).id;
  if (has("marketing")) {
    const total = CHANNEL_IDS.reduce((s, c) => s + ind.channels[c] ** 2, 0);
    for (const c of CHANNEL_IDS) dec.marketing.channels[c] = (ind.channels[c] ** 2 / total) * 100;
  }
  if (has("calidad")) {
    dec.invest.quality = Math.round(d.qRef * 0.9);
    dec.invest.efficiency = Math.round(d.eRef * 0.6);
  }
  if (has("personas")) {
    dec.people.salaryIndex = 1.05;
    dec.people.training = Math.round(d.trainRef);
  }
  if (has("productos") && state.round >= 2 && me.cash > d.r0 * 0.35) dec.products.p2.active = true;
  if (has("regiones") && state.round >= 2 && me.cash > d.r0 * 0.4) {
    const next = (["norte", "sur", "centro", "oriente"] as const).filter((r) => !me.regions[r]).sort((a, b) => ind.regionFit[b] - ind.regionFit[a])[0];
    if (next && state.round % 2 === 0) dec.regions[next] = true;
  }
  dec = sanitize(dec, state, me);

  const value = (x: Decisions) => {
    const p = project(state, 0, x);
    const cash = p.balance.cash - p.balance.overdraft;
    // Busca el mejor puntaje de gestión, con la utilidad como desempate.
    return p.score + (p.income.net / d.r0) * 150 + (cash < 0 ? -80 : 0);
  };
  const fit = (x: Decisions) => {
    // Ajusta volumen y personal a la demanda proyectada.
    for (let pass = 0; pass < 2; pass++) {
      const p = project(state, 0, x);
      let usage = 0;
      for (const prod of ind.products) {
        if (!x.products[prod.id].active) continue;
        if (hasInventory(ind)) {
          const carry = me.products[prod.id].inventory * (1 - ind.perishability);
          x.products[prod.id].volume = Math.max(0, Math.round(p.products[prod.id].demand * 1.03 - carry));
          usage += x.products[prod.id].volume * prod.capUse;
        } else usage += p.products[prod.id].demand * prod.capUse;
      }
      if (has("personas")) x.people.headcount = Math.max(1, staffFor(Math.min(usage, me.capacity) * 1.02, ind));
      if (usage > me.capacity * 0.95 && me.cash > d.r0 * 0.3) x.invest.capacity = Math.round(me.capacity * 0.12);
    }
    return sanitize(x, state, me);
  };

  let best = fit(JSON.parse(JSON.stringify(dec)));
  let bestV = value(best);
  const base = JSON.parse(JSON.stringify(best)) as Decisions;
  const scale = d.mRef * footprint(me, ind, base.regions, { p1: base.products.p1.active, p2: base.products.p2.active, p3: base.products.p3.active });
  for (const pm of [0.88, 0.94, 1, 1.06, 1.12, 1.2]) {
    for (const mm of has("marketing") ? [0.7, 1, 1.4, 1.9] : [1]) {
      const x = JSON.parse(JSON.stringify(base)) as Decisions;
      for (const prod of ind.products) x.products[prod.id].price = base.products[prod.id].price * pm;
      if (has("marketing")) x.marketing.budget = Math.round(scale * mm);
      const f = fit(x);
      const v = value(f);
      if (v > bestV) {
        bestV = v;
        best = f;
      }
    }
  }
  if (has("finanzas")) {
    const p = project(state, 0, best);
    const cash = p.balance.cash - p.balance.overdraft;
    if (cash < d.r0 * 0.1) best.finance.loan = Math.round(d.r0 * 0.3);
    else if (cash > d.r0 * 0.6 && me.retained > 0) best.finance.dividends = Math.round(Math.min(me.retained * 0.5, (cash - d.r0 * 0.4) * 0.6));
  }
  return sanitize(best, state, me);
}

function run(m: (typeof MISSIONS)[number], policy: Policy, seed: number) {
  let state = createGame({ industry: m.industry, seed, totalRounds: m.rounds, difficulty: m.difficulty, modules: m.modules, humans: [{ name: "Yo" }], size: m.size });
  const script = drawScript({ industry: m.industry, rounds: m.rounds, difficulty: m.difficulty, seed, situations: m.modules.includes("situaciones") });
  const history: HistoryRow[] = [];
  let last = null;
  for (let r = 0; r < m.rounds; r++) {
    state.current = { news: publicNews(script[r].news), dilemma: publicDilemma(script[r].dilemma) };
    let dec: Decisions;
    if (policy === "pasivo") {
      dec = sanitize(null, state, state.companies[0]);
      if (script[r].dilemma) dec.choice = script[r].dilemma!.options[0].id;
    } else dec = smart(state, script[r]);
    const out = processRound(state, [dec, ...state.companies.slice(1).map(() => null)], script[r]);
    state = out.state;
    last = out.result;
    history.push(historyRow(out.result));
  }
  const mine = last!.companies[0];
  const outcome = evaluateMission(m, finalStats(state, 0, mine, history));
  const rival = Math.max(...last!.companies.slice(1).map((c) => c.score));
  return { score: mine.score, rank: mine.rank, passed: outcome.passed, stars: outcome.stars, rival };
}

const SEEDS = [11, 23, 37, 41, 59, 67, 73, 89];
const avg = (v: number[]) => v.reduce((s, x) => s + x, 0) / v.length;
console.log("misión                        pasivo(pts/puesto/aprueba)   aplicado(pts/puesto/aprueba)   sugerido 2★/3★   actual");
for (const m of MISSIONS) {
  const a = SEEDS.map((s) => run(m, "pasivo", s));
  const b = SEEDS.map((s) => run(m, "aplicado", s));
  const pa = avg(a.map((x) => x.score));
  const pb = avg(b.map((x) => x.score));
  const two = Math.round((pa + (pb - pa) * 0.45) / 10) * 10;
  const three = Math.round((pa + (pb - pa) * 0.85) / 10) * 10;
  console.log(
    `${m.id} ${m.title.padEnd(24)}`,
    `${pa.toFixed(0).padStart(5)} / ${avg(a.map((x) => x.rank)).toFixed(1)} / ${(avg(a.map((x) => Number(x.passed))) * 100).toFixed(0).padStart(3)}%`.padEnd(28),
    `${pb.toFixed(0).padStart(5)} / ${avg(b.map((x) => x.rank)).toFixed(1)} / ${(avg(b.map((x) => Number(x.passed))) * 100).toFixed(0).padStart(3)}%`.padEnd(30),
    `${two} / ${three}`.padEnd(16),
    `mejor rival ${avg(b.map((x) => x.rival)).toFixed(0)}`.padEnd(18),
    `${m.stars[0]} / ${m.stars[1]}`,
  );
}
