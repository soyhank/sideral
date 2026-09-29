import { cx } from "@/lib/format";

/** Marca: una órbita con su astro. */
export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <circle cx="16" cy="16" r="5.2" fill="currentColor" />
      <ellipse cx="16" cy="16" rx="14" ry="6.2" transform="rotate(-28 16 16)" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" />
      <circle cx="27.6" cy="9.4" r="2" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className, size = 26 }: { className?: string; size?: number }) {
  return (
    <span className={cx("inline-flex items-center gap-2.5 text-ink", className)}>
      <LogoMark size={size} />
      <span className="text-[1.05rem] font-semibold tracking-[0.22em]">SIDERAL</span>
    </span>
  );
}
