"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/format";

/** Colores de serie validados para fondo oscuro. El orden es parte de la accesibilidad. */
export const SERIES = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#9085e9", "#e66767", "#008300"];
export const SELF = "#f5f5f7";
export const GRID = "rgba(255,255,255,0.07)";
export const AXIS = "rgba(255,255,255,0.16)";
export const MUTED = "rgba(245,245,247,0.45)";

/** Color de una empresa: la propia siempre en blanco, las demás por su posición. */
export function companyColor(idx: number, self: number): string {
  if (idx === self) return SELF;
  const slot = idx > self ? idx - 1 : idx;
  return SERIES[slot % SERIES.length];
}

export function useWidth<T extends HTMLElement>(): [React.RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver((entries) => setWidth(Math.round(entries[0].contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width];
}

/** Marcas redondas para el eje: 0, 1,000, 2,000... */
export function niceTicks(min: number, max: number, count = 4): number[] {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0];
  if (min === max) {
    if (min === 0) return [0, 1];
    min = Math.min(0, min);
    max = Math.max(0, max);
  }
  const span = max - min;
  const mag = Math.pow(10, Math.floor(Math.log10(span / count)));
  // El paso más fino que no pasa de count + 1 divisiones.
  const step = [1, 2, 2.5, 5, 10, 20].map((k) => k * mag).find((s) => Math.ceil(max / s) - Math.floor(min / s) <= count + 1) ?? mag * 20;
  const start = Math.floor(min / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= max + step * 0.5; v += step) ticks.push(Number(v.toFixed(10)));
  return ticks;
}

export interface TipRow {
  color?: string;
  label: string;
  value: string;
  strong?: boolean;
}

export function ChartTip({ x, y, width, title, rows }: { x: number; y: number; width: number; title?: string; rows: TipRow[] }) {
  const left = x > width * 0.6;
  return (
    <div
      className="glass-strong pointer-events-none absolute z-10 min-w-36 rounded-xl px-3 py-2.5 text-xs shadow-2xl"
      style={{ top: Math.max(0, y), ...(left ? { right: width - x + 12 } : { left: x + 12 }) }}
    >
      {title && <div className="mb-1.5 font-medium text-ink-2">{title}</div>}
      <div className="space-y-1">
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            {r.color && <span className="h-0.5 w-3 shrink-0 rounded-full" style={{ background: r.color }} />}
            <span className={cx("num font-semibold", r.strong && "text-white")}>{r.value}</span>
            <span className="truncate text-ink-3">{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Legend({ items, className }: { items: { label: string; color: string; shape?: "line" | "rect" | "dot"; dim?: boolean }[]; className?: string }) {
  return (
    <div className={cx("flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-ink-2", className)}>
      {items.map((i) => (
        <span key={i.label} className={cx("inline-flex items-center gap-1.5", i.dim && "opacity-50")}>
          <span
            className={cx("shrink-0", i.shape === "rect" ? "h-2.5 w-2.5 rounded-[3px]" : i.shape === "dot" ? "h-2.5 w-2.5 rounded-full" : "h-0.5 w-3.5 rounded-full")}
            style={{ background: i.color }}
          />
          {i.label}
        </span>
      ))}
    </div>
  );
}

export function ChartFrame({ title, subtitle, action, children, className }: { title?: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <section className={cx("panel rounded-3xl p-5", className)}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            {title && <h3 className="text-[15px] font-semibold tracking-tight">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs leading-relaxed text-ink-3">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
