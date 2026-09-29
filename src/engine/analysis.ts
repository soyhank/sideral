import { REGION_IDS } from "@/content/types";
import { REGION_NAMES } from "./constants";
import { derive, refPrice } from "./derive";
import { getIndustry, hasInventory } from "./industries";
import type { CompanyResult, GameState, ProductId, RegionId, RoundResult } from "./types";

export interface Insight {
  text: string;
  detail?: string;
}

export interface Foda {
  F: Insight[];
  O: Insight[];
  D: Insight[];
  A: Insight[];
  /** Estrategias del FODA cruzado. */
  cross: { kind: "FO" | "DO" | "FA" | "DA"; title: string; text: string }[];
}

const avg = (values: number[]) => (values.length ? values.reduce((s, v) => s + v, 0) / values.length : 0);
const r0 = (v: number) => Math.round(v);

/** FODA automático: compara a la empresa con sus rivales y lee el entorno del trimestre. */
export function buildFoda(state: GameState, idx: number, result: RoundResult | null): Foda {
  const ind = getIndustry(state.industry);
  const d = derive(ind);
  const me = state.companies[idx];
  const rivals = state.companies.filter((c) => c.idx !== idx);
  const mine = result?.companies[idx] ?? null;
  const fair = 1 / state.companies.length;
  const F: Insight[] = [];
  const O: Insight[] = [];
  const D: Insight[] = [];
  const A: Insight[] = [];

  const cmp = (label: string, value: number, others: number[], gap: number, strong: string, weak: string) => {
    const mean = avg(others);
    if (value >= mean + gap) F.push({ text: strong, detail: `${label}: ${r0(value)} frente a ${r0(mean)} del promedio de rivales` });
    else if (value <= mean - gap) D.push({ text: weak, detail: `${label}: ${r0(value)} frente a ${r0(mean)} del promedio de rivales` });
  };
  cmp("Calidad", me.quality, rivals.map((c) => c.quality), 4, "Calidad superior a la de tus rivales", "Calidad por debajo del mercado");
  cmp("Marca", me.brand, rivals.map((c) => c.brand), 4, "Marca más reconocida que la competencia", "Marca menos conocida que la competencia");
  cmp("Satisfacción", me.satisfaction, rivals.map((c) => c.satisfaction), 5, "Clientes más satisfechos que los de tus rivales", "Clientes menos satisfechos que los de tus rivales");

  if (me.morale >= 70) F.push({ text: "Equipo motivado y productivo", detail: `Clima laboral de ${r0(me.morale)} puntos` });
  if (me.morale < 50) D.push({ text: "Clima laboral deteriorado", detail: `${r0(me.morale)} puntos: baja la productividad y sube la rotación` });
  if (me.efficiency >= 0.05) F.push({ text: "Procesos eficientes que abaratan el costo unitario", detail: `Ahorro de ${(me.efficiency * 100).toFixed(1)} % en costo variable` });
  if (me.reputation >= 82) F.push({ text: "Reputación sólida ante clientes, banca y autoridades", detail: `${r0(me.reputation)} puntos` });
  if (me.reputation < 55) D.push({ text: "Reputación dañada", detail: `${r0(me.reputation)} puntos: encarece el crédito y frena la marca` });

  if (mine) {
    if (mine.share >= fair * 1.2) F.push({ text: "Participación de mercado por encima de la que te corresponde", detail: `${(mine.share * 100).toFixed(1)} % frente a ${(fair * 100).toFixed(0)} % de reparto parejo` });
    if (mine.share <= fair * 0.75) D.push({ text: "Participación de mercado baja", detail: `${(mine.share * 100).toFixed(1)} % frente a ${(fair * 100).toFixed(0)} % de reparto parejo` });
    if (mine.balance.overdraft > 0) D.push({ text: "Caja en sobregiro", detail: "Pagas la tasa más cara del mercado para operar" });
    else if (mine.balance.cash > d.r0 * 0.5) F.push({ text: "Caja holgada para invertir o resistir un mal trimestre", detail: "Tienes más de medio trimestre de ventas en efectivo" });
    if (mine.ratios.debtRatio > 0.65) D.push({ text: "Endeudamiento alto", detail: `Debes ${(mine.ratios.debtRatio * 100).toFixed(0)} % de lo que tienes` });
    if (mine.ratios.debtRatio < 0.35 && mine.balance.overdraft === 0) F.push({ text: "Bajo endeudamiento y capacidad de crédito disponible", detail: `Pasivo de ${(mine.ratios.debtRatio * 100).toFixed(0)} % del activo` });
    if (mine.ratios.utilization < 0.7) D.push({ text: "Capacidad ociosa", detail: `Usas ${(mine.ratios.utilization * 100).toFixed(0)} % de tu capacidad y pagas el 100 % de sus costos fijos` });
    const unmet = Object.values(mine.products).reduce((s, p) => s + Math.max(0, p.demand - p.sold), 0);
    const demand = Object.values(mine.products).reduce((s, p) => s + p.demand, 0);
    if (demand > 0 && unmet / demand > 0.06) D.push({ text: "No alcanzas a atender toda tu demanda", detail: `Dejaste sin atender ${((unmet / demand) * 100).toFixed(0)} % de los pedidos` });
    if (mine.turnover > 0.09) D.push({ text: "Rotación de personal alta", detail: `${(mine.turnover * 100).toFixed(0)} % del equipo se va cada trimestre` });
  }

  const myRegions = REGION_IDS.filter((r) => me.regions[r]);
  const myProducts = ind.products.filter((p) => me.products[p.id].active);
  if (myRegions.length >= 3) F.push({ text: "Presencia en varias regiones que reparte el riesgo", detail: myRegions.map((r) => REGION_NAMES[r]).join(", ") });
  if (state.round > 3 && myRegions.length === 1 && state.modules.includes("regiones"))
    D.push({ text: "Dependes de una sola región", detail: "Un problema local afecta todas tus ventas" });
  if (state.round > 3 && myProducts.length === 1 && state.modules.includes("productos"))
    D.push({ text: "Dependes de una sola línea de producto", detail: "No tienes con qué compensar si esa línea cae" });

  // Entorno
  if (state.modules.includes("productos"))
    for (const p of ind.products) {
      if (me.products[p.id].active) continue;
      const present = rivals.filter((c) => c.products[p.id].active).length;
      const growth = Math.pow(1 + p.growth, 4) - 1;
      if (growth >= 0.08)
        O.push({
          text: `El mercado de ${p.name.toLowerCase()} crece y aún no participas`,
          detail: `Crece ${(growth * 100).toFixed(0)} % al año. ${present === 0 ? "Ningún rival ha entrado todavía" : `${present} de tus rivales ya venden ahí`}`,
        });
    }
  if (state.modules.includes("regiones")) {
    const open = REGION_IDS.filter((r) => !me.regions[r])
      .map((r) => ({ r, present: rivals.filter((c) => c.regions[r]).length }))
      .sort((a, b) => ind.regionFit[b.r] - ind.regionFit[a.r] || a.present - b.present);
    if (open[0])
      O.push({
        text: `La región ${REGION_NAMES[open[0].r]} tiene demanda por atender`,
        detail: open[0].present === 0 ? "Ninguna empresa del juego opera ahí todavía" : `Solo ${open[0].present} de tus rivales opera ahí`,
      });
    const expanding = rivals.filter((c) => REGION_IDS.filter((r) => c.regions[r]).length > myRegions.length);
    if (expanding.length >= 2) A.push({ text: "Tus rivales se expanden más rápido que tú", detail: `${expanding.length} empresas ya operan en más regiones` });
  }
  for (const n of state.market.news) {
    const good = n.demandPct > 0 || n.costPct < 0 || n.ratePts < 0;
    const bad = n.demandPct < 0 || n.costPct > 0 || n.ratePts > 0 || n.wagePct > 0;
    const left = `Dura ${n.rounds} ${n.rounds === 1 ? "trimestre más" : "trimestres más"}`;
    if (good && !bad) O.push({ text: n.title, detail: left });
    else if (bad) A.push({ text: n.title, detail: left });
  }
  if (state.market.rate <= 0.13) O.push({ text: "Crédito barato para financiar inversiones", detail: `Tasa de referencia de ${(state.market.rate * 100).toFixed(1)} % anual` });
  if (state.market.rate >= 0.2) A.push({ text: "Crédito caro", detail: `Tasa de referencia de ${(state.market.rate * 100).toFixed(1)} % anual` });
  const fxMove = state.market.fx / state.market.fx0 - 1;
  if (Math.abs(fxMove) > 0.03 && Math.abs(ind.fxExposure) >= 0.2) {
    const hurts = fxMove * ind.fxExposure > 0;
    (hurts ? A : O).push({
      text: hurts ? "El tipo de cambio encarece tus costos" : "El tipo de cambio juega a tu favor",
      detail: `El dólar está en S/ ${state.market.fx.toFixed(2)}, ${fxMove > 0 ? "subió" : "bajó"} ${Math.abs(fxMove * 100).toFixed(1)} % desde el inicio`,
    });
  }
  const p1 = ind.products[0];
  const myPrice = me.products.p1.price;
  const cheapest = [...rivals].sort((a, b) => a.products.p1.price - b.products.p1.price)[0];
  if (cheapest && cheapest.products.p1.price < myPrice * 0.92)
    A.push({ text: `${cheapest.name} vende bastante más barato que tú`, detail: `Su precio en ${p1.name.toLowerCase()} es ${((1 - cheapest.products.p1.price / myPrice) * 100).toFixed(0)} % menor` });
  const weak = rivals.filter((c) => c.overdraft > 0 || c.satisfaction < 45);
  if (weak.length) O.push({ text: `${weak[0].name} pasa por un mal momento`, detail: "Sus clientes insatisfechos pueden cambiar de proveedor" });
  const leader = [...rivals].sort((a, b) => b.score - a.score)[0];
  if (leader && leader.brand > me.brand + 10) A.push({ text: `${leader.name} construye una marca difícil de alcanzar`, detail: `Marca de ${r0(leader.brand)} frente a tu ${r0(me.brand)}` });
  if (!O.length) O.push({ text: "El mercado sigue creciendo", detail: `${p1.name} crece ${((Math.pow(1 + p1.growth, 4) - 1) * 100).toFixed(0)} % al año` });
  if (!A.length) A.push({ text: "Competidores con capacidad de reaccionar a tus precios", detail: "Una rebaja tuya puede desatar una guerra de precios" });
  if (!F.length) F.push({ text: "Empresa en marcha con clientes y operación estable", detail: "Aún no destacas en ningún frente frente a tus rivales" });
  if (!D.length) D.push({ text: "Sin debilidades graves por ahora", detail: "Vigila caja, clima laboral y calidad cada trimestre" });

  const f = F[0], o = O[0], w = D[0], a = A[0];
  const cross: Foda["cross"] = [
    { kind: "FO", title: "Ofensiva", text: `Apóyate en tu ventaja (${lower(f.text)}) para aprovechar esto: ${lower(o.text)}.` },
    { kind: "DO", title: "Reorientación", text: `Corrige primero (${lower(w.text)}) para no desperdiciar esto: ${lower(o.text)}.` },
    { kind: "FA", title: "Defensiva", text: `Usa tu ventaja (${lower(f.text)}) como escudo frente a esto: ${lower(a.text)}.` },
    { kind: "DA", title: "Supervivencia", text: `Es tu punto más frágil: ${lower(w.text)} justo cuando ${lower(a.text)}. Atiéndelo antes de crecer.` },
  ];
  return { F: F.slice(0, 5), O: O.slice(0, 5), D: D.slice(0, 5), A: A.slice(0, 5), cross };
}

