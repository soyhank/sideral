import type { Dilemma } from "../types";

/**
 * Situaciones específicas por industria (parte A):
 * pasteleria, bebidas, restaurante, cafeteria, moda, minimarket,
 * farmacia, ecommerce, inmobiliaria, lotes y autos. Seis por industria.
 */
const data: Dilemma[] = [
  // ===== PASTELERÍA =====
  {
    id: "ind-pasteleria-huevo-mantequilla",
    title: "El huevo y la mantequilla se disparan",
    category: "proveedores",
    industries: ["pasteleria"],
    market: "B2C",
    tier: 1,
    situation:
      "En pocas semanas el huevo subió con fuerza en el mercado mayorista y la mantequilla importada llegó más cara por el tipo de cambio. Entre los dos insumos explican buena parte del costo de tus tortas y kekes. Tu maestra pastelera propone reemplazar la mantequilla por margarina sin decirle nada a nadie. Tienes que decidir cómo proteger tu margen.",
    options: [
      {
        id: "a",
        label: "Subir precios solo en las tortas de mayor valor",
        detail: "Ajustas los productos donde el cliente compra por calidad y mantienes el precio de los productos gancho.",
        effects: { costPct: 6, cashPct: 3, demandPct: -2, rounds: 2 },
        outcome:
          "Las tortas de celebración aguantaron el aumento casi sin perder pedidos, porque quien celebra no compara centavos. Los kekes y empanadas mantuvieron el tráfico del local. Recuperaste buena parte del margen.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Cambiar a margarina sin avisar",
        detail: "Mantienes el precio y la etiqueta de siempre, pero con un insumo más barato en la receta.",
        effects: { costPct: -2, quality: -6, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -8, satisfaction: -7, brand: -5, reputation: -4, rounds: 2 },
          text: "Tus clientes habituales notaron el cambio de sabor y una reseña que te acusa de vender margarina como mantequilla se volvió popular en el barrio.",
        },
        outcome:
          "El costo bajó de inmediato, pero el producto ya no es el mismo. En pastelería el cliente frecuente reconoce el sabor de la mantequilla, y si siente que lo engañaste no reclama, simplemente deja de venir.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Absorber el alza y esperar que baje",
        detail: "No tocas precios ni recetas y aceptas ganar menos por unos meses.",
        effects: { costPct: 6, satisfaction: 2, rounds: 2 },
        outcome:
          "Tus clientes ni se enteraron del problema y siguieron comprando igual. Tu margen se adelgazó dos trimestres. Funcionó porque tenías caja para resistir, pero no es una política que puedas repetir cada vez que sube un insumo.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Cerrar un contrato directo con una granja",
        detail: "Pagas por adelantado un volumen fijo de huevo a un productor de Huaral a cambio de precio estable.",
        effects: { cashPct: -3, costPct: 3, rounds: 3 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -2 },
          text: "El precio del huevo bajó antes de lo previsto y por unas semanas pagaste más caro que el mercado.",
        },
        outcome:
          "Inmovilizaste caja, pero aseguraste precio y abastecimiento en plena escasez. El contrato solo cubre el huevo, así que la mantequilla siguió golpeando tu costo.",
        verdict: "buena",
      },
    ],
    concept: "Traslado de costos al precio",
    lesson:
      "Cuando sube un insumo no todos los productos soportan el mismo aumento. Conviene trasladar el costo donde la demanda es menos sensible al precio y proteger los productos que traen clientes al local.",
  },
  {
    id: "ind-pasteleria-dia-de-la-madre",
    title: "Más pedidos que horno para el Día de la Madre",
    category: "operaciones",
    industries: ["pasteleria"],
    market: "B2C",
    tier: 1,
    situation:
      "Faltan diez días para el Día de la Madre, la fecha más fuerte del año para una pastelería. Ya tienes reservadas casi todas las tortas que tu horno y tu equipo pueden producir con calidad, y los pedidos siguen entrando por WhatsApp. Cada pedido rechazado es dinero que se va a la competencia, pero una torta entregada tarde el domingo es un cliente perdido para siempre.",
    options: [
      {
        id: "a",
        label: "Aceptar todos los pedidos que lleguen",
        detail: "Nadie se queda sin torta. El equipo hará amanecidas y se verá cómo se cumple.",
        effects: { cashPct: 7, morale: -6, quality: -3 },
        risk: {
          prob: 0.55,
          effects: { cashPct: -4, satisfaction: -10, brand: -6, reputation: -3 },
          text: "El domingo quedaron tortas sin terminar y entregas con horas de retraso. Tuviste que devolver dinero y las quejas con fotos circularon en redes.",
        },
        outcome:
          "Vendiste más que nunca en un fin de semana, con el equipo al límite y decoraciones hechas a la carrera. Superar la capacidad no aumenta la producción, solo aumenta los errores.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Cerrar pedidos al llegar al tope, con adelanto",
        detail: "Defines un cupo máximo, cobras la mitad por adelantado y ofreces lista de espera a los demás.",
        effects: { cashPct: 4, satisfaction: 4, brand: 2 },
        outcome:
          "Dijiste que no a varios clientes, pero cada torta salió a tiempo y bien hecha. El adelanto eliminó los pedidos fantasma y varios de los rechazados reservaron con anticipación para la siguiente campaña.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Ampliar capacidad solo por la campaña",
        detail: "Alquilas horas de horno en un obrador vecino, contratas ayudantes eventuales y limitas la carta a cinco modelos.",
        effects: { cashPct: 6, morale: 2, satisfaction: 3 },
        risk: {
          prob: 0.2,
          effects: { quality: -3, satisfaction: -3 },
          text: "Los ayudantes eventuales no dominaban tus recetas y una parte de las tortas salió con acabados desiguales.",
        },
        outcome:
          "Reducir la carta a pocos modelos permitió producir en serie y aprovechar el horno alquilado. Atendiste más pedidos sin quemar a tu equipo, con un costo extra que la campaña pagó de sobra.",
        verdict: "optima",
      },
    ],
    concept: "Capacidad instalada y picos de demanda",
    lesson:
      "En las campañas la restricción no es la demanda, es la capacidad. Se puede ampliar de forma temporal y simplificando el surtido, pero vender por encima de lo que puedes producir termina en incumplimientos.",
  },
  {
    id: "ind-pasteleria-merma-vitrina",
    title: "La vitrina llena a las ocho de la noche",
    category: "operaciones",
    industries: ["pasteleria"],
    market: "B2C",
    tier: 1,
    situation:
      "Todas las noches te sobran porciones de torta, empanadas y panes dulces que mañana ya no tendrán la misma frescura. Si produces menos, la vitrina se ve vacía por la tarde y el cliente siente que llegó a las sobras. Si produces lo de siempre, botas producto cada día. Tu administradora calcula que la merma se está comiendo una parte visible de la utilidad.",
    options: [
      {
        id: "a",
        label: "Vender lo de ayer como fresco del día",
        detail: "Reacomodas la vitrina en la mañana y nadie pregunta cuándo se horneó.",
        effects: { costPct: -3, quality: -5 },
        risk: {
          prob: 0.4,
          effects: { satisfaction: -8, brand: -5, reputation: -5, cashPct: -2 },
          text: "Un cliente se enfermó con un postre de crema del día anterior y presentó su queja en el libro de reclamaciones y ante la municipalidad.",
        },
        outcome:
          "La merma casi desapareció del reporte, pero tu producto dejó de ser confiable. En productos con crema y relleno, la frescura no es un detalle de calidad, es un tema de salud.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Ofrecer la última hora con descuento",
        detail: "Desde las siete de la noche todo lo del día sale a mitad de precio, anunciado en la puerta y en redes.",
        effects: { costPct: -2, demandPct: 3, brand: -1, rounds: 2 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -2 },
          text: "Parte de tus clientes habituales empezó a esperar la hora del descuento para comprar lo mismo más barato.",
        },
        outcome:
          "Recuperaste el costo de casi todo lo que antes botabas y llegó un público nuevo que no te conocía. Tuviste que vigilar que el descuento no reemplazara ventas a precio completo.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Registrar ventas por hora y hornear en dos tandas",
        detail: "Anotas qué se vende y cuándo, y pasas de una horneada grande a una de mañana y otra de tarde según la demanda.",
        effects: { cashPct: -1, costPct: -3, quality: 3, satisfaction: 2, rounds: 3 },
        outcome:
          "Con tres semanas de registro descubriste qué productos sobraban siempre y cuáles se agotaban temprano. La segunda horneada dio producto fresco en la tarde y redujo la merma sin vaciar la vitrina.",
        verdict: "optima",
      },
    ],
    concept: "Gestión de mermas en perecibles",
    lesson:
      "La merma se reduce primero con información, no con descuentos. Saber qué se vende y a qué hora permite producir cerca de la demanda real y tratar el remate de fin de día como último recurso.",
  },
  {
    id: "ind-pasteleria-torta-personalizada",
    title: "La torta de fondant que nadie costeó",
    category: "finanzas",
    industries: ["pasteleria"],
    market: "B2C",
    tier: 2,
    situation:
      "Las tortas personalizadas con figuras de fondant son lo que más comentarios te trae en redes. Las cobras un poco más que una torta de vitrina, pero tu decoradora tarda entre cinco y ocho horas en cada una y el cliente pide cambios hasta el último día. Al cierre del trimestre ves que la línea vende mucho y casi no deja utilidad.",
    options: [
      {
        id: "a",
        label: "Cotizar cada torta por horas de trabajo",
        detail: "Calculas insumos más horas de decoración y cobras cada diseño según su complejidad, con un solo cambio incluido.",
        effects: { cashPct: 3, demandPct: -3, morale: 3, rounds: 2 },
        outcome:
          "Algunos clientes se fueron al ver el nuevo precio, justamente los que pedían los diseños más trabajosos al precio más bajo. Los que quedaron pagan lo que cuesta el trabajo y la línea por fin deja margen.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Mantener precios porque la línea da visibilidad",
        detail: "Asumes la línea como un gasto de publicidad que trae clientes a los demás productos.",
        effects: { cashPct: -2, brand: 3, morale: -3 },
        outcome:
          "Las fotos siguieron trayendo seguidores, pero la mayoría de consultas eran por más tortas personalizadas, no por productos de vitrina. Cada pedido nuevo ocupaba a tu mejor decoradora en un trabajo que no se paga solo.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Ofrecer un catálogo cerrado de diseños",
        detail: "Defines doce modelos con precio fijo y tiempos conocidos. Lo que salga del catálogo se cotiza aparte.",
        effects: { cashPct: 2, productivityPct: 5, satisfaction: -1, rounds: 3 },
        outcome:
          "Los diseños repetidos se hicieron cada vez más rápido y el cliente decidió más fácil al ver fotos y precios. Perdiste algunos encargos muy especiales, pero ganaste orden y tiempos predecibles.",
        verdict: "buena",
      },
    ],
    concept: "Costeo por pedido",
    lesson:
      "En productos hechos a medida la mano de obra suele pesar más que los insumos. Si no mides las horas de cada pedido puedes vender mucho de lo que menos te deja.",
  },
  {
    id: "ind-pasteleria-delivery-aplicativo",
    title: "El aplicativo de delivery y su comisión",
    category: "marketing",
    industries: ["pasteleria"],
    market: "B2C",
    tier: 2,
    situation:
      "Un aplicativo de delivery te ofrece aparecer en su plataforma a cambio de una comisión alta sobre cada venta, además de promociones que pagarías tú. Tus postres individuales tienen buen margen, pero las tortas enteras viajan mal en moto y dejan poco después de la comisión. Dos pastelerías de tu zona en Arequipa ya están en el aplicativo.",
    options: [
      {
        id: "a",
        label: "Entrar con toda la carta al mismo precio del local",
        detail: "Subes todos tus productos tal como están en vitrina y aceptas la comisión completa.",
        effects: { demandPct: 8, costPct: 7, satisfaction: -3, rounds: 2 },
        outcome:
          "Las ventas crecieron, pero varias tortas llegaron golpeadas y la comisión se llevó casi toda la ganancia de los pedidos grandes. Vendiste más y ganaste prácticamente lo mismo.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Entrar solo con productos que viajan bien",
        detail: "Armas una carta corta de postres en vaso, porciones y cajas de alfajores, con empaque reforzado y precio que cubre la comisión.",
        effects: { cashPct: -1, demandPct: 6, costPct: 2, brand: 2, rounds: 2 },
        outcome:
          "El aplicativo funcionó como una vitrina para gente que no pasaba por tu cuadra. Los productos llegaron bien y el precio ajustado protegió tu margen. Las tortas enteras siguieron vendiéndose por pedido directo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Armar reparto propio por WhatsApp",
        detail: "Contratas un motorizado por horas y promocionas pedidos directos en tus redes y empaques.",
        effects: { fixedCostPct: 3, demandPct: 3, satisfaction: 2, rounds: 2 },
        outcome:
          "Te quedaste con todo el margen y con los datos de tus clientes, pero solo te compró quien ya te conocía. El motorizado tuvo horas muertas entre semana y horas de colapso los sábados.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "No hacer delivery",
        detail: "Te concentras en la venta en local y en los pedidos para recoger.",
        effects: { demandPct: -3, rounds: 2 },
        outcome:
          "Evitaste comisiones y dolores de cabeza, pero una parte de tus clientes empezó a pedir postres a las pastelerías que sí aparecen en el aplicativo.",
        verdict: "riesgosa",
      },
    ],
    concept: "Costo del canal de venta",
    lesson:
      "Un canal nuevo no se evalúa por lo que vende sino por lo que deja después de sus costos. Conviene diseñar una oferta específica para cada canal en lugar de copiar la carta del local.",
  },
  {
    id: "ind-pasteleria-registro-sanitario",
    title: "El supermercado pide registro sanitario",
    category: "legal",
    industries: ["pasteleria"],
    market: "B2C",
    tier: 3,
    situation:
      "Una cadena de supermercados del norte probó tus alfajores y quiere venderlos envasados en sus tiendas de Trujillo, Chiclayo y Piura. Para codificarte exige registro sanitario de Digesa para cada producto, etiqueta con información nutricional y un área de producción que pase su auditoría. Hoy vendes al público desde tu local, donde esa exigencia no se te aplicaba de la misma manera.",
    options: [
      {
        id: "a",
        label: "Tramitar los registros y adecuar el obrador",
        detail: "Inviertes en análisis de laboratorio, etiquetas, trámites y mejoras del área de producción antes de vender una sola caja.",
        effects: { cashPct: -7, quality: 5, reputation: 4, demandPct: 10, rounds: 3 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -3, demandPct: -5 },
          text: "La auditoría de la cadena observó tu almacén y el ingreso a tiendas se retrasó un trimestre mientras corregías.",
        },
        outcome:
          "El proceso tomó varios meses y consumió caja, pero quedaste habilitado para vender a cualquier cadena, no solo a esta. El registro se convirtió en una ventaja frente a las pastelerías que no pueden entrar a ese canal.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Encargar la producción a una planta habilitada",
        detail: "Una planta con sus permisos al día fabrica con tu receta y tu marca, y tú te ocupas de vender.",
        effects: { cashPct: -2, costPct: 5, demandPct: 8, quality: -2, rounds: 3 },
        risk: {
          prob: 0.2,
          effects: { brand: -3, demandPct: -3 },
          text: "La planta empezó a ofrecer a otras marcas un alfajor muy parecido al tuyo, porque el contrato no protegía tu receta.",
        },
        outcome:
          "Entraste al supermercado rápido y con poca inversión. El costo por unidad es mayor y dependes de que un tercero cuide tu receta y tu calidad.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Usar el registro de un producto parecido",
        detail: "Un conocido te presta el número de registro de sus galletas para imprimirlo en tu etiqueta y no perder la oportunidad.",
        effects: { demandPct: 9, rounds: 2 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -12, demandPct: -12, reputation: -14, brand: -6, rounds: 2 },
          text: "La autoridad sanitaria detectó que el registro no correspondía al producto. Hubo retiro del lote, multa y la cadena te eliminó de su lista de proveedores.",
        },
        outcome:
          "Llegaste a las góndolas en pocas semanas, con una etiqueta que declara algo falso. Un registro sanitario identifica a un producto y a un fabricante específicos, no se presta.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Rechazar el pedido y seguir en tu local",
        detail: "Decides que todavía no estás listo para el canal moderno y lo dejas para más adelante.",
        effects: { brand: -1 },
        outcome:
          "No arriesgaste caja ni te distrajiste de tu negocio actual. La cadena codificó a otra marca de alfajores y ese espacio en góndola ya tiene dueño.",
        verdict: "buena",
      },
    ],
    concept: "Barreras regulatorias de entrada a un canal",
    lesson:
      "Los permisos sanitarios son un costo de entrada al canal moderno y también una protección para quien ya los tiene. Cumplirlos de verdad abre mercados, simularlos los cierra.",
  },

  // ===== BEBIDAS =====
  {
    id: "ind-bebidas-octogono-loncheras",
    title: "Campaña para loncheras con octógono en la etiqueta",
    category: "marketing",
    industries: ["bebidas"],
    market: "B2C",
    tier: 1,
    situation:
      "Tu néctar de durazno lleva el octógono de alto en azúcar. Para la campaña escolar, tu agencia propone el lema «la bebida sana para la lonchera» con dibujos animados y sorteo de mochilas. Sabes que las normas de alimentación saludable restringen la publicidad de productos con octógonos dirigida a niños y que los quioscos escolares no pueden venderlos.",
    options: [
      {
        id: "a",
        label: "Lanzar la campaña tal como la propone la agencia",
        detail: "Aprovechas la temporada de mayor compra de bebidas para lonchera con un mensaje directo a niños y padres.",
        effects: { cashPct: -2, demandPct: 9, rounds: 1 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -8, brand: -6, reputation: -9 },
          text: "Indecopi abrió un procedimiento por publicidad engañosa y dirigida a menores. Tuviste que retirar la campaña y pagar una multa.",
        },
        outcome:
          "La campaña movió ventas en marzo. El problema es que prometía salud con un producto que advierte lo contrario en su propia etiqueta, y eso lo puede ver cualquier padre o cualquier competidor que quiera denunciarte.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Sacar una versión sin octógono para escolares",
        detail: "Desarrollas una bebida con más fruta y sin azúcar añadida en envase pequeño, y haces la campaña solo con ese producto.",
        effects: { cashPct: -4, costPct: 3, demandPct: 5, brand: 4, reputation: 3, rounds: 3 },
        risk: {
          prob: 0.3,
          effects: { demandPct: -3 },
          text: "A los niños la versión menos dulce les gustó menos y la recompra fue más baja de lo que esperabas.",
        },
        outcome:
          "El desarrollo tomó tiempo y llegaste con la campaña escolar ya empezada. A cambio tienes un producto que puede entrar a quioscos y loncheras sin ninguna objeción.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Hacer campaña para adultos sin hablar de salud",
        detail: "Comunicas sabor y origen de la fruta, dirigido a quien compra, sin personajes infantiles ni promesas nutricionales.",
        effects: { cashPct: -2, demandPct: 3, brand: 2 },
        outcome:
          "La campaña fue menos llamativa y cumplió la norma. Vendiste por lo que tu producto sí es, un néctar rico hecho con fruta peruana, y no te expusiste a sanciones.",
        verdict: "buena",
      },
    ],
    concept: "Publicidad responsable y promesa de marca",
    lesson:
      "La publicidad no puede prometer lo que la etiqueta desmiente. Una promesa de marca sostenible se construye sobre atributos reales del producto.",
    basedOn: "Ley de promoción de la alimentación saludable y advertencias publicitarias (octógonos) vigentes en Perú desde 2019",
  },
  {
    id: "ind-bebidas-fruta-de-estacion",
    title: "El maracuyá fuera de temporada",
    category: "proveedores",
    industries: ["bebidas"],
    market: "B2C",
    tier: 1,
    situation:
      "Tu jugo de maracuyá es el más vendido, pero cada año, cuando termina la cosecha fuerte, el precio de la fruta en el mercado mayorista se multiplica y la calidad baja. Tu jefe de producción te recuerda que la pulpa se puede congelar en temporada. Hoy compras fruta fresca semana a semana, al precio que encuentres.",
    options: [
      {
        id: "a",
        label: "Comprar y congelar pulpa en plena cosecha",
        detail: "Compras volumen cuando la fruta está barata y alquilas espacio en una cámara de frío para todo el año.",
        effects: { cashPct: -5, costPct: -6, fixedCostPct: 2, quality: 2, rounds: 4 },
        risk: {
          prob: 0.15,
          effects: { cashPct: -3 },
          text: "Una falla eléctrica en la cámara de frío alquilada malogró parte de la pulpa almacenada.",
        },
        outcome:
          "Pusiste mucha caja en inventario durante la cosecha, y el resto del año produjiste con un costo estable mientras tus competidores sufrían con la fruta cara.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Seguir comprando fresco al precio del día",
        detail: "No inmovilizas dinero y aceptas que el costo suba unos meses al año.",
        effects: { costPct: 8, rounds: 2 },
        outcome:
          "Tu caja quedó libre, pero en los meses de escasez tu producto estrella dejó de ser rentable. Además la fruta de fuera de temporada llegó más ácida y con menos rendimiento.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Rotar sabores según la temporada",
        detail: "Retiras el maracuyá cuando escasea y empujas el sabor de la fruta que esté en cosecha, como mango o mandarina.",
        effects: { costPct: -3, demandPct: -2, brand: 2, rounds: 3 },
        outcome:
          "Tu costo se mantuvo bajo todo el año y la marca ganó una historia que contar con cada fruta de temporada. Algunos clientes fieles al maracuyá reclamaron y unos pocos se fueron a otra marca.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Completar con saborizante cuando falte fruta",
        detail: "Reduces el porcentaje de pulpa y compensas con esencia y colorante manteniendo la misma etiqueta.",
        effects: { costPct: -5, quality: -7, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { reputation: -8, brand: -6, cashPct: -5, demandPct: -6 },
          text: "Un análisis mostró que el contenido de fruta no coincidía con lo declarado en la etiqueta y recibiste una sanción por información falsa al consumidor.",
        },
        outcome:
          "El costo bajó y el producto dejó de ser lo que su etiqueta dice. Una bebida que se vende como natural vive de esa confianza.",
        verdict: "mala",
      },
    ],
    concept: "Estacionalidad de insumos y planeamiento de compras",
    lesson:
      "Los insumos agrícolas tienen ciclos conocidos. Planificar las compras según la cosecha convierte una amenaza anual en una ventaja de costos, a cambio de inmovilizar capital de trabajo.",
  },
  {
    id: "ind-bebidas-impuesto-selectivo-azucar",
    title: "El impuesto selectivo castiga tu receta",
    category: "tributario",
    industries: ["bebidas"],
    market: "B2C",
    tier: 2,
    situation:
      "El impuesto selectivo al consumo grava con una tasa mayor a las bebidas que tienen más azúcar por cada 100 mililitros. Tu chicha morada embotellada cae en el tramo alto. Si reduces el azúcar pagarías una tasa menor, pero el sabor cambiaría, y tu producto se vende precisamente porque sabe a chicha de casa.",
    options: [
      {
        id: "a",
        label: "Reformular hasta bajar de tramo",
        detail: "Trabajas con un laboratorio una receta con menos azúcar y algo de estevia, con pruebas de sabor antes de lanzar.",
        effects: { cashPct: -3, costPct: -4, demandPct: -3, rounds: 3 },
        risk: {
          prob: 0.35,
          effects: { demandPct: -6, satisfaction: -4, rounds: 2 },
          text: "Los consumidores notaron el regusto del edulcorante y una parte volvió a preparar chicha en casa o cambió de marca.",
        },
        outcome:
          "Pagas menos impuesto por cada botella y te adelantaste a una tendencia que apunta a menos azúcar. El reto fue que el cliente tradicional aceptara el nuevo sabor.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Mantener la receta y trasladar el impuesto",
        detail: "Defiendes el sabor original y subes el precio al público para cubrir la carga tributaria.",
        effects: { costPct: 4, demandPct: -4, satisfaction: 1, rounds: 3 },
        outcome:
          "Conservaste a los clientes que te compran por el sabor, pero en bodega tu botella quedó más cara que las de la competencia que sí reformuló. Tu volumen bajó y tu producto se volvió de nicho.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Mantener la original y lanzar una versión ligera",
        detail: "Conservas la receta clásica a mayor precio y sumas una segunda presentación baja en azúcar en el tramo menor.",
        effects: { cashPct: -4, fixedCostPct: 2, demandPct: 4, brand: 3, rounds: 3 },
        outcome:
          "Cada cliente eligió su versión y nadie sintió que le cambiaron el producto. Manejar dos recetas complicó la producción y el inventario, pero repartiste el riesgo entre dos públicos.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Declarar menos azúcar de la que tiene",
        detail: "Presentas un contenido de azúcar menor al real para tributar en el tramo bajo sin tocar la receta.",
        effects: { costPct: -4, rounds: 2 },
        risk: {
          prob: 0.55,
          effects: { cashPct: -15, reputation: -15, brand: -5 },
          text: "Una fiscalización con análisis de laboratorio mostró la diferencia. SUNAT cobró el impuesto omitido con multa e intereses.",
        },
        outcome:
          "Pagaste menos impuesto durante unos meses con una declaración falsa. El contenido de azúcar se verifica con un análisis simple, así que el ahorro dependía de que nadie revisara.",
        verdict: "mala",
      },
    ],
    concept: "Impuestos selectivos y diseño del producto",
    lesson:
      "Algunos impuestos buscan cambiar lo que las empresas producen. Ante ellos la decisión no es solo tributaria, también es de producto, de precio y de a qué cliente quieres servir.",
    basedOn: "Impuesto selectivo al consumo diferenciado por contenido de azúcar en bebidas, aplicado en Perú desde 2018",
  },
  {
    id: "ind-bebidas-caida-de-invierno",
    title: "En invierno nadie compra refresco helado",
    category: "estrategia",
    industries: ["bebidas"],
    market: "B2C",
    tier: 2,
    situation:
      "Entre junio y setiembre tus ventas en Lima caen a casi la mitad. La planta, los sueldos y el alquiler cuestan lo mismo todo el año, así que el invierno se come lo que ganaste en verano. Tu equipo discute qué hacer con los meses fríos, mientras en Piura, Iquitos y Tarapoto el calor no se va nunca.",
    options: [
      {
        id: "a",
        label: "Lanzar una línea de bebidas calientes",
        detail: "Desarrollas concentrados de emoliente e infusiones de hierbas para vender en los meses fríos.",
        effects: { cashPct: -5, demandPct: 6, brand: 2, rounds: 2 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -3, demandPct: -4 },
          text: "La línea caliente no despegó, porque el consumidor no asocia tu marca con bebidas de invierno y prefirió al emolientero de su esquina.",
        },
        outcome:
          "Usaste la planta en los meses muertos con un producto nuevo. Es otra categoría, con otros competidores y otra forma de consumo, así que el aprendizaje te costó tiempo y dinero.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Llevar el producto al norte y al oriente",
        detail: "Abres distribución en ciudades calurosas todo el año para compensar la caída de Lima.",
        effects: { cashPct: -4, demandPct: 8, costPct: 2, rounds: 3 },
        risk: {
          prob: 0.2,
          effects: { cashPct: -2, demandPct: -3 },
          text: "Un bloqueo de carretera retuvo tus despachos por varios días y parte de la mercadería llegó cerca de su fecha de vencimiento.",
        },
        outcome:
          "El mismo producto, sin cambiar nada, encontró demanda estable donde el clima acompaña. El flete encareció cada botella, pero tus ventas del año dejaron de depender del verano limeño.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Producir igual y guardar inventario para el verano",
        detail: "Mantienes la planta a ritmo normal en invierno para llegar con stock alto a diciembre.",
        effects: { cashPct: -6, productivityPct: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -5, quality: -3 },
          text: "Una parte del inventario venció antes de venderse, porque una bebida natural sin preservantes tiene vida útil corta.",
        },
        outcome:
          "La planta no paró, pero tu caja se convirtió en botellas apiladas. En productos naturales el inventario no espera al verano.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Ajustar producción y ahorrar en verano para el invierno",
        detail: "Reduces turnos en los meses fríos, programas vacaciones y mantenimiento, y reservas caja de la temporada alta.",
        effects: { fixedCostPct: -4, morale: -2, rounds: 2 },
        outcome:
          "No creciste, pero dejaste de perder. Tratar el año como un solo ciclo, con meses que financian a otros, te dio tranquilidad para planear la siguiente temporada.",
        verdict: "buena",
      },
    ],
    concept: "Estacionalidad de la demanda",
    lesson:
      "Un negocio estacional se gestiona con el año completo a la vista. Se puede suavizar la curva con otros mercados o productos, o aceptar el ciclo y administrar la caja para cruzar los meses bajos.",
  },
  {
    id: "ind-bebidas-congeladora-en-bodega",
    title: "Sin espacio en la congeladora de la bodega",
    category: "marketing",
    industries: ["bebidas"],
    market: "B2C",
    tier: 2,
    situation:
      "Una bebida que no está helada no se vende en la bodega. Las visicoolers de los bodegueros pertenecen a las grandes marcas de gaseosa y cerveza, que las entregan con la condición de exhibir solo sus productos. Tus jugos terminan en un estante al ambiente, detrás de los fideos. Tu supervisor de ventas en Chiclayo trae tres ideas.",
    options: [
      {
        id: "a",
        label: "Pagarle al bodeguero por un espacio en esa visicooler",
        detail: "Le das una bonificación para que coloque tus botellas en el equipo de la otra marca, a escondidas de su supervisor.",
        effects: { cashPct: -1, demandPct: 6, rounds: 1 },
        risk: {
          prob: 0.55,
          effects: { demandPct: -7, brand: -2, reputation: -3 },
          text: "El supervisor de la otra marca encontró tus productos, amenazó con retirar el equipo y los bodegueros sacaron tus botellas para no perderlo.",
        },
        outcome:
          "Por unas semanas vendiste helado y barato. Pusiste al bodeguero a incumplir un acuerdo con su proveedor más importante, y cuando tuvo que escoger no te escogió a ti.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Entregar conservadoras propias a las mejores bodegas",
        detail: "Compras equipos pequeños con tu marca y los das en préstamo de uso a las bodegas de mayor venta.",
        effects: { cashPct: -6, demandPct: 9, brand: 4, fixedCostPct: 1, rounds: 4 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -2 },
          text: "Algunos bodegueros llenaron tu conservadora con productos de otras marcas o la usaron para guardar comida.",
        },
        outcome:
          "La inversión fue fuerte, así que elegiste con cuidado dónde colocar cada equipo. En esas bodegas tu producto pasó del estante escondido a la altura de los ojos, helado y con tu marca al frente.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Salir de la bodega y buscar otros puntos",
        detail: "Concentras la venta en juguerías, gimnasios, cafeterías y tiendas saludables con refrigeración propia.",
        effects: { demandPct: 3, costPct: 1, brand: 3, rounds: 3 },
        outcome:
          "En esos locales nadie te disputó el frío y el público valora lo natural. Son menos puntos de venta que las bodegas, así que tu volumen creció despacio, pero con mejor precio.",
        verdict: "buena",
      },
    ],
    concept: "Trade marketing y acceso al punto de venta",
    lesson:
      "El producto compite primero por un lugar en el punto de venta y recién después por el consumidor. El acceso a la exhibición se gana con inversión o eligiendo canales donde los grandes no mandan.",
  },
  {
    id: "ind-bebidas-envase-retornable",
    title: "Botella de vidrio retornable o plástico",
    category: "operaciones",
    industries: ["bebidas"],
    market: "B2C",
    tier: 3,
    situation:
      "El envase descartable es uno de tus mayores costos y tus clientes jóvenes critican el plástico. Un proveedor te propone pasar a botella de vidrio retornable, como la de las gaseosas de antes. Cada botella cuesta varias veces más que una de plástico, pero puede dar muchas vueltas si el cliente la devuelve. Necesitarías comprar un parque de envases, lavadora y jabas, y recoger los vacíos en cada punto.",
    options: [
      {
        id: "a",
        label: "Migrar toda la línea a retornable",
        detail: "Compras el parque completo de botellas y jabas, instalas lavado y cambias la distribución para recoger envases.",
        effects: { cashPct: -12, costPct: -7, fixedCostPct: 4, brand: 5, rounds: 4 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -5, costPct: 5, rounds: 2 },
          text: "Muchas botellas no regresaron. Los clientes de paso se las llevaron y tuviste que reponer envases caros cada mes.",
        },
        outcome:
          "El costo por botella vendida baja solo si el envase da muchas vueltas. En las rutas de bodegas de barrio el retorno fue alto. En puntos de paso, como terminales y playas, fue muy bajo.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Piloto retornable solo en restaurantes y bodegas fijas",
        detail: "Pruebas el vidrio donde el envase nunca sale del local o el cliente es vecino, y mantienes plástico en el resto.",
        effects: { cashPct: -4, costPct: -2, brand: 3, reputation: 2, rounds: 3 },
        outcome:
          "En restaurantes casi todas las botellas volvieron, porque se consumen en la mesa. Mediste cuántas vueltas da un envase antes de invertir en grande y aprendiste qué rutas justifican el sistema.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Seguir con plástico, pero reciclado",
        detail: "Cambias a botellas con material reciclado, algo más caras, y lo comunicas en la etiqueta.",
        effects: { costPct: 2, brand: 3, reputation: 2, rounds: 3 },
        outcome:
          "No cambiaste tu operación y respondiste a la crítica ambiental con un costo moderado. Tu gasto en envases sigue siendo alto, porque cada botella se usa una sola vez.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "No cambiar nada",
        detail: "El envase actual funciona y el mercado masivo decide por precio, no por el plástico.",
        effects: { brand: -2 },
        outcome:
          "Tu operación siguió igual de simple. La presión por el plástico no afectó tus ventas en el corto plazo, aunque dos competidores ya comunican envases más sostenibles.",
        verdict: "buena",
      },
    ],
    concept: "Costo total del envase y tasa de retorno",
    lesson:
      "Un activo reutilizable se paga con rotación. Antes de invertir hay que medir cuántas vueltas dará en la práctica, porque la tasa de retorno define si el sistema ahorra o pierde dinero.",
  },

  // ===== RESTAURANTE =====
  {
    id: "ind-restaurante-precio-del-pollo",
    title: "Suben el pollo y la papa",
    category: "finanzas",
    industries: ["restaurante"],
    market: "B2C",
    tier: 1,
    situation:
      "El precio del pollo vivo subió por el costo del maíz importado y la papa amarilla llegó más cara por las lluvias en la sierra. El cuarto de pollo con papas es el plato que todos comparan entre pollerías y el que más vendes. Tus otros platos, como el chaufa, las salchipapas y las bebidas, dejan más margen pero se piden menos.",
    options: [
      {
        id: "a",
        label: "Subir el precio del cuarto de pollo",
        detail: "Trasladas el aumento directamente al plato más vendido y más comparado.",
        effects: { costPct: 5, cashPct: 3, demandPct: -6, rounds: 2 },
        outcome:
          "Recuperaste margen en cada plato, pero el cuarto de pollo es el precio que el cliente tiene en la cabeza. Varias familias empezaron a ir a la pollería de la otra cuadra, que no subió.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Servir menos papas sin cambiar el precio",
        detail: "Reduces la porción de papas y el tamaño del pollo que compras, con la misma carta.",
        effects: { costPct: 1, satisfaction: -6, brand: -3, rounds: 2 },
        outcome:
          "El precio siguió igual, pero el cliente de pollería mira el plato antes que la cuenta. Los comentarios sobre la porción aparecieron rápido en el salón y en redes.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Rediseñar la carta hacia combos de mayor margen",
        detail: "Mantienes el precio del cuarto y armas combos con bebida, ensalada o chaufa, destacados en la carta y por los mozos.",
        effects: { costPct: 5, cashPct: 4, satisfaction: 1, rounds: 2 },
        outcome:
          "El cuarto de pollo siguió atrayendo gente al mismo precio y muchos pasaron al combo por unos soles más. El margen del pedido promedio subió sin que nadie sintiera un aumento.",
        verdict: "optima",
      },
    ],
    concept: "Ingeniería de carta",
    lesson:
      "No todos los platos cumplen la misma función. Unos atraen clientes y otros dejan la ganancia. Conviene proteger el precio del plato que todos comparan y mejorar la mezcla de lo que se pide.",
  },
  {
    id: "ind-restaurante-inspeccion-municipal",
    title: "El fiscalizador y la campana extractora",
    category: "legal",
    industries: ["restaurante"],
    market: "B2C",
    tier: 1,
    situation:
      "Un viernes por la tarde llega un fiscalizador municipal a tu pollería en Huancayo. Encuentra el certificado de seguridad en edificaciones vencido, la campana extractora sin mantenimiento y dos trabajadores sin carné de sanidad. Te dice que corresponde clausura temporal, y en voz baja sugiere que todo se puede arreglar hoy mismo.",
    options: [
      {
        id: "a",
        label: "Pagarle para que no levante el acta",
        detail: "Le entregas dinero en efectivo y atiendes el fin de semana como si nada hubiera pasado.",
        effects: { cashPct: -1 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -8, reputation: -14, demandPct: -8 },
          text: "Otro inspector volvió a las pocas semanas y clausuró el local. Además quedaste expuesto a una denuncia por cohecho y a nuevos pedidos de dinero.",
        },
        outcome:
          "Salvaste el fin de semana. La campana sigue llena de grasa, el certificado sigue vencido y ahora hay alguien que sabe que pagas.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Aceptar el acta y cerrar para subsanar todo",
        detail: "Cierras unos días, limpias ductos, renuevas el certificado y regularizas los carnés.",
        effects: { cashPct: -5, quality: 3, reputation: 5 },
        outcome:
          "Perdiste las ventas del fin de semana y gastaste en el mantenimiento que venías postergando. Reabriste con todo en regla y con menor riesgo de incendio en la cocina.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Pedir por escrito un plazo de subsanación",
        detail: "Reconoces las observaciones, presentas un cronograma de corrección y corriges mientras sigues atendiendo.",
        effects: { cashPct: -3, quality: 3, reputation: 4 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -3 },
          text: "La municipalidad no aceptó el plazo para la campana, por el riesgo de incendio, y tuviste que cerrar dos días de todos modos.",
        },
        outcome:
          "Dejaste constancia de tu voluntad de cumplir y corregiste lo más urgente esa misma semana. Trabajar dentro del procedimiento te costó menos que cualquiera de las otras salidas.",
        verdict: "optima",
      },
    ],
    concept: "Costo del cumplimiento normativo",
    lesson:
      "Cumplir tiene un costo conocido y acotado. No cumplir tiene un costo incierto que suele ser mayor, y la coima no elimina el problema, solo le agrega otro.",
  },
  {
    id: "ind-restaurante-reparto-de-propinas",
    title: "¿De quién son las propinas por Yape?",
    category: "laboral",
    industries: ["restaurante"],
    market: "B2C",
    tier: 2,
    situation:
      "Antes las propinas se dejaban en efectivo sobre la mesa. Ahora casi todas llegan por Yape o con tarjeta, a las cuentas del restaurante. Los mozos reclaman que no saben cuánto entra, los cocineros dicen que nunca reciben nada y tu administrador propone retener una parte para cubrir la vajilla rota y los faltantes de caja.",
    options: [
      {
        id: "a",
        label: "Retener una parte para roturas y faltantes",
        detail: "El restaurante se queda con un porcentaje de las propinas como fondo para pérdidas.",
        effects: { cashPct: 1, morale: -9, productivityPct: -4, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -5, reputation: -7 },
          text: "Dos mozos denunciaron la retención ante SUNAFIL y uno de ellos contó el caso en redes sociales.",
        },
        outcome:
          "El fondo cubrió algunos platos rotos. El equipo lo vivió como un descuento a su ingreso, porque la propina es un reconocimiento del cliente al personal y no un ingreso del negocio.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Repartir todo con un sistema de puntos publicado",
        detail: "Registras cada propina digital, la repartes cada semana entre salón y cocina según puntos, y publicas el cálculo.",
        effects: { morale: 7, productivityPct: 4, satisfaction: 3, rounds: 3 },
        outcome:
          "Al inicio los mozos con más experiencia protestaron por compartir con cocina. A las pocas semanas los platos salían más rápido, porque todos ganan cuando la mesa queda contenta.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Que cada mozo cobre la propina en su propio Yape",
        detail: "El restaurante no interviene. Cada mozo muestra su código al cliente y se queda con lo que recibe.",
        effects: { morale: 1, productivityPct: -2, rounds: 2 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -2, satisfaction: -3 },
          text: "Hubo clientes que pagaron el consumo completo al Yape de un mozo por error, y cuadrar la caja se volvió un problema diario.",
        },
        outcome:
          "Te sacaste un problema de encima. Los mozos pelearon por las mesas grandes, la cocina siguió sin recibir nada y tú perdiste visibilidad de lo que pasa en el salón.",
        verdict: "riesgosa",
      },
    ],
    concept: "Compensación variable y equidad interna",
    lesson:
      "Un incentivo funciona cuando las reglas son claras y el equipo las percibe justas. El dinero que es del personal debe administrarse con total transparencia.",
  },
  {
    id: "ind-restaurante-maestro-hornero",
    title: "La receta vive en la cabeza del maestro hornero",
    category: "operaciones",
    industries: ["restaurante"],
    market: "B2C",
    tier: 2,
    situation:
      "Don Wilfredo maneja el horno a leña y prepara el macerado del pollo desde que abriste. Nadie más sabe las proporciones ni los tiempos, y él lo tiene claro. Una pollería nueva le ofreció un sueldo mayor. Tú quieres abrir un segundo local en Ayacucho, y eso es imposible si el sabor depende de una sola persona.",
    options: [
      {
        id: "a",
        label: "Igualar la oferta y seguir como siempre",
        detail: "Le subes el sueldo para que se quede y el conocimiento sigue donde está.",
        effects: { fixedCostPct: 2, morale: -2, rounds: 3 },
        risk: {
          prob: 0.35,
          effects: { quality: -8, demandPct: -8, satisfaction: -5, rounds: 2 },
          text: "Meses después don Wilfredo se fue de todos modos y el pollo cambió de sabor de un día para otro.",
        },
        outcome:
          "Compraste tiempo. El riesgo sigue intacto, pagas más, el resto de la cocina se enteró del aumento y el segundo local sigue sin poder abrir.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Hacerlo jefe de producción y documentar la receta",
        detail: "Le das un cargo, un bono por formar a dos horneros y registras con él pesos, tiempos y temperaturas.",
        effects: { cashPct: -2, fixedCostPct: 2, quality: 4, morale: 4, productivityPct: 3, rounds: 3 },
        outcome:
          "Don Wilfredo pasó de guardar un secreto a enseñar un oficio, con mejor sueldo y reconocimiento. La receta quedó escrita y probada por otras manos, y el segundo local ya es posible.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Dejarlo ir y contratar a otro hornero",
        detail: "No entras en una subasta de sueldos. Buscas un reemplazo con experiencia en otra pollería.",
        effects: { quality: -6, demandPct: -5, satisfaction: -4, rounds: 2 },
        outcome:
          "El nuevo hornero trajo su propia sazón y los clientes antiguos notaron el cambio. Tu sabor característico ahora se vende a tres cuadras, en el local de la competencia.",
        verdict: "mala",
      },
    ],
    concept: "Estandarización y gestión del conocimiento",
    lesson:
      "Un negocio que depende de la memoria de una persona no puede crecer ni está seguro. Documentar recetas y procesos convierte el saber individual en un activo de la empresa.",
  },
  {
    id: "ind-restaurante-exclusividad-aplicativo",
    title: "El aplicativo te ofrece exclusividad",
    category: "estrategia",
    industries: ["restaurante"],
    market: "B2C",
    tier: 3,
    situation:
      "Casi la mitad de tus ventas ya llega por aplicativos de delivery. El más grande te propone un trato: una comisión menor y mejor ubicación en la pantalla si trabajas solo con ellos y dejas a los demás. Los clientes que piden por aplicativo no son tuyos, porque no conoces su teléfono ni su dirección, y la plataforma decide a quién le muestra tu local.",
    options: [
      {
        id: "a",
        label: "Firmar la exclusividad",
        detail: "Aceptas la comisión reducida y te retiras de los otros aplicativos.",
        effects: { costPct: -3, demandPct: 3, rounds: 2 },
        risk: {
          prob: 0.45,
          effects: { costPct: 6, demandPct: -5, rounds: 2 },
          text: "Al renovar el contrato el aplicativo subió la comisión. Ya no tenías otro canal desde donde negociar.",
        },
        outcome:
          "El primer semestre mejoró tu margen por pedido. Pusiste la mitad de tu negocio en manos de un solo socio que puede cambiar las condiciones cuando quiera.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Seguir en varios aplicativos con comisión normal",
        detail: "Rechazas el trato, mantienes presencia en todas las plataformas y pagas la tarifa estándar.",
        effects: { costPct: 1, rounds: 2 },
        outcome:
          "Pagas más comisión que con la exclusividad, y a cambio ninguna plataforma tiene el poder de apagarte. La dependencia del delivery de terceros sigue igual de alta.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Rechazar el trato y construir un canal directo",
        detail: "Sigues en los aplicativos y además inviertes en pedidos por WhatsApp y web, con beneficios para quien pide directo.",
        effects: { cashPct: -3, fixedCostPct: 2, costPct: -2, satisfaction: 3, brand: 2, rounds: 4 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -2 },
          text: "Tus repartidores propios no dieron abasto los fines de semana y varios pedidos directos llegaron fríos.",
        },
        outcome:
          "Tomó meses, pero una parte de tus clientes frecuentes pasó a pedirte directo. Ahora tienes sus datos, puedes avisarles de promociones y cada uno de esos pedidos no paga comisión.",
        verdict: "optima",
      },
    ],
    concept: "Dependencia de un canal y poder de negociación",
    lesson:
      "Quien controla la relación con el cliente controla el negocio. Un canal ajeno sirve para captar, pero conviene desarrollar uno propio para no negociar siempre desde la debilidad.",
  },
  {
    id: "ind-restaurante-precios-por-horario",
    title: "La carta digital permite cambiar precios por hora",
    category: "tecnologia",
    industries: ["restaurante"],
    market: "B2C",
    tier: 3,
    situation:
      "Reemplazaste la carta impresa por una digital con código QR. El proveedor del sistema te muestra que puedes cambiar precios en segundos. Los sábados por la noche tienes cola en la puerta, y de lunes a jueves, entre las tres y las seis de la tarde, el salón está vacío con todo el personal presente. Te propone cobrar distinto según la hora.",
    options: [
      {
        id: "a",
        label: "Subir precios en hora punta sin anunciarlo",
        detail: "Los sábados por la noche la carta muestra precios más altos y el resto de la semana vuelve a lo normal.",
        effects: { cashPct: 3, satisfaction: -6, brand: -4 },
        risk: {
          prob: 0.4,
          effects: { reputation: -6, cashPct: -3, demandPct: -5 },
          text: "Un cliente comparó capturas de pantalla de la carta de dos días distintos, lo publicó y presentó un reclamo por falta de información clara sobre los precios.",
        },
        outcome:
          "Ganaste más por mesa los sábados. Tus clientes frecuentes descubrieron que el mismo plato cuesta distinto según el día, y se sintieron castigados por ir cuando más les gusta.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Crear descuentos publicados para las horas vacías",
        detail: "Mantienes el precio normal y anuncias una promoción de tarde, de lunes a jueves, visible en carta y redes.",
        effects: { demandPct: 5, cashPct: 2, productivityPct: 3, satisfaction: 2, rounds: 3 },
        outcome:
          "Llenaste mesas en horas en que el personal y el horno ya estaban pagados. Como el precio de referencia no subió, nadie sintió un abuso, y algunos clientes movieron su visita al horario bajo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Mantener un solo precio todo el tiempo",
        detail: "Usas la carta digital solo para actualizar platos y fotos, sin diferenciar por horario.",
        effects: { satisfaction: 1 },
        outcome:
          "Tus clientes saben siempre qué esperar y tu operación es simple. Las tardes siguieron vacías y la cola del sábado siguió perdiendo familias que no quisieron esperar.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Imprimir cartas para quien no usa el QR",
        detail: "Dejas la idea de los precios y atiendes la queja de los clientes mayores que no pueden leer la carta en el celular.",
        effects: { cashPct: -1, satisfaction: 4 },
        outcome:
          "Las familias con abuelos agradecieron la carta física. Resolviste un problema real de servicio, aunque la capacidad ociosa de las tardes quedó pendiente.",
        verdict: "buena",
      },
    ],
    concept: "Precios diferenciados y capacidad ociosa",
    lesson:
      "Cobrar distinto según la demanda puede aumentar ingresos, pero el cliente acepta mejor un descuento publicado en hora baja que un recargo escondido en hora alta.",
  },

  // ===== CAFETERÍA =====
  {
    id: "ind-cafeteria-laptops-en-las-mesas",
    title: "Cuatro horas de wifi con un solo americano",
    category: "clientes",
    industries: ["cafeteria"],
    market: "B2C",
    tier: 1,
    situation:
      "Tu cafetería en Miraflores se llenó de gente que trabaja con laptop. Ocupan una mesa de cuatro durante toda la tarde con un café americano, y a la hora de mayor movimiento quienes vienen a consumir no encuentran sitio y se van. Al mismo tiempo, ese público le da vida al local y muchos son clientes de todos los días.",
    options: [
      {
        id: "a",
        label: "Quitar los enchufes y apagar el wifi",
        detail: "Eliminas de raíz el incentivo para quedarse a trabajar.",
        effects: { demandPct: -5, satisfaction: -5, brand: -3, rounds: 2 },
        outcome:
          "Las mesas rotaron más rápido, pero perdiste a clientes diarios que también compraban almuerzo y postres. El local se ve medio vacío en las mañanas, que antes eran tu hora más estable.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Dar clave de wifi por consumo, con tiempo limitado",
        detail: "Cada compra entrega un código de wifi válido por dos horas, que se renueva con un nuevo pedido.",
        effects: { cashPct: 2, demandPct: 2, satisfaction: -1, rounds: 3 },
        outcome:
          "La regla fue clara y pareja para todos. Quien se queda toda la tarde ahora pide dos o tres veces, y el consumo por mesa subió sin necesidad de echar a nadie.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Separar una barra de trabajo y liberar las mesas",
        detail: "Instalas una barra con enchufes para quienes vienen solos con laptop y reservas las mesas para grupos.",
        effects: { cashPct: -2, demandPct: 3, satisfaction: 3, rounds: 3 },
        outcome:
          "Cada persona con laptop pasó a ocupar un asiento en lugar de una mesa completa. Invertiste en mobiliario y resolviste el problema de espacio, aunque no el del consumo bajo.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "No hacer nada",
        detail: "Aceptas que ese es el público del local y no impones reglas.",
        effects: { demandPct: -2, rounds: 2 },
        outcome:
          "El ambiente se mantuvo agradable. Los fines de semana siguieron llegando grupos que dan media vuelta al ver todas las mesas ocupadas por una sola persona.",
        verdict: "riesgosa",
      },
    ],
    concept: "Rotación de mesas y consumo promedio",
    lesson:
      "En un local con asientos limitados, el ingreso depende de cuánto consume cada cliente y de cuántas veces se ocupa cada asiento. Las reglas claras ordenan el uso del espacio sin maltratar a nadie.",
  },
  {
    id: "ind-cafeteria-cliente-tradicional",
    title: "El cliente quiere su café bien cargado y con azúcar",
    category: "marketing",
    industries: ["cafeteria"],
    market: "B2C",
    tier: 1,
    situation:
      "Abriste una cafetería de especialidad en Trujillo con granos de altura y métodos filtrados. Muchos clientes miran la carta, preguntan por qué un café cuesta el triple que en la panadería y piden uno bien cargado con tres cucharadas de azúcar. Tu barista se ofende. Tus ventas están por debajo de lo que planeaste.",
    options: [
      {
        id: "a",
        label: "Cambiar a un café más barato y bajar precios",
        detail: "Te adaptas a lo que pide la mayoría y compites con las cafeterías tradicionales de la zona.",
        effects: { costPct: -5, demandPct: 5, quality: -7, brand: -5, rounds: 3 },
        outcome:
          "Vendiste más tazas a menor precio. Ahora eres una cafetería más, con alquiler y equipos de cafetería de especialidad. Los pocos clientes que venían por el grano dejaron de venir.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Organizar catas y explicar el origen en cada taza",
        detail: "Haces degustaciones gratuitas los sábados y entrenas al equipo para contar de dónde viene el café sin dar lecciones.",
        effects: { cashPct: -2, demandPct: 4, brand: 5, satisfaction: 3, rounds: 3 },
        outcome:
          "Las catas convirtieron a curiosos en clientes que ahora piden el café por su origen. El crecimiento fue lento, porque cambiar un hábito toma tiempo, pero cada cliente ganado paga el precio completo.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Ofrecer una carta de entrada y una de especialidad",
        detail: "Sumas bebidas conocidas, con leche y dulces, preparadas con tu mismo grano, y mantienes los filtrados para quien quiera explorar.",
        effects: { demandPct: 7, brand: 2, satisfaction: 4, rounds: 3 },
        outcome:
          "El capuchino y el café con leche trajeron volumen sin bajar la calidad del grano. Varios de esos clientes terminaron probando un filtrado por curiosidad. Nadie se sintió juzgado por pedir azúcar.",
        verdict: "optima",
      },
    ],
    concept: "Segmentación y propuesta de valor",
    lesson:
      "Un producto superior no se vende solo si el cliente no percibe la diferencia. Se puede educar al mercado y también ofrecer una puerta de entrada que respete sus gustos sin renunciar a lo que te distingue.",
  },
  {
    id: "ind-cafeteria-certificacion-barista",
    title: "Pagar la certificación del barista",
    category: "laboral",
    industries: ["cafeteria"],
    market: "B2C",
    tier: 1,
    situation:
      "Tu mejor barista quiere llevar un curso de certificación internacional que cuesta varios sueldos. Promete mejorar la calibración del molino, el arte en la leche y entrenar al resto. Tu socio se opone: los dos últimos baristas que capacitaste se fueron a la competencia a los pocos meses con todo lo aprendido.",
    options: [
      {
        id: "a",
        label: "No pagar cursos a nadie",
        detail: "Quien quiera capacitarse lo hace por su cuenta. La empresa no financia lo que otro va a aprovechar.",
        effects: { morale: -6, quality: -2, productivityPct: -2, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { quality: -4, satisfaction: -3, cashPct: -1 },
          text: "Tu barista renunció para irse a una cafetería que sí invierte en su gente y tuviste que entrenar a un reemplazo desde cero.",
        },
        outcome:
          "Ahorraste el curso. Tu equipo entendió que aquí no se crece, y en un oficio donde la mano del barista define la taza, eso se nota en el producto.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Pagar el curso con un pacto de permanencia",
        detail: "La empresa financia la certificación y el barista se compromete por escrito a quedarse un tiempo o devolver la parte proporcional.",
        effects: { cashPct: -2, quality: 5, morale: 5, productivityPct: 3, rounds: 3 },
        outcome:
          "El barista aceptó sin problema, porque el acuerdo le pareció justo. Volvió con técnicas nuevas, entrenó a sus compañeros y tu inversión quedó protegida por un plazo razonable.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Pagar el curso sin condiciones",
        detail: "Confías en que el buen trato es suficiente para que se quede.",
        effects: { cashPct: -2, quality: 5, morale: 6, rounds: 3 },
        risk: {
          prob: 0.35,
          effects: { quality: -5, morale: -3 },
          text: "Con el certificado en la mano recibió una oferta mejor pagada de un hotel y se fue al mes siguiente.",
        },
        outcome:
          "El gesto fue muy valorado y la calidad de la barra mejoró. No dejaste nada por escrito, así que la inversión depende de que ninguna oferta externa lo tiente.",
        verdict: "riesgosa",
      },
    ],
    concept: "Inversión en capacitación y retención",
    lesson:
      "Capacitar tiene el riesgo de que la persona se vaya. No capacitar tiene el riesgo de que se quede sin mejorar. Un acuerdo de permanencia equilibra el interés de ambas partes.",
  },
  {
    id: "ind-cafeteria-compra-directa-villa-rica",
    title: "Comprar directo a una cooperativa de Villa Rica",
    category: "proveedores",
    industries: ["cafeteria"],
    market: "B2C",
    tier: 2,
    situation:
      "Hoy compras café tostado a un tostador de Lima. Una cooperativa de Villa Rica te ofrece venderte café verde de buen puntaje en taza directamente, con un precio mejor para ti y para el productor. Tendrías que comprar por sacos, tostar por tu cuenta y asumir que una cosecha puede salir distinta a la anterior.",
    options: [
      {
        id: "a",
        label: "Contrato anual directo y tostado propio",
        detail: "Compras la tostadora, aprendes a tostar y aseguras un volumen anual con la cooperativa.",
        effects: { cashPct: -8, costPct: -7, quality: 4, brand: 5, rounds: 4 },
        risk: {
          prob: 0.3,
          effects: { quality: -5, cashPct: -2, satisfaction: -3 },
          text: "Tus primeros tuestes salieron disparejos y tuviste que descartar varios lotes hasta dominar la curva.",
        },
        outcome:
          "Pasaste de comprador a tostador. La inversión y el aprendizaje fueron fuertes, pero ahora controlas el sabor, conoces al productor por su nombre y el margen del tostado se queda en tu empresa.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Comprar directo y pagar el servicio de tostado",
        detail: "Negocias el café verde con la cooperativa y contratas a tu tostador actual solo para que lo tueste.",
        effects: { cashPct: -3, costPct: -4, quality: 3, brand: 4, rounds: 3 },
        outcome:
          "Conseguiste origen propio y una historia real que contar en tu carta, sin comprar máquinas ni aprender un oficio nuevo. Tu tostador aceptó el trato porque conservó parte del negocio.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Seguir comprando al tostador de Lima",
        detail: "Pagas más por kilo, pero pides solo lo que necesitas cada semana y siempre llega igual.",
        effects: { costPct: 1, rounds: 2 },
        outcome:
          "Tu operación siguió simple y tu caja libre. Vendes el mismo café que otras cinco cafeterías de la ciudad, así que tu diferencia depende solo del servicio y del local.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Comprar café comercial y venderlo como de origen",
        detail: "Usas un grano barato y mantienes en la carta el nombre de Villa Rica y la historia del productor.",
        effects: { costPct: -8, quality: -8, rounds: 2 },
        risk: {
          prob: 0.45,
          effects: { reputation: -10, brand: -8, demandPct: -8, cashPct: -4 },
          text: "Un cliente conocedor lo notó en la taza, pidió ver la trazabilidad del lote y denunció el engaño ante Indecopi y en redes.",
        },
        outcome:
          "El margen subió de inmediato. El público de especialidad paga justamente por el origen y tiene el paladar para reconocer cuando no está.",
        verdict: "mala",
      },
    ],
    concept: "Integración hacia atrás y comercio directo",
    lesson:
      "Acercarse al origen mejora margen y diferenciación, pero exige capital y capacidades nuevas. Se puede avanzar por etapas, integrando primero la compra y después la transformación.",
  },
  {
    id: "ind-cafeteria-suscripcion-de-cafe",
    title: "Café en grano por suscripción mensual",
    category: "estrategia",
    industries: ["cafeteria"],
    market: "B2C",
    tier: 2,
    situation:
      "Tus ventas dependen de cuánta gente pasa por la puerta, y en semanas de lluvia o feriados largos caen sin aviso. Varios clientes te compran bolsas de café para preparar en casa. Tu encargada propone una suscripción: el cliente paga cada mes y recibe en su domicilio una bolsa de café recién tostado.",
    options: [
      {
        id: "a",
        label: "Lanzar la suscripción con cobro automático mensual",
        detail: "El cliente registra su tarjeta, elige molienda y recibe su bolsa cada mes. Puede pausar cuando quiera.",
        effects: { cashPct: -2, demandPct: 5, brand: 3, satisfaction: 3, rounds: 4 },
        risk: {
          prob: 0.25,
          effects: { satisfaction: -4, cashPct: -1 },
          text: "Los primeros envíos a provincias llegaron tarde y varios suscriptores cancelaron en el segundo mes.",
        },
        outcome:
          "Cada suscriptor es una venta que ya conoces antes de que empiece el mes. Ese ingreso estable te permite planificar compras de café y no depender solo del clima y del tráfico de la calle.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Vender un paquete anual pagado por adelantado",
        detail: "Ofreces doce bolsas con descuento fuerte a cambio de cobrar todo el año hoy.",
        effects: { cashPct: 5, costPct: 2, rounds: 4 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -4, satisfaction: -4 },
          text: "El precio del café subió a mitad de año y tuviste que entregar bolsas por debajo de tu costo para cumplir lo ya cobrado.",
        },
        outcome:
          "Entró caja de golpe y la usaste en el local. Ese dinero no era utilidad, era una deuda de doce entregas que debes cumplir a precio fijo pase lo que pase con tus costos.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Seguir vendiendo bolsas solo en el local",
        detail: "Mantienes la venta de grano como un complemento para quien visita la cafetería.",
        effects: {},
        outcome:
          "No sumaste complejidad ni envíos. Tus ingresos siguen subiendo y bajando con el tráfico de la puerta, y otra cafetería de la ciudad lanzó su propio club de café.",
        verdict: "buena",
      },
    ],
    concept: "Ingresos recurrentes",
    lesson:
      "Un ingreso recurrente vale más que una venta ocasional porque se puede prever. Cobrar por adelantado ayuda a la caja, pero crea una obligación que debe cumplirse con los costos del futuro.",
  },
  {
    id: "ind-cafeteria-precio-internacional",
    title: "El café sube en la bolsa de Nueva York",
    category: "finanzas",
    industries: ["cafeteria"],
    market: "B2C",
    tier: 3,
    situation:
      "El precio internacional del café arábica viene subiendo por la sequía en Brasil, y los productores de Chanchamayo reciben ofertas de exportadores que pagan cada semana más. Tu proveedor te avisa que ya no puede sostener el precio. Te ofrece dos caminos: un contrato a precio fijo por un año, más alto que el actual, o seguir comprando al precio del momento.",
    options: [
      {
        id: "a",
        label: "Firmar precio fijo por un año",
        detail: "Aceptas pagar más que hoy a cambio de saber exactamente cuánto te costará el café los próximos doce meses.",
        effects: { costPct: 5, rounds: 4 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -3 },
          text: "El precio internacional bajó a los pocos meses y quedaste pagando más caro que tus competidores hasta el fin del contrato.",
        },
        outcome:
          "Pudiste fijar tu carta para todo el año sin sorpresas. La certeza tiene un precio, y lo pagaste con gusto porque tu negocio es servir café, no adivinar el mercado.",
        verdict: "buena",
      },
      {
        id: "b",
        label: "Comprar al precio del momento",
        detail: "No te amarras a nada y apuestas a que el alza es pasajera.",
        effects: { costPct: 3, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { costPct: 9, rounds: 2 },
          text: "El precio siguió subiendo y tu proveedor priorizó a los clientes con contrato. Pagaste mucho más y hubo semanas sin tu café principal.",
        },
        outcome:
          "Mantuviste flexibilidad total. Tu costo quedó atado a lo que pase con el clima en Brasil y con la bolsa, dos cosas que no controlas.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Fijar la mitad del volumen y dejar libre el resto",
        detail: "Aseguras con contrato el café de tu consumo base y compras el resto según cómo se mueva el precio.",
        effects: { costPct: 4, rounds: 4 },
        risk: {
          prob: 0.3,
          effects: { costPct: 3, rounds: 2 },
          text: "El precio subió más y la mitad no cubierta de tus compras se encareció, aunque el golpe fue la mitad que el de tus competidores.",
        },
        outcome:
          "No acertaste el mejor precio ni sufriste el peor. Cubrir una parte te dio abastecimiento seguro para lo esencial y margen de maniobra para lo demás.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Comprar ahora café verde para seis meses",
        detail: "Usas tu caja para almacenar sacos antes de que el precio suba más.",
        effects: { cashPct: -7, costPct: 1, rounds: 2 },
        risk: {
          prob: 0.35,
          effects: { quality: -5, cashPct: -2 },
          text: "La humedad de tu almacén afectó los sacos y el café perdió aroma antes de que pudieras usarlo todo.",
        },
        outcome:
          "Congelaste tu costo con inventario en vez de contrato. Inmovilizaste mucha caja y asumiste el riesgo de conservar un producto que es sensible a la humedad y al tiempo.",
        verdict: "riesgosa",
      },
    ],
    concept: "Cobertura frente al precio de materias primas",
    lesson:
      "Cubrirse no busca ganarle al mercado sino reducir la incertidumbre. Una cobertura parcial limita el daño si el precio sube y el arrepentimiento si baja.",
  },

  // ===== MODA =====
  {
    id: "ind-moda-saldo-de-invierno",
    title: "Casacas de invierno sin vender en setiembre",
    category: "finanzas",
    industries: ["moda"],
    market: "B2C",
    tier: 1,
    situation:
      "El invierno fue corto y te quedaste con cientos de casacas en el almacén de tu galería en Gamarra. Necesitas ese espacio y esa plata para producir la colección de verano. Tu contador dice que no puedes venderlas por debajo de lo que costó hacerlas. Un saldista te ofrece llevarse todo el lote hoy, pagando muy poco.",
    options: [
      {
        id: "a",
        label: "Guardarlas para el próximo invierno",
        detail: "No aceptas perder. Las almacenas un año y las vendes a precio completo cuando vuelva el frío.",
        effects: { cashPct: -4, fixedCostPct: 2, rounds: 3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -3, brand: -2 },
          text: "Al año siguiente cambiaron los colores y los cortes de moda. Las casacas se vieron pasadas y terminaste rematándolas igual.",
        },
        outcome:
          "No registraste ninguna pérdida en el papel. Tu dinero pasó un año dormido en cajas mientras te faltaba capital para la campaña de verano.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Liquidar ahora en tu tienda, con descuento escalonado",
        detail: "Haces un remate de fin de temporada con rebajas que aumentan cada semana hasta agotar.",
        effects: { cashPct: 4, brand: -1, demandPct: 3 },
        outcome:
          "Vendiste casi todo, una parte por debajo del costo. Recuperaste efectivo justo a tiempo para comprar tela de verano, y los clientes del remate conocieron tu tienda.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Vender todo el lote al saldista",
        detail: "Aceptas un precio muy bajo a cambio de liberar almacén y cobrar hoy mismo.",
        effects: { cashPct: 2, brand: -2 },
        risk: {
          prob: 0.3,
          effects: { brand: -3, demandPct: -2 },
          text: "Tus casacas aparecieron con tu etiqueta en un puesto de feria a la tercera parte del precio, y tus clientes lo notaron.",
        },
        outcome:
          "En una tarde el problema desapareció. Recuperaste menos que con un remate propio, y perdiste el control sobre dónde y a cuánto se vende tu marca.",
        verdict: "buena",
      },
    ],
    concept: "Costo hundido y liquidación de inventario",
    lesson:
      "Lo que costó producir una prenda ya está gastado y no debe decidir su precio de salida. Lo que importa es cuánto vale hoy ese dinero puesto en la siguiente colección.",
  },
  {
    id: "ind-moda-ambulantes-y-copias",
    title: "Tu modelo copiado en la vereda",
    category: "entorno",
    industries: ["moda"],
    market: "B2C",
    tier: 1,
    situation:
      "A dos semanas de lanzar tu nuevo modelo de polo estampado, los ambulantes de la cuadra ya venden una copia en tela más delgada a mitad de precio, justo frente a la puerta de tu galería. No pagan alquiler ni emiten comprobantes. Tus vendedoras dicen que los clientes regatean usando el precio de la vereda.",
    options: [
      {
        id: "a",
        label: "Bajar tu precio hasta igualar la copia",
        detail: "Compites de frente para no perder ninguna venta.",
        effects: { demandPct: 4, cashPct: -4, brand: -3, rounds: 2 },
        outcome:
          "Vendiste más unidades casi sin ganar. Con alquiler, planilla e impuestos nunca tendrás el costo de quien trabaja en la vereda, así que competir en su terreno fue pelear con desventaja.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Lanzar diseños nuevos cada dos semanas",
        detail: "Produces tirajes cortos y renuevas la vitrina antes de que la copia llegue a la calle.",
        effects: { cashPct: -2, costPct: 3, demandPct: 6, brand: 4, rounds: 3 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -2 },
          text: "Dos de los diseños nuevos no gustaron y quedaron como saldo.",
        },
        outcome:
          "Cuando la copia aparecía, tú ya tenías otro modelo en vitrina. Producir en lotes pequeños cuesta más por prenda, pero redujo el stock parado y te volvió la tienda donde sale lo nuevo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Actuar con la galería ante la municipalidad",
        detail: "Te unes a otros comerciantes formales para pedir fiscalización y registras tus estampados como diseños propios.",
        effects: { cashPct: -1, reputation: 3 },
        risk: {
          prob: 0.5,
          effects: { demandPct: -2 },
          text: "Los operativos despejaron la cuadra unos días y los ambulantes volvieron a la semana siguiente.",
        },
        outcome:
          "La gestión colectiva logró operativos y dejó tus diseños protegidos para reclamar en el futuro. La informalidad de la zona no se resuelve con una carta, así que el alivio fue parcial.",
        verdict: "buena",
      },
    ],
    concept: "Competencia informal y velocidad de respuesta",
    lesson:
      "Frente a un competidor que no paga costos formales, competir por precio es perder. La ventaja sostenible está en lo que la copia no alcanza, como la calidad, la novedad y la rapidez.",
  },
  {
    id: "ind-moda-importacion-china",
    title: "Polos chinos a mitad de tu costo",
    category: "estrategia",
    industries: ["moda"],
    market: "B2C",
    tier: 2,
    situation:
      "Un importador te ofrece contenedores de polos básicos de China a un precio menor que lo que a ti te cuesta solo la tela. Varios confeccionistas de tu galería ya cerraron sus talleres y ahora solo revenden. Tú tienes veinte operarios, máquinas propias y experiencia en algodón peruano.",
    options: [
      {
        id: "a",
        label: "Cerrar el taller y dedicarte a importar",
        detail: "Liquidas al personal, vendes las máquinas y te conviertes en comercializador.",
        effects: { cashPct: -5, costPct: -12, fixedCostPct: -8, quality: -6, morale: -10, rounds: 4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -6, demandPct: -6 },
          text: "El dólar subió y un contenedor demoró dos meses en llegar. Perdiste la campaña navideña con el dinero atrapado en el puerto.",
        },
        outcome:
          "Tus costos bajaron mucho. Ahora vendes lo mismo que cien importadores más, dependes del tipo de cambio y ya no tienes taller para reaccionar si el mercado cambia.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Diferenciarte con algodón pima y diseño propio",
        detail: "Dejas los básicos baratos y te concentras en prendas de mejor tela, corte y acabado, a mayor precio.",
        effects: { cashPct: -3, costPct: 4, demandPct: -4, quality: 6, brand: 6, rounds: 4 },
        outcome:
          "Vendes menos prendas y ganas más en cada una. Tus clientes ya no comparan tu polo con el importado, porque no es el mismo producto. Construir ese posicionamiento te tomó varias campañas.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Importar los básicos y confeccionar la moda",
        detail: "Compras afuera lo que se vende por precio y usas tu taller para los modelos de temporada y pedidos rápidos.",
        effects: { cashPct: -3, costPct: -5, demandPct: 4, morale: -2, rounds: 4 },
        outcome:
          "El básico importado te dio precio para competir y el taller te dio velocidad para sacar lo que está de moda en pocos días. Redujiste algo de personal, pero conservaste tu capacidad de producir.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Importar y coser una etiqueta de hecho en Perú",
        detail: "Traes la prenda terminada, le cambias la etiqueta y la vendes como confección nacional de algodón peruano.",
        effects: { costPct: -12, demandPct: 5, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -10, reputation: -13, brand: -7 },
          text: "Una fiscalización encontró las etiquetas originales en tu almacén. Indecopi te sancionó por engañar al consumidor sobre el origen del producto.",
        },
        outcome:
          "Vendiste precio chino con prestigio peruano durante un tiempo. El origen de una prenda se puede rastrear en los documentos de importación, y el engaño daña a toda la confección nacional.",
        verdict: "mala",
      },
    ],
    concept: "Liderazgo en costos frente a diferenciación",
    lesson:
      "Cuando aparece un rival con costos imposibles de igualar, hay que decidir en qué terreno competir. Se puede ganar por diferenciación, por velocidad o combinando fuentes de abastecimiento.",
  },
  {
    id: "ind-moda-curva-de-tallas",
    title: "Se agotan la M y la L, sobran la XS y la XL",
    category: "operaciones",
    industries: ["moda"],
    market: "B2C",
    tier: 2,
    situation:
      "Tu jefe de taller corta siempre la misma cantidad de prendas por talla, porque así rinde mejor la tela en el tendido. A mitad de campaña la M y la L ya no existen, y las clientas se van sin comprar. Al final quedan montones de XS y XL que terminan en remate. El problema se repite en cada colección.",
    options: [
      {
        id: "a",
        label: "Cortar según las ventas reales por talla",
        detail: "Revisas lo vendido en las últimas campañas y defines cuántas prendas de cada talla entran en cada corte.",
        effects: { cashPct: -1, demandPct: 6, costPct: 1, satisfaction: 4, rounds: 3 },
        outcome:
          "El tendido aprovecha un poco menos la tela, pero produces lo que la gente compra. Bajaron las ventas perdidas por falta de talla y el saldo de fin de campaña se redujo a menos de la mitad.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Seguir con cantidades iguales por talla",
        detail: "Priorizas el rendimiento de la tela y la simplicidad del corte.",
        effects: { demandPct: -4, cashPct: -2, rounds: 2 },
        outcome:
          "El taller siguió trabajando cómodo. Ahorraste centímetros de tela y perdiste ventas completas en las tallas más pedidas, además del dinero que se queda en prendas que nadie compra.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Producir poco y reponer por talla durante la campaña",
        detail: "Haces un primer lote pequeño y vuelves a cortar las tallas que se agotan, con tela reservada.",
        effects: { costPct: 3, demandPct: 5, satisfaction: 3, rounds: 3 },
        risk: {
          prob: 0.3,
          effects: { demandPct: -3 },
          text: "La reposición tardó más de lo previsto y hubo días sin las tallas principales en plena semana de mayor venta.",
        },
        outcome:
          "Dejaste que el mercado te dijera qué reponer. Los cortes pequeños salen más caros y exigen un taller ágil, pero casi no generaste saldo.",
        verdict: "buena",
      },
    ],
    concept: "Pronóstico de demanda por variante",
    lesson:
      "La eficiencia del taller no sirve si produce lo que no se vende. El plan de producción debe partir de los datos de venta por talla y color, no de la comodidad del proceso.",
  },
  {
    id: "ind-moda-venta-en-vivo-tiktok",
    title: "Vender en vivo por TikTok",
    category: "marketing",
    industries: ["moda"],
    market: "B2C",
    tier: 2,
    situation:
      "Una tienda vecina vende cientos de prendas cada noche con transmisiones en vivo por TikTok. Una creadora de contenido con muchos seguidores te ofrece una transmisión, con pago fijo alto más comisión por venta. Tus vendedoras nunca han hablado frente a una cámara y tus clientes de provincia te piden cada vez más envíos.",
    options: [
      {
        id: "a",
        label: "Contratar a la creadora para un gran en vivo",
        detail: "Pagas el fijo y la comisión para llegar a su audiencia en una sola noche.",
        effects: { cashPct: -4, demandPct: 8, brand: 3 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -3, satisfaction: -4 },
          text: "Muchos compradores eran seguidores de ella, no clientes tuyos. Hubo pedidos sin pagar, devoluciones por talla y casi nadie volvió a comprar.",
        },
        outcome:
          "La noche fue un pico de ventas y de caos en el despacho. Después de pagar honorarios, comisión y envíos, la ganancia por prenda fue mínima y la audiencia siguió siendo de ella.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Transmitir tú mismo tres veces por semana",
        detail: "Entrenas a dos vendedoras, montas luces en la tienda y construyes audiencia propia de a pocos.",
        effects: { cashPct: -1, demandPct: 6, brand: 4, morale: 2, rounds: 3 },
        outcome:
          "Las primeras transmisiones tuvieron veinte espectadores. A los dos meses ya tenías una comunidad que pregunta por tallas, separa prendas con Yape y espera tus envíos a Juliaca, Huánuco y Pucallpa.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Quedarte en la venta de tienda",
        detail: "Tu negocio es el mostrador y el cliente mayorista de siempre. No entras a un canal que no dominas.",
        effects: { demandPct: -3, rounds: 2 },
        outcome:
          "Te ahorraste el aprendizaje y la exposición. El tráfico de la galería sigue bajando, porque una parte de tus compradores de provincia ya compra desde su celular.",
        verdict: "riesgosa",
      },
    ],
    concept: "Costo de adquisición de clientes",
    lesson:
      "Una venta vale según lo que costó conseguirla y según si el cliente vuelve. La audiencia alquilada produce picos, la audiencia propia produce clientes recurrentes.",
  },
  {
    id: "ind-moda-talleres-de-servicio",
    title: "El pedido grande y los talleres sin planilla",
    category: "etica",
    industries: ["moda"],
    market: "B2C",
    tier: 3,
    situation:
      "Una cadena de tiendas por departamento te encarga una producción que triplica tu capacidad, con entrega en seis semanas. Su contrato exige que toda la cadena de confección cumpla las normas laborales y anuncia auditorías. La única forma de llegar a tiempo es repartir el trabajo entre talleres de servicio de San Juan de Lurigancho, que pagan por prenda y no tienen a nadie en planilla.",
    options: [
      {
        id: "a",
        label: "Subcontratar a los talleres y no declararlo",
        detail: "Entregas el pedido como si todo se hubiera cosido en tu taller.",
        effects: { cashPct: 8, quality: -3 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -10, reputation: -12, demandPct: -8, rounds: 2 },
          text: "La auditoría de la cadena visitó uno de los talleres. Te aplicaron la penalidad del contrato, cancelaron los pedidos siguientes y SUNAFIL inició una inspección.",
        },
        outcome:
          "Cumpliste el plazo con un margen excelente. Firmaste una declaración que no era cierta y quedaste como responsable de las condiciones de trabajadores que ni siquiera conoces.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Negociar entregas parciales y ampliar tu taller",
        detail: "Propones entregar en tres fechas, contratas operarios en planilla y alquilas máquinas por la campaña.",
        effects: { cashPct: 3, fixedCostPct: 4, morale: 3, reputation: 4, rounds: 2 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -3 },
          text: "La cadena aceptó las entregas parciales, pero redujo el pedido y asignó el resto a otro proveedor.",
        },
        outcome:
          "Ganaste menos que con el pedido completo y cumpliste lo que firmaste. Pasaste la auditoría y quedaste como proveedor aprobado para las siguientes temporadas.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Formalizar a dos talleres aliados y declararlos",
        detail: "Ayudas a dos talleres de confianza a poner a su gente en planilla, compartes ese costo y los presentas a la cadena.",
        effects: { cashPct: 2, costPct: 4, reputation: 5, quality: 2, rounds: 3 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -2, quality: -2 },
          text: "Uno de los talleres no logró ordenar sus papeles a tiempo y tuviste que absorber su parte del pedido con horas extra.",
        },
        outcome:
          "Tu margen fue menor, porque la formalidad cuesta. A cambio construiste una red de producción que puedes mostrar a cualquier cliente grande, algo que pocos confeccionistas tienen.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Rechazar el pedido",
        detail: "Reconoces que hoy no tienes cómo cumplirlo bien y prefieres no comprometerte.",
        effects: { brand: -1 },
        outcome:
          "No arriesgaste penalidades ni tu nombre. La cadena valoró la franqueza, pero le dio el pedido a otro confeccionista y no sabes cuándo volverá a llamarte.",
        verdict: "buena",
      },
    ],
    concept: "Responsabilidad en la cadena de suministro",
    lesson:
      "Tercerizar la producción no terceriza la responsabilidad. Los clientes grandes exigen cumplimiento en toda la cadena, y eso convierte la formalidad de tus proveedores en parte de tu producto.",
  },

  // ===== MINIMARKET =====
  {
    id: "ind-minimarket-cuaderno-de-fiado",
    title: "El cuaderno de fiado ya tiene tres tomos",
    category: "finanzas",
    industries: ["minimarket"],
    market: "B2C",
    tier: 1,
    situation:
      "Tu bodega en Villa El Salvador fía desde siempre. Los vecinos pagan a fin de mes, cuando cobran, y por eso te prefieren a ti. Al sumar el cuaderno descubres que lo que te deben equivale a varias semanas de compras al mayorista, y algunas deudas tienen más de seis meses. Tu proveedor de abarrotes, en cambio, cobra al contado.",
    options: [
      {
        id: "a",
        label: "Cortar el fiado para todos desde hoy",
        detail: "Pones un cartel que dice que no se fía y cobras al contado o por Yape.",
        effects: { cashPct: 2, demandPct: -8, satisfaction: -6, rounds: 2 },
        outcome:
          "Tu caja dejó de financiar al barrio. Varios buenos pagadores se sintieron ofendidos y ahora compran en la bodega de la otra cuadra, y algunos deudores ya no tienen motivo para volver a pagarte.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Fiar con reglas: tope, plazo y solo a buenos pagadores",
        detail: "Defines un monto máximo por familia, fecha de pago fija y suspendes el crédito a quien se atrasa.",
        effects: { cashPct: 2, demandPct: -1, satisfaction: 1, rounds: 3 },
        outcome:
          "Los clientes cumplidos mantuvieron su beneficio y entendieron las reglas. Los que debían hace meses tuvieron que ponerse al día para seguir comprando. El monto por cobrar bajó a un nivel que tu caja soporta.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Seguir fiando como siempre",
        detail: "El fiado es lo que te distingue de las cadenas. No cambias nada.",
        effects: { demandPct: 2, cashPct: -3, rounds: 2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -4 },
          text: "Dos familias con deudas grandes se mudaron del barrio sin pagar y te faltó efectivo para completar el pedido al mayorista.",
        },
        outcome:
          "El barrio te quiere y tus ventas se mantienen. Una parte de esas ventas todavía no es dinero, y mientras tanto tú pagas al contado cada caja de leche que entra.",
        verdict: "riesgosa",
      },
    ],
    concept: "Política de crédito y cuentas por cobrar",
    lesson:
      "Vender al crédito es una herramienta comercial que consume caja. Necesita reglas: a quién, cuánto y por cuánto tiempo. Una venta que no se cobra es un regalo.",
  },
  {
    id: "ind-minimarket-merma-desconocida",
    title: "El inventario no cuadra y nadie sabe por qué",
    category: "operaciones",
    industries: ["minimarket"],
    market: "B2C",
    tier: 1,
    situation:
      "Hiciste tu primer inventario completo y faltan productos por un valor que te asusta: chocolates, desodorantes, latas de atún, licores. No sabes cuánto es robo de clientes, cuánto es de personal, cuánto venció y se botó sin anotar, y cuánto son errores al registrar compras. Tu cajera más antigua se molesta con solo oír la palabra inventario.",
    options: [
      {
        id: "a",
        label: "Descontar el faltante al personal",
        detail: "Divides la pérdida entre todos los trabajadores y la descuentas del sueldo.",
        effects: { cashPct: 1, morale: -10, productivityPct: -5, rounds: 2 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, reputation: -6 },
          text: "Una trabajadora denunció el descuento ante SUNAFIL, porque no había prueba de responsabilidad individual.",
        },
        outcome:
          "Recuperaste algo de dinero y castigaste a justos por pecadores. Tu mejor reponedor renunció, y sigues sin saber por dónde se pierde la mercadería.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Contar cada semana los veinte productos críticos",
        detail: "Haces inventarios rotativos de lo más robado y más caro, registras vencidos y separas funciones entre caja y almacén.",
        effects: { cashPct: -1, costPct: -3, productivityPct: 2, rounds: 4 },
        outcome:
          "A las pocas semanas ya tenías respuestas. Una parte era robo en góndola, otra eran vencidos que nadie anotaba y otra eran errores al recibir mercadería. Cada causa tuvo su propia solución.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Poner cámaras y guardar lo caro detrás del mostrador",
        detail: "Inviertes en videovigilancia y pasas licores, afeitadoras y chocolates finos a una vitrina con llave.",
        effects: { cashPct: -2, costPct: -2, demandPct: -2, rounds: 3 },
        outcome:
          "El robo de clientes bajó de inmediato. Los productos bajo llave se venden menos, porque hay que pedirlos, y las cámaras no explican los vencidos ni los errores de registro.",
        verdict: "buena",
      },
    ],
    concept: "Merma y control interno",
    lesson:
      "La merma tiene varias causas y cada una pide un remedio distinto. Antes de culpar o de gastar hay que medir, empezando por los pocos productos que concentran la pérdida.",
  },
  {
    id: "ind-minimarket-yape-y-regimen",
    title: "Todo el barrio te paga por Yape",
    category: "tributario",
    industries: ["minimarket"],
    market: "B2C",
    tier: 2,
    situation:
      "La mayoría de tus ventas ya se cobra con billeteras digitales, en tu cuenta personal. Tu negocio creció y tu contadora te advierte que tus ingresos superan el tope de la categoría del Nuevo RUS en la que estás, y que los abonos quedan registrados en el sistema financiero. Un colega bodeguero te aconseja repartir los cobros entre los celulares de tu esposa, tu hijo y tu cuñada.",
    options: [
      {
        id: "a",
        label: "Repartir los cobros entre cuentas de familiares",
        detail: "Usas varios códigos QR de parientes para que ninguna cuenta muestre montos altos.",
        effects: { cashPct: 2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -12, reputation: -10 },
          text: "SUNAT cruzó tus compras a mayoristas con tus ventas declaradas. Determinó ingresos omitidos, con multa e intereses, y tus familiares también fueron notificados.",
        },
        outcome:
          "Seguiste pagando la cuota baja un tiempo más. Tus compras con factura al mayorista delatan el tamaño real de tu negocio, y ahora involucraste a tres personas de tu familia.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Cambiar al régimen que te corresponde",
        detail: "Pasas a un régimen acorde a tus ventas, abres una cuenta del negocio y emites comprobantes electrónicos.",
        effects: { cashPct: -2, fixedCostPct: 2, reputation: 6, rounds: 3 },
        outcome:
          "Pagas más impuestos y contabilidad que antes. A cambio usas el crédito fiscal de tus compras, separas tu plata de la del negocio y calificaste para un préstamo en una caja municipal.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Volver a cobrar solo en efectivo",
        detail: "Retiras los códigos QR para que no quede registro de tus ventas.",
        effects: { demandPct: -7, satisfaction: -5, rounds: 2 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -6, reputation: -5 },
          text: "Un fedatario de SUNAT verificó que no entregabas comprobantes y dispuso el cierre temporal del local.",
        },
        outcome:
          "Muchos clientes ya no cargan efectivo y se fueron a comprar donde aceptan Yape. El problema tributario sigue igual, porque tus ventas reales no cambiaron de tamaño.",
        verdict: "mala",
      },
    ],
    concept: "Régimen tributario y trazabilidad digital",
    lesson:
      "Los pagos digitales dejan huella y el régimen tributario debe corresponder al tamaño real del negocio. Formalizarse cuesta, pero da acceso a crédito fiscal y a financiamiento.",
  },
  {
    id: "ind-minimarket-agente-corresponsal",
    title: "Ser agente bancario en tu bodega",
    category: "estrategia",
    industries: ["minimarket"],
    market: "B2C",
    tier: 2,
    situation:
      "Un banco te propone instalar un agente corresponsal en tu minimarket de Tarapoto. Los vecinos podrían pagar servicios, retirar y depositar dinero. La comisión por operación es pequeña, y tendrías que mantener bastante efectivo en caja y dedicar a una persona en horas punta. Tu cuñado dice que es regalarle trabajo al banco.",
    options: [
      {
        id: "a",
        label: "Instalar el agente con caja y horario definidos",
        detail: "Separas un punto de atención, fijas montos máximos y un horario, y capacitas a una persona.",
        effects: { cashPct: -1, demandPct: 6, fixedCostPct: 1, satisfaction: 3, rounds: 4 },
        risk: {
          prob: 0.2,
          effects: { cashPct: -4, morale: -4 },
          text: "El local sufrió un asalto un día de pago, cuando había mucho efectivo en caja.",
        },
        outcome:
          "La comisión apenas cubre el tiempo de atención. La ganancia real estuvo en la gente nueva que entra a pagar la luz y sale con pan, gaseosa y detergente.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Instalar el agente y atender todo sin límite",
        detail: "Aceptas cualquier monto a cualquier hora para ganar la mayor cantidad de comisiones.",
        effects: { demandPct: 6, productivityPct: -5, satisfaction: -2, rounds: 3 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -6, morale: -5 },
          text: "Te quedaste sin efectivo para dar vuelto y pagar proveedores, y un robo se llevó la caja del agente.",
        },
        outcome:
          "La cola del agente tapaba la entrada y tus clientes de compra rápida se iban sin comprar. El servicio que debía traer ventas terminó estorbando al negocio principal.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "No instalar el agente",
        detail: "Te concentras en vender abarrotes y evitas manejar dinero ajeno.",
        effects: {},
        outcome:
          "Tu operación siguió tranquila y sin riesgo adicional. La bodega de la esquina aceptó la propuesta y ahora recibe cada día a los vecinos que van a pagar sus recibos.",
        verdict: "buena",
      },
    ],
    concept: "Servicios complementarios y tráfico al local",
    lesson:
      "Un servicio puede valer más por los clientes que atrae que por lo que cobra. Hay que medir su efecto sobre la venta total y ponerle límites para que no afecte la operación principal.",
  },
  {
    id: "ind-minimarket-cadena-de-descuento",
    title: "Abren una tienda de descuento a media cuadra",
    category: "estrategia",
    industries: ["minimarket"],
    market: "B2C",
    tier: 3,
    situation:
      "Una cadena de tiendas de descuento abre un local a cincuenta metros de tu minimarket en Piura. Vende arroz, aceite, leche y detergente con marcas propias a precios que tú no consigues ni en el mayorista. A su lado abrirá una tienda de conveniencia con aire acondicionado y café para llevar. Tus ventas de abarrotes básicos ya empezaron a bajar.",
    options: [
      {
        id: "a",
        label: "Igualar sus precios en los productos básicos",
        detail: "Bajas el precio de la canasta básica hasta su nivel para que nadie cruce la calle.",
        effects: { cashPct: -6, demandPct: 3, rounds: 2 },
        outcome:
          "Retuviste clientes vendiendo sin ganar. La cadena compra por camiones para cientos de tiendas y puede sostener esos precios todo el año. Tú no.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Especializarte en lo que ellos no ofrecen",
        detail: "Refuerzas frescos del día, pan caliente, productos regionales, venta por unidad, pedidos por WhatsApp y trato por nombre.",
        effects: { cashPct: -3, demandPct: 4, costPct: 1, satisfaction: 5, brand: 4, rounds: 4 },
        outcome:
          "Perdiste la compra grande de abarrotes, que ahora se hace al frente. Ganaste la compra diaria: el pan, la verdura, el queso de Cajamarca, el sobre de champú y el encargo que llega a la puerta.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Reducir surtido y costos para resistir",
        detail: "Eliminas productos de baja rotación, reduces personal y horario, y esperas a ver cómo se acomoda el barrio.",
        effects: { fixedCostPct: -5, demandPct: -5, morale: -4, rounds: 3 },
        outcome:
          "Bajaste tus gastos y protegiste la caja. Con menos surtido y menos horas de atención, le diste al cliente menos razones para seguir entrando a tu tienda.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Ampliar horario y abrir de madrugada",
        detail: "Atiendes desde muy temprano y hasta tarde, cuando las cadenas están cerradas.",
        effects: { fixedCostPct: 3, demandPct: 3, morale: -3, rounds: 3 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -3, morale: -3 },
          text: "El turno de noche sufrió un robo y tu personal pidió no seguir atendiendo de madrugada.",
        },
        outcome:
          "Capturaste ventas de quienes salen a trabajar antes del amanecer. El horario extendido elevó tu planilla y el cansancio, y la ventaja durará hasta que la cadena amplíe su horario.",
        verdict: "buena",
      },
    ],
    concept: "Propuesta de valor de cercanía",
    lesson:
      "Un negocio pequeño no gana copiando al grande. Gana en lo que la escala no permite, como el surtido local, la flexibilidad, la conveniencia y la relación personal con el cliente.",
  },
  {
    id: "ind-minimarket-descuento-por-volumen",
    title: "El mayorista ofrece descuento por comprar tres meses",
    category: "proveedores",
    industries: ["minimarket"],
    market: "B2C",
    tier: 3,
    situation:
      "Tu distribuidor de bebidas y abarrotes te ofrece un descuento atractivo si compras de una vez lo que vendes en tres meses. Tendrías que pagar al contado, usar casi toda tu caja y llenar el almacén hasta el techo. Tu caja municipal te presta, con una tasa alta. El vendedor insiste en que la oferta vence el viernes.",
    options: [
      {
        id: "a",
        label: "Comprar los tres meses con tu caja",
        detail: "Aprovechas todo el descuento y te quedas casi sin efectivo por un tiempo.",
        effects: { cashPct: -12, costPct: -5, rounds: 3 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -4, demandPct: -3 },
          text: "Te faltó efectivo para reponer frescos y lácteos, hubo góndolas vacías y parte de la mercadería comprada se acercó a su vencimiento.",
        },
        outcome:
          "Compraste barato y te quedaste sin liquidez. El descuento se ve en la factura. El costo de tener la plata parada, el espacio ocupado y el riesgo de vencimiento no se ven en ningún papel.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Tomar el préstamo para comprar todo el lote",
        detail: "Financias la compra con la caja municipal y pagas con las ventas de los próximos meses.",
        effects: { cashPct: -3, costPct: -5, fixedCostPct: 3, rounds: 3 },
        outcome:
          "Hiciste la cuenta después de firmar. Los intereses del préstamo se comieron buena parte del descuento, y el resto lo consumieron el almacenaje y las cajas que se dañaron.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Comprar volumen solo de lo que rota rápido y no vence",
        detail: "Calculas producto por producto y tomas el descuento en los de alta rotación y larga vida, como gaseosas y detergente.",
        effects: { cashPct: -4, costPct: -3, rounds: 3 },
        outcome:
          "Comparaste el descuento con el costo de tener el dinero inmovilizado. Donde la mercadería se vende en pocas semanas, el negocio era claro. Donde tardaría meses, preferiste pagar el precio normal.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Rechazar la oferta y comprar semana a semana",
        detail: "Mantienes tu caja libre y tu almacén ordenado, pagando el precio de lista.",
        effects: { costPct: 1, rounds: 2 },
        outcome:
          "Tu liquidez quedó intacta y no corriste riesgos. Dejaste pasar un ahorro real en los productos que de todas maneras ibas a vender rápido.",
        verdict: "buena",
      },
    ],
    concept: "Descuento por volumen y costo de inventario",
    lesson:
      "Un descuento solo conviene si supera el costo de mantener el inventario: dinero inmovilizado, espacio, mermas y vencimientos. La cuenta se hace producto por producto según su rotación.",
  },

  // ===== FARMACIA =====
  {
    id: "ind-farmacia-generico-o-marca",
    title: "El laboratorio premia a quien empuja su marca",
    category: "etica",
    industries: ["farmacia"],
    market: "B2C",
    tier: 1,
    situation:
      "Un visitador médico ofrece a tu personal de mostrador un bono por cada caja vendida de su marca de atorvastatina, que cuesta varias veces más que el genérico con el mismo principio activo. Tu margen en soles también es mayor con la marca. Tus clientes son en su mayoría adultos mayores de Comas que compran el tratamiento todos los meses y confían en lo que les recomiendan.",
    options: [
      {
        id: "a",
        label: "Aceptar el bono y recomendar primero la marca",
        detail: "El personal ofrece la marca como la mejor opción y menciona el genérico solo si el cliente pregunta.",
        effects: { cashPct: 3, morale: 2, satisfaction: -4 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -7, reputation: -7, brand: -4, rounds: 2 },
          text: "Varios clientes descubrieron en otra botica que existía un genérico mucho más barato y se corrió la voz de que en tu local te venden lo más caro.",
        },
        outcome:
          "El ticket promedio subió y tu personal ganó más. Un paciente crónico compra doce veces al año, y cuando se entera de que pagó de más durante meses no vuelve.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Ofrecer siempre el genérico y las alternativas",
        detail: "El personal informa el nombre genérico, muestra las opciones con sus precios y el cliente decide.",
        effects: { cashPct: -1, satisfaction: 6, reputation: 5, demandPct: 4, rounds: 3 },
        outcome:
          "Ganas menos por cada caja y vendes más cajas. Los clientes crónicos te eligieron como su botica de confianza y traen también sus otras recetas.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rechazar bonos por producto y pagar por atención",
        detail: "Prohíbes incentivos de laboratorios al mostrador y creas un bono propio ligado a la satisfacción y a la venta total.",
        effects: { cashPct: -2, morale: -1, satisfaction: 4, reputation: 4, rounds: 3 },
        outcome:
          "Parte del personal extrañó el ingreso extra del laboratorio. La recomendación en tu mostrador dejó de tener dueño, y el bono propio alineó al equipo con lo que le conviene al cliente y a la botica.",
        verdict: "buena",
      },
    ],
    concept: "Conflicto de interés en la recomendación",
    lesson:
      "Cuando quien recomienda gana más con una opción que con otra, la confianza del cliente está en juego. En negocios de compra repetida, la confianza vale más que el margen de una venta.",
  },
  {
    id: "ind-farmacia-antibiotico-sin-receta",
    title: "Un antibiótico sin receta, por favor",
    category: "legal",
    industries: ["farmacia"],
    market: "B2C",
    tier: 1,
    situation:
      "Una madre llega a tu botica en Chiclayo y pide amoxicilina para su hijo con fiebre. No tiene receta. Dice que la vez pasada le recetaron lo mismo y que en la botica de la esquina se lo venden sin preguntar. Los antibióticos solo deben dispensarse con receta médica, y tu técnica te mira esperando una decisión.",
    options: [
      {
        id: "a",
        label: "Vender el antibiótico",
        detail: "Atiendes el pedido para no perder a la clienta ni la venta.",
        effects: { cashPct: 1, satisfaction: 1 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -7, reputation: -9 },
          text: "Una inspección de la autoridad de salud revisó tus ventas de antibióticos sin receta archivada y te impuso una multa.",
        },
        outcome:
          "La clienta se fue contenta. Vendiste un medicamento que puede no ser el indicado para esa fiebre y que, mal usado, contribuye a que los antibióticos dejen de funcionar.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "No vender y explicar el motivo",
        detail: "Le informas que necesita receta y le ofreces algo para bajar la fiebre mientras consulta a un médico.",
        effects: { demandPct: -1, reputation: 4 },
        outcome:
          "La clienta se fue molesta a la botica de la esquina. Cumpliste la norma y cuidaste al niño, aunque esa tarde perdiste la venta y quizás a la clienta.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "No vender y facilitar una consulta médica",
        detail: "Tienes un convenio con un servicio de teleconsulta de bajo costo y la ayudas a conectarse desde la botica.",
        effects: { cashPct: -1, satisfaction: 5, reputation: 5, demandPct: 3, rounds: 2 },
        outcome:
          "El médico evaluó al niño por videollamada y recetó lo que correspondía, que no era un antibiótico. La madre compró el tratamiento en tu botica y volvió la semana siguiente.",
        verdict: "optima",
      },
    ],
    concept: "Cumplimiento regulatorio en la venta",
    lesson:
      "Cumplir la norma no obliga a perder al cliente. Una buena solución atiende la necesidad real de la persona dentro de lo permitido, y eso también diferencia a tu negocio.",
  },
  {
    id: "ind-farmacia-productos-por-vencer",
    title: "Tres anaqueles que vencen en dos meses",
    category: "operaciones",
    industries: ["farmacia"],
    market: "B2C",
    tier: 1,
    situation:
      "Al revisar el almacén encuentras vitaminas, jarabes y cremas que vencen en menos de dos meses. Se quedaron al fondo porque cada pedido nuevo se acomodó adelante. Algunos laboratorios aceptan canje por vencimiento si avisas con anticipación, otros no. Tu técnico sugiere cambiar las etiquetas de fecha, como dice que hacen en otros sitios.",
    options: [
      {
        id: "a",
        label: "Alterar las fechas de vencimiento",
        detail: "Reetiquetas los productos para venderlos con calma a precio normal.",
        effects: { cashPct: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -15, reputation: -18, demandPct: -12, rounds: 3 },
          text: "Una inspección encontró productos adulterados. Hubo cierre del establecimiento, decomiso y una denuncia penal.",
        },
        outcome:
          "No perdiste mercadería. Pusiste en el mostrador medicamentos que pueden no hacer efecto o hacer daño. Eso es un delito contra la salud pública, no una falta administrativa.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Gestionar canjes y ofrecer el resto con descuento",
        detail: "Tramitas la devolución con los laboratorios que la aceptan y vendes lo demás rebajado, informando la fecha al cliente.",
        effects: { cashPct: -2, satisfaction: 2, reputation: 2 },
        outcome:
          "Recuperaste una parte con los canjes y otra con la promoción de productos de consumo inmediato. Lo que no salió se dio de baja con acta. La pérdida fue menor de lo que temías.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Canjear, rematar y ordenar por fecha de vencimiento",
        detail: "Además de resolver el lote actual, implantas la regla de que sale primero lo que vence primero, con revisión mensual.",
        effects: { cashPct: -3, costPct: -2, quality: 3, reputation: 3, productivityPct: 2, rounds: 4 },
        outcome:
          "Reordenar el almacén tomó un fin de semana completo. Desde entonces el sistema te avisa con meses de anticipación, a tiempo para pedir canje o promocionar, y casi no das de baja productos.",
        verdict: "optima",
      },
    ],
    concept: "Rotación de inventario por vencimiento",
    lesson:
      "En productos con fecha de vencimiento debe salir primero lo que vence primero. El control se hace al recibir y acomodar la mercadería, no cuando el producto ya está por vencer.",
  },
  {
    id: "ind-farmacia-cadena-al-frente",
    title: "Una cadena abre frente a tu botica",
    category: "estrategia",
    industries: ["farmacia"],
    market: "B2C",
    tier: 2,
    situation:
      "Una gran cadena de farmacias abre un local frente a tu botica en Arequipa, con precios muy bajos en los productos más conocidos, programa de puntos y atención las 24 horas. Compra directamente a los laboratorios en volúmenes que tú nunca tendrás. Un grupo de boticas independientes te invita a unirte a su asociación de compras, con cuota mensual y marca compartida.",
    options: [
      {
        id: "a",
        label: "Igualar sus precios en los productos más vendidos",
        detail: "Bajas tus precios de pañales, analgésicos y vitaminas conocidas al nivel de la cadena.",
        effects: { cashPct: -5, demandPct: 2, rounds: 2 },
        outcome:
          "Mantuviste el movimiento en el mostrador a costa de tu margen. La cadena usa esos productos como gancho y gana en el resto de su surtido, algo que tu botica no puede copiar.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Especializarte en pacientes crónicos del barrio",
        detail: "Ofreces control de presión y glucosa, recordatorio de tratamiento por WhatsApp, reparto a domicilio y pedidos especiales.",
        effects: { cashPct: -3, demandPct: 5, satisfaction: 6, brand: 4, rounds: 4 },
        outcome:
          "Dejaste de pelear por el cliente que busca la oferta del día. Te quedaste con quien necesita a alguien que conozca su tratamiento, le avise cuando se le acaba y se lo lleve a casa.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Unirte a la asociación de boticas",
        detail: "Pagas la cuota, adoptas la marca común y compras en conjunto para mejorar precios.",
        effects: { fixedCostPct: 2, costPct: -5, brand: 2, rounds: 4 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -2, satisfaction: -2 },
          text: "La asociación impuso un surtido mínimo que no rota en tu zona y tuviste productos parados.",
        },
        outcome:
          "Tu costo de compra mejoró y dejaste de negociar solo. Cediste parte de tu independencia, porque ahora algunas decisiones de surtido y de imagen se toman en grupo.",
        verdict: "buena",
      },
    ],
    concept: "Especialización en un nicho",
    lesson:
      "Frente a un competidor con economías de escala, el pequeño no gana en precio. Gana eligiendo un segmento al que puede servir mejor que nadie, o sumando volumen con otros pequeños.",
  },
  {
    id: "ind-farmacia-director-tecnico",
    title: "El químico farmacéutico que solo firma",
    category: "legal",
    industries: ["farmacia"],
    market: "B2C",
    tier: 2,
    situation:
      "Toda botica necesita un químico farmacéutico como director técnico. El tuyo cobra una suma pequeña por figurar en los papeles y aparece una vez al mes. Atiendes doce horas diarias con técnicos. Un colega acaba de recibir una inspección en la que lo primero que pidieron fue ver al director técnico en el local.",
    options: [
      {
        id: "a",
        label: "Seguir con el químico que solo firma",
        detail: "Mantienes el arreglo actual, que es barato y común en la zona.",
        effects: { fixedCostPct: -1, rounds: 2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -9, reputation: -10, demandPct: -8, rounds: 2 },
          text: "La inspección no encontró al director técnico y dispuso el cierre temporal del establecimiento, con multa.",
        },
        outcome:
          "Ahorras un sueldo profesional cada mes. Tu autorización sanitaria depende de un requisito que no cumples en la práctica, y un solo operativo puede cerrarte.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Contratar químicos para todo el horario",
        detail: "Incorporas al director técnico y a un asistente para que siempre haya un profesional presente.",
        effects: { fixedCostPct: 6, quality: 5, reputation: 5, satisfaction: 4, rounds: 4 },
        outcome:
          "Tu planilla subió de forma notoria. El profesional ordenó el almacén, atendió consultas de pacientes y detectó errores de dispensación que antes nadie veía.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Contratar un químico y ajustar el horario",
        detail: "Reduces la atención a las horas de mayor venta, que coinciden con la jornada del profesional.",
        effects: { fixedCostPct: 3, demandPct: -3, quality: 4, reputation: 5, rounds: 4 },
        outcome:
          "Cerraste las horas de la noche, en las que vendías poco, y cumples el requisito durante todo tu horario con un solo sueldo profesional. Algunos clientes nocturnos se fueron a la cadena.",
        verdict: "optima",
      },
    ],
    concept: "Requisitos habilitantes del negocio",
    lesson:
      "Hay requisitos sin los cuales el negocio no puede operar. Su costo es parte del modelo desde el primer día, y cumplirlos solo en el papel pone en riesgo toda la inversión.",
  },
  {
    id: "ind-farmacia-cadena-de-frio",
    title: "Ocho horas sin luz con insulinas en la refrigeradora",
    category: "operaciones",
    industries: ["farmacia"],
    market: "B2C",
    tier: 3,
    situation:
      "Un corte de energía dejó tu botica de Iquitos sin electricidad toda la madrugada. En la refrigeradora había insulinas y vacunas por un valor importante. Al llegar, el termómetro marca temperatura normal, pero no tienes registro de cuánto subió durante la noche. Por fuera los productos se ven perfectos. Varios pacientes diabéticos vendrán esta semana por su insulina.",
    options: [
      {
        id: "a",
        label: "Vender los productos con normalidad",
        detail: "La refrigeradora ya está fría y nada se ve alterado. Sigues atendiendo.",
        effects: { cashPct: 1 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -8, reputation: -15, satisfaction: -10, demandPct: -8, rounds: 2 },
          text: "Dos pacientes reportaron que su insulina no les controlaba la glucosa. La investigación llegó al corte de luz y a la falta de registros de temperatura.",
        },
        outcome:
          "No perdiste inventario. Un producto que rompe la cadena de frío puede perder su efecto sin cambiar de aspecto, y el paciente lo descubre con su salud.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Dar de baja todo el contenido",
        detail: "Ante la duda retiras todo de la venta, asumes la pérdida y repones.",
        effects: { cashPct: -6, reputation: 3 },
        outcome:
          "Protegiste a tus pacientes y pagaste el costo completo. Parte de esos productos probablemente seguía en buen estado, pero sin datos no había forma de saberlo.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Poner en cuarentena y consultar a cada laboratorio",
        detail: "Separas los productos, reportas la duración del corte y pides a los laboratorios su criterio de estabilidad para cada uno.",
        effects: { cashPct: -3, reputation: 4, quality: 2 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -3 },
          text: "Sin registro de temperatura, los laboratorios no pudieron garantizar ningún producto y hubo que dar de baja todo.",
        },
        outcome:
          "Algunos laboratorios confirmaron que sus productos toleran ese tiempo fuera de rango y otros indicaron descartarlos. Compraste un registrador de temperatura con alarma para la próxima vez.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Invertir en grupo electrógeno y registrador continuo",
        detail: "Das de baja lo dudoso y además instalas respaldo de energía y monitoreo para que no vuelva a ocurrir.",
        effects: { cashPct: -9, fixedCostPct: 1, quality: 5, reputation: 5, rounds: 4 },
        outcome:
          "Fue el trimestre más caro en mucho tiempo. En una ciudad donde los cortes de luz son frecuentes, quedaste como la botica que puede garantizar la cadena de frío, y las clínicas empezaron a derivarte pacientes.",
        verdict: "buena",
      },
    ],
    concept: "Gestión de riesgos y continuidad operativa",
    lesson:
      "Un riesgo se gestiona antes de que ocurra, con respaldo y con registros. Sin datos, la única decisión segura después del evento es la más cara.",
  },

  // ===== ECOMMERCE =====
  {
    id: "ind-ecommerce-descuento-inflado",
    title: "Subir el precio antes del Cyber Wow",
    category: "etica",
    industries: ["ecommerce"],
    market: "B2C",
    tier: 1,
    situation:
      "Faltan tres semanas para el Cyber Wow. Tu margen no te permite ofrecer los descuentos enormes que anuncian las tiendas grandes. Tu jefe de marketing propone subir los precios de lista ahora y luego mostrar una rebaja llamativa sobre ese precio inflado. Dice que todos lo hacen y que el cliente solo mira el porcentaje.",
    options: [
      {
        id: "a",
        label: "Inflar el precio y anunciar el gran descuento",
        detail: "Subes el precio de lista hoy y en la campaña lo tachas para mostrar una rebaja grande.",
        effects: { demandPct: 9, cashPct: 2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -8, reputation: -10, brand: -6 },
          text: "Usuarios compararon el historial de precios y lo difundieron. Indecopi inició un procedimiento por publicidad engañosa.",
        },
        outcome:
          "El porcentaje llamó la atención y vendiste bien durante la campaña. Hoy cualquiera puede ver el historial de precios de un producto, y una rebaja falsa queda registrada para siempre.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Ofrecer descuentos reales en pocos productos",
        detail: "Eliges productos con sobrestock o buen margen y les das una rebaja verdadera. El resto queda a precio normal.",
        effects: { demandPct: 5, cashPct: 1, brand: 3, reputation: 3 },
        outcome:
          "Tus rebajas fueron menos espectaculares y eran ciertas. Liquidaste inventario que ocupaba espacio y los compradores que llegaron por la oferta llevaron también productos a precio completo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Dar beneficios en lugar de rebajas",
        detail: "Mantienes precios y ofreces envío gratis, regalo por compra o cuotas sin intereses.",
        effects: { demandPct: 4, costPct: 2, satisfaction: 3 },
        outcome:
          "No tocaste tu precio de referencia y el cliente recibió un valor real. El envío gratis resultó más convincente que un porcentaje para varios compradores de provincia.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "No participar en la campaña",
        detail: "Vendes como cualquier semana y te ahorras la inversión publicitaria.",
        effects: { demandPct: -4 },
        outcome:
          "Protegiste tu margen. Durante esos días casi todo el tráfico de compradores en línea fue hacia las tiendas con ofertas, y tus ventas de la semana cayeron.",
        verdict: "riesgosa",
      },
    ],
    concept: "Precio de referencia y publicidad engañosa",
    lesson:
      "Un descuento solo es legítimo si el precio anterior fue real. En internet la información queda registrada, así que una promoción honesta y modesta construye más que una rebaja inventada.",
  },
  {
    id: "ind-ecommerce-caida-del-sitio",
    title: "La web se cae en la primera hora de campaña",
    category: "tecnologia",
    industries: ["ecommerce"],
    market: "B2C",
    tier: 1,
    situation:
      "El año pasado tu tienda en línea colapsó a los veinte minutos de empezar la campaña, con la publicidad ya pagada y miles de personas viendo una página de error. Este año esperas el doble de visitas. Tu proveedor de hospedaje ofrece ampliar la capacidad por esos días, y tu programador propone una sala de espera virtual más barata.",
    options: [
      {
        id: "a",
        label: "Confiar en que este año aguantará",
        detail: "Inviertes todo el presupuesto en publicidad y dejas la plataforma como está.",
        effects: { demandPct: 4 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -5, demandPct: -8, satisfaction: -7, brand: -5 },
          text: "El sitio volvió a caerse en la hora de mayor tráfico. Pagaste por clics que terminaron en una página de error.",
        },
        outcome:
          "Pusiste todo en atraer visitas sin asegurar que pudieran comprar. La publicidad más cara es la que lleva clientes a una tienda cerrada.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Ampliar capacidad y hacer pruebas de carga",
        detail: "Contratas más capacidad por los días de campaña y simulas el tráfico esperado una semana antes.",
        effects: { cashPct: -3, demandPct: 8, satisfaction: 4, brand: 2 },
        outcome:
          "La prueba previa reveló que el cuello de botella estaba en la pasarela de pagos y no en el servidor. Lo corregiste a tiempo y el sitio atendió el pico sin caerse.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Instalar una sala de espera virtual",
        detail: "Cuando el tráfico supere el límite, los visitantes esperan en fila con su turno en pantalla.",
        effects: { cashPct: -1, demandPct: 4, satisfaction: -1 },
        outcome:
          "El sitio no se cayó. Una parte de los visitantes abandonó la fila para comprar en otra tienda, pero quienes entraron pudieron pagar sin errores.",
        verdict: "buena",
      },
    ],
    concept: "Capacidad tecnológica en picos de demanda",
    lesson:
      "En comercio electrónico la plataforma es el local. La capacidad para el pico se planifica y se prueba antes de invertir en atraer visitas.",
  },
  {
    id: "ind-ecommerce-logistica-inversa",
    title: "Una de cada seis zapatillas regresa",
    category: "operaciones",
    industries: ["ecommerce"],
    market: "B2C",
    tier: 2,
    situation:
      "Vendes calzado en línea a todo el Perú. Una de cada seis ventas se devuelve, casi siempre por talla. Cada devolución te cuesta el envío de ida, el de vuelta, la revisión y, muchas veces, una caja maltratada que ya no puedes vender como nueva. Tu política actual es de cambios gratis y sin preguntas, y es lo que más elogian tus clientes.",
    options: [
      {
        id: "a",
        label: "Cobrar al cliente el envío de la devolución",
        detail: "Mantienes el derecho a cambio, pero el flete de retorno lo paga quien devuelve.",
        effects: { costPct: -3, demandPct: -6, satisfaction: -5, rounds: 2 },
        outcome:
          "Las devoluciones bajaron y también las ventas. Comprar zapatos sin probárselos es un riesgo para el cliente, y tu política era justamente lo que lo animaba a comprar.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Atacar la causa: guía de tallas y asesoría",
        detail: "Publicas medidas en centímetros por modelo, comentarios de otros compradores y atención por WhatsApp antes de la compra.",
        effects: { cashPct: -2, costPct: -3, demandPct: 3, satisfaction: 4, rounds: 3 },
        outcome:
          "Descubriste que tres modelos concentraban la mitad de las devoluciones, porque su horma era más chica. Con esa advertencia en la página, las devoluciones bajaron sin tocar la política.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Mantener todo igual y subir un poco los precios",
        detail: "Tratas la devolución como un costo del negocio y lo repartes entre todas las ventas.",
        effects: { costPct: 2, demandPct: -2, rounds: 2 },
        outcome:
          "Tu servicio siguió siendo el mejor del mercado. Los clientes que aciertan su talla ahora pagan por los que compran dos pares para devolver uno.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Revender las devoluciones en una sección de segunda",
        detail: "Creas una categoría de productos con caja abierta, revisados y con descuento.",
        effects: { cashPct: 2, brand: 1, rounds: 2 },
        outcome:
          "Recuperaste valor de productos que antes se quedaban en el almacén. No reduce las devoluciones, pero convierte una pérdida en una venta para otro tipo de cliente.",
        verdict: "buena",
      },
    ],
    concept: "Logística inversa",
    lesson:
      "La devolución es parte del producto en la venta en línea. Antes de restringirla conviene entender por qué ocurre, porque suele ser más barato prevenirla que procesarla.",
  },
  {
    id: "ind-ecommerce-contracargo",
    title: "Seis celulares, tarjeta extranjera y envío urgente",
    category: "finanzas",
    industries: ["ecommerce"],
    market: "B2C",
    tier: 2,
    situation:
      "Entra el pedido más grande del mes: seis celulares de alta gama, pagados con una tarjeta emitida en otro país, con envío urgente a una dirección de Tumbes distinta a la de facturación. El pago fue aprobado por la pasarela. Si la tarjeta resulta robada, el titular desconocerá la compra, el banco te quitará el dinero y habrás perdido también la mercadería.",
    options: [
      {
        id: "a",
        label: "Despachar de inmediato",
        detail: "El pago está aprobado y el cliente paga por envío urgente. Cumples el plazo.",
        effects: { cashPct: 4 },
        risk: {
          prob: 0.55,
          effects: { cashPct: -9 },
          text: "Semanas después llegó el contracargo. El titular real desconoció la compra, te descontaron el monto completo y los equipos nunca aparecieron.",
        },
        outcome:
          "Enviaste los equipos el mismo día. Que la pasarela apruebe un pago significa que la tarjeta tiene fondos, no que quien compra sea su dueño.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Retener el pedido y verificar la identidad",
        detail: "Llamas al comprador, pides documento y una validación adicional del pago antes de despachar.",
        effects: { cashPct: -1, satisfaction: -1 },
        risk: {
          prob: 0.3,
          effects: { cashPct: 4 },
          text: "El comprador era real, un comerciante que importa para revender. Pasó la verificación y completó la compra.",
        },
        outcome:
          "La verificación retrasó el envío un día. Un comprador legítimo entiende el control cuando se le explica, y uno fraudulento deja de contestar.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Cancelar y bloquear las tarjetas extranjeras",
        detail: "Devuelves el pago y configuras la tienda para aceptar solo tarjetas emitidas en el país.",
        effects: { demandPct: -3, rounds: 3 },
        outcome:
          "Eliminaste este riesgo de raíz. También cerraste la puerta a peruanos en el exterior que compran regalos para su familia, un grupo que paga bien y casi no devuelve.",
        verdict: "buena",
      },
    ],
    concept: "Contracargos y prevención de fraude",
    lesson:
      "En la venta con tarjeta no presente, el riesgo de fraude lo asume el comercio. Conviene tener reglas para detectar pedidos inusuales y verificar antes de entregar.",
  },
  {
    id: "ind-ecommerce-marketplace-o-tienda",
    title: "Publicidad cada vez más cara o comisión de marketplace",
    category: "marketing",
    industries: ["ecommerce"],
    market: "B2C",
    tier: 2,
    situation:
      "Vendes artículos para el hogar desde tu propia web. Cada trimestre pagas más en anuncios para conseguir la misma cantidad de compras. Un marketplace grande te invita a vender en su plataforma: cobra una comisión por venta, fija reglas de precio y entrega, y el cliente será de ellos. A cambio tiene millones de visitas que tú no pagas.",
    options: [
      {
        id: "a",
        label: "Mudar todo al marketplace y cerrar tu web",
        detail: "Dejas de pagar publicidad y plataforma propia, y vendes solo donde ya está el tráfico.",
        effects: { fixedCostPct: -4, demandPct: 8, costPct: 8, brand: -5, rounds: 3 },
        risk: {
          prob: 0.35,
          effects: { demandPct: -10, cashPct: -3, rounds: 2 },
          text: "El marketplace suspendió tu cuenta dos semanas por un reclamo y después subió su comisión. No tenías otro canal donde vender.",
        },
        outcome:
          "Tus ventas subieron rápido y tu marca desapareció detrás de la del marketplace. Los clientes no recuerdan a quién le compraron y tú no puedes volver a contactarlos.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Usar el marketplace para captar y tu web para retener",
        detail: "Publicas tus productos más buscados en el marketplace y cuidas en tu web a los clientes que vuelven, con correo y beneficios.",
        effects: { cashPct: -2, demandPct: 7, costPct: 3, brand: 2, rounds: 4 },
        outcome:
          "Calculaste cuánto te cuesta conseguir una venta en cada canal. La primera compra resulta más barata en el marketplace y la recompra resulta más barata en tu web, donde no pagas comisión.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Quedarte en tu web y mejorar la recompra",
        detail: "Reduces la inversión en anuncios para clientes nuevos y la pasas a correo, WhatsApp y programa de referidos.",
        effects: { cashPct: -1, costPct: -2, demandPct: 2, satisfaction: 3, rounds: 3 },
        outcome:
          "Venderle a quien ya te compró resultó mucho más barato que conquistar a un desconocido. Tu crecimiento fue moderado, porque la base de clientes actuales tiene un límite.",
        verdict: "buena",
      },
    ],
    concept: "Costo de adquisición y valor del cliente",
    lesson:
      "Todo canal cobra por traer clientes, sea con anuncios o con comisiones. Lo que importa es comparar ese costo con lo que el cliente comprará a lo largo del tiempo.",
  },
  {
    id: "ind-ecommerce-importacion-navidad",
    title: "El contenedor que debe llegar antes de Navidad",
    category: "proveedores",
    industries: ["ecommerce"],
    market: "B2C",
    tier: 3,
    situation:
      "Estamos en agosto. Importas juguetes y artículos de regalo desde China, y la campaña navideña es la mitad de tu venta anual. El flete marítimo es barato, pero entre producción, tránsito y aduana puede tardar tres meses. El aéreo llega en días y cuesta varias veces más. Tu agente de carga, además, sugiere declarar un valor menor en la factura para pagar menos tributos.",
    options: [
      {
        id: "a",
        label: "Todo por mar, con pedido grande",
        detail: "Haces un solo embarque marítimo con todo el inventario de campaña al menor costo.",
        effects: { cashPct: -8, costPct: -5, rounds: 2 },
        risk: {
          prob: 0.35,
          effects: { demandPct: -15, cashPct: -6 },
          text: "La congestión en puertos y una revisión física en aduana retrasaron la carga. La mercadería llegó después de Navidad.",
        },
        outcome:
          "Conseguiste el mejor costo por unidad. Toda tu campaña quedó a bordo de un solo barco y sujeta a una sola fecha, sin margen para imprevistos.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Base por mar y reposición por aire",
        detail: "Embarcas temprano el grueso del pedido por mar y reservas presupuesto para traer por avión lo que se agote.",
        effects: { cashPct: -7, costPct: -2, demandPct: 6, satisfaction: 3, rounds: 2 },
        outcome:
          "El embarque marítimo llegó en noviembre. En diciembre dos productos se agotaron y los repusiste por aire en una semana, con menor margen pero sin perder ventas.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Todo por aire, más cerca de la campaña",
        detail: "Esperas a octubre para ver qué está de moda y traes solo eso por avión.",
        effects: { cashPct: -5, costPct: 9, demandPct: 5, rounds: 2 },
        outcome:
          "Acertaste con los productos porque compraste con mejor información. El flete se comió gran parte del margen, sobre todo en los artículos grandes y baratos.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Declarar un valor menor en aduana",
        detail: "Importas por mar con una factura por debajo del precio real para pagar menos tributos.",
        effects: { cashPct: -6, costPct: -8, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -15, reputation: -12, demandPct: -12 },
          text: "Aduanas observó el valor declarado e inmovilizó la carga. Pagaste tributos, multa y almacenaje, y la mercadería salió en enero.",
        },
        outcome:
          "El costo en papel bajó. Aduanas compara los valores declarados con precios de referencia, y una observación detiene el contenedor justo cuando más lo necesitas.",
        verdict: "mala",
      },
    ],
    concept: "Tiempo de reposición e inventario de seguridad",
    lesson:
      "Mientras más largo e incierto es el tiempo de entrega del proveedor, más temprano se debe pedir y más respaldo se necesita. El flete barato sale caro si la mercadería llega tarde.",
    basedOn: "Congestión portuaria y alza de fletes marítimos de 2021",
  },

  // ===== INMOBILIARIA =====
  {
    id: "ind-inmobiliaria-preventa-en-planos",
    title: "El banco exige preventas para financiar la obra",
    category: "finanzas",
    industries: ["inmobiliaria"],
    market: "B2C",
    tier: 1,
    situation:
      "Tienes el terreno en Jesús María y el proyecto aprobado, pero el banco solo desembolsará el crédito para construir cuando demuestres un nivel mínimo de departamentos vendidos en planos. Llevas la mitad de esa meta. Mientras tanto pagas intereses por el terreno, la caseta de ventas y la publicidad. Los compradores dudan porque todavía no ven nada construido.",
    options: [
      {
        id: "a",
        label: "Dar precio de lanzamiento a los primeros compradores",
        detail: "Ofreces un descuento claro a quienes compren en planos y anuncias que el precio subirá con el avance de obra.",
        effects: { cashPct: -4, demandPct: 10, rounds: 2 },
        outcome:
          "Alcanzaste la meta del banco en dos meses. Los primeros compradores pagaron menos porque asumieron más riesgo y más espera, y ese descuento te costó menos que seguir pagando intereses sin construir.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Empezar la obra con las cuotas iniciales recibidas",
        detail: "Usas el dinero de los compradores para arrancar sin esperar al banco y mostrar avance.",
        effects: { demandPct: 6, cashPct: -3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -10, reputation: -12, satisfaction: -8, demandPct: -8, rounds: 2 },
          text: "El dinero se acabó en los cimientos. La obra se detuvo, los compradores exigieron la devolución de sus cuotas y varios denunciaron ante Indecopi.",
        },
        outcome:
          "La excavación animó las ventas por unas semanas. Comprometiste dinero de tus clientes en una obra que todavía no tiene asegurado su financiamiento completo.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Mantener precios y reforzar la sala de ventas",
        detail: "Inviertes en departamento piloto, recorrido virtual y más asesores, sin tocar el precio.",
        effects: { cashPct: -4, fixedCostPct: 2, demandPct: 5, brand: 3, rounds: 2 },
        outcome:
          "El departamento piloto ayudó a que los indecisos se imaginen viviendo ahí. Las ventas mejoraron, aunque la meta tardó un trimestre más y los intereses siguieron corriendo.",
        verdict: "buena",
      },
    ],
    concept: "Preventa y financiamiento del proyecto",
    lesson:
      "La preventa demuestra que el proyecto tiene demanda y permite acceder al financiamiento. El descuento en planos es el pago al comprador por asumir riesgo y espera.",
  },
  {
    id: "ind-inmobiliaria-licencia-de-construccion",
    title: "La licencia no sale y la constructora ya está lista",
    category: "legal",
    industries: ["inmobiliaria"],
    market: "B2C",
    tier: 1,
    situation:
      "Tu expediente de licencia de edificación lleva meses en la municipalidad con observaciones menores. La constructora tiene la maquinaria contratada y te cobra por cada semana de espera. Tu ingeniero propone empezar la excavación y el muro de contención mientras termina el trámite, porque según él nadie fiscaliza los primeros trabajos.",
    options: [
      {
        id: "a",
        label: "Empezar la excavación sin licencia",
        detail: "Avanzas los trabajos iniciales para no pagar maquinaria parada.",
        effects: { cashPct: 2, productivityPct: 3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -10, reputation: -9, demandPct: -6 },
          text: "Un vecino llamó a fiscalización. La municipalidad paralizó la obra, impuso una multa y el trámite de la licencia se complicó más.",
        },
        outcome:
          "Ganaste unas semanas en el cronograma. Una excavación en plena ciudad no pasa desapercibida, y una obra paralizada con cartel municipal es la peor publicidad para vender departamentos.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Esperar la licencia y renegociar con la constructora",
        detail: "Levantas las observaciones con prioridad y acuerdas una nueva fecha de inicio, pagando una compensación.",
        effects: { cashPct: -3, reputation: 3 },
        outcome:
          "La espera costó dinero y paciencia. Empezaste con todos los permisos en regla, y el banco y los compradores vieron un proyecto ordenado.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Contratar un gestor que ofrece acelerar el trámite",
        detail: "Un tramitador asegura tener contactos dentro de la municipalidad y cobra por resultados.",
        effects: { cashPct: -2 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -6, reputation: -12 },
          text: "El gestor pagó a un funcionario. El caso salió a la luz en una investigación y la licencia quedó bajo revisión.",
        },
        outcome:
          "El expediente avanzó más rápido. No sabes qué hizo el gestor para lograrlo, y la empresa que figura en el expediente es la tuya.",
        verdict: "riesgosa",
      },
    ],
    concept: "Riesgo regulatorio y permisos",
    lesson:
      "Los plazos de permisos son parte del cronograma y del presupuesto del proyecto. No conviene comprometer contratos con fechas que dependen de un trámite que aún no termina.",
  },
  {
    id: "ind-inmobiliaria-tasas-hipotecarias",
    title: "Suben las tasas y los compradores ya no califican",
    category: "entorno",
    industries: ["inmobiliaria"],
    market: "B2C",
    tier: 2,
    situation:
      "Las tasas de los créditos hipotecarios subieron en los últimos meses. La cuota mensual de un departamento como los tuyos aumentó, y familias que antes calificaban ahora son rechazadas por el banco. Tus visitas a la sala de ventas se mantienen, pero las ventas cerradas cayeron a la mitad. Tienes departamentos terminados que pagan mantenimiento y arbitrios.",
    options: [
      {
        id: "a",
        label: "Bajar el precio de lista",
        detail: "Reduces el precio de todos los departamentos disponibles para que la cuota vuelva a ser alcanzable.",
        effects: { cashPct: -6, demandPct: 8, satisfaction: -3, rounds: 2 },
        outcome:
          "Las ventas reaccionaron. Quienes compraron el mes anterior a precio completo reclamaron, y el mercado leyó la rebaja como señal de que el proyecto tenía problemas.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Asumir gastos del comprador en lugar de bajar precio",
        detail: "Cubres gastos notariales y registrales, y ofreces bonos para la cuota inicial en unidades seleccionadas.",
        effects: { cashPct: -4, demandPct: 7, satisfaction: 3, rounds: 2 },
        outcome:
          "El comprador necesitó menos efectivo para cerrar y el precio de lista se mantuvo. Te costó dinero, pero menos que una rebaja general, y no afectó a quienes ya habían comprado.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Financiar directamente a los compradores",
        detail: "Vendes con cuotas pagadas a la inmobiliaria a quienes el banco rechazó.",
        effects: { cashPct: -8, demandPct: 10, rounds: 3 },
        risk: {
          prob: 0.45,
          effects: { cashPct: -8 },
          text: "Varios compradores dejaron de pagar. El banco los había rechazado por una razón, y recuperar un departamento ocupado tomó mucho tiempo.",
        },
        outcome:
          "Vendiste a quienes nadie más financiaba. Te convertiste en banco sin tener su capital ni su experiencia en cobranza, y tu caja quedó amarrada por años.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Esperar a que las tasas bajen",
        detail: "Mantienes precios y condiciones, y reduces publicidad hasta que el mercado mejore.",
        effects: { fixedCostPct: -2, demandPct: -6, rounds: 2 },
        outcome:
          "Protegiste tus precios. Cada mes con departamentos sin vender siguió sumando intereses y gastos, y nadie sabe cuándo bajarán las tasas.",
        verdict: "riesgosa",
      },
    ],
    concept: "Sensibilidad de la demanda a la tasa de interés",
    lesson:
      "En bienes que se compran con crédito, el cliente decide por la cuota mensual y no por el precio total. Cuando sube la tasa hay que trabajar sobre lo que el comprador puede pagar.",
  },
  {
    id: "ind-inmobiliaria-bono-vivienda-verde",
    title: "Rediseñar el proyecto para calificar a los bonos",
    category: "estrategia",
    industries: ["inmobiliaria"],
    market: "B2C",
    tier: 2,
    situation:
      "Tu próximo edificio en Carabayllo está diseñado con departamentos amplios, cuyo precio queda por encima del rango que cubren los créditos y bonos del Fondo MiVivienda. Si reduces el área y certificas el proyecto como vivienda sostenible, tus compradores accederían a un bono mayor y a mejor tasa. Tendrías que rehacer planos e invertir en griferías ahorradoras, luminarias eficientes y medidores.",
    options: [
      {
        id: "a",
        label: "Rediseñar para entrar al rango y certificar",
        detail: "Ajustas áreas y acabados, y tramitas la certificación sostenible antes del lanzamiento.",
        effects: { cashPct: -4, costPct: 2, demandPct: 12, brand: 3, rounds: 4 },
        risk: {
          prob: 0.2,
          effects: { cashPct: -2, demandPct: -4 },
          text: "La certificación demoró más de lo previsto y lanzaste la venta un trimestre después.",
        },
        outcome:
          "El bono funcionó como parte de la cuota inicial de tus clientes. Familias que no llegaban a juntar el monto calificaron, y tu velocidad de ventas superó a la de los proyectos vecinos.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Mantener el diseño original",
        detail: "Apuntas a un comprador con mayores ingresos, que no necesita bono.",
        effects: { demandPct: -5, brand: 2, rounds: 3 },
        outcome:
          "Ofreces el mejor departamento de la zona. En ese distrito la mayoría de familias compra con apoyo del Estado, así que tu mercado real resultó ser pequeño.",
        verdict: "riesgosa",
      },
      {
        id: "c",
        label: "Hacer un edificio mixto",
        detail: "Destinas la mayoría de unidades al rango con bono y dejas los pisos altos con departamentos más grandes.",
        effects: { cashPct: -3, costPct: 1, demandPct: 8, rounds: 4 },
        outcome:
          "Las unidades con bono dieron velocidad a la preventa y las grandes mejoraron el margen del proyecto. Manejar dos tipos de comprador exigió dos discursos de venta distintos.",
        verdict: "buena",
      },
    ],
    concept: "Subsidios a la demanda y diseño del producto",
    lesson:
      "Cuando el Estado subsidia al comprador, el producto debe diseñarse para calzar en las condiciones del subsidio. El precio correcto es el que el cliente puede financiar.",
  },
  {
    id: "ind-inmobiliaria-retraso-de-obra",
    title: "La entrega se retrasa cinco meses",
    category: "clientes",
    industries: ["inmobiliaria"],
    market: "B2C",
    tier: 3,
    situation:
      "La falta de un material importado y un problema con el contratista de ascensores retrasarán cinco meses la entrega de tu edificio. Hay ochenta familias que avisaron a sus caseros, programaron mudanzas y pagan alquiler mientras esperan. El contrato fija una penalidad por cada mes de demora. Todavía nadie fuera de tu oficina conoce la nueva fecha.",
    options: [
      {
        id: "a",
        label: "No comunicar nada hasta tener certeza",
        detail: "Esperas a confirmar la nueva fecha antes de avisar, para no generar alarma.",
        effects: { satisfaction: -8, reputation: -5 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -8, brand: -8, demandPct: -8, reputation: -5, rounds: 2 },
          text: "Los compradores se enteraron por los obreros. Formaron un grupo, presentaron una denuncia colectiva ante Indecopi y el caso salió en un noticiero.",
        },
        outcome:
          "Ganaste unas semanas de silencio. Las familias siguieron tomando decisiones con una fecha que tú sabías falsa, y eso fue lo que más les indignó.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Avisar ya y pagar la penalidad del contrato",
        detail: "Convocas a los compradores, explicas causas y nuevo cronograma, y pagas cada mes la penalidad pactada.",
        effects: { cashPct: -7, satisfaction: 3, reputation: 6, brand: 2 },
        outcome:
          "La reunión fue dura. Al ver un cronograma con fechas y el primer pago de la penalidad, la mayoría aceptó esperar. Cumplir el contrato también en lo que te perjudica sostuvo tu reputación.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Entregar departamentos sin conformidad de obra",
        detail: "Das las llaves en la fecha original, con ascensores y áreas comunes todavía pendientes.",
        effects: { cashPct: -2, satisfaction: -4 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -10, reputation: -12, satisfaction: -8 },
          text: "Un accidente en un área sin terminar provocó la intervención municipal. Sin conformidad de obra, los compradores no pudieron inscribir su propiedad ni desembolsar sus créditos.",
        },
        outcome:
          "Cumpliste la fecha en el papel. Las familias se mudaron a un edificio en obra, sin ascensor, y sin poder inscribir a su nombre lo que compraron.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Avisar y negociar compensaciones en especie",
        detail: "Informas la demora y ofreces, a elección del comprador, mejoras de acabados o cuotas de mantenimiento pagadas en lugar de dinero.",
        effects: { cashPct: -4, satisfaction: 1, reputation: 3 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -3, satisfaction: -3 },
          text: "Un grupo de compradores rechazó las mejoras y exigió el pago de la penalidad en efectivo, como dice el contrato.",
        },
        outcome:
          "Cuidaste tu caja y muchos compradores aceptaron. Quienes pagan alquiler necesitaban dinero y no un mejor tablero de cocina, así que la propuesta no sirvió para todos.",
        verdict: "buena",
      },
    ],
    concept: "Gestión de crisis con clientes",
    lesson:
      "Una mala noticia comunicada a tiempo permite al cliente reorganizarse. Ocultada, se convierte en una crisis de confianza. Las penalidades pactadas son el costo de incumplir y deben estar presupuestadas.",
  },
  {
    id: "ind-inmobiliaria-vecinos-de-la-obra",
    title: "Rajaduras en la casa del vecino",
    category: "entorno",
    industries: ["inmobiliaria"],
    market: "B2C",
    tier: 3,
    situation:
      "La excavación de tus sótanos en Surquillo coincide con la aparición de rajaduras en la casa antigua de al lado. La familia te responsabiliza. Otros vecinos se quejan del polvo, el ruido y los camiones, y amenazan con bloquear el ingreso. No hiciste un registro notarial del estado de las casas antes de empezar. Un dirigente vecinal se ofrece a calmar a todos a cambio de un pago personal.",
    options: [
      {
        id: "a",
        label: "Pagar al dirigente para que calme a los vecinos",
        detail: "Entregas el dinero y dejas el problema en sus manos.",
        effects: { cashPct: -2 },
        risk: {
          prob: 0.55,
          effects: { cashPct: -7, reputation: -10, productivityPct: -8, rounds: 2 },
          text: "Los vecinos se enteraron del pago, desconocieron al dirigente y bloquearon la obra. La familia afectada inició un proceso judicial.",
        },
        outcome:
          "Hubo calma durante un mes. Pagaste a una persona y no resolviste el problema de nadie. Las rajaduras siguen ahí y crecen con cada etapa de la excavación.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Negar responsabilidad y seguir con la obra",
        detail: "Sostienes que la casa ya era antigua y que tienes licencia. Quien reclame puede ir a juicio.",
        effects: { reputation: -5, brand: -3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -9, productivityPct: -10, reputation: -6, rounds: 2 },
          text: "La municipalidad paralizó la obra por riesgo para la edificación vecina hasta contar con un informe de un perito estructural.",
        },
        outcome:
          "No gastaste nada al inicio. Sin un registro previo del estado de la casa no puedes probar que las rajaduras ya existían, y la carga de la duda cayó sobre ti.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Peritaje, reparación y activar el seguro de obra",
        detail: "Contratas un perito independiente, refuerzas la casa afectada, notificas a tu aseguradora y registras las demás casas ante notario.",
        effects: { cashPct: -5, reputation: 6, satisfaction: 2, productivityPct: -2 },
        outcome:
          "El perito determinó qué daños venían de la obra y el seguro cubrió una parte. La familia aceptó la reparación. El registro notarial de las otras casas, aunque tardío, te protege de reclamos futuros.",
        verdict: "optima",
      },
      {
        id: "d",
        label: "Abrir una mesa de trabajo con todos los vecinos",
        detail: "Acuerdas horarios de camiones, riego contra el polvo, un canal de reclamos y un encargado de relaciones con el vecindario.",
        effects: { cashPct: -2, fixedCostPct: 1, reputation: 4, productivityPct: -3, rounds: 2 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -4 },
          text: "La familia de la casa dañada no aceptó soluciones generales y exigió una reparación inmediata, con amenaza de denuncia.",
        },
        outcome:
          "El ruido y el polvo dejaron de ser motivo de pelea y la obra pudo seguir. Restringir horarios alargó un poco el cronograma. El daño de la casa vecina necesitó una solución aparte.",
        verdict: "buena",
      },
    ],
    concept: "Gestión de grupos de interés",
    lesson:
      "Un proyecto afecta a personas que no son clientes ni proveedores y que pueden detenerlo. Identificarlas, documentar la situación inicial y atender sus reclamos es parte de la gestión de la obra.",
  },

  // ===== LOTES =====
  {
    id: "ind-lotes-estudio-de-titulos",
    title: "Un terreno barato con solo constancia de posesión",
    category: "legal",
    industries: ["lotes"],
    market: "B2C",
    tier: 1,
    situation:
      "Te ofrecen cinco hectáreas en las afueras de Chiclayo a un precio muy por debajo del mercado, ideales para lotizar. El vendedor muestra una constancia de posesión y un contrato privado de hace veinte años, pero el terreno no está inscrito a su nombre en Registros Públicos. Dice que hay otro interesado y que necesita tu respuesta esta semana.",
    options: [
      {
        id: "a",
        label: "Comprar ahora y sanear después",
        detail: "Aprovechas el precio, firmas un contrato privado y luego te ocupas de los papeles.",
        effects: { cashPct: -6, costPct: -8, rounds: 3 },
        risk: {
          prob: 0.55,
          effects: { cashPct: -14, reputation: -8, demandPct: -8, rounds: 2 },
          text: "Apareció el propietario inscrito, una comunidad campesina, y reclamó el terreno. No pudiste vender ningún lote y tu dinero quedó atrapado en un juicio.",
        },
        outcome:
          "Compraste a un precio inmejorable. Lo que recibiste fue un derecho en discusión y no una propiedad, así que nada de lo que vendas encima será seguro para tus clientes.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Hacer el estudio de títulos antes de decidir",
        detail: "Pagas a un abogado para revisar la partida registral, los linderos, las cargas y quién es el verdadero dueño.",
        effects: { cashPct: -1, reputation: 2 },
        risk: {
          prob: 0.3,
          effects: { costPct: -4, rounds: 3 },
          text: "El estudio mostró que el saneamiento era posible. Compraste con un descuento por asumir ese trámite, con el precio retenido en parte hasta la inscripción.",
        },
        outcome:
          "El estudio tomó tres semanas y el vendedor se impacientó. Conocer el problema legal antes de pagar te permitió decidir con información, que es lo único que un precio bajo no da.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Descartarlo y comprar un terreno inscrito",
        detail: "Pagas más por un predio con partida registral limpia a nombre del vendedor.",
        effects: { cashPct: -4, costPct: 5, reputation: 3, rounds: 3 },
        outcome:
          "Tu costo de terreno fue mayor. Pudiste independizar los lotes y entregar a cada comprador un título inscribible, algo que tus vendedores usaron como principal argumento.",
        verdict: "buena",
      },
    ],
    concept: "Debida diligencia de títulos",
    lesson:
      "En bienes raíces se compra un derecho, no un pedazo de tierra. Antes de pagar hay que verificar en Registros Públicos quién es el dueño y qué cargas tiene el predio.",
  },
  {
    id: "ind-lotes-morosidad-en-cuotas",
    title: "Uno de cada cuatro compradores dejó de pagar",
    category: "finanzas",
    industries: ["lotes"],
    market: "B2C",
    tier: 1,
    situation:
      "Vendes lotes en cuotas directas, sin banco, a familias que no tienen historial crediticio. La cuarta parte de tus clientes acumula tres o más cuotas atrasadas. Algunos perdieron su trabajo y otros simplemente dejaron de contestar. Tu contrato permite resolver la venta por falta de pago. Tú también tienes cuotas que pagar al dueño original del terreno.",
    options: [
      {
        id: "a",
        label: "Resolver todos los contratos atrasados",
        detail: "Aplicas la cláusula a todos por igual, recuperas los lotes y los vuelves a vender.",
        effects: { cashPct: 3, satisfaction: -7, reputation: -4, brand: -4 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -5, reputation: -5 },
          text: "Varias familias reclamaron la devolución de lo pagado y denunciaron cláusulas abusivas ante Indecopi. Algunas ya habían construido en el lote.",
        },
        outcome:
          "Recuperaste lotes que hoy valen más que cuando los vendiste. En la zona se comenta que tu empresa le quita el terreno a la gente, y eso pesa en un negocio que vive de la recomendación.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Clasificar la cartera y tratar cada caso",
        detail: "Refinancias a quien quiere pagar y no puede, cobras con firmeza a quien puede y no quiere, y resuelves solo los casos abandonados.",
        effects: { cashPct: 2, fixedCostPct: 1, satisfaction: 3, reputation: 3, rounds: 3 },
        outcome:
          "Contratar a una persona de cobranza se pagó solo. Más de la mitad de los atrasados volvió a pagar con un cronograma nuevo, y los lotes realmente abandonados regresaron a la venta sin escándalo.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Esperar a que se pongan al día",
        detail: "No presionas a nadie. Confías en que pagarán cuando mejore su situación.",
        effects: { cashPct: -4, satisfaction: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -4 },
          text: "La morosidad se contagió. Los clientes puntuales vieron que no pagar no tenía consecuencias y también empezaron a atrasarse.",
        },
        outcome:
          "Nadie se molestó contigo. Tu caja se quedó sin el ingreso de esas cuotas mientras tus propias obligaciones seguían venciendo cada mes.",
        verdict: "mala",
      },
      {
        id: "d",
        label: "Exigir mayor inicial en las ventas nuevas",
        detail: "Dejas la cartera actual como está y cambias la política: inicial más alta y evaluación antes de vender.",
        effects: { demandPct: -5, cashPct: 2, rounds: 3 },
        outcome:
          "Las nuevas ventas son menos y de mejor calidad, porque quien pagó una inicial fuerte cuida su inversión. La cartera antigua sigue con el mismo problema sin resolver.",
        verdict: "buena",
      },
    ],
    concept: "Gestión de cobranza y morosidad",
    lesson:
      "Vender a plazos convierte a la empresa en financiera. La cobranza necesita seguimiento desde la primera cuota atrasada y un trato distinto según la causa del atraso.",
  },
  {
    id: "ind-lotes-promesa-de-servicios",
    title: "Agua, luz y pistas en seis meses",
    category: "marketing",
    industries: ["lotes"],
    market: "B2C",
    tier: 1,
    situation:
      "Tu lotización en las afueras de Huancayo todavía no tiene agua, desagüe ni electricidad. Pediste la factibilidad de servicios a las empresas prestadoras y no tienes respuesta. Tu jefe de ventas quiere imprimir volantes que digan «agua y luz en seis meses», porque la competencia lo promete y los clientes solo preguntan eso.",
    options: [
      {
        id: "a",
        label: "Prometer los servicios en seis meses",
        detail: "Pones la fecha en la publicidad y en lo que dicen los vendedores.",
        effects: { demandPct: 12, rounds: 2 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -9, reputation: -12, satisfaction: -10, demandPct: -10, rounds: 2 },
          text: "Pasó el plazo y no había redes. Los compradores denunciaron ante Indecopi con los volantes como prueba y exigieron la devolución de su dinero.",
        },
        outcome:
          "Las ventas subieron de inmediato. La publicidad forma parte de lo que ofreces y te obliga. Prometiste una fecha que depende de terceros y no de ti.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Informar el estado real de cada servicio",
        detail: "Tus vendedores muestran qué está tramitado y qué no, y ofreces mientras tanto cisterna de agua y paneles solares opcionales.",
        effects: { cashPct: -2, demandPct: -4, satisfaction: 5, reputation: 6, rounds: 3 },
        outcome:
          "Perdiste a los clientes que querían mudarse pronto. Quienes compraron sabían exactamente qué recibían y no hubo reclamos. Varios llegaron recomendados por los primeros.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Invertir en las redes antes de promocionar",
        detail: "Financias las obras de electrificación con la concesionaria y vendes con los postes ya instalados.",
        effects: { cashPct: -8, demandPct: 10, brand: 5, reputation: 4, rounds: 4 },
        risk: {
          prob: 0.25,
          effects: { cashPct: -3 },
          text: "La obra de electrificación costó más de lo presupuestado por exigencias técnicas de la concesionaria.",
        },
        outcome:
          "Pusiste dinero antes de cobrar. Un lote con luz vale bastante más que uno con promesa de luz, y pudiste subir precios con un argumento que el cliente ve con sus propios ojos.",
        verdict: "optima",
      },
    ],
    concept: "Promesa de venta y expectativas del cliente",
    lesson:
      "Lo que se promete al vender es parte del contrato. Solo conviene comprometer plazos que dependen de la propia empresa, y una promesa cumplida vale más que una promesa atractiva.",
  },
  {
    id: "ind-lotes-invasion-y-cupos",
    title: "Invasores en el fondo de tu terreno",
    category: "entorno",
    industries: ["lotes"],
    market: "B2C",
    tier: 2,
    situation:
      "Una madrugada aparecen esteras y palos en la parte alta de tu terreno en el norte de Lima. Detrás hay un grupo organizado que vende esos espacios a familias necesitadas. Un intermediario te visita: por un pago mensual, garantiza que nadie más entrará. Tus compradores formales ven las esteras desde sus lotes y empiezan a llamar preocupados.",
    options: [
      {
        id: "a",
        label: "Pagar la protección que ofrecen",
        detail: "Aceptas el pago mensual para evitar problemas mayores.",
        effects: { fixedCostPct: 3, rounds: 3 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -8, reputation: -10, demandPct: -8, rounds: 2 },
          text: "El monto exigido fue subiendo cada mes y la invasión avanzó de todos modos. Quedaste señalado por haber pagado a una organización criminal.",
        },
        outcome:
          "Las esteras no avanzaron durante un mes. Financiaste a quienes te están quitando el terreno y les confirmaste que eres alguien que paga.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Denunciar de inmediato y pedir el desalojo",
        detail: "Acreditas tu propiedad con la partida registral, denuncias ante la policía y la fiscalía, y actúas en los primeros días.",
        effects: { cashPct: -3, reputation: 4 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -4, demandPct: -4 },
          text: "El desalojo demoró y una parte de los ocupantes se asentó. El caso pasó a un proceso judicial largo.",
        },
        outcome:
          "Actuar rápido fue decisivo. Con tus títulos en orden, la recuperación se logró antes de que la ocupación se consolidara. Tus compradores vieron que la empresa defiende lo que les vendió.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Cercar todo el perímetro y contratar vigilancia",
        detail: "Inviertes en muro, iluminación y guardianes permanentes, además de la denuncia.",
        effects: { cashPct: -5, fixedCostPct: 2, reputation: 3, brand: 3, satisfaction: 3, rounds: 4 },
        outcome:
          "Fue un gasto que no tenías previsto. El cerco y la vigilancia pasaron a ser un atributo del proyecto, y tus vendedores empezaron a mostrarlo en cada visita.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Ceder la zona invadida y seguir vendiendo el resto",
        detail: "Renuncias a esa parte del terreno para evitar un conflicto.",
        effects: { cashPct: -6, demandPct: -6, brand: -4, rounds: 2 },
        outcome:
          "Evitaste la confrontación y perdiste área vendible. La ocupación siguió creciendo hacia abajo, porque ceder una vez marcó hasta dónde estabas dispuesto a retroceder.",
        verdict: "mala",
      },
    ],
    concept: "Protección de activos",
    lesson:
      "El principal activo de una lotizadora es la tierra, y debe protegerse con títulos en regla, posesión efectiva y reacción inmediata. Pagar extorsiones agrava el problema.",
  },
  {
    id: "ind-lotes-habilitacion-urbana",
    title: "Vender antes de la habilitación urbana",
    category: "legal",
    industries: ["lotes"],
    market: "B2C",
    tier: 2,
    situation:
      "Tu terreno en Piura es todavía un predio rústico. Para vender lotes urbanos necesitas aprobar la habilitación urbana en la municipalidad, ejecutar obras y reservar áreas para vías, parques y aportes. El trámite y las obras toman tiempo y dinero. Tu socio propone dibujar un plano de lotización propio y empezar a vender ya, como hacen varias empresas de la zona.",
    options: [
      {
        id: "a",
        label: "Vender como lotes urbanos con plano propio",
        detail: "Ofreces lotes con manzana y número, sin aclarar que el predio sigue siendo rústico.",
        effects: { cashPct: 6, demandPct: 8, rounds: 2 },
        risk: {
          prob: 0.55,
          effects: { cashPct: -12, reputation: -14, satisfaction: -10, rounds: 2 },
          text: "Los compradores no pudieron inscribir sus lotes ni obtener licencia para construir. Hubo denuncias ante Indecopi y pedidos masivos de devolución.",
        },
        outcome:
          "Cobraste iniciales muy rápido. Vendiste algo que legalmente todavía no existe, porque un lote solo se puede independizar e inscribir cuando la habilitación está aprobada.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Aprobar la habilitación y luego vender",
        detail: "Tramitas el proyecto, ejecutas las obras mínimas y lanzas la venta con la resolución en la mano.",
        effects: { cashPct: -8, demandPct: 8, brand: 4, reputation: 5, rounds: 4 },
        outcome:
          "Pasaste dos trimestres gastando sin vender. Al lanzar, cada lote tenía medidas definitivas y camino a su propia partida registral, y eso te permitió cobrar un precio mayor.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Vender como predio rústico, con total claridad",
        detail: "Ofreces acciones y derechos sobre el predio a menor precio, e informas por escrito que la habilitación está en trámite.",
        effects: { cashPct: 2, demandPct: 2, satisfaction: -1, rounds: 2 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -4, reputation: -4, satisfaction: -4 },
          text: "La habilitación demoró más de lo esperado y varios compradores reclamaron, aunque habían firmado la advertencia.",
        },
        outcome:
          "El precio bajo atrajo a compradores que aceptan esperar. Financiaste parte del trámite con esas ventas, con el compromiso de terminar un proceso que no controlas del todo.",
        verdict: "riesgosa",
      },
    ],
    concept: "Habilitación urbana y valor agregado",
    lesson:
      "El valor de un lote está en lo que legalmente se puede hacer con él. La habilitación convierte tierra en producto inmobiliario, y venderla antes de tiempo traslada el riesgo al cliente.",
  },
  {
    id: "ind-lotes-cambio-de-zonificacion",
    title: "Tierra agrícola que algún día será residencial",
    category: "estrategia",
    industries: ["lotes"],
    market: "B2C",
    tier: 3,
    situation:
      "Un fundo al borde de Arequipa se vende a precio de tierra agrícola. La ciudad crece hacia ese lado y se comenta que el próximo plan de desarrollo urbano lo pasará a uso residencial. Si eso ocurre, el terreno valdría varias veces más. Si no ocurre, no podrás lotizar. El cambio depende de la municipalidad provincial y no tiene fecha. Al lado hay un terreno más chico, ya residencial y mucho más caro.",
    options: [
      {
        id: "a",
        label: "Comprar el fundo con todo tu capital",
        detail: "Apuestas al cambio de zonificación y pones en esa compra toda la caja disponible.",
        effects: { cashPct: -15, costPct: -10, rounds: 4 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -6, demandPct: -12, rounds: 3 },
          text: "El nuevo plan urbano mantuvo la zona como agrícola. Te quedaste con un terreno que no puedes lotizar y sin caja para otro proyecto.",
        },
        outcome:
          "Si la zonificación cambia habrás hecho el negocio de tu vida. Mientras tanto tu empresa no tiene nada que vender y su futuro depende de una decisión ajena.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Firmar una opción de compra sobre el fundo",
        detail: "Pagas al dueño una prima para asegurar precio por dos años y compras solo si la zonificación cambia.",
        effects: { cashPct: -3 },
        risk: {
          prob: 0.4,
          effects: { costPct: -8, demandPct: 6, rounds: 4 },
          text: "El cambio de zonificación se aprobó dentro del plazo. Ejerciste la opción al precio pactado, muy por debajo del nuevo valor.",
        },
        outcome:
          "Limitaste tu pérdida máxima al valor de la prima y conservaste la posibilidad de ganar. Tu caja quedó libre para seguir operando mientras la municipalidad decide.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Comprar el terreno residencial",
        detail: "Pagas más por metro cuadrado a cambio de poder iniciar la habilitación de inmediato.",
        effects: { cashPct: -9, costPct: 6, demandPct: 6, rounds: 4 },
        outcome:
          "Tu margen por lote es menor, porque pagaste el terreno a su valor urbano. Tienes un proyecto que puedes ejecutar y vender desde este año, sin depender de nadie.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Comprar el fundo y vender lotes como si fueran urbanos",
        detail: "Lotizas el terreno agrícola y lo ofreces para vivienda, con la promesa de que el cambio está por salir.",
        effects: { cashPct: -6, demandPct: 10, rounds: 2 },
        risk: {
          prob: 0.6,
          effects: { cashPct: -14, reputation: -15, satisfaction: -10, rounds: 2 },
          text: "La municipalidad no autorizó ninguna construcción de vivienda. Los compradores denunciaron que fueron engañados y exigieron su dinero.",
        },
        outcome:
          "Vendiste rápido una expectativa. Trasladaste a familias sin información un riesgo regulatorio que ni tú mismo podías medir.",
        verdict: "mala",
      },
    ],
    concept: "Zonificación y opciones de compra",
    lesson:
      "Cuando el valor depende de una decisión incierta de terceros, conviene pagar por el derecho a decidir después en lugar de apostar todo el capital. La opción limita la pérdida y conserva la ganancia posible.",
  },

  // ===== AUTOS =====
  {
    id: "ind-autos-comision-del-credito",
    title: "La financiera paga más si la tasa es más alta",
    category: "etica",
    industries: ["autos"],
    market: "B2C",
    tier: 1,
    situation:
      "La mayoría de tus clientes compra con crédito vehicular. Una financiera te ofrece una comisión mayor por cada crédito colocado, y esa comisión crece si el cliente acepta una tasa más alta y seguros adicionales. Tus vendedores suelen hablar solo de la cuota mensual. Un banco con mejor tasa para el cliente te paga una comisión mucho menor.",
    options: [
      {
        id: "a",
        label: "Dirigir a los clientes al crédito que más te paga",
        detail: "Los vendedores presentan solo la cuota de la financiera que da mejor comisión.",
        effects: { cashPct: 4, satisfaction: -3 },
        risk: {
          prob: 0.4,
          effects: { reputation: -9, brand: -5, demandPct: -6, cashPct: -3, rounds: 2 },
          text: "Clientes que compararon su costo total con el de otros bancos reclamaron ante Indecopi y contaron su experiencia en grupos de redes sociales.",
        },
        outcome:
          "Tus ingresos por financiamiento subieron. Varios clientes pagaron de más por el mismo auto sin saberlo, y quienes lo descubrieron no volverán ni para el mantenimiento.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Mostrar todas las opciones con su costo total",
        detail: "Cada cotización compara al menos tres entidades con tasa de costo efectivo anual, cuota y monto total a pagar.",
        effects: { cashPct: -1, satisfaction: 6, reputation: 5, demandPct: 3, rounds: 3 },
        outcome:
          "Ganas menos comisión por cada crédito. El cliente siente que lo asesoraste, cierra más rápido porque confía y vuelve al taller. Varios llegaron por recomendación.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "No intervenir en el financiamiento",
        detail: "Cada cliente gestiona su crédito por su cuenta y tú solo vendes el vehículo.",
        effects: { cashPct: -2, demandPct: -5, rounds: 2 },
        outcome:
          "Evitaste cualquier conflicto de interés. Muchas ventas se enfriaron mientras el cliente hacía trámites por su cuenta, y algunos terminaron comprando donde les resolvieron todo en un solo lugar.",
        verdict: "riesgosa",
      },
    ],
    concept: "Transparencia del costo del crédito",
    lesson:
      "La cuota mensual no muestra lo que cuesta un crédito. La tasa de costo efectivo anual incluye intereses, seguros y comisiones, y permite comparar ofertas de forma justa.",
  },
  {
    id: "ind-autos-retoma-de-usados",
    title: "El usado en parte de pago tiene una historia",
    category: "operaciones",
    industries: ["autos"],
    market: "B2C",
    tier: 1,
    situation:
      "Un cliente quiere comprar una camioneta nueva y dejar su auto de cinco años como parte de pago. Pide una tasación alta, y tu vendedor quiere aceptarla para cerrar la venta antes de fin de mes. A simple vista el auto está impecable, con poco kilometraje. No tiene historial de mantenimiento en un taller autorizado, y la pintura del lado derecho brilla distinto.",
    options: [
      {
        id: "a",
        label: "Aceptar la tasación que pide el cliente",
        detail: "Recibes el usado al valor solicitado para asegurar la venta del vehículo nuevo.",
        effects: { cashPct: 3, demandPct: 3 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -6, reputation: -4 },
          text: "El auto tenía un choque fuerte mal reparado y el odómetro adulterado. Lo vendiste muy por debajo de lo que pagaste.",
        },
        outcome:
          "Cerraste la venta del nuevo y el vendedor cobró su comisión. La ganancia de una operación con retoma se conoce recién cuando vendes el usado.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Peritar el auto y revisar sus antecedentes",
        detail: "Tu taller lo inspecciona y verificas gravámenes en Registros Públicos, papeletas y siniestros antes de ofrecer un valor.",
        effects: { cashPct: -1, satisfaction: -1, reputation: 3 },
        outcome:
          "El peritaje encontró una reparación estructural. Ofreciste un valor menor y explicaste el motivo con el informe en la mano. El cliente negoció, aceptó, y tú sabes exactamente qué estás comprando.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "No recibir usados",
        detail: "Vendes solo vehículos nuevos y recomiendas al cliente vender su auto por su cuenta.",
        effects: { demandPct: -6, rounds: 2 },
        outcome:
          "Te libraste del riesgo de los usados. Muchos compradores necesitan entregar su auto para completar la inicial y se fueron al concesionario que sí se lo recibe.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Recibirlo en consignación",
        detail: "Exhibes el usado en tu local y el cliente cobra cuando se venda. Tú ganas una comisión.",
        effects: { cashPct: 1, demandPct: -2 },
        outcome:
          "No pusiste capital ni asumiste el riesgo del precio. El cliente necesitaba el dinero del usado para pagar la inicial del nuevo, así que la venta de la camioneta quedó en espera.",
        verdict: "buena",
      },
    ],
    concept: "Asimetría de información en la valuación",
    lesson:
      "Quien vende un bien usado sabe más de él que quien lo compra. Esa diferencia se reduce con inspección y verificación, y el costo de revisar es pequeño frente al de comprar a ciegas.",
  },
  {
    id: "ind-autos-tipo-de-cambio",
    title: "Compras en dólares y vendes en soles",
    category: "finanzas",
    industries: ["autos"],
    market: "B2C",
    tier: 2,
    situation:
      "Pagas a la marca en dólares, a noventa días de recibido cada embarque. Tus clientes ganan en soles y quieren precios en soles. En las últimas semanas el dólar subió por la incertidumbre política, y tus vehículos ya vendidos en soles te dejarán menos de lo calculado cuando pagues la factura. Tu banco te ofrece un contrato para fijar hoy el tipo de cambio de tus pagos futuros.",
    options: [
      {
        id: "a",
        label: "Contratar un forward para los próximos pagos",
        detail: "Aseguras con el banco el tipo de cambio al que comprarás los dólares de cada vencimiento.",
        effects: { cashPct: -1, costPct: 1, rounds: 3 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -2 },
          text: "El dólar bajó después de firmar y tuviste que comprar al tipo de cambio pactado, que era más alto que el del mercado.",
        },
        outcome:
          "Desde la firma supiste cuántos soles necesitabas para cada factura y pudiste fijar precios con un margen conocido. Renunciaste a ganar si el dólar bajaba, a cambio de no perder si subía.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Publicar los precios en dólares",
        detail: "Trasladas el riesgo al cliente, que paga al tipo de cambio del día.",
        effects: { demandPct: -6, satisfaction: -3, rounds: 2 },
        outcome:
          "Tu margen en dólares quedó protegido. El cliente que gana en soles vio subir el precio del auto cada semana, y muchos postergaron la compra o buscaron marcas con precio en soles.",
        verdict: "buena",
      },
      {
        id: "c",
        label: "Mantener precios en soles y esperar que el dólar baje",
        detail: "No te cubres ni subes precios, confiando en que el alza es pasajera.",
        effects: { demandPct: 3, rounds: 2 },
        risk: {
          prob: 0.5,
          effects: { cashPct: -7, costPct: 5, rounds: 2 },
          text: "El dólar siguió subiendo. Al pagar las facturas, la diferencia de cambio se llevó la utilidad del trimestre.",
        },
        outcome:
          "Tus precios quedaron entre los más bajos del mercado y vendiste bien. Sin darte cuenta pasaste de vender autos a apostar sobre el tipo de cambio.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Comprar hoy los dólares con un préstamo en soles",
        detail: "Te endeudas en soles para comprar ahora todos los dólares que necesitarás en noventa días.",
        effects: { cashPct: -2, fixedCostPct: 2, rounds: 2 },
        outcome:
          "Eliminaste el riesgo cambiario calzando tu deuda con la moneda de tus ingresos. Pagaste intereses por un dinero que quedó guardado tres meses, un costo mayor que el del forward.",
        verdict: "buena",
      },
    ],
    concept: "Riesgo cambiario y cobertura",
    lesson:
      "Cuando los costos están en una moneda y los ingresos en otra, el margen depende del tipo de cambio. La cobertura tiene un costo y sirve para que el negocio dependa de vender bien, no de adivinar el dólar.",
  },
  {
    id: "ind-autos-lista-de-espera",
    title: "Tres meses de espera por el modelo más pedido",
    category: "clientes",
    industries: ["autos"],
    market: "B2C",
    tier: 2,
    situation:
      "La fábrica redujo los envíos de tu SUV más vendida y tienes cuarenta clientes en lista de espera con su separación pagada. Llegan diez unidades este mes. Descubres que dos vendedores cobran un pago por fuera para adelantar turnos. Además, un cliente corporativo ofrece comprar las diez unidades juntas con todos los accesorios, y un revendedor te ofrece un sobreprecio.",
    options: [
      {
        id: "a",
        label: "Entregar al que pague más",
        detail: "Asignas las unidades a quien acepte sobreprecio o paquetes de accesorios obligatorios.",
        effects: { cashPct: 5, satisfaction: -8, brand: -5 },
        risk: {
          prob: 0.45,
          effects: { reputation: -8, demandPct: -6, cashPct: -3, rounds: 2 },
          text: "Clientes con separación pagada denunciaron ante Indecopi el incumplimiento de las condiciones ofrecidas, y la marca te llamó la atención.",
        },
        outcome:
          "Este mes ganaste más por unidad. Quienes esperaban su turno con el precio pactado se sintieron burlados, y la escasez que hoy te favorece se acabará en algunos meses.",
        verdict: "mala",
      },
      {
        id: "b",
        label: "Respetar el orden de la lista y hacerlo visible",
        detail: "Entregas según fecha de separación, informas a cada cliente su posición y sancionas el cobro por adelantar turnos.",
        effects: { satisfaction: 6, reputation: 5, morale: -2, brand: 3 },
        outcome:
          "Separaste a los dos vendedores. Los clientes aceptaron esperar porque sabían su lugar y veían avanzar la lista, y casi nadie pidió la devolución de su separación.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Vender las diez al cliente corporativo",
        detail: "Priorizas la venta grande con accesorios y pides paciencia a los clientes de la lista.",
        effects: { cashPct: 3, satisfaction: -5, rounds: 1 },
        risk: {
          prob: 0.35,
          effects: { cashPct: -3, demandPct: -4, reputation: -3 },
          text: "Una docena de clientes de la lista pidió la devolución de su separación y compró otra marca.",
        },
        outcome:
          "Cerraste una operación importante y abriste una cuenta corporativa. Lo hiciste con unidades que ya estaban comprometidas con clientes que pagaron para reservarlas.",
        verdict: "riesgosa",
      },
      {
        id: "d",
        label: "Ofrecer alternativas a quienes esperan",
        detail: "Respetas la lista y propones a los que están al final otra versión o un modelo con entrega inmediata, con un beneficio.",
        effects: { cashPct: -1, demandPct: 3, satisfaction: 4, rounds: 2 },
        outcome:
          "Varios clientes aceptaron cambiar de versión para no esperar. Acortaste la lista, moviste stock que estaba parado en el patio y nadie perdió su turno.",
        verdict: "buena",
      },
    ],
    concept: "Gestión de la escasez",
    lesson:
      "Cuando la demanda supera a la oferta, la forma de asignar el producto define la relación futura con los clientes. Las reglas claras y conocidas sostienen la confianza cuando no se puede atender a todos.",
    basedOn: "Escasez mundial de semiconductores que redujo la producción de vehículos entre 2021 y 2022",
  },
  {
    id: "ind-autos-taller-posventa",
    title: "Los clientes dejan tu taller al terminar la garantía",
    category: "estrategia",
    industries: ["autos"],
    market: "B2C",
    tier: 2,
    situation:
      "La venta de autos nuevos deja un margen delgado. Tu taller deja mucho más, pero la mayoría de clientes solo viene mientras dura la garantía y luego se va a talleres multimarca más baratos. Tu jefe de posventa propone planes de mantenimiento prepagado. Tu jefe de ventas propone bajar el precio de la mano de obra para igualar a los talleres de barrio.",
    options: [
      {
        id: "a",
        label: "Vender planes de mantenimiento prepagado",
        detail: "Al comprar el auto, el cliente puede incluir en su financiamiento los mantenimientos de varios años a precio fijo.",
        effects: { cashPct: 3, demandPct: 3, satisfaction: 3, rounds: 4 },
        risk: {
          prob: 0.25,
          effects: { costPct: 3, rounds: 2 },
          text: "Los repuestos subieron de precio y los mantenimientos ya cobrados te costaron más de lo calculado.",
        },
        outcome:
          "Cobraste por adelantado y aseguraste las visitas al taller por años. Cada visita es una ocasión para detectar trabajos adicionales y para ofrecer el siguiente auto.",
        verdict: "optima",
      },
      {
        id: "b",
        label: "Igualar precios de los talleres multimarca",
        detail: "Reduces tu tarifa de mano de obra al nivel de la competencia informal.",
        effects: { cashPct: -4, demandPct: 4, quality: -2, rounds: 2 },
        outcome:
          "Llegaron más autos y cada uno dejó menos. Tu taller tiene técnicos certificados, equipos de diagnóstico y repuestos originales que el taller de barrio no paga, así que el margen casi desapareció.",
        verdict: "mala",
      },
      {
        id: "c",
        label: "Crear un servicio rápido para autos sin garantía",
        detail: "Abres una línea de mantenimiento básico con cita, precio cerrado y repuestos alternativos certificados.",
        effects: { cashPct: -3, demandPct: 5, satisfaction: 4, rounds: 3 },
        outcome:
          "El cliente de auto antiguo encontró un punto medio entre tu taller completo y el de barrio. Separar las líneas evitó rebajar el servicio principal y ocupó horas que estaban vacías.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Decir que la garantía exige todo servicio en tu taller",
        detail: "Tus asesores informan que cualquier trabajo fuera del concesionario anula la garantía completa.",
        effects: { cashPct: 2, satisfaction: -5 },
        risk: {
          prob: 0.4,
          effects: { cashPct: -5, reputation: -8, brand: -4 },
          text: "Un cliente reclamó ante Indecopi por información falsa sobre las condiciones de su garantía, y el caso se difundió en foros de propietarios.",
        },
        outcome:
          "Retuviste clientes con miedo. Afirmaste algo que el certificado de garantía no dice en esos términos, y el cliente que se siente amarrado se va en cuanto puede.",
        verdict: "mala",
      },
    ],
    concept: "Rentabilidad de la posventa y valor del cliente",
    lesson:
      "En muchos negocios la primera venta abre la relación y la ganancia llega con los servicios posteriores. Retener al cliente durante toda la vida del producto vale más que maximizar una sola operación.",
  },
  {
    id: "ind-autos-marca-china-hibridos",
    title: "Sumar una marca china de híbridos a tu local",
    category: "estrategia",
    industries: ["autos"],
    market: "B2C",
    tier: 3,
    situation:
      "Representas desde hace quince años a una marca japonesa con clientes fieles. Una marca china te ofrece la representación en Trujillo de sus SUV híbridas: más equipadas, más baratas y con mejor margen para ti. La marca japonesa no verá con buenos ojos que compartas el local. Los clientes preguntan cada vez más por híbridos, y también preguntan si habrá repuestos y cuánto valdrá ese auto en cinco años.",
    options: [
      {
        id: "a",
        label: "Exhibir ambas marcas en el mismo local",
        detail: "Aprovechas tu local y tu equipo actual para vender las dos marcas lado a lado.",
        effects: { cashPct: -3, demandPct: 8, brand: -3, rounds: 3 },
        risk: {
          prob: 0.45,
          effects: { demandPct: -8, cashPct: -4, rounds: 2 },
          text: "La marca japonesa consideró incumplido tu contrato de representación y redujo tu asignación de unidades.",
        },
        outcome:
          "Las híbridas se vendieron bien. Una parte de esas ventas fueron clientes que venían por tu marca tradicional y cambiaron en el salón, así que creciste menos de lo que parecía.",
        verdict: "riesgosa",
      },
      {
        id: "b",
        label: "Abrir la nueva marca en local y empresa separados",
        detail: "Constituyes otra razón social, con su propio local, equipo de ventas, taller y stock de repuestos.",
        effects: { cashPct: -9, fixedCostPct: 5, demandPct: 10, brand: 3, rounds: 4 },
        risk: {
          prob: 0.3,
          effects: { cashPct: -4, satisfaction: -4 },
          text: "La marca china demoró en enviar repuestos y varios clientes tuvieron su auto parado en el taller por semanas.",
        },
        outcome:
          "La inversión fue grande y cuidaste la relación con tu marca de siempre. Cada marca atiende a un cliente distinto, y tu grupo ya no depende de un solo fabricante ni de una sola tecnología.",
        verdict: "optima",
      },
      {
        id: "c",
        label: "Rechazar la oferta y seguir con tu marca",
        detail: "Te concentras en lo que conoces y esperas a que tu marca amplíe su oferta de híbridos.",
        effects: { demandPct: -4, rounds: 3 },
        outcome:
          "Tu operación siguió ordenada y tu relación con la marca, intacta. Otro empresario tomó la representación china y abrió a tres cuadras, con precios que atraen a tus clientes más jóvenes.",
        verdict: "buena",
      },
      {
        id: "d",
        label: "Dejar la marca japonesa y pasarte a la china",
        detail: "Renuncias a tu representación actual para dedicar todo el local a la marca nueva.",
        effects: { cashPct: -5, demandPct: 5, costPct: -4, brand: -6, satisfaction: -4, rounds: 3 },
        risk: {
          prob: 0.4,
          effects: { demandPct: -10, cashPct: -5, rounds: 2 },
          text: "La marca china cambió de importador en el país y tu contrato quedó en el aire. Ya no tenías la marca anterior como respaldo.",
        },
        outcome:
          "Mejoraste tu margen por unidad y perdiste tu cartera de quince años de mantenimiento. Cambiaste un negocio probado por una apuesta completa a una marca que recién se está dando a conocer.",
        verdict: "riesgosa",
      },
    ],
    concept: "Portafolio de marcas y canibalización",
    lesson:
      "Sumar una marca nueva diversifica el riesgo, pero puede quitarle ventas a la actual y tensar la relación con el proveedor principal. La forma de incorporarla importa tanto como la decisión de hacerlo.",
  },
];

export default data;
