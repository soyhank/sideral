"use client";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/format";

/** Número que cuenta hasta su valor. Respeta la preferencia de menos movimiento. */
export function CountUp({ value, format, duration = 900, className }: { value: number; format: (v: number) => string; duration?: number; className?: string }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    const start = from.current;
    if (start === value) return;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || duration <= 0) {
      from.current = value;
      setShown(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = start + (value - start) * eased;
      setShown(v);
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      from.current = value;
    };
  }, [value, duration]);
  return <span className={cx("num", className)}>{format(shown)}</span>;
}

export function Delta({ value, format, invert, className }: { value: number; format: (v: number) => string; invert?: boolean; className?: string }) {
  const flat = Math.abs(value) < 1e-9;
  const good = invert ? value < 0 : value > 0;
  const I = flat ? Minus : value > 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <span className={cx("num inline-flex items-center gap-0.5 text-xs font-medium", flat ? "text-ink-3" : good ? "text-good" : "text-bad", className)}>
      <I size={13} strokeWidth={2.4} />
      {format(Math.abs(value))}
    </span>
  );
}

export function Stat({
  label,
  value,
  delta,
  hint,
  tone,
  className,
  children,
}: {
  label: string;
  value: React.ReactNode;
  delta?: React.ReactNode;
  hint?: string;
  tone?: "good" | "bad" | "warn";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cx("panel rounded-2xl p-4", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs font-medium text-ink-3">{label}</span>
        {delta}
      </div>
      <div className={cx("num mt-1.5 text-[1.45rem] leading-none font-semibold tracking-tight", tone === "good" && "text-good", tone === "bad" && "text-bad", tone === "warn" && "text-warn")}>
        {value}
      </div>
      {hint && <div className="mt-1.5 text-xs text-ink-3">{hint}</div>}
      {children}
    </div>
  );
}

export function Progress({ value, className, tone = "white", height = 6 }: { value: number; className?: string; tone?: "white" | "good" | "warn" | "bad"; height?: number }) {
  const v = Math.min(1, Math.max(0, value || 0));
  const color = { white: "bg-white", good: "bg-good", warn: "bg-warn", bad: "bg-bad" }[tone];
  return (
    <div className={cx("overflow-hidden rounded-full bg-white/10", className)} style={{ height }} role="progressbar" aria-valuenow={Math.round(v * 100)} aria-valuemin={0} aria-valuemax={100}>
      <div className={cx("h-full rounded-full transition-[width] duration-700 ease-out", color)} style={{ width: `${v * 100}%` }} />
    </div>
  );
}

export function Ring({
  value,
  size = 64,
  stroke = 6,
  children,
  className,
  color = "#ffffff",
}: {
  value: number;
  size?: number;
  stroke?: number;
  children?: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.min(1, Math.max(0, value || 0));
  return (
    <span className={cx("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)" }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center">{children}</span>
    </span>
  );
}

export function Meter({ label, value, max = 100, hint }: { label: string; value: number; max?: number; hint?: string }) {
  const v = value / max;
  const tone = v >= 0.66 ? "good" : v >= 0.4 ? "white" : v >= 0.25 ? "warn" : "bad";
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-xs text-ink-2">{label}</span>
        <span className="num text-sm font-semibold">{Math.round(value)}</span>
      </div>
      <Progress value={v} tone={tone} />
      {hint && <div className="mt-1 text-[11px] text-ink-3">{hint}</div>}
    </div>
  );
}

export function Empty({ icon, title, text, action }: { icon?: React.ReactNode; title: string; text?: string; action?: React.ReactNode }) {
  return (
    <div className="panel flex flex-col items-center rounded-3xl px-6 py-12 text-center">
      {icon && <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-white/6 text-ink-2 ring-1 ring-white/10">{icon}</div>}
      <h3 className="text-base font-semibold">{title}</h3>
      {text && <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-ink-3">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function SectionTitle({ eyebrow, title, text, action, className }: { eyebrow?: string; title: string; text?: string; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cx("flex flex-wrap items-end justify-between gap-3", className)}>
      <div className="min-w-0">
        {eyebrow && <div className="eyebrow mb-1.5">{eyebrow}</div>}
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {text && <p className="mt-1 max-w-2xl text-sm leading-relaxed text-ink-3">{text}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ eyebrow, title, text, action }: { eyebrow?: string; title: string; text?: string; action?: React.ReactNode }) {
  return (
    <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <div className="eyebrow mb-2">{eyebrow}</div>}
        <h1 className="display text-[2.4rem] sm:text-5xl">{title}</h1>
        {text && <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-ink-2">{text}</p>}
      </div>
      {action}
    </header>
  );
}

export function Spinner({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={cx("animate-spin", className)} aria-label="Cargando">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" fill="none" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Stars({ value, size = 16, className }: { value: number; size?: number; className?: string }) {
  return (
    <span className={cx("inline-flex gap-0.5", className)} aria-label={`${value} de 3 estrellas`}>
      {[1, 2, 3].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path
            d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9L12 2.6Z"
            fill={i <= value ? "#ffd60a" : "rgba(255,255,255,0.1)"}
            stroke={i <= value ? "#ffd60a" : "rgba(255,255,255,0.18)"}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  );
}
