/**
 * Tipos del contenido de Sideral: situaciones (dilemas), noticias del entorno,
 * trivia y conceptos de la academia. Todo el contenido vive en archivos de datos
 * dentro de src/content y se valida con scripts/validate-content.ts.
 */

export const INDUSTRY_IDS = [
  "pasteleria",
  "bebidas",
  "restaurante",
  "cafeteria",
  "moda",
  "minimarket",
  "farmacia",
  "ecommerce",
  "inmobiliaria",
  "lotes",
  "autos",
  "software",
  "telecom",
  "consultoria",
  "agencia",
  "agroexport",
  "educacion",
  "gimnasio",
  "turismo",
  "logistica",
  "limpieza",
  "maquinaria",
] as const;
export type IndustryId = (typeof INDUSTRY_IDS)[number];

export const REGION_IDS = ["lima", "norte", "sur", "centro", "oriente"] as const;
export type RegionId = (typeof REGION_IDS)[number];

export const DILEMMA_CATEGORIES = [
  "tributario",
  "laboral",
  "legal",
  "etica",
  "finanzas",
  "marketing",
  "clientes",
  "operaciones",
  "proveedores",
  "tecnologia",
  "estrategia",
  "entorno",
] as const;
export type DilemmaCategory = (typeof DILEMMA_CATEGORIES)[number];

/**
 * Efectos sobre la empresa. Los montos de dinero se expresan como porcentaje
 * de la venta trimestral base de la industria, así una misma situación sirve
 * para una pastelería y para una inmobiliaria.
 */
export interface Effects {
  /** Ingreso (+) o gasto (−) único, en % de la venta trimestral base. Rango −40 a 40. */
  cashPct?: number;
  /** Cambio % en la demanda de la empresa. Rango −40 a 40. */
  demandPct?: number;
  /** Cambio % en el costo variable unitario. Rango −30 a 30. */
  costPct?: number;
  /** Cambio % en los gastos fijos. Rango −30 a 30. */
  fixedCostPct?: number;
  /** Cambio % en la productividad del personal. Rango −30 a 30. */
  productivityPct?: number;
  /** Puntos de marca (0 a 100). Rango −20 a 20. */
  brand?: number;
  /** Puntos de clima laboral. Rango −20 a 20. */
  morale?: number;
  /** Puntos de calidad. Rango −20 a 20. */
  quality?: number;
  /** Puntos de satisfacción del cliente. Rango −20 a 20. */
  satisfaction?: number;
  /** Puntos de reputación (ética y cumplimiento). Rango −25 a 20. */
  reputation?: number;
  /** Trimestres que duran los efectos porcentuales (no aplica a cashPct). 1 a 4, por defecto 1. */
  rounds?: number;
}

export type Verdict = "optima" | "buena" | "riesgosa" | "mala";

export interface DilemmaOption {
  id: "a" | "b" | "c" | "d";
  /** Acción corta, máximo 70 caracteres. */
  label: string;
  /** Una frase que explica qué implica, sin revelar los números. */
  detail: string;
  effects: Effects;
  /** Consecuencia incierta: con probabilidad prob ocurre además este efecto. */
  risk?: { prob: number; effects: Effects; text: string };
  /** Qué pasó después de elegir esta opción (2 a 3 frases). */
  outcome: string;
  verdict: Verdict;
}

export interface Dilemma {
  id: string;
  title: string;
  category: DilemmaCategory;
  industries: IndustryId[] | "all";
  market: "B2C" | "B2B" | "all";
  /** 1 básico, 2 intermedio, 3 avanzado. */
  tier: 1 | 2 | 3;
  /** Planteamiento de 2 a 4 frases, en segunda persona. */
  situation: string;
  options: DilemmaOption[];
  /** Concepto de negocios que se practica, por ejemplo "Crédito fiscal del IGV". */
  concept: string;
  /** Enseñanza de 1 a 3 frases. */
  lesson: string;
  /** Hecho real que inspira el caso, si lo hay. */
  basedOn?: string;
}

export const PESTEL = [
  "politico",
  "economico",
  "social",
  "tecnologico",
  "ambiental",
  "legal",
] as const;
export type Pestel = (typeof PESTEL)[number];

export interface NewsEffects {
  /** Cambio % en la demanda de todo el mercado. Rango −35 a 35. */
  demandPct?: number;
  /** Cambio % en el costo variable de todas las empresas. Rango −25 a 30. */
  costPct?: number;
  /** Puntos porcentuales que se suman a la tasa de interés anual. Rango −4 a 8. */
  ratePts?: number;
  /** Cambio % en el costo de planilla. Rango −5 a 15. */
  wagePct?: number;
  /** Cambio % adicional en la demanda por región. */
  regions?: Partial<Record<RegionId, number>>;
}

export interface News {
  id: string;
  title: string;
  pestel: Pestel;
  /** Noticia de 2 a 3 frases, con tono de diario económico. */
  text: string;
  industries: IndustryId[] | "all";
  effects: NewsEffects;
  rounds: 1 | 2 | 3;
  severity: 1 | 2 | 3;
  /** Señal temprana que se muestra un trimestre antes a quien investiga el mercado. */
  hint: string;
  lesson: string;
  basedOn?: string;
}

export const TRIVIA_TOPICS = [
  "finanzas",
  "contabilidad",
  "tributos",
  "marketing",
  "investigacion",
  "estrategia",
  "operaciones",
  "personas",
  "ventas",
  "emprendimiento",
] as const;
export type TriviaTopic = (typeof TRIVIA_TOPICS)[number];

export interface TriviaQ {
  id: string;
  topic: TriviaTopic;
  level: 1 | 2 | 3;
  q: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explain: string;
}

export interface Concept {
  id: string;
  title: string;
  area: TriviaTopic;
  /** Una frase. */
  summary: string;
  /** 2 a 4 párrafos cortos separados por \n\n. */
  body: string;
  /** Ejemplo concreto de Perú o Latinoamérica. */
  example: string;
  /** Cómo se usa dentro del simulador. */
  inGame: string;
}

export type FodaKind = "F" | "O" | "D" | "A";

export interface FodaItem {
  /** Afirmación sobre la empresa o su entorno, máximo 150 caracteres. */
  text: string;
  kind: FodaKind;
  /** Por qué pertenece a ese cuadrante (una frase). */
  why: string;
}

/** Caso corto para el reto de clasificar un FODA. */
export interface FodaCase {
  id: string;
  company: string;
  industry: IndustryId;
  /** Contexto de 2 a 3 frases. */
  context: string;
  /** Exactamente 8 afirmaciones: 2 fortalezas, 2 oportunidades, 2 debilidades y 2 amenazas. */
  items: FodaItem[];
}

export interface Force {
  /** 1 muy baja, 5 muy alta. */
  level: 1 | 2 | 3 | 4 | 5;
  text: string;
}

/** Ficha de una industria: cómo es el negocio en el Perú y cómo se compite. */
export interface IndustryProfile {
  id: IndustryId;
  /** Cómo es el negocio, 3 a 4 frases. */
  description: string;
  /** Quién compra y qué valora, 1 a 2 frases. */
  customer: string;
  /** 3 o 4 factores clave de éxito. */
  keys: string[];
  /** 3 errores típicos de quien recién empieza. */
  mistakes: string[];
  porter: { rivalry: Force; entrants: Force; substitutes: Force; buyers: Force; suppliers: Force };
  /** Indicadores que un gerente del rubro mira cada semana. */
  kpis: string[];
}
