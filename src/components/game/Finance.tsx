"use client";

import { useEffect, useState } from "react";
import type { CompanyResult, RoundResult } from "@/engine/types";
import { IGV, IR_GENERAL, IR_RMT_LOW, LABOR_LOAD, RMT_LOW_LIMIT_UIT, UIT } from "@/engine/constants";
import { ChartFrame } from "@/components/charts/base";
import { Columns } from "@/components/charts/Bars";
import { Segmented } from "@/components/ui/controls";
import { Empty, Spinner } from "@/components/ui/display";
import { cx, money, moneyShort, pct, periodLabel } from "@/lib/format";
import { useGameCtx } from "./context";
import { fetchRound } from "./useGame";

type View = "resultados" | "situacion" | "efectivo" | "tributos" | "ratios" | "presupuesto";

function Row({ label, value, kind, tone }: { label: string; value: number; kind?: "sub" | "total"; tone?: boolean }) {
  return (
    <tr className={kind}>
      <td>{label}</td>
      <td className={cx(tone && value < 0 && "text-bad", tone && value > 0 && kind === "total" && "text-good")}>{money(value)}</td>
    </tr>
  );
}

function Table({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div>
      {title && <div className="eyebrow mb-2 px-1">{title}</div>}
      <div className="well overflow-hidden rounded-2xl">
        <table className="table-fin">
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

function Income({ c }: { c: CompanyResult }) {
  const i = c.income;
  return (
    <Table>
      <Row label="Ventas netas" value={i.revenue} kind="total" />
      <Row label="Costo de ventas" value={-i.cogs} kind="sub" />
      <Row label="Utilidad bruta" value={i.gross} kind="total" tone />
      <Row label="Gastos de personal" value={-i.personnel} kind="sub" />
      <Row label="Gastos de marketing y ventas" value={-i.marketing} kind="sub" />
      <Row label="Gastos administrativos" value={-i.admin} kind="sub" />
      <Row label="Otros gastos de operación" value={-i.other} kind="sub" />
      <Row label="EBITDA" value={i.ebitda} kind="total" tone />
      <Row label="Depreciación" value={-i.depreciation} kind="sub" />
      <Row label="Utilidad operativa" value={i.ebit} kind="total" tone />
      <Row label="Gastos financieros" value={-i.interest} kind="sub" />
      {Math.abs(i.extraordinary) >= 1 && <Row label="Resultado de situaciones del trimestre" value={i.extraordinary} kind="sub" />}
      <Row label="Utilidad antes de impuestos" value={i.pbt} kind="total" tone />
      <Row label="Impuesto a la renta" value={-i.tax} kind="sub" />
      <Row label="Utilidad neta" value={i.net} kind="total" tone />
    </Table>
  );
}

function Balance({ c }: { c: CompanyResult }) {
  const b = c.balance;
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Table title="Activo">
        <Row label="Efectivo" value={b.cash} kind="sub" />
        <Row label="Cuentas por cobrar" value={b.receivables} kind="sub" />
        <Row label="Inventarios" value={b.inventory} kind="sub" />
        <Row label="Crédito fiscal del IGV" value={b.igvCredit} kind="sub" />
        <Row label="Activo fijo neto" value={b.fixedAssets} kind="sub" />
        <Row label="Total activo" value={b.assets} kind="total" />
      </Table>
      <Table title="Pasivo y patrimonio">
        <Row label="Cuentas por pagar a proveedores" value={b.payables} kind="sub" />
        <Row label="IGV por pagar" value={b.igvPayable} kind="sub" />
        <Row label="Impuesto a la renta por pagar" value={b.taxPayable} kind="sub" />
        <Row label="Sobregiro bancario" value={b.overdraft} kind="sub" />
        <Row label="Préstamos" value={b.debt} kind="sub" />
        <Row label="Total pasivo" value={b.liabilities} kind="total" />
        <Row label="Capital" value={b.capital} kind="sub" />
        <Row label="Resultados acumulados" value={b.retained} kind="sub" />
        <Row label="Total patrimonio" value={b.equity} kind="total" />
        <Row label="Total pasivo y patrimonio" value={b.liabilities + b.equity} kind="total" />
      </Table>
    </div>
  );
}

function Cash({ c }: { c: CompanyResult }) {
  const f = c.cashflow;
  return (
    <Table>
      <Row label="Efectivo al inicio" value={f.start} kind="total" />
      <Row label="Cobranza a clientes" value={f.collections} kind="sub" />
      <Row label="Pago a proveedores" value={f.suppliers} kind="sub" />
      <Row label="Pago de planilla" value={f.payroll} kind="sub" />
      <Row label="Pago de gastos" value={f.expenses} kind="sub" />
      <Row label="Pago de tributos (IGV y renta)" value={f.taxes} kind="sub" />
      <Row label="Flujo de operación" value={f.operating} kind="total" tone />
      <Row label="Inversión en capacidad" value={f.capex} kind="sub" />
      <Row label="Flujo de inversión" value={f.investing} kind="total" tone />
      <Row label="Préstamos recibidos" value={f.loans} kind="sub" />
      <Row label="Amortización de préstamos" value={f.repayments} kind="sub" />
      <Row label="Intereses pagados" value={f.interest} kind="sub" />
      <Row label="Dividendos pagados" value={f.dividends} kind="sub" />
      <Row label="Variación del sobregiro" value={f.overdraft} kind="sub" />
      {f.rescue > 0 && <Row label="Aporte de rescate de inversionistas" value={f.rescue} kind="sub" />}
      <Row label="Flujo de financiamiento" value={f.financing} kind="total" tone />
      <Row label="Efectivo al cierre" value={f.end} kind="total" />
    </Table>
  );
}

function Taxes({ c }: { c: CompanyResult }) {
  const t = c.taxes;
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="space-y-3">
        <Table title={`IGV (${Math.round(IGV * 100)} %)`}>
          <Row label="IGV de tus ventas (débito fiscal)" value={t.igvSales} kind="sub" />
          <Row label="IGV de tus compras (crédito fiscal)" value={-t.igvPurchases} kind="sub" />
          <Row label="Crédito fiscal de trimestres anteriores" value={-t.igvCreditUsed} kind="sub" />
          <Row label="IGV por pagar el próximo trimestre" value={t.igvToPay} kind="total" />
          <Row label="Saldo a favor para después" value={t.igvCreditNext} kind="sub" />
        </Table>
        <p className="px-1 text-xs leading-relaxed text-ink-3">
          El IGV no es un ingreso ni un gasto de tu empresa: lo cobras al cliente, descuentas el que pagaste en tus compras y entregas la diferencia a la SUNAT. Sí afecta tu caja por el momento en que se paga.
        </p>
      </div>
      <div className="space-y-3">
        <Table title="Impuesto a la renta">
          <Row label="Utilidad antes de impuestos" value={c.income.pbt} kind="sub" />
          <Row label="Pérdidas de trimestres anteriores compensadas" value={-t.lossUsed} kind="sub" />
          <Row label="Renta neta imponible" value={t.taxableIncome} kind="total" />
          <Row label="Impuesto a la renta" value={t.incomeTax} kind="total" />
        </Table>
        <p className="px-1 text-xs leading-relaxed text-ink-3">
          Régimen aplicado: <strong className="text-ink-2">{t.regime === "RMT" ? "MYPE Tributario" : "General"}</strong>.{" "}
          {t.regime === "RMT"
            ? `Paga ${Math.round(IR_RMT_LOW * 100)} % hasta ${RMT_LOW_LIMIT_UIT} UIT de renta neta al año y ${(IR_GENERAL * 100).toFixed(1)} % por el exceso. El simulador usa una UIT referencial de ${money(UIT)}.`
            : `Paga ${(IR_GENERAL * 100).toFixed(1)} % sobre la renta neta.`}
        </p>
        <Table title="Costo laboral">
          <Row label={`Cargas sociales del trimestre (${Math.round(LABOR_LOAD * 100)} % de la planilla)`} value={t.socialCharges} kind="sub" />
        </Table>
        <p className="px-1 text-xs leading-relaxed text-ink-3">Incluye EsSalud, gratificaciones de julio y diciembre, CTS y vacaciones. Es lo que cuesta un trabajador por encima de su sueldo.</p>
      </div>
    </div>
  );
}

