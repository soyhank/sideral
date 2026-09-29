"use client";

import { ArrowRight, ChevronRight, Plus, Users } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useApp } from "@/components/app/AppProvider";
import { DEFAULT_SETUP, IndustryPicker, SetupForm, type SetupValue } from "@/components/app/GameSetup";
import { Segmented, Toggle } from "@/components/ui/controls";
import { Empty, PageHeader, Spinner } from "@/components/ui/display";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { getIndustry } from "@/engine/industries";
import type { IndustryId } from "@/engine/types";
import { act, ApiError } from "@/lib/api";
import { cx, timeAgo } from "@/lib/format";
import { useClassrooms, useHostedRooms, useMyGames } from "@/lib/hooks";

const STATUS: Record<string, { label: string; chip: string }> = {
  lobby: { label: "Esperando", chip: "chip-info" },
  activa: { label: "En juego", chip: "chip-good" },
  finalizada: { label: "Finalizada", chip: "" },
  cancelada: { label: "Cerrada", chip: "" },
};

const TIMERS = [
  { value: 0, label: "Sin plazo" },
  { value: 5, label: "5 min" },
  { value: 10, label: "10 min" },
  { value: 15, label: "15 min" },
  { value: 1440, label: "1 día" },
  { value: 10080, label: "1 semana" },
];

