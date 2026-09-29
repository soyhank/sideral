"use client";

import { AlertTriangle, ArrowDown, ArrowUp, CircleCheck, Lightbulb, Newspaper, Scale, ShieldAlert, TrendingDown, TrendingUp } from "lucide-react";
import type { Tip } from "@/engine/analysis";
import type { CompanyResult, DilemmaResult, PublicDilemma, PublicNews } from "@/engine/types";
import { hasInventory } from "@/engine/industries";
import { Progress } from "@/components/ui/display";
import { cx, int, money, moneyShort, pct, signedPct } from "@/lib/format";
import { useGameCtx } from "./context";

const PESTEL_LABEL: Record<string, string> = {
  politico: "Político",
  economico: "Económico",
  social: "Social",
  tecnologico: "Tecnológico",
  ambiental: "Ambiental",
  legal: "Legal",
};

const CATEGORY_LABEL: Record<string, string> = {
  tributario: "Tributario",
  laboral: "Laboral",
  legal: "Legal",
  etica: "Ética",
  finanzas: "Finanzas",
  marketing: "Marketing",
  clientes: "Clientes",
  operaciones: "Operaciones",
  proveedores: "Proveedores",
  tecnologia: "Tecnología",
  estrategia: "Estrategia",
  entorno: "Entorno",
};

export const VERDICT: Record<string, { label: string; chip: string }> = {
  optima: { label: "Decisión óptima", chip: "chip-good" },
  buena: { label: "Buena decisión", chip: "chip-info" },
  riesgosa: { label: "Decisión riesgosa", chip: "chip-warn" },
  mala: { label: "Mala decisión", chip: "chip-bad" },
};

