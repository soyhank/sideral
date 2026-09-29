/**
 * Traza una partida completa trimestre a trimestre para revisar que los números tengan sentido.
 * Uso: npx tsx --conditions=react-server scripts/trace.ts <industria> [dificultad] [trimestres] [pasivo|rival]
 */
import { processRound, publicDilemma, publicNews } from "../src/engine/round";
import { createGame, sanitize } from "../src/engine/setup";
import { derive } from "../src/engine/derive";
import { getIndustry } from "../src/engine/industries";
import { drawScript } from "../src/lib/game/script";
import { allModules } from "../src/engine/setup";

const [industry = "pasteleria", diff = "2", rounds = "8", who = "pasivo"] = process.argv.slice(2);
const ind = getIndustry(industry);
const d = derive(ind);
const n = Number(rounds);
let state = createGame({ industry: ind.id, seed: 2026, totalRounds: n, difficulty: Number(diff) as 1 | 2 | 3 | 4, modules: allModules(), humans: [{ name: "Yo" }], size: 5 });
const script = drawScript({ industry: ind.id, rounds: n, difficulty: Number(diff), seed: 2026, situations: true });
const k = (v: number) => (Math.abs(v) >= 1e6 ? `${(v / 1e6).toFixed(2)}M` : `${(v / 1e3).toFixed(0)}k`).padStart(8);
console.log(`${ind.name}  venta base ${k(d.r0)}  sueldo base ${Math.round(d.baseSalary)}  capacidad ${d.capacity0}`);
const idx = who === "rival" ? 1 : 0;
console.log(`Empresa observada: ${state.companies[idx].name} (${state.companies[idx].botStyle ?? "persona pasiva"})\n`);
console.log("trim   ventas   c.venta personal   mkt    admin    otros   ebitda    neta     caja    deuda   cuota  uso  marca cal clim sat rep  acción  pts pto  evento");
for (let r = 0; r < n; r++) {
  state.current = { news: publicNews(script[r].news), dilemma: publicDilemma(script[r].dilemma) };
  const dec = sanitize(null, state, state.companies[0]);
  if (script[r].dilemma) dec.choice = script[r].dilemma!.options[0].id;
  const out = processRound(state, [dec, null, null, null, null], script[r]);
  state = out.state;
  const c = out.result.companies[idx];
  const i = c.income;
  console.log(
    String(r + 1).padStart(3),
    k(i.revenue), k(i.cogs), k(i.personnel), k(i.marketing), k(i.admin), k(i.other), k(i.ebitda), k(i.net),
    k(c.balance.cash - c.balance.overdraft), k(c.balance.debt),
    `${(c.share * 100).toFixed(1)}%`.padStart(6), `${Math.round(c.ratios.utilization * 100)}%`.padStart(5),
    String(Math.round(c.brand)).padStart(4), String(Math.round(c.quality)).padStart(4), String(Math.round(c.morale)).padStart(4),
    String(Math.round(c.satisfaction)).padStart(3), String(Math.round(c.reputation)).padStart(3),
    c.sharePrice.toFixed(2).padStart(7), String(c.score).padStart(4), String(c.rank).padStart(2),
    " ", (script[r].news?.title ?? "").slice(0, 38), c.dilemma ? `| ${c.dilemma.verdict}${c.dilemma.riskHit ? " (riesgo)" : ""} ${Math.round(c.dilemma.cash / 1000)}k` : "",
  );
}
console.log("\nCierre:");
for (const c of state.companies)
  console.log(
    ` ${c.name.padEnd(22)} ${(c.botStyle ?? "persona").padEnd(12)} utilidad acum ${k(c.cumProfit)}  margen ${((c.cumProfit / c.cumRevenue) * 100).toFixed(1)}%  regiones ${Object.values(c.regions).filter(Boolean).length}  líneas ${Object.values(c.products).filter((p) => p.active).length}  rescates ${c.rescues}  puntaje ${c.score}`,
  );
