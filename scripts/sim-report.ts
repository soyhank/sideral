/** Reporte de equilibrio: juega partidas de rivales automáticos y resume cada industria. */
import { INDUSTRIES, createGame, processRound, derive } from "../src/engine";
const rounds = 8;
console.log("industria        R0          margen  ebitda  tsr_med  score_min/max  util   rescates caja/R0 salario");
for (const ind of INDUSTRIES) {
  let state = createGame({ industry: ind.id, seed: 11, totalRounds: rounds, difficulty: 2, humans: [], size: 5 });
  let rev = 0, net = 0, ebitda = 0, util = 0, n = 0;
  let last;
  for (let i = 0; i < rounds; i++) {
    const out = processRound(state, state.companies.map(() => null), null);
    state = out.state; last = out.result;
    for (const c of out.result.companies) { rev += c.income.revenue; net += c.income.net; ebitda += c.income.ebitda; util += c.ratios.utilization; n++; }
  }
  const tsr = last!.companies.map((c) => c.ratios.tsr).sort((a, b) => a - b);
  const sc = last!.companies.map((c) => c.score);
  const d = derive(ind);
  const growth = last!.companies.reduce((t, c) => t + c.income.revenue, 0) / 5 / d.r0 / ind.seasonality[(rounds - 1) % 4];
  const cash = state.companies.reduce((s, c) => s + c.cash - c.overdraft, 0) / 5 / d.r0;
  console.log(
    ind.id.padEnd(14), String(Math.round(d.r0)).padStart(10), (net / rev * 100).toFixed(1).padStart(8), (ebitda / rev * 100).toFixed(1).padStart(7),
    (tsr[2] * 100).toFixed(0).padStart(7), `${Math.min(...sc)}/${Math.max(...sc)}`.padStart(12), (util / n * 100).toFixed(0).padStart(6),
    String(state.companies.reduce((s, c) => s + c.rescues, 0)).padStart(6), cash.toFixed(2).padStart(8), String(Math.round(d.baseSalary)).padStart(7), "x" + growth.toFixed(2),
  );
}
