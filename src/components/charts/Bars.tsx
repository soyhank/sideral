"use client";

import { useState } from "react";
import { cx } from "@/lib/format";
import { AXIS, ChartTip, GRID, MUTED, niceTicks, useWidth } from "./base";

export interface BarItem {
  label: string;
  value: number;
  color: string;
  focus?: boolean;
  note?: string;
}

/** Barras horizontales: la forma más legible para comparar empresas con nombre. */
export function BarList({ items, format, max }: { items: BarItem[]; format: (v: number) => string; max?: number }) {
  const top = max ?? Math.max(1e-9, ...items.map((i) => Math.abs(i.value)));
  const hasNegative = items.some((i) => i.value < 0);
  return (
    <div className="space-y-2.5">
      {items.map((i) => {
        const w = Math.min(100, (Math.abs(i.value) / top) * 100);
        return (
          <div key={i.label} className="group">
            <div className="mb-1 flex items-baseline justify-between gap-3 text-xs">
              <span className={cx("flex min-w-0 items-center gap-1.5 truncate", i.focus ? "font-semibold text-ink" : "text-ink-2")}>
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: i.color }} />
                <span className="truncate">{i.label}</span>
                {i.note && <span className="shrink-0 text-ink-3">{i.note}</span>}
              </span>
              <span className={cx("num shrink-0 font-semibold", i.value < 0 && "text-bad")}>{format(i.value)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out group-hover:brightness-125"
                style={{ width: `${w}%`, background: hasNegative && i.value < 0 ? "#ff5a4f" : i.color, opacity: i.focus ? 1 : 0.85 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export interface ColumnGroup {
  label: string;
  values: number[];
}

/** Columnas agrupadas por periodo. Una sola escala, línea base en cero. */
export function Columns({
  groups,
  series,
  format,
  height = 220,
}: {
  groups: ColumnGroup[];
  series: { name: string; color: string }[];
  format: (v: number) => string;
  height?: number;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const pad = { t: 12, r: 8, b: 26, l: 8 };
  const all = groups.flatMap((g) => g.values);
  const ticks = niceTicks(Math.min(0, ...all), Math.max(0, ...all, 1), 4);
  const min = ticks[0];
  const max = ticks[ticks.length - 1];
  const labelW = Math.max(...ticks.map((t) => format(t).length)) * 6.4 + 10;
  const x0 = pad.l + labelW;
  const w = Math.max(10, width - x0 - pad.r);
  const h = height - pad.t - pad.b;
  const band = w / Math.max(1, groups.length);
  const k = series.length;
  const bar = Math.min(24, Math.max(3, (band * 0.72 - (k - 1) * 2) / k));
  const y = (v: number) => pad.t + h - ((v - min) / (max - min)) * h;
  const every = Math.max(1, Math.ceil(groups.length / Math.max(2, Math.floor(w / 52))));

  return (
    <div
      ref={ref}
      className="relative select-none"
      style={{ height }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const i = Math.floor((e.clientX - rect.left - x0) / band);
        setHover(i >= 0 && i < groups.length ? i : null);
      }}
      onPointerLeave={() => setHover(null)}
    >
      {width > 0 && (
        <svg width={width} height={height} role="img" aria-label="Gráfico de columnas">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={x0} x2={x0 + w} y1={y(t)} y2={y(t)} stroke={t === 0 ? AXIS : GRID} />
              <text x={x0 - 8} y={y(t) + 3.5} textAnchor="end" fontSize={10.5} fill={MUTED} style={{ fontVariantNumeric: "tabular-nums" }}>
                {format(t)}
              </text>
            </g>
          ))}
          {groups.map((g, gi) => {
            const total = k * bar + (k - 1) * 2;
            const start = x0 + gi * band + (band - total) / 2;
            return (
              <g key={gi} opacity={hover === null || hover === gi ? 1 : 0.45}>
                {g.values.map((v, si) => {
                  const top = Math.min(y(v), y(0));
                  const hh = Math.max(1, Math.abs(y(v) - y(0)));
                  const r = Math.min(4, bar / 2, hh);
                  const bx = start + si * (bar + 2);
                  const up = v >= 0;
                  const d = up
                    ? `M${bx},${top + hh}V${top + r}Q${bx},${top} ${bx + r},${top}H${bx + bar - r}Q${bx + bar},${top} ${bx + bar},${top + r}V${top + hh}Z`
                    : `M${bx},${top}V${top + hh - r}Q${bx},${top + hh} ${bx + r},${top + hh}H${bx + bar - r}Q${bx + bar},${top + hh} ${bx + bar},${top + hh - r}V${top}Z`;
                  return <path key={si} d={d} fill={v < 0 && k === 1 ? "#ff5a4f" : series[si].color} />;
                })}
                {(gi % every === 0 || gi === groups.length - 1) && (
                  <text x={x0 + gi * band + band / 2} y={height - 8} textAnchor="middle" fontSize={10.5} fill={MUTED}>
                    {g.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      )}
      {hover !== null && width > 0 && (
        <ChartTip
          x={x0 + hover * band + band / 2}
          y={8}
          width={width}
          title={groups[hover].label}
          rows={series.map((s, i) => ({ color: s.color, label: s.name, value: format(groups[hover].values[i]) }))}
        />
      )}
    </div>
  );
}

/** Barra apilada de participación, con separación de 2 px entre segmentos. */
export function ShareBar({ items, format }: { items: BarItem[]; format: (v: number) => string }) {
  const total = items.reduce((s, i) => s + Math.max(0, i.value), 0) || 1;
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div>
      <div className="flex h-7 gap-0.5 overflow-hidden rounded-lg">
        {items.map((i, n) => (
          <div
            key={i.label}
            className="h-full min-w-[3px] transition-[flex-grow,opacity] duration-700"
            style={{ flexGrow: Math.max(0.001, i.value / total), flexBasis: 0, background: i.color, opacity: hover === null || hover === n ? 1 : 0.4 }}
            onPointerEnter={() => setHover(n)}
            onPointerLeave={() => setHover(null)}
            title={`${i.label}: ${format(i.value)}`}
          />
        ))}
      </div>
      <div className="mt-3 grid gap-x-5 gap-y-1.5 sm:grid-cols-2">
        {items.map((i, n) => (
          <div
            key={i.label}
            className={cx("flex items-center justify-between gap-3 text-xs transition-opacity", hover !== null && hover !== n && "opacity-45")}
            onPointerEnter={() => setHover(n)}
            onPointerLeave={() => setHover(null)}
          >
            <span className={cx("flex min-w-0 items-center gap-1.5", i.focus ? "font-semibold text-ink" : "text-ink-2")}>
              <span className="h-2.5 w-2.5 shrink-0 rounded-[3px]" style={{ background: i.color }} />
              <span className="truncate">{i.label}</span>
            </span>
            <span className="num font-semibold">{format(i.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
