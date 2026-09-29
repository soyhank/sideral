"use client";

import { useMemo, useState } from "react";
import profiles from "@/content/industries/fichas";
import { buildAnsoff, buildBcg, buildFoda, type Insight } from "@/engine/analysis";
import { ChartFrame } from "@/components/charts/base";
import { BcgMatrix, ForceMeter, Radar } from "@/components/charts/Strategy";
import { Segmented } from "@/components/ui/controls";
import { Progress } from "@/components/ui/display";
import { cx } from "@/lib/format";
import { useGameCtx } from "./context";

type View = "foda" | "bcg" | "porter" | "pestel" | "ansoff" | "bsc";

const PESTEL = [
  { id: "politico", label: "Político", text: "Estabilidad del gobierno, conflictos sociales, relación con gobiernos regionales y municipios." },
  { id: "economico", label: "Económico", text: "Crecimiento, inflación, tasas de interés, tipo de cambio y empleo." },
  { id: "social", label: "Social", text: "Hábitos de consumo, demografía, informalidad y seguridad ciudadana." },
  { id: "tecnologico", label: "Tecnológico", text: "Pagos digitales, comercio electrónico, automatización e inteligencia artificial." },
  { id: "ambiental", label: "Ambiental", text: "Clima, Fenómeno del Niño, disponibilidad de agua y exigencias de sostenibilidad." },
  { id: "legal", label: "Legal", text: "Tributos, normas laborales, protección al consumidor y licencias." },
] as const;

