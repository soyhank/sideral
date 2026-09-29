import "server-only";

import { hashSeed, makeRng } from "@/engine/rng";
import { adminClient } from "@/lib/supabase/server";
import { limaDay } from "./extras";
import { reward } from "./rewards";
import { ActionError } from "./types";

interface QuestDef {
  id: string;
  group: "jugar" | "aprender" | "reto";
  label: string;
  /** Motivo de experiencia que cuenta, o "xp" para sumar toda la experiencia del día. */
  reason: string;
  goal: number;
  xp: number;
}

const POOL: QuestDef[] = [
  { id: "trimestres-3", group: "jugar", label: "Cierra 3 trimestres", reason: "trimestre", goal: 3, xp: 30 },
  { id: "trimestres-5", group: "jugar", label: "Cierra 5 trimestres", reason: "trimestre", goal: 5, xp: 45 },
  { id: "partida-1", group: "jugar", label: "Termina una partida", reason: "partida", goal: 1, xp: 40 },
  { id: "retos-2", group: "aprender", label: "Completa 2 retos del día", reason: "reto", goal: 2, xp: 25 },
  { id: "retos-4", group: "aprender", label: "Completa los 4 retos del día", reason: "reto", goal: 4, xp: 50 },
  { id: "entrenar-1", group: "aprender", label: "Haz una práctica de entrenamiento", reason: "entrenamiento", goal: 1, xp: 15 },
  { id: "xp-150", group: "reto", label: "Gana 150 XP hoy", reason: "xp", goal: 150, xp: 30 },
  { id: "xp-300", group: "reto", label: "Gana 300 XP hoy", reason: "xp", goal: 300, xp: 50 },
  { id: "pronostico-1", group: "reto", label: "Acierta un pronóstico de ventas", reason: "pronostico", goal: 1, xp: 35 },
];

function questsOf(day: string): QuestDef[] {
  const rng = makeRng(hashSeed("misiones", day));
  return (["jugar", "aprender", "reto"] as const).map((g) => rng.pick(POOL.filter((q) => q.group === g)));
}

async function progressOf(userId: string, day: string) {
  // El día se cuenta en hora de Lima (UTC−5, sin horario de verano).
  const from = new Date(`${day}T00:00:00-05:00`).toISOString();
  const { data } = await adminClient().from("xp_events").select("amount, reason, ref").eq("user_id", userId).gte("created_at", from);
  const rows = data ?? [];
  const count = (reason: string) =>
    reason === "xp"
      ? rows.filter((r) => r.reason !== "mision-diaria").reduce((s, r) => s + r.amount, 0)
      : rows.filter((r) => r.reason === reason).length;
  const claimed = new Set(rows.filter((r) => r.reason === "mision-diaria").map((r) => r.ref));
  return { count, claimed };
}

export async function getQuests(userId: string) {
  const day = limaDay();
  const { count, claimed } = await progressOf(userId, day);
  return {
    day,
    quests: questsOf(day).map((q) => ({
      id: q.id,
      label: q.label,
      goal: q.goal,
      progress: Math.min(q.goal, count(q.reason)),
      xp: q.xp,
      claimed: claimed.has(`quest:${day}:${q.id}`),
    })),
  };
}

export async function claimQuest(userId: string, id: string) {
  const day = limaDay();
  const quest = questsOf(day).find((q) => q.id === id);
  if (!quest) throw new ActionError("Esa misión ya no está disponible.");
  const { count, claimed } = await progressOf(userId, day);
  if (claimed.has(`quest:${day}:${quest.id}`)) throw new ActionError("Ya cobraste esta misión.");
  if (count(quest.reason) < quest.goal) throw new ActionError("Todavía no completas esta misión.");
  const res = await reward(userId, {
    events: [{ amount: quest.xp, reason: "mision-diaria", ref: `quest:${day}:${quest.id}`, label: quest.label }],
    counters: { quests: 1 },
  });
  return { ok: true, xp: res.xp, level: res.level, levelUp: res.levelUp, achievements: res.achievements };
}
