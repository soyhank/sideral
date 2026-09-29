const nf0 = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("es-PE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const int = (v: number) => nf0.format(Math.round(v || 0));

/** Soles sin decimales: S/ 12,480 */
export function money(v: number): string {
  const n = Math.round(v || 0);
  return `${n < 0 ? "−" : ""}S/ ${nf0.format(Math.abs(n))}`;
}

/** Soles con céntimos, para precios unitarios. */
export function price(v: number): string {
  if (Math.abs(v) >= 1000) return money(v);
  return `S/ ${nf2.format(v || 0)}`;
}

/** Soles compactos: S/ 1.2 M, S/ 480 mil */
export function moneyShort(v: number): string {
  const n = v || 0;
  const a = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (a >= 1_000_000) return `${sign}S/ ${nf1.format(a / 1_000_000)} M`;
  if (a >= 10_000) return `${sign}S/ ${nf0.format(a / 1000)} mil`;
  if (a >= 1000) return `${sign}S/ ${nf1.format(a / 1000)} mil`;
  return `${sign}S/ ${nf0.format(a)}`;
}

export function compact(v: number): string {
  const a = Math.abs(v || 0);
  const sign = v < 0 ? "−" : "";
  if (a >= 1_000_000) return `${sign}${nf1.format(a / 1_000_000)} M`;
  if (a >= 10_000) return `${sign}${nf0.format(a / 1000)} mil`;
  return `${sign}${nf0.format(a)}`;
}

export function pct(v: number, digits = 1): string {
  const n = (v || 0) * 100;
  return `${n < 0 ? "−" : ""}${Math.abs(n).toFixed(digits)} %`;
}

export function signedPct(v: number, digits = 1): string {
  const n = (v || 0) * 100;
  return `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toFixed(digits)} %`;
}

export function signed(v: number): string {
  const n = Math.round(v || 0);
  return `${n > 0 ? "+" : n < 0 ? "−" : ""}${nf0.format(Math.abs(n))}`;
}

export const QUARTER_NAMES = ["", "Verano", "Otoño", "Invierno", "Primavera"];

export function periodLabel(round: number, startYear: number): string {
  const q = ((round - 1) % 4) + 1;
  const y = startYear + Math.floor((round - 1) / 4);
  return `T${q} ${y}`;
}

export function plural(n: number, one: string, many: string): string {
  return `${int(n)} ${n === 1 ? one : many}`;
}

export function timeAgo(iso: string): string {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "hace un momento";
  if (s < 3600) return `hace ${Math.floor(s / 60)} min`;
  if (s < 86400) return `hace ${Math.floor(s / 3600)} h`;
  const d = Math.floor(s / 86400);
  return d === 1 ? "ayer" : `hace ${d} días`;
}

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** Plural en español para las unidades del catálogo. */
export function pluralize(unit: string): string {
  if (unit === "ticket") return "tickets";
  if (unit.endsWith("ón")) return `${unit.slice(0, -2)}ones`;
  if (/[aeiouáéíóú]$/i.test(unit)) return `${unit}s`;
  return `${unit}es`;
}

export function units(n: number, unit: string): string {
  return `${int(n)} ${Math.round(n) === 1 ? unit : pluralize(unit)}`;
}

/** Tiempo que falta para una fecha, en palabras. */
export function remaining(ends: string): string {
  const ms = new Date(ends).getTime() - Date.now();
  if (ms <= 0) return "Terminó";
  const h = Math.floor(ms / 3600000);
  if (h >= 48) return `Quedan ${Math.floor(h / 24)} días`;
  if (h >= 1) return `Quedan ${h} h`;
  return `Quedan ${Math.max(1, Math.floor(ms / 60000))} min`;
}
