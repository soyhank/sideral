/**
 * Prueba de punta a punta contra un servidor en marcha.
 * Crea usuarios de prueba y recorre: registro, partida individual, carrera,
 * sala con varios jugadores, retos del día, torneo, duelo y aula.
 *
 * Uso: npx tsx scripts/e2e-api.ts [http://localhost:3217]
 */
import { readFileSync } from "node:fs";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { sanitize } from "../src/engine/setup";
import type { Decisions, GameState } from "../src/engine/types";

for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
}
const BASE = process.argv[2] ?? "http://localhost:3217";
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const SECRET = process.env.SUPABASE_SECRET_KEY!;
const PASSWORD = "Sideral-Prueba-2026";
const stamp = Date.now().toString(36);

let failures = 0;
const timings: Record<string, number[]> = {};

function check(name: string, ok: unknown, detail = "") {
  if (ok) console.log(`  ✓ ${name}${detail ? `  ${detail}` : ""}`);
  else {
    failures++;
    console.log(`  ✗ ${name}${detail ? `  ${detail}` : ""}`);
  }
}

interface User {
  id: string;
  email: string;
  token: string;
  sb: SupabaseClient;
}

async function signUp(name: string, role = "estudiante"): Promise<User> {
  const sb = createClient(URL, KEY, { db: { schema: "sideral" }, auth: { persistSession: false } }) as unknown as SupabaseClient;
  const email = `prueba.${name}.${stamp}@sideral.test`;
  const { data, error } = await sb.auth.signUp({ email, password: PASSWORD, options: { data: { app: "sideral", display_name: `Prueba ${name}`, role } } });
  if (error || !data.session) throw new Error(`No se pudo registrar ${email}: ${error?.message ?? "sin sesión"}`);
  return { id: data.user!.id, email, token: data.session.access_token, sb };
}

