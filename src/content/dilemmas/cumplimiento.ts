import type { Dilemma } from "../types";

const data: Dilemma[] = [
  // ───────────── TRIBUTARIO (20) ─────────────
  {
    id: "trib-descuento-sin-boleta",
    title: "Descuento a cambio de no pedir boleta",
    category: "tributario",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Un cliente frecuente quiere hacer una compra grande y te pide una rebaja «si lo dejamos sin boleta». Tu cajero comenta que varios negocios de la zona lo hacen y que así te ahorras el IGV. La venta te ayudaría a cerrar bien el mes.",
    options: [
      {
        id: "a",
        label: "Vender sin comprobante y con rebaja",
        detail: "Cierras la venta hoy, cobras en efectivo y ese ingreso no aparece en tu declaración.",
        effects: { cashPct: 3, reputation: -4 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -8, demandPct: -5, reputation: -8 },
          text: "Un fedatario de SUNAT hace una compra de verificación en tu local, levanta un acta y quedas expuesto a multa o cierre temporal.",
        },
        outcome:
          "La venta entró completa a la caja y el cliente se fue contento. Tu cajero entendió que vender sin boleta está permitido y empezó a hacerlo con otros clientes, así que tus registros de ventas e inventario dejaron de cuadrar.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Emitir boleta y mantener el precio de lista",
        detail: "Le explicas que el precio incluye IGV y que todas las ventas salen con comprobante.",
        effects: { reputation: 3 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -2 },
          text: "El cliente se molesta y hace la compra en un competidor informal de la misma cuadra.",
        },
        outcome:
          "Mantuviste la regla sin excepciones y tu equipo tomó nota. No cediste margen, aunque tampoco le diste al cliente una razón para preferirte frente al informal.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Emitir boleta y dar descuento por volumen",
        detail: "Sacrificas una parte del margen, pero la venta queda declarada y documentada.",
        effects: { cashPct: 1.5, satisfaction: 2, reputation: 3 },
        outcome:
          "El cliente aceptó el descuento por cantidad y se llevó su boleta. Ganaste menos por unidad, pero la venta quedó registrada, el inventario cuadra y el cliente volvió el mes siguiente.",
        verdict: "optima",
      },
    ],
    concept: "Obligación de emitir comprobante de pago",
    lesson:
      "El IGV no es ingreso tuyo, lo cobras por encargo del Estado. Un descuento comercial documentado es una decisión de precios legítima. Vender sin comprobante es evasión y expone al negocio a multa o cierre temporal.",
  },
  {
    id: "trib-credito-fiscal-gastos-personales",
    title: "Facturas del supermercado a nombre de la empresa",
    category: "tributario",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Un contador conocido te sugiere pedir factura con el RUC de la empresa en tus compras familiares: supermercado, cenas del fin de semana y la gasolina del auto de tu pareja. Así subiría tu crédito fiscal y pagarías menos IGV e impuesto a la renta.",
    options: [
      {
        id: "a",
        label: "Pedir factura por todos los gastos familiares",
        detail: "Cada compra de la casa entra a la contabilidad como si fuera gasto del negocio.",
        effects: { cashPct: 2, reputation: -3 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -7, reputation: -7 },
          text: "SUNAT revisa tus compras, repara los gastos que no tienen relación con el negocio y cobra el IGV y la renta omitidos con multa e intereses.",
        },
        outcome:
          "Durante unos meses pagaste menos impuestos. Tu estado de resultados ahora muestra gastos que no son del negocio, así que ya no sabes cuánto gana realmente la empresa.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Usar solo facturas de gastos del negocio",
        detail: "Tus gastos personales los pagas con tu sueldo o tus dividendos, fuera de la contabilidad.",
        effects: { reputation: 3 },
        outcome:
          "Pagaste el IGV que correspondía. Tus reportes reflejan el costo real de operar y, si llega una fiscalización, cada factura tiene una explicación sencilla.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Incluir solo la gasolina, que es difícil de rastrear",
        detail: "Registras el combustible de los autos de la familia como si fuera del reparto.",
        effects: { cashPct: 0.8 },
        risk: {
          prob: 0.2,
          effects: { cashPct: -3, reputation: -4 },
          text: "El consumo de combustible no guarda relación con los vehículos ni con las rutas de la empresa y SUNAT repara el gasto.",
        },
        outcome:
          "El ahorro fue pequeño. Quedó en tus libros un gasto que no podrías sustentar con hojas de ruta ni con vehículos a nombre de la empresa.",
        verdict: "riesgosa",
      },
    ],
    concept: "Crédito fiscal y principio de causalidad",
    lesson:
      "Un gasto da derecho a crédito fiscal y a deducción solo si es necesario para producir la renta del negocio. Mezclar gastos personales no es ahorro tributario, es una contingencia que además distorsiona tus números.",
  },
  {
    id: "trib-facturas-de-favor",
    title: "Te ofrecen facturas para bajar la utilidad",
    category: "tributario",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Cerca del cierre del año tu utilidad salió más alta de lo previsto. Un conocido te ofrece facturas de una empresa que «presta el servicio en el papel» a cambio de una comisión. Con eso bajarías el impuesto a la renta y ganarías crédito fiscal.",
    options: [
      {
        id: "a",
        label: "Comprar las facturas",
        detail: "Pagas la comisión, registras servicios que nunca recibiste y reduces la utilidad declarada.",
        effects: { cashPct: 5, reputation: -6 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -18, reputation: -15 },
          text: "SUNAT cruza información, comprueba que el proveedor no tiene personal ni local y califica las operaciones como no reales. Hay reparo, multa y denuncia por delito tributario.",
        },
        outcome:
          "El impuesto del año bajó. Desde entonces dependes del silencio de quien te vendió las facturas y de que nadie revise a ese proveedor durante los próximos años.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Pagar el impuesto que corresponde",
        detail: "Declaras la utilidad real y separas caja para la regularización anual.",
        effects: { reputation: 4 },
        outcome:
          "Pagaste un impuesto alto porque tuviste un buen año. Tus estados financieros limpios te sirvieron después para negociar una mejor tasa con el banco.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Adelantar gastos reales que el negocio necesita",
        detail: "Antes del cierre ejecutas la capacitación, el mantenimiento y las compras que ya tenías planeadas.",
        effects: { cashPct: -2, productivityPct: 3, quality: 2, reputation: 3 },
        outcome:
          "Los gastos fueron reales, quedaron sustentados y redujeron la utilidad del año de forma legítima. Además empezaste el nuevo ejercicio con equipos a punto y personal capacitado.",
        verdict: "optima",
      },
    ],
    concept: "Operaciones no reales y planeamiento tributario",
    lesson:
      "Planificar es elegir cuándo y cómo hacer gastos reales. Comprar facturas de operaciones inexistentes es fraude: se pierde el gasto y el crédito fiscal, se pagan multas y puede terminar en un proceso penal.",
  },
  {
    id: "trib-eleccion-de-regimen",
    title: "Enero: toca elegir régimen tributario",
    category: "tributario",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Empieza el año y tu contadora te recuerda que con la declaración de enero defines el régimen tributario. Tu negocio tiene márgenes ajustados, vende a empresas que exigen factura y proyectas crecer. Cada alternativa tiene una carga y unas obligaciones distintas.",
    options: [
      {
        id: "a",
        label: "Régimen Especial de Renta (RER)",
        detail: "Pagas cada mes una tasa fija sobre tus ingresos, ganes o pierdas, con pocos registros contables.",
        effects: { cashPct: -1.5, fixedCostPct: -1 },
        risk: {
          prob: 0.3,
          effects: { productivityPct: -2 },
          text: "Creces más de lo previsto, superas los topes del régimen y debes cambiarte a mitad de año con la contabilidad desordenada.",
        },
        outcome:
          "La contabilidad fue simple y barata. Como tu margen es ajustado, pagar sobre los ingresos te costó más que pagar sobre la utilidad, y en los meses malos el impuesto se pagó igual.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Régimen MYPE Tributario",
        detail: "Pagas según tu utilidad, con tasa reducida en el primer tramo, y llevas más registros contables.",
        effects: { cashPct: 1.5, fixedCostPct: 1 },
        outcome:
          "Con márgenes ajustados, tributar sobre la utilidad te resultó más barato. Pagaste un poco más por la contabilidad, que además te dio mejores reportes para decidir.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Régimen General",
        detail: "Llevas contabilidad completa y pagas la tasa general sobre toda la utilidad, sin topes de ingresos.",
        effects: { cashPct: -2.5, fixedCostPct: 2 },
        outcome:
          "Cumpliste sin problemas, pero pagaste 29.5 % desde el primer sol de utilidad y asumiste la mayor carga contable, sin recibir a cambio ningún beneficio que tu tamaño necesitara.",
        verdict: "mala",
      },
    ],
    concept: "Elección del régimen tributario",
    lesson:
      "El régimen se elige según margen, tamaño y tipo de cliente. El RER grava los ingresos. El MYPE Tributario grava la utilidad con 10 % hasta 15 UIT de renta neta. El Nuevo RUS no permite emitir facturas, por eso no sirve si vendes a empresas.",
  },
  {
    id: "trib-detraccion-al-proveedor",
    title: "El proveedor pide que no le detraigas",
    category: "tributario",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Contrataste un servicio sujeto al sistema de detracciones. El proveedor, una empresa pequeña de Arequipa, te pide que le pagues el total de la factura en su cuenta corriente porque la plata del Banco de la Nación «no le sirve para la planilla». A cambio te ofrece un descuento.",
    options: [
      {
        id: "a",
        label: "Pagarle el total y aceptar el descuento",
        detail: "No haces el depósito en su cuenta de detracciones y pagas menos por el servicio.",
        effects: { cashPct: 1 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -5, reputation: -5 },
          text: "SUNAT detecta que no hiciste el depósito. Te multa y no puedes usar el crédito fiscal de esa factura hasta regularizar.",
        },
        outcome:
          "El proveedor quedó agradecido y tú pagaste menos. La obligación de depositar era tuya, así que la contingencia quedó en tu empresa y no en la de él.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Depositar la detracción y pagar el saldo",
        detail: "Cumples con el depósito en el Banco de la Nación y le transfieres la diferencia en el plazo pactado.",
        effects: { reputation: 3 },
        risk: {
          prob: 0.25,
          effects: { quality: -2 },
          text: "El proveedor, incómodo, te quita prioridad y atiende primero a clientes que no le detraen.",
        },
        outcome:
          "Hiciste el depósito y conservaste el derecho al crédito fiscal desde el primer mes. El proveedor usó esos fondos para pagar sus propios tributos.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Depositar la detracción y adelantarle el saldo",
        detail: "Cumples con el depósito y le pagas el resto antes del vencimiento para aliviar su caja.",
        effects: { cashPct: -1, costPct: -1, reputation: 3 },
        outcome:
          "Cumpliste la norma y resolviste el problema real del proveedor, que era de liquidez. Te costó algo de caja este trimestre y a cambio te mantuvo el precio en el siguiente pedido.",
        verdict: "buena",
      },
    ],
    concept: "Sistema de detracciones",
    lesson:
      "En las detracciones el obligado a depositar es quien compra. Si no lo haces, la multa y la postergación del crédito fiscal recaen sobre ti. Los fondos detraídos sirven al proveedor para pagar sus tributos.",
  },
  {
    id: "trib-requerimiento-de-fiscalizacion",
    title: "Llega una carta de fiscalización de SUNAT",
    category: "tributario",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "SUNAT te notifica por el buzón electrónico el inicio de una fiscalización del impuesto a la renta del año pasado, con un requerimiento largo de libros, contratos y sustentos. Tu contador externo dice que puede armarlo «como sea» en pocos días. Sabes que hay gastos con sustento débil.",
    options: [
      {
        id: "a",
        label: "Entregar lo que haya en la fecha fijada",
        detail: "Tu contador presenta la documentación tal como está, sin revisar los puntos débiles.",
        effects: { cashPct: -0.5 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -8, reputation: -4 },
          text: "El auditor repara los gastos mal sustentados y determina tributo omitido, multa e intereses.",
        },
        outcome:
          "Cumpliste el plazo y gastaste poco. El expediente salió sin contratos ni informes que probaran que varios servicios se prestaron, y tuviste que responder nuevos requerimientos durante meses.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Pedir prórroga y contratar un especialista",
        detail: "Solicitas más plazo con sustento y un tributarista revisa cada punto antes de responder.",
        effects: { cashPct: -2.5, reputation: 3 },
        risk: {
          prob: 0.2,
          effects: { cashPct: -2 },
          text: "Aun con buen sustento, el auditor repara una parte menor de los gastos.",
        },
        outcome:
          "El especialista ordenó el expediente, consiguió contratos, correos y entregables, y reconoció a tiempo lo que no tenía defensa. La fiscalización cerró con observaciones acotadas.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rectificar los gastos dudosos antes de responder",
        detail: "Retiras por tu cuenta los gastos débiles y pagas la diferencia antes de entregar los papeles.",
        effects: { cashPct: -5, reputation: 2 },
        outcome:
          "Cerraste el proceso rápido y con la multa rebajada. Entre lo que retiraste había gastos que sí se podían defender, así que pagaste más impuesto del necesario.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "No responder y esperar que se archive",
        detail: "Dejas el requerimiento sin contestar en el buzón electrónico.",
        effects: {},
        risk: {
          prob: 0.8,
          effects: { cashPct: -12, reputation: -8 },
          text: "SUNAT te multa por no exhibir la documentación, determina la deuda con la información que tiene e inicia la cobranza.",
        },
        outcome:
          "La notificación por buzón electrónico surtió efecto aunque no la abrieras. Perdiste la oportunidad de explicar tus operaciones y de acogerte a rebajas.",
        verdict: "mala",
      },
    ],
    concept: "Procedimiento de fiscalización",
    lesson:
      "Una fiscalización se gana con documentos, no con apuro. Lo que prueba un gasto es el contrato, el entregable y el pago, no solo la factura. Revisa el buzón electrónico cada semana, porque los plazos corren desde la notificación.",
  },
  {
    id: "trib-acta-por-no-emitir-boleta",
    title: "El fedatario levantó un acta en tu local",
    category: "tributario",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Un sábado de alta venta tu cajera cobró sin emitir boleta y el comprador resultó ser un fedatario fiscalizador de SUNAT, que levantó un acta probatoria. Es la primera vez que te pasa. Tu abogado dice que se puede pelear porque «el sistema estaba lento».",
    options: [
      {
        id: "a",
        label: "Reconocer la infracción y capacitar a caja",
        detail: "Presentas el reconocimiento dentro del plazo y refuerzas el procedimiento de cobro.",
        effects: { cashPct: -0.5, productivityPct: 1, reputation: 2 },
        outcome:
          "Al ser la primera vez y reconocer a tiempo, el régimen de gradualidad te libró de la sanción más dura. Pusiste una regla simple en caja: primero el comprobante, después el vuelto.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Reclamar el acta con tu abogado",
        detail: "Discutes la infracción con el argumento de la falla del sistema y pagas honorarios.",
        effects: { cashPct: -1.5 },
        risk: {
          prob: 0.7,
          effects: { cashPct: -4, demandPct: -6, reputation: -5 },
          text: "El reclamo no prospera, pierdes la rebaja y el local cierra unos días con el cartel de SUNAT en la puerta.",
        },
        outcome:
          "El acta de un fedatario es un documento difícil de desvirtuar. Gastaste en abogado y dedicaste tiempo de gerencia a una discusión con pocas opciones de ganar.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "No hacer nada y seguir trabajando",
        detail: "Guardas el acta en un cajón y esperas a ver si llega algo más.",
        effects: {},
        risk: {
          prob: 0.6,
          effects: { cashPct: -3, demandPct: -6, reputation: -5 },
          text: "Llega la resolución de cierre temporal. Los clientes ven el cartel de clausura y tu planilla se paga igual durante esos días.",
        },
        outcome:
          "Dejaste vencer el plazo para reconocer la infracción. Además, nadie corrigió la costumbre de cobrar sin comprobante, así que una segunda acta es cuestión de tiempo.",
        verdict: "mala",
      },
    ],
    concept: "Gradualidad y cierre temporal de local",
    lesson:
      "Las sanciones tributarias se gradúan: quien reconoce y corrige pronto recibe una sanción menor que quien reincide o deja vencer los plazos. El costo de un cierre no es solo la multa, también las ventas perdidas y la imagen.",
  },
  {
    id: "trib-fraccionamiento-de-deuda",
    title: "Deuda tributaria que no puedes pagar al contado",
    category: "tributario",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Después de dos trimestres flojos acumulaste una deuda de IGV y renta que no puedes pagar de una sola vez. SUNAT ya te notificó el inicio de la cobranza coactiva. Tu banco te ofrece un préstamo y tu contador propone pedir un fraccionamiento.",
    options: [
      {
        id: "a",
        label: "Solicitar fraccionamiento a SUNAT",
        detail: "Reconoces la deuda y la pagas en cuotas mensuales con interés.",
        effects: { cashPct: -2, fixedCostPct: 1.5, reputation: 2, rounds: 3 },
        risk: {
          prob: 0.2,
          effects: { cashPct: -4 },
          text: "Un mes malo te atrasas en las cuotas, pierdes el fraccionamiento y la deuda completa vuelve a cobranza.",
        },
        outcome:
          "La cobranza coactiva se detuvo y la deuda quedó ordenada en cuotas que tu flujo puede pagar. Ahora la cuota de SUNAT es un gasto fijo más que debes cuidar cada mes.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Tomar el préstamo bancario y pagar todo",
        detail: "Cancelas la deuda tributaria hoy y pasas a deberle al banco.",
        effects: { cashPct: -1, fixedCostPct: 2, reputation: 3, rounds: 4 },
        outcome:
          "Quedaste al día con SUNAT y sin riesgo de embargo. Cambiaste una deuda por otra: conviene solo si la tasa del banco es menor que el interés moratorio, y en tu caso la diferencia fue pequeña.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Pagar primero a proveedores y planilla",
        detail: "Dejas la deuda tributaria para después y usas la caja en lo que mantiene la operación.",
        effects: { cashPct: 3 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -9, productivityPct: -5, reputation: -7 },
          text: "El ejecutor coactivo embarga tus cuentas bancarias y ordena a tus clientes retener lo que te deben.",
        },
        outcome:
          "Ganaste unas semanas de aire. La deuda siguió creciendo con intereses y el procedimiento de cobranza continuó su curso sin que nadie lo atendiera.",
        verdict: "mala",
      },
    ],
    concept: "Fraccionamiento y cobranza coactiva",
    lesson:
      "La deuda tributaria no desaparece por ignorarla: genera intereses y puede terminar en embargo de cuentas. El fraccionamiento la convierte en un compromiso mensual, que solo funciona si lo incluyes en tu presupuesto de caja.",
  },
  {
    id: "trib-pagos-a-cuenta-en-caida",
    title: "Pagos a cuenta altos con ventas en caída",
    category: "tributario",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "El año pasado fue muy bueno y tus pagos a cuenta del impuesto a la renta se calculan con ese resultado. Este año los márgenes cayeron y proyectas cerrar casi sin utilidad, pero cada mes sigues adelantando impuesto como si ganaras igual. La caja lo está sintiendo.",
    options: [
      {
        id: "a",
        label: "Seguir pagando y pedir devolución después",
        detail: "Mantienes los pagos a cuenta y recuperas el exceso con la declaración anual.",
        effects: { cashPct: -4, reputation: 1 },
        outcome:
          "Cumpliste sin contingencias. Terminaste el año con un saldo a favor grande: dinero tuyo que estuvo inmovilizado muchos meses mientras pagabas intereses por un sobregiro.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Solicitar la modificación de los pagos a cuenta",
        detail: "Presentas estados financieros a la fecha de corte que fija la norma para sustentar un pago menor.",
        effects: { cashPct: -0.8, reputation: 2 },
        outcome:
          "Tu contadora preparó el balance de corte y los pagos a cuenta bajaron para el resto del año. Pagaste honorarios por el cierre intermedio y liberaste caja sin incumplir nada.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Dejar de pagarlos por tu cuenta",
        detail: "Suspendes los pagos sin trámite, con el argumento de que al final no habrá impuesto.",
        effects: { cashPct: 3 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -5, reputation: -5 },
          text: "SUNAT emite órdenes de pago por cada mes omitido y cobra intereses moratorios, aunque al cierre del año no tengas impuesto por pagar.",
        },
        outcome:
          "La caja respiró unos meses. El pago a cuenta es una obligación independiente del resultado final, y dejar de pagarlo sin el procedimiento genera deuda exigible.",
        verdict: "mala",
      },
    ],
    concept: "Pagos a cuenta del impuesto a la renta",
    lesson:
      "Los pagos a cuenta son adelantos mensuales del impuesto anual, calculados con tu historia. Si el negocio cambió, la norma permite modificarlos o suspenderlos con estados financieros de corte. Hacerlo por tu cuenta genera intereses.",
  },
  {
    id: "trib-libros-contables-atrasados",
    title: "Tus registros contables llevan meses de atraso",
    category: "tributario",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Cambias de contador y el nuevo descubre que los registros de ventas y compras llevan cinco meses sin actualizar y que varias facturas de compra nunca se anotaron. El contador anterior cobraba muy barato. Ponerse al día cuesta tiempo y dinero.",
    options: [
      {
        id: "a",
        label: "Regularizar todo ahora",
        detail: "Pagas horas adicionales para reconstruir los registros y conciliar bancos e inventarios.",
        effects: { cashPct: -2, productivityPct: 2, reputation: 3 },
        outcome:
          "En seis semanas los registros quedaron al día. Aparecieron facturas de compra cuyo crédito fiscal no habías usado y, por primera vez en meses, supiste cuánto ganabas.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Ponerse al día de a pocos",
        detail: "El nuevo contador avanza cuando tiene tiempo, sin costo adicional.",
        effects: { cashPct: -0.8 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -4, reputation: -4 },
          text: "SUNAT te requiere los registros y los encuentra con atraso mayor al permitido. Hay multa y semanas de gerencia respondiendo.",
        },
        outcome:
          "El atraso se redujo lentamente. Mientras tanto seguiste decidiendo precios y compras con cifras de hace medio año.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Volver con el contador barato",
        detail: "Ahorras en honorarios y le pides que esta vez sí cumpla.",
        effects: { fixedCostPct: -1 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -6, reputation: -5 },
          text: "Las declaraciones salen con errores, se vencen plazos y se acumulan multas que cuestan varias veces lo ahorrado en honorarios.",
        },
        outcome:
          "El honorario bajó, el servicio también. La contabilidad siguió siendo un trámite para cumplir y no una fuente de información para dirigir la empresa.",
        verdict: "mala",
      },
    ],
    concept: "Libros y registros contables al día",
    lesson:
      "La contabilidad atrasada cuesta dos veces: por las multas y porque decides a ciegas. Un buen servicio contable no es un gasto que se recorta primero, es el tablero de control del negocio.",
  },
  {
    id: "trib-retencion-recibo-honorarios",
    title: "El consultor no quiere que le retengas",
    category: "tributario",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Contratas a un consultor independiente por un monto importante. Te emite recibo por honorarios y te pide que le pagues el total sin retención porque «ya tramitará su suspensión». Todavía no tiene la constancia y tu empresa es agente de retención.",
    options: [
      {
        id: "a",
        label: "Pagarle completo confiando en su palabra",
        detail: "No retienes el impuesto y esperas que luego te envíe la constancia de suspensión.",
        effects: { quality: 1 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -2.5, reputation: -3 },
          text: "La constancia nunca llega. SUNAT detecta la retención omitida y pagas multa e intereses por un impuesto que ni siquiera era tuyo.",
        },
        outcome:
          "El consultor empezó motivado y cobró completo. La responsabilidad por no retener quedó en tu empresa, no en él.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Retener y pagarle el neto",
        detail: "Aplicas la retención y la declaras en tu planilla electrónica del mes.",
        effects: { reputation: 2 },
        risk: {
          prob: 0.2,
          effects: { quality: -2 },
          text: "El consultor, incómodo por recibir menos, entrega el trabajo con menor dedicación.",
        },
        outcome:
          "Cumpliste como agente de retención. Al consultor le explicaste que lo retenido es un pago a cuenta de su propio impuesto, que podrá usar en su declaración anual.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Pedir la constancia antes de pagar",
        detail: "Le das unos días para tramitar la suspensión en línea. Si no la presenta, retienes.",
        effects: { reputation: 3 },
        outcome:
          "El consultor hizo el trámite por internet en una tarde y te envió la constancia. Le pagaste el total con respaldo y la regla quedó escrita para los próximos contratos.",
        verdict: "optima",
      },
    ],
    concept: "Retención de renta de cuarta categoría",
    lesson:
      "Al pagar honorarios a un independiente, la empresa debe retener parte del pago como adelanto del impuesto del trabajador, salvo que este presente su constancia de suspensión. Sin constancia, la omisión la paga quien debió retener.",
  },
  {
    id: "trib-proveedor-sin-factura",
    title: "El proveedor informal cobra menos, pero sin factura",
    category: "tributario",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Un proveedor informal te ofrece los mismos insumos a un precio 12 % menor que tu proveedor formal, pero no entrega factura ni guía de remisión. Tu jefe de compras quiere cambiarse ya, porque el costo es lo que más pesa en tu margen.",
    options: [
      {
        id: "a",
        label: "Cambiarte al proveedor informal",
        detail: "Pagas menos en cada compra, sin comprobantes que respalden el costo.",
        effects: { cashPct: 1.5, reputation: -3 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -6, reputation: -5 },
          text: "En un control en carretera incautan la mercadería que viajaba sin guía de remisión, y al cierre del año no puedes deducir esas compras.",
        },
        outcome:
          "Pagaste menos al comprar. Sin factura perdiste el crédito fiscal del IGV y la deducción del costo, así que al hacer la cuenta completa el insumo informal resultó más caro que el formal.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Seguir con el proveedor formal",
        detail: "Mantienes el precio actual, con factura y guía en cada despacho.",
        effects: { reputation: 2 },
        outcome:
          "Tu costo no cambió y tus compras siguieron sustentadas. Dejaste pasar la oportunidad de usar la oferta como argumento para negociar.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Negociar con el formal usando la oferta",
        detail: "Le muestras la diferencia de precios y pides un descuento por volumen o por pago puntual.",
        effects: { costPct: -2, reputation: 2, rounds: 2 },
        outcome:
          "Tu proveedor no igualó el precio, pero mejoró su oferta a cambio de un compromiso de compra. Bajaste el costo y conservaste el crédito fiscal.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Comprarle al informal si se formaliza",
        detail: "Le ofreces un contrato de compra si obtiene RUC y emite factura y guía electrónicas.",
        effects: { cashPct: -0.5, costPct: -3, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { productivityPct: -3 },
          text: "El proveedor demora en formalizarse y en ordenar sus despachos, y te deja sin insumos unas semanas.",
        },
        outcome:
          "El proveedor aceptó el reto porque tu pedido le aseguraba ventas. Ya con factura su precio subió un poco, aunque siguió por debajo del que pagabas.",
        verdict: "riesgosa",
      },
    ],
    concept: "Costo real de comprar sin comprobante",
    lesson:
      "Para comparar precios hay que mirar el costo después de impuestos. Una compra sin factura pierde el crédito fiscal del IGV (18 %) y no se deduce del impuesto a la renta, por eso lo barato sin comprobante suele salir caro.",
  },
  {
    id: "trib-pago-en-efectivo-bancarizacion",
    title: "Descuento por pagar en efectivo una compra grande",
    category: "tributario",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Un proveedor de Huancayo te ofrece un descuento si le pagas en efectivo una compra de monto alto, porque «no quiere pasar por el banco». La factura sí te la entrega. Tu administradora advierte que el monto supera el límite desde el cual la ley exige usar medios de pago.",
    options: [
      {
        id: "a",
        label: "Pagar en efectivo y tomar el descuento",
        detail: "Retiras el dinero del banco y lo entregas contra la factura.",
        effects: { cashPct: 1.5 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -5, reputation: -4 },
          text: "SUNAT desconoce el gasto y el crédito fiscal de esa factura porque el pago no se hizo con un medio de pago.",
        },
        outcome:
          "Conseguiste el descuento. Tienes una factura válida y ninguna prueba bancaria de haberla pagado, y llevar ese efectivo por la carretera también fue un riesgo.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Partir el pago en varias entregas en efectivo",
        detail: "Divides la compra en pagos pequeños para que ninguno llegue al límite.",
        effects: { cashPct: 1.5 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -5, reputation: -4 },
          text: "El auditor suma los pagos: el límite se mide sobre el monto total de la operación, no sobre cada entrega. Repara el gasto y el crédito fiscal.",
        },
        outcome:
          "Parecía una salida ingeniosa. La obligación era una sola y superaba el límite, así que cada pago parcial también debía hacerse por el banco.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Pagar por transferencia, sin descuento",
        detail: "Transfieres el monto completo a la cuenta del proveedor.",
        effects: { reputation: 2 },
        outcome:
          "Pagaste precio completo y quedó el rastro bancario que respalda el gasto. El proveedor aceptó, aunque a regañadientes.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Transferir y negociar pronto pago",
        detail: "Ofreces pagar por el banco el mismo día de la entrega a cambio de una rebaja.",
        effects: { cashPct: 0.8, reputation: 2 },
        outcome:
          "Al proveedor le interesaba cobrar rápido más que cobrar en billetes. Aceptó una rebaja menor por pago inmediato y tu gasto quedó sustentado.",
        verdict: "optima",
      },
    ],
    concept: "Bancarización y medios de pago",
    lesson:
      "Las operaciones que superan el monto fijado por ley deben pagarse con medios del sistema financiero. Si no, el gasto y el crédito fiscal se pierden aunque la factura sea real. Fraccionar el pago en efectivo no evita la regla.",
  },
  {
    id: "trib-subvaluar-importacion",
    title: "El tramitador propone declarar menos valor en aduana",
    category: "tributario",
    industries: ["moda", "ecommerce", "maquinaria", "autos", "gimnasio", "telecom", "minimarket"],
    market: "all",
    tier: 3,
    situation:
      "Vas a importar un lote desde Asia para la campaña navideña. Un tramitador te propone que el proveedor emita la factura comercial por la mitad del valor real, para pagar menos tributos de importación. Asegura que en el rubro es lo normal y que la carga casi nunca pasa por revisión.",
    options: [
      {
        id: "a",
        label: "Declarar el valor real",
        detail: "Pagas los tributos de importación completos con un agente de aduana formal.",
        effects: { cashPct: -3, reputation: 3 },
        outcome:
          "La carga salió del puerto a tiempo para la campaña. El IGV que pagaste en la importación lo usaste como crédito fiscal contra el IGV de tus ventas.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Declarar la mitad del valor",
        detail: "Presentas la factura rebajada y pagas tributos sobre ese monto.",
        effects: { cashPct: -1.5, reputation: -4 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -15, demandPct: -8, reputation: -12 },
          text: "Aduanas duda del valor declarado, inmoviliza la carga en plena campaña e inicia un proceso por defraudación de rentas de aduana.",
        },
        outcome:
          "Pagaste menos en el despacho. Tu costo contable quedó por debajo del real, así que tu utilidad tributaria aumenta y pagarás más impuesto a la renta al vender.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Declarar el valor real y usar un tratado comercial",
        detail: "Pides al proveedor el certificado de origen para acogerte a la preferencia arancelaria.",
        effects: { cashPct: -2, reputation: 3 },
        risk: {
          prob: 0.2,
          effects: { cashPct: -1 },
          text: "El certificado de origen llega con errores y debes pagar el arancel completo mientras se corrige.",
        },
        outcome:
          "Con el certificado de origen el arancel bajó de forma legal. Te tomó una semana más de coordinación con el proveedor, que valió la pena.",
        verdict: "optima",
      },
    ],
    concept: "Valoración aduanera",
    lesson:
      "El valor en aduana debe ser el precio realmente pagado. El IGV de importación se recupera como crédito fiscal y los tratados comerciales pueden reducir el arancel. Subvaluar es un delito aduanero y pone en riesgo toda la carga.",
  },
  {
    id: "trib-percepciones-mal-registradas",
    title: "Las percepciones del IGV que nadie estaba usando",
    category: "tributario",
    industries: ["minimarket", "restaurante", "cafeteria", "pasteleria", "bebidas"],
    market: "all",
    tier: 2,
    situation:
      "Revisando facturas notas que tu distribuidor mayorista te cobra una percepción del IGV en cada compra. Tu asistente contable las ha registrado como parte del costo de la mercadería durante más de un año. Nunca se descontaron del IGV por pagar.",
    options: [
      {
        id: "a",
        label: "Corregir y aplicarlas contra el IGV mensual",
        detail: "Ordenas los registros y usas el saldo acumulado para pagar menos IGV en los próximos meses.",
        effects: { cashPct: 2.5, reputation: 1 },
        outcome:
          "El saldo de percepciones cubrió buena parte del IGV de los siguientes meses. Además tu costo de ventas bajó en los reportes, porque ya no incluía un impuesto que era recuperable.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Solicitar la devolución del saldo",
        detail: "Pides a SUNAT que te devuelva las percepciones no aplicadas, lo que abre una verificación.",
        effects: { cashPct: 3 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -2, reputation: -2 },
          text: "La verificación previa a la devolución encuentra otros errores en tus registros y debes pagar diferencias.",
        },
        outcome:
          "El trámite tomó varios meses. La devolución era tu derecho, pero pedirla con la contabilidad desordenada fue invitar a una revisión antes de estar listo.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Dejarlo así y subir precios",
        detail: "Tratas la percepción como un costo más y lo trasladas al cliente.",
        effects: { demandPct: -3, rounds: 2 },
        outcome:
          "Subiste precios para cubrir un costo que no existía. Perdiste clientes frente a competidores que sí aplican sus percepciones, y seguiste pagando el IGV dos veces.",
        verdict: "mala",
      },
    ],
    concept: "Percepciones del IGV",
    lesson:
      "La percepción es un cobro adelantado de tu propio IGV, no un costo. Se descuenta del impuesto por pagar cada mes. Si la registras como costo, pagas el impuesto dos veces y tomas decisiones de precio con cifras infladas.",
  },
  {
    id: "trib-sistema-de-facturacion-caido",
    title: "Se cae la facturación electrónica en plena campaña",
    category: "tributario",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Es la víspera del Día de la Madre, el local está lleno y el sistema de facturación electrónica deja de funcionar. El proveedor del software dice que tardará unas horas. Los clientes hacen cola y algunos empiezan a irse.",
    options: [
      {
        id: "a",
        label: "Seguir vendiendo y anotar en un cuaderno",
        detail: "Cobras sin entregar comprobante y prometes enviarlo cuando vuelva el sistema.",
        effects: { satisfaction: -2 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -5, reputation: -6 },
          text: "Un cliente molesto por no recibir su boleta te denuncia y SUNAT verifica ventas sin comprobante.",
        },
        outcome:
          "No perdiste ventas. Al día siguiente el cuaderno tenía montos sin nombre ni detalle, y reconstruir los comprobantes tomó más tiempo que la caída del sistema.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Usar comprobantes de contingencia",
        detail: "Emites los comprobantes impresos autorizados para emergencias y después los informas a SUNAT.",
        effects: { productivityPct: -2, satisfaction: 1, reputation: 2 },
        outcome:
          "La cola avanzó más lento porque se llenaba a mano, pero cada cliente salió con su comprobante. Cuando volvió el sistema informaste lo emitido y todo quedó en regla.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Detener la venta hasta que vuelva el sistema",
        detail: "Cierras caja y pides a los clientes que regresen más tarde.",
        effects: { cashPct: -3, satisfaction: -4, reputation: 1 },
        outcome:
          "No cometiste ninguna infracción, pero perdiste las mejores horas de la campaña. Existía una salida legal para seguir vendiendo y nadie en el local la conocía.",
        verdict: "mala",
      },
    ],
    concept: "Comprobantes de contingencia",
    lesson:
      "Todo emisor electrónico debe tener un plan para cuando el sistema falla. Los comprobantes de contingencia permiten seguir vendiendo de forma legal. La continuidad del negocio se prepara antes de la campaña, no durante.",
  },
  {
    id: "trib-devolucion-y-nota-de-credito",
    title: "El cliente devolvió mercadería ya facturada",
    category: "tributario",
    industries: "all",
    market: "B2B",
    tier: 1,
    situation:
      "Una empresa cliente te devuelve la mitad de un pedido facturado el mes pasado por un error en las especificaciones. Ya declaraste esa venta y pagaste el IGV. Tu vendedor propone arreglarlo «por fuera»: devolverle el dinero y no tocar los papeles para no complicarse.",
    options: [
      {
        id: "a",
        label: "Devolver el dinero sin tocar los papeles",
        detail: "Haces la transferencia al cliente y la factura original queda como está.",
        effects: { cashPct: -1.5, satisfaction: 2 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -1.5, reputation: -3 },
          text: "Tu inventario y tus ventas declaradas ya no cuadran, y el cliente reclama porque en su contabilidad figura una compra que no recibió.",
        },
        outcome:
          "El cliente recuperó su dinero rápido. Tú pagaste IGV e impuesto a la renta por una venta que ya no existe, y nadie puede explicar la salida de caja.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Emitir nota de crédito por la devolución",
        detail: "Documentas la devolución, ajustas la venta y reingresas la mercadería al almacén.",
        effects: { cashPct: -0.8, satisfaction: 3, reputation: 2 },
        outcome:
          "La nota de crédito redujo tu venta y tu IGV del mes. El cliente ajustó su crédito fiscal y el almacén registró el reingreso, así que todos los registros cuadran.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Reponer el pedido con lo correcto",
        detail: "Envías los productos con la especificación correcta y documentas el cambio.",
        effects: { cashPct: -1, satisfaction: 2, reputation: 1 },
        outcome:
          "El cliente recibió lo que necesitaba y la venta se mantuvo. Asumiste el flete de ida y vuelta, y revisaste con ventas cómo se toman los pedidos.",
        verdict: "buena",
      },
    ],
    concept: "Nota de crédito",
    lesson:
      "Una venta que se anula o se reduce se corrige con una nota de crédito. Ese documento ajusta tu ingreso y tu IGV, y también la contabilidad del cliente. Arreglarlo por fuera deja impuestos pagados de más y registros que no cuadran.",
  },
  {
    id: "trib-ventas-por-yape-personal",
    title: "Las ventas caen en el Yape personal del dueño",
    category: "tributario",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Muchos de tus clientes pagan con Yape o Plin y, por costumbre, todo cae en tu cuenta personal. Tu contadora solo declara lo que pasa por la cuenta de la empresa. Te advierte que las entidades financieras reportan información a SUNAT y que tus abonos ya no guardan relación con lo que declaras.",
    options: [
      {
        id: "a",
        label: "Seguir igual, son montos chicos",
        detail: "Mantienes los cobros en tu cuenta personal y declaras solo lo de la cuenta de la empresa.",
        effects: { cashPct: 2, reputation: -3 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -9, reputation: -8 },
          text: "SUNAT detecta abonos que no guardan relación con lo declarado y presume ventas omitidas. Cobra tributo, multa e intereses.",
        },
        outcome:
          "Pagaste menos impuestos este trimestre. Tampoco sabes cuánto vende realmente el negocio, porque la plata de la empresa y la de la casa están en la misma cuenta.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Pasar los cobros a una cuenta de la empresa",
        detail: "Cambias los códigos QR a nombre del negocio y emites comprobante por cada cobro.",
        effects: { cashPct: -0.5, productivityPct: 2, reputation: 4 },
        outcome:
          "El cierre diario de caja ahora coincide con el banco y con las boletas emitidas. Con ventas declaradas, tu empresa empezó a calificar para un crédito con mejor tasa.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Declarar un poco más, sin cambiar las cuentas",
        detail: "Subes el monto declarado de forma aproximada y sigues cobrando en tu cuenta personal.",
        effects: { cashPct: 1 },
        risk: {
          prob: 0.2,
          effects: { cashPct: -5, reputation: -5 },
          text: "En una revisión no puedes explicar qué abonos de tu cuenta son ventas y cuáles son personales.",
        },
        outcome:
          "La diferencia se redujo, pero declaras por estimación. Sin comprobante por cada cobro no hay forma de demostrar que el monto declarado es el correcto.",
        verdict: "riesgosa",
      },
    ],
    concept: "Separar las cuentas del dueño y del negocio",
    lesson:
      "La empresa y el dueño son bolsillos distintos. Los cobros digitales dejan huella, así que todo ingreso del negocio debe entrar a una cuenta del negocio y tener comprobante. Ventas declaradas también significan acceso a crédito formal.",
  },
  {
    id: "trib-gastos-de-representacion",
    title: "La gran cena para clientes y el límite deducible",
    category: "tributario",
    industries: "all",
    market: "B2B",
    tier: 3,
    situation:
      "Tu gerente comercial quiere cerrar el año con una cena de gala y regalos para los principales clientes. Tu contadora advierte que los gastos de representación solo se deducen hasta un límite ligado a tus ingresos y que ya estás cerca del tope. El exceso no reduce el impuesto a la renta.",
    options: [
      {
        id: "a",
        label: "Hacer el evento completo y asumir el exceso",
        detail: "Inviertes en la relación con los clientes sabiendo que una parte no será deducible.",
        effects: { cashPct: -4, demandPct: 3, brand: 4 },
        outcome:
          "El evento fortaleció la relación con tus cuentas principales. Tu contadora sumó el exceso a la utilidad tributaria, así que la cena costó más de lo que decía el presupuesto.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Ajustar el evento al límite deducible",
        detail: "Reduces la lista de invitados a las cuentas clave y simplificas los regalos.",
        effects: { cashPct: -2, demandPct: 2, brand: 2 },
        outcome:
          "Invitaste solo a los clientes que explican la mayor parte de tus ventas. El gasto completo fue deducible y el efecto comercial fue casi el mismo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Registrar todo como publicidad",
        detail: "Clasificas la cena y los regalos como gasto publicitario, que no tiene tope.",
        effects: { cashPct: -3.5, demandPct: 3, brand: 4 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -4, reputation: -5 },
          text: "SUNAT reclasifica el gasto como representación, porque estaba dirigido a clientes específicos y no al público, y repara el exceso con multa.",
        },
        outcome:
          "En el papel todo fue deducible. La lista de invitados con nombre y apellido es justamente la prueba de que no era publicidad masiva.",
        verdict: "riesgosa",
      },
    ],
    concept: "Gastos deducibles sujetos a límite",
    lesson:
      "No todo gasto real es deducible por completo. Algunos, como los de representación, tienen tope. El exceso se puede gastar, pero su costo real es mayor porque no reduce el impuesto. Eso debe entrar en el presupuesto comercial.",
  },
  {
    id: "trib-error-en-declaracion-pasada",
    title: "Descubres un error en una declaración ya presentada",
    category: "tributario",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Al conciliar cuentas, tu contadora descubre que hace cuatro meses se registró dos veces la misma factura de compra, así que pagaste menos IGV del que correspondía. Nadie lo ha notado. Corregirlo significa pagar la diferencia con intereses y una multa.",
    options: [
      {
        id: "a",
        label: "Rectificar y pagar de forma voluntaria",
        detail: "Presentas la declaración rectificatoria y pagas la diferencia antes de cualquier notificación.",
        effects: { cashPct: -1.5, reputation: 3 },
        outcome:
          "Por corregir antes de que SUNAT te notificara, la multa se redujo casi por completo. Pagaste la diferencia con intereses de pocos meses y cerraste el tema.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Esperar, tal vez nadie lo note",
        detail: "Dejas la declaración como está y guardas el dato por si acaso.",
        effects: {},
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, reputation: -4 },
          text: "SUNAT detecta la factura duplicada al cruzar comprobantes electrónicos. La rebaja de la multa es menor y los intereses siguieron corriendo.",
        },
        outcome:
          "No salió dinero de la caja. Como las facturas son electrónicas, SUNAT tiene la misma información que tú y puede encontrar el duplicado en cualquier momento.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Compensarlo omitiendo una compra futura",
        detail: "Dejas de anotar una factura de compra de este mes para que el saldo quede parejo.",
        effects: { cashPct: -0.5 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, reputation: -4 },
          text: "Una revisión encuentra dos periodos con errores en lugar de uno, y el periodo original sigue con tributo omitido.",
        },
        outcome:
          "El saldo total parecía cuadrar, pero cada mes se declara por separado. El error original siguió generando intereses y creaste uno nuevo.",
        verdict: "mala",
      },
    ],
    concept: "Declaración rectificatoria voluntaria",
    lesson:
      "Los errores en declaraciones se corrigen en el periodo en que ocurrieron, con una rectificatoria. Hacerlo de forma voluntaria y pagar antes de una notificación reduce mucho la multa. Esperar solo suma intereses.",
  },
  // ───────────── LEGAL (15) ─────────────
  {
    id: "legal-libro-de-reclamaciones",
    title: "Un cliente molesto pide el libro de reclamaciones",
    category: "legal",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Un cliente reclama en voz alta por un pedido que llegó en mal estado y pide el libro de reclamaciones. Tu encargada te llama: el libro está guardado en la oficina y el aviso no está a la vista. Ella sugiere decirle que el libro «se está renovando» y ofrecerle un vale para calmarlo.",
    options: [
      {
        id: "a",
        label: "Decir que no está disponible y dar un vale",
        detail: "Evitas que el reclamo quede escrito y compensas al cliente con un descuento futuro.",
        effects: { cashPct: -0.3, satisfaction: -3 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -5, brand: -3, reputation: -7 },
          text: "El cliente graba la escena, la publica en redes y denuncia ante Indecopi. Llega una inspección y una multa por negar el libro.",
        },
        outcome:
          "El cliente aceptó el vale de mala gana y se fue. El problema que originó el reclamo no quedó registrado en ningún lado, así que nadie lo corrigió.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Entregar el libro y responder en el plazo",
        detail: "El cliente registra su reclamo y tú le respondes por escrito dentro del plazo legal.",
        effects: { cashPct: -0.5, satisfaction: 2, reputation: 3 },
        outcome:
          "El cliente escribió su reclamo y se llevó su copia. Le respondiste por escrito con una solución. Cumpliste, aunque él se fue molesto ese día.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Entregar el libro y resolver en el momento",
        detail: "Registras el reclamo, cambias el pedido ahí mismo y dejas constancia de la solución.",
        effects: { cashPct: -1, brand: 1, satisfaction: 5, reputation: 4 },
        outcome:
          "El reclamo quedó escrito junto con la solución. El cliente, que había entrado gritando, se fue con su pedido nuevo. Colocaste el aviso del libro en un lugar visible.",
        verdict: "optima",
      },
    ],
    concept: "Libro de reclamaciones",
    lesson:
      "El libro de reclamaciones es obligatorio y debe estar disponible con su aviso visible. Negarlo suele costar más que el reclamo mismo. Bien usado, es una fuente gratuita de información sobre las fallas del servicio.",
  },
  {
    id: "legal-promocion-con-letra-chica",
    title: "Hasta 70 % de descuento, pero en dos productos",
    category: "legal",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Para el Cyber Wow tu agencia propone anunciar «Hasta 70 % de descuento en toda la tienda». En realidad solo dos productos con poco stock tendrían ese descuento y el resto bajaría muy poco. La agencia dice que las condiciones irán en letra chica y que así lo hacen todos.",
    options: [
      {
        id: "a",
        label: "Lanzar la campaña como la propone la agencia",
        detail: "El titular promete mucho y las restricciones quedan al pie del anuncio.",
        effects: { cashPct: -1, demandPct: 8, satisfaction: -4 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -6, brand: -5, reputation: -6 },
          text: "Varios clientes denuncian ante Indecopi y la promoción se hace conocida en redes por las razones equivocadas. Llega una multa por publicidad engañosa.",
        },
        outcome:
          "El tráfico a la tienda subió mucho el primer día. Los dos productos con descuento real se agotaron en minutos y el resto de visitantes sintió que le habían tomado el pelo.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Anunciar el descuento real y el stock",
        detail: "Comunicas el rango real de descuentos, las unidades disponibles y la vigencia.",
        effects: { cashPct: -1, demandPct: 4, satisfaction: 2, reputation: 3 },
        outcome:
          "El anuncio atrajo menos clics, pero quienes llegaron encontraron lo que se les ofreció. La tasa de compra fue mayor y no hubo reclamos por la promoción.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Dar 70 % real en una categoría completa",
        detail: "Eliges una línea con exceso de inventario y sacrificas su margen para cumplir el titular.",
        effects: { cashPct: -5, demandPct: 9, brand: 2 },
        outcome:
          "La promesa fue cierta y la campaña tuvo buena acogida. Liquidaste inventario lento, aunque a un margen muy bajo y con clientes que ahora esperan esa rebaja en cada campaña.",
        verdict: "buena",
      },
    ],
    concept: "Publicidad engañosa",
    lesson:
      "La publicidad se juzga por el mensaje que entiende un consumidor que la ve de forma rápida, no por la letra chica. Las restricciones, el stock y la vigencia de una promoción deben informarse con claridad.",
  },
  {
    id: "legal-registro-de-marca",
    title: "Tu marca crece, pero no está registrada",
    category: "legal",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tu marca ya es conocida en tu ciudad y planeas abrir en otra región. Un amigo abogado te hace notar que nunca la registraste en Indecopi: solo tienes el nombre en la razón social y en redes. Registrar cuesta dinero y toma unos meses, y justo ahora la caja está para otras cosas.",
    options: [
      {
        id: "a",
        label: "Registrar la marca antes de expandirte",
        detail: "Haces la búsqueda de antecedentes y solicitas el registro en las clases que usas.",
        effects: { cashPct: -1, brand: 2, reputation: 2 },
        outcome:
          "La búsqueda previa mostró que el nombre estaba libre en tu rubro. Presentaste la solicitud y abriste la nueva sede con letreros y empaques que nadie podrá obligarte a cambiar.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Postergar el registro al próximo año",
        detail: "Priorizas la caja para la apertura y dejas el trámite para después.",
        effects: {},
        risk: {
          prob: 0.3,
          effects: { cashPct: -6, demandPct: -4, brand: -8 },
          text: "Un tercero registra un nombre casi idéntico y te envía una carta notarial. Debes cambiar letreros, empaques y redes.",
        },
        outcome:
          "Abriste la nueva sede e invertiste en publicidad de un nombre que legalmente no es tuyo. Cada sol en marketing aumenta lo que perderías si alguien lo registra primero.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Registrar marca, lema y diseño de empaque",
        detail: "Proteges todos los elementos de la identidad en varias clases, con un estudio especializado.",
        effects: { cashPct: -2.5, brand: 3, reputation: 2 },
        outcome:
          "Quedaste muy protegido. Parte del gasto fue prematura, porque registraste clases de productos que todavía no vendes ni tienes planes cercanos de vender.",
        verdict: "buena",
      },
    ],
    concept: "Registro de marca",
    lesson:
      "La razón social inscrita en Registros Públicos no es una marca. El derecho exclusivo sobre el nombre se obtiene con el registro en Indecopi y favorece a quien lo solicita primero. Conviene registrar antes de invertir en publicidad.",
  },
  {
    id: "legal-abrir-sin-licencia",
    title: "Local listo, licencia municipal en trámite",
    category: "legal",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tu nuevo local en Chiclayo está terminado y la campaña de Fiestas Patrias empieza en una semana. La licencia de funcionamiento y la inspección de seguridad siguen en trámite en la municipalidad. El dueño del local cuenta que sus otros inquilinos abrieron «con el cargo del trámite» y nadie los molestó.",
    options: [
      {
        id: "a",
        label: "Abrir ya con el cargo del trámite",
        detail: "Empiezas a vender mientras la municipalidad resuelve tu solicitud.",
        effects: { cashPct: 4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -7, demandPct: -6, reputation: -6 },
          text: "Fiscalización municipal clausura el local en plena campaña y te impone una multa.",
        },
        outcome:
          "Vendiste desde el primer día de campaña. Operas sin autorización y sin inspección de seguridad aprobada, así que cualquier incidente en el local sería responsabilidad directa tuya.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Esperar la licencia sin hacer nada más",
        detail: "Mantienes el local cerrado hasta que la municipalidad responda.",
        effects: { cashPct: -3, reputation: 2 },
        outcome:
          "Pagaste alquiler y planilla con el local cerrado. La licencia llegó después de Fiestas Patrias y abriste en regla, pero sin la mejor semana del trimestre.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Acelerar el trámite cumpliendo los requisitos",
        detail: "Un especialista revisa las condiciones de seguridad, corriges lo que falta y pides la inspección.",
        effects: { cashPct: -1.5, reputation: 3 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -2 },
          text: "La municipalidad demora más de lo previsto y pierdes los primeros días de la campaña.",
        },
        outcome:
          "El especialista encontró que faltaban luces de emergencia y señalización. Lo corregiste antes de la visita y la inspección se aprobó a la primera.",
        verdict: "optima",
      },
    ],
    concept: "Licencia de funcionamiento e inspección",
    lesson:
      "Un local necesita licencia de funcionamiento y condiciones de seguridad aprobadas antes de abrir. El trámite debe estar en el cronograma del proyecto desde el inicio, no aparecer cuando la obra ya terminó.",
  },
  {
    id: "legal-garantia-producto-fallado",
    title: "El producto falló a los dos meses de vendido",
    category: "legal",
    industries: ["ecommerce", "moda", "autos", "telecom", "minimarket"],
    market: "B2C",
    tier: 1,
    situation:
      "Un cliente vuelve con un producto que dejó de funcionar a los dos meses de la compra. Tu vendedor le responde que la tienda «no acepta cambios ni devoluciones», como dice un cartel en caja. El cliente anuncia que irá a Indecopi. Tu proveedor tarda en responder por la garantía.",
    options: [
      {
        id: "a",
        label: "Mantener la política del cartel",
        detail: "Sostienes que el cliente conocía la condición al momento de comprar.",
        effects: { satisfaction: -5 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -5, brand: -3, reputation: -6 },
          text: "Indecopi declara fundado el reclamo porque el cartel no elimina la garantía. Ordena devolver el dinero y te multa.",
        },
        outcome:
          "El cliente se fue sin solución y dejó una reseña detallada en redes. Un cartel no puede recortar el derecho del consumidor a recibir un producto que funcione.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Reparar o cambiar el producto de inmediato",
        detail: "Asumes el costo ahora y después reclamas a tu proveedor.",
        effects: { cashPct: -1.5, satisfaction: 5, reputation: 3 },
        outcome:
          "El cliente salió con un producto nuevo. Reclamaste al proveedor con el producto fallado en la mano y retiraste el cartel de caja, que solo te generaba discusiones.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Pedirle que espere al proveedor",
        detail: "Recibes el producto y le avisas que la solución depende de la respuesta del fabricante.",
        effects: { satisfaction: -2 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -2, satisfaction: -4, reputation: -3 },
          text: "El proveedor demora semanas, el cliente se cansa y presenta el reclamo formal.",
        },
        outcome:
          "El cliente aceptó esperar, aunque sin fecha clara. Frente a él, quien responde es la tienda que le vendió, no el fabricante.",
        verdict: "riesgosa",
      },
    ],
    concept: "Garantía e idoneidad del producto",
    lesson:
      "Quien vende responde ante el consumidor porque el producto sirva para lo que se ofreció. La tienda puede repetir contra su proveedor, pero no trasladar la espera al cliente ni eliminar la garantía con un cartel.",
  },
  {
    id: "legal-contrato-sin-alcance-escrito",
    title: "El cliente pide extras que «estaban incluidos»",
    category: "legal",
    industries: "all",
    market: "B2B",
    tier: 1,
    situation:
      "Cerraste un servicio con una empresa de Piura por correos y llamadas, sin contrato firmado. A mitad del trabajo el cliente exige entregables adicionales y asegura que estaban incluidos en el precio. Tu equipo recuerda otra cosa, pero no hay documento que lo pruebe.",
    options: [
      {
        id: "a",
        label: "Hacer los extras gratis para conservarlo",
        detail: "Absorbes las horas adicionales y evitas la discusión.",
        effects: { cashPct: -3, morale: -3, satisfaction: 3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -2, morale: -2 },
          text: "El cliente entiende que todo se puede pedir y llega con una segunda lista de extras.",
        },
        outcome:
          "El cliente quedó conforme y tu equipo trabajó fines de semana sin que el proyecto facturara más. El margen del servicio se redujo a casi nada.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Negarte y exigir el pago pactado",
        detail: "Entregas solo lo que tu equipo recuerda haber ofrecido y cobras el saldo.",
        effects: { satisfaction: -3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -4, satisfaction: -4 },
          text: "El cliente retiene el pago pendiente y, sin contrato, cobrarle resulta largo y costoso.",
        },
        outcome:
          "Defendiste tu posición, pero era tu palabra contra la suya. La relación quedó tensa y el cliente empezó a pedir propuestas a otros proveedores.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Negociar una adenda escrita",
        detail: "Cedes una parte de los extras y dejas firmado qué incluye el servicio y cuánto cuesta lo adicional.",
        effects: { cashPct: -1, satisfaction: 2, reputation: 2 },
        outcome:
          "Regalaste algunas horas a cambio de un documento firmado con alcance, entregables, plazos y tarifa por adicionales. El resto del proyecto avanzó sin discusiones.",
        verdict: "optima",
      },
    ],
    concept: "Contrato escrito y alcance del servicio",
    lesson:
      "Un acuerdo verbal es válido, pero muy difícil de probar. El contrato debe definir alcance, entregables, plazos, precio y cómo se cobran los cambios. El momento de escribirlo es antes de empezar, cuando todos están de acuerdo.",
  },
  {
    id: "legal-base-de-datos-comprada",
    title: "Te venden una base con miles de contactos",
    category: "legal",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Un proveedor te ofrece una base de datos con miles de celulares y correos de personas de tu segmento en Lima y Arequipa. Tu jefe de marketing quiere lanzar una campaña masiva por WhatsApp y llamadas. Ninguna persona de esa lista te dio su consentimiento.",
    options: [
      {
        id: "a",
        label: "Comprar la base y lanzar la campaña",
        detail: "Envías mensajes y haces llamadas a toda la lista durante dos semanas.",
        effects: { cashPct: -1, demandPct: 5, brand: -2 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -6, brand: -4, reputation: -7 },
          text: "Varias personas denuncian las llamadas no solicitadas ante las autoridades, llegan multas y tu número de WhatsApp queda bloqueado por spam.",
        },
        outcome:
          "Llegaron algunas ventas nuevas. También llegaron respuestas molestas y bloqueos, y tu marca quedó asociada a mensajes que nadie pidió.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Construir tu propia base con consentimiento",
        detail: "Captas contactos con formularios y beneficios, y guardas la autorización de cada persona.",
        effects: { cashPct: -1.5, demandPct: 2, brand: 2, reputation: 3, rounds: 3 },
        outcome:
          "La lista creció despacio, pero con personas que sí querían saber de ti. Tus mensajes tuvieron una tasa de respuesta varias veces mayor que la de una base comprada.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Usar anuncios segmentados en redes",
        detail: "Inviertes en pauta dirigida a tu público sin manejar datos personales de terceros.",
        effects: { cashPct: -2, demandPct: 3 },
        outcome:
          "Llegaste al mismo segmento a través de las plataformas, sin tocar datos ajenos. Pagaste por cada contacto y no construiste una base propia.",
        verdict: "buena",
      },
    ],
    concept: "Consentimiento en datos personales",
    lesson:
      "Para usar datos personales con fines comerciales necesitas el consentimiento previo e informado de cada persona. Una base propia y autorizada es un activo. Una base comprada es una contingencia legal y de imagen.",
  },
  {
    id: "legal-musica-e-imagenes-sin-licencia",
    title: "El video de campaña usa música y fotos ajenas",
    category: "legal",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu equipo de redes armó un video promocional con una canción de moda y fotos bajadas de internet. Está listo para pautarse y el diseñador asegura que nadie reclama por eso. Conseguir licencias o producir material propio retrasaría la campaña.",
    options: [
      {
        id: "a",
        label: "Publicar y pautar el video como está",
        detail: "Sales a tiempo con un contenido llamativo cuyos derechos no son tuyos.",
        effects: { demandPct: 4, brand: 2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, brand: -3, reputation: -4 },
          text: "La plataforma baja el anuncio por un reclamo de derechos y el fotógrafo exige una compensación por el uso de sus imágenes.",
        },
        outcome:
          "El video salió a tiempo y tuvo buen alcance. Invertiste pauta en una pieza que puede desaparecer de un día para otro por decisión de un tercero.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Producir fotos propias y usar música libre",
        detail: "Haces una sesión de fotos y eliges pistas de un banco con licencia comercial.",
        effects: { cashPct: -1.5, demandPct: 3, brand: 3, reputation: 2 },
        outcome:
          "La campaña salió unos días después con imágenes de tus productos reales. Las fotos quedaron como material propio que reutilizaste el resto del año.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Pagar la licencia de la canción famosa",
        detail: "Negocias con los titulares el uso comercial del tema para la campaña.",
        effects: { cashPct: -5, demandPct: 5, brand: 3 },
        outcome:
          "La canción hizo que el video se recordara. La licencia costó más que toda la producción y solo cubre esta campaña, por un tiempo limitado.",
        verdict: "buena",
      },
    ],
    concept: "Derechos de autor en contenidos",
    lesson:
      "Que una foto o una canción esté en internet no significa que sea de uso libre. El uso comercial requiere autorización del titular. El contenido propio o licenciado es el único que puedes pautar sin sobresaltos.",
  },
  {
    id: "legal-experiencia-inflada-en-licitacion",
    title: "Te falta experiencia para ganar la licitación",
    category: "legal",
    industries: ["limpieza", "consultoria", "software", "maquinaria", "logistica", "agencia", "telecom"],
    market: "B2B",
    tier: 3,
    situation:
      "Una entidad pública convoca un concurso que duplicaría tus ventas. Te falta experiencia acreditada para cumplir el requisito. Un asesor ofrece conseguirte constancias de servicios que nunca prestaste y te recuerda que las entidades casi nunca verifican.",
    options: [
      {
        id: "a",
        label: "Presentar las constancias conseguidas",
        detail: "Completas el requisito con documentos que no corresponden a servicios reales.",
        effects: { demandPct: 15, rounds: 2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -10, demandPct: -15, reputation: -15, rounds: 4 },
          text: "Un competidor pide la fiscalización de tu oferta y se detectan documentos falsos. Te inhabilitan para contratar con el Estado y el caso pasa a la fiscalía.",
        },
        outcome:
          "Tu propuesta fue admitida. Los postores que pierden revisan las ofertas ganadoras con lupa, y todo lo que presentaste tiene carácter de declaración jurada.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Postular en consorcio",
        detail: "Te asocias con una empresa que sí tiene la experiencia y comparten contrato y utilidad.",
        effects: { cashPct: -1, demandPct: 8, reputation: 2, rounds: 2 },
        risk: {
          prob: 0.3,
          effects: { productivityPct: -3 },
          text: "La coordinación con el socio resulta difícil y surgen roces por el reparto del trabajo y de los pagos.",
        },
        outcome:
          "El consorcio cumplió el requisito de forma legítima. Compartiste la utilidad y a cambio sumaste experiencia propia para postular por tu cuenta la próxima vez.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "No postular y acumular experiencia",
        detail: "Te presentas a contrataciones menores donde sí cumples los requisitos.",
        effects: { demandPct: 2, reputation: 2 },
        outcome:
          "Dejaste pasar el contrato grande. Ganaste dos servicios pequeños que, bien ejecutados, te darán las constancias reales que hoy no tienes.",
        verdict: "buena",
      },
    ],
    concept: "Veracidad en la contratación pública",
    lesson:
      "En las compras del Estado los documentos se presumen ciertos y se fiscalizan después. Presentar información falsa se sanciona con inhabilitación, que para un proveedor del Estado equivale a cerrar. El consorcio es la vía legal para sumar experiencia.",
  },
  {
    id: "legal-penalidad-por-entrega-tardia",
    title: "El gran cliente exige penalidades por atraso",
    category: "legal",
    industries: "all",
    market: "B2B",
    tier: 2,
    situation:
      "Una cadena importante quiere firmar contigo un contrato anual. Su modelo incluye una penalidad diaria por cada entrega tardía, sin tope, y no acepta como excusa los bloqueos de carreteras ni las lluvias. Tu jefe de operaciones admite que hoy uno de cada diez despachos llega tarde.",
    options: [
      {
        id: "a",
        label: "Firmar tal cual para asegurar la cuenta",
        detail: "Aceptas el modelo del cliente sin cambios y confías en mejorar sobre la marcha.",
        effects: { demandPct: 10, rounds: 3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -7 },
          text: "Un paro de transportistas retrasa tus despachos y las penalidades acumuladas se comen el margen del contrato.",
        },
        outcome:
          "Ganaste la cuenta más grande de tu historia. Cada atraso ahora tiene un precio diario que no controlas y que no tiene límite.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Negociar tope de penalidad y fuerza mayor",
        detail: "Pides un límite al total de penalidades y que los eventos fuera de tu control no cuenten.",
        effects: { demandPct: 8, reputation: 2, rounds: 3 },
        risk: {
          prob: 0.2,
          effects: { demandPct: -8, rounds: 3 },
          text: "El cliente no acepta cambios en su modelo y firma con otro proveedor.",
        },
        outcome:
          "El cliente aceptó un tope y una lista de eventos de fuerza mayor. Tu riesgo máximo quedó definido y pudiste incluirlo en el precio.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Firmar y reforzar la operación",
        detail: "Aceptas las condiciones e inviertes en inventario de seguridad y rutas alternas.",
        effects: { cashPct: -3, demandPct: 10, fixedCostPct: 2, rounds: 3 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -4 },
          text: "Un huaico corta la carretera varios días y ni el inventario de seguridad evita las penalidades.",
        },
        outcome:
          "La inversión redujo los atrasos a una fracción. Tu operación mejoró para todos los clientes, pero sigues expuesto a eventos que ningún plan puede evitar.",
        verdict: "buena",
      },
    ],
    concept: "Cláusula penal y fuerza mayor",
    lesson:
      "Una penalidad pactada se cobra sin necesidad de probar el daño. Antes de firmar hay que cuantificar el peor escenario, pedir un tope y definir qué eventos son fuerza mayor. Un contrato grande con riesgo ilimitado puede dejar pérdidas.",
    basedOn: "Bloqueos de carreteras y huaicos que interrumpen el transporte de carga en el Perú",
  },
  {
    id: "legal-cobrar-al-cliente-moroso",
    title: "Un cliente te debe hace seis meses",
    category: "legal",
    industries: "all",
    market: "B2B",
    tier: 2,
    situation:
      "Una empresa de Trujillo te debe varias facturas desde hace seis meses y ya no contesta tus correos. Tu abogado propone demandar de inmediato. Tu administradora sugiere invitarla primero a un centro de conciliación, y tu vendedor pide seguir esperando para no perder al cliente.",
    options: [
      {
        id: "a",
        label: "Invitar a conciliar con un plan de pagos",
        detail: "Un conciliador cita a ambas partes. Si hay acuerdo, el acta se puede ejecutar como una sentencia.",
        effects: { cashPct: 2.5, reputation: 1 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -2.5 },
          text: "El deudor no asiste a la audiencia y debes ir al Poder Judicial de todos modos.",
        },
        outcome:
          "El cliente asistió y reconoció la deuda. Firmaron un cronograma de pagos en un acta que, si incumple, puedes ejecutar sin volver a discutir si debía o no.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Ir directo a juicio con todo",
        detail: "Inicias un proceso judicial con abogado, tasas y plazos largos.",
        effects: { cashPct: -1.5 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -2 },
          text: "El proceso se alarga, el deudor se queda sin bienes a su nombre y no recuperas nada.",
        },
        outcome:
          "La demanda mostró firmeza, pero el proceso avanza al ritmo del juzgado. Mientras tanto pagas honorarios y la deuda sigue sin cobrarse.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Seguir esperando y venderle al contado",
        detail: "Mantienes la relación comercial sin presionar por la deuda antigua.",
        effects: {},
        risk: {
          prob: 0.6,
          effects: { cashPct: -3 },
          text: "La deuda envejece, el cliente cierra operaciones y la cuenta termina como incobrable.",
        },
        outcome:
          "El cliente siguió comprando poco y al contado. La deuda vieja no se movió y cada mes que pasa es menos probable cobrarla.",
        verdict: "mala",
      },
    ],
    concept: "Conciliación extrajudicial",
    lesson:
      "La conciliación es más rápida y barata que un juicio, y el acta con acuerdo tiene fuerza de título ejecutivo. La probabilidad de cobrar una deuda cae con el tiempo, por eso la cobranza debe activarse temprano.",
  },
  {
    id: "legal-clausula-de-solucion-de-controversias",
    title: "Arbitraje o Poder Judicial en el contrato",
    category: "legal",
    industries: "all",
    market: "B2B",
    tier: 3,
    situation:
      "Negocias un contrato de varios años con un proveedor extranjero de equipos. Su abogado propone arbitraje en otro país y en inglés. Tu abogado prefiere los juzgados de Lima, y un consultor sugiere arbitraje en una cámara de comercio peruana. La cláusula parece un detalle, hasta que haya un conflicto.",
    options: [
      {
        id: "a",
        label: "Aceptar arbitraje en el extranjero",
        detail: "Cedes en la cláusula a cambio de un mejor precio en los equipos.",
        effects: { costPct: -1, rounds: 2 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -8 },
          text: "Surge una disputa por equipos defectuosos y litigar fuera del país es tan caro que terminas aceptando un mal arreglo.",
        },
        outcome:
          "Conseguiste un descuento en la compra. Si algo falla, reclamar te exigirá abogados extranjeros, traducciones y viajes, un costo que pocas empresas medianas pueden asumir.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Exigir los juzgados de Lima",
        detail: "Cualquier conflicto se resolverá ante el Poder Judicial peruano.",
        effects: {},
        risk: {
          prob: 0.35,
          effects: { cashPct: -4, productivityPct: -3 },
          text: "La disputa llega al juzgado y pasa años sin sentencia mientras los equipos siguen parados.",
        },
        outcome:
          "Jugarías de local y con costos de inicio bajos. El proveedor aceptó con reservas, consciente de que un juicio largo le conviene más a quien incumple.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Pactar arbitraje en una cámara peruana",
        detail: "Árbitros especializados deciden en plazos más cortos, con honorarios que se pagan por adelantado.",
        effects: { cashPct: -0.5, reputation: 2 },
        risk: {
          prob: 0.2,
          effects: { cashPct: -3 },
          text: "Surge una disputa y debes adelantar honorarios arbitrales altos, aunque el laudo sale en meses y no en años.",
        },
        outcome:
          "Ambas partes aceptaron una sede neutral y cercana. La negociación tomó una semana más y dejó definido el idioma, la ley aplicable y el número de árbitros.",
        verdict: "optima",
      },
    ],
    concept: "Convenio arbitral",
    lesson:
      "La cláusula de solución de controversias define cuánto cuesta y cuánto demora hacer valer un contrato. El arbitraje suele ser más rápido y especializado, pero más caro al inicio. La sede y el idioma pueden volver inviable un reclamo.",
  },
  {
    id: "legal-alquiler-sin-contrato-firme",
    title: "Alquiler más barato, pero sin contrato a plazo",
    category: "legal",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Encontraste un local ideal en Cusco. El dueño ofrece una renta menor si no firman contrato, «para evitar papeleos», o un contrato de solo un año. Tú planeas invertir fuerte en la remodelación y calculas recuperar esa inversión en tres años.",
    options: [
      {
        id: "a",
        label: "Tomar la renta baja sin contrato",
        detail: "Pagas menos cada mes y remodelas confiando en la palabra del dueño.",
        effects: { cashPct: -4, fixedCostPct: -3, rounds: 4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -8, demandPct: -6 },
          text: "Al año el dueño sube fuerte la renta o te pide el local. Pierdes la remodelación y la clientela de la zona.",
        },
        outcome:
          "La renta baja mejoró tu resultado mensual. Sin contrato ni recibos de arrendamiento no puedes sustentar ese gasto, y tu inversión está en un local que pueden pedirte en cualquier momento.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Firmar a tres años con opción de renovar",
        detail: "Pagas la renta de mercado con reajuste pactado y legalizas las firmas ante notario.",
        effects: { cashPct: -4.5, fixedCostPct: 1, reputation: 2, rounds: 4 },
        outcome:
          "Pagas un poco más cada mes. El plazo del contrato coincide con el tiempo que necesitas para recuperar la remodelación, y el reajuste anual ya está escrito.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Firmar por un año y remodelar lo mínimo",
        detail: "Reduces la inversión a lo indispensable hasta ver cómo funciona la zona.",
        effects: { cashPct: -1.5, brand: -1 },
        outcome:
          "Arriesgaste poco y el local quedó funcional, aunque sin la imagen que querías. Al vencer el año tendrás que renegociar desde cero, con el negocio ya instalado.",
        verdict: "buena",
      },
    ],
    concept: "Plazo del arrendamiento e inversión",
    lesson:
      "El plazo del contrato de alquiler debe cubrir el tiempo de recuperación de lo que inviertes en el local. Un contrato escrito fija renta, reajustes y renovación, y además sustenta el gasto ante SUNAT.",
  },
  {
    id: "legal-exclusividad-con-proveedor",
    title: "Descuento a cambio de exclusividad por tres años",
    category: "legal",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu principal proveedor te ofrece un descuento atractivo si firmas exclusividad por tres años: no podrás comprar a nadie más y habrá una penalidad fuerte si rompes el acuerdo. Hoy su servicio es bueno, pero en tu rubro los precios y las tecnologías cambian rápido.",
    options: [
      {
        id: "a",
        label: "Firmar la exclusividad por tres años",
        detail: "Aseguras el descuento y te comprometes a comprarle solo a él.",
        effects: { costPct: -4, rounds: 4 },
        risk: {
          prob: 0.35,
          effects: { costPct: 5, quality: -3, rounds: 2 },
          text: "El proveedor reajusta precios y descuida el servicio, y no puedes cambiarte sin pagar la penalidad.",
        },
        outcome:
          "Tu costo bajó desde el primer pedido. A cambio renunciaste a tu principal herramienta de negociación, que era la posibilidad de irte con otro.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Negociar un año con volumen mínimo",
        detail: "Ofreces un compromiso de compra en lugar de exclusividad, con salida si incumple calidad o plazos.",
        effects: { costPct: -2, reputation: 1, rounds: 4 },
        outcome:
          "El descuento fue menor que el ofrecido. Conservaste la libertad de comprar a otros y una cláusula de salida si el servicio empeora.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Seguir con dos proveedores, sin contrato",
        detail: "Rechazas la oferta y mantienes tus compras repartidas.",
        effects: {},
        outcome:
          "No ganaste descuento, pero tampoco quedaste atado. Tener una segunda fuente te protegió cuando el proveedor principal tuvo un quiebre de stock.",
        verdict: "buena",
      },
    ],
    concept: "Cláusula de exclusividad",
    lesson:
      "La exclusividad tiene precio: el descuento debe compensar la pérdida de alternativas. Antes de firmar revisa plazo, reajuste de precios, niveles de servicio exigibles y condiciones de salida.",
  },
  {
    id: "legal-retiro-de-lote-defectuoso",
    title: "Un lote ya vendido puede ser riesgoso",
    category: "legal",
    industries: ["pasteleria", "bebidas", "restaurante", "cafeteria", "minimarket", "farmacia", "agroexport", "autos", "ecommerce"],
    market: "all",
    tier: 3,
    situation:
      "Control de calidad detecta que un lote que ya está en manos de clientes puede representar un riesgo para su salud o seguridad. Hasta ahora solo hay dos quejas leves. Retirarlo y avisar públicamente costará dinero y titulares. Tu gerente comercial propone atender solo a quien reclame.",
    options: [
      {
        id: "a",
        label: "Atender caso por caso, sin anuncio",
        detail: "Cambias el producto a quien se queje y no comunicas nada más.",
        effects: { cashPct: -0.5 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -12, demandPct: -10, brand: -10, reputation: -12 },
          text: "Un cliente resulta afectado y el caso llega a los noticieros. Indecopi sanciona por no advertir un riesgo que la empresa ya conocía.",
        },
        outcome:
          "El gasto inmediato fue mínimo. El lote sigue en casas de clientes que no saben del riesgo, y tu informe de control de calidad prueba que tú sí lo sabías.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Retirar el lote y avisar a todos",
        detail: "Informas a clientes y autoridades, recoges el producto y devuelves el dinero o lo cambias.",
        effects: { cashPct: -5, brand: -2, satisfaction: 3, reputation: 6 },
        outcome:
          "El retiro costó caro y hubo notas en prensa durante unos días. Nadie resultó afectado y la cobertura destacó que la empresa avisó por iniciativa propia.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Retirar de tiendas sin avisar a compradores",
        detail: "Sacas el stock que queda en el canal y no contactas a quienes ya compraron.",
        effects: { cashPct: -2.5 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -8, brand: -7, reputation: -9 },
          text: "Un comprador que nunca fue avisado sufre un incidente y se descubre que la empresa retiró el lote en silencio.",
        },
        outcome:
          "Evitaste nuevas ventas del lote y también los titulares. Las unidades ya vendidas siguen en uso, y un retiro a medias resulta difícil de explicar después.",
        verdict: "riesgosa",
      },
    ],
    concept: "Retiro de productos y deber de advertencia",
    lesson:
      "Cuando un proveedor descubre que su producto puede ser riesgoso, debe advertirlo y retirarlo. El costo del retiro es conocido y acotado. El costo de callar es incierto y puede ser muchas veces mayor.",
  },
  // ───────────── ÉTICA (15) ─────────────
  {
    id: "etica-coima-al-inspector",
    title: "El inspector insinúa que todo se puede arreglar",
    category: "etica",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Un inspector municipal encuentra tres observaciones en tu local de Pucallpa: falta señalización, hay un extintor vencido y un tablero eléctrico sin tapa. Antes de firmar el acta comenta que la multa es alta, pero que «con una colaboración» puede no haber visto nada.",
    options: [
      {
        id: "a",
        label: "Pagar la colaboración",
        detail: "Entregas el dinero, no hay acta y el local sigue operando tal como está.",
        effects: { cashPct: -0.5, reputation: -4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -6, reputation: -12 },
          text: "El inspector vuelve cada pocos meses por más y un operativo anticorrupción lo interviene recibiendo dinero en tu local.",
        },
        outcome:
          "Pagaste menos que la multa y no hubo acta. El extintor sigue vencido y el tablero sin tapa, y el inspector ya sabe que en tu local se paga.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Aceptar el acta y corregir",
        detail: "Firmas las observaciones, las subsanas dentro del plazo y pagas lo que corresponda.",
        effects: { cashPct: -2, quality: 1, reputation: 4 },
        outcome:
          "Corregiste las tres observaciones en una semana y la sanción se redujo por subsanar a tiempo. El local quedó más seguro para tu personal y tus clientes.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rechazar el pedido y denunciar",
        detail: "Aceptas el acta, corriges y además reportas la conducta del inspector a la municipalidad.",
        effects: { cashPct: -2, reputation: 6 },
        risk: {
          prob: 0.3,
          effects: { productivityPct: -3 },
          text: "Durante unos meses recibes inspecciones más frecuentes y minuciosas de lo normal.",
        },
        outcome:
          "Subsanaste las observaciones y dejaste constancia escrita del pedido. Otros comerciantes de la cuadra se animaron a contar que les había pasado lo mismo.",
        verdict: "buena",
      },
    ],
    concept: "Soborno y costo de la corrupción",
    lesson:
      "Una coima no resuelve el problema, lo posterga y lo encarece: el riesgo sigue ahí y quien cobró una vez vuelve. Pagarla también es delito para quien la entrega. Corregir la observación es lo único que cierra el tema.",
  },
  {
    id: "etica-el-proveedor-es-cunado",
    title: "El postor favorito es cuñado de tu jefe de compras",
    category: "etica",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu jefe de compras recomienda adjudicar el contrato anual de insumos a una empresa nueva. Revisando sus datos descubres que el gerente es su cuñado, algo que él no mencionó. La oferta es competitiva, aunque no es la más barata.",
    options: [
      {
        id: "a",
        label: "Adjudicar sin más, la oferta es buena",
        detail: "Apruebas la recomendación y no tocas el tema del parentesco.",
        effects: { costPct: -1 },
        risk: {
          prob: 0.4,
          effects: { costPct: 3, morale: -4, quality: -3, rounds: 2 },
          text: "Aparecen sobreprecios y entregas flojas que nadie en compras reclama. El equipo comenta que aquí gana el pariente.",
        },
        outcome:
          "El contrato arrancó bien. Quien debe exigirle al proveedor es familiar suyo, y el resto del equipo ya se enteró del vínculo por su cuenta.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Despedir al jefe de compras",
        detail: "Consideras que ocultar el vínculo rompió la confianza y lo separas de inmediato.",
        effects: { morale: -4, productivityPct: -3, reputation: 1 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -2 },
          text: "El trabajador demanda por despido arbitrario, ya que no existía una política escrita que lo obligara a declarar el vínculo.",
        },
        outcome:
          "El mensaje fue contundente, pero perdiste a quien conocía a todos los proveedores. Sin una regla escrita sobre conflictos de interés, la sanción pareció desproporcionada.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Apartarlo de la decisión y usar un comité",
        detail: "Le pides declarar el vínculo por escrito y otras personas comparan las ofertas.",
        effects: { costPct: -1, productivityPct: -1, morale: 2, reputation: 4 },
        outcome:
          "El comité comparó las ofertas con los mismos criterios para todas. Aprobaste además una política que obliga a declarar vínculos con proveedores antes de cada compra.",
        verdict: "optima",
      },
    ],
    concept: "Conflicto de interés",
    lesson:
      "Tener un familiar proveedor no es una falta. Ocultarlo y decidir sobre su contrato sí lo es. El conflicto de interés se maneja con tres pasos: declararlo, apartarse de la decisión y dejar que otros evalúen.",
  },
  {
    id: "etica-acuerdo-de-precios",
    title: "Tus competidores proponen ordenar los precios",
    category: "etica",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Tras meses de guerra de precios, el dueño de tu principal competidor crea un grupo de WhatsApp con las empresas del rubro en tu ciudad. Propone fijar un precio mínimo y repartirse las zonas «para que todos ganemos». Tus márgenes están golpeados y la propuesta suena a alivio.",
    options: [
      {
        id: "a",
        label: "Sumarte al acuerdo",
        detail: "Subes tus precios al mínimo pactado y respetas las zonas asignadas.",
        effects: { cashPct: 5, demandPct: -2, reputation: -4 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -20, brand: -6, reputation: -15 },
          text: "Uno de los participantes se acoge al programa de clemencia de Indecopi y entrega las conversaciones. Llega una multa muy alta por concertación de precios.",
        },
        outcome:
          "Los márgenes mejoraron de inmediato. Todo el acuerdo quedó por escrito en un chat, en manos de competidores que tienen un incentivo para delatarlo primero.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Salir del grupo y dejar constancia",
        detail: "Respondes por escrito que no participas de acuerdos sobre precios y abandonas el chat.",
        effects: { reputation: 4 },
        outcome:
          "Quedó una prueba clara de tu rechazo. La guerra de precios continuó y tus márgenes siguieron presionados, porque no cambiaste nada en tu oferta.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Rechazar el acuerdo y diferenciarte",
        detail: "Dejas constancia de tu negativa e inviertes en servicio y calidad para no competir solo por precio.",
        effects: { cashPct: -2, quality: 3, satisfaction: 3, reputation: 4 },
        outcome:
          "Saliste del grupo y de la pelea por el precio más bajo. Una parte de tus clientes aceptó pagar algo más por mejor servicio y plazos cumplidos.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Quedarte en el grupo solo para enterarte",
        detail: "No te comprometes a nada, pero lees lo que acuerdan los demás.",
        effects: {},
        risk: {
          prob: 0.3,
          effects: { cashPct: -10, reputation: -10 },
          text: "Indecopi investiga el cártel y tu permanencia silenciosa en el grupo te deja como un participante más.",
        },
        outcome:
          "Obtuviste información sobre los precios de tus rivales. Recibirla sin objetar y ajustar tus precios con ella te acerca mucho a ser parte del acuerdo.",
        verdict: "riesgosa",
      },
    ],
    concept: "Concertación de precios",
    lesson:
      "Acordar precios o repartirse mercados con competidores es una de las infracciones más graves contra la libre competencia. Los cárteles son inestables porque el primero que delata recibe el mayor beneficio.",
  },
  {
    id: "etica-plazo-de-pago-a-pequenos",
    title: "Financiarte alargando el pago a proveedores chicos",
    category: "etica",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tu gerente financiero propone pasar el pago a proveedores de 30 a 90 días. Los grandes pueden soportarlo, pero varios son talleres y productores pequeños de Ayacucho y Huancayo que dependen de ti. «No tienen a quién más venderle», dice. La caja mejoraría de inmediato.",
    options: [
      {
        id: "a",
        label: "Imponer 90 días a todos",
        detail: "Comunicas la nueva política de pagos sin excepciones.",
        effects: { cashPct: 5, reputation: -3 },
        risk: {
          prob: 0.45,
          effects: { costPct: 3, quality: -4, reputation: -5, rounds: 2 },
          text: "Dos proveedores pequeños dejan de operar y otros suben precios para cubrir su costo financiero. Faltan insumos en plena campaña.",
        },
        outcome:
          "Tu caja mejoró este trimestre. Los proveedores pequeños empezaron a financiarse con prestamistas caros para poder atenderte, y ese costo termina en sus precios o en su calidad.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Mantener el pago a 30 días",
        detail: "Conservas la política actual y buscas liquidez por otro lado.",
        effects: { reputation: 2 },
        outcome:
          "Tus proveedores siguieron atendiéndote con prioridad. Dejaste sin usar el margen de negociación que sí tenías con los proveedores grandes.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Alargar a los grandes, factoring a los chicos",
        detail: "Negocias plazo con quienes pueden financiarlo y facilitas que los pequeños adelanten el cobro de sus facturas.",
        effects: { cashPct: 2.5, reputation: 3 },
        outcome:
          "Los proveedores grandes aceptaron 60 días. Los pequeños cobraron antes negociando sus facturas con una entidad financiera, respaldados por tu buena calificación como pagador.",
        verdict: "optima",
      },
    ],
    concept: "Poder de negociación y trato a proveedores",
    lesson:
      "Alargar plazos de pago es financiarse con el proveedor. Con un proveedor grande es una negociación entre iguales. Con uno pequeño y dependiente puede quebrarlo, y tu cadena de suministro se debilita contigo adentro.",
  },
  {
    id: "etica-promesa-exagerada",
    title: "«Resultados garantizados», la promesa que vende",
    category: "etica",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tu equipo comercial quiere usar en la nueva campaña frases como «resultados garantizados» y «el número uno del Perú». No tienes estudios que lo respalden y sabes que el resultado depende de cada cliente. Las pruebas muestran que ese mensaje duplica los clics.",
    options: [
      {
        id: "a",
        label: "Usar las frases tal cual",
        detail: "Priorizas el impacto del mensaje sobre la precisión de lo que prometes.",
        effects: { demandPct: 7, satisfaction: -4 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -4, brand: -5, reputation: -6 },
          text: "Clientes decepcionados llenan tus redes de reclamos y un competidor te denuncia por afirmaciones que no puedes sustentar.",
        },
        outcome:
          "Las ventas subieron las primeras semanas. Los clientes nuevos llegaron con expectativas que tu producto no cumple, y las devoluciones y reclamos aumentaron.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Comunicar beneficios reales con testimonios",
        detail: "Usas casos de clientes identificados, cifras verificables y condiciones claras.",
        effects: { demandPct: 3, brand: 3, satisfaction: 2, reputation: 3, rounds: 2 },
        outcome:
          "La campaña fue menos llamativa, pero más creíble. Los clientes recibieron lo que esperaban y empezaron a recomendarte.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Ofrecer devolución si no queda satisfecho",
        detail: "Respaldas la promesa con tu dinero: quien no quede conforme recupera su pago.",
        effects: { cashPct: -2, demandPct: 5, brand: 2, satisfaction: 3 },
        outcome:
          "La garantía de devolución convenció a los indecisos. Algunos clientes la usaron, lo que te costó dinero y te mostró dónde falla tu producto.",
        verdict: "buena",
      },
    ],
    concept: "Promesa de marca y expectativas",
    lesson:
      "La satisfacción es la diferencia entre lo que el cliente recibe y lo que esperaba. Exagerar sube la expectativa sin mejorar el producto, así que garantiza decepción. Toda afirmación objetiva en publicidad debe poder probarse.",
  },
  {
    id: "etica-filtracion-de-datos",
    title: "Se filtraron datos de tus clientes",
    category: "etica",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu proveedor de sistemas informa que un atacante accedió a la base de clientes: nombres, documentos, teléfonos y direcciones. No hay indicios de que tocara datos de pago. Nadie fuera de la empresa lo sabe. Tu gerente comercial pide no decir nada para no asustar a los clientes.",
    options: [
      {
        id: "a",
        label: "Guardar silencio y reforzar la seguridad",
        detail: "Corriges la vulnerabilidad y no comunicas el incidente a nadie.",
        effects: { cashPct: -1 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, demandPct: -6, brand: -8, reputation: -10 },
          text: "Los datos aparecen a la venta en un foro y la prensa revela que la empresa lo sabía desde hace semanas.",
        },
        outcome:
          "Cerraste la brecha técnica. Tus clientes siguen sin saber que sus datos circulan y no pueden cuidarse de llamadas o mensajes de estafadores que usen su información.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Avisar a los clientes y a la autoridad",
        detail: "Explicas qué datos se expusieron, qué hiciste y cómo pueden protegerse de estafas.",
        effects: { cashPct: -2, brand: -2, satisfaction: 2, reputation: 6 },
        outcome:
          "Hubo llamadas de clientes preocupados durante una semana. La mayoría valoró el aviso y las recomendaciones, y el incidente se cerró sin sorpresas posteriores.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Responder solo a quien pregunte",
        detail: "Preparas un comunicado y lo entregas únicamente si algún cliente consulta.",
        effects: { cashPct: -1 },
        risk: {
          prob: 0.35,
          effects: { brand: -5, reputation: -7 },
          text: "Un cliente estafado con sus propios datos descubre que tenías un comunicado listo y nunca lo enviaste.",
        },
        outcome:
          "Nadie preguntó, porque nadie sabía. Tener una explicación preparada y no enviarla demuestra que conocías el problema y elegiste callar.",
        verdict: "riesgosa",
      },
    ],
    concept: "Transparencia ante incidentes de datos",
    lesson:
      "Quien guarda datos personales responde por su seguridad. Ante una filtración, avisar pronto permite al cliente protegerse y muestra control de la situación. El daño mayor suele venir del ocultamiento, no del incidente.",
  },
  {
    id: "etica-regalo-del-proveedor",
    title: "Un proveedor te invita un viaje antes de renovar",
    category: "etica",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Faltan semanas para renovar el contrato con un proveedor importante. Su gerente te envía una canasta navideña muy generosa y una invitación a un fin de semana en Paracas con todo pagado, «para agradecer la relación». Tu empresa no tiene una política de regalos.",
    options: [
      {
        id: "a",
        label: "Aceptar todo, es una cortesía",
        detail: "Recibes la canasta y viajas con tu familia.",
        effects: { morale: -2 },
        risk: {
          prob: 0.4,
          effects: { costPct: 3, reputation: -4, rounds: 2 },
          text: "En la renovación te cuesta exigir mejores condiciones y tu equipo nota que ese proveedor ya no compite con nadie.",
        },
        outcome:
          "El fin de semana fue agradable. Días después te sentaste a negociar precios con quien acababa de pagarte el hotel, y tu equipo de compras estaba enterado.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Devolver todo con una carta cortés",
        detail: "Agradeces el gesto y explicas que no puedes recibir obsequios durante una negociación.",
        effects: { reputation: 3 },
        outcome:
          "El proveedor entendió el mensaje y la negociación se centró en precio y servicio. Como no hay regla escrita, tus jefes de área no saben si ellos deben hacer lo mismo.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Sortear la canasta, rechazar el viaje y normar",
        detail: "Sorteas la canasta entre el personal y defines por escrito qué regalos se pueden aceptar.",
        effects: { morale: 3, reputation: 4 },
        outcome:
          "El sorteo cayó bien en el equipo. La nueva política fija un valor máximo para obsequios y prohíbe recibirlos durante licitaciones o renovaciones de contrato.",
        verdict: "optima",
      },
    ],
    concept: "Política de regalos y hospitalidad",
    lesson:
      "Un regalo crea una deuda de gratitud que puede afectar decisiones de compra. Una política clara, con valor máximo, registro y prohibición durante negociaciones, protege a la empresa y también a quien recibe.",
  },
  {
    id: "etica-denuncia-contra-el-mejor-vendedor",
    title: "Denuncian a tu mejor vendedor",
    category: "etica",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Una asistente te cuenta, con temor, que el vendedor estrella infla sus reportes de gastos y presiona a practicantes para que firmen visitas a clientes que no existieron. Él genera la cuarta parte de tus ventas. Ella pide que no se sepa que habló.",
    options: [
      {
        id: "a",
        label: "Encararlo de inmediato",
        detail: "Lo llamas a tu oficina y le repites lo que te contaron para ver qué responde.",
        effects: { morale: -5 },
        risk: {
          prob: 0.5,
          effects: { productivityPct: -4, morale: -5, reputation: -4 },
          text: "El vendedor deduce quién habló y la hostiga. La asistente renuncia y nadie más se atreve a reportar nada.",
        },
        outcome:
          "El vendedor negó todo y tuvo tiempo de ordenar sus papeles. Actuaste sin pruebas y pusiste en riesgo a la persona que confió en ti.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Investigar con reserva y decidir con pruebas",
        detail: "Proteges la identidad de la denunciante, revisas los reportes y aplicas la sanción que corresponda.",
        effects: { cashPct: -1, morale: 4, reputation: 5 },
        risk: {
          prob: 0.3,
          effects: { demandPct: -5 },
          text: "El vendedor sale de la empresa y se lleva consigo a algunos clientes.",
        },
        outcome:
          "La revisión de gastos confirmó los hechos con documentos, sin necesidad de exponer a nadie. La decisión se tomó con pruebas y el equipo vio que las reglas valen para todos.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Dejarlo pasar, vende demasiado",
        detail: "Agradeces la información y no tomas ninguna acción.",
        effects: {},
        risk: {
          prob: 0.5,
          effects: { cashPct: -4, morale: -8, reputation: -6 },
          text: "Las irregularidades crecen, otros vendedores las imitan y el equipo concluye que quien vende puede hacer lo que quiera.",
        },
        outcome:
          "Las ventas del trimestre no se movieron. La asistente entendió que hablar no sirve, y los practicantes siguieron firmando lo que les ponían delante.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Auditar los gastos de todos y crear un canal",
        detail: "Revisas los reportes de toda el área comercial y abres un medio confidencial para denuncias.",
        effects: { cashPct: -1.5, morale: 2, reputation: 4 },
        outcome:
          "La auditoría general encontró el problema sin señalar a nadie de antemano. Tomó más tiempo y dinero, y dejó instalado un canal que antes no existía.",
        verdict: "buena",
      },
    ],
    concept: "Canal de denuncias y protección al denunciante",
    lesson:
      "Una denuncia interna se atiende con reserva, verificación y pruebas. Si quien denuncia sale perjudicado, nadie vuelve a hablar. Tolerar faltas de quien vende mucho enseña a todos que los resultados compran impunidad.",
  },
  {
    id: "etica-quejas-de-los-vecinos",
    title: "Los vecinos se quejan del ruido y los olores",
    category: "etica",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tu operación creció y con ella el ruido de la descarga de madrugada, el humo y las bolsas de basura en la vereda. La junta vecinal te envía una carta y advierte que irá a la municipalidad y a los medios. Tu licencia está en regla.",
    options: [
      {
        id: "a",
        label: "No responder, la licencia está en regla",
        detail: "Consideras que cumples la ley y que no tienes nada que negociar.",
        effects: {},
        risk: {
          prob: 0.45,
          effects: { cashPct: -4, brand: -5, reputation: -6 },
          text: "Los vecinos consiguen una inspección por ruidos y una nota en el noticiero local. La municipalidad restringe tu horario de descarga.",
        },
        outcome:
          "No gastaste nada. La molestia de los vecinos siguió creciendo y varios de ellos, que también eran clientes, dejaron de comprarte.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Reunirte con la junta y acordar cambios",
        detail: "Cambias horarios de descarga, mejoras la extracción de humos y ordenas el manejo de residuos.",
        effects: { cashPct: -2.5, fixedCostPct: 1, brand: 3, reputation: 5 },
        outcome:
          "La reunión fue tensa al inicio. Acordaron un horario de descarga y un responsable de contacto. Los cambios costaron dinero y las quejas se detuvieron.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Repartir vales de consumo a los vecinos",
        detail: "Buscas mejorar la relación con un obsequio, sin modificar la operación.",
        effects: { cashPct: -1, brand: 1 },
        risk: {
          prob: 0.5,
          effects: { reputation: -3 },
          text: "Las molestias continúan y los vecinos sienten que quisiste comprar su silencio.",
        },
        outcome:
          "Algunos vecinos agradecieron el gesto. El ruido de madrugada y el humo siguieron igual, así que la carta de la junta sigue sin respuesta real.",
        verdict: "riesgosa",
      },
    ],
    concept: "Licencia social y externalidades",
    lesson:
      "Cumplir la norma es el piso, no el techo. El ruido, el humo y los residuos son costos que tu negocio traslada a terceros. Si no los gestionas, los vecinos pueden convertirlos en restricciones, sanciones y mala imagen.",
  },
  {
    id: "etica-residuos-con-recolector-informal",
    title: "Un recolector informal cobra la tercera parte",
    category: "etica",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu operación genera residuos que requieren manejo especial, como aceites usados, químicos o envases contaminados. La empresa autorizada subió su tarifa. Un recolector informal ofrece llevárselos por la tercera parte y sin preguntas. Sospechas que terminan en un río o un botadero.",
    options: [
      {
        id: "a",
        label: "Contratar al recolector informal",
        detail: "Reduces el gasto y no indagas cuál es el destino final de los residuos.",
        effects: { fixedCostPct: -2, reputation: -3, rounds: 3 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -8, brand: -6, reputation: -12 },
          text: "Los residuos aparecen en una quebrada con envases de tu marca. La autoridad ambiental y la fiscalía te señalan como generador responsable.",
        },
        outcome:
          "El gasto bajó desde el primer mes. No tienes ningún documento que acredite dónde terminaron tus residuos, y la responsabilidad por ellos sigue siendo tuya.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Seguir con la empresa autorizada",
        detail: "Aceptas la nueva tarifa y conservas los certificados de disposición final.",
        effects: { fixedCostPct: 1, reputation: 3, rounds: 3 },
        outcome:
          "Pagaste más y mantuviste los certificados en regla. No revisaste si podías generar menos residuos ni si había otras empresas autorizadas con mejor precio.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Reducir residuos y renegociar",
        detail: "Inviertes en generar menos desechos y negocias la tarifa por volumen junto a negocios vecinos.",
        effects: { cashPct: -2, fixedCostPct: -1, quality: 2, reputation: 4, rounds: 3 },
        outcome:
          "Revisar el proceso redujo el volumen de residuos. Al sumar el volumen de otros negocios de la zona conseguiste mejor tarifa con un operador autorizado.",
        verdict: "optima",
      },
    ],
    concept: "Responsabilidad del generador de residuos",
    lesson:
      "Quien genera un residuo sigue siendo responsable aunque pague a otro para llevárselo. Contratar a un operador autorizado y guardar los certificados es la única prueba de un manejo correcto. Generar menos es lo más barato.",
  },
  {
    id: "etica-comision-por-la-buena-pro",
    title: "Un intermediario pide su parte por la buena pro",
    category: "etica",
    industries: ["limpieza", "consultoria", "software", "maquinaria", "logistica", "agencia", "telecom"],
    market: "B2B",
    tier: 3,
    situation:
      "Estás entre los finalistas de una licitación regional grande. Un intermediario te cita en un café y asegura que el comité «ya está conversado»: la buena pro será tuya si entregas un porcentaje del contrato. Si no, ganará otro. Tu caja necesita ese contrato.",
    options: [
      {
        id: "a",
        label: "Aceptar y cargar el porcentaje al precio",
        detail: "Pagas la comisión a través de un servicio de asesoría simulado.",
        effects: { cashPct: -4, demandPct: 15, reputation: -6, rounds: 3 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -15, demandPct: -20, reputation: -20, rounds: 4 },
          text: "Un colaborador eficaz revela los pagos. La fiscalía investiga, la empresa enfrenta multas e inhabilitación y los bancos cierran tus líneas de crédito.",
        },
        outcome:
          "Ganaste la buena pro. Para pagar la comisión registraste un gasto sin sustento real, y quien cobró tiene ahora información para seguir pidiéndote dinero.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Retirarte del proceso en silencio",
        detail: "Desistes de la licitación y no comentas el pedido con nadie.",
        effects: { reputation: 2 },
        outcome:
          "Evitaste el problema y perdiste el contrato. El intermediario siguió operando con otros postores y tú no dejaste ninguna constancia de lo ocurrido.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Negarte, seguir en carrera y denunciar",
        detail: "Documentas el pedido, lo reportas por los canales oficiales y mantienes tu propuesta.",
        effects: { cashPct: -1, reputation: 7 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -3 },
          text: "Pierdes la licitación y por un tiempo algunas entidades de la región te tratan con recelo.",
        },
        outcome:
          "Dejaste constancia escrita con fecha y detalles. Tu directorio aprobó después un modelo de prevención con reglas para el trato con funcionarios e intermediarios.",
        verdict: "optima",
      },
    ],
    concept: "Responsabilidad de la empresa por corrupción",
    lesson:
      "En el Perú la empresa, y no solo sus directivos, puede ser sancionada por delitos de corrupción cometidos en su beneficio. Un modelo de prevención con controles y canal de denuncias reduce ese riesgo y orienta al equipo.",
  },
  {
    id: "etica-stock-por-vencer",
    title: "Stock a pocos días de su fecha de vencimiento",
    category: "etica",
    industries: ["pasteleria", "bebidas", "restaurante", "cafeteria", "minimarket", "farmacia"],
    market: "B2C",
    tier: 1,
    situation:
      "Tienes un lote importante a pocos días de vencer. Tu encargado de tienda sugiere cambiar las etiquetas para ganar dos semanas o mezclarlo con stock nuevo. «Nadie se va a enfermar por unos días», dice. Botarlo significa asumir toda la pérdida.",
    options: [
      {
        id: "a",
        label: "Reetiquetar con una nueva fecha",
        detail: "Extiendes la fecha impresa y vendes el lote a precio normal.",
        effects: { cashPct: 3, reputation: -5 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -10, brand: -8, satisfaction: -6, reputation: -12 },
          text: "Un cliente se enferma y un trabajador cuenta lo de las etiquetas. La autoridad sanitaria cierra el local y el caso llega a Indecopi.",
        },
        outcome:
          "El lote se vendió completo. Todo tu personal de tienda participó o vio el cambio de etiquetas, y aprendió que la fecha de vencimiento es negociable.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Rematar con descuento informando la fecha",
        detail: "Anuncias la oferta indicando con claridad que el producto vence pronto.",
        effects: { cashPct: 1.5, satisfaction: 2, reputation: 2 },
        outcome:
          "Recuperaste buena parte del costo. Los clientes compraron sabiendo qué llevaban, para consumo inmediato, y agradecieron la rebaja.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Donar lo apto y dar de baja el resto",
        detail: "Entregas a un comedor o banco de alimentos lo que aún se puede consumir y documentas la baja.",
        effects: { cashPct: -2, brand: 3, reputation: 4 },
        outcome:
          "Asumiste la pérdida del lote. La donación llegó a tiempo a quienes la necesitaban y revisaste tu planificación de compras para no repetir el exceso.",
        verdict: "buena",
      },
    ],
    concept: "Transparencia con el cliente y mermas",
    lesson:
      "La fecha de vencimiento es información que el cliente tiene derecho a conocer. El producto próximo a vencer se gestiona con remates informados, donaciones y mejor planificación de compras, nunca alterando etiquetas.",
  },
  {
    id: "etica-la-cartera-del-competidor",
    title: "El nuevo vendedor trae la cartera de su exempresa",
    category: "etica",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Contratas a un vendedor que viene de tu principal competidor. En su primer día te ofrece una memoria USB con la lista de clientes, precios y descuentos de su exempleador. «Es mi trabajo de cinco años», dice. Con eso podrías ganar varias cuentas este trimestre.",
    options: [
      {
        id: "a",
        label: "Usar la información de la memoria",
        detail: "Cargas la lista a tu sistema y preparas ofertas por debajo de cada precio.",
        effects: { demandPct: 7, reputation: -4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -7, brand: -3, reputation: -8 },
          text: "El competidor te denuncia por uso de secretos empresariales y presenta pruebas de la copia de archivos.",
        },
        outcome:
          "Ganaste algunas cuentas con ofertas hechas a la medida. Tu equipo vio que llevarse archivos se premia, y el día que ese vendedor se vaya hará lo mismo con los tuyos.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Rechazar la memoria y usar su experiencia",
        detail: "Le pides por escrito no usar documentos de su exempresa. Su conocimiento del mercado sí es suyo.",
        effects: { demandPct: 3, reputation: 4 },
        outcome:
          "El vendedor devolvió la memoria y trabajó con lo que sabe: cómo compran los clientes del rubro y qué valoran. Los resultados llegaron más lento y sin contingencias.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rechazarla e invertir en inteligencia formal",
        detail: "Contratas un estudio de precios y de competidores con fuentes públicas y compradores incógnitos.",
        effects: { cashPct: -1.5, demandPct: 2, reputation: 3 },
        outcome:
          "El estudio te dio un mapa de precios obtenido de forma legítima. Costó dinero y tiempo, y la información te pertenece sin ningún riesgo.",
        verdict: "buena",
      },
    ],
    concept: "Secreto empresarial e inteligencia competitiva",
    lesson:
      "La experiencia de una persona es suya. Las listas de clientes y precios de su exempleador no lo son. La inteligencia competitiva usa fuentes públicas y legítimas. Proteger la información ajena es también proteger la propia.",
  },
  {
    id: "etica-resenas-compradas",
    title: "Una agencia vende reseñas de cinco estrellas",
    category: "etica",
    industries: "all",
    market: "B2C",
    tier: 2,
    situation:
      "Tu calificación en Google y en redes bajó por un par de malas experiencias reales. Una agencia ofrece un paquete de cientos de reseñas de cinco estrellas escritas por perfiles falsos, y un influencer acepta recomendarte sin decir que es publicidad pagada.",
    options: [
      {
        id: "a",
        label: "Comprar el paquete de reseñas",
        detail: "Subes tu calificación en pocos días con opiniones fabricadas.",
        effects: { cashPct: -1, demandPct: 5, brand: 2 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -6, brand: -7, reputation: -7 },
          text: "La plataforma detecta el patrón y borra las reseñas. Un cliente publica capturas que muestran los perfiles falsos.",
        },
        outcome:
          "La calificación subió rápido. Las fallas que causaron las críticas reales siguen sin corregirse, así que los clientes nuevos llegan esperando más de lo que reciben.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Responder críticas y pedir reseñas reales",
        detail: "Contestas cada comentario negativo, corriges la falla e invitas a clientes satisfechos a opinar.",
        effects: { cashPct: -0.5, demandPct: 2, brand: 2, satisfaction: 3, reputation: 3 },
        outcome:
          "La calificación subió de a pocos. Dos clientes que habían reclamado cambiaron su reseña después de recibir una solución.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Contratar al influencer con aviso de publicidad",
        detail: "La recomendación se publica indicando de forma visible que es contenido pagado.",
        effects: { cashPct: -2, demandPct: 4, brand: 2 },
        outcome:
          "El contenido tuvo buen alcance y nadie pudo acusarte de publicidad encubierta. Atrajo clientes nuevos, aunque no resolvió las críticas anteriores.",
        verdict: "buena",
      },
    ],
    concept: "Prueba social auténtica",
    lesson:
      "Las reseñas valen porque el cliente cree que son de otros clientes. Fabricarlas es engañar al consumidor, y la publicidad con influencers debe identificarse como tal. Una crítica bien respondida genera más confianza que cien elogios falsos.",
  },
  {
    id: "etica-comisiones-que-empujan-a-enganar",
    title: "Las comisiones suben las ventas y los reclamos",
    category: "etica",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Tu nuevo esquema de comisiones paga solo por venta cerrada. Las ventas subieron, pero también los reclamos: clientes que dicen que les prometieron cosas que no existen o que les vendieron más de lo que necesitaban. Los vendedores que más ganan son también los más reclamados.",
    options: [
      {
        id: "a",
        label: "Mantener el esquema, las ventas mandan",
        detail: "Atiendes los reclamos caso por caso sin tocar los incentivos.",
        effects: { demandPct: 6, satisfaction: -5 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -6, demandPct: -6, brand: -5, reputation: -7 },
          text: "Las anulaciones y las denuncias ante Indecopi se multiplican, y la cartera se vacía tan rápido como se llenó.",
        },
        outcome:
          "Las ventas brutas siguieron altas. Al descontar anulaciones, devoluciones y tiempo de atención de reclamos, la venta neta creció bastante menos.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Atar la comisión a permanencia y satisfacción",
        detail: "Una parte de la comisión se paga solo si el cliente sigue activo y no presenta reclamos.",
        effects: { demandPct: 2, morale: -2, satisfaction: 4, reputation: 4 },
        risk: {
          prob: 0.25,
          effects: { productivityPct: -3 },
          text: "Dos vendedores de alto rendimiento renuncian porque preferían el esquema anterior.",
        },
        outcome:
          "Las ventas crecieron menos, pero casi no hubo anulaciones. Los vendedores empezaron a preguntar qué necesita el cliente antes de ofrecer.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Eliminar comisiones y pagar sueldo fijo",
        detail: "Quitas el incentivo variable para eliminar la presión por vender a toda costa.",
        effects: { demandPct: -5, fixedCostPct: 2, satisfaction: 3 },
        risk: {
          prob: 0.4,
          effects: { productivityPct: -5, morale: -3 },
          text: "Sin ingreso variable, tus mejores vendedores aceptan ofertas de la competencia.",
        },
        outcome:
          "Los reclamos bajaron, y las ventas también. Eliminaste el mal incentivo junto con el bueno, y el costo de planilla ya no depende de los resultados.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Despedir a los vendedores más reclamados",
        detail: "Sancionas a las personas y dejas el esquema de comisiones como está.",
        effects: { demandPct: -3, morale: -3, reputation: 2 },
        risk: {
          prob: 0.5,
          effects: { satisfaction: -4, reputation: -3 },
          text: "Los reemplazos, con el mismo esquema de pago, repiten las mismas prácticas a los pocos meses.",
        },
        outcome:
          "El mensaje disciplinario fue claro. El sistema de pago que premiaba esa conducta sigue igual, así que cambiaste a las personas y no la causa.",
        verdict: "riesgosa",
      },
    ],
    concept: "Incentivos y conducta de ventas",
    lesson:
      "Las personas hacen aquello por lo que se les paga. Si la comisión premia solo el cierre, fomenta la venta engañosa. Un buen esquema combina volumen con calidad de la venta: permanencia del cliente, anulaciones y reclamos.",
  },
];

export default data;
