import { cx } from "@/lib/format";

const GLYPHS: Record<string, React.ReactNode> = {
  orbita: (
    <>
      <circle cx="24" cy="24" r="6" fill="currentColor" />
      <ellipse cx="24" cy="24" rx="17" ry="7" transform="rotate(-25 24 24)" stroke="currentColor" strokeWidth="1.6" opacity=".6" />
    </>
  ),
  cometa: (
    <>
      <circle cx="31" cy="17" r="5.5" fill="currentColor" />
      <path d="M27 21 9 39M24 17 8 28M31 24 20 40" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity=".55" />
    </>
  ),
  nebulosa: (
    <>
      <circle cx="18" cy="20" r="7" fill="currentColor" opacity=".45" />
      <circle cx="29" cy="27" r="9" fill="currentColor" opacity=".3" />
      <circle cx="24" cy="23" r="3.2" fill="currentColor" />
    </>
  ),
  eclipse: (
    <>
      <circle cx="24" cy="24" r="12" stroke="currentColor" strokeWidth="1.6" opacity=".6" />
      <path d="M24 12a12 12 0 1 0 0 24 9 9 0 1 1 0-24Z" fill="currentColor" />
    </>
  ),
  aurora: <path d="M8 32c5-12 9-12 13-4s8 8 12-6 5-6 7-2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />,
  prisma: (
    <>
      <path d="M24 9 39 36H9L24 9Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M24 9v27M24 22l15 14M24 22 9 36" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
    </>
  ),
  cumbre: (
    <>
      <path d="m7 37 12-21 6 9 4-6 12 18H7Z" fill="currentColor" opacity=".3" />
      <path d="m7 37 12-21 6 9 4-6 12 18" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" fill="none" />
    </>
  ),
  brujula: (
    <>
      <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="1.6" opacity=".6" />
      <path d="m30 18-3.5 8.5L18 30l3.5-8.5L30 18Z" fill="currentColor" />
    </>
  ),
  ancla: (
    <>
      <circle cx="24" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M24 15v24M16 22h16M10 29c1 6 7 10 14 10s13-4 14-10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </>
  ),
  faro: (
    <>
      <path d="M19 40 21 18h6l2 22H19Z" fill="currentColor" opacity=".35" />
      <path d="M20 18h8v-6h-8v6ZM19 40l2-22M29 40l-2-22M15 40h18M8 12l8 3M40 12l-8 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  tumi: (
    <>
      <path d="M10 38a14 14 0 0 1 28 0H10Z" fill="currentColor" opacity=".35" />
      <path d="M10 38a14 14 0 0 1 28 0H10ZM21 24V12h6v12M18 12h12" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" fill="none" />
    </>
  ),
  chakana: (
    <path
      d="M20 8h8v6h6v6h6v8h-6v6h-6v6h-8v-6h-6v-6H8v-8h6v-6h6V8Zm4 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      fill="currentColor"
      fillRule="evenodd"
      opacity=".85"
    />
  ),
};

export function Avatar({ id, size = 40, className, ring }: { id: string; size?: number; className?: string; ring?: boolean }) {
  return (
    <span
      className={cx(
        "inline-grid shrink-0 place-items-center rounded-full bg-gradient-to-b from-white/16 to-white/4 text-ink",
        ring ? "ring-1 ring-white/30" : "ring-1 ring-white/10",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 48 48" fill="none" aria-hidden>
        {GLYPHS[id] ?? GLYPHS.orbita}
      </svg>
    </span>
  );
}