function Rooms() {
  const router = useRouter();
  const params = useSearchParams();
  const { userId, profile } = useApp();
  const { toast } = useToast();
  const { data: games } = useMyGames(userId, 30);
  const { data: hosted, mutate: refetchHosted } = useHostedRooms(userId);
  const { data: classrooms } = useClassrooms(userId);
  const [code, setCode] = useState("");
  const [joining, setJoining] = useState(false);
  const [create, setCreate] = useState(false);
  const [industry, setIndustry] = useState<IndustryId | null>(null);
  const [setup, setSetup] = useState<SetupValue>({ ...DEFAULT_SETUP, rounds: 6 });
  const [name, setName] = useState("");
  const [teamMode, setTeamMode] = useState<"individual" | "equipos">("individual");
  const [teamSize, setTeamSize] = useState(4);
  const [timer, setTimer] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hostPlays, setHostPlays] = useState(profile?.role === "estudiante");
  const [classroom, setClassroom] = useState<string>("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setHostPlays(profile?.role === "estudiante");
  }, [profile?.role]);

  const join = async (value: string) => {
    const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (clean.length < 4 || joining) return;
    setJoining(true);
    try {
      const res = await act<{ code: string }>("room.peek", { code: clean });
      router.push(`/sala/${res.code}`);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo entrar a la sala.", "error");
      setJoining(false);
    }
  };

  useEffect(() => {
    const c = params.get("codigo");
    if (c && userId) {
      setCode(c.toUpperCase());
      join(c);
    }
    if (params.get("crear")) setCreate(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, userId]);

  const submit = async () => {
    if (!industry || busy) return;
    setBusy(true);
    try {
      const res = await act<{ code: string }>("room.create", {
        name: name.trim() || undefined,
        industry,
        difficulty: setup.difficulty,
        rounds: setup.rounds,
        modules: setup.modules,
        teamMode,
        teamSize,
        timerMinutes: timer,
        autoAdvance: auto,
        hostPlays,
        classroomId: classroom || null,
      });
      refetchHosted();
      router.push(`/sala/${res.code}`);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo crear la sala.", "error");
      setBusy(false);
    }
  };

  const mine = (games ?? []).filter((g) => g.mode === "sala");
  const hostedOnly = (hosted ?? []).filter((h) => !mine.some((m) => m.id === h.id || m.parent_id === h.id));
  const myClassrooms = (classrooms ?? []).filter((c) => c.mine);

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Competencia"
        title="Salas"
        text="Compite contra tus compañeros en el mismo mercado. Todos deciden el mismo trimestre y el resultado de cada uno depende de lo que hagan los demás."
        action={
          <button className="btn btn-primary" onClick={() => setCreate(true)}>
            <Plus size={17} />
            Crear sala
          </button>
        }
      />

      <section className="glass rounded-3xl p-6">
        <h2 className="text-[15px] font-semibold tracking-tight">Tengo un código</h2>
        <p className="mt-1 text-sm text-ink-3">Seis caracteres que te comparte quien creó la sala.</p>
        <form
          className="mt-4 flex max-w-md gap-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            join(code);
          }}
        >
          <input
            className="field num flex-1 text-center !text-xl font-semibold tracking-[0.35em] uppercase"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))}
            placeholder="ABC123"
            aria-label="Código de la sala"
            autoComplete="off"
          />
          <button className="btn btn-primary !h-12" disabled={code.length < 4 || joining}>
            {joining ? <Spinner /> : "Entrar"}
            {!joining && <ArrowRight size={17} />}
          </button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-sm font-semibold text-ink-2">Mis salas</h2>
        {!games ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="skeleton h-24 !rounded-3xl" />
            <div className="skeleton h-24 !rounded-3xl" />
          </div>
        ) : mine.length + hostedOnly.length === 0 ? (
          <Empty icon={<Users size={24} />} title="Aún no participas en ninguna sala" text="Crea una para retar a tus compañeros o ingresa el código que te dieron." />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {hostedOnly.map((h) => {
              const ind = getIndustry(h.industry);
              const st = STATUS[h.status];
              return (
                <Link key={h.id} href={`/sala/${h.code}`} className="panel panel-hover flex items-center gap-3.5 rounded-3xl p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/8 ring-1 ring-white/10">
                    <Icon name={ind.icon} size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[15px] font-semibold">{h.name}</span>
                      <span className={cx("chip shrink-0", st.chip)}>{st.label}</span>
                    </div>
                    <div className="num truncate text-xs text-ink-3">
                      Diriges esta sala · código {h.code} · {timeAgo(h.updated_at)}
                    </div>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-ink-3" />
                </Link>
              );
            })}
            {mine.map((g) => {
              const ind = getIndustry(g.industry);
              const st = STATUS[g.status];
              return (
                <Link key={g.id} href={g.status === "lobby" ? `/sala/${g.code}` : `/partida/${g.id}`} className="panel panel-hover flex items-center gap-3.5 rounded-3xl p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/8 ring-1 ring-white/10">
                    <Icon name={ind.icon} size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-[15px] font-semibold">{g.name}</span>
                      <span className={cx("chip shrink-0", st.chip)}>{st.label}</span>
                    </div>
                    <div className="num truncate text-xs text-ink-3">
                      {g.company} · {g.status === "lobby" ? "por empezar" : `trimestre ${Math.min(g.round, g.total_rounds)} de ${g.total_rounds}`}
                      {g.rank ? ` · puesto ${g.rank}` : ""}
                    </div>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-ink-3" />
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <Modal open={create} onClose={() => !busy && setCreate(false)} title="Crear sala" size="xl">
        <div className="space-y-8">
          <div>
            <label className="label" htmlFor="room-name">
              Nombre de la sala
            </label>
            <input id="room-name" className="field max-w-md" value={name} maxLength={48} onChange={(e) => setName(e.target.value)} placeholder="Por ejemplo: Gestión III, sección B" />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Industria</h3>
            <IndustryPicker value={industry} onChange={setIndustry} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Reglas de la competencia</h3>
            <div className="panel space-y-6 rounded-3xl p-5">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <div className="mb-2 text-sm font-medium">Participación</div>
                  <Segmented
                    value={teamMode}
                    onChange={setTeamMode}
                    options={[
                      { value: "individual", label: "Individual" },
                      { value: "equipos", label: "En equipos" },
                    ]}
                  />
                  <p className="mt-2 text-xs leading-relaxed text-ink-3">
                    {teamMode === "individual" ? "Cada persona dirige su propia empresa." : "Cada equipo comparte una empresa y decide en conjunto, con cambios en vivo."}
                  </p>
                </div>
                {teamMode === "equipos" && (
                  <div>
                    <div className="mb-2 text-sm font-medium">Integrantes por equipo</div>
                    <Segmented value={teamSize} onChange={setTeamSize} options={[2, 3, 4, 5, 6].map((v) => ({ value: v, label: String(v) }))} />
                  </div>
                )}
              </div>
              <div>
                <div className="mb-2 text-sm font-medium">Plazo por trimestre</div>
                <Segmented value={timer} onChange={setTimer} options={TIMERS} />
                <p className="mt-2 text-xs leading-relaxed text-ink-3">
                  {timer === 0
                    ? "Tú decides cuándo cerrar cada trimestre. Ideal para explicar en clase entre ronda y ronda."
                    : timer <= 20
                      ? "Pensado para una sesión en vivo. Al vencer el plazo, el trimestre se cierra solo con lo que cada uno tenga guardado."
                      : "Pensado para jugar a distancia durante varios días o semanas."}
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Toggle checked={auto} onChange={setAuto} label="Avanzar cuando todos envíen" hint="El trimestre se cierra apenas la última empresa envía sus decisiones" />
                <Toggle checked={hostPlays} onChange={setHostPlays} label="Yo también compito" hint="Desactívalo si solo vas a dirigir y observar, como docente" />
              </div>
              {myClassrooms.length > 0 && (
                <div>
                  <label className="label" htmlFor="room-class">
                    Vincular con un aula <span className="text-ink-4">(opcional)</span>
                  </label>
                  <select id="room-class" className="field max-w-md" value={classroom} onChange={(e) => setClassroom(e.target.value)}>
                    <option value="" className="bg-[#16161a]">
                      Sin aula
                    </option>
                    {myClassrooms.map((c) => (
                      <option key={c.id} value={c.id} className="bg-[#16161a]">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Dificultad y áreas</h3>
            <div className="panel rounded-3xl p-5">
              <SetupForm value={setup} onChange={setSetup} showSize={false} minRounds={4} />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-3">
              Si se inscriben más de 6 empresas, la sala se divide sola en mercados paralelos de tamaño parejo. Todos enfrentan las mismas noticias y situaciones, y hay una tabla general.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <button className="btn btn-ghost" onClick={() => setCreate(false)} disabled={busy}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={submit} disabled={!industry || busy}>
              {busy ? <Spinner /> : null}
              {industry ? "Crear sala" : "Elige una industria"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function RoomsPage() {
  return (
    <Suspense fallback={null}>
      <Rooms />
    </Suspense>
  );
}
