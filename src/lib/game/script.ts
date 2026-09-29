import "server-only";

import { DILEMMAS, NEWS } from "@/content";
import type { Dilemma, News } from "@/content/types";
import { getIndustry } from "@/engine/industries";
import { hashSeed, makeRng, shuffle } from "@/engine/rng";
import type { IndustryId, Intel, RoundScript } from "@/engine/types";

const NEWS_CHANCE = [0, 0.45, 0.6, 0.75, 0.9];

function applies(item: { industries: IndustryId[] | "all" }, industry: IndustryId): boolean {
  return item.industries === "all" || item.industries.includes(industry);
}

/** Sortea el guion completo de una partida: una situación y, a veces, una noticia por trimestre. */
export function drawScript(opts: {
  industry: IndustryId;
  rounds: number;
  difficulty: number;
  seed: number;
  situations: boolean;
}): RoundScript[] {
  if (!opts.situations) return Array.from({ length: opts.rounds }, () => ({ news: null, dilemma: null }));
  const ind = getIndustry(opts.industry);
  const rng = makeRng(hashSeed(opts.seed, "script"));
  const maxTier = opts.difficulty === 1 ? 1 : opts.difficulty === 2 ? 2 : 3;
  const pool = DILEMMAS.filter(
    (d) => applies(d, opts.industry) && (d.market === "all" || d.market === ind.kind) && d.tier <= maxTier,
  );
  const own = shuffle(pool.filter((d) => d.industries !== "all"), rng);
  const general = shuffle(pool.filter((d) => d.industries === "all"), rng);
  const dilemmas: (Dilemma | null)[] = [];
  const usedCategories: string[] = [];
  for (let r = 0; r < opts.rounds; r++) {
    const preferOwn = own.length > 0 && rng.chance(0.4);
    const source = preferOwn ? own : general.length ? general : own;
    // Evita repetir la categoría del trimestre anterior cuando hay alternativas.
    let i = source.findIndex((d) => d.category !== usedCategories[usedCategories.length - 1]);
    if (i < 0) i = 0;
    const pick = source.splice(i, 1)[0] ?? null;
    dilemmas.push(pick);
    if (pick) usedCategories.push(pick.category);
  }

  const maxSeverity = opts.difficulty === 1 ? 2 : 3;
  const newsPool = shuffle(
    NEWS.filter((n) => applies(n, opts.industry) && n.severity <= maxSeverity),
    rng,
  );
  const news: (News | null)[] = [];
  let busyUntil = 0;
  let strong = 0;
  for (let r = 0; r < opts.rounds; r++) {
    let pick: News | null = null;
    if (r >= 1 && r >= busyUntil && rng.chance(NEWS_CHANCE[opts.difficulty])) {
      const i = newsPool.findIndex((n) => n.severity < 3 || strong < 1 + Math.floor(opts.rounds / 8));
      if (i >= 0) {
        pick = newsPool.splice(i, 1)[0];
        if (pick.severity === 3) strong++;
        busyUntil = r + Math.max(1, pick.rounds - 1);
      }
    }
    news.push(pick);
  }
  return dilemmas.map((dilemma, r) => ({ dilemma, news: news[r] }));
}

/** Lo que recibe una empresa que compró el pronóstico: qué viene el próximo trimestre. */
export function intelFor(next: RoundScript | undefined): Intel {
  const n = next?.news ?? null;
  if (!n) return { demandFactor: 1, costFactor: 1, hint: "Sin señales de cambios bruscos en el entorno para el próximo trimestre." };
  return {
    demandFactor: 1 + (n.effects.demandPct ?? 0) / 100,
    costFactor: 1 + (n.effects.costPct ?? 0) / 100,
    hint: n.hint,
  };
}
