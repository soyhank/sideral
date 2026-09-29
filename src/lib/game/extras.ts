import "server-only";

import { DILEMMAS, FODA, TRIVIA, TRIVIA_BY_ID } from "@/content";
import type { FodaKind, TriviaTopic } from "@/content/types";
import { TRIVIA_TOPICS } from "@/content/types";
import { INDUSTRIES } from "@/engine/industries";
import { publicDilemma } from "@/engine/round";
import { hashSeed, makeRng, shuffle } from "@/engine/rng";
import { allModules } from "@/engine/setup";
import { AVATARS, AVATAR_LEVEL, type AvatarId } from "@/lib/gamification";
import { adminClient } from "@/lib/supabase/server";
import { dailyCalc } from "./calc";
import { notify, reward } from "./rewards";
import { cleanModules, cleanName, newCode, newSeed } from "./service";
import { ActionError } from "./types";

const db = () => adminClient();

export function limaDay(date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Lima", year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function isoWeek(day: string): { key: string; week: number; year: number } {
  const d = new Date(`${day}T12:00:00Z`);
  const target = new Date(d);
  target.setUTCDate(d.getUTCDate() + 3 - ((d.getUTCDay() + 6) % 7));
  const year = target.getUTCFullYear();
  const first = new Date(Date.UTC(year, 0, 4));
  const week = 1 + Math.round(((target.getTime() - first.getTime()) / 86400000 - 3 + ((first.getUTCDay() + 6) % 7)) / 7);
  return { key: `${year}-S${String(week).padStart(2, "0")}`, week, year };
}

// ---------------------------------------------------------------------------
// Retos del día
// ---------------------------------------------------------------------------

export type DailyKind = "trivia" | "dilema" | "foda" | "calculo";

function dailySet(day: string) {
  const rng = makeRng(hashSeed("daily", day));
  const trivia = shuffle(TRIVIA, rng).slice(0, 5);
  const general = DILEMMAS.filter((d) => d.industries === "all");
  const dilemma = general[Math.floor(rng.next() * general.length)];
  const foda = FODA[Math.floor(rng.next() * FODA.length)];
  const fodaOrder = shuffle(foda.items.map((_, i) => i), rng);
  const calc = dailyCalc(day, 3);
  return { trivia, dilemma, foda, fodaOrder, calc };
}

export async function getDaily(userId: string) {
  const day = limaDay();
  const set = dailySet(day);
  const { data: done } = await db().from("daily").select("kind, score, data").eq("user_id", userId).eq("day", day);
  const { count: total } = await db().from("daily").select("day", { count: "exact", head: true }).eq("user_id", userId);
  const byKind = new Map((done ?? []).map((d) => [d.kind as DailyKind, d]));
  return {
    day,
    completed: total ?? 0,
    trivia: {
      done: byKind.get("trivia") ?? null,
      questions: set.trivia.map((t) => ({ id: t.id, topic: t.topic, level: t.level, q: t.q, options: t.options })),
    },
    dilema: { done: byKind.get("dilema") ?? null, dilemma: publicDilemma(set.dilemma) },
    foda: {
      done: byKind.get("foda") ?? null,
      case: {
        id: set.foda.id,
        company: set.foda.company,
        industry: set.foda.industry,
        context: set.foda.context,
        items: set.fodaOrder.map((i) => ({ key: i, text: set.foda.items[i].text })),
      },
    },
    calculo: {
      done: byKind.get("calculo") ?? null,
      problems: set.calc.map((p) => ({ id: p.id, topic: p.topic, q: p.q, options: p.options })),
    },
  };
}

