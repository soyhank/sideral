import type { Dilemma, IndustryId } from "../types";

/** Empresas que producen o venden bienes físicos. */
const PRODUCTOS: IndustryId[] = [
  "pasteleria",
  "bebidas",
  "restaurante",
  "cafeteria",
  "moda",
  "minimarket",
  "farmacia",
  "ecommerce",
  "autos",
  "agroexport",
  "maquinaria",
];

/** Empresas que fabrican o preparan lo que venden. */
const PRODUCCION: IndustryId[] = [
  "pasteleria",
  "bebidas",
  "restaurante",
  "cafeteria",
  "moda",
  "agroexport",
  "maquinaria",
  "ecommerce",
];

/** Empresas con insumos o mercadería perecible. */
const PERECIBLES: IndustryId[] = [
  "pasteleria",
  "bebidas",
  "restaurante",
  "cafeteria",
  "minimarket",
  "farmacia",
  "agroexport",
];

/** Empresas que guardan mercadería para la venta. */
const CON_STOCK: IndustryId[] = [
  "moda",
  "minimarket",
  "farmacia",
  "ecommerce",
  "maquinaria",
  "autos",
  "bebidas",
];

/** Empresas de consumo que venden en campañas. */
const CAMPANA: IndustryId[] = [
  "pasteleria",
  "bebidas",
  "moda",
  "minimarket",
  "farmacia",
  "ecommerce",
  "cafeteria",
];

/** Empresas que reparten a domicilio. */
const REPARTO: IndustryId[] = [
  "ecommerce",
  "pasteleria",
  "restaurante",
  "farmacia",
  "minimarket",
  "moda",
  "cafeteria",
  "bebidas",
];

/** Empresas cuya operación diaria depende del agua. */
const USO_DE_AGUA: IndustryId[] = [
  "restaurante",
  "cafeteria",
  "pasteleria",
  "bebidas",
  "gimnasio",
  "limpieza",
];

/** Empresas que pueden importar mercadería terminada. */
const IMPORTADORES: IndustryId[] = ["moda", "minimarket", "ecommerce", "maquinaria"];

/** Empresas que contratan flete internacional. */
const COMERCIO_EXTERIOR: IndustryId[] = [
  "agroexport",
  "moda",
  "ecommerce",
  "maquinaria",
  "autos",
  "minimarket",
];

/** Empresas de insumos agrícolas o materias primas sensibles a la escasez. */
const INSUMOS_SENSIBLES: IndustryId[] = [
  "pasteleria",
  "bebidas",
  "restaurante",
  "cafeteria",
  "minimarket",
  "moda",
  "agroexport",
];

/** Empresas que pueden vender productos por internet. */
const VENTA_EN_LINEA: IndustryId[] = [
  "moda",
  "ecommerce",
  "pasteleria",
  "bebidas",
  "farmacia",
  "minimarket",
  "cafeteria",
  "maquinaria",
];

