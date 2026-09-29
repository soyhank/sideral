/**
 * Valida los archivos de contenido. Uso:
 *   npx tsx scripts/validate-content.ts            (valida todo lo que exista)
 *   npx tsx scripts/validate-content.ts ruta.ts    (valida un archivo)
 * Cada archivo exporta por defecto un arreglo de Dilemma, News, TriviaQ o Concept.
 */
import { z } from "zod";
import { readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  DILEMMA_CATEGORIES,
  INDUSTRY_IDS,
  PESTEL,
  REGION_IDS,
  TRIVIA_TOPICS,
} from "../src/content/types";

const noDash = (s: string) => !s.includes("—") && !s.includes("–");
const text = (min: number, max: number) =>
  z.string().min(min).max(max).refine(noDash, "No usar rayas largas (— o –)");

const pct = (lo: number, hi: number) => z.number().min(lo).max(hi);
const effects = z
  .object({
    cashPct: pct(-40, 40).optional(),
    demandPct: pct(-40, 40).optional(),
    costPct: pct(-30, 30).optional(),
    fixedCostPct: pct(-30, 30).optional(),
    productivityPct: pct(-30, 30).optional(),
    brand: pct(-20, 20).optional(),
    morale: pct(-20, 20).optional(),
    quality: pct(-20, 20).optional(),
    satisfaction: pct(-20, 20).optional(),
    reputation: pct(-25, 20).optional(),
    rounds: z.number().int().min(1).max(4).optional(),
  })
  .strict();

const industries = z.union([z.literal("all"), z.array(z.enum(INDUSTRY_IDS)).min(1)]);
const id = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "id en kebab-case");

const option = z
  .object({
    id: z.enum(["a", "b", "c", "d"]),
    label: text(4, 70),
    detail: text(10, 180),
    effects,
    risk: z
      .object({ prob: z.number().min(0.05).max(0.95), effects, text: text(10, 220) })
      .strict()
      .optional(),
    outcome: text(20, 360),
    verdict: z.enum(["optima", "buena", "riesgosa", "mala"]),
  })
  .strict();

const dilemma = z
  .object({
    id,
    title: text(5, 70),
    category: z.enum(DILEMMA_CATEGORIES),
    industries,
    market: z.enum(["B2C", "B2B", "all"]),
    tier: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    situation: text(60, 520),
    options: z.array(option).min(2).max(4),
    concept: text(3, 60),
    lesson: text(30, 360),
    basedOn: text(5, 200).optional(),
  })
  .strict()
  .superRefine((d, ctx) => {
    const ids = d.options.map((o) => o.id);
    if (new Set(ids).size !== ids.length) ctx.addIssue({ code: "custom", message: "ids de opción repetidos" });
    ids.forEach((v, i) => {
      if (v !== "abcd"[i]) ctx.addIssue({ code: "custom", message: "las opciones deben ir en orden a, b, c, d" });
    });
    if (!d.options.some((o) => o.verdict === "optima" || o.verdict === "buena"))
      ctx.addIssue({ code: "custom", message: "debe existir al menos una opción óptima o buena" });
  });

const news = z
  .object({
    id,
    title: text(5, 80),
    pestel: z.enum(PESTEL),
    text: text(60, 420),
    industries,
    effects: z
      .object({
        demandPct: pct(-35, 35).optional(),
        costPct: pct(-25, 30).optional(),
        ratePts: pct(-4, 8).optional(),
        wagePct: pct(-5, 15).optional(),
        regions: z.partialRecord(z.enum(REGION_IDS), pct(-50, 50)).optional(),
      })
      .strict(),
    rounds: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    severity: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    hint: text(20, 220),
    lesson: text(30, 360),
    basedOn: text(5, 200).optional(),
  })
  .strict();

const trivia = z
  .object({
    id,
    topic: z.enum(TRIVIA_TOPICS),
    level: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    q: text(15, 260),
    options: z.tuple([text(1, 120), text(1, 120), text(1, 120), text(1, 120)]),
    answer: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
    explain: text(20, 360),
  })
  .strict()
  .superRefine((t, ctx) => {
    if (new Set(t.options).size !== 4) ctx.addIssue({ code: "custom", message: "opciones repetidas" });
  });

