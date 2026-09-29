/** Reglas de progreso: niveles, títulos, ligas, insignias y experiencia. */

export function xpForLevel(level: number): number {
  return Math.ceil(100 * Math.pow(Math.max(0, level - 1), 1.6));
}

export function levelFor(xp: number): number {
  return Math.max(1, Math.floor(Math.pow(Math.max(0, xp) / 100, 0.625)) + 1);
}

export function levelProgress(xp: number) {
  const level = levelFor(xp);
  const from = xpForLevel(level);
  const to = xpForLevel(level + 1);
  return { level, from, to, progress: Math.min(1, Math.max(0, (xp - from) / (to - from))), missing: Math.max(0, to - xp) };
}

const TITLES: [number, string][] = [
  [1, "Practicante"],
  [3, "Asistente"],
  [5, "Analista"],
  [8, "Coordinador"],
  [11, "Jefe de área"],
  [15, "Subgerente"],
  [19, "Gerente"],
  [24, "Gerente general"],
  [30, "Director"],
  [37, "Presidente del directorio"],
  [45, "Magnate"],
];

export function titleFor(level: number): string {
  let title = TITLES[0][1];
  for (const [min, name] of TITLES) if (level >= min) title = name;
  return title;
}

export function nextTitle(level: number): { level: number; title: string } | null {
  const next = TITLES.find(([min]) => min > level);
  return next ? { level: next[0], title: next[1] } : null;
}

export const LEAGUES = [
  { id: 1, name: "Bronce", color: "#c98a5e" },
  { id: 2, name: "Plata", color: "#c9d1dc" },
  { id: 3, name: "Oro", color: "#f2c94c" },
  { id: 4, name: "Platino", color: "#8fe3e0" },
  { id: 5, name: "Diamante", color: "#b7a6ff" },
];
export const LEAGUE_UP = 400;
export const LEAGUE_DOWN = 60;

export const leagueOf = (id: number) => LEAGUES[Math.min(LEAGUES.length, Math.max(1, id)) - 1];

export const AVATARS = [
  "orbita",
  "cometa",
  "nebulosa",
  "eclipse",
  "aurora",
  "prisma",
  "cumbre",
  "brujula",
  "ancla",
  "faro",
  "tumi",
  "chakana",
] as const;
export type AvatarId = (typeof AVATARS)[number];

/** Nivel mínimo para usar cada avatar. */
export const AVATAR_LEVEL: Record<AvatarId, number> = {
  orbita: 1,
  cometa: 1,
  nebulosa: 1,
  eclipse: 1,
  aurora: 3,
  prisma: 5,
  cumbre: 8,
  brujula: 11,
  ancla: 15,
  faro: 19,
  tumi: 24,
  chakana: 30,
};

export type AchievementTier = "bronce" | "plata" | "oro";