const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export interface BcgPoint {
  id: ProductId;
  name: string;
  active: boolean;
  /** Participación relativa: tu cuota entre la del mayor competidor. */
  relShare: number;
  growth: number;
  revenue: number;
  quadrant: "Estrella" | "Vaca lechera" | "Interrogante" | "Perro";
  advice: string;
}

export const BCG_GROWTH_CUT = 0.08;

export function buildBcg(state: GameState, idx: number, result: RoundResult | null): BcgPoint[] {
  const ind = getIndustry(state.industry);
  return ind.products.map((p) => {
    const me = state.companies[idx];
    const sold = (c: (typeof state.companies)[number]) => REGION_IDS.reduce((s, r) => s + c.products[p.id].sold[r], 0);
    const mineSold = me.products[p.id].active ? sold(me) : 0;
    const best = Math.max(1, ...state.companies.filter((c) => c.idx !== idx).map(sold));
    const relShare = mineSold / best;
    const growth = result?.market.products[p.id]?.growth ?? Math.pow(1 + p.growth, 4) - 1;
    const high = growth >= BCG_GROWTH_CUT;
    const strong = relShare >= 1;
    const quadrant = high ? (strong ? "Estrella" : "Interrogante") : strong ? "Vaca lechera" : "Perro";
    const advice = !me.products[p.id].active
      ? high
        ? "Mercado en crecimiento donde no participas. Evalúa entrar antes de que se llene."
        : "Mercado maduro donde no participas. Solo entra si puedes diferenciarte."
      : quadrant === "Estrella"
        ? "Invierte para sostener el liderazgo mientras el mercado crece."
        : quadrant === "Vaca lechera"
          ? "Genera caja. Cuídala con inversión mínima y usa su efectivo para financiar otras líneas."
          : quadrant === "Interrogante"
            ? "Decide: invertir fuerte para ganar cuota o retirarte. Quedarse a medias consume caja."
            : "Poco crecimiento y poca cuota. Reduce la inversión o reposiciónala.";
    return {
      id: p.id,
      name: p.name,
      active: me.products[p.id].active,
      relShare,
      growth,
      revenue: result?.companies[idx].products[p.id].revenue ?? 0,
      quadrant,
      advice,
    };
  });
}

