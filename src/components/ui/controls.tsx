"use client";

import { Check, Minus, Plus } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cx, int } from "@/lib/format";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  label?: string;
  disabled?: boolean;
  /** Marca de referencia (por ejemplo, el precio del mercado). */
  mark?: number;
  markLabel?: string;
  "aria-label"?: string;
}

export function Slider({ value, min, max, step = 1, onChange, disabled, mark, markLabel, ...rest }: SliderProps) {
  const fill = max > min ? ((Math.min(max, Math.max(min, value)) - min) / (max - min)) * 100 : 0;
  const markPos = mark !== undefined && max > min ? ((mark - min) / (max - min)) * 100 : null;
  return (
    <div className="relative">
      <input
        type="range"
        className="range"
        min={min}
        max={max}
        step={step}
        value={Number.isFinite(value) ? value : min}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
        aria-label={rest["aria-label"]}
      />
      {markPos !== null && markPos >= 0 && markPos <= 100 && (
        <div className="pointer-events-none absolute top-full -mt-1 -translate-x-1/2 text-center" style={{ left: `calc(${markPos}% + ${(50 - markPos) * 0.22}px)` }}>
          <div className="mx-auto h-1.5 w-px bg-white/40" />
          {markLabel && <div className="mt-0.5 text-[10px] whitespace-nowrap text-ink-3">{markLabel}</div>}
        </div>
      )}
    </div>
  );
}

interface NumberFieldProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  disabled?: boolean;
  "aria-label"?: string;
  className?: string;
  compact?: boolean;
}

/** Campo numérico con separador de miles y botones de más y menos. */
export function NumberField({ value, onChange, min = 0, max = Number.MAX_SAFE_INTEGER, step = 1, prefix, suffix, decimals = 0, disabled, className, compact, ...rest }: NumberFieldProps) {
  const format = (v: number) => (decimals > 0 ? v.toFixed(decimals) : int(v));
  const [text, setText] = useState(format(value));
  const focused = useRef(false);
  useEffect(() => {
    if (!focused.current) setText(format(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, decimals]);

  const clampValue = (v: number) => Math.min(max, Math.max(min, v));
  const commit = (raw: string) => {
    const clean = raw.replace(/[^\d.,-]/g, "").replace(/,/g, decimals > 0 ? "" : "");
    const n = Number(decimals > 0 ? clean : clean.replace(/\./g, ""));
    const v = clampValue(Number.isFinite(n) ? n : value);
    onChange(decimals > 0 ? Number(v.toFixed(decimals)) : Math.round(v));
    return v;
  };
  const bump = (dir: number) => {
    const v = clampValue(Number((value + dir * step).toFixed(decimals)));
    onChange(v);
    setText(format(v));
  };

  return (
    <div className={cx("flex items-center gap-1.5", className)}>
      <button type="button" className="btn btn-ghost btn-icon btn-sm shrink-0" onClick={() => bump(-1)} disabled={disabled || value <= min} aria-label="Disminuir">
        <Minus size={15} />
      </button>
      <div className={cx("well flex min-w-0 flex-1 items-center rounded-xl px-3 transition focus-within:border-white/45", compact ? "h-9" : "h-11")}>
        {prefix && <span className="mr-1.5 shrink-0 text-sm text-ink-3">{prefix}</span>}
        <input
          inputMode={decimals > 0 ? "decimal" : "numeric"}
          className="num w-full min-w-0 bg-transparent text-right text-[15px] font-medium outline-none"
          value={text}
          disabled={disabled}
          aria-label={rest["aria-label"]}
          onFocus={(e) => {
            focused.current = true;
            setText(decimals > 0 ? String(value) : String(Math.round(value)));
            requestAnimationFrame(() => e.target.select());
          }}
          onChange={(e) => {
            setText(e.target.value);
            const n = Number(e.target.value.replace(/[^\d.-]/g, ""));
            if (e.target.value !== "" && Number.isFinite(n)) onChange(clampValue(decimals > 0 ? n : Math.round(n)));
          }}
          onBlur={(e) => {
            focused.current = false;
            setText(format(commit(e.target.value)));
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.target as HTMLInputElement).blur();
            if (e.key === "ArrowUp") {
              e.preventDefault();
              bump(1);
            }
            if (e.key === "ArrowDown") {
              e.preventDefault();
              bump(-1);
            }
          }}
        />
        {suffix && <span className="ml-1.5 shrink-0 text-sm text-ink-3">{suffix}</span>}
      </div>
      <button type="button" className="btn btn-ghost btn-icon btn-sm shrink-0" onClick={() => bump(1)} disabled={disabled || value >= max} aria-label="Aumentar">
        <Plus size={15} />
      </button>
    </div>
  );
}

export function Segmented<T extends string | number>({
  value,
  onChange,
  options,
  className,
  size = "md",
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; hint?: string; disabled?: boolean }[];
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div className={cx("tab-bar scroll-none max-w-full overflow-x-auto", className)} role="tablist">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          role="tab"
          aria-selected={o.value === value}
          disabled={o.disabled}
          title={o.hint}
          className={cx("tab flex-1 justify-center disabled:opacity-35", size === "sm" && "!h-8 !px-3 !text-xs")}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  hint,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint?: string;
  disabled?: boolean;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className={cx("flex cursor-pointer items-start gap-3.5 select-none", disabled && "cursor-not-allowed opacity-45")}>
      <span className="relative mt-0.5 shrink-0">
        <input id={id} type="checkbox" className="peer sr-only" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
        <span className="block h-[26px] w-[46px] rounded-full bg-white/12 ring-1 ring-white/10 transition peer-checked:bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-white/70" />
        <span className="absolute top-[3px] left-[3px] h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 peer-checked:translate-x-5 peer-checked:bg-[#09090b]" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium">{label}</span>
        {hint && <span className="mt-0.5 block text-xs leading-relaxed text-ink-3">{hint}</span>}
      </span>
    </label>
  );
}

export function CheckCard({
  checked,
  onChange,
  title,
  text,
  badge,
  disabled,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  text?: string;
  badge?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cx(
        "panel panel-hover flex w-full items-start gap-3 rounded-2xl p-4 text-left disabled:opacity-45",
        checked && "!border-white/45 !bg-white/10",
      )}
    >
      <span className={cx("mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md ring-1 transition", checked ? "bg-white text-black ring-white" : "ring-white/25")}>
        {checked && <Check size={14} strokeWidth={3} />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
          {badge && <span className="chip">{badge}</span>}
        </span>
        {text && <span className="mt-1 block text-xs leading-relaxed text-ink-3">{text}</span>}
      </span>
    </button>
  );
}
