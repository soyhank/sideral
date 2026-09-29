import { NextResponse } from "next/server";
import { userFromRequest } from "@/lib/supabase/server";
import { ActionError } from "@/lib/game/types";
import * as service from "@/lib/game/service";
import * as extras from "@/lib/game/extras";

export const runtime = "nodejs";
export const maxDuration = 30;

type Body = Record<string, unknown>;
type Handler = (userId: string, body: Body) => Promise<unknown>;

const s = (v: unknown) => String(v ?? "");

/** Todas las acciones que cambian datos pasan por aquí. El motor corre solo en el servidor. */
const ACTIONS: Record<string, Handler> = {
  "profile.ensure": (u, b) => extras.ensureProfile(u, b),
  "profile.update": (u, b) => extras.updateProfile(u, b),

  "game.create": (u, b) => service.createSolo(u, b as unknown as service.NewSoloInput),
  "game.round": (u, b) => service.playSoloRound(u, s(b.gameId), b as never),
  "game.abandon": (u, b) => service.abandonGame(u, s(b.gameId)),

  "room.create": (u, b) => service.createRoom(u, b),
  "room.join": (u, b) => service.joinRoom(u, s(b.code), b),
  "room.leave": (u, b) => service.leaveRoom(u, s(b.roomId)),
  "room.rename": (u, b) => service.renameCompany(u, s(b.roomId), s(b.name)),
  "room.start": (u, b) => service.startRoom(u, s(b.roomId)),
  "room.close": (u, b) => service.closeRoomRound(u, s(b.roomId), { force: Boolean(b.force) }),
  "room.peek": (u, b) => service.roomPeek(u, s(b.code)),
  "room.status": (u, b) => service.roomStatus(u, s(b.roomId)),
  "room.rewards": async (u, b) => ({ rewards: await service.roundRewards(u, s(b.gameId), Number(b.round)) }),

  "daily.get": (u) => extras.getDaily(u),
  "daily.submit": (u, b) => extras.submitDaily(u, s(b.kind) as extras.DailyKind, b.answers),
  "training.get": async (_u, b) => ({ questions: await extras.trainingSet(s(b.topic), Number(b.level) || 0) }),
  "training.check": (u, b) => extras.trainingCheck(u, b.answers as never),

  "tournament.weekly": async () => ({ id: await extras.ensureWeeklyTournament() }),
  "tournament.create": (u, b) => extras.createTournament(u, b),

  "duel.create": (u, b) => extras.createDuel(u, b),
  "duel.answer": (u, b) => extras.answerDuel(u, s(b.duelId), Boolean(b.accept)),

  "classroom.create": (u, b) => extras.createClassroom(u, b),
  "classroom.join": (u, b) => extras.joinClassroom(u, s(b.code)),
  "classroom.leave": (u, b) => extras.leaveClassroom(u, s(b.classroomId), b.userId ? s(b.userId) : undefined),
  "classroom.delete": (u, b) => extras.deleteClassroom(u, s(b.classroomId)),
  "classroom.report": (u, b) => extras.classroomReport(u, s(b.classroomId)),
};

export async function POST(req: Request) {
  const started = Date.now();
  try {
    const userId = await userFromRequest(req);
    if (!userId) return NextResponse.json({ error: "Tu sesión venció. Vuelve a ingresar." }, { status: 401 });
    const body = (await req.json().catch(() => null)) as (Body & { action?: string }) | null;
    const handler = body?.action ? ACTIONS[body.action] : undefined;
    if (!body || !handler) return NextResponse.json({ error: "Acción desconocida." }, { status: 400 });
    const data = await handler(userId, body);
    return NextResponse.json(data ?? { ok: true }, { headers: { "Server-Timing": `act;dur=${Date.now() - started}` } });
  } catch (e) {
    if (e instanceof ActionError) return NextResponse.json({ error: e.message }, { status: e.status });
    console.error("act", e);
    return NextResponse.json({ error: "Algo falló de nuestro lado. Inténtalo otra vez." }, { status: 500 });
  }
}