async function act<T = Record<string, unknown>>(user: User, action: string, body: Record<string, unknown> = {}, expect = 200): Promise<T> {
  const t0 = performance.now();
  const res = await fetch(`${BASE}/api/act`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.token}` },
    body: JSON.stringify({ action, ...body }),
  });
  const ms = performance.now() - t0;
  (timings[action] ??= []).push(ms);
  const json = await res.json();
  if (res.status !== expect) throw new Error(`${action} devolvió ${res.status}: ${JSON.stringify(json)}`);
  return json as T;
}

async function loadState(user: User, gameId: string): Promise<{ state: GameState; round: number; status: string }> {
  const { data, error } = await user.sb.from("games").select("state, round, status").eq("id", gameId).single();
  if (error) throw new Error(`No se pudo leer la partida: ${error.message}`);
  return data as { state: GameState; round: number; status: string };
}

function decide(state: GameState, idx: number): Decisions {
  const d = sanitize(null, state, state.companies[idx]);
  if (state.current.dilemma) d.choice = state.current.dilemma.options[0].id;
  return d;
}

async function playSolo(user: User, gameId: string, label: string) {
  let g = await loadState(user, gameId);
  let last: Record<string, unknown> = {};
  while (g.status === "activa") {
    const res = await act<Record<string, unknown>>(user, "game.round", { gameId, round: g.round, decisions: decide(g.state, 0), forecast: null });
    if (!res.ok) throw new Error("trimestre rechazado");
    last = res;
    g = { state: res.state as GameState, round: (res.state as GameState).round, status: res.status as string };
  }
  const rewards = last.rewards as { xp: number; final: { rank: number; score: number } | null; mission: { stars: number; passed: boolean } | null };
  check(`${label}: partida terminada`, g.status === "finalizada", `puesto ${rewards.final?.rank}, ${rewards.final?.score} puntos, +${rewards.xp} XP`);
  return rewards;
}

async function main() {
  console.log(`Servidor: ${BASE}\n`);
  const admin = createClient(URL, SECRET, { db: { schema: "sideral" }, auth: { persistSession: false } }) as unknown as SupabaseClient;

  console.log("1. Registro y perfil");
  const [ana, beto, caro, dani, profe] = await Promise.all([signUp("ana"), signUp("beto"), signUp("caro"), signUp("dani"), signUp("docente", "docente")]);
  await new Promise((r) => setTimeout(r, 400));
  const { data: p } = await ana.sb.from("profiles").select("*").eq("id", ana.id).maybeSingle();
  check("el registro crea el perfil", p?.display_name === "Prueba ana", `usuario ${p?.username}`);
  const { data: pp } = await profe.sb.from("profiles").select("role").eq("id", profe.id).single();
  check("el docente queda con su rol", pp?.role === "docente");

  console.log("\n2. Seguridad");
  const anon = createClient(URL, KEY, { db: { schema: "sideral" }, auth: { persistSession: false } }) as unknown as SupabaseClient;
  const a1 = await anon.from("profiles").select("id").limit(1);
  check("sin sesión no se leen perfiles", !!a1.error || !a1.data?.length);
  const a2 = await ana.sb.from("game_secrets").select("game_id").limit(1);
  check("el guion oculto no es legible", !!a2.error || !a2.data?.length);
  const a3 = await ana.sb.from("profiles").update({ xp: 999999 }).eq("id", ana.id).select();
  const { data: still } = await ana.sb.from("profiles").select("xp").eq("id", ana.id).single();
  check("nadie puede regalarse experiencia", still?.xp !== 999999, a3.error?.message ?? "");
  const bad = await fetch(`${BASE}/api/act`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Bearer falso" }, body: JSON.stringify({ action: "daily.get" }) });
  check("un token falso se rechaza", bad.status === 401);

  console.log("\n3. Simulación libre");
  const free = await act<{ id: string }>(ana, "game.create", { mode: "libre", industry: "pasteleria", difficulty: 2, rounds: 4, size: 4, company: "Dulce Ana" });
  check("crea la partida", !!free.id);
  const other = await beto.sb.from("games").select("id").eq("id", free.id);
  check("otro usuario no ve mi partida", !other.data?.length);
  const stale = await act<{ ok: boolean; stale?: boolean }>(ana, "game.round", { gameId: free.id, round: 3, decisions: decide((await loadState(ana, free.id)).state, 0) });
  check("rechaza un trimestre fuera de orden", stale.ok === false && stale.stale === true);
  await act(beto, "game.round", { gameId: free.id, round: 1, decisions: {} }, 403).then(
    () => check("un ajeno no puede cerrar mi trimestre", true),
    (e) => check("un ajeno no puede cerrar mi trimestre", false, String(e)),
  );
  await playSolo(ana, free.id, "libre");
  const { data: rounds } = await ana.sb.from("rounds").select("round").eq("game_id", free.id);
  check("guarda los 4 trimestres", rounds?.length === 4);

  console.log("\n4. Carrera");
  const m1 = await act<{ id: string }>(beto, "game.create", { mode: "carrera", missionId: "m01" });
  const r1 = await playSolo(beto, m1.id, "misión 1");
  check("evalúa la misión", r1.mission !== null, `${r1.mission?.stars} estrellas`);
  await act(beto, "game.create", { mode: "carrera", missionId: "m09" }, 400).then(
    () => check("no deja saltar a un mundo bloqueado", true),
    (e) => check("no deja saltar a un mundo bloqueado", false, String(e)),
  );

  console.log("\n5. Todas las industrias arrancan");
  const inds = ["bebidas", "restaurante", "software", "telecom", "inmobiliaria", "agroexport", "consultoria", "autos"];
  for (const industry of inds) {
    const g = await act<{ id: string }>(caro, "game.create", { mode: "libre", industry, difficulty: 3, rounds: 4, size: 5 });
    const s = await loadState(caro, g.id);
    const res = await act<{ ok: boolean; result: { companies: { income: { revenue: number } }[] } }>(caro, "game.round", { gameId: g.id, round: 1, decisions: decide(s.state, 0) });
    check(industry, res.ok && res.result.companies[0].income.revenue > 0);
  }

  console.log("\n6. Sala con varios jugadores");
  const room = await act<{ id: string; code: string }>(profe, "room.create", { name: "Sala de prueba", industry: "moda", difficulty: 2, rounds: 4, teamMode: "individual", timerMinutes: 0, hostPlays: false });
  check("crea la sala con código", room.code?.length === 6, room.code);
  for (const u of [ana, beto, caro, dani]) await act(u, "room.join", { code: room.code, company: `Moda ${u.email.split(".")[1]}` });
  const lobby = await act<{ companies: unknown[]; status: string }>(profe, "room.peek", { code: room.code });
  check("los 4 aparecen en el vestíbulo", lobby.companies.length === 4);
  await act(ana, "room.start", { roomId: room.id }, 403).then(
    () => check("solo quien dirige puede iniciar", true),
    (e) => check("solo quien dirige puede iniciar", false, String(e)),
  );
  await act(profe, "room.start", { roomId: room.id });
  const st = await act<{ status: string; myGame: string | null; companies: { id: string }[] }>(ana, "room.status", { roomId: room.id });
  check("la sala queda en juego", st.status === "activa" && !!st.myGame);

  for (let round = 1; round <= 4; round++) {
    for (const u of [ana, beto, caro, dani]) {
      const info = await act<{ myGame: string; myCompany: string }>(u, "room.status", { roomId: room.id });
      const g = await loadState(u, info.myGame);
      const { data: company } = await u.sb.from("companies").select("idx").eq("id", info.myCompany).single();
      const dec = decide(g.state, company!.idx);
      const { error } = await u.sb.from("decisions").upsert({ company_id: info.myCompany, game_id: info.myGame, round, data: dec, submitted: true }, { onConflict: "company_id,round" });
      if (error) throw new Error(`decisiones: ${error.message}`);
      if (round === 1 && u === ana) {
        const spy = await beto.sb.from("decisions").select("company_id").eq("company_id", info.myCompany);
        check("un rival no ve mis decisiones", !spy.data?.length);
        const early = await act<{ processed: boolean }>(ana, "room.close", { roomId: room.id });
        check("no se cierra mientras falten decisiones", early.processed === false);
      }
    }
    const closed = await act<{ processed: boolean; finished: boolean }>(dani, "room.close", { roomId: room.id });
    check(`trimestre ${round} cerrado al enviar todos`, closed.processed, closed.finished ? "sala finalizada" : "");
  }
  const end = await act<{ status: string; board: { name: string; score: number; bot: boolean }[] }>(profe, "room.status", { roomId: room.id });
  check("tabla general con las 4 empresas", end.status === "finalizada" && end.board.filter((b) => !b.bot).length === 4, end.board.filter((b) => !b.bot).map((b) => `${b.name} ${b.score}`).join(", "));

  console.log("\n7. Sala grande: mercados paralelos");
  const big = await act<{ id: string; code: string }>(profe, "room.create", { name: "Sala grande", industry: "cafeteria", difficulty: 1, rounds: 3, teamMode: "equipos", teamSize: 2, hostPlays: false });
  const t1 = await act<{ companyId: string }>(ana, "room.join", { code: big.code, company: "Equipo Uno" });
  await act(beto, "room.join", { code: big.code, companyId: t1.companyId });
  await act(caro, "room.join", { code: big.code, companyId: t1.companyId }, 400).then(
    () => check("un equipo completo no admite más gente", true),
    (e) => check("un equipo completo no admite más gente", false, String(e)),
  );
  // Empresas de relleno para forzar dos mercados
  const { data: rootRow } = await admin.from("games").select("id").eq("id", big.id).single();
  for (let i = 0; i < 7; i++) await admin.from("companies").insert({ game_id: rootRow!.id, name: `Relleno ${i + 1}`, color: "#888888" });
  await act(profe, "room.start", { roomId: big.id });
  const bigSt = await act<{ markets: number; companies: { market: number }[] }>(profe, "room.status", { roomId: big.id });
  check("8 empresas se reparten en 2 mercados", bigSt.markets === 2, `${bigSt.companies.filter((c) => c.market === 1).length} y ${bigSt.companies.filter((c) => c.market === 2).length}`);
  const forced = await act<{ processed: boolean }>(profe, "room.close", { roomId: big.id, force: true });
  check("quien dirige puede forzar el cierre", forced.processed);
  await act(profe, "game.abandon", { gameId: big.id });

  console.log("\n8. Retos del día");
  const daily = await act<{ trivia: { questions: { id: string }[] }; dilema: { dilemma: { options: { id: string }[] } }; foda: { case: { items: { key: number }[] } }; calculo: { problems: unknown[] } }>(dani, "daily.get");
  check("entrega los cuatro retos", daily.trivia.questions.length === 5 && daily.foda.case.items.length === 8 && daily.calculo.problems.length === 3);
  check("no filtra las respuestas", !JSON.stringify(daily).includes('"answer"') && !JSON.stringify(daily).includes('"verdict"') && !JSON.stringify(daily).includes('"kind":"F"'));
  const tr = await act<{ score: number; xp: number }>(dani, "daily.submit", { kind: "trivia", answers: [0, 1, 2, 3, 0] });
  check("corrige la trivia", typeof tr.score === "number", `${tr.score} de 5, +${tr.xp} XP`);
  await act(dani, "daily.submit", { kind: "trivia", answers: [0, 0, 0, 0, 0] }, 400).then(
    () => check("no deja repetir el reto", true),
    (e) => check("no deja repetir el reto", false, String(e)),
  );
  const dl = await act<{ xp: number }>(dani, "daily.submit", { kind: "dilema", answers: daily.dilema.dilemma.options[0].id });
  const fd = await act<{ score: number }>(dani, "daily.submit", { kind: "foda", answers: Object.fromEntries(daily.foda.case.items.map((i) => [i.key, "F"])) });
  const cl = await act<{ score: number }>(dani, "daily.submit", { kind: "calculo", answers: [0, 0, 0] });
  check("dilema, FODA y cálculo", dl.xp > 0 && fd.score === 2 && typeof cl.score === "number", `FODA ${fd.score} de 8`);
  const train = await act<{ questions: { id: string }[] }>(dani, "training.get", { topic: "tributos", level: 1 });
  const chk = await act<{ total: number; xp: number }>(dani, "training.check", { answers: train.questions.map((q) => ({ id: q.id, chosen: 0 })) });
  check("entrenamiento por tema", train.questions.length === 8 && chk.total === 8);

  console.log("\n9. Torneo y duelo");
  const weekly = await act<{ id: string }>(ana, "tournament.weekly");
  check("existe el torneo semanal", !!weekly.id);
  const tg1 = await act<{ id: string }>(ana, "game.create", { mode: "torneo", tournamentId: weekly.id });
  const tg2 = await act<{ id: string }>(ana, "game.create", { mode: "torneo", tournamentId: weekly.id });
  check("un solo intento por torneo", tg1.id === tg2.id);
  const s1 = await loadState(ana, tg1.id);
  const tb = await act<{ id: string }>(beto, "game.create", { mode: "torneo", tournamentId: weekly.id });
  const s2 = await loadState(beto, tb.id);
  check("todos reciben el mismo escenario", s1.state.seed === s2.state.seed && s1.state.current.dilemma?.id === s2.state.current.dilemma?.id);
  await act(ana, "tournament.create", { name: "x", industry: "moda" }, 403).then(
    () => check("un estudiante no crea torneos", true),
    (e) => check("un estudiante no crea torneos", false, String(e)),
  );
  const duel = await act<{ id: string }>(caro, "duel.create", { opponentId: dani.id, industry: "gimnasio" });
  await act(dani, "duel.answer", { duelId: duel.id, accept: true });
  const dg1 = await act<{ id: string }>(caro, "game.create", { mode: "duelo", duelId: duel.id });
  const dg2 = await act<{ id: string }>(dani, "game.create", { mode: "duelo", duelId: duel.id });
  await playSolo(caro, dg1.id, "duelo (retador)");
  await playSolo(dani, dg2.id, "duelo (retado)");
  const { data: dr } = await caro.sb.from("duels").select("status, winner, challenger_score, opponent_score").eq("id", duel.id).single();
  check("el duelo se resuelve", dr?.status === "finalizado", `${dr?.challenger_score} contra ${dr?.opponent_score}`);

  console.log("\n10. Aula");
  await act(ana, "classroom.create", { name: "x" }, 403).then(
    () => check("un estudiante no crea aulas", true),
    (e) => check("un estudiante no crea aulas", false, String(e)),
  );
  const cls = await act<{ id: string; code: string }>(profe, "classroom.create", { name: "Aula de prueba" });
  for (const u of [ana, beto]) await act(u, "classroom.join", { code: cls.code });
  const rep = await act<{ students: { display_name: string; xp: number; missions: unknown[] }[] }>(profe, "classroom.report", { classroomId: cls.id });
  check("el docente ve el avance", rep.students.length === 2, rep.students.map((s) => `${s.display_name} ${s.xp} XP`).join(", "));
  await act(ana, "classroom.report", { classroomId: cls.id }, 403).then(
    () => check("un estudiante no ve el reporte docente", true),
    (e) => check("un estudiante no ve el reporte docente", false, String(e)),
  );

  console.log("\n11. Progreso");
  const { data: fin } = await ana.sb.from("profiles").select("xp, level, streak, games_played, weekly_xp, stats").eq("id", ana.id).single();
  check("experiencia, nivel y racha", (fin?.xp ?? 0) > 0 && fin?.streak === 1 && (fin?.games_played ?? 0) >= 2, JSON.stringify(fin));
  const { data: badges } = await ana.sb.from("achievements").select("key").eq("user_id", ana.id);
  check("insignias ganadas", (badges?.length ?? 0) >= 2, badges?.map((b) => b.key).join(", "));

  console.log("\nTiempos de respuesta (ms)");
  for (const [k, v] of Object.entries(timings).sort()) {
    const sorted = [...v].sort((a, b) => a - b);
    const avg = v.reduce((s, x) => s + x, 0) / v.length;
    console.log(`  ${k.padEnd(20)} n=${String(v.length).padStart(3)}  media ${avg.toFixed(0).padStart(5)}  p95 ${sorted[Math.floor(sorted.length * 0.95)].toFixed(0).padStart(5)}  máx ${sorted.at(-1)!.toFixed(0).padStart(5)}`);
  }

  console.log("\nLimpieza de usuarios de prueba");
  for (const u of [ana, beto, caro, dani, profe]) await admin.auth.admin.deleteUser(u.id);
  await admin.from("tournaments").delete().eq("official", false).like("name", "x%");
  console.log(failures ? `\n${failures} comprobaciones fallaron` : "\nTodo en orden");
  process.exit(failures ? 1 : 0);
}

main().catch((e) => {
  console.error("\nLa prueba se detuvo:", e.message);
  process.exit(1);
});
