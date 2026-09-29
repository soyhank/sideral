"use client";

import { ChevronDown, CircleAlert, HandCoins, Info, Lock, MapPin, Megaphone, Package, PiggyBank, Rocket, Search, Sparkles, Tag, Users } from "lucide-react";
import { useState } from "react";
import { REGION_IDS } from "@/content/types";
import { CHANNEL_HELP, CHANNEL_NAMES, IGV, LABOR_LOAD, REGION_CITIES, REGION_NAMES } from "@/engine/constants";
import { productScale, refPrice } from "@/engine/derive";
import { hasInventory } from "@/engine/industries";
import { REGION_FIXED, REGION_SETUP } from "@/engine/round";
import { footprint, roundPrice, staffFor } from "@/engine/setup";
import { CHANNEL_IDS, type ChannelId, type ProductId, type RegionId } from "@/engine/types";
import { CheckCard, NumberField, Segmented, Slider } from "@/components/ui/controls";
import { Progress } from "@/components/ui/display";
import { cx, int, money, moneyShort, pct, price as fmtPrice, units } from "@/lib/format";
import { useGameCtx } from "./context";

function Section({
  icon,
  title,
  summary,
  children,
  defaultOpen = true,
  locked,
  id,
}: {
  icon: React.ReactNode;
  title: string;
  summary?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  locked?: string;
  id: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  if (locked)
    return (
      <section className="panel flex items-center gap-3 rounded-3xl px-5 py-4 opacity-60" id={id}>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/6 text-ink-3">
          <Lock size={15} />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-ink-3">{locked}</p>
        </div>
      </section>
    );
  return (
    <section className="panel scroll-mt-28 rounded-3xl" id={id}>
      <button type="button" className="flex w-full items-center gap-3 px-5 py-4 text-left" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/8 text-ink ring-1 ring-white/10">{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold tracking-tight">{title}</span>
          {summary && <span className="num block truncate text-xs text-ink-3">{summary}</span>}
        </span>
        <ChevronDown size={18} className={cx("shrink-0 text-ink-3 transition-transform duration-300", open && "rotate-180")} />
      </button>
      {open && <div className="animate-fade space-y-6 px-5 pb-6">{children}</div>}
    </section>
  );
}

function Row({ label, hint, value, children }: { label: string; hint?: string; value?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        {value !== undefined && <span className="num text-sm text-ink-2">{value}</span>}
      </div>
      {children}
      {hint && <p className="mt-2 text-xs leading-relaxed text-ink-3">{hint}</p>}
    </div>
  );
}

function Note({ children, tone = "info" }: { children: React.ReactNode; tone?: "info" | "warn" }) {
  return (
    <div className={cx("flex gap-2.5 rounded-2xl px-3.5 py-3 text-xs leading-relaxed", tone === "warn" ? "bg-warn/8 text-[#ffe680] ring-1 ring-warn/20" : "bg-white/4 text-ink-2 ring-1 ring-white/8")}>
      {tone === "warn" ? <CircleAlert size={15} className="mt-px shrink-0" /> : <Info size={15} className="mt-px shrink-0 text-ink-3" />}
      <span>{children}</span>
    </div>
  );
}

/** Reparto porcentual entre varias opciones. Se normaliza solo: no hace falta sumar 100. */
function Split<K extends string>({
  keys,
  labels,
  hints,
  values,
  onChange,
  disabled,
}: {
  keys: K[];
  labels: Record<K, string>;
  hints?: Partial<Record<K, string>>;
  values: Record<K, number>;
  onChange: (k: K, v: number) => void;
  disabled?: boolean;
}) {
  const total = keys.reduce((s, k) => s + Math.max(0, values[k] || 0), 0) || 1;
  return (
    <div className="space-y-3.5">
      {keys.map((k) => (
        <div key={k}>
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="min-w-0">
              <span className="text-[13px] font-medium">{labels[k]}</span>
              {hints?.[k] && <span className="ml-2 hidden text-[11px] text-ink-3 sm:inline">{hints[k]}</span>}
            </span>
            <span className="num text-[13px] font-semibold">{Math.round((Math.max(0, values[k] || 0) / total) * 100)} %</span>
          </div>
          <Slider value={values[k] || 0} min={0} max={100} step={1} disabled={disabled} onChange={(v) => onChange(k, v)} aria-label={labels[k]} />
        </div>
      ))}
    </div>
  );
}

export function DecisionsPanel() {
  const { state, ind, d, me, draft, update, readOnly, has, projection, result, idx, intel } = useGameCtx();
  const inventory = hasInventory(ind);
  const active = ind.products.filter((p) => draft.products[p.id].active);
  const regions = REGION_IDS.filter((r) => draft.regions[r]);
  const lastMarket = result?.market.products;
  const salary = d.baseSalary * state.market.wageIndex;
  const capNow = me.capacity + me.capacityPending;
  const usage = inventory
    ? active.reduce((s, p) => s + draft.products[p.id].volume * p.capUse, 0)
    : (projection?.ratios.utilization ?? 0) * (projection?.effectiveCapacity ?? 1);
  // Sin el área de personas, el equipo se ajusta solo: el límite es la capacidad instalada.
  const effCap = has("personas") ? (projection?.effectiveCapacity ?? me.capacity) : me.capacity;
  const needStaff = staffFor(Math.min(Math.max(usage, 1), me.capacity), ind);
  const mktRef = d.mRef * footprint(me, ind, draft.regions, Object.fromEntries(ind.products.map((p) => [p.id, draft.products[p.id].active])) as Record<ProductId, boolean>);
  const researchCost =
    (draft.research.forecast ? d.research.forecast : 0) + (draft.research.competitors ? d.research.competitors : 0) + (draft.research.consumer ? d.research.consumer : 0);
  const knowsConsumer = Boolean(me.last?.research.consumer);
  const debtLimit = Math.max(0, 1.2 * Math.max(0, me.capital + me.retained) + 0.5 * me.fixedAssets);
  const canBorrow = Math.max(0, debtLimit - me.debt);

  return (
    <div className="space-y-4">
      {/* Precio y volumen */}
      <Section
        id="dec-precio"
        icon={<Tag size={17} />}
        title={inventory ? "Precio y volumen" : "Precio y capacidad"}
        summary={active.map((p) => `${p.name}: ${fmtPrice(draft.products[p.id].price)}`).join(" · ")}
      >
        {active.map((p) => {
          const ref = refPrice(p, state.market);
          const dec = draft.products[p.id];
          const avgPrice = lastMarket?.[p.id]?.avgPrice || ref;
          const rivals = state.companies.filter((c) => c.idx !== idx && c.products[p.id].active).map((c) => c.products[p.id].price);
          const proj = projection?.products[p.id];
          const stock = me.products[p.id].inventory;
          const step = ref >= 10000 ? 500 : ref >= 1000 ? 10 : ref >= 100 ? 1 : ref >= 10 ? 0.1 : 0.05;
          const decimals = ref >= 100 ? 0 : 2;
          return (
            <div key={p.id} className="well space-y-5 rounded-2xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">{p.name}</h4>
                <span className="text-xs text-ink-3">
                  Costo unitario aprox. <span className="num text-ink-2">{fmtPrice(proj?.unitCost ?? ref * p.costPct)}</span>
                </span>
              </div>
              <Row
                label={`Precio por ${p.unit}`}
                value={<span className={cx(dec.price > avgPrice * 1.08 ? "text-warn" : dec.price < avgPrice * 0.92 ? "text-info" : "")}>{pct(dec.price / avgPrice - 1, 0).replace("−", "-")} frente al mercado</span>}
                hint={
                  rivals.length
                    ? `Sin IGV. Tus rivales cobran entre ${fmtPrice(Math.min(...rivals))} y ${fmtPrice(Math.max(...rivals))}.`
                    : "Sin IGV. Todavía no hay rivales en esta línea."
                }
              >
                <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
                  <div className="pb-4">
                    <Slider
                      value={dec.price}
                      min={roundPrice(ref * 0.6)}
                      max={roundPrice(ref * 1.6)}
                      step={step}
                      disabled={readOnly}
                      mark={avgPrice}
                      markLabel="mercado"
                      onChange={(v) => update((x) => void (x.products[p.id].price = v))}
                      aria-label={`Precio de ${p.name}`}
                    />
                  </div>
                  <NumberField
                    value={dec.price}
                    min={roundPrice(ref * 0.4)}
                    max={roundPrice(ref * 2.5)}
                    step={step}
                    decimals={decimals}
                    prefix="S/"
                    disabled={readOnly}
                    onChange={(v) => update((x) => void (x.products[p.id].price = v))}
                    aria-label={`Precio de ${p.name}`}
                  />
                </div>
              </Row>
              {inventory && (
                <Row
                  label={ind.volumeLabel}
                  value={units(dec.volume, p.unit)}
                  hint={
                    stock > 0
                      ? `Tienes ${int(stock)} en inventario${ind.perishability > 0 ? ` (se pierde ${Math.round(ind.perishability * 100)} % de lo que sobre)` : ""}. Demanda proyectada: ${int(proj?.demand ?? 0)}.`
                      : `No tienes inventario inicial. Demanda proyectada: ${int(proj?.demand ?? 0)}.`
                  }
                >
                  <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
                    <Slider
                      value={dec.volume}
                      min={0}
                      max={Math.max(1, Math.ceil((capNow * 1.15) / p.capUse))}
                      step={Math.max(1, Math.round(p.units / 200))}
                      disabled={readOnly}
                      onChange={(v) => update((x) => void (x.products[p.id].volume = v))}
                      aria-label={`${ind.volumeLabel} de ${p.name}`}
                    />
                    <NumberField
                      value={dec.volume}
                      min={0}
                      max={Math.ceil((capNow * 1.5) / p.capUse)}
                      step={Math.max(1, Math.round(p.units / 100))}
                      disabled={readOnly}
                      onChange={(v) => update((x) => void (x.products[p.id].volume = v))}
                      aria-label={`${ind.volumeLabel} de ${p.name}`}
                    />
                  </div>
                  {proj && proj.demand > 0 && (
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm mt-3"
                      disabled={readOnly}
                      onClick={() => update((x) => void (x.products[p.id].volume = Math.max(0, Math.round(proj.demand * 1.04 - stock * (1 - ind.perishability)))))}
                    >
                      Igualar a la demanda proyectada
                    </button>
                  )}
                </Row>
              )}
            </div>
          );
        })}

        <div>
          <div className="mb-2 flex items-baseline justify-between gap-3">
            <span className="text-sm font-medium">Uso de {ind.capacityLabel.toLowerCase()}</span>
            <span className={cx("num text-sm", usage > effCap ? "text-warn" : "text-ink-2")}>{pct(effCap > 0 ? usage / effCap : 0, 0)}</span>
          </div>
          <Progress value={effCap > 0 ? usage / (effCap * 1.15) : 0} tone={usage > effCap ? "warn" : usage > effCap * 0.7 ? "good" : "white"} height={8} />
          <p className="mt-2 text-xs leading-relaxed text-ink-3">
            Capacidad instalada: {int(me.capacity)}.{has("personas") ? ` Capacidad con tu personal: ${int(effCap)}.` : ""}
            {me.capacityPending > 0 && ` Entran ${int(me.capacityPending)} más este trimestre.`}
            {usage > effCap && " Pasar del 100 % obliga a pagar horas extra."}
          </p>
        </div>

        <Row
          label="Ampliar capacidad"
          value={draft.invest.capacity > 0 ? `${money(draft.invest.capacity * d.capexPerUnit * state.market.costIndex)} + IGV` : "Sin inversión"}
          hint="La ampliación entra en operación el próximo trimestre y eleva tus gastos fijos."
        >
          <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
            <Slider
              value={draft.invest.capacity}
              min={0}
              max={Math.round(me.capacity * 0.6)}
              step={Math.max(1, Math.round(me.capacity / 100))}
              disabled={readOnly}
              onChange={(v) => update((x) => void (x.invest.capacity = v))}
              aria-label="Ampliar capacidad"
            />
            <NumberField
              value={draft.invest.capacity}
              min={0}
              max={Math.round(me.capacity * 1.5)}
              step={Math.max(1, Math.round(me.capacity / 50))}
              disabled={readOnly}
              onChange={(v) => update((x) => void (x.invest.capacity = v))}
              aria-label="Unidades de capacidad a ampliar"
            />
          </div>
        </Row>
      </Section>

      {/* Líneas de producto */}
      <Section
        id="dec-lineas"
        icon={<Rocket size={17} />}
        title="Líneas de producto"
        summary={`${active.length} de 3 líneas activas`}
        defaultOpen={false}
        locked={has("productos") ? undefined : "Se habilita en niveles más avanzados"}
      >
        <div className="grid gap-2.5">
          {ind.products.map((p) => {
            const already = me.products[p.id].active;
            const on = draft.products[p.id].active;
            return (
              <CheckCard
                key={p.id}
                checked={on}
                disabled={readOnly || already}
                onChange={(v) =>
                  update((x) => {
                    x.products[p.id].active = v;
                    if (v && inventory && x.products[p.id].volume === 0) x.products[p.id].volume = Math.round(p.units * 0.5);
                  })
                }
                title={p.name}
                badge={already ? "Activa" : `Lanzar: ${moneyShort(d.launchCost[p.id] * state.market.costIndex)}`}
                text={`Precio de referencia ${fmtPrice(refPrice(p, state.market))} por ${p.unit}. El mercado crece ${pct(Math.pow(1 + p.growth, 4) - 1, 0)} al año. ${
                  already ? "" : "Una línea nueva vende menos los dos primeros trimestres mientras se hace conocida."
                }`}
              />
            );
          })}
        </div>
      </Section>

      {/* Marketing */}
      <Section
        id="dec-marketing"
        icon={<Megaphone size={17} />}
        title="Marketing"
        summary={`Presupuesto ${money(draft.marketing.budget)}`}
        locked={has("marketing") ? undefined : "Por ahora lo maneja tu equipo con un presupuesto estándar"}
      >
        <Row
          label="Presupuesto del trimestre"
          value={`${pct(mktRef > 0 ? draft.marketing.budget / mktRef : 0, 0)} del gasto típico del rubro`}
          hint="Cada sol adicional rinde menos que el anterior. La publicidad también construye marca para los próximos trimestres."
        >
          <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
            <Slider
              value={draft.marketing.budget}
              min={0}
              max={Math.round(mktRef * 3)}
              step={Math.max(10, Math.round(mktRef / 100))}
              disabled={readOnly}
              mark={mktRef}
              markLabel="típico"
              onChange={(v) => update((x) => void (x.marketing.budget = v))}
              aria-label="Presupuesto de marketing"
            />
            <NumberField
              value={draft.marketing.budget}
              min={0}
              max={Math.round(d.r0 * 3)}
              step={Math.max(10, Math.round(mktRef / 50))}
              prefix="S/"
              disabled={readOnly}
              onChange={(v) => update((x) => void (x.marketing.budget = v))}
              aria-label="Presupuesto de marketing"
            />
          </div>
        </Row>
        <div className="pt-2">
          <div className="mb-3 text-sm font-medium">Mezcla de canales</div>
          <Split
            keys={[...CHANNEL_IDS] as ChannelId[]}
            labels={CHANNEL_NAMES}
            hints={CHANNEL_HELP}
            values={draft.marketing.channels}
            disabled={readOnly}
            onChange={(k, v) => update((x) => void (x.marketing.channels[k] = v))}
          />
          {knowsConsumer ? (
            <div className="mt-4">
              <Note>
                Según tu estudio del consumidor, el canal que más rinde en este rubro es{" "}
                <strong className="text-ink">{CHANNEL_NAMES[[...CHANNEL_IDS].sort((a, b) => ind.channels[b] - ind.channels[a])[0]]}</strong> y el que menos rinde es{" "}
                <strong className="text-ink">{CHANNEL_NAMES[[...CHANNEL_IDS].sort((a, b) => ind.channels[a] - ind.channels[b])[0]]}</strong>.
              </Note>
            </div>
          ) : (
            has("investigacion") && (
              <div className="mt-4">
                <Note>No todos los canales rinden igual en tu rubro. El estudio del consumidor te dice cuáles funcionan mejor.</Note>
              </div>
            )
          )}
        </div>
        {active.length > 1 && has("productos") && (
          <div className="pt-2">
            <div className="mb-3 text-sm font-medium">Reparto por línea</div>
            <Split
              keys={active.map((p) => p.id)}
              labels={Object.fromEntries(ind.products.map((p) => [p.id, p.name])) as Record<ProductId, string>}
              values={draft.marketing.products}
              disabled={readOnly}
              onChange={(k, v) => update((x) => void (x.marketing.products[k] = v))}
            />
          </div>
        )}
        {regions.length > 1 && has("regiones") && (
          <div className="pt-2">
            <div className="mb-3 text-sm font-medium">Reparto por región</div>
            <Split keys={regions} labels={REGION_NAMES} values={draft.marketing.regions} disabled={readOnly} onChange={(k, v) => update((x) => void (x.marketing.regions[k] = v))} />
          </div>
        )}
      </Section>

      {/* Personas */}
      <Section
        id="dec-personas"
        icon={<Users size={17} />}
        title="Personas"
        summary={`${int(draft.people.headcount)} personas · sueldo ${pct(draft.people.salaryIndex, 0)} del mercado`}
        defaultOpen={false}
        locked={has("personas") ? undefined : "Por ahora tu equipo se ajusta solo al volumen"}
      >
        <Row
          label="Tamaño del equipo"
          value={`Necesitas alrededor de ${int(needStaff)}`}
          hint={`Hoy tienes ${int(me.headcount)} personas. Contratar cuesta un sueldo por persona y despedir, un sueldo y medio. El personal nuevo rinde menos al inicio.`}
        >
          <NumberField
            value={draft.people.headcount}
            min={1}
            max={Math.max(ind.headcount * 8, me.headcount * 2)}
            step={1}
            disabled={readOnly}
            onChange={(v) => update((x) => void (x.people.headcount = v))}
            aria-label="Tamaño del equipo"
            className="sm:max-w-xs"
          />
        </Row>
        <Row
          label="Nivel de sueldos"
          value={`${money(salary * draft.people.salaryIndex)} al mes por persona`}
          hint={`El sueldo de mercado es ${money(salary)}. A eso se suman las cargas sociales de ${Math.round(LABOR_LOAD * 100)} %: EsSalud, gratificaciones, CTS y vacaciones.`}
        >
          <div className="pb-4">
            <Slider
              value={Math.round(draft.people.salaryIndex * 100)}
              min={80}
              max={160}
              step={1}
              disabled={readOnly}
              mark={100}
              markLabel="mercado"
              onChange={(v) => update((x) => void (x.people.salaryIndex = v / 100))}
              aria-label="Nivel de sueldos"
            />
          </div>
        </Row>
        <Row
          label="Capacitación por persona"
          value={`${money(draft.people.training * draft.people.headcount)} en total`}
          hint="Eleva la productividad, la calidad y el clima laboral. Su efecto se acumula trimestre a trimestre."
        >
          <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
            <Slider
              value={draft.people.training}
              min={0}
              max={Math.round(d.trainRef * 4)}
              step={5}
              disabled={readOnly}
              onChange={(v) => update((x) => void (x.people.training = v))}
              aria-label="Capacitación por persona"
            />
            <NumberField value={draft.people.training} min={0} max={Math.round(d.baseSalary * 2)} step={10} prefix="S/" disabled={readOnly} onChange={(v) => update((x) => void (x.people.training = v))} aria-label="Capacitación por persona" />
          </div>
        </Row>
        <div className="grid grid-cols-3 gap-2.5 text-center">
          {[
            { l: "Clima laboral", v: Math.round(me.morale) },
            { l: "Habilidad", v: `${Math.round(me.skill * 100)} %` },
            { l: "Productividad", v: pct(effCap / Math.max(1, me.headcount * d.outputPerWorker), 0) },
          ].map((s) => (
            <div key={s.l} className="well rounded-2xl px-2 py-3">
              <div className="num text-lg font-semibold">{s.v}</div>
              <div className="text-[11px] text-ink-3">{s.l}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Calidad e innovación */}
      <Section
        id="dec-calidad"
        icon={<Sparkles size={17} />}
        title="Calidad e innovación"
        summary={`Calidad ${Math.round(me.quality)} · ahorro por eficiencia ${pct(me.efficiency, 1)}`}
        defaultOpen={false}
        locked={has("calidad") ? undefined : "Por ahora se mantiene la calidad actual"}
      >
        <Row
          label="Inversión en calidad del producto"
          value={money(draft.invest.quality)}
          hint={`Tu calidad es ${Math.round(me.quality)} de 100 y baja un punto por trimestre si no inviertes. Más calidad permite cobrar más, pero sube un poco el costo unitario.`}
        >
          <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
            <Slider value={draft.invest.quality} min={0} max={Math.round(d.qRef * 5)} step={Math.max(10, Math.round(d.qRef / 50))} disabled={readOnly} onChange={(v) => update((x) => void (x.invest.quality = v))} aria-label="Inversión en calidad" />
            <NumberField value={draft.invest.quality} min={0} max={Math.round(d.r0)} step={Math.max(10, Math.round(d.qRef / 20))} prefix="S/" disabled={readOnly} onChange={(v) => update((x) => void (x.invest.quality = v))} aria-label="Inversión en calidad" />
          </div>
        </Row>
        <Row
          label="Inversión en eficiencia de procesos"
          value={money(draft.invest.efficiency)}
          hint={`Hoy ahorras ${pct(me.efficiency, 1)} del costo variable. El tope es 25 %. Tecnología, orden y mejores métodos de trabajo.`}
        >
          <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
            <Slider value={draft.invest.efficiency} min={0} max={Math.round(d.eRef * 4)} step={Math.max(10, Math.round(d.eRef / 50))} disabled={readOnly} onChange={(v) => update((x) => void (x.invest.efficiency = v))} aria-label="Inversión en eficiencia" />
            <NumberField value={draft.invest.efficiency} min={0} max={Math.round(d.r0)} step={Math.max(10, Math.round(d.eRef / 20))} prefix="S/" disabled={readOnly} onChange={(v) => update((x) => void (x.invest.efficiency = v))} aria-label="Inversión en eficiencia" />
          </div>
        </Row>
      </Section>

      {/* Expansión regional */}
      <Section
        id="dec-regiones"
        icon={<MapPin size={17} />}
        title="Expansión regional"
        summary={regions.map((r) => REGION_NAMES[r]).join(", ")}
        defaultOpen={false}
        locked={has("regiones") ? undefined : "Por ahora operas solo en Lima y Callao"}
      >
        <div className="grid gap-2.5 sm:grid-cols-2">
          {REGION_IDS.map((r: RegionId) => {
            const already = me.regions[r];
            const rivals = state.companies.filter((c) => c.idx !== idx && c.regions[r]).length;
            return (
              <CheckCard
                key={r}
                checked={draft.regions[r]}
                disabled={readOnly || already}
                onChange={(v) => update((x) => void (x.regions[r] = v))}
                title={REGION_NAMES[r]}
                badge={already ? "Operando" : `Abrir: ${moneyShort(REGION_SETUP * d.r0 * ind.regionFit[r] * state.market.costIndex)}`}
                text={`${REGION_CITIES[r]}. Tamaño: ${Math.round(ind.regionFit[r] * 100)} % del mercado de Lima. ${
                  r === "lima" ? "" : `Gasto fijo de ${moneyShort(REGION_FIXED * d.r0 * ind.regionFit[r])} por trimestre. `
                }${rivals} ${rivals === 1 ? "rival opera" : "rivales operan"} aquí.`}
              />
            );
          })}
        </div>
        {ind.logisticsPct > 0 && <Note>Vender fuera de Lima suma {Math.round(ind.logisticsPct * 100)} % de flete al costo de cada unidad.</Note>}
      </Section>

      {/* Crédito a clientes */}
      <Section
        id="dec-credito"
        icon={<HandCoins size={17} />}
        title="Crédito a clientes"
        summary={draft.creditDays === 0 ? "Venta al contado" : `Plazo de ${draft.creditDays} días`}
        defaultOpen={false}
        locked={has("credito") ? undefined : ind.weights.credit > 0 ? "Por ahora se usa el plazo habitual del rubro" : "En este rubro se vende al contado"}
      >
        <Segmented
          value={draft.creditDays}
          onChange={(v) => !readOnly && update((x) => void (x.creditDays = v))}
          options={[
            { value: 0, label: "Contado" },
            { value: 30, label: "30 días" },
            { value: 60, label: "60 días" },
            { value: 90, label: "90 días" },
          ]}
        />
        <Note tone={draft.creditDays >= 60 ? "warn" : "info"}>
          {ind.weights.credit > 0
            ? "Dar más plazo ayuda a cerrar ventas, pero cobras más tarde y una parte nunca se cobra. Ese dinero lo financias tú."
            : "En este rubro el cliente paga al contado. Dar plazo casi no mejora las ventas y sí retrasa tu caja."}
        </Note>
      </Section>

      {/* Finanzas */}
      <Section
        id="dec-finanzas"
        icon={<PiggyBank size={17} />}
        title="Finanzas"
        summary={`Deuda ${moneyShort(me.debt)} · caja ${moneyShort(me.cash - me.overdraft)}`}
        defaultOpen={false}
        locked={has("finanzas") ? undefined : "Por ahora el banco te presta solo si te falta caja"}
      >
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            { l: "Caja", v: moneyShort(me.cash), bad: false },
            { l: "Sobregiro", v: moneyShort(me.overdraft), bad: me.overdraft > 0 },
            { l: "Deuda", v: moneyShort(me.debt), bad: false },
            { l: "Tasa anual", v: pct(state.market.rate, 1), bad: false },
          ].map((s) => (
            <div key={s.l} className="well rounded-2xl px-3 py-3">
              <div className="text-[11px] text-ink-3">{s.l}</div>
              <div className={cx("num mt-0.5 text-base font-semibold", s.bad && "text-bad")}>{s.v}</div>
            </div>
          ))}
        </div>
        <Row label="Pedir préstamo" value={`Disponible: ${moneyShort(canBorrow)}`} hint="Cada trimestre se amortiza 5 % del saldo y se pagan intereses. Mientras más endeudado estés, más cara será la tasa.">
          <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
            <Slider value={Math.min(draft.finance.loan, canBorrow)} min={0} max={Math.max(1, Math.round(canBorrow))} step={Math.max(100, Math.round(d.r0 / 100))} disabled={readOnly || canBorrow <= 0} onChange={(v) => update((x) => void (x.finance.loan = v))} aria-label="Pedir préstamo" />
            <NumberField value={draft.finance.loan} min={0} max={Math.round(d.r0 * 5)} step={Math.max(100, Math.round(d.r0 / 50))} prefix="S/" disabled={readOnly} onChange={(v) => update((x) => void (x.finance.loan = v))} aria-label="Pedir préstamo" />
          </div>
        </Row>
        <Row label="Amortización adicional" value={money(draft.finance.repay)} hint="Pagar deuda antes de tiempo ahorra intereses y mejora tu acceso a crédito.">
          <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
            <Slider value={draft.finance.repay} min={0} max={Math.max(1, Math.round(me.debt))} step={Math.max(100, Math.round(d.r0 / 100))} disabled={readOnly || me.debt <= 0} onChange={(v) => update((x) => void (x.finance.repay = v))} aria-label="Amortización adicional" />
            <NumberField value={draft.finance.repay} min={0} max={Math.round(me.debt)} step={Math.max(100, Math.round(d.r0 / 50))} prefix="S/" disabled={readOnly || me.debt <= 0} onChange={(v) => update((x) => void (x.finance.repay = v))} aria-label="Amortización adicional" />
          </div>
        </Row>
        <Row label="Dividendos a los accionistas" value={money(draft.finance.dividends)} hint="Solo se reparte de las utilidades acumuladas y con caja disponible. Los dividendos cuentan en el retorno al accionista.">
          <div className="grid gap-3 sm:grid-cols-[1fr_220px] sm:items-center">
            <Slider value={draft.finance.dividends} min={0} max={Math.max(1, Math.round(Math.max(0, me.retained) + d.r0 * 0.2))} step={Math.max(100, Math.round(d.r0 / 100))} disabled={readOnly} onChange={(v) => update((x) => void (x.finance.dividends = v))} aria-label="Dividendos" />
            <NumberField value={draft.finance.dividends} min={0} max={Math.round(d.r0 * 2)} step={Math.max(100, Math.round(d.r0 / 50))} prefix="S/" disabled={readOnly} onChange={(v) => update((x) => void (x.finance.dividends = v))} aria-label="Dividendos" />
          </div>
        </Row>
        <Note>
          Los precios van sin IGV. Al cobrar recibes el {Math.round(IGV * 100)} % adicional y al comprar lo pagas: la diferencia se entrega a la SUNAT el trimestre siguiente.
        </Note>
      </Section>

      {/* Investigación de mercados */}
      <Section
        id="dec-investigacion"
        icon={<Search size={17} />}
        title="Investigación de mercados"
        summary={researchCost > 0 ? `Inversión ${money(researchCost)}` : "Sin estudios este trimestre"}
        defaultOpen={false}
        locked={has("investigacion") ? undefined : "Se habilita en niveles más avanzados"}
      >
        <div className="grid gap-2.5">
          <CheckCard
            checked={draft.research.forecast}
            disabled={readOnly}
            onChange={(v) => update((x) => void (x.research.forecast = v))}
            title="Pronóstico del entorno"
            badge={money(d.research.forecast)}
            text="Anticipa lo que viene el próximo trimestre: recibirás una señal temprana y tu proyección ya incluirá ese efecto."
          />
          <CheckCard
            checked={draft.research.competitors}
            disabled={readOnly}
            onChange={(v) => update((x) => void (x.research.competitors = v))}
            title="Inteligencia competitiva"
            badge={money(d.research.competitors)}
            text="Muestra cuánto invierte cada rival en publicidad, su calidad, su capacidad y su caja."
          />
          <CheckCard
            checked={draft.research.consumer}
            disabled={readOnly}
            onChange={(v) => update((x) => void (x.research.consumer = v))}
            title="Estudio del consumidor"
            badge={money(d.research.consumer)}
            text="Revela qué pesa más en la compra (precio, calidad, marca) y qué canales de publicidad rinden mejor."
          />
        </div>
        {intel?.hint && (
          <Note>
            <strong className="text-ink">Señal temprana:</strong> {intel.hint}
          </Note>
        )}
        <Note>Los estudios se entregan con los resultados del trimestre y sirven para decidir el siguiente.</Note>
      </Section>

      {inventory && active.length > 0 && (
        <div className="flex items-center gap-2 px-2 text-xs text-ink-3">
          <Package size={14} />
          El tamaño relativo de cada línea frente a la principal: {active.map((p) => `${p.name} ${pct(productScale(ind, p), 0)}`).join(" · ")}
        </div>
      )}
    </div>
  );
}
