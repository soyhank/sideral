import { describe, expect, it } from "vitest";
import { INDUSTRIES, RMV, createGame, defaultDecisions, derive, processRound, project, expectedMargin } from "@/engine";
import type { GameState, RoundResult } from "@/engine";

function play(industry: string, rounds: number, difficulty: 1 | 2 | 3 | 4 = 2, seed = 7) {
  let state: GameState = createGame({
    industry: industry as never,
    seed,
    totalRounds: rounds,
    difficulty,
    humans: [],
    size: 5,
  });
  const results: RoundResult[] = [];
  for (let i = 0; i < rounds; i++) {
    const out = processRound(state, state.companies.map(() => null), null);
    state = out.state;
    results.push(out.result);
  }
  return { state, results };
}

describe("catálogo de industrias", () => {
  for (const ind of INDUSTRIES) {
    it(`${ind.id}: parámetros razonables`, () => {
      const d = derive(ind);
      expect(d.baseSalary).toBeGreaterThanOrEqual(RMV);
      expect(d.baseSalary).toBeLessThan(9000);
      const season = ind.seasonality.reduce((s, v) => s + v, 0) / 4;
      expect(season).toBeGreaterThan(0.98);
      expect(season).toBeLessThan(1.02);
      expect(expectedMargin(ind)).toBeGreaterThan(0.02);
      expect(expectedMargin(ind)).toBeLessThan(0.3);
    });
  }
});

describe("contabilidad", () => {
  for (const ind of INDUSTRIES) {
    it(`${ind.id}: el balance cuadra y la caja concilia en todos los trimestres`, () => {
      const { results } = play(ind.id, 8, 3);
      for (const r of results)
        for (const c of r.companies) {
          const b = c.balance;
          expect(Math.abs(b.assets - b.liabilities - b.equity)).toBeLessThan(2);
          const f = c.cashflow;
          const end = f.start + f.operating + f.investing + f.financing;
          expect(Math.abs(end - f.end)).toBeLessThan(2);
          expect(Number.isFinite(c.score)).toBe(true);
          expect(c.income.revenue).toBeGreaterThanOrEqual(0);
        }
    });
  }
});

describe("equilibrio del juego", () => {
  for (const ind of INDUSTRIES) {
    it(`${ind.id}: un mercado de rivales automáticos es sano`, () => {
      const { results, state } = play(ind.id, 8, 2);
      const all = results.flatMap((r) => r.companies);
      const revenue = all.reduce((s, c) => s + c.income.revenue, 0);
      const net = all.reduce((s, c) => s + c.income.net, 0);
      const margin = net / revenue;
      expect(margin).toBeGreaterThan(0);
      expect(margin).toBeLessThan(0.3);
      const rescues = state.companies.reduce((s, c) => s + c.rescues, 0);
      expect(rescues).toBeLessThanOrEqual(1);
      const last = results[results.length - 1];
      const shares = last.companies.reduce((s, c) => s + c.share, 0);
      expect(shares).toBeCloseTo(1, 2);
    });
  }
});

describe("determinismo y proyección", () => {
  it("la misma semilla produce la misma partida", () => {
    const a = play("pasteleria", 6, 3, 99);
    const b = play("pasteleria", 6, 3, 99);
    expect(JSON.stringify(a.results)).toBe(JSON.stringify(b.results));
    const c = play("pasteleria", 6, 3, 100);
    expect(JSON.stringify(a.results)).not.toBe(JSON.stringify(c.results));
  });

  it("la proyección se acerca al resultado real", () => {
    let state = createGame({ industry: "bebidas", seed: 3, totalRounds: 8, difficulty: 2, humans: [{ name: "Yo" }], size: 5 });
    for (let i = 0; i < 3; i++) {
      const dec = defaultDecisions(state, state.companies[0]);
      const projected = project(state, 0, dec);
      const out = processRound(state, [dec, null, null, null, null], null);
      const real = out.result.companies[0];
      const diff = Math.abs(projected.income.revenue - real.income.revenue) / real.income.revenue;
      expect(diff).toBeLessThan(0.25);
      state = out.state;
    }
  });

  it("subir el precio reduce las unidades vendidas", () => {
    const state = createGame({ industry: "moda", seed: 5, totalRounds: 8, difficulty: 2, humans: [{ name: "Yo" }], size: 5 });
    const base = defaultDecisions(state, state.companies[0]);
    const caro = JSON.parse(JSON.stringify(base));
    caro.products.p1.price = base.products.p1.price * 1.25;
    const a = project(state, 0, base);
    const b = project(state, 0, caro);
    expect(b.products.p1.demand).toBeLessThan(a.products.p1.demand);
  });

  it("más marketing eleva la demanda con rendimientos decrecientes", () => {
    const state = createGame({ industry: "ecommerce", seed: 5, totalRounds: 8, difficulty: 2, humans: [{ name: "Yo" }], size: 5 });
    const base = defaultDecisions(state, state.companies[0]);
    const m = (k: number) => {
      const d = JSON.parse(JSON.stringify(base));
      d.marketing.budget = base.marketing.budget * k;
      d.products.p1.volume = 99999;
      return project(state, 0, d).products.p1.demand;
    };
    const d1 = m(1), d2 = m(2), d3 = m(3);
    expect(d2).toBeGreaterThan(d1);
    expect(d3).toBeGreaterThan(d2);
    expect(d3 - d2).toBeLessThan(d2 - d1);
  });
});
