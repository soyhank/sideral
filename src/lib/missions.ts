import type { IndustryId, ModuleId } from "@/engine/types";

export type GoalMetric =
  | "profit"
  | "rank"
  | "share"
  | "morale"
  | "quality"
  | "satisfaction"
  | "reputation"
  | "brand"
  | "tsr"
  | "noOverdraft"
  | "noRescue"
  | "regions"
  | "products"
  | "cash";

export interface Goal {
  metric: GoalMetric;
  /** Valor mínimo (o máximo en el caso de rank). */
  value: number;
  label: string;
}

export interface Mission {
  id: string;
  world: 1 | 2 | 3 | 4;
  order: number;
  title: string;
  brief: string;
  teaches: string;
  industry: IndustryId;
  rounds: number;
  difficulty: 1 | 2 | 3 | 4;
  size: number;
  modules: ModuleId[];
  goals: Goal[];
  /** Puntaje para dos y tres estrellas. */
  stars: [number, number];
}

export const WORLDS = [
  { id: 1, name: "Emprendedor", tagline: "Precio, volumen y clientes", unlock: 0 },
  { id: 2, name: "Gerente", tagline: "Caja, calidad y decisiones difíciles", unlock: 3 },
  { id: 3, name: "Estratega", tagline: "Crecer: líneas, regiones y empresas cliente", unlock: 7 },
  { id: 4, name: "Director", tagline: "Todo a la vez contra rivales expertos", unlock: 11 },
] as const;

