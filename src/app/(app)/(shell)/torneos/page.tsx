"use client";

import { ArrowRight, CalendarClock, Check, Plus, Trophy } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/components/app/AppProvider";
import { DEFAULT_SETUP, IndustryPicker, SetupForm, type SetupValue } from "@/components/app/GameSetup";
import { Segmented } from "@/components/ui/controls";
import { Empty, PageHeader, Spinner } from "@/components/ui/display";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { DIFFICULTY_NAMES } from "@/engine/constants";
import { getIndustry } from "@/engine/industries";
import type { IndustryId } from "@/engine/types";
import { act, ApiError } from "@/lib/api";
import { cx, remaining } from "@/lib/format";
import { useClassrooms, useNow, useTournaments, type Tournament } from "@/lib/hooks";

export default function TournamentsPage() {
  const router = useRouter();
  const { userId, profile } = useApp();
  const { toast } = useToast();
  const { data, mutate } = useTournaments(userId);
  const { data: classrooms } = useClassrooms(userId);
  const [create, setCreate] = useState(false);
  const [industry, setIndustry] = useState<IndustryId | null>(null);
  const [setup, setSetup] = useState<SetupValue>({ ...DEFAULT_SETUP, rounds: 6 });
  const [name, setName] = useState("");
  const [days, setDays] = useState(7);
  const [classroom, setClassroom] = useState("");
  const [busy, setBusy] = useState(false);

  const now = useNow();
  const open = (data?.list ?? []).filter((t) => new Date(t.ends_at).getTime() > now);
  const past = (data?.list ?? []).filter((t) => new Date(t.ends_at).getTime() <= now).slice(0, 8);
  const entry = (t: Tournament) => data?.entries.find((e) => e.tournament_id === t.id);
  const teacher = profile && profile.role !== "estudiante";
  const mine = (classrooms ?? []).filter((c) => c.mine);

  const submit = async () => {
    if (!industry || busy) return;
    setBusy(true);
    try {
      const res = await act<{ id: string }>("tournament.create", {
        name: name.trim() || undefined,
        industry,
        difficulty: setup.difficulty,
        rounds: setup.rounds,
        modules: setup.modules,
        days,
        classroomId: classroom || null,
      });
      await mutate();
      router.push(`/torneos/${res.id}`);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo crear el torneo.", "error");
      setBusy(false);
    }
  };

  const Card = ({ t, closed }: { t: Tournament; closed?: boolean }) => {
    const ind = getIndustry(t.industry);
    const e = entry(t);
    return (
      <Link href={`/torneos/${t.id}`} className={cx("panel panel-hover block rounded-3xl p-5", t.official && !closed && "!border-white/30")}>
        <div className="flex items-start gap-3.5">
          <span className={cx("grid h-12 w-12 shrink-0 place-items-center rounded-2xl ring-1", t.official && !closed ? "bg-white text-black ring-white" : "bg-white/8 ring-white/10")}>
            <Icon name={ind.icon} size={21} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-[15px] font-semibold">{t.name}</h3>
              {t.official && <span className="chip chip-white">Oficial</span>}
              {t.classroom_id && <span className="chip chip-info">De tu aula</span>}
            </div>
            <p className="mt-0.5 truncate text-xs text-ink-3">
              {ind.name} · {DIFFICULTY_NAMES[t.difficulty]} · {t.rounds} trimestres
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <span className="chip">
            <CalendarClock size={12} />
            {remaining(t.ends_at)}
          </span>
          {e?.finished ? (
            <span className="chip chip-good num">
              <Check size={12} />
              {e.score} puntos
            </span>
          ) : e ? (
            <span className="chip chip-warn">En curso</span>
          ) : closed ? (
            <span className="text-xs text-ink-3">No participaste</span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-ink">
              Participar
              <ArrowRight size={13} />
            </span>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Competencia a tu ritmo"
        title="Torneos"
        text="Todos dirigen la misma empresa, contra los mismos rivales y con las mismas noticias. No hace falta coincidir en horario: juegas cuando puedas y gana el mejor puntaje."
        action={
          teacher ? (
            <button className="btn btn-primary" onClick={() => setCreate(true)}>
              <Plus size={17} />
              Crear torneo
            </button>
          ) : undefined
        }
      />

      {!data ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="skeleton h-36 !rounded-3xl" />
          <div className="skeleton h-36 !rounded-3xl" />
        </div>
      ) : (
        <>
          <h2 className="mb-3 text-sm font-semibold text-ink-2">Abiertos</h2>
          {open.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {open.map((t) => (
                <Card key={t.id} t={t} />
              ))}
            </div>
          ) : (
            <Empty icon={<Trophy size={24} />} title="No hay torneos abiertos" text="El torneo semanal se abre cada lunes." />
          )}
          {past.length > 0 && (
            <>
              <h2 className="mt-9 mb-3 text-sm font-semibold text-ink-2">Anteriores</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {past.map((t) => (
                  <Card key={t.id} t={t} closed />
                ))}
              </div>
            </>
          )}
        </>
      )}

      <Modal open={create} onClose={() => !busy && setCreate(false)} title="Crear torneo" size="xl">
        <div className="space-y-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="t-name">
                Nombre del torneo
              </label>
              <input id="t-name" className="field" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} placeholder="Por ejemplo: Copa de Finanzas 2026" />
            </div>
            <div>
              <div className="label">Duración</div>
              <Segmented
                value={days}
                onChange={setDays}
                options={[
                  { value: 1, label: "1 día" },
                  { value: 3, label: "3 días" },
                  { value: 7, label: "1 semana" },
                  { value: 14, label: "2 semanas" },
                ]}
              />
            </div>
          </div>
          {mine.length > 0 && (
            <div>
              <label className="label" htmlFor="t-class">
                Quién puede participar
              </label>
              <select id="t-class" className="field max-w-md" value={classroom} onChange={(e) => setClassroom(e.target.value)}>
                <option value="" className="bg-[#16161a]">
                  Cualquier persona
                </option>
                {mine.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#16161a]">
                    Solo el aula {c.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <h3 className="mb-3 text-sm font-semibold">Industria</h3>
            <IndustryPicker value={industry} onChange={setIndustry} />
          </div>
          <div className="panel rounded-3xl p-5">
            <SetupForm value={setup} onChange={setSetup} showSize={false} />
          </div>
          <div className="flex justify-end gap-2">
            <button className="btn btn-ghost" onClick={() => setCreate(false)} disabled={busy}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={submit} disabled={!industry || busy}>
              {busy ? <Spinner /> : null}
              {industry ? "Crear torneo" : "Elige una industria"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