export interface AnsoffCell {
  key: "penetracion" | "desarrollo-mercado" | "desarrollo-producto" | "diversificacion";
  title: string;
  text: string;
  active: boolean;
}

export function buildAnsoff(state: GameState, idx: number): AnsoffCell[] {
  const me = state.companies[idx];
  const regions = REGION_IDS.filter((r) => me.regions[r]).length;
  const products = (Object.keys(me.products) as ProductId[]).filter((p) => me.products[p].active).length;
  return [
    { key: "penetracion", title: "Penetración de mercado", text: "Vender más de lo mismo a los mismos clientes: precio, publicidad y servicio.", active: true },
    { key: "desarrollo-producto", title: "Desarrollo de productos", text: "Líneas nuevas para los clientes que ya tienes.", active: products > 1 },
    { key: "desarrollo-mercado", title: "Desarrollo de mercados", text: "Llevar tus productos actuales a nuevas regiones.", active: regions > 1 },
    { key: "diversificacion", title: "Diversificación", text: "Productos nuevos en mercados nuevos. El camino de mayor riesgo.", active: products > 1 && regions > 1 },
  ];
}

export interface Tip {
  level: "alerta" | "mejora" | "bien";
  area: string;
  title: string;
  text: string;
}

/** Consejos del coach a partir del último resultado. Reglas simples, sin costo y siempre iguales ante lo mismo. */
export function coachTips(state: GameState, idx: number, result: RoundResult | null): Tip[] {
  const ind = getIndustry(state.industry);
  const d = derive(ind);
  const me = state.companies[idx];
  const mine = result?.companies[idx];
  const tips: Tip[] = [];
  if (!mine || !result) {
    tips.push({
      level: "mejora",
      area: "Inicio",
      title: "Empieza por el precio y el volumen",
      text: hasInventory(ind)
        ? "Mira la proyección mientras mueves los controles. Producir de más cuesta dinero y producir de menos regala clientes."
        : "Mira la proyección mientras mueves los controles. Tu capacidad de atención depende de tu personal.",
    });
    return tips;
  }
  const has = (m: string) => (state.modules as string[]).includes(m);
  const b = mine.balance;
  if (b.overdraft > 0)
    tips.push({
      level: "alerta",
      area: "Finanzas",
      title: "Sal del sobregiro",
      text: has("finanzas")
        ? "Toma un préstamo de largo plazo para cubrirlo. Su tasa es la tercera parte de la del sobregiro."
        : "Reduce el volumen o el gasto este trimestre hasta recuperar caja.",
    });
  const spoiled = Object.values(mine.products).reduce((s, p) => s + p.spoiled * p.unitCost, 0);
  if (spoiled > mine.income.revenue * 0.03)
    tips.push({ level: "alerta", area: "Operaciones", title: "Estás perdiendo producto", text: `Se malogró mercadería por S/ ${r0(spoiled).toLocaleString("es-PE")}. Ajusta el volumen a la demanda del próximo trimestre.` });
  const unmet = Object.values(mine.products).reduce((s, p) => s + Math.max(0, p.demand - p.sold), 0);
  const demand = Object.values(mine.products).reduce((s, p) => s + p.demand, 0);
  if (demand > 0 && unmet / demand > 0.05)
    tips.push({
      level: "alerta",
      area: "Operaciones",
      title: "Te faltó producto para vender",
      text: "Hubo clientes sin atender. Sube el volumen, invierte en capacidad o sube el precio: con demanda de sobra puedes cobrar más.",
    });
  if (mine.effectiveCapacity < mine.capacity * 0.95 && has("personas") && mine.ratios.utilization > 0.97)
    tips.push({ level: "mejora", area: "Personas", title: "Tu equipo limita tu capacidad", text: "Tienes instalaciones para producir más, pero no suficiente gente productiva. Contrata, capacita o mejora el clima." });
  if (mine.ratios.utilization < 0.7)
    tips.push({ level: "mejora", area: "Operaciones", title: "Capacidad ociosa", text: "Pagas costos fijos por capacidad que no usas. Busca volumen con precio o publicidad, o no amplíes más." });
  const rel = me.products.p1.price / refPrice(ind.products[0], state.market);
  const fair = 1 / state.companies.length;
  if (rel > 1.12 && mine.share < fair * 0.9)
    tips.push({ level: "mejora", area: "Precio", title: "Tu precio no se justifica todavía", text: "Cobras más que el mercado sin tener la calidad o la marca que lo respalden. Baja el precio o invierte en diferenciarte." });
  if (rel < 0.9 && mine.ratios.netMargin < 0.03)
    tips.push({ level: "mejora", area: "Precio", title: "Vendes mucho y ganas poco", text: "Tu precio está por debajo del mercado y el margen no alcanza. Prueba subirlo de a pocos y observa la demanda." });
  if (me.morale < 50 && has("personas"))
    tips.push({ level: "alerta", area: "Personas", title: "El equipo está desmotivado", text: "Un clima bajo reduce la productividad y eleva la rotación. Revisa sueldos y capacitación." });
  if (b.cash > d.r0 * 0.8 && b.debt > 0 && has("finanzas"))
    tips.push({ level: "mejora", area: "Finanzas", title: "Tienes caja sin trabajar", text: "Amortiza deuda para ahorrar intereses, invierte en crecer o reparte dividendos. El efectivo parado no rinde." });
  if (mine.ratios.collectionDays > 60)
    tips.push({ level: "mejora", area: "Cobranza", title: "Cobras muy lento", text: `Tus clientes tardan ${mine.ratios.collectionDays} días en pagar. Ese crédito lo financias tú.` });
  if (has("investigacion") && state.round <= 3 && !me.last?.research.consumer)
    tips.push({ level: "mejora", area: "Mercado", title: "Conoce a tu cliente", text: "El estudio del consumidor revela qué canales de publicidad rinden más en tu rubro." });
  if (b.igvCredit > d.r0 * 0.05)
    tips.push({ level: "bien", area: "Tributos", title: "Tienes crédito fiscal a favor", text: "Compraste más de lo que vendiste. Ese IGV se descuenta del que pagarás los próximos trimestres." });
  if (mine.income.net > 0 && mine.rank === 1)
    tips.push({ level: "bien", area: "Resultado", title: "Vas primero", text: "Sostén lo que funciona y vigila a quien viene detrás. El líder es el blanco de todos." });
  if (!tips.length)
    tips.push({ level: "bien", area: "Resultado", title: "Trimestre ordenado", text: "No hay alertas. Es buen momento para invertir en calidad, marca o expansión." });
  const order = { alerta: 0, mejora: 1, bien: 2 };
  return tips.sort((x, y) => order[x.level] - order[y.level]).slice(0, 4);
}

/** Resumen de un rival para la tabla de mercado. */
export function rivalSummary(state: GameState, c: CompanyResult) {
  const s = state.companies[c.idx];
  return {
    regions: (Object.keys(s.regions) as RegionId[]).filter((r) => s.regions[r]).length,
    products: (Object.keys(s.products) as ProductId[]).filter((p) => s.products[p].active).length,
  };
}
