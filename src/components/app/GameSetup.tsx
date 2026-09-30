"use client";

import { Check, Clock, Search } from "lucide-react";
import { useMemo, useState } from "react";
import profiles from "@/content/industries/fichas";
import { Segmented, Toggle } from "@/components/ui/controls";
import { Icon, IndustryTile, industryColor } from "@/components/ui/Icon";
import { DIFFICULTY_NAMES, MODULE_NAMES } from "@/engine/constants";
import { INDUSTRIES, baseRevenue } from "@/engine/industries";
import { MODULE_IDS, type IndustryId, type ModuleId } from "@/engine/types";
import { cx, moneyShort, price } from "@/lib/format";
import { minutesPerRound } from "@/lib/gamification";

const MODEL_LABEL = { goods: "Producción", trade: "Compra y venta", service: "Servicio", subscription: "Suscripción" };
const COMPLEXITY = ["", "Sencilla", "Intermedia", "Exigente"];

export function IndustryPicker({ value, onChange }: { value: IndustryId | null; onChange: (id: IndustryId) => void }) {
  const [kind, setKind] = useState<"todas" | "B2C" | "B2B">("todas");
  const [query, setQuery] = useState("");
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return INDUSTRIES.filter((i) => (kind === "todas" || i.kind === kind) && (!q || `${i.name} ${i.short} ${i.tagline}`.toLowerCase().includes(q)));
  }, [kind, query]);
  const chosen = value ? INDUSTRIES.find((i) => i.id === value) : null;
  const profile = value ? profiles.find((p) => p.id === value) : null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Segmented
          value={kind}
          onChange={setKind}
          size="sm"
          options={[
            { value: "todas", label: `Todas (${INDUSTRIES.length})` },
            { value: "B2C", label: "Al consumidor" },
            { value: "B2B", label: "A empresas" },
          ]}
        />
        <div className="relative min-w-[180px] flex-1">
          <Search size={15} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-3" />
          <input className="field !h-10 !pl-10 !text-sm" placeholder="Buscar un rubro" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Buscar industria" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4" role="radiogroup" aria-label="Industria">
        {list.map((i) => {
          const on = value === i.id;
          return (
            <button
              key={i.id}
              role="radio"
              aria-checked={on}
              onClick={() => onChange(i.id)}
              className={cx("panel panel-hover relative rounded-2xl p-4 text-left", on && "!border-white/60 !bg-white/12")}
            >
              {on && (
                <span className="absolute top-3 right-3 grid h-5 w-5 place-items-center rounded-full bg-white text-black">
                  <Check size={12} strokeWidth={3} />
                </span>
              )}
              <Icon name={i.icon} size={21} style={{ color: industryColor(i.id) }} />
              <div className="mt-3 text-sm leading-tight font-semibold">{i.name}</div>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="chip !h-5 !px-1.5 !text-[10px]">{i.kind}</span>
                <span className="chip !h-5 !px-1.5 !text-[10px]">{COMPLEXITY[i.complexity]}</span>
              </div>
            </button>
          );
        })}
        {!list.length && <p className="col-span-full py-8 text-center text-sm text-ink-3">Ningún rubro coincide con tu búsqueda.</p>}
      </div>

      {chosen && (
        <div className="glass mt-5 animate-rise rounded-3xl p-5" key={chosen.id}>
          <div className="flex flex-wrap items-start gap-4">
            <IndustryTile id={chosen.id} box={48} size={22} radius={16} solid />
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold tracking-tight">{chosen.name}</h3>
              <p className="text-sm text-ink-3">{chosen.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="chip">{chosen.kind === "B2C" ? "Vende al consumidor" : "Vende a empresas"}</span>
              <span className="chip">{MODEL_LABEL[chosen.model]}</span>
              <span className="chip">Venta base {moneyShort(baseRevenue(chosen))} por trimestre</span>
            </div>
          </div>
          {profile && <p className="mt-4 text-sm leading-relaxed text-ink-2">{profile.description}</p>}
          <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
            {chosen.products.map((p, n) => (
              <div key={p.id} className="well rounded-2xl p-3.5">
                <div className="text-[11px] text-ink-3">{n === 0 ? "Línea inicial" : `Línea ${n + 1} (se lanza después)`}</div>
                <div className="mt-0.5 text-sm font-medium">{p.name}</div>
                <div className="num mt-1 text-xs text-ink-3">
                  {price(p.price)} por {p.unit}
                </div>
              </div>
            ))}
          </div>
          {profile && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <div className="eyebrow mb-2">Claves para ganar</div>
                <ul className="space-y-1.5">
                  {profile.keys.map((k) => (
                    <li key={k} className="flex gap-2 text-xs leading-relaxed text-ink-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-good" />
                      {k}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="eyebrow mb-2">Indicadores del rubro</div>
                <div className="flex flex-wrap gap-1.5">
                  {profile.kpis.map((k) => (
                    <span key={k} className="chip">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export interface SetupValue {
  difficulty: 1 | 2 | 3 | 4;
  rounds: number;
  size: number;
  modules: ModuleId[];
}

export const DEFAULT_SETUP: SetupValue = { difficulty: 2, rounds: 8, size: 5, modules: [...MODULE_IDS] };

const DIFF_HELP = [
  "",
  "Rivales que se equivocan seguido, más caja inicial y pocas noticias.",
  "Rivales competentes y un entorno que se mueve de vez en cuando.",
  "Rivales que reaccionan a tus precios, menos caja y entorno agitado.",
  "Rivales que casi no fallan, caja ajustada y noticias cada trimestre.",
];

const MODULE_HELP: Record<ModuleId, string> = {
  marketing: "Presupuesto de publicidad y mezcla de canales",
  personas: "Tamaño del equipo, sueldos y capacitación",
  finanzas: "Préstamos, amortizaciones y dividendos",
  calidad: "Inversión en calidad y eficiencia",
  productos: "Lanzar nuevas líneas de producto",
  regiones: "Abrir operaciones en otras regiones",
  investigacion: "Comprar estudios de mercado",
  credito: "Plazo de pago a clientes",
  situaciones: "Noticias del entorno y dilemas cada trimestre",
};

export function estimateMinutes(v: SetupValue): number {
  return Math.max(5, Math.round((v.rounds * minutesPerRound(v.modules.length)) / 5) * 5);
}

export function SetupForm({ value, onChange, showSize = true, minRounds = 4 }: { value: SetupValue; onChange: (v: SetupValue) => void; showSize?: boolean; minRounds?: number }) {
  const set = (p: Partial<SetupValue>) => onChange({ ...value, ...p });
  const roundsOptions = [minRounds, 6, 8, 12].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b);
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-sm font-medium">Dificultad</span>
          <span className="text-xs text-ink-3">{DIFFICULTY_NAMES[value.difficulty]}</span>
        </div>
        <Segmented value={value.difficulty} onChange={(v) => set({ difficulty: v })} options={[1, 2, 3, 4].map((v) => ({ value: v as 1 | 2 | 3 | 4, label: DIFFICULTY_NAMES[v] }))} />
        <p className="mt-2 text-xs leading-relaxed text-ink-3">{DIFF_HELP[value.difficulty]}</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <div className="mb-2 text-sm font-medium">Duración</div>
          <Segmented value={value.rounds} onChange={(v) => set({ rounds: v })} options={roundsOptions.map((v) => ({ value: v, label: `${v} trim.` }))} />
          <p className="mt-2 text-xs text-ink-3">
            {value.rounds / 4 === Math.floor(value.rounds / 4) ? `${value.rounds / 4} ${value.rounds === 4 ? "año" : "años"} de gestión` : `${value.rounds} trimestres de gestión`}
          </p>
        </div>
        {showSize && (
          <div>
            <div className="mb-2 text-sm font-medium">Empresas en el mercado</div>
            <Segmented value={value.size} onChange={(v) => set({ size: v })} options={[3, 4, 5, 6].map((v) => ({ value: v, label: String(v) }))} />
            <p className="mt-2 text-xs text-ink-3">Tú y {value.size - 1} rivales automáticos</p>
          </div>
        )}
      </div>
      <div>
        <div className="mb-1 flex items-baseline justify-between gap-3">
          <span className="text-sm font-medium">Áreas a tu cargo</span>
          <span className="flex gap-2 text-xs">
            <button type="button" className="text-ink-3 underline-offset-4 hover:text-ink hover:underline" onClick={() => set({ modules: [...MODULE_IDS] })}>
              Todas
            </button>
            <button type="button" className="text-ink-3 underline-offset-4 hover:text-ink hover:underline" onClick={() => set({ modules: ["marketing"] })}>
              Básicas
            </button>
          </span>
        </div>
        <p className="mb-4 text-xs leading-relaxed text-ink-3">Precio, volumen y capacidad siempre están activos. Lo que apagues lo maneja tu equipo en piloto automático.</p>
        <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {MODULE_IDS.map((m) => (
            <Toggle
              key={m}
              checked={value.modules.includes(m)}
              onChange={(on) => set({ modules: on ? MODULE_IDS.filter((x) => value.modules.includes(x) || x === m) : value.modules.filter((x) => x !== m) })}
              label={MODULE_NAMES[m]}
              hint={MODULE_HELP[m]}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 text-xs text-ink-3">
        <Clock size={14} />
        Tiempo estimado: {estimateMinutes(value)} minutos. Puedes salir y continuar cuando quieras.
      </div>
    </div>
  );
}