export const MISSIONS: Mission[] = [
  {
    id: "m01",
    world: 1,
    order: 1,
    title: "Tu primera torta",
    brief:
      "Heredaste la pastelería de tu tía en Pueblo Libre. Solo decides el precio y cuántas tortas hornear. Lo que sobra se malogra, lo que falta se lo lleva la competencia.",
    teaches: "Precio, volumen y merma",
    industry: "pasteleria",
    rounds: 4,
    difficulty: 1,
    size: 3,
    modules: [],
    goals: [{ metric: "profit", value: 0, label: "Termina el año con utilidad acumulada" }],
    stars: [590, 625],
  },
  {
    id: "m02",
    world: 1,
    order: 2,
    title: "La campaña de mayo",
    brief:
      "Se acerca el Día de la Madre. Ahora también manejas la publicidad. Elige bien los canales: no todos rinden igual en tu rubro.",
    teaches: "Presupuesto y mezcla de canales",
    industry: "pasteleria",
    rounds: 4,
    difficulty: 1,
    size: 3,
    modules: ["marketing"],
    goals: [
      { metric: "profit", value: 0, label: "Utilidad acumulada positiva" },
      { metric: "share", value: 0.34, label: "Cuota de mercado de 34 % o más" },
    ],
    stars: [625, 655],
  },
  {
    id: "m03",
    world: 1,
    order: 3,
    title: "Verano sin quiebres",
    brief:
      "Tu marca de jugos entra al verano, su mejor temporada. La demanda sube fuerte en el primer trimestre y cae en invierno. Planifica la producción para no quedarte sin stock ni llenarte de inventario.",
    teaches: "Estacionalidad e inventarios",
    industry: "bebidas",
    rounds: 4,
    difficulty: 1,
    size: 4,
    modules: ["marketing"],
    goals: [{ metric: "rank", value: 2, label: "Termina entre los dos primeros" }],
    stars: [628, 640],
  },
  {
    id: "m04",
    world: 1,
    order: 4,
    title: "El salón lleno",
    brief:
      "Tu pollería en Los Olivos se llena los fines de semana. La capacidad depende de tu gente: si el equipo está descontento, atiende menos y peor.",
    teaches: "Personal, sueldos y clima laboral",
    industry: "restaurante",
    rounds: 5,
    difficulty: 1,
    size: 4,
    modules: ["marketing", "personas"],
    goals: [
      { metric: "profit", value: 0, label: "Utilidad acumulada positiva" },
      { metric: "morale", value: 62, label: "Clima laboral de 62 o más" },
    ],
    stars: [640, 675],
  },
  {
    id: "m05",
    world: 2,
    order: 5,
    title: "La caja manda",
    brief:
      "Un minimarket gana poco por cada venta. Aquí aprenderás que una empresa puede tener utilidad y aun así quedarse sin efectivo. Usa el crédito con cabeza.",
    teaches: "Flujo de caja, préstamos y sobregiro",
    industry: "minimarket",
    rounds: 5,
    difficulty: 2,
    size: 4,
    modules: ["marketing", "personas", "finanzas"],
    goals: [
      { metric: "noOverdraft", value: 1, label: "Nunca cierres un trimestre en sobregiro" },
      { metric: "profit", value: 0, label: "Utilidad acumulada positiva" },
    ],
    stars: [650, 705],
  },
  {
    id: "m06",
    world: 2,
    order: 6,
    title: "Calidad que se nota",
    brief:
      "En el café de especialidad el cliente paga más si la experiencia lo vale. Invierte en calidad y capacitación, y decide si puedes cobrar por ello.",
    teaches: "Calidad, diferenciación y satisfacción",
    industry: "cafeteria",
    rounds: 5,
    difficulty: 2,
    size: 4,
    modules: ["marketing", "personas", "finanzas", "calidad"],
    goals: [
      { metric: "quality", value: 62, label: "Calidad de 62 o más" },
      { metric: "satisfaction", value: 64, label: "Satisfacción de 64 o más" },
    ],
    stars: [660, 760],
  },
  {
    id: "m07",
    world: 2,
    order: 7,
    title: "Decisiones difíciles",
    brief:
      "Diriges una botica. Cada trimestre llega una situación que ningún manual resuelve: una inspección, un proveedor que falla, una tentación. El entorno también se mueve.",
    teaches: "Situaciones, ética y lectura del entorno",
    industry: "farmacia",
    rounds: 6,
    difficulty: 2,
    size: 4,
    modules: ["marketing", "personas", "finanzas", "calidad", "situaciones"],
    goals: [
      { metric: "reputation", value: 72, label: "Reputación de 72 o más" },
      { metric: "profit", value: 0, label: "Utilidad acumulada positiva" },
    ],
    stars: [620, 725],
  },
  {
    id: "m08",
    world: 2,
    order: 8,
    title: "Guerra de precios",
    brief:
      "En confecciones hay un rival que vende barato y otro que apuesta por la marca. Define tu estrategia y sostenla: quedarse en el medio es lo más caro.",
    teaches: "Liderazgo en costos frente a diferenciación",
    industry: "moda",
    rounds: 6,
    difficulty: 2,
    size: 5,
    modules: ["marketing", "personas", "finanzas", "calidad", "situaciones"],
    goals: [{ metric: "rank", value: 2, label: "Termina entre los dos primeros" }],
    stars: [570, 650],
  },
  {
    id: "m09",
    world: 3,
    order: 9,
    title: "Nuevas líneas",
    brief:
      "Tu tienda en línea ya vende accesorios. Lanzar una línea nueva cuesta y tarda en madurar. Usa la matriz BCG para decidir dónde poner el dinero.",
    teaches: "Portafolio de productos y matriz BCG",
    industry: "ecommerce",
    rounds: 6,
    difficulty: 2,
    size: 5,
    modules: ["marketing", "personas", "finanzas", "calidad", "situaciones", "productos"],
    goals: [
      { metric: "products", value: 2, label: "Opera al menos dos líneas" },
      { metric: "profit", value: 0, label: "Utilidad acumulada positiva" },
    ],
    stars: [630, 760],
  },
  {
    id: "m10",
    world: 3,
    order: 10,
    title: "Rumbo a provincias",
    brief:
      "Lima ya no alcanza. Abrir una región tiene costo de entrada, gastos fijos y flete. Elige dónde crecer y reparte tu publicidad.",
    teaches: "Expansión geográfica y matriz de Ansoff",
    industry: "logistica",
    rounds: 6,
    difficulty: 2,
    size: 5,
    modules: ["marketing", "personas", "finanzas", "calidad", "situaciones", "regiones"],
    goals: [
      { metric: "regions", value: 3, label: "Opera en tres regiones o más" },
      { metric: "profit", value: 0, label: "Utilidad acumulada positiva" },
    ],
    stars: [620, 780],
  },
  {
    id: "m11",
    world: 3,
    order: 11,
    title: "Vender a empresas",
    brief:
      "En consultoría el cliente compra confianza y paga a 30 o 60 días. Dar más crédito ayuda a vender, pero alguien tiene que financiarlo. Investiga el mercado antes de decidir.",
    teaches: "Venta B2B, crédito, cobranza e investigación",
    industry: "consultoria",
    rounds: 6,
    difficulty: 2,
    size: 5,
    modules: ["marketing", "personas", "finanzas", "calidad", "situaciones", "credito", "investigacion"],
    goals: [
      { metric: "rank", value: 3, label: "Termina entre los tres primeros" },
      { metric: "noOverdraft", value: 1, label: "Nunca cierres en sobregiro" },
    ],
    stars: [580, 720],
  },
  {
    id: "m12",
    world: 3,
    order: 12,
    title: "Ingresos recurrentes",
    brief:
      "En el software por suscripción cada cliente paga todos los trimestres mientras no se vaya. Retener vale más que conseguir. Ya tienes todas las áreas a tu cargo.",
    teaches: "Retención, suscripciones y valor de la empresa",
    industry: "software",
    rounds: 6,
    difficulty: 2,
    size: 5,
    modules: ["marketing", "personas", "finanzas", "calidad", "situaciones", "productos", "regiones", "credito", "investigacion"],
    goals: [{ metric: "tsr", value: 0.3, label: "Retorno al accionista de 30 % o más" }],
    stars: [610, 760],
  },
  {
    id: "m13",
    world: 4,
    order: 13,
    title: "Monto alto",
    brief:
      "Vendes departamentos. Pocas operaciones, mucho capital inmovilizado y tasas hipotecarias que cambian el mercado de un trimestre a otro.",
    teaches: "Capital de trabajo y apalancamiento",
    industry: "inmobiliaria",
    rounds: 8,
    difficulty: 3,
    size: 5,
    modules: ["marketing", "personas", "finanzas", "calidad", "situaciones", "productos", "regiones", "credito", "investigacion"],
    goals: [
      { metric: "rank", value: 2, label: "Termina entre los dos primeros" },
      { metric: "noRescue", value: 1, label: "Sin rescates de inversionistas" },
    ],
    stars: [630, 780],
  },
  {
    id: "m14",
    world: 4,
    order: 14,
    title: "El dólar manda",
    brief:
      "Tu concesionaria compra en dólares y vende en soles con margen corto. Un mal trimestre cambiario se come la utilidad del año.",
    teaches: "Riesgo cambiario y márgenes ajustados",
    industry: "autos",
    rounds: 8,
    difficulty: 3,
    size: 5,
    modules: ["marketing", "personas", "finanzas", "calidad", "situaciones", "productos", "regiones", "credito", "investigacion"],
    goals: [
      { metric: "profit", value: 0, label: "Utilidad acumulada positiva" },
      { metric: "rank", value: 2, label: "Termina entre los dos primeros" },
    ],
    stars: [560, 770],
  },
  {
    id: "m15",
    world: 4,
    order: 15,
    title: "La ventana comercial",
    brief:
      "Exportas arándanos. La campaña se concentra en medio año, la fruta no espera y el clima no avisa. Necesitas caja para resistir los meses flojos.",
    teaches: "Estacionalidad extrema y gestión del riesgo",
    industry: "agroexport",
    rounds: 8,
    difficulty: 3,
    size: 5,
    modules: ["marketing", "personas", "finanzas", "calidad", "situaciones", "productos", "regiones", "credito", "investigacion"],
    goals: [
      { metric: "noRescue", value: 1, label: "Sin rescates de inversionistas" },
      { metric: "tsr", value: 0.2, label: "Retorno al accionista de 20 % o más" },
    ],
    stars: [650, 795],
  },
  {
    id: "m16",
    world: 4,
    order: 16,
    title: "Red nacional",
    brief:
      "La prueba final. Diriges un operador de telecomunicaciones contra rivales de nivel Leyenda. Red costosa, portabilidad y una guerra de planes permanente.",
    teaches: "Dirección integral de una empresa",
    industry: "telecom",
    rounds: 8,
    difficulty: 4,
    size: 5,
    modules: ["marketing", "personas", "finanzas", "calidad", "situaciones", "productos", "regiones", "credito", "investigacion"],
    goals: [{ metric: "rank", value: 1, label: "Termina en el primer lugar" }],
    stars: [620, 690],
  },
];