const data: Dilemma[] = [
  // ============ OPERACIONES (18) ============
  {
    id: "ope-corte-luz-campana",
    title: "Corte de luz en plena campaña",
    category: "operaciones",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Es la semana previa al Día de la Madre y la empresa eléctrica anuncia cortes de varias horas en tu zona durante tres días seguidos, por trabajos en la red. Sin energía no funcionan tus equipos, el sistema de ventas ni el POS. Los competidores de otras zonas atenderán con normalidad.",
    options: [
      {
        id: "a",
        label: "Alquilar un grupo electrógeno por la semana",
        detail: "Pagas alquiler y combustible para operar con normalidad durante los cortes.",
        effects: { cashPct: -2, satisfaction: 2 },
        outcome:
          "Operaste sin interrupciones y tomaste pedidos que otros negocios de la zona no pudieron atender. El alquiler costó, pero se pagó con las ventas de la campaña.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Comprar un grupo electrógeno propio",
        detail: "Inviertes en un equipo que queda como respaldo permanente del local.",
        effects: { cashPct: -6, satisfaction: 2 },
        outcome:
          "Quedaste protegido para este y futuros cortes. A cambio, inmovilizaste caja en plena campaña en un equipo que usarás pocas veces al año y que también necesita mantenimiento.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Mover los turnos a las horas con energía",
        detail: "Trasladas la producción y la atención a la madrugada y la noche, pagando horas extra.",
        effects: { cashPct: -1, demandPct: -4, morale: -4 },
        outcome:
          "Cumpliste con buena parte de los pedidos, pero el equipo terminó agotado y los clientes que llegaron en horario de corte se fueron sin comprar.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Atender solo cuando haya luz",
        detail: "No gastas nada y asumes las horas perdidas.",
        effects: { demandPct: -10, satisfaction: -4 },
        outcome:
          "Perdiste tres días de la mejor semana del trimestre. Varios clientes frecuentes compraron en otro lado y algunos no volvieron.",
        verdict: "mala",
      },
    ],
    concept: "Plan de continuidad operativa",
    lesson:
      "El costo de parar no es solo la venta del día, también es el cliente que prueba a la competencia. Un plan de continuidad compara el costo del respaldo con el costo de la parada antes de que ocurra.",
  },
  {
    id: "ope-corte-agua-programado",
    title: "Dos días sin agua en el local",
    category: "operaciones",
    industries: USO_DE_AGUA,
    market: "all",
    tier: 1,
    situation:
      "La empresa de agua anuncia un corte de 48 horas en tu distrito por el mantenimiento de una tubería matriz. Tu operación necesita agua todos los días para producir, limpiar y mantener los servicios higiénicos. El aviso llegó con cuatro días de anticipación.",
    options: [
      {
        id: "a",
        label: "Contratar una cisterna y tanques de reserva",
        detail: "Aseguras agua suficiente para operar completo y con higiene durante el corte.",
        effects: { cashPct: -1.5, satisfaction: 2 },
        outcome:
          "Atendiste los dos días con normalidad mientras varios negocios vecinos cerraron. El gasto fue menor que la venta que habrías perdido.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Operar con oferta reducida y agua almacenada",
        detail: "Llenas bidones y atiendes solo aquello que consume menos agua.",
        effects: { cashPct: -0.5, demandPct: -4 },
        outcome:
          "Mantuviste el local abierto con una oferta limitada. Vendiste menos, pero cuidaste la higiene y los clientes entendieron la situación porque la comunicaste.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Atender normal con el agua que quede",
        detail: "No avisas a nadie y confías en que el tanque del edificio alcance.",
        effects: {},
        risk: {
          prob: 0.45,
          effects: { cashPct: -5, satisfaction: -8, reputation: -8 },
          text: "El agua se acabó a medio turno, un cliente denunció la falta de higiene y la municipalidad multó y clausuró el local por unos días.",
        },
        outcome:
          "Apostaste a que el tanque alcanzaría. Un riesgo que estaba anunciado con cuatro días de anticipación no es mala suerte, es falta de previsión.",
        verdict: "riesgosa",
      },
    ],
    concept: "Gestión de riesgos anunciados",
    lesson:
      "Cuando un riesgo tiene fecha y hora, la respuesta se planifica y se presupuesta. Improvisar frente a un evento anunciado suele costar más que prevenirlo.",
  },
  {
    id: "ope-asalto-caja",
    title: "Asaltan tu local a la hora del cierre",
    category: "operaciones",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Dos sujetos asaltaron tu local de Chiclayo al cierre y se llevaron la venta del día en efectivo. Nadie salió herido, pero el personal quedó asustado. Al revisar notas que casi toda la venta se cobra en efectivo y se guarda en la caja hasta el día siguiente.",
    options: [
      {
        id: "a",
        label: "Impulsar Yape, Plin y tarjeta, y depositar a diario",
        detail: "Reduces el efectivo en el local con pagos digitales y depósitos antes del cierre.",
        effects: { cashPct: -0.5, morale: 3 },
        outcome:
          "En pocas semanas el efectivo en caja bajó a una fracción de lo que era. El local dejó de ser un blanco atractivo y el arqueo diario se volvió más rápido.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Contratar vigilancia y cámaras",
        detail: "Sumas un vigilante en horas punta y un sistema de cámaras con grabación.",
        effects: { cashPct: -2, fixedCostPct: 2, morale: 4, rounds: 4 },
        outcome:
          "El personal se sintió más seguro y no hubo nuevos incidentes. El gasto fijo subió de forma permanente y el efectivo acumulado sigue siendo una tentación.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Tomar un seguro contra robo",
        detail: "Pagas una prima para que la aseguradora cubra pérdidas de dinero y mercadería.",
        effects: { cashPct: -1.5 },
        outcome:
          "Ahora una pérdida futura estaría cubierta hasta el límite de la póliza. El seguro repone el dinero, pero no reduce la probabilidad de otro asalto ni el susto del equipo.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "No cambiar nada, fue mala suerte",
        detail: "Repones la caja y sigues operando igual que antes.",
        effects: { morale: -5 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -4, morale: -6 },
          text: "Volvieron al mes siguiente, a la misma hora, y se llevaron otra vez la caja del día.",
        },
        outcome:
          "El equipo sintió que su seguridad no era prioridad. Un negocio que ya fue asaltado y no cambió nada queda marcado como blanco fácil.",
        verdict: "mala",
      },
    ],
    concept: "Prevención de pérdidas y manejo de efectivo",
    lesson:
      "La primera medida contra el robo es reducir lo que se puede robar. Menos efectivo en caja baja el riesgo y además ordena el control de ingresos.",
  },
  {
    id: "ope-incendio-seguro",
    title: "Un incendio en la cuadra te hace pensar",
    category: "operaciones",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Un cortocircuito incendió un almacén a media cuadra de tu local en el Centro de Lima. No tuviste daños, pero no tienes seguro y tu instalación eléctrica tiene más de quince años. Un corredor te ofrece una póliza multirriesgo que incluye lucro cesante, es decir, la utilidad que dejarías de ganar mientras el local esté parado.",
    options: [
      {
        id: "a",
        label: "Póliza multirriesgo y revisión eléctrica completa",
        detail: "Transfieres el daño mayor a la aseguradora y además reduces la probabilidad de siniestro.",
        effects: { cashPct: -3, fixedCostPct: 1, reputation: 2, rounds: 4 },
        outcome:
          "Renovaste tableros y cableado, y quedaste cubierto por daños y por los días sin vender. Es un gasto que no se nota hasta el día en que salva a la empresa.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Solo renovar la instalación y los extintores",
        detail: "Reduces la probabilidad de incendio, pero si ocurre la pérdida es toda tuya.",
        effects: { cashPct: -2 },
        risk: {
          prob: 0.06,
          effects: { cashPct: -18, demandPct: -15 },
          text: "Un incendio que empezó en el local vecino alcanzó tu almacén y asumiste toda la pérdida.",
        },
        outcome:
          "Bajaste el riesgo que depende de ti. El que depende de tus vecinos sigue ahí y no hay nadie que responda por él.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Solo contratar el seguro más barato",
        detail: "Una póliza básica de incendio, sin lucro cesante y sin tocar la instalación.",
        effects: { cashPct: -1 },
        risk: {
          prob: 0.1,
          effects: { cashPct: -8, demandPct: -10 },
          text: "Hubo un amago por la instalación antigua. El seguro cubrió los daños, pero no las semanas sin vender.",
        },
        outcome:
          "Pagas una prima, pero la causa más probable de un siniestro sigue dentro de tu local y la póliza no cubre el tiempo de parada.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Seguir igual, nunca te ha pasado nada",
        detail: "No gastas en seguro ni en la instalación eléctrica.",
        effects: {},
        risk: {
          prob: 0.12,
          effects: { cashPct: -20, demandPct: -20 },
          text: "Un cortocircuito dejó el local inoperativo y, sin seguro, toda la reposición salió de tu caja.",
        },
        outcome:
          "Ahorraste la prima y la obra. Los riesgos poco probables y muy costosos son justo los que una empresa pequeña no puede absorber sola.",
        verdict: "mala",
      },
    ],
    concept: "Transferencia de riesgo y lucro cesante",
    lesson:
      "Los riesgos frecuentes y pequeños se previenen. Los raros y catastróficos se transfieren con un seguro. Una buena póliza cubre también la utilidad que se pierde durante la parada.",
    basedOn: "Incendios en galerías y almacenes del Centro de Lima, como el de Mesa Redonda en 2001",
  },
  {
    id: "ope-falla-equipo-clave",
    title: "Se malogra tu equipo más importante",
    category: "operaciones",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "El equipo del que depende la mayor parte de tu operación dejó de funcionar un lunes. El técnico autorizado dice que el repuesto original tarda diez días en llegar. El equipo tiene ocho años y esta es su tercera falla en doce meses.",
    options: [
      {
        id: "a",
        label: "Esperar el repuesto y tercerizar mientras tanto",
        detail: "Un tercero cubre parte de tu operación a mayor costo hasta que llegue el repuesto original.",
        effects: { cashPct: -2, costPct: 6 },
        outcome:
          "Cumpliste con tus clientes con menos margen durante dos semanas. El equipo volvió a funcionar, aunque sigue siendo viejo y la cuarta falla es cuestión de tiempo.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Reparación rápida con un técnico informal",
        detail: "Un repuesto alternativo te devuelve la operación en dos días, sin garantía.",
        effects: { cashPct: -0.5 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -3, demandPct: -8, quality: -4 },
          text: "La reparación falló a las tres semanas, dañó otra pieza y paraste más días que si hubieras esperado.",
        },
        outcome:
          "Volviste a operar rápido y barato. Sin garantía ni repuesto original, cada día de trabajo del equipo es una apuesta.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Reemplazar el equipo con un leasing",
        detail: "Cambias a un equipo nuevo y más eficiente, pagando cuotas a una entidad financiera.",
        effects: { cashPct: -2, fixedCostPct: 3, productivityPct: 6, quality: 3, rounds: 4 },
        outcome:
          "El equipo nuevo llegó en pocos días, consume menos y produce más. La cuota mensual resultó menor que lo que venías gastando entre reparaciones y paradas.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Esperar el repuesto y atender lo que se pueda",
        detail: "No gastas de más y operas a media capacidad durante diez días.",
        effects: { demandPct: -10, satisfaction: -5 },
        outcome:
          "Incumpliste pedidos durante casi dos semanas. Lo que ahorraste en tercerizar lo perdiste varias veces en ventas y en confianza.",
        verdict: "mala",
      },
    ],
    concept: "Reparar o reemplazar un activo",
    lesson:
      "Un equipo se reemplaza cuando el costo de mantenerlo (reparaciones más paradas) supera el costo de uno nuevo. El costo de la parada casi siempre pesa más que la factura del técnico.",
  },
  {
    id: "ope-cuello-de-botella",
    title: "Todos trabajan a tope, pero los pedidos no salen",
    category: "operaciones",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Tus entregas salen tarde aunque el personal hace horas extra. Al medir el flujo descubres que una sola etapa del proceso, la revisión final antes de entregar, procesa la mitad de lo que producen las etapas anteriores. El trabajo se acumula delante de ella.",
    options: [
      {
        id: "a",
        label: "Reforzar solo la etapa que limita el flujo",
        detail: "Trasladas personal y recursos a esa etapa, y el resto trabaja al ritmo que ella marca.",
        effects: { cashPct: -2, productivityPct: 10, satisfaction: 4, rounds: 3 },
        outcome:
          "Las entregas casi se duplicaron sin aumentar la planilla total. El trabajo acumulado desapareció en tres semanas y apareció una nueva etapa lenta, mucho menos grave.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Contratar más personal en todas las áreas",
        detail: "Subes la planilla de forma pareja para que todos produzcan más.",
        effects: { fixedCostPct: 8, productivityPct: 2, rounds: 3 },
        outcome:
          "Las primeras etapas produjeron más y la cola delante de la revisión final creció. Pagas más planilla para entregar casi lo mismo.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Pagar más horas extra a todo el equipo",
        detail: "Extiendes la jornada de todas las áreas hasta ponerte al día.",
        effects: { cashPct: -2, productivityPct: 1, morale: -5 },
        outcome:
          "El equipo se agotó y las entregas mejoraron muy poco, porque las horas extra se repartieron entre etapas que no eran el problema.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Aceptar menos pedidos hasta ordenar el proceso",
        detail: "Limitas el ingreso de trabajo a lo que la etapa lenta puede procesar.",
        effects: { demandPct: -6, satisfaction: 5 },
        outcome:
          "Vendiste menos, pero todo lo que prometiste llegó a tiempo. Ganaste orden y tranquilidad, aunque dejaste dinero sobre la mesa.",
        verdict: "buena",
      },
    ],
    concept: "Teoría de restricciones",
    lesson:
      "La capacidad de un proceso es la de su etapa más lenta. Invertir en cualquier otra etapa aumenta el trabajo acumulado, no las entregas.",
  },
  {
    id: "ope-lote-defectuoso",
    title: "Control de calidad detecta un lote con fallas",
    category: "operaciones",
    industries: PRODUCCION,
    market: "all",
    tier: 1,
    situation:
      "Horas antes del despacho, tu encargado de calidad encuentra que un lote completo salió con defectos que el cliente podría no notar a simple vista. El lote equivale a varios días de venta y el pedido vence mañana.",
    options: [
      {
        id: "a",
        label: "Retener el lote, rehacerlo y avisar del retraso",
        detail: "Asumes el costo de producir de nuevo y llamas al cliente antes de que él te llame.",
        effects: { cashPct: -3, satisfaction: -2, quality: 4, reputation: 3 },
        outcome:
          "El cliente se molestó por el retraso, pero valoró el aviso. El lote nuevo llegó bien y encontraste la causa de la falla en el proceso.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Despachar igual y atender reclamos si llegan",
        detail: "Cumples la fecha y confías en que pocos notarán el defecto.",
        effects: {},
        risk: {
          prob: 0.5,
          effects: { cashPct: -5, brand: -6, satisfaction: -10, reputation: -6 },
          text: "Los clientes notaron las fallas, reclamaron en el libro de reclamaciones y en redes, y tuviste que devolver el dinero.",
        },
        outcome:
          "Entregaste a tiempo un producto que sabías defectuoso. Si el cliente lo descubre, el costo ya no es el del lote, es el de tu nombre.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Venderlo como segunda, con descuento y aviso",
        detail: "Informas el defecto, rebajas el precio y repones el pedido original unos días después.",
        effects: { cashPct: -1.5, satisfaction: 1 },
        outcome:
          "Recuperaste parte del costo con clientes que aceptaron el producto sabiendo su estado. El pedido original se entregó con retraso.",
        verdict: "buena",
      },
    ],
    concept: "Costo de la no calidad",
    lesson:
      "Un defecto cuesta poco si se detecta en planta, más si se detecta en el despacho y muchísimo más si lo detecta el cliente. Por eso el control de calidad se paga solo.",
  },
  {
    id: "ope-mermas-sin-control",
    title: "La merma se come tu margen",
    category: "operaciones",
    industries: PERECIBLES,
    market: "all",
    tier: 1,
    situation:
      "Al cruzar compras con ventas descubres que casi uno de cada diez soles de insumos y mercadería nunca llega a venderse: productos vencidos, porciones mal medidas, roturas y algún faltante sin explicación. Nadie registra las causas.",
    options: [
      {
        id: "a",
        label: "Registrar la merma por causa y fijar metas",
        detail: "Pesas, anotas y revisas cada semana qué se pierde y por qué, con un responsable por área.",
        effects: { cashPct: -0.5, costPct: -4, quality: 2, rounds: 4 },
        outcome:
          "A las seis semanas sabías que la mayor pérdida venía de compras excesivas y mal almacenaje. Ajustaste pedidos y rotación, y la merma bajó a menos de la mitad.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Subir precios para compensar la pérdida",
        detail: "Trasladas al cliente el costo de lo que se pierde.",
        effects: { demandPct: -5, rounds: 2 },
        outcome:
          "El margen mejoró en el papel, pero vendiste menos y la merma siguió igual. Tus clientes terminaron pagando tu desorden, hasta que encontraron otra opción.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Descontar los faltantes del sueldo del personal",
        detail: "Trasladas la pérdida a los trabajadores del turno en que se detecta.",
        effects: { costPct: -2, morale: -10 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, reputation: -6 },
          text: "Un trabajador denunció los descuentos no autorizados ante SUNAFIL y la inspección terminó en multa y devolución.",
        },
        outcome:
          "Los faltantes bajaron un poco por miedo, y el clima laboral se deterioró. Castigaste sin saber qué parte de la merma era responsabilidad del personal.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Comprar menos cantidad y con más frecuencia",
        detail: "Reduces lo que se vence o se daña en almacén, a cambio de más pedidos y fletes.",
        effects: { costPct: -2, fixedCostPct: 1, rounds: 3 },
        outcome:
          "Se venció menos mercadería, aunque subió el gasto en transporte y el tiempo dedicado a comprar. Las otras causas de merma siguen sin medirse.",
        verdict: "buena",
      },
    ],
    concept: "Control de mermas",
    lesson:
      "Lo que no se mide no se puede reducir. La merma se gestiona registrando cantidades y causas, no repartiendo culpas ni subiendo precios.",
  },
  {
    id: "ope-inventario-inmovilizado",
    title: "Mercadería que lleva meses sin moverse",
    category: "operaciones",
    industries: CON_STOCK,
    market: "all",
    tier: 2,
    situation:
      "Una cuarta parte de tu almacén es mercadería de la temporada pasada que casi no rota. Está pagada, ocupa espacio y cada mes vale un poco menos. Mientras tanto, te falta caja para comprar lo que sí se vende.",
    options: [
      {
        id: "a",
        label: "Liquidar con descuento fuerte y recomprar lo que rota",
        detail: "Aceptas vender cerca del costo para convertir ese stock en caja.",
        effects: { cashPct: 4, brand: -2 },
        outcome:
          "Recuperaste caja en tres semanas y la invertiste en productos que se venden rápido. Ganaste poco en la liquidación, pero el dinero volvió a trabajar.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Armar paquetes con productos de alta rotación",
        detail: "Combinas lo que no sale con lo que más se vende, a un precio atractivo.",
        effects: { cashPct: 2, demandPct: 2 },
        outcome:
          "Parte del stock lento salió sin castigar tanto el precio. El proceso fue más lento que una liquidación y una porción de la mercadería sigue en almacén.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Guardarla hasta la próxima temporada",
        detail: "Esperas a venderla a precio completo cuando vuelva la demanda.",
        effects: { fixedCostPct: 2, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -3 },
          text: "La mercadería pasó de moda o venció, y terminaste rematándola por debajo del costo.",
        },
        outcome:
          "Seguiste pagando almacenaje por un stock que no genera ingresos. Esperar tiene un costo aunque no aparezca en ninguna factura.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Pedir un préstamo para comprar sin tocar el stock",
        detail: "Financias las compras nuevas y conservas la mercadería antigua.",
        effects: { cashPct: 5, fixedCostPct: 3, rounds: 3 },
        outcome:
          "Tuviste caja para comprar, pero ahora pagas intereses mientras una cuarta parte de tu almacén sigue dormida. Financiaste el problema en lugar de resolverlo.",
        verdict: "mala",
      },
    ],
    concept: "Rotación de inventarios",
    lesson:
      "El inventario es dinero detenido. Un producto que rota poco con buen margen puede rendir menos que uno de margen bajo que se vende todas las semanas.",
  },
  {
    id: "ope-quiebre-stock-campana",
    title: "Te quedas sin stock a mitad de campaña",
    category: "operaciones",
    industries: CAMPANA,
    market: "B2C",
    tier: 2,
    situation:
      "Faltan diez días para Navidad y tu producto estrella se agotó porque la demanda superó tu pronóstico. Por la vía normal, la reposición tarda tres semanas. Los clientes siguen preguntando y están dispuestos a pagar por adelantado en tu web y por WhatsApp.",
    options: [
      {
        id: "a",
        label: "Pedir reposición urgente con flete exprés",
        detail: "Pagas un sobrecosto de producción y transporte para tener stock antes de la fecha clave.",
        effects: { cashPct: -3, demandPct: 6 },
        outcome:
          "El stock llegó seis días antes de Navidad. El margen por unidad fue menor, pero vendiste en la semana de mayor demanda del año y no le regalaste clientes a nadie.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Preventa con fecha real de entrega y un incentivo",
        detail: "Informas que llegará después de la fecha y ofreces un beneficio a quien acepte esperar.",
        effects: { demandPct: -3, satisfaction: 2, reputation: 2 },
        outcome:
          "Una parte de los clientes aceptó esperar y el resto compró otra cosa. Nadie se sintió engañado y cumpliste todas las fechas prometidas.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Seguir vendiendo y prometer entrega antes de Navidad",
        detail: "Cobras ahora y confías en que el proveedor se adelante.",
        effects: { cashPct: 4 },
        risk: {
          prob: 0.65,
          effects: { cashPct: -6, brand: -5, satisfaction: -12, reputation: -8 },
          text: "El stock no llegó a tiempo, los clientes reclamaron ante Indecopi y devolviste el dinero con compensaciones.",
        },
        outcome:
          "Cobraste por regalos que no sabías si podías entregar. En campaña, fallar una fecha es fallar el motivo de la compra.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Ofrecer productos sustitutos de tu catálogo",
        detail: "Rediriges la demanda hacia productos similares que sí tienes en almacén.",
        effects: { demandPct: -2, satisfaction: 1 },
        outcome:
          "Varios clientes aceptaron la alternativa y moviste stock que tenías disponible. Los que querían solo el producto estrella compraron en otra tienda.",
        verdict: "buena",
      },
    ],
    concept: "Stock de seguridad",
    lesson:
      "El stock de seguridad cubre el error del pronóstico y la demora del proveedor. En campaña, el costo de quedarse sin producto suele ser mayor que el de guardar unidades de más.",
  },
  {
    id: "ope-alquiler-sube",
    title: "El dueño del local te sube el alquiler",
    category: "operaciones",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tu contrato de alquiler vence en dos meses y el propietario quiere un aumento de 30 %, porque la zona se ha vuelto más comercial. Llevas cinco años en ese local de Arequipa, tus clientes ya te ubican y has invertido en acondicionarlo.",
    options: [
      {
        id: "a",
        label: "Negociar contrato largo con aumento escalonado",
        detail: "Ofreces permanencia y pago puntual a cambio de un alza menor, repartida en el tiempo.",
        effects: { fixedCostPct: 3, rounds: 4 },
        outcome:
          "El dueño prefirió un inquilino seguro a un local vacío. Firmaron por tres años con aumentos graduales y tu inversión en el local quedó protegida.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Aceptar el aumento para no arriesgar la ubicación",
        detail: "Firmas la renovación con el nuevo precio, sin discutir.",
        effects: { fixedCostPct: 7, rounds: 4 },
        outcome:
          "Conservaste el local, pero tu punto de equilibrio subió y ahora necesitas vender más solo para ganar lo mismo. El dueño ya sabe que aceptas sin negociar.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Mudarte a un local más barato a unas cuadras",
        detail: "Reduces el alquiler, pagas la mudanza y apuestas a que los clientes te sigan.",
        effects: { cashPct: -3, fixedCostPct: -3, demandPct: -6, rounds: 3 },
        outcome:
          "Pagas menos cada mes, pero perdiste parte de la clientela de paso y la inversión hecha en el local anterior. Recuperar el flujo de visitas tomó varios meses.",
        verdict: "buena",
      },
    ],
    concept: "Negociación de costos fijos",
    lesson:
      "Un costo fijo se negocia antes de firmar, no después. Conocer tu alternativa (mudarte) y la del dueño (local vacío) define cuánto poder tienes en la mesa.",
  },
  {
    id: "ope-mudanza-local",
    title: "Tu local quedó chico",
    category: "operaciones",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu local ya no da abasto: el almacén está saturado y los clientes esperan de pie. Encontraste un espacio más grande a veinte minutos, con mejor acceso, pero en una zona donde nadie te conoce. La campaña fuerte del año empieza en seis semanas.",
    options: [
      {
        id: "a",
        label: "Mudarte después de la campaña, avisando con tiempo",
        detail: "Aguantas la campaña en el local actual y te trasladas en temporada baja.",
        effects: { cashPct: -3, satisfaction: -2, productivityPct: 4, rounds: 3 },
        outcome:
          "La campaña fue incómoda pero se vendió. Usaste esas semanas para avisar la nueva dirección a cada cliente y la mudanza se hizo cuando una parada costaba menos.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Mudarte ya para estrenar local en campaña",
        detail: "Apuestas a tener más capacidad justo cuando más la necesitas.",
        effects: { cashPct: -4, productivityPct: 4 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -10, satisfaction: -5 },
          text: "La mudanza se retrasó, abriste a medias en plena campaña y muchos clientes no encontraron el nuevo local.",
        },
        outcome:
          "Una mudanza siempre toma más de lo previsto: permisos, instalaciones, internet. Hacerla contra el reloj de la campaña multiplica el costo de cada imprevisto.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Mantener el local y abrir el nuevo como segundo punto",
        detail: "Operas en dos direcciones y duplicas alquiler, servicios y parte del personal.",
        effects: { cashPct: -5, fixedCostPct: 10, demandPct: 6, rounds: 4 },
        outcome:
          "Ganaste clientes en la nueva zona sin perder a los actuales. Tus gastos fijos subieron más rápido que las ventas y el margen se ajustó durante todo el año.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Quedarte y reorganizar el espacio actual",
        detail: "Rediseñas la distribución, usas la altura del almacén y ordenas los flujos.",
        effects: { cashPct: -1, productivityPct: 2 },
        outcome:
          "Con estanterías altas y una mejor distribución ganaste algo de espacio. Alcanzó para esta campaña, aunque el límite del local sigue ahí.",
        verdict: "buena",
      },
    ],
    concept: "Decisión de localización",
    lesson:
      "Cambiar de local es una decisión de largo plazo que afecta costos, accesibilidad y clientela. El momento del traslado importa tanto como el lugar elegido.",
  },
  {
    id: "ope-accidente-trabajo",
    title: "Un accidente leve enciende las alarmas",
    category: "operaciones",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Un trabajador se lesionó la mano mientras operaba un equipo sin protección. Fue leve, pero al revisar notas que no tienes identificación de peligros, capacitaciones registradas ni equipos de protección para todos. El supervisor sugiere no reportar el accidente para evitar problemas.",
    options: [
      {
        id: "a",
        label: "Implementar el sistema de seguridad y salud",
        detail: "Registras el accidente, identificas peligros, capacitas y entregas equipos de protección.",
        effects: { cashPct: -2.5, productivityPct: 2, morale: 6, reputation: 4 },
        outcome:
          "El equipo participó en identificar los peligros y aparecieron riesgos que nadie había visto. Los incidentes bajaron y el personal sintió que la empresa lo cuida.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Comprar equipos de protección y seguir",
        detail: "Entregas guantes, lentes y calzado, sin cambiar procedimientos ni registros.",
        effects: { cashPct: -1, morale: 2 },
        outcome:
          "El personal quedó mejor protegido. Sin capacitación ni supervisión, varios dejaron de usar los equipos a las pocas semanas.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "No registrar el accidente y pagar la atención",
        detail: "Cubres los gastos médicos en privado y pides discreción al trabajador.",
        effects: { cashPct: -0.3, morale: -4 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -7, morale: -5, reputation: -10 },
          text: "Hubo un segundo accidente más grave. SUNAFIL inspeccionó y encontró que ocultaste el primero y que no tenías sistema de prevención.",
        },
        outcome:
          "El problema desapareció del papel, no del taller. El equipo entendió que un accidente se esconde en lugar de corregirse.",
        verdict: "mala",
      },
    ],
    concept: "Seguridad y salud en el trabajo",
    lesson:
      "Un accidente leve es un aviso gratuito. Investigarlo y corregir la causa cuesta mucho menos que un accidente grave, una paralización o una sanción.",
    basedOn: "Ley de Seguridad y Salud en el Trabajo del Perú (Ley 29783)",
  },
  {
    id: "ope-mantenimiento-preventivo",
    title: "Mantenimiento: ahora o cuando falle",
    category: "operaciones",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tu jefe de operaciones propone parar dos días cada trimestre para dar mantenimiento a los equipos y vehículos. Hasta hoy solo se repara cuando algo se malogra, y el último año hubo cuatro paradas imprevistas en días de alta venta.",
    options: [
      {
        id: "a",
        label: "Aprobar el programa en días de baja venta",
        detail: "Programas las paradas en las fechas de menor demanda y llevas un registro por equipo.",
        effects: { cashPct: -1.5, productivityPct: 5, quality: 2, rounds: 4 },
        outcome:
          "Las paradas imprevistas casi desaparecieron. Cambiar piezas antes de que fallen resultó más barato que las reparaciones de emergencia del año anterior.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Seguir reparando solo cuando algo falle",
        detail: "Evitas el gasto programado y las paradas planificadas.",
        effects: {},
        risk: {
          prob: 0.5,
          effects: { cashPct: -4, demandPct: -6, satisfaction: -4 },
          text: "Un equipo clave falló en plena semana de campaña y la reparación de emergencia costó el triple.",
        },
        outcome:
          "Este trimestre no gastaste en mantenimiento. Las fallas no avisan y suelen llegar cuando el equipo trabaja más, es decir, cuando más vendes.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Dar mantenimiento solo al equipo más crítico",
        detail: "Concentras el presupuesto en el equipo cuya parada detiene toda la operación.",
        effects: { cashPct: -0.7, productivityPct: 3, rounds: 4 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -2, demandPct: -3 },
          text: "Falló uno de los equipos que quedaron fuera del programa.",
        },
        outcome:
          "Protegiste lo más importante con poco presupuesto. El resto de equipos sigue dependiendo de la suerte.",
        verdict: "buena",
      },
    ],
    concept: "Mantenimiento preventivo",
    lesson:
      "El mantenimiento preventivo cambia paradas imprevistas y caras por paradas programadas y baratas. Se decide comparando su costo con el costo total de una falla.",
  },
  {
    id: "ope-certificacion-calidad",
    title: "El gran cliente exige una certificación",
    category: "operaciones",
    industries: "all",
    market: "B2B",
    tier: 3,
    situation:
      "Una cadena importante quiere comprarte de forma regular, pero exige que en seis meses cuentes con una certificación de gestión de calidad o de inocuidad (ISO 9001 o HACCP, según tu rubro). Hoy tus procesos funcionan, aunque casi nada está documentado.",
    options: [
      {
        id: "a",
        label: "Certificarte con una certificadora acreditada",
        detail: "Documentas procesos, capacitas al equipo y pasas una auditoría externa real.",
        effects: { cashPct: -6, demandPct: 8, productivityPct: 3, quality: 8, reputation: 4, rounds: 4 },
        outcome:
          "El proceso tomó cinco meses y mucho esfuerzo interno. Ganaste el contrato y, con el certificado, pudiste postular a otros clientes que antes ni te recibían.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Comprar un certificado exprés sin auditoría real",
        detail: "Un intermediario ofrece el documento en dos semanas, sin revisar tus procesos.",
        effects: { cashPct: -1, demandPct: 8, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -6, demandPct: -10, brand: -5, reputation: -12 },
          text: "El cliente verificó el certificado con el organismo de acreditación, descubrió que no era válido y canceló el contrato.",
        },
        outcome:
          "Conseguiste el papel sin cambiar nada en la operación. Los clientes grandes verifican los certificados y auditan a sus proveedores.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Documentar procesos ahora y certificar después",
        detail: "Ordenas la operación por tu cuenta y dejas la auditoría externa para el próximo año.",
        effects: { cashPct: -2, productivityPct: 2, quality: 4 },
        outcome:
          "Tu operación mejoró y quedaste a medio camino de la certificación. El cliente no esperó y firmó con un competidor que ya estaba certificado.",
        verdict: "buena",
      },
    ],
    concept: "Certificaciones de calidad",
    lesson:
      "Una certificación vale por el sistema que obliga a construir y por las puertas que abre. Funciona como barrera de entrada: protege a quien la tiene y excluye a quien no.",
  },
  {
    id: "ope-capacidad-ociosa",
    title: "Media operación parada en temporada baja",
    category: "operaciones",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "En los meses bajos usas apenas la mitad de tu capacidad, pero el alquiler, los equipos y la planilla fija se pagan igual. Una empresa de otra ciudad te propone un pedido grande a un precio menor que tu lista: cubre los costos variables y deja un margen pequeño.",
    options: [
      {
        id: "a",
        label: "Aceptar el pedido, fuera de tu mercado habitual",
        detail: "Usas la capacidad libre con un precio que supera el costo variable y aporta a los fijos.",
        effects: { cashPct: 4, productivityPct: 3 },
        outcome:
          "El pedido no dio una gran utilidad, pero cada sol por encima del costo variable ayudó a pagar gastos fijos que igual tenías. Tus clientes habituales no se enteraron.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Rechazarlo para no vender bajo tu precio de lista",
        detail: "Proteges tu política de precios y esperas a que vuelva la demanda.",
        effects: {},
        outcome:
          "Tu precio quedó intacto y tu capacidad, vacía. Los gastos fijos del trimestre se pagaron completos con la mitad de las ventas.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Reducir un turno y adelantar vacaciones",
        detail: "Bajas el gasto mientras dure la temporada baja, de acuerdo con el personal.",
        effects: { fixedCostPct: -4, morale: -3 },
        outcome:
          "Redujiste el gasto sin despedir a nadie. El alquiler y los equipos siguieron costando lo mismo por una capacidad que no usaste.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Ofrecer ese precio bajo a todos tus clientes",
        detail: "Lanzas una rebaja general para llenar la capacidad.",
        effects: { cashPct: -4, demandPct: 8, brand: -4 },
        outcome:
          "Vendiste más unidades, pero rebajaste también las ventas que ya tenías aseguradas a precio completo. Tus clientes ahora esperan la rebaja para comprar.",
        verdict: "mala",
      },
    ],
    concept: "Margen de contribución y capacidad ociosa",
    lesson:
      "Con capacidad libre, un pedido conviene si su precio supera el costo variable, porque el costo fijo ya está pagado. La condición es que no dañe el precio en tu mercado principal.",
  },
  {
    id: "ope-estacionalidad",
    title: "Ventas que se concentran en pocas semanas",
    category: "operaciones",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Casi la mitad de tu venta anual ocurre en dos campañas y el resto del año sobran personal y espacio. En la última campaña no te diste abasto y en los meses bajos la planilla te dejó sin caja.",
    options: [
      {
        id: "a",
        label: "Planilla base y personal temporal en campaña",
        detail: "Contratas formalmente por temporada y capacitas al personal eventual antes del pico.",
        effects: { cashPct: -1, fixedCostPct: -5, quality: -2, rounds: 4 },
        outcome:
          "Tus gastos fijos bajaron en los meses flojos y en campaña tuviste manos suficientes. El personal eventual necesitó supervisión y la calidad se resintió un poco.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Lanzar una línea que se venda en los meses bajos",
        detail: "Desarrollas un producto o servicio con demanda en la temporada contraria.",
        effects: { cashPct: -4, demandPct: 6, rounds: 4 },
        outcome:
          "La nueva línea tardó en arrancar, pero empezó a llenar los meses vacíos con el mismo personal y el mismo local. Exigió inversión y atención de la gerencia.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Mantener todo el personal fijo todo el año",
        detail: "Conservas el equipo completo para no perder experiencia.",
        effects: { morale: 3, fixedCostPct: 3, rounds: 3 },
        outcome:
          "El equipo agradeció la estabilidad. La caja volvió a ajustarse en los meses bajos y tuviste que recurrir al sobregiro para pagar la planilla.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Personal eventual sin contrato, pagado en efectivo",
        detail: "Llamas gente solo en campaña, fuera de planilla y sin beneficios.",
        effects: { fixedCostPct: -7, rounds: 4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -6, morale: -4, reputation: -10 },
          text: "SUNAFIL fiscalizó en plena campaña, encontró trabajadores fuera de planilla y aplicó una multa.",
        },
        outcome:
          "El costo laboral bajó de inmediato. También asumiste el riesgo de una inspección y de un accidente sin seguro en los días de mayor trabajo.",
        verdict: "mala",
      },
    ],
    concept: "Gestión de la estacionalidad",
    lesson:
      "Un negocio estacional se gestiona volviendo variables los costos que se pueda y buscando ingresos para los meses bajos. La planilla fija se dimensiona para el mes normal, no para el pico.",
  },
  {
    id: "ope-ultima-milla",
    title: "El reparto a domicilio llega tarde",
    category: "operaciones",
    industries: REPARTO,
    market: "B2C",
    tier: 2,
    situation:
      "Tus pedidos a domicilio crecieron, pero uno de cada cinco llega tarde o en mal estado y las quejas se acumulan en redes. Hoy repartes en Lima con dos motorizados propios que no se dan abasto en horas punta.",
    options: [
      {
        id: "a",
        label: "Tercerizar todo con un courier con seguimiento",
        detail: "Pagas por entrega y el cliente puede ver en línea dónde está su pedido.",
        effects: { costPct: 3, satisfaction: 5, rounds: 3 },
        outcome:
          "Las entregas mejoraron y tu costo se volvió variable. Perdiste control sobre el trato al cliente en la puerta y dependes de la capacidad del courier en campañas.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Ampliar tu flota propia de motorizados",
        detail: "Compras motos y contratas repartidores en planilla.",
        effects: { cashPct: -3, fixedCostPct: 5, satisfaction: 6, rounds: 3 },
        outcome:
          "En horas punta el servicio mejoró mucho. En horas valle tienes motos y repartidores sin pedidos, y un gasto fijo que no baja cuando bajan las ventas.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Pasar el reparto a aplicativos de delivery",
        detail: "Usas su red de repartidores y pagas una comisión por cada pedido.",
        effects: { costPct: 6, demandPct: 5, satisfaction: 3, rounds: 3 },
        outcome:
          "Ganaste cobertura y nuevos clientes que te encontraron en el aplicativo. La comisión se llevó buena parte del margen y los datos del cliente quedaron en la plataforma.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Flota propia en zonas cercanas y courier en las lejanas",
        detail: "Divides por zonas según el costo por entrega y sumas puntos de recojo.",
        effects: { cashPct: -1.5, costPct: 1, satisfaction: 7, rounds: 3 },
        outcome:
          "Tus motorizados hicieron más entregas por hora en rutas cortas y el courier cubrió los distritos alejados. El costo por pedido bajó y las quejas también.",
        verdict: "optima",
      },
    ],
    concept: "Logística de última milla",
    lesson:
      "La última milla es el tramo más caro y el que más recuerda el cliente. Se gestiona midiendo el costo por entrega en cada zona, no con una sola solución para toda la ciudad.",
  },
  // ============ PROVEEDORES (14) ============
  {
    id: "prov-unico-sube-precios",
    title: "Tu único proveedor sube precios 20 %",
    category: "proveedores",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Compras tu insumo principal a un solo proveedor desde hace años. Hoy te avisa que desde el próximo mes sube sus precios 20 % y que no hay nada que negociar. No tienes ningún otro proveedor evaluado.",
    options: [
      {
        id: "a",
        label: "Aceptar el alza y trasladarla a tus precios",
        detail: "Mantienes al proveedor y subes tu lista de precios en la misma proporción.",
        effects: { costPct: 8, demandPct: -5, rounds: 2 },
        outcome:
          "Protegiste parte del margen, pero algunos clientes se fueron con competidores que no subieron. Tu proveedor confirmó que puede subirte cuando quiera.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Cotizar con otros proveedores y repartir compras",
        detail: "Evalúas alternativas, pruebas muestras y divides el volumen entre dos o tres.",
        effects: { cashPct: -0.5, costPct: 3, rounds: 2 },
        outcome:
          "Cuando tu proveedor supo que ya tenías cotizaciones, redujo el aumento a menos de la mitad. Desde entonces compras a dos empresas y ninguna te impone condiciones.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Aceptar el alza y absorberla en tu margen",
        detail: "No cambias de proveedor ni de precios para no incomodar a nadie.",
        effects: { costPct: 10, rounds: 3 },
        outcome:
          "Tus clientes no notaron nada y tu utilidad sí. Con el margen reducido, cualquier otro imprevisto del trimestre te deja en pérdida.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Cambiar todo al proveedor más barato que aparezca",
        detail: "Reemplazas de inmediato al proveedor actual, sin periodo de prueba.",
        effects: { costPct: -3, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -4, quality: -6, satisfaction: -5 },
          text: "El nuevo proveedor entregó calidad irregular y varios clientes notaron el cambio.",
        },
        outcome:
          "Bajaste el costo de compra y cambiaste una dependencia por otra, esta vez con una empresa que no conoces.",
        verdict: "riesgosa",
      },
    ],
    concept: "Poder de negociación del proveedor",
    lesson:
      "Un proveedor único tiene poder porque cambiarlo cuesta. Ese poder se reduce antes de la crisis, con alternativas evaluadas y compras repartidas.",
  },
  {
    id: "prov-incumple-entregas",
    title: "El proveedor que siempre llega tarde",
    category: "proveedores",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu proveedor de confianza entregó tarde tres veces este trimestre y cada retraso te hizo incumplir con tus propios clientes. Se disculpa y promete mejorar, pero no hay nada firmado: todo se acuerda por WhatsApp.",
    options: [
      {
        id: "a",
        label: "Firmar un acuerdo con plazos y penalidades",
        detail: "Pones por escrito fechas, cantidades, calidad y el descuento que aplica si incumple.",
        effects: { cashPct: -0.5, productivityPct: 2, satisfaction: 3 },
        outcome:
          "Con el acuerdo firmado, el proveedor empezó a priorizar tus pedidos. Cuando se retrasó una vez, el descuento pactado se aplicó sin discusiones.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Cambiar de proveedor de inmediato",
        detail: "Cortas la relación y pasas todas las compras a una empresa nueva.",
        effects: { cashPct: -1 },
        risk: {
          prob: 0.35,
          effects: { demandPct: -5, quality: -3 },
          text: "El proveedor nuevo tardó en entender tus especificaciones y el primer mes hubo más fallas que antes.",
        },
        outcome:
          "Te liberaste de los retrasos conocidos. También perdiste a alguien que conocía tu negocio, y empezar con otro tiene su propia curva de aprendizaje.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Subir tu inventario para cubrir sus retrasos",
        detail: "Compras más cantidad por adelantado para no depender de la fecha de entrega.",
        effects: { cashPct: -3, fixedCostPct: 1, satisfaction: 2 },
        outcome:
          "Dejaste de fallarle a tus clientes. El costo lo pagas tú, con más caja inmovilizada en almacén, mientras el proveedor sigue sin corregir nada.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Darle otra oportunidad sin cambiar nada",
        detail: "Aceptas la disculpa y mantienes el trato de palabra.",
        effects: {},
        risk: {
          prob: 0.6,
          effects: { demandPct: -6, satisfaction: -6 },
          text: "Volvió a fallar en la semana de mayor venta y perdiste a un cliente importante.",
        },
        outcome:
          "La relación siguió cordial. Sin consecuencias pactadas, el proveedor atiende primero a los clientes que sí le exigen.",
        verdict: "mala",
      },
    ],
    concept: "Acuerdos de nivel de servicio",
    lesson:
      "Lo que no está escrito no se puede exigir. Un acuerdo de nivel de servicio define qué se entrega, cuándo y qué pasa si no se cumple.",
  },
  {
    id: "prov-compra-por-volumen",
    title: "Descuento tentador por comprar seis meses de stock",
    category: "proveedores",
    industries: PRODUCTOS,
    market: "all",
    tier: 1,
    situation:
      "Tu proveedor ofrece 15 % de descuento si compras de una vez lo que consumes en seis meses. Tendrías que usar casi toda tu caja y alquilar espacio adicional. Parte de la mercadería tiene fecha de vencimiento o puede quedar desfasada.",
    options: [
      {
        id: "a",
        label: "Comprar los seis meses y aprovechar el descuento",
        detail: "Pagas todo hoy, recibes todo hoy y almacenas.",
        effects: { cashPct: -10, costPct: -8, fixedCostPct: 2, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -5 },
          text: "Parte del stock venció o perdió valor antes de venderse y te faltó caja para pagar la planilla.",
        },
        outcome:
          "Tu costo unitario bajó bastante. A cambio tienes la caja convertida en cajas de mercadería, un almacén extra que pagar y poco margen para un imprevisto.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Negociar el descuento con entregas mensuales",
        detail: "Te comprometes al volumen total, pero recibes y pagas por partes.",
        effects: { costPct: -5, rounds: 2 },
        outcome:
          "El proveedor aceptó un descuento algo menor a cambio de un compromiso de compra por seis meses. Bajaste costos sin vaciar la caja ni llenar el almacén.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Seguir comprando lo de siempre",
        detail: "Mantienes tus pedidos habituales al precio normal.",
        effects: {},
        outcome:
          "Conservaste tu liquidez y tu flexibilidad. Dejaste pasar un ahorro que, con algo de negociación, podías capturar en parte.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Comprar en conjunto con otros negocios del rubro",
        detail: "Juntan pedidos para alcanzar el volumen y cada uno paga y recibe su parte.",
        effects: { cashPct: -0.3, costPct: -4, rounds: 2 },
        outcome:
          "Coordinar con otros empresarios tomó tiempo y reuniones, pero lograron el precio por volumen sin que nadie cargara con todo el stock.",
        verdict: "buena",
      },
    ],
    concept: "Lote económico de compra",
    lesson:
      "Comprar más barato no siempre es comprar mejor. Al descuento hay que restarle el costo de almacenar, el riesgo de vencimiento y el costo de quedarse sin caja.",
  },
  {
    id: "prov-importar-de-china",
    title: "Importar de China o comprar en Lima",
    category: "proveedores",
    industries: IMPORTADORES,
    market: "all",
    tier: 3,
    situation:
      "Un fabricante de China te ofrece tu producto principal a la mitad del precio que pagas a tu mayorista local. Pide pago adelantado, un pedido mínimo de un contenedor y entrega en unos tres meses. Al precio de fábrica debes sumarle flete, seguro, aranceles, IGV, agente de aduana y almacenaje.",
    options: [
      {
        id: "a",
        label: "Importar el contenedor completo con pago adelantado",
        detail: "Apuestas por el mayor ahorro unitario y pagas todo antes del embarque.",
        effects: { cashPct: -12, costPct: -12, rounds: 3 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -6, quality: -5 },
          text: "La mercadería llegó con retraso y una parte no cumplía con la muestra aprobada. Reclamar a distancia fue lento y caro.",
        },
        outcome:
          "Tu costo unitario bajó mucho. También comprometiste buena parte de tu caja durante tres meses con un proveedor al que nunca le habías comprado.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Importar una carga de prueba con inspección",
        detail: "Traes carga consolidada, contratas inspección en origen y pagas contra documentos.",
        effects: { cashPct: -4, costPct: -5, rounds: 3 },
        outcome:
          "El ahorro fue menor que con el contenedor completo, pero conociste el costo real puesto en tu almacén, los tiempos de aduana y la seriedad del fabricante.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Seguir con el mayorista y pedir mejor precio",
        detail: "Usas la cotización de China como argumento para negociar localmente.",
        effects: { costPct: -2, rounds: 2 },
        outcome:
          "El mayorista mejoró un poco su precio para no perderte. Sigues con entrega inmediata, crédito y cambios, que también tienen valor.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Traerlo declarando menos valor en aduana",
        detail: "Un tramitador ofrece subvaluar la mercadería para pagar menos tributos.",
        effects: { costPct: -14, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -12, reputation: -15 },
          text: "La aduana de SUNAT detectó la subvaluación, inmovilizó la mercadería y aplicó multas.",
        },
        outcome:
          "Pagaste menos tributos en el ingreso. La aduana compara valores declarados con precios de referencia, y una subvaluación deja rastro en cada documento.",
        verdict: "mala",
      },
    ],
    concept: "Costo total de importación",
    lesson:
      "El precio de fábrica no es el costo. Se compara el costo puesto en almacén, que incluye flete, seguro, tributos, aduana, financiamiento y el riesgo de tres meses de espera.",
  },
  {
    id: "prov-informal-sin-factura",
    title: "El proveedor sin factura cobra menos",
    category: "proveedores",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Un proveedor informal te ofrece el mismo insumo 15 % más barato, pero no entrega factura ni guía de remisión. Tu proveedor formal cuesta más, aunque con su factura usas el crédito fiscal del IGV y sustentas el gasto ante SUNAT.",
    options: [
      {
        id: "a",
        label: "Seguir con el proveedor formal",
        detail: "Pagas el precio de lista y conservas el comprobante de cada compra.",
        effects: { reputation: 2 },
        outcome:
          "Al hacer la cuenta completa, el IGV que recuperas y el gasto que deduces hacían que la oferta informal no fuera realmente más barata.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Comprar todo al proveedor informal",
        detail: "Aprovechas el menor precio y pagas en efectivo.",
        effects: { costPct: -6, reputation: -3, rounds: 2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -8, reputation: -10 },
          text: "SUNAT encontró mercadería sin sustento en una fiscalización, desconoció los gastos y aplicó multas.",
        },
        outcome:
          "Tu caja lo sintió de inmediato. Sin factura no hay crédito fiscal ni gasto deducible, y tampoco a quién reclamar si el insumo llega mal.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Proponerle que se formalice para comprarle",
        detail: "Le ofreces un volumen de compra estable si obtiene RUC y emite comprobantes.",
        effects: { costPct: -3, rounds: 2 },
        outcome:
          "El proveedor se formalizó al ver un cliente seguro. Su precio subió algo, pero siguió por debajo del anterior y ahora todo está sustentado.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Comprar la mitad con factura y la mitad sin ella",
        detail: "Mezclas ambas fuentes para bajar el costo promedio.",
        effects: { costPct: -3, rounds: 2 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -5, reputation: -8 },
          text: "En un control en carretera decomisaron la mercadería sin guía de remisión y SUNAT amplió la revisión a tus compras.",
        },
        outcome:
          "El costo promedio bajó. Tu inventario ya no cuadra con tus comprobantes, y esa diferencia es lo primero que busca una fiscalización.",
        verdict: "riesgosa",
      },
    ],
    concept: "Costo real de comprar sin factura",
    lesson:
      "El precio sin factura se compara con el precio formal sin IGV y después del ahorro en impuesto a la renta. Hecha esa cuenta, la ventaja del informal suele desaparecer.",
  },
  {
    id: "prov-pago-caja-ajustada",
    title: "No alcanza para pagar a todos los proveedores",
    category: "proveedores",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Este mes la caja solo cubre el 60 % de las facturas de proveedores que vencen. Tienes un proveedor crítico sin el cual no operas, varios medianos y algunos pequeños que dependen de tu pago para su propia planilla.",
    options: [
      {
        id: "a",
        label: "Llamar a cada uno y proponer un cronograma",
        detail: "Pagas primero lo crítico y acuerdas fechas realistas con el resto antes del vencimiento.",
        effects: { cashPct: -0.5, reputation: 3 },
        outcome:
          "Casi todos aceptaron porque avisaste antes de fallar y cumpliste las nuevas fechas. Un par pidió un pequeño interés, que resultó más barato que el sobregiro.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Pagar al proveedor crítico y no contestar al resto",
        detail: "Aseguras la operación y dejas que los demás esperen.",
        effects: { cashPct: 3, reputation: -6 },
        risk: {
          prob: 0.5,
          effects: { costPct: 5, reputation: -4 },
          text: "Dos proveedores te cortaron el crédito y ahora solo te venden al contado.",
        },
        outcome:
          "Seguiste operando y te quedaste con caja este mes. Los proveedores perdonan una demora avisada, no un silencio.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Tomar un préstamo de corto plazo y pagar a todos",
        detail: "Una caja municipal te presta capital de trabajo con intereses.",
        effects: { cashPct: -1.5, fixedCostPct: 1, reputation: 2 },
        outcome:
          "Todos cobraron a tiempo y tu historial con proveedores quedó limpio. Pagas intereses por un problema que quizá se resolvía conversando.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Pagar a todos una parte, en la misma proporción",
        detail: "Repartes la caja disponible sin distinguir entre proveedores.",
        effects: { reputation: -2 },
        risk: {
          prob: 0.35,
          effects: { demandPct: -5 },
          text: "El proveedor crítico, al recibir solo una parte, suspendió el despacho y paraste dos días.",
        },
        outcome:
          "Pareció lo más justo, pero nadie quedó conforme. No todos los proveedores tienen el mismo peso en tu operación.",
        verdict: "riesgosa",
      },
    ],
    concept: "Priorización de pagos",
    lesson:
      "Cuando la caja no alcanza, se prioriza por impacto en la operación y se negocia antes del vencimiento. El crédito de proveedores se sostiene en la confianza, y la confianza en avisar a tiempo.",
  },
  {
    id: "prov-negociacion-plazos",
    title: "Cobras a 60 días y pagas a 15",
    category: "proveedores",
    industries: "all",
    market: "B2B",
    tier: 2,
    situation:
      "Tus clientes corporativos te pagan a 60 días, pero tú pagas a tus proveedores a 15. Cuanto más vendes, más caja te falta, y ya usaste dos veces el sobregiro. Tu volumen de compra se duplicó en un año.",
    options: [
      {
        id: "a",
        label: "Negociar 45 días con tus proveedores",
        detail: "Usas tu mayor volumen y tu historial de pago puntual como argumentos.",
        effects: { cashPct: 4, reputation: 1 },
        outcome:
          "Los proveedores principales aceptaron ampliar el plazo para asegurar a un cliente que crece. La brecha entre cobrar y pagar se redujo y dejaste el sobregiro.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Adelantar el cobro de tus facturas con factoring",
        detail: "Una entidad financiera te adelanta el dinero de tus facturas a cambio de un descuento.",
        effects: { cashPct: 5, fixedCostPct: 2, rounds: 2 },
        outcome:
          "Tuviste liquidez inmediata sin endeudarte con un préstamo. El descuento se lleva parte del margen de cada venta, así que funciona como solución puntual.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Alargar los pagos por tu cuenta, sin avisar",
        detail: "Pagas cuando te cobran, sin renegociar nada.",
        effects: { cashPct: 4, reputation: -6 },
        risk: {
          prob: 0.45,
          effects: { costPct: 5, rounds: 2 },
          text: "Los proveedores te retiraron el crédito y subieron precios por el riesgo de cobrarte tarde.",
        },
        outcome:
          "La caja respiró unas semanas. Te financiaste con tus proveedores sin su permiso, y ellos lo notaron.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Dejar de vender a crédito",
        detail: "Exiges pago al contado o rechazas pedidos a 60 días.",
        effects: { cashPct: 2, demandPct: -10, rounds: 2 },
        outcome:
          "La caja mejoró, pero los clientes corporativos trabajan con plazos y varios se fueron con proveedores que sí los aceptan.",
        verdict: "riesgosa",
      },
    ],
    concept: "Ciclo de conversión de efectivo",
    lesson:
      "Una empresa rentable puede quebrar por falta de caja si cobra mucho después de pagar. Crecer exige financiar esa brecha o acortarla negociando plazos.",
  },
  {
    id: "prov-contrato-exclusividad",
    title: "Exclusividad a cambio de mejor precio",
    category: "proveedores",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Un proveedor grande te ofrece 12 % de descuento y prioridad de entrega si firmas exclusividad por tres años: no podrías comprar a nadie más. El contrato incluye una penalidad si lo rompes y no dice cómo se reajustarán los precios.",
    options: [
      {
        id: "a",
        label: "Firmar el contrato tal como está",
        detail: "Aseguras el descuento y la prioridad de entrega desde el primer día.",
        effects: { costPct: -7, rounds: 4 },
        risk: {
          prob: 0.4,
          effects: { costPct: 10, rounds: 3 },
          text: "Al segundo año el proveedor subió precios y, atado por la exclusividad, no pudiste cambiar sin pagar la penalidad.",
        },
        outcome:
          "El primer año el ahorro fue real. El contrato le da al proveedor la última palabra sobre precios durante los dos años que quedan.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Negociar un año, reajuste definido y salida",
        detail: "Pides plazo menor, fórmula de reajuste de precios y una cláusula de salida razonable.",
        effects: { cashPct: -0.5, costPct: -5, rounds: 4 },
        outcome:
          "El descuento final fue algo menor, pero el contrato quedó equilibrado: sabes cómo pueden cambiar los precios y cuánto cuesta salir.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rechazar y mantener varios proveedores",
        detail: "Conservas tu libertad de compra y los precios actuales.",
        effects: {},
        outcome:
          "No ganaste el descuento y mantuviste tu poder de negociación. Si un proveedor falla o sube precios, tienes a quién recurrir.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Firmar y comprar a otros a escondidas",
        detail: "Tomas el descuento y sigues comprando una parte a proveedores más baratos.",
        effects: { costPct: -8, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -8, reputation: -8 },
          text: "El proveedor detectó el incumplimiento, cobró la penalidad del contrato y cortó el suministro.",
        },
        outcome:
          "Tuviste lo mejor de los dos mundos por un tiempo. En un mercado pequeño, los proveedores se enteran de quién compra a quién.",
        verdict: "mala",
      },
    ],
    concept: "Contrato de exclusividad",
    lesson:
      "La exclusividad se paga con dependencia. Antes de firmar se revisan el plazo, la fórmula de reajuste de precios, las penalidades y la cláusula de salida.",
  },
  {
    id: "prov-escasez-insumo",
    title: "Tu insumo principal escasea en todo el mercado",
    category: "proveedores",
    industries: INSUMOS_SENSIBLES,
    market: "all",
    tier: 2,
    situation:
      "Una mala campaña agrícola dejó al mercado con poca oferta de tu insumo principal. El precio se duplicó en semanas y los proveedores entregan por cuotas. Tus productos más vendidos dependen de ese insumo.",
    options: [
      {
        id: "a",
        label: "Impulsar los productos que usan otros insumos",
        detail: "Reordenas tu oferta y tus promociones hacia lo que no depende del insumo escaso.",
        effects: { costPct: 3, demandPct: -2 },
        outcome:
          "Tus clientes probaron otras opciones de tu catálogo y el margen se sostuvo. Los productos afectados siguieron disponibles, en menor cantidad.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Subir el precio de los productos afectados",
        detail: "Trasladas parte del alza y explicas el motivo de forma visible.",
        effects: { costPct: 6, demandPct: -5, satisfaction: -1 },
        outcome:
          "La mayoría entendió, porque el alza estaba en todas las noticias. Vendiste menos unidades de esos productos y protegiste el margen.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Reemplazarlo por algo más barato sin avisar",
        detail: "Cambias el insumo por un sustituto de menor calidad y mantienes el precio.",
        effects: { costPct: -2 },
        risk: {
          prob: 0.5,
          effects: { brand: -5, satisfaction: -8, reputation: -5 },
          text: "Los clientes notaron el cambio, se sintieron engañados y lo comentaron en redes.",
        },
        outcome:
          "El costo no subió y el producto dejó de ser el mismo. El cliente frecuente reconoce la diferencia antes que nadie.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Comprar todo el insumo que encuentres",
        detail: "Aseguras stock para varios meses al precio actual, por si sigue subiendo.",
        effects: { cashPct: -6 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4 },
          text: "El precio se normalizó antes de lo esperado y te quedaste con stock caro, que además se malogró en parte.",
        },
        outcome:
          "Garantizaste el abastecimiento a un precio muy alto. Acaparar en el pico es apostar a que la escasez dure más de lo que dura tu stock.",
        verdict: "riesgosa",
      },
    ],
    concept: "Sustitución de insumos",
    lesson:
      "Frente a la escasez de un insumo hay tres salidas: sustituir, reformular la oferta o trasladar el precio. Las tres funcionan si el cliente está informado.",
    basedOn: "Alza del precio del limón en el Perú durante 2023",
  },
  {
    id: "prov-flete-maritimo",
    title: "El flete marítimo se triplica",
    category: "proveedores",
    industries: COMERCIO_EXTERIOR,
    market: "all",
    tier: 3,
    situation:
      "El costo del contenedor se triplicó en pocos meses por la congestión en los puertos. Tu próximo embarque está pactado en condiciones en las que tú contratas y pagas el flete. La naviera ofrece un contrato anual a tarifa fija, más alta que la histórica y más baja que la actual.",
    options: [
      {
        id: "a",
        label: "Firmar el contrato anual a tarifa fija",
        detail: "Aseguras espacio y precio conocido durante doce meses.",
        effects: { costPct: 4, rounds: 4 },
        risk: {
          prob: 0.3,
          effects: { costPct: 3, rounds: 2 },
          text: "Las tarifas bajaron a mitad de año y quedaste pagando más que tus competidores.",
        },
        outcome:
          "Pudiste cotizar a tus clientes con un costo logístico conocido y con espacio asegurado en el barco. Pagaste por certeza, no por el precio más bajo.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Seguir contratando embarque por embarque",
        detail: "Pagas la tarifa del momento y esperas que el mercado se normalice.",
        effects: { costPct: 8, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { costPct: 6, demandPct: -4, rounds: 2 },
          text: "Las tarifas siguieron subiendo y te quedaste sin espacio en el barco en plena temporada.",
        },
        outcome:
          "Quedaste expuesto a la tarifa de cada semana. Si el mercado baja, ganas. Si sube o falta espacio, no tienes nada asegurado.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Renegociar quién asume el flete",
        detail: "Revisas el Incoterm pactado y propones a tu contraparte compartir el sobrecosto.",
        effects: { costPct: 3, satisfaction: -2, rounds: 3 },
        outcome:
          "Tu contraparte aceptó compartir el alza para no perder la operación. En los siguientes contratos dejaste definido qué pasa si el flete cambia.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Consolidar carga y embarcar con menos frecuencia",
        detail: "Compartes contenedor con otras empresas y espacias los embarques.",
        effects: { costPct: 4, demandPct: -3, rounds: 2 },
        outcome:
          "El costo por unidad subió menos, pero los tiempos de entrega se alargaron y tuviste menos flexibilidad para atender pedidos urgentes.",
        verdict: "buena",
      },
    ],
    concept: "Incoterms y riesgo del flete",
    lesson:
      "El Incoterm define quién contrata y paga el transporte y quién asume el riesgo en cada tramo. Elegirlo es una decisión de costos y riesgos, no un trámite.",
    basedOn: "Crisis mundial de contenedores de 2021",
  },
  {
    id: "prov-homologacion",
    title: "Un lote malo revela que no evalúas proveedores",
    category: "proveedores",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Un proveedor nuevo te entregó un lote fuera de especificación y luego descubriste que no tenía sus permisos al día. En tu empresa nunca se evalúa a los proveedores: gana el que cotiza más barato.",
    options: [
      {
        id: "a",
        label: "Homologar a los proveedores críticos",
        detail: "Evalúas calidad, capacidad, situación legal y financiera de quienes más pesan en tu operación.",
        effects: { cashPct: -1.5, quality: 5, reputation: 3 },
        outcome:
          "Concentraste el esfuerzo en los diez proveedores que explican casi todas tus compras. Dos no pasaron la evaluación y los reemplazaste antes de que fallaran.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Exigir homologación completa a todos",
        detail: "Aplicas los mismos requisitos y auditorías a grandes y pequeños.",
        effects: { cashPct: -2, costPct: 3, quality: 5, rounds: 2 },
        outcome:
          "La calidad mejoró, pero varios proveedores pequeños y buenos no pudieron pagar la evaluación y se retiraron. Te quedaste con menos opciones y precios más altos.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Seguir eligiendo por precio y revisar al recibir",
        detail: "Mantienes el criterio actual y refuerzas la inspección de lo que llega.",
        effects: { quality: -2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, quality: -5, satisfaction: -5 },
          text: "Otro lote defectuoso llegó a tus clientes antes de que lo detectaras.",
        },
        outcome:
          "Revisar al recibir detecta el problema cuando ya lo tienes en tu almacén y con la fecha de entrega encima.",
        verdict: "mala",
      },
    ],
    concept: "Homologación de proveedores",
    lesson:
      "Homologar es evaluar al proveedor antes de comprarle. El esfuerzo se concentra en los proveedores críticos, porque no todos representan el mismo riesgo.",
  },
  {
    id: "prov-tipo-de-cambio",
    title: "Compras en dólares y vendes en soles",
    category: "proveedores",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu principal proveedor factura en dólares y tú vendes en soles. El tipo de cambio subió con fuerza en pocas semanas por el ruido político, y en 60 días debes pagar una factura grande. Nadie sabe si el dólar seguirá subiendo.",
    options: [
      {
        id: "a",
        label: "Contratar un forward con tu banco",
        detail: "Fijas hoy el tipo de cambio al que comprarás los dólares en 60 días.",
        effects: { cashPct: -0.5 },
        outcome:
          "Desde ese día supiste exactamente cuántos soles te costaría la factura. El dólar siguió moviéndose y a ti dejó de importarte.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Comprar hoy todos los dólares de la factura",
        detail: "Usas tu caja en soles para asegurar el monto al tipo de cambio actual.",
        effects: { cashPct: -2 },
        outcome:
          "Eliminaste la incertidumbre, aunque dejaste sin soles disponibles a la operación durante dos meses y tuviste que ajustar otros pagos.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Esperar a que el dólar baje",
        detail: "Compras los dólares recién el día del vencimiento.",
        effects: {},
        risk: {
          prob: 0.5,
          effects: { cashPct: -4 },
          text: "El dólar siguió subiendo y pagaste la factura con el tipo de cambio más alto del año.",
        },
        outcome:
          "Decidiste apostar sobre el tipo de cambio. Tu negocio no es adivinar el dólar, y una apuesta perdida se come el margen de todo el trimestre.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Subir tus precios en soles por si acaso",
        detail: "Aplicas un aumento general para cubrirte de una posible alza.",
        effects: { demandPct: -6, brand: -2, rounds: 2 },
        outcome:
          "Te cubriste a costa de tus clientes. Tus competidores mantuvieron precios y se llevaron parte de tu venta.",
        verdict: "mala",
      },
    ],
    concept: "Cobertura del riesgo cambiario",
    lesson:
      "Quien compra en dólares y vende en soles tiene riesgo cambiario. Cubrirse no busca ganar con el dólar, busca que el margen no dependa de él.",
  },
  {
    id: "prov-descuento-pronto-pago",
    title: "Descuento por pagar antes de tiempo",
    category: "proveedores",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu proveedor ofrece 3 % de descuento si pagas a los 10 días en lugar de a los 60. Tienes caja disponible, aunque no sobra, y una línea de crédito bancaria aprobada. Llevado a un año, ese descuento equivale a una tasa de más de 20 %.",
    options: [
      {
        id: "a",
        label: "Tomar el descuento con tu caja disponible",
        detail: "Pagas a los 10 días con recursos propios.",
        effects: { cashPct: -3, costPct: -3, rounds: 2 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -2 },
          text: "Un cliente se atrasó en pagarte y caíste en sobregiro durante unos días.",
        },
        outcome:
          "Ganaste el descuento completo sin pagar intereses. Tu colchón de caja quedó delgado durante casi dos meses.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Tomar el descuento usando la línea del banco",
        detail: "Te financias a una tasa menor que la que implica el descuento y conservas tu caja.",
        effects: { costPct: -3, fixedCostPct: 1, rounds: 2 },
        outcome:
          "El interés del banco fue menor que el descuento ganado. Conservaste tu liquidez y aun así compraste más barato.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Pagar a 60 días como siempre",
        detail: "Usas todo el plazo que el proveedor te da.",
        effects: {},
        outcome:
          "Conservaste tu caja dos meses. Ese plazo no fue gratis: renunciaste a un descuento que equivale a una tasa más alta que la de tu banco.",
        verdict: "buena",
      },
    ],
    concept: "Costo del crédito de proveedores",
    lesson:
      "El crédito de proveedores tiene un costo oculto: el descuento que dejas de tomar. Se convierte a tasa anual y se compara con el costo de tu financiamiento.",
  },
  {
    id: "prov-comision-al-comprador",
    title: "Un proveedor quiere premiar a tu jefe de compras",
    category: "proveedores",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Te enteras de que un proveedor ofreció a tu jefe de compras una comisión personal por cada pedido que le asigne. El proveedor cumple, pero no es el más barato. Tu empresa no tiene ninguna política sobre regalos ni conflictos de interés.",
    options: [
      {
        id: "a",
        label: "Política de compras con cotizaciones comparadas",
        detail: "Exiges tres cotizaciones, aprobación de un segundo responsable y declaración de regalos.",
        effects: { cashPct: -0.3, costPct: -3, reputation: 4, rounds: 3 },
        outcome:
          "Con reglas claras, las compras se empezaron a decidir por precio, calidad y plazo. Tu jefe de compras rechazó la comisión y varios precios bajaron.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Despedir de inmediato al jefe de compras",
        detail: "Das una señal fuerte, sin investigar si aceptó la oferta.",
        effects: { cashPct: -1.5, morale: -5 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -3 },
          text: "No había pruebas de que aceptara la comisión. Demandó por despido arbitrario y tuviste que indemnizarlo.",
        },
        outcome:
          "El equipo vio una sanción sin investigación ni regla previa. El siguiente encargado llegó al mismo puesto con las mismas tentaciones.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Dejarlo pasar mientras el proveedor cumpla",
        detail: "No intervienes porque las entregas llegan bien.",
        effects: { costPct: 3, reputation: -3, rounds: 3 },
        outcome:
          "La comisión del comprador la terminaste pagando tú, dentro del precio. Otros proveedores dejaron de cotizar al ver que la decisión ya estaba tomada.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Pedir que la comisión sea un descuento a la empresa",
        detail: "Hablas con el proveedor para que ese beneficio vaya a la factura.",
        effects: { costPct: -2, reputation: 1, rounds: 2 },
        outcome:
          "El proveedor aceptó y el precio bajó. Resolviste este caso, aunque sin una política el problema puede repetirse con otro proveedor.",
        verdict: "buena",
      },
    ],
    concept: "Conflicto de interés en compras",
    lesson:
      "Quien compra decide con dinero ajeno. Por eso las compras necesitan reglas: cotizaciones comparables, más de una firma y transparencia sobre regalos.",
  },
  // ============ TECNOLOGIA (14) ============
  {
    id: "tec-ransomware",
    title: "Secuestran tus archivos y piden rescate",
    category: "tecnologia",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Un lunes todas las computadoras muestran el mismo mensaje: tus archivos están cifrados y debes pagar en criptomonedas para liberarlos. Facturación, clientes y contabilidad quedaron bloqueados. Tienes un respaldo de hace tres semanas.",
    options: [
      {
        id: "a",
        label: "Pagar el rescate para recuperar todo rápido",
        detail: "Transfieres lo que piden y esperas la clave para descifrar los archivos.",
        effects: { cashPct: -5 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -3, demandPct: -6 },
          text: "Los atacantes cobraron y enviaron una clave que no funcionó. Perdiste el dinero y además el tiempo.",
        },
        outcome:
          "Negociaste con delincuentes sin ninguna garantía. Aunque entreguen la clave, tu empresa queda identificada como una que paga.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Aislar equipos y restaurar el respaldo",
        detail: "Desconectas la red, recuperas la copia de hace tres semanas y rehaces lo que falta.",
        effects: { cashPct: -2, demandPct: -4, productivityPct: -5 },
        outcome:
          "Volviste a operar en cuatro días. El equipo reconstruyó a mano tres semanas de información con comprobantes, correos y estados de cuenta.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Contratar especialistas, restaurar y reforzar",
        detail: "Un equipo externo identifica por dónde entraron, limpia los sistemas y cierra la brecha.",
        effects: { cashPct: -4, demandPct: -3, reputation: 2 },
        outcome:
          "Los especialistas encontraron que el ingreso fue por una contraseña débil de acceso remoto. Restauraste, corregiste la causa y dejaste respaldos diarios automáticos.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Formatear todo y empezar sin investigar",
        detail: "Reinstalas los equipos con tu técnico de siempre y sigues trabajando.",
        effects: { cashPct: -1, demandPct: -5 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -4, demandPct: -5 },
          text: "La puerta de entrada seguía abierta y el ataque se repitió al mes siguiente.",
        },
        outcome:
          "Recuperaste las máquinas, no la seguridad. Sin saber cómo entraron, no sabes si todavía pueden volver a entrar.",
        verdict: "riesgosa",
      },
    ],
    concept: "Respuesta a incidentes de ciberseguridad",
    lesson:
      "Ante un ataque, el orden es contener, restaurar, investigar la causa y corregirla. Pagar el rescate no garantiza nada y financia el siguiente ataque.",
  },
  {
    id: "tec-caida-en-cyber",
    title: "La web se cae en pleno Cyber Wow",
    category: "tecnologia",
    industries: "all",
    market: "B2C",
    tier: 2,
    situation:
      "A las 9 de la noche del primer día de Cyber Wow tu web y tu sistema de pedidos se caen por el exceso de visitas. Habías invertido fuerte en publicidad para esa fecha. Cada hora sin sistema es venta que se va a la competencia.",
    options: [
      {
        id: "a",
        label: "Ampliar capacidad de urgencia y vender por WhatsApp",
        detail: "Pagas más servidor de inmediato y atiendes pedidos por canales alternos mientras tanto.",
        effects: { cashPct: -2, demandPct: -3, satisfaction: -2 },
        outcome:
          "La web volvió en dos horas y el equipo tomó pedidos por WhatsApp durante la caída. Perdiste parte de la noche, pero salvaste el resto de la campaña.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Restablecer, extender ofertas y compensar",
        detail: "Reconoces la falla en redes, amplías la promoción y das un cupón a los afectados.",
        effects: { cashPct: -2.5, demandPct: -1, satisfaction: 3, brand: 1 },
        outcome:
          "Los clientes que no pudieron comprar volvieron con su cupón en los días siguientes. Dar la cara convirtió una falla en una muestra de seriedad.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Esperar a que tu programador lo resuelva",
        detail: "No comunicas nada hasta que el sistema vuelva a funcionar.",
        effects: { demandPct: -10, brand: -4, satisfaction: -5 },
        outcome:
          "La web volvió al mediodía siguiente. Pagaste publicidad toda la noche para llevar visitantes a una página de error.",
        verdict: "mala",
      },
    ],
    concept: "Pruebas de carga y plan de contingencia",
    lesson:
      "La capacidad de un sistema se prueba antes de la campaña, simulando el tráfico esperado. Si igual falla, un canal alterno y una comunicación honesta reducen el daño.",
  },
  {
    id: "tec-implementar-erp",
    title: "Implementar un ERP sin paralizar la empresa",
    category: "tecnologia",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Llevas inventario, ventas y contabilidad en hojas de cálculo que ya no cuadran entre sí. Un proveedor te ofrece un ERP completo que promete integrar todo. El proyecto es caro y tu equipo ya trabaja al límite.",
    options: [
      {
        id: "a",
        label: "Implementar todos los módulos de una vez",
        detail: "Apagas el sistema anterior y arrancas con todo el ERP en una sola fecha.",
        effects: { cashPct: -8, productivityPct: 4, rounds: 3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -4, productivityPct: -10, morale: -5, rounds: 2 },
          text: "El arranque general falló: se duplicaron pedidos, el personal volvió a sus hojas de cálculo y el proyecto se alargó un año.",
        },
        outcome:
          "Apostaste por el camino más corto. Cambiar todos los procesos a la vez deja a la empresa sin un sistema de respaldo si algo sale mal.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Implementar por módulos, desde el más crítico",
        detail: "Empiezas por el área con más problemas, estabilizas y recién entonces sigues con otra.",
        effects: { cashPct: -5, productivityPct: 6, morale: -1, rounds: 4 },
        outcome:
          "Inventarios arrancó primero y sus errores se corrigieron sin afectar al resto. Cada módulo nuevo encontró a un equipo con más experiencia y menos miedo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Ordenar procesos y usar un sistema simple",
        detail: "Defines primero cómo debe trabajar cada área y contratas una herramienta básica en la nube.",
        effects: { cashPct: -1.5, productivityPct: 3, rounds: 4 },
        outcome:
          "Con procesos claros, una herramienta sencilla resolvió la mayor parte del desorden. Si sigues creciendo, en un par de años necesitarás algo más robusto.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Seguir con las hojas de cálculo",
        detail: "Evitas el gasto y el desgaste del cambio.",
        effects: { productivityPct: -3, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -3, satisfaction: -4 },
          text: "Un error de fórmula en el inventario te hizo comprar de más y vender productos que no tenías.",
        },
        outcome:
          "No gastaste en sistemas. El equipo sigue dedicando horas a cuadrar archivos y cada decisión se toma con datos que nadie puede garantizar.",
        verdict: "riesgosa",
      },
    ],
    concept: "Implementación de un ERP",
    lesson:
      "Un ERP no ordena una empresa desordenada, solo automatiza lo que encuentra. Primero se definen los procesos y luego se implementa por etapas.",
  },
  {
    id: "tec-crm-cartera-clientes",
    title: "Los clientes viven en el celular del vendedor",
    category: "tecnologia",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu mejor vendedor renunció y se llevó su agenda: los contactos, las cotizaciones en curso y el historial de cada cliente estaban en su celular y en su WhatsApp personal. El resto del equipo comercial trabaja igual.",
    options: [
      {
        id: "a",
        label: "Implementar un CRM y exigir su uso",
        detail: "Cada contacto, cotización y seguimiento se registra en un sistema de la empresa.",
        effects: { cashPct: -2, fixedCostPct: 1, productivityPct: 4, morale: -2, rounds: 4 },
        outcome:
          "Al inicio los vendedores lo vieron como control. Cuando el sistema empezó a recordarles seguimientos y cerraron más ventas, lo adoptaron.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Pedir un reporte semanal en una hoja compartida",
        detail: "Cada vendedor anota sus clientes y oportunidades en un archivo común.",
        effects: { productivityPct: 2, rounds: 2 },
        outcome:
          "Tienes una lista básica de clientes por vendedor. Se llena tarde y a medias, pero es mucho mejor que no tener nada.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Subir comisiones para que nadie más se vaya",
        detail: "Mejoras el pago variable del equipo comercial.",
        effects: { fixedCostPct: 4, morale: 4, rounds: 4 },
        outcome:
          "El equipo quedó contento y el gasto subió. La información de los clientes sigue en celulares personales y se irá con el próximo que renuncie.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Dar líneas y cuentas de WhatsApp de la empresa",
        detail: "Los vendedores atienden desde números corporativos que se quedan cuando ellos se van.",
        effects: { cashPct: -1, fixedCostPct: 0.5, rounds: 4 },
        outcome:
          "Los clientes ahora escriben a un número de la empresa. Conservas las conversaciones, aunque todavía nadie sabe en qué etapa está cada venta.",
        verdict: "buena",
      },
    ],
    concept: "CRM y gestión de la cartera de clientes",
    lesson:
      "La relación con el cliente es un activo de la empresa, no del vendedor. Un CRM la registra, la ordena y permite que sobreviva a la rotación de personal.",
  },
  {
    id: "tec-ia-atencion-clientes",
    title: "Un asistente con IA para atender a tus clientes",
    category: "tecnologia",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu equipo de atención no se da abasto: los mensajes de WhatsApp y redes tardan horas en responderse y se pierden ventas de noche y en fines de semana. Un proveedor te ofrece un asistente con inteligencia artificial que responde al instante.",
    options: [
      {
        id: "a",
        label: "IA para consultas frecuentes, con pase a una persona",
        detail: "El asistente resuelve lo repetitivo y deriva a tu equipo los casos complejos o delicados.",
        effects: { cashPct: -2, demandPct: 3, productivityPct: 6, satisfaction: 5, rounds: 3 },
        outcome:
          "El asistente respondió horarios, precios y estados de pedido a cualquier hora. Tu equipo se dedicó a cerrar ventas y a resolver reclamos con más calma.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Reemplazar a todo el equipo de atención por la IA",
        detail: "Dejas la atención completamente automatizada y reduces la planilla.",
        effects: { cashPct: -2, fixedCostPct: -5, morale: -8, satisfaction: -3, rounds: 3 },
        risk: {
          prob: 0.45,
          effects: { brand: -5, satisfaction: -7, reputation: -4 },
          text: "El asistente informó precios y condiciones equivocados, los clientes exigieron que se respeten y el caso se difundió en redes.",
        },
        outcome:
          "El costo bajó de inmediato. Los clientes con un problema serio se encontraron conversando en círculos con una máquina.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Contratar más personas para atención",
        detail: "Sumas personal y cubres turnos de noche y fines de semana.",
        effects: { fixedCostPct: 4, satisfaction: 4, rounds: 3 },
        outcome:
          "La atención mejoró con trato humano en todos los horarios. La planilla creció y buena parte del tiempo se sigue yendo en responder las mismas preguntas.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Seguir igual y responder cuando se pueda",
        detail: "Mantienes el equipo y los horarios actuales.",
        effects: { demandPct: -4, satisfaction: -4 },
        outcome:
          "Los clientes que escribieron de noche compraron donde les contestaron primero. En ventas por mensajería, la velocidad de respuesta decide.",
        verdict: "mala",
      },
    ],
    concept: "Automatización de la atención con IA",
    lesson:
      "La inteligencia artificial rinde más cuando asume lo repetitivo y deja a las personas lo que exige criterio. La empresa responde por lo que su asistente le dice al cliente.",
  },
  {
    id: "tec-tienda-propia-o-marketplace",
    title: "Tienda en línea propia o marketplace",
    category: "tecnologia",
    industries: VENTA_EN_LINEA,
    market: "B2C",
    tier: 1,
    situation:
      "Quieres vender por internet. Un marketplace conocido te da visitas desde el primer día, pero cobra comisión por cada venta, fija las reglas y se queda con los datos del cliente. Una tienda propia te da control, aunque hoy nadie la conoce.",
    options: [
      {
        id: "a",
        label: "Vender solo en el marketplace",
        detail: "Aprovechas su tráfico, su pasarela de pagos y su logística, pagando comisión.",
        effects: { demandPct: 8, costPct: 5, rounds: 3 },
        outcome:
          "Las ventas llegaron rápido. El margen es menor y tu cliente, en realidad, es cliente del marketplace: no puedes escribirle ni saber quién es.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Invertir solo en tu tienda propia",
        detail: "Construyes tu web y pagas publicidad para atraer visitas.",
        effects: { cashPct: -4, demandPct: 2, brand: 2, rounds: 3 },
        outcome:
          "Tienes una tienda bonita y pocos visitantes. Atraer tráfico propio costó más de lo previsto y las ventas tardaron en aparecer.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Empezar en marketplace y llevar clientes a tu tienda",
        detail: "Usas el marketplace para darte a conocer y tu web para la recompra y la relación.",
        effects: { cashPct: -2.5, demandPct: 8, costPct: 3, brand: 3, rounds: 3 },
        outcome:
          "El marketplace te trajo compradores nuevos y tu tienda, con mejores precios y atención directa, se quedó con los que volvieron a comprar.",
        verdict: "optima",
      },
    ],
    concept: "Canal propio frente a marketplace",
    lesson:
      "El marketplace alquila clientes y la tienda propia los construye. Combinarlos permite vender hoy sin depender para siempre de un canal ajeno.",
  },
  {
    id: "tec-contracargos-fraude",
    title: "Compras con tarjetas robadas",
    category: "tecnologia",
    industries: "all",
    market: "B2C",
    tier: 3,
    situation:
      "Tu tienda en línea recibió este mes varios pedidos caros pagados con tarjetas robadas. Los titulares desconocieron las compras, el banco te descontó el dinero (contracargo) y la mercadería ya estaba entregada. Tu pasarela advierte que, si esto sigue, suspenderá tu cuenta.",
    options: [
      {
        id: "a",
        label: "Activar autenticación reforzada y reglas antifraude",
        detail: "Pides verificación adicional del banco y retienes los pedidos con señales inusuales.",
        effects: { cashPct: -1, demandPct: -2 },
        outcome:
          "Algunos clientes abandonaron la compra por el paso adicional. Los contracargos casi desaparecieron y tu cuenta con la pasarela quedó a salvo.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Aceptar solo transferencias, Yape y contra entrega",
        detail: "Retiras el pago con tarjeta de tu tienda en línea.",
        effects: { demandPct: -8, rounds: 2 },
        outcome:
          "El fraude con tarjeta se acabó, junto con las ventas de quienes solo compran con tarjeta o en cuotas. Resolviste el problema eliminando el canal.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Seguir igual y asumir el fraude como un costo",
        detail: "No cambias nada para no complicar la compra a los clientes.",
        effects: {},
        risk: {
          prob: 0.5,
          effects: { cashPct: -5, demandPct: -10 },
          text: "La pasarela suspendió tu cuenta por exceso de contracargos y pasaste dos semanas sin cobrar con tarjeta.",
        },
        outcome:
          "Los defraudadores comparten datos de las tiendas fáciles. Cada pedido fraudulento te cuesta la mercadería, el envío y el monto devuelto.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Revisar a mano cada pedido antes de despachar",
        detail: "Una persona valida datos, llama al cliente y recién entonces libera el envío.",
        effects: { fixedCostPct: 2, satisfaction: -3, rounds: 2 },
        outcome:
          "Detectaste casi todos los pedidos falsos. Los despachos se retrasaron un día y la revisión manual no alcanzará cuando llegue una campaña.",
        verdict: "buena",
      },
    ],
    concept: "Contracargos y fraude en pagos",
    lesson:
      "En ventas en línea con tarjeta, el comercio suele asumir la pérdida del fraude. Prevenirlo implica aceptar algo de fricción en la compra a cambio de seguridad.",
  },
  {
    id: "tec-filtracion-datos",
    title: "Se filtran los datos de tus clientes",
    category: "tecnologia",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Un investigador de seguridad te escribe: encontró en internet una base con nombres, DNI, teléfonos y direcciones de tus clientes, expuesta por una mala configuración de tu sistema. No hay señales de que alguien la haya usado y ningún cliente lo sabe.",
    options: [
      {
        id: "a",
        label: "Corregir, avisar a los clientes y a la autoridad",
        detail: "Cierras la brecha, informas qué datos se expusieron y qué deben hacer los afectados.",
        effects: { cashPct: -2.5, brand: -3, satisfaction: -2, reputation: 4 },
        outcome:
          "Algunos clientes se molestaron y la mayoría agradeció el aviso. Cuando el tema llegó a la prensa, tu empresa ya había informado y corregido.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Corregir la falla en silencio",
        detail: "Cierras la brecha y no informas a nadie para evitar alarma.",
        effects: { cashPct: -1 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -6, brand: -8, satisfaction: -6, reputation: -12 },
          text: "La filtración salió en medios, los clientes supieron que la ocultaste y la Autoridad Nacional de Protección de Datos Personales te sancionó.",
        },
        outcome:
          "La falla quedó cerrada. Tus clientes no saben que sus datos estuvieron expuestos y no pueden cuidarse de posibles estafas.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Negarlo y amenazar al investigador con denunciarlo",
        detail: "Desconoces el hallazgo y respondes con una carta legal.",
        effects: {},
        risk: {
          prob: 0.6,
          effects: { cashPct: -6, brand: -10, reputation: -15 },
          text: "El investigador publicó el caso con pruebas y el escándalo fue mayor que la filtración.",
        },
        outcome:
          "Trataste como enemigo a quien te avisó gratis. La base sigue expuesta mientras discutes con él.",
        verdict: "mala",
      },
    ],
    concept: "Protección de datos personales",
    lesson:
      "Los datos de los clientes son una responsabilidad, no solo un activo. Ante una filtración, la transparencia rápida limita el daño y el ocultamiento lo multiplica.",
    basedOn: "Ley de Protección de Datos Personales del Perú (Ley 29733)",
  },
  {
    id: "tec-automatizacion-y-empleo",
    title: "La máquina hace el trabajo de seis personas",
    category: "tecnologia",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Un sistema automatizado puede hacer el trabajo repetitivo que hoy realizan seis de tus trabajadores, con menos errores. La inversión se recupera en poco más de un año. El equipo ya escuchó el rumor y el ambiente está tenso.",
    options: [
      {
        id: "a",
        label: "Automatizar y reubicar al personal con capacitación",
        detail: "Trasladas a los seis a tareas de mayor valor y explicas el plan desde el inicio.",
        effects: { cashPct: -6, productivityPct: 10, fixedCostPct: -2, morale: 3, quality: 3, rounds: 4 },
        outcome:
          "Cuatro pasaron a control de calidad y atención, y dos operan el nuevo sistema. El ahorro fue menor que despidiendo, pero conservaste experiencia y confianza.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Automatizar y cesar a los seis con su liquidación",
        detail: "Reduces la planilla y pagas los beneficios e indemnizaciones que correspondan.",
        effects: { cashPct: -7, productivityPct: 8, fixedCostPct: -6, morale: -8, reputation: -2, rounds: 4 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -3, morale: -4 },
          text: "Dos trabajadores demandaron por despido arbitrario y tus mejores técnicos empezaron a buscar otro empleo.",
        },
        outcome:
          "El ahorro en planilla fue el máximo posible. Quienes se quedaron entendieron que cualquiera puede ser el siguiente y trabajan con ese temor.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "No automatizar para proteger los empleos",
        detail: "Mantienes el proceso manual y descartas la inversión.",
        effects: { morale: 3 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -6, rounds: 2 },
          text: "Tus competidores automatizaron, bajaron precios y empezaste a perder clientes.",
        },
        outcome:
          "El equipo respiró tranquilo. Si la empresa pierde competitividad, a la larga los empleos en riesgo serán todos y no solo seis.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Automatizar de a pocos, sin cubrir las renuncias",
        detail: "Implementas por etapas y dejas que la rotación natural reduzca el equipo.",
        effects: { cashPct: -3, productivityPct: 5, fixedCostPct: -2, rounds: 4 },
        outcome:
          "Nadie fue despedido y el cambio se sintió menos. La mejora tardó más en llegar y durante meses convivieron dos formas de trabajar.",
        verdict: "buena",
      },
    ],
    concept: "Automatización y reconversión laboral",
    lesson:
      "Automatizar es una decisión técnica y también de personas. Comunicar a tiempo y reconvertir al personal protege el conocimiento y el clima que la máquina no reemplaza.",
  },
  {
    id: "tec-software-sin-licencia",
    title: "Programas sin licencia en toda la oficina",
    category: "tecnologia",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Para ahorrar, tu técnico instaló programas de diseño y ofimática sin licencia en las doce computadoras de la empresa. Ahora necesitas tres equipos más y propone hacer lo mismo. Las licencias originales cuestan lo que un mes de planilla de un área.",
    options: [
      {
        id: "a",
        label: "Comprar licencias por suscripción para todos",
        detail: "Regularizas todos los equipos con planes mensuales o anuales.",
        effects: { cashPct: -2, fixedCostPct: 1, reputation: 3, rounds: 4 },
        outcome:
          "Quedaste en regla, con actualizaciones de seguridad y soporte. El gasto se volvió una cuota conocida en tu presupuesto.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Seguir instalando copias sin licencia",
        detail: "Ahorras el costo de las licencias en todos los equipos.",
        effects: {},
        risk: {
          prob: 0.35,
          effects: { cashPct: -8, productivityPct: -5, reputation: -8 },
          text: "Indecopi inspeccionó tras una denuncia y multó por uso de software sin licencia. Además, una copia traía un virus que paralizó equipos.",
        },
        outcome:
          "No gastaste nada hoy. Las copias alteradas no reciben parches de seguridad y son una de las puertas de entrada más comunes para los ataques.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Migrar a software libre y licenciar lo necesario",
        detail: "Usas alternativas gratuitas donde alcanza y pagas licencia solo en los puestos que la requieren.",
        effects: { cashPct: -0.8, productivityPct: -2, reputation: 3 },
        outcome:
          "El equipo tardó unas semanas en adaptarse a las nuevas herramientas. Quedaste en regla pagando una fracción de lo que costaba licenciar todo.",
        verdict: "optima",
      },
    ],
    concept: "Licenciamiento de software",
    lesson:
      "El software es propiedad intelectual y usarlo sin licencia es una infracción. Antes de piratear o de pagar todo, se revisa qué necesita realmente cada puesto.",
  },
  {
    id: "tec-facturacion-electronica",
    title: "Colas en caja por emitir comprobantes uno a uno",
    category: "tecnologia",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Emites tus comprobantes electrónicos desde el portal gratuito de SUNAT, uno por uno, y en días de alta venta se forman colas. Además, tu inventario y tu contabilidad no se enteran de cada venta hasta que alguien la digita.",
    options: [
      {
        id: "a",
        label: "Contratar facturación integrada a caja e inventario",
        detail: "Un sistema emite el comprobante al cobrar y actualiza stock y registros contables.",
        effects: { cashPct: -1.5, fixedCostPct: 1, productivityPct: 5, satisfaction: 3, rounds: 4 },
        outcome:
          "El cobro pasó de minutos a segundos y el inventario se actualiza solo. Tu contador dejó de digitar y empezó a analizar.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Seguir con el portal gratuito",
        detail: "Mantienes el método actual y refuerzas la caja en días punta.",
        effects: { satisfaction: -2 },
        outcome:
          "Cumples con la norma sin gastar en sistemas. Para tu volumen actual alcanza, aunque las colas y la doble digitación seguirán creciendo con las ventas.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "En horas punta, vender sin comprobante",
        detail: "Entregas el comprobante solo a quien lo pida, para que la cola avance.",
        effects: { demandPct: 3 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -5, demandPct: -6, reputation: -10 },
          text: "Un fedatario de SUNAT compró sin recibir comprobante y tu local fue cerrado temporalmente.",
        },
        outcome:
          "La cola avanzó más rápido. Cada venta sin comprobante es una infracción y además una venta que tu propio control interno no registra.",
        verdict: "mala",
      },
    ],
    concept: "Facturación electrónica",
    lesson:
      "El comprobante electrónico es una obligación y también una fuente de datos. Integrado con caja e inventario, convierte cada venta en información para decidir.",
  },
  {
    id: "tec-dependencia-de-plataforma",
    title: "El algoritmo cambió y tus ventas cayeron",
    category: "tecnologia",
    industries: "all",
    market: "B2C",
    tier: 2,
    situation:
      "Ocho de cada diez clientes te llegaban por una sola red social. La plataforma cambió su algoritmo y tu alcance cayó a la mitad de un mes a otro, sin aviso. No tienes correos ni teléfonos de la mayoría de tus seguidores.",
    options: [
      {
        id: "a",
        label: "Pagar más publicidad en la misma plataforma",
        detail: "Compensas el alcance perdido con anuncios pagados.",
        effects: { cashPct: -4, demandPct: -3 },
        outcome:
          "Recuperaste parte de las visitas pagando por lo que antes era gratis. Tu dependencia de esa plataforma ahora es mayor y más cara.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Construir tu base de contactos y sumar canales",
        detail: "Captas correos y números de WhatsApp con incentivos y abres presencia en otros medios.",
        effects: { cashPct: -2, demandPct: -4, brand: 3 },
        outcome:
          "El trimestre fue flojo, pero terminaste con una lista propia de clientes a la que puedes escribir sin pedir permiso a ningún algoritmo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Adaptar tu contenido al formato que la red premia",
        detail: "Cambias tu forma de publicar para recuperar alcance gratuito.",
        effects: { cashPct: -1, demandPct: -4 },
        outcome:
          "El alcance mejoró a las pocas semanas. Funciona hasta el próximo cambio de reglas, que tampoco te van a consultar.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Esperar a que el alcance vuelva solo",
        detail: "Sigues publicando igual y confías en que sea temporal.",
        effects: { demandPct: -12, rounds: 2 },
        outcome:
          "El alcance no volvió. La plataforma decide a quién le muestra tu contenido, y sus objetivos no son los tuyos.",
        verdict: "mala",
      },
    ],
    concept: "Riesgo de dependencia de una plataforma",
    lesson:
      "Los seguidores en una red social son audiencia prestada. Un negocio reduce ese riesgo con canales diversificados y una base de contactos propia.",
  },
  {
    id: "tec-respaldo-informacion",
    title: "Toda tu información en una sola computadora",
    category: "tecnologia",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "La contabilidad, la lista de clientes y los archivos de trabajo de tu empresa están en una sola computadora de la oficina. Esta semana el disco empezó a hacer ruidos y el equipo se cuelga. Nunca se ha hecho una copia de respaldo.",
    options: [
      {
        id: "a",
        label: "Respaldo automático en la nube y en disco externo",
        detail: "Programas copias diarias en dos lugares distintos y pruebas que se puedan restaurar.",
        effects: { cashPct: -0.8, fixedCostPct: 0.5, rounds: 4 },
        outcome:
          "El disco falló tres semanas después. Al día siguiente estabas trabajando en otro equipo con toda la información restaurada.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Copiar todo a una memoria USB de vez en cuando",
        detail: "Alguien de la oficina se encarga de la copia cuando se acuerda.",
        effects: {},
        risk: {
          prob: 0.35,
          effects: { cashPct: -3, productivityPct: -6 },
          text: "El disco murió, la memoria tenía una copia de hace cuatro meses y hubo que reconstruir a mano un trimestre de información.",
        },
        outcome:
          "Tienes una copia, que es mejor que ninguna. Depende de la memoria de una persona y está guardada en el mismo cajón de la misma oficina.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Cambiar el disco cuando termine de fallar",
        detail: "Esperas a que el equipo deje de funcionar para llevarlo al técnico.",
        effects: {},
        risk: {
          prob: 0.6,
          effects: { cashPct: -5, demandPct: -4, productivityPct: -10 },
          text: "El disco falló sin aviso. Recuperar parte de los datos en un laboratorio costó caro y el resto se perdió.",
        },
        outcome:
          "El disco ya te avisó. Un equipo se reemplaza en un día, pero la información de años no se compra en ninguna tienda.",
        verdict: "mala",
      },
    ],
    concept: "Respaldo de información (regla 3-2-1)",
    lesson:
      "La regla 3-2-1 pide tres copias, en dos medios distintos y una fuera del local. Un respaldo que no es automático y no se prueba no es un respaldo.",
  },
  {
    id: "tec-correo-falso-del-gerente",
    title: "Un correo urgente pide una transferencia",
    category: "tecnologia",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tu asistente de tesorería recibió un correo que parecía tuyo: pedía transferir de urgencia un monto alto a la cuenta nueva de un proveedor, sin comentarlo con nadie. La dirección del remitente tenía una letra cambiada. Ella dudó y te llamó antes de transferir.",
    options: [
      {
        id: "a",
        label: "Doble aprobación y verificación por llamada",
        detail: "Todo pago requiere dos personas y todo cambio de cuenta se confirma por teléfono.",
        effects: { cashPct: -0.3, productivityPct: -1, reputation: 2 },
        outcome:
          "Los pagos tardan unos minutos más. Dos intentos posteriores de fraude se detuvieron en la llamada de verificación.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Felicitarla y seguir trabajando igual",
        detail: "Confías en el criterio de tu asistente y no cambias el procedimiento.",
        effects: { morale: 1 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -6 },
          text: "El siguiente correo falso llegó cuando ella estaba de vacaciones y su reemplazo transfirió sin verificar.",
        },
        outcome:
          "Esta vez te salvó una persona atenta. Un control que depende de quién esté de turno no es un control.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Capacitar al personal en fraudes digitales",
        detail: "Organizas charlas con ejemplos de correos, mensajes y llamadas falsas.",
        effects: { cashPct: -0.6, morale: 2 },
        outcome:
          "El equipo aprendió a desconfiar de la urgencia y del secreto. La capacitación ayuda, aunque sin un procedimiento de pagos sigue dependiendo de la atención de cada uno.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Prohibir las transferencias y pagar solo con cheque",
        detail: "Eliminas la banca por internet de los pagos a proveedores.",
        effects: { productivityPct: -5, satisfaction: -2, rounds: 2 },
        outcome:
          "El fraude por correo quedó descartado y los pagos se volvieron lentos. Tus proveedores se quejaron de las demoras y tesorería perdió horas en el banco.",
        verdict: "mala",
      },
    ],
    concept: "Ingeniería social y control dual",
    lesson:
      "Los fraudes digitales atacan a las personas más que a los sistemas, y usan la urgencia y el secreto. La defensa es un procedimiento: dos aprobaciones y verificación por otro canal.",
  },
  // ============ ENTORNO (10) ============
  {
    id: "ent-bloqueo-carreteras",
    title: "La carretera lleva diez días bloqueada",
    category: "entorno",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Un conflicto social mantiene bloqueada la carretera por donde llegan tus insumos y salen tus despachos hacia el sur. Tienes stock para dos semanas y pedidos comprometidos con clientes de Arequipa y Cusco. Nadie sabe cuándo se levantará la medida.",
    options: [
      {
        id: "a",
        label: "Enviar lo urgente por vía alterna y reprogramar",
        detail: "Despachas por aire o por otra ruta lo prioritario y avisas nuevas fechas al resto.",
        effects: { cashPct: -3, demandPct: -2, satisfaction: 3 },
        outcome:
          "El flete costó varias veces lo normal, pero tus clientes clave recibieron su pedido. Los demás aceptaron la reprogramación porque les avisaste a tiempo.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Abrir un pequeño almacén en la zona sur",
        detail: "Alquilas un espacio en destino para tener stock cerca de esos clientes.",
        effects: { cashPct: -4, fixedCostPct: 3, satisfaction: 2, rounds: 3 },
        outcome:
          "No resolvió este bloqueo, porque la mercadería tampoco podía llegar. Para los siguientes, tus clientes del sur tendrán stock a pocas horas.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Esperar a que se levante el bloqueo",
        detail: "No asumes sobrecostos y despachas cuando la vía esté libre.",
        effects: { demandPct: -6 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -6, satisfaction: -6 },
          text: "El bloqueo duró un mes, te quedaste sin stock y dos clientes se fueron con un competidor.",
        },
        outcome:
          "Evitaste el gasto en fletes especiales. Tus clientes esperaron sin saber hasta cuándo, y tu stock se fue consumiendo.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Pagar a quienes ofrecen pasar el camión por trochas",
        detail: "Un intermediario promete cruzar la zona por caminos no autorizados.",
        effects: { cashPct: -1 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -6, morale: -4 },
          text: "El camión fue retenido y dañado en el desvío. Perdiste la carga y pusiste en riesgo al chofer.",
        },
        outcome:
          "Pusiste la carga, el vehículo y a una persona en una zona de conflicto. Ningún pedido vale la seguridad de un trabajador.",
        verdict: "mala",
      },
    ],
    concept: "Resiliencia de la cadena de suministro",
    lesson:
      "Una cadena con una sola ruta y un solo almacén es eficiente y frágil. La resiliencia cuesta (rutas alternas, stock distribuido) y se evalúa contra el costo de quedar aislado.",
    basedOn: "Bloqueos de carreteras en el sur del Perú entre diciembre de 2022 y los primeros meses de 2023",
  },
  {
    id: "ent-paro-transportistas",
    title: "Paro de transportistas: mañana no hay buses",
    category: "entorno",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Los gremios de transporte urbano anunciaron un paro de 24 horas para mañana en Lima y Callao. La mitad de tu personal depende de buses y combis para llegar, y varios clientes ya preguntan si vas a atender.",
    options: [
      {
        id: "a",
        label: "Trabajo remoto para unos y movilidad para otros",
        detail: "Quien puede trabaja desde casa y contratas movilidad para los puestos presenciales.",
        effects: { cashPct: -1, morale: 5 },
        outcome:
          "Operaste casi completo y el equipo llegó seguro. El gasto en movilidad fue pequeño frente a un día entero de ventas.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Exigir asistencia normal y descontar las faltas",
        detail: "Cada trabajador resuelve cómo llegar. Quien no llega, pierde el día.",
        effects: { demandPct: -3, productivityPct: -4, morale: -8 },
        outcome:
          "Llegó la mitad del personal, tarde y después de pagar taxis carísimos. El resto sintió que lo castigabas por algo que no dependía de él.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Cerrar por el día y recuperar las horas después",
        detail: "Acuerdas con el personal compensar la jornada en las semanas siguientes.",
        effects: { demandPct: -3, morale: 3 },
        outcome:
          "Nadie se expuso y el equipo lo agradeció. Perdiste la venta del día y los clientes que te buscaron encontraron la puerta cerrada.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Atender con horario reducido y avisar a clientes",
        detail: "Abres con el personal que vive cerca y comunicas el horario especial.",
        effects: { demandPct: -2, morale: 2, satisfaction: 1 },
        outcome:
          "Atendiste medio día con un equipo mínimo. Los clientes sabían a qué hora encontrarte y se perdió poco.",
        verdict: "buena",
      },
    ],
    concept: "Flexibilidad operativa",
    lesson:
      "Una paralización externa no se controla, la respuesta sí. Tener definido qué puestos pueden trabajar a distancia y cómo movilizar al resto evita improvisar la noche anterior.",
    basedOn: "Paros de transportistas en Lima y Callao por la inseguridad, 2024 y 2025",
  },
  {
    id: "ent-lluvias-y-huaicos",
    title: "Se anuncia un Niño costero fuerte",
    category: "entorno",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Los organismos oficiales elevan la alerta por Fenómeno del Niño costero para el verano. Tu local y tu almacén en Piura están en una zona que se inundó en 2017. Faltan tres meses para la temporada de lluvias.",
    options: [
      {
        id: "a",
        label: "Proteger el local, elevar el stock y asegurarlo",
        detail: "Haces drenajes y barreras, subes la mercadería y contratas un seguro que cubra inundación.",
        effects: { cashPct: -4, reputation: 2 },
        outcome:
          "Las lluvias llegaron con fuerza. Entró agua al local, pero el stock estaba en altura y el seguro cubrió los daños. Reabriste en pocos días.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Trasladar el stock a un almacén en zona alta",
        detail: "Alquilas un espacio seguro durante la temporada de lluvias.",
        effects: { cashPct: -2, fixedCostPct: 2, rounds: 2 },
        outcome:
          "Tu mercadería pasó la temporada a salvo. El local de atención sigue expuesto y los traslados diarios encarecieron la operación.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Esperar a ver si realmente llueve",
        detail: "No gastas en prevención hasta confirmar que el evento ocurre.",
        effects: {},
        risk: {
          prob: 0.4,
          effects: { cashPct: -15, demandPct: -15 },
          text: "Las lluvias inundaron el almacén, perdiste buena parte del stock y pasaste semanas sin atender.",
        },
        outcome:
          "Cuando empieza a llover ya no hay albañiles, sacos de arena ni almacenes disponibles, y las aseguradoras dejan de emitir pólizas para la zona.",
        verdict: "riesgosa",
      },
    ],
    concept: "Prevención de desastres naturales",
    lesson:
      "La prevención se hace cuando todavía parece innecesaria. Una alerta temprana es información valiosa solo si se convierte en decisiones antes del evento.",
    basedOn: "Fenómeno del Niño costero de 2017",
  },
  {
    id: "ent-sismo-sin-plan",
    title: "Un temblor fuerte y nadie supo qué hacer",
    category: "entorno",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Un sismo fuerte sacudió la ciudad en horario de atención. No hubo daños graves, pero el personal y los clientes corrieron en desorden, una estantería cayó cerca de una salida y nadie sabía dónde estaba la zona segura.",
    options: [
      {
        id: "a",
        label: "Plan de emergencia, anclajes y simulacros",
        detail: "Aseguras muebles y equipos, señalizas rutas, formas brigadas y practicas la evacuación.",
        effects: { cashPct: -1.5, morale: 4, reputation: 3 },
        outcome:
          "En el siguiente simulacro el local se evacuó en menos de dos minutos. El personal sabe qué hacer y quién guía a los clientes.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Colocar solo la señalización obligatoria",
        detail: "Instalas letreros de salida, zona segura y extintores para cumplir con la inspección.",
        effects: { cashPct: -0.4 },
        outcome:
          "Cumples con lo que revisa el inspector. Los letreros están en la pared, pero nadie ha practicado qué hacer cuando el piso se mueve.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "No hacer nada, aquí siempre tiembla",
        detail: "Vuelves a poner la estantería en su sitio y sigues atendiendo.",
        effects: {},
        risk: {
          prob: 0.2,
          effects: { cashPct: -8, morale: -8, reputation: -8 },
          text: "En el siguiente sismo hubo heridos por objetos caídos y una salida bloqueada. La municipalidad clausuró el local.",
        },
        outcome:
          "El temblor te mostró gratis dónde estaban tus puntos débiles. Decidiste no mirar.",
        verdict: "mala",
      },
    ],
    concept: "Plan de emergencia y evacuación",
    lesson:
      "En un país sísmico, el plan de emergencia es parte de la operación. La preparación se mide en simulacros practicados, no en letreros colgados.",
  },
  {
    id: "ent-extorsion-cupo",
    title: "Llega un mensaje que exige un cupo",
    category: "entorno",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Recibes mensajes de un número desconocido que exige un pago mensual a cambio de no atacar tu negocio en Trujillo. Conocen tu horario y los nombres de tus trabajadores. Otros negocios de la cuadra recibieron amenazas parecidas.",
    options: [
      {
        id: "a",
        label: "Denunciar y organizarte con los negocios vecinos",
        detail: "Guardas las evidencias, denuncias ante la Policía y refuerzas la seguridad en conjunto.",
        effects: { cashPct: -2.5, fixedCostPct: 2, morale: -2, reputation: 3, rounds: 3 },
        outcome:
          "La denuncia conjunta de la cuadra recibió más atención que una aislada. Compartieron cámaras y vigilancia, y cambiaste rutinas y horarios de cierre.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Pagar el cupo para trabajar tranquilo",
        detail: "Aceptas el pago mensual esperando que te dejen en paz.",
        effects: { cashPct: -3, fixedCostPct: 4, morale: -5, rounds: 4 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -5, morale: -6 },
          text: "A los dos meses duplicaron el monto y apareció un segundo grupo cobrando por lo mismo.",
        },
        outcome:
          "Compraste unas semanas de calma. Pagar no cierra el problema: confirma que tu negocio paga y financia a quienes te amenazan.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Cerrar la atención al público y vender por reparto",
        detail: "Reduces tu exposición operando a puerta cerrada, con pedidos en línea y por teléfono.",
        effects: { demandPct: -12, fixedCostPct: -5, morale: -2, rounds: 3 },
        outcome:
          "Tu equipo trabajó más tranquilo y las ventas bajaron sin el público de paso. Protegiste a las personas a costa de una parte del negocio.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Ignorar los mensajes y seguir igual",
        detail: "No respondes, no denuncias y no cambias ninguna rutina.",
        effects: {},
        risk: {
          prob: 0.4,
          effects: { cashPct: -6, demandPct: -6, morale: -10 },
          text: "Atacaron la fachada del local de madrugada. Nadie salió herido, pero el personal ya no quiso atender de noche.",
        },
        outcome:
          "Algunas amenazas son solo mensajes masivos y otras no. Sin denuncia ni medidas, no tienes forma de saber cuál es tu caso.",
        verdict: "riesgosa",
      },
    ],
    concept: "Gestión de riesgos de seguridad",
    lesson:
      "Frente a la extorsión, la prioridad es la seguridad de las personas. La respuesta pasa por denunciar, actuar en conjunto y reducir la exposición, no por negociar con quien amenaza.",
    basedOn: "Ola de extorsiones a negocios y transportistas en el Perú en los últimos años",
  },
  {
    id: "ent-obras-frente-al-local",
    title: "La municipalidad rompe la pista frente a tu local",
    category: "entorno",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "La municipalidad inició obras de agua y pistas en tu cuadra de Huancayo. Durante cuatro meses habrá zanjas, polvo y cierre vehicular. El primer fin de semana las ventas en el local cayeron a la mitad.",
    options: [
      {
        id: "a",
        label: "Reforzar reparto, venta en línea y señalizar acceso",
        detail: "Llevas el producto al cliente y le indicas cómo llegar mientras dure la obra.",
        effects: { cashPct: -1.5, demandPct: -8, rounds: 2 },
        outcome:
          "No recuperaste toda la venta, pero sí una buena parte. Varios clientes se acostumbraron a pedir a domicilio y siguieron haciéndolo después de la obra.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Negociar una rebaja temporal del alquiler",
        detail: "Pides al propietario compartir el impacto mientras el acceso esté cerrado.",
        effects: { fixedCostPct: -4, demandPct: -15, rounds: 2 },
        outcome:
          "El dueño aceptó una rebaja por tres meses para no perder al inquilino. Ayudó a la caja, aunque las ventas siguieron muy por debajo de lo normal.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Esperar a que terminen las obras",
        detail: "Mantienes todo igual y aguantas los cuatro meses.",
        effects: { demandPct: -20, rounds: 2 },
        outcome:
          "La obra se extendió más de lo anunciado. Pagaste alquiler y planilla completos con la mitad de las ventas y llegaste al final sin caja.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Alquilar un punto temporal en otra zona",
        detail: "Abres un local provisional mientras dure la obra, manteniendo el original.",
        effects: { cashPct: -3, fixedCostPct: 5, demandPct: -5, rounds: 2 },
        outcome:
          "Recuperaste ventas en la nueva ubicación y pagaste dos alquileres. El margen del periodo fue mínimo, pero mantuviste a tu equipo ocupado.",
        verdict: "riesgosa",
      },
    ],
    concept: "Adaptación de canales de venta",
    lesson:
      "Cuando el cliente no puede llegar al local, el negocio tiene que llegar al cliente. Depender de un solo canal deja a la empresa a merced de cualquier obra o cierre.",
  },
  {
    id: "ent-cambio-de-autoridades",
    title: "Nuevo alcalde, nuevos operativos",
    category: "entorno",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "La nueva gestión municipal anunció operativos para revisar licencias de funcionamiento, certificados de seguridad y anuncios en fachadas. Tu licencia está vigente, pero ampliaste el local sin actualizar la inspección de seguridad y tu letrero no tiene autorización.",
    options: [
      {
        id: "a",
        label: "Regularizar todo antes del operativo",
        detail: "Actualizas la inspección de seguridad por la ampliación y tramitas el permiso del letrero.",
        effects: { cashPct: -2, reputation: 3 },
        outcome:
          "Los trámites tomaron un mes y algunas correcciones en el local. Cuando llegó el operativo, el inspector revisó tus documentos y siguió de largo.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Esperar el operativo y corregir lo que observen",
        detail: "No gastas hasta saber qué exige exactamente la nueva gestión.",
        effects: {},
        risk: {
          prob: 0.5,
          effects: { cashPct: -4, demandPct: -6, reputation: -4 },
          text: "El operativo encontró la ampliación sin inspección, aplicó multa y clausuró el local por una semana.",
        },
        outcome:
          "Ahorraste el trámite por ahora. Las gestiones nuevas suelen empezar con operativos visibles, y tú ya sabes qué te van a encontrar.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Arreglar con el fiscalizador cuando llegue",
        detail: "Separas un monto en efectivo para que la visita no termine en multa.",
        effects: { cashPct: -0.5 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -8, demandPct: -6, reputation: -15 },
          text: "El operativo se hacía junto con la fiscalía. Además de la clausura, enfrentas una denuncia por corrupción.",
        },
        outcome:
          "Ofrecer una coima es un delito, no un gasto. Y el problema de fondo, un local ampliado sin inspección de seguridad, sigue exactamente igual.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Pedir plazos de adecuación a través del gremio",
        detail: "Te sumas a la asociación de comerciantes para dialogar con la municipalidad.",
        effects: { cashPct: -0.5, reputation: 1 },
        outcome:
          "El gremio consiguió un plazo de adecuación de 60 días para sus asociados. Ganaste tiempo para regularizar, que igual tendrás que hacer.",
        verdict: "buena",
      },
    ],
    concept: "Cumplimiento de la regulación municipal",
    lesson:
      "Los cambios de autoridad cambian la intensidad de la fiscalización, no tus obligaciones. Estar en regla convierte un operativo en un trámite de cinco minutos.",
  },
  {
    id: "ent-ola-de-calor",
    title: "Una ola de calor cambia lo que pide la gente",
    category: "entorno",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "El Senamhi anuncia varias semanas con temperaturas muy por encima de lo normal. Tus clientes llegan menos al mediodía, piden cosas distintas y tu local se vuelve sofocante. Tus equipos trabajan al límite.",
    options: [
      {
        id: "a",
        label: "Ajustar oferta, horarios y promociones al clima",
        detail: "Destacas lo que se busca con calor y extiendes la atención a las horas frescas.",
        effects: { cashPct: -1, demandPct: 4, satisfaction: 3 },
        outcome:
          "Moviste la atención hacia la mañana y la noche, y promocionaste lo que el clima pedía. Vendiste más que en un verano normal con casi el mismo gasto.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Invertir en climatizar el local",
        detail: "Instalas aire acondicionado o ventilación para clientes y personal.",
        effects: { cashPct: -3, fixedCostPct: 2, morale: 4, satisfaction: 5, rounds: 2 },
        outcome:
          "El local se volvió un refugio y los clientes se quedaron más tiempo. La instalación y el recibo de luz pesaron en el trimestre.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Mantener todo igual, el calor ya pasará",
        detail: "No cambias oferta, horarios ni instalaciones.",
        effects: { demandPct: -5, morale: -3 },
        outcome:
          "El calor duró seis semanas. Tu personal trabajó agotado y los clientes prefirieron los locales que se adaptaron.",
        verdict: "mala",
      },
    ],
    concept: "Adaptación de la oferta al clima",
    lesson:
      "El clima cambia qué, cuándo y cuánto compra la gente. Las empresas atentas ajustan su oferta y sus horarios en días, sin esperar al cierre del mes.",
  },
  {
    id: "ent-crisis-politica",
    title: "Crisis política: invertir o esperar",
    category: "entorno",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "El país atraviesa otra crisis política, con cambio de gobierno, protestas y el dólar al alza. Tenías aprobada una inversión importante para ampliar tu capacidad este trimestre. Tus competidores han congelado sus planes.",
    options: [
      {
        id: "a",
        label: "Ejecutar toda la inversión como estaba planeada",
        detail: "Aprovechas que otros se detienen para ganar capacidad y mercado.",
        effects: { cashPct: -10, demandPct: 8, productivityPct: 4, rounds: 3 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -3, demandPct: -10, rounds: 2 },
          text: "La crisis se alargó, la demanda cayó y quedaste con capacidad nueva sin usar y cuotas por pagar.",
        },
        outcome:
          "Si la economía se recupera rápido, habrás tomado ventaja. Comprometiste toda la caja en un solo escenario.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Invertir por etapas según escenarios definidos",
        detail: "Ejecutas la primera etapa y fijas qué señales harán que continúes o te detengas.",
        effects: { cashPct: -4, demandPct: 4, productivityPct: 3, rounds: 3 },
        outcome:
          "Avanzaste con la parte de la inversión que se justificaba en cualquier escenario. Cuando el panorama se aclaró, ya tenías medio camino recorrido y caja disponible.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Congelar todo y guardar la caja",
        detail: "Postergas la inversión hasta que el panorama sea estable.",
        effects: {},
        risk: {
          prob: 0.35,
          effects: { demandPct: -4, rounds: 2 },
          text: "La crisis pasó rápido y un competidor que sí invirtió se quedó con los clientes que no pudiste atender.",
        },
        outcome:
          "Protegiste tu liquidez en un momento incierto. Esperar a que no haya incertidumbre puede significar esperar siempre.",
        verdict: "buena",
      },
    ],
    concept: "Planeamiento por escenarios",
    lesson:
      "En entornos inestables no se trata de adivinar el futuro, se trata de preparar decisiones para varios futuros posibles y conservar la opción de ajustar.",
  },
  {
    id: "ent-restriccion-de-horario",
    title: "El estado de emergencia recorta tu horario",
    category: "entorno",
    industries: "all",
    market: "B2C",
    tier: 2,
    situation:
      "Se declara estado de emergencia en tu distrito por la inseguridad y la municipalidad restringe la atención nocturna. Un tercio de tu venta ocurría después de las 9 de la noche. Tu alquiler y tu planilla siguen iguales.",
    options: [
      {
        id: "a",
        label: "Rediseñar turnos y promociones al horario permitido",
        detail: "Trasladas personal y ofertas a las horas en que sí puedes atender.",
        effects: { cashPct: -1, demandPct: -6, rounds: 2 },
        outcome:
          "Con promociones en horas de la tarde recuperaste parte de la venta nocturna. El personal del último turno pasó a reforzar las horas punta.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Seguir atendiendo de noche a puerta cerrada",
        detail: "Bajas la reja y atiendes a los clientes conocidos fuera del horario.",
        effects: { demandPct: -2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -5, demandPct: -8, reputation: -8 },
          text: "Fiscalización municipal te encontró atendiendo fuera de horario, aplicó multa y clausuró el local por varios días.",
        },
        outcome:
          "Conservaste casi toda tu venta nocturna. Operar fuera de la norma expone a tu personal, a tus clientes y a tu licencia.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Eliminar el turno de noche y reducir personal",
        detail: "Ajustas la planilla al nuevo horario de atención.",
        effects: { fixedCostPct: -5, demandPct: -12, morale: -6, rounds: 2 },
        outcome:
          "El gasto bajó de inmediato. Cuando la restricción se levantó, tuviste que contratar y capacitar de nuevo, y tardaste en recuperar el ritmo.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Convertir la noche en pedidos con entrega programada",
        detail: "Tomas pedidos por canales digitales y los entregas dentro del horario permitido.",
        effects: { cashPct: -1.5, demandPct: -4, rounds: 2 },
        outcome:
          "Parte de tus clientes nocturnos aceptó pedir con anticipación. Abriste un canal que siguió funcionando cuando terminó la restricción.",
        verdict: "buena",
      },
    ],
    concept: "Apalancamiento operativo",
    lesson:
      "Cuando la venta cae y los costos fijos no, la utilidad cae mucho más que la venta. Ante una restricción, primero se recuperan ingresos dentro de la norma y luego se ajustan costos.",
  },
];

export default data;
