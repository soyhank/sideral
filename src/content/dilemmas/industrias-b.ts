import type { Dilemma } from "../types";

const data: Dilemma[] = [
  // ───────────── SOFTWARE (SaaS B2B) ─────────────
  {
    id: "ind-software-churn-pymes",
    title: "Las pymes cancelan al tercer mes",
    category: "clientes",
    industries: ["software"],
    market: "B2B",
    tier: 1,
    situation:
      "Tu software de facturación electrónica vende bien, pero el reporte muestra que una de cada cinco pymes cancela la suscripción antes del cuarto mes. Al llamarlas, la mayoría dice que nunca terminó de configurar el sistema. El área de ventas pide más presupuesto de publicidad para compensar las bajas.",
    options: [
      {
        id: "a",
        label: "Duplicar la pauta para reponer a los clientes perdidos",
        detail: "Sigues llenando el embudo con clientes nuevos sin tocar la experiencia de los primeros meses.",
        effects: { cashPct: -4, demandPct: 5, satisfaction: -2, rounds: 2 },
        outcome:
          "Entraron más clientes, pero se fueron al mismo ritmo. El costo de adquisición subió y muchas cuentas cancelaron antes de devolver lo que costó captarlas.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Crear un equipo de implementación y acompañamiento",
        detail: "Dos personas guían a cada cliente nuevo hasta que emite sus primeras facturas desde el sistema.",
        effects: { cashPct: -3, fixedCostPct: 3, demandPct: 5, satisfaction: 7, brand: 2, rounds: 3 },
        outcome:
          "Las pymes que emitieron su primera factura en la semana inicial casi no cancelaron. La base de clientes empezó a acumularse trimestre a trimestre y llegaron más referidos.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Ofrecer 50 % de descuento a quien pida la baja",
        detail: "Intentas retener con precio a los que ya decidieron irse.",
        effects: { cashPct: -2, demandPct: 2, brand: -2, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -3, satisfaction: -3 },
          text: "Se corrió la voz y clientes que estaban conformes pidieron la baja solo para obtener la rebaja.",
        },
        outcome:
          "Algunos se quedaron un par de meses más y luego cancelaron igual, porque su problema no era el precio sino que nunca lograron usar el sistema.",
        verdict: "riesgosa",
      },
    ],
    concept: "Tasa de cancelación (churn)",
    lesson:
      "En un negocio de suscripción, retener vale más que captar. Si el cliente no llega rápido a su primer resultado con el producto, se va, y ninguna publicidad llena un balde con hueco.",
  },
  {
    id: "ind-software-desarrollo-a-medida",
    title: "El cliente grande que quiere un módulo solo para él",
    category: "estrategia",
    industries: ["software"],
    market: "B2B",
    tier: 2,
    situation:
      "Una cadena de ferreterías de Arequipa, que sería tu cliente más grande, acepta contratar tu SaaS de inventarios solo si le desarrollas un módulo exclusivo de rutas de despacho. El trabajo ocuparía tres meses de tu equipo de desarrollo y ningún otro cliente lo ha pedido. El contrato anual equivale a una parte importante de tus ventas.",
    options: [
      {
        id: "a",
        label: "Aceptar y desarrollar el módulo exclusivo",
        detail: "Cierras el contrato y pones a tu equipo a programar lo que el cliente pide, tal como lo pide.",
        effects: { cashPct: 6, productivityPct: -8, quality: -3, rounds: 3 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -5, satisfaction: -4, rounds: 2 },
          text: "El resto de clientes esperó meses por mejoras prometidas y varios se pasaron a la competencia.",
        },
        outcome:
          "Firmaste, pero la hoja de ruta del producto quedó congelada. Después el cliente pidió más cambios y tu empresa empezó a parecerse a una fábrica de software a medida.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Construirlo como módulo estándar y vendible a todos",
        detail: "Negocias que el módulo sea configurable, quede en el producto y el cliente cofinancie el desarrollo.",
        effects: { cashPct: 3, demandPct: 4, quality: 3, productivityPct: -4, rounds: 3 },
        outcome:
          "El cliente aceptó pagar una parte y ser el primero en usarlo. Seis meses después, otras distribuidoras contrataron el mismo módulo como adicional.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Integrarte con un software de rutas de un tercero",
        detail: "Conectas tu sistema por API con un proveedor especializado en lugar de programar el módulo.",
        effects: { cashPct: 2, satisfaction: 2, costPct: 2, rounds: 2 },
        outcome:
          "La integración salió en tres semanas. El cliente firmó, aunque compartes parte del ingreso con el socio y dependes de su servicio.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Ofrecer el producto tal como está",
        detail: "Proteges el foco del equipo y aceptas la posibilidad de perder la cuenta.",
        effects: { morale: 2 },
        risk: {
          prob: 0.55,
          effects: { demandPct: -3 },
          text: "La cadena firmó con un competidor que sí aceptó programarle el módulo.",
        },
        outcome:
          "Tu equipo siguió con el plan del producto. Quedó la duda de cuánto se habría podido negociar antes de cerrar la puerta.",
        verdict: "buena",
      },
    ],
    concept: "Producto estándar frente a desarrollo a medida",
    lesson:
      "El SaaS es rentable porque el mismo código sirve a todos los clientes. Cada desarrollo exclusivo resta escala, así que conviene convertir el pedido de un cliente en una función que pueda venderse a muchos.",
  },
  {
    id: "ind-software-caida-sla",
    title: "Seis horas de caída en pleno cierre de mes",
    category: "tecnologia",
    industries: ["software"],
    market: "B2B",
    tier: 2,
    situation:
      "Una falla en tu proveedor de nube dejó tu plataforma de planillas fuera de línea seis horas, justo el día de cierre de mes. Tu contrato ofrece 99.5 % de disponibilidad mensual con un crédito en la factura si no se cumple. Solo tres clientes han reclamado formalmente, pero todos sufrieron la caída.",
    options: [
      {
        id: "a",
        label: "Compensar solo a los clientes que reclamen",
        detail: "Aplicas el crédito del contrato únicamente a quien lo pida por escrito.",
        effects: { cashPct: -1, satisfaction: -4, reputation: -3 },
        risk: {
          prob: 0.4,
          effects: { brand: -4, demandPct: -4, rounds: 2 },
          text: "Los clientes compararon notas en un grupo de contadores y se supo que compensaste solo a algunos.",
        },
        outcome:
          "Ahorraste dinero este mes. Varios clientes anotaron que tu contrato solo se cumple cuando alguien protesta.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Aplicar el crédito a todos y publicar el informe",
        detail: "Compensas de oficio según el contrato y explicas la causa de la caída y las medidas tomadas.",
        effects: { cashPct: -3, satisfaction: 5, reputation: 4, brand: 2 },
        outcome:
          "El informe del incidente circuló entre los clientes y redujo las llamadas de reclamo. Varios renovaron mencionando la forma en que manejaste el problema.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Responsabilizar al proveedor de nube y no compensar",
        detail: "Comunicas que la falla fue de un tercero y que el contrato no aplica.",
        effects: { satisfaction: -8, reputation: -6, demandPct: -6, rounds: 2 },
        outcome:
          "Para el cliente, el proveedor eres tú. Dos empresas grandes no renovaron y una envió una carta notarial exigiendo el crédito pactado.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Compensar a todos y contratar respaldo en otra región",
        detail: "Además del crédito, pagas infraestructura redundante para que una falla así no te detenga.",
        effects: { cashPct: -5, fixedCostPct: 3, quality: 6, satisfaction: 6, reputation: 3, rounds: 3 },
        outcome:
          "El costo de servidores subió de forma permanente, pero en la siguiente falla del proveedor tu servicio siguió funcionando y los clientes ni se enteraron.",
        verdict: "buena",
      },
    ],
    concept: "Acuerdo de nivel de servicio (SLA)",
    lesson:
      "Un SLA es una promesa medible con consecuencias. Cumplirlo de oficio cuesta poco frente a la confianza que sostiene la renovación, y la redundancia se evalúa comparando su costo con el de cada hora caída.",
  },
  {
    id: "ind-software-version-gratuita",
    title: "La versión gratuita que nadie quiere pagar",
    category: "marketing",
    industries: ["software"],
    market: "B2B",
    tier: 1,
    situation:
      "Tu sistema de citas para consultorios y clínicas tiene una versión gratuita que usa la gran mayoría de tus cuentas. Esos usuarios generan costos de servidores y soporte, y muy pocos pasan al plan pagado. Tu socio propone eliminar la versión gratuita; marketing dice que es tu mejor publicidad.",
    options: [
      {
        id: "a",
        label: "Eliminar la versión gratuita y dejar prueba de 14 días",
        detail: "Todo usuario nuevo prueba dos semanas y luego paga o pierde el acceso.",
        effects: { demandPct: -5, fixedCostPct: -4, cashPct: 2, brand: -3, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -5, brand: -3, rounds: 2 },
          text: "Los consultorios pequeños migraron en bloque a un competidor gratuito y dejaron de recomendarte.",
        },
        outcome:
          "Bajaron los costos y algunos usuarios pagaron. También se redujo el flujo de cuentas nuevas que llegaban por recomendación.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Mantenerla, con límites en las funciones de más valor",
        detail: "El plan gratuito queda con tope de citas al mes y los recordatorios por WhatsApp pasan al plan pagado.",
        effects: { demandPct: 5, fixedCostPct: -2, satisfaction: -1, rounds: 3 },
        outcome:
          "Los consultorios que crecían chocaron con el límite justo cuando más valor recibían, y una parte pasó al plan pagado sin sentirse engañada.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Dejar todo como está",
        detail: "Sigues atendiendo a todos los usuarios gratuitos con las mismas funciones.",
        effects: { fixedCostPct: 3, productivityPct: -3, rounds: 3 },
        outcome:
          "La base gratuita siguió creciendo y el soporte se saturó con consultas de usuarios que no pagan. Los clientes de pago empezaron a esperar más por una respuesta.",
        verdict: "mala",
      },
    ],
    concept: "Modelo freemium y conversión a pago",
    lesson:
      "La versión gratuita es un canal de captación, no un regalo. Funciona cuando el límite aparece en el momento en que el usuario ya comprobó el valor y pagar le resulta natural.",
  },
  {
    id: "ind-software-fuga-desarrolladores",
    title: "Tus desarrolladores reciben ofertas en dólares",
    category: "laboral",
    industries: ["software"],
    market: "B2B",
    tier: 2,
    situation:
      "Dos de tus cinco desarrolladores senior recibieron ofertas de empresas de Estados Unidos y España para trabajar en remoto desde Lima, con sueldos en dólares que duplican lo que pagas. Ellos conocen la arquitectura completa del producto y casi nada está documentado.",
    options: [
      {
        id: "a",
        label: "Igualar la oferta solo a ellos dos",
        detail: "Subes el sueldo de los dos al nivel de la oferta extranjera para que se queden.",
        effects: { fixedCostPct: 6, morale: -3, rounds: 4 },
        risk: {
          prob: 0.45,
          effects: { fixedCostPct: 5, morale: -4, rounds: 4 },
          text: "El resto del equipo se enteró de los aumentos y consiguió ofertas externas para exigir lo mismo.",
        },
        outcome:
          "Se quedaron, pero tu planilla subió de golpe y quedó el mensaje de que para obtener un aumento hay que amenazar con irse.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Plan de retención para el equipo senior y documentación",
        detail: "Aumento moderado, participación en los resultados, flexibilidad y un plan para documentar el sistema.",
        effects: { fixedCostPct: 4, morale: 6, productivityPct: 3, quality: 3, rounds: 4 },
        outcome:
          "Uno de los dos se fue de todos modos, pero el otro se quedó y el conocimiento dejó de estar en la cabeza de dos personas. El equipo valoró las reglas claras.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Dejarlos ir y contratar programadores junior",
        detail: "Reemplazas a los dos senior por perfiles más baratos recién egresados.",
        effects: { fixedCostPct: -3, productivityPct: -10, quality: -6, satisfaction: -3, rounds: 3 },
        outcome:
          "La planilla bajó, pero nadie entendía partes críticas del código. Los errores en producción aumentaron y las nuevas funciones se retrasaron dos trimestres.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Aceptar la salida y pagar una transición de dos meses",
        detail: "Les ofreces un bono por quedarse ocho semanas a documentar y entrenar a sus reemplazos.",
        effects: { cashPct: -2, productivityPct: -5, quality: -2, rounds: 2 },
        outcome:
          "Perdiste velocidad un tiempo, pero la salida fue ordenada. Los reemplazos recibieron manuales, diagramas y sesiones grabadas.",
        verdict: "buena",
      },
    ],
    concept: "Retención de talento clave",
    lesson:
      "Cuando compites con sueldos en dólares no ganas solo con dinero. Se retiene con un paquete completo y, sobre todo, se reduce el riesgo documentando para que el negocio no dependa de dos personas.",
  },
  {
    id: "ind-software-cuentas-compartidas",
    title: "Seis vendedores con un solo usuario",
    category: "finanzas",
    industries: ["software"],
    market: "B2B",
    tier: 3,
    situation:
      "Cobras tu CRM por usuario al mes. Al revisar los registros de acceso descubres que muchas empresas comparten una misma cuenta entre cinco o seis vendedores para pagar menos. Bloquear las sesiones simultáneas es técnicamente sencillo, pero varios de esos clientes son distribuidoras conocidas de Trujillo y Chiclayo que te recomiendan.",
    options: [
      {
        id: "a",
        label: "Bloquear de inmediato las sesiones compartidas",
        detail: "Desde mañana, cada usuario solo puede estar conectado en un dispositivo a la vez.",
        effects: { cashPct: 3, satisfaction: -6, brand: -2 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -6, rounds: 2 },
          text: "Varias distribuidoras tomaron el bloqueo como una agresión y migraron a una herramienta más barata.",
        },
        outcome:
          "Algunas empresas compraron más usuarios. Otras amanecieron con sus vendedores sin acceso en plena ruta y llamaron furiosas.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Cambiar la métrica: cobrar por contactos gestionados",
        detail: "Rediseñas los planes por tramos de uso con usuarios ilimitados y migras a los clientes por etapas.",
        effects: { cashPct: 2, demandPct: 5, satisfaction: 3, productivityPct: -3, rounds: 3 },
        outcome:
          "El cliente dejó de tener motivo para compartir claves. Las empresas sumaron a todo su equipo, usaron más el sistema y pasaron a tramos más altos al crecer.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Avisar con 60 días y ofrecer paquetes por equipo",
        detail: "Comunicas la regla, das plazo y lanzas un precio por volumen para equipos de ventas.",
        effects: { cashPct: 2, satisfaction: -1 },
        outcome:
          "La mayoría regularizó sus usuarios con el descuento por volumen. Unos pocos buscaron otra forma de compartir accesos.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Tolerarlo para no incomodar a nadie",
        detail: "Dejas que cada empresa use las cuentas como prefiera.",
        effects: { costPct: 3, rounds: 3 },
        outcome:
          "El uso real siguió creciendo sin que crecieran los ingresos. Los clientes que pagaban por cada usuario empezaron a preguntar por qué ellos sí debían hacerlo.",
        verdict: "mala",
      },
    ],
    concept: "Métrica de precio alineada al valor",
    lesson:
      "La unidad por la que cobras debe crecer junto con el valor que recibe el cliente. Si la métrica castiga el uso, el cliente buscará la forma de esquivarla.",
  },

  // ───────────── TELECOM (B2C) ─────────────
  {
    id: "ind-telecom-portabilidad",
    title: "Se están portando a la competencia",
    category: "clientes",
    industries: ["telecom"],
    market: "B2C",
    tier: 1,
    situation:
      "Un competidor lanzó una campaña de portabilidad con 50 % de descuento por seis meses, y en Piura y Chiclayo tus clientes cambian de operador en un día conservando su número. Tu área comercial propone ofrecer el mismo descuento, pero solo a quienes llamen para pedir la portabilidad.",
    options: [
      {
        id: "a",
        label: "Dar el descuento solo a quien amenace con irse",
        detail: "El área de retención ofrece la rebaja cuando el cliente inicia el trámite de portabilidad.",
        effects: { demandPct: 3, cashPct: -2, satisfaction: -3, rounds: 2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -4, satisfaction: -3 },
          text: "El truco se difundió en redes y miles de clientes llamaron a amenazar con portarse para conseguir la rebaja.",
        },
        outcome:
          "Retuviste a una parte de los que llamaron. Los clientes fieles que nunca reclaman siguieron pagando la tarifa completa.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Premiar la antigüedad con más beneficios",
        detail: "Los clientes con más de un año reciben más gigas y beneficios sin cambiar su tarifa.",
        effects: { cashPct: -2, costPct: 2, satisfaction: 5, demandPct: 3, rounds: 3 },
        outcome:
          "Las portaciones salientes bajaron entre los clientes antiguos, que son los más rentables. La promoción del competidor atrajo sobre todo a usuarios que cambian de operador cada seis meses.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Igualar el 50 % de descuento para toda la base",
        detail: "Bajas la tarifa a la mitad durante seis meses a todos los clientes.",
        effects: { demandPct: 4, cashPct: -9, rounds: 2 },
        outcome:
          "Casi nadie se fue, pero renunciaste a ingresos de millones de clientes que no pensaban irse. El trimestre cerró con la caja muy golpeada.",
        verdict: "mala",
      },
    ],
    concept: "Retención y valor de vida del cliente",
    lesson:
      "Retener es rentable cuando se dirige a los clientes de mayor valor. Una rebaja general cuesta más que las bajas que evita, y premiar solo al que amenaza enseña a amenazar.",
  },
  {
    id: "ind-telecom-planes-ilimitados",
    title: "Guerra de planes ilimitados",
    category: "estrategia",
    industries: ["telecom"],
    market: "B2C",
    tier: 2,
    situation:
      "El operador más grande lanzó un plan de datos ilimitados a S/ 29.90, por debajo de tu plan más vendido. Tu red ya trabaja cerca de su capacidad en horas punta en Lima y Arequipa. El directorio te exige no perder cuota de mercado este trimestre.",
    options: [
      {
        id: "a",
        label: "Lanzar tu plan ilimitado a S/ 27.90",
        detail: "Respondes con un precio menor para recuperar la atención del mercado.",
        effects: { demandPct: 10, costPct: 6, quality: -6, satisfaction: -5, rounds: 2 },
        outcome:
          "Las ventas subieron, pero el tráfico saturó la red y la velocidad cayó en las noches. El competidor volvió a bajar su precio y el margen de ambos se redujo.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Planes por segmento con aplicaciones ilimitadas",
        detail: "Ofreces redes sociales y mensajería sin límite y datos generales con tope, según el tipo de usuario.",
        effects: { demandPct: 4, satisfaction: 2, brand: 2, rounds: 2 },
        outcome:
          "La mayoría de usuarios sintió que tenía lo que necesitaba a un precio competitivo. La red soportó la demanda porque el consumo pesado siguió acotado.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Mantener precios e invertir en capacidad de red",
        detail: "No entras a la pelea de precios y comunicas velocidad y estabilidad.",
        effects: { cashPct: -5, quality: 5, brand: 3, demandPct: -2, rounds: 3 },
        outcome:
          "Perdiste a los clientes más sensibles al precio. Los que se quedaron valoraron la calidad cuando la red del competidor empezó a congestionarse.",
        verdict: "buena",
      },
    ],
    concept: "Guerra de precios y capacidad",
    lesson:
      "Antes de responder a una rebaja revisa si tu capacidad soporta la demanda que vas a atraer. En negocios de red, vender más de lo que puedes atender daña la calidad de todos los clientes.",
  },
  {
    id: "ind-telecom-doble-cobro",
    title: "El sistema cobró dos veces el cargo fijo",
    category: "legal",
    industries: ["telecom"],
    market: "B2C",
    tier: 1,
    situation:
      "Un error en el sistema de facturación cobró dos veces el cargo fijo a miles de clientes de internet en casa. Los reclamos se acumulan en tu centro de atención y, si no respondes bien y a tiempo, los usuarios pueden apelar ante el tribunal de OSIPTEL. Muchos afectados todavía no se dieron cuenta.",
    options: [
      {
        id: "a",
        label: "Devolver de oficio a todos los afectados",
        detail: "Identificas en el sistema cada cobro doble y lo devuelves en el siguiente recibo con un aviso.",
        effects: { cashPct: -4, satisfaction: 6, reputation: 5 },
        outcome:
          "Los reclamos se detuvieron en una semana y el centro de atención volvió a la normalidad. El regulador archivó las consultas al ver la devolución general.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Devolver solo a quien presente reclamo",
        detail: "Atiendes caso por caso y conservas el dinero de quienes no reclamen.",
        effects: { cashPct: -1.5, satisfaction: -5, reputation: -5 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -8, reputation: -6 },
          text: "OSIPTEL detectó el cobro indebido masivo, ordenó la devolución total y aplicó una multa.",
        },
        outcome:
          "El centro de atención colapsó con miles de reclamos individuales. Retener dinero cobrado por error fue visto como mala fe.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Compensar con megas adicionales en vez de dinero",
        detail: "Ofreces más velocidad por un mes a cambio del cobro doble.",
        effects: { cashPct: -1, satisfaction: -3, reputation: -2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -5, reputation: -4 },
          text: "Los usuarios apelaron y el tribunal ordenó devolver el dinero, además de iniciar un procedimiento sancionador.",
        },
        outcome:
          "Algunos clientes aceptaron. La mayoría quería su dinero de vuelta y sintió que le cambiaban el tema.",
        verdict: "riesgosa",
      },
    ],
    concept: "Gestión de reclamos en servicios regulados",
    lesson:
      "En un servicio regulado, un error masivo se corrige de oficio y rápido. Devolver lo cobrado de más cuesta menos que atender miles de reclamos, pagar multas y perder la confianza.",
  },
  {
    id: "ind-telecom-robo-cable",
    title: "Tercer robo de cable en el mes",
    category: "operaciones",
    industries: ["telecom"],
    market: "B2C",
    tier: 2,
    situation:
      "En el último mes cortaron y robaron tu cableado en tres zonas del Callao, y miles de hogares quedaron sin internet dos días cada vez. Las reparaciones son costosas y los clientes afectados exigen que no se les cobre los días sin servicio.",
    options: [
      {
        id: "a",
        label: "Reparar, descontar los días y seguir igual",
        detail: "Atiendes cada corte cuando ocurre, sin cambiar la red.",
        effects: { cashPct: -3, satisfaction: -3 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -4, satisfaction: -5, demandPct: -4 },
          text: "Hubo un cuarto robo en la misma zona y muchos hogares se cambiaron de proveedor.",
        },
        outcome:
          "Cumpliste con los clientes, pero la red quedó tan expuesta como antes.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Ruta de respaldo y vigilancia en tramos críticos",
        detail: "Construyes un enlace redundante, instalas sensores de corte y coordinas con la municipalidad y la policía.",
        effects: { cashPct: -7, quality: 6, satisfaction: 4, rounds: 3 },
        outcome:
          "En el siguiente corte el tráfico pasó por la ruta alterna y casi nadie notó la falla. Las alertas permitieron llegar mientras el robo ocurría.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Reemplazar el cobre por fibra en las zonas afectadas",
        detail: "Adelantas la migración a fibra óptica, que no tiene valor de reventa como metal.",
        effects: { cashPct: -5, quality: 4, satisfaction: 2, rounds: 3 },
        outcome:
          "Los robos bajaron porque la fibra no se vende como chatarra, aunque hubo cortes por vandalismo. El servicio mejoró en velocidad.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Reparar, pero cobrar el mes completo",
        detail: "Solo descuentas los días sin servicio a quien lo reclame formalmente.",
        effects: { satisfaction: -7, reputation: -6 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -6, reputation: -5 },
          text: "El regulador verificó que no devolviste lo correspondiente a la interrupción y te sancionó.",
        },
        outcome:
          "Los vecinos se organizaron para reclamar en grupo y el caso salió en un noticiero local.",
        verdict: "mala",
      },
    ],
    concept: "Continuidad operativa y redundancia",
    lesson:
      "Reparar es gasto repetido; la redundancia es inversión. Cuando una falla se repite, el costo real incluye los clientes que se van, y eso justifica rediseñar la operación.",
  },
  {
    id: "ind-telecom-cobertura-selva-central",
    title: "Entrar a la selva central: torres propias o alquiladas",
    category: "finanzas",
    industries: ["telecom"],
    market: "B2C",
    tier: 3,
    situation:
      "Quieres dar cobertura en Satipo, Pichanaki y La Merced, donde solo opera un competidor con mala señal. Construir torres propias exige una inversión fuerte y permisos que tardan varios trimestres. Alquilar espacio en torres de un operador de infraestructura es más rápido, pero pagarás una renta mensual mientras dure el servicio.",
    options: [
      {
        id: "a",
        label: "Construir torres propias con un préstamo",
        detail: "Inviertes en infraestructura que será tuya y no pagarás alquiler en el futuro.",
        effects: { cashPct: -15, demandPct: 7, brand: 3, rounds: 4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -6, demandPct: -4 },
          text: "Los permisos municipales y la oposición de algunos vecinos retrasaron las obras y encarecieron el proyecto.",
        },
        outcome:
          "La inversión absorbió gran parte de tu capacidad de endeudamiento. La cobertura llegó, aunque más tarde de lo planeado.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Alquilar espacio en torres de un tercero",
        detail: "Instalas tus equipos en infraestructura compartida y pagas renta mensual.",
        effects: { cashPct: -4, fixedCostPct: 4, demandPct: 7, brand: 2, rounds: 4 },
        outcome:
          "Encendiste el servicio en pocos meses y captaste a los clientes descontentos del competidor. La renta pesa, pero conservaste caja para comprobar si la zona es rentable.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Usar la red del competidor con un acuerdo mayorista",
        detail: "Vendes tus planes en la zona pagando por el tráfico que cursa la red de otro operador.",
        effects: { costPct: 7, demandPct: 3, satisfaction: -2, rounds: 4 },
        outcome:
          "Entraste casi sin invertir, pero con la misma mala señal que ya molestaba a la gente. Tu margen por cliente en la zona quedó muy delgado.",
        verdict: "buena",
      },
    ],
    concept: "Inversión en activos frente a alquiler",
    lesson:
      "Comprar un activo conviene cuando la demanda es segura y el uso será intensivo. Cuando el mercado es incierto, alquilar convierte inversión en gasto y te deja margen para corregir.",
  },
  {
    id: "ind-telecom-equipos-en-cuotas",
    title: "Celulares en 18 cuotas que nadie termina de pagar",
    category: "finanzas",
    industries: ["telecom"],
    market: "B2C",
    tier: 1,
    situation:
      "Vendes celulares de gama media en 18 cuotas sin inicial junto con el plan pospago. La morosidad de esas cuotas subió mucho en Huancayo y Ayacucho: varios clientes dejan de pagar al tercer mes y revenden el equipo. El área comercial defiende que las cuotas sin inicial son lo que más atrae clientes nuevos.",
    options: [
      {
        id: "a",
        label: "Seguir vendiendo sin inicial y sin filtros",
        detail: "Priorizas la meta de altas nuevas del trimestre.",
        effects: { demandPct: 5, cashPct: -6, rounds: 2 },
        outcome:
          "Las altas se cumplieron, pero una parte creciente de los equipos quedó impaga. La provisión por cuentas incobrables se comió la utilidad de los planes.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Evaluar al cliente y pedir inicial según su perfil",
        detail: "Consultas el historial crediticio y ajustas la cuota inicial y el equipo que puede llevar.",
        effects: { demandPct: -3, cashPct: 3, rounds: 2 },
        outcome:
          "Vendiste algo menos, pero a clientes que sí pagan. La morosidad bajó y la inicial redujo el atractivo de llevarse el equipo para revenderlo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Eliminar la venta de equipos en cuotas",
        detail: "Solo vendes equipos al contado o con tarjeta de crédito del cliente.",
        effects: { demandPct: -8, cashPct: 2, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -4, rounds: 2 },
          text: "Los competidores mantuvieron sus cuotas y captaron a los clientes que querían renovar equipo.",
        },
        outcome:
          "El riesgo de crédito desapareció. También desapareció tu principal gancho para captar clientes pospago.",
        verdict: "riesgosa",
      },
    ],
    concept: "Riesgo de crédito al consumidor",
    lesson:
      "Vender a crédito es prestar dinero. Una venta que no se cobra es una pérdida, así que el crédito se otorga evaluando al cliente y calibrando la inicial según el riesgo.",
  },

  // ───────────── CONSULTORÍA (B2B) ─────────────
  {
    id: "ind-consultoria-cliente-no-paga",
    title: "Factura vencida y pedido de una segunda fase",
    category: "finanzas",
    industries: ["consultoria"],
    market: "B2B",
    tier: 1,
    situation:
      "Hace 75 días terminaste un estudio de reorganización para una empresa textil de Gamarra y todavía no te pagan la última factura, que equivale a la mitad del proyecto. El gerente repite que pagará 'la próxima semana' y, de paso, te pide empezar una segunda fase. El IGV de esa factura ya lo declaraste y pagaste a SUNAT.",
    options: [
      {
        id: "a",
        label: "Empezar la segunda fase para cuidar la relación",
        detail: "Asignas al equipo al nuevo trabajo confiando en que el pago llegará.",
        effects: { cashPct: -4, morale: -3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -8 },
          text: "El cliente tampoco pagó la segunda fase y ahora la deuda acumulada compromete tu planilla.",
        },
        outcome:
          "Tu equipo trabajó otro mes financiando al cliente. La deuda creció y tu poder para cobrar disminuyó.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Condicionar la fase 2 al pago y a un adelanto",
        detail: "Aceptas continuar solo si cancelan lo vencido y pagan 40 % de la nueva fase por anticipado.",
        effects: { cashPct: 4, satisfaction: -1 },
        outcome:
          "El gerente se incomodó, pero pagó en diez días porque necesitaba la segunda fase. El adelanto financió el arranque del nuevo trabajo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Enviar carta notarial y cerrar la relación",
        detail: "Exiges el pago por la vía formal y renuncias a seguir trabajando con ellos.",
        effects: { cashPct: 2, demandPct: -2 },
        outcome:
          "Cobraste tras varias semanas de tensión. Perdiste la segunda fase, que pudo haberse salvado con mejores condiciones de pago.",
        verdict: "buena",
      },
    ],
    concept: "Gestión de cuentas por cobrar",
    lesson:
      "Una venta no termina hasta que se cobra. El mejor momento para negociar el pago es cuando el cliente todavía necesita algo de ti; los adelantos y los hitos de pago son parte del diseño del servicio.",
  },
  {
    id: "ind-consultoria-alcance-crece",
    title: "Ya que están aquí, ¿pueden ver también esto?",
    category: "operaciones",
    industries: ["consultoria"],
    market: "B2B",
    tier: 1,
    situation:
      "Cotizaste a precio fijo un plan estratégico para una cooperativa de ahorro y crédito de Cusco. A mitad del proyecto, el gerente te pide 'ya que están aquí' un manual de funciones, un estudio de sueldos y talleres para jefaturas. Nada de eso figura en la propuesta firmada y tu equipo ya trabaja al límite de horas.",
    options: [
      {
        id: "a",
        label: "Hacer todo lo que pidan sin cobrar adicional",
        detail: "Absorbes los pedidos extra para mantener contento al cliente.",
        effects: { cashPct: -5, morale: -5, satisfaction: 4, quality: -3 },
        outcome:
          "El proyecto consumió el doble de horas y terminó en pérdida. El entregable principal salió apurado y el cliente asumió que todo estaba incluido.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Registrar los pedidos y cotizarlos como adenda",
        detail: "Aplicas un control de cambios: cada pedido nuevo tiene alcance, plazo y precio propios.",
        effects: { cashPct: 3, morale: 2, satisfaction: -1 },
        outcome:
          "El cliente priorizó: contrató el manual de funciones y dejó el resto para el próximo año. Tu equipo terminó el plan estratégico sin desbordarse.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Regalar un taller corto y cotizar lo demás",
        detail: "Das una cortesía acotada y dejas claro que el resto requiere otra propuesta.",
        effects: { cashPct: 1, satisfaction: 3, morale: -1 },
        outcome:
          "El gesto fue bien recibido y abrió la conversación sobre los otros servicios. Tu equipo puso un sábado de trabajo que no se facturó.",
        verdict: "buena",
      },
    ],
    concept: "Control del alcance del proyecto",
    lesson:
      "En un contrato a precio fijo, cada hora no prevista sale de tu margen. El alcance se define por escrito y los pedidos nuevos se tratan como cambios con su propio precio.",
  },
  {
    id: "ind-consultoria-precio-bajo-cuenta",
    title: "Cotizar barato para entrar al sector minero",
    category: "estrategia",
    industries: ["consultoria"],
    market: "B2B",
    tier: 2,
    situation:
      "Una minera mediana invita a tres consultoras a cotizar un diagnóstico de procesos. Sabes que un competidor presentará un precio muy bajo. Ganar la cuenta te abriría el sector minero, pero con tu tarifa normal probablemente pierdas, y con la tarifa que ganaría, el proyecto apenas cubre los sueldos del equipo.",
    options: [
      {
        id: "a",
        label: "Cotizar 40 % por debajo de tu tarifa",
        detail: "Sacrificas margen ahora para ganar la cuenta y cobrar mejor después.",
        effects: { cashPct: -3, demandPct: 4, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -4 },
          text: "El cliente tomó ese precio como referencia y exigió la misma tarifa para las fases siguientes.",
        },
        outcome:
          "Ganaste el concurso. El área de compras registró tu tarifa rebajada como tu precio de mercado.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Proponer una primera etapa corta a tarifa completa",
        detail: "Reduces el alcance, no el precio por hora: un diagnóstico acotado con resultados en cuatro semanas.",
        effects: { demandPct: 3, brand: 2, rounds: 2 },
        outcome:
          "El monto total fue menor que el de los competidores porque el alcance era más pequeño. El cliente probó tu trabajo y contrató la segunda etapa a tu tarifa.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Tarifa de lista con descuento de primer proyecto",
        detail: "Muestras el precio normal y un descuento explícito, por única vez, en la propuesta y la factura.",
        effects: { cashPct: -2, demandPct: 3, rounds: 2 },
        outcome:
          "Quedó registrado cuál es tu precio real y que la rebaja fue una excepción. En la renovación hubo regateo, pero partiendo de tu tarifa.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Presentar la propuesta completa a tarifa normal",
        detail: "Compites por calidad y experiencia, sin ajustar precio ni alcance.",
        effects: { brand: 1 },
        risk: {
          prob: 0.6,
          effects: { demandPct: -3 },
          text: "La minera eligió la propuesta más barata y quedaste fuera del sector por ahora.",
        },
        outcome:
          "Defendiste tu posicionamiento. El comité valoró tu propuesta técnica, aunque el precio pesó mucho en la decisión.",
        verdict: "buena",
      },
    ],
    concept: "Precio de referencia (ancla)",
    lesson:
      "El primer precio que acepta un cliente se convierte en su referencia. Si necesitas bajar el monto, reduce el alcance o muestra el descuento como excepción, pero no rebajes tu tarifa en silencio.",
  },
  {
    id: "ind-consultoria-estrella-independiza",
    title: "Tu consultora estrella abre su propia firma",
    category: "laboral",
    industries: ["consultoria"],
    market: "B2B",
    tier: 2,
    situation:
      "Tu consultora senior en gestión de personas, responsable de tus tres cuentas más grandes, te avisa que abrirá su propia firma en dos meses. Los clientes la llaman directamente a ella y su contrato no incluye cláusula de no captación. Te propone seguir colaborando contigo como asociada externa.",
    options: [
      {
        id: "a",
        label: "Retirarla de inmediato y advertirle acciones legales",
        detail: "Le cortas el acceso a los clientes desde hoy y le envías una carta de tu abogado.",
        effects: { morale: -6, demandPct: -8, reputation: -2, rounds: 2 },
        outcome:
          "Sin cláusula firmada no había base para reclamar. Los clientes se molestaron por el cambio brusco y dos se fueron con ella.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Pactar una alianza y una transición ordenada",
        detail: "Ella sigue como asociada con reparto de honorarios y tú sumas un segundo consultor en cada cuenta.",
        effects: { demandPct: -2, fixedCostPct: -2, morale: 2, rounds: 3 },
        outcome:
          "Conservaste las tres cuentas, con menor margen en una de ellas. Los clientes conocieron a otros miembros del equipo y la relación dejó de depender de una persona.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Ofrecerle ser socia con participación",
        detail: "Le propones una parte de las utilidades para que se quede.",
        effects: { fixedCostPct: 4, morale: 3, rounds: 4 },
        risk: {
          prob: 0.35,
          effects: { demandPct: -6, morale: -3, rounds: 2 },
          text: "Aceptó, pero al año se fue de todos modos y con una relación aún más fuerte con los clientes.",
        },
        outcome:
          "Aceptó quedarse. Otros consultores senior preguntaron cuándo les tocaría una propuesta similar.",
        verdict: "buena",
      },
    ],
    concept: "Dependencia de personas clave",
    lesson:
      "En servicios profesionales el cliente compra personas. La firma se protege cuando cada cuenta conoce a más de un consultor, el método está documentado y los contratos prevén la salida de un socio.",
  },
  {
    id: "ind-consultoria-conflicto-interes",
    title: "El competidor de tu cliente quiere contratarte",
    category: "etica",
    industries: ["consultoria"],
    market: "B2B",
    tier: 3,
    situation:
      "Asesoras desde hace un año a una cadena de boticas del norte y conoces sus costos, márgenes y plan de aperturas. Su principal competidor regional te ofrece un contrato mayor para diseñar su expansión en las mismas ciudades. Tu contrato actual tiene cláusula de confidencialidad, pero no de exclusividad.",
    options: [
      {
        id: "a",
        label: "Aceptar con el mismo equipo, que ya conoce el sector",
        detail: "Aprovechas la experiencia acumulada para entregar más rápido al nuevo cliente.",
        effects: { cashPct: 8, reputation: -8 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -6, demandPct: -10, reputation: -8, rounds: 3 },
          text: "Tu primer cliente reconoció sus propios datos en la estrategia del rival, resolvió el contrato y te demandó.",
        },
        outcome:
          "El equipo no pudo separar lo que sabía de un cliente al aconsejar al otro. La información confidencial se filtró en las recomendaciones.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Consultar a tu cliente y aceptar solo si consiente",
        detail: "Informas a ambos, propones equipos y archivos separados, y respetas la respuesta.",
        effects: { cashPct: 3, reputation: 5, satisfaction: 3 },
        outcome:
          "Tu cliente puso condiciones: equipos separados y exclusión de tres ciudades. El nuevo contrato fue más pequeño, pero ambos saben a qué atenerse.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rechazar el contrato",
        detail: "Priorizas la relación actual y descartas trabajar para el competidor.",
        effects: { reputation: 4, satisfaction: 3 },
        outcome:
          "Renunciaste a un ingreso importante. Tu cliente se enteró por el mercado y te amplió el contrato al año siguiente.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Aceptar sin avisar, con un equipo distinto",
        detail: "Separas a los consultores, pero no informas a ninguno de los dos clientes.",
        effects: { cashPct: 6, reputation: -3 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -8, reputation: -7, rounds: 2 },
          text: "Tu cliente supo por un proveedor común que asesorabas a su rival y terminó el contrato por pérdida de confianza.",
        },
        outcome:
          "La separación interna funcionó, pero ocultar el encargo convirtió una situación manejable en un secreto.",
        verdict: "riesgosa",
      },
    ],
    concept: "Conflicto de interés y confidencialidad",
    lesson:
      "El activo de una consultora es la confianza. Un conflicto de interés se gestiona con transparencia y consentimiento, no con silencio, aunque el contrato no lo prohíba.",
  },
  {
    id: "ind-consultoria-consultores-en-banca",
    title: "Cuatro consultores sin proyecto",
    category: "operaciones",
    industries: ["consultoria"],
    market: "B2B",
    tier: 2,
    situation:
      "Terminaron dos proyectos grandes y cuatro de tus diez consultores están 'en banca', sin horas facturables, mientras la planilla sigue corriendo. El siguiente proyecto importante recién se decidiría en tres meses. Tu contador sugiere reducir personal de inmediato.",
    options: [
      {
        id: "a",
        label: "Desvincular a los cuatro consultores",
        detail: "Pagas liquidaciones y reduces la planilla al tamaño de los proyectos vigentes.",
        effects: { cashPct: -3, fixedCostPct: -10, morale: -8, rounds: 3 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -8, quality: -4, rounds: 2 },
          text: "Ganaste el proyecto grande y no tenías equipo: contrataste de apuro y la calidad se resintió.",
        },
        outcome:
          "El gasto fijo bajó. Los consultores que quedaron empezaron a actualizar su currículum.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Usar las horas libres para crear y vender productos",
        detail: "El equipo arma diagnósticos y talleres empaquetados y sale a ofrecerlos a clientes actuales.",
        effects: { cashPct: -1, demandPct: 5, morale: 3, rounds: 2 },
        outcome:
          "Se vendieron varios proyectos cortos que cubrieron parte de la planilla. Los productos empaquetados quedaron como oferta permanente.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Pasar a un núcleo en planilla y una red de asociados",
        detail: "Mantienes a los consultores clave y acuerdas con los demás trabajar por proyecto.",
        effects: { fixedCostPct: -5, morale: -3, quality: -2, rounds: 3 },
        outcome:
          "Tu costo se volvió más flexible. A cambio, los asociados atienden también a otras firmas y no siempre están disponibles cuando los necesitas.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Esperar el proyecto grande sin cambiar nada",
        detail: "Mantienes al equipo completo, sin tareas definidas, hasta que llegue el siguiente contrato.",
        effects: { cashPct: -4, morale: -2 },
        outcome:
          "Pasaron tres meses de planilla sin ingresos que la respalden. El proyecto se decidió con retraso y la caja llegó justa.",
        verdict: "mala",
      },
    ],
    concept: "Tasa de utilización del equipo",
    lesson:
      "En consultoría el inventario son las horas, y la hora no facturada se pierde. La gestión consiste en equilibrar la utilización entre proyectos, venta y desarrollo de nuevos servicios.",
  },

  // ───────────── AGENCIA DE MARKETING (B2B) ─────────────
  {
    id: "ind-agencia-resultados-garantizados",
    title: "El cliente exige 200 pacientes garantizados",
    category: "clientes",
    industries: ["agencia"],
    market: "B2B",
    tier: 1,
    situation:
      "Una clínica dental de Trujillo quiere contratarte, pero exige que garantices por contrato 200 pacientes nuevos al mes; si no llegas, no paga. Otra agencia ya le prometió eso. Tú sabes que el resultado depende también de sus precios, de quién responde el WhatsApp y de cómo atienden en recepción.",
    options: [
      {
        id: "a",
        label: "Firmar la garantía de 200 pacientes",
        detail: "Aceptas cobrar solo si se cumple la meta de pacientes nuevos.",
        effects: { demandPct: 4 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -5, morale: -4 },
          text: "Llegaron muchos interesados, pero la clínica tardaba horas en responder. No se cumplió la meta y no cobraste.",
        },
        outcome:
          "Ganaste la cuenta. Tu ingreso quedó atado a la recepción de la clínica, que tú no manejas.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Comprometer indicadores que sí controlas",
        detail: "Propones metas de contactos calificados y costo por contacto, con un piloto de tres meses.",
        effects: { demandPct: 2, satisfaction: 3, reputation: 2 },
        outcome:
          "La clínica aceptó el piloto. Al medir cada etapa se vio que el problema estaba en el tiempo de respuesta, y te contrataron también para ordenar la atención.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Declinar la cuenta",
        detail: "Explicas por qué nadie puede garantizar pacientes y te retiras del proceso.",
        effects: { reputation: 1 },
        outcome:
          "La clínica firmó con la otra agencia. Meses después volvió a buscar proveedor, esta vez con preguntas más realistas.",
        verdict: "buena",
      },
    ],
    concept: "Gestión de expectativas e indicadores",
    lesson:
      "Comprométete con resultados que dependan de tu trabajo. Una meta que pasa por procesos del cliente debe medirse por etapas para saber dónde se pierde la venta.",
  },
  {
    id: "ind-agencia-fee-o-comision",
    title: "Fee mensual o comisión sobre ventas",
    category: "finanzas",
    industries: ["agencia"],
    market: "B2B",
    tier: 2,
    situation:
      "Una tienda en línea de zapatillas te propone cambiar tu fee mensual fijo por una comisión de 8 % sobre las ventas que lleguen por publicidad. Sus ventas crecen, pero dependen de su stock y de campañas como el Cyber Wow. Con el fee cubres la planilla del equipo asignado; con la comisión podrías ganar el doble o la mitad.",
    options: [
      {
        id: "a",
        label: "Pasar todo a comisión",
        detail: "Tu ingreso depende por completo de las ventas del cliente.",
        effects: { cashPct: 3, satisfaction: 3 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -6, morale: -3 },
          text: "El cliente se quedó sin stock de las tallas más vendidas durante dos meses y tu comisión no cubrió la planilla.",
        },
        outcome:
          "En los meses de campaña ganaste más que con el fee. Tu flujo de caja empezó a moverse al ritmo del inventario del cliente.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Esquema mixto: fee base y bono por metas",
        detail: "Un fijo que cubre tus costos y un variable que premia el crecimiento.",
        effects: { cashPct: 2, satisfaction: 3, morale: 2 },
        outcome:
          "El cliente sintió que compartías el riesgo y tú aseguraste la planilla. En el Cyber Wow el bono superó lo que habrías cobrado con el esquema anterior.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Mantener el fee fijo",
        detail: "Defiendes el esquema actual con un reporte del retorno de la inversión publicitaria.",
        effects: { reputation: 1 },
        risk: {
          prob: 0.3,
          effects: { demandPct: -3 },
          text: "El cliente se fue con una agencia que aceptó trabajar solo a comisión.",
        },
        outcome:
          "Tus ingresos siguieron siendo previsibles. El cliente aceptó por ahora, aunque volverá a plantear el tema.",
        verdict: "buena",
      },
    ],
    concept: "Ingresos fijos frente a ingresos variables",
    lesson:
      "Un ingreso variable comparte el riesgo y la ganancia, pero no debe depender de factores que no controlas. El fijo cubre tus costos y el variable alinea los intereses con el cliente.",
  },
  {
    id: "ind-agencia-cuenta-publicitaria-bloqueada",
    title: "Te bloquearon la cuenta publicitaria",
    category: "tecnologia",
    industries: ["agencia"],
    market: "B2B",
    tier: 2,
    situation:
      "La plataforma inhabilitó sin aviso la cuenta publicitaria desde la que manejas las campañas de nueve clientes, en la semana previa al Día de la Madre. Todo corría desde tu administrador comercial y con tu tarjeta. La apelación puede tardar días y los clientes ya preguntan por qué no llegan mensajes.",
    options: [
      {
        id: "a",
        label: "Crear cuentas nuevas con otros datos",
        detail: "Abres perfiles y cuentas alternas para seguir anunciando mientras se resuelve la apelación.",
        effects: { demandPct: 2 },
        risk: {
          prob: 0.55,
          effects: { demandPct: -10, reputation: -5, satisfaction: -6, rounds: 2 },
          text: "La plataforma detectó la evasión y bloqueó de forma definitiva todos los activos vinculados, incluidas páginas de clientes.",
        },
        outcome:
          "Las campañas volvieron a salir por unos días, sin historial ni aprendizaje acumulado.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Apelar, avisar a los clientes y mover la pauta",
        detail: "Trasladas el presupuesto urgente a otras plataformas y luego migras a cada cliente a su propia cuenta.",
        effects: { cashPct: -2, satisfaction: -1, quality: 3, reputation: 2 },
        outcome:
          "La campaña perdió algo de alcance, pero los clientes supieron qué pasaba y qué hacías. Desde entonces cada cliente anuncia con su cuenta y su medio de pago.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Esperar la apelación sin decir nada",
        detail: "Confías en que se resuelva antes de que los clientes lo noten.",
        effects: { satisfaction: -7, demandPct: -5, reputation: -3, rounds: 2 },
        outcome:
          "La cuenta volvió después del Día de la Madre. Tres clientes se enteraron por sus propias ventas y cancelaron el servicio.",
        verdict: "mala",
      },
    ],
    concept: "Riesgo de dependencia de una plataforma",
    lesson:
      "Concentrar a todos tus clientes en una sola cuenta crea un punto único de falla. Separar activos por cliente y diversificar canales limita el daño cuando la plataforma cambia las reglas.",
  },
  {
    id: "ind-agencia-contenido-con-ia",
    title: "Contenido hecho con inteligencia artificial",
    category: "etica",
    industries: ["agencia"],
    market: "B2B",
    tier: 1,
    situation:
      "Tu equipo produce textos e imágenes para redes con herramientas de inteligencia artificial y ahora entrega el triple de piezas. Una marca de cosmética natural de Arequipa te paga un fee alto por contenido 'hecho a mano' y no sabe nada. Una imagen generada salió publicada con un envase que no existe en su catálogo.",
    options: [
      {
        id: "a",
        label: "Seguir igual y corregir la imagen en silencio",
        detail: "Reemplazas la pieza y mantienes el método sin informar al cliente.",
        effects: { costPct: -5, rounds: 2 },
        risk: {
          prob: 0.45,
          effects: { satisfaction: -8, reputation: -5, demandPct: -4 },
          text: "Una seguidora señaló el error en los comentarios y el cliente descubrió cómo se producía su contenido.",
        },
        outcome:
          "Los costos bajaron y la producción subió. El cliente sigue pagando por algo distinto a lo que cree recibir.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Informar al cliente y fijar reglas de uso",
        detail: "IA para borradores e ideas, fotos reales del producto y revisión humana antes de publicar.",
        effects: { costPct: -3, satisfaction: 3, quality: 3, reputation: 3, rounds: 2 },
        outcome:
          "El cliente agradeció la franqueza y pidió fotografía real para sus productos. Conservaste parte del ahorro y evitaste nuevos errores.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Prohibir la IA en toda la agencia",
        detail: "Vuelves a la producción completamente manual para todos los clientes.",
        effects: { costPct: 4, productivityPct: -6, quality: 1, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -5, rounds: 2 },
          text: "Otras agencias ofrecieron más piezas por el mismo fee y te quitaron dos cuentas.",
        },
        outcome:
          "El riesgo de errores generados desapareció. Tu equipo volvió a producir un tercio de lo que entregaba.",
        verdict: "riesgosa",
      },
    ],
    concept: "Transparencia sobre cómo se presta el servicio",
    lesson:
      "Una herramienta que mejora la productividad no es el problema; ocultarla sí. El cliente debe saber qué compra, y toda pieza necesita revisión humana antes de salir con su marca.",
  },
  {
    id: "ind-agencia-community-se-lleva-cliente",
    title: "La community manager se fue con dos clientes",
    category: "laboral",
    industries: ["agencia"],
    market: "B2B",
    tier: 2,
    situation:
      "Tu community manager más antigua renunció y, a la semana, dos restaurantes te avisan que no renovarán: seguirán con ella como independiente, a mitad de precio. Ella manejaba las contraseñas, el trato diario y el chat con los dueños. Otros tres clientes son atendidos de la misma forma por una sola persona.",
    options: [
      {
        id: "a",
        label: "Presionar a los clientes y amenazarla con un juicio",
        detail: "Envías cartas a la ex trabajadora y a los dos restaurantes.",
        effects: { cashPct: -2, reputation: -4, brand: -3 },
        outcome:
          "Sin cláusula firmada, las cartas no tuvieron efecto. Los dueños comentaron el episodio con otros empresarios del rubro.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Rediseñar la atención de cuentas",
        detail: "Dos personas por cuenta, accesos a nombre de la agencia, reunión mensual tuya con cada cliente y cláusula de no captación.",
        effects: { fixedCostPct: 3, satisfaction: 4, demandPct: 2, rounds: 3 },
        outcome:
          "Perdiste los dos restaurantes, pero los demás clientes empezaron a relacionarse con la agencia y no con una sola persona. No hubo más salidas.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Igualar el precio de ella para retenerlos",
        detail: "Ofreces a los dos restaurantes el servicio a mitad de precio.",
        effects: { cashPct: -3, demandPct: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -3, brand: -2 },
          text: "Otros clientes se enteraron de la rebaja y exigieron el mismo precio.",
        },
        outcome:
          "Uno de los restaurantes se quedó. Atenderlo a ese precio no cubre las horas del equipo.",
        verdict: "riesgosa",
      },
    ],
    concept: "Propiedad de la relación con el cliente",
    lesson:
      "Si el cliente solo conoce a una persona, la cuenta es de esa persona. La relación se vuelve de la empresa con equipos, procesos, accesos propios y contratos claros.",
  },
  {
    id: "ind-agencia-cliente-concentra-facturacion",
    title: "Tu cliente más grande quiere pagar a 90 días",
    category: "finanzas",
    industries: ["agencia"],
    market: "B2B",
    tier: 3,
    situation:
      "Una cadena de tiendas representa el 45 % de tu facturación. Su nuevo gerente de compras te comunica que desde el próximo trimestre pagará a 90 días en vez de 30 y que quiere 10 % de descuento por volumen. Si te niegas, pondrá la cuenta a concurso. Tu planilla se paga cada fin de mes.",
    options: [
      {
        id: "a",
        label: "Aceptar las dos condiciones",
        detail: "Conservas la cuenta cediendo en plazo y en precio.",
        effects: { cashPct: -8, morale: -2, costPct: 2, rounds: 2 },
        outcome:
          "Conservaste la cuenta, pero financias dos meses de trabajo a tu cliente más grande. Tuviste que usar un sobregiro para pagar sueldos.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Negociar plazo por contrato y diversificar",
        detail: "Aceptas 60 días a cambio de un contrato de 12 meses sin descuento, y sales a buscar cuentas nuevas.",
        effects: { cashPct: -3, demandPct: 3, rounds: 3 },
        outcome:
          "El gerente cedió en el descuento a cambio del plazo. Con un contrato firmado conseguiste una línea de crédito y tu dependencia de esa cuenta empezó a bajar.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rechazar ambas condiciones",
        detail: "Mantienes 30 días y tu precio, y asumes el riesgo del concurso.",
        effects: { morale: 1 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -20, morale: -6, rounds: 3 },
          text: "La cadena convocó el concurso y adjudicó la cuenta a una agencia más grande.",
        },
        outcome:
          "Defendiste tus condiciones. Todo dependió de cuánto le costaba al cliente cambiar de agencia.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Aceptar los 90 días y adelantar facturas con factoring",
        detail: "Cedes en plazo, no en precio, y una entidad financiera te adelanta el cobro con un descuento.",
        effects: { cashPct: -2, costPct: 3, rounds: 3 },
        outcome:
          "Tu caja no sufrió, pero el costo financiero salió de tu margen cada mes. La dependencia de un solo cliente siguió igual.",
        verdict: "buena",
      },
    ],
    concept: "Concentración de clientes",
    lesson:
      "Cuando un cliente pesa casi la mitad de tus ventas, él pone las condiciones. El poder de negociación se recupera diversificando la cartera antes de que llegue la presión.",
  },

  // ───────────── AGROEXPORTACIÓN (B2B) ─────────────
  {
    id: "ind-agroexport-residuos-uva",
    title: "Dos lotes de uva superan el límite de residuos",
    category: "operaciones",
    industries: ["agroexport"],
    market: "B2B",
    tier: 2,
    situation:
      "A días de embarcar doce contenedores de uva de mesa desde Piura, el laboratorio detecta en dos lotes un residuo de plaguicida que supera el límite máximo que exige tu comprador europeo, aunque sí cumple el de otros destinos. Senasa ya inspeccionó la carga para el certificado fitosanitario. Reemplazar esos lotes retrasa el embarque una semana.",
    options: [
      {
        id: "a",
        label: "Embarcar todo y confiar en que no lo analicen",
        detail: "Mantienes la fecha y el volumen pactados sin informar del resultado del laboratorio.",
        effects: { cashPct: 5 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -15, reputation: -10, demandPct: -10, rounds: 3 },
          text: "El supermercado analizó la fruta en destino, rechazó el embarque completo y te puso en observación.",
        },
        outcome:
          "La carga salió a tiempo. Tu empresa quedó expuesta a un rechazo en destino, donde el costo de destruir o devolver la fruta es tuyo.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Separar los dos lotes y enviarlos a otro mercado",
        detail: "Embarcas a Europa solo lo que cumple y rediriges lo observado a un destino que sí lo acepta.",
        effects: { cashPct: -3, reputation: 3, quality: 2 },
        outcome:
          "El comprador europeo recibió menos volumen, pero dentro de norma. Los dos lotes se vendieron a menor precio en otro destino y revisaste el plan de aplicaciones en campo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Retrasar el embarque hasta reemplazar los lotes",
        detail: "Esperas una semana para completar los doce contenedores con fruta que cumpla.",
        effects: { cashPct: -5, satisfaction: -3, reputation: 2 },
        outcome:
          "Cumpliste el volumen con fruta conforme. La semana de retraso hizo que llegaras con precios más bajos y el importador te cobró el incumplimiento de fecha.",
        verdict: "buena",
      },
    ],
    concept: "Inocuidad y límites máximos de residuos",
    lesson:
      "Cada mercado fija sus propios límites y el comprador puede exigir aún más. La trazabilidad por lote permite separar el problema sin poner en riesgo todo el embarque ni la relación comercial.",
  },
  {
    id: "ind-agroexport-dolar-cae",
    title: "Vendes en dólares y pagas en soles",
    category: "finanzas",
    industries: ["agroexport"],
    market: "B2B",
    tier: 3,
    situation:
      "Vendes arándanos en dólares y cobras a 60 días, pero pagas jornales, insumos locales y parte de tus préstamos en soles. El dólar lleva varias semanas cayendo y tu margen en soles se reduce con cada embarque. Tu banco te ofrece un forward para fijar el tipo de cambio de los próximos dos trimestres.",
    options: [
      {
        id: "a",
        label: "Cubrir con forward todas las ventas proyectadas",
        detail: "Fijas el tipo de cambio para el total de lo que esperas exportar en la campaña.",
        effects: { cashPct: -1 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -6 },
          text: "La cosecha rindió menos de lo proyectado y tuviste que comprar dólares más caros para cumplir el contrato con el banco.",
        },
        outcome:
          "Tu tipo de cambio quedó asegurado. El compromiso con el banco es por un monto fijo, produzcas o no esa cantidad de fruta.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Cubrir una parte: las ventas ya contratadas",
        detail: "Tomas forward solo por los embarques con contrato firmado y dejas el resto libre.",
        effects: { cashPct: -1, reputation: 1 },
        outcome:
          "El dólar siguió bajando y tus ventas cubiertas mantuvieron su margen. Cuando luego repuntó, la parte libre capturó la mejora.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "No cubrir y esperar que el dólar suba",
        detail: "Mantienes toda tu exposición al tipo de cambio del día de cada cobranza.",
        effects: {},
        risk: {
          prob: 0.5,
          effects: { cashPct: -7 },
          text: "El dólar siguió cayendo durante la campaña y cada cobranza se convirtió en menos soles de los presupuestados.",
        },
        outcome:
          "Ahorraste el costo de la cobertura. El margen de tu campaña quedó dependiendo de una variable que no controlas.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Pasar parte de tu deuda y tus compras a dólares",
        detail: "Calzas tus pagos con la moneda en la que cobras: préstamos, fletes y fertilizantes en dólares.",
        effects: { cashPct: -1, costPct: -1, rounds: 2 },
        outcome:
          "Una mayor parte de tus costos empezó a moverse junto con tus ingresos. Los jornales siguieron en soles, así que la protección fue parcial.",
        verdict: "buena",
      },
    ],
    concept: "Cobertura del riesgo cambiario",
    lesson:
      "Una cobertura no busca ganar con el dólar, busca proteger el margen presupuestado. Se cubre lo que es seguro que cobrarás y se calza, en lo posible, la moneda de los costos con la de los ingresos.",
  },
  {
    id: "ind-agroexport-sin-contenedores",
    title: "No hay contenedores refrigerados en Paita",
    category: "operaciones",
    industries: ["agroexport"],
    market: "B2B",
    tier: 2,
    situation:
      "En plena campaña de palta Hass faltan contenedores refrigerados en Paita y la naviera te ofrece espacio recién en dos semanas, con un flete bastante más caro. La fruta ya está cosechada en tu planta de empaque de Olmos y cada día en cámara le resta vida útil. Tu contrato con el importador holandés fija la semana de llegada.",
    options: [
      {
        id: "a",
        label: "Esperar las dos semanas con la fruta en cámara",
        detail: "Mantienes el puerto y la naviera, y conservas la palta en frío hasta que haya espacio.",
        effects: { cashPct: -2, satisfaction: -3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -8, satisfaction: -5, brand: -3 },
          text: "La fruta llegó con maduración avanzada y el importador presentó un reclamo de calidad con descuento en la liquidación.",
        },
        outcome:
          "Evitaste costos de transporte adicionales. La palta llegó tarde y con menos días de vida en anaquel.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Llevar la carga por carretera al Callao",
        detail: "Pagas el flete terrestre refrigerado para embarcar esta misma semana desde otro puerto.",
        effects: { cashPct: -4, satisfaction: 3, reputation: 2 },
        outcome:
          "El costo logístico subió, pero la fruta llegó en la semana pactada y en buena condición. El importador te dio prioridad para la siguiente campaña.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Enviar la palta por vía aérea",
        detail: "Reservas carga aérea para llegar antes que nadie.",
        effects: { cashPct: -12, satisfaction: 3 },
        outcome:
          "La fruta llegó en dos días, pero el flete aéreo superó el margen de un producto pesado y de precio medio como la palta. Perdiste dinero en cada caja.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Vender la fruta a otro exportador con espacio",
        detail: "Cedes la carga en planta a un tercero que tiene contenedores asignados.",
        effects: { cashPct: -4, satisfaction: -4 },
        outcome:
          "Recuperaste el costo de la fruta sin asumir más riesgo. Tu importador se quedó sin su programa de esa semana y tuvo que abastecerse con otro proveedor.",
        verdict: "buena",
      },
    ],
    concept: "Costo logístico en productos perecibles",
    lesson:
      "En un perecible, el tiempo es parte de la calidad. La alternativa logística se elige comparando el sobrecosto del flete con el valor que pierde la fruta y el contrato por cada día de demora.",
  },
  {
    id: "ind-agroexport-nino-costero",
    title: "Anuncian un Niño costero para el verano",
    category: "entorno",
    industries: ["agroexport"],
    market: "B2B",
    tier: 3,
    situation:
      "Los comunicados oficiales anuncian alta probabilidad de un Niño costero para el verano. Tienes 80 hectáreas de mango y uva en Piura, con drenes descuidados y sin seguro agrícola. Prepararte cuesta dinero hoy y, si el evento resulta débil, habrás gastado en algo que nadie verá.",
    options: [
      {
        id: "a",
        label: "Limpiar drenes, reforzar defensas y contratar seguro",
        detail: "Inviertes en prevención física y transfieres parte del riesgo a una aseguradora.",
        effects: { cashPct: -6, quality: 2, reputation: 2 },
        outcome:
          "Las lluvias llegaron con fuerza. Tus campos drenaron en pocos días y el seguro cubrió parte de la fruta perdida, mientras fundos vecinos quedaron anegados por semanas.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Contratar solo el seguro agrícola",
        detail: "Pagas la prima y dejas la infraestructura como está.",
        effects: { cashPct: -2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -5, demandPct: -8, rounds: 2 },
          text: "El agua se empozó en los campos. El seguro pagó una parte, pero las plantas dañadas redujeron la siguiente cosecha.",
        },
        outcome:
          "Quedaste protegido en lo financiero. El seguro indemniza pérdidas, pero no evita que el campo se dañe.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "No gastar hasta ver si el evento se confirma",
        detail: "Conservas la caja y decides cuando empiecen las lluvias.",
        effects: {},
        risk: {
          prob: 0.45,
          effects: { cashPct: -15, demandPct: -15, quality: -5, rounds: 3 },
          text: "Las lluvias intensas inundaron los campos y los caminos. Cuando quisiste reaccionar no había maquinaria disponible.",
        },
        outcome:
          "No gastaste nada en prevención. Toda tu campaña quedó sujeta a lo que pasara con el clima.",
        verdict: "riesgosa",
      },
    ],
    concept: "Gestión del riesgo climático",
    lesson:
      "La prevención se evalúa con probabilidad por impacto: un gasto pequeño y seguro frente a una pérdida grande y probable. Mitigar reduce el daño y asegurar transfiere la pérdida; se complementan.",
    basedOn: "Fenómeno del Niño costero de 2017",
  },
  {
    id: "ind-agroexport-cuadrillas-cosecha",
    title: "Cuatrocientos cosechadores para diez semanas",
    category: "laboral",
    industries: ["agroexport"],
    market: "B2B",
    tier: 1,
    situation:
      "Empieza la cosecha de arándano en Chao y Virú y necesitas 400 cosechadores por diez semanas. Un contratista ofrece llevarte cuadrillas 'sin papeleo', pagando por jaba y sin planilla, a un costo menor. Formalizar a todos bajo el régimen agrario exige más trámite y cuesta más.",
    options: [
      {
        id: "a",
        label: "Tomar las cuadrillas del contratista informal",
        detail: "Pagas un monto por jaba al contratista y él se entiende con los trabajadores.",
        effects: { costPct: -6, reputation: -3 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -10, reputation: -10, demandPct: -6, rounds: 2 },
          text: "SUNAFIL inspeccionó el fundo, te atribuyó la relación laboral y la auditoría social de tu comprador quedó observada.",
        },
        outcome:
          "La cosecha arrancó rápido y barata. Los trabajadores rotaban cada semana y nadie respondía por accidentes ni por pagos incompletos.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Contratar en planilla con bono por productividad",
        detail: "Registras a los cosechadores en el régimen agrario, con transporte y un bono por calidad de cosecha.",
        effects: { costPct: 4, morale: 5, productivityPct: 4, reputation: 3, quality: 2 },
        outcome:
          "El costo por kilo subió algo, pero la gente volvió cada semana y cosechó con más cuidado. Pasaste sin observaciones la auditoría social que exigen los supermercados.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Mitad en planilla y mitad con el contratista",
        detail: "Formalizas al grupo estable y cubres el pico con cuadrillas externas sin registro.",
        effects: { costPct: -2, morale: -3, reputation: -2 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -7, reputation: -7, morale: -4 },
          text: "Los dos grupos compararon sus pagos y los informales paralizaron la cosecha tres días en plena semana pico.",
        },
        outcome:
          "Ahorraste una parte. En el mismo campo trabajaban personas con condiciones distintas por la misma tarea.",
        verdict: "riesgosa",
      },
    ],
    concept: "Formalidad laboral en campaña",
    lesson:
      "En agroexportación la formalidad laboral también es requisito comercial: los compradores auditan condiciones de trabajo. Lo que se ahorra en planilla se puede perder en sanciones, paralizaciones y contratos.",
    basedOn: "Paro agrario de diciembre de 2020 en Ica y La Libertad",
  },
  {
    id: "ind-agroexport-ventana-comercial",
    title: "Tu arándano sale cuando todos exportan",
    category: "estrategia",
    industries: ["agroexport"],
    market: "B2B",
    tier: 1,
    situation:
      "Tu arándano se cosecha entre septiembre y octubre, justo cuando casi todo el Perú exporta y el precio llega a su punto más bajo. Un vivero te ofrece variedades tempranas que producen en julio y agosto, cuando hay poca oferta. El recambio deja parte del campo sin producir por más de un año y obliga a pagar regalías por la genética.",
    options: [
      {
        id: "a",
        label: "Recambiar un tercio del campo por etapas",
        detail: "Renuevas primero los lotes más antiguos y mantienes el resto en producción.",
        effects: { cashPct: -6, demandPct: -3, quality: 5, rounds: 2 },
        outcome:
          "Vendiste menos volumen un tiempo. Al entrar en producción, los lotes nuevos salieron en semanas de precio alto y con fruta de mejor calibre.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Recambiar todo el campo de una sola vez",
        detail: "Arrancas todas las plantas actuales para instalar las variedades nuevas.",
        effects: { cashPct: -15, demandPct: -20, quality: 6, rounds: 4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -6 },
          text: "Sin ventas durante el recambio, la caja no alcanzó y tuviste que refinanciar tus préstamos con tasas más altas.",
        },
        outcome:
          "Apostaste todo a la nueva ventana. Pasaste más de un año casi sin ingresos mientras las plantas crecían.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Mantener la variedad y bajar costos por volumen",
        detail: "Sigues en las semanas de mayor oferta y buscas ser más eficiente por kilo.",
        effects: { costPct: -2, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -5 },
          text: "La oferta peruana volvió a crecer y el precio de tus semanas cayó por debajo de tu costo.",
        },
        outcome:
          "Evitaste la inversión. Seguiste vendiendo en las semanas en que el comprador tiene más proveedores para elegir.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Cerrar programas a precio fijo con supermercados",
        detail: "Cambias la venta en consignación por contratos con precio y volumen pactados antes de la campaña.",
        effects: { cashPct: 2, satisfaction: 2 },
        outcome:
          "Tu precio promedio fue más estable que el del mercado libre. El supermercado exigió calibres y fechas estrictas que te obligaron a ordenar la cosecha.",
        verdict: "buena",
      },
    ],
    concept: "Ventana comercial",
    lesson:
      "En productos frescos el precio depende de cuándo llegas, no solo de qué vendes. Mover la cosecha hacia semanas de poca oferta puede valer más que producir más kilos.",
  },

  // ───────────── EDUCACIÓN (B2C) ─────────────
  {
    id: "ind-educacion-desercion-primer-ciclo",
    title: "Un tercio del primer ciclo no vuelve",
    category: "clientes",
    industries: ["educacion"],
    market: "B2C",
    tier: 1,
    situation:
      "En tu instituto de Huancayo, uno de cada tres alumnos de primer ciclo no se matricula en el segundo. Las encuestas muestran que la mayoría trabaja, llega cansada y desaprueba los cursos de Matemática y Comunicación. El área de admisión propone compensar con una campaña más grande el próximo semestre.",
    options: [
      {
        id: "a",
        label: "Aumentar la campaña de admisión",
        detail: "Captas más ingresantes para reemplazar a los que se retiran.",
        effects: { cashPct: -4, demandPct: 5, rounds: 2 },
        outcome:
          "Ingresaron más alumnos y se retiró la misma proporción. Los ciclos superiores siguieron con aulas a medio llenar, que son las que pagan los costos fijos.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Nivelación, tutoría y alerta temprana",
        detail: "Refuerzas los cursos básicos y sigues asistencia y notas para intervenir antes del retiro.",
        effects: { cashPct: -3, demandPct: 4, satisfaction: 6, quality: 3, rounds: 3 },
        outcome:
          "Los tutores contactaron a los alumnos a la segunda falta. La matrícula del segundo ciclo subió y los ingresos de cada promoción se extendieron por más semestres.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Bajar la exigencia para que aprueben más",
        detail: "Pides a los docentes flexibilizar las evaluaciones del primer ciclo.",
        effects: { demandPct: 3, quality: -8, reputation: -4, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { brand: -6, demandPct: -5, rounds: 2 },
          text: "Las empresas que recibían practicantes notaron la caída de nivel y dejaron de pedir alumnos de tu instituto.",
        },
        outcome:
          "Más alumnos pasaron de ciclo. Los docentes se sintieron desautorizados y el problema de base apareció en los cursos de carrera.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Abrir un turno noche con horarios compactos",
        detail: "Adaptas los horarios del primer ciclo a los alumnos que trabajan.",
        effects: { fixedCostPct: 3, demandPct: 3, satisfaction: 4, rounds: 3 },
        outcome:
          "Los alumnos que trabajan faltaron menos. Subieron los gastos de docentes y servicios por el nuevo turno, y la dificultad con los cursos básicos siguió presente.",
        verdict: "buena",
      },
    ],
    concept: "Retención de estudiantes",
    lesson:
      "Un alumno vale por todos los ciclos que cursa, no por su primera matrícula. Retener cuesta menos que captar y llena las aulas de los ciclos superiores.",
  },
  {
    id: "ind-educacion-morosidad-pensiones",
    title: "Pensiones atrasadas en semana de exámenes",
    category: "legal",
    industries: ["educacion"],
    market: "B2C",
    tier: 1,
    situation:
      "Casi un tercio de tus alumnos debe dos o más pensiones y se acercan los exámenes finales. Tu administrador propone no dejar rendir exámenes a los morosos, como 'se hacía antes'. La caja está ajustada para pagar las gratificaciones de los docentes en planilla.",
    options: [
      {
        id: "a",
        label: "Impedir que los morosos rindan exámenes",
        detail: "Publicas la lista de deudores y condicionas la evaluación al pago.",
        effects: { cashPct: 3, satisfaction: -6, reputation: -4 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -6, reputation: -8, brand: -4 },
          text: "Varios alumnos denunciaron ante Indecopi que se condicionó la evaluación al pago y la institución fue sancionada.",
        },
        outcome:
          "Algunos pagaron por presión. La lista de deudores circuló en redes y el tema dejó de ser una cobranza para volverse un reclamo público.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Convenios de pago y cobranza ordenada",
        detail: "Fraccionas la deuda, das descuento por pago puntual y envías recordatorios con pago por Yape o Plin.",
        effects: { cashPct: 2, satisfaction: 2, reputation: 2 },
        outcome:
          "La mayoría firmó un convenio y pagó al menos una cuota antes de los exámenes. La caja mejoró sin enfrentarte a los alumnos.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Perdonar moras e intereses a todos los deudores",
        detail: "Ofreces borrón y cuenta nueva a quien pague el saldo este mes.",
        effects: { cashPct: 2, satisfaction: 1 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -4 },
          text: "Los alumnos puntuales concluyeron que pagar a tiempo no tenía ventaja y el siguiente ciclo hubo más atrasos.",
        },
        outcome:
          "Entró dinero rápido. La amnistía se volvió una expectativa para cada fin de ciclo.",
        verdict: "riesgosa",
      },
    ],
    concept: "Política de cobranza",
    lesson:
      "Cobrar bien exige reglas conocidas desde la matrícula y facilidades antes de que la deuda crezca. La presión que vulnera derechos del estudiante termina en sanción y daña la marca.",
  },
  {
    id: "ind-educacion-licenciamiento",
    title: "El licenciamiento exige invertir o cerrar",
    category: "estrategia",
    industries: ["educacion"],
    market: "B2C",
    tier: 3,
    situation:
      "Tu instituto debe demostrar condiciones básicas de calidad para obtener su licenciamiento: laboratorios equipados, docentes calificados y sostenibilidad financiera. Cumplir exige una inversión grande este año y tienes siete carreras, dos de ellas con muy pocos alumnos. Un 'tramitador' ofrece conseguirte el expediente aprobado por una suma bastante menor.",
    options: [
      {
        id: "a",
        label: "Contratar al tramitador",
        detail: "Pagas para que el expediente 'salga' sin hacer todas las inversiones.",
        effects: { cashPct: -3, reputation: -5 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -12, reputation: -15, demandPct: -15, rounds: 3 },
          text: "La verificación presencial encontró laboratorios que no existían. Se denegó la licencia y el caso pasó a la fiscalía.",
        },
        outcome:
          "El expediente se presentó con documentos que no reflejaban la realidad del local.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Invertir por etapas y cerrar dos carreras",
        detail: "Concentras recursos en las carreras con demanda y financias la inversión con un préstamo de largo plazo.",
        effects: { cashPct: -10, demandPct: -3, quality: 8, brand: 4, reputation: 5, rounds: 3 },
        outcome:
          "Los alumnos de las carreras cerradas terminaron con un plan de continuidad. Las cinco restantes cumplieron las condiciones y la licencia se volvió tu mejor argumento de admisión.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Invertir en las siete carreras a la vez",
        detail: "Equipas todo para no cerrar ninguna especialidad.",
        effects: { cashPct: -18, quality: 8, brand: 3, rounds: 3 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -6, morale: -4 },
          text: "La deuda superó lo que generan las matrículas y tuviste que retrasar pagos a docentes y proveedores.",
        },
        outcome:
          "Todas las carreras quedaron equipadas, incluidas las que casi no tienen alumnos.",
        verdict: "riesgosa",
      },
    ],
    concept: "Cumplimiento regulatorio como barrera de entrada",
    lesson:
      "Una exigencia regulatoria es un costo y también una barrera que protege a quien la cumple. Obliga a elegir dónde concentrar recursos, porque la calidad no alcanza para todo el portafolio.",
    basedOn: "Procesos de licenciamiento de universidades e institutos en el Perú",
  },
  {
    id: "ind-educacion-ciclo-virtual",
    title: "El competidor vende su ciclo virtual a mitad de precio",
    category: "estrategia",
    industries: ["educacion"],
    market: "B2C",
    tier: 2,
    situation:
      "Tu academia preuniversitaria de Arequipa llena sus aulas solo en el turno mañana. Un competidor de Lima vende su ciclo virtual en todo el sur a mitad de tu precio. Podrías lanzar tu propio ciclo en línea con los mismos profesores, pero temes que tus alumnos presenciales se pasen al plan barato.",
    options: [
      {
        id: "a",
        label: "Lanzar el mismo ciclo en línea a mitad de precio",
        detail: "Transmites las clases presenciales y las vendes también en Arequipa.",
        effects: { cashPct: -3, demandPct: 8, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -5, demandPct: -4 },
          text: "Una parte importante de tus alumnos presenciales se cambió al plan virtual y las aulas quedaron más vacías.",
        },
        outcome:
          "Las inscripciones totales subieron. El ingreso promedio por alumno bajó porque ambos planes ofrecían lo mismo.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Ofertas distintas para públicos distintos",
        detail: "Virtual grabado con simulacros para otras ciudades del sur; presencial con tutoría y seguimiento.",
        effects: { cashPct: -4, demandPct: 7, brand: 3, rounds: 3 },
        outcome:
          "Llegaron alumnos de Puno, Moquegua y Tacna que nunca habrían viajado. Los presenciales se quedaron porque la tutoría y los simulacros en aula justificaban la diferencia.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "No lanzar nada virtual y reforzar lo presencial",
        detail: "Inviertes en mejores aulas y en los resultados de ingreso de tus alumnos.",
        effects: { cashPct: -2, quality: 3, satisfaction: 2 },
        risk: {
          prob: 0.45,
          effects: { demandPct: -6, rounds: 2 },
          text: "El competidor sumó simulacros presenciales en Arequipa y captó a los alumnos más sensibles al precio.",
        },
        outcome:
          "Tu producto presencial mejoró. El mercado fuera de Arequipa quedó para los competidores.",
        verdict: "riesgosa",
      },
    ],
    concept: "Canibalización entre productos",
    lesson:
      "Un producto más barato puede quitarle ventas al producto principal si ofrece lo mismo. Se evita diferenciando con claridad qué incluye cada uno y a qué público se dirige.",
  },
  {
    id: "ind-educacion-docentes-por-horas",
    title: "Docentes con recibo por honorarios y horario fijo",
    category: "laboral",
    industries: ["educacion"],
    market: "B2C",
    tier: 2,
    situation:
      "La mayoría de tus docentes cobra por horas con recibo por honorarios, aunque cumple horario fijo, marca asistencia y recibe órdenes del coordinador académico. Tres de ellos, con más de cuatro años en la institución, piden pasar a planilla. Tu contador advierte que eso sube el costo de personal.",
    options: [
      {
        id: "a",
        label: "Mantener a todos con recibo por honorarios",
        detail: "Les explicas que el presupuesto no permite cambios este año.",
        effects: { morale: -4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -10, reputation: -6, morale: -3 },
          text: "Un docente denunció ante SUNAFIL. Se reconoció la relación laboral y tuviste que pagar beneficios de varios años y una multa.",
        },
        outcome:
          "El costo se mantuvo. Los docentes con más antigüedad empezaron a dictar también en otras instituciones.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Planilla para el núcleo docente, honorarios solo eventuales",
        detail: "Contratas a tiempo parcial o completo a quienes sostienen las carreras y dejas por horas a los especialistas invitados.",
        effects: { fixedCostPct: 5, morale: 6, quality: 4, reputation: 3, rounds: 4 },
        outcome:
          "El costo fijo subió, pero los docentes estables asumieron tutorías y actualización de sílabos. La contingencia laboral desapareció del balance.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "No renovar a los tres docentes que reclaman",
        detail: "Al terminar el ciclo, no vuelves a llamarlos.",
        effects: { morale: -8, quality: -4, satisfaction: -3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -8, reputation: -6 },
          text: "Los tres demandaron el reconocimiento del vínculo laboral y una indemnización, y ganaron.",
        },
        outcome:
          "Los alumnos preguntaron por sus profesores. El resto de docentes entendió que pedir derechos cuesta el puesto.",
        verdict: "mala",
      },
    ],
    concept: "Desnaturalización de contratos",
    lesson:
      "Lo que define una relación laboral son los hechos: horario, subordinación y pago periódico. Llamarla servicio independiente no elimina el costo, solo lo convierte en una deuda oculta.",
  },
  {
    id: "ind-educacion-campana-admision",
    title: "Falta el 40 % de la meta de admisión",
    category: "marketing",
    industries: ["educacion"],
    market: "B2C",
    tier: 1,
    situation:
      "Faltan seis semanas para cerrar la admisión y llevas 60 % de la meta. La agencia propone anuncios con la frase 'empleo garantizado al egresar' y fotos de laboratorios que todavía no has implementado. Tus registros dicen que siete de cada diez egresados trabajan en su carrera al año de terminar.",
    options: [
      {
        id: "a",
        label: "Publicar la campaña de empleo garantizado",
        detail: "Usas la promesa más llamativa y las fotos de referencia.",
        effects: { demandPct: 8, reputation: -4 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -7, reputation: -8, brand: -5 },
          text: "Padres de familia denunciaron publicidad engañosa ante Indecopi al ver que los laboratorios no existían.",
        },
        outcome:
          "Las inscripciones subieron. Los ingresantes llegaron esperando algo que la institución no puede asegurar.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Campaña con cifras reales y testimonios de egresados",
        detail: "Muestras la empleabilidad comprobada y abres clases modelo para postulantes y padres.",
        effects: { cashPct: -2, demandPct: 5, brand: 3, reputation: 2 },
        outcome:
          "No alcanzaste el total de la meta, pero los que se matricularon sabían a qué venían. Ese grupo tuvo menos retiros en el primer ciclo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Media matrícula a quien se inscriba esta semana",
        detail: "Lanzas un descuento fuerte con fecha límite.",
        effects: { cashPct: -4, demandPct: 6, brand: -2 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -4, rounds: 2 },
          text: "Muchos de los que entraron por la oferta se retiraron cuando llegó la primera pensión completa.",
        },
        outcome:
          "La meta de inscritos se cumplió en el papel. Atrajiste a postulantes que decidieron por precio y no por la carrera.",
        verdict: "riesgosa",
      },
    ],
    concept: "Publicidad veraz y promesa de valor",
    lesson:
      "En educación se vende un resultado de largo plazo, y una promesa que no puedes cumplir genera sanciones y deserción. Los datos reales captan menos alumnos, pero alumnos que se quedan.",
  },

  // ───────────── GIMNASIO (B2C) ─────────────
  {
    id: "ind-gimnasio-membresias-anuales",
    title: "La caja llena de enero no es utilidad",
    category: "finanzas",
    industries: ["gimnasio"],
    market: "B2C",
    tier: 2,
    situation:
      "En enero vendiste 600 membresías anuales con 40 % de descuento y la cuenta bancaria nunca estuvo tan llena. Tu socio quiere usar ese dinero para abrir una segunda sede en Los Olivos. Pero ese efectivo corresponde a doce meses de servicio que todavía debes dar, con alquiler, luz y planilla cada mes.",
    options: [
      {
        id: "a",
        label: "Usar toda la caja en la segunda sede",
        detail: "Aprovechas el efectivo disponible para crecer sin deuda.",
        effects: { cashPct: -15, demandPct: 6, brand: 2, rounds: 3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -6, morale: -4 },
          text: "En invierno las ventas nuevas cayeron y no había caja para el alquiler y la planilla: entraste en sobregiro.",
        },
        outcome:
          "La nueva sede abrió. La sede original quedó sin respaldo para atender todo el año a los socios que ya pagaron.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Reservar los costos del año y financiar la sede",
        detail: "Armas un flujo de caja mensual, separas lo comprometido y pides un préstamo de largo plazo para expandirte.",
        effects: { cashPct: -5, demandPct: 4, fixedCostPct: 2, rounds: 3 },
        outcome:
          "La segunda sede abrió unos meses después, con deuda calzada a su plazo de recuperación. La operación actual pasó el invierno sin apuros.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Repartir utilidades entre los socios",
        detail: "Distribuyes parte del efectivo como dividendos por el buen mes.",
        effects: { cashPct: -8 },
        outcome:
          "Repartiste un dinero que todavía no habías ganado. A mitad de año hubo que pedir un préstamo para cubrir gastos corrientes.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Guardar la caja y no expandirse este año",
        detail: "Mantienes el efectivo como reserva y postergas la segunda sede.",
        effects: { reputation: 1 },
        outcome:
          "Operaste el año con tranquilidad. Una cadena tomó el local que habías visto en Los Olivos.",
        verdict: "buena",
      },
    ],
    concept: "Ingresos cobrados por adelantado",
    lesson:
      "Cobrar por adelantado genera caja, pero también una obligación: el servicio que aún debes prestar. El ingreso se gana mes a mes, y esa caja debe cubrir primero los costos de atender lo vendido.",
  },
  {
    id: "ind-gimnasio-enero-aforo",
    title: "Enero: todos quieren inscribirse",
    category: "operaciones",
    industries: ["gimnasio"],
    market: "B2C",
    tier: 1,
    situation:
      "Llega enero y la demanda se dispara. Tu local de Surco atiende con comodidad a 900 socios activos y ya tienes 850. Ventas quiere seguir inscribiendo sin límite 'porque en marzo la mitad deja de venir'. En horas punta ya hay cola para las máquinas de cardio.",
    options: [
      {
        id: "a",
        label: "Inscribir a todos los que lleguen",
        detail: "Aprovechas el mes de mayor demanda sin poner tope.",
        effects: { demandPct: 10, satisfaction: -8, quality: -3, rounds: 2 },
        risk: {
          prob: 0.45,
          effects: { demandPct: -6, brand: -4, rounds: 2 },
          text: "Los socios antiguos, cansados de esperar por las máquinas, no renovaron y dejaron malas reseñas.",
        },
        outcome:
          "Enero fue récord de ventas. De seis a nueve de la noche el local estuvo saturado.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Crear un plan de horario valle y tope en hora punta",
        detail: "Vendes más barato el acceso de 10 a. m. a 5 p. m. y limitas los cupos del plan completo.",
        effects: { demandPct: 5, satisfaction: 3, rounds: 2 },
        outcome:
          "Llenaste las horas en que el local estaba vacío. Los socios de hora punta conservaron su espacio y el ingreso por metro cuadrado mejoró.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Cerrar inscripciones al llegar a 900 socios",
        detail: "Abres lista de espera hasta que se liberen cupos.",
        effects: { satisfaction: 4, brand: 2 },
        outcome:
          "El servicio se mantuvo cómodo y la lista de espera generó expectativa. Dejaste de vender en el mes en que más gente quería comprar.",
        verdict: "buena",
      },
    ],
    concept: "Gestión de la capacidad",
    lesson:
      "La capacidad de un servicio se agota en las horas punta, no en el promedio del día. Los precios por horario trasladan demanda a las horas vacías y permiten vender más sin dañar la experiencia.",
  },
  {
    id: "ind-gimnasio-congelamiento",
    title: "Socios que piden congelar su plan",
    category: "clientes",
    industries: ["gimnasio"],
    market: "B2C",
    tier: 1,
    situation:
      "Muchos socios con plan anual de cobro mensual piden congelar su membresía por viaje, lesión o exámenes. Hoy solo lo permites con certificado médico y las quejas en el libro de reclamaciones se acumulan. Tu administradora teme que, si abres el congelamiento, todos lo usen en invierno y caigan los ingresos.",
    options: [
      {
        id: "a",
        label: "Mantener la regla del certificado médico",
        detail: "Solo se congela por motivos de salud debidamente acreditados.",
        effects: { satisfaction: -5, reputation: -2, demandPct: -3, rounds: 2 },
        outcome:
          "Los ingresos del trimestre no se movieron. Los socios que pagaron meses sin poder asistir no renovaron al terminar su plan.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Congelar hasta 30 días al año con aviso previo",
        detail: "El socio lo solicita por la aplicación, con un mínimo de días y reglas claras desde la inscripción.",
        effects: { cashPct: -1, satisfaction: 5, demandPct: 3, rounds: 3 },
        outcome:
          "El uso fue menor al temido porque la mayoría solo quería saber que la opción existía. Las renovaciones subieron y los reclamos casi desaparecieron.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Congelamiento libre, sin límite ni costo",
        detail: "Cada socio pausa su plan cuando quiera y por el tiempo que quiera.",
        effects: { cashPct: -5, satisfaction: 6, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -4 },
          text: "En invierno una gran parte de los socios pausó su plan al mismo tiempo y los ingresos no cubrieron los gastos fijos.",
        },
        outcome:
          "Los socios quedaron encantados. Tus ingresos mensuales se volvieron difíciles de proyectar.",
        verdict: "riesgosa",
      },
    ],
    concept: "Política de servicio y retención",
    lesson:
      "Una política flexible con límites claros retiene más que una regla rígida. El costo de conceder una pausa suele ser menor que el de perder la renovación de un socio molesto.",
  },
  {
    id: "ind-gimnasio-cadena-bajo-costo",
    title: "Una cadena de bajo costo abre a tres cuadras",
    category: "estrategia",
    industries: ["gimnasio"],
    market: "B2C",
    tier: 3,
    situation:
      "Una cadena internacional de gimnasios de bajo costo abrirá a tres cuadras de tu local de Miraflores, con mensualidad a menos de la mitad de la tuya, un local enorme y horario extendido. Tú ofreces clases grupales, entrenadores en sala y trato personalizado. Tu contrato de alquiler vence en dos años.",
    options: [
      {
        id: "a",
        label: "Bajar tu mensualidad para igualar a la cadena",
        detail: "Compites por precio recortando entrenadores y clases para sostener el margen.",
        effects: { cashPct: -8, demandPct: 3, quality: -5, morale: -4, rounds: 3 },
        outcome:
          "La cadena tiene escala para sostener ese precio y tú no. Quedaste con su tarifa, sin su tamaño y sin el servicio que te distinguía.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Especializarte en entrenamiento guiado",
        detail: "Grupos pequeños, evaluación física, plan nutricional y seguimiento; ajustas tu precio hacia arriba.",
        effects: { cashPct: -4, demandPct: -5, quality: 6, satisfaction: 5, brand: 4, rounds: 3 },
        outcome:
          "Perdiste a los socios que solo querían máquinas baratas. Los que buscaban acompañamiento se quedaron, pagaron más y el ingreso por socio subió.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Mantener todo y duplicar la publicidad",
        detail: "Conservas precio y servicio, y aumentas la pauta en la zona.",
        effects: { cashPct: -4, demandPct: -4, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -8, rounds: 2 },
          text: "La inauguración de la cadena, con matrícula gratis, se llevó a buena parte de tus socios de plan básico.",
        },
        outcome:
          "Tus anuncios decían lo mismo de siempre. El vecino nuevo era más barato, más grande y abría más horas.",
        verdict: "riesgosa",
      },
    ],
    concept: "Diferenciación frente a liderazgo en costos",
    lesson:
      "Contra un competidor con escala no se gana en precio. La salida es ofrecer algo que él no puede dar y dirigirse al cliente que está dispuesto a pagar por ello, aunque eso signifique soltar a otros.",
  },
  {
    id: "ind-gimnasio-entrenadores-clientes",
    title: "Los entrenadores se van con sus alumnos",
    category: "laboral",
    industries: ["gimnasio"],
    market: "B2C",
    tier: 2,
    situation:
      "Tus entrenadores personales cobran directamente a los socios y te pagan un 'derecho de piso'. Tres de los mejores planean irse a un estudio nuevo en San Borja y llevarse a sus alumnos, que suman casi 80 socios. No tienen contrato contigo, y los socios los siguen a ellos, no al gimnasio.",
    options: [
      {
        id: "a",
        label: "Prohibirles el ingreso desde hoy",
        detail: "Los retiras de inmediato para que no sigan captando socios dentro del local.",
        effects: { morale: -6, demandPct: -8, satisfaction: -4, rounds: 2 },
        outcome:
          "Sus alumnos se quedaron sin clase de un día para otro y se fueron con ellos esa misma semana. Los otros entrenadores tomaron nota.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Convertir el entrenamiento personal en servicio propio",
        detail: "Los paquetes se venden en caja, con entrenadores contratados, buena comisión y método del gimnasio.",
        effects: { fixedCostPct: 4, cashPct: 2, morale: 4, satisfaction: 3, demandPct: -2, rounds: 3 },
        outcome:
          "Dos de los tres se fueron, pero los demás firmaron contrato. El entrenamiento personal pasó a ser un ingreso del gimnasio y el socio quedó vinculado al local.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Pagarles un bono para que se queden este año",
        detail: "Ofreces un incentivo en efectivo a los tres a cambio de su palabra.",
        effects: { cashPct: -3, morale: -2 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -7, rounds: 2 },
          text: "Cobraron el bono y a los seis meses se fueron igual, con más alumnos de los que tenían.",
        },
        outcome:
          "Ganaste tiempo. El modelo siguió igual: los alumnos les pagan a ellos y los siguen a ellos.",
        verdict: "riesgosa",
      },
    ],
    concept: "Modelo de negocio y relación con el cliente",
    lesson:
      "Si el cliente le paga a la persona y no a la empresa, el cliente es de la persona. El diseño del servicio y del cobro determina a quién pertenece la relación.",
  },
  {
    id: "ind-gimnasio-baja-dificil",
    title: "Darse de baja es casi imposible",
    category: "etica",
    industries: ["gimnasio"],
    market: "B2C",
    tier: 1,
    situation:
      "Tu gimnasio cobra la mensualidad con cargo automático a la tarjeta. Para darse de baja, el socio debe ir en persona, en horario de oficina, y firmar un formulario con 30 días de anticipación. Así 'retienes' a muchos que ya no asisten, pero las quejas en redes y en el libro de reclamaciones van en aumento.",
    options: [
      {
        id: "a",
        label: "Mantener el trámite presencial",
        detail: "Conservas las trabas porque sostienen los ingresos mensuales.",
        effects: { cashPct: 3, satisfaction: -6, brand: -4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -6, reputation: -8 },
          text: "Indecopi sancionó al gimnasio por poner trabas a la cancelación y ordenó devolver los cobros posteriores a los pedidos de baja.",
        },
        outcome:
          "Seguiste cobrando a socios que ya no querían el servicio. Varios desconocieron los cargos ante su banco.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Baja en línea, con oferta de pausa antes de confirmar",
        detail: "El socio cancela en dos pasos y antes se le ofrece pausar o pasar a un plan menor.",
        effects: { cashPct: -2, satisfaction: 6, brand: 3, reputation: 4 },
        outcome:
          "Las bajas subieron el primer mes y luego se estabilizaron. Uno de cada cuatro eligió pausar, y varios ex socios volvieron meses después.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Aceptar la baja por correo con 30 días de aviso",
        detail: "Eliminas la visita presencial, pero mantienes el mes de anticipación.",
        effects: { cashPct: -1, satisfaction: 2, reputation: 1 },
        outcome:
          "Los reclamos bajaron, aunque el último cobro después del aviso siguió generando discusiones en recepción.",
        verdict: "buena",
      },
    ],
    concept: "Cobro recurrente y protección al consumidor",
    lesson:
      "Retener con trabas no es fidelizar. Los ingresos de quienes quieren irse son frágiles y costosos en reputación; salir debe ser tan sencillo como entrar.",
  },

  // ───────────── TURISMO (B2C) ─────────────
  {
    id: "ind-turismo-entradas-machu-picchu",
    title: "Vender el paquete sin tener las entradas",
    category: "operaciones",
    industries: ["turismo"],
    market: "B2C",
    tier: 1,
    situation:
      "Un grupo de 40 turistas mexicanos quiere viajar a Cusco en julio y te pide confirmar hoy el paquete con ingreso a Machu Picchu. Los boletos para esas fechas están casi agotados y tienen horario y circuito definidos. Un 'contacto' te asegura que conseguirá entradas a última hora.",
    options: [
      {
        id: "a",
        label: "Confirmar y cobrar, confiando en el contacto",
        detail: "Cierras la venta hoy y resuelves las entradas después.",
        effects: { cashPct: 6 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -10, satisfaction: -10, reputation: -8 },
          text: "El contacto no consiguió los boletos. El grupo llegó a Cusco sin ingreso y tuviste que devolver el dinero y compensar.",
        },
        outcome:
          "Cobraste el adelanto de inmediato. Vendiste algo que todavía no tenías en tu poder.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Comprar primero los boletos disponibles y luego vender",
        detail: "Aseguras las entradas que hay, en el horario y circuito que quedan, e informas eso al grupo.",
        effects: { cashPct: 4, satisfaction: 3, reputation: 2 },
        outcome:
          "El grupo aceptó el horario disponible porque supo desde el inicio qué circuito haría. El viaje salió sin sobresaltos.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Proponer fechas de agosto con boletos asegurados",
        detail: "Ofreces mover el viaje a semanas con más disponibilidad.",
        effects: { cashPct: 2, satisfaction: 1 },
        risk: {
          prob: 0.35,
          effects: { demandPct: -3 },
          text: "El grupo no podía cambiar sus vacaciones y contrató con otra agencia.",
        },
        outcome:
          "Fuiste claro sobre lo que podías cumplir. La decisión quedó en manos del cliente.",
        verdict: "buena",
      },
    ],
    concept: "Inventario escaso y promesa de venta",
    lesson:
      "Cuando el insumo clave tiene cupos limitados, primero se asegura el inventario y después se vende. Prometer lo que depende de un favor convierte una venta en una deuda.",
  },
  {
    id: "ind-turismo-bloqueos-cusco",
    title: "Pasajeros varados por un paro regional",
    category: "entorno",
    industries: ["turismo"],
    market: "B2C",
    tier: 2,
    situation:
      "Un paro regional bloquea las carreteras y la vía férrea hacia Machu Picchu. Tienes 25 pasajeros varados en Aguas Calientes y otros 60 con viajes pagados para las próximas dos semanas. Hoteles y trenes ya te cobraron varias reservas. Los clientes escriben a toda hora pidiendo soluciones.",
    options: [
      {
        id: "a",
        label: "Asumir todos los gastos y devolver a quien lo pida",
        detail: "Pagas alojamiento y comida de los varados y reembolsas completo a los próximos viajeros.",
        effects: { cashPct: -8, satisfaction: 6, brand: 4, reputation: 4 },
        outcome:
          "Los clientes quedaron agradecidos y lo contaron en sus reseñas. La caja de la agencia quedó muy comprometida para el resto de la temporada.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Alegar fuerza mayor y no hacerse cargo",
        detail: "Comunicas que el paro no es responsabilidad de la agencia y que no hay reembolsos.",
        effects: { satisfaction: -10, brand: -6, reputation: -5 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -6, reputation: -5 },
          text: "Varios pasajeros reclamaron ante Indecopi y en plataformas de viajes, y se ordenaron devoluciones.",
        },
        outcome:
          "Los varados resolvieron por su cuenta. Las reseñas negativas aparecieron en varios idiomas.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Asistir a los varados y dar opciones a los demás",
        detail: "Atiendes a quienes están en ruta y ofreces reprogramar sin penalidad, cambiar de destino o un vale; negocias créditos con proveedores.",
        effects: { cashPct: -4, satisfaction: 5, reputation: 3, brand: 2 },
        outcome:
          "La mayoría eligió reprogramar o cambiar a Arequipa y Paracas. Hoteles y tren reconocieron créditos para nuevas fechas y la pérdida fue manejable.",
        verdict: "optima",
      },
    ],
    concept: "Plan de contingencia",
    lesson:
      "En una crisis, el cliente recuerda cómo lo trataste. Tener opciones preparadas y acuerdos con proveedores permite cuidar al pasajero sin que la empresa cargue sola con toda la pérdida.",
    basedOn: "Bloqueos y protestas en el sur del Perú a inicios de 2023",
  },
  {
    id: "ind-turismo-temporada-baja",
    title: "Tres meses de lluvia y oficina vacía",
    category: "estrategia",
    industries: ["turismo"],
    market: "B2C",
    tier: 1,
    situation:
      "De enero a marzo llueve en Cusco, el Camino Inca cierra en febrero por mantenimiento y tus ventas caen a la tercera parte. Igual pagas oficina, guías de planta y movilidades. Un socio propone cesar a todos en enero y volver a contratarlos en abril.",
    options: [
      {
        id: "a",
        label: "Cesar al personal y recontratar en abril",
        detail: "Reduces la planilla al mínimo durante los meses de lluvia.",
        effects: { cashPct: -2, fixedCostPct: -8, morale: -8, rounds: 2 },
        risk: {
          prob: 0.45,
          effects: { quality: -6, satisfaction: -4, rounds: 2 },
          text: "Tus mejores guías consiguieron trabajo estable en otra operadora y en abril tuviste que salir con personal nuevo.",
        },
        outcome:
          "El gasto bajó en el trimestre, después de pagar liquidaciones. La relación con el equipo quedó resentida.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Crear productos para la temporada baja",
        detail: "Turismo nacional en soles, viajes corporativos y escolares, y rutas a destinos sin lluvia; el equipo toma vacaciones y se capacita.",
        effects: { cashPct: -2, demandPct: 6, morale: 3, rounds: 2 },
        outcome:
          "Las ventas no igualaron a la temporada alta, pero cubrieron buena parte de los costos fijos. El equipo llegó a abril descansado y con nuevas rutas aprendidas.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rematar los mismos tours a mitad de precio",
        detail: "Mantienes la oferta de temporada alta con un descuento fuerte.",
        effects: { cashPct: -3, demandPct: 3, brand: -3, rounds: 2 },
        outcome:
          "Llegaron algunos viajeros, pero la lluvia canceló varias salidas. En temporada alta, los clientes preguntaron por el precio de febrero.",
        verdict: "mala",
      },
    ],
    concept: "Estacionalidad de la demanda",
    lesson:
      "Los costos fijos no descansan en temporada baja. La estacionalidad se maneja con productos y públicos distintos para esos meses, no vendiendo lo mismo más barato.",
  },
  {
    id: "ind-turismo-agencias-informales",
    title: "Los jaladores venden el tour a mitad de precio",
    category: "marketing",
    industries: ["turismo"],
    market: "B2C",
    tier: 1,
    situation:
      "En la Plaza de Armas de Cusco, jaladores de agencias sin autorización venden el tour al Valle Sagrado a casi la mitad de tu precio, sin seguro ni guía oficial. Tus vendedores te presionan para igualar el precio recortando 'lo que el turista no ve': el seguro, el guía con carné y el mantenimiento de la movilidad.",
    options: [
      {
        id: "a",
        label: "Igualar el precio recortando seguro y guía oficial",
        detail: "Reduces costos donde el cliente no lo nota al comprar.",
        effects: { costPct: -8, demandPct: 5, quality: -6, rounds: 2 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -15, reputation: -12, brand: -8 },
          text: "Una movilidad sin mantenimiento tuvo un accidente en ruta. Sin seguro, la agencia respondió con su patrimonio.",
        },
        outcome:
          "Vendiste más en la plaza. Tu servicio pasó a ser igual al de los informales, con la diferencia de que tú sí tienes un local y un nombre que perder.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Mostrar lo que incluyes y vender antes del viaje",
        detail: "Destacas autorización, seguro, guía oficial y reseñas, y te enfocas en web, hoteles y plataformas de reserva.",
        effects: { cashPct: -2, demandPct: 4, brand: 4, rounds: 3 },
        outcome:
          "Dejaste de pelear al turista en la plaza. Quienes reservan desde su país comparan reseñas y garantías, y ahí el precio pesó menos.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Denunciar a los informales y esperar resultados",
        detail: "Presentas la queja ante la autoridad de turismo y la municipalidad junto con otras agencias formales.",
        effects: { reputation: 2 },
        outcome:
          "Hubo un operativo y los jaladores desaparecieron dos semanas. Luego volvieron, y tu propuesta comercial seguía siendo la misma.",
        verdict: "buena",
      },
    ],
    concept: "Competencia informal y propuesta de valor",
    lesson:
      "Contra el informal no se compite en precio, porque su costo no incluye lo que tú sí pagas. Se compite haciendo visible lo que el cliente recibe y eligiendo el canal donde eso se valora.",
  },
  {
    id: "ind-turismo-cancelaciones-reembolsos",
    title: "Cancelan a diez días del viaje",
    category: "clientes",
    industries: ["turismo"],
    market: "B2C",
    tier: 2,
    situation:
      "Vendes paquetes con 50 % de adelanto y no tienes una política de cancelación escrita. Una familia de Bogotá cancela a diez días del viaje por una enfermedad y pide todo su dinero. Ya pagaste boletos de tren y entradas no reembolsables a su nombre. Cada caso se resuelve 'según el cliente' y tus vendedores prometen cosas distintas.",
    options: [
      {
        id: "a",
        label: "Devolver todo el adelanto",
        detail: "Asumes los boletos y entradas perdidos para cuidar la relación.",
        effects: { cashPct: -3, satisfaction: 5, brand: 2 },
        outcome:
          "La familia agradeció y prometió volver. Tus vendedores tomaron el caso como regla y empezaron a ofrecer devolución total a todos.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "No devolver nada",
        detail: "Retienes el adelanto completo porque la cancelación no fue culpa tuya.",
        effects: { cashPct: 2, satisfaction: -8, reputation: -5 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, brand: -5 },
          text: "La familia reclamó formalmente y publicó el caso: no pudiste mostrar ninguna condición firmada que respaldara la retención.",
        },
        outcome:
          "Conservaste el dinero. Retuviste incluso la parte que todavía no habías gastado en proveedores.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Devolver lo recuperable y fijar una política escrita",
        detail: "Sustentas lo no reembolsable, ofreces reprogramar y publicas una escala de devolución según la anticipación.",
        effects: { cashPct: -1, satisfaction: 3, reputation: 3, quality: 2 },
        outcome:
          "La familia aceptó reprogramar para fin de año al ver los comprobantes. Desde entonces todos los clientes firman las mismas condiciones y se les ofrece seguro de viaje.",
        verdict: "optima",
      },
    ],
    concept: "Política de cancelación",
    lesson:
      "Una política de cancelación clara y aceptada antes de la compra protege a ambas partes. Sin ella, cada caso se negocia desde cero y la empresa pierde dinero o pierde al cliente.",
  },
  {
    id: "ind-turismo-tarifas-fijas-dolares",
    title: "Un mayorista europeo pide tarifas fijas por un año",
    category: "finanzas",
    industries: ["turismo"],
    market: "B2C",
    tier: 3,
    situation:
      "Una operadora mayorista de Alemania quiere enviarte 1,200 pasajeros el próximo año, con tarifas en dólares fijadas hoy y sin posibilidad de ajuste. Tus hoteles, guías y transporte cobran en soles y suelen subir precios en temporada alta. Si el dólar cae o tus proveedores suben, el margen del contrato puede desaparecer.",
    options: [
      {
        id: "a",
        label: "Firmar el contrato tal como está",
        detail: "Aseguras el volumen del año aceptando las condiciones del mayorista.",
        effects: { demandPct: 12, rounds: 4 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -8 },
          text: "El dólar bajó y los hoteles subieron tarifas en julio: atendiste a cientos de pasajeros casi al costo.",
        },
        outcome:
          "Llenaste tu calendario del año. Todo el riesgo de costos y de tipo de cambio quedó de tu lado.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Firmar con cláusula de revisión y cerrar proveedores",
        detail: "Pactas un ajuste si el tipo de cambio o las tarifas oficiales varían más de un margen, y fijas precios anuales con hoteles.",
        effects: { demandPct: 10, cashPct: -1, rounds: 4 },
        outcome:
          "El mayorista aceptó una banda de ajuste razonable. Con tarifas anuales firmadas con tus proveedores clave, el margen se mantuvo durante toda la temporada.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Firmar y cubrir el tipo de cambio con un forward",
        detail: "Aceptas la tarifa fija y fijas con tu banco el tipo de cambio de los cobros previstos.",
        effects: { demandPct: 12, cashPct: -2, rounds: 4 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -4 },
          text: "Los proveedores subieron precios en temporada alta y esa parte del riesgo no estaba cubierta.",
        },
        outcome:
          "El tipo de cambio dejó de preocuparte. Los precios de hoteles y transporte siguieron abiertos.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Exigir que el contrato sea en soles",
        detail: "Trasladas todo el riesgo cambiario al mayorista.",
        effects: {},
        risk: {
          prob: 0.6,
          effects: { demandPct: -4, rounds: 2 },
          text: "El mayorista, que cotiza a sus clientes en moneda fuerte, eligió a otra operadora local.",
        },
        outcome:
          "Planteaste una condición poco habitual en el turismo receptivo. La negociación se enfrió.",
        verdict: "riesgosa",
      },
    ],
    concept: "Exposición cambiaria en contratos",
    lesson:
      "Un contrato a precio fijo en otra moneda tiene dos riesgos: el tipo de cambio y tus costos. Se gestionan con cláusulas de ajuste, acuerdos con proveedores y coberturas, antes de firmar.",
  },

  // ───────────── LOGÍSTICA Y COURIER (B2B) ─────────────
  {
    id: "ind-logistica-alza-combustible",
    title: "El diésel sube y tus tarifas están fijas",
    category: "proveedores",
    industries: ["logistica"],
    market: "B2B",
    tier: 2,
    situation:
      "El diésel subió fuerte en dos meses y representa casi un tercio de tu costo por ruta. Tus contratos anuales con tres distribuidoras de consumo masivo fijan una tarifa por viaje en las rutas a Huancayo y Trujillo, sin cláusula de ajuste. Dos de ellas renuevan contrato el próximo trimestre.",
    options: [
      {
        id: "a",
        label: "Absorber el alza hasta la renovación",
        detail: "Cumples los contratos como están y esperas la fecha de renegociación.",
        effects: { costPct: 8, rounds: 2 },
        outcome:
          "Cumpliste sin fricciones, pero varias rutas operaron a pérdida durante meses. Llegaste a la renovación con la caja debilitada.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Negociar una cláusula de ajuste por combustible",
        detail: "Presentas tu estructura de costos y propones una fórmula atada a un precio de referencia público.",
        effects: { costPct: 3, satisfaction: -2, productivityPct: 2, rounds: 2 },
        outcome:
          "Dos clientes aceptaron la fórmula, que sube y baja con el combustible. Además capacitaste a los conductores en manejo eficiente y el consumo por kilómetro se redujo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Subir la tarifa 15 % de forma unilateral",
        detail: "Comunicas el nuevo precio desde el próximo mes, con o sin acuerdo.",
        effects: { cashPct: 3, satisfaction: -6 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -10, reputation: -3, rounds: 2 },
          text: "Una distribuidora invocó el contrato, se negó a pagar el alza y trasladó sus rutas a otro operador.",
        },
        outcome:
          "Recuperaste margen en los clientes que aceptaron. Rompiste un precio pactado por escrito.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Comprar combustible más barato sin comprobante",
        detail: "Un proveedor informal te ofrece diésel de origen dudoso a menor precio.",
        effects: { costPct: -5, reputation: -4 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -9, reputation: -8, productivityPct: -5 },
          text: "El combustible adulterado dañó los inyectores de cuatro camiones y SUNAT observó gastos sin sustento.",
        },
        outcome:
          "El costo por ruta bajó en el papel. Sin factura no hubo crédito fiscal ni gasto deducible.",
        verdict: "mala",
      },
    ],
    concept: "Cláusula de ajuste de precios",
    lesson:
      "Un contrato largo a precio fijo traslada al proveedor todo el riesgo de sus insumos. Cuando un costo es grande y volátil, conviene pactar una fórmula de ajuste transparente para ambas partes.",
  },
  {
    id: "ind-logistica-campana-pico",
    title: "Cyber Wow y Navidad: el triple de paquetes",
    category: "operaciones",
    industries: ["logistica"],
    market: "B2B",
    tier: 1,
    situation:
      "Se viene el Cyber Wow y luego Navidad. Tus clientes de comercio electrónico proyectan triplicar sus envíos durante tres semanas. Tu almacén de Lurín y tus 30 motorizados operan hoy al 85 % de su capacidad. El año pasado aceptaste todo y entregaste con hasta diez días de retraso.",
    options: [
      {
        id: "a",
        label: "Aceptar todo el volumen otra vez",
        detail: "Recibes cada paquete que llegue y resuelves sobre la marcha.",
        effects: { demandPct: 12, satisfaction: -10, brand: -6, morale: -5 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -10, rounds: 3 },
          text: "Dos tiendas en línea, tras recibir reclamos de sus compradores, cambiaron de operador logístico en enero.",
        },
        outcome:
          "Facturaste mucho en tres semanas. El almacén colapsó y hubo regalos de Navidad entregados en enero.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Pactar cupos y reforzar la operación con tiempo",
        detail: "Acuerdas volúmenes por cliente, tarifa de campaña, turnos extra y repartidores temporales capacitados.",
        effects: { cashPct: -3, demandPct: 8, satisfaction: 3, rounds: 1 },
        outcome:
          "Los clientes planificaron sus promesas de entrega según el cupo acordado. Atendiste más del doble de lo normal con retrasos mínimos.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Limitar el volumen al de un mes normal",
        detail: "Aceptas solo lo que tu capacidad actual atiende sin riesgo.",
        effects: { satisfaction: 2 },
        risk: {
          prob: 0.35,
          effects: { demandPct: -4, rounds: 2 },
          text: "Un cliente grande necesitaba un solo operador para toda su campaña y se llevó su cuenta completa.",
        },
        outcome:
          "Entregaste todo a tiempo. Tus clientes repartieron el excedente entre tus competidores.",
        verdict: "buena",
      },
    ],
    concept: "Planeamiento de capacidad en picos",
    lesson:
      "La capacidad para un pico se planifica semanas antes, no el día del pico. Aceptar más de lo que puedes cumplir cuesta clientes, y un cupo pactado protege el nivel de servicio.",
  },
  {
    id: "ind-logistica-robos-en-ruta",
    title: "Tercer asalto a un camión en seis meses",
    category: "operaciones",
    industries: ["logistica"],
    market: "B2B",
    tier: 2,
    situation:
      "En seis meses asaltaron tres de tus camiones con electrodomésticos en la Panamericana Norte y en los accesos al Callao. Tu póliza de carga subirá de precio y el contrato te hace responsable de la mercadería. Un cliente amenaza con irse si hay otro robo.",
    options: [
      {
        id: "a",
        label: "Ampliar la cobertura del seguro y nada más",
        detail: "Pagas una prima mayor para que la aseguradora cubra más monto por siniestro.",
        effects: { fixedCostPct: 3, rounds: 3 },
        risk: {
          prob: 0.45,
          effects: { satisfaction: -6, demandPct: -5, rounds: 2 },
          text: "Hubo un cuarto asalto. El seguro pagó, pero el cliente se quedó sin mercadería para su campaña y cambió de operador.",
        },
        outcome:
          "Quedaste cubierto en lo financiero. La probabilidad de un nuevo asalto siguió igual.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Plan de seguridad completo, además del seguro",
        detail: "Monitoreo satelital, rutas y horarios variables, convoyes en tramos críticos, precintos y verificación del personal.",
        effects: { cashPct: -3, fixedCostPct: 4, quality: 5, satisfaction: 4, rounds: 3 },
        outcome:
          "No hubo más asaltos en el semestre y la aseguradora mejoró las condiciones de la póliza. Usaste el protocolo como argumento para ganar carga de mayor valor.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Cancelar la póliza y asumir el riesgo",
        detail: "Dejas de pagar un seguro que consideras demasiado caro.",
        effects: { fixedCostPct: -3, rounds: 3 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -15, reputation: -5 },
          text: "Un nuevo robo te obligó a pagar de tu caja el valor completo de un camión cargado de televisores.",
        },
        outcome:
          "Ahorraste la prima. Cada viaje pasó a poner en juego una suma que tu empresa no puede reponer.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Dejar de transportar carga de alto valor",
        detail: "Te concentras en mercadería menos atractiva para los asaltantes.",
        effects: { demandPct: -6, fixedCostPct: -1, rounds: 3 },
        outcome:
          "Los asaltos cesaron porque la carga dejó de interesar. También renunciaste a las rutas con mejor tarifa.",
        verdict: "buena",
      },
    ],
    concept: "Mitigar y transferir el riesgo",
    lesson:
      "El seguro transfiere la pérdida económica, pero no evita el siniestro ni la falla ante el cliente. La gestión de riesgos combina prevención para bajar la probabilidad y seguro para cubrir el impacto.",
  },
  {
    id: "ind-logistica-ultima-milla",
    title: "Uno de cada cinco paquetes no se entrega",
    category: "operaciones",
    industries: ["logistica"],
    market: "B2B",
    tier: 1,
    situation:
      "Uno de cada cinco paquetes que repartes en Lima no se entrega en la primera visita: nadie en casa, dirección incompleta o el destinatario no contesta. Cada segunda visita cuesta casi lo mismo que la primera y tu tarifa por paquete es fija. Los repartidores cobran por paquete entregado y están molestos.",
    options: [
      {
        id: "a",
        label: "Cobrar a la tienda cada segunda visita",
        detail: "Agregas un cargo por reintento a la tarifa de tus clientes.",
        effects: { cashPct: 2, satisfaction: -4 },
        outcome:
          "Recuperaste parte del costo. Las tiendas aceptaron a regañadientes y empezaron a pedir cotizaciones a otros operadores.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Confirmar antes de salir y abrir puntos de recojo",
        detail: "Validas direcciones, avisas por WhatsApp el rango horario y ofreces recojo en bodegas aliadas.",
        effects: { cashPct: -2, costPct: -5, satisfaction: 5, morale: 3, rounds: 3 },
        outcome:
          "Las entregas fallidas bajaron a menos de la mitad. Cada repartidor completó más entregas por ruta y el costo por paquete disminuyó.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Descontar al repartidor cada entrega fallida",
        detail: "Trasladas el costo del reintento a quien hace la ruta.",
        effects: { costPct: -2, morale: -8 },
        risk: {
          prob: 0.45,
          effects: { satisfaction: -8, reputation: -4, demandPct: -4 },
          text: "Para evitar el descuento, varios repartidores marcaron como entregados paquetes que dejaron con terceros.",
        },
        outcome:
          "El indicador de entregas mejoró en el sistema. Los reclamos por paquetes 'entregados' que nunca llegaron aumentaron.",
        verdict: "mala",
      },
    ],
    concept: "Costo por entrega efectiva",
    lesson:
      "En la última milla el costo real es por entrega lograda, no por visita. Atacar la causa de los intentos fallidos mejora a la vez el costo, el servicio y el ingreso del repartidor.",
  },
  {
    id: "ind-logistica-flota-propia-o-tercera",
    title: "Crecer con camiones propios o con terceros",
    category: "finanzas",
    industries: ["logistica"],
    market: "B2B",
    tier: 3,
    situation:
      "Tu volumen creció 40 % y debes decidir cómo ampliar capacidad: comprar diez camiones con leasing o contratar transportistas terceros por viaje. Con flota propia el costo por viaje es menor si los camiones salen llenos todo el año, pero tu demanda baja mucho entre febrero y abril.",
    options: [
      {
        id: "a",
        label: "Tomar en leasing los diez camiones",
        detail: "Cubres toda la demanda pico con flota propia y conductores en planilla.",
        effects: { fixedCostPct: 10, costPct: -6, quality: 3, rounds: 4 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -7 },
          text: "En los meses bajos la mitad de la flota quedó parada mientras las cuotas del leasing y los sueldos seguían corriendo.",
        },
        outcome:
          "En campaña tu costo por viaje fue el más bajo del mercado. Tu punto de equilibrio subió y ahora necesitas mucho más volumen para no perder.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Flota propia para la base y terceros para los picos",
        detail: "Compras cuatro camiones para la demanda estable y homologas transportistas para el resto.",
        effects: { fixedCostPct: 4, costPct: -2, quality: 1, rounds: 4 },
        outcome:
          "Los camiones propios trabajaron llenos todo el año. En campaña pagaste más por viaje a terceros, pero en los meses bajos no cargaste con activos parados.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Tercerizar todo el crecimiento",
        detail: "No inviertes en activos y contratas cada viaje adicional en el mercado.",
        effects: { costPct: 5, quality: -3, rounds: 4 },
        risk: {
          prob: 0.35,
          effects: { satisfaction: -5, demandPct: -4 },
          text: "En plena campaña no había camiones disponibles a ningún precio y dejaste carga sin mover.",
        },
        outcome:
          "Tu costo se volvió completamente variable. El margen por viaje es menor y el control sobre el servicio, también.",
        verdict: "buena",
      },
    ],
    concept: "Apalancamiento operativo",
    lesson:
      "Los costos fijos abaratan cada unidad cuando hay volumen y pesan cuando no lo hay. La capacidad propia se dimensiona para la demanda segura y la variable se cubre con terceros.",
  },
  {
    id: "ind-logistica-restriccion-camiones",
    title: "Restringen el ingreso de camiones en hora punta",
    category: "entorno",
    industries: ["logistica"],
    market: "B2B",
    tier: 2,
    situation:
      "La municipalidad amplió la restricción de circulación de camiones en horas punta en varias vías de Lima. Tus unidades que abastecen tiendas en el centro y en Gamarra ya no pueden entrar en su horario habitual, y cada papeleta es costosa. Tus clientes quieren seguir recibiendo a las nueve de la mañana.",
    options: [
      {
        id: "a",
        label: "Mantener el horario y asumir las papeletas",
        detail: "Sigues entrando a la hora de siempre y tratas las multas como un costo más.",
        effects: { satisfaction: 1 },
        risk: {
          prob: 0.7,
          effects: { cashPct: -6, reputation: -3 },
          text: "Las cámaras registraron cada ingreso. Las papeletas acumuladas superaron la utilidad de esas rutas y hubo unidades retenidas.",
        },
        outcome:
          "Los clientes recibieron a su hora. Tu operación pasó a depender de que nadie fiscalizara.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Pasar a reparto nocturno acordado con los clientes",
        detail: "Entregas de madrugada con camiones y coordinas quién recibe en cada tienda.",
        effects: { costPct: 3, productivityPct: 6, satisfaction: 2, rounds: 3 },
        outcome:
          "Sin tráfico, cada camión hizo más entregas por turno. Pagaste recargo nocturno al personal y algunos clientes tuvieron que organizar la recepción.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Repartir de día con furgonetas ligeras",
        detail: "Trasbordas la carga en tu almacén a vehículos pequeños que sí pueden circular.",
        effects: { costPct: 6, satisfaction: 1, rounds: 3 },
        outcome:
          "Mantuviste el horario de las nueve. Necesitaste más vehículos, más conductores y una manipulación adicional de la carga.",
        verdict: "buena",
      },
    ],
    concept: "Adaptación de la operación a la regulación",
    lesson:
      "Una norma nueva cambia los costos de todos los competidores por igual. Gana quien rediseña su operación primero, no quien trata la multa como parte del precio.",
  },

  // ───────────── LIMPIEZA Y MANTENIMIENTO (B2B) ─────────────
  {
    id: "ind-limpieza-oferta-al-limite",
    title: "Ganar la licitación con 2 % de margen",
    category: "estrategia",
    industries: ["limpieza"],
    market: "B2B",
    tier: 2,
    situation:
      "Un hospital público de Chiclayo convoca el servicio de limpieza por 24 meses. Para ganar, sabes que debes ofertar muy por debajo del valor estimado. A ese precio, tu estructura de costos con sueldos, EsSalud, gratificaciones, CTS, uniformes e insumos deja un margen de 2 %, sin espacio para reemplazos ni imprevistos.",
    options: [
      {
        id: "a",
        label: "Ofertar al precio más bajo posible",
        detail: "Aseguras el contrato y confías en ajustar costos durante la ejecución.",
        effects: { demandPct: 10, costPct: 2, rounds: 4 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -8, morale: -4 },
          text: "Subió la remuneración mínima y aumentaron las ausencias: el contrato empezó a dar pérdida y aún faltaba más de un año.",
        },
        outcome:
          "Ganaste la buena pro. Quedaste atado por dos años a un precio que no admite ningún imprevisto.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Ofertar con costos completos y competir en lo técnico",
        detail: "Presentas un precio sostenible y buscas puntaje con experiencia, certificaciones y mejoras al servicio.",
        effects: { demandPct: 4, reputation: 2, rounds: 3 },
        outcome:
          "No ganaste el hospital, pero con la misma estructura de costos obtuviste dos contratos medianos con margen sano. Todos se ejecutaron sin penalidades.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Ofertar bajo y recortar beneficios a los operarios",
        detail: "Planeas compensar el precio pagando menos de lo que declaraste en tu estructura de costos.",
        effects: { demandPct: 10, costPct: -5, morale: -8, reputation: -5, rounds: 3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -12, reputation: -12, demandPct: -10, rounds: 3 },
          text: "Los operarios denunciaron ante SUNAFIL. La entidad resolvió el contrato y quedaste expuesto a una inhabilitación para contratar con el Estado.",
        },
        outcome:
          "El margen apareció a costa de la planilla. La rotación se disparó y el hospital empezó a observar el servicio.",
        verdict: "mala",
      },
    ],
    concept: "Estructura de costos y oferta sostenible",
    lesson:
      "Ganar un contrato que no cubre sus costos es comprar pérdidas a plazo fijo. En servicios intensivos en personal, la oferta parte de la estructura de costos completa, incluidos reemplazos e incrementos previsibles.",
  },
  {
    id: "ind-limpieza-penalidades-inasistencia",
    title: "Las penalidades se comen la utilidad",
    category: "etica",
    industries: ["limpieza"],
    market: "B2B",
    tier: 1,
    situation:
      "Tu contrato con una universidad pública de Trujillo exige 30 operarios por turno y cada puesto sin cubrir genera una penalidad diaria. Este mes faltaron en promedio tres operarios por día y la penalidad acumulada ya consumió la utilidad. Tu supervisor sugiere 'arreglar' los registros de asistencia con el encargado de la entidad.",
    options: [
      {
        id: "a",
        label: "Arreglar los registros de asistencia",
        detail: "Se firma la conformidad como si todos los puestos hubieran estado cubiertos.",
        effects: { cashPct: 3, reputation: -5 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -12, reputation: -15, demandPct: -12, rounds: 3 },
          text: "El órgano de control revisó los registros. Hubo denuncia por documentación falsa, resolución del contrato y proceso sancionador.",
        },
        outcome:
          "Este mes cobraste sin descuentos. Tu empresa quedó en manos de un funcionario y de un documento adulterado.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Formar un grupo de retenes y premiar la asistencia",
        detail: "Contratas operarios de reemplazo disponibles cada turno y pagas un bono por asistencia perfecta.",
        effects: { fixedCostPct: 3, morale: 4, satisfaction: 4, rounds: 3 },
        outcome:
          "El costo de los retenes resultó menor que las penalidades que venías pagando. Los puestos quedaron cubiertos y la entidad dejó de observar el servicio.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Asumir las penalidades como parte del contrato",
        detail: "No cambias la operación y aceptas el descuento mensual.",
        effects: { cashPct: -4, satisfaction: -3 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -5, reputation: -5, demandPct: -6 },
          text: "Las penalidades llegaron al tope permitido y la entidad resolvió el contrato por incumplimiento.",
        },
        outcome:
          "Seguiste operando con puestos vacíos. Cada mes el descuento fue mayor que el anterior.",
        verdict: "riesgosa",
      },
    ],
    concept: "Penalidades contractuales",
    lesson:
      "Una penalidad indica cuánto le cuesta al cliente tu incumplimiento. Casi siempre es más barato invertir en prevenirla, y falsear la conformidad convierte un problema operativo en uno penal.",
  },
  {
    id: "ind-limpieza-rotacion-operarios",
    title: "Doce de cada cien operarios renuncian cada mes",
    category: "laboral",
    industries: ["limpieza"],
    market: "B2B",
    tier: 1,
    situation:
      "Cada mes renuncia el 12 % de tus operarios de limpieza. Se van por unos soles más a otra empresa o porque el local asignado queda a dos horas de su casa. Cada reemplazo te cuesta examen médico, uniforme, inducción y días de baja productividad. Recursos humanos pide subir sueldos a todos.",
    options: [
      {
        id: "a",
        label: "Subir 8 % el sueldo de todos los operarios",
        detail: "Aplicas un aumento general para igualar a la competencia.",
        effects: { fixedCostPct: 6, morale: 5, rounds: 4 },
        outcome:
          "Las renuncias bajaron algo. Quienes viajaban dos horas siguieron yéndose, y tus contratos a precio fijo absorbieron todo el aumento.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Asignar cerca de casa y premiar la permanencia",
        detail: "Reubicas por distrito, pagas puntual, das bono a los 6 y 12 meses y abres línea de carrera a supervisor.",
        effects: { fixedCostPct: 2, morale: 7, productivityPct: 5, quality: 3, rounds: 4 },
        outcome:
          "La rotación bajó a la mitad con un costo menor que el aumento general. Los operarios antiguos conocen el local y al cliente, y las observaciones disminuyeron.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Aceptar la rotación como algo propio del rubro",
        detail: "Sigues reemplazando a quien se va sin cambiar condiciones.",
        effects: { costPct: 3, quality: -3, satisfaction: -3, rounds: 3 },
        outcome:
          "El área de selección trabajó sin pausa todo el año. Los clientes se quejaron de ver caras nuevas cada semana y de tener que explicar todo otra vez.",
        verdict: "mala",
      },
    ],
    concept: "Costo de la rotación de personal",
    lesson:
      "Cada renuncia tiene un costo oculto en selección, inducción y calidad. Antes de subir sueldos conviene averiguar por qué se va la gente: a veces la causa es la distancia o el trato, no el pago.",
  },
  {
    id: "ind-limpieza-carta-fianza",
    title: "Ganaste la buena pro y no tienes para la garantía",
    category: "finanzas",
    industries: ["limpieza"],
    market: "B2B",
    tier: 3,
    situation:
      "Ganaste un contrato grande con un ministerio y tienes pocos días para presentar la garantía de fiel cumplimiento. Tu banco exige depositar casi todo el monto de la carta fianza, lo que te deja sin capital de trabajo para uniformes, insumos y la primera planilla. Un corredor ofrece una carta de una cooperativa 'que sale en un día y sin depósito'.",
    options: [
      {
        id: "a",
        label: "Presentar la carta de la cooperativa",
        detail: "Resuelves el requisito rápido y conservas tu efectivo.",
        effects: { cashPct: -1, reputation: -4 },
        risk: {
          prob: 0.55,
          effects: { cashPct: -10, reputation: -15, demandPct: -10, rounds: 3 },
          text: "La entidad verificó que el emisor no estaba autorizado para dar esa garantía. Perdiste la buena pro y se abrió un proceso sancionador.",
        },
        outcome:
          "El documento salió en un día. Nadie verificó si quien lo emitía estaba facultado para respaldar contratos con el Estado.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Pedir la retención como garantía por ser MYPE",
        detail: "Solicitas que la entidad retenga un porcentaje de tus pagos en lugar de presentar la carta fianza.",
        effects: { cashPct: -3, reputation: 2 },
        outcome:
          "La entidad retuvo una parte de tus primeros pagos y tu efectivo quedó libre para arrancar el servicio. Los primeros meses cobraste menos, pero lo tenías previsto.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Carta del banco y préstamo para capital de trabajo",
        detail: "Inmovilizas el depósito en garantía y financias el arranque con deuda.",
        effects: { cashPct: -6, costPct: 2, rounds: 3 },
        outcome:
          "Cumpliste con una garantía sólida. Los intereses del préstamo redujeron el margen de un contrato que ya era ajustado.",
        verdict: "buena",
      },
    ],
    concept: "Garantías y capital de trabajo",
    lesson:
      "Ganar un contrato exige caja antes del primer cobro: garantías, equipamiento y planilla. El costo y la forma de la garantía se evalúan antes de ofertar, y solo valen las emitidas por entidades autorizadas.",
  },
  {
    id: "ind-limpieza-estado-no-paga",
    title: "La municipalidad te debe tres meses",
    category: "finanzas",
    industries: ["limpieza"],
    market: "B2B",
    tier: 3,
    situation:
      "Una municipalidad provincial te debe tres meses de servicio: la conformidad 'está en trámite' y tesorería no da fecha. Tú ya pagaste planilla, EsSalud y el IGV de esas facturas. Tu caja alcanza para dos semanas. Un funcionario insinúa que 'con una atención' el expediente avanzaría rápido.",
    options: [
      {
        id: "a",
        label: "Entregar la 'atención' al funcionario",
        detail: "Pagas para que tu expediente pase primero.",
        effects: { cashPct: 5, reputation: -8 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -12, reputation: -17, demandPct: -10, rounds: 3 },
          text: "El pago quedó registrado en una investigación por corrupción en la municipalidad y fuiste incluido en el proceso penal.",
        },
        outcome:
          "Te pagaron un mes. Al mes siguiente el funcionario volvió a pedir lo mismo.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Financiar el desfase y exigir el pago por escrito",
        detail: "Tomas una línea de capital de trabajo en una caja municipal y reclamas formalmente el pago con los intereses que correspondan.",
        effects: { cashPct: -2, costPct: 2, reputation: 2, rounds: 2 },
        outcome:
          "La planilla se pagó a tiempo y el reclamo formal dejó constancia de la demora. Desde entonces presupuestas los contratos con el Estado asumiendo cobros a 60 o 90 días.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Suspender el servicio hasta que paguen",
        detail: "Retiras a los operarios como medida de presión.",
        effects: { fixedCostPct: -3, satisfaction: -6 },
        risk: {
          prob: 0.55,
          effects: { cashPct: -8, reputation: -6 },
          text: "Al no seguir el procedimiento previsto en el contrato, la entidad aplicó penalidades y lo resolvió por abandono.",
        },
        outcome:
          "La presión se sintió de inmediato en los locales municipales. La disputa pasó de una demora de pago a un incumplimiento tuyo.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Retrasar la planilla hasta cobrar",
        detail: "Pides paciencia a los operarios y les pagas cuando la municipalidad cumpla.",
        effects: { morale: -10, productivityPct: -6, quality: -4, rounds: 2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -6, reputation: -6 },
          text: "Los operarios denunciaron el impago ante SUNAFIL y varios abandonaron sus puestos.",
        },
        outcome:
          "Trasladaste el problema a quienes menos pueden esperar. Las faltas y renuncias aumentaron esa misma quincena.",
        verdict: "mala",
      },
    ],
    concept: "Ciclo de conversión de efectivo",
    lesson:
      "Vender al Estado es vender a crédito con plazo incierto. El desfase entre pagar la planilla y cobrar la factura se financia y se presupuesta desde la oferta; la coima no lo resuelve y te expone a perderlo todo.",
  },
  {
    id: "ind-limpieza-insumos-y-equipos",
    title: "Desinfectante a granel o máquinas fregadoras",
    category: "proveedores",
    industries: ["limpieza"],
    market: "B2B",
    tier: 2,
    situation:
      "Limpias las oficinas y el comedor de una planta de alimentos en Lurín. Un proveedor ofrece desinfectantes 40 % más baratos, a granel, sin registro ni hoja de seguridad. Por otro lado, un distribuidor te propone fregadoras automáticas en alquiler que permitirían cubrir la misma área con menos horas de trabajo.",
    options: [
      {
        id: "a",
        label: "Comprar el desinfectante a granel",
        detail: "Reduces el costo de insumos con un producto sin documentación.",
        effects: { costPct: -6, quality: -4, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -8, reputation: -8, satisfaction: -8 },
          text: "La auditoría de inocuidad de la planta pidió las fichas de los productos. No las tenías y el cliente terminó el contrato.",
        },
        outcome:
          "El gasto en insumos bajó. Tus operarios empezaron a usar un químico del que nadie conoce la concentración.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Alquilar las fregadoras y reasignar personal",
        detail: "Mecanizas los pisos y llevas a los operarios liberados a contratos donde falta gente.",
        effects: { fixedCostPct: 3, productivityPct: 10, quality: 4, satisfaction: 3, rounds: 4 },
        outcome:
          "El mismo equipo cubrió más metros por turno con un acabado más parejo. Al ser alquiler, podrás devolver las máquinas si el contrato no se renueva.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Comprar las fregadoras al contado",
        detail: "Inviertes en máquinas propias para no pagar alquiler.",
        effects: { cashPct: -8, productivityPct: 10, quality: 4, rounds: 4 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -3, fixedCostPct: 2 },
          text: "El cliente no renovó el contrato y las máquinas quedaron guardadas, con mantenimiento que pagar.",
        },
        outcome:
          "La productividad mejoró igual que con el alquiler. Ataste una inversión de varios años a un contrato que se renueva cada doce meses.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Seguir con los insumos y métodos actuales",
        detail: "No cambias nada mientras el cliente esté conforme.",
        effects: {},
        outcome:
          "El servicio siguió cumpliendo. En la siguiente renovación, un competidor con equipos ofreció el mismo resultado a menor precio.",
        verdict: "buena",
      },
    ],
    concept: "Productividad mediante mecanización",
    lesson:
      "El costo se reduce de forma sostenible elevando la productividad, no degradando los insumos. Alquilar equipos alinea el plazo de la inversión con el plazo del contrato.",
  },

  // ───────────── MAQUINARIA Y EQUIPOS INDUSTRIALES (B2B) ─────────────
  {
    id: "ind-maquinaria-venta-consultiva",
    title: "Producción pide pruebas, finanzas pide descuento",
    category: "clientes",
    industries: ["maquinaria"],
    market: "B2B",
    tier: 1,
    situation:
      "Una planta de plásticos de Ate evalúa comprar una inyectora cuyo valor equivale a lo que vendes en un trimestre. El gerente de producción pide una visita técnica, un cálculo de ahorro y una prueba con sus moldes; el de finanzas solo pregunta por el precio. Tu vendedor quiere cerrar rápido con 12 % de descuento.",
    options: [
      {
        id: "a",
        label: "Ofrecer el 12 % de descuento para cerrar ya",
        detail: "Apuestas a que el precio decida la compra.",
        effects: { cashPct: -4, demandPct: 3 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -4 },
          text: "El competidor igualó el descuento y además hizo la prueba con los moldes. El cliente compró donde despejó sus dudas técnicas.",
        },
        outcome:
          "El gerente de finanzas anotó el descuento y pidió uno mayor. Las dudas del gerente de producción siguieron sin respuesta.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Hacer el diagnóstico y la prueba con sus moldes",
        detail: "Envías a tu ingeniero, mides el proceso actual y presentas el retorno de la inversión con datos de su planta.",
        effects: { cashPct: -2, demandPct: 5, satisfaction: 4, brand: 2 },
        outcome:
          "La prueba mostró el ahorro de energía y de merma. El gerente de producción defendió tu propuesta ante finanzas y la venta cerró con un descuento mínimo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Enviar la cotización estándar y el catálogo",
        detail: "Respondes rápido con la información disponible y esperas la decisión.",
        effects: {},
        risk: {
          prob: 0.6,
          effects: { demandPct: -4 },
          text: "Tu cotización quedó en el archivo junto a otras tres. Ganó el proveedor que visitó la planta.",
        },
        outcome:
          "No gastaste en visitas ni pruebas. Tu propuesta llegó al comité como un precio más en un cuadro comparativo.",
        verdict: "riesgosa",
      },
    ],
    concept: "Venta consultiva",
    lesson:
      "En una compra de alto valor deciden varias personas con intereses distintos. Se vende demostrando el retorno con datos del propio cliente; el descuento sin diagnóstico solo reduce tu margen.",
  },
  {
    id: "ind-maquinaria-repuestos-posventa",
    title: "Plantas paradas por falta de repuestos",
    category: "operaciones",
    industries: ["maquinaria"],
    market: "B2B",
    tier: 2,
    situation:
      "Vendiste 40 compresores industriales en tres años, pero casi no tienes repuestos en stock: cada pedido se importa y tarda seis semanas. Dos clientes con la planta parada ya compraron repuestos alternativos a un tercero. Tu gerente financiero no quiere 'plata dormida' en el almacén.",
    options: [
      {
        id: "a",
        label: "Seguir importando cada repuesto a pedido",
        detail: "Evitas inmovilizar dinero en inventario.",
        effects: { satisfaction: -6, demandPct: -4, brand: -3, rounds: 3 },
        outcome:
          "Tu inventario siguió en cero. Los clientes aprendieron a comprar repuestos y servicio en otro lado, y a considerar otra marca para su próximo equipo.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Stock de repuestos críticos y contratos de mantenimiento",
        detail: "Defines los repuestos de mayor rotación según tu base instalada y vendes planes anuales de servicio preventivo.",
        effects: { cashPct: -5, demandPct: 5, satisfaction: 6, brand: 3, rounds: 3 },
        outcome:
          "Los contratos de mantenimiento generaron un ingreso recurrente con mejor margen que la venta de equipos. Los técnicos detectaron además oportunidades de renovación.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Tener en stock todos los repuestos del catálogo",
        detail: "Aseguras disponibilidad total para cualquier modelo.",
        effects: { cashPct: -12, satisfaction: 6, rounds: 3 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -4 },
          text: "El fabricante actualizó dos modelos y una parte del inventario quedó obsoleta sin haberse vendido.",
        },
        outcome:
          "Ningún cliente volvió a esperar. La mayor parte del almacén son piezas que se piden una vez cada varios años.",
        verdict: "riesgosa",
      },
    ],
    concept: "Posventa como fuente de margen",
    lesson:
      "En bienes de capital, la venta del equipo abre una relación de años. Repuestos y servicio dan ingresos recurrentes y fidelidad, con un inventario dimensionado según la base instalada.",
  },
  {
    id: "ind-maquinaria-financiar-al-cliente",
    title: "El cliente quiere pagarte en 24 cuotas",
    category: "finanzas",
    industries: ["maquinaria"],
    market: "B2B",
    tier: 3,
    situation:
      "Una constructora de Arequipa quiere comprarte dos excavadoras, pero pide pagar en 24 cuotas directamente a ti, sin banco. Es una venta enorme para tu trimestre. Tú pagas al fabricante a 90 días y no tienes área de créditos. El cliente ejecuta obras públicas, que suelen pagarle con retraso.",
    options: [
      {
        id: "a",
        label: "Dar crédito directo a 24 meses",
        detail: "Financias la venta con tu propia caja y tus líneas bancarias.",
        effects: { demandPct: 10, cashPct: -10 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -10 },
          text: "Al cliente le demoraron una valorización y dejó de pagar cuatro cuotas. Recuperar las máquinas tomó meses.",
        },
        outcome:
          "Registraste la venta más grande del año. Pagaste al fabricante en 90 días y cobrarás en dos años.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Canalizar la operación por leasing bancario",
        detail: "Ayudas al cliente a armar su expediente y el banco te paga el equipo al contado.",
        effects: { demandPct: 6, cashPct: 5 },
        risk: {
          prob: 0.25,
          effects: { demandPct: -4 },
          text: "El banco aprobó el leasing solo para una de las dos excavadoras.",
        },
        outcome:
          "El trámite demoró unas semanas. Cobraste al contado y el riesgo de crédito quedó en quien sabe evaluarlo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Crédito directo con inicial alta y garantía",
        detail: "Pides 40 % de inicial, plazo de 12 meses y garantía mobiliaria inscrita sobre los equipos.",
        effects: { demandPct: 8, cashPct: -4 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -4 },
          text: "Hubo atrasos en tres cuotas. La garantía inscrita te permitió negociar, aunque cobraste con demora.",
        },
        outcome:
          "La inicial cubrió buena parte de tu pago al fabricante. Asumiste un riesgo acotado y documentado.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Vender solo al contado",
        detail: "Mantienes tu política y dejas que el cliente resuelva su financiamiento.",
        effects: {},
        risk: {
          prob: 0.6,
          effects: { demandPct: -5 },
          text: "Un competidor le ofreció financiamiento y se llevó la venta de las dos excavadoras.",
        },
        outcome:
          "Tu caja no corrió ningún riesgo. El cliente necesitaba una solución de pago, no solo una máquina.",
        verdict: "riesgosa",
      },
    ],
    concept: "Crédito comercial y leasing",
    lesson:
      "Financiar al cliente es otro negocio, con su propio riesgo. El proveedor de equipos puede facilitar la venta acercando al cliente a quien sabe financiar, o acotar el riesgo con inicial y garantías.",
  },
  {
    id: "ind-maquinaria-subvaluar-importacion",
    title: "Declarar menos valor en aduanas",
    category: "tributario",
    industries: ["maquinaria"],
    market: "B2B",
    tier: 2,
    situation:
      "Llega al Callao un embarque de tornos de control numérico. Tu agente de carga sugiere declarar un valor menor al real para pagar menos tributos de importación; dice que 'todos lo hacen'. Con ese ahorro podrías bajar el precio y ganarle a un competidor la venta a una metalmecánica de Villa El Salvador.",
    options: [
      {
        id: "a",
        label: "Declarar un valor menor al real",
        detail: "Usas una factura con precio reducido para calcular los tributos.",
        effects: { cashPct: 3, reputation: -5 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -15, reputation: -12 },
          text: "Aduanas comparó el valor con importaciones similares, ajustó la base, aplicó multas e inmovilizó la mercadería.",
        },
        outcome:
          "Pagaste menos al nacionalizar. Buena parte del ahorro era IGV, que de todas formas habrías recuperado como crédito fiscal.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Declarar el valor real y usar el crédito fiscal",
        detail: "Pagas los tributos completos y aplicas el IGV de la importación contra el IGV de tus ventas.",
        effects: { cashPct: -2, reputation: 3 },
        outcome:
          "El IGV pagado en aduanas se compensó con tus ventas de los meses siguientes. El efecto real fue de caja por unas semanas, no un mayor costo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Declarar bien y negociar precio con el fabricante",
        detail: "Buscas el ahorro en el origen: descuento por volumen anual y mejores plazos de pago.",
        effects: { costPct: -3, reputation: 2, rounds: 3 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -3 },
          text: "El fabricante exigió un volumen mínimo de compra y te quedaste con más inventario del que vendes en el semestre.",
        },
        outcome:
          "El fabricante aceptó una escala de precios por volumen. La mejora de costo fue legítima y permanente.",
        verdict: "buena",
      },
    ],
    concept: "Crédito fiscal en la importación",
    lesson:
      "Antes de tomar un atajo tributario, calcula cuánto ahorra de verdad. El IGV pagado al importar se recupera como crédito fiscal, mientras que la subvaluación arriesga la mercadería y la empresa.",
  },
  {
    id: "ind-maquinaria-competencia-china",
    title: "Montacargas chinos a 35 % menos",
    category: "estrategia",
    industries: ["maquinaria"],
    market: "B2B",
    tier: 3,
    situation:
      "Un importador empezó a vender montacargas de una marca china a 35 % menos que tus equipos japoneses. Dos clientes antiguos ya te pidieron igualar el precio. Tus equipos consumen menos, duran más y tienes servicio técnico en Lima, Arequipa y Trujillo, pero nada de eso aparece en tu cotización.",
    options: [
      {
        id: "a",
        label: "Bajar tus precios 25 %",
        detail: "Te acercas al precio del competidor para no perder las ventas.",
        effects: { cashPct: -8, demandPct: 4, brand: -3, rounds: 2 },
        outcome:
          "Vendiste algunos equipos casi al costo. Tu estructura, con técnicos y almacén de repuestos, no se sostiene con ese margen.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Cotizar el costo total a cinco años",
        detail: "Presentas consumo, mantenimiento, horas de parada y valor de reventa junto al precio, con garantía extendida.",
        effects: { cashPct: -2, demandPct: 3, brand: 4, satisfaction: 2, rounds: 3 },
        outcome:
          "Los clientes que usan el equipo en tres turnos hicieron la cuenta y se quedaron contigo. Los de uso ocasional compraron el equipo barato, y tenía sentido.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Sumar una segunda marca económica a tu portafolio",
        detail: "Representas una marca asiática de menor precio, respaldada por tu servicio técnico.",
        effects: { cashPct: -5, demandPct: 7, brand: -2, rounds: 3 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, satisfaction: -3 },
          text: "Clientes que iban a comprar tu marca principal eligieron la económica, y sus fallas recargaron a tu servicio técnico.",
        },
        outcome:
          "Atendiste a los clientes sensibles al precio sin rebajar tu marca principal. Tu equipo comercial tuvo que capacitarse para recomendar cada marca según el uso.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "No cambiar nada: la calidad se vende sola",
        detail: "Mantienes precio, cotización y discurso de ventas.",
        effects: {},
        risk: {
          prob: 0.55,
          effects: { demandPct: -10, rounds: 3 },
          text: "Sin argumentos por escrito, los comités de compra compararon solo precios y eligieron al importador.",
        },
        outcome:
          "Confiaste en la reputación de tu marca. Quien decide la compra muchas veces no es quien opera el equipo.",
        verdict: "riesgosa",
      },
    ],
    concept: "Costo total de propiedad",
    lesson:
      "El precio de compra es solo una parte de lo que cuesta un equipo. Quien vende calidad debe traducirla a soles por hora de uso; de lo contrario, el cliente compara únicamente lo que ve en la cotización.",
  },
  {
    id: "ind-maquinaria-reclamo-garantia",
    title: "Reclaman garantía por un horno mal instalado",
    category: "clientes",
    industries: ["maquinaria"],
    market: "B2B",
    tier: 1,
    situation:
      "Una panificadora de Huancayo reclama la garantía de un horno rotativo que falló a los ocho meses. Tu técnico comprueba que lo conectaron a una línea con voltaje inestable y sin el estabilizador que exige el manual. El cliente compra mucho, está molesto y amenaza con contarlo en su gremio.",
    options: [
      {
        id: "a",
        label: "Negar la garantía y cobrar la reparación completa",
        detail: "Aplicas las condiciones: la falla por mala instalación no está cubierta.",
        effects: { cashPct: 1, satisfaction: -7 },
        risk: {
          prob: 0.45,
          effects: { demandPct: -5, brand: -4, rounds: 2 },
          text: "El cliente contó su versión en la reunión del gremio y dos panaderías cancelaron sus pedidos.",
        },
        outcome:
          "Tenías la razón técnica y el contrato de tu lado. El cliente solo escuchó que su horno nuevo no tenía garantía.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Cubrir todo como garantía sin discutir",
        detail: "Reparas gratis para cerrar el tema rápido.",
        effects: { cashPct: -4, satisfaction: 5 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -4 },
          text: "Sin estabilizador, el horno volvió a fallar a los tres meses y otros clientes pidieron el mismo trato.",
        },
        outcome:
          "El cliente quedó contento. La causa de la falla siguió en su tablero eléctrico.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Mostrar el informe y compartir el costo",
        detail: "Explicas la causa, pones la mano de obra, cobras repuestos al costo y exiges instalar el estabilizador.",
        effects: { cashPct: -1.5, satisfaction: 4, reputation: 2 },
        outcome:
          "Con las mediciones de voltaje en la mano, el cliente aceptó su parte. El horno no volvió a fallar y en el gremio se comentó que respondes.",
        verdict: "optima",
      },
    ],
    concept: "Política de garantía",
    lesson:
      "La garantía cubre defectos del producto, no errores de uso, pero la relación vale más que una reparación. Un informe técnico y un gesto comercial acotado resuelven la causa sin crear un precedente costoso.",
  },
];

export default data;