export interface AchievementDef {
  key: string;
  name: string;
  description: string;
  icon: string;
  tier: AchievementTier;
  xp: number;
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { key: "primer-trimestre", name: "Primer cierre", description: "Cierra tu primer trimestre.", icon: "Flag", tier: "bronce", xp: 20 },
  { key: "primera-partida", name: "Ciclo completo", description: "Termina tu primera simulación.", icon: "CircleCheck", tier: "bronce", xp: 40 },
  { key: "utilidad-positiva", name: "En azul", description: "Cierra un trimestre con utilidad.", icon: "TrendingUp", tier: "bronce", xp: 20 },
  { key: "lider-mercado", name: "Líder del mercado", description: "Termina un trimestre con la mayor cuota.", icon: "Crown", tier: "plata", xp: 40 },
  { key: "campeon", name: "Campeón", description: "Gana una simulación.", icon: "Trophy", tier: "plata", xp: 60 },
  { key: "campeon-experto", name: "Temple de acero", description: "Gana una simulación en dificultad Experto o Leyenda.", icon: "Swords", tier: "oro", xp: 120 },
  { key: "caja-sana", name: "Caja sana", description: "Termina una partida sin caer nunca en sobregiro.", icon: "Wallet", tier: "plata", xp: 50 },
  { key: "ave-fenix", name: "Ave fénix", description: "Cierra con utilidad después de haber sido rescatado.", icon: "Flame", tier: "plata", xp: 50 },
  { key: "marca-80", name: "Marca querida", description: "Lleva tu marca a 80 puntos.", icon: "Heart", tier: "oro", xp: 80 },
  { key: "calidad-85", name: "Cero defectos", description: "Lleva tu calidad a 85 puntos.", icon: "Gem", tier: "oro", xp: 80 },
  { key: "clima-85", name: "Gran lugar para trabajar", description: "Lleva el clima laboral a 85 puntos.", icon: "Smile", tier: "oro", xp: 80 },
  { key: "reputacion-90", name: "Intachable", description: "Termina una partida con reputación de 90 o más.", icon: "ShieldCheck", tier: "oro", xp: 80 },
  { key: "expansion-total", name: "De Tumbes a Tacna", description: "Opera en las cinco regiones.", icon: "Map", tier: "oro", xp: 100 },
  { key: "portafolio", name: "Portafolio completo", description: "Ten tres líneas de producto activas.", icon: "Layers", tier: "plata", xp: 60 },
  { key: "criterio-5", name: "Buen criterio", description: "Acumula 5 decisiones óptimas en situaciones.", icon: "Scale", tier: "plata", xp: 50 },
  { key: "criterio-25", name: "Criterio de director", description: "Acumula 25 decisiones óptimas en situaciones.", icon: "Scale", tier: "oro", xp: 120 },
  { key: "pronostico", name: "Pronóstico certero", description: "Proyecta tus ventas con menos de 5 % de error.", icon: "Crosshair", tier: "plata", xp: 50 },
  { key: "dividendos", name: "Accionistas contentos", description: "Reparte dividendos por primera vez.", icon: "HandCoins", tier: "bronce", xp: 30 },
  { key: "puntaje-700", name: "Gestión sólida", description: "Termina una partida con 700 puntos o más.", icon: "Star", tier: "plata", xp: 60 },
  { key: "puntaje-850", name: "Gestión brillante", description: "Termina una partida con 850 puntos o más.", icon: "Sparkles", tier: "oro", xp: 150 },
  { key: "racha-3", name: "Constancia", description: "Juega 3 días seguidos.", icon: "Flame", tier: "bronce", xp: 30 },
  { key: "racha-7", name: "Semana perfecta", description: "Juega 7 días seguidos.", icon: "Flame", tier: "plata", xp: 70 },
  { key: "racha-30", name: "Disciplina de hierro", description: "Juega 30 días seguidos.", icon: "Flame", tier: "oro", xp: 300 },
  { key: "trivia-perfecta", name: "Cinco de cinco", description: "Responde bien toda la trivia del día.", icon: "Brain", tier: "bronce", xp: 30 },
  { key: "retos-10", name: "Cita diaria", description: "Completa 10 retos del día.", icon: "CalendarCheck", tier: "plata", xp: 60 },
  { key: "sala-ganada", name: "El mejor del aula", description: "Gana una competencia en sala.", icon: "Users", tier: "oro", xp: 120 },
  { key: "duelo-ganado", name: "Duelista", description: "Gana un duelo.", icon: "Swords", tier: "plata", xp: 50 },
  { key: "torneo-podio", name: "Podio", description: "Termina entre los tres primeros de un torneo.", icon: "Medal", tier: "oro", xp: 120 },
  { key: "industrias-5", name: "Todoterreno", description: "Juega en 5 industrias distintas.", icon: "Shapes", tier: "plata", xp: 60 },
  { key: "industrias-todas", name: "Conoce todos los rubros", description: "Juega en todas las industrias.", icon: "Globe", tier: "oro", xp: 250 },
  { key: "b2b-b2c", name: "Dos mundos", description: "Gana una partida B2C y otra B2B.", icon: "ArrowLeftRight", tier: "oro", xp: 100 },
  { key: "tres-estrellas", name: "Tres estrellas", description: "Consigue tres estrellas en una misión.", icon: "Star", tier: "bronce", xp: 30 },
  { key: "carrera-completa", name: "Carrera completa", description: "Supera todas las misiones de la carrera.", icon: "GraduationCap", tier: "oro", xp: 300 },
  { key: "nivel-10", name: "Nivel 10", description: "Alcanza el nivel 10.", icon: "ChevronsUp", tier: "plata", xp: 0 },
  { key: "nivel-20", name: "Nivel 20", description: "Alcanza el nivel 20.", icon: "ChevronsUp", tier: "oro", xp: 0 },
];

export const ACHIEVEMENT_BY_KEY = new Map(ACHIEVEMENTS.map((a) => [a.key, a]));

const DIFF_MULT = [0, 0.8, 1, 1.3, 1.6];

export function roundXp(input: { score: number; profit: number; verdict: string | null; difficulty: number }): number {
  let xp = 15 + Math.round((input.score / 1000) * 30);
  if (input.profit > 0) xp += 10;
  if (input.verdict === "optima") xp += 12;
  else if (input.verdict === "buena") xp += 6;
  return Math.round(xp * DIFF_MULT[input.difficulty]);
}

export function finishXp(input: { score: number; rank: number; companies: number; rounds: number; difficulty: number }): number {
  const base = 60 * (input.rounds / 8) + input.score / 8;
  const place = input.rank === 1 ? 120 : input.rank === 2 ? 60 : input.rank === 3 ? 30 : 0;
  return Math.round((base + place * Math.min(1, input.companies / 4)) * DIFF_MULT[input.difficulty]);
}

/** Minutos aproximados que toma un trimestre según cuántas áreas se deciden. */
export function minutesPerRound(modules: number): number {
  return modules <= 1 ? 1.5 : modules <= 3 ? 2.5 : modules <= 6 ? 3.5 : 4.5;
}
