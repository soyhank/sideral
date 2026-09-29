"use client";

import { ArrowLeft, Check, Copy, Crown, Download, Flame, LogOut, Share2, Trash2, Trophy, UserMinus, Users } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { useApp } from "@/components/app/AppProvider";
import { Avatar } from "@/components/ui/Avatar";
import { Empty, Spinner, Stars } from "@/components/ui/display";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { act, ApiError } from "@/lib/api";
import { cx, int, timeAgo } from "@/lib/format";
import { titleFor } from "@/lib/gamification";
import { useNow, type Classroom } from "@/lib/hooks";
import { MISSIONS } from "@/lib/missions";
import { supabase } from "@/lib/supabase/client";

interface Student {
  id: string;
  username: string;
  display_name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  weekly_xp: number;
  games_played: number;
  games_won: number;
  best_score: number;
  last_active: string | null;
  stats: Record<string, unknown>;
  joined_at?: string;
  missions?: { mission_id: string; stars: number; best_score: number }[];
  badges?: number;
}

export default function ClassroomPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { userId } = useApp();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [confirm, setConfirm] = useState<null | { kind: "delete" | "leave" | "remove"; student?: Student }>(null);
  const [detail, setDetail] = useState<Student | null>(null);
  const [busy, setBusy] = useState(false);
  const now = useNow();

  const { data, error, mutate } = useSWR(userId ? ["classroom", id, userId] : null, async () => {
    const sb = supabase();
    const { data: cls } = await sb.from("classrooms").select("*").eq("id", id).maybeSingle();
    if (!cls) throw new Error("Esa aula no existe o no perteneces a ella.");
    const classroom = cls as Classroom;
    if (classroom.teacher_id === userId) {
      const report = await act<{ students: Student[] }>("classroom.report", { classroomId: id });
      return { classroom, teacher: true, students: report.students };
    }
    const { data: members } = await sb
      .from("classroom_members")
      .select("user_id, profiles(id, username, display_name, avatar, xp, level, streak, weekly_xp, games_played, games_won, best_score, last_active, stats)")
      .eq("classroom_id", id);
    return { classroom, teacher: false, students: ((members as unknown as { profiles: Student | null }[]) ?? []).map((m) => m.profiles).filter((p): p is Student => !!p) };
  });

  if (error)
    return (
      <div className="mx-auto max-w-xl py-12">
        <Empty title="No pudimos abrir el aula" text={error instanceof Error ? error.message : ""} action={<Link href="/aulas" className="btn btn-primary">Volver a aulas</Link>} />
      </div>
    );
  if (!data)
    return (
      <div className="grid place-items-center py-32 text-ink-3">
        <Spinner size={26} />
      </div>
    );

  const { classroom, teacher } = data;
  const students = [...data.students].sort((a, b) => b.xp - a.xp);
  const starsOf = (s: Student) => (s.missions ?? []).reduce((t, m) => t + m.stars, 0);
  const passedOf = (s: Student) => (s.missions ?? []).filter((m) => m.stars > 0).length;
  const active = students.filter((s) => s.last_active && now - new Date(s.last_active).getTime() < 7 * 86400000).length;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(classroom.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  const share = async () => {
    const text = `Entra a mi aula de Sideral con el código ${classroom.code}`;
    const url = `${window.location.origin}/registro`;
    try {
      if (navigator.share) await navigator.share({ title: "Sideral", text, url });
      else {
        await navigator.clipboard.writeText(`${text}. Crea tu cuenta en ${url} y luego ve a Aulas.`);
        toast("Invitación copiada");
      }
    } catch {}
  };

  const exportCsv = () => {
    const head = ["Nombre", "Usuario", "Nivel", "Experiencia", "Experiencia de la semana", "Racha", "Misiones superadas", "Estrellas", "Partidas", "Victorias", "Mejor puntaje", "Trimestres cerrados", "Decisiones óptimas", "Insignias", "Última actividad"];
    const rows = students.map((s) => [
      s.display_name,
      s.username,
      s.level,
      s.xp,
      s.weekly_xp,
      s.streak,
      passedOf(s),
      starsOf(s),
      s.games_played,
      s.games_won,
      s.best_score,
      Number(s.stats?.rounds ?? 0),
      Number(s.stats?.optimal ?? 0),
      s.badges ?? 0,
      s.last_active ?? "",
    ]);
    const csv = [head, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `aula-${classroom.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const act2 = async () => {
    if (!confirm || busy) return;
    setBusy(true);
    try {
      if (confirm.kind === "delete") {
        await act("classroom.delete", { classroomId: id });
        router.replace("/aulas");
        return;
      }
      if (confirm.kind === "leave") {
        await act("classroom.leave", { classroomId: id });
        router.replace("/aulas");
        return;
      }
      await act("classroom.leave", { classroomId: id, userId: confirm.student!.id });
      toast("Estudiante retirado del aula");
      await mutate();
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo completar la acción.", "error");
    }
    setBusy(false);
    setConfirm(null);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/aulas" className="btn btn-quiet btn-sm mb-4 !px-2">
        <ArrowLeft size={15} />
        Aulas
      </Link>

      <section className="glass rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="min-w-0">
            <div className="eyebrow">{teacher ? "Tu aula" : "Aula"}</div>
            <h1 className="display mt-1.5 text-4xl sm:text-5xl">{classroom.name}</h1>
            {classroom.institution && <p className="mt-1.5 text-sm text-ink-3">{classroom.institution}</p>}
          </div>
          {teacher && (
            <div className="flex items-center gap-2">
              <button onClick={copy} className="well flex items-center gap-3 rounded-2xl px-4 py-2.5" aria-label="Copiar código">
                <span>
                  <span className="block text-[10.5px] text-ink-3">Código</span>
                  <span className="num block text-xl font-semibold tracking-[0.2em]">{classroom.code}</span>
                </span>
                {copied ? <Check size={16} className="text-good" /> : <Copy size={16} className="text-ink-3" />}
              </button>
              <button className="btn btn-ghost btn-icon" onClick={share} aria-label="Compartir invitación">
                <Share2 size={17} />
              </button>
            </div>
          )}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            { l: "Estudiantes", v: students.length },
            { l: "Activos esta semana", v: active },
            { l: "Experiencia de la semana", v: int(students.reduce((t, s) => t + s.weekly_xp, 0)) },
            { l: "Partidas jugadas", v: int(students.reduce((t, s) => t + s.games_played, 0)) },
          ].map((s) => (
            <div key={s.l} className="well rounded-2xl p-3.5">
              <div className="num text-xl font-semibold">{s.v}</div>
              <div className="text-[11px] text-ink-3">{s.l}</div>
            </div>
          ))}
        </div>
        {teacher && (
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/salas?crear=1" className="btn btn-primary btn-sm">
              <Users size={15} />
              Crear sala para la clase
            </Link>
            <Link href="/torneos" className="btn btn-ghost btn-sm">
              <Trophy size={15} />
              Crear torneo
            </Link>
            <button className="btn btn-ghost btn-sm" onClick={exportCsv} disabled={!students.length}>
              <Download size={15} />
              Descargar reporte
            </button>
          </div>
        )}
      </section>

      <section className="panel mt-6 overflow-hidden rounded-3xl">
        <div className="border-b border-line px-5 py-4">
          <h2 className="text-[15px] font-semibold tracking-tight">{teacher ? "Avance de los estudiantes" : "Tabla de la clase"}</h2>
          <p className="mt-0.5 text-xs text-ink-3">{teacher ? "Toca a un estudiante para ver su detalle por misión." : "Ordenada por experiencia acumulada."}</p>
        </div>
        {students.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-ink-3">{teacher ? "Todavía no hay estudiantes. Comparte el código del aula." : "Aún no hay compañeros en esta aula."}</p>
        ) : teacher ? (
          <div className="scroll-thin overflow-x-auto">
            <table className="table-fin min-w-[760px]">
              <thead>
                <tr>
                  <th>Estudiante</th>
                  <th>Nivel</th>
                  <th>XP semana</th>
                  <th>Racha</th>
                  <th>Misiones</th>
                  <th>Estrellas</th>
                  <th>Partidas</th>
                  <th>Mejor puntaje</th>
                  <th>Actividad</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="cursor-pointer transition hover:bg-white/5" onClick={() => setDetail(s)}>
                    <td>
                      <span className="flex items-center gap-2.5">
                        <Avatar id={s.avatar} size={30} />
                        <span className="min-w-0">
                          <span className="block truncate font-medium">{s.display_name}</span>
                          <span className="num block truncate text-[11px] text-ink-3">@{s.username}</span>
                        </span>
                      </span>
                    </td>
                    <td>{s.level}</td>
                    <td>{int(s.weekly_xp)}</td>
                    <td>{s.streak}</td>
                    <td>
                      {passedOf(s)} / {MISSIONS.length}
                    </td>
                    <td>{starsOf(s)}</td>
                    <td>{s.games_played}</td>
                    <td>{s.best_score || "—"}</td>
                    <td className="text-ink-3">{s.last_active ? timeAgo(`${s.last_active}T12:00:00-05:00`) : "sin actividad"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <ol className="divide-y divide-white/6">
            {students.map((s, i) => (
              <li key={s.id} className={cx("flex items-center gap-3.5 px-5 py-3", s.id === userId && "bg-white/8")}>
                <span className={cx("num grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold", i === 0 ? "bg-white text-black" : i < 3 ? "bg-white/16" : "text-ink-3")}>
                  {i === 0 ? <Crown size={15} /> : i + 1}
                </span>
                <Avatar id={s.avatar} size={36} ring={s.id === userId} />
                <div className="min-w-0 flex-1">
                  <div className={cx("truncate text-sm", s.id === userId ? "font-semibold" : "font-medium")}>
                    {s.display_name}
                    {s.id === userId && " (tú)"}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ink-3">
                    Nivel {s.level} · {titleFor(s.level)}
                    {s.streak >= 3 && (
                      <span className="inline-flex items-center gap-0.5">
                        <Flame size={11} className="text-amber" />
                        {s.streak}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="num text-base font-semibold">{int(s.xp)}</div>
                  <div className="text-[10.5px] text-ink-3">XP</div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>

      <div className="mt-6">
        {teacher ? (
          <button className="btn btn-danger btn-sm" onClick={() => setConfirm({ kind: "delete" })}>
            <Trash2 size={15} />
            Eliminar aula
          </button>
        ) : (
          <button className="btn btn-ghost btn-sm" onClick={() => setConfirm({ kind: "leave" })}>
            <LogOut size={15} />
            Salir del aula
          </button>
        )}
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.display_name ?? ""} size="md">
        {detail && (
          <div>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { l: "Experiencia", v: int(detail.xp) },
                { l: "Trimestres cerrados", v: Number(detail.stats?.rounds ?? 0) },
                { l: "Decisiones óptimas", v: Number(detail.stats?.optimal ?? 0) },
                { l: "Retos del día", v: Number(detail.stats?.dailies ?? 0) },
                { l: "Insignias", v: detail.badges ?? 0 },
                { l: "Victorias", v: `${detail.games_won} de ${detail.games_played}` },
              ].map((s) => (
                <div key={s.l} className="well rounded-2xl p-3">
                  <div className="num text-lg font-semibold">{s.v}</div>
                  <div className="text-[11px] text-ink-3">{s.l}</div>
                </div>
              ))}
            </div>
            <h3 className="mt-5 mb-2 text-sm font-semibold">Carrera</h3>
            <ul className="space-y-1.5">
              {MISSIONS.map((m) => {
                const r = detail.missions?.find((x) => x.mission_id === m.id);
                return (
                  <li key={m.id} className={cx("flex items-center gap-3 rounded-xl px-3 py-2 text-sm", r?.stars ? "bg-white/6" : "opacity-45")}>
                    <span className="num w-5 text-xs text-ink-3">{m.order}</span>
                    <span className="min-w-0 flex-1 truncate">{m.title}</span>
                    <span className="num text-xs text-ink-3">{r?.best_score ? `${r.best_score} pts` : ""}</span>
                    <Stars value={r?.stars ?? 0} size={13} />
                  </li>
                );
              })}
            </ul>
            <button
              className="btn btn-ghost btn-sm mt-5"
              onClick={() => {
                const s = detail;
                setDetail(null);
                setConfirm({ kind: "remove", student: s });
              }}
            >
              <UserMinus size={15} />
              Retirar del aula
            </button>
          </div>
        )}
      </Modal>

      <Modal
        open={!!confirm}
        onClose={() => !busy && setConfirm(null)}
        title={confirm?.kind === "delete" ? "Eliminar aula" : confirm?.kind === "leave" ? "Salir del aula" : "Retirar estudiante"}
        size="sm"
      >
        <p className="text-sm leading-relaxed text-ink-2">
          {confirm?.kind === "delete"
            ? "Se eliminará el aula y sus torneos. Los estudiantes conservan su cuenta, su experiencia y sus partidas. Esta acción no se puede deshacer."
            : confirm?.kind === "leave"
              ? "Dejarás de aparecer en la tabla de esta clase. Puedes volver a entrar con el código."
              : `${confirm?.student?.display_name} dejará de aparecer en esta aula. Conserva su cuenta y su avance.`}
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button className="btn btn-ghost" onClick={() => setConfirm(null)} disabled={busy}>
            Cancelar
          </button>
          <button className={cx("btn", confirm?.kind === "leave" ? "btn-primary" : "btn-danger")} onClick={act2} disabled={busy}>
            {busy ? <Spinner /> : null}
            {confirm?.kind === "delete" ? "Eliminar" : confirm?.kind === "leave" ? "Salir" : "Retirar"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
