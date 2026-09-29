import type { Dilemma, IndustryId, News, RegionId, Verdict } from "@/content/types";

export type { IndustryId, RegionId };

export const CHANNEL_IDS = ["digital", "masivo", "btl", "directa"] as const;
export type ChannelId = (typeof CHANNEL_IDS)[number];

export const MODULE_IDS = [
  "marketing",
  "personas",
  "finanzas",
  "calidad",
  "productos",
  "regiones",
  "investigacion",
  "credito",
  "situaciones",
] as const;
export type ModuleId = (typeof MODULE_IDS)[number];

export type BusinessModel = "goods" | "trade" | "service" | "subscription";
export type ProductId = "p1" | "p2" | "p3";
export const PRODUCT_IDS: ProductId[] = ["p1", "p2", "p3"];

export interface ProductDef {
  id: ProductId;
  name: string;
  unit: string;
  /** Precio de referencia sin IGV. */
  price: number;
  /** Costo variable como fracción del precio de referencia. */
  costPct: number;
  /** Unidades por trimestre que vende una empresa promedio en Lima. */
  units: number;
  /** Crecimiento trimestral del mercado. */
  growth: number;
  /** Sensibilidad al precio. */
  elasticity: number;
  /** Peso de la calidad en la decisión de compra. */
  qualityWeight: number;
  /** Unidades de capacidad que consume cada unidad. */
  capUse: number;
  /** Retención de clientes de un trimestre al siguiente (0 si no hay recurrencia). */
  retention: number;
}

export interface IndustryDef {
  id: IndustryId;
  name: string;
  short: string;
  kind: "B2C" | "B2B";
  icon: string;
  tagline: string;
  model: BusinessModel;
  /** Nombre de la decisión de volumen. */
  volumeLabel: string;
  capacityLabel: string;
  products: [ProductDef, ProductDef, ProductDef];
  seasonality: [number, number, number, number];
  /** Fracción del inventario sobrante que se pierde cada trimestre. */
  perishability: number;
  weights: { brand: number; marketing: number; credit: number };
  channels: Record<ChannelId, number>;
  creditDays: 0 | 30 | 60 | 90;
  supplierDays: number;
  shares: { labor: number; overhead: number; marketing: number };
  /** Activo fijo como múltiplo de la venta trimestral base. */
  assetIntensity: number;
  headcount: number;
  /** Sobrecosto logístico fuera de Lima, como fracción del costo variable. */
  logisticsPct: number;
  regionFit: Record<RegionId, number>;
  /** 1 sencilla, 2 intermedia, 3 exigente. */
  complexity: 1 | 2 | 3;
  /** Sensibilidad al tipo de cambio: fracción del costo que sigue al dólar. */
  fxExposure: number;
}

export interface ProductDecision {
  active: boolean;
  price: number;
  /** Unidades a producir o comprar. En servicios se ignora. */
  volume: number;
}

export interface Decisions {
  products: Record<ProductId, ProductDecision>;
  marketing: {
    budget: number;
    channels: Record<ChannelId, number>;
    products: Record<ProductId, number>;
    regions: Record<RegionId, number>;
  };
  people: { headcount: number; salaryIndex: number; training: number };
  finance: { loan: number; repay: number; dividends: number };
  invest: { capacity: number; quality: number; efficiency: number };
  regions: Record<RegionId, boolean>;
  research: { forecast: boolean; competitors: boolean; consumer: boolean };
  creditDays: 0 | 30 | 60 | 90;
  choice: "a" | "b" | "c" | "d" | null;
}

export interface ProductState {
  active: boolean;
  /** Trimestres desde el lanzamiento (0 = recién lanzado). */
  age: number;
  inventory: number;
  /** Costo promedio del inventario. */
  avgCost: number;
  sold: Record<RegionId, number>;
  price: number;
}

export interface ActiveEffect {
  source: string;
  rounds: number;
  demandPct?: number;
  costPct?: number;
  fixedCostPct?: number;
  productivityPct?: number;
}

export interface CompanyState {
  idx: number;
  name: string;
  color: string;
  isBot: boolean;
  botStyle: BotStyle | null;
  cash: number;
  overdraft: number;
  debt: number;
  capacity: number;
  /** Capacidad en construcción que entra el próximo trimestre. */
  capacityPending: number;
  fixedAssets: number;
  headcount: number;
  salaryIndex: number;
  skill: number;
  morale: number;
  brand: number;
  quality: number;
  satisfaction: number;
  reputation: number;
  efficiency: number;
  products: Record<ProductId, ProductState>;
  regions: Record<RegionId, boolean>;
  receivables: number;
  payables: number;
  igvPayable: number;
  igvCredit: number;
  taxPayable: number;
  lossCarry: number;
  capital: number;
  retained: number;
  shares: number;
  sharePrice: number;
  sharePrice0: number;
  dividendsPaid: number;
  effects: ActiveEffect[];
  rescues: number;
  cumRevenue: number;
  cumProfit: number;
  /** Utilidad neta de los últimos cuatro trimestres. */
  profits: number[];
  revenues: number[];
  score: number;
  last: Decisions | null;
}

export type BotStyle = "costos" | "premium" | "equilibrado" | "agresivo" | "conservador";

export interface ActiveNews {
  id: string;
  title: string;
  pestel: News["pestel"];
  rounds: number;
  demandPct: number;
  costPct: number;
  ratePts: number;
  wagePct: number;
  regions: Partial<Record<RegionId, number>>;
}