function Quadrant({ title, tag, items, tone }: { title: string; tag: string; items: Insight[]; tone: "good" | "bad" }) {
  return (
    <div className="well rounded-2xl p-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-semibold">{title}</h4>
        <span className={cx("chip", tone === "good" ? "chip-good" : "chip-bad")}>{tag}</span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {items.map((i) => (
          <li key={i.text}>
            <div className="text-[13px] leading-snug font-medium">{i.text}</div>
            {i.detail && <div className="mt-0.5 text-xs leading-relaxed text-ink-3">{i.detail}</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StrategyPanel() {
  const { state, ind, idx, result, me, mine } = useGameCtx();
  const [view, setView] = useState<View>("foda");
  const profile = profiles.find((p) => p.id === ind.id);
  const foda = useMemo(() => buildFoda(state, idx, result), [state, idx, result]);
  const bcg = useMemo(() => buildBcg(state, idx, result), [state, idx, result]);
  const ansoff = useMemo(() => buildAnsoff(state, idx), [state, idx]);
  const rivals = state.companies.filter((c) => c.idx !== idx);
  const mean = (f: (c: (typeof rivals)[number]) => number) => (rivals.length ? rivals.reduce((s, c) => s + f(c), 0) / rivals.length : 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          value={view}
          onChange={setView}
          options={[
            { value: "foda", label: "FODA" },
            { value: "bcg", label: "Matriz BCG" },
            { value: "porter", label: "Porter" },
            { value: "pestel", label: "PESTEL" },
            { value: "ansoff", label: "Ansoff" },
            { value: "bsc", label: "Cuadro de mando" },
          ]}
        />
      </div>

      {view === "foda" && (
        <div className="space-y-5">
          <ChartFrame title="Análisis FODA de tu empresa" subtitle="Se arma solo con tus indicadores, los de tus rivales y el entorno del trimestre. Lo interno lo controlas tú; lo externo, no.">
            <div className="grid gap-3 md:grid-cols-2">
              <Quadrant title="Fortalezas" tag="Interno, a favor" items={foda.F} tone="good" />
              <Quadrant title="Oportunidades" tag="Externo, a favor" items={foda.O} tone="good" />
              <Quadrant title="Debilidades" tag="Interno, en contra" items={foda.D} tone="bad" />
              <Quadrant title="Amenazas" tag="Externo, en contra" items={foda.A} tone="bad" />
            </div>
          </ChartFrame>
          <ChartFrame title="FODA cruzado" subtitle="Del diagnóstico a la estrategia: qué hacer con lo que encontraste">
            <div className="grid gap-3 md:grid-cols-2">
              {foda.cross.map((c) => (
                <div key={c.kind} className="well rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <span className="chip chip-white">{c.kind}</span>
                    <span className="text-sm font-semibold">Estrategia {c.title.toLowerCase()}</span>
                  </div>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">{c.text}</p>
                </div>
              ))}
            </div>
          </ChartFrame>
        </div>
      )}

      {view === "bcg" && (
        <ChartFrame
          title="Matriz BCG de tus líneas"
          subtitle="Cada círculo es una línea de producto. Su tamaño son las ventas. A la izquierda están las líneas donde superas a tu mayor rival; arriba, los mercados que más crecen."
        >
          <BcgMatrix points={bcg} />
        </ChartFrame>
      )}

      {view === "porter" && profile && (
        <div className="space-y-5">
          <ChartFrame title={`Las cinco fuerzas en ${ind.name.toLowerCase()}`} subtitle="Mientras más intensas las fuerzas, más difícil es ganar dinero en el rubro">
            <div className="grid gap-3 md:grid-cols-2">
              <ForceMeter title="Rivalidad entre competidores" {...profile.porter.rivalry} />
              <ForceMeter title="Amenaza de nuevos competidores" {...profile.porter.entrants} />
              <ForceMeter title="Amenaza de productos sustitutos" {...profile.porter.substitutes} />
              <ForceMeter title="Poder de negociación de los clientes" {...profile.porter.buyers} />
              <ForceMeter title="Poder de negociación de los proveedores" {...profile.porter.suppliers} />
              <div className="well rounded-2xl p-4">
                <div className="text-sm font-medium">Intensidad total</div>
                <div className="num mt-1.5 text-3xl font-semibold">
                  {Object.values(profile.porter).reduce((s, f) => s + f.level, 0)}
                  <span className="text-base text-ink-3"> de 25</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-3">{profile.customer}</p>
              </div>
            </div>
          </ChartFrame>
          <div className="grid gap-5 md:grid-cols-2">
            <ChartFrame title="Factores clave de éxito">
              <ul className="space-y-2.5">
                {profile.keys.map((k) => (
                  <li key={k} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-good" />
                    {k}
                  </li>
                ))}
              </ul>
            </ChartFrame>
            <ChartFrame title="Errores típicos del rubro">
              <ul className="space-y-2.5">
                {profile.mistakes.map((k) => (
                  <li key={k} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bad" />
                    {k}
                  </li>
                ))}
              </ul>
            </ChartFrame>
          </div>
        </div>
      )}

      {view === "pestel" && (
        <ChartFrame title="Análisis PESTEL" subtitle="Las noticias que viviste en esta partida, ordenadas por dimensión del entorno">
          <div className="grid gap-3 md:grid-cols-2">
            {PESTEL.map((p) => {
              const active = state.market.news.filter((n) => n.pestel === p.id);
              const last = result?.news?.pestel === p.id ? result.news : null;
              return (
                <div key={p.id} className="well rounded-2xl p-4">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold">{p.label}</h4>
                    {(active.length > 0 || last) && <span className="chip chip-info">Activo</span>}
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-3">{p.text}</p>
                  {(active.length > 0 || last) && (
                    <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
                      {last && !active.some((a) => a.id === last.id) && <li className="text-[13px] leading-snug">{last.title}</li>}
                      {active.map((n) => (
                        <li key={n.id} className="text-[13px] leading-snug">
                          {n.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </ChartFrame>
      )}

      {view === "ansoff" && (
        <ChartFrame title="Matriz de Ansoff" subtitle="Las cuatro formas de crecer. Las que ya usas aparecen resaltadas.">
          <div className="grid gap-3 sm:grid-cols-2">
            {ansoff.map((a) => (
              <div key={a.key} className={cx("rounded-2xl border p-4 transition", a.active ? "border-white/45 bg-white/10" : "border-line bg-black/20")}>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold">{a.title}</h4>
                  <span className={cx("chip", a.active && "chip-white")}>{a.active ? "En uso" : "Sin usar"}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-ink-3">{a.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center text-[11px] text-ink-3">
            <span>Productos actuales a la izquierda, nuevos a la derecha</span>
            <span>Mercados actuales arriba, nuevos abajo</span>
          </div>
        </ChartFrame>
      )}

      {view === "bsc" && (
        <div className="grid gap-5 lg:grid-cols-2">
          <ChartFrame title="Cuadro de mando integral" subtitle="Las cuatro perspectivas que forman tu puntaje de gestión">
            {mine ? (
              <div className="space-y-4">
                {[
                  { l: "Financiera", v: mine.scorecard.finance, w: "40 %", h: "Retorno al accionista, ROE, margen y liquidez" },
                  { l: "Clientes", v: mine.scorecard.customers, w: "25 %", h: "Cuota de mercado, marca y satisfacción" },
                  { l: "Procesos internos", v: mine.scorecard.processes, w: "20 %", h: "Uso de capacidad, calidad, entregas y eficiencia" },
                  { l: "Personas y gobierno", v: mine.scorecard.people, w: "15 %", h: "Clima laboral, habilidades y reputación" },
                ].map((p) => (
                  <div key={p.l}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium">
                        {p.l} <span className="text-xs font-normal text-ink-3">pesa {p.w}</span>
                      </span>
                      <span className="num text-sm font-semibold">{p.v}</span>
                    </div>
                    <Progress value={p.v / 100} tone={p.v >= 66 ? "good" : p.v >= 40 ? "white" : "warn"} height={8} />
                    <div className="mt-1 text-[11px] text-ink-3">{p.h}</div>
                  </div>
                ))}
                <div className="flex items-baseline justify-between border-t border-line pt-4">
                  <span className="text-sm font-semibold">Puntaje de gestión</span>
                  <span className="num text-2xl font-semibold">
                    {mine.score}
                    <span className="text-sm text-ink-3"> / 1000</span>
                  </span>
                </div>
              </div>
            ) : (
              <p className="py-10 text-center text-sm text-ink-3">Disponible al cerrar tu primer trimestre.</p>
            )}
          </ChartFrame>
          <ChartFrame title="Tu empresa frente a los rivales" subtitle="Atributos de 0 a 100">
            <Radar
              axes={[
                { label: "Marca", self: me.brand, others: mean((c) => c.brand) },
                { label: "Calidad", self: me.quality, others: mean((c) => c.quality) },
                { label: "Satisfacción", self: me.satisfaction, others: mean((c) => c.satisfaction) },
                { label: "Clima", self: me.morale, others: mean((c) => c.morale) },
                { label: "Reputación", self: me.reputation, others: mean((c) => c.reputation) },
              ]}
            />
          </ChartFrame>
        </div>
      )}
    </div>
  );
}