function Ratios({ c }: { c: CompanyResult }) {
  const r = c.ratios;
  const items: { l: string; v: string; h: string; bad?: boolean }[] = [
    { l: "Margen bruto", v: pct(r.grossMargin), h: "Lo que queda de cada sol vendido después del costo del producto" },
    { l: "Margen EBITDA", v: pct(r.ebitdaMargin), h: "Rentabilidad de la operación antes de depreciación, intereses e impuestos" },
    { l: "Margen neto", v: pct(r.netMargin), h: "Utilidad final por cada sol vendido", bad: r.netMargin < 0 },
    { l: "ROE", v: pct(r.roe), h: "Utilidad anualizada sobre el patrimonio de los accionistas", bad: r.roe < 0 },
    { l: "ROA", v: pct(r.roa), h: "Utilidad anualizada sobre el total de activos", bad: r.roa < 0 },
    { l: "Liquidez corriente", v: r.currentRatio.toFixed(2), h: "Activo corriente entre pasivo corriente. Por debajo de 1 hay riesgo", bad: r.currentRatio < 1 },
    { l: "Prueba ácida", v: r.acidRatio.toFixed(2), h: "Igual que la anterior, pero sin contar inventarios", bad: r.acidRatio < 0.7 },
    { l: "Endeudamiento", v: pct(r.debtRatio), h: "Parte del activo financiada con deuda", bad: r.debtRatio > 0.65 },
    { l: "Días de inventario", v: `${r.inventoryDays}`, h: "Cuánto tarda tu mercadería en venderse" },
    { l: "Días de cobranza", v: `${r.collectionDays}`, h: "Cuánto tardan tus clientes en pagarte", bad: r.collectionDays > 60 },
    { l: "Punto de equilibrio", v: moneyShort(r.breakEven), h: "Ventas mínimas del trimestre para no perder" },
    { l: "Retorno al accionista", v: pct(r.tsr), h: "Subida de la acción más dividendos desde el inicio", bad: r.tsr < 0 },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i) => (
        <div key={i.l} className="well rounded-2xl p-4">
          <div className="text-xs text-ink-3">{i.l}</div>
          <div className={cx("num mt-1 text-xl font-semibold", i.bad && "text-bad")}>{i.v}</div>
          <div className="mt-1.5 text-[11px] leading-relaxed text-ink-4">{i.h}</div>
        </div>
      ))}
    </div>
  );
}