export interface MarketState {
  /** Índice de costos (inflación acumulada). */
  costIndex: number;
  /** Índice de sueldos de mercado. */
  wageIndex: number;
  /** Tasa anual base para préstamos a empresas. */
  rate: number;
  /** Tipo de cambio, soles por dólar. */
  fx: number;
  fx0: number;
  news: ActiveNews[];
}

/** Texto público de la situación del trimestre (sin efectos ni veredictos). */
export interface PublicDilemma {
  id: string;
  title: string;
  category: Dilemma["category"];
  situation: string;
  concept: string;
  options: { id: "a" | "b" | "c" | "d"; label: string; detail: string }[];
}

export interface PublicNews {
  id: string;
  title: string;
  pestel: News["pestel"];
  text: string;
  severity: 1 | 2 | 3;
  rounds: number;
  lesson: string;
  /** Dirección de cada efecto para mostrarlo sin revelar la magnitud exacta. */
  signs: { demand: number; cost: number; rate: number; wage: number };
}

export interface GameState {
  v: 1;
  industry: IndustryId;
  /** Trimestre que se está decidiendo (1 = primero). */
  round: number;
  totalRounds: number;
  seed: number;
  /** 1 fácil, 2 normal, 3 difícil, 4 experto. */
  difficulty: 1 | 2 | 3 | 4;
  modules: ModuleId[];
  startYear: number;
  market: MarketState;
  companies: CompanyState[];
  /** Lo que el jugador ve al decidir este trimestre. */
  current: { news: PublicNews | null; dilemma: PublicDilemma | null };
  finished: boolean;
}

/** Guion oculto de un trimestre: solo lo conoce el servidor. */
export interface RoundScript {
  news: News | null;
  dilemma: Dilemma | null;
}

export interface IncomeStatement {
  revenue: number;
  cogs: number;
  gross: number;
  personnel: number;
  marketing: number;
  admin: number;
  other: number;
  ebitda: number;
  depreciation: number;
  ebit: number;
  interest: number;
  extraordinary: number;
  pbt: number;
  tax: number;
  net: number;
}

export interface BalanceSheet {
  cash: number;
  receivables: number;
  inventory: number;
  igvCredit: number;
  fixedAssets: number;
  assets: number;
  payables: number;
  igvPayable: number;
  taxPayable: number;
  overdraft: number;
  debt: number;
  liabilities: number;
  capital: number;
  retained: number;
  equity: number;
}

export interface CashFlow {
  start: number;
  collections: number;
  suppliers: number;
  payroll: number;
  expenses: number;
  taxes: number;
  operating: number;
  capex: number;
  investing: number;
  loans: number;
  repayments: number;
  interest: number;
  dividends: number;
  overdraft: number;
  rescue: number;
  financing: number;
  end: number;
}

export interface Ratios {
  grossMargin: number;
  ebitdaMargin: number;
  netMargin: number;
  roe: number;
  roa: number;
  currentRatio: number;
  acidRatio: number;
  debtRatio: number;
  inventoryDays: number;
  collectionDays: number;
  breakEven: number;
  utilization: number;
  tsr: number;
}

export interface ProductResult {
  active: boolean;
  price: number;
  demand: number;
  sold: number;
  produced: number;
  inventory: number;
  spoiled: number;
  unitCost: number;
  revenue: number;
  share: number;
  marketGrowth: number;
  byRegion: Partial<Record<RegionId, { demand: number; sold: number; share: number }>>;
}

export interface Scorecard {
  finance: number;
  customers: number;
  processes: number;
  people: number;
  total: number;
}

export interface DilemmaResult {
  id: string;
  title: string;
  concept: string;
  lesson: string;
  choice: "a" | "b" | "c" | "d";
  label: string;
  verdict: Verdict;
  outcome: string;
  riskHit: boolean;
  riskText: string | null;
  cash: number;
  best: { id: string; label: string };
}

export interface TaxReport {
  igvSales: number;
  igvPurchases: number;
  igvCreditUsed: number;
  igvToPay: number;
  igvCreditNext: number;
  regime: "RMT" | "General";
  taxableIncome: number;
  lossUsed: number;
  incomeTax: number;
  socialCharges: number;
}

export interface CompanyResult {
  idx: number;
  income: IncomeStatement;
  balance: BalanceSheet;
  cashflow: CashFlow;
  ratios: Ratios;
  taxes: TaxReport;
  products: Record<ProductId, ProductResult>;
  share: number;
  units: number;
  capacity: number;
  effectiveCapacity: number;
  headcount: number;
  turnover: number;
  morale: number;
  brand: number;
  quality: number;
  satisfaction: number;
  reputation: number;
  efficiency: number;
  sharePrice: number;
  scorecard: Scorecard;
  score: number;
  rank: number;
  rescued: boolean;
  dilemma: DilemmaResult | null;
  notes: string[];
}

export interface RoundResult {
  round: number;
  year: number;
  quarter: number;
  news: PublicNews | null;
  market: {
    products: Record<ProductId, { demand: number; sold: number; avgPrice: number; growth: number }>;
    revenue: number;
    rate: number;
    costIndex: number;
  };
  companies: CompanyResult[];
}

/** Información privada que compra una empresa con investigación de mercados. */
export interface Intel {
  demandFactor: number | null;
  costFactor: number | null;
  hint: string | null;
}
