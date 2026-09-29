import type { ChannelId, ModuleId, RegionId } from "./types";

/** Parámetros del Perú usados por el simulador. */
export const IGV = 0.18;
export const IR_GENERAL = 0.295;
export const IR_RMT_LOW = 0.1;
/** UIT referencial. Se usa solo para los tramos del Régimen MYPE Tributario. */
export const UIT = 5500;
export const RMT_LOW_LIMIT_UIT = 15;
export const RMT_REVENUE_LIMIT_UIT = 1700;
/** Remuneración mínima referencial. */
export const RMV = 1130;
/** Cargas sociales del régimen general: EsSalud, gratificaciones, CTS y vacaciones. */
export const LABOR_LOAD = 0.45;

export const BASE_RATE = 0.16;
export const OVERDRAFT_RATE = 0.48;
export const DEPRECIATION_Q = 0.03;
export const MANDATORY_AMORTIZATION = 0.05;
/** Participación de compradores que no elige a ninguna empresa del mercado. */
export const OUTSIDE_OPTION = 1;

export const REGION_NAMES: Record<RegionId, string> = {
  lima: "Lima y Callao",
  norte: "Norte",
  sur: "Sur",
  centro: "Centro",
  oriente: "Oriente",
};

export const REGION_CITIES: Record<RegionId, string> = {
  lima: "Lima Metropolitana y Callao",
  norte: "Trujillo, Chiclayo, Piura",
  sur: "Arequipa, Cusco, Tacna",
  centro: "Huancayo, Ayacucho, Huánuco",
  oriente: "Iquitos, Pucallpa, Tarapoto",
};

export const CHANNEL_NAMES: Record<ChannelId, string> = {
  digital: "Digital",
  masivo: "Medios masivos",
  btl: "Activaciones",
  directa: "Venta directa",
};

export const CHANNEL_HELP: Record<ChannelId, string> = {
  digital: "Meta, TikTok, Google, correo y WhatsApp",
  masivo: "Televisión, radio y paneles",
  btl: "Ferias, degustaciones, eventos y punto de venta",
  directa: "Vendedores, comisiones y visitas a clientes",
};

export const MODULE_NAMES: Record<ModuleId, string> = {
  marketing: "Marketing",
  personas: "Personas",
  finanzas: "Finanzas",
  calidad: "Calidad e innovación",
  productos: "Líneas de producto",
  regiones: "Expansión regional",
  investigacion: "Investigación de mercados",
  credito: "Crédito a clientes",
  situaciones: "Situaciones y entorno",
};

export const DIFFICULTY_NAMES = ["", "Aprendiz", "Profesional", "Experto", "Leyenda"] as const;

export const COMPANY_COLORS = ["#f5f5f7", "#7dd3fc", "#fca5a5", "#86efac", "#fcd34d", "#c4b5fd", "#f9a8d4", "#fdba74"];