export async function submitDaily(userId: string, kind: DailyKind, answers: unknown) {
  const day = limaDay();
  const set = dailySet(day);
  const { data: prev } = await db().from("daily").select("kind").eq("user_id", userId).eq("day", day).eq("kind", kind).maybeSingle();
  if (prev) throw new ActionError("Ya completaste este reto hoy. Mañana hay uno nuevo.");

  let score = 0;
  let xp = 0;
  let feedback: unknown = null;
  const keys: string[] = [];
  const counters: Record<string, number> = { dailies: 1 };
  const LABEL: Record<DailyKind, string> = { trivia: "Trivia del día", dilema: "Dilema del día", foda: "FODA del día", calculo: "Cálculo del día" };

  if (kind === "trivia") {
    const a = Array.isArray(answers) ? answers : [];
    const items = set.trivia.map((t, i) => ({
      id: t.id,
      chosen: Number.isInteger(a[i]) ? (a[i] as number) : -1,
      answer: t.answer,
      correct: a[i] === t.answer,
      explain: t.explain,
    }));
    score = items.filter((i) => i.correct).length;
    xp = score * 10 + (score === 5 ? 20 : 0);
    if (score === 5) keys.push("trivia-perfecta");
    feedback = { items, total: 5 };
  } else if (kind === "dilema") {
    const opt = set.dilemma.options.find((o) => o.id === answers) ?? null;
    if (!opt) throw new ActionError("Elige una opción.");
    const table = { optima: 30, buena: 20, riesgosa: 10, mala: 5 } as const;
    xp = table[opt.verdict];
    score = xp;
    const best = [...set.dilemma.options].sort((x, y) => table[y.verdict] - table[x.verdict])[0];
    feedback = {
      choice: opt.id,
      verdict: opt.verdict,
      outcome: opt.outcome,
      lesson: set.dilemma.lesson,
      concept: set.dilemma.concept,
      best: { id: best.id, label: best.label },
      options: set.dilemma.options.map((o) => ({ id: o.id, verdict: o.verdict })),
    };
    if (opt.verdict === "optima") counters.optimal = 1;
  } else if (kind === "foda") {
    const a = (answers && typeof answers === "object" ? answers : {}) as Record<string, FodaKind>;
    const items = set.foda.items.map((item, i) => ({
      key: i,
      chosen: a[String(i)] ?? null,
      kind: item.kind,
      correct: a[String(i)] === item.kind,
      why: item.why,
    }));
    score = items.filter((i) => i.correct).length;
    xp = score * 5 + (score === 8 ? 15 : 0);
    feedback = { items, total: 8 };
  } else if (kind === "calculo") {
    const a = Array.isArray(answers) ? answers : [];
    const items = set.calc.map((p, i) => ({ id: p.id, chosen: a[i] ?? -1, answer: p.answer, correct: a[i] === p.answer, explain: p.explain }));
    score = items.filter((i) => i.correct).length;
    xp = score * 12 + (score === 3 ? 14 : 0);
    feedback = { items, total: 3 };
  } else throw new ActionError("Reto desconocido.");

  const { error } = await db().from("daily").insert({ user_id: userId, day, kind, score, data: { answers, feedback, xp } });
  if (error) throw new ActionError("Ya completaste este reto hoy.");
  const res = await reward(userId, {
    events: [{ amount: xp, reason: "reto", ref: `daily:${day}:${kind}`, meta: { score }, label: LABEL[kind] }],
    keys,
    counters,
  });
  const achievements = res.achievements;
  return { ok: true, score, xp, feedback, level: res.level, levelUp: res.levelUp, streak: res.streak, achievements };
}

// ---------------------------------------------------------------------------
// Entrenamiento: trivia libre por tema
// ---------------------------------------------------------------------------

export async function trainingSet(topic: string, level: number) {
  const t = TRIVIA_TOPICS.includes(topic as TriviaTopic) ? (topic as TriviaTopic) : null;
  const pool = TRIVIA.filter((q) => (!t || q.topic === t) && (level < 1 || q.level <= level));
  const rng = makeRng(newSeed());
  return shuffle(pool, rng)
    .slice(0, 8)
    .map((q) => ({ id: q.id, topic: q.topic, level: q.level, q: q.q, options: q.options }));
}

