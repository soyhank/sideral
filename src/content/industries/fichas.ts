import type { IndustryProfile } from "../types";

const data: IndustryProfile[] = [
  {
    id: "pasteleria",
    description:
      "Compites con pastelerías de barrio, cadenas con varios locales, supermercados y reposteras que venden por redes desde su casa. El dinero se gana en las campañas, sobre todo Día de la Madre y Navidad, y en las tortas personalizadas, que dejan mejor margen que las clásicas. Lo difícil es calcular cuánto producir: lo que sobra se malogra en pocos días y lo que falta se lo lleva la competencia.",
    customer:
      "Familias y oficinas que compran para cumpleaños y celebraciones. Valoran el sabor, la presentación y que el pedido llegue a tiempo, y en tortas personalizadas pagan más si confían en tu marca.",
    keys: [
      "Planifica la producción por campaña: sube el volumen en el segundo y cuarto trimestre y bájalo en el primero para no botar producto.",
      "Invierte en calidad y empuja las tortas personalizadas, donde el cliente es menos sensible al precio.",
      "Concentra el marketing en digital y activaciones, que son los canales que mejor responden en este rubro.",
      "Cuida la capacidad del taller: una torta personalizada ocupa el triple que una clásica.",
    ],
    mistakes: [
      "Producir lo mismo todos los trimestres y terminar con mucha merma en los meses flojos.",
      "Bajar el precio de las tortas clásicas para ganar volumen sin revisar si el margen cubre los gastos fijos.",
      "Aceptar más pedidos personalizados de los que el taller puede entregar bien en plena campaña.",
    ],
    porter: {
      rivalry: {
        level: 4,
        text: "Hay muchas pastelerías, cadenas, supermercados y reposteras por redes peleando las mismas fechas. En campaña todos lanzan promociones a la vez.",
      },
      entrants: {
        level: 4,
        text: "Entrar es fácil: basta un horno, una buena receta y una cuenta en redes. La informalidad permite empezar desde casa con muy poca inversión.",
      },
      substitutes: {
        level: 3,
        text: "Un desayuno sorpresa, un postre de supermercado, un regalo o una torta hecha en casa cumplen la misma función en una celebración.",
      },
      buyers: {
        level: 3,
        text: "El cliente compara precios y fotos en redes antes de pedir, pero en fechas especiales decide por confianza y regatea menos.",
      },
      suppliers: {
        level: 2,
        text: "Harina, azúcar, huevos y lácteos se consiguen con muchos proveedores. El riesgo está en las alzas de insumos que dependen del trigo importado y del dólar.",
      },
    },
    kpis: ["Merma de producto", "Ticket promedio", "Pedidos entregados a tiempo", "Margen por línea", "Uso de la capacidad del taller"],
  },
  {
    id: "bebidas",
    description:
      "Compites con grandes embotelladoras que dominan la distribución, con marcas propias de supermercados y con pequeños productores de jugos. Se gana por volumen: el margen por botella es pequeño y hay que estar presente en miles de bodegas. El verano concentra las ventas y el resto del año la planta trabaja por debajo de su capacidad. La línea de prensado en frío vende poco, pero deja mejor margen y resiste mejor un precio alto.",
    customer:
      "Personas que compran por impulso en la bodega o el supermercado y familias que buscan opciones con menos azúcar. Valoran el precio, que la bebida esté fría y a la mano, y cada vez más que sea natural.",
    keys: [
      "Produce más para el primer trimestre, que es verano, y ajusta el volumen en invierno para no acumular stock que vence.",
      "Usa medios masivos y activaciones en el punto de venta: la marca se construye con presencia y degustación.",
      "Evalúa el Norte y el Oriente, donde el calor sostiene la demanda durante más meses del año.",
      "Invierte en eficiencia de procesos, porque con márgenes tan cortos cada céntimo de costo por botella cuenta.",
    ],
    mistakes: [
      "Pelear por precio en la línea de mayor volumen contra empresas que tienen mucha más escala.",
      "Mantener la producción de verano durante el invierno y terminar rematando o botando stock.",
      "Gastar todo el marketing en redes y descuidar el punto de venta, que es donde el cliente decide.",
    ],
    porter: {
      rivalry: {
        level: 5,
        text: "Las grandes embotelladoras tienen escala, distribución propia y presupuesto publicitario. Las marcas chicas pelean por el espacio que queda en el estante y en la congeladora.",
      },
      entrants: {
        level: 3,
        text: "Producir jugos es sencillo, pero conseguir registro sanitario, planta y sobre todo distribución a bodegas exige capital y tiempo.",
      },
      substitutes: {
        level: 5,
        text: "El agua, las gaseosas, los refrescos en sobre, la chicha hecha en casa y el jugo del mercado reemplazan tu producto por menos plata.",
      },
      buyers: {
        level: 4,
        text: "Supermercados y distribuidores exigen descuentos y condiciones de exhibición. El consumidor final cambia de marca por unos céntimos.",
      },
      suppliers: {
        level: 3,
        text: "La fruta depende de la cosecha y del clima, y un Fenómeno del Niño encarece el abastecimiento. Los envases los ofrecen pocos fabricantes.",
      },
    },
    kpis: ["Volumen vendido por canal", "Costo por botella", "Días de inventario", "Cobertura de puntos de venta", "Producto vencido o devuelto"],
  },
  {
    id: "restaurante",
    description:
      "La pollería es el restaurante más popular del Perú y por eso hay una en cada avenida: cadenas grandes, negocios familiares y cocinas que solo venden por delivery. El dinero se gana con rotación de mesas y con combos familiares, cuidando el costo de cada plato. Lo difícil es que el precio del pollo, la papa y el aceite cambia seguido, y que la cocina y el salón tienen un tope de atenciones por más demanda que exista.",
    customer:
      "Familias y grupos de amigos que salen a comer o piden por aplicativo. Valoran el sabor, la porción generosa, la rapidez y un precio que sientan justo.",
    keys: [
      "Ajusta la capacidad de cocina y salón a la demanda: una mesa vacía es una venta que no se recupera.",
      "Impulsa los combos familiares y el delivery con marketing digital para vender más sin ampliar el salón.",
      "Capacita al personal y paga sueldos competitivos, porque la rotación de mozos y cocineros baja la calidad.",
      "Prepara personal e insumos para el tercer trimestre, con Fiestas Patrias y el Día del Pollo a la Brasa.",
    ],
    mistakes: [
      "Subir de golpe el precio del cuarto de pollo cuando sube el insumo y perder clientes frente a la pollería del costado.",
      "Contratar poco personal para ahorrar y colapsar los fines de semana y feriados.",
      "Agregar muchos platos de carta sin tener una cocina capaz de atenderlos bien.",
    ],
    porter: {
      rivalry: {
        level: 5,
        text: "Hay pollerías en cada cuadra, desde cadenas conocidas hasta negocios familiares, y todas compiten con promociones y combos.",
      },
      entrants: {
        level: 4,
        text: "Abrir una pollería requiere un local, un horno y licencia municipal. Muchos entran cada año, aunque no todos logran sostenerse.",
      },
      substitutes: {
        level: 4,
        text: "El menú del día, el chifa, la comida rápida, la cevichería y cocinar en casa compiten por el mismo gasto familiar.",
      },
      buyers: {
        level: 3,
        text: "Cada cliente compra poco y no negocia, pero cambiar de local no le cuesta nada y una mala reseña en redes espanta a otros.",
      },
      suppliers: {
        level: 4,
        text: "El pollo lo abastecen pocos productores avícolas grandes y su precio fluctúa. La papa y el aceite suben con el clima, los bloqueos de carreteras y el tipo de cambio.",
      },
    },
    kpis: ["Ocupación de mesas", "Costo del plato", "Ticket promedio", "Tiempo de atención", "Pedidos por delivery"],
  },
  {
    id: "cafeteria",
    description:
      "El café de especialidad creció en Lima, Arequipa y Cusco con cafeterías independientes, cadenas y tostadores que venden directo. Se gana con un margen alto por taza y con el cliente que vuelve varias veces por semana, pero el alquiler y la planilla pesan mucho. Lo difícil es sostener la experiencia: un barista que se va o un servicio irregular se sienten de inmediato en las ventas. El invierno ayuda y el verano enfría la demanda de bebidas calientes.",
    customer:
      "Jóvenes profesionales, estudiantes, turistas y gente que trabaja desde su laptop. Valoran el sabor del café, el ambiente, la atención del barista y que el local les quede de paso.",
    keys: [
      "Invierte en calidad y en capacitación de baristas: aquí la calidad pesa casi tanto como el precio.",
      "Paga sueldos que retengan al equipo, porque el clima laboral se nota en la barra.",
      "Usa marketing digital y activaciones como catas y eventos para formar una comunidad de clientes frecuentes.",
      "Desarrolla la línea de café en grano y evalúa el Sur, donde el rubro tiene buena acogida.",
    ],
    mistakes: [
      "Competir por precio contra las cafeterías de cadena en lugar de diferenciarte por calidad.",
      "Ampliar mesas y personal sin tener todavía una clientela frecuente que cubra los gastos fijos.",
      "Descuidar los sánguches y la pastelería, que son los que suben el ticket de cada visita.",
    ],
    porter: {
      rivalry: {
        level: 4,
        text: "En los distritos con más movimiento hay varias cafeterías por cuadra, entre independientes y cadenas, todas buscando al mismo cliente frecuente.",
      },
      entrants: {
        level: 3,
        text: "La máquina, el local bien ubicado y el personal entrenado exigen una inversión mediana. Entrar es posible, hacerse un nombre toma tiempo.",
      },
      substitutes: {
        level: 4,
        text: "El café pasado de casa, el instantáneo de la oficina, las máquinas de cápsulas y las bebidas de las cadenas de comida rápida cuestan menos.",
      },
      buyers: {
        level: 2,
        text: "El cliente de especialidad busca una experiencia y acepta pagar más si el café lo vale. No negocia, aunque sí revisa reseñas.",
      },
      suppliers: {
        level: 2,
        text: "El Perú produce buen café en Cajamarca, Junín, San Martín, Cusco y Puno, con muchas cooperativas y productores. Las máquinas y sus repuestos sí son importados.",
      },
    },
    kpis: ["Atenciones por día", "Ticket promedio", "Clientes frecuentes", "Costo de planilla sobre ventas", "Merma de alimentos"],
  },
  {
    id: "moda",
    description:
      "Compites con talleres y galerías de Gamarra, cadenas de moda rápida, tiendas por departamento y ropa importada de bajo precio. Se gana acertando con la colección y vendiéndola antes de que pase de moda: lo que queda en almacén termina en remate. Los básicos mueven volumen con poco margen y la colección de diseño vende poco, pero construye marca. La campaña de fin de año concentra las ventas y el primer trimestre es el más flojo.",
    customer:
      "Jóvenes y familias que compran por redes, en galerías o en tiendas. En básicos miran el precio, y en prendas de diseño valoran el estilo, la calidad de la tela y la marca.",
    keys: [
      "Produce con cautela y repón lo que se vende, en lugar de apostar todo el taller a una sola colección.",
      "Construye marca con marketing digital: es el canal que mejor responde y la marca pesa mucho en este rubro.",
      "Sube la calidad para sostener precios en jeans, casacas y diseño, donde el cliente compara menos.",
      "Prepara inventario y caja para el cuarto trimestre, que es la campaña fuerte del año.",
    ],
    mistakes: [
      "Competir por precio en polos contra la ropa importada, que casi siempre llega más barata.",
      "Producir de más y quedarse con stock de una temporada que ya nadie quiere.",
      "Lanzar la colección de diseño sin haber invertido antes en marca ni en calidad.",
    ],
    porter: {
      rivalry: {
        level: 5,
        text: "Miles de confeccionistas, cadenas internacionales de moda rápida e importadores compiten a la vez, y los diseños se copian en pocas semanas.",
      },
      entrants: {
        level: 4,
        text: "Con unas máquinas, un taller alquilado y ventas por redes ya se está en el negocio. Gamarra facilita conseguir telas, avíos y servicios.",
      },
      substitutes: {
        level: 3,
        text: "La ropa de segunda mano, las compras en plataformas del extranjero y alargar el uso de lo que ya se tiene reducen la compra de prendas nuevas.",
      },
      buyers: {
        level: 4,
        text: "El cliente tiene opciones de sobra, compara precios en segundos y muchas veces espera los remates de fin de temporada para comprar.",
      },
      suppliers: {
        level: 3,
        text: "Hay muchos proveedores de tela, pero el algodón y los hilados cambian de precio con el mercado y el dólar. Los servicios de taller escasean en campaña.",
      },
    },
    kpis: ["Rotación de inventario", "Prendas vendidas a precio completo", "Margen por línea", "Costo por venta digital"],
  },
  {
    id: "minimarket",
    description:
      "El minimarket vende lo de todos los días con márgenes muy finos, así que el negocio vive de la rotación. Compites con bodegas de barrio, mercados de abastos, cadenas de tiendas de descuento y tiendas de conveniencia que abren cada vez más cerca. Lo difícil es comprar bien: si compras de más se inmoviliza la caja y los frescos se pierden, y si compras de menos el vecino se va a otra tienda. Las ventas son parejas todo el año, sin grandes campañas.",
    customer:
      "Vecinos del barrio que compran varias veces por semana en montos pequeños. Valoran la cercanía, el precio, encontrar siempre lo que buscan y poder pagar con Yape o Plin.",
    keys: [
      "Ajusta las compras a lo que de verdad rota y evita quedarte sin stock en productos de consumo diario.",
      "Mantén precios competitivos en abarrotes y busca el margen en frescos y preparados.",
      "Usa activaciones y venta directa en el barrio, que rinden más que los medios masivos.",
      "Controla los gastos fijos y la planilla: con márgenes tan cortos, un gasto de más borra la utilidad.",
    ],
    mistakes: [
      "Subir precios en productos que el cliente conoce de memoria y compara con la tienda de descuento.",
      "Llenar el almacén por aprovechar una oferta del proveedor y quedarse sin caja.",
      "Gastar en publicidad masiva para un negocio cuyo cliente vive a pocas cuadras.",
    ],
    porter: {
      rivalry: {
        level: 5,
        text: "Hay bodegas en cada cuadra, y las cadenas de tiendas de descuento y de conveniencia crecen rápido con precios bajos y locales modernos.",
      },
      entrants: {
        level: 5,
        text: "Cualquiera puede abrir una bodega en la sala de su casa con poco capital, y las cadenas tienen fondos para abrir muchos locales cada año.",
      },
      substitutes: {
        level: 3,
        text: "El mercado de abastos, el supermercado, el mayorista y los aplicativos de entrega rápida cubren la misma necesidad.",
      },
      buyers: {
        level: 4,
        text: "El cliente compra poco cada vez, pero conoce los precios y cambia de tienda por diferencias mínimas.",
      },
      suppliers: {
        level: 4,
        text: "Las grandes empresas de consumo masivo y sus distribuidores fijan precios y condiciones. Una tienda chica tiene poco espacio para negociar.",
      },
    },
    kpis: ["Venta diaria", "Ticket promedio", "Rotación de inventario", "Quiebres de stock", "Merma de frescos"],
  },
  {
    id: "farmacia",
    description:
      "Las boticas independientes compiten con cadenas grandes que compran a mejor precio y tienen locales en casi todos los distritos. Se gana con los genéricos, que rotan bien y dejan buen margen, y con la dermocosmética, mientras que los medicamentos de marca dejan menos. Es un rubro regulado: necesitas autorización sanitaria, un químico farmacéutico a cargo y cumplir las normas de Digemid. El invierno eleva la demanda por las enfermedades respiratorias.",
    customer:
      "Vecinos que llegan con una receta o una dolencia y quieren resolverla rápido. Valoran la confianza en quien los atiende, que haya stock, el precio y la cercanía.",
    keys: [
      "Asegura stock de genéricos antes del invierno, cuando sube la demanda.",
      "Capacita al personal de mostrador: la orientación y la confianza pesan más que la publicidad.",
      "Desarrolla dermocosmética y cuidado personal para mejorar el margen promedio de la botica.",
      "Cuida la reputación y el cumplimiento, porque una sanción sanitaria puede cerrar el local.",
    ],
    mistakes: [
      "Querer igualar todos los precios de las cadenas, que compran con descuentos por volumen.",
      "Comprar de más medicamentos de baja rotación que terminan venciendo en el almacén.",
      "Descuidar las exigencias sanitarias por ahorrar en personal calificado.",
    ],
    porter: {
      rivalry: {
        level: 4,
        text: "Las cadenas concentran buena parte del mercado y tienen poder de compra. Las boticas de barrio pelean con cercanía y trato personal.",
      },
      entrants: {
        level: 3,
        text: "Se necesita autorización sanitaria, un químico farmacéutico responsable y capital para el inventario. Se puede entrar, pero no es como abrir una bodega.",
      },
      substitutes: {
        level: 2,
        text: "Un medicamento recetado tiene pocos reemplazos. La medicina natural y los remedios caseros sustituyen solo en dolencias leves.",
      },
      buyers: {
        level: 3,
        text: "El cliente puede pedir el genérico y comparar precios entre boticas, pero cuando hay urgencia compra en la más cercana.",
      },
      suppliers: {
        level: 4,
        text: "Laboratorios y droguerías fijan precios y dan mejores condiciones a quien compra más. Muchos productos son importados y dependen del dólar.",
      },
    },
    kpis: ["Ticket promedio", "Participación de genéricos en la venta", "Quiebres de stock", "Productos por vencer", "Margen bruto"],
  },
  {
    id: "ecommerce",
    description:
      "Vendes por internet productos que en su mayoría son importados, compitiendo con marketplaces grandes, tiendas por departamento, plataformas del extranjero y vendedores por redes. El margen bruto parece bueno, pero la publicidad digital y el despacho se lo comen si no mides bien. Lo difícil es que conseguir cada cliente cuesta y muchos compran una sola vez. El cuarto trimestre, con las campañas de descuentos en línea y la Navidad, concentra las ventas.",
    customer:
      "Adultos jóvenes que compran desde el celular y comparan en varias páginas a la vez. Valoran el precio, la entrega rápida, la facilidad para devolver y la confianza en que el producto llegará.",
    keys: [
      "Concentra el marketing en digital y mide cuánto te cuesta cada venta frente al margen que deja.",
      "Desarrolla la marca propia, que tiene mejor margen y no se puede comparar precio contra precio.",
      "Compra inventario con anticipación para el cuarto trimestre y vigila el tipo de cambio.",
      "Invierte en satisfacción y despacho: el cliente que vuelve a comprar es el que hace rentable el negocio.",
    ],
    mistakes: [
      "Aumentar la pauta digital sin medir si el margen de cada pedido cubre el costo de conseguir al cliente.",
      "Quedarse sin stock en plena campaña de descuentos o llenarse de mercadería que no sale.",
      "Prometer plazos de entrega que el almacén y el courier no pueden cumplir.",
    ],
    porter: {
      rivalry: {
        level: 5,
        text: "Marketplaces, tiendas por departamento, plataformas del extranjero y miles de vendedores por redes ofrecen productos parecidos y pujan por los mismos anuncios.",
      },
      entrants: {
        level: 5,
        text: "Abrir una tienda en línea toma pocos días y poca inversión. Cualquiera puede importar un lote pequeño y venderlo por redes.",
      },
      substitutes: {
        level: 3,
        text: "Las galerías, los centros comerciales y los mercados siguen siendo la opción de quien quiere ver el producto y llevárselo el mismo día.",
      },
      buyers: {
        level: 5,
        text: "El cliente compara precios en segundos, no tiene lealtad y puede reclamar ante Indecopi o devolver el producto si algo falla.",
      },
      suppliers: {
        level: 3,
        text: "Hay muchos fabricantes en Asia para elegir, pero las plataformas de publicidad, las pasarelas de pago y los couriers fijan sus tarifas sin negociar con tiendas chicas.",
      },
    },
    kpis: ["Costo de adquisición por cliente", "Tasa de conversión", "Ticket promedio", "Tasa de recompra", "Pedidos entregados a tiempo"],
  },
  {
    id: "inmobiliaria",
    description:
      "Desarrollas edificios y vendes pocos departamentos de monto alto, compitiendo con inmobiliarias grandes y medianas que lanzan proyectos en los mismos distritos. Primero pagas el terreno y la obra con financiamiento, y la utilidad recién aparece cuando vendes. Lo difícil es el capital inmovilizado y la dependencia del crédito hipotecario: si sube la tasa, las familias califican por menos y las ventas se frenan. Un departamento sin vender cuesta intereses cada trimestre.",
    customer:
      "Familias jóvenes que compran su primera vivienda con crédito hipotecario e inversionistas que buscan renta. Valoran la ubicación, la cuota mensual, los acabados y la seriedad de la inmobiliaria.",
    keys: [
      "Construye según lo que puedes vender: cada departamento en stock inmoviliza caja y genera intereses.",
      "Planifica el financiamiento con préstamos de plazo adecuado para no caer en sobregiro a mitad de obra.",
      "Invierte en marca y reputación, porque el comprador te entrega los ahorros de muchos años.",
      "Usa investigación de mercados antes de construir dúplex y penthouse, que tienen pocos compradores.",
    ],
    mistakes: [
      "Construir demasiadas unidades a la vez confiando en que el mercado las absorberá.",
      "Bajar precios para vender rápido sin calcular que el margen por unidad ya es ajustado.",
      "Repartir dividendos con caja que en realidad está comprometida con la obra y la deuda.",
    ],
    porter: {
      rivalry: {
        level: 4,
        text: "En los distritos con más demanda hay varios proyectos por zona, con departamentos parecidos y descuentos en ferias inmobiliarias.",
      },
      entrants: {
        level: 2,
        text: "Se necesita mucho capital, un terreno saneado, licencias municipales y respaldo bancario. Pocos pueden entrar en serio.",
      },
      substitutes: {
        level: 3,
        text: "Alquilar, comprar un departamento de segunda, construir en el terreno de la familia o comprar un lote son alternativas reales.",
      },
      buyers: {
        level: 3,
        text: "El comprador visita varios proyectos y negocia acabados o descuentos, pero depende de que el banco le apruebe el crédito.",
      },
      suppliers: {
        level: 4,
        text: "El terreno bien ubicado es escaso y caro. El cemento, el acero y el financiamiento bancario están en manos de pocos actores fuertes.",
      },
    },
    kpis: ["Unidades separadas y vendidas", "Visitas a la sala de ventas", "Stock sin vender", "Avance de obra", "Caja disponible"],
  },
  {
    id: "lotes",
    description:
      "Compras terrenos grandes, los habilitas con pistas, agua y luz, y los vendes por lotes con facilidades de pago. Compites con otras lotizadoras formales y con la venta informal de terrenos sin papeles, que es más barata y confunde al comprador. Ganas en la diferencia entre el costo del terreno habilitado y el precio de cada lote. Lo difícil es la cobranza: vendes hoy y cobras en cuotas, así que puedes tener utilidad en el papel y la caja vacía.",
    customer:
      "Familias que quieren un terreno propio para construir poco a poco y pequeños inversionistas. Valoran la cuota inicial baja, las facilidades de pago y la seguridad de que el lote tiene título inscrito.",
    keys: [
      "Ofrece crédito, que es lo que más mueve la venta, pero reserva caja para financiar lo que todavía no cobras.",
      "Invierte con fuerza en marketing digital y en activaciones en el terreno para generar visitas.",
      "Expande a regiones: el Norte y el Sur responden mejor aquí que en la mayoría de rubros.",
      "Cuida la reputación con papeles en regla, porque el comprador desconfía de los lotes sin título.",
    ],
    mistakes: [
      "Vender todo a plazos sin tener financiamiento propio y terminar en sobregiro.",
      "Habilitar más lotes de los que el equipo de ventas puede colocar.",
      "Confundir utilidad con caja y repartir dividendos con cuentas que todavía no se cobran.",
    ],
    porter: {
      rivalry: {
        level: 3,
        text: "Hay varias lotizadoras en cada zona de expansión, pero cada proyecto tiene una ubicación distinta y eso reduce la comparación directa.",
      },
      entrants: {
        level: 3,
        text: "Hace falta capital para el terreno y la habilitación, además de trámites largos. La venta informal, en cambio, entra sin cumplir nada.",
      },
      substitutes: {
        level: 3,
        text: "Un departamento, una casa de segunda, ampliar la casa familiar o ahorrar en una caja municipal compiten por los mismos ahorros.",
      },
      buyers: {
        level: 2,
        text: "Cada familia compra un solo lote y no tiene fuerza para imponer el precio. Lo que pide son facilidades en la cuota.",
      },
      suppliers: {
        level: 3,
        text: "Los dueños de terrenos grandes saben lo que vale su tierra cerca de la ciudad. Los contratistas de habilitación son varios y se pueden comparar.",
      },
    },
    kpis: ["Lotes vendidos", "Morosidad de la cartera", "Cuotas cobradas", "Visitas al proyecto", "Costo por prospecto"],
  },
  {
    id: "autos",
    description:
      "Importas autos en dólares y los vendes con un margen por unidad muy corto. Compites con concesionarias de otras marcas, con marcas nuevas de origen asiático que llegan con precios agresivos y con el mercado de autos usados. En la vida real buena parte de la rentabilidad viene del financiamiento, los seguros y la posventa. Lo difícil es el stock: cada auto parado en el patio es capital inmovilizado, y un salto del tipo de cambio encarece la reposición.",
    customer:
      "Familias, profesionales y pequeños empresarios que compran casi siempre con crédito vehicular. Valoran la cuota mensual, el respaldo de la marca, el consumo de combustible y el servicio posventa.",
    keys: [
      "Importa solo lo que puedes vender en el trimestre: el stock en el patio cuesta intereses.",
      "Vigila el tipo de cambio antes de fijar precios, porque casi todo tu costo está en dólares.",
      "Ofrece facilidades de crédito, que pesan mucho en la decisión de compra.",
      "Combina medios masivos con digital y apuesta por las SUV, la línea que más crece.",
    ],
    mistakes: [
      "Dar descuentos grandes para cerrar ventas cuando el margen por auto ya es mínimo.",
      "Llenar el patio de unidades justo antes de una subida del dólar o de las tasas de interés.",
      "Financiar el inventario con sobregiro en lugar de un préstamo planificado.",
    ],
    porter: {
      rivalry: {
        level: 4,
        text: "Hay muchas marcas y concesionarias con modelos parecidos, y las marcas nuevas de origen asiático presionan los precios hacia abajo.",
      },
      entrants: {
        level: 2,
        text: "Necesitas la representación de una marca, un local grande, taller y capital para el stock. La barrera de entrada es alta.",
      },
      substitutes: {
        level: 4,
        text: "El auto usado, la moto, el taxi por aplicativo y el transporte público son opciones reales para quien duda de endeudarse.",
      },
      buyers: {
        level: 3,
        text: "El cliente cotiza en varias concesionarias y pide accesorios o descuentos, pero depende de que le aprueben el crédito.",
      },
      suppliers: {
        level: 5,
        text: "La marca que representas fija precios, metas de compra y estándares del local. Cambiar de marca es casi empezar de nuevo.",
      },
    },
    kpis: ["Unidades vendidas", "Días de inventario en patio", "Margen por unidad", "Créditos aprobados", "Cotizaciones atendidas"],
  },
  {
    id: "software",
    description:
      "Vendes licencias por suscripción a empresas que quieren ordenar su facturación, sus ventas o su gestión. Compites con proveedores globales, desarrolladores locales y la hoja de cálculo de toda la vida. El ingreso es recurrente: atender una licencia más casi no cuesta, pero el equipo de desarrollo y soporte es un gasto fijo alto. Lo difícil es que ganar un cliente toma meses de venta y perderlo toma un mal trimestre de soporte.",
    customer:
      "Gerentes y dueños de empresas que buscan ordenar su operación y cumplir con la SUNAT. Valoran que el sistema no se caiga, el soporte rápido, la facilidad de uso y una implementación que no paralice el negocio.",
    keys: [
      "Cuida la retención con calidad y soporte: cada cliente que se queda paga todos los trimestres.",
      "Combina marketing digital con venta directa, los dos canales que mejor funcionan en este rubro.",
      "Paga bien y capacita a tu equipo, porque el talento técnico es escaso y la competencia lo busca.",
      "Haz crecer el Plan Corporativo, que es menos sensible al precio y tiene la mejor retención.",
    ],
    mistakes: [
      "Bajar el precio para captar clientes que luego abandonan al primer problema.",
      "Vender más licencias de las que el equipo de soporte puede atender.",
      "Recortar sueldos o capacitación y perder a los desarrolladores que sostienen el producto.",
    ],
    porter: {
      rivalry: {
        level: 4,
        text: "Compiten proveedores globales con mucha inversión y empresas locales que conocen la norma peruana. Las funciones se copian rápido.",
      },
      entrants: {
        level: 4,
        text: "Con un equipo pequeño y servicios en la nube se puede lanzar un producto. Lo caro es conseguir clientes y ganarse su confianza.",
      },
      substitutes: {
        level: 3,
        text: "La hoja de cálculo, el sistema hecho a medida y el apoyo del contador externo siguen siendo el reemplazo en muchas pymes.",
      },
      buyers: {
        level: 3,
        text: "Las empresas grandes negocian precio y exigen adaptaciones. Una vez que cargan sus datos, cambiar de sistema les cuesta tiempo y plata.",
      },
      suppliers: {
        level: 3,
        text: "La infraestructura en la nube se paga en dólares, aunque hay varios proveedores. Lo que de verdad escasea son los programadores con experiencia.",
      },
    },
    kpis: ["Tasa de abandono", "Ingreso recurrente mensual", "Licencias nuevas", "Tiempo de respuesta de soporte", "Costo de adquisición por cliente"],
  },
  {
    id: "telecom",
    description:
      "Es un mercado de pocos operadores grandes que compiten a nivel nacional, con una red que exige inversiones enormes en antenas, fibra y espectro. El ingreso es mensual y recurrente, así que la clave está en cuántas líneas se quedan contigo. La portabilidad permite al cliente cambiar de operador conservando su número, lo que alimenta la guerra de planes y promociones. OSIPTEL supervisa la calidad del servicio y la atención de reclamos.",
    customer:
      "Personas y hogares que comparan cuántos datos reciben por lo que pagan. Valoran la cobertura, la velocidad, el precio del plan y que los reclamos se resuelvan sin dar vueltas.",
    keys: [
      "Amplía la capacidad de red antes de captar más líneas, porque una red saturada dispara el abandono.",
      "Invierte en medios masivos, el canal que más rinde en este rubro, y sostén la marca en el tiempo.",
      "Haz crecer la fibra para el hogar, la línea con mejor retención y mayor crecimiento.",
      "Financia la red con deuda de largo plazo y cuida la caja: los activos son muy pesados.",
    ],
    mistakes: [
      "Entrar a la guerra de precios en el plan control, donde el cliente es el más sensible y el menos fiel.",
      "Captar clientes con promociones sin tener red suficiente para atenderlos bien.",
      "Descuidar la atención de reclamos y acumular quejas que dañan la reputación.",
    ],
    porter: {
      rivalry: {
        level: 5,
        text: "Pocos operadores grandes pelean por los mismos clientes con promociones constantes, y la portabilidad hace que cambiarse sea sencillo.",
      },
      entrants: {
        level: 1,
        text: "Se necesita concesión, espectro y una red que cuesta muchísimo dinero. Casi nadie puede entrar desde cero.",
      },
      substitutes: {
        level: 2,
        text: "Las llamadas y mensajes por aplicativos reemplazaron a la voz tradicional, pero igual necesitan una conexión de datos o de fibra.",
      },
      buyers: {
        level: 4,
        text: "Cada cliente pesa poco, pero cambia de operador sin perder su número y puede llevar su reclamo hasta OSIPTEL.",
      },
      suppliers: {
        level: 4,
        text: "Los equipos de red los fabrican pocas empresas en el mundo y se pagan en dólares. El espectro lo asigna el Estado.",
      },
    },
    kpis: ["Tasa de abandono", "Portabilidad neta", "Ingreso promedio por línea", "Reclamos recibidos", "Uso de la capacidad de red"],
  },
  {
    id: "consultoria",
    description:
      "Vendes el tiempo y el criterio de consultores a empresas que necesitan ordenar su gestión. Compites con firmas internacionales, consultoras locales pequeñas y profesionales independientes que cobran menos. Casi todo el costo es planilla: las horas del equipo son tu capacidad y una hora sin vender no se recupera. Lo difícil es que los proyectos grandes son pocos y no se repiten, mientras que la asesoría continua a pymes da estabilidad con montos menores.",
    customer:
      "Dueños y gerentes de pymes y empresas medianas que suelen llegar por recomendación. Valoran la experiencia demostrada, los resultados concretos y la confianza personal con el consultor.",
    keys: [
      "Construye marca y reputación: en este rubro pesan más que cualquier campaña.",
      "Prioriza la venta directa y las activaciones, como charlas y eventos empresariales.",
      "Retén a tus consultores con buen sueldo y capacitación, porque cuando se van se llevan clientes.",
      "Equilibra las asesorías continuas, que dan caja estable, con proyectos grandes que elevan el ingreso.",
    ],
    mistakes: [
      "Aceptar más proyectos de los que el equipo puede atender y entregar trabajos mediocres.",
      "Cobrar barato para ganar el contrato y no cubrir las horas reales que demanda.",
      "Depender de uno o dos clientes grandes que además pagan a plazos.",
    ],
    porter: {
      rivalry: {
        level: 3,
        text: "Hay muchas consultoras, pero cada una se diferencia por su especialidad y sus contactos. Se compite más por confianza que por precio.",
      },
      entrants: {
        level: 5,
        text: "Cualquier profesional con experiencia puede ofrecer asesoría desde su casa, sin inversión ni licencia especial.",
      },
      substitutes: {
        level: 4,
        text: "La empresa puede contratar un gerente, resolverlo con su contador, capacitar a su gente o apoyarse en herramientas de inteligencia artificial.",
      },
      buyers: {
        level: 4,
        text: "El cliente pide varias propuestas, negocia honorarios y plazos de pago, y corta el servicio cuando ajusta su presupuesto.",
      },
      suppliers: {
        level: 1,
        text: "Casi no dependes de proveedores externos: una oficina, laptops y algunas licencias. Tu recurso crítico es tu propio equipo.",
      },
    },
    kpis: ["Horas facturadas sobre horas disponibles", "Propuestas ganadas", "Contratos renovados", "Días de cobranza"],
  },
  {
    id: "agencia",
    description:
      "Manejas redes sociales, pauta digital y producción para empresas que pagan una mensualidad. Compites con otras agencias, con freelancers que cobran una fracción y con los equipos internos que arman los propios clientes. Se gana manteniendo cuentas estables y aprovechando bien las horas del equipo, porque casi todo el costo es planilla. Lo difícil es que el cliente exige resultados medibles cada mes y cambia de agencia con facilidad si no los ve.",
    customer:
      "Gerentes de marketing y dueños de pymes que quieren vender más por canales digitales. Valoran los resultados medibles, la creatividad, la rapidez de respuesta y los reportes claros.",
    keys: [
      "Cuida la calidad del servicio para retener cuentas: reemplazar un cliente cuesta más que conservarlo.",
      "Usa marketing digital y venta directa para captar cuentas, mostrando resultados de tus propios clientes.",
      "Dimensiona el equipo según las cuentas que atiendes, sin saturar a tu gente.",
      "Haz crecer las campañas de pauta digital, que pagan mejor por cuenta que la gestión de redes.",
    ],
    mistakes: [
      "Aceptar cuentas a precio bajo que consumen más horas de las que pagan.",
      "Sobrecargar al equipo creativo hasta que renuncia y se lleva el conocimiento del cliente.",
      "Dar crédito a clientes que demoran el pago mientras tu planilla vence cada mes.",
    ],
    porter: {
      rivalry: {
        level: 5,
        text: "Hay agencias de todos los tamaños y freelancers ofreciendo lo mismo. El cliente recibe propuestas nuevas todo el tiempo.",
      },
      entrants: {
        level: 5,
        text: "Con una laptop, conocimientos de pauta y un par de clientes ya existe una agencia. No hay barreras de capital ni de licencias.",
      },
      substitutes: {
        level: 4,
        text: "Un encargado de redes en planilla, las herramientas de diseño con plantillas y la inteligencia artificial permiten hacerlo dentro de la empresa.",
      },
      buyers: {
        level: 4,
        text: "El cliente mide resultados mes a mes, compara tarifas y puede terminar el contrato con poco aviso.",
      },
      suppliers: {
        level: 3,
        text: "Las plataformas de publicidad fijan sus reglas y costos sin negociar con nadie. El talento creativo es móvil y muchas veces prefiere trabajar por su cuenta.",
      },
    },
    kpis: ["Cuentas activas", "Retención de cuentas", "Horas dedicadas por cuenta", "Rentabilidad por cuenta", "Días de cobranza"],
  },
  {
    id: "agroexport",
    description:
      "Produces fruta fresca en la costa y la vendes a importadores y cadenas de supermercados del exterior. El Perú compite con otros países productores y gana cuando llega en la ventana en que ellos no tienen fruta, que en el juego cae en la segunda mitad del año. Cobras en dólares y pagas buena parte de tus costos en soles, así que un tipo de cambio alto te favorece. Lo difícil es el riesgo: un Fenómeno del Niño, una plaga o un atraso en el puerto pueden arruinar la campaña.",
    customer:
      "Importadores y cadenas de supermercados del exterior que compran por contenedor. Valoran el calibre, la condición de la fruta al llegar, las certificaciones y el cumplimiento exacto de las fechas.",
    keys: [
      "Planifica la producción para el tercer y cuarto trimestre, cuando la demanda es mayor.",
      "Invierte en calidad: la fruta premium se paga mejor y la que llega en mal estado se castiga o se rechaza.",
      "Prioriza la venta directa y las activaciones en ferias del sector por encima de la publicidad.",
      "Maneja la caja con cuidado, porque pagas la campaña hoy y cobras a plazos.",
    ],
    mistakes: [
      "Producir al máximo sin tener compradores asegurados y rematar fruta que se malogra.",
      "Financiar la campaña con sobregiro en vez de un préstamo planificado.",
      "Recortar la inversión en calidad y perder al importador que exige certificaciones.",
    ],
    porter: {
      rivalry: {
        level: 4,
        text: "Compites con exportadores peruanos grandes y con otros países productores. Cuando todos cosechan a la vez, el precio en destino cae.",
      },
      entrants: {
        level: 2,
        text: "Se necesitan tierras con agua, años de espera hasta la primera cosecha, planta de empaque y certificaciones sanitarias. La inversión es alta.",
      },
      substitutes: {
        level: 3,
        text: "El consumidor del exterior puede elegir otra fruta de temporada o la del productor de su propio país cuando está disponible.",
      },
      buyers: {
        level: 5,
        text: "Pocos importadores y cadenas grandes compran mucho volumen, fijan estándares y descuentan por cualquier problema de calidad.",
      },
      suppliers: {
        level: 3,
        text: "Fertilizantes, empaques y fletes marítimos siguen precios internacionales. La mano de obra escasea en plena cosecha y el agua depende del riego disponible.",
      },
    },
    kpis: ["Cajas exportadas", "Precio promedio por caja", "Fruta descartada", "Costo por caja", "Tipo de cambio"],
  },
  {
    id: "educacion",
    description:
      "Los institutos compiten con universidades de bajo costo, otros institutos, academias y cursos en línea. El ingreso viene de las pensiones, así que el negocio depende de cuántos alumnos se matriculan en la admisión y cuántos siguen pagando cada ciclo. Los docentes y los locales son un costo fijo alto: un aula a medio llenar cuesta casi lo mismo que una llena. Lo difícil es la deserción, que suele venir por problemas económicos o por una experiencia que no cumplió lo prometido.",
    customer:
      "Jóvenes que terminan el colegio, sus padres (que muchas veces pagan) y adultos que trabajan y quieren mejorar sus ingresos. Valoran la empleabilidad, el prestigio, la pensión y los horarios.",
    keys: [
      "Invierte en marca y calidad académica: pesan más que el precio al elegir dónde estudiar.",
      "Concentra el marketing en el primer trimestre, cuando se define la admisión del año.",
      "Reduce la deserción con buenos docentes y alumnos satisfechos: retener cuesta menos que captar.",
      "Desarrolla cursos cortos y programas para empresas para aprovechar aulas en horarios libres.",
    ],
    mistakes: [
      "Matricular más alumnos de los que soportan las aulas y los docentes, y bajar la calidad.",
      "Bajar pensiones para llenar aulas y luego no poder pagar buenos profesores.",
      "Gastar en publicidad de admisión sin medir cuántos alumnos abandonan en el primer ciclo.",
    ],
    porter: {
      rivalry: {
        level: 4,
        text: "Institutos, universidades de bajo costo y academias pelean por los mismos egresados de colegio con becas y descuentos.",
      },
      entrants: {
        level: 3,
        text: "Un instituto formal necesita licenciamiento, local e inversión. Una academia o un curso en línea puede empezar con mucho menos.",
      },
      substitutes: {
        level: 4,
        text: "Los cursos en línea, las certificaciones cortas, la universidad y formarse en el mismo trabajo compiten con la carrera técnica.",
      },
      buyers: {
        level: 3,
        text: "El alumno compara pensiones y puede trasladarse, pero cambiarse a mitad de carrera le cuesta tiempo y convalidaciones.",
      },
      suppliers: {
        level: 3,
        text: "Los buenos docentes son escasos en algunas especialidades y enseñan en varias instituciones. Los locales bien ubicados tienen alquileres altos.",
      },
    },
    kpis: ["Alumnos matriculados", "Tasa de deserción", "Morosidad de pensiones", "Ocupación de aulas", "Costo por alumno captado"],
  },
  {
    id: "gimnasio",
    description:
      "Compites con cadenas de gimnasios de bajo costo, gimnasios de barrio, estudios especializados y entrenadores que trabajan en parques o por video. El ingreso es la membresía mensual, con gastos fijos altos en alquiler, equipos y entrenadores. Enero y el verano llenan la sala con gente que llega con propósitos de año nuevo, y a los pocos meses muchos dejan de asistir y de pagar. El negocio se define en cuántos socios logras conservar.",
    customer:
      "Jóvenes y adultos que quieren verse y sentirse mejor. Valoran la cercanía a su casa o trabajo, el precio, que los equipos estén disponibles y el trato de los entrenadores.",
    keys: [
      "Aprovecha el primer trimestre para captar socios con marketing digital y activaciones.",
      "Invierte en calidad y en entrenadores para mejorar la retención el resto del año.",
      "Cuida el aforo: una sala saturada en hora punta hace que el socio no renueve.",
      "Empuja las clases grupales y el entrenamiento personalizado, que suben el ingreso por socio.",
    ],
    mistakes: [
      "Vender membresías sin límite en verano y saturar la sala.",
      "Pelear por precio contra las cadenas de bajo costo, que tienen más escala.",
      "Gastar en captar socios nuevos y no hacer nada por los que están dejando de asistir.",
    ],
    porter: {
      rivalry: {
        level: 4,
        text: "Las cadenas de bajo costo abrieron locales en muchos distritos y ciudades, y presionan el precio de la membresía estándar.",
      },
      entrants: {
        level: 3,
        text: "Un gimnasio completo exige un local grande y equipos caros. Un estudio pequeño de entrenamiento funcional necesita bastante menos.",
      },
      substitutes: {
        level: 5,
        text: "Correr en el parque, las losas deportivas, los videos de rutinas, el baile y el fulbito cumplen el mismo fin gratis o por muy poco.",
      },
      buyers: {
        level: 3,
        text: "El socio no negocia la tarifa, pero deja de pagar cuando quiere y las promociones de la competencia lo tientan.",
      },
      suppliers: {
        level: 2,
        text: "Los equipos son importados y se compran pocas veces. El costo que más pesa es el alquiler del local, que sí se negocia con el propietario.",
      },
    },
    kpis: ["Socios activos", "Tasa de abandono", "Asistencia en hora punta", "Ingreso por socio", "Altas del mes"],
  },
  {
    id: "turismo",
    description:
      "Armas y vendes tours y paquetes combinando transporte, hoteles, guías y entradas de terceros. Compites con otras agencias, con plataformas de reserva en línea y con el viajero que organiza todo por su cuenta. Tu margen sale de servicios que no controlas, así que ganas con volumen en tours y con valor agregado en viajes a medida. La temporada alta llega a mitad de año, y un paro, un bloqueo o lluvias fuertes pueden cerrar la ruta de un día para otro.",
    customer:
      "Turistas extranjeros, familias peruanas en feriados largos y empresas que organizan viajes. Valoran la seguridad, que todo salga como se prometió y las reseñas de otros viajeros.",
    keys: [
      "Concentra el marketing en digital, donde el viajero busca, compara y lee reseñas.",
      "Prepara capacidad de operación para el tercer trimestre y cuida la caja en los meses bajos.",
      "Abre el Sur, la región con mayor afinidad para este rubro por Cusco, Arequipa y Puno.",
      "Invierte en calidad y satisfacción: una mala experiencia se publica y frena las ventas.",
    ],
    mistakes: [
      "Vender más cupos de los que puedes operar bien en temporada alta.",
      "Competir solo por precio en tours de día completo, donde el margen ya es bajo.",
      "No guardar caja para devoluciones y reprogramaciones cuando se cierra una ruta.",
    ],
    porter: {
      rivalry: {
        level: 4,
        text: "Hay muchísimas agencias formales e informales ofreciendo los mismos destinos, sobre todo en Cusco, y compiten por precio.",
      },
      entrants: {
        level: 4,
        text: "Una agencia se abre con una oficina pequeña, una página web y contactos con operadores. La informalidad es alta.",
      },
      substitutes: {
        level: 4,
        text: "El viajero puede reservar vuelos, hoteles y entradas directamente por internet sin pasar por una agencia.",
      },
      buyers: {
        level: 3,
        text: "El turista compara en plataformas y reseñas, pero paga más por seguridad y por no complicarse en un lugar que no conoce.",
      },
      suppliers: {
        level: 5,
        text: "Las entradas a Machu Picchu tienen cupo diario, y los trenes y vuelos dependen de pocos operadores. Tú te adaptas a sus tarifas y horarios.",
      },
    },
    kpis: ["Pasajeros atendidos", "Ocupación de salidas", "Calificación en reseñas", "Margen por paquete", "Cancelaciones y reprogramaciones"],
  },
  {
    id: "logistica",
    description:
      "Mueves paquetes y mercadería para empresas y tiendas en línea. Compites con couriers grandes, empresas de transporte interprovincial que llevan encomiendas, aplicativos de reparto y transportistas informales. El negocio gana con rutas llenas: un camión a media carga gasta casi lo mismo que uno completo. El combustible, los peajes y la planilla pesan mucho, y en la campaña de fin de año la demanda supera la capacidad de reparto.",
    customer:
      "Tiendas en línea, distribuidoras y empresas que necesitan entregar a sus propios clientes. Valoran la entrega a tiempo, el seguimiento del envío, que nada se pierda o dañe y una tarifa competitiva.",
    keys: [
      "Dimensiona flota y personal antes del cuarto trimestre, que es el pico del año.",
      "Invierte en eficiencia de procesos para bajar el costo de cada envío.",
      "Prioriza la venta directa a empresas: un contrato de distribución vale más que muchos envíos sueltos.",
      "Desarrolla almacenaje y preparación de pedidos, la línea con mejor margen.",
    ],
    mistakes: [
      "Aceptar más envíos de los que la flota puede entregar y fallar en plena campaña.",
      "Bajar tarifas para ganar volumen sin calcular el combustible y los peajes.",
      "Dar crédito a clientes grandes sin tener caja para pagar planilla y combustible.",
    ],
    porter: {
      rivalry: {
        level: 4,
        text: "Couriers formales, empresas de transporte interprovincial, aplicativos de reparto e informales compiten con tarifas muy parecidas.",
      },
      entrants: {
        level: 4,
        text: "Con una moto o una furgoneta cualquiera ofrece reparto en la ciudad. Armar una red nacional con almacenes sí requiere capital.",
      },
      substitutes: {
        level: 2,
        text: "La empresa puede repartir con flota propia o pedir al cliente que recoja en tienda, pero alguien igual tiene que mover la mercadería.",
      },
      buyers: {
        level: 4,
        text: "Los clientes con mucho volumen negocian tarifas, exigen penalidades por atraso y reparten sus envíos entre varios operadores.",
      },
      suppliers: {
        level: 3,
        text: "El precio del combustible no se negocia y cambia con el mercado internacional. Vehículos, repuestos y llantas dependen del dólar.",
      },
    },
    kpis: ["Entregas a tiempo", "Costo por envío", "Uso de la capacidad de flota", "Envíos con reclamo", "Días de cobranza"],
  },
  {
    id: "limpieza",
    description:
      "Prestas servicios de limpieza y mantenimiento a oficinas, plantas, clínicas y entidades del Estado. Se entra por contrato privado o por licitaciones públicas, donde suele pesar mucho el precio entre quienes cumplen las bases. La planilla es casi todo el costo, con sus gratificaciones, CTS y EsSalud, así que el margen es corto y un mal cálculo convierte el contrato en pérdida. Además los clientes pagan a plazos y tú pagas sueldos cada mes.",
    customer:
      "Administradores de edificios, jefes de servicios generales y entidades públicas. Valoran el cumplimiento, el personal estable y en planilla, el precio y que no les generes contingencias laborales.",
    keys: [
      "Calcula el precio con la planilla completa y sus beneficios antes de presentar tu oferta.",
      "Vende por canal directo: las visitas, las propuestas y las relaciones son las que cierran contratos.",
      "Asegura financiamiento para cubrir sueldos mientras esperas el pago del cliente.",
      "Cuida el clima laboral y la capacitación, porque la rotación de operarios daña el servicio.",
    ],
    mistakes: [
      "Ganar contratos con precios que no cubren los beneficios sociales del personal.",
      "Crecer en contratos sin caja para pagar la planilla mientras llega la cobranza.",
      "Ahorrar con personal fuera de planilla y exponerse a una multa de SUNAFIL.",
    ],
    porter: {
      rivalry: {
        level: 5,
        text: "Hay muchas empresas ofreciendo un servicio muy parecido, y en los concursos la diferencia entre ganar y perder suele ser mínima.",
      },
      entrants: {
        level: 4,
        text: "Se empieza con poco capital: personal, insumos y equipos básicos. Para contratar con el Estado sí se exige experiencia acreditada.",
      },
      substitutes: {
        level: 3,
        text: "El cliente puede hacer la limpieza con personal propio. Muchos prefieren tercerizar para no cargar con esa planilla.",
      },
      buyers: {
        level: 5,
        text: "Empresas grandes y entidades públicas imponen bases, penalidades y plazos de pago. Al vencer el contrato vuelven a concursar.",
      },
      suppliers: {
        level: 1,
        text: "Insumos de limpieza, uniformes y equipos se consiguen con muchos proveedores y a precios fáciles de comparar.",
      },
    },
    kpis: ["Contratos vigentes", "Costo de planilla sobre ventas", "Días de cobranza", "Rotación de operarios", "Penalidades aplicadas"],
  },
  {
    id: "maquinaria",
    description:
      "Fabricas y vendes equipos de lavandería industrial a hoteles, clínicas, lavanderías y campamentos mineros. Compites con equipos importados de marcas reconocidas, con importadores de equipos económicos y con el mercado de segunda. Son pocas ventas de monto alto, con un proceso largo de visitas, cotizaciones y pruebas. Lo difícil es que el cliente pide crédito y garantía, y que el acero, los motores y los controles que usas se pagan en dólares.",
    customer:
      "Dueños de lavanderías, jefes de mantenimiento de hoteles y clínicas, y áreas de compras de empresas. Valoran la durabilidad, el servicio técnico cercano, los repuestos disponibles y las facilidades de pago.",
    keys: [
      "Invierte en calidad: un equipo que falla en el local del cliente daña tu reputación por años.",
      "Apuesta por la venta directa y las activaciones en ferias y demostraciones, no por medios masivos.",
      "Ofrece crédito con prudencia y asegura caja para financiar el plazo de cobranza.",
      "Produce según los pedidos esperados: un equipo en almacén inmoviliza mucho capital.",
    ],
    mistakes: [
      "Bajar el precio para igualar al equipo importado económico en lugar de vender respaldo y servicio.",
      "Fabricar para stock sin pedidos firmes y quedarse con equipos caros en el almacén.",
      "Vender a crédito sin evaluar al cliente y terminar persiguiendo cobranzas.",
    ],
    porter: {
      rivalry: {
        level: 3,
        text: "Son pocos fabricantes e importadores especializados. Se compite por respaldo técnico y relación con el cliente más que por publicidad.",
      },
      entrants: {
        level: 2,
        text: "Fabricar exige planta, técnicos calificados y años de reputación. Importar equipos es más fácil, aunque sin servicio técnico cuesta sostenerse.",
      },
      substitutes: {
        level: 3,
        text: "El cliente puede reparar su equipo antiguo, comprar uno de segunda o tercerizar el lavado con una lavandería industrial.",
      },
      buyers: {
        level: 4,
        text: "Cada venta es grande, el cliente pide varias cotizaciones y negocia precio, plazo de pago, garantía e instalación.",
      },
      suppliers: {
        level: 3,
        text: "El acero inoxidable, los motores y los controles electrónicos son importados y siguen al dólar. Hay varios proveedores, pero pocos con stock local.",
      },
    },
    kpis: ["Cotizaciones emitidas", "Tasa de cierre de ventas", "Equipos en producción", "Días de cobranza", "Atenciones de servicio técnico"],
  },
];

export default data;
