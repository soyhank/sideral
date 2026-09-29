"use client";

import { Lock } from "lucide-react";
import { REGION_IDS } from "@/content/types";
import { CHANNEL_NAMES, REGION_NAMES } from "@/engine/constants";
import { CHANNEL_IDS, type ProductId } from "@/engine/types";
import { ChartFrame, companyColor } from "@/components/charts/base";
import { BarList, ShareBar } from "@/components/charts/Bars";
import { LineChart } from "@/components/charts/LineChart";
import { Empty } from "@/components/ui/display";
import { cx, int, moneyShort, pct, periodLabel, price } from "@/lib/format";
import { NewsCard } from "./Cards";
import { useGameCtx } from "./context";

export function MarketPanel() {
  const { state, ind, result, history, idx, me, has, spectator } = useGameCtx();
  if (!result)
    return <Empty title="Aún no hay datos de mercado" text="Cierra tu primer trimestre para ver cómo se repartió la demanda entre las empresas." />;
  const labels = history.map((h) => periodLabel(h.r, state.startYear));
  const knowsRivals = Boolean(me.last?.research.competitors);
  const knowsConsumer = Boolean(me.last?.research.consumer);
  const products = ind.products.filter((p) => result.market.products[p.id].sold > 0 || state.companies.some((c) => c.products[p.id].active));
  const weights = [
    { label: "Precio", value: ind.products[0].elasticity / 3 },
    { label: "Calidad", value: ind.products[0].qualityWeight },
    { label: "Marca", value: ind.weights.brand },
    { label: "Publicidad", value: ind.weights.marketing },
    { label: "Plazo de pago", value: ind.weights.credit },
  ].filter((w) => w.value > 0);
  const topWeight = Math.max(...weights.map((w) => w.value));

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartFrame title="Cuota de mercado" subtitle={`Participación en las ventas totales, ${periodLabel(result.round, state.startYear)}`}>
          <ShareBar
            format={(v) => pct(v)}
            items={[...result.companies]
              .sort((a, b) => b.share - a.share)
              .map((c) => ({ label: c.idx === idx && !spectator ? `${state.companies[c.idx].name} (tú)` : state.companies[c.idx].name, value: c.share, color: companyColor(c.idx, idx), focus: c.idx === idx }))}
          />
        </ChartFrame>
        <ChartFrame title="Evolución de la cuota" subtitle="Quién gana y quién pierde terreno">
          <LineChart
            labels={labels}
            format={(v) => pct(v, 0)}
            height={210}
            series={state.companies.map((c) => ({
              name: c.name,
              color: companyColor(c.idx, idx),
              focus: c.idx === idx,
              values: history.map((h) => h.c.find((x) => x.i === c.idx)?.share ?? null),
            }))}
          />
        </ChartFrame>
      </div>

      {result.news && <NewsCard news={result.news} compact />}

      <section className="panel overflow-hidden rounded-3xl">
        <div className="px-5 pt-5">
          <h3 className="text-[15px] font-semibold tracking-tight">Tablero de competidores</h3>
          <p className="mt-0.5 text-xs text-ink-3">Precios y resultados son públicos. Lo demás se conoce con inteligencia competitiva.</p>
        </div>
        <div className="scroll-thin mt-4 overflow-x-auto">
          <table className="table-fin min-w-[760px]">
            <thead>
              <tr>
                <th>Empresa</th>
                {products.map((p) => (
                  <th key={p.id}>Precio {p.name.split(" ")[0].toLowerCase()}</th>
                ))}
                <th>Ventas</th>
                <th>Utilidad</th>
                <th>Cuota</th>
                <th>Regiones</th>
                <th>Marca</th>
                <th>Calidad</th>
                <th>Publicidad</th>
              </tr>
            </thead>
            <tbody>
              {[...result.companies]
                .sort((a, b) => a.rank - b.rank)
                .map((c) => {
                  const s = state.companies[c.idx];
                  const self = c.idx === idx;
                  const open = self || knowsRivals;
                  return (
                    <tr key={c.idx} className={cx(self && "bg-white/6")}>
                      <td>
                        <span className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: companyColor(c.idx, idx) }} />
                          <span className={cx("truncate", self && "font-semibold")}>{s.name}</span>
                          {self && !spectator && <span className="chip chip-white !h-5 !px-1.5 !text-[10px]">tú</span>}
                        </span>
                      </td>
                      {products.map((p) => (
                        <td key={p.id}>{c.products[p.id].active ? price(c.products[p.id].price) : <span className="text-ink-4">no vende</span>}</td>
                      ))}
                      <td>{moneyShort(c.income.revenue)}</td>
                      <td className={cx(c.income.net < 0 && "text-bad")}>{moneyShort(c.income.net)}</td>
                      <td>{pct(c.share)}</td>
                      <td>{REGION_IDS.filter((r) => s.regions[r]).length}</td>
                      <td>{open ? Math.round(c.brand) : <Lock size={12} className="ml-auto text-ink-4" />}</td>
                      <td>{open ? Math.round(c.quality) : <Lock size={12} className="ml-auto text-ink-4" />}</td>
                      <td>{open ? moneyShort(c.income.marketing) : <Lock size={12} className="ml-auto text-ink-4" />}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {!knowsRivals && has("investigacion") && (
          <p className="border-t border-line px-5 py-3 text-xs text-ink-3">Compra inteligencia competitiva en tus decisiones para ver marca, calidad y publicidad de tus rivales.</p>
        )}
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartFrame title="Demanda por línea" subtitle="Unidades que pidió el mercado y cuántas te tocaron">
          <div className="space-y-5">
            {products.map((p) => {
              const m = result.market.products[p.id as ProductId];
              const mineP = result.companies[idx]?.products[p.id];
              return (
                <div key={p.id}>
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-sm font-medium">{p.name}</span>
                    <span className="num text-xs text-ink-3">
                      Mercado: {int(m.demand)} · precio promedio {price(m.avgPrice)} · crece {pct(m.growth, 0)} al año
                    </span>
                  </div>
                  <BarList
                    format={(v) => int(v)}
                    items={[...result.companies]
                      .filter((c) => c.products[p.id].active)
                      .sort((a, b) => b.products[p.id].sold - a.products[p.id].sold)
                      .map((c) => ({ label: state.companies[c.idx].name, value: c.products[p.id].sold, color: companyColor(c.idx, idx), focus: c.idx === idx }))}
                  />
                  {mineP?.active && mineP.demand > mineP.sold && (
                    <p className="mt-2 text-xs text-warn">Te pidieron {int(mineP.demand)} y solo pudiste entregar {int(mineP.sold)}.</p>
                  )}
                </div>
              );
            })}
          </div>
        </ChartFrame>

        <div className="space-y-5">
          <ChartFrame title="Entorno económico" subtitle="Variables que no controlas">
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { l: "Tasa de interés", v: pct(result.market.rate, 1), h: "anual para empresas" },
                { l: "Tipo de cambio", v: `S/ ${state.market.fx.toFixed(3)}`, h: `${state.market.fx >= state.market.fx0 ? "+" : "−"}${Math.abs((state.market.fx / state.market.fx0 - 1) * 100).toFixed(1)} % desde el inicio` },
                { l: "Costos", v: `+${((state.market.costIndex - 1) * 100).toFixed(1)} %`, h: "inflación acumulada" },
              ].map((s) => (
                <div key={s.l} className="well rounded-2xl p-3">
                  <div className="text-[11px] text-ink-3">{s.l}</div>
                  <div className="num mt-0.5 text-base font-semibold">{s.v}</div>
                  <div className="mt-0.5 text-[10.5px] leading-tight text-ink-4">{s.h}</div>
                </div>
              ))}
            </div>
            {state.market.news.length > 0 && (
              <ul className="mt-4 space-y-2">
                {state.market.news.map((n) => (
                  <li key={n.id} className="flex items-start justify-between gap-3 text-xs">
                    <span className="text-ink-2">{n.title}</span>
                    <span className="chip shrink-0">{n.rounds === 1 ? "1 trimestre más" : `${n.rounds} trimestres más`}</span>
                  </li>
                ))}
              </ul>
            )}
            {Math.abs(ind.fxExposure) >= 0.2 && (
              <p className="mt-3 text-xs leading-relaxed text-ink-3">
                {ind.fxExposure > 0
                  ? "Tu rubro compra en dólares: cuando el dólar sube, tus costos suben."
                  : "Tu rubro vende en dólares: cuando el dólar sube, tu negocio mejora."}
              </p>
            )}
          </ChartFrame>

          <ChartFrame title="Qué valora tu cliente" subtitle={knowsConsumer ? "Resultados de tu estudio del consumidor" : "Disponible con el estudio del consumidor"}>
            {knowsConsumer ? (
              <div className="space-y-5">
                <BarList format={() => ""} max={topWeight} items={weights.sort((a, b) => b.value - a.value).map((w) => ({ label: w.label, value: w.value, color: "#f5f5f7" }))} />
                <div>
                  <div className="mb-2 text-xs font-medium text-ink-2">Rendimiento de cada canal de publicidad</div>
                  <BarList
                    format={(v) => `${v.toFixed(2)}x`}
                    items={[...CHANNEL_IDS]
                      .sort((a, b) => ind.channels[b] - ind.channels[a])
                      .map((c) => ({ label: CHANNEL_NAMES[c], value: ind.channels[c], color: "#3987e5" }))}
                  />
                </div>
                <div>
                  <div className="mb-2 text-xs font-medium text-ink-2">Tamaño de cada región frente a Lima</div>
                  <BarList format={(v) => pct(v, 0)} items={REGION_IDS.map((r) => ({ label: REGION_NAMES[r], value: ind.regionFit[r], color: "#199e70" }))} />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 rounded-2xl bg-white/4 px-4 py-5 text-sm text-ink-3 ring-1 ring-white/8">
                <Lock size={16} className="shrink-0" />
                Encarga el estudio del consumidor para saber qué pesa más al comprar y qué canales rinden mejor.
              </div>
            )}
          </ChartFrame>
        </div>
      </div>
    </div>
  );
}
