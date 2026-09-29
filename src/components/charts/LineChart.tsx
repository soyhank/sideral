"use client";

import { useMemo, useState } from "react";
import { AXIS, ChartTip, GRID, Legend, MUTED, niceTicks, useWidth } from "./base";

export interface LineSeries {
  name: string;
  color: string;
  values: (number | null)[];
  /** Serie protagonista: más gruesa y con etiqueta al final. */
  focus?: boolean;
}

interface Props {
  series: LineSeries[];
  labels: string[];
  format: (v: number) => string;
  height?: number;
  /** Incluir el cero en el eje. */
  zero?: boolean;
  area?: boolean;
}

export function LineChart({ series, labels, format, height = 230, zero = true, area }: Props) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const pad = { t: 12, r: 16, b: 26, l: 8 };

  const { ticks, min, max } = useMemo(() => {
    const all = series.flatMap((s) => s.values.filter((v): v is number => v !== null && Number.isFinite(v)));
    let lo = all.length ? Math.min(...all) : 0;
    let hi = all.length ? Math.max(...all) : 1;
    if (zero) {
      lo = Math.min(0, lo);
      hi = Math.max(0, hi);
    }
    if (lo === hi) hi = lo + 1;
    const t = niceTicks(lo, hi, 4);
    return { ticks: t, min: t[0], max: t[t.length - 1] };
  }, [series, zero]);

  const n = labels.length;
  const labelW = Math.max(...ticks.map((t) => format(t).length)) * 6.4 + 10;
  const x0 = pad.l + labelW;
  const w = Math.max(10, width - x0 - pad.r);
  const h = height - pad.t - pad.b;
  const x = (i: number) => x0 + (n <= 1 ? w / 2 : (i / (n - 1)) * w);
  const y = (v: number) => pad.t + h - ((v - min) / (max - min)) * h;
  const every = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(w / 56))));

  const path = (values: (number | null)[]) => {
    let d = "";
    let pen = false;
    values.forEach((v, i) => {
      if (v === null || !Number.isFinite(v)) {
        pen = false;
        return;
      }
      d += `${pen ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`;
      pen = true;
    });
    return d;
  };

  const onMove = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = e.clientX - rect.left;
    const i = n <= 1 ? 0 : Math.round(((px - x0) / w) * (n - 1));
    setHover(Math.min(n - 1, Math.max(0, i)));
  };

  const ordered = [...series].sort((a, b) => Number(a.focus ?? false) - Number(b.focus ?? false));
  const focus = series.find((s) => s.focus);

  return (
    <div>
      <div ref={ref} className="relative touch-pan-y select-none" style={{ height }} onPointerMove={onMove} onPointerDown={onMove} onPointerLeave={() => setHover(null)}>
        {width > 0 && (
          <svg width={width} height={height} role="img" aria-label="Gráfico de líneas">
            {ticks.map((t) => (
              <g key={t}>
                <line x1={x0} x2={x0 + w} y1={y(t)} y2={y(t)} stroke={t === 0 ? AXIS : GRID} strokeWidth={1} />
                <text x={x0 - 8} y={y(t) + 3.5} textAnchor="end" fontSize={10.5} fill={MUTED} style={{ fontVariantNumeric: "tabular-nums" }}>
                  {format(t)}
                </text>
              </g>
            ))}
            {labels.map((l, i) =>
              i % every === 0 || i === n - 1 ? (
                <text key={i} x={x(i)} y={height - 8} textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"} fontSize={10.5} fill={MUTED}>
                  {i === n - 1 && i % every !== 0 && n > 2 && x(i) - x(i - (i % every)) < 40 ? "" : l}
                </text>
              ) : null,
            )}
            {area && focus && focus.values.some((v) => v !== null) && (
              <path
                d={`${path(focus.values)}L${x(focus.values.length - 1).toFixed(1)},${y(Math.max(min, 0)).toFixed(1)}L${x(0).toFixed(1)},${y(Math.max(min, 0)).toFixed(1)}Z`}
                fill={focus.color}
                opacity={0.08}
              />
            )}
            {ordered.map((s) => (
              <path
                key={s.name}
                d={path(s.values)}
                fill="none"
                stroke={s.color}
                strokeWidth={s.focus ? 2.6 : 1.8}
                strokeLinejoin="round"
                strokeLinecap="round"
                opacity={s.focus || !focus ? 1 : 0.8}
              />
            ))}
            {n === 1 &&
              series.map((s) =>
                s.values[0] !== null ? <circle key={s.name} cx={x(0)} cy={y(s.values[0] as number)} r={4.5} fill={s.color} stroke="#121216" strokeWidth={2} /> : null,
              )}
            {hover !== null && (
              <g>
                <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={pad.t + h} stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
                {series.map((s) => {
                  const v = s.values[hover];
                  return v !== null && Number.isFinite(v) ? (
                    <circle key={s.name} cx={x(hover)} cy={y(v as number)} r={s.focus ? 5 : 4} fill={s.color} stroke="#121216" strokeWidth={2} />
                  ) : null;
                })}
              </g>
            )}
          </svg>
        )}
        {hover !== null && width > 0 && (
          <ChartTip
            x={x(hover)}
            y={8}
            width={width}
            title={labels[hover]}
            rows={[...series]
              .filter((s) => s.values[hover] !== null)
              .sort((a, b) => (b.values[hover] as number) - (a.values[hover] as number))
              .map((s) => ({ color: s.color, label: s.name, value: format(s.values[hover] as number), strong: s.focus }))}
          />
        )}
      </div>
      {series.length > 1 && <Legend className="mt-3" items={series.map((s) => ({ label: s.name, color: s.color }))} />}
    </div>
  );
}

export function Sparkline({ values, color = "#f5f5f7", width = 96, height = 30 }: { values: number[]; color?: string; width?: number; height?: number }) {
  if (values.length < 2) return <svg width={width} height={height} aria-hidden />;
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const span = hi - lo || 1;
  const pts = values.map((v, i) => [3 + (i / (values.length - 1)) * (width - 6), height - 4 - ((v - lo) / span) * (height - 8)]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("");
  const last = pts[pts.length - 1];
  return (
    <svg width={width} height={height} aria-hidden>
      <path d={d} fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" opacity={0.85} />
      <circle cx={last[0]} cy={last[1]} r={2.6} fill={color} />
    </svg>
  );
}