export const MISSION_BY_ID = new Map(MISSIONS.map((m) => [m.id, m]));

export interface MissionOutcome {
  passed: boolean;
  stars: 0 | 1 | 2 | 3;
  goals: { label: string; met: boolean }[];
}

export interface FinalStats {
  score: number;
  rank: number;
  share: number;
  profit: number;
  cash: number;
  morale: number;
  quality: number;
  satisfaction: number;
  reputation: number;
  brand: number;
  tsr: number;
  overdrafts: number;
  rescues: number;
  regions: number;
  products: number;
}

export function evaluateMission(mission: Mission, s: FinalStats): MissionOutcome {
  const goals = mission.goals.map((g) => {
    let met = false;
    switch (g.metric) {
      case "profit": met = s.profit > g.value; break;
      case "rank": met = s.rank <= g.value; break;
      case "share": met = s.share >= g.value; break;
      case "morale": met = s.morale >= g.value; break;
      case "quality": met = s.quality >= g.value; break;
      case "satisfaction": met = s.satisfaction >= g.value; break;
      case "reputation": met = s.reputation >= g.value; break;
      case "brand": met = s.brand >= g.value; break;
      case "tsr": met = s.tsr >= g.value; break;
      case "noOverdraft": met = s.overdrafts === 0; break;
      case "noRescue": met = s.rescues === 0; break;
      case "regions": met = s.regions >= g.value; break;
      case "products": met = s.products >= g.value; break;
      case "cash": met = s.cash >= g.value; break;
    }
    return { label: g.label, met };
  });
  const passed = goals.every((g) => g.met);
  const stars = !passed ? 0 : s.score >= mission.stars[1] ? 3 : s.score >= mission.stars[0] ? 2 : 1;
  return { passed, stars, goals };
}
