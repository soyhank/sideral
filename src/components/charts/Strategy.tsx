"use client";

import { useState } from "react";
import type { BcgPoint } from "@/engine/analysis";
import { BCG_GROWTH_CUT } from "@/engine/analysis";
import { cx, moneyShort, pct } from "@/lib/format";
import { ChartTip, MUTED, SERIES, useWidth } from "./base";

const BCG_COLORS = [SERIES[0], SERIES[1], SERIES[2]];

/** Matriz BCG: participación relativa (eje horizontal, invertido) y crecimiento del mercado (eje vertical). */
export function BcgMatrix({ points }: { points: BcgPoint[] }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const height = Math.min(380, Math.max(260, width * 0.66));
  const pad = { t: 10, r: 10, b: 34, l: 40 };
  const w = Math.max(10, width - pad.l - pad.r);
  const h = height - pad.t - pad.b;
  // Escala logarítmica de 0.1x a 10x, con 1x al centro. El lado izquierdo es la mayor participación.
  const x = (rel: number) => {
    const v = Math.min(10, Math.max(0.1, rel || 0.1));
    return pad.l + (1 - (Math.log10(v) + 1) / 2) * w;
  };
  const gMax = Math.max(0.2, ...points.map((p) => p.growth + 0.04));
  const gMin = Math.min(0, ...points.map((p) => p.growth - 0.02));
  const mid = BCG_GROWTH_CUT;
  const y = (g: number) => {
    // El corte de crecimiento queda siempre en la mitad de la altura.
    const v = Math.min(gMax, Math.max(gMin, g));
    return v >= mid ? pad.t + (h / 2) * (1 - (v - mid) / (gMax - mid)) : pad.t + h / 2 + (h / 2) * ((mid - v) / (mid - gMin));
  };
  const top = Math.max(1, ...points.map((p) => p.revenue));
  const radius = (p: BcgPoint) => (p.active ? 10 + 22 * Math.sqrt(p.revenue / top) : 9);
  const quads = [
    { name: "Estrella", x: pad.l + 10, y: pad.t + 18 },
    { name: "Interrogante", x: pad.l + w / 2 + 10, y: pad.t + 18 },
    { name: "Vaca lechera", x: pad.l + 10, y: pad.t + h - 10 },
    { name: "Perro", x: pad.l + w / 2 + 10, y: pad.t + h - 10 },
  ];
  return (
    <div>
      <div ref={ref} className="relative" style={{ height }}>
        {width > 0 && (
          <svg width={width} height={height} role="img" aria-label="Matriz BCG">
            <rect x={pad.l} y={pad.t} width={w} height={h} rx={14} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.09)" />
            <line x1={pad.l + w / 2} x2={pad.l + w / 2} y1={pad.t} y2={pad.t + h} stroke="rgba(255,255,255,0.14)" />
            <line x1={pad.l} x2={pad.l + w} y1={pad.t + h / 2} y2={pad.t + h / 2} stroke="rgba(255,255,255,0.14)" />
            {quads.map((q) => (
              <text key={q.name} x={q.x} y={q.y} fontSize={11} fontWeight={600} fill="rgba(245,245,247,0.5)" letterSpacing="0.06em">
                {q.name.toUpperCase()}
              </text>
            ))}
            <text x={pad.l} y={height - 8} fontSize={10.5} fill={MUTED}>
              Mayor participación
            </text>
            <text x={pad.l + w} y={height - 8} fontSize={10.5} fill={MUTED} textAnchor="end">
              Menor participación
            </text>
            <text x={pad.l + w / 2} y={height - 8} fontSize={10.5} fill={MUTED} textAnchor="middle">
              igual al líder
            </text>
            <text x={12} y={pad.t + h / 2} fontSize={10.5} fill={MUTED} textAnchor="middle" transform={`rotate(-90 12 ${pad.t + h / 2})`}>
              Crecimiento del mercado
            </text>
            <text x={pad.l - 6} y={pad.t + h / 2 + 3.5} fontSize={10} fill={MUTED} textAnchor="end">
              {Math.round(mid * 100)}%
            </text>
            {points.map((p, i) => {
              const cx0 = x(p.active ? Math.min(7.5, Math.max(0.13, p.relShare)) : 0.13);
              const cy0 = y(p.growth);
              const r = radius(p);
              return (
                <g key={p.id} onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} style={{ cursor: "default" }}>
                  <circle cx={cx0} cy={cy0} r={Math.max(r + 6, 14)} fill="transparent" />
                  <circle
                    cx={cx0}
                    cy={cy0}
                    r={r}
                    fill={p.active ? BCG_COLORS[i] : "transparent"}
                    fillOpacity={p.active ? (hover === i ? 0.95 : 0.78) : 0}
                    stroke={p.active ? "#121216" : BCG_COLORS[i]}
                    strokeWidth={2}
                    strokeDasharray={p.active ? undefined : "4 4"}
                  />
                  <text x={cx0} y={cy0 + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={p.active ? "#ffffff" : "rgba(245,245,247,0.7)"}>
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
        {hover !== null && width > 0 && (
          <ChartTip
            x={x(points[hover].active ? Math.min(7.5, Math.max(0.13, points[hover].relShare)) : 0.13)}
            y={Math.max(0, y(points[hover].growth) - 70)}
            width={width}
            title={points[hover].name}
            rows={
              points[hover].active
                ? [
                    { label: "participación frente al mayor rival", value: `${points[hover].relShare.toFixed(2)}x` },
                    { label: "crecimiento anual del mercado", value: pct(points[hover].growth, 0) },
                    { label: "ventas del trimestre", value: moneyShort(points[hover].revenue) },
                  ]
                : [
                    { label: "aún no participas", value: "Sin lanzar" },
                    { label: "crecimiento anual del mercado", value: pct(points[hover].growth, 0) },
                  ]
            }
          />
        )}
      </div>
      <div className="mt-4 grid gap-2.5">
        {points.map((p, i) => (
          <div key={p.id} className="well flex items-start gap-3 rounded-2xl p-3.5">
            <span
              className={cx("grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold", !p.active && "border border-dashed")}
              style={p.active ? { background: BCG_COLORS[i], color: "#fff" } : { borderColor: BCG_COLORS[i], color: "rgba(245,245,247,.7)" }}
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">{p.name}</span>
                <span className="chip">{p.active ? p.quadrant : "Sin lanzar"}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-ink-3">{p.advice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface RadarAxis {
  label: string;
  self: number;
  others: number;
}

/** Radar de atributos (0 a 100): tu empresa frente al promedio de los rivales. */
export function Radar({ axes, size = 260 }: { axes: RadarAxis[]; size?: number }) {
  const c = size / 2;
  const r = size / 2 - 38;
  const n = axes.length;
  const point = (i: number, v: number) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    const k = (Math.min(100, Math.max(0, v)) / 100) * r;
    return [c + Math.cos(a) * k, c + Math.sin(a) * k];
  };
  const poly = (key: "self" | "others") => axes.map((a, i) => point(i, a[key]).map((v) => v.toFixed(1)).join(",")).join(" ");
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Radar de atributos" className="max-w-full">
        {[25, 50, 75, 100].map((ring) => (
          <polygon
            key={ring}
            points={axes.map((_, i) => point(i, ring).map((v) => v.toFixed(1)).join(",")).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
          />
        ))}
        {axes.map((a, i) => {
          const [x, y] = point(i, 100);
          const [lx, ly] = point(i, 124);
          return (
            <g key={a.label}>
              <line x1={c} y1={c} x2={x} y2={y} stroke="rgba(255,255,255,0.08)" />
              <text x={lx} y={ly + 3} fontSize={10.5} fill="rgba(245,245,247,0.62)" textAnchor={Math.abs(lx - c) < 8 ? "middle" : lx > c ? "start" : "end"}>
                {a.label}
              </text>
            </g>
          );
        })}
        <polygon points={poly("others")} fill={SERIES[0]} fillOpacity={0.14} stroke={SERIES[0]} strokeWidth={1.6} strokeLinejoin="round" />
        <polygon points={poly("self")} fill="#ffffff" fillOpacity={0.1} stroke="#f5f5f7" strokeWidth={2.2} strokeLinejoin="round" />
        {axes.map((a, i) => {
          const [x, y] = point(i, a.self);
          return <circle key={a.label} cx={x} cy={y} r={3.6} fill="#f5f5f7" stroke="#121216" strokeWidth={2} />;
        })}
      </svg>
      <div className="mt-1 flex gap-4 text-xs text-ink-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-3.5 rounded-full bg-[#f5f5f7]" />
          Tu empresa
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-0.5 w-3.5 rounded-full" style={{ background: SERIES[0] }} />
          Promedio de rivales
        </span>
      </div>
    </div>
  );
}

const FORCE_LABEL = ["", "Muy baja", "Baja", "Media", "Alta", "Muy alta"];

export function ForceMeter({ title, level, text }: { title: string; level: number; text: string }) {
  return (
    <div className="well rounded-2xl p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs text-ink-2">{FORCE_LABEL[level]}</span>
      </div>
      <div className="mt-2.5 flex gap-1" role="img" aria-label={`Intensidad ${level} de 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={cx("h-1.5 flex-1 rounded-full", i <= level ? "bg-white" : "bg-white/12")} />
        ))}
      </div>
      <p className="mt-2.5 text-xs leading-relaxed text-ink-3">{text}</p>
    </div>
  );
}
