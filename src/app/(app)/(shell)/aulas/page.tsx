"use client";

import { ArrowRight, ChevronRight, GraduationCap, Plus, Presentation } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/components/app/AppProvider";
import { Empty, PageHeader, Spinner } from "@/components/ui/display";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { act, ApiError } from "@/lib/api";
import { plural } from "@/lib/format";
import { useClassrooms } from "@/lib/hooks";

export default function ClassroomsPage() {
  const router = useRouter();
  const { userId, profile } = useApp();
  const { toast } = useToast();
  const { data, mutate } = useClassrooms(userId);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [create, setCreate] = useState(false);
  const [name, setName] = useState("");
  const teacher = profile && profile.role !== "estudiante";

  const join = async () => {
    if (code.length < 4 || busy) return;
    setBusy(true);
    try {
      const res = await act<{ id: string; name: string }>("classroom.join", { code });
      toast(`Entraste al aula ${res.name}`);
      await mutate();
      router.push(`/aulas/${res.id}`);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo entrar al aula.", "error");
      setBusy(false);
    }
  };

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await act<{ id: string }>("classroom.create", { name: name.trim() });
      await mutate();
      router.push(`/aulas/${res.id}`);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo crear el aula.", "error");
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow={teacher ? "Panel docente" : "Tu clase"}
        title="Aulas"
        text={
          teacher
            ? "Agrupa a tus estudiantes, sigue su avance en la carrera y lanza salas o torneos solo para ellos."
            : "Entra al aula de tu docente para aparecer en la tabla de tu clase y recibir sus torneos."
        }
        action={
          teacher ? (
            <button className="btn btn-primary" onClick={() => setCreate(true)}>
              <Plus size={17} />
              Crear aula
            </button>
          ) : undefined
        }
      />

      <section className="glass rounded-3xl p-6">
        <h2 className="text-[15px] font-semibold tracking-tight">Entrar a un aula</h2>
        <p className="mt-1 text-sm text-ink-3">Usa el código que te compartió tu docente.</p>
        <form
          className="mt-4 flex max-w-md gap-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            join();
          }}
        >
          <input
            className="field num flex-1 text-center !text-xl font-semibold tracking-[0.35em] uppercase"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6))}
            placeholder="ABC123"
            aria-label="Código del aula"
            autoComplete="off"
          />
          <button className="btn btn-primary !h-12" disabled={code.length < 4 || busy}>
            {busy ? <Spinner /> : "Entrar"}
            {!busy && <ArrowRight size={17} />}
          </button>
        </form>
      </section>

      <h2 className="mt-8 mb-3 text-sm font-semibold text-ink-2">Mis aulas</h2>
      {!data ? (
        <div className="skeleton h-24 !rounded-3xl" />
      ) : data.length === 0 ? (
        <Empty
          icon={teacher ? <Presentation size={24} /> : <GraduationCap size={24} />}
          title={teacher ? "Aún no tienes aulas" : "Aún no estás en ningún aula"}
          text={teacher ? "Crea una y comparte el código con tus estudiantes." : "Pídele el código a tu docente. Si enseñas, activa el modo docente en tu perfil."}
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {data.map((c) => (
            <Link key={c.id} href={`/aulas/${c.id}`} className="panel panel-hover flex items-center gap-3.5 rounded-3xl p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/8 ring-1 ring-white/10">{c.mine ? <Presentation size={19} /> : <GraduationCap size={19} />}</span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[15px] font-semibold">{c.name}</div>
                <div className="num truncate text-xs text-ink-3">
                  {c.mine ? `Código ${c.code} · ` : ""}
                  {plural(c.students, "estudiante", "estudiantes")}
                </div>
              </div>
              <ChevronRight size={18} className="shrink-0 text-ink-3" />
            </Link>
          ))}
        </div>
      )}

      <Modal open={create} onClose={() => !busy && setCreate(false)} title="Crear aula" size="sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label className="label" htmlFor="c-name">
            Nombre del aula
          </label>
          <input id="c-name" className="field" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} placeholder="Por ejemplo: Administración III, turno noche" autoFocus />
          <button className="btn btn-primary mt-5 w-full" disabled={name.trim().length < 2 || busy}>
            {busy ? <Spinner /> : null}
            Crear aula
          </button>
        </form>
      </Modal>
    </div>
  );
}
