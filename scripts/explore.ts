/** Explora qué puntaje alcanza una estrategia de precio fijo con volumen ajustado a la demanda. */
import { getIndustry, hasInventory } from "../src/engine/industries";
import { derive } from "../src/engine/derive";
import { processRound, project } from "../src/engine/round";
import { createGame, sanitize, staffFor, footprint } from "../src/engine/setup";
import { MISSIONS } from "../src/lib/missions";
import { CHANNEL_IDS } from "../src/engine/types";

const ids = process.argv.slice(2);
for (const m of MISSIONS.filter((x) => ids.includes(x.id))) {
  const ind = getIndustry(m.industry);
  const d = derive(ind);
  console.log(`\n${m.id} ${m.title} (${ind.id}, dificultad ${m.difficulty}, módulos: ${m.modules.join(",") || "ninguno"})`);
  for (const mm of m.modules.includes("marketing") ? [1, 1.5, 2.2] : [1])
    for (const pm of [0.85, 0.92, 1, 1.08, 1.16, 1.25]) {
      const scores: number[] = [], ranks: number[] = [], nets: number[] = [];
      for (const seed of [11, 23, 37, 41, 59, 67]) {
        let state = createGame({ industry: m.industry, seed, totalRounds: m.rounds, difficulty: m.difficulty, modules: m.modules, humans: [{ name: "Yo" }], size: m.size });
        let last;
        for (let r = 0; r < m.rounds; r++) {
          const me = state.companies[0];
          let dec = sanitize(null, state, me);
          dec.products.p1.price = ind.products[0].price * state.market.costIndex ** 0.8 * pm;
          if (m.modules.includes("marketing")) {
            dec.marketing.budget = Math.round(d.mRef * footprint(me, ind) * mm);
            const total = CHANNEL_IDS.reduce((s, c) => s + ind.channels[c] ** 2, 0);
            for (const c of CHANNEL_IDS) dec.marketing.channels[c] = (ind.channels[c] ** 2 / total) * 100;
          }
          for (let pass = 0; pass < 2; pass++) {
            const p = project(state, 0, dec);
            if (hasInventory(ind)) dec.products.p1.volume = Math.max(0, Math.round(p.products.p1.demand * 1.03 - me.products.p1.inventory * (1 - ind.perishability)));
            if (m.modules.includes("personas")) dec.people.headcount = staffFor(Math.min(p.products.p1.demand, me.capacity) * 1.02, ind);
            dec = sanitize(dec, state, me);
          }
          const out = processRound(state, [dec, ...state.companies.slice(1).map(() => null)], null);
          state = out.state; last = out.result;
        }
        scores.push(last!.companies[0].score); ranks.push(last!.companies[0].rank); nets.push(state.companies[0].cumProfit / state.companies[0].cumRevenue);
      }
      const avg = (v: number[]) => v.reduce((s, x) => s + x, 0) / v.length;
      console.log(`  precio x${pm.toFixed(2)} marketing x${mm.toFixed(1)}  puntaje ${avg(scores).toFixed(0)}  puesto ${avg(ranks).toFixed(1)}  margen ${(avg(nets) * 100).toFixed(1)}%`);
    }
}
