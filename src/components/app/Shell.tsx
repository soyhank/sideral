"use client";

import {
  BookOpen,
  CalendarCheck,
  Flame,
  House,
  LogOut,
  Menu,
  Play,
  Presentation,
  Route,
  Swords,
  Trophy,
  UserRound,
  Users,
  BarChart3,
  Bell,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { Avatar } from "@/components/ui/Avatar";
import { Progress } from "@/components/ui/display";
import { Logo, LogoMark } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";
import { cx, int, timeAgo } from "@/lib/format";
import { levelProgress, titleFor } from "@/lib/gamification";
import { supabase } from "@/lib/supabase/client";
import { useApp } from "./AppProvider";

const NAV = [
  { href: "/inicio", label: "Inicio", icon: House },
  { href: "/carrera", label: "Carrera", icon: Route },
  { href: "/jugar", label: "Simulación libre", icon: Play },
  { href: "/salas", label: "Salas", icon: Users },
  { href: "/retos", label: "Retos del día", icon: CalendarCheck },
  { href: "/torneos", label: "Torneos", icon: Trophy },
  { href: "/duelos", label: "Duelos", icon: Swords },
  { href: "/ranking", label: "Ranking", icon: BarChart3 },
  { href: "/aulas", label: "Aulas", icon: Presentation },
  { href: "/academia", label: "Academia", icon: BookOpen },
];

interface Notice {
  id: number;
  kind: string;
  title: string;
  body: string | null;
  link: string | null;
  read: boolean;
  created_at: string;
}

function useNotices(userId: string | null) {
  return useSWR(
    userId ? ["notices", userId] : null,
    async () => {
      const { data } = await supabase().from("notifications").select("*").order("created_at", { ascending: false }).limit(15);
      return (data as Notice[]) ?? [];
    },
    { refreshInterval: 60000, revalidateOnFocus: true },
  );
}

function Notices() {
  const { userId } = useApp();
  const { data, mutate } = useNotices(userId);
  const [open, setOpen] = useState(false);
  const unread = data?.filter((n) => !n.read).length ?? 0;
  const show = async () => {
    setOpen(true);
    if (unread) {
      mutate((list) => list?.map((n) => ({ ...n, read: true })), { revalidate: false });
      await supabase().from("notifications").update({ read: true }).eq("read", false);
    }
  };
  return (
    <>
      <button className="btn btn-ghost btn-icon btn-sm relative" onClick={show} aria-label={unread ? `${unread} avisos nuevos` : "Avisos"}>
        <Bell size={17} />
        {unread > 0 && <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-white ring-2 ring-[#0b0b0e]" />}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Avisos" size="sm">
        {!data?.length ? (
          <p className="py-8 text-center text-sm text-ink-3">No tienes avisos por ahora.</p>
        ) : (
          <ul className="-mx-2 space-y-1">
            {data.map((n) => (
              <li key={n.id}>
                <Link href={n.link ?? "/inicio"} onClick={() => setOpen(false)} className="block rounded-2xl px-3 py-3 transition hover:bg-white/6">
                  <div className="text-sm font-medium">{n.title}</div>
                  {n.body && <div className="mt-0.5 text-xs leading-relaxed text-ink-3">{n.body}</div>}
                  <div className="mt-1 text-[11px] text-ink-4">{timeAgo(n.created_at)}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </>
  );
}

function ProfileCard({ compact }: { compact?: boolean }) {
  const { profile } = useApp();
  if (!profile)
    return (
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-10 !rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton h-2 w-full" />
        </div>
      </div>
    );
  const lp = levelProgress(profile.xp);
  return (
    <Link href="/perfil" className="group block">
      <div className="flex items-center gap-3">
        <Avatar id={profile.avatar} size={compact ? 36 : 42} ring />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold group-hover:text-white">{profile.display_name}</div>
          <div className="truncate text-xs text-ink-3">
            Nivel {lp.level} · {titleFor(lp.level)}
          </div>
        </div>
      </div>
      <Progress value={lp.progress} className="mt-3" height={4} />
      <div className="num mt-1.5 flex justify-between text-[11px] text-ink-3">
        <span>{int(profile.xp)} XP</span>
        <span>faltan {int(lp.missing)}</span>
      </div>
    </Link>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { signOut, profile } = useApp();
  const [more, setMore] = useState(false);
  const items = NAV;
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const mobile = [NAV[0], NAV[1], NAV[2], NAV[4]];

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1480px]">
      {/* Barra lateral de escritorio */}
      <aside className="sticky top-0 hidden h-dvh w-[264px] shrink-0 flex-col gap-5 p-4 lg:flex">
        <div className="glass flex h-full flex-col rounded-3xl p-4">
          <Link href="/inicio" className="px-2 pt-2 pb-5">
            <Logo />
          </Link>
          <nav className="scroll-none -mx-1 flex-1 space-y-0.5 overflow-y-auto px-1" aria-label="Principal">
            {items.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={active(n.href) ? "page" : undefined}
                className={cx(
                  "flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition",
                  active(n.href) ? "bg-accent text-white shadow-[0_8px_24px_-10px_rgba(109,125,255,0.9)]" : "text-ink-2 hover:bg-white/6 hover:text-ink",
                )}
              >
                <n.icon size={17} strokeWidth={2} />
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hairline my-4" />
          <ProfileCard />
          <button className="btn btn-quiet btn-sm mt-3 w-full justify-start !px-2" onClick={signOut}>
            <LogOut size={15} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Barra superior */}
        <header className="sticky top-0 z-30 px-4 pt-3 lg:px-6 lg:pt-4">
          <div className="glass flex h-14 items-center justify-between gap-3 rounded-2xl px-4">
            <Link href="/inicio" className="lg:hidden" aria-label="Inicio">
              <LogoMark size={26} />
            </Link>
            <div className="hidden text-sm text-ink-3 lg:block">{items.find((n) => active(n.href))?.label ?? "Sideral"}</div>
            <div className="flex items-center gap-2">
              {profile && (
                <>
                  <span className="chip" title="Racha de días seguidos">
                    <Flame size={13} className={profile.streak > 0 ? "text-amber" : ""} />
                    <span className="num">{profile.streak}</span>
                  </span>
                  <span className="chip num" title="Experiencia de esta semana">
                    {int(profile.weekly_xp)} XP
                  </span>
                </>
              )}
              <Notices />
              <Link href="/perfil" className="lg:hidden" aria-label="Perfil">
                <Avatar id={profile?.avatar ?? "orbita"} size={34} ring />
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 pt-6 pb-32 lg:px-6 lg:pb-12">{children}</main>
      </div>

      {/* Barra inferior del celular */}
      <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden" aria-label="Principal">
        <div className="glass-strong mx-auto flex h-16 max-w-md items-stretch justify-between rounded-[1.4rem] px-1.5">
          {mobile.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active(n.href) ? "page" : undefined}
              className={cx("flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-[10.5px] font-medium transition", active(n.href) ? "text-white" : "text-ink-3")}
            >
              <span className={cx("grid h-8 w-12 place-items-center rounded-full transition", active(n.href) && "bg-accent/25 text-accent-2")}>
                <n.icon size={19} strokeWidth={active(n.href) ? 2.4 : 2} />
              </span>
              {n.label === "Simulación libre" ? "Jugar" : n.label === "Retos del día" ? "Retos" : n.label}
            </Link>
          ))}
          <button className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-[10.5px] font-medium text-ink-3" onClick={() => setMore(true)}>
            <span className="grid h-8 w-12 place-items-center rounded-full">
              <Menu size={19} />
            </span>
            Más
          </button>
        </div>
      </nav>

      <Modal open={more} onClose={() => setMore(false)} title="Menú" size="sm">
        <div className="mb-5">
          <ProfileCard />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {items.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setMore(false)}
              className={cx("panel flex items-center gap-2.5 rounded-2xl px-3.5 py-3.5 text-sm font-medium", active(n.href) && "!border-white/40 !bg-white/10")}
            >
              <n.icon size={17} />
              {n.label}
            </Link>
          ))}
          <Link href="/perfil" onClick={() => setMore(false)} className="panel flex items-center gap-2.5 rounded-2xl px-3.5 py-3.5 text-sm font-medium">
            <UserRound size={17} />
            Perfil
          </Link>
        </div>
        <button className="btn btn-ghost mt-4 w-full" onClick={signOut}>
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </Modal>
    </div>
  );
}
