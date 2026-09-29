import type { Dilemma } from "../types";

const data: Dilemma[] = [
  // ===== LABORAL (22) =====
  {
    id: "lab-inspeccion-sunafil",
    title: "SUNAFIL toca la puerta",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Un inspector de SUNAFIL se presenta en tu local de Chiclayo por una denuncia anónima. Tienes tres trabajadores que llevan ocho meses sin estar en planilla. El inspector pide contratos, boletas de pago y el registro de asistencia, y te da unos días para presentar la documentación.",
    options: [
      {
        id: "a",
        label: "Regularizar a los tres y colaborar con la inspección",
        detail:
          "Los inscribes en planilla, pagas lo adeudado y entregas la documentación completa dentro del plazo.",
        effects: { cashPct: -5, fixedCostPct: 3, morale: 5, reputation: 4, rounds: 4 },
        outcome:
          "Subsanar antes del cierre de la inspección redujo la multa de forma importante. Tu costo de planilla subió, pero los tres trabajadores ahora tienen seguro y beneficios, y el resto del equipo lo notó.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Pedirles que digan que empezaron esta semana",
        detail:
          "Preparas contratos con fecha reciente y les pides a los trabajadores respaldar esa versión ante el inspector.",
        effects: { cashPct: -1, morale: -4 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -14, reputation: -10 },
          text: "El inspector entrevista al personal por separado, las versiones no coinciden y la multa se agrava por obstruir la inspección.",
        },
        outcome:
          "Pusiste a tu gente a mentir por ti. Aunque el papel aguante, el equipo aprendió que en tu empresa la versión oficial se acomoda según convenga.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Cesar a los tres antes de la siguiente visita",
        detail:
          "Terminas el vínculo para que ya no aparezcan en el local cuando regrese el inspector.",
        effects: { productivityPct: -8, morale: -8, reputation: -5, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -12, reputation: -6 },
          text: "Los trabajadores cesados denuncian y SUNAFIL reconoce el vínculo laboral por todo el tiempo trabajado.",
        },
        outcome:
          "Perdiste personal entrenado en plena operación y el resto del equipo entendió el mensaje. El vínculo laboral existió igual y se prueba con mensajes, fotos y testigos.",
        verdict: "mala",
      },
    ],
    concept: "Fiscalización laboral y formalización",
    lesson:
      "La informalidad laboral es una deuda que crece en silencio. Cuando llega la inspección, subsanar rápido y colaborar cuesta mucho menos que ocultar, y además ordena tu estructura de costos real.",
  },
  {
    id: "lab-honorarios-desnaturalizados",
    title: "Recibos por honorarios para todo el equipo",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu contador te propone un ahorro: pasar a seis trabajadores de atención a recibos por honorarios. Seguirían cumpliendo horario, usando uniforme y recibiendo órdenes de un supervisor, pero ya no pagarías EsSalud, gratificaciones ni CTS por ellos.",
    options: [
      {
        id: "a",
        label: "Aceptar el cambio a recibos por honorarios",
        detail:
          "Reduces el costo de planilla de inmediato y los trabajadores siguen haciendo exactamente lo mismo.",
        effects: { fixedCostPct: -5, morale: -6, rounds: 4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -15, reputation: -8 },
          text: "Un trabajador demanda, el juez aplica la primacía de la realidad y debes pagar los beneficios de todo el periodo, además de la multa.",
        },
        outcome:
          "El ahorro se sintió desde el primer mes. Pero si hay horario, órdenes y pago fijo, lo que existe es una relación laboral, diga lo que diga el contrato.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Mantener la planilla y buscar el ahorro en otro lado",
        detail:
          "Dejas la relación laboral como está y revisas turnos, compras y procesos para reducir costos.",
        effects: { productivityPct: 3, morale: 3, reputation: 2, rounds: 2 },
        outcome:
          "Reorganizar turnos y eliminar tiempos muertos te dio un ahorro menor que el prometido por el contador, pero real y sin contingencias escondidas en el balance.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Contratar por servicio solo labores autónomas",
        detail:
          "Pasan a honorarios únicamente quienes trabajan sin horario ni jefe directo, como el diseñador o el técnico externo.",
        effects: { cashPct: -1, fixedCostPct: -2, rounds: 4 },
        outcome:
          "Separaste bien los dos mundos: el personal subordinado sigue en planilla y los servicios realmente independientes se pagan por entregable. El ahorro fue moderado y defendible.",
        verdict: "buena",
      },
    ],
    concept: "Primacía de la realidad",
    lesson:
      "En materia laboral manda lo que ocurre en los hechos, no lo que dice el documento. Si hay prestación personal, remuneración y subordinación, hay contrato de trabajo aunque se emitan recibos por honorarios.",
  },
  {
    id: "lab-renuncia-empleado-clave",
    title: "Tu jefa de operaciones presenta su renuncia",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Rosa, la jefa de operaciones que conoce todos tus procesos, te entrega su carta de renuncia. Un competidor de Arequipa le ofrece 30 % más de sueldo. Se va en 30 días y nadie más domina su puesto.",
    options: [
      {
        id: "a",
        label: "Igualar la oferta con una contraoferta inmediata",
        detail: "Le subes el sueldo al nivel de la oferta para que se quede.",
        effects: { fixedCostPct: 2, morale: -3, rounds: 4 },
        risk: {
          prob: 0.5,
          effects: { productivityPct: -6, rounds: 2 },
          text: "Rosa se queda unos meses y renuncia igual, porque el sueldo no era su único motivo. Otros jefes ya pidieron el mismo trato.",
        },
        outcome:
          "Rosa aceptó quedarse. El equipo se enteró y sacó su conclusión: para conseguir un aumento hay que llegar con una carta de renuncia.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Conversar sus motivos y preparar la sucesión",
        detail:
          "Averiguas por qué se va, negocias una salida ordenada y documentas sus procesos con un reemplazo interno.",
        effects: { cashPct: -1, productivityPct: -3, morale: 3 },
        outcome:
          "Descubriste que pesaba más la falta de crecimiento que el sueldo. Rosa dejó manuales y entrenó a su reemplazo, así que la operación casi no se resintió.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Aceptar la renuncia y buscar reemplazo afuera",
        detail: "Publicas la vacante y dejas correr el mes de preaviso sin más cambios.",
        effects: { cashPct: -2, productivityPct: -6, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { quality: -4, satisfaction: -3 },
          text: "El reemplazo tarda en llegar y en aprender. Durante dos meses se repiten errores que Rosa resolvía de memoria.",
        },
        outcome:
          "El conocimiento de Rosa se fue con ella el último día. Contrataste a alguien con buen currículum que tuvo que reconstruir los procesos preguntando a todos.",
        verdict: "riesgosa",
      },
    ],
    concept: "Retención de talento y plan de sucesión",
    lesson:
      "Ningún puesto crítico debería depender de una sola persona. Documentar procesos y formar reemplazos internos cuesta poco comparado con improvisar cuando alguien clave se va.",
  },
  {
    id: "lab-pedido-de-aumento",
    title: "Un trabajador destacado pide aumento",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Miguel, uno de tus trabajadores con mejor desempeño, te pide un aumento de 20 %. Al revisar descubres que gana menos que dos compañeros del mismo puesto que entraron después. No tienes una escala de sueldos y cada aumento se ha negociado caso por caso.",
    options: [
      {
        id: "a",
        label: "Darle el aumento y pedirle reserva",
        detail: "Resuelves su caso de inmediato y le pides que no lo comente con nadie.",
        effects: { fixedCostPct: 1, morale: -1, rounds: 4 },
        risk: {
          prob: 0.5,
          effects: { morale: -5 },
          text: "El aumento se comenta en el almuerzo y tres personas más llegan a tu oficina con el mismo pedido.",
        },
        outcome:
          "Miguel quedó contento. El criterio, en cambio, sigue siendo el mismo de siempre: gana más quien mejor negocia, no quien más aporta.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Crear una escala salarial y nivelar por puesto",
        detail:
          "Defines bandas de sueldo por puesto y desempeño, y corriges las brechas empezando por las más injustas.",
        effects: { cashPct: -1, fixedCostPct: 2, productivityPct: 3, morale: 6, rounds: 4 },
        outcome:
          "Te costó más que un solo aumento, pero ahora cualquier trabajador sabe qué debe lograr para ganar más. Miguel recibió su ajuste dentro de una regla que vale para todos.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Negarlo por ahora y revisarlo a fin de año",
        detail: "Le explicas que la caja no lo permite y prometes retomar el tema en diciembre.",
        effects: { morale: -4 },
        risk: {
          prob: 0.45,
          effects: { productivityPct: -5, rounds: 2 },
          text: "Miguel consigue otra oferta y se va. Su reemplazo tarda meses en rendir igual.",
        },
        outcome:
          "Miguel aceptó la respuesta con una sonrisa corta. Desde esa semana actualizó su currículum y dejó de proponer mejoras.",
        verdict: "mala",
      },
    ],
    concept: "Equidad interna y bandas salariales",
    lesson:
      "Las personas comparan su sueldo con el de sus compañeros antes que con el mercado. Una escala clara por puesto y desempeño evita que los aumentos dependan de quién reclama más fuerte.",
  },
  {
    id: "lab-formacion-sindicato",
    title: "Tus trabajadores están formando un sindicato",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Te enteras de que más de veinte trabajadores firmaron para constituir un sindicato. Reclaman turnos más previsibles y un comedor decente. Un gerente te sugiere despedir a los dos promotores antes de que el sindicato quede registrado.",
    options: [
      {
        id: "a",
        label: "Despedir a los promotores con otro pretexto",
        detail: "Buscas una falta menor para justificar la salida de los dos líderes.",
        effects: { cashPct: -2, morale: -10, reputation: -6 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -8, reputation: -8 },
          text: "Los despedidos demandan, el juez declara nulo el despido por motivo sindical y ordena reponerlos con el pago de lo dejado de percibir.",
        },
        outcome:
          "El sindicato se formó de todas maneras, ahora con dos mártires y un motivo más fuerte. La relación con el personal empezó en el peor punto posible.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Reconocer al sindicato y abrir una mesa de diálogo",
        detail:
          "Aceptas la organización como interlocutor y empiezas por los reclamos concretos de turnos y comedor.",
        effects: { cashPct: -2, fixedCostPct: 1, productivityPct: 2, morale: 7, reputation: 4, rounds: 4 },
        outcome:
          "Las primeras reuniones fueron tensas, pero pronto tuviste un canal ordenado para enterarte de los problemas antes de que estallen. Los turnos se publicaron con anticipación y bajaron las faltas.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Mejorar turnos y comedor sin hablar con el sindicato",
        detail: "Atiendes los reclamos por tu cuenta, esperando que el sindicato pierda sentido.",
        effects: { cashPct: -3, morale: 2 },
        outcome:
          "Las mejoras gustaron, pero el sindicato se registró igual y ahora te reprocha haberlo ignorado. La primera negociación comenzó con desconfianza de ambos lados.",
        verdict: "riesgosa",
      },
    ],
    concept: "Libertad sindical",
    lesson:
      "Formar un sindicato es un derecho y el despido por esa causa es nulo. Un sindicato suele ser síntoma de que faltaban canales de escucha, y tratarlo como interlocutor sale más barato que combatirlo.",
  },
  {
    id: "lab-huelga-en-campana",
    title: "Huelga a tres semanas de la campaña",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "La negociación del pliego de reclamos se estancó. El sindicato pide 12 % de aumento, tú ofreciste 4 % y han anunciado una huelga justo antes de tu campaña más fuerte del año. Tus números dicen que puedes llegar a 7 % sin comprometer la caja.",
    options: [
      {
        id: "a",
        label: "Mantener el 4 % y resistir la huelga",
        detail: "No mueves tu oferta y esperas que la paralización se desgaste sola.",
        effects: { demandPct: -10, morale: -8, satisfaction: -4 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -8, brand: -4 },
          text: "La huelga se extiende a toda la campaña y tus clientes se acostumbran a comprarle a la competencia.",
        },
        outcome:
          "Defendiste tu planilla, pero perdiste buena parte de la campaña. Guardar un margen de negociación que nunca usaste no te sirvió de nada.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Ofrecer 7 % atado a metas de productividad",
        detail:
          "Llegas a tu límite real, pero una parte del aumento depende de indicadores acordados con el sindicato.",
        effects: { fixedCostPct: 3, productivityPct: 4, morale: 5, rounds: 4 },
        outcome:
          "El sindicato aceptó después de dos reuniones largas. El aumento se paga en parte con la mejora de productividad, y la campaña salió completa.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Aceptar el 12 % para asegurar la campaña",
        detail: "Cedes a todo el pedido a cambio de que se levante la medida de inmediato.",
        effects: { fixedCostPct: 6, morale: 6, rounds: 4 },
        outcome:
          "La campaña salió sin contratiempos. Tu costo fijo quedó por encima de lo que el negocio soporta y el sindicato aprendió que anunciar una huelga antes de campaña funciona.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Contratar reemplazos mientras dure la huelga",
        detail: "Traes personal temporal para cubrir los puestos de quienes paralizan.",
        effects: { cashPct: -3, morale: -10, quality: -4, reputation: -6 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -8, reputation: -6 },
          text: "SUNAFIL constata el reemplazo de trabajadores en huelga, que está prohibido, y aplica una multa por infracción muy grave.",
        },
        outcome:
          "El personal temporal no conocía la operación y los errores se multiplicaron. El conflicto dejó de ser por sueldos y pasó a ser por respeto.",
        verdict: "mala",
      },
    ],
    concept: "Negociación colectiva",
    lesson:
      "En una negociación colectiva conviene conocer tu límite real y cambiar concesiones por compromisos medibles. Ceder todo bajo presión o no ceder nada suelen ser las dos opciones más caras.",
  },
  {
    id: "lab-horas-extra",
    title: "Horas extra en plena campaña",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Por la campaña de Fiestas Patrias necesitas que tu equipo se quede dos horas más cada día durante tres semanas. Pagar el sobretiempo con su sobretasa de ley cuesta y la caja está justa. Tu administrador propone llamarlo 'apoyo voluntario' y compensar con una parrillada al final.",
    options: [
      {
        id: "a",
        label: "Pagar las horas extra con la sobretasa de ley",
        detail: "Registras el sobretiempo y lo pagas en la boleta del mes.",
        effects: { cashPct: -2, productivityPct: 3, morale: 4 },
        outcome:
          "La campaña salió bien y nadie se quejó de quedarse. Tu caja terminó el mes más ajustada de lo que querías, aunque sin deudas ocultas con tu gente.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Llamarlo apoyo voluntario y no pagar",
        detail: "Pides el esfuerzo como un favor a la empresa y cierras con un compartir.",
        effects: { productivityPct: -3, morale: -7 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -7, reputation: -6 },
          text: "Un trabajador denuncia. SUNAFIL revisa el registro de asistencia, ordena pagar todo el sobretiempo y aplica una multa.",
        },
        outcome:
          "No salió un sol de caja. La parrillada estuvo tensa y en la segunda semana empezaron las tardanzas y los descansos médicos.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Acordar por escrito compensar con descanso",
        detail:
          "Firmas con cada trabajador que las horas extra se devolverán con tiempo libre después de la campaña.",
        effects: { productivityPct: -2, morale: 3 },
        outcome:
          "Cuidaste la caja y cumpliste la ley. En agosto operaste unos días con menos gente mientras el equipo tomaba sus descansos, algo que pudiste programar.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Contratar personal temporal para un segundo turno",
        detail: "Evitas el sobretiempo con gente nueva por tres semanas.",
        effects: { cashPct: -3, quality: -3 },
        outcome:
          "Tu equipo descansó, pero los temporales necesitaron una semana para aprender y la campaña solo duraba tres. Parte de lo que pagaste se fue en entrenamiento.",
        verdict: "riesgosa",
      },
    ],
    concept: "Jornada de trabajo y sobretiempo",
    lesson:
      "El trabajo en sobretiempo es voluntario y se paga con sobretasa o se compensa con descanso si hay acuerdo escrito. Llamarlo de otra forma no elimina la obligación, solo la convierte en contingencia.",
  },
  {
    id: "lab-gratificacion-caja-ajustada",
    title: "Llega julio y no alcanza para la gratificación",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Estamos a inicios de julio. Las ventas del trimestre fueron flojas y, después de pagar a proveedores, la caja no cubre la gratificación completa de tus 18 trabajadores. Nunca hiciste una provisión mensual porque 'siempre alcanzaba'.",
    options: [
      {
        id: "a",
        label: "Tomar un préstamo corto y pagar completo a tiempo",
        detail: "Financias la gratificación con un crédito de pocos meses y asumes los intereses.",
        effects: { cashPct: -1.5, morale: 3, reputation: 2 },
        outcome:
          "Tu equipo cobró en la fecha y nunca supo del apuro. Los intereses fueron el precio de no haber guardado cada mes una parte de esa obligación.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Pagar la mitad ahora y el resto en agosto",
        detail: "Explicas la situación al equipo y fraccionas el pago por tu cuenta.",
        effects: { morale: -6 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -5, reputation: -5 },
          text: "Dos trabajadores denuncian el pago fuera de plazo y SUNAFIL multa por incumplir un beneficio obligatorio.",
        },
        outcome:
          "Varios trabajadores ya tenían comprometida esa plata para las Fiestas Patrias. Entendieron la explicación, pero el malestar se quedó en el ambiente.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Postergar pagos a proveedores y cumplir con el personal",
        detail: "Negocias dos semanas más con tus proveedores para liberar caja.",
        effects: { costPct: 2, morale: 3 },
        outcome:
          "Pagaste la gratificación a tiempo. Dos proveedores aceptaron esperar, aunque te retiraron el descuento habitual en la siguiente compra.",
        verdict: "buena",
      },
    ],
    concept: "Provisión de beneficios sociales",
    lesson:
      "Las gratificaciones de julio y diciembre y la CTS de mayo y noviembre tienen fecha conocida. Separar cada mes una parte proporcional convierte un susto de caja en un gasto previsto.",
  },
  {
    id: "lab-regimen-mype",
    title: "¿Acogerte al régimen laboral MYPE?",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu empresa de Huancayo califica como pequeña empresa y podría inscribirse en el REMYPE. Ese régimen reduce el costo de beneficios en las nuevas contrataciones. Vas a contratar a ocho personas y tu competencia ofrece el régimen general completo para atraer a los mejores.",
    options: [
      {
        id: "a",
        label: "Inscribirte y contratar con el régimen MYPE",
        detail: "Los ocho nuevos ingresan con los beneficios reducidos que permite el régimen especial.",
        effects: { fixedCostPct: -3, morale: -2, rounds: 4 },
        risk: {
          prob: 0.35,
          effects: { productivityPct: -4, rounds: 2 },
          text: "Los candidatos más calificados prefieren a la competencia, que ofrece beneficios completos.",
        },
        outcome:
          "Tu planilla nueva cuesta menos y todo está en regla. Dentro del equipo conviven ahora dos regímenes y las comparaciones entre compañeros son inevitables.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Seguir en el régimen general para atraer talento",
        detail: "Renuncias al ahorro y ofreces a los nuevos los mismos beneficios que a los antiguos.",
        effects: { fixedCostPct: 2, morale: 3, quality: 2, rounds: 4 },
        outcome:
          "Conseguiste buenos perfiles y un equipo con reglas parejas. El costo laboral más alto te obliga a vender más para sostener el mismo margen.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Cesar a los antiguos y recontratarlos con el régimen nuevo",
        detail: "Liquidas al personal actual y lo vuelves a contratar con menores beneficios.",
        effects: { fixedCostPct: -5, morale: -10, reputation: -6, rounds: 4 },
        risk: {
          prob: 0.55,
          effects: { cashPct: -10 },
          text: "SUNAFIL detecta el cese y la recontratación, que la norma no permite para recortar beneficios, y ordena reintegrar todo.",
        },
        outcome:
          "El ahorro en papel fue grande. Tus mejores trabajadores cobraron su liquidación y no volvieron, y los que regresaron lo hicieron con resentimiento.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Régimen MYPE con un bono por desempeño",
        detail:
          "Usas el régimen especial y destinas parte del ahorro a un bono variable que compensa a quien rinde.",
        effects: { fixedCostPct: -1, productivityPct: 3, morale: 2, rounds: 4 },
        outcome:
          "Tu oferta quedó competitiva frente al régimen general para quienes cumplen metas. El costo fijo bajó y el variable se paga solo cuando hay resultados.",
        verdict: "optima",
      },
    ],
    concept: "Régimen laboral de la micro y pequeña empresa",
    lesson:
      "El régimen MYPE reduce costos de forma legal, pero rige para nuevas contrataciones y no sirve para recortar derechos ya ganados. El ahorro debe pesarse contra tu capacidad de atraer y retener personal.",
  },
  {
    id: "lab-hostigamiento-sexual",
    title: "Denuncia contra el supervisor que más vende",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Una asistente presenta una queja por hostigamiento sexual contra el supervisor con mejores resultados de tu empresa. Hay mensajes de WhatsApp que la respaldan. Él lo niega y advierte que, si lo sancionas, se irá a la competencia con su cartera de clientes.",
    options: [
      {
        id: "a",
        label: "Activar el procedimiento y proteger a la denunciante",
        detail:
          "Dictas medidas de protección sin perjudicarla, investigas con el comité y sancionas según el resultado.",
        effects: { cashPct: -1, demandPct: -4, morale: 7, reputation: 6 },
        outcome:
          "La investigación confirmó la falta y el supervisor salió de la empresa. Perdiste algunos clientes de su cartera, y ganaste un equipo que ahora sabe que las reglas valen para todos.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Pedirles que lo arreglen conversando",
        detail: "Reúnes a ambos en tu oficina para que aclaren el malentendido y sigan trabajando.",
        effects: { morale: -8, reputation: -5 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -8, brand: -4, reputation: -8 },
          text: "La trabajadora denuncia ante SUNAFIL y el caso llega a redes sociales. Te sancionan por no investigar ni dictar medidas de protección.",
        },
        outcome:
          "Obligaste a la denunciante a sentarse frente a quien la hostigaba. Ella renunció al mes y otras dos trabajadoras decidieron no contar lo que también les había pasado.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Cambiar de área a la denunciante",
        detail: "La trasladas a otra sede para evitar roces y no tocas al supervisor.",
        effects: { morale: -6, reputation: -4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -6, reputation: -6 },
          text: "El traslado se considera una represalia contra quien denunció y agrava la sanción.",
        },
        outcome:
          "Las ventas del supervisor siguieron intactas. El mensaje para el resto fue claro: quien denuncia es quien termina pagando las consecuencias.",
        verdict: "mala",
      },
    ],
    concept: "Prevención del hostigamiento sexual laboral",
    lesson:
      "El empleador está obligado a investigar y proteger a quien denuncia, sin importar cuánto venda el denunciado. Tolerar el hostigamiento por resultados comerciales destruye clima, reputación y, al final, también ventas.",
  },
  {
    id: "lab-accidente-de-trabajo",
    title: "Accidente en el almacén",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Un trabajador de tu almacén en Piura se fractura la pierna al caer de una escalera en mal estado. No tienes registro de capacitaciones de seguridad. El supervisor te sugiere anotarlo como un accidente ocurrido fuera del trabajo para evitar una inspección.",
    options: [
      {
        id: "a",
        label: "Registrarlo como accidente fuera del trabajo",
        detail: "Pagas la atención por tu cuenta y pides al trabajador sostener esa versión.",
        effects: { cashPct: -1, morale: -8, reputation: -4 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -12, reputation: -10 },
          text: "La familia denuncia. Se comprueba el ocultamiento del accidente y la sanción llega junto con una demanda por daños.",
        },
        outcome:
          "Evitaste la inspección por ahora. La escalera sigue ahí, el equipo sabe lo que pasó de verdad y el trabajador quedó sin la cobertura que le correspondía.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Reportar, cubrir la atención y corregir los riesgos",
        detail:
          "Notificas el accidente, acompañas al trabajador, investigas las causas y cambias equipos y procedimientos.",
        effects: { cashPct: -4, productivityPct: 2, morale: 6, reputation: 4, rounds: 3 },
        outcome:
          "La investigación encontró otras tres condiciones inseguras que nadie había reportado. Corregirlas costó, pero bajaron los incidentes y las paradas.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Reportar el accidente y seguir operando igual",
        detail: "Cumples con el aviso y la atención médica, sin invertir en más cambios.",
        effects: { cashPct: -2, morale: -2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -8, morale: -5 },
          text: "Ocurre un segundo accidente por la misma causa y la reincidencia agrava la sanción.",
        },
        outcome:
          "Cumpliste con el trámite, pero trataste el accidente como mala suerte. La causa que lo produjo sigue presente en el almacén.",
        verdict: "riesgosa",
      },
    ],
    concept: "Seguridad y salud en el trabajo",
    lesson:
      "Un accidente es información sobre un riesgo que no se controló. Reportarlo e investigar sus causas protege a las personas y evita que se repita, mientras que ocultarlo suma una falta grave al problema original.",
  },
  {
    id: "lab-teletrabajo",
    title: "El equipo administrativo pide teletrabajo",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tus doce trabajadores administrativos en Lima piden trabajar desde casa tres días por semana, porque pierden casi tres horas diarias en transporte. Tu gerente desconfía: 'en casa nadie trabaja'. El alquiler de la oficina vence en dos meses.",
    options: [
      {
        id: "a",
        label: "Modelo híbrido con metas y oficina más pequeña",
        detail:
          "Acuerdas por escrito los días remotos, mides por resultados, compensas gastos de conexión y alquilas menos espacio.",
        effects: { cashPct: -1, fixedCostPct: -3, productivityPct: 3, morale: 6, rounds: 4 },
        outcome:
          "Los primeros meses exigieron aprender a fijar metas claras en lugar de vigilar sillas. El ahorro en alquiler cubrió de sobra la compensación de gastos.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Todos a la oficina, como siempre",
        detail: "Renuevas el alquiler y mantienes la asistencia presencial completa.",
        effects: { morale: -5 },
        risk: {
          prob: 0.4,
          effects: { productivityPct: -5, rounds: 2 },
          text: "Dos analistas con buen desempeño aceptan ofertas de empresas que sí permiten trabajo remoto.",
        },
        outcome:
          "Nada cambió en la operación. El pedido del equipo quedó sin respuesta y el tráfico de Lima sigue cobrándose tres horas diarias de su energía.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Teletrabajo total, sin acuerdo escrito ni metas",
        detail: "Cierras la oficina y cada quien trabaja desde casa con su propio equipo e internet.",
        effects: { fixedCostPct: -5, productivityPct: -4, morale: 2, rounds: 2 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -4, reputation: -3 },
          text: "Un trabajador reclama por los gastos de internet y equipos, y la inspección observa que no existe acuerdo de teletrabajo.",
        },
        outcome:
          "El ahorro en alquiler fue inmediato. Sin metas ni reglas de coordinación, las tareas se cruzaron y varios entregables salieron tarde.",
        verdict: "riesgosa",
      },
    ],
    concept: "Teletrabajo y gestión por resultados",
    lesson:
      "El teletrabajo funciona cuando se dirige por objetivos y no por presencia. Requiere acuerdo escrito, reglas de coordinación y definir quién asume los costos de equipos y conexión.",
  },
  {
    id: "lab-alta-rotacion",
    title: "Cada mes se va alguien",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "En el último año renunció casi la mitad de tu personal operativo. Cada salida te cuesta avisos, entrevistas, uniformes y semanas de aprendizaje. En las entrevistas de salida se repiten dos motivos: horarios que cambian a última hora y un supervisor que grita.",
    options: [
      {
        id: "a",
        label: "Subir 10 % el sueldo de todo el personal operativo",
        detail: "Apuestas a que un mejor pago hará que la gente se quede.",
        effects: { fixedCostPct: 4, morale: 4, rounds: 4 },
        outcome:
          "El aumento alegró al equipo un par de meses. La rotación bajó poco, porque la gente no se estaba yendo por el sueldo.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Fijar turnos con anticipación y trabajar con el supervisor",
        detail:
          "Publicas los horarios con dos semanas de anticipación y le das al supervisor formación y metas de trato al personal.",
        effects: { cashPct: -1, productivityPct: 5, morale: 7, rounds: 3 },
        outcome:
          "Atacaste las dos causas que tu propia gente te había dicho. Las renuncias bajaron a menos de la mitad y dejaste de entrenar personal nuevo todos los meses.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Asumir que el rubro es así y contratar más rápido",
        detail: "Tercerizas el reclutamiento para cubrir las vacantes en menos días.",
        effects: { cashPct: -2, fixedCostPct: 1, morale: -3, quality: -3, rounds: 4 },
        outcome:
          "Las vacantes se cubren más rápido y la puerta sigue girando. Tienes siempre un tercio del equipo aprendiendo, y tus clientes lo notan.",
        verdict: "mala",
      },
    ],
    concept: "Costo de la rotación de personal",
    lesson:
      "Reemplazar a un trabajador cuesta reclutamiento, entrenamiento y errores de aprendizaje. Antes de gastar, averigua por qué se van: muchas veces la causa es el jefe directo o el horario, no el sueldo.",
  },
  {
    id: "lab-contratar-familiares",
    title: "Tu cuñado necesita trabajo",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Se abre la plaza de jefe de almacén. Tu hermana te pide que contrates a su esposo, que está sin trabajo y no tiene experiencia en inventarios. Dentro de la empresa, una asistente con cuatro años en el área espera ese ascenso.",
    options: [
      {
        id: "a",
        label: "Contratar al cuñado como jefe de almacén",
        detail: "Resuelves el pedido familiar y confías en que aprenderá sobre la marcha.",
        effects: { productivityPct: -5, morale: -7, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -3, quality: -3 },
          text: "Los errores de inventario generan mermas y faltantes, y nadie se atreve a reportarlos porque el jefe es tu familia.",
        },
        outcome:
          "La asistente entrenó a su nuevo jefe durante un mes y luego aceptó trabajo en otra empresa. En los almuerzos familiares ya no se puede hablar del negocio.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Ascender a la asistente por concurso interno",
        detail: "Abres la plaza con criterios publicados y eliges por evaluación.",
        effects: { productivityPct: 4, morale: 6, rounds: 3 },
        outcome:
          "El almacén quedó en manos de quien mejor lo conocía y el equipo vio que ascender es posible. Tu hermana estuvo molesta unas semanas.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Darle un puesto de entrada con las mismas reglas",
        detail:
          "El cuñado ingresa como auxiliar, con periodo de prueba y evaluación como cualquiera, y la jefatura se define por mérito.",
        effects: { fixedCostPct: 1, morale: 2, rounds: 4 },
        outcome:
          "Ayudaste a tu familia sin saltarte a nadie. Sumaste un sueldo que no estaba en tus planes y dejaste claro que el apellido no reemplaza la evaluación.",
        verdict: "buena",
      },
    ],
    concept: "Meritocracia en la empresa familiar",
    lesson:
      "Contratar familiares no es malo en sí mismo. El problema aparece cuando entran sin el perfil, con reglas distintas o por encima de quien se ganó el puesto. Un protocolo familiar evita decidir bajo presión.",
  },
  {
    id: "lab-despido-bajo-rendimiento",
    title: "Un trabajador que ya no rinde",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Julio lleva seis años en la empresa y desde hace ocho meses no cumple sus metas. Nunca se le hizo una evaluación formal ni se le advirtió por escrito. Su jefa quiere despedirlo este viernes 'sin tanto trámite'.",
    options: [
      {
        id: "a",
        label: "Despedirlo el viernes sin procedimiento",
        detail: "Le entregas una carta de despido y su liquidación el mismo día.",
        effects: { productivityPct: 2, morale: -5 },
        risk: {
          prob: 0.55,
          effects: { cashPct: -7, reputation: -3 },
          text: "Julio demanda por despido arbitrario y, sin evaluaciones ni advertencias que mostrar, pagas la indemnización completa.",
        },
        outcome:
          "El problema desapareció del área en una tarde. El resto del equipo tomó nota de que en tu empresa un despido puede llegar sin aviso previo.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Plan de mejora con metas, plazo y seguimiento",
        detail:
          "Le comunicas por escrito qué debe mejorar, le das apoyo y un plazo razonable, y documentas los resultados.",
        effects: { cashPct: -1, productivityPct: 3, morale: 3, rounds: 2 },
        outcome:
          "Al conversar apareció la causa: un cambio de sistema que Julio nunca aprendió a usar. Con capacitación recuperó su nivel. Si no lo hubiera hecho, tenías el sustento para despedir.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Negociar una salida por mutuo acuerdo",
        detail: "Le ofreces un incentivo económico a cambio de firmar el cese voluntario.",
        effects: { cashPct: -3, morale: -1 },
        outcome:
          "Julio aceptó y se fue sin conflicto. Pagaste más que una liquidación simple, a cambio de cerrar el tema sin juicio ni incertidumbre.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Dejarlo como está para evitar el conflicto",
        detail: "Reasignas sus tareas pendientes a sus compañeros y no tocas el tema.",
        effects: { productivityPct: -4, morale: -4, rounds: 3 },
        outcome:
          "Sus compañeros cargan con su trabajo y cobran lo mismo. Los que más rinden empezaron a preguntarse para qué se esfuerzan.",
        verdict: "mala",
      },
    ],
    concept: "Gestión del desempeño",
    lesson:
      "Un despido por bajo rendimiento necesita evidencia: metas comunicadas, evaluaciones y oportunidad de mejorar. Medir y dar retroalimentación a tiempo resuelve muchos casos antes de llegar al despido.",
  },
  {
    id: "lab-practicantes",
    title: "Practicantes para cubrir puestos fijos",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Necesitas tres personas para atención y digitación. Tu administradora propone cubrir los puestos con practicantes de un instituto de Trujillo, porque cuestan menos que un trabajador en planilla. Harían jornada completa, sin tutor ni plan de aprendizaje.",
    options: [
      {
        id: "a",
        label: "Cubrir los tres puestos con practicantes",
        detail: "Entran a trabajar como uno más, sin plan formativo ni responsable asignado.",
        effects: { fixedCostPct: -3, quality: -3, rounds: 4 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -8, reputation: -5 },
          text: "La inspección concluye que no hay formación sino trabajo común, y reconoce a los practicantes como trabajadores con todos sus beneficios.",
        },
        outcome:
          "Los puestos se cubrieron gastando poco. Los practicantes rotan cada ciclo académico y cada vez empiezas de cero con el entrenamiento.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Dos trabajadores en planilla y un practicante con tutor",
        detail:
          "Los puestos fijos van a planilla y el practicante entra con convenio, plan de aprendizaje y un responsable.",
        effects: { fixedCostPct: 2, productivityPct: 2, morale: 3, quality: 2, rounds: 4 },
        outcome:
          "Pagaste más planilla de la que proponía tu administradora. A cambio tienes estabilidad en la atención y un practicante que podría quedarse como tu próximo contratado.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Convenio formal con el instituto para los tres",
        detail:
          "Firmas convenios, asignas tutor y aceptas que parte de su tiempo se dedica a aprender.",
        effects: { cashPct: -1, fixedCostPct: -1, productivityPct: -3, reputation: 2, rounds: 2 },
        outcome:
          "Todo quedó en regla y el instituto te envía buenos alumnos. La atención es más lenta de lo que esperabas, porque formar toma tiempo de tu personal.",
        verdict: "buena",
      },
    ],
    concept: "Modalidades formativas laborales",
    lesson:
      "Las prácticas existen para formar, no para abaratar puestos permanentes. Requieren convenio, plan de aprendizaje y tutor. Sin eso, la relación se considera laboral con todos sus costos.",
  },
  {
    id: "lab-bonos-por-metas",
    title: "El bono que premia lo que no querías",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Pusiste un bono individual por volumen de ventas. Las ventas subieron 18 %, pero también las devoluciones, los descuentos fuera de política y las peleas entre vendedores por los clientes. El margen del trimestre cayó a pesar de vender más.",
    options: [
      {
        id: "a",
        label: "Mantener el bono, las ventas mandan",
        detail: "Conservas el esquema actual y pides a los jefes controlar los excesos.",
        effects: { demandPct: 5, costPct: 3, morale: -4, satisfaction: -5, rounds: 2 },
        outcome:
          "El volumen siguió creciendo y el margen siguió cayendo. Tus vendedores hacen exactamente lo que el bono les paga por hacer.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Rediseñar el bono con margen, cobranza y satisfacción",
        detail:
          "El premio pasa a depender de ventas rentables y cobradas, con un componente de equipo.",
        effects: { cashPct: -1, demandPct: 2, costPct: -2, morale: 3, satisfaction: 4, rounds: 3 },
        outcome:
          "Las ventas crecieron menos que antes, pero con mejor margen y menos devoluciones. Dos vendedores que vivían del descuento fácil protestaron durante el primer mes.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Eliminar el bono y subir el sueldo fijo",
        detail: "Cambias el variable por un fijo más alto para terminar con las distorsiones.",
        effects: { demandPct: -5, fixedCostPct: 3, morale: 2, rounds: 2 },
        outcome:
          "Se acabaron las peleas por clientes y también el empuje de cierre de mes. Tu costo subió y dejó de depender de los resultados.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Poner un tope al bono para controlar el gasto",
        detail: "Nadie puede ganar en bonos más de un monto fijo por trimestre.",
        effects: { demandPct: -3, morale: -5, rounds: 2 },
        outcome:
          "Tus mejores vendedores llegaron al tope a mitad del trimestre y guardaron ventas para el siguiente. El problema de fondo, qué conducta se premia, quedó igual.",
        verdict: "mala",
      },
    ],
    concept: "Diseño de incentivos",
    lesson:
      "La gente hace lo que se mide y se premia. Un incentivo atado solo al volumen genera ventas sin margen, y por eso los indicadores del bono deben reflejar lo que de verdad crea valor.",
  },
  {
    id: "lab-encuesta-clima",
    title: "La encuesta de clima salió mal",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Aplicaste por primera vez una encuesta anónima de clima laboral. El resultado es duro: el equipo siente que nadie lo escucha, que los reconocimientos van siempre a los mismos y que se entera de los cambios por rumores. Varios jefes te piden no difundir los resultados.",
    options: [
      {
        id: "a",
        label: "Guardar los resultados y no comentarlos",
        detail: "Archivas el informe para no generar más ruido en el equipo.",
        effects: { morale: -6 },
        outcome:
          "El silencio confirmó lo que la encuesta decía: que nadie escucha. En la próxima medición casi nadie se tomará el trabajo de responder.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Compartir resultados y acordar tres acciones",
        detail:
          "Presentas los datos tal como salieron y eliges con el equipo pocas mejoras con responsable y fecha.",
        effects: { cashPct: -1, productivityPct: 4, morale: 8, rounds: 3 },
        outcome:
          "La reunión fue incómoda para varios jefes. Tres meses después habías cumplido las tres acciones y el equipo empezó a creer que responder la encuesta servía de algo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Organizar una fiesta de integración",
        detail: "Inviertes en un evento para levantar el ánimo, sin tocar los temas de la encuesta.",
        effects: { cashPct: -2, morale: 2 },
        outcome:
          "La fiesta estuvo buena y las fotos también. El lunes los cambios se siguieron comunicando por rumores y los reconocimientos fueron para los mismos.",
        verdict: "riesgosa",
      },
    ],
    concept: "Medición del clima laboral",
    lesson:
      "Medir el clima crea la expectativa de que algo va a cambiar. Preguntar y no actuar es peor que no preguntar, así que conviene comprometerse con pocas acciones y cumplirlas.",
  },
  {
    id: "lab-mandos-medios",
    title: "El mejor técnico, el peor jefe",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Ascendiste a Carlos a supervisor porque era tu mejor técnico. Seis meses después su equipo tiene el peor clima de la empresa: hace él mismo todo el trabajo difícil, no delega y corrige a gritos. Dos personas de su área ya pidieron traslado.",
    options: [
      {
        id: "a",
        label: "Devolverlo a su puesto anterior",
        detail: "Le retiras la supervisión y regresa a su cargo técnico con el sueldo de antes.",
        effects: { productivityPct: -3, morale: -2, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { quality: -5 },
          text: "Carlos vive el regreso como una humillación y renuncia. Pierdes al supervisor y a tu mejor técnico a la vez.",
        },
        outcome:
          "El equipo respiró aliviado. Carlos volvió a su puesto sin que nadie le explicara qué debió hacer distinto como jefe.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Formarlo en liderazgo con acompañamiento y metas",
        detail:
          "Le das capacitación, un mentor y seis meses con metas claras de delegación y clima en su equipo.",
        effects: { cashPct: -2, productivityPct: 4, morale: 5, rounds: 3 },
        outcome:
          "A Carlos nadie le había enseñado que dirigir es un oficio distinto. Le costó soltar las tareas, pero su equipo empezó a resolver sin esperar a que él lo hiciera todo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Crear una carrera técnica sin personal a cargo",
        detail:
          "Diseñas un puesto de especialista bien pagado para que crecer no obligue a ser jefe, y eliges supervisor por liderazgo.",
        effects: { cashPct: -1, fixedCostPct: 1, morale: 4, quality: 4, rounds: 4 },
        outcome:
          "Carlos aceptó el puesto de especialista con gusto. Ahora tienes dos caminos para crecer y dejaste de convertir buenos técnicos en jefes a la fuerza.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Dejar que aprenda solo con el tiempo",
        detail: "Confías en que la experiencia lo irá puliendo y no intervienes.",
        effects: { productivityPct: -4, morale: -6, rounds: 2 },
        outcome:
          "Los dos traslados se convirtieron en dos renuncias. Carlos sigue trabajando doce horas diarias, convencido de que su equipo no sirve.",
        verdict: "mala",
      },
    ],
    concept: "Liderazgo de mandos medios",
    lesson:
      "Ser bueno haciendo el trabajo no garantiza ser bueno dirigiendo a quienes lo hacen. Los mandos medios necesitan formación para delegar y dar retroalimentación, porque son quienes más pesan en el clima diario.",
  },
  {
    id: "lab-inclusion-discapacidad",
    title: "El mejor candidato usa silla de ruedas",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Para el puesto de analista, el candidato mejor evaluado es Andrés, que usa silla de ruedas. Tu oficina está en un segundo piso sin ascensor. El jefe del área prefiere al segundo candidato 'para no complicarse', aunque su puntaje fue bastante menor.",
    options: [
      {
        id: "a",
        label: "Contratar al segundo candidato",
        detail: "Evitas cualquier cambio en la oficina y cubres la vacante esta semana.",
        effects: { productivityPct: -2, reputation: -4, rounds: 3 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -5, brand: -3, reputation: -6 },
          text: "Andrés denuncia discriminación en el acceso al empleo y el caso se difunde en redes sociales.",
        },
        outcome:
          "La vacante se cubrió rápido con un perfil más débil. Quienes participaron en el proceso saben por qué se descartó al mejor evaluado.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Contratar a Andrés y adaptar el espacio",
        detail:
          "Reubicas el área en el primer piso o habilitas accesos para que trabaje en igualdad de condiciones.",
        effects: { cashPct: -2, productivityPct: 4, morale: 4, reputation: 5, rounds: 3 },
        outcome:
          "La adaptación costó menos de lo que el jefe del área imaginaba. Andrés rindió como prometía su evaluación y el acceso mejorado sirvió también a clientes y proveedores.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Contratar a Andrés en teletrabajo permanente",
        detail: "Evitas la obra: trabajaría siempre desde casa y se conectaría a las reuniones.",
        effects: { productivityPct: 3, morale: 1, reputation: 2, rounds: 3 },
        outcome:
          "Andrés rindió muy bien, pero quedó fuera de las conversaciones de pasillo y de las oportunidades de ascenso. Resolviste el acceso al puesto, no la inclusión.",
        verdict: "buena",
      },
    ],
    concept: "Ajustes razonables e inclusión laboral",
    lesson:
      "Descartar al mejor candidato por una barrera física es discriminación y también mala gestión. Los ajustes razonables suelen costar poco frente al valor del talento que permiten incorporar.",
  },
  {
    id: "lab-capacitacion-y-fuga",
    title: "Capacitas y la competencia se lo lleva",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Pagaste una certificación costosa a dos especialistas. A los tres meses, uno se fue a la competencia por un sueldo mayor. Ahora otros cuatro piden la misma certificación y tu socio dice que capacitar es regalarle plata al rival.",
    options: [
      {
        id: "a",
        label: "Suspender toda capacitación costosa",
        detail: "Solo financias cursos cortos y baratos para no volver a perder la inversión.",
        effects: { cashPct: 1, productivityPct: -3, morale: -5, quality: -4, rounds: 3 },
        outcome:
          "Ahorraste el presupuesto de formación. Tu equipo se fue quedando atrás frente al mercado y los más ambiciosos buscaron empresas donde sí pudieran crecer.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Capacitar con pacto de permanencia y plan de carrera",
        detail:
          "Si el trabajador se va antes de un plazo razonable devuelve parte del costo, y al certificarse accede a un mejor puesto.",
        effects: { cashPct: -3, productivityPct: 5, morale: 4, quality: 5, rounds: 4 },
        outcome:
          "Los cuatro firmaron sin problema, porque el acuerdo también les ofrecía algo a ellos. La certificación vino con nuevas responsabilidades y un ajuste de sueldo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Capacitar a todos sin condiciones",
        detail: "Confías en que el buen trato basta para que se queden.",
        effects: { cashPct: -4, productivityPct: 4, morale: 5, quality: 5, rounds: 3 },
        risk: {
          prob: 0.45,
          effects: { productivityPct: -5, rounds: 2 },
          text: "Dos de los recién certificados reciben ofertas y se van antes de que recuperes la inversión.",
        },
        outcome:
          "El equipo agradeció la confianza y el nivel técnico subió. Certificados y con el mismo sueldo de antes, tus especialistas quedaron más atractivos para el mercado.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Contratar gente ya certificada pagando más",
        detail: "Dejas de formar y compras el talento hecho en el mercado.",
        effects: { fixedCostPct: 3, morale: -4, quality: 3, rounds: 4 },
        outcome:
          "Los nuevos llegaron rindiendo desde el primer día y cobrando más que tus antiguos. Quienes pidieron la certificación entendieron que para crecer tendrían que irse.",
        verdict: "riesgosa",
      },
    ],
    concept: "Retorno de la inversión en capacitación",
    lesson:
      "El riesgo de capacitar a alguien que se va es menor que el de no capacitar a alguien que se queda. La inversión se protege con pactos de permanencia razonables y con una carrera que dé motivos para quedarse.",
  },
  {
    id: "lab-contratos-temporales",
    title: "Contratos temporales que se renuevan por años",
    category: "laboral",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Tienes quince trabajadores con contratos 'por incremento de actividad' que renuevas cada tres meses desde hace cuatro años. Hacen labores permanentes. Eso te da flexibilidad para no renovar a quien no rinde, pero tu abogada advierte que esos contratos no resistirían una inspección.",
    options: [
      {
        id: "a",
        label: "Seguir renovando cada tres meses",
        detail: "Mantienes el esquema que te ha funcionado hasta ahora.",
        effects: { morale: -4 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -9, reputation: -5 },
          text: "No renuevas a una trabajadora, ella demanda y el juez declara que su contrato era indeterminado. Ordena reponerla y el caso anima a otros.",
        },
        outcome:
          "Nada cambió en tus costos. Tu gente sigue sin poder sacar un crédito ni planificar más allá de tres meses, y trabaja con un ojo en otras ofertas.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Pasar a plazo indeterminado los puestos permanentes",
        detail:
          "Reconoces la estabilidad de esos puestos y reservas el contrato temporal para necesidades realmente temporales.",
        effects: { fixedCostPct: 1, productivityPct: 4, morale: 8, reputation: 3, rounds: 4 },
        outcome:
          "Perdiste la salida fácil de no renovar y ganaste un equipo que dejó de buscar trabajo. Ahora la herramienta para el bajo rendimiento es evaluar, no esperar el vencimiento.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Trasladar a todos a una empresa de intermediación",
        detail: "Pasas al personal a un tercero que te lo destaca, para sacar el riesgo de tu planilla.",
        effects: { fixedCostPct: 2, morale: -7, quality: -3, rounds: 4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -8, reputation: -5 },
          text: "La inspección determina que son labores principales y permanentes, y te reconoce como empleador directo.",
        },
        outcome:
          "Pagas el sueldo de siempre más la comisión del tercero. Tu gente hace el mismo trabajo con otro logo en la boleta y menos compromiso con tu empresa.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Estabilizar por etapas según antigüedad y desempeño",
        detail: "Armas un cronograma de un año y empiezas por los casos más antiguos.",
        effects: { fixedCostPct: 1, productivityPct: 2, morale: 4, rounds: 3 },
        risk: {
          prob: 0.2,
          effects: { cashPct: -4 },
          text: "Un trabajador que quedó para la última etapa no espera y presenta una demanda.",
        },
        outcome:
          "El cambio fue ordenado y tu caja lo absorbió sin sobresaltos. Durante el año de transición mantuviste parte de la contingencia abierta.",
        verdict: "buena",
      },
    ],
    concept: "Contratos sujetos a modalidad",
    lesson:
      "Los contratos temporales requieren una causa real y tienen plazos máximos. Usarlos para labores permanentes los desnaturaliza y el trabajador pasa a ser estable, con el costo de haber fingido lo contrario.",
  },

  // ===== FINANZAS (26) =====
  {
    id: "fin-cliente-moroso",
    title: "Tu cliente más grande no paga",
    category: "finanzas",
    industries: "all",
    market: "B2B",
    tier: 1,
    situation:
      "Una empresa que representa el 25 % de tus ventas te debe tres facturas vencidas hace 60 días. Su gerente te pide paciencia y, al mismo tiempo, quiere hacer un pedido nuevo todavía más grande. Tú necesitas ese dinero para pagar la planilla.",
    options: [
      {
        id: "a",
        label: "Atender el nuevo pedido para no perder al cliente",
        detail: "Despachas al crédito como siempre y confías en que pronto se pondrá al día.",
        effects: { cashPct: -4, demandPct: 5 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -10 },
          text: "El cliente entra en problemas serios y la deuda, ahora más grande, se vuelve casi incobrable.",
        },
        outcome:
          "Tus ventas del trimestre se ven muy bien en el reporte. En el banco, en cambio, tienes más dinero en la calle y el mismo problema para pagar la planilla.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Cronograma firmado y pedidos nuevos contra pago",
        detail:
          "Negocias un calendario de pagos de lo vencido y atiendes pedidos nuevos solo al contado o con adelanto.",
        effects: { cashPct: 4, demandPct: -3 },
        outcome:
          "El cliente protestó, pero firmó. Recuperaste parte de la deuda en el trimestre y dejaste de financiar con tu caja los problemas de otra empresa.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Cortar la relación e iniciar cobranza judicial",
        detail: "Suspendes todo despacho y entregas el caso a un abogado.",
        effects: { cashPct: -2, demandPct: -8, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: 5 },
          text: "Tras varios meses, el proceso termina en un acuerdo y recuperas buena parte de la deuda.",
        },
        outcome:
          "Perdiste a tu cliente más grande de un día para otro y sumaste gastos legales. Saltaste a la última etapa de la cobranza sin pasar por las anteriores.",
        verdict: "riesgosa",
      },
    ],
    concept: "Gestión de cuentas por cobrar",
    lesson:
      "Una venta no termina hasta que se cobra. Seguir despachando a quien no paga aumenta la pérdida posible, y depender de un solo cliente te quita fuerza para cobrarle.",
  },
  {
    id: "fin-factoring",
    title: "Facturas a 90 días y planilla en 15",
    category: "finanzas",
    industries: "all",
    market: "B2B",
    tier: 2,
    situation:
      "Le vendes a una cadena grande que paga puntual, pero a 90 días. Tienes facturas por cobrar equivalentes a dos meses de ventas y en quince días vence la planilla. Una empresa de factoring ofrece adelantarte el dinero de esas facturas a cambio de un descuento.",
    options: [
      {
        id: "a",
        label: "Ceder las facturas a la empresa de factoring",
        detail: "Recibes hoy la mayor parte del monto y pagas un descuento por el adelanto.",
        effects: { cashPct: -1.5, morale: 2 },
        outcome:
          "En pocos días tenías el dinero en cuenta. El costo dependió más de la solvencia de tu cliente que de la tuya, y no ocupaste tu línea de crédito.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Pedir al banco un préstamo de capital de trabajo",
        detail: "Solicitas un crédito a seis meses, con evaluación y garantías.",
        effects: { cashPct: -2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -1, morale: -5 },
          text: "El desembolso se demora y pagas la planilla con una semana de retraso, usando sobregiro.",
        },
        outcome:
          "El banco aprobó el crédito después de revisar tus estados financieros. Quedaste con una deuda a seis meses para cubrir una necesidad de noventa días.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Atrasar la planilla hasta que pague el cliente",
        detail: "Explicas al personal que el dinero existe, pero todavía no llega.",
        effects: { productivityPct: -4, morale: -8, reputation: -3 },
        outcome:
          "Tu equipo tiene alquileres y cuotas que no esperan noventa días. Financiaste a una cadena grande con el sueldo de tus trabajadores.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Ofrecer al cliente una rebaja por pagar en 30 días",
        detail: "Propones un descuento en la factura a cambio de cobrar antes.",
        effects: { cashPct: -2.5 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -1, morale: -4 },
          text: "El área de pagos de la cadena no modifica sus plazos y pierdes días valiosos esperando respuesta.",
        },
        outcome:
          "La propuesta tuvo que subir hasta la gerencia financiera de la cadena. Negociar plazos con un cliente grande toma más tiempo del que tenías.",
        verdict: "riesgosa",
      },
    ],
    concept: "Factoring y factura negociable",
    lesson:
      "El factoring convierte cuentas por cobrar en efectivo sin generar deuda bancaria. Su costo debe compararse con las otras fuentes de financiamiento y con el costo de no tener liquidez.",
  },
  {
    id: "fin-caja-municipal-o-banco",
    title: "Caja municipal o banco",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Necesitas un préstamo para comprar equipos. Una caja municipal de Arequipa te aprueba en tres días con una tasa más alta. Un banco ofrece una tasa menor, pero pide más documentos, cobra seguros y comisiones, y demora tres semanas. El proveedor mantiene su precio solo quince días.",
    options: [
      {
        id: "a",
        label: "Tomar el crédito de la caja por la rapidez",
        detail: "Aceptas la tasa más alta para asegurar el precio del proveedor.",
        effects: { cashPct: -3, productivityPct: 4, rounds: 3 },
        outcome:
          "Compraste los equipos dentro del plazo. Pagarás más intereses que con el banco, un costo que aceptaste sin saber exactamente cuánto era.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Comparar la TCEA de ambos y negociar",
        detail:
          "Pides a cada entidad el costo total con seguros y comisiones, y usas la mejor oferta para pedir mejoras a la otra.",
        effects: { cashPct: -2, productivityPct: 4, rounds: 3 },
        outcome:
          "Al sumar seguros y comisiones, la diferencia entre ambas ofertas era menor de lo que parecía. Con la cotización del banco en la mano, la caja mejoró su tasa y desembolsó a tiempo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Elegir el banco porque su tasa es la más baja",
        detail: "Inicias el trámite más largo confiando en llegar a tiempo.",
        effects: { cashPct: -2.5, productivityPct: 4, rounds: 3 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -2 },
          text: "El desembolso llega después del plazo del proveedor y compras los equipos a un precio mayor.",
        },
        outcome:
          "La tasa anunciada era la más baja. Al final del trámite aparecieron el seguro de desgravamen y las comisiones, que acercaron el costo real al de la caja.",
        verdict: "riesgosa",
      },
    ],
    concept: "Tasa de costo efectivo anual (TCEA)",
    lesson:
      "La tasa de interés no es el costo del crédito. La TCEA incluye intereses, seguros y comisiones, y es el único número que permite comparar ofertas. El tiempo de desembolso también tiene un costo.",
  },
  {
    id: "fin-gota-a-gota",
    title: "Plata al instante, sin papeles",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Te falta efectivo para pagar a un proveedor mañana. Un prestamista informal te ofrece el dinero hoy mismo, sin papeles ni garantías, con cobro diario durante un mes. Haces la cuenta y el interés equivale a varias veces lo que cobra cualquier caja.",
    options: [
      {
        id: "a",
        label: "Aceptar el préstamo gota a gota",
        detail: "Recibes el efectivo en una hora y pagas una cuota cada día.",
        effects: { cashPct: -4 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -8, morale: -6, reputation: -3 },
          text: "Te atrasas dos cuotas. Llegan las amenazas al local y a tu familia, y la deuda crece con penalidades inventadas.",
        },
        outcome:
          "Pagaste al proveedor a tiempo. Desde entonces un cobrador en moto pasa todos los días por tu local y la cuota diaria se lleva lo primero que entra a caja.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Pedir unos días al proveedor y tramitar crédito formal",
        detail: "Llamas al proveedor, explicas el retraso y en paralelo solicitas un préstamo en una caja.",
        effects: { cashPct: -1, costPct: 1 },
        outcome:
          "El proveedor aceptó esperar una semana y te retiró el descuento de esa compra. El crédito salió en cuatro días, a una tasa que tu negocio sí puede pagar.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rematar parte de lo que vendes para juntar efectivo",
        detail: "Ofreces una promoción agresiva por 48 horas, solo con pago inmediato.",
        effects: { cashPct: -2, brand: -2 },
        outcome:
          "Juntaste el efectivo sacrificando margen. Algunos clientes ahora preguntan cuándo será el próximo remate antes de comprar a precio normal.",
        verdict: "buena",
      },
    ],
    concept: "Costo y riesgo del crédito informal",
    lesson:
      "El crédito informal parece fácil porque no pide papeles, pero su costo es impagable para casi cualquier negocio y el cobro no respeta ninguna ley. Un retraso negociado con el proveedor casi siempre sale más barato.",
    basedOn:
      "Expansión de los préstamos gota a gota y de las extorsiones asociadas en ciudades de Perú, Colombia y Ecuador.",
  },
  {
    id: "fin-descalce-de-caja",
    title: "Ganas plata, pero no tienes caja",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu estado de resultados muestra utilidad, pero la cuenta corriente está casi en cero. Cobras a tus clientes a 60 días, pagas a tus proveedores a 15 y mantienes existencias para 45 días. Cada vez que vendes más, el hueco crece.",
    options: [
      {
        id: "a",
        label: "Renegociar plazos: cobrar antes y pagar después",
        detail:
          "Pides a proveedores 30 a 45 días y ofreces a clientes incentivos por pagar en menos tiempo.",
        effects: { cashPct: 3, costPct: 1, rounds: 2 },
        outcome:
          "No todos los proveedores aceptaron y algunos ajustaron un poco sus precios. Aun así acortaste el ciclo varias semanas y la caja dejó de depender del banco.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Cubrir el hueco con una línea de crédito",
        detail: "Financias la diferencia de plazos con deuda de corto plazo de forma permanente.",
        effects: { cashPct: -2, fixedCostPct: 1, rounds: 4 },
        outcome:
          "La caja se estabilizó y los pagos salen a tiempo. El descalce sigue ahí, solo que ahora pagas intereses todos los meses por sostenerlo.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Vender más para que entre más dinero",
        detail: "Lanzas una campaña comercial para subir el volumen con las mismas condiciones.",
        effects: { cashPct: -5, demandPct: 6, rounds: 2 },
        outcome:
          "Vendiste más y el hueco se agrandó. Cada venta nueva te obliga a comprar y pagar hoy lo que recién cobrarás dentro de dos meses.",
        verdict: "mala",
      },
    ],
    concept: "Ciclo de conversión de efectivo",
    lesson:
      "Utilidad no es lo mismo que caja. El ciclo de conversión de efectivo suma los días de inventario y de cobranza y resta los días de pago a proveedores. Mientras más largo, más financiamiento necesitas.",
  },
  {
    id: "fin-pedido-grande-capital-trabajo",
    title: "El pedido grande que puede quebrarte",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Una cadena con sede en Santiago de Chile quiere comprarte el triple de tu venta mensual, con pago a 90 días. Para cumplir debes pagar ahora insumos, personal adicional y fletes. El margen es bueno, pero tu caja cubre apenas la operación normal.",
    options: [
      {
        id: "a",
        label: "Aceptar todo y financiarlo con sobregiro",
        detail: "Tomas el pedido completo y cubres los gastos con lo que el banco te permita girar.",
        effects: { cashPct: -8, demandPct: 15 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -8, satisfaction: -4 },
          text: "El cliente paga con 30 días de retraso, el sobregiro se come el margen y descuidas a tus clientes habituales.",
        },
        outcome:
          "Cumpliste el pedido trabajando al límite. Durante tres meses toda tu empresa dependió de que un solo cliente pagara en la fecha prometida.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Pedir 40 % de adelanto y entregar por etapas",
        detail: "Condicionas el pedido a un pago inicial y a cobrar cada entrega antes de producir la siguiente.",
        effects: { cashPct: -2, demandPct: 10, rounds: 2 },
        risk: {
          prob: 0.3,
          effects: { demandPct: -6 },
          text: "El cliente no acepta dar adelanto y reduce el pedido a la mitad.",
        },
        outcome:
          "El adelanto financió los insumos y cada entrega pagó la siguiente. Creciste al ritmo que tu caja podía sostener.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rechazar el pedido por prudencia",
        detail: "Prefieres no arriesgar la operación que ya funciona.",
        effects: { brand: -1 },
        outcome:
          "Tu caja siguió tranquila. La cadena firmó con un competidor que supo negociar las condiciones en lugar de decir que no.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Financiarlo con un crédito respaldado en la orden",
        detail: "Presentas la orden de compra al banco para obtener un préstamo específico para ese pedido.",
        effects: { cashPct: -4, demandPct: 15 },
        outcome:
          "El banco financió el pedido contra la orden de compra de un cliente solvente. Los intereses redujeron tu margen, pero tu caja normal no se tocó.",
        verdict: "buena",
      },
    ],
    concept: "Necesidad de capital de trabajo al crecer",
    lesson:
      "Crecer consume caja antes de generarla. Muchas empresas rentables quiebran por aceptar ventas que no pueden financiar. Antes de decir que sí, calcula cuánto capital de trabajo exige el pedido y quién lo pone.",
  },
  {
    id: "fin-leasing-o-compra",
    title: "Leasing o compra al contado",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Necesitas renovar un equipo clave que cuesta el equivalente a un mes de ventas. Tienes el efectivo justo para comprarlo al contado. Un banco te ofrece un leasing a 36 meses con opción de compra al final.",
    options: [
      {
        id: "a",
        label: "Comprar al contado y no deber nada",
        detail: "Usas casi toda tu caja disponible y evitas pagar intereses.",
        effects: { cashPct: -6, productivityPct: 5, rounds: 4 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -3 },
          text: "Surge un imprevisto, no tienes colchón y terminas cubriéndolo con sobregiro.",
        },
        outcome:
          "El equipo es tuyo desde el primer día y no pagas intereses. Tu caja quedó en el mínimo y cualquier atraso de un cliente te complica el mes.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Tomar el leasing y conservar la caja",
        detail: "Pagas cuotas mensuales durante tres años y ejerces la opción de compra al final.",
        effects: { cashPct: -2, fixedCostPct: 2, productivityPct: 5, rounds: 4 },
        outcome:
          "El equipo se paga con lo que él mismo ayuda a producir. Pagarás intereses, a cambio de conservar liquidez y de ventajas tributarias que tu contador supo aprovechar.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Seguir con el equipo viejo un año más",
        detail: "Postergas la inversión y refuerzas el mantenimiento.",
        effects: { costPct: 2, quality: -3, rounds: 4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, satisfaction: -4 },
          text: "El equipo falla en plena campaña y la reparación de emergencia sale cara.",
        },
        outcome:
          "No gastaste en el equipo nuevo. Sí gastaste en repuestos, paradas y reprocesos, que no aparecen como inversión pero salen de la misma caja.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Alquilar el equipo mes a mes",
        detail: "Pagas un alquiler sin compromiso de compra ni plazo largo.",
        effects: { fixedCostPct: 3, productivityPct: 5, rounds: 4 },
        outcome:
          "Tienes flexibilidad para devolver el equipo cuando quieras. Al cabo de tres años habrás pagado más que con el leasing y el equipo no será tuyo.",
        verdict: "buena",
      },
    ],
    concept: "Leasing financiero",
    lesson:
      "Los activos de larga vida se financian con recursos de largo plazo. El leasing permite usar el equipo sin vaciar la caja, y la comparación con la compra debe incluir intereses, impuestos y el valor de la liquidez.",
  },
  {
    id: "fin-deuda-en-dolares",
    title: "Vendes en soles y debes en dólares",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Hace un año tomaste un préstamo en dólares porque la tasa era menor. Todos tus ingresos son en soles. En las últimas semanas el dólar subió con fuerza por la incertidumbre política y tu cuota mensual, medida en soles, ya es bastante más cara.",
    options: [
      {
        id: "a",
        label: "Esperar a que el dólar baje",
        detail: "Sigues pagando las cuotas al tipo de cambio del día.",
        effects: { cashPct: -1 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -6 },
          text: "El tipo de cambio sigue subiendo y tu deuda, medida en soles, crece todavía más.",
        },
        outcome:
          "Decidiste no decidir. Tu resultado financiero depende ahora de una variable que ni los analistas del BCRP se animan a predecir.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Convertir la deuda a soles con una tasa mayor",
        detail: "Refinancias el saldo en la misma moneda de tus ingresos.",
        effects: { cashPct: -2, fixedCostPct: 1, rounds: 4 },
        outcome:
          "Asumiste la pérdida cambiaria acumulada y una tasa más alta. Desde ahora tu cuota es la misma todos los meses, sin importar lo que pase con el dólar.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Comprar hoy los dólares de las próximas seis cuotas",
        detail: "Usas parte de tu caja para asegurar el tipo de cambio de medio año.",
        effects: { cashPct: -3 },
        outcome:
          "Aseguraste seis meses de tranquilidad con dinero que ya no puedes usar en el negocio. El saldo que vence después sigue expuesto al tipo de cambio.",
        verdict: "buena",
      },
    ],
    concept: "Descalce de monedas",
    lesson:
      "Endeudarse en una moneda distinta a la de tus ingresos agrega un riesgo que la tasa más baja no muestra. La regla básica es deber en la misma moneda en la que cobras.",
  },
  {
    id: "fin-cobertura-forward",
    title: "Fijar hoy el dólar de dentro de 90 días",
    category: "finanzas",
    industries: ["maquinaria", "autos", "farmacia", "moda", "ecommerce", "telecom"],
    market: "all",
    tier: 3,
    situation:
      "En 90 días debes pagar a tu proveedor de Asia una importación en dólares que equivale a un mes de tus ventas. Tus precios de venta en soles ya están pactados. El banco te ofrece un forward para fijar hoy el tipo de cambio de esa fecha.",
    options: [
      {
        id: "a",
        label: "Contratar el forward por todo el monto",
        detail: "Pactas con el banco el tipo de cambio al que comprarás los dólares en 90 días.",
        effects: { cashPct: -1 },
        outcome:
          "El tipo de cambio pactado fue algo mayor que el del día. A cambio, conociste tu margen desde el inicio y dejaste de revisar la cotización cada mañana.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "No cubrirse y comprar dólares el día del pago",
        detail: "Esperas al vencimiento y compras al tipo de cambio que haya.",
        effects: {},
        risk: {
          prob: 0.5,
          effects: { cashPct: -6 },
          text: "El dólar sube en esos tres meses y la importación cuesta bastante más soles de lo presupuestado.",
        },
        outcome:
          "No pagaste nada por cubrirte. Durante noventa días, tu margen en esa operación dependió de noticias que no controlas.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Cubrir la mitad y dejar la otra mitad libre",
        detail: "Fijas el tipo de cambio de una parte del pago y esperas con el resto.",
        effects: { cashPct: -0.5 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -3 },
          text: "El dólar sube y la mitad sin cobertura te cuesta más de lo presupuestado.",
        },
        outcome:
          "Redujiste la exposición a la mitad. Es una posición intermedia válida si tu margen soporta el movimiento de la parte descubierta.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Comprar hoy los dólares con un préstamo en soles",
        detail: "Te endeudas en soles, compras los dólares ahora y los guardas hasta el pago.",
        effects: { cashPct: -2.5 },
        outcome:
          "Eliminaste el riesgo cambiario, pero pagaste tres meses de intereses y ocupaste una línea de crédito que pudo servir para otra necesidad.",
        verdict: "buena",
      },
    ],
    concept: "Cobertura cambiaria con forward",
    lesson:
      "Cubrirse no busca ganar con el tipo de cambio, sino dejar de depender de él. El forward fija hoy el precio de una operación futura y permite que el negocio gane por lo que vende, no por apostar al dólar.",
  },
  {
    id: "fin-descuento-pronto-pago",
    title: "2 % de descuento por pagar en 10 días",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu principal proveedor ofrece 2 % de descuento si pagas a 10 días en lugar de los 45 habituales. Tienes caja disponible en la cuenta corriente, que pensabas guardar como colchón. Tu línea de crédito en la caja municipal cuesta alrededor de 2 % mensual.",
    options: [
      {
        id: "a",
        label: "Pagar a 10 días con tu caja y tomar el descuento",
        detail: "Usas el efectivo disponible para adelantar el pago en cada compra.",
        effects: { costPct: -2, rounds: 2 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -2 },
          text: "Un imprevisto te encuentra con menos colchón y debes usar la línea de crédito unas semanas.",
        },
        outcome:
          "Ganar 2 % por adelantar el pago 35 días equivale a una tasa anual superior al 20 %. Ningún depósito le habría pagado eso a tu caja ociosa.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Pagar a 45 días y conservar el colchón",
        detail: "Mantienes el plazo habitual y tu liquidez completa.",
        effects: {},
        outcome:
          "Conservaste tu liquidez intacta. Financiarte con el proveedor te costó el descuento que dejaste pasar, mientras tu dinero dormía en la cuenta corriente.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Usar la línea de crédito para tomar el descuento",
        detail: "Guardas tu caja y pagas al proveedor con dinero prestado.",
        effects: { cashPct: -2.5, costPct: -2, rounds: 2 },
        outcome:
          "Lo que ahorraste con el descuento se fue en intereses. Con un crédito al 2 % mensual, un descuento de 2 % por 35 días no alcanza a cubrir el costo.",
        verdict: "riesgosa",
      },
    ],
    concept: "Costo financiero del crédito de proveedores",
    lesson:
      "El crédito del proveedor no es gratis cuando existe un descuento por pronto pago. Convierte el descuento en una tasa anual y compárala con lo que te cuesta o te rinde el dinero.",
  },
  {
    id: "fin-dividendos-o-reinversion",
    title: "El mejor año: ¿repartir o reinvertir?",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "La empresa cerró su mejor año. Tus dos socios quieren repartir toda la utilidad, porque llevan tres años sin recibir nada. Tú tienes un proyecto de ampliación con buen retorno esperado y una deuda cara que vence en ocho meses.",
    options: [
      {
        id: "a",
        label: "Repartir toda la utilidad",
        detail: "Distribuyes el total entre los socios según su participación.",
        effects: { cashPct: -10 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -4 },
          text: "Llega el vencimiento de la deuda sin caja suficiente y refinancias a una tasa peor.",
        },
        outcome:
          "Los socios quedaron contentos y la empresa, sin reservas. La ampliación se quedó en el cajón y un competidor ocupó el espacio que tenías en la mira.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Reinvertir todo y no repartir nada",
        detail: "Destinas la utilidad completa a la ampliación y al pago de la deuda.",
        effects: { cashPct: -4, productivityPct: 5, rounds: 4 },
        risk: {
          prob: 0.4,
          effects: { morale: -4 },
          text: "Un socio, molesto, pide vender su parte y la negociación distrae a la gerencia durante meses.",
        },
        outcome:
          "La empresa quedó más fuerte y tus socios, más impacientes. Cuatro años sin recibir nada pone a prueba la paciencia de cualquier inversionista.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Acordar una política: repartir 30 % y reinvertir 70 %",
        detail:
          "Fijas por escrito qué parte de la utilidad se distribuye cada año y qué parte financia el crecimiento.",
        effects: { cashPct: -5, productivityPct: 4, reputation: 2, rounds: 4 },
        outcome:
          "Nadie obtuvo todo lo que quería. Los socios recibieron su primer dividendo y saben qué esperar cada año, y la ampliación arrancó con recursos propios.",
        verdict: "optima",
      },
    ],
    concept: "Política de dividendos",
    lesson:
      "Conviene reinvertir cuando la empresa rinde más que lo que el socio obtendría por su cuenta. Una política de dividendos acordada de antemano evita discutirlo cada año con la utilidad sobre la mesa.",
  },
  {
    id: "fin-socio-inversionista",
    title: "Un inversionista quiere el 40 % de tu empresa",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Un inversionista de Bogotá ofrece capital fresco equivalente a varios meses de tus ventas a cambio del 40 % de las acciones y dos de los cinco puestos del directorio. Con ese dinero podrías abrir dos regiones. Nunca has valorizado formalmente tu empresa.",
    options: [
      {
        id: "a",
        label: "Aceptar la oferta tal como está",
        detail: "Firmas rápido para no enfriar el interés del inversionista.",
        effects: { cashPct: 20 },
        risk: {
          prob: 0.4,
          effects: { productivityPct: -3, morale: -4, rounds: 2 },
          text: "El nuevo socio exige resultados cada trimestre y frena decisiones clave. Descubres tarde que cediste más de lo que valía su aporte.",
        },
        outcome:
          "El dinero entró y la expansión arrancó. Aceptaste el precio que puso el comprador, sin saber cuánto valía lo que estabas vendiendo.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Valorizar la empresa y negociar con esos números",
        detail:
          "Encargas una valorización independiente, defines cuánto capital necesitas y negocias porcentaje y derechos.",
        effects: { cashPct: 12, reputation: 2 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -12.5 },
          text: "El inversionista no acepta la nueva valorización y se retira de la negociación.",
        },
        outcome:
          "La valorización mostró que el aporte ofrecido correspondía a un porcentaje bastante menor. Cerraste por menos acciones y con un pacto de accionistas que ordena las decisiones.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rechazar y crecer con deuda bancaria",
        detail: "Mantienes toda la propiedad y financias una región con un préstamo.",
        effects: { cashPct: -2, demandPct: 4, fixedCostPct: 2, rounds: 4 },
        outcome:
          "Conservaste el 100 % de las acciones y el control. Abriste una región en lugar de dos, con cuotas que debes pagar aunque la apertura demore en despegar.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Rechazar y crecer solo con utilidades",
        detail: "No aceptas socios ni deuda, y te expandes cuando la caja lo permita.",
        effects: { brand: -2 },
        outcome:
          "Sigues siendo el único dueño de una empresa que crece despacio. Un competidor con capital abrió primero en las regiones que tenías en la mira.",
        verdict: "riesgosa",
      },
    ],
    concept: "Dilución y valorización de la empresa",
    lesson:
      "Recibir capital significa vender parte de la empresa, y no se puede negociar un precio sin conocer el valor. Además del porcentaje, importan los derechos de control que se ceden.",
  },
  {
    id: "fin-sobregiro-costumbre",
    title: "El sobregiro se volvió costumbre",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Desde hace cinco meses tu cuenta corriente cierra en negativo la última semana del mes. El banco cubre el saldo con sobregiro y cobra una de sus tasas más altas. Tu administrador dice que es normal, porque 'siempre se regulariza cuando pagan los clientes'.",
    options: [
      {
        id: "a",
        label: "Seguir usando el sobregiro cuando haga falta",
        detail: "Lo tratas como una línea automática que no exige trámites.",
        effects: { cashPct: -3 },
        outcome:
          "Cada mes pagaste intereses y comisiones sin que nadie los presupuestara. Sumados en el año, equivalen a un gasto que habrías discutido mucho antes de aprobar.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Tramitar una línea formal y proyectar la caja",
        detail:
          "Reemplazas el sobregiro por una línea más barata y armas un flujo de caja semanal para anticipar los huecos.",
        effects: { cashPct: -1 },
        outcome:
          "El flujo semanal mostró que el hueco aparecía siempre en las mismas fechas. Moviste dos pagos, usaste la línea solo unos días y el costo financiero bajó a una fracción.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Adelantar cobros con una rebaja a clientes",
        detail: "Ofreces un pequeño descuento a quienes paguen antes de la última semana.",
        effects: { cashPct: -1.5, satisfaction: 1 },
        outcome:
          "Varios clientes aceptaron y la cuenta dejó de cerrar en rojo. Cediste parte de tu margen para resolver un problema que era de calendario.",
        verdict: "buena",
      },
    ],
    concept: "Costo del sobregiro bancario",
    lesson:
      "El sobregiro es una solución de emergencia y no una fuente de financiamiento. Si se repite todos los meses, el problema es previsible y se resuelve con un flujo de caja proyectado y una línea más barata.",
  },
  {
    id: "fin-reprogramar-deuda",
    title: "No llegas a la cuota del mes",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Una mala temporada redujo tus ventas y en diez días vence la cuota de tu préstamo. No vas a poder pagarla completa. Hasta hoy tu historial es impecable. Un amigo te aconseja no contestar al banco 'hasta tener la plata'.",
    options: [
      {
        id: "a",
        label: "No contestar y pagar cuando puedas",
        detail: "Priorizas a proveedores y planilla, y dejas la cuota para después.",
        effects: { reputation: -3 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -4, reputation: -4 },
          text: "El atraso se reporta a la central de riesgos, corren intereses moratorios y otras entidades recortan tus líneas.",
        },
        outcome:
          "Ganaste unas semanas de aire. El banco, que no sabía nada de tu situación, asumió lo peor y pasó tu caso al área de cobranzas.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Ir al banco antes del vencimiento y reprogramar",
        detail: "Presentas tus números y propones un nuevo cronograma antes de caer en atraso.",
        effects: { cashPct: -1 },
        outcome:
          "El banco aceptó ampliar el plazo con unos meses de gracia. Pagarás más intereses en total, pero sin mora y habiendo dado la cara a tiempo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Pagar la cuota con tu tarjeta de crédito personal",
        detail: "Retiras efectivo de la tarjeta para cumplir con la fecha.",
        effects: { cashPct: -2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -3 },
          text: "Al mes siguiente debes la cuota y también la tarjeta, que cobra una tasa mucho mayor.",
        },
        outcome:
          "La cuota se pagó en fecha. Cambiaste una deuda de la empresa por otra más cara y a tu nombre, sin resolver la causa del problema.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Vender un activo que no usas para pagar",
        detail: "Ofreces un equipo parado a precio de salida rápida.",
        effects: { cashPct: -1, fixedCostPct: -1 },
        outcome:
          "Vendiste por debajo de su valor para conseguir el dinero a tiempo. Cumpliste la cuota y dejaste de pagar mantenimiento por algo que no producía.",
        verdict: "buena",
      },
    ],
    concept: "Reprogramación y refinanciación de deuda",
    lesson:
      "El peor momento para hablar con el banco es después de atrasarte. Un deudor que avisa y propone un plan consigue mejores condiciones que uno que desaparece, y cuida su calificación crediticia.",
  },
  {
    id: "fin-hipotecar-la-casa",
    title: "Tu casa como garantía del préstamo",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Para financiar un segundo local, el banco te pide una garantía hipotecaria. El único inmueble disponible es la casa donde vive tu familia en Cusco. Con la hipoteca, la tasa baja de forma considerable y el monto aprobado sube.",
    options: [
      {
        id: "a",
        label: "Hipotecar la casa y tomar todo el préstamo",
        detail: "Aprovechas la mejor tasa y el mayor monto para abrir el local completo.",
        effects: { cashPct: -2, demandPct: 8, fixedCostPct: 4, rounds: 4 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -10, morale: -3 },
          text: "El segundo local demora en despegar, te atrasas y el banco inicia la ejecución de la garantía.",
        },
        outcome:
          "Conseguiste la tasa más baja del mercado. Desde ese día, un mal año del negocio ya no pone en juego solo a la empresa, también el techo de tu familia.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Financiar un local más pequeño sin garantía real",
        detail: "Aceptas una tasa mayor por un monto menor, sin comprometer inmuebles.",
        effects: { cashPct: -3, demandPct: 4, fixedCostPct: 2, rounds: 4 },
        outcome:
          "Abriste una versión reducida del proyecto y pagas más intereses por cada sol prestado. Si el local no funciona, la pérdida tiene un límite conocido.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Garantizar con equipos y cuentas por cobrar",
        detail: "Ofreces activos del negocio en garantía para que el riesgo quede dentro de la empresa.",
        effects: { cashPct: -2.5, demandPct: 6, fixedCostPct: 3, rounds: 4 },
        outcome:
          "El banco aceptó la garantía sobre activos de la empresa, con una tasa intermedia. El negocio responde por sus propias deudas y tu casa quedó fuera del contrato.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Postergar el segundo local",
        detail: "Esperas a juntar más capital propio antes de endeudarte.",
        effects: {},
        outcome:
          "No asumiste riesgo ni deuda. El local que habías elegido lo alquiló otro negocio y tendrás que buscar nueva ubicación cuando estés listo.",
        verdict: "buena",
      },
    ],
    concept: "Garantías reales y riesgo patrimonial",
    lesson:
      "Una garantía abarata el crédito porque traslada el riesgo al que la entrega. Antes de hipotecar un bien personal, pregunta qué pasaría con tu familia si el proyecto sale mal.",
  },
  {
    id: "fin-seguro-contra-siniestros",
    title: "¿Renovar el seguro contra incendio y robo?",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Vence la póliza que cubre tu local, equipos y existencias. La prima anual equivale a casi 2 % de tus ventas de un trimestre y en cinco años nunca la usaste. Al lado de tu local acaban de abrir un depósito de productos inflamables.",
    options: [
      {
        id: "a",
        label: "No renovar y ahorrar la prima",
        detail: "Cinco años sin siniestros te hacen pensar que el seguro es un gasto innecesario.",
        effects: { cashPct: 2 },
        risk: {
          prob: 0.15,
          effects: { cashPct: -20, demandPct: -15, rounds: 2 },
          text: "Un incendio que empieza en el depósito vecino alcanza tu local y pierdes equipos y existencias sin ninguna cobertura.",
        },
        outcome:
          "El dinero de la prima se quedó en tu caja. Desde ese día, todo lo que tienes en el local depende de que al vecino no le pase nada.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Renovar con la misma cobertura",
        detail: "Pagas la prima y mantienes la póliza tal como estaba.",
        effects: { cashPct: -2 },
        outcome:
          "Sigues protegido. La póliza refleja los valores de hace cinco años, y desde entonces compraste equipos que no figuran en ella.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Renovar, actualizar montos y mejorar la prevención",
        detail:
          "Revisas las sumas aseguradas, informas del nuevo vecino e instalas extintores y detectores.",
        effects: { cashPct: -3, reputation: 1 },
        outcome:
          "La prima subió por el depósito vecino y por los equipos nuevos. Las medidas de prevención te dieron un descuento parcial y, sobre todo, menos probabilidades de usar la póliza.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Reemplazar el seguro por un fondo propio",
        detail: "Guardas cada mes el equivalente a la prima en una cuenta separada.",
        effects: { cashPct: -1 },
        risk: {
          prob: 0.15,
          effects: { cashPct: -18 },
          text: "El siniestro llega cuando el fondo apenas cubre una pequeña fracción de la pérdida.",
        },
        outcome:
          "El fondo crece de a pocos y es tuyo. Necesitarías muchos años sin siniestros para que alcance a cubrir una pérdida total.",
        verdict: "riesgosa",
      },
    ],
    concept: "Transferencia de riesgo con seguros",
    lesson:
      "El seguro no se evalúa por cuántas veces se usó, sino por lo que pasaría sin él. Los riesgos poco probables pero capaces de cerrar la empresa son los que conviene transferir.",
    basedOn: "Incendios en zonas comerciales de Lima, como Mesa Redonda y Las Malvinas.",
  },
  {
    id: "fin-cuentas-mezcladas",
    title: "La caja de la empresa paga el colegio",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Pagas el colegio de tus hijos, el supermercado y la cuota de tu auto con la cuenta de la empresa, y a veces cubres a proveedores con tu tarjeta personal. A fin de mes, tu contador no puede decirte cuánto ganó realmente el negocio.",
    options: [
      {
        id: "a",
        label: "Seguir igual, al final todo es tu plata",
        detail: "Mantienes una sola bolsa para el negocio y la familia.",
        effects: { cashPct: -2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -5, reputation: -3 },
          text: "SUNAT repara los gastos personales cargados a la empresa y un banco rechaza tu crédito porque los estados financieros no son confiables.",
        },
        outcome:
          "Sigues sin saber si el negocio es rentable o si tu familia lo está subsidiando. Los retiros crecen en los meses buenos y nadie los registra.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Separar las cuentas y asignarte un sueldo",
        detail:
          "Abres cuentas distintas, te fijas una remuneración mensual y todo retiro adicional se registra.",
        effects: { cashPct: -1, productivityPct: 2, reputation: 3 },
        outcome:
          "El primer mes fue incómodo, porque tu sueldo resultó menor de lo que venías retirando. Por primera vez viste la utilidad real del negocio.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Anotar en un cuaderno qué gasto es de quién",
        detail: "Mantienes una sola cuenta, pero registras a mano los gastos personales.",
        effects: {},
        risk: {
          prob: 0.3,
          effects: { cashPct: -3 },
          text: "El registro se abandona a los dos meses y los gastos personales vuelven a cargarse a la empresa.",
        },
        outcome:
          "El cuaderno ayudó a ver el tamaño del desorden. El dinero siguió saliendo de la misma cuenta y los números del negocio siguieron sin ser confiables.",
        verdict: "riesgosa",
      },
    ],
    concept: "Separación de finanzas personales y del negocio",
    lesson:
      "La empresa y su dueño son entidades distintas, aunque el dueño sea uno solo. Sin esa separación no se puede medir la rentabilidad, sustentar gastos ante SUNAT ni presentar cifras creíbles a un banco.",
  },
  {
    id: "fin-inversion-de-excedentes",
    title: "Sobra caja: ¿dónde la pones?",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tras una buena campaña navideña tienes un excedente que no necesitarás durante seis meses. Hoy está en la cuenta corriente sin ganar nada. Te llegan varias propuestas, incluida la de un conocido que asegura pagar 8 % mensual 'sin riesgo'.",
    options: [
      {
        id: "a",
        label: "Depósito a plazo en una entidad supervisada",
        detail: "Colocas el dinero a seis meses en una entidad regulada por la SBS.",
        effects: { cashPct: 1 },
        outcome:
          "Ganaste un interés modesto y el dinero estuvo disponible justo cuando lo necesitabas. Nadie presume de un depósito a plazo, pero cumplió su función.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Entregarlo al conocido que paga 8 % mensual",
        detail: "Firmas un contrato simple y recibes los intereses cada mes en efectivo.",
        effects: { cashPct: 3 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -15 },
          text: "Los pagos se detienen al cuarto mes. Era un esquema piramidal y no hay a quién reclamar.",
        },
        outcome:
          "Los primeros intereses llegaron puntuales, pagados con el dinero de quienes entraron después de ti. Ningún negocio legal paga 8 % mensual sin riesgo.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Comprar acciones en la bolsa",
        detail: "Inviertes el excedente en acciones buscando una rentabilidad mayor.",
        effects: { cashPct: 2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -5 },
          text: "El mercado cae justo cuando necesitas el dinero para la siguiente temporada y vendes con pérdida.",
        },
        outcome:
          "Las acciones pueden rendir bien en plazos largos. Tu dinero tenía fecha de uso a seis meses, y la bolsa no garantiza nada en ese tiempo.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Dejarlo en la cuenta corriente",
        detail: "Prefieres tener el dinero a la mano por cualquier emergencia.",
        effects: {},
        outcome:
          "El dinero estuvo seguro y disponible. No ganó nada en seis meses y la inflación le quitó una parte pequeña de su valor.",
        verdict: "buena",
      },
    ],
    concept: "Rentabilidad, riesgo y liquidez",
    lesson:
      "Toda inversión combina rentabilidad, riesgo y liquidez, y no se puede tener lo mejor de las tres. El excedente de caja con fecha de uso se invierte cuidando primero la seguridad y el plazo.",
    basedOn:
      "Alertas de la SBS sobre esquemas de captación informal que prometen rentabilidades muy altas.",
  },
  {
    id: "fin-punto-de-equilibrio",
    title: "El local de al lado está en alquiler",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Te ofrecen el local de al lado para ampliar tu operación. El alquiler, el personal adicional y los servicios subirían tus costos fijos en 40 %. Tu margen de contribución es 35 % de las ventas. El dueño quiere una respuesta esta semana y dice que hay otro interesado.",
    options: [
      {
        id: "a",
        label: "Firmar ya, antes de que lo tome otro",
        detail: "Aseguras el local y confías en que las ventas crecerán con el espacio.",
        effects: { demandPct: 8, fixedCostPct: 12, rounds: 4 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -6 },
          text: "Las ventas adicionales no alcanzan el nuevo punto de equilibrio y la ampliación pierde dinero cada mes.",
        },
        outcome:
          "Tienes el doble de espacio y un contrato firmado. Recién después calculaste que necesitabas vender 40 % más solo para no perder.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Calcular el nuevo punto de equilibrio y negociar",
        detail:
          "Estimas cuánto más debes vender para cubrir los nuevos costos fijos y lo comparas con la demanda que puedes captar.",
        effects: { cashPct: -0.5, demandPct: 8, fixedCostPct: 8, rounds: 4 },
        outcome:
          "El cálculo mostró que tu punto de equilibrio subía 40 %. Con ese dato negociaste un alquiler escalonado y ampliaste con números que sí cerraban.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rechazar la ampliación",
        detail: "Te quedas con el local actual y tu estructura de costos conocida.",
        effects: {},
        outcome:
          "Tus costos fijos siguen iguales y tu punto de equilibrio también. En los días de mayor demanda sigues sin poder atender a todos.",
        verdict: "buena",
      },
    ],
    concept: "Punto de equilibrio",
    lesson:
      "El punto de equilibrio se obtiene dividiendo los costos fijos entre el margen de contribución. Cada costo fijo nuevo sube las ventas mínimas para no perder, y conviene saberlo antes de firmar.",
  },
  {
    id: "fin-precios-con-costos-al-alza",
    title: "Tus costos subieron 12 % y tus precios no",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "En seis meses tus principales insumos y servicios subieron 12 %. No has tocado tus precios por miedo a perder clientes y tu margen se redujo a la mitad. Tu competidor más cercano tampoco ha subido, por ahora.",
    options: [
      {
        id: "a",
        label: "Absorber el alza y mantener precios",
        detail: "Esperas a que el competidor suba primero.",
        effects: { cashPct: -4, demandPct: 2, rounds: 2 },
        outcome:
          "Conservaste a todos tus clientes y ganaste algunos. Trabajas igual que antes por la mitad del margen, y tu competidor sigue sin moverse.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Subir todos los precios 12 % de una vez",
        detail: "Trasladas el alza completa a toda tu lista.",
        effects: { cashPct: 3, demandPct: -8, satisfaction: -4, rounds: 2 },
        outcome:
          "Recuperaste el margen por unidad y perdiste volumen. Los clientes más sensibles al precio se fueron con el competidor que no subió.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Subir por etapas y de forma selectiva",
        detail:
          "Ajustas primero lo menos sensible al precio, revisas presentaciones y explicas el cambio a tus clientes.",
        effects: { cashPct: 2, demandPct: -2, satisfaction: -1, rounds: 2 },
        outcome:
          "Algunos precios subieron más de 12 % y otros casi nada. Recuperaste buena parte del margen con pocas quejas, porque el alza no cayó pareja sobre todo.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Reducir cantidad o calidad sin avisar",
        detail: "Mantienes el precio y entregas un poco menos por lo mismo.",
        effects: { costPct: -5, quality: -5, rounds: 3 },
        risk: {
          prob: 0.5,
          effects: { brand: -5, satisfaction: -7, reputation: -4 },
          text: "Los clientes notan el cambio, lo comentan en redes y llega un reclamo ante Indecopi por información engañosa.",
        },
        outcome:
          "El precio en la lista no cambió y tu costo bajó. Apostaste a que tus clientes no se darían cuenta de la diferencia.",
        verdict: "mala",
      },
    ],
    concept: "Margen de contribución y traslado de costos",
    lesson:
      "Un precio que no cubre el costo actual destruye valor con cada venta. El alza se traslada mejor de forma gradual y selectiva, según qué tan sensible es cada cliente al precio.",
  },
  {
    id: "fin-inflacion-y-contratos",
    title: "Contratos a precio fijo en un año de inflación",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Firmaste acuerdos de un año a precio fijo con tus clientes más importantes. La inflación se aceleró, el BCRP subió su tasa de referencia y tus costos crecen cada mes. Toca renovar y decidir cómo proteger tu margen sin espantar a los clientes.",
    options: [
      {
        id: "a",
        label: "Renovar a precio fijo para no perder a nadie",
        detail: "Mantienes las condiciones actuales por otro año.",
        effects: { demandPct: 3, costPct: 4, rounds: 3 },
        outcome:
          "Todos renovaron encantados. Cada mes entregas lo mismo por un precio que compra menos, y el contrato te impide corregirlo.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Incluir una cláusula de reajuste por índice de precios",
        detail: "El precio se actualiza cada trimestre según un indicador público, con un tope acordado.",
        effects: { cashPct: 2, demandPct: -2, satisfaction: -1, rounds: 2 },
        outcome:
          "La negociación fue larga y un par de clientes se resistió. Al final, la mayoría aceptó una regla clara y verificable en lugar de una discusión cada trimestre.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Subir 15 % para cubrirte de todo el año",
        detail: "Fijas un precio alto que anticipa la inflación que podría venir.",
        effects: { cashPct: 3, demandPct: -9, satisfaction: -4, rounds: 3 },
        outcome:
          "Protegiste tu margen ante el peor escenario. Varios clientes compararon con la competencia y no renovaron, porque les cobraste hoy una inflación que aún no ocurre.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Acortar los contratos a tres meses",
        detail: "Renuevas por periodos cortos para ajustar precios con frecuencia.",
        effects: { cashPct: 1, demandPct: -4, fixedCostPct: 1, rounds: 2 },
        outcome:
          "Puedes corregir precios cuatro veces al año. También tus clientes pueden irse cuatro veces al año, y tu equipo comercial vive renegociando.",
        verdict: "buena",
      },
    ],
    concept: "Inflación y cláusulas de reajuste",
    lesson:
      "Con inflación, un precio fijo es un descuento que crece cada mes. Las cláusulas de reajuste atadas a un índice público reparten el riesgo entre las partes y evitan renegociar todo cada vez.",
    basedOn:
      "Alza de la inflación en Perú y la región en 2021 y 2022, con subidas de la tasa de referencia del BCRP.",
  },
  {
    id: "fin-fraude-interno",
    title: "Faltantes pequeños, todos los meses",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu auditor encuentra que en ocho meses faltan montos pequeños pero constantes. La misma persona registra las ventas, cobra, deposita y concilia el banco: Elena, que trabaja contigo hace diez años. No hay prueba directa contra ella y nunca antes se revisó la caja.",
    options: [
      {
        id: "a",
        label: "Despedir a Elena de inmediato",
        detail: "Actúas por la sospecha para cortar la pérdida cuanto antes.",
        effects: { cashPct: -1, morale: -5 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -5, reputation: -3 },
          text: "Sin pruebas ni procedimiento, Elena demanda por despido arbitrario y gana. Además, los faltantes continúan.",
        },
        outcome:
          "Pusiste a otra persona en el mismo puesto, con las mismas funciones y los mismos controles, es decir, ninguno. Cambiaste el nombre y dejaste igual el sistema.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Separar funciones y hacer arqueos sorpresivos",
        detail:
          "Quien cobra ya no registra ni concilia, se rotan tareas y se investiga con evidencia antes de acusar a nadie.",
        effects: { cashPct: 1, fixedCostPct: 1, reputation: 2, rounds: 4 },
        outcome:
          "Los faltantes se detuvieron en cuanto dos personas distintas empezaron a ver el mismo dinero. La investigación siguió su curso con documentos y no con sospechas.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Conversar con Elena y pedirle más cuidado",
        detail: "Le comentas el hallazgo en confianza y dejas todo como está.",
        effects: { cashPct: -2 },
        outcome:
          "Elena se mostró sorprendida y prometió revisar. Si era un error, puede repetirse. Si no lo era, ahora sabe exactamente qué encontró el auditor.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Instalar cámaras y no cambiar nada más",
        detail: "Vigilas la caja con video, pero las funciones siguen en una sola persona.",
        effects: { cashPct: -1.5, morale: -3 },
        outcome:
          "Las cámaras graban el mostrador, pero no los registros ni las conciliaciones. El equipo se siente vigilado y el proceso sigue dependiendo de la honestidad de una sola persona.",
        verdict: "riesgosa",
      },
    ],
    concept: "Control interno y segregación de funciones",
    lesson:
      "Quien custodia el dinero no debe ser quien lo registra ni quien lo concilia. La confianza no es un control. Un buen sistema protege a la empresa y también a los trabajadores honestos.",
  },
  {
    id: "fin-yape-y-pagos-digitales",
    title: "Capturas de Yape que nunca llegaron",
    category: "finanzas",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Más de la mitad de tus clientes paga con Yape o Plin al celular personal de un vendedor. Este mes detectaste tres 'pagos' que eran capturas de pantalla falsas y varias ventas que nadie sabe si se cobraron. Tampoco puedes cuadrar esos ingresos con tus comprobantes.",
    options: [
      {
        id: "a",
        label: "Volver a aceptar solo efectivo",
        detail: "Eliminas las billeteras digitales para cortar el problema de raíz.",
        effects: { demandPct: -6, satisfaction: -4, rounds: 2 },
        risk: {
          prob: 0.2,
          effects: { cashPct: -3 },
          text: "Con más efectivo acumulado en el local, sufres un robo a la hora del cierre.",
        },
        outcome:
          "Se acabaron las capturas falsas. También se fueron los clientes que ya no cargan efectivo, y ahora cuentas billetes y haces depósitos todos los días.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Cuenta del negocio, QR propio y validación",
        detail:
          "Los pagos entran a una cuenta de la empresa, se confirma la notificación real antes de entregar y se concilia a diario.",
        effects: { cashPct: -1, demandPct: 2, satisfaction: 3, reputation: 2, rounds: 2 },
        outcome:
          "El dinero dejó de pasar por celulares personales. Cada venta quedó ligada a un abono verificable y el cuadre diario toma diez minutos.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Seguir igual y descontar faltantes al vendedor",
        detail: "Haces responsable al vendedor de cualquier pago que no aparezca.",
        effects: { morale: -6 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -3, reputation: -3 },
          text: "El vendedor denuncia el descuento indebido de su sueldo y las estafas con capturas continúan.",
        },
        outcome:
          "Trasladaste el riesgo a quien menos puede controlarlo. El dinero de la empresa sigue entrando a una cuenta que no es de la empresa.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Sumar un POS y mantener el Yape personal",
        detail: "Agregas pago con tarjeta, sin cambiar la forma de recibir las billeteras.",
        effects: { cashPct: -1.5, satisfaction: 2 },
        outcome:
          "Tus clientes tienen una forma más de pagar y tú una comisión más. El hueco por donde se perdían las ventas sigue abierto.",
        verdict: "riesgosa",
      },
    ],
    concept: "Conciliación de pagos digitales",
    lesson:
      "Una captura de pantalla no es un pago. Los cobros digitales deben llegar a una cuenta del negocio, verificarse en la aplicación antes de entregar y conciliarse cada día con las ventas.",
  },
  {
    id: "fin-central-de-riesgos",
    title: "Tu historial crediticio tiene una mancha",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Vas a pedir un crédito para la campaña escolar y la caja te informa que figuras con una calificación negativa en la central de riesgos de la SBS. El motivo es una tarjeta de crédito empresarial olvidada, con una deuda pequeña que lleva varias semanas impaga.",
    options: [
      {
        id: "a",
        label: "Pagar a una empresa que promete limpiar tu historial",
        detail: "Un aviso en redes ofrece sacarte de la central de riesgos en 72 horas.",
        effects: { cashPct: -2 },
        risk: {
          prob: 0.7,
          effects: { cashPct: -1 },
          text: "Nadie puede borrar información verdadera de la central. Pierdes el pago, la deuda sigue creciendo y el reporte continúa igual.",
        },
        outcome:
          "Transferiste el adelanto y te pidieron paciencia. La información de la central la reportan las entidades financieras y ningún tercero puede modificarla.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Pagar la deuda y reconstruir el historial",
        detail:
          "Cancelas lo vencido, pides la constancia de no adeudo y presentas tu caso a la caja con documentos.",
        effects: { cashPct: -1, reputation: 2 },
        outcome:
          "El registro del atraso no desapareció de un día para otro. Con la constancia y tus estados de cuenta, la caja aprobó un monto menor al que pedías.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Pedir el crédito a nombre de un familiar",
        detail: "Tu hermano, con buen historial, solicita el préstamo para tu negocio.",
        effects: { cashPct: -1 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, morale: -2 },
          text: "Un atraso tuyo daña el historial de tu hermano y también la relación familiar.",
        },
        outcome:
          "Conseguiste el dinero para la campaña. La deuda es legalmente de tu hermano, tu historial sigue dañado y el negocio no construye crédito propio.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Financiar la campaña con crédito de proveedores",
        detail: "Negocias plazos más largos con quienes te abastecen.",
        effects: { costPct: 2 },
        outcome:
          "Tus proveedores aceptaron esperar a cambio de un precio algo mayor. Resolviste la campaña y dejaste pendiente la causa del problema.",
        verdict: "buena",
      },
    ],
    concept: "Historial crediticio y central de riesgos",
    lesson:
      "Tu comportamiento de pago queda registrado y todas las entidades lo consultan. Una deuda pequeña olvidada puede cerrar un crédito grande. El historial se cuida y se reconstruye solo pagando a tiempo.",
  },
  {
    id: "fin-presupuesto-por-areas",
    title: "Cada área gasta lo que pide",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu empresa creció y ya tiene cuatro áreas. No existe presupuesto: cada jefe pide dinero cuando lo necesita y tú apruebas según la caja del día. En el último trimestre el gasto subió 20 % y nadie puede explicar exactamente en qué.",
    options: [
      {
        id: "a",
        label: "Recortar 15 % parejo a todas las áreas",
        detail: "Aplicas la misma reducción a todos para que nadie reclame favoritismos.",
        effects: { demandPct: -3, fixedCostPct: -4, morale: -5, quality: -3, rounds: 2 },
        outcome:
          "El gasto bajó de inmediato. El recorte cayó igual sobre el área que derrochaba y sobre la que generaba ventas, y castigó a quien ya gastaba con cuidado.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Presupuesto anual por área con revisión mensual",
        detail:
          "Cada jefe sustenta sus gastos contra metas y cada mes se compara lo ejecutado con lo planeado.",
        effects: { cashPct: -1, fixedCostPct: -3, productivityPct: 2, rounds: 4 },
        outcome:
          "Armar el primer presupuesto tomó semanas y varias discusiones. Desde entonces, las desviaciones se explican en el mes en que ocurren y no al cierre del año.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Aprobar tú personalmente cada gasto",
        detail: "Ningún pago sale sin tu firma, sin importar el monto.",
        effects: { fixedCostPct: -2, productivityPct: -5, morale: -3, rounds: 2 },
        outcome:
          "El gasto se contuvo y tu escritorio se llenó de solicitudes. Las compras urgentes esperan tu firma y los jefes dejaron de decidir.",
        verdict: "riesgosa",
      },
    ],
    concept: "Presupuesto y control presupuestal",
    lesson:
      "El presupuesto traduce la estrategia en números y reparte responsabilidades. Sin él, el gasto se decide según la caja del día. Su valor está en comparar cada mes lo planeado con lo ejecutado.",
  },
  {
    id: "fin-apalancamiento",
    title: "Crecer con deuda: ¿hasta dónde?",
    category: "finanzas",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Tu negocio rinde 18 % anual sobre lo invertido y el banco te presta a 12 %. Tu asesor propone triplicar la deuda para abrir tres locales a la vez. Hoy debes poco: por cada sol de patrimonio tienes 30 céntimos de deuda.",
    options: [
      {
        id: "a",
        label: "Triplicar la deuda y abrir los tres locales",
        detail: "Aprovechas la diferencia entre lo que rinde el negocio y lo que cuesta el préstamo.",
        effects: { cashPct: -4, demandPct: 15, fixedCostPct: 12, rounds: 4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -12 },
          text: "Las ventas caen un trimestre y las cuotas no esperan. La deuda que multiplicaba la ganancia ahora multiplica la pérdida.",
        },
        outcome:
          "Mientras el negocio rinda más que el costo de la deuda, cada sol prestado aumenta la ganancia de los socios. Tu margen de error, en cambio, se redujo al mínimo.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Deuda moderada y un local primero",
        detail: "Abres uno, mides sus resultados y decides los siguientes con datos reales.",
        effects: { cashPct: -2, demandPct: 6, fixedCostPct: 4, rounds: 4 },
        outcome:
          "El primer local tardó dos trimestres en llegar a su punto de equilibrio, más de lo que suponía el plan. Esa información ajustó el diseño de los siguientes.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "No tomar deuda y crecer con utilidades",
        detail: "Financias la expansión solo con lo que el negocio genera.",
        effects: { demandPct: 2, rounds: 4 },
        outcome:
          "Duermes sin cuotas pendientes. Dejaste pasar la oportunidad de usar dinero que costaba 12 % en un negocio que rinde 18 %.",
        verdict: "buena",
      },
    ],
    concept: "Apalancamiento financiero",
    lesson:
      "La deuda amplifica los resultados en ambas direcciones. Conviene cuando el negocio rinde más que el costo del préstamo, pero las cuotas son fijas y las ventas no, así que el nivel de deuda debe resistir un mal año.",
  },
];

export default data;
