import { hashSeed, makeRng, shuffle, type Rng } from "@/engine/rng";

export interface CalcProblem {
  id: string;
  topic: string;
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

const BUSINESSES = [
  "una pastelería de Trujillo",
  "una bodega de Villa El Salvador",
  "un taller de confecciones de Gamarra",
  "una cafetería de Arequipa",
  "una pollería de Huancayo",
  "una tienda en línea de Lima",
  "una agencia de turismo de Cusco",
  "una ferretería de Piura",
  "una academia de Chiclayo",
  "un gimnasio de Tacna",
  "una juguería de Iquitos",
  "una librería de Ayacucho",
];

const soles = (v: number) => `S/ ${v.toLocaleString("es-PE", { maximumFractionDigits: 2 })}`;
const num = (v: number) => v.toLocaleString("es-PE", { maximumFractionDigits: 2 });

/** Arma las cuatro alternativas sin repetir y devuelve la posición de la correcta. */
function build(rng: Rng, correct: string, wrong: string[]): { options: string[]; answer: number } {
  const unique = [...new Set(wrong.filter((w) => w !== correct))].slice(0, 3);
  let pad = 2;
  while (unique.length < 3) unique.push(`${correct} ×${pad++}`);
  const options = shuffle([correct, ...unique], rng);
  return { options, answer: options.indexOf(correct) };
}

type Maker = (rng: Rng, place: string) => Omit<CalcProblem, "id">;

const MAKERS: Maker[] = [
  // Punto de equilibrio en unidades
  (rng, place) => {
    const price = rng.pick([20, 25, 40, 50, 60, 80]);
    const variable = price * rng.pick([0.4, 0.5, 0.6]);
    const margin = price - variable;
    const units = rng.pick([200, 300, 400, 500, 600, 800]);
    const fixed = units * margin;
    const o = build(rng, `${num(units)} unidades`, [
      `${num(Math.round(fixed / price))} unidades`,
      `${num(Math.round(fixed / variable))} unidades`,
      `${num(units * 2)} unidades`,
    ]);
    return {
      topic: "Punto de equilibrio",
      q: `En ${place} los costos fijos del mes son ${soles(fixed)}. Cada unidad se vende a ${soles(price)} y su costo variable es ${soles(variable)}. ¿Cuántas unidades debe vender para no ganar ni perder?`,
      ...o,
      explain: `El margen de contribución por unidad es ${soles(price)} menos ${soles(variable)}, es decir ${soles(margin)}. Costos fijos entre margen: ${soles(fixed)} / ${soles(margin)} = ${num(units)} unidades.`,
    };
  },
  // Valor de venta a partir del precio con IGV
  (rng, place) => {
    const base = rng.pick([100, 200, 250, 400, 500, 1000, 1500]);
    const total = base * 1.18;
    const o = build(rng, soles(base), [soles(Math.round(total * 0.82 * 100) / 100), soles(Math.round((total - 18) * 100) / 100), soles(Math.round(total * 0.18 * 100) / 100)]);
    return {
      topic: "IGV",
      q: `${cap(place)} emite una factura por ${soles(total)} con el IGV incluido. ¿Cuál es el valor de venta, sin IGV?`,
      ...o,
      explain: `El precio incluye 18 % de IGV, así que se divide entre 1.18: ${soles(total)} / 1.18 = ${soles(base)}. Restar 18 % al total es el error más común.`,
    };
  },
  // Margen sobre el precio, no sobre el costo
  (rng, place) => {
    const cost = rng.pick([30, 40, 60, 75, 120]);
    const mk = rng.pick([0.25, 0.5, 1]);
    const price = cost * (1 + mk);
    const margin = Math.round(((price - cost) / price) * 1000) / 10;
    const o = build(rng, `${num(margin)} %`, [`${num(mk * 100)} %`, `${num(Math.round((cost / price) * 1000) / 10)} %`, `${num(Math.round(margin / 2))} %`]);
    return {
      topic: "Margen",
      q: `En ${place} un producto cuesta ${soles(cost)} y se vende a ${soles(price)} sin IGV. ¿Cuál es el margen bruto sobre el precio de venta?`,
      ...o,
      explain: `La ganancia es ${soles(price - cost)}. El margen se calcula sobre el precio: ${soles(price - cost)} / ${soles(price)} = ${num(margin)} %. El ${num(mk * 100)} % es el recargo sobre el costo, que es otra cosa.`,
    };
  },
  // Costo de adquisición de clientes
  (rng, place) => {
    const customers = rng.pick([20, 25, 40, 50, 80]);
    const cac = rng.pick([15, 20, 30, 45, 60]);
    const spend = customers * cac;
    const clicks = customers * rng.pick([10, 20]);
    const o = build(rng, soles(cac), [soles(Math.round((spend / clicks) * 100) / 100), soles(cac * 2), soles(Math.round((customers / spend) * 10000) / 100)]);
    return {
      topic: "Costo de adquisición",
      q: `${cap(place)} invirtió ${soles(spend)} en anuncios. Consiguió ${num(clicks)} visitas y ${num(customers)} clientes nuevos. ¿Cuánto le costó conseguir cada cliente?`,
      ...o,
      explain: `El costo de adquisición divide la inversión entre los clientes ganados, no entre las visitas: ${soles(spend)} / ${num(customers)} = ${soles(cac)}.`,
    };
  },
  // Efecto de un descuento sobre la ganancia por unidad
  (rng, place) => {
    const price = rng.pick([50, 80, 100, 200]);
    const cost = price * rng.pick([0.5, 0.6, 0.7]);
    const disc = rng.pick([0.1, 0.2]);
    const before = price - cost;
    const after = price * (1 - disc) - cost;
    const drop = Math.round((1 - after / before) * 100);
    const o = build(rng, `${drop} %`, [`${disc * 100} %`, `${Math.round(disc * 100 * 1.5)} %`, `${Math.min(95, drop + 25)} %`]);
    return {
      topic: "Descuentos",
      q: `En ${place} un producto se vende a ${soles(price)} y cuesta ${soles(cost)}. Si se ofrece un descuento de ${disc * 100} %, ¿en cuánto cae la ganancia por unidad?`,
      ...o,
      explain: `Antes ganaba ${soles(before)} por unidad. Con el descuento el precio baja a ${soles(price * (1 - disc))} y gana ${soles(after)}. La ganancia cae ${drop} %, mucho más que el descuento.`,
    };
  },
  // Interés simple
  (rng, place) => {
    const capital = rng.pick([5000, 10000, 20000, 30000]);
    const rate = rng.pick([0.02, 0.03, 0.04]);
    const months = rng.pick([3, 6, 12]);
    const interest = capital * rate * months;
    const o = build(rng, soles(interest), [soles(capital * rate), soles(capital * rate * months * 2), soles(capital + interest)]);
    return {
      topic: "Interés",
      q: `${cap(place)} toma un préstamo de ${soles(capital)} a una tasa de interés simple de ${num(rate * 100)} % mensual por ${months} meses. ¿Cuánto pagará solo de intereses?`,
      ...o,
      explain: `Interés simple: capital por tasa por tiempo. ${soles(capital)} × ${num(rate * 100)} % × ${months} = ${soles(interest)}.`,
    };
  },
  // Razón corriente
  (rng, place) => {
    const liab = rng.pick([20000, 40000, 50000, 80000]);
    const ratio = rng.pick([0.8, 1.2, 1.5, 2]);
    const assets = liab * ratio;
    const o = build(rng, num(ratio), [num(Math.round((liab / assets) * 100) / 100), num(ratio + 1), num(Math.round((assets - liab) / 1000))]);
    return {
      topic: "Liquidez",
      q: `${cap(place)} tiene activos corrientes por ${soles(assets)} y pasivos corrientes por ${soles(liab)}. ¿Cuál es su razón corriente?`,
      ...o,
      explain: `Razón corriente = activo corriente / pasivo corriente = ${soles(assets)} / ${soles(liab)} = ${num(ratio)}. ${ratio < 1 ? "Al ser menor que 1, no le alcanza para cubrir sus deudas de corto plazo." : "Por cada sol que debe a corto plazo tiene " + num(ratio) + " soles para cubrirlo."}`,
    };
  },
  // Retorno de la inversión publicitaria
  (rng, place) => {
    const spend = rng.pick([500, 1000, 2000, 4000]);
    const roas = rng.pick([2, 3, 4, 5]);
    const sales = spend * roas;
    const o = build(rng, `${roas} soles por cada sol invertido`, [
      `${roas - 1} soles por cada sol invertido`,
      `${num(Math.round((spend / sales) * 100) / 100)} soles por cada sol invertido`,
      `${roas * 10} soles por cada sol invertido`,
    ]);
    return {
      topic: "Retorno publicitario",
      q: `${cap(place)} invirtió ${soles(spend)} en una campaña que generó ventas por ${soles(sales)}. ¿Cuál fue el retorno de la inversión publicitaria (ROAS)?`,
      ...o,
      explain: `ROAS = ventas atribuidas / inversión = ${soles(sales)} / ${soles(spend)} = ${roas}. Ojo: es venta, no ganancia. Para saber si fue rentable hay que restar el costo de lo vendido.`,
    };
  },
  // Cuota de mercado
  (rng, place) => {
    const market = rng.pick([200000, 400000, 500000, 800000]);
    const share = rng.pick([0.05, 0.08, 0.12, 0.15, 0.25]);
    const sales = market * share;
    const o = build(rng, `${num(share * 100)} %`, [`${num(share * 1000)} %`, `${num(Math.round((market / sales) * 10) / 10)} %`, `${num(share * 100 + 10)} %`]);
    return {
      topic: "Cuota de mercado",
      q: `El mercado donde compite ${place} mueve ${soles(market)} al mes. La empresa vende ${soles(sales)}. ¿Cuál es su cuota de mercado?`,
      ...o,
      explain: `Cuota = ventas propias / ventas totales del mercado = ${soles(sales)} / ${soles(market)} = ${num(share * 100)} %.`,
    };
  },
  // Rotación de personal
  (rng, place) => {
    const staff = rng.pick([20, 25, 40, 50]);
    const left = rng.pick([2, 4, 5, 10]);
    const rate = Math.round((left / staff) * 1000) / 10;
    const o = build(rng, `${num(rate)} %`, [`${num(Math.round((staff / left) * 10) / 10)} %`, `${num(left)} %`, `${num(Math.round(rate * 2))} %`]);
    return {
      topic: "Rotación de personal",
      q: `${cap(place)} tuvo en promedio ${staff} trabajadores durante el año y ${left} renunciaron. ¿Cuál fue su tasa de rotación anual?`,
      ...o,
      explain: `Rotación = salidas / dotación promedio = ${left} / ${staff} = ${num(rate)} %. Cada salida cuesta reclutar, capacitar y perder productividad.`,
    };
  },
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Genera los problemas de cálculo del día. La misma fecha produce los mismos problemas. */
export function dailyCalc(day: string, count = 3): CalcProblem[] {
  const rng = makeRng(hashSeed("calc", day));
  const makers = shuffle(MAKERS, rng).slice(0, count);
  return makers.map((make, i) => ({ id: `calc-${day}-${i}`, ...make(rng, rng.pick(BUSINESSES)) }));
}