const concept = z
  .object({
    id,
    title: text(3, 70),
    area: z.enum(TRIVIA_TOPICS),
    summary: text(20, 200),
    body: text(200, 1600),
    example: text(40, 600),
    inGame: text(30, 400),
  })
  .strict();

const fodaCase = z
  .object({
    id,
    company: text(3, 60),
    industry: z.enum(INDUSTRY_IDS),
    context: text(80, 420),
    items: z
      .array(z.object({ text: text(20, 150), kind: z.enum(["F", "O", "D", "A"]), why: text(20, 200) }).strict())
      .length(8),
  })
  .strict()
  .superRefine((c, ctx) => {
    for (const k of ["F", "O", "D", "A"])
      if (c.items.filter((i) => i.kind === k).length !== 2)
        ctx.addIssue({ code: "custom", message: `debe haber exactamente 2 afirmaciones de tipo ${k}` });
  });

const force = z.object({ level: z.number().int().min(1).max(5), text: text(40, 260) }).strict();
const industryProfile = z
  .object({
    id: z.enum(INDUSTRY_IDS),
    description: text(150, 600),
    customer: text(40, 300),
    keys: z.array(text(20, 160)).min(3).max(4),
    mistakes: z.array(text(20, 160)).length(3),
    porter: z.object({ rivalry: force, entrants: force, substitutes: force, buyers: force, suppliers: force }).strict(),
    kpis: z.array(text(5, 80)).min(3).max(5),
  })
  .strict();

const SCHEMAS = { dilemmas: dilemma, news, trivia, concepts: concept, foda: fodaCase, industries: industryProfile } as const;
type Kind = keyof typeof SCHEMAS;

function kindOf(file: string): Kind | null {
  const f = file.replace(/\\/g, "/");
  for (const k of Object.keys(SCHEMAS) as Kind[]) if (f.includes(`/content/${k}/`)) return k;
  return null;
}

async function validateFile(file: string, seen: Map<string, string>): Promise<number> {
  const kind = kindOf(file);
  if (!kind) {
    console.error(`✗ ${file}: no está dentro de src/content/{dilemmas,news,trivia,concepts,foda,industries}/`);
    return 1;
  }
  const mod = await import(pathToFileURL(file).href);
  const data = mod.default;
  if (!Array.isArray(data)) {
    console.error(`✗ ${file}: el export por defecto debe ser un arreglo`);
    return 1;
  }
  let errors = 0;
  data.forEach((item, i) => {
    const r = SCHEMAS[kind].safeParse(item);
    if (!r.success) {
      errors++;
      const label = item?.id ?? `#${i}`;
      for (const issue of r.error.issues)
        console.error(`✗ ${file} [${label}] ${issue.path.join(".")}: ${issue.message}`);
    }
    const key = `${kind}:${item?.id}`;
    if (seen.has(key)) {
      errors++;
      console.error(`✗ ${file} [${item?.id}] id repetido (también en ${seen.get(key)})`);
    } else seen.set(key, file);
  });
  console.log(`${errors ? "✗" : "✓"} ${file}: ${data.length} elementos (${kind})${errors ? `, ${errors} con errores` : ""}`);
  return errors;
}

async function main() {
  const args = process.argv.slice(2);
  const root = resolve(__dirname, "../src/content");
  let files: string[] = [];
  if (args.length) files = args.map((a) => resolve(a));
  else
    for (const k of Object.keys(SCHEMAS))
      if (existsSync(join(root, k)))
        files.push(
          ...readdirSync(join(root, k))
            .filter((f) => f.endsWith(".ts") && f !== "index.ts")
            .map((f) => join(root, k, f)),
        );
  const seen = new Map<string, string>();
  let errors = 0;
  for (const f of files) errors += await validateFile(f, seen);
  console.log(errors ? `\n${errors} errores` : `\nTodo el contenido es válido (${seen.size} elementos)`);
  process.exit(errors ? 1 : 0);
}
main();
