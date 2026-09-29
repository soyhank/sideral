"use client";

import { ArrowRight, Radar as RadarIcon } from "lucide-react";
import { useMemo } from "react";
import { coachTips } from "@/engine/analysis";
import { companyColor, ChartFrame } from "@/components/charts/base";
import { BarList } from "@/components/charts/Bars";
import { LineChart } from "@/components/charts/LineChart";
import { Meter, Stat } from "@/components/ui/display";
import { cx, int, money, moneyShort, pct, periodLabel } from "@/lib/format";
import { CoachCard, DilemmaCard, DilemmaOutcome, KpiDelta, NewsCard } from "./Cards";
import { useGameCtx } from "./context";

export function OverviewPanel({ go }: { go: (tab: string) => void }) {
  const { state, game, me, mine, result, history, idx, readOnly, spectator, intel, has } = useGameCtx();
  const tips = useMemo(() => coachTips(state, idx, result), [state, idx, result]);
  const prev = history.length > 1 ? history[history.length - 2].c.find((c) => c.i === idx) : undefined;
  const labels = history.map((h) => periodLabel(h.r, state.startYear));
  const first = state.round === 1 && !result;
  const playing = game.status === "activa";

  return (
    <div className="space-y-5">
      {first && (
        <section className="glass rounded-3xl p-6">
          <div className="eyebrow">Punto de partida</div>
          <h2 className="display mt-2 text-3xl sm:text-4xl">Recibes {me.name} en marcha</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-2">
            Tienes {money(me.cash)} en caja, una deuda de {money(me.debt)}, {int(me.headcount)} personas en el equipo y capacidad para {int(me.capacity)} unidades por trimestre. Compites contra{" "}
            {state.companies.length - 1} empresas durante {state.totalRounds} trimestres. Gana quien construya la empresa más valiosa y mejor gestionada.
          </p>
          {!readOnly && (
            <button className="btn btn-primary mt-5" onClick={() => go("decisiones")}>
              Tomar mis primeras decisiones
              <ArrowRight size={17} />
            </button>
          )}
        </section>
      )}

      {mine && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Ventas" value={moneyShort(mine.income.revenue)} delta={<KpiDelta now={mine.income.revenue} before={prev?.rev} />} hint={`${int(mine.units)} unidades`} />
          <Stat
            label="Utilidad neta"
            value={moneyShort(mine.income.net)}
            tone={mine.income.net < 0 ? "bad" : undefined}
            hint={`Margen ${pct(mine.ratios.netMargin)}`}
            delta={prev && prev.net > 0 ? <KpiDelta now={mine.income.net} before={prev.net} /> : undefined}
          />
          <Stat
            label="Caja"
            value={moneyShort(mine.balance.cash - mine.balance.overdraft)}
            tone={mine.balance.overdraft > 0 ? "bad" : undefined}
            hint={mine.balance.overdraft > 0 ? "En sobregiro" : `Deuda ${moneyShort(mine.balance.debt)}`}
          />
          <Stat label="Cuota de mercado" value={pct(mine.share)} hint={`Puesto ${mine.rank} de ${state.companies.length}`} delta={<KpiDelta now={mine.share} before={prev?.share} />} />
        </div>
      )}

      {playing && !spectator && (state.current.dilemma || state.current.news || intel?.hint) && (
        <div className="grid gap-5 lg:grid-cols-2">
          {state.current.dilemma && has("situaciones") && <DilemmaCard dilemma={state.current.dilemma} />}
          <div className="space-y-5">
            {state.current.news && <NewsCard news={state.current.news} />}
            {intel?.hint && (
              <section className="panel rounded-3xl p-5">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-ink-2 uppercase">
                  <RadarIcon size={14} />
                  Señal temprana de tu pronóstico
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">{intel.hint}</p>
              </section>
            )}
          </div>
        </div>
      )}

      {mine && (
        <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
          <ChartFrame title="Utilidad neta por trimestre" subtitle={spectator ? "La empresa observada en blanco, las demás en color" : "Tu empresa en blanco, tus rivales en color"}>
            <LineChart
              labels={labels}
              format={moneyShort}
              series={state.companies.map((c) => ({
                name: c.idx === idx && !spectator ? `${c.name} (tú)` : c.name,
                color: companyColor(c.idx, idx),
                focus: c.idx === idx,
                values: history.map((h) => h.c.find((x) => x.i === c.idx)?.net ?? null),
              }))}
            />
          </ChartFrame>
          <CoachCard tips={tips} />
        </div>
      )}
      {!mine && !first && <CoachCard tips={tips} />}

      {mine && (
        <div className="grid gap-5 lg:grid-cols-2">
          <section className="panel rounded-3xl p-5">
            <h3 className="text-[15px] font-semibold tracking-tight">Salud de la empresa</h3>
            <p className="mt-0.5 text-xs text-ink-3">Indicadores de 0 a 100</p>
            <div className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              <Meter label="Marca" value={me.brand} />
              <Meter label="Calidad" value={me.quality} />
              <Meter label="Satisfacción del cliente" value={me.satisfaction} />
              <Meter label="Clima laboral" value={me.morale} />
              <Meter label="Reputación" value={me.reputation} />
              <Meter label="Puntaje de gestión" value={mine.score / 10} hint={`${mine.score} de 1000 puntos`} />
            </div>
          </section>
          <ChartFrame title="Puntaje de gestión" subtitle="Combina finanzas, clientes, procesos y personas">
            <BarList
              format={(v) => int(v)}
              max={1000}
              items={[...(result?.companies ?? [])]
                .sort((a, b) => b.score - a.score)
                .map((c) => ({
                  label: state.companies[c.idx].name,
                  value: c.score,
                  color: companyColor(c.idx, idx),
                  focus: c.idx === idx,
                  note: c.idx === idx && !spectator ? "tú" : undefined,
                }))}
            />
          </ChartFrame>
        </div>
      )}

      {mine?.dilemma && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-ink-2">Lo que pasó con tu última decisión</h3>
          <DilemmaOutcome d={mine.dilemma} />
        </div>
      )}

      {mine && mine.notes.length > 0 && (
        <section className="panel rounded-3xl p-5">
          <h3 className="text-[15px] font-semibold tracking-tight">Notas del trimestre</h3>
          <ul className="mt-3 space-y-2">
            {mine.notes.map((n) => (
              <li key={n} className={cx("flex gap-2.5 text-sm leading-relaxed text-ink-2")}>
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-3" />
                {n}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
