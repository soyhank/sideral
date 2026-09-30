import {
  AppWindow,
  ArrowLeftRight,
  Brain,
  Briefcase,
  Building2,
  CakeSlice,
  CalendarCheck,
  Car,
  ChevronsUp,
  CircleCheck,
  CircleHelp,
  Coffee,
  Cog,
  Crosshair,
  Crown,
  CupSoda,
  Drumstick,
  Dumbbell,
  Flag,
  Flame,
  Gem,
  Globe,
  GraduationCap,
  Grape,
  HandCoins,
  Heart,
  LandPlot,
  Layers,
  Map,
  Medal,
  Megaphone,
  Mountain,
  Pill,
  Scale,
  Shapes,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Signal,
  Smile,
  Sparkles,
  SprayCan,
  Star,
  Store,
  Swords,
  TrendingUp,
  Trophy,
  Truck,
  Users,
  Wallet,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import { INDUSTRIES } from "@/engine/industries";
import { cx } from "@/lib/format";

const MAP: Record<string, ComponentType<LucideProps>> = {
  AppWindow,
  ArrowLeftRight,
  Brain,
  Briefcase,
  Building2,
  CakeSlice,
  CalendarCheck,
  Car,
  ChevronsUp,
  CircleCheck,
  Coffee,
  Cog,
  Crosshair,
  Crown,
  CupSoda,
  Drumstick,
  Dumbbell,
  Flag,
  Flame,
  Gem,
  Globe,
  GraduationCap,
  Grape,
  HandCoins,
  Heart,
  LandPlot,
  Layers,
  Map,
  Medal,
  Megaphone,
  Mountain,
  Pill,
  Scale,
  Shapes,
  ShieldCheck,
  Shirt,
  ShoppingBag,
  Signal,
  Smile,
  Sparkles,
  SprayCan,
  Star,
  Store,
  Swords,
  TrendingUp,
  Trophy,
  Truck,
  Users,
  Wallet,
};

/** Ícono por nombre, para datos que guardan el nombre como texto (industrias, insignias). */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = MAP[name] ?? CircleHelp;
  return <C aria-hidden {...props} />;
}


/** Un color por rubro, tomado de una paleta validada para fondo oscuro. */
const HUES = ["#5b8def", "#e0713f", "#2fb381", "#d9a021", "#e0669a", "#9a8ff0", "#ef7676", "#31b0bd", "#8fc25b", "#f0a63a", "#ef7ac5", "#3cbfa8"];

export function industryColor(id: string): string {
  const i = INDUSTRIES.findIndex((x) => x.id === id);
  return HUES[(i < 0 ? 0 : i) % HUES.length];
}

interface TileProps {
  id: string;
  /** Tamaño del recuadro en píxeles. */
  box?: number;
  /** Tamaño del ícono en píxeles. */
  size?: number;
  radius?: number;
  className?: string;
  /** Versión sólida: recuadro del color del rubro con el ícono en blanco. */
  solid?: boolean;
}

/** Recuadro con el ícono de una industria en su color. */
export function IndustryTile({ id, box = 44, size = 20, radius = 14, className, solid }: TileProps) {
  const ind = INDUSTRIES.find((x) => x.id === id);
  const color = industryColor(id);
  return (
    <span
      className={cx("grid shrink-0 place-items-center", className)}
      style={{
        width: box,
        height: box,
        borderRadius: radius,
        background: solid ? color : `${color}24`,
        color: solid ? "#ffffff" : color,
        boxShadow: solid ? `0 8px 22px -10px ${color}` : `inset 0 0 0 1px ${color}55`,
      }}
    >
      <Icon name={ind?.icon ?? "Store"} size={size} strokeWidth={2.2} />
    </span>
  );
}
