"use client";

import { Bot, Crown } from "lucide-react";
import { ChartFrame, companyColor } from "@/components/charts/base";
import { LineChart } from "@/components/charts/LineChart";
import { Empty } from "@/components/ui/display";
import { cx, moneyShort, pct, periodLabel } from "@/lib/format";
import { useGameCtx } from "./context";

export function RankingPanel() {
  const { state, game, result, history, idx, company, spectator } = useRanking();
  if (!result) return <Empty title="Todavía no hay posiciones" text="El ranking aparece al cerrar el primer trimestre." />;
  const labels = history.map((h) => periodLabel(h.r, state.startYear));
  const room = game.mode === "sala" && game.board.some((b) => !b.bot);
  const several = game.board.length > state.companies.length;

  return (
    <div className="space-y-5">
      <section className="panel overflow-hidden rounded-3xl">
        <div className="px-5 pt-5">
          <h3 className="text-[15px] font-semibold tracking-tight">{several ? `Posiciones de tu mercado (mercado ${game.market})` : "Posiciones"}</h3>
          <p className="mt-0.5 text-xs text-ink-3">Ordenado por puntaje de gestión. En caso de empate decide la utilidad.</p>
        </div>
        <ol className="mt-4 divide-y divide-white/6">
          {[...result.companies]
            .sort((a, b) => a.rank - b.rank)
            .map((c) => {
              const s = state.companies[c.idx];
              const self = c.idx === idx;
              return (
                <li key={c.idx} className={cx("flex items-center gap-3.5 px-5 py-3.5", self && "bg-white/6")}>
                  <span className={cx("num grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold", c.rank === 1 ? "bg-white text-black" : "bg-white/8 text-ink-2")}>
                    {c.rank === 1 ? <Crown size={16} /> : c.rank}
                  </span>
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: companyColor(c.idx, idx) }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={cx("truncate text-sm", self ? "font-semibold" : "font-medium")}>{s.name}</span>
                      {self && !spectator && <span className="chip chip-white !h-5 !px-1.5 !text-[10px]">tú</span>}
                      {s.isBot && <Bot size={13} className="shrink-0 text-ink-4" aria-label="Rival automático" />}
                    </div>
                    <div className="num mt-0.5 truncate text-xs text-ink-3">
                      Utilidad acumulada {moneyShort(s.cumProfit)} · cuota {pct(c.share)} · acción S/ {c.sharePrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="num text-lg leading-none font-semibold">{c.score}</div>
                    <div className="mt-1 text-[10.5px] text-ink-3">puntos</div>
                  </div>
                </li>
              );
            })}
        </ol>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <ChartFrame title="Evolución del puntaje">
          <LineChart
            labels={labels}
            format={(v) => String(Math.round(v))}
            zero={false}
            series={state.companies.map((c) => ({
              name: c.name,
              color: companyColor(c.idx, idx),
              focus: c.idx === idx,
              values: history.map((h) => h.c.find((x) => x.i === c.idx)?.score ?? null),
            }))}
          />
        </ChartFrame>
        <ChartFrame title="Precio de la acción" subtitle="Refleja utilidades, crecimiento, marca, reputación y deuda">
          <LineChart
            labels={labels}
            format={(v) => `S/ ${v.toFixed(v >= 100 ? 0 : 2)}`}
            zero={false}
            series={state.companies.map((c) => ({
              name: c.name,
              color: companyColor(c.idx, idx),
              focus: c.idx === idx,
              values: history.map((h) => h.c.find((x) => x.i === c.idx)?.price ?? null),
            }))}
          />
        </ChartFrame>
      </div>

      {room && (
        <section className="panel overflow-hidden rounded-3xl">
          <div className="px-5 pt-5">
            <h3 className="text-[15px] font-semibold tracking-tight">Tabla general de la sala</h3>
            <p className="mt-0.5 text-xs text-ink-3">
              {several ? "Todas las empresas de todos los mercados. Todos enfrentan las mismas noticias y situaciones." : "Las empresas dirigidas por personas y quienes las integran."}
            </p>
          </div>
          <div className="scroll-thin mt-4 overflow-x-auto">
            <table className="table-fin min-w-[560px]">
              <thead>
                <tr>
                  <th>Empresa</th>
                  {several && <th>Mercado</th>}
                  <th>Retorno</th>
                  <th>Utilidad acumulada</th>
                  <th>Puntaje</th>
                </tr>
              </thead>
              <tbody>
                {game.board
                  .filter((b) => !b.bot)
                  .map((b, i) => (
                    <tr key={b.company} className={cx(b.company === company && "bg-white/6")}>
                      <td>
                        <span className="flex items-center gap-2.5">
                          <span className="num w-5 text-ink-3">{i + 1}</span>
                          <span className="min-w-0">
                            <span className={cx("block truncate", b.company === company && "font-semibold")}>{b.name}</span>
                            {b.members.length > 0 && <span className="block truncate text-[11px] text-ink-3">{b.members.join(", ")}</span>}
                          </span>
                        </span>
                      </td>
                      {several && <td>{b.market}</td>}
                      <td className={cx(b.tsr < 0 && "text-bad")}>{pct(b.tsr, 0)}</td>
                      <td className={cx(b.net < 0 && "text-bad")}>{moneyShort(b.net)}</td>
                      <td className="font-semibold">{b.score}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

function useRanking() {
  const ctx = useGameCtx();
  return { ...ctx, company: ctx.game.board.find((b) => b.game === ctx.game.id && b.name === ctx.me.name)?.company ?? null };
}
