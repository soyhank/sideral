"use client";

import { ArrowRight, Check, Swords, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import { useApp } from "@/components/app/AppProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Empty, PageHeader, Spinner } from "@/components/ui/display";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/components/ui/Toast";
import { INDUSTRIES, getIndustry } from "@/engine/industries";
import { act, ApiError } from "@/lib/api";
import { cx, timeAgo } from "@/lib/format";
import { supabase } from "@/lib/supabase/client";

interface Duel {
  id: string;
  challenger: string;
  opponent: string;
  industry: string;
  rounds: number;
  challenger_game: string | null;
  opponent_game: string | null;
  challenger_score: number | null;
  opponent_score: number | null;
  status: "pendiente" | "en_juego" | "finalizado" | "rechazado" | "vencido";
  winner: string | null;
  created_at: string;
  a: { display_name: string; avatar: string; username: string } | null;
  b: { display_name: string; avatar: string; username: string } | null;
}

function Duels() {
  const router = useRouter();
  const params = useSearchParams();
  const { userId, profile } = useApp();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [industry, setIndustry] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const { data, mutate } = useSWR(
    userId ? ["duels", userId] : null,
    async () => {
      const { data } = await supabase()
        .from("duels")
        .select("*, a:profiles!duels_challenger_fkey(display_name, avatar, username), b:profiles!duels_opponent_fkey(display_name, avatar, username)")
        .order("created_at", { ascending: false })
        .limit(30);
      return (data as unknown as Duel[]) ?? [];
    },
    { refreshInterval: 30000 },
  );

  useEffect(() => {
    const u = params.get("rival");
    if (u) setUsername(u);
  }, [params]);

  const run = async (key: string, fn: () => Promise<void>) => {
    if (busy) return;
    setBusy(key);
    try {
      await fn();
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo completar la acción.", "error");
    }
    setBusy(null);
  };

  const challenge = () =>
    run("new", async () => {
      await act("duel.create", { username: username.trim(), industry: industry || undefined });
      setUsername("");
      toast("Reto enviado. Puedes jugar tu parte cuando quieras.");
      await mutate();
    });

  const play = (d: Duel) =>
    run(d.id, async () => {
      const res = await act<{ id: string }>("game.create", { mode: "duelo", duelId: d.id });
      router.push(`/partida/${res.id}`);
    });

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader eyebrow="Uno contra uno" title="Duelos" text="Reta a un compañero. Los dos dirigen la misma empresa durante cuatro trimestres, cada uno en su momento. Gana el mejor puntaje." />

      <section className="glass rounded-3xl p-6">
        <h2 className="text-[15px] font-semibold tracking-tight">Nuevo duelo</h2>
        <form
          className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
          onSubmit={(e) => {
            e.preventDefault();
            challenge();
          }}
        >
          <div>
            <label className="label" htmlFor="rival">
              Usuario de tu rival
            </label>
            <input id="rival" className="field" value={username} onChange={(e) => setUsername(e.target.value.trim())} placeholder="usuario_1a2b" autoComplete="off" autoCapitalize="none" />
          </div>
          <div>
            <label className="label" htmlFor="duel-ind">
              Industria
            </label>
            <select id="duel-ind" className="field" value={industry} onChange={(e) => setIndustry(e.target.value)}>
              <option value="" className="bg-[#16161a]">
                Al azar
              </option>
              {INDUSTRIES.map((i) => (
                <option key={i.id} value={i.id} className="bg-[#16161a]">
                  {i.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary !h-12 self-end" disabled={username.length < 3 || busy === "new"}>
            {busy === "new" ? <Spinner /> : <Swords size={17} />}
            Retar
          </button>
        </form>
        <p className="mt-3 text-xs leading-relaxed text-ink-3">
          Tu usuario es <strong className="num text-ink-2">{profile?.username}</strong>. Compártelo para que te reten. También puedes retar desde el ranking.
        </p>
      </section>

      <h2 className="mt-8 mb-3 text-sm font-semibold text-ink-2">Mis duelos</h2>
      {!data ? (
        <div className="skeleton h-28 !rounded-3xl" />
      ) : data.length === 0 ? (
        <Empty icon={<Swords size={24} />} title="Aún no tienes duelos" text="Reta a alguien de tu clase. Un duelo toma unos diez minutos." />
      ) : (
        <ul className="space-y-3">
          {data.map((d) => {
            const iAmA = d.challenger === userId;
            const me = iAmA ? d.a : d.b;
            const rival = iAmA ? d.b : d.a;
            const myScore = iAmA ? d.challenger_score : d.opponent_score;
            const rivalScore = iAmA ? d.opponent_score : d.challenger_score;
            const myGame = iAmA ? d.challenger_game : d.opponent_game;
            const ind = getIndustry(d.industry);
            const won = d.status === "finalizado" && d.winner === userId;
            const lost = d.status === "finalizado" && d.winner !== null && d.winner !== userId;
            return (
              <li key={d.id} className={cx("panel rounded-3xl p-5", won && "!border-good/40")}>
                <div className="flex items-center justify-between gap-2 text-xs text-ink-3">
                  <span className="flex items-center gap-1.5">
                    <Icon name={ind.icon} size={13} />
                    {ind.name} · {d.rounds} trimestres
                  </span>
                  <span>{timeAgo(d.created_at)}</span>
                </div>
                <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar id={me?.avatar ?? "orbita"} size={42} ring />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">Tú</div>
                      <div className="num text-xl leading-tight font-semibold">{myScore ?? "—"}</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold tracking-widest text-ink-4">VS</span>
                  <div className="flex min-w-0 flex-row-reverse items-center gap-3 text-right">
                    <Avatar id={rival?.avatar ?? "orbita"} size={42} />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{rival?.display_name ?? "Rival"}</div>
                      <div className="num text-xl leading-tight font-semibold">{d.status === "finalizado" || myScore !== null ? (rivalScore ?? "—") : "?"}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  {d.status === "finalizado" ? (
                    <span className={cx("chip", won ? "chip-good" : lost ? "chip-bad" : "")}>{won ? "Ganaste" : lost ? "Perdiste" : "Empate"}</span>
                  ) : d.status === "rechazado" ? (
                    <span className="chip">Rechazado</span>
                  ) : d.status === "pendiente" && !iAmA ? (
                    <span className="chip chip-warn">Te retaron</span>
                  ) : myScore !== null ? (
                    <span className="chip">Esperando a tu rival</span>
                  ) : (
                    <span className="chip chip-info">Tu turno</span>
                  )}
                  <div className="flex gap-2">
                    {d.status === "pendiente" && !iAmA && (
                      <>
                        <button className="btn btn-ghost btn-sm" disabled={busy === d.id} onClick={() => run(d.id, async () => { await act("duel.answer", { duelId: d.id, accept: false }); await mutate(); })}>
                          <X size={15} />
                          Rechazar
                        </button>
                        <button className="btn btn-primary btn-sm" disabled={busy === d.id} onClick={() => run(d.id, async () => { await act("duel.answer", { duelId: d.id, accept: true }); const res = await act<{ id: string }>("game.create", { mode: "duelo", duelId: d.id }); router.push(`/partida/${res.id}`); })}>
                          <Check size={15} />
                          Aceptar y jugar
                        </button>
                      </>
                    )}
                    {(d.status === "en_juego" || (d.status === "pendiente" && iAmA)) && myScore === null && (
                      <button className="btn btn-primary btn-sm" disabled={busy === d.id} onClick={() => play(d)}>
                        {busy === d.id ? <Spinner size={15} /> : null}
                        {myGame ? "Continuar" : "Jugar mi parte"}
                        <ArrowRight size={15} />
                      </button>
                    )}
                    {d.status === "finalizado" && rival && (
                      <button className="btn btn-ghost btn-sm" onClick={() => setUsername(rival.username)}>
                        Revancha
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function DuelsPage() {
  return (
    <Suspense fallback={null}>
      <Duels />
    </Suspense>
  );
}