function Sign({ v, up, down }: { v: number; up: string; down: string }) {
  if (!v) return null;
  const good = (v > 0 && up.startsWith("+")) || (v < 0 && down.startsWith("+"));
  return (
    <span className={cx("chip", good ? "chip-good" : "chip-bad")}>
      {v > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
      {(v > 0 ? up : down).replace(/^[+-]/, "")}
    </span>
  );
}

export function NewsCard({ news, compact }: { news: PublicNews; compact?: boolean }) {
  return (
    <article className="panel overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-ink-2 uppercase">
          <Newspaper size={14} />
          Noticia del trimestre
        </span>
        <span className="chip">{PESTEL_LABEL[news.pestel]}</span>
      </div>
      <div className="p-5">
        <h3 className="display text-[1.65rem] leading-tight">{news.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-2">{news.text}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <Sign v={news.signs.demand} up="+Sube la demanda" down="-Baja la demanda" />
          <Sign v={news.signs.cost} up="-Suben los costos" down="+Bajan los costos" />
          <Sign v={news.signs.rate} up="-Sube la tasa de interés" down="+Baja la tasa de interés" />
          <Sign v={news.signs.wage} up="-Sube la planilla" down="+Baja la planilla" />
          <span className="chip">
            {news.rounds === 1 ? "Dura este trimestre" : `Dura ${news.rounds} trimestres`}
          </span>
        </div>
        {!compact && (
          <div className="mt-4 flex gap-2.5 rounded-2xl bg-white/4 px-3.5 py-3 text-xs leading-relaxed text-ink-2 ring-1 ring-white/8">
            <Lightbulb size={15} className="mt-px shrink-0 text-warn" />
            <span>{news.lesson}</span>
          </div>
        )}
      </div>
    </article>
  );
}

export function DilemmaCard({ dilemma }: { dilemma: PublicDilemma }) {
  const { draft, update, readOnly } = useGameCtx();
  return (
    <article className="glass overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
        <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-ink-2 uppercase">
          <Scale size={14} />
          Situación del trimestre
        </span>
        <span className="chip">{CATEGORY_LABEL[dilemma.category]}</span>
      </div>
      <div className="p-5">
        <h3 className="display text-[1.65rem] leading-tight">{dilemma.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-2">{dilemma.situation}</p>
        <div className="mt-5 grid gap-2.5" role="radiogroup" aria-label="Opciones">
          {dilemma.options.map((o) => {
            const on = draft.choice === o.id;
            return (
              <button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={on}
                disabled={readOnly}
                onClick={() => update((x) => void (x.choice = o.id))}
                className={cx(
                  "flex items-start gap-3.5 rounded-2xl border px-4 py-3.5 text-left transition disabled:cursor-not-allowed",
                  on ? "border-white/60 bg-white/12" : "border-line bg-black/20 hover:border-line-2 hover:bg-white/6",
                )}
              >
                <span className={cx("mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold uppercase transition", on ? "bg-white text-black" : "bg-white/10 text-ink-2")}>
                  {o.id}
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{o.label}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-ink-3">{o.detail}</span>
                </span>
              </button>
            );
          })}
        </div>
        {!draft.choice && !readOnly && (
          <p className="mt-3.5 flex items-center gap-2 text-xs text-warn">
            <AlertTriangle size={14} />
            Si no eliges, los hechos decidirán por ti y casi nunca a tu favor.
          </p>
        )}
        <p className="mt-3 text-xs text-ink-3">Concepto en juego: {dilemma.concept}</p>
      </div>
    </article>
  );
}

export function DilemmaOutcome({ d }: { d: DilemmaResult }) {
  const v = VERDICT[d.verdict];
  return (
    <article className="panel rounded-3xl p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={cx("chip", v.chip)}>{v.label}</span>
        <span className="text-xs text-ink-3">{d.title}</span>
      </div>
      <p className="mt-3 text-sm font-medium">Elegiste: {d.label}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{d.outcome}</p>
      {d.riskHit && d.riskText && (
        <div className="mt-3 flex gap-2.5 rounded-2xl bg-bad/10 px-3.5 py-3 text-xs leading-relaxed text-[#ffa39c] ring-1 ring-bad/25">
          <ShieldAlert size={15} className="mt-px shrink-0" />
          <span>{d.riskText}</span>
        </div>
      )}
      {Math.abs(d.cash) >= 1 && (
        <p className="num mt-3 text-xs text-ink-2">
          Efecto en caja: <span className={d.cash > 0 ? "text-good" : "text-bad"}>{money(d.cash)}</span>
        </p>
      )}
      <div className="mt-3 flex gap-2.5 rounded-2xl bg-white/4 px-3.5 py-3 text-xs leading-relaxed text-ink-2 ring-1 ring-white/8">
        <Lightbulb size={15} className="mt-px shrink-0 text-warn" />
        <span>
          <strong className="text-ink">{d.concept}.</strong> {d.lesson}
          {d.verdict !== "optima" && d.best.id !== d.choice && <> La mejor salida era: {d.best.label}.</>}
        </span>
      </div>
    </article>
  );
}

const TIP_STYLE = {
  alerta: { icon: AlertTriangle, cls: "text-bad bg-bad/10 ring-bad/25" },
  mejora: { icon: TrendingUp, cls: "text-warn bg-warn/10 ring-warn/20" },
  bien: { icon: CircleCheck, cls: "text-good bg-good/10 ring-good/20" },
};

export function CoachCard({ tips }: { tips: Tip[] }) {
  return (
    <section className="panel rounded-3xl p-5">
      <h3 className="text-[15px] font-semibold tracking-tight">Tu coach</h3>
      <p className="mt-0.5 text-xs text-ink-3">Lectura de tu último trimestre</p>
      <ul className="mt-4 space-y-3">
        {tips.map((t) => {
          const s = TIP_STYLE[t.level];
          return (
            <li key={t.title} className="flex gap-3">
              <span className={cx("grid h-8 w-8 shrink-0 place-items-center rounded-xl ring-1", s.cls)}>
                <s.icon size={15} />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2">
                  <span className="text-sm font-medium">{t.title}</span>
                  <span className="text-[11px] text-ink-3">{t.area}</span>
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-ink-2">{t.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Line({ label, value, tone, strong }: { label: string; value: string; tone?: "good" | "bad" | "warn"; strong?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5">
      <span className={cx("text-[13px]", strong ? "font-medium text-ink" : "text-ink-2")}>{label}</span>
      <span className={cx("num text-sm", strong ? "font-semibold" : "font-medium", tone === "good" && "text-good", tone === "bad" && "text-bad", tone === "warn" && "text-warn")}>{value}</span>
    </div>
  );
}

/** Proyección en vivo: qué pasaría si cierras el trimestre con las decisiones actuales. */
export function ProjectionPanel({ dense }: { dense?: boolean }) {
  const { projection: p, ind, me, d, mine, intel, has } = useGameCtx();
  if (!p) return null;
  const inventory = hasInventory(ind);
  const demand = Object.values(p.products).reduce((s, x) => s + x.demand, 0);
  const sold = Object.values(p.products).reduce((s, x) => s + x.sold, 0);
  const spoiled = Object.values(p.products).reduce((s, x) => s + x.spoiled, 0);
  const left = Object.values(p.products).reduce((s, x) => s + x.inventory, 0);
  const unmet = Math.max(0, demand - sold);
  const cashEnd = p.balance.cash - p.balance.overdraft;
  const use = has("personas") ? p.ratios.utilization : (p.ratios.utilization * p.effectiveCapacity) / Math.max(1, me.capacity);
  const warnings: string[] = [];
  if (p.balance.overdraft > 0) warnings.push("Terminarías en sobregiro. Reduce gastos, pide un préstamo o sube ventas.");
  if (demand > 0 && unmet / demand > 0.04) warnings.push(`No alcanzarías a atender ${int(unmet)} pedidos. Revisa volumen, capacidad o personal.`);
  if (inventory && spoiled > sold * 0.05 && ind.perishability > 0) warnings.push(`Se perderían ${int(spoiled)} unidades por sobrar. Produce menos o vende más.`);
  if (use > 1.02) warnings.push("Trabajarías con horas extra: cuestan 50 % más y desgastan al equipo.");
  if (use < 0.6) warnings.push("Usarías menos del 60 % de tu capacidad.");
  if (p.income.net < 0) warnings.push("El trimestre cerraría con pérdida.");
  return (
    <div className={cx("space-y-4", dense && "text-sm")}>
      <div>
        <div className="eyebrow">Proyección del trimestre</div>
        <div className={cx("num mt-2 text-[2rem] leading-none font-semibold tracking-tight", p.income.net < 0 ? "text-bad" : "text-ink")}>{moneyShort(p.income.net)}</div>
        <div className="mt-1 flex items-center gap-2 text-xs text-ink-3">
          utilidad neta
          {mine && (
            <span className={cx("num inline-flex items-center gap-0.5", p.income.net >= mine.income.net ? "text-good" : "text-bad")}>
              {p.income.net >= mine.income.net ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {moneyShort(Math.abs(p.income.net - mine.income.net))} frente al anterior
            </span>
          )}
        </div>
      </div>
      <div className="divide-y divide-white/6">
        <Line label="Ventas" value={money(p.income.revenue)} strong />
        <Line label="Costo de ventas" value={money(-p.income.cogs)} />
        <Line label="Personal" value={money(-p.income.personnel)} />
        <Line label="Marketing" value={money(-p.income.marketing)} />
        <Line label="Gastos fijos y otros" value={money(-(p.income.admin + p.income.other + p.income.depreciation))} />
        <Line label="Intereses" value={money(-p.income.interest)} />
        <Line label="Impuesto a la renta" value={money(-p.income.tax)} />
        <Line label="Utilidad neta" value={money(p.income.net)} strong tone={p.income.net < 0 ? "bad" : "good"} />
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <div className="well rounded-2xl p-3">
          <div className="text-[11px] text-ink-3">Caja al cierre</div>
          <div className={cx("num mt-0.5 text-base font-semibold", cashEnd < 0 && "text-bad")}>{moneyShort(cashEnd)}</div>
        </div>
        <div className="well rounded-2xl p-3">
          <div className="text-[11px] text-ink-3">Margen neto</div>
          <div className={cx("num mt-0.5 text-base font-semibold", p.ratios.netMargin < 0 && "text-bad")}>{pct(p.ratios.netMargin)}</div>
        </div>
        <div className="well rounded-2xl p-3">
          <div className="text-[11px] text-ink-3">Demanda / ventas</div>
          <div className="num mt-0.5 text-base font-semibold">
            {int(demand)} / {int(sold)}
          </div>
        </div>
        <div className="well rounded-2xl p-3">
          <div className="text-[11px] text-ink-3">{inventory ? "Inventario final" : "Punto de equilibrio"}</div>
          <div className="num mt-0.5 text-base font-semibold">{inventory ? int(left) : moneyShort(p.ratios.breakEven)}</div>
        </div>
      </div>
      <div>
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="text-ink-3">Uso de capacidad</span>
          <span className="num font-medium">{pct(use, 0)}</span>
        </div>
        <Progress value={use / 1.15} tone={use > 1.02 ? "warn" : use >= 0.7 ? "good" : "white"} />
      </div>
      {warnings.length > 0 && (
        <ul className="space-y-1.5">
          {warnings.slice(0, 3).map((w) => (
            <li key={w} className="flex gap-2 text-xs leading-relaxed text-[#ffe680]">
              <AlertTriangle size={13} className="mt-0.5 shrink-0" />
              {w}
            </li>
          ))}
        </ul>
      )}
      <p className="text-[11px] leading-relaxed text-ink-4">
        {intel?.demandFactor
          ? "Incluye el efecto del entorno que anticipó tu pronóstico. "
          : "No incluye noticias ni situaciones que aún no conoces. "}
        Supone que tus rivales repiten su jugada anterior. Caja inicial: {moneyShort(me.cash - me.overdraft)}. Venta base del rubro: {moneyShort(d.r0)}.
      </p>
    </div>
  );
}

export function KpiDelta({ now, before, format = signedPct }: { now: number; before: number | undefined; format?: (v: number) => string }) {
  if (before === undefined || before === 0) return null;
  const v = now / before - 1;
  if (!Number.isFinite(v)) return null;
  return <span className={cx("num text-xs font-medium", v >= 0 ? "text-good" : "text-bad")}>{format(v)}</span>;
}

export function companyOf(result: { companies: CompanyResult[] } | null, idx: number): CompanyResult | null {
  return result?.companies[idx] ?? null;
}