/** Presupuesto frente a real: compara lo que proyectaste con lo que ocurrió. */
function Budget({ c, forecast }: { c: CompanyResult; forecast: { revenue: number; net: number; units: number } | null }) {
  if (!forecast)
    return <Empty title="Sin presupuesto registrado" text="Tu proyección queda guardada como presupuesto al cerrar cada trimestre. Aquí verás cuánto te desviaste." />;
  const rows = [
    { l: "Ventas", plan: forecast.revenue, real: c.income.revenue, money: true },
    { l: "Utilidad neta", plan: forecast.net, real: c.income.net, money: true },
    { l: "Unidades vendidas", plan: forecast.units, real: c.units, money: false },
  ];
  const err = forecast.revenue > 0 ? Math.abs(c.income.revenue - forecast.revenue) / forecast.revenue : 1;
  return (
    <div className="space-y-4">
      <div className="well overflow-hidden rounded-2xl">
        <table className="table-fin">
          <thead>
            <tr>
              <th>Concepto</th>
              <th>Presupuesto</th>
              <th>Real</th>
              <th>Desviación</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const diff = r.real - r.plan;
              const rel = r.plan !== 0 ? diff / Math.abs(r.plan) : 0;
              return (
                <tr key={r.l}>
                  <td>{r.l}</td>
                  <td>{r.money ? money(r.plan) : Math.round(r.plan).toLocaleString("es-PE")}</td>
                  <td>{r.money ? money(r.real) : Math.round(r.real).toLocaleString("es-PE")}</td>
                  <td className={cx(diff >= 0 ? "text-good" : "text-bad")}>
                    {diff >= 0 ? "+" : "−"}
                    {Math.abs(rel * 100).toFixed(1)} %
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="px-1 text-xs leading-relaxed text-ink-3">
        Tu pronóstico de ventas se desvió {pct(err)}.{" "}
        {err < 0.05
          ? "Excelente precisión: planificaste con datos."
          : err < 0.15
            ? "Desviación normal. Revisa qué cambió: los rivales, el entorno o tu propia capacidad."
            : "Desviación alta. Casi siempre se explica por una noticia del entorno, una situación o un rival que cambió de estrategia."}
      </p>
    </div>
  );
}

export function FinancePanel() {
  const { state, game, result, history, idx } = useGameCtx();
  const [view, setView] = useState<View>("resultados");
  const [round, setRound] = useState<number>(result?.round ?? 0);
  const [past, setPast] = useState<RoundResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [forecasts, setForecasts] = useState<Record<number, { revenue: number; net: number; units: number } | null>>({});

  useEffect(() => {
    setRound(result?.round ?? 0);
    setPast(null);
  }, [result?.round]);

  useEffect(() => {
    if (!result || round === result.round || round <= 0) return setPast(null);
    let alive = true;
    setLoading(true);
    fetchRound(game.id, round).then((r) => {
      if (!alive) return;
      setPast(r);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [round, result, game.id]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`sideral:presupuesto:${game.id}`);
      setForecasts(raw ? JSON.parse(raw) : {});
    } catch {
      setForecasts({});
    }
  }, [game.id, result?.round]);

  if (!result || idx < 0)
    return <Empty title="Aún no hay estados financieros" text="Se generan al cerrar cada trimestre: resultados, situación financiera, flujo de efectivo y tributos." />;
  const shown = round === result.round ? result : past;
  const c = shown?.companies[idx] ?? null;
  const labels = history.map((h) => periodLabel(h.r, state.startYear));

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartFrame title="Ventas y utilidad" subtitle="Por trimestre">
          <Columns
            format={moneyShort}
            height={200}
            series={[
              { name: "Ventas", color: "#3987e5" },
              { name: "Utilidad neta", color: "#f5f5f7" },
            ]}
            groups={history.map((h, i) => {
              const cell = h.c.find((x) => x.i === idx);
              return { label: labels[i], values: [cell?.rev ?? 0, cell?.net ?? 0] };
            })}
          />
          <div className="mt-3 flex gap-4 text-xs text-ink-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-[#3987e5]" />
              Ventas
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-[3px] bg-[#f5f5f7]" />
              Utilidad neta
            </span>
          </div>
        </ChartFrame>
        <ChartFrame title="Caja al cierre" subtitle="Efectivo menos sobregiro">
          <Columns
            format={moneyShort}
            height={200}
            series={[{ name: "Caja", color: "#199e70" }]}
            groups={history.map((h, i) => ({ label: labels[i], values: [h.c.find((x) => x.i === idx)?.cash ?? 0] }))}
          />
        </ChartFrame>
      </div>

      <section className="panel rounded-3xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Segmented
            value={view}
            onChange={setView}
            size="sm"
            className="!flex-nowrap"
            options={[
              { value: "resultados", label: "Resultados" },
              { value: "situacion", label: "Situación" },
              { value: "efectivo", label: "Efectivo" },
              { value: "tributos", label: "Tributos" },
              { value: "ratios", label: "Ratios" },
              { value: "presupuesto", label: "Presupuesto" },
            ]}
          />
          <label className="flex items-center gap-2 text-xs text-ink-3">
            Periodo
            <select className="field !h-9 !w-auto !rounded-xl !px-3 !text-sm" value={round} onChange={(e) => setRound(Number(e.target.value))}>
              {history.map((h) => (
                <option key={h.r} value={h.r} className="bg-[#16161a]">
                  {periodLabel(h.r, state.startYear)}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-5">
          {loading || !c ? (
            <div className="grid place-items-center py-16 text-ink-3">
              <Spinner size={22} />
            </div>
          ) : (
            <>
              {view === "resultados" && <Income c={c} />}
              {view === "situacion" && <Balance c={c} />}
              {view === "efectivo" && <Cash c={c} />}
              {view === "tributos" && <Taxes c={c} />}
              {view === "ratios" && <Ratios c={c} />}
              {view === "presupuesto" && <Budget c={c} forecast={forecasts[round] ?? null} />}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
