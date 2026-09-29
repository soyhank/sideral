"use client";

import { Check, Gift, Target } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import { useApp } from "@/components/app/AppProvider";
import { celebrate } from "@/components/game/Reveal";
import { Progress, Spinner } from "@/components/ui/display";
import { useToast } from "@/components/ui/Toast";
import { act, ApiError } from "@/lib/api";
import { cx } from "@/lib/format";

interface Quest {
  id: string;
  label: string;
  goal: number;
  progress: number;
  xp: number;
  claimed: boolean;
}

/** Misiones del día: tres metas cortas que cambian cada día. */
export function Quests() {
  const { userId, refresh } = useApp();
  const { toast } = useToast();
  const { data, mutate } = useSWR(userId ? ["quests", userId] : null, () => act<{ quests: Quest[] }>("quests.get"), { revalidateOnFocus: true });
  const [busy, setBusy] = useState<string | null>(null);

  const claim = async (q: Quest) => {
    if (busy) return;
    setBusy(q.id);
    // Se marca como cobrada de inmediato y se revierte si el servidor no la acepta.
    mutate((d) => (d ? { quests: d.quests.map((x) => (x.id === q.id ? { ...x, claimed: true } : x)) } : d), { revalidate: false });
    try {
      const res = await act<{ xp: number; levelUp: boolean }>("quests.claim", { id: q.id });
      toast(`Misión cumplida: +${res.xp} XP`);
      celebrate(res.levelUp);
      refresh();
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo cobrar la misión.", "error");
    }
    await mutate();
    setBusy(null);
  };

  const done = data?.quests.filter((q) => q.claimed).length ?? 0;
  return (
    <section className="panel rounded-3xl p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <Target size={17} />
          Misiones de hoy
        </h2>
        <span className="chip num">{done} de 3</span>
      </div>
      <ul className="mt-4 space-y-3">
        {!data &&
          [0, 1, 2].map((i) => (
            <li key={i} className="skeleton h-14" />
          ))}
        {data?.quests.map((q) => {
          const ready = q.progress >= q.goal && !q.claimed;
          return (
            <li key={q.id} className={cx("rounded-2xl px-3.5 py-3 ring-1 transition", ready ? "bg-white/10 ring-white/40" : "bg-white/4 ring-white/8", q.claimed && "opacity-55")}>
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-sm font-medium">{q.label}</span>
                    <span className="num shrink-0 text-xs text-ink-3">
                      {q.progress} de {q.goal}
                    </span>
                  </div>
                  <Progress value={q.progress / q.goal} className="mt-2" height={4} tone={q.progress >= q.goal ? "good" : "white"} />
                </div>
                {q.claimed ? (
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-good text-black" aria-label="Cobrada">
                    <Check size={16} strokeWidth={3} />
                  </span>
                ) : ready ? (
                  <button className="btn btn-primary btn-sm shrink-0" onClick={() => claim(q)} disabled={busy === q.id}>
                    {busy === q.id ? <Spinner size={14} /> : <Gift size={14} />}+{q.xp}
                  </button>
                ) : (
                  <span className="chip num shrink-0">+{q.xp} XP</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