export async function trainingCheck(userId: string, answers: { id: string; chosen: number }[]) {
  const list = Array.isArray(answers) ? answers.slice(0, 8) : [];
  const items = list
    .map((a) => {
      const q = TRIVIA_BY_ID.get(String(a.id));
      return q ? { id: q.id, chosen: a.chosen, answer: q.answer, correct: a.chosen === q.answer, explain: q.explain } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
  const score = items.filter((i) => i.correct).length;
  // El entrenamiento suma poco y solo cuatro veces al día, para que no reemplace a jugar.
  const day = limaDay();
  const { count } = await db()
    .from("xp_events")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .like("ref", `train:${day}:%`);
  const slot = (count ?? 0) + 1;
  let xp = 0;
  if (slot <= 4 && score > 0) {
    xp = score * 3;
    await reward(userId, { events: [{ amount: xp, reason: "entrenamiento", ref: `train:${day}:${slot}`, meta: { score }, label: "Entrenamiento" }] });
  }
  return { ok: true, score, total: items.length, xp, items, left: Math.max(0, 4 - slot) };
}

// ---------------------------------------------------------------------------
// Torneos
// ---------------------------------------------------------------------------

/** Garantiza que exista el torneo oficial de la semana. Todos juegan el mismo escenario. */
export async function ensureWeeklyTournament() {
  const day = limaDay();
  const { key, week } = isoWeek(day);
  const name = `Torneo semanal ${key}`;
  const { data: found } = await db().from("tournaments").select("id").eq("official", true).eq("name", name).maybeSingle();
  if (found) return found.id as string;
  const rng = makeRng(hashSeed("weekly", key));
  const ind = INDUSTRIES[(week * 7) % INDUSTRIES.length];
  const d = new Date(`${day}T12:00:00Z`);
  const monday = new Date(d);
  monday.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  const start = new Date(`${monday.toISOString().slice(0, 10)}T05:00:00Z`);
  const end = new Date(start.getTime() + 7 * 86400000 - 1000);
  // Si dos personas llegan a la vez, el índice único deja pasar solo una inserción.
  const { data } = await db()
    .from("tournaments")
    .insert({
      name,
      description: `Todos dirigen la misma empresa de ${ind.short.toLowerCase()}, con los mismos rivales y las mismas noticias. Gana quien logre el mejor puntaje.`,
      industry: ind.id,
      difficulty: 2 + (week % 2),
      rounds: 6,
      seed: rng.int(1, 2_000_000_000),
      config: { modules: allModules(), size: 5 },
      official: true,
      starts_at: start.toISOString(),
      ends_at: end.toISOString(),
    })
    .select("id");
  if (data?.length) return data[0].id as string;
  const { data: again } = await db().from("tournaments").select("id").eq("official", true).eq("name", name).maybeSingle();
  return (again?.id as string) ?? null;
}

export async function createTournament(
  userId: string,
  input: { name?: string; industry?: string; difficulty?: number; rounds?: number; days?: number; classroomId?: string | null; modules?: string[] },
) {
  const { data: profile } = await db().from("profiles").select("role").eq("id", userId).single();
  if (!profile || profile.role === "estudiante") throw new ActionError("Solo los docentes pueden crear torneos.", 403);
  const ind = INDUSTRIES.find((i) => i.id === input.industry);
  if (!ind) throw new ActionError("Elige una industria.");
  let classroomId: string | null = null;
  if (input.classroomId) {
    const { data: cls } = await db().from("classrooms").select("id, teacher_id").eq("id", input.classroomId).maybeSingle();
    if (cls?.teacher_id !== userId) throw new ActionError("Esa aula no es tuya.", 403);
    classroomId = cls.id;
  }
  const days = Math.min(30, Math.max(1, Math.round(Number(input.days) || 7)));
  const { data, error } = await db()
    .from("tournaments")
    .insert({
      name: cleanName(input.name, `Torneo de ${ind.short}`, 60),
      description: `Escenario único de ${ind.name.toLowerCase()} para todos los participantes.`,
      industry: ind.id,
      difficulty: Math.min(4, Math.max(1, Math.round(Number(input.difficulty) || 2))),
      rounds: Math.min(12, Math.max(3, Math.round(Number(input.rounds) || 6))),
      seed: newSeed(),
      config: { modules: cleanModules(input.modules), size: 5 },
      classroom_id: classroomId,
      created_by: userId,
      ends_at: new Date(Date.now() + days * 86400000).toISOString(),
    })
    .select("id")
    .single();
  if (error || !data) throw new ActionError("No se pudo crear el torneo.", 500);
  if (classroomId) {
    const { data: members } = await db().from("classroom_members").select("user_id").eq("classroom_id", classroomId);
    for (const m of members ?? []) await notify(m.user_id, "torneo", "Nuevo torneo en tu aula", cleanName(input.name, "Torneo", 60), `/torneos/${data.id}`);
  }
  return { id: data.id as string };
}

// ---------------------------------------------------------------------------
// Duelos
// ---------------------------------------------------------------------------

export async function createDuel(userId: string, input: { username?: string; opponentId?: string; industry?: string }) {
  let opponent: { id: string; display_name: string } | null = null;
  if (input.opponentId) {
    const { data } = await db().from("profiles").select("id, display_name").eq("id", input.opponentId).maybeSingle();
    opponent = data;
  } else {
    const handle = String(input.username ?? "").trim().toLowerCase().replace(/^@/, "");
    const { data } = await db().from("profiles").select("id, display_name").eq("username", handle).maybeSingle();
    opponent = data;
  }
  if (!opponent) throw new ActionError("No encontramos a esa persona. Revisa su nombre de usuario.", 404);
  if (opponent.id === userId) throw new ActionError("No puedes retarte a ti mismo.");
  const { count } = await db()
    .from("duels")
    .select("id", { count: "exact", head: true })
    .eq("challenger", userId)
    .in("status", ["pendiente", "en_juego"]);
  if ((count ?? 0) >= 5) throw new ActionError("Tienes 5 duelos abiertos. Termina alguno antes de crear otro.");
  const ind = INDUSTRIES.find((i) => i.id === input.industry) ?? INDUSTRIES[newSeed() % INDUSTRIES.length];
  const { data: me } = await db().from("profiles").select("display_name").eq("id", userId).single();
  const { data, error } = await db()
    .from("duels")
    .insert({ challenger: userId, opponent: opponent.id, industry: ind.id, difficulty: 2, rounds: 4, seed: newSeed() })
    .select("id")
    .single();
  if (error || !data) throw new ActionError("No se pudo crear el duelo.", 500);
  await notify(opponent.id, "duelo", `${me?.display_name ?? "Alguien"} te retó a un duelo`, `Cuatro trimestres en ${ind.name.toLowerCase()}. Mismo escenario para ambos.`, "/duelos");
  return { id: data.id as string };
}

export async function answerDuel(userId: string, duelId: string, accept: boolean) {
  const { data: duel } = await db().from("duels").select("*").eq("id", duelId).maybeSingle();
  if (!duel || duel.opponent !== userId) throw new ActionError("Ese duelo no existe.", 404);
  if (duel.status !== "pendiente") throw new ActionError("Ese duelo ya fue respondido.");
  await db().from("duels").update({ status: accept ? "en_juego" : "rechazado" }).eq("id", duelId);
  if (!accept) await notify(duel.challenger, "duelo", "Tu duelo fue rechazado", null, "/duelos");
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Aulas
// ---------------------------------------------------------------------------

export async function createClassroom(userId: string, input: { name?: string; institution?: string }) {
  const { data: profile } = await db().from("profiles").select("role, institution").eq("id", userId).single();
  if (!profile || profile.role === "estudiante") throw new ActionError("Activa el modo docente en tu perfil para crear aulas.", 403);
  for (let attempt = 0; attempt < 5; attempt++) {
    const { data } = await db()
      .from("classrooms")
      .insert({
        code: newCode(6),
        name: cleanName(input.name, "Mi aula", 60),
        teacher_id: userId,
        institution: cleanName(input.institution, profile.institution ?? "", 80) || null,
      })
      .select("id, code")
      .single();
    if (data) return data as { id: string; code: string };
  }
  throw new ActionError("No se pudo crear el aula.", 500);
}

export async function joinClassroom(userId: string, code: string) {
  const clean = String(code ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const { data: cls } = await db().from("classrooms").select("id, name, teacher_id").eq("code", clean).maybeSingle();
  if (!cls) throw new ActionError("No existe un aula con ese código.", 404);
  if (cls.teacher_id === userId) return { id: cls.id, name: cls.name };
  await db().from("classroom_members").upsert({ classroom_id: cls.id, user_id: userId }, { onConflict: "classroom_id,user_id", ignoreDuplicates: true });
  return { id: cls.id as string, name: cls.name as string };
}

export async function leaveClassroom(userId: string, classroomId: string, target?: string) {
  const { data: cls } = await db().from("classrooms").select("id, teacher_id").eq("id", classroomId).maybeSingle();
  if (!cls) throw new ActionError("Esa aula no existe.", 404);
  const who = target && cls.teacher_id === userId ? target : userId;
  await db().from("classroom_members").delete().eq("classroom_id", classroomId).eq("user_id", who);
  return { ok: true };
}

export async function deleteClassroom(userId: string, classroomId: string) {
  const { data: cls } = await db().from("classrooms").select("id, teacher_id").eq("id", classroomId).maybeSingle();
  if (!cls || cls.teacher_id !== userId) throw new ActionError("Esa aula no es tuya.", 403);
  await db().from("classrooms").delete().eq("id", classroomId);
  return { ok: true };
}

/** Avance de cada estudiante del aula, para el panel del docente. */
export async function classroomReport(userId: string, classroomId: string) {
  const { data: cls } = await db().from("classrooms").select("*").eq("id", classroomId).maybeSingle();
  if (!cls || cls.teacher_id !== userId) throw new ActionError("Esa aula no es tuya.", 403);
  const { data: members } = await db()
    .from("classroom_members")
    .select("user_id, joined_at, profiles(id, username, display_name, avatar, xp, level, streak, weekly_xp, games_played, games_won, best_score, last_active, stats)")
    .eq("classroom_id", classroomId);
  const ids = (members ?? []).map((m) => m.user_id);
  const [{ data: missions }, { data: badges }] = await Promise.all([
    ids.length ? db().from("missions").select("user_id, mission_id, stars, best_score").in("user_id", ids) : Promise.resolve({ data: [] }),
    ids.length ? db().from("achievements").select("user_id, key").in("user_id", ids) : Promise.resolve({ data: [] }),
  ]);
  return {
    classroom: cls,
    students: (members ?? []).map((m) => ({
      ...(m.profiles as unknown as Record<string, unknown>),
      joined_at: m.joined_at,
      missions: (missions ?? []).filter((x) => x.user_id === m.user_id),
      badges: (badges ?? []).filter((x) => x.user_id === m.user_id).length,
    })),
  };
}

// ---------------------------------------------------------------------------
// Perfil
// ---------------------------------------------------------------------------

export async function updateProfile(
  userId: string,
  input: { display_name?: string; username?: string; avatar?: string; institution?: string; role?: string; onboarded?: boolean },
) {
  const { data: profile } = await db().from("profiles").select("*").eq("id", userId).single();
  if (!profile) throw new ActionError("No encontramos tu perfil.", 404);
  const patch: Record<string, unknown> = {};
  if (input.display_name !== undefined) patch.display_name = cleanName(input.display_name, profile.display_name, 40);
  if (input.institution !== undefined) patch.institution = String(input.institution).replace(/[<>]/g, "").trim().slice(0, 80) || null;
  if (input.onboarded !== undefined) patch.onboarded = Boolean(input.onboarded);
  if (input.role === "docente" || input.role === "estudiante") {
    if (profile.role !== "admin") patch.role = input.role;
  }
  if (input.avatar !== undefined) {
    const a = input.avatar as AvatarId;
    if (!AVATARS.includes(a)) throw new ActionError("Ese avatar no existe.");
    if (AVATAR_LEVEL[a] > profile.level) throw new ActionError(`Ese avatar se desbloquea en el nivel ${AVATAR_LEVEL[a]}.`);
    patch.avatar = a;
  }
  if (input.username !== undefined) {
    const u = String(input.username).trim().toLowerCase().replace(/^@/, "");
    if (!/^[a-z0-9_.]{3,24}$/.test(u)) throw new ActionError("El usuario debe tener de 3 a 24 caracteres: letras, números, punto o guion bajo.");
    if (u !== profile.username) {
      const { data: taken } = await db().from("profiles").select("id").eq("username", u).maybeSingle();
      if (taken) throw new ActionError("Ese nombre de usuario ya está en uso.");
      patch.username = u;
    }
  }
  if (!Object.keys(patch).length) return { ok: true };
  const { error } = await db().from("profiles").update(patch).eq("id", userId);
  if (error) throw new ActionError("No se pudo guardar tu perfil.", 500);
  return { ok: true };
}

/** Crea el perfil si el registro no lo hizo (por ejemplo, cuentas creadas por otra vía). */
export async function ensureProfile(userId: string, input: { display_name?: string; role?: string; institution?: string }) {
  const { data: found } = await db().from("profiles").select("id").eq("id", userId).maybeSingle();
  if (found) return { ok: true, created: false };
  const { data: user } = await db().auth.admin.getUserById(userId);
  const email = user?.user?.email ?? "gerente";
  const base = email.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "").slice(0, 16) || "gerente";
  const { error } = await db().from("profiles").insert({
    id: userId,
    username: `${base.length < 3 ? "gerente" : base}_${userId.replace(/-/g, "").slice(0, 4)}`,
    display_name: cleanName(input.display_name ?? user?.user?.user_metadata?.display_name, base, 40),
    role: input.role === "docente" ? "docente" : "estudiante",
    institution: input.institution ? String(input.institution).slice(0, 80) : null,
  });
  if (error) throw new ActionError("No se pudo crear tu perfil.", 500);
  return { ok: true, created: true };
}
