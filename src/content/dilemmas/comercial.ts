import type { Dilemma } from "../types";

const data: Dilemma[] = [
  // MARKETING (20)
  {
    id: "mkt-crisis-video-viral",
    title: "El video que se volvió viral en tu contra",
    category: "marketing",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Un cliente de Arequipa publicó en TikTok un video quejándose de tu empresa y en dos días superó las 300 mil vistas. Los comentarios se llenan de críticas y algunos medios locales ya lo compartieron. El reclamo tiene algo de razón: hubo una falla real en la atención. Tu equipo espera instrucciones.",
    options: [
      {
        id: "a",
        label: "Responder con un comunicado legal",
        detail: "Tu abogado redacta un comunicado que aclara los hechos y advierte acciones por difamación.",
        effects: { cashPct: -1, brand: -6, reputation: -3 },
        outcome:
          "El comunicado se volvió meme. El tono amenazante hizo que más personas buscaran el video original, lo que se conoce como efecto Streisand.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Borrar comentarios y bloquear al cliente",
        detail: "Limpias tus redes para que los nuevos visitantes no vean las críticas.",
        effects: { brand: -3 },
        risk: {
          prob: 0.6,
          effects: { brand: -8, demandPct: -8, reputation: -5, rounds: 2 },
          text: "Alguien guardó capturas de los comentarios borrados y el caso volvió a explotar, ahora con la acusación de censura.",
        },
        outcome:
          "Tus redes quedaron limpias por unas horas. El público notó el borrado y la conversación se mudó a otras cuentas, donde no puedes intervenir.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Guardar silencio hasta que pase",
        detail: "No respondes y esperas a que la atención del público se vaya a otro tema.",
        effects: { brand: -4, satisfaction: -3, demandPct: -3 },
        outcome:
          "El video dejó de circular después de dos semanas, pero quedó entre los primeros resultados cuando alguien busca tu marca. El silencio se interpretó como indiferencia.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Disculparte en público y resolver el caso",
        detail: "Publicas una respuesta con nombre propio, reconoces la falla y compensas al cliente.",
        effects: { cashPct: -1, brand: 3, satisfaction: 4, reputation: 3 },
        outcome:
          "La respuesta salió en menos de un día y el propio cliente la compartió. Varios comentarios pasaron de la crítica al reconocimiento y la crisis se apagó en una semana.",
        verdict: "optima",
      },
    ],
    concept: "Gestión de crisis en redes sociales",
    lesson:
      "En una crisis digital la velocidad y la humildad valen más que tener la razón. Reconocer la falla, resolver el caso y mostrarlo en público convierte una queja en una prueba de seriedad.",
  },
  {
    id: "mkt-influencer-seguidores",
    title: "La influencer de un millón de seguidores",
    category: "marketing",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Una influencer limeña con un millón de seguidores te ofrece tres historias y un reel por un monto que equivale a casi todo tu presupuesto de marketing del trimestre. Tu practicante revisó su cuenta y notó pocos comentarios y muchos seguidores de otros países. Por el mismo dinero podrías contratar a diez microinfluencers de tu rubro.",
    options: [
      {
        id: "a",
        label: "Contratar a la influencer grande",
        detail: "Apuestas por el alcance masivo de una sola cuenta muy conocida.",
        effects: { cashPct: -5, brand: 3, demandPct: 2 },
        risk: {
          prob: 0.5,
          effects: { brand: -2, demandPct: -2 },
          text: "Buena parte de su audiencia resultó comprada o ajena a tu mercado, y las ventas casi no se movieron.",
        },
        outcome:
          "La publicación tuvo muchas vistas, pero pocas personas preguntaron por tu producto. El alcance no se tradujo en clientes.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Contratar a diez microinfluencers del rubro",
        detail: "Repartes el presupuesto entre cuentas pequeñas con seguidores fieles y locales.",
        effects: { cashPct: -5, demandPct: 7, brand: 4, rounds: 2 },
        outcome:
          "Las cuentas pequeñas respondieron preguntas y mostraron el producto en su día a día. Hubo menos vistas y más pedidos, y pudiste medir qué creador vendía más.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Pedir sus estadísticas antes de decidir",
        detail: "Solicitas el reporte de alcance, la ubicación de la audiencia y resultados de campañas previas.",
        effects: { cashPct: -3, demandPct: 4, brand: 2 },
        outcome:
          "La influencer demoró en enviar los datos y estos confirmaron tus dudas. Negociaste con ella una prueba pequeña y el resto lo invertiste en creadores locales.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "No usar influencers este trimestre",
        detail: "Guardas el presupuesto y sigues con tus publicaciones propias.",
        effects: { demandPct: -2 },
        outcome:
          "Cuidaste la caja. Tu competencia sí apareció en las cuentas que sigue tu público y ganó parte de la conversación.",
        verdict: "riesgosa",
      },
    ],
    concept: "Tasa de interacción frente a alcance",
    lesson:
      "El número de seguidores es una métrica de vanidad. Lo que predice ventas es la tasa de interacción y la coincidencia entre la audiencia del creador y tu público objetivo.",
  },
  {
    id: "mkt-resenas-falsas",
    title: "Cinco estrellas a la venta",
    category: "marketing",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tu ficha en Google Maps tiene 3.6 estrellas y un competidor de tu zona ya pasó las 4.7. Un proveedor te ofrece por WhatsApp un paquete de 200 reseñas de cinco estrellas escritas por perfiles que nunca te compraron. Asegura que nadie se da cuenta y que en un mes subirás en las búsquedas.",
    options: [
      {
        id: "a",
        label: "Comprar el paquete de reseñas",
        detail: "Pagas poco y tu calificación sube en pocas semanas.",
        effects: { cashPct: -1, demandPct: 6, brand: 2, rounds: 2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -8, brand: -8, reputation: -10, demandPct: -8 },
          text: "La plataforma detectó el patrón y eliminó las reseñas. Un cliente, además, te denunció ante Indecopi por publicidad engañosa.",
        },
        outcome:
          "La calificación subió rápido y llegaron clientes nuevos con expectativas altas. Varios notaron que la experiencia real no coincidía con lo que habían leído.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Dar un descuento a cambio de cinco estrellas",
        detail: "Ofreces un beneficio solo a quien publique la calificación máxima.",
        effects: { cashPct: -2, demandPct: 3 },
        risk: {
          prob: 0.3,
          effects: { brand: -5, reputation: -5 },
          text: "Un cliente publicó la captura de la oferta y te acusaron de comprar opiniones.",
        },
        outcome:
          "Subieron las reseñas positivas. Condicionar el beneficio a la nota máxima es una forma de manipular la opinión, y algunos clientes se sintieron incómodos.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Pedir reseñas a clientes reales satisfechos",
        detail: "Entrenas al personal para solicitar la opinión al cierre de cada venta, con un código QR.",
        effects: { cashPct: -1, brand: 3, demandPct: 3, satisfaction: 2, rounds: 2 },
        outcome:
          "El avance fue más lento, pero las reseñas nuevas contaban detalles reales. En un trimestre la calificación subió y las críticas antiguas perdieron peso.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Responder y corregir las críticas existentes",
        detail: "Contestas cada reseña negativa y arreglas los problemas que más se repiten.",
        effects: { cashPct: -2, quality: 3, satisfaction: 4, brand: 2 },
        outcome:
          "Al leer las críticas con calma encontraste tres fallas repetidas. Corregirlas mejoró la experiencia y varios clientes actualizaron su calificación.",
        verdict: "buena",
      },
    ],
    concept: "Prueba social y publicidad engañosa",
    lesson:
      "Las reseñas son prueba social: valen porque vienen de terceros reales. Falsificarlas es publicidad engañosa y además atrae clientes con expectativas que tu servicio no puede cumplir.",
  },
  {
    id: "mkt-guerra-precios",
    title: "Tu rival bajó sus precios 20 %",
    category: "marketing",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Tu principal competidor en Trujillo anunció una rebaja de 20 % en toda su línea y tus vendedores ya reportan clientes que se van. Sabes que su estructura de costos es parecida a la tuya, así que con ese precio casi no gana. Tu margen bruto actual es de 35 %.",
    options: [
      {
        id: "a",
        label: "Mantener el precio y reforzar el valor",
        detail: "Inviertes en servicio, garantía y comunicación de lo que te hace distinto.",
        effects: { cashPct: -3, demandPct: -5, brand: 4, satisfaction: 3, rounds: 2 },
        outcome:
          "Perdiste a los clientes más sensibles al precio y conservaste a los más rentables. Tres meses después el rival subió sus precios porque no aguantó el margen.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Igualar la rebaja de inmediato",
        detail: "Bajas 20 % en toda tu línea para no perder ni un cliente.",
        effects: { cashPct: -8, demandPct: 3, brand: -2, rounds: 2 },
        outcome:
          "Retuviste el volumen, pero el rival bajó otro 5 % la semana siguiente. Los dos terminaron vendiendo casi lo mismo que antes, con mucho menos margen.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Lanzar una línea económica de combate",
        detail: "Creas una versión básica con otro nombre para pelear el segmento de precio sin tocar tu marca principal.",
        effects: { cashPct: -4, demandPct: 5, rounds: 2 },
        risk: {
          prob: 0.35,
          effects: { demandPct: -4, brand: -3 },
          text: "Parte de tus clientes habituales se pasó a la versión barata y el margen promedio cayó.",
        },
        outcome:
          "La marca de combate frenó la fuga en el segmento de precio. Tu línea principal mantuvo su precio y su imagen.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Rebajar solo a quienes amenazan con irse",
        detail: "Das descuentos caso por caso, sin anunciarlo.",
        effects: { cashPct: -3, demandPct: -2 },
        risk: {
          prob: 0.4,
          effects: { satisfaction: -6, brand: -3 },
          text: "Los clientes compararon precios entre ellos y los que pagaban completo se sintieron engañados.",
        },
        outcome:
          "Retuviste algunas cuentas. Tus vendedores aprendieron que el descuento es la salida fácil y tus clientes aprendieron a amenazar.",
        verdict: "riesgosa",
      },
    ],
    concept: "Guerra de precios",
    lesson:
      "En una guerra de precios gana quien tiene el costo más bajo, no quien reacciona más rápido. Antes de igualar una rebaja, calcula cuánto volumen adicional necesitas para compensar el margen perdido.",
  },
  {
    id: "mkt-promo-canibaliza",
    title: "El 2x1 que se comió tus ventas normales",
    category: "marketing",
    industries: "all",
    market: "B2C",
    tier: 2,
    situation:
      "Lanzaste un 2x1 los martes para llenar el día más flojo. Funcionó: los martes vendes el triple. Pero al revisar el mes, las ventas de miércoles a viernes cayeron y el ingreso total casi no cambió. Tus clientes habituales simplemente cambiaron su día de compra.",
    options: [
      {
        id: "a",
        label: "Mantener el 2x1 porque trae movimiento",
        detail: "Conservas la promoción tal como está, ya que el martes dejó de ser un día muerto.",
        effects: { cashPct: -4, demandPct: 3, brand: -2, morale: -2 },
        outcome:
          "Los martes siguen llenos y el equipo termina agotado. El ingreso mensual es igual que antes, con más costo y menos margen.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Eliminar la promoción de golpe",
        detail: "Retiras el 2x1 desde la próxima semana, sin reemplazo.",
        effects: { demandPct: -3, satisfaction: -3 },
        outcome:
          "Las ventas volvieron a repartirse en la semana. Varios clientes acostumbrados al 2x1 sintieron que les quitaste algo y se quejaron en redes.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Cambiar el 2x1 por un combo de alto margen",
        detail: "Reemplazas el descuento directo por un paquete que incluye un producto que casi no se vende solo.",
        effects: { cashPct: 1, demandPct: 2, rounds: 2 },
        outcome:
          "El combo subió el ticket promedio sin regalar el producto principal. El martes ya no se llena tanto, pero cada venta deja más.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Limitar la promoción a clientes nuevos",
        detail: "El 2x1 solo aplica a la primera compra, con registro por celular.",
        effects: { cashPct: -1, demandPct: 4, satisfaction: -1 },
        outcome:
          "La promoción dejó de subsidiar a quienes ya te compraban y se convirtió en una herramienta de captación. Algunos habituales reclamaron, pero siguieron comprando.",
        verdict: "optima",
      },
    ],
    concept: "Canibalización y venta incremental",
    lesson:
      "Una promoción se evalúa por la venta incremental, no por la venta del día promocionado. Si solo mueve la compra de un día a otro, regalas margen a clientes que igual te iban a comprar.",
  },
  {
    id: "mkt-dia-madre-anticipacion",
    title: "Día de la Madre: cuándo empezar la campaña",
    category: "marketing",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Falta un mes para el Día de la Madre, una de las campañas más fuertes del año. El año pasado empezaste a anunciar la última semana, cuando los anuncios ya estaban carísimos y muchos clientes habían decidido su regalo. Este año tienes el mismo presupuesto.",
    options: [
      {
        id: "a",
        label: "No hacer campaña y ahorrar el presupuesto",
        detail: "Confías en que la fecha vende sola.",
        effects: { demandPct: 1, brand: -2 },
        outcome:
          "La fecha trajo algo de venta espontánea. Tus competidores se llevaron a los clientes que buscaban opciones en redes y perdiste la mejor ventana del semestre.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Concentrar todo en la última semana",
        detail: "Gastas el presupuesto completo en los días en que la gente está comprando.",
        effects: { cashPct: -3, demandPct: 4 },
        risk: {
          prob: 0.4,
          effects: { satisfaction: -4, cashPct: -2 },
          text: "La demanda llegó toda junta, no alcanzaste a atender y varios pedidos se entregaron tarde.",
        },
        outcome:
          "Competiste por la atención en la semana más cara del año. Vendiste, pero cada cliente te costó bastante más que a quienes empezaron antes.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Empezar tres semanas antes con preventa",
        detail: "Anuncias temprano y tomas reservas con adelanto por Yape o Plin.",
        effects: { cashPct: -3, demandPct: 9, satisfaction: 2 },
        outcome:
          "Las reservas te dijeron cuánto preparar y el adelanto financió los insumos. Llegaste a la semana clave con buena parte de la venta asegurada.",
        verdict: "optima",
      },
    ],
    concept: "Planificación de campañas estacionales",
    lesson:
      "En las fechas fuertes la decisión se toma antes que la compra. Anunciar temprano y tomar reservas baja el costo por cliente y convierte una demanda incierta en pedidos confirmados.",
  },
  {
    id: "mkt-fiestas-patrias-edicion-limitada",
    title: "Edición limitada por Fiestas Patrias",
    category: "marketing",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Tu equipo propone una edición especial por Fiestas Patrias, con un diseño inspirado en textiles de Ayacucho. La gratificación de julio pone plata en el bolsillo de tus clientes. La duda es cuánto ofrecer: pocas unidades para que se agoten o muchas para aprovechar toda la demanda.",
    options: [
      {
        id: "a",
        label: "Producir un lote grande para todo julio",
        detail: "Preparas volumen suficiente para que nadie se quede sin comprar.",
        effects: { cashPct: -2, demandPct: 5 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -4, brand: -2 },
          text: "En agosto quedó un saldo con diseño de Fiestas Patrias que tuviste que rematar.",
        },
        outcome:
          "Vendiste bien las dos primeras semanas. Como no había sensación de escasez, muchos clientes dejaron la compra para después.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Sacar un lote corto y numerado",
        detail: "Ofreces pocas unidades, comunicas que no habrá reposición y cumples.",
        effects: { cashPct: 2, brand: 5, demandPct: 3 },
        outcome:
          "La edición se agotó en diez días y generó conversación. Algunos clientes se quedaron sin la suya y ya preguntan por la próxima.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Anunciarla como limitada y reponer en silencio",
        detail: "Comunicas pocas unidades, pero sigues produciendo mientras haya demanda.",
        effects: { cashPct: 3, demandPct: 5 },
        risk: {
          prob: 0.4,
          effects: { brand: -6, reputation: -5 },
          text: "Los clientes notaron que la edición 'agotada' seguía apareciendo y te acusaron de fingir escasez.",
        },
        outcome:
          "Vendiste más que con un lote corto. La numeración perdió sentido y quienes compraron por la exclusividad se sintieron burlados.",
        verdict: "mala",
      },
    ],
    concept: "Principio de escasez",
    lesson:
      "La escasez real aumenta el valor percibido y acelera la decisión de compra. La escasez fingida funciona una vez y después destruye la credibilidad de todas tus promociones.",
  },
  {
    id: "mkt-navidad-marca-o-ventas",
    title: "Navidad: construir marca o empujar ventas",
    category: "marketing",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Para la campaña de Navidad tu agencia presenta dos caminos. El primero es un video emotivo sobre una familia de Huancayo que se reencuentra, sin mencionar precios. El segundo es una serie de anuncios con ofertas y botón de compra. El gerente comercial quiere ventas ya. La jefa de marketing recuerda que la marca lleva dos años sin inversión.",
    options: [
      {
        id: "a",
        label: "Dividir: 60 % marca y 40 % activación",
        detail: "El video abre la campaña y los anuncios de oferta se dirigen a quienes ya lo vieron.",
        effects: { cashPct: -4, demandPct: 6, brand: 5, rounds: 2 },
        outcome:
          "Quienes vieron el video respondieron mejor a las ofertas, así que cada anuncio rindió más. Vendiste en diciembre y la marca quedó más fuerte para el año siguiente.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Todo al video emotivo de marca",
        detail: "Apuestas por la recordación y el vínculo emocional con el público.",
        effects: { cashPct: -4, brand: 7, demandPct: 2, rounds: 2 },
        outcome:
          "El video se compartió mucho y la recordación subió. Sin un llamado a la compra, en diciembre vendiste casi lo mismo que el año pasado.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Todo a anuncios de oferta con botón de compra",
        detail: "Priorizas resultados medibles en diciembre.",
        effects: { cashPct: -4, demandPct: 8, brand: -2 },
        outcome:
          "Las ventas de diciembre subieron y pudiste medir cada sol invertido. En enero la demanda volvió a su nivel anterior y tu marca sigue asociada solo al descuento.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Cancelar la campaña y bajar precios",
        detail: "En lugar de publicidad, trasladas el presupuesto al cliente como descuento.",
        effects: { cashPct: -3, demandPct: 3, brand: -3 },
        outcome:
          "El descuento movió algo de venta, pero casi nadie se enteró fuera de tus clientes actuales. Acostumbraste a tu público a esperar rebajas en diciembre.",
        verdict: "mala",
      },
    ],
    concept: "Construcción de marca y activación",
    lesson:
      "La activación captura la demanda que ya existe y la marca crea la demanda futura. Las campañas más rentables combinan ambas, porque una marca conocida hace que cada anuncio de venta rinda más.",
    basedOn:
      "Estudios de efectividad publicitaria de Les Binet y Peter Field sobre el equilibrio entre marca y activación",
  },
  {
    id: "mkt-cyber-wow-precio-inflado",
    title: "Cyber Wow: el descuento que no era",
    category: "marketing",
    industries: "all",
    market: "B2C",
    tier: 2,
    situation:
      "Se acerca el Cyber Wow y tu margen no aguanta un descuento de 40 % como el que anuncian otros. Tu jefe de ventas propone subir los precios de lista dos semanas antes y luego 'rebajarlos' a su nivel normal con un cartel de 40 % de descuento. Dice que todos lo hacen.",
    options: [
      {
        id: "a",
        label: "Inflar el precio de lista y anunciar 40 %",
        detail: "Subes el precio tachado para que la rebaja se vea grande sin tocar tu margen.",
        effects: { cashPct: 2, demandPct: 8 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -10, reputation: -10, brand: -7 },
          text: "Usuarios compararon el historial de precios y lo publicaron. Indecopi inició un procedimiento por publicidad engañosa.",
        },
        outcome:
          "El cartel de 40 % atrajo visitas y ventas durante el evento. Varios compradores revisaron capturas anteriores y notaron que el precio final era el de siempre.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "No participar del evento",
        detail: "Mantienes tus precios y tu comunicación habitual durante esa semana.",
        effects: { demandPct: -3 },
        outcome:
          "Protegiste tu margen. Durante esa semana tus visitas cayeron porque el público estaba comparando ofertas en otras tiendas.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Descuento fuerte solo en lo que rota poco",
        detail: "Aplicas 40 % real a lo que tiene baja salida y mantienes el precio normal en el resto.",
        effects: { cashPct: 2, demandPct: 5 },
        outcome:
          "Moviste lo que estaba detenido y el descuento alto sirvió de gancho. Una parte de quienes entraron por la oferta compró también a precio normal.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Ofrecer un descuento real pero menor",
        detail: "Anuncias 15 % verdadero sobre el precio habitual en productos elegidos.",
        effects: { cashPct: -1, demandPct: 4, reputation: 2, brand: 1 },
        outcome:
          "Tu oferta se vio modesta al lado de otras, pero era comprobable. Los clientes que compararon precios te eligieron y no hubo reclamos después.",
        verdict: "optima",
      },
    ],
    concept: "Precio de referencia y descuentos reales",
    lesson:
      "El descuento se mide contra el precio que el cliente realmente pagaba antes. Inflar el precio de lista para simular una rebaja es publicidad engañosa, y hoy cualquiera puede comprobarlo con una captura.",
  },
  {
    id: "mkt-campana-escolar-decisor",
    title: "Campaña escolar: a quién le hablas",
    category: "marketing",
    industries: ["moda", "minimarket", "ecommerce", "bebidas", "pasteleria"],
    market: "B2C",
    tier: 2,
    situation:
      "Para la campaña escolar lanzas una línea pensada para niños de primaria. El estudio del consumidor muestra que el niño pide, la mamá compara y decide, y muchas veces el papá o la abuela paga. Tu presupuesto solo alcanza para un mensaje principal.",
    options: [
      {
        id: "a",
        label: "Hablarle a la mamá con duración y precio",
        detail: "El mensaje se centra en la calidad, la garantía y el costo por uso.",
        effects: { cashPct: -3, demandPct: 7, brand: 3 },
        outcome:
          "Le diste argumentos a quien decide. Las ventas subieron y varias mamás recomendaron la marca en los grupos de WhatsApp del colegio.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Hablarle al niño con personajes y colores",
        detail: "El mensaje busca que el niño reconozca el producto y lo pida.",
        effects: { cashPct: -3, demandPct: 4, brand: 2 },
        risk: {
          prob: 0.3,
          effects: { reputation: -3, brand: -2 },
          text: "Padres de familia criticaron en redes la presión publicitaria dirigida a menores.",
        },
        outcome:
          "Los niños reconocen tu producto y lo piden. Varias mamás lo descartaron al comparar precio y duración con otras marcas.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Un mensaje general para toda la familia",
        detail: "Evitas elegir y diriges la campaña a todos los integrantes del hogar.",
        effects: { cashPct: -3, demandPct: 2 },
        outcome:
          "El anuncio no molestó a nadie ni convenció a nadie. Al querer hablarle a todos, no respondió la pregunta de ninguno.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Negociar directo con colegios y APAFA",
        detail: "Ofreces paquetes por volumen a quienes arman la lista escolar.",
        effects: { cashPct: -2, demandPct: 6 },
        risk: {
          prob: 0.3,
          effects: { reputation: -4 },
          text: "Un grupo de padres reclamó porque el colegio no puede obligarlos a comprar una marca determinada.",
        },
        outcome:
          "Conseguiste dos colegios que recomendaron tu línea. La venta por volumen redujo tu costo de captación.",
        verdict: "buena",
      },
    ],
    concept: "Roles en la decisión de compra",
    lesson:
      "En muchas compras el usuario, el decisor y el pagador son personas distintas. El mensaje principal debe responder las preguntas de quien decide, sin perder la simpatía de quien usa.",
  },
  {
    id: "mkt-reposicionamiento-premium",
    title: "Subir de categoría: de barato a premium",
    category: "marketing",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Tu marca es conocida en Chiclayo por ser la opción económica. El segmento de precio bajo está saturado y los márgenes caen cada año. Un consultor propone reposicionarte hacia un público de mayor ingreso, con precios 30 % más altos, nueva presentación y otros puntos de venta.",
    options: [
      {
        id: "a",
        label: "Reposicionar la marca actual de un solo golpe",
        detail: "Cambias precios, presentación y canales en un trimestre, con el mismo nombre.",
        effects: { cashPct: -6, demandPct: -8, brand: 3, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -8, brand: -4 },
          text: "Tus clientes de siempre se fueron por el precio y el público nuevo no creyó que la marca barata ahora fuera premium.",
        },
        outcome:
          "Cambiaste precios y presentación en un trimestre. El mercado tarda bastante más que eso en cambiar la idea que tiene de una marca.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Subir la calidad primero y el precio después",
        detail: "Inviertes dos trimestres en producto y servicio antes de tocar el precio.",
        effects: { cashPct: -5, quality: 6, satisfaction: 4, brand: 3 },
        outcome:
          "Tus clientes notaron la mejora antes de pagar más por ella. Cuando ajustaste el precio, la mayoría lo consideró justificado.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Crear una segunda marca premium",
        detail: "Mantienes la marca económica y lanzas otra con nombre y canal distintos.",
        effects: { cashPct: -7, demandPct: 4, brand: 2, fixedCostPct: 3, rounds: 3 },
        outcome:
          "La marca nueva nació sin la carga de la anterior y entró a puntos de venta donde la primera no era aceptada. Administrar dos marcas te exige más gente y más orden.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Quedarte en el segmento económico",
        detail: "Sigues compitiendo por precio, donde ya te conocen.",
        effects: { demandPct: -3, rounds: 2 },
        outcome:
          "Evitaste el riesgo de un cambio grande. El segmento sigue saturado y cada trimestre peleas el mismo cliente con menos margen.",
        verdict: "riesgosa",
      },
    ],
    concept: "Posicionamiento de marca",
    lesson:
      "El posicionamiento vive en la mente del cliente y cambia despacio. Subir de segmento exige primero dar razones para creer (calidad, presentación, canal) y recién después cobrar por ellas.",
  },
  {
    id: "mkt-mezcla-de-medios",
    title: "Meta y TikTok o radio y paneles",
    category: "marketing",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tienes un presupuesto de marketing ajustado para el trimestre. Una radio regional de Piura te ofrece un paquete de avisos en horario estelar y una empresa de paneles, una ubicación en la avenida principal. Tu community manager insiste en que con ese dinero en Meta y TikTok podrías segmentar por edad, distrito e intereses.",
    options: [
      {
        id: "a",
        label: "Todo a radio y paneles",
        detail: "Buscas que toda la ciudad escuche y vea tu marca.",
        effects: { cashPct: -5, brand: 5, demandPct: 2 },
        outcome:
          "Mucha gente escuchó y vio tu marca, incluso quienes nunca te comprarían. No pudiste saber cuántas ventas vinieron de la radio y cuántas del panel.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Probar con poco, medir y escalar el canal ganador",
        detail: "Haces pruebas pequeñas en ambos tipos de medios con códigos de descuento distintos y luego asignas el resto.",
        effects: { cashPct: -5, demandPct: 8, brand: 4 },
        outcome:
          "Los códigos mostraron que TikTok traía clientes jóvenes y la radio, clientes mayores con ticket más alto. Repartiste el saldo según el costo por cliente de cada canal.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Todo a Meta y TikTok con segmentación",
        detail: "Diriges los anuncios solo al perfil de quienes ya te compran.",
        effects: { cashPct: -5, demandPct: 7, brand: 2 },
        outcome:
          "Pudiste medir el costo por cliente y apagar los anuncios que no vendían. Tu marca sigue siendo poco conocida fuera del público que segmentaste.",
        verdict: "buena",
      },
    ],
    concept: "Mezcla de medios y costo por adquisición",
    lesson:
      "Ningún canal es mejor en abstracto. Se elige comparando cuánto cuesta conseguir un cliente en cada medio, y para comparar primero hay que poder medir, por ejemplo con códigos distintos por canal.",
  },
  {
    id: "mkt-marketing-con-causa",
    title: "Campaña solidaria por el friaje",
    category: "marketing",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Llega la temporada de friaje en Puno y tu equipo propone una campaña: por cada venta, donarás una parte para comprar frazadas destinadas a comunidades altoandinas. La idea gusta, pero el área de finanzas pregunta cuánto se donará realmente y quién lo va a verificar.",
    options: [
      {
        id: "a",
        label: "Donar un monto fijo por venta y rendir cuentas",
        detail: "Te alías con una organización reconocida, defines el aporte por unidad y publicas el resultado con comprobantes.",
        effects: { cashPct: -3, brand: 6, reputation: 5, demandPct: 3, morale: 3 },
        outcome:
          "La organización aliada entregó las frazadas y publicaste la rendición completa. Tus trabajadores participaron como voluntarios y la campaña generó orgullo interno.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Anunciar la causa sin precisar el monto",
        detail: "Comunicas que 'parte de las ventas' irá a la causa y decides la cifra al final.",
        effects: { cashPct: -1, demandPct: 3, brand: 2 },
        risk: {
          prob: 0.4,
          effects: { brand: -6, reputation: -7 },
          text: "Un periodista pidió la cifra donada. Resultó mínima frente a lo gastado en publicidad y te acusaron de lucrar con la desgracia.",
        },
        outcome:
          "La campaña atrajo simpatía al inicio. Al cierre, varios clientes preguntaron cuánto se donó y no tenías una respuesta clara.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Donar sin hacer publicidad",
        detail: "Haces el aporte como empresa y no lo usas en tu comunicación comercial.",
        effects: { cashPct: -2, morale: 3, reputation: 2 },
        outcome:
          "Hiciste la donación en silencio. Tu equipo lo valoró, aunque el mercado nunca se enteró y no hubo efecto en ventas.",
        verdict: "buena",
      },
    ],
    concept: "Marketing con causa",
    lesson:
      "El marketing con causa funciona cuando la causa es coherente con la marca, el aporte es concreto y la rendición es pública. Si la publicidad cuesta más que la donación, el público lo percibe como oportunismo.",
  },
  {
    id: "mkt-segmentacion-para-todos",
    title: "Mi producto es para todo el mundo",
    category: "marketing",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Tu socio insiste en que el producto 'es para todos' y quiere anuncios dirigidos a toda la población de Lima entre 18 y 65 años. Los datos de venta dicen otra cosa: siete de cada diez compras vienen de mujeres de 28 a 40 años de Lima Norte que compran por el celular.",
    options: [
      {
        id: "a",
        label: "Anunciar a todo Lima",
        detail: "Amplías el alcance al máximo para no dejar a nadie fuera.",
        effects: { cashPct: -4, demandPct: 2 },
        outcome:
          "El presupuesto se diluyó entre millones de personas que vieron el anuncio una sola vez. El costo de cada venta se duplicó.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "80 % al segmento principal y 20 % a explorar otro",
        detail: "Proteges tu base y pruebas con poco dinero un segundo público parecido.",
        effects: { cashPct: -4, demandPct: 7, brand: 3 },
        outcome:
          "El segmento principal respondió como esperabas. La prueba mostró que los hombres de 30 a 45 años compran para regalar, un dato que no tenías.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Todo el presupuesto al segmento que ya compra",
        detail: "Concentras los anuncios en el perfil que muestran tus datos de venta.",
        effects: { cashPct: -4, demandPct: 7, brand: 2 },
        outcome:
          "Tu público principal vio el mensaje varias veces y en un lenguaje que reconoce como propio. Las ventas subieron sin gastar un sol más.",
        verdict: "buena",
      },
    ],
    concept: "Segmentación y público objetivo",
    lesson:
      "Quien le habla a todos no le habla a nadie. Segmentar es renunciar a una parte del mercado para ser relevante en la otra, y tus propios datos de venta son el mejor punto de partida.",
  },
  {
    id: "mkt-precio-psicologico",
    title: "S/ 100 o S/ 99.90",
    category: "marketing",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Vas a fijar el precio de tu producto principal. El costo y el margen objetivo te llevan a S/ 100. Tu jefa de ventas propone S/ 99.90 porque 'se ve más barato'. Tu diseñador opina que los decimales le quitan elegancia a una marca que también tiene una línea para un público exigente.",
    options: [
      {
        id: "a",
        label: "S/ 99.90 en toda la línea",
        detail: "Aplicas la terminación en 90 a todos los productos.",
        effects: { demandPct: 4, brand: -2 },
        outcome:
          "Las ventas subieron un poco, sobre todo en los productos de entrada. En la línea más cara, el precio con decimales se sintió como de tienda de descuento.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "S/ 100 cerrado en toda la línea",
        detail: "Usas precios redondos en todos los productos.",
        effects: { demandPct: -1, brand: 2 },
        outcome:
          "La lista de precios se ve limpia y coherente con la imagen de la marca. En los productos básicos, algunos clientes eligieron al competidor que cobra S/ 99.90.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Subir a S/ 109.90 para ganar más margen",
        detail: "Aprovechas la terminación atractiva para cobrar un poco más.",
        effects: { cashPct: 2, demandPct: -6 },
        outcome:
          "Cruzaste la barrera de los cien soles y el cliente lo notó. El margen extra por unidad no compensó las unidades que dejaste de vender.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Decimales en lo básico y redondo en lo premium",
        detail: "Usas una terminación distinta según el tipo de producto y de cliente.",
        effects: { demandPct: 4, brand: 2 },
        outcome:
          "El precio terminado en 90 funcionó donde el cliente compara, y el precio redondo reforzó la imagen de calidad donde el cliente busca estatus.",
        verdict: "optima",
      },
    ],
    concept: "Precio psicológico",
    lesson:
      "El cliente lee los precios de izquierda a derecha y el primer dígito pesa más. Los precios terminados en 9 comunican ahorro y los redondos comunican calidad, así que la terminación debe ser coherente con el posicionamiento.",
  },
  {
    id: "mkt-lanzamiento-fallido",
    title: "El lanzamiento que no despegó",
    category: "marketing",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Hace dos trimestres lanzaste una nueva línea en la que invertiste fuerte. Vende la tercera parte de lo proyectado. El gerente de producto pide más presupuesto de publicidad: 'Ya metimos demasiado como para abandonarla ahora'. El estudio de mercado indica que el cliente no entiende para qué sirve.",
    options: [
      {
        id: "a",
        label: "Duplicar la publicidad para salvar la inversión",
        detail: "Aumentas la exposición del producto tal como está.",
        effects: { cashPct: -6, demandPct: 2 },
        outcome:
          "Más gente conoció el producto y siguió sin entender por qué lo necesitaba. Sumaste un gasto nuevo a una inversión que ya no podías recuperar.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Retirar la línea y asumir la pérdida",
        detail: "Liquidas el inventario y reasignas al equipo.",
        effects: { cashPct: -2, morale: -2, fixedCostPct: -2 },
        outcome:
          "Liberaste al equipo para los productos que sí venden. Dolió reconocer el error, pero la línea dejó de consumir caja.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Reformular y probar en una sola zona",
        detail: "Corriges mensaje y presentación según el estudio y pruebas un trimestre, con presupuesto acotado.",
        effects: { cashPct: -2, demandPct: 3, quality: 2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -2 },
          text: "La prueba confirmó que el problema era el producto y no el mensaje. Tuviste que retirarlo de todos modos.",
        },
        outcome:
          "Definiste de antemano qué resultado justificaría continuar. La prueba costó poco y te dio una respuesta con datos en lugar de opiniones.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Dejarla en el catálogo sin invertir más",
        detail: "No la retiras ni la impulsas, a la espera de que el mercado reaccione.",
        effects: { fixedCostPct: 1, brand: -2 },
        outcome:
          "La línea sigue ocupando espacio, inventario y atención de tus vendedores. Nadie decidió nada y el costo de mantenerla se repite cada trimestre.",
        verdict: "riesgosa",
      },
    ],
    concept: "Costo hundido",
    lesson:
      "Lo ya invertido no se recupera con ninguna decisión, por eso no debe pesar al elegir. La pregunta correcta es si el próximo sol invertido rendirá más aquí o en otra parte.",
  },
  {
    id: "mkt-programa-referidos",
    title: "Que tus clientes te traigan clientes",
    category: "marketing",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Conseguir un cliente nuevo con anuncios te cuesta cada vez más. Al revisar tus ventas descubres que casi la mitad de los clientes nuevos llegó por recomendación de un conocido, sin que hicieras nada para promoverlo. Tu equipo propone formalizar un programa de referidos.",
    options: [
      {
        id: "a",
        label: "Pagar comisión en efectivo por cada contacto",
        detail: "Quien envía un contacto interesado recibe un pago, compre o no.",
        effects: { cashPct: -3, demandPct: 4 },
        risk: {
          prob: 0.35,
          effects: { satisfaction: -3, brand: -3, productivityPct: -3 },
          text: "Aparecieron personas que enviaban contactos sin interés real solo para cobrar, y tus vendedores perdieron tiempo.",
        },
        outcome:
          "La comisión atrajo muchos contactos. Algunos clientes empezaron a recomendar por el pago y no por convicción, y eso se notó en la calidad de los referidos.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Premiar a quien recomienda y a quien llega",
        detail: "Ambos reciben un beneficio cuando el referido concreta su primera compra.",
        effects: { cashPct: -2, demandPct: 7, satisfaction: 3, rounds: 2 },
        outcome:
          "El beneficio doble le dio al cliente una razón para recomendar sin sentir que se aprovechaba de su amigo. Los referidos llegaron con confianza previa y compraron más rápido.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "No premiar: que la recomendación sea espontánea",
        detail: "Dejas que el boca a boca siga su curso natural.",
        effects: { demandPct: 1 },
        outcome:
          "Las recomendaciones siguieron llegando al mismo ritmo de siempre. Dejaste sin aprovechar tu canal más barato.",
        verdict: "buena",
      },
    ],
    concept: "Marketing de referidos",
    lesson:
      "Un referido llega con la confianza prestada de quien lo recomendó, por eso cuesta menos y se queda más tiempo. El incentivo funciona mejor cuando premia a los dos y se paga solo cuando hay compra real.",
  },
  {
    id: "mkt-viral-inesperado",
    title: "Te hiciste viral sin querer",
    category: "marketing",
    industries: "all",
    market: "B2C",
    tier: 2,
    situation:
      "Una creadora de contenido de Cusco mostró tu producto en un video espontáneo y se volvió tendencia. En tres días recibiste más pedidos que en todo el mes anterior. Tu capacidad no alcanza para atender ni la mitad y los mensajes sin responder se acumulan en WhatsApp.",
    options: [
      {
        id: "a",
        label: "Aceptar todos los pedidos y ver cómo cumplir",
        detail: "Cobras adelantos y prometes los plazos de siempre.",
        effects: { cashPct: 6, demandPct: 10 },
        risk: {
          prob: 0.6,
          effects: { satisfaction: -8, brand: -6, quality: -4 },
          text: "Las entregas se atrasaron semanas, la calidad bajó por el apuro y los nuevos clientes publicaron su decepción.",
        },
        outcome:
          "La caja se llenó de adelantos. El equipo trabajó al límite y aun así los plazos prometidos resultaron imposibles.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Ampliar capacidad de inmediato con deuda",
        detail: "Contratas personal y compras equipos para atender el nuevo nivel de demanda.",
        effects: { cashPct: -8, fixedCostPct: 6, demandPct: 8, rounds: 3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -5, morale: -3 },
          text: "La ola pasó en dos meses. Te quedaste con capacidad ociosa, cuotas por pagar y personal que tuviste que reducir.",
        },
        outcome:
          "En un mes ya podías atender el doble. Queda por ver cuánta de esa demanda viral se convertirá en demanda permanente.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Subir el precio mientras dure la ola",
        detail: "Ajustas el precio hacia arriba para regular la demanda y ganar más por unidad.",
        effects: { cashPct: 5, demandPct: 3, brand: -4, satisfaction: -3 },
        outcome:
          "Ganaste más por unidad durante unas semanas. Varios usuarios publicaron la comparación de precios de antes y después del video.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Abrir lista de espera con fechas reales",
        detail: "Aceptas pedidos hasta tu capacidad y al resto le ofreces una fecha cierta con reserva.",
        effects: { cashPct: 4, demandPct: 7, satisfaction: 3, brand: 4 },
        outcome:
          "Perdiste a los impacientes y conservaste a quienes de verdad querían el producto. La lista de espera se convirtió en parte del atractivo.",
        verdict: "optima",
      },
    ],
    concept: "Gestión de un pico de demanda",
    lesson:
      "Un pico viral es demanda prestada, no demanda permanente. Conviene capturarlo sin prometer lo que no puedes cumplir y sin asumir costos fijos hasta comprobar cuánta de esa demanda se queda.",
  },
  {
    id: "mkt-rebranding",
    title: "Nuevo nombre y nuevo logo",
    category: "marketing",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Tu empresa tiene 15 años y el logo se ve anticuado. Una agencia propone un rebranding completo: nombre más corto, logo moderno y nuevos colores. Tus clientes antiguos te reconocen por el nombre actual y tus vendedores temen que el cambio confunda. Habría que cambiar letreros, empaques, uniformes y web.",
    options: [
      {
        id: "a",
        label: "Cambiar nombre y logo de una sola vez",
        detail: "Lanzas la nueva identidad completa en una fecha única.",
        effects: { cashPct: -7, brand: -3, demandPct: -3 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -5, brand: -3, rounds: 2 },
          text: "Muchos clientes creyeron que la empresa había cambiado de dueño o cerrado, y algunos se fueron a la competencia.",
        },
        outcome:
          "La nueva identidad se ve actual. Perdiste de golpe el reconocimiento acumulado en 15 años y tienes que volver a construirlo.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Investigar qué asocia el cliente con la marca",
        detail: "Encargas un estudio antes de tocar cualquier elemento de la identidad.",
        effects: { cashPct: -2, brand: 2 },
        outcome:
          "El estudio mostró que el nombre era tu mayor activo y que lo anticuado era solo la presentación. Evitaste cambiar lo que sí funcionaba, aunque la renovación quedó para más adelante.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Modernizar el logo y conservar el nombre",
        detail: "Actualizas tipografía y colores por etapas, manteniendo los elementos que el cliente reconoce.",
        effects: { cashPct: -4, brand: 5, demandPct: 2 },
        outcome:
          "Los clientes notaron una marca renovada sin dejar de reconocerla. El cambio gradual te permitió agotar empaques y reemplazar letreros por etapas.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "No cambiar nada",
        detail: "Mantienes la identidad actual y destinas el dinero a otras prioridades.",
        effects: { brand: -2 },
        outcome:
          "Ahorraste el gasto. La marca sigue siendo reconocida por los clientes antiguos y cada año resulta menos atractiva para los jóvenes.",
        verdict: "riesgosa",
      },
    ],
    concept: "Rebranding y valor de marca",
    lesson:
      "El valor de marca es el reconocimiento y las asociaciones acumuladas en años. Un rebranding debe actualizar la forma sin tirar ese capital, y antes de cambiar conviene saber qué parte de la marca valora el cliente.",
  },
  {
    id: "mkt-patrocinio-deportivo",
    title: "Tu marca en la camiseta del club",
    category: "marketing",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "El club de fútbol de tu ciudad, que llena el estadio cada fin de semana, te ofrece ser auspiciador en la camiseta por toda la temporada. El monto equivale a la mitad de tu presupuesto anual de marketing. El dueño de la empresa es hincha y está entusiasmado.",
    options: [
      {
        id: "a",
        label: "Negociar un auspicio menor con activaciones",
        detail: "Pagas menos por un espacio secundario y pides sorteos, presencia en el estadio y contacto con hinchas que lo autoricen.",
        effects: { cashPct: -4, brand: 5, demandPct: 4, rounds: 2 },
        outcome:
          "Las activaciones en el estadio te dieron contacto directo con los hinchas. Con los códigos de descuento pudiste medir cuántos se convirtieron en clientes.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Firmar el auspicio principal por la temporada",
        detail: "Tu logo va en el pecho de la camiseta durante todo el campeonato.",
        effects: { cashPct: -8, brand: 7, demandPct: 2, rounds: 3 },
        risk: {
          prob: 0.35,
          effects: { brand: -5 },
          text: "El club tuvo una mala campaña y un escándalo de indisciplina, y tu marca quedó asociada a esas noticias.",
        },
        outcome:
          "Tu logo apareció en cada partido y en las fotos de prensa. Al final del año no pudiste demostrar cuántas ventas trajo el auspicio.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Rechazar y mantener tus canales habituales",
        detail: "Conservas el presupuesto en los medios que ya sabes medir.",
        effects: { morale: -1 },
        outcome:
          "Seguiste invirtiendo donde conoces el retorno. Otra empresa de la ciudad tomó el espacio en la camiseta.",
        verdict: "buena",
      },
    ],
    concept: "Patrocinio y retorno de la inversión",
    lesson:
      "Un patrocinio compra visibilidad y asociación emocional, no ventas automáticas. Se justifica cuando el público del patrocinado coincide con el tuyo y el contrato incluye formas de activar y medir.",
  },

  // CLIENTES (16)
  {
    id: "cli-reclamo-grave",
    title: "Reclamo grave en el libro de reclamaciones",
    category: "clientes",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Una clienta de Tacna registró un reclamo en tu libro de reclamaciones: lo que le vendiste falló y le arruinó un evento familiar importante. Pide la devolución del dinero y una compensación. Tu encargado opina que la clienta tuvo parte de la culpa, aunque no tiene cómo probarlo.",
    options: [
      {
        id: "a",
        label: "No responder el reclamo",
        detail: "Archivas la hoja de reclamación y esperas que la clienta desista.",
        effects: { satisfaction: -6 },
        risk: {
          prob: 0.7,
          effects: { cashPct: -8, reputation: -9 },
          text: "Indecopi te sancionó por no atender el reclamo dentro del plazo, además de la infracción original.",
        },
        outcome:
          "La hoja de reclamación quedó sin respuesta. Contestar los reclamos del libro es una obligación, no una cortesía.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Devolver solo el dinero",
        detail: "Atiendes el pedido principal y no ofreces compensación.",
        effects: { cashPct: -1, satisfaction: 1, reputation: 1 },
        outcome:
          "Cumpliste con lo esencial. La clienta quedó conforme a medias y no volvió a comprar.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Rechazar el reclamo y culpar a la clienta",
        detail: "Respondes por escrito que la falla se debió a un mal uso.",
        effects: { satisfaction: -5 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -6, reputation: -7, brand: -4 },
          text: "La clienta denunció ante Indecopi. Como no pudiste sustentar tu versión, te ordenaron devolver el dinero y pagar una multa.",
        },
        outcome:
          "Le respondiste que la falla fue responsabilidad suya. La clienta no aceptó la explicación y anunció que llevaría el caso más lejos.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Devolver el dinero y sumar un gesto adicional",
        detail: "Respondes dentro del plazo, devuelves el pago y agregas una atención de cortesía.",
        effects: { cashPct: -2, satisfaction: 5, reputation: 3, brand: 2 },
        outcome:
          "La clienta recibió una llamada tuya, su dinero y una atención. Retiró su queja de las redes y contó cómo resolviste el problema.",
        verdict: "optima",
      },
    ],
    concept: "Recuperación del servicio",
    lesson:
      "Un reclamo bien resuelto puede dejar al cliente más leal que si nunca hubiera tenido el problema. En el Perú, además, el libro de reclamaciones es obligatorio y conviene tener pruebas antes de culpar al cliente.",
  },
  {
    id: "cli-cliente-grande-descuento",
    title: "Tu mayor cliente exige 15 % de descuento",
    category: "clientes",
    industries: "all",
    market: "B2B",
    tier: 2,
    situation:
      "Tu cliente más grande, que representa 25 % de tus ventas, te cita a renegociar el contrato anual. Su jefe de compras pide 15 % de descuento y pago a 90 días, y deja caer que ya tiene una cotización de tu competencia. Con ese descuento la cuenta apenas cubriría sus costos.",
    options: [
      {
        id: "a",
        label: "Ofrecer descuento a cambio de volumen y plazo",
        detail: "Propones una escala: el descuento crece solo si el cliente compra más y firma por dos años.",
        effects: { cashPct: -2, demandPct: 4, rounds: 3 },
        outcome:
          "El comprador obtuvo una cifra para mostrar a su gerencia y tú aseguraste volumen por dos años. Cada concesión tuvo una contrapartida.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Aceptar todo para no perder la cuenta",
        detail: "Concedes el descuento y el plazo de pago que piden.",
        effects: { cashPct: -6, morale: -2 },
        outcome:
          "Conservaste el volumen y perdiste casi todo el margen de la cuenta. El próximo año el comprador ya sabe que ceder es tu respuesta.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Mantener el precio y defender tu valor",
        detail: "Presentas lo que tu servicio le ahorra: fallas evitadas, tiempos de respuesta y soporte.",
        effects: { satisfaction: 1 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -12, rounds: 2 },
          text: "El cliente cumplió su amenaza y trasladó la mayor parte de sus compras a tu competidor.",
        },
        outcome:
          "Llevaste números sobre el costo total para el cliente. El comprador escuchó, aunque su bono depende de conseguir rebajas.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Dar el descuento y bajar la calidad sin avisar",
        detail: "Recuperas el margen con insumos más baratos y menos horas de servicio.",
        effects: { cashPct: -1, quality: -5 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -12, reputation: -8, satisfaction: -8, cashPct: -4 },
          text: "El cliente detectó el cambio de especificaciones, aplicó penalidades y canceló el contrato.",
        },
        outcome:
          "El margen se mantuvo en el papel. El contrato describe especificaciones que ya no estás cumpliendo.",
        verdict: "mala",
      },
    ],
    concept: "Poder de negociación del cliente",
    lesson:
      "Negociar no es ceder ni resistir, es intercambiar. Toda concesión en precio debe tener una contrapartida en volumen, plazo o condiciones de pago.",
  },
  {
    id: "cli-dependencia-un-cliente",
    title: "Un solo cliente compra el 60 % de lo que vendes",
    category: "clientes",
    industries: "all",
    market: "B2B",
    tier: 3,
    situation:
      "Una minera de la sierra central compra el 60 % de tus ventas y paga puntual. Ahora te propone ampliar el contrato, lo que exigiría dedicarle casi toda tu capacidad y endeudarte para crecer. Tu contador te advierte que si esa cuenta se cae, la empresa no aguanta tres meses.",
    options: [
      {
        id: "a",
        label: "Aceptar la ampliación completa",
        detail: "Te endeudas y dedicas casi toda la operación a ese cliente.",
        effects: { cashPct: -6, demandPct: 12, fixedCostPct: 5, rounds: 3 },
        risk: {
          prob: 0.3,
          effects: { demandPct: -30, cashPct: -10, rounds: 2 },
          text: "Un conflicto social paralizó la operación de la minera y los pedidos se suspendieron por meses. Te quedaste con la deuda y sin ventas.",
        },
        outcome:
          "Tus ventas crecieron con un cliente que paga bien. En la práctica, tu empresa funciona ahora como un área más de la minera.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Aceptar con contrato largo y compras mínimas",
        detail: "Condicionas la inversión a un contrato de tres años con volumen garantizado y penalidad por salida.",
        effects: { cashPct: -5, demandPct: 10, fixedCostPct: 4, rounds: 3 },
        risk: {
          prob: 0.2,
          effects: { demandPct: -8 },
          text: "La minera no aceptó las compras mínimas y redujo el pedido al volumen anterior.",
        },
        outcome:
          "El contrato traslada parte del riesgo al cliente. Sigue siendo una sola cuenta, pero ahora tu inversión tiene respaldo legal.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Aceptar una parte y salir a diversificar",
        detail: "Tomas lo que puedes atender sin deuda y asignas un vendedor a buscar cuentas medianas en otros sectores.",
        effects: { cashPct: -3, demandPct: 6, rounds: 3 },
        outcome:
          "Creciste menos de lo posible. En un año la minera bajó a 45 % de tus ventas y ganaste tres clientes medianos de otros rubros.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Rechazar la ampliación",
        detail: "Mantienes el volumen actual con la minera y no cambias nada más.",
        effects: { demandPct: -2, satisfaction: -2 },
        outcome:
          "Mantuviste el tamaño actual. La minera buscó a otro proveedor para el volumen adicional y ahora tiene con quién compararte.",
        verdict: "riesgosa",
      },
    ],
    concept: "Concentración de cartera",
    lesson:
      "Un cliente que pesa más de un tercio de tus ventas es también tu mayor riesgo. La diversificación se financia mientras la cuenta grande va bien, no cuando se cae.",
  },
  {
    id: "cli-fidelizacion",
    title: "Aplicación de puntos o algo más simple",
    category: "clientes",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Tus clientes compran una vez y tardan en volver. Una empresa de software te ofrece una aplicación de puntos con tu marca. Tu administradora propone algo más simple: registrar el celular de cada cliente, con su permiso, y enviarle un beneficio por WhatsApp en su quinta compra.",
    options: [
      {
        id: "a",
        label: "Contratar la aplicación de puntos",
        detail: "Tus clientes descargan la aplicación y acumulan puntos canjeables.",
        effects: { cashPct: -4, fixedCostPct: 2, demandPct: 3, satisfaction: 1 },
        outcome:
          "La aplicación se ve profesional. Pocos clientes la descargaron y menos aún recuerdan cuántos puntos tienen o para qué sirven.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Beneficio por WhatsApp en la quinta compra",
        detail: "Llevas el registro por número de celular y premias la recompra.",
        effects: { cashPct: -1, demandPct: 6, satisfaction: 4, rounds: 2 },
        outcome:
          "La regla era fácil de entender y el premio se sentía cercano. La frecuencia de compra subió y ahora tienes una base de clientes que aceptó recibir tus mensajes.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Descuento permanente de 10 % a registrados",
        detail: "Todo cliente que se registra paga menos en cada compra.",
        effects: { cashPct: -4, demandPct: 4 },
        outcome:
          "Casi todos se registraron. El descuento dejó de ser un premio y se volvió tu nuevo precio, incluso para quienes igual iban a volver.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Sin programa: mejorar la atención",
        detail: "Inviertes en capacitar al equipo y en reducir demoras.",
        effects: { cashPct: -2, satisfaction: 4, quality: 2, morale: 1 },
        outcome:
          "Capacitaste al equipo y corregiste las demoras. Los clientes volvieron un poco más, aunque sin un registro no puedes saber quiénes ni cuánto.",
        verdict: "buena",
      },
    ],
    concept: "Retención y frecuencia de compra",
    lesson:
      "Retener a un cliente cuesta menos que conseguir uno nuevo. Un programa de fidelización funciona cuando la regla es simple, el premio es alcanzable y se premia la compra adicional, no la que igual iba a ocurrir.",
  },
  {
    id: "cli-posventa-garantia",
    title: "La falla llegó un mes después de la garantía",
    category: "clientes",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Un cliente de Huancayo vuelve con un problema que apareció a los 13 meses, un mes después de vencida la garantía. Es un cliente antiguo que te ha comprado varias veces y te ha recomendado. Corregirlo tiene un costo moderado. Tu técnico dice que la falla es de origen y no de uso.",
    options: [
      {
        id: "a",
        label: "Ofrecerle un descuento para que compre de nuevo",
        detail: "En lugar de reparar, propones reemplazar con una rebaja.",
        effects: { cashPct: 1, satisfaction: -3 },
        outcome:
          "El cliente sintió que aprovechabas la falla para venderle. Aceptó el descuento solo porque lo necesitaba con urgencia.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Cobrar la reparación completa",
        detail: "Aplicas la regla tal como está escrita.",
        effects: { cashPct: 1, satisfaction: -5 },
        outcome:
          "El cliente pagó, sabiendo que la falla era de origen. Esa semana empezó a cotizar con otra marca.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Cobrar los repuestos y asumir la mano de obra",
        detail: "Compartes el costo de la reparación con el cliente.",
        effects: { satisfaction: 3 },
        outcome:
          "Compartir el costo le pareció justo al cliente. Cubriste tus materiales y mantuviste la relación.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Reparar sin costo como gesto comercial",
        detail: "Asumes el costo y dejas claro que es una excepción por su historial.",
        effects: { cashPct: -1, satisfaction: 5, brand: 2 },
        outcome:
          "El cliente quedó sorprendido y lo contó entre sus conocidos. Entendió que fue una atención por su historial, no una ampliación de la garantía.",
        verdict: "optima",
      },
    ],
    concept: "Servicio posventa",
    lesson:
      "La garantía fija el mínimo al que estás obligado, no el máximo que puedes ofrecer. Con un cliente valioso, el costo de un gesto posventa suele ser menor que el valor de sus compras y recomendaciones futuras.",
  },
  {
    id: "cli-politica-devoluciones",
    title: "Devoluciones: política flexible o estricta",
    category: "clientes",
    industries: "all",
    market: "B2C",
    tier: 1,
    situation:
      "Vendes cada vez más por internet y las devoluciones crecen. Hoy solo aceptas cambios por falla. Tu competencia anuncia 'devolución gratis en 30 días, sin preguntas'. Tu jefe de operaciones teme que los clientes abusen. Tu jefa de ventas dice que muchos no compran por miedo a equivocarse.",
    options: [
      {
        id: "a",
        label: "Devolución gratis en 30 días, sin preguntas",
        detail: "Igualas la política de tu competidor y asumes el costo del envío de regreso.",
        effects: { cashPct: -3, demandPct: 8, satisfaction: 4 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -3 },
          text: "Un grupo de clientes usó la compra para una ocasión y luego la devolvió. El costo logístico fue mayor al previsto.",
        },
        outcome:
          "Las ventas en línea subieron porque comprar dejó de sentirse como un riesgo. Operaciones ahora procesa muchos más paquetes de regreso.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Devolución en 15 días, sin uso y con etiqueta",
        detail: "El cliente puede devolver, paga el envío de regreso y elige entre su dinero o una nota de crédito.",
        effects: { cashPct: -1, demandPct: 5, satisfaction: 3 },
        outcome:
          "La regla clara redujo el miedo a comprar y filtró los abusos. La mayoría eligió la nota de crédito y volvió a comprar.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Mantener solo cambios por falla",
        detail: "Conservas la política actual, que limita la devolución a lo exigible.",
        effects: { demandPct: -3, satisfaction: -2 },
        outcome:
          "Tus costos de devolución siguen bajos. Los clientes indecisos compran donde les permiten arrepentirse.",
        verdict: "riesgosa",
      },
    ],
    concept: "Política de devoluciones",
    lesson:
      "Una política de devoluciones es una herramienta de ventas, no solo un costo. Reduce el riesgo que percibe el cliente, y sus condiciones deben equilibrar esa confianza con el control del abuso.",
  },
  {
    id: "cli-credito-cliente-nuevo",
    title: "Un pedido grande, pero a 60 días",
    category: "clientes",
    industries: "all",
    market: "B2B",
    tier: 2,
    situation:
      "Una constructora de Arequipa que nunca te ha comprado te hace un pedido equivalente a un mes de ventas, con pago a 60 días. No tienes referencias comerciales de ella. Tu vendedor quiere cerrar ya porque le salva la meta del trimestre. Para atender el pedido tendrías que pagar tus costos al contado.",
    options: [
      {
        id: "a",
        label: "Aceptar el crédito a 60 días",
        detail: "Cierras la venta con las condiciones que pide el cliente.",
        effects: { cashPct: -6, demandPct: 10 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -12 },
          text: "La constructora pagó con meses de atraso y una parte nunca la cobraste. Tuviste que usar un sobregiro para pagar la planilla.",
        },
        outcome:
          "Facturaste un gran trimestre en el papel. El IGV de esa factura se declara en el mes de la venta, aunque el cliente todavía no te haya pagado.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Pedir 50 % de adelanto y saldo contra entrega",
        detail: "Condicionas la venta a un pago inicial que cubra tus costos.",
        effects: { cashPct: 2, demandPct: 5 },
        risk: {
          prob: 0.3,
          effects: { demandPct: -5 },
          text: "La constructora no aceptó las condiciones y le compró a otro proveedor.",
        },
        outcome:
          "El adelanto cubrió tus costos. Explicaste que, sin historial entre ambas empresas, era la forma razonable de empezar.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Evaluar al cliente y documentar la deuda",
        detail: "Revisas centrales de riesgo y referencias, y emites una factura negociable o una letra que puedas descontar.",
        effects: { cashPct: -2, demandPct: 8 },
        outcome:
          "La evaluación tomó una semana y salió aceptable. Con la factura negociable obtuviste liquidez antes del vencimiento, a cambio de una tasa de descuento.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Rechazar el pedido",
        detail: "No vendes a crédito a clientes sin historial.",
        effects: { morale: -2 },
        outcome:
          "No arriesgaste tu caja. Tampoco averiguaste si era un buen cliente, y tu vendedor sintió que le quitaste la venta del año.",
        verdict: "riesgosa",
      },
    ],
    concept: "Crédito comercial y riesgo de cobranza",
    lesson:
      "Vender no es lo mismo que cobrar. Antes de dar crédito se evalúa al cliente, se documenta la deuda y se calcula si la caja aguanta el plazo, porque los impuestos y la planilla no esperan.",
  },
  {
    id: "cli-nps-malos-resultados",
    title: "La encuesta salió peor de lo esperado",
    category: "clientes",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Hiciste tu primera encuesta de satisfacción y el NPS salió negativo: hay más detractores que promotores. El gerente comercial cuestiona la encuesta ('solo contestan los molestos') y propone no difundirla. Los comentarios abiertos repiten dos temas: demora en responder y promesas de venta que no se cumplen.",
    options: [
      {
        id: "a",
        label: "Llamar a los detractores y atacar las dos causas",
        detail: "Contactas a cada cliente insatisfecho y asignas responsables para las dos fallas repetidas.",
        effects: { cashPct: -2, satisfaction: 6, quality: 2, brand: 2 },
        outcome:
          "Varios detractores se sorprendieron de recibir una llamada. Al corregir los tiempos de respuesta y el discurso de ventas, la siguiente medición mejoró.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Archivar el resultado y repetir más adelante",
        detail: "Consideras que la muestra no es representativa y esperas otra medición.",
        effects: { satisfaction: -3, demandPct: -2 },
        outcome:
          "Nadie más vio los resultados. Los problemas señalados siguieron ocurriendo y quienes contestaron notaron que su opinión no cambió nada.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Atar el bono de los vendedores al NPS",
        detail: "El indicador pasa a ser parte de la remuneración variable.",
        effects: { satisfaction: 2, morale: -3 },
        risk: {
          prob: 0.4,
          effects: { satisfaction: -3, reputation: -2 },
          text: "Algunos vendedores empezaron a pedir a los clientes que pusieran nota 10 y a encuestar solo a los contentos.",
        },
        outcome:
          "El indicador subió rápido. No está claro si mejoró la experiencia del cliente o solo la forma de llenar la encuesta.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Regalar un descuento a todos los encuestados",
        detail: "Compensas el malestar con un beneficio en la próxima compra.",
        effects: { cashPct: -2, satisfaction: 2 },
        outcome:
          "El gesto cayó bien por unos días. Las demoras y las promesas incumplidas siguieron igual, porque el descuento no tocó las causas.",
        verdict: "riesgosa",
      },
    ],
    concept: "Net Promoter Score (NPS)",
    lesson:
      "El NPS sirve como termómetro, no como meta. Su valor está en los comentarios y en cerrar el ciclo con cada detractor. Cuando un indicador se vuelve objetivo de bono, la gente aprende a mover el número y no la realidad.",
  },
  {
    id: "cli-cliente-abusivo",
    title: "El cliente que insulta a tu personal",
    category: "clientes",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Un cliente frecuente, que compra bastante, tiene la costumbre de gritar e insultar a tus trabajadores cuando algo no sale como quiere. Ayer hizo llorar a una vendedora delante de otros clientes. El equipo espera ver qué haces. El cliente amenaza con irse si 'no lo atienden como merece'.",
    options: [
      {
        id: "a",
        label: "Asignarle siempre al supervisor",
        detail: "Solo una persona con más experiencia lo atenderá.",
        effects: { morale: 2, productivityPct: -2 },
        outcome:
          "El supervisor maneja mejor la tensión y el resto del equipo quedó protegido. El maltrato continúa, solo cambió de destinatario.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Pedir al personal que tenga paciencia",
        detail: "Priorizas la venta y recomiendas al equipo no tomarlo personal.",
        effects: { morale: -7, productivityPct: -4 },
        risk: {
          prob: 0.3,
          effects: { morale: -4, cashPct: -2 },
          text: "La vendedora renunció y tuviste que reclutar y capacitar a su reemplazo en plena campaña.",
        },
        outcome:
          "El cliente siguió comprando y gritando. El equipo entendió que las ventas valen más que su dignidad.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Dejar de atenderlo de inmediato",
        detail: "Le comunicas que ya no le venderás, sin conversación previa.",
        effects: { morale: 4, demandPct: -2 },
        risk: {
          prob: 0.3,
          effects: { brand: -3 },
          text: "El cliente publicó su versión en redes y no tenías registro de los incidentes anteriores para responder.",
        },
        outcome:
          "Cortaste el problema de raíz. No le diste oportunidad de corregirse ni dejaste constancia de lo ocurrido.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Hablar con el cliente y poner un límite",
        detail: "Le explicas en privado que será bien atendido, pero que no aceptas maltrato a tu equipo.",
        effects: { morale: 6, reputation: 2 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -2 },
          text: "El cliente se ofendió y dejó de comprar.",
        },
        outcome:
          "Tu equipo supo que lo respaldas. El cliente recibió el mensaje con sorpresa: nadie le había puesto un límite antes.",
        verdict: "optima",
      },
    ],
    concept: "Límites del servicio al cliente",
    lesson:
      "El cliente no siempre tiene la razón y nunca tiene derecho a maltratar. Proteger al personal también es servicio al cliente, porque un equipo humillado atiende peor a todos los demás.",
  },
  {
    id: "cli-perdida-cuenta-clave",
    title: "Perdiste una cuenta clave",
    category: "clientes",
    industries: "all",
    market: "B2B",
    tier: 3,
    situation:
      "Tu segunda cuenta más grande te comunica por correo que no renovará el contrato y que se va con un competidor. No hubo reclamos formales previos, pero el ejecutivo que la atendía renunció hace seis meses y desde entonces nadie la visitó. Todavía quedan dos meses de contrato.",
    options: [
      {
        id: "a",
        label: "Ofrecer una rebaja fuerte para retenerlos",
        detail: "Respondes el correo con una propuesta de precio muy por debajo del actual.",
        effects: { demandPct: -4, brand: -2 },
        risk: {
          prob: 0.35,
          effects: { demandPct: 5, cashPct: -4 },
          text: "El cliente aceptó quedarse un año más con el precio rebajado, que ahora es su punto de partida para negociar.",
        },
        outcome:
          "Ofreciste precio sin haber preguntado por qué se iban. El cliente comentó que, si podías cobrar menos, llevabas años cobrándole de más.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Pedir una reunión para entender y cerrar bien",
        detail: "Escuchas sus razones sin discutir y cumples de forma impecable los dos meses restantes.",
        effects: { demandPct: -6, satisfaction: 3, reputation: 2 },
        outcome:
          "Supiste que el cliente se sintió abandonado. No lo recuperaste, pero se fue hablando bien de ti y dejó la puerta abierta.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Escuchar al cliente y revisar toda la cartera",
        detail: "Además de la reunión de salida, visitas a tus diez cuentas principales y nombras un responsable y un suplente por cuenta.",
        effects: { cashPct: -2, demandPct: -5, satisfaction: 5, fixedCostPct: 1 },
        outcome:
          "En las visitas encontraste dos cuentas más con señales de descuido y llegaste a tiempo. Perdiste un cliente y evitaste perder tres.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Reducir el servicio en los dos meses que quedan",
        detail: "Trasladas a tu gente a otras cuentas y atiendes al cliente saliente con lo mínimo.",
        effects: { cashPct: 1, demandPct: -6, reputation: -5 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, brand: -4 },
          text: "El cliente aplicó las penalidades del contrato y contó la experiencia a otras empresas del sector.",
        },
        outcome:
          "El cliente saliente recibió un servicio mínimo justo cuando te estaba comparando con tu reemplazo.",
        verdict: "mala",
      },
    ],
    concept: "Gestión de cuentas clave",
    lesson:
      "Las cuentas grandes rara vez se pierden por precio, se pierden por descuido. La relación debe ser con la empresa y no con un solo ejecutivo, y cada pérdida debe servir para revisar el resto de la cartera.",
  },
  {
    id: "cli-personalizacion-estandarizacion",
    title: "Cada cliente quiere algo distinto",
    category: "clientes",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tus vendedores aceptan casi cualquier pedido especial con tal de cerrar la venta: características fuera de catálogo, plazos distintos, condiciones a medida. Las ventas crecen, pero los errores y las demoras también, y ya nadie sabe cuánto cuesta realmente cada pedido.",
    options: [
      {
        id: "a",
        label: "Seguir aceptando todo pedido especial",
        detail: "Mantienes la flexibilidad total como argumento de venta.",
        effects: { demandPct: 4, costPct: 5, quality: -3, productivityPct: -4 },
        outcome:
          "Ningún cliente recibe un no. Operaciones trabaja como si cada pedido fuera el primero y el margen real de los pedidos especiales es una incógnita.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Personalizar por módulos y cobrar lo especial",
        detail: "Defines opciones combinables sobre una base estándar y una tarifa adicional para lo que salga de ellas.",
        effects: { cashPct: -2, demandPct: 2, costPct: -2, quality: 3, satisfaction: 3 },
        outcome:
          "El cliente siente que elige y tu operación repite procesos conocidos. Los pedidos realmente especiales ahora pagan su propio costo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Estandarizar: solo lo que está en catálogo",
        detail: "Eliminas los pedidos a medida y ofreces una lista cerrada.",
        effects: { demandPct: -5, costPct: -4, quality: 4, productivityPct: 5 },
        outcome:
          "Los errores bajaron y los plazos se cumplen. Perdiste a los clientes que te elegían justamente porque aceptabas lo que otros rechazaban.",
        verdict: "buena",
      },
    ],
    concept: "Personalización frente a estandarización",
    lesson:
      "La personalización vende y la estandarización da margen. La personalización modular combina ambas: piezas estándar que se arman de muchas formas, con un precio adicional para lo que sale del molde.",
  },
  {
    id: "cli-promesa-tiempos-entrega",
    title: "Prometer 24 horas o lo que puedes cumplir",
    category: "clientes",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tu competidor anuncia atención en 24 horas. Tu promedio real es de tres días, aunque a veces lo logras en uno. El área comercial quiere igualar la promesa en la publicidad para no perder ventas. Operaciones advierte que solo podría cumplirla en la mitad de los casos.",
    options: [
      {
        id: "a",
        label: "Crear una opción exprés con costo adicional",
        detail: "Mantienes los tres días como estándar y ofreces 24 horas pagadas, con cupo diario limitado.",
        effects: { cashPct: 1, demandPct: 3, satisfaction: 4 },
        outcome:
          "Quien tenía apuro pagó por la urgencia y el cupo limitado permitió cumplir siempre. El resto siguió con el plazo normal.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Prometer 3 días y entregar antes si se puede",
        detail: "Publicas el plazo que cumples siempre y sorprendes cuando llegas antes.",
        effects: { demandPct: -2, satisfaction: 5, brand: 2 },
        outcome:
          "Algunos clientes apurados se fueron con el competidor. Los que compraron recibieron su pedido antes de lo prometido y varios lo destacaron en sus reseñas.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Prometer 24 horas como la competencia",
        detail: "Cambias la publicidad hoy y exiges a operaciones que se adapte.",
        effects: { demandPct: 7, morale: -2 },
        risk: {
          prob: 0.6,
          effects: { satisfaction: -7, brand: -4, cashPct: -2 },
          text: "La mitad de los pedidos llegó tarde. Hubo reclamos, devoluciones y reseñas que mencionan la promesa incumplida.",
        },
        outcome:
          "Los pedidos aumentaron apenas cambiaste el anuncio. Tu operación, en cambio, es la misma de ayer.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Invertir para bajar el plazo real a 24 horas",
        detail: "Reorganizas procesos y sumas recursos antes de cambiar la promesa.",
        effects: { cashPct: -6, fixedCostPct: 4, demandPct: 5, satisfaction: 4, rounds: 2 },
        outcome:
          "Ahora la promesa es real. Tu costo fijo subió y necesitas más volumen para sostenerlo.",
        verdict: "buena",
      },
    ],
    concept: "Promesa de servicio y expectativas",
    lesson:
      "La satisfacción es la diferencia entre lo que el cliente esperaba y lo que recibió. Prometer menos y cumplir más construye confianza. Prometer lo que no controlas la destruye.",
  },
  {
    id: "cli-rentabilidad-por-cliente",
    title: "Clientes que cuestan más de lo que dejan",
    category: "clientes",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Tu analista cruzó ventas con costos de atención y encontró que el 20 % de tus clientes genera casi toda la utilidad. En el otro extremo, un grupo de clientes pequeños pide cotizaciones constantes, compra poco, reclama mucho y paga tarde. Atenderlos ocupa un tercio del tiempo de tu equipo.",
    options: [
      {
        id: "a",
        label: "Dejar de atender a los clientes no rentables",
        detail: "Les comunicas que ya no podrás atenderlos y concentras al equipo en las cuentas grandes.",
        effects: { demandPct: -4, productivityPct: 5 },
        risk: {
          prob: 0.3,
          effects: { brand: -3, demandPct: -3 },
          text: "Entre los clientes descartados había empresas jóvenes en crecimiento que ahora compran en grande a tu competencia.",
        },
        outcome:
          "Tu equipo recuperó tiempo para las cuentas importantes. La comunicación del corte fue brusca y algunos lo tomaron como desprecio.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Atender a todos por igual",
        detail: "Mantienes el mismo nivel de servicio sin importar cuánto compra cada uno.",
        effects: { productivityPct: -3, morale: -2 },
        outcome:
          "Nadie se sintió relegado. Tus mejores clientes siguen esperando en la misma cola que quienes compran una vez al año.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Subir precios solo a los clientes pequeños",
        detail: "Aplicas una lista de precios más alta a quienes compran poco.",
        effects: { cashPct: 1, demandPct: -3, satisfaction: -2 },
        outcome:
          "Algunos se fueron y los que se quedaron ahora cubren su costo. No cambió la forma de atenderlos, así que siguen consumiendo el mismo tiempo.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Crear niveles de servicio según el valor",
        detail: "Los clientes pequeños pasan a autoservicio con pedido mínimo y pago adelantado. Los grandes reciben atención dedicada.",
        effects: { cashPct: -2, productivityPct: 5, satisfaction: 2, demandPct: -1 },
        outcome:
          "Los clientes pequeños siguieron comprando con menos costo para ti. Tus vendedores dedicaron su tiempo a las cuentas con mayor potencial.",
        verdict: "optima",
      },
    ],
    concept: "Rentabilidad por cliente",
    lesson:
      "No todos los clientes valen lo mismo ni cuestan lo mismo. El principio de Pareto invita a medir la rentabilidad por cliente y a ajustar el nivel de servicio, no necesariamente a despedir clientes.",
  },
  {
    id: "cli-chatbot-atencion",
    title: "Un chatbot para responder el WhatsApp",
    category: "clientes",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu WhatsApp de ventas recibe cientos de mensajes al día y los clientes esperan horas por una respuesta. La mayoría pregunta lo mismo: precios, horarios y estado del pedido. Un proveedor te ofrece un chatbot que contesta al instante. Tus dos asesoras temen por su puesto.",
    options: [
      {
        id: "a",
        label: "Chatbot para lo frecuente, personas para el resto",
        detail: "El bot resuelve consultas repetidas y deriva a una asesora los reclamos y las ventas grandes.",
        effects: { cashPct: -2, satisfaction: 5, productivityPct: 5, morale: 1 },
        outcome:
          "El tiempo de respuesta bajó a minutos. Las asesoras dejaron de copiar y pegar precios y se dedicaron a cerrar ventas y resolver reclamos.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Reemplazar toda la atención por el chatbot",
        detail: "El bot responde todos los mensajes y reduces el equipo de asesoras.",
        effects: { cashPct: -2, fixedCostPct: -3, satisfaction: -5, morale: -5 },
        risk: {
          prob: 0.4,
          effects: { brand: -4, demandPct: -4 },
          text: "Clientes con problemas complejos quedaron atrapados en respuestas automáticas y publicaron las conversaciones.",
        },
        outcome:
          "Las preguntas simples se responden en segundos. Los casos difíciles, que son los que definen la opinión del cliente, no tienen a quién llegar.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Contratar dos asesoras más",
        detail: "Amplías el equipo y mantienes la atención totalmente humana.",
        effects: { fixedCostPct: 3, satisfaction: 3, morale: 2 },
        outcome:
          "La espera bajó con atención de personas. El costo sube cada vez que crece el volumen de mensajes.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Dejar todo igual",
        detail: "Consideras que la demora es tolerable y no inviertes.",
        effects: { satisfaction: -3, demandPct: -3 },
        outcome:
          "Los clientes que no recibieron respuesta a tiempo le compraron a quien sí contestó. En ventas por chat, la demora equivale a un no.",
        verdict: "mala",
      },
    ],
    concept: "Automatización de la atención",
    lesson:
      "Automatizar sirve para liberar a las personas de lo repetitivo, no para esconderlas. El cliente tolera un bot en lo simple y exige una persona cuando tiene un problema.",
  },
  {
    id: "cli-datos-personales",
    title: "La base de datos de tus clientes",
    category: "clientes",
    industries: "all",
    market: "B2C",
    tier: 2,
    situation:
      "Tienes 20 mil números de celular de clientes recolectados en ventas y sorteos, la mayoría sin una autorización expresa para enviar publicidad. Un aliado comercial te ofrece pagar por una copia de la base. Tu jefe de marketing, además, quiere enviar promociones masivas por WhatsApp a todos.",
    options: [
      {
        id: "a",
        label: "Vender una copia de la base al aliado",
        detail: "Recibes un pago por compartir los contactos con otra empresa.",
        effects: { cashPct: 3 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -10, reputation: -12, brand: -6 },
          text: "Clientes que recibieron llamadas de un tercero te denunciaron ante la Autoridad Nacional de Protección de Datos Personales y fuiste multado.",
        },
        outcome:
          "Recibiste un ingreso rápido por datos que tus clientes te confiaron para otro fin. Varios empezaron a recibir llamadas de una empresa que no conocen.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Enviar promociones masivas a toda la base",
        detail: "Usas todos los números disponibles, tengan o no autorización.",
        effects: { demandPct: 4, satisfaction: -3 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -5, reputation: -6, demandPct: -4 },
          text: "Muchos usuarios reportaron el número como spam, tu línea de ventas fue bloqueada y hubo denuncias por publicidad no autorizada.",
        },
        outcome:
          "Algunos compraron y muchos preguntaron de dónde sacaste su número. La cantidad de bloqueos fue alta.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Pedir consentimiento y escribir a quien acepte",
        detail: "Registras la autorización en cada venta y depuras la base de quienes no la dieron.",
        effects: { cashPct: -1, demandPct: 3, satisfaction: 3, reputation: 4 },
        outcome:
          "Tu base se redujo a menos de la mitad, pero es gente que sí quiere saber de ti. Tus envíos ahora tienen mejor respuesta y cumples la ley de protección de datos.",
        verdict: "optima",
      },
    ],
    concept: "Protección de datos personales",
    lesson:
      "Los datos del cliente son un préstamo de confianza con un fin específico. En el Perú, usarlos para publicidad o cederlos a terceros requiere consentimiento, y una base pequeña con permiso rinde más que una grande sin él.",
  },
  {
    id: "cli-comunicar-alza-precios",
    title: "Cómo comunicar un alza de precios",
    category: "clientes",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tus costos subieron por el tipo de cambio y necesitas aumentar precios 8 % para sostener el margen. Llevas dos años sin ajustar. Tienes clientes antiguos que se sentirán afectados. El equipo discute si avisar, cómo y cuándo.",
    options: [
      {
        id: "a",
        label: "Subir sin avisar",
        detail: "Actualizas la lista de precios y respondes solo si alguien pregunta.",
        effects: { cashPct: 3, satisfaction: -5, brand: -2 },
        outcome:
          "Los clientes lo descubrieron al pagar. Más que el monto, les molestó enterarse en la caja y sin explicación.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Avisar con un mes de anticipación y explicar",
        detail: "Comunicas la fecha, el motivo y lo que seguirás ofreciendo.",
        effects: { cashPct: 2, demandPct: -1, reputation: 2 },
        outcome:
          "Algunos clientes adelantaron compras al precio anterior. La mayoría entendió el motivo y agradeció el aviso.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Mantener el precio y reducir el contenido",
        detail: "El precio no cambia, pero el cliente recibe menos cantidad por lo mismo.",
        effects: { cashPct: 3 },
        risk: {
          prob: 0.4,
          effects: { brand: -5, satisfaction: -5, reputation: -3 },
          text: "Un cliente comparó la presentación nueva con la anterior y la foto circuló como ejemplo de reduflación.",
        },
        outcome:
          "En la lista de precios no cambió nada. El cliente paga lo mismo por menos y tarde o temprano lo nota.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "No subir y absorber el costo",
        detail: "Sacrificas margen para no incomodar a tus clientes.",
        effects: { cashPct: -4, satisfaction: 1 },
        outcome:
          "Tus clientes no sintieron ningún cambio. Tu margen sí, y el próximo ajuste tendrá que ser mayor.",
        verdict: "riesgosa",
      },
    ],
    concept: "Comunicación de un alza de precios",
    lesson:
      "El cliente acepta mejor un aumento explicado y anunciado que uno descubierto. Lo que daña la relación no suele ser el nuevo precio, sino la sensación de haber sido sorprendido.",
  },

  // ESTRATEGIA (16)
  {
    id: "est-competidor-extranjero",
    title: "Una cadena extranjera abre en tu ciudad",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Una cadena extranjera con mucho capital anuncia que abrirá en Piura en seis meses, en tu misma zona. Trae precios bajos por volumen, publicidad masiva y procesos estandarizados. Tú llevas 10 años en el mercado, conoces a tus clientes por su nombre y tu marca es querida, aunque tus costos son más altos.",
    options: [
      {
        id: "a",
        label: "Bajar precios antes de que lleguen",
        detail: "Te adelantas con rebajas para amarrar a tus clientes.",
        effects: { cashPct: -6, demandPct: 3, brand: -2 },
        outcome:
          "Llegaste a la apertura del rival con menos caja y con el margen ya recortado. La cadena igual abrió con precios más bajos que los tuyos.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Esperar a ver cómo le va",
        detail: "No cambias nada hasta conocer la oferta real del nuevo competidor.",
        effects: { demandPct: -8, rounds: 2 },
        outcome:
          "La cadena abrió con promociones agresivas y tú no tenías un plan. Los primeros meses fueron los más duros y reaccionaste tarde.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Buscar un nicho que la cadena no atienda",
        detail: "Te especializas en un segmento demasiado pequeño para interesarle a un grande.",
        effects: { cashPct: -3, demandPct: -2, brand: 3 },
        risk: {
          prob: 0.3,
          effects: { demandPct: -5 },
          text: "El nicho resultó demasiado pequeño para cubrir tus costos fijos actuales.",
        },
        outcome:
          "Adaptaste tu oferta a un grupo de clientes que la cadena no atiende. Eres más fuerte en menos terreno.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Reforzar lo que la cadena no puede copiar",
        detail: "Inviertes en servicio cercano, oferta local, rapidez y relación con tus clientes.",
        effects: { cashPct: -4, demandPct: -3, satisfaction: 5, brand: 4, quality: 3 },
        outcome:
          "Cuando la cadena abrió, perdiste a los clientes que buscaban solo precio. Los demás se quedaron porque en la cadena nadie sabe cómo les gusta su pedido.",
        verdict: "optima",
      },
    ],
    concept: "Respuesta ante un nuevo competidor",
    lesson:
      "Contra un rival con más escala no se compite en su terreno. La defensa está en lo que el grande no puede estandarizar: cercanía, conocimiento local y velocidad de respuesta.",
  },
  {
    id: "est-oferta-compra-empresa",
    title: "Quieren comprar tu empresa",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Un grupo empresarial chileno te ofrece comprar el 60 % de tu empresa por un precio calculado como cuatro veces tu utilidad operativa anual. Seguirías como gerente general. Piden respuesta en 30 días y un acuerdo de confidencialidad. Nunca has valorizado la empresa y tu utilidad creció 20 % anual los últimos tres años.",
    options: [
      {
        id: "a",
        label: "Aceptar la oferta tal como viene",
        detail: "Firmas dentro del plazo con el precio y las condiciones propuestas.",
        effects: { cashPct: 12, morale: -5 },
        outcome:
          "Cerraste rápido y entró el dinero. Después supiste que empresas parecidas se negociaron a múltiplos más altos, y ahora las decisiones importantes las toma el nuevo socio.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Valorizar con un asesor y luego negociar",
        detail: "Un asesor financiero estima el valor por flujos descontados y por múltiplos comparables antes de responder.",
        effects: { cashPct: 14, morale: -2 },
        outcome:
          "La valorización mostró que la oferta estaba por debajo del rango razonable. Con ese sustento mejoraste el precio y pactaste condiciones que protegen a tu equipo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rechazar: la empresa no se vende",
        detail: "Respondes que no sin analizar la propuesta.",
        effects: { morale: 2 },
        outcome:
          "Tu equipo celebró la decisión. Nunca sabrás cuánto valía tu empresa ni qué habrías podido hacer con ese capital.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Contar la oferta a otros posibles compradores",
        detail: "Comentas la propuesta a otros grupos para generar una puja, pese a la confidencialidad.",
        effects: { reputation: -3 },
        risk: {
          prob: 0.5,
          effects: { reputation: -6, morale: -5, demandPct: -3 },
          text: "El grupo chileno se enteró y retiró la oferta. El rumor de venta inquietó a trabajadores, clientes y bancos.",
        },
        outcome:
          "Buscar competencia entre compradores es razonable. Hacerlo rompiendo la confidencialidad que aceptaste dañó tu palabra.",
        verdict: "mala",
      },
    ],
    concept: "Valorización de empresas",
    lesson:
      "El precio de una empresa no es lo que el comprador ofrece ni lo que el dueño siente. Se estima con flujos futuros descontados y con múltiplos de empresas comparables. Sin ese número se negocia a ciegas.",
  },
  {
    id: "est-alianza-estrategica",
    title: "Una alianza con quien tiene lo que te falta",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Una empresa de Cusco que atiende a tu mismo tipo de cliente, con una oferta que no compite con la tuya, te propone una alianza: promociones cruzadas y gastos compartidos en una campaña. Ellos tienen más clientes y tú tienes mejor reputación.",
    options: [
      {
        id: "a",
        label: "Rechazar y crecer por tu cuenta",
        detail: "Prefieres no atar tu marca a la de otra empresa.",
        effects: {},
        outcome:
          "Mantuviste el control total de tu marca. Llegar a esos clientes por tu cuenta te costará más tiempo y más publicidad.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Empezar de palabra, sin papeles",
        detail: "Confían en la buena relación y arrancan la campaña de inmediato.",
        effects: { cashPct: -1, demandPct: 5 },
        risk: {
          prob: 0.4,
          effects: { brand: -3, satisfaction: -3, cashPct: -2 },
          text: "Surgió una discusión sobre quién pagaba qué, y el aliado usó tu marca en ofertas que no aprobaste.",
        },
        outcome:
          "Arrancaron rápido y con entusiasmo. Nadie dejó por escrito qué pasaría si algo salía distinto de lo esperado.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Firmar un acuerdo con reglas y plazo de prueba",
        detail: "Definen por escrito aportes, reparto de resultados, uso de marcas y una revisión a los seis meses.",
        effects: { cashPct: -2, demandPct: 6, brand: 2, rounds: 2 },
        outcome:
          "La campaña conjunta costó la mitad para cada uno. A los seis meses revisaron los números y renovaron el acuerdo con ajustes.",
        verdict: "optima",
      },
    ],
    concept: "Alianza estratégica",
    lesson:
      "Una alianza funciona cuando los socios se complementan y no compiten. Debe tener objetivos, aportes y reglas de salida por escrito, porque los problemas aparecen cuando hay resultados que repartir.",
  },
  {
    id: "est-franquiciar",
    title: "Te proponen franquiciar tu marca",
    category: "estrategia",
    industries: ["restaurante", "cafeteria", "pasteleria", "gimnasio", "farmacia", "minimarket", "educacion", "moda"],
    market: "B2C",
    tier: 2,
    situation:
      "Tu negocio tiene dos locales exitosos en Lima y un inversionista de Trujillo quiere abrir una franquicia de tu marca. Pagaría un derecho de entrada y regalías mensuales. No tienes manuales de operación: todo funciona porque tú y tu equipo de confianza supervisan cada detalle.",
    options: [
      {
        id: "a",
        label: "Documentar el modelo antes de franquiciar",
        detail: "Inviertes dos trimestres en manuales, capacitación, registro de marca en Indecopi y un contrato con estándares auditables.",
        effects: { cashPct: -4, quality: 4, productivityPct: 3, brand: 2 },
        outcome:
          "Al escribir los manuales descubriste procesos que ni tus propios locales hacían igual. Cuando firmaste la primera franquicia, el modelo ya podía copiarse.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Firmar ya y resolver sobre la marcha",
        detail: "Cobras el derecho de entrada y capacitas al franquiciado de manera informal.",
        effects: { cashPct: 5 },
        risk: {
          prob: 0.55,
          effects: { brand: -8, satisfaction: -5, quality: -4 },
          text: "El local franquiciado cambió insumos y atención a su criterio. Las malas reseñas de Trujillo afectaron a toda la marca.",
        },
        outcome:
          "Recibiste el derecho de entrada. El franquiciado abrió con tu nombre y con su propia forma de hacer las cosas.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Abrir un tercer local propio",
        detail: "Creces con tu propio capital y tu propio equipo, sin ceder la marca.",
        effects: { cashPct: -8, fixedCostPct: 6, demandPct: 8, rounds: 3 },
        outcome:
          "Mantienes el control y toda la utilidad. También pones todo el capital y asumes todo el riesgo del nuevo local.",
        verdict: "buena",
      },
    ],
    concept: "Franquicia como modelo de crecimiento",
    lesson:
      "Franquiciar es crecer con capital ajeno a cambio de ceder control. Solo se puede franquiciar lo que está documentado: si el negocio depende de tu supervisión personal, todavía no es un modelo replicable.",
  },
  {
    id: "est-diversificar-o-enfocarse",
    title: "Un negocio nuevo que no tiene nada que ver",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Tu empresa va bien y tienes caja disponible. Un amigo te propone invertir juntos en un rubro totalmente distinto al tuyo, que está de moda y promete alta rentabilidad. Al mismo tiempo, tu gerente comercial pide ese dinero para llevar tu oferta actual a un segmento de clientes que aún no atiendes.",
    options: [
      {
        id: "a",
        label: "Invertir en el rubro nuevo",
        detail: "Entras como socio a un negocio ajeno a tu experiencia.",
        effects: { cashPct: -8, productivityPct: -3 },
        risk: {
          prob: 0.55,
          effects: { cashPct: -6, morale: -2 },
          text: "El negocio nuevo exigió más tiempo y dinero de lo previsto, y descuidaste la empresa principal.",
        },
        outcome:
          "Entraste a un mercado donde no conoces clientes, proveedores ni competidores. Tu atención ahora se divide entre dos negocios.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Guardar la caja como reserva",
        detail: "No inviertes en ninguna de las dos propuestas.",
        effects: {},
        outcome:
          "La empresa quedó con un colchón para emergencias. El dinero detenido no genera crecimiento y tus competidores sí invirtieron.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Crear algo nuevo para tus clientes actuales",
        detail: "Desarrollas una oferta adicional para quienes ya te compran.",
        effects: { cashPct: -5, demandPct: 5, satisfaction: 2 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -3 },
          text: "El desarrollo tomó más de lo planeado y la novedad salió al mercado con un trimestre de retraso.",
        },
        outcome:
          "Tus clientes ya confían en ti, así que probaron la novedad. El reto estuvo en desarrollar algo que no habías hecho antes.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Llevar tu oferta actual a un nuevo segmento",
        detail: "Usas lo que ya sabes hacer para atender a un tipo de cliente distinto.",
        effects: { cashPct: -5, demandPct: 7, rounds: 3 },
        outcome:
          "El nuevo segmento exigió ajustes de canal y de mensaje, pero el producto y la operación eran los mismos. Creciste apoyado en lo que ya dominas.",
        verdict: "optima",
      },
    ],
    concept: "Matriz de Ansoff",
    lesson:
      "La matriz de Ansoff ordena las opciones de crecimiento según su riesgo: penetración, nuevos mercados, nuevos productos y diversificación. Cuanto más te alejas de lo que conoces, mayor es el riesgo.",
  },
  {
    id: "est-integracion-vertical",
    title: "Comprar a tu proveedor principal",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Tu proveedor principal, del que depende la mitad de tu costo, tiene problemas financieros y su dueño te ofrece venderte la empresa. Si la compras aseguras el abastecimiento y te quedas con su margen. Tendrías que endeudarte y gestionar un negocio que no conoces, cuyos otros clientes son tus competidores.",
    options: [
      {
        id: "a",
        label: "Comprar al proveedor con deuda",
        detail: "Tomas un préstamo y asumes la propiedad y la gestión de la empresa.",
        effects: { cashPct: -12, costPct: -8, fixedCostPct: 8, rounds: 4 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -6, productivityPct: -4 },
          text: "La empresa tenía deudas laborales y equipos obsoletos que no detectaste. Tus competidores, además, dejaron de comprarle.",
        },
        outcome:
          "Aseguraste el abastecimiento y capturaste su margen. También heredaste sus problemas y una deuda que pesa en tu flujo.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Desarrollar un segundo proveedor",
        detail: "Repartes tus compras para no depender de una sola fuente.",
        effects: { cashPct: -2, costPct: 2, quality: -1 },
        outcome:
          "El proveedor alternativo cobra un poco más y todavía está aprendiendo tus especificaciones. Ya no dependes de una sola fuente.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Firmar un contrato de largo plazo con adelanto",
        detail: "Le das liquidez a cambio de precio y abastecimiento garantizados, sin comprar la empresa.",
        effects: { cashPct: -4, costPct: -3, rounds: 4 },
        risk: {
          prob: 0.25,
          effects: { costPct: 6, cashPct: -3 },
          text: "El proveedor quebró de todos modos y perdiste parte del adelanto.",
        },
        outcome:
          "Obtuviste buena parte de los beneficios de la integración sin asumir la gestión. El proveedor ganó oxígeno y tú, prioridad en la atención.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Seguir comprando como siempre",
        detail: "Rechazas la oferta y no tomas ninguna medida adicional.",
        effects: {},
        risk: {
          prob: 0.4,
          effects: { costPct: 8, demandPct: -6, rounds: 2 },
          text: "El proveedor cerró sin aviso. Pasaste semanas sin abastecimiento y compraste de urgencia a precios más altos.",
        },
        outcome:
          "Seguiste como siempre. Tu abastecimiento depende de una empresa que tú mismo sabes que está en problemas.",
        verdict: "mala",
      },
    ],
    concept: "Integración vertical",
    lesson:
      "Integrarse hacia atrás asegura el suministro y captura margen, pero inmoviliza capital y exige saber gestionar otro negocio. Muchas veces un buen contrato da el control sin necesidad de la propiedad.",
  },
  {
    id: "est-expansion-provincias",
    title: "Crecer en provincias: dónde y cómo",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tu empresa está consolidada en Lima y quieres crecer en provincias. Evalúas Arequipa, con un mercado grande y competido, y Tarapoto, más pequeño pero casi sin competencia formal. Tu presupuesto alcanza para una sola plaza.",
    options: [
      {
        id: "a",
        label: "Abrir en Arequipa con operación propia",
        detail: "Inviertes en local y equipo en la plaza más grande.",
        effects: { cashPct: -8, fixedCostPct: 6, demandPct: 8, rounds: 3 },
        risk: {
          prob: 0.35,
          effects: { demandPct: -5 },
          text: "Los competidores locales reaccionaron con promociones y tardaste en entender las preferencias del cliente arequipeño.",
        },
        outcome:
          "Entraste a una de las ciudades más grandes del país. El mercado es amplio y los competidores locales llevan años conociendo al cliente.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Entrar primero con un socio local",
        detail: "Trabajas con un distribuidor o representante de la zona antes de invertir en operación propia.",
        effects: { cashPct: -2, demandPct: 4, rounds: 3 },
        outcome:
          "Ganaste menos margen por venta y aprendiste cómo compra el cliente de la zona sin arriesgar tu caja. En un año sabrás si conviene abrir un local.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Abrir en Tarapoto con operación propia",
        detail: "Inviertes en local y equipo en la plaza con menos competencia.",
        effects: { cashPct: -6, fixedCostPct: 4, demandPct: 6, rounds: 3 },
        outcome:
          "Fuiste el primero en ofrecer tu estándar de servicio. La logística desde Lima resultó más cara y lenta de lo que mostraba la hoja de cálculo.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Quedarte en Lima",
        detail: "Postergas la expansión y refuerzas tu plaza actual.",
        effects: {},
        outcome:
          "Evitaste el riesgo y el desgaste de operar a distancia. Tu crecimiento depende de un solo mercado, que además es el más competido.",
        verdict: "buena",
      },
    ],
    concept: "Expansión geográfica",
    lesson:
      "El Perú no es un solo mercado: cada región tiene hábitos, precios y logística propios. Entrar con una prueba de bajo costo permite aprender antes de comprometer capital.",
  },
  {
    id: "est-primera-exportacion",
    title: "Tu primer pedido del extranjero",
    category: "estrategia",
    industries: ["bebidas", "moda", "agroexport", "cafeteria", "maquinaria", "ecommerce"],
    market: "all",
    tier: 2,
    situation:
      "En una feria conociste a un importador de Colombia que quiere un primer pedido equivalente a dos meses de tu producción. Pagaría en dólares, a 60 días del embarque. Nunca has exportado. Atenderlo implicaría dejar desabastecida a parte de tus clientes locales durante un trimestre.",
    options: [
      {
        id: "a",
        label: "Negociar un pedido menor con carta de crédito",
        detail: "Propones empezar con un tercio del volumen y un medio de pago respaldado por un banco.",
        effects: { cashPct: -1, demandPct: 5, quality: 2 },
        outcome:
          "El importador aceptó empezar con menos. Aprendiste el proceso aduanero, cobraste sin sobresaltos y tus clientes locales no lo sintieron.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Aceptar el pedido completo",
        detail: "Destinas tu capacidad al pedido y aceptas el pago a 60 días.",
        effects: { cashPct: -5, demandPct: 12, satisfaction: -5 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -8, demandPct: -4 },
          text: "El importador demoró el pago y el tipo de cambio bajó. Dos clientes locales desatendidos se fueron con la competencia.",
        },
        outcome:
          "Embarcaste tu primera exportación. Financiaste 60 días con tu propia caja y tus clientes locales pasaron un trimestre con entregas incompletas.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Exportar a través de un intermediario",
        detail: "Una empresa comercializadora compra tu producto en el Perú y se encarga de la exportación.",
        effects: { cashPct: 1, demandPct: 4 },
        outcome:
          "El intermediario se encargó de la documentación y del riesgo de cobro a cambio de parte del margen. Tú entregaste en un almacén del Callao.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Rechazar: primero el mercado local",
        detail: "Agradeces el interés y mantienes tu capacidad para tus clientes actuales.",
        effects: {},
        outcome:
          "Tus clientes locales siguieron bien atendidos. Dejaste pasar la oportunidad de tener ingresos en dólares y de no depender de un solo mercado.",
        verdict: "buena",
      },
    ],
    concept: "Internacionalización por etapas",
    lesson:
      "Exportar se aprende por etapas. El primer pedido sirve para entender documentos, medios de pago y tipo de cambio, por eso conviene que sea pequeño y con cobro asegurado.",
  },
  {
    id: "est-licitacion-estado",
    title: "Una licitación grande del Estado",
    category: "estrategia",
    industries: "all",
    market: "B2B",
    tier: 2,
    situation:
      "Un gobierno regional convoca un proceso de selección por un monto que equivale a la mitad de tus ventas anuales. Cumples los requisitos. El Estado suele pagar con demora y aplica penalidades por cada día de atraso. Un 'tramitador' te asegura que, por una comisión, puede hacer que tu propuesta gane.",
    options: [
      {
        id: "a",
        label: "Pagar al tramitador",
        detail: "Entregas la comisión a cambio de la promesa de ganar la buena pro.",
        effects: { cashPct: -4, demandPct: 15, rounds: 3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -15, reputation: -20, demandPct: -15 },
          text: "El caso fue investigado por la Fiscalía. Perdiste el contrato, quedaste inhabilitado para contratar con el Estado y enfrentas un proceso penal.",
        },
        outcome:
          "Ganaste la buena pro. Ahora el tramitador tiene información con la que puede presionarte cada vez que quiera.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "No participar",
        detail: "Te concentras en tus clientes privados.",
        effects: {},
        outcome:
          "Seguiste con clientes que pagan más rápido. El Estado es uno de los mayores compradores del país y no estás en ese mercado.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Postular con el precio más bajo posible",
        detail: "Ajustas el precio al límite para asegurar el puntaje económico.",
        effects: { cashPct: -1 },
        risk: {
          prob: 0.5,
          effects: { demandPct: 14, cashPct: -10, quality: -3 },
          text: "Ganaste, pero el precio no cubría imprevistos. Las penalidades por atraso y la demora en el pago se comieron el margen.",
        },
        outcome:
          "Presentaste la oferta más barata. Cualquier imprevisto en la ejecución saldrá de tu bolsillo.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Postular en regla y con caja asegurada",
        detail: "Incluyes en el precio el costo de esperar el pago y consigues una línea de capital de trabajo antes de postular.",
        effects: { cashPct: -2 },
        risk: {
          prob: 0.45,
          effects: { demandPct: 14, cashPct: -3, rounds: 3 },
          text: "Ganaste la buena pro. El pago llegó con atraso, pero tu línea de crédito te permitió cumplir sin penalidades.",
        },
        outcome:
          "Presentaste una propuesta técnica sólida y un precio que cubre la espera. Ganes o no, ya tienes la experiencia y los documentos listos para el siguiente proceso.",
        verdict: "optima",
      },
    ],
    concept: "Contrataciones con el Estado",
    lesson:
      "Venderle al Estado exige espalda financiera, orden documentario y paciencia. El precio debe incluir el costo de esperar el pago, y cualquier atajo con tramitadores puede terminar en inhabilitación y proceso penal.",
  },
  {
    id: "est-costos-o-diferenciacion",
    title: "Ser el más barato o ser distinto",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tu empresa está en el medio: no es la más barata ni la mejor. Quienes buscan precio se van con un rival que compra en grandes volúmenes, y quienes buscan calidad, con la marca premium. Tus clientes destacan tu atención. Tienes recursos para una sola apuesta este año.",
    options: [
      {
        id: "a",
        label: "Apostar por diferenciación",
        detail: "Inviertes en calidad, servicio y marca para justificar un precio mayor.",
        effects: { cashPct: -5, quality: 5, brand: 4, satisfaction: 3 },
        outcome:
          "Partiste de lo que tus clientes ya valoraban. Tu oferta ahora tiene razones claras para costar más, aunque sostener esa percepción exige seguir invirtiendo.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Apostar por costos bajos",
        detail: "Inviertes en eficiencia, compras por volumen y simplificas la oferta para vender más barato.",
        effects: { cashPct: -5, costPct: -5, quality: -2, rounds: 3 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -5 },
          text: "El rival económico tiene más escala y respondió bajando aún más sus precios.",
        },
        outcome:
          "Tus costos bajaron y pudiste ajustar precios. Compites de frente con un rival que lleva años haciendo lo mismo con más volumen.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Hacer un poco de ambas",
        detail: "Repartes el presupuesto entre bajar costos y mejorar la calidad.",
        effects: { cashPct: -5, costPct: -1, quality: 1 },
        outcome:
          "Bajaste algo los costos y subiste algo la calidad. Sigues en el medio, con menos caja.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Enfocarte en un nicho específico",
        detail: "Eliges un grupo de clientes con una necesidad concreta y adaptas todo a ellos.",
        effects: { cashPct: -3, demandPct: -3, brand: 3, satisfaction: 3 },
        outcome:
          "Dejaste de pelear todo el mercado y te volviste la mejor opción para un grupo definido. Eres fuerte en un terreno más pequeño.",
        verdict: "buena",
      },
    ],
    concept: "Estrategias genéricas de Porter",
    lesson:
      "Según Porter, la ventaja se logra por costos, por diferenciación o por enfoque. Quien intenta todo a la vez queda atrapado en el medio: ni tan barato ni tan bueno como para ser elegido.",
  },
  {
    id: "est-bcg-producto-perro",
    title: "El producto fundador ya no se vende",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "La matriz BCG de tu empresa muestra que la línea con la que empezaste hace 12 años es hoy un 'perro': su mercado no crece y tu participación es baja. Ocupa capital y tiempo del equipo. Tu línea más nueva es una 'estrella' que crece rápido y pide inversión. Al fundador le duele tocar la línea original.",
    options: [
      {
        id: "a",
        label: "Mantener la línea original por tradición",
        detail: "La conservas en el catálogo tal como está.",
        effects: { cashPct: -2, productivityPct: -2 },
        outcome:
          "La línea sigue en catálogo. Cada trimestre consume recursos que la estrella necesita para crecer.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Relanzarla con publicidad",
        detail: "Inviertes en una campaña para recuperar las ventas de la línea original.",
        effects: { cashPct: -5, demandPct: 1 },
        outcome:
          "Las ventas subieron levemente durante la campaña y volvieron a caer. El problema era el mercado, no el desconocimiento.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Retirarla por etapas y reforzar la estrella",
        detail: "Avisas con tiempo a quienes aún la compran y trasladas capital y personas a la línea que crece.",
        effects: { cashPct: 2, demandPct: 5, morale: -2, rounds: 2 },
        outcome:
          "Liberaste capital y tiempo. La línea estrella recibió la inversión que necesitaba mientras su mercado todavía crece.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Convertirla en edición especial bajo pedido",
        detail: "La ofreces solo por encargo y a mayor precio, para los clientes nostálgicos.",
        effects: { cashPct: 1, brand: 2 },
        outcome:
          "Dejó de inmovilizar recursos y se volvió un símbolo de la historia de la marca. Vende poco, pero ya no cuesta.",
        verdict: "buena",
      },
    ],
    concept: "Matriz BCG",
    lesson:
      "La matriz BCG clasifica las líneas por crecimiento del mercado y participación relativa. Las vacas financian a las estrellas, y los perros se retiran o se reducen aunque tengan valor sentimental.",
  },
  {
    id: "est-oceano-azul",
    title: "Salir de la pelea y crear otro mercado",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Tu sector en Lima está saturado: todos ofrecen lo mismo y compiten bajando precios. Tu equipo detectó a un grupo numeroso de personas que hoy no le compra a nadie del sector, porque la oferta actual les resulta complicada y cara. Atenderlas exigiría eliminar atributos que tus clientes actuales valoran y crear otros nuevos.",
    options: [
      {
        id: "a",
        label: "Rediseñar toda la oferta para los no clientes",
        detail: "Eliminas lo que encarece sin aportar, simplificas la compra y creas atributos que nadie ofrece.",
        effects: { cashPct: -7, demandPct: 10, brand: 5, costPct: -3, rounds: 3 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -10, cashPct: -3 },
          text: "Los no clientes tardaron en entender la propuesta y parte de tus clientes actuales no aceptó los cambios.",
        },
        outcome:
          "Lanzaste una oferta que no se compara con la de tus rivales. Estás en un espacio sin competencia y también sin referencias.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Lanzar la nueva oferta como línea separada",
        detail: "Mantienes tu negocio actual y pruebas la propuesta para no clientes con otra marca y un equipo pequeño.",
        effects: { cashPct: -5, demandPct: 6, brand: 3, fixedCostPct: 2, rounds: 3 },
        outcome:
          "El negocio actual financió el experimento. La nueva línea creció sin competidores directos y sin confundir a tus clientes de siempre.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Seguir compitiendo con mejores promociones",
        detail: "Refuerzas tus ofertas para ganar participación en el mercado actual.",
        effects: { cashPct: -4, demandPct: 2 },
        outcome:
          "Ganaste algunos clientes durante la promoción y tus rivales respondieron con las suyas. El mercado sigue siendo el mismo y se reparte entre los mismos.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Imitar la oferta del líder del sector",
        detail: "Ajustas tu propuesta para parecerte a quien más vende.",
        effects: { cashPct: -3, demandPct: 1, brand: -2 },
        outcome:
          "Tu oferta ahora se parece más a la del líder, que tiene más marca y más escala. El cliente no encuentra una razón para cambiarse.",
        verdict: "mala",
      },
    ],
    concept: "Estrategia de océano azul",
    lesson:
      "El océano azul se crea mirando a los no clientes y aplicando cuatro acciones: eliminar, reducir, aumentar y crear. El objetivo no es vencer a la competencia sino volverla irrelevante.",
    basedOn: "Libro La estrategia del océano azul, de W. Chan Kim y Renée Mauborgne",
  },
  {
    id: "est-tercerizar-reparto",
    title: "Tercerizar el reparto o mantenerlo propio",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 1,
    situation:
      "Tienes vehículos propios de reparto que pasan la mitad del tiempo detenidos y exigen mantenimiento, SOAT, choferes y combustible. Una empresa de courier te ofrece encargarse de todo con una tarifa por entrega. Tus clientes valoran que el repartidor los conoce y resuelve problemas en la puerta.",
    options: [
      {
        id: "a",
        label: "Tercerizar todo el reparto",
        detail: "Vendes los vehículos y pagas al courier por cada entrega.",
        effects: { cashPct: 2, fixedCostPct: -6, costPct: 2, satisfaction: -4, morale: -3 },
        risk: {
          prob: 0.35,
          effects: { satisfaction: -4, brand: -3 },
          text: "El courier tuvo retrasos en campaña y trató tus envíos como uno más entre miles.",
        },
        outcome:
          "Convertiste un costo fijo en variable. El contacto final con tu cliente ahora lo tiene otra empresa.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Usar motorizados por día, sin contrato",
        detail: "Reemplazas la flota por repartidores informales, sin planilla ni seguro, por una tarifa mucho menor.",
        effects: { fixedCostPct: -7, costPct: -1 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -8, reputation: -8, morale: -3 },
          text: "Un motorizado se accidentó durante un reparto. SUNAFIL determinó que existía relación laboral y te multó.",
        },
        outcome:
          "El costo de reparto cayó de inmediato. Los motorizados trabajan con tu marca, sin contrato y sin seguro.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Mantener toda la flota propia",
        detail: "Conservas el reparto completo dentro de la empresa.",
        effects: {},
        outcome:
          "Conservaste el control total de la entrega. Sigues pagando por vehículos y choferes que pasan medio día detenidos.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Flota propia para clientes clave, courier al resto",
        detail: "Reduces tus vehículos a los que sí se usan y contratas al courier para los picos y las zonas lejanas.",
        effects: { fixedCostPct: -3, costPct: 1, satisfaction: 1 },
        outcome:
          "Tus mejores clientes siguen viendo al repartidor de siempre y los picos de demanda los cubre el courier. Pagas solo por la capacidad que usas.",
        verdict: "optima",
      },
    ],
    concept: "Tercerización y competencias centrales",
    lesson:
      "Se terceriza lo que otro hace mejor y no te diferencia. Lo que el cliente valora de ti es una competencia central y conviene conservarla, aunque cueste más.",
  },
  {
    id: "est-pivotar-modelo",
    title: "El modelo de negocio dejó de funcionar",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 3,
    situation:
      "Llevas cuatro trimestres con ventas en caída. No es un problema de ejecución: los hábitos del cliente cambiaron y tu forma de vender quedó desfasada. Tienes caja para seis meses. Un pequeño grupo de clientes usa lo que vendes de una manera que no habías previsto, y ese grupo sí crece.",
    options: [
      {
        id: "a",
        label: "Pivotar de inmediato hacia el uso que crece",
        detail: "Reorientas oferta, precio y canal hacia ese grupo y reduces todo lo demás.",
        effects: { cashPct: -6, demandPct: 8, morale: -2, rounds: 3 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -10, cashPct: -4 },
          text: "El grupo que crecía resultó más pequeño de lo estimado y el cambio dejó descolocados a tus clientes antiguos.",
        },
        outcome:
          "Apostaste la caja que quedaba a la única señal de crecimiento que tenías. El equipo tuvo que aprender a vender algo distinto.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Validar el nuevo modelo durante un trimestre",
        detail: "Entrevistas a esos clientes, armas una oferta mínima y defines qué cifra de ventas confirmaría el cambio.",
        effects: { cashPct: -3, demandPct: 4, quality: 2 },
        outcome:
          "La prueba consumió parte de tu tiempo disponible y confirmó la demanda con ventas reales. Pivotaste con datos y con el equipo convencido.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Insistir con más publicidad en el modelo actual",
        detail: "Aumentas la inversión comercial para recuperar las ventas perdidas.",
        effects: { cashPct: -6, demandPct: 2 },
        outcome:
          "La publicidad frenó la caída por unas semanas. El cliente no dejó de comprar por no conocerte, sino porque ya no compra de esa forma.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Recortar gastos y esperar que el mercado vuelva",
        detail: "Reduces personal y costos para alargar la vida de la caja.",
        effects: { fixedCostPct: -5, morale: -5, demandPct: -4, rounds: 2 },
        outcome:
          "Ganaste tiempo. El mercado no volvió a ser como antes y llegaste al siguiente año más pequeño y con el mismo problema.",
        verdict: "riesgosa",
      },
    ],
    concept: "Pivote del modelo de negocio",
    lesson:
      "Pivotar es cambiar la estrategia sin cambiar la visión. La señal suele estar en los clientes que usan el producto de forma inesperada, y conviene validarla con una prueba barata antes de apostar toda la caja.",
    basedOn: "Método Lean Startup, difundido por Eric Ries",
  },
  {
    id: "est-sucesion-empresa-familiar",
    title: "Quién dirigirá la empresa familiar",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "El fundador de la empresa, tu padre, tiene 68 años y quiere retirarse en dos años. Tu hermano mayor espera el cargo por ser el primogénito, aunque nunca ha dirigido un área. Tu prima lleva ocho años en la empresa y maneja el área comercial con buenos resultados. No hay reglas escritas y el tema se evita en los almuerzos familiares.",
    options: [
      {
        id: "a",
        label: "Nombrar al hermano mayor por tradición",
        detail: "Se respeta la costumbre familiar y se anuncia de una vez.",
        effects: { morale: -6, productivityPct: -4 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -5, morale: -4 },
          text: "La prima renunció y dos clientes importantes se fueron con ella. Varios jefes se desmotivaron al ver que el mérito no cuenta.",
        },
        outcome:
          "La familia evitó una discusión. La empresa recibió un gerente que todavía tiene que aprender el negocio.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Contratar a un gerente externo",
        detail: "La familia conserva la propiedad y entrega la gestión a un profesional.",
        effects: { fixedCostPct: 3, productivityPct: 4, morale: -2 },
        risk: {
          prob: 0.3,
          effects: { morale: -4, productivityPct: -4 },
          text: "La familia interfirió en las decisiones del gerente y este renunció a los ocho meses.",
        },
        outcome:
          "Llegó un profesional con experiencia y sin historia familiar. Su éxito depende de que la familia respete la separación entre propiedad y gestión.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Elaborar un protocolo familiar",
        detail: "Con un asesor externo definen reglas para cargos, sueldos, dividendos y formación del sucesor.",
        effects: { cashPct: -2, morale: 5, reputation: 3, productivityPct: 2 },
        outcome:
          "Las conversaciones fueron incómodas y necesarias. La familia acordó reglas antes de hablar de nombres, y el sucesor será evaluado con criterios que todos conocen.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Postergar la decisión",
        detail: "Esperas a que el tema se resuelva más cerca del retiro.",
        effects: { morale: -3 },
        risk: {
          prob: 0.3,
          effects: { productivityPct: -6, morale: -5, demandPct: -4 },
          text: "El fundador tuvo un problema de salud y la empresa quedó sin cabeza, con la familia enfrentada.",
        },
        outcome:
          "Nadie se incomodó. El tema sigue sin hablarse y cada familiar asume que el cargo le corresponde.",
        verdict: "riesgosa",
      },
    ],
    concept: "Sucesión en la empresa familiar",
    lesson:
      "La sucesión es un proceso de años, no un anuncio. Un protocolo familiar separa los roles de familia, propiedad y gestión, y fija reglas antes de que aparezcan los conflictos.",
  },
  {
    id: "est-ventaja-primer-movimiento",
    title: "Ser el primero o esperar a que otro abra camino",
    category: "estrategia",
    industries: "all",
    market: "all",
    tier: 2,
    situation:
      "Apareció una tecnología que podría cambiar la forma de atender a tus clientes. Ningún competidor en el Perú la usa todavía, y en México y Chile algunas empresas la probaron con resultados mixtos. Adoptarla hoy cuesta caro y obliga a educar al cliente. En dos años será más barata y estará más probada.",
    options: [
      {
        id: "a",
        label: "Hacer un piloto con un grupo de clientes",
        detail: "Pruebas la tecnología a pequeña escala, sin comprometer toda la operación.",
        effects: { cashPct: -3, brand: 3, quality: 2, satisfaction: 2 },
        outcome:
          "Aprendiste qué funciona y qué no con poco dinero. Cuando el mercado madure tendrás experiencia y podrás escalar antes que los demás.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Ser el primero en adoptarla",
        detail: "Inviertes ahora en toda tu operación y lo comunicas como novedad.",
        effects: { cashPct: -8, brand: 6, demandPct: 5, rounds: 3 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -4, satisfaction: -4 },
          text: "La tecnología tuvo fallas de juventud. Pagaste el costo de educar a un mercado que tus rivales aprovecharon después.",
        },
        outcome:
          "Tu marca quedó asociada a la innovación. Asumiste el costo de enseñar al cliente y de descubrir los errores antes que nadie.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Esperar y seguir a quien abra camino",
        detail: "Observas cómo le va al primero que la adopte y decides después.",
        effects: {},
        risk: {
          prob: 0.35,
          effects: { demandPct: -6, brand: -4, rounds: 2 },
          text: "Un competidor adoptó la tecnología, le funcionó y se quedó con los clientes más innovadores.",
        },
        outcome:
          "Ahorraste la inversión y dejaste que otro pague los errores de aprendizaje. Todo depende de cuánta ventaja saque quien llegue primero.",
        verdict: "buena",
      },
    ],
    concept: "Ventaja del primer movimiento",
    lesson:
      "Llegar primero da marca y aprendizaje, pero también el costo de educar al mercado. El seguidor rápido aprovecha los errores ajenos. Un piloto permite aprender como pionero con el riesgo de un seguidor.",
  },
];

export default data;
