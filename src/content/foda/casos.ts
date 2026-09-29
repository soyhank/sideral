import type { FodaCase } from "../types";

const data: FodaCase[] = [
  // ───────── Pastelería ─────────
  {
    id: "foda-pasteleria-1",
    company: "Dulce Alba",
    industry: "pasteleria",
    context:
      "Rosa Quispe abrió hace ocho meses una pastelería de tortas por encargo en su casa de El Tambo, en Huancayo. Trabaja con una ayudante y recibe los pedidos por WhatsApp e Instagram. Quiere alquilar su primer local con vitrina antes de la campaña del Día de la Madre.",
    items: [
      { text: "La pastelería no lleva registro de costos por receta y fija sus precios al cálculo.", kind: "D", why: "Es interno: es una falla de gestión que la propia empresa puede corregir." },
      { text: "La pastelería cobra con Yape y Plin y confirma cada pedido con un adelanto del 50 %.", kind: "F", why: "Es interno: es un proceso de cobro que la empresa ya implementó y que protege su caja." },
      { text: "El taller tiene un solo horno doméstico, que limita la producción a seis tortas por día.", kind: "D", why: "Es interno: es una limitación de capacidad de los equipos propios." },
      { text: "Los vecinos de la zona usan cada vez más Yape y Plin para pagar sus compras.", kind: "O", why: "Es externo: describe un hábito de los consumidores, no algo que la empresa haya hecho." },
      { text: "El precio de la mantequilla y de la harina ha subido en los mercados mayoristas de la ciudad.", kind: "A", why: "Es externo: el precio de los insumos lo fija el mercado y perjudica a todo el rubro." },
      { text: "La dueña domina técnicas de decoración en fondant que aprendió en un instituto de Lima.", kind: "F", why: "Es interno: es una capacidad propia del equipo que distingue al negocio." },
      { text: "Una cadena de pastelerías de Lima anunció la apertura de un local en el centro de Huancayo.", kind: "A", why: "Es externo: es la decisión de un competidor, fuera del control de la empresa." },
      { text: "En Huancayo crece el número de familias que encargan tortas personalizadas para cumpleaños y bautizos.", kind: "O", why: "Es externo: se trata de una tendencia del mercado que la empresa no controla, pero que puede aprovechar." },
    ],
  },
  {
    id: "foda-pasteleria-2",
    company: "Pastelería San Camilo",
    industry: "pasteleria",
    context:
      "Pastelería San Camilo tiene 25 años en Arequipa y en los últimos tres pasó de uno a tres locales, en Cayma, Yanahuara y el centro. Produce todo en una planta central y vende sobre todo tortas, empanadas y bocaditos. La gerencia evalúa abrir un cuarto local en Cerro Colorado.",
    items: [
      { text: "El alza del dólar ha encarecido las coberturas de chocolate importadas que usa todo el rubro.", kind: "A", why: "Es externo: el tipo de cambio no depende de la empresa y eleva sus costos." },
      { text: "La marca tiene 25 años en la ciudad y una receta propia de torta tres leches muy reconocida.", kind: "F", why: "Es interno: la marca y las recetas son activos que pertenecen a la empresa." },
      { text: "Las empresas arequipeñas piden cada vez más bocaditos y tortas para sus eventos corporativos.", kind: "O", why: "Es externo: es una demanda nueva del mercado que la empresa podría atender." },
      { text: "Los tres locales no comparten un sistema de inventario y se pierden insumos por vencimiento.", kind: "D", why: "Es interno: es una carencia de sus procesos y sistemas." },
      { text: "La empresa tiene una planta central que abastece a sus tres locales con recetas estandarizadas.", kind: "F", why: "Es interno: es un recurso productivo propio que asegura calidad uniforme." },
      { text: "La rotación de maestros pasteleros es alta porque la empresa paga sueldos menores que los del mercado.", kind: "D", why: "Es interno: la política de sueldos la decide la empresa y afecta a su propio equipo." },
      { text: "Las aplicaciones de reparto ampliaron su cobertura a distritos donde la empresa aún no vende.", kind: "O", why: "Es externo: depende de terceros y abre un canal para llegar a más clientes." },
      { text: "Los supermercados de la ciudad ampliaron sus secciones de pastelería con precios bajos.", kind: "A", why: "Es externo: es un movimiento de competidores que puede quitarle clientes." },
    ],
  },
  {
    id: "foda-pasteleria-3",
    company: "Delicias Doña Carmela",
    industry: "pasteleria",
    context:
      "Delicias Doña Carmela lleva 40 años vendiendo alfajores y tortas en el centro de Trujillo. Sus ventas bajan desde hace tres años y la mayoría de sus clientes habituales supera los 50 años de edad. La segunda generación de la familia acaba de asumir la gerencia.",
    items: [
      { text: "La empresa es dueña de su local principal, ubicado en el centro histórico.", kind: "F", why: "Es interno: es un activo propio que le ahorra alquiler y le da una buena ubicación." },
      { text: "Pastelerías nuevas de la ciudad ganan clientes jóvenes con promociones en TikTok.", kind: "A", why: "Es externo: son acciones de competidores que la empresa no controla." },
      { text: "El Festival de la Primavera atrae cada año a miles de visitantes a la ciudad.", kind: "O", why: "Es externo: es un evento de la ciudad que trae compradores potenciales." },
      { text: "No tiene deudas con bancos y mantiene caja suficiente para seis meses de operación.", kind: "F", why: "Es interno: la solidez financiera es un recurso propio de la empresa." },
      { text: "La carta de productos no se renueva desde hace diez años.", kind: "D", why: "Es interno: renovar la oferta es una decisión que la empresa ha postergado." },
      { text: "Crece en Trujillo la demanda de postres sin azúcar y sin gluten.", kind: "O", why: "Es externo: es una tendencia de consumo que podría atender con productos nuevos." },
      { text: "La empresa no tiene presencia en redes sociales ni recibe pedidos por internet.", kind: "D", why: "Es interno: es una carencia de sus canales de venta que puede resolver por sí misma." },
      { text: "Los pronósticos de lluvias intensas en la costa norte anticipan cortes en el abastecimiento de insumos.", kind: "A", why: "Es externo: el clima no depende de la empresa y puede afectar su operación." },
    ],
  },

  // ───────── Bebidas ─────────
  {
    id: "foda-bebidas-1",
    company: "Frutal Selva",
    industry: "bebidas",
    context:
      "Frutal Selva es un emprendimiento de Tarapoto que embotella jugos de camu camu y cocona. Tiene un año en el mercado, vende en ferias y en cafeterías de la ciudad, y produce en una planta alquilada por horas. Su fundador quiere llegar a los supermercados de Lima.",
    items: [
      { text: "Solo puede embotellar dos días a la semana porque no tiene planta propia.", kind: "D", why: "Es interno: es una limitación de su capacidad de producción." },
      { text: "Las grandes embotelladoras lanzaron líneas de jugos naturales con precios más bajos.", kind: "A", why: "Es externo: son decisiones de competidores con más recursos." },
      { text: "Compra la fruta a una asociación de productores con la que firmó un contrato por dos años.", kind: "F", why: "Es interno: el contrato es un acuerdo propio que asegura su abastecimiento." },
      { text: "Las lluvias intensas suelen interrumpir la carretera por la que sale la mercadería hacia la costa.", kind: "A", why: "Es externo: el clima y el estado de las vías están fuera del control de la empresa." },
      { text: "La empresa aún no tiene registro sanitario, por lo que no puede vender en supermercados.", kind: "D", why: "Es interno: el trámite depende de la empresa y su falta limita sus canales de venta." },
      { text: "Las ferias de alimentos del país abren espacios para marcas de frutos amazónicos.", kind: "O", why: "Es externo: son espacios que ofrecen terceros y que la empresa puede aprovechar." },
      { text: "El fundador es ingeniero agroindustrial y creó una fórmula que dura 45 días sin preservantes.", kind: "F", why: "Es interno: el conocimiento técnico y la fórmula pertenecen a la empresa." },
      { text: "Los consumidores urbanos buscan cada vez más bebidas sin azúcar añadida ni preservantes.", kind: "O", why: "Es externo: es una tendencia de consumo favorable que la empresa no creó." },
    ],
  },
  {
    id: "foda-bebidas-2",
    company: "Refrescos Killa",
    industry: "bebidas",
    context:
      "Refrescos Killa produce chicha morada y refresco de maracuyá embotellados en Arequipa, y vende en bodegas de Arequipa, Moquegua y Puno. Sus ventas crecieron 30 % en dos años y la planta ya trabaja a dos turnos. Los socios discuten si entrar a Cusco o lanzar una nueva línea.",
    items: [
      { text: "La empresa no ha desarrollado ninguna versión baja en azúcar de sus bebidas.", kind: "D", why: "Es interno: desarrollar productos depende de la empresa y todavía no lo ha hecho." },
      { text: "El precio de las botellas PET y del azúcar subió por el alza de los fletes internacionales.", kind: "A", why: "Es externo: el costo de los insumos depende del mercado internacional." },
      { text: "Crece la demanda de bebidas bajas en azúcar, un segmento que en el sur casi nadie atiende.", kind: "O", why: "Es externo: es un cambio en los hábitos del consumidor que abre espacio a productos nuevos." },
      { text: "No tiene política de crédito y varias bodegas le pagan con más de 60 días de retraso.", kind: "D", why: "Es interno: la gestión de cobranzas es un proceso que la empresa debe ordenar." },
      { text: "La planta cuenta con certificación HACCP vigente y un laboratorio propio de control de calidad.", kind: "F", why: "Es interno: la certificación y el laboratorio son logros y recursos de la empresa." },
      { text: "El turismo en el sur se recupera y los hoteles buscan proveedores locales de bebidas.", kind: "O", why: "Es externo: depende de la actividad turística y crea nuevos compradores." },
      { text: "La empresa tiene seis camiones propios con los que reparte cada semana a 1,200 bodegas.", kind: "F", why: "Es interno: la flota y la red de reparto son recursos propios." },
      { text: "Un competidor de Lima entró a las bodegas de Arequipa con precios 15 % más bajos.", kind: "A", why: "Es externo: es la acción de un competidor que presiona sus ventas." },
    ],
  },
  {
    id: "foda-bebidas-3",
    company: "Jugos La Ceiba",
    industry: "bebidas",
    context:
      "Jugos La Ceiba envasa néctares de fruta en Medellín, Colombia, desde hace 30 años. Fue líder en tiendas de barrio, pero su participación cae y su planta necesita una renovación costosa. El directorio debe decidir si invierte o si vende la empresa.",
    items: [
      { text: "La empresa se endeudó a tasas altas y los intereses consumen buena parte de su utilidad.", kind: "D", why: "Es interno: la estructura de deuda es resultado de sus propias decisiones financieras." },
      { text: "Una sequía en las zonas productoras de fruta redujo la oferta y elevó los precios.", kind: "A", why: "Es externo: el clima afecta el costo de la fruta sin que la empresa pueda evitarlo." },
      { text: "La línea de envasado tiene 20 años y se detiene por fallas varias veces al mes.", kind: "D", why: "Es interno: el estado de la maquinaria es responsabilidad de la empresa." },
      { text: "La Comunidad Andina permite vender a Perú, Ecuador y Bolivia sin pagar aranceles.", kind: "O", why: "Es externo: es un acuerdo comercial entre países que facilita exportar." },
      { text: "Sus vendedores tienen más de diez años de relación con los tenderos de barrio.", kind: "F", why: "Es interno: la experiencia y las relaciones del equipo comercial son propias." },
      { text: "Colegios y universidades de la ciudad buscan proveedores de bebidas saludables para sus cafeterías.", kind: "O", why: "Es externo: es una demanda del mercado que la empresa podría atender." },
      { text: "La marca lleva 30 años en el mercado y tiene contratos vigentes con dos cadenas de supermercados.", kind: "F", why: "Es interno: la marca y los contratos son activos propios." },
      { text: "Las cadenas de supermercados impulsan sus marcas propias de jugos a menor precio.", kind: "A", why: "Es externo: es una estrategia de los clientes y competidores, no de la empresa." },
    ],
  },

  // ───────── Restaurante ─────────
  {
    id: "foda-restaurante-1",
    company: "Pollería El Leñador",
    industry: "restaurante",
    context:
      "Dos hermanos abrieron hace cinco meses una pollería en el distrito de José Leonardo Ortiz, en Chiclayo. Atienden en un local alquilado de 12 mesas. Las ventas de fin de semana son buenas, pero de lunes a jueves el salón queda medio vacío.",
    items: [
      { text: "El precio del pollo sube cada vez que aumenta el costo del maíz importado.", kind: "A", why: "Es externo: depende de precios internacionales que la empresa no controla." },
      { text: "Las aplicaciones de delivery empezaron a operar en Chiclayo y buscan restaurantes afiliados.", kind: "O", why: "Es externo: es la llegada de un servicio de terceros que abre un canal de venta." },
      { text: "La pollería no tiene reparto propio ni está afiliada a ninguna aplicación de delivery.", kind: "D", why: "Es interno: afiliarse u organizar el reparto es una decisión que la empresa no ha tomado." },
      { text: "Una cadena nacional de pollerías abrirá un local en el centro comercial cercano.", kind: "A", why: "Es externo: es la decisión de un competidor." },
      { text: "Cerca del local se inauguró un instituto con más de mil estudiantes que almuerzan fuera de casa.", kind: "O", why: "Es externo: es un cambio en la zona que trae nuevos clientes potenciales." },
      { text: "Uno de los socios trabajó ocho años como maestro hornero en una cadena de pollerías.", kind: "F", why: "Es interno: la experiencia del socio es una capacidad del propio equipo." },
      { text: "Los socios mezclan el dinero del negocio con sus gastos personales y no saben cuánto ganan al mes.", kind: "D", why: "Es interno: es un desorden de su gestión financiera." },
      { text: "La pollería usa un aderezo de receta propia que solo conocen los dos hermanos.", kind: "F", why: "Es interno: la receta es un recurso exclusivo del negocio." },
    ],
  },
  {
    id: "foda-restaurante-2",
    company: "Brasas del Sur",
    industry: "restaurante",
    context:
      "Brasas del Sur tiene cuatro pollerías en Tacna y creció gracias a los visitantes que llegan desde Arica, en Chile. Marina el pollo en un centro de producción propio. Sus dueños quieren abrir en Moquegua e Ilo, pero sienten que pierden el control de los locales.",
    items: [
      { text: "Pollerías informales de la zona venden sin comprobante y a precios más bajos.", kind: "A", why: "Es externo: es competencia informal que la empresa no puede controlar." },
      { text: "Dos de sus locales no tienen el libro de reclamaciones a la vista del público.", kind: "D", why: "Es interno: cumplir la norma depende de la empresa, y la omisión es suya." },
      { text: "Un nuevo centro comercial de la ciudad ofrece locales disponibles en su patio de comidas.", kind: "O", why: "Es externo: es una oferta de terceros que permitiría llegar a más público." },
      { text: "Cada local lleva sus cuentas en cuadernos y la gerencia recibe los reportes con un mes de retraso.", kind: "D", why: "Es interno: es una carencia de sus sistemas de control." },
      { text: "El personal de salón recibe capacitación cada trimestre y casi no hay renuncias.", kind: "F", why: "Es interno: la capacitación y la estabilidad del equipo son fruto de su gestión." },
      { text: "El peso chileno se debilitó frente al sol y los visitantes gastan menos en cada viaje.", kind: "A", why: "Es externo: el tipo de cambio no depende de la empresa y reduce el consumo." },
      { text: "Miles de visitantes chilenos cruzan cada fin de semana desde Arica para comer y comprar en Tacna.", kind: "O", why: "Es externo: es un flujo de compradores que existe sin que la empresa lo genere." },
      { text: "La empresa tiene un centro de producción que marina y distribuye el pollo a sus cuatro locales.", kind: "F", why: "Es interno: es una instalación propia que uniformiza el producto y reduce costos." },
    ],
  },
  {
    id: "foda-restaurante-3",
    company: "Restaurante Don Anselmo",
    industry: "restaurante",
    context:
      "Don Anselmo es un restaurante criollo de Pueblo Libre, en Lima, con 35 años de historia. Sus ventas cayeron y el local necesita una remodelación. Tras el retiro del fundador, sus tres hijos dirigen el negocio y discuten cada decisión.",
    items: [
      { text: "El precio del limón y de la papa se dispara en los meses de lluvias y huaicos.", kind: "A", why: "Es externo: depende del clima y del mercado de alimentos." },
      { text: "El Perú es reconocido como destino gastronómico y los turistas buscan cocina criolla tradicional.", kind: "O", why: "Es externo: es una tendencia del turismo que la empresa puede aprovechar." },
      { text: "Abrieron varios restaurantes criollos de formato moderno a pocas cuadras del local.", kind: "A", why: "Es externo: es el ingreso de nuevos competidores en la zona." },
      { text: "La cocina funciona con equipos antiguos que gastan más gas y retrasan los pedidos.", kind: "D", why: "Es interno: el estado de los equipos es responsabilidad de la empresa." },
      { text: "El restaurante es propietario de su local y no paga alquiler.", kind: "F", why: "Es interno: es un activo propio que reduce sus gastos fijos." },
      { text: "Las empresas de la zona contratan cada vez más almuerzos para reuniones y celebraciones.", kind: "O", why: "Es externo: es una demanda del mercado corporativo que no depende de la empresa." },
      { text: "El jefe de cocina lleva 20 años en la empresa y mantiene el sabor de las recetas originales.", kind: "F", why: "Es interno: la experiencia del personal es un recurso del negocio." },
      { text: "Los tres hijos del fundador no se ponen de acuerdo y las inversiones se postergan.", kind: "D", why: "Es interno: es un problema de dirección dentro de la propia empresa." },
    ],
  },

  // ───────── Cafetería ─────────
  {
    id: "foda-cafeteria-1",
    company: "Café Qori",
    industry: "cafeteria",
    context:
      "Café Qori es una barra de café de especialidad que abrió hace seis meses en el barrio de San Blas, en Cusco. La atienden su fundadora y dos baristas, y casi todos sus clientes son turistas extranjeros. El local es alquilado y tiene espacio para cinco mesas.",
    items: [
      { text: "Los jóvenes cusqueños consumen cada vez más café de especialidad.", kind: "O", why: "Es externo: es un cambio en los hábitos del mercado local." },
      { text: "Una cadena internacional de cafeterías abrió un local cerca de la Plaza de Armas.", kind: "A", why: "Es externo: es la acción de un competidor con más recursos." },
      { text: "La fundadora es catadora certificada y selecciona personalmente cada lote de café.", kind: "F", why: "Es interno: es una capacidad técnica propia del equipo." },
      { text: "La carta y los precios están pensados solo para turistas; no hay oferta para el público local.", kind: "D", why: "Es interno: el diseño de la carta y los precios lo decide la empresa." },
      { text: "Compra el café a una cooperativa de La Convención, con precio pactado por un año.", kind: "F", why: "Es interno: es un acuerdo propio que le da abastecimiento y costo estables." },
      { text: "Crece el número de viajeros que trabajan a distancia y buscan cafeterías con buen internet.", kind: "O", why: "Es externo: es una tendencia de los viajeros que trae un nuevo tipo de cliente." },
      { text: "El local tiene solo cinco mesas y no cuenta con espacio para tostar ni almacenar café.", kind: "D", why: "Es interno: es una limitación de sus instalaciones." },
      { text: "Los bloqueos de carreteras en el sur reducen la llegada de turistas a la ciudad.", kind: "A", why: "Es externo: los conflictos sociales están fuera del control de la empresa." },
    ],
  },
  {
    id: "foda-cafeteria-2",
    company: "Café Monte Verde",
    industry: "cafeteria",
    context:
      "Café Monte Verde tiene cinco locales en Miraflores, San Isidro y Surco, en Lima, y planea abrir tres más este año. Tuesta su propio café, que compra en Villa Rica y Jaén. El crecimiento ha sido rápido y la operación empieza a mostrar desorden.",
    items: [
      { text: "Las aperturas se financiaron con préstamos de corto plazo y las cuotas presionan la caja cada mes.", kind: "D", why: "Es interno: la forma de financiarse fue una decisión propia." },
      { text: "Muchas oficinas de San Isidro retomaron el trabajo presencial y hay más público en la zona.", kind: "O", why: "Es externo: es una decisión de otras empresas que aumenta los clientes potenciales." },
      { text: "Los alquileres de locales comerciales en Miraflores y San Isidro vienen subiendo.", kind: "A", why: "Es externo: el mercado de alquileres no depende de la empresa y eleva sus gastos." },
      { text: "La empresa tiene su propia planta de tostado, con la que controla el sabor y el costo del café.", kind: "F", why: "Es interno: la planta es un recurso propio." },
      { text: "No existen manuales de preparación y la calidad de las bebidas varía de un local a otro.", kind: "D", why: "Es interno: la estandarización de procesos depende de la empresa." },
      { text: "Crece la compra de café en grano por internet para preparar en casa.", kind: "O", why: "Es externo: es un hábito de consumo que abre una nueva línea de venta." },
      { text: "Su aplicación de fidelización tiene 8,000 usuarios activos que acumulan puntos en cada compra.", kind: "F", why: "Es interno: la aplicación y su base de usuarios son activos de la empresa." },
      { text: "El precio internacional del café subió por malas cosechas en los grandes países productores.", kind: "A", why: "Es externo: el precio se fija en el mercado mundial y encarece su insumo principal." },
    ],
  },
  {
    id: "foda-cafeteria-3",
    company: "Café La Candelaria",
    industry: "cafeteria",
    context:
      "Café La Candelaria atiende desde hace 22 años en el centro histórico de Bogotá, Colombia. Fue punto de encuentro de universitarios y oficinistas, pero en los últimos años perdió clientela frente a cafeterías más modernas. Su dueña evalúa remodelar el local.",
    items: [
      { text: "Las obras viales del centro mantendrán la calle cerrada al tránsito durante varios meses.", kind: "A", why: "Es externo: es una obra pública que reduce el paso de clientes." },
      { text: "Los clientes de la zona pagan cada vez más con billeteras digitales y tarjetas sin contacto.", kind: "O", why: "Es externo: describe un hábito de los consumidores, no una acción de la empresa." },
      { text: "Tres cafeterías de especialidad abrieron en la misma calle durante el último año.", kind: "A", why: "Es externo: es el ingreso de nuevos competidores." },
      { text: "La cafetería solo recibe pagos en efectivo.", kind: "D", why: "Es interno: los medios de pago que acepta los decide la empresa." },
      { text: "Aumenta la llegada de turistas extranjeros interesados en probar café colombiano de origen.", kind: "O", why: "Es externo: es una tendencia del turismo que trae más compradores." },
      { text: "Los meseros tienen en promedio 12 años en la empresa y conocen a los clientes frecuentes.", kind: "F", why: "Es interno: la experiencia y permanencia del equipo son propias del negocio." },
      { text: "El mobiliario y los baños no se renuevan desde hace 15 años.", kind: "D", why: "Es interno: el mantenimiento del local depende de la empresa." },
      { text: "El local es propio y está a una cuadra de los museos más visitados del centro.", kind: "F", why: "Es interno: el local es un activo de la empresa." },
    ],
  },

  // ───────── Moda ─────────
  {
    id: "foda-moda-1",
    company: "Urpi Kids",
    industry: "moda",
    context:
      "Urpi Kids es un taller de ropa para niños que dos primas abrieron hace un año en una galería de Gamarra, en La Victoria. Tienen cuatro máquinas de coser y venden al por mayor a tiendas de provincias. Se preparan para su primera campaña navideña.",
    items: [
      { text: "Las socias pagan sus telas al contado y no tienen deudas con proveedores ni bancos.", kind: "F", why: "Es interno: es una situación financiera sana lograda por su gestión." },
      { text: "El comercio ambulatorio alrededor de Gamarra dificulta el ingreso de compradores a las galerías.", kind: "A", why: "Es externo: es un problema del entorno urbano que la empresa no controla." },
      { text: "El taller todavía no emite comprobantes electrónicos, por lo que no puede venderle a cadenas de tiendas.", kind: "D", why: "Es interno: formalizar su facturación depende de la propia empresa." },
      { text: "Una de las socias es diseñadora de modas y crea colecciones propias cada temporada.", kind: "F", why: "Es interno: el talento de diseño pertenece al equipo." },
      { text: "Con solo cuatro máquinas, el taller no puede atender pedidos de más de 300 prendas por semana.", kind: "D", why: "Es interno: es una limitación de su capacidad de producción." },
      { text: "Las cadenas de tiendas por departamento buscan proveedores peruanos de ropa infantil.", kind: "O", why: "Es externo: es una necesidad de otras empresas que el taller podría atender." },
      { text: "Llegan al país contenedores de ropa importada de Asia a precios muy bajos.", kind: "A", why: "Es externo: es competencia de productos importados." },
      { text: "Las ventas de ropa en transmisiones en vivo por TikTok crecen entre compradores de provincias.", kind: "O", why: "Es externo: es una tendencia de compra que abre un canal nuevo." },
    ],
  },
  {
    id: "foda-moda-2",
    company: "Alpaca Misti",
    industry: "moda",
    context:
      "Alpaca Misti confecciona chompas y chalinas de alpaca en Arequipa. Vende en tres tiendas propias y a boutiques de Estados Unidos y Alemania. En cuatro años duplicó sus ventas y hoy emplea a 60 personas. La gerencia quiere entrar al mercado asiático.",
    items: [
      { text: "Trabaja con 40 tejedoras capacitadas por la propia empresa en acabados a mano.", kind: "F", why: "Es interno: es una capacidad productiva formada por la empresa." },
      { text: "Los consumidores europeos valoran cada vez más las fibras naturales y conocer el origen de la prenda.", kind: "O", why: "Es externo: es una preferencia del mercado que favorece al producto." },
      { text: "La empresa no tiene tienda en línea y solo llega al exterior a través de intermediarios.", kind: "D", why: "Es interno: desarrollar un canal propio depende de la empresa." },
      { text: "Crecen las compras por internet de prendas de lujo hechas directamente a marcas de origen.", kind: "O", why: "Es externo: es un hábito de compra internacional que abre un canal directo." },
      { text: "Fabricantes de otros países venden mezclas sintéticas que imitan la alpaca a mitad de precio.", kind: "A", why: "Es externo: es competencia de productos sustitutos." },
      { text: "La empresa tiene certificación de comercio justo, exigida por varias boutiques extranjeras.", kind: "F", why: "Es interno: la certificación es un logro propio." },
      { text: "Solo una persona habla inglés y maneja toda la relación con los clientes del exterior.", kind: "D", why: "Es interno: es una carencia de su equipo que concentra el trabajo en una sola persona." },
      { text: "La caída del dólar reduce los ingresos en soles de las empresas que exportan.", kind: "A", why: "Es externo: el tipo de cambio no depende de la empresa y reduce su margen." },
    ],
  },
  {
    id: "foda-moda-3",
    company: "Confecciones Rivera",
    industry: "moda",
    context:
      "Confecciones Rivera fabrica polos y buzos en La Victoria, Lima, desde hace 30 años. Llegó a tener 120 trabajadores y hoy tiene 45. El fundador quiere retirarse y su hija evalúa cómo relanzar la empresa.",
    items: [
      { text: "Es propietaria de un edificio de cuatro pisos en Gamarra, donde funciona el taller.", kind: "F", why: "Es interno: el inmueble es un activo propio." },
      { text: "Las marcas locales emergentes buscan talleres formales que les confeccionen lotes pequeños.", kind: "O", why: "Es externo: es una demanda de otras empresas que puede atender." },
      { text: "Sus máquinas tienen 20 años, consumen más energía y producen más prendas falladas.", kind: "D", why: "Es interno: el estado de la maquinaria es responsabilidad de la empresa." },
      { text: "Cadenas extranjeras de moda rápida abren tiendas en centros comerciales de todo el país.", kind: "A", why: "Es externo: es el avance de competidores internacionales." },
      { text: "La empresa no tiene área comercial y vende a los mismos diez clientes desde hace años.", kind: "D", why: "Es interno: la falta de un equipo de ventas es una carencia de su organización." },
      { text: "El hilado de algodón sube de precio cuando las lluvias dañan las cosechas del norte.", kind: "A", why: "Es externo: depende del clima y del mercado de materias primas." },
      { text: "Colegios y empresas renuevan uniformes cada año y prefieren proveedores que entreguen rápido.", kind: "O", why: "Es externo: es una demanda recurrente del mercado." },
      { text: "Sus operarios más antiguos dominan el control de calidad y casi no hay devoluciones.", kind: "F", why: "Es interno: la experiencia del personal es un recurso de la empresa." },
    ],
  },

  // ───────── Minimarket ─────────
  {
    id: "foda-minimarket-1",
    company: "Bodega Doña Julia",
    industry: "minimarket",
    context:
      "Julia Chunga convirtió la sala de su casa en una bodega hace un año, en el distrito de Castilla, en Piura. Atiende ella sola de 7 de la mañana a 10 de la noche y fía a los vecinos que conoce. Su meta es convertirla en un minimarket.",
    items: [
      { text: "La bodega abre 15 horas al día y la dueña conoce por nombre a casi todos sus clientes.", kind: "F", why: "Es interno: el horario y el trato cercano son parte de su servicio." },
      { text: "En el barrio se construyen dos condominios que traerán cientos de familias nuevas.", kind: "O", why: "Es externo: es un cambio en la zona que aumenta los clientes potenciales." },
      { text: "La dueña fía a los vecinos sin anotar las deudas en ningún registro.", kind: "D", why: "Es interno: es una falla de control que ella misma puede corregir." },
      { text: "La bodega funciona en casa propia, por lo que no paga alquiler.", kind: "F", why: "Es interno: es un recurso propio que mantiene bajos sus gastos fijos." },
      { text: "Una cadena de tiendas de descuento abrió un local a tres cuadras.", kind: "A", why: "Es externo: es la llegada de un competidor." },
      { text: "Nadie reemplaza a la dueña: si ella se enferma, la bodega cierra.", kind: "D", why: "Es interno: es una carencia de personal del propio negocio." },
      { text: "Los distribuidores mayoristas lanzaron aplicaciones que entregan pedidos a bodegas al día siguiente.", kind: "O", why: "Es externo: es un servicio de terceros que facilita el abastecimiento." },
      { text: "Los cortes de luz durante las olas de calor dañan los productos refrigerados de los comercios.", kind: "A", why: "Es externo: depende del clima y del servicio eléctrico." },
    ],
  },
  {
    id: "foda-minimarket-2",
    company: "Minimarket El Ahorro",
    industry: "minimarket",
    context:
      "El Ahorro es una cadena de cuatro minimarkets en Huancayo que una familia abrió en seis años. Sus ventas crecen y los dueños planean dos locales más. Hasta ahora cada tienda se administra casi por separado.",
    items: [
      { text: "Se construyen nuevas urbanizaciones en El Tambo y Pilcomayo, donde aún no hay minimarkets.", kind: "O", why: "Es externo: es el crecimiento de la ciudad, que crea zonas sin atender." },
      { text: "Compra en volumen para sus cuatro locales y obtiene mejores precios que las bodegas vecinas.", kind: "F", why: "Es interno: su poder de compra es resultado de su propio tamaño." },
      { text: "No tiene almacén central; cada local recibe y guarda su mercadería por separado.", kind: "D", why: "Es interno: es una carencia de su infraestructura logística." },
      { text: "Sus cuatro locales usan un sistema de punto de venta que actualiza el inventario al instante.", kind: "F", why: "Es interno: el sistema es una herramienta propia de gestión." },
      { text: "Las cajas municipales ofrecen créditos de capital de trabajo a comercios formales de la región.", kind: "O", why: "Es externo: es una oferta del sistema financiero que puede usar para crecer." },
      { text: "Los bloqueos de la Carretera Central retrasan la llegada de mercadería desde Lima.", kind: "A", why: "Es externo: los bloqueos están fuera del control de la empresa." },
      { text: "Los administradores de local son familiares sin formación en gestión de tiendas.", kind: "D", why: "Es interno: la selección y preparación del personal depende de la empresa." },
      { text: "Una cadena nacional de tiendas de conveniencia anunció su llegada a Huancayo.", kind: "A", why: "Es externo: es la decisión de un competidor." },
    ],
  },
  {
    id: "foda-minimarket-3",
    company: "Comercial Río Grande",
    industry: "minimarket",
    context:
      "Comercial Río Grande opera desde hace 28 años un minimarket de dos pisos en el centro de Iquitos. Fue el preferido de la ciudad, pero hoy pierde clientes y acumula mercadería que no rota. Su mercadería llega por río o por avión.",
    items: [
      { text: "Tiene cámaras de frío propias para almacenar perecibles durante varias semanas.", kind: "F", why: "Es interno: es un equipamiento que pertenece a la empresa." },
      { text: "Un supermercado de cadena abrió en el nuevo centro comercial de la ciudad.", kind: "A", why: "Es externo: es el ingreso de un competidor grande." },
      { text: "Las cajas registradoras son antiguas y en horas punta se forman colas largas.", kind: "D", why: "Es interno: la renovación de equipos depende de la empresa." },
      { text: "En época de vaciante, el bajo nivel de los ríos retrasa las embarcaciones que abastecen a la ciudad.", kind: "A", why: "Es externo: depende del clima y del caudal de los ríos." },
      { text: "Los vecinos de los distritos periféricos piden cada vez más compras con entrega a domicilio.", kind: "O", why: "Es externo: es un cambio en los hábitos de compra de los clientes." },
      { text: "El local es propio, tiene dos pisos y está en una esquina céntrica.", kind: "F", why: "Es interno: el inmueble es un activo de la empresa." },
      { text: "La quinta parte de su inventario lleva más de seis meses sin venderse.", kind: "D", why: "Es interno: es resultado de su propia gestión de compras." },
      { text: "Los hoteles y albergues turísticos de la zona buscan un proveedor local de abarrotes.", kind: "O", why: "Es externo: es una necesidad de otras empresas que puede atender." },
    ],
  },

  // ───────── Farmacia ─────────
  {
    id: "foda-farmacia-1",
    company: "Botica Santa Rosa",
    industry: "farmacia",
    context:
      "Una química farmacéutica abrió hace cuatro meses su primera botica en el distrito de San Juan Bautista, en Ayacucho. Atiende con una técnica en farmacia en un local alquilado de 30 metros cuadrados. Compra a droguerías de Lima y todavía tiene poco surtido.",
    items: [
      { text: "Las grandes cadenas de boticas negocian precios por volumen que una botica independiente no consigue.", kind: "A", why: "Es externo: es el poder de compra de los competidores." },
      { text: "El local tiene autorización sanitaria y cumple las buenas prácticas de almacenamiento.", kind: "F", why: "Es interno: cumplir la norma es un logro de la propia botica, aunque la norma venga de fuera." },
      { text: "El centro de salud cercano atiende a cientos de pacientes al día y no hay boticas en esa cuadra.", kind: "O", why: "Es externo: es una condición de la zona que genera compradores." },
      { text: "Su capital solo alcanza para un surtido reducido y varios clientes se van sin su medicina.", kind: "D", why: "Es interno: es una limitación de sus propios recursos financieros." },
      { text: "Crece el interés de la población por vitaminas y suplementos nutricionales.", kind: "O", why: "Es externo: es una tendencia de consumo que amplía lo que puede vender." },
      { text: "La botica controla las fechas de vencimiento a mano y no registra sus ventas en un sistema.", kind: "D", why: "Es interno: es una carencia de sus procesos." },
      { text: "La dueña es química farmacéutica y atiende en persona, por lo que orienta bien a cada cliente.", kind: "F", why: "Es interno: el conocimiento profesional de la dueña es una capacidad del negocio." },
      { text: "En los mercados de la zona se venden medicamentos de contrabando a precios muy bajos.", kind: "A", why: "Es externo: es comercio ilegal que la empresa no puede controlar." },
    ],
  },
  {
    id: "foda-farmacia-2",
    company: "Boticas Vida Sana",
    industry: "farmacia",
    context:
      "Boticas Vida Sana tiene seis locales en Chiclayo y Lambayeque, y abrió tres de ellos en los últimos dos años. Sus ventas crecen, pero las cadenas nacionales se instalan cada vez más cerca. La gerencia busca diferenciarse con mejor servicio.",
    items: [
      { text: "Las lluvias del Fenómeno del Niño suelen inundar calles y locales comerciales en Chiclayo.", kind: "A", why: "Es externo: es un fenómeno climático." },
      { text: "Aumenta el número de pacientes crónicos que compran sus medicinas todos los meses.", kind: "O", why: "Es externo: es un cambio en la demanda del mercado." },
      { text: "Tiene convenios firmados con tres clínicas que derivan a sus pacientes a la cadena.", kind: "F", why: "Es interno: los convenios son acuerdos propios que le aseguran clientes." },
      { text: "Una cadena nacional abrió boticas a menos de una cuadra de cuatro de sus locales.", kind: "A", why: "Es externo: es la decisión de un competidor." },
      { text: "Los adultos mayores de la ciudad piden cada vez más sus medicinas con entrega a domicilio.", kind: "O", why: "Es externo: es un hábito de los clientes que abre un canal de venta." },
      { text: "Los técnicos de farmacia renuncian con frecuencia porque no reciben capacitación ni incentivos.", kind: "D", why: "Es interno: la gestión del personal depende de la empresa." },
      { text: "Su sistema avisa los productos por vencer y calcula la reposición de cada local.", kind: "F", why: "Es interno: el sistema es una herramienta propia de gestión." },
      { text: "La empresa no vende por WhatsApp ni ofrece entrega a domicilio.", kind: "D", why: "Es interno: habilitar esos canales es una decisión que la empresa no ha tomado." },
    ],
  },
  {
    id: "foda-farmacia-3",
    company: "Farmacias El Malecón",
    industry: "farmacia",
    context:
      "Farmacias El Malecón opera doce locales en Guayaquil, Ecuador, desde hace 35 años. Perdió ventas frente a las grandes cadenas y se atrasó en los pagos a sus distribuidores. La familia dueña contrató a un gerente para ordenar la empresa.",
    items: [
      { text: "Tiene registrados a 40,000 clientes con su historial de compras.", kind: "F", why: "Es interno: la base de datos es un activo de la empresa." },
      { text: "La inseguridad en la ciudad obliga a los comercios a cerrar más temprano.", kind: "A", why: "Es externo: es una condición del entorno social." },
      { text: "Las aseguradoras de salud buscan redes de farmacias para atender a sus afiliados.", kind: "O", why: "Es externo: es una necesidad de otras empresas que puede aprovechar." },
      { text: "Nunca ha hecho una campaña ni un programa de descuentos con los datos de sus clientes.", kind: "D", why: "Es interno: es una capacidad comercial que no ha desarrollado." },
      { text: "Sus doce locales están en esquinas de alto tránsito, con contratos de alquiler a largo plazo.", kind: "F", why: "Es interno: las ubicaciones aseguradas por contrato son un recurso propio." },
      { text: "Crece la demanda de productos de cuidado de la piel en las farmacias.", kind: "O", why: "Es externo: es una tendencia de consumo." },
      { text: "La empresa debe tres meses de facturas a sus distribuidores, que ya le redujeron el crédito.", kind: "D", why: "Es interno: es un problema de sus propias finanzas." },
      { text: "Las cadenas grandes lanzaron marcas propias de medicamentos genéricos con precios bajos.", kind: "A", why: "Es externo: es una estrategia de los competidores." },
    ],
  },

  // ───────── Comercio electrónico ─────────
  {
    id: "foda-ecommerce-1",
    company: "PetiBox",
    industry: "ecommerce",
    context:
      "Dos egresados de Trujillo lanzaron hace seis meses PetiBox, una tienda en línea de accesorios para mascotas. Guardan la mercadería en un cuarto de su casa y despachan con un courier. Venden unos 120 pedidos al mes, casi todos a Lima.",
    items: [
      { text: "La tienda no tiene publicada una política de cambios y devoluciones.", kind: "D", why: "Es interno: redactarla y publicarla depende de la empresa." },
      { text: "Uno de los socios es programador y desarrolló la página sin pagar a terceros.", kind: "F", why: "Es interno: es una capacidad técnica del propio equipo." },
      { text: "El gasto de las familias peruanas en sus mascotas viene creciendo año a año.", kind: "O", why: "Es externo: es una tendencia del mercado." },
      { text: "Trabaja con un solo courier y no tiene alternativa cuando este se retrasa.", kind: "D", why: "Es interno: elegir y diversificar proveedores es decisión de la empresa." },
      { text: "La publicidad en redes sociales cuesta más en cada campaña porque compiten más anunciantes.", kind: "A", why: "Es externo: el costo de la pauta lo determina el mercado publicitario." },
      { text: "La tienda responde todos los mensajes de sus clientes en menos de diez minutos.", kind: "F", why: "Es interno: la rapidez de atención es un proceso propio." },
      { text: "Plataformas asiáticas de venta directa ofrecen productos similares con envío barato al Perú.", kind: "A", why: "Es externo: es competencia internacional." },
      { text: "Los Cyber Wow atraen a millones de compradores a las tiendas en línea.", kind: "O", why: "Es externo: es una campaña del sector que aumenta el tráfico de compradores." },
    ],
  },
  {
    id: "foda-ecommerce-2",
    company: "Casa Nopal",
    industry: "ecommerce",
    context:
      "Casa Nopal es una tienda en línea de decoración para el hogar con sede en Guadalajara, México. En tres años pasó de 200 a 3,000 pedidos al mes y despacha a todo el país desde un almacén propio. Busca capital para seguir creciendo.",
    items: [
      { text: "Los grandes marketplaces ofrecen envío gratis en un día y los compradores lo esperan de todos.", kind: "A", why: "Es externo: es el estándar que imponen competidores más grandes." },
      { text: "Tiene un equipo propio de fotografía que produce el catálogo sin depender de agencias.", kind: "F", why: "Es interno: es una capacidad del propio equipo." },
      { text: "Muchos compradores sin tarjeta prefieren pagar en efectivo en tiendas de conveniencia.", kind: "O", why: "Es externo: es un hábito de pago del mercado que podría atender." },
      { text: "La página tarda en cargar en celulares y muchos visitantes la abandonan antes de pagar.", kind: "D", why: "Es interno: el desempeño de su página depende de la empresa." },
      { text: "Las empresas de paquetería anunciaron un alza de tarifas por el costo del combustible.", kind: "A", why: "Es externo: son precios que fijan sus proveedores por causas del mercado." },
      { text: "Su almacén propio usa un sistema de gestión que permite despachar el mismo día.", kind: "F", why: "Es interno: el almacén y su sistema son recursos propios." },
      { text: "El Buen Fin concentra cada noviembre un fuerte aumento de compras por internet.", kind: "O", why: "Es externo: es una campaña nacional de ventas." },
      { text: "La tienda solo acepta pagos con tarjeta de crédito o débito.", kind: "D", why: "Es interno: los medios de pago que ofrece los decide la empresa." },
    ],
  },
  {
    id: "foda-ecommerce-3",
    company: "Tienda Kallpa",
    industry: "ecommerce",
    context:
      "Tienda Kallpa fue una de las primeras tiendas en línea de electrodomésticos del Perú y opera desde Lima hace 14 años. Sus ventas se estancaron y sus clientes se quejan de retrasos. La gerencia prepara un plan para recuperar terreno.",
    items: [
      { text: "Mantiene líneas de crédito aprobadas con dos bancos que todavía no ha utilizado.", kind: "F", why: "Es interno: es un respaldo financiero ya conseguido por la empresa." },
      { text: "La plataforma de la tienda tiene doce años y se cae en los días de mayor tráfico.", kind: "D", why: "Es interno: la tecnología que usa es responsabilidad de la empresa." },
      { text: "Indecopi sanciona a las tiendas en línea que no cumplen los plazos de entrega ofrecidos.", kind: "A", why: "Es externo: es la acción de un regulador." },
      { text: "Acumula reclamos sin responder en su libro de reclamaciones virtual.", kind: "D", why: "Es interno: atender los reclamos es un proceso de la empresa." },
      { text: "Los compradores de provincias adquieren cada vez más electrodomésticos por internet.", kind: "O", why: "Es externo: es una tendencia del mercado." },
      { text: "Tiene contratos de distribución directa con cinco marcas de electrodomésticos.", kind: "F", why: "Es interno: los contratos son acuerdos propios que mejoran su margen." },
      { text: "Las cadenas de tiendas por departamento fortalecieron su venta en línea con recojo en tienda.", kind: "A", why: "Es externo: es un movimiento de los competidores." },
      { text: "Las billeteras digitales y el pago en cuotas sin tarjeta facilitan las compras de mayor valor.", kind: "O", why: "Es externo: es un avance de los medios de pago disponible para todo el mercado." },
    ],
  },

  // ───────── Inmobiliaria ─────────
  {
    id: "foda-inmobiliaria-1",
    company: "Miraluz Inmobiliaria",
    industry: "inmobiliaria",
    context:
      "Miraluz Inmobiliaria es una empresa nueva de Piura que construye su primer edificio, de 12 departamentos. Los dos socios son ingenieros civiles y financian la obra con aportes propios y preventas. Han vendido cuatro departamentos en planos.",
    items: [
      { text: "El precio del acero y del cemento viene subiendo en los últimos meses.", kind: "A", why: "Es externo: el costo de los materiales lo fija el mercado." },
      { text: "El terreno del proyecto está pagado por completo e inscrito a nombre de la empresa.", kind: "F", why: "Es interno: es un activo propio y saneado." },
      { text: "El Fondo Mivivienda ofrece bonos que reducen la cuota inicial de quienes compran su primera vivienda.", kind: "O", why: "Es externo: es un programa del Estado que facilita la compra." },
      { text: "La empresa no tiene ningún proyecto entregado que mostrar a compradores y bancos.", kind: "D", why: "Es interno: la falta de trayectoria es una característica de la propia empresa." },
      { text: "Los dos socios son ingenieros civiles y dirigen la obra ellos mismos.", kind: "F", why: "Es interno: es una capacidad técnica del propio equipo." },
      { text: "Las lluvias fuertes en Piura suelen paralizar las obras y dañar los materiales.", kind: "A", why: "Es externo: es un factor climático." },
      { text: "No tiene vendedores: los socios atienden a los interesados cuando la obra se lo permite.", kind: "D", why: "Es interno: es una carencia de su organización comercial." },
      { text: "En Piura faltan viviendas formales para familias jóvenes de ingresos medios.", kind: "O", why: "Es externo: es una necesidad no cubierta del mercado." },
    ],
  },
  {
    id: "foda-inmobiliaria-2",
    company: "Grupo Habita",
    industry: "inmobiliaria",
    context:
      "Grupo Habita construye edificios de departamentos en Jesús María, Lince y Pueblo Libre, en Lima. En ocho años entregó nueve proyectos y ahora lanza tres al mismo tiempo. El crecimiento pone a prueba a su equipo de ventas y de posventa.",
    items: [
      { text: "Tiene una línea de financiamiento aprobada con un banco para sus dos próximos proyectos.", kind: "F", why: "Es interno: es un recurso financiero ya asegurado por la empresa." },
      { text: "No registra a los interesados en un sistema y pierde los contactos que consigue en las ferias.", kind: "D", why: "Es interno: es una carencia de su proceso comercial." },
      { text: "Los terrenos en los distritos céntricos de Lima suben de precio cada año.", kind: "A", why: "Es externo: el precio del suelo lo determina el mercado." },
      { text: "Crece el número de inversionistas que compran departamentos pequeños para alquilarlos.", kind: "O", why: "Es externo: es una tendencia de la demanda." },
      { text: "Su servicio de posventa demora meses en atender las fallas de acabados.", kind: "D", why: "Es interno: es un proceso propio que funciona mal." },
      { text: "Las tasas de los créditos hipotecarios vienen bajando.", kind: "O", why: "Es externo: depende del sistema financiero y facilita la compra de viviendas." },
      { text: "La municipalidad evalúa reducir la altura máxima permitida en las avenidas donde compra terrenos.", kind: "A", why: "Es externo: es una decisión regulatoria." },
      { text: "Ha entregado sus nueve edificios dentro del plazo ofrecido.", kind: "F", why: "Es interno: el cumplimiento es resultado de su propia gestión." },
    ],
  },
  {
    id: "foda-inmobiliaria-3",
    company: "Inmobiliaria Los Aromos",
    industry: "inmobiliaria",
    context:
      "Inmobiliaria Los Aromos tiene 30 años en Santiago de Chile y más de 50 edificios entregados. Hoy carga con departamentos terminados que no logra vender y con deudas que vencen pronto. El directorio analiza cómo salir del problema.",
    items: [
      { text: "El gobierno anunció un subsidio a la tasa hipotecaria para la compra de viviendas nuevas.", kind: "O", why: "Es externo: es una medida del Estado que favorece la demanda." },
      { text: "Mantiene 180 departamentos terminados sin vender, que le generan gastos cada mes.", kind: "D", why: "Es interno: el inventario acumulado es resultado de sus decisiones de inversión." },
      { text: "La quiebra de varias constructoras ha vuelto desconfiados a quienes compran en planos.", kind: "A", why: "Es externo: es un hecho del sector que afecta la confianza de los compradores." },
      { text: "Posee terrenos propios, comprados hace años a precios menores que los actuales.", kind: "F", why: "Es interno: los terrenos son activos de la empresa." },
      { text: "Fondos de inversión buscan comprar edificios completos para destinarlos al arriendo.", kind: "O", why: "Es externo: es el interés de otros actores del mercado." },
      { text: "Su deuda de corto plazo vence este año y la caja no alcanza para cubrirla.", kind: "D", why: "Es interno: es un problema de su estructura financiera." },
      { text: "Los bancos endurecieron las condiciones de los créditos hipotecarios y piden un pie más alto.", kind: "A", why: "Es externo: son políticas de los bancos." },
      { text: "Tiene 30 años de trayectoria y más de 50 edificios entregados.", kind: "F", why: "Es interno: la trayectoria respalda a la marca." },
    ],
  },

  // ───────── Lotes ─────────
  {
    id: "foda-lotes-1",
    company: "Praderas de Yarinacocha",
    industry: "lotes",
    context:
      "Dos corredores de terrenos de Pucallpa fundaron una empresa para vender su primer proyecto: 80 lotes en el distrito de Yarinacocha. Compraron el terreno con sus ahorros y ya empezaron a recibir separaciones. Todavía les falta ejecutar pistas y redes de agua.",
    items: [
      { text: "Las lluvias de la temporada inundan los caminos de acceso y frenan las visitas de compradores.", kind: "A", why: "Es externo: es un factor climático." },
      { text: "El gobierno regional asfaltará la vía que conecta el terreno con el centro de la ciudad.", kind: "O", why: "Es externo: es una obra pública que elevará el atractivo de la zona." },
      { text: "Los socios llevan diez años como corredores de terrenos y conocen bien el mercado local.", kind: "F", why: "Es interno: la experiencia de los socios es una capacidad de la empresa." },
      { text: "En la región operan traficantes de terrenos que venden lotes sin título a precios bajos.", kind: "A", why: "Es externo: es competencia ilegal que además genera desconfianza en los compradores." },
      { text: "La empresa solo tiene caja para tres meses de obras.", kind: "D", why: "Es interno: es una limitación de sus propios recursos financieros." },
      { text: "Las cajas municipales ofrecen créditos para comprar terrenos a trabajadores independientes.", kind: "O", why: "Es externo: es una oferta del sistema financiero que facilita la compra." },
      { text: "El terreno está inscrito en Registros Públicos a nombre de la empresa, sin cargas ni litigios.", kind: "F", why: "Es interno: es un activo propio y saneado." },
      { text: "El proyecto todavía no tiene la habilitación urbana aprobada por la municipalidad.", kind: "D", why: "Es interno: obtenerla es un trámite pendiente de la empresa, aunque la apruebe un tercero." },
    ],
  },
  {
    id: "foda-lotes-2",
    company: "Terranova Norte",
    industry: "lotes",
    context:
      "Terranova Norte vende lotes de campo y de playa en Trujillo, Chiclayo y Piura. En cinco años lanzó ocho proyectos y financia directamente a la mayoría de sus compradores. Su fuerza de ventas creció más rápido que sus áreas de soporte.",
    items: [
      { text: "Cuenta con 40 vendedores capacitados y oficinas de venta propias en tres ciudades.", kind: "F", why: "Es interno: el equipo y las oficinas son recursos propios." },
      { text: "Indecopi multa a las inmobiliarias que anuncian servicios que sus proyectos todavía no tienen.", kind: "A", why: "Es externo: es la acción de un regulador." },
      { text: "Paga las comisiones con retraso y sus mejores vendedores se van a otras empresas.", kind: "D", why: "Es interno: el pago de comisiones depende de su gestión." },
      { text: "La construcción de una nueva vía de evitamiento acercará sus terrenos a la ciudad.", kind: "O", why: "Es externo: es una obra pública." },
      { text: "No tiene área de cobranzas y las cuotas vencidas se acumulan sin seguimiento.", kind: "D", why: "Es interno: es una carencia de su organización." },
      { text: "Todos sus proyectos se venden con habilitación urbana aprobada y título inscrito.", kind: "F", why: "Es interno: el saneamiento legal es resultado de su propio trabajo." },
      { text: "Peruanos que viven en el extranjero buscan invertir sus ahorros en terrenos de su región.", kind: "O", why: "Es externo: es una demanda del mercado." },
      { text: "Los anuncios de un posible Fenómeno del Niño alejan a los compradores de terrenos en la costa norte.", kind: "A", why: "Es externo: es un factor climático que afecta la demanda." },
    ],
  },
  {
    id: "foda-lotes-3",
    company: "Urbanizaciones El Palmar",
    industry: "lotes",
    context:
      "Urbanizaciones El Palmar vende lotes en Santa Cruz de la Sierra, Bolivia, desde hace 25 años. Es una marca muy conocida, pero acumula reclamos de compradores por obras que no terminó. Sus ventas nuevas han caído.",
    items: [
      { text: "La escasez de dólares en el país encarece los materiales de construcción importados.", kind: "A", why: "Es externo: es una condición de la economía nacional." },
      { text: "Lleva sus contratos a mano y llegó a vender el mismo lote a dos compradores.", kind: "D", why: "Es interno: es una falla de sus procesos." },
      { text: "Santa Cruz recibe cada año a miles de familias que migran desde otras regiones.", kind: "O", why: "Es externo: es un cambio demográfico que aumenta la demanda." },
      { text: "Tiene maquinaria propia para movimiento de tierras y apertura de calles.", kind: "F", why: "Es interno: la maquinaria es un recurso de la empresa." },
      { text: "Grupos organizados invaden terrenos privados en la periferia de la ciudad.", kind: "A", why: "Es externo: es un problema social que la empresa no controla." },
      { text: "Los bancos lanzaron créditos para construir vivienda sobre lote propio.", kind: "O", why: "Es externo: es una oferta financiera que hace más atractivo comprar un lote." },
      { text: "Tres urbanizaciones vendidas hace años siguen sin el alcantarillado ofrecido en los contratos.", kind: "D", why: "Es interno: es un incumplimiento de la propia empresa." },
      { text: "Es propietaria de 400 hectáreas sin deuda en la zona de expansión de la ciudad.", kind: "F", why: "Es interno: las tierras son activos propios." },
    ],
  },

  // ───────── Autos ─────────
  {
    id: "foda-autos-1",
    company: "Qosqo Motors",
    industry: "autos",
    context:
      "Qosqo Motors abrió hace ocho meses en Cusco como concesionario de una marca china de camionetas y SUV. Tiene una sala de exhibición alquilada y seis trabajadores. Vende entre cinco y ocho unidades al mes.",
    items: [
      { text: "No tiene convenios con bancos ni cajas para ofrecer crédito vehicular en su sala de ventas.", kind: "D", why: "Es interno: gestionar esos convenios depende de la empresa." },
      { text: "Las marcas chinas ganan participación en el mercado peruano por su precio y equipamiento.", kind: "O", why: "Es externo: es una tendencia del mercado que favorece a lo que vende." },
      { text: "Los bloqueos de carreteras retrasan la llegada de vehículos y repuestos desde el puerto.", kind: "A", why: "Es externo: los bloqueos están fuera de su control." },
      { text: "El concesionario no tiene taller propio y envía los vehículos a un tercero para el mantenimiento.", kind: "D", why: "Es interno: es una carencia de sus instalaciones." },
      { text: "El gerente dirigió durante diez años las ventas de otro concesionario de la ciudad.", kind: "F", why: "Es interno: la experiencia del gerente es una capacidad del equipo." },
      { text: "El alza del dólar encarece los vehículos importados.", kind: "A", why: "Es externo: el tipo de cambio no depende de la empresa." },
      { text: "Tiene contrato de exclusividad con la marca para toda la región Cusco.", kind: "F", why: "Es interno: el contrato es un derecho que la empresa ya posee." },
      { text: "Las empresas de turismo de la región están renovando sus flotas de vehículos.", kind: "O", why: "Es externo: es una necesidad de otras empresas." },
    ],
  },
  {
    id: "foda-autos-2",
    company: "Automotriz del Norte",
    industry: "autos",
    context:
      "Automotriz del Norte representa a una marca japonesa en Piura, Chiclayo y Trujillo. Abrió dos de sus tres sedes en los últimos cuatro años y sus ventas de camionetas crecen. Su servicio de taller no avanza al mismo ritmo.",
    items: [
      { text: "Tiene convenios con cuatro bancos y dos cajas para aprobar créditos vehiculares en 48 horas.", kind: "F", why: "Es interno: los convenios son acuerdos logrados por la empresa." },
      { text: "La agroexportación del norte crece y las empresas compran camionetas para sus fundos.", kind: "O", why: "Es externo: es el crecimiento de otro sector que genera demanda." },
      { text: "Suben las tasas de interés de los créditos vehiculares.", kind: "A", why: "Es externo: depende del sistema financiero y encarece la compra." },
      { text: "La empresa no tiene ningún modelo híbrido ni eléctrico en sus salas de venta.", kind: "D", why: "Es interno: es un vacío en la oferta de la propia empresa." },
      { text: "Crece el interés de los compradores por los vehículos híbridos, que gastan menos combustible.", kind: "O", why: "Es externo: es una preferencia del mercado." },
      { text: "Sus técnicos de taller están certificados por la marca que representa.", kind: "F", why: "Es interno: la preparación del personal es un recurso propio." },
      { text: "El inventario de repuestos no está sistematizado y a menudo faltan piezas de alta rotación.", kind: "D", why: "Es interno: es una falla de su gestión de inventarios." },
      { text: "Aumentan los robos de vehículos y autopartes, lo que encarece los seguros.", kind: "A", why: "Es externo: es un problema de seguridad del entorno." },
    ],
  },
  {
    id: "foda-autos-3",
    company: "Automotores Sierras",
    industry: "autos",
    context:
      "Automotores Sierras es una concesionaria de Córdoba, Argentina, con 40 años en el mercado. Conserva una clientela fiel en su taller, pero vende cada vez menos autos nuevos. Los dueños buscan modernizar el negocio.",
    items: [
      { text: "Sus vendedores no responden las consultas que llegan por la página web.", kind: "D", why: "Es interno: es una falla de su proceso de ventas." },
      { text: "Es dueña de su salón de ventas y de su taller.", kind: "F", why: "Es interno: los inmuebles son activos propios." },
      { text: "Las buenas cosechas dejan a los productores de la provincia con dinero para renovar camionetas.", kind: "O", why: "Es externo: depende del resultado del sector agropecuario." },
      { text: "La inflación y la variación del tipo de cambio dificultan fijar precios y planificar compras.", kind: "A", why: "Es externo: son condiciones de la economía del país." },
      { text: "Tiene registrados a 6,000 clientes de taller con su historial de servicio.", kind: "F", why: "Es interno: la base de clientes es un activo de la empresa." },
      { text: "La apertura de importaciones trae nuevas marcas que compiten con precios bajos.", kind: "A", why: "Es externo: es una medida económica que aumenta la competencia." },
      { text: "Mantiene en inventario 60 unidades de modelos ya descontinuados.", kind: "D", why: "Es interno: es resultado de sus propias decisiones de compra." },
      { text: "Los bancos volvieron a ofrecer créditos a tasa fija para comprar autos.", kind: "O", why: "Es externo: es una oferta del sistema financiero." },
    ],
  },

  // ───────── Software ─────────
  {
    id: "foda-software-1",
    company: "Yachay Software",
    industry: "software",
    context:
      "Yachay Software es una empresa de Huancayo formada por tres programadores. Hace un año lanzó un sistema en la nube para controlar la asistencia del personal en pequeñas empresas. Tiene 35 clientes que pagan una suscripción mensual.",
    items: [
      { text: "Empresas del extranjero contratan programadores peruanos a distancia con sueldos en dólares.", kind: "A", why: "Es externo: es el mercado laboral, que dificulta retener y contratar talento." },
      { text: "Las pequeñas empresas prefieren cada vez más pagar software por suscripción que comprar licencias.", kind: "O", why: "Es externo: es una tendencia del mercado." },
      { text: "Proveedores extranjeros ofrecen herramientas similares con versiones gratuitas.", kind: "A", why: "Es externo: es competencia internacional." },
      { text: "No tiene vendedores: los fundadores programan y venden a la vez.", kind: "D", why: "Es interno: es una carencia de su organización." },
      { text: "Los fundadores trabajaron antes en el área de sistemas de un banco.", kind: "F", why: "Es interno: la experiencia de los fundadores es una capacidad del equipo." },
      { text: "Dos clientes aportan el 60 % de los ingresos mensuales de la empresa.", kind: "D", why: "Es interno: la concentración de su cartera es una fragilidad propia." },
      { text: "El sistema se activa en línea en un día, sin visitas ni instalaciones.", kind: "F", why: "Es interno: es una característica del producto que la empresa diseñó." },
      { text: "SUNAFIL fiscaliza que las empresas lleven un registro de asistencia de sus trabajadores.", kind: "O", why: "Es externo: es una exigencia del Estado que genera demanda para su producto." },
    ],
  },
  {
    id: "foda-software-2",
    company: "Nube Contable",
    industry: "software",
    context:
      "Nube Contable vende desde Lima un sistema de facturación electrónica y contabilidad por suscripción. Pasó de 500 a 3,000 empresas clientes en tres años. Su equipo de desarrollo es pequeño para todo lo que el mercado le pide.",
    items: [
      { text: "Los dueños de pequeños negocios gestionan cada vez más sus ventas desde el celular.", kind: "O", why: "Es externo: es un hábito de los usuarios." },
      { text: "Solo dos programadores conocen el núcleo del sistema y la documentación está incompleta.", kind: "D", why: "Es interno: es una fragilidad de su equipo y sus procesos." },
      { text: "Su equipo de soporte atiende todos los días y resuelve la mayoría de casos en pocas horas.", kind: "F", why: "Es interno: el soporte es un proceso propio." },
      { text: "SUNAT ofrece gratis su propio sistema de emisión de comprobantes.", kind: "A", why: "Es externo: es una alternativa sin costo que la empresa no controla." },
      { text: "SUNAT amplía cada año el grupo de contribuyentes obligados a emitir comprobantes electrónicos.", kind: "O", why: "Es externo: es una decisión del regulador que aumenta la demanda." },
      { text: "El sistema no tiene aplicación para celular.", kind: "D", why: "Es interno: es una carencia de su producto." },
      { text: "Está autorizada por SUNAT como proveedor de servicios electrónicos.", kind: "F", why: "Es interno: la autorización es una credencial que la empresa obtuvo." },
      { text: "Aumentan los ataques informáticos a empresas de la región.", kind: "A", why: "Es externo: son acciones de terceros." },
    ],
  },
  {
    id: "foda-software-3",
    company: "Soluciones Regio",
    industry: "software",
    context:
      "Soluciones Regio desarrolla en Monterrey, México, un sistema de gestión para fábricas que vende desde hace 25 años. Sus clientes le son fieles, pero casi no consigue clientes nuevos. El producto se instala en los servidores de cada cliente.",
    items: [
      { text: "La desaceleración de la industria automotriz reduce los presupuestos de tecnología de las fábricas.", kind: "A", why: "Es externo: es la situación económica de un sector cliente." },
      { text: "Su sistema no tiene versión en la nube.", kind: "D", why: "Es interno: es una carencia de su producto." },
      { text: "Sus consultores conocen a fondo los procesos de manufactura de sus clientes.", kind: "F", why: "Es interno: es conocimiento especializado del equipo." },
      { text: "El fisco exige nuevos formatos de factura electrónica y las empresas deben actualizar sus sistemas.", kind: "O", why: "Es externo: es una exigencia regulatoria que genera trabajo para el sector." },
      { text: "Proveedores globales de sistemas en la nube captan a sus clientes con precios por suscripción.", kind: "A", why: "Es externo: es la acción de competidores." },
      { text: "Tiene 400 clientes industriales con contratos de mantenimiento anual vigentes.", kind: "F", why: "Es interno: los contratos son activos que le dan ingresos recurrentes." },
      { text: "La edad promedio de sus programadores supera los 50 años y no hay plan de relevo.", kind: "D", why: "Es interno: la planificación de su personal depende de la empresa." },
      { text: "El traslado de fábricas a México trae nuevas plantas que necesitan sistemas de gestión.", kind: "O", why: "Es externo: es una tendencia económica que crea clientes potenciales." },
    ],
  },

  // ───────── Telecom ─────────
  {
    id: "foda-telecom-1",
    company: "FibraSelva",
    industry: "telecom",
    context:
      "FibraSelva es un proveedor local de internet que opera desde hace un año en Moyobamba, en la región San Martín. Tiene 900 hogares conectados y un equipo de siete personas. Quiere extenderse a Rioja y Tarapoto.",
    items: [
      { text: "Más familias de la región estudian y trabajan desde casa y necesitan internet fijo estable.", kind: "O", why: "Es externo: es un cambio en los hábitos de los hogares." },
      { text: "Tiene red propia de fibra óptica tendida en doce barrios de la ciudad.", kind: "F", why: "Es interno: la red es un activo de la empresa." },
      { text: "Solo tiene dos instaladores: si uno falta, las instalaciones se retrasan varios días.", kind: "D", why: "Es interno: es una limitación de su equipo." },
      { text: "Las tormentas y la caída de árboles dañan con frecuencia el cableado aéreo de la zona.", kind: "A", why: "Es externo: es un factor climático." },
      { text: "Su central de atención solo funciona en horario de oficina; de noche nadie responde las averías.", kind: "D", why: "Es interno: el horario de atención lo define la empresa." },
      { text: "Un operador nacional anunció el despliegue de fibra óptica en la ciudad.", kind: "A", why: "Es externo: es la decisión de un competidor." },
      { text: "El Estado convoca concursos para llevar internet a centros poblados rurales de la región.", kind: "O", why: "Es externo: es una iniciativa pública a la que podría postular." },
      { text: "Tiene al día sus autorizaciones del Ministerio de Transportes y Comunicaciones para operar.", kind: "F", why: "Es interno: las autorizaciones son credenciales que la empresa obtuvo." },
    ],
  },
  {
    id: "foda-telecom-2",
    company: "Móvil Inti",
    industry: "telecom",
    context:
      "Móvil Inti es un operador móvil que alquila la red de una empresa más grande y vende sus planes solo por internet. En tres años llegó a 200,000 líneas, casi todas en Lima. Ahora quiere crecer en las regiones.",
    items: [
      { text: "Los jóvenes prefieren planes prepago flexibles que se manejan por completo desde el celular.", kind: "O", why: "Es externo: es una preferencia del mercado." },
      { text: "Los operadores grandes lanzan planes ilimitados con precios cada vez más bajos.", kind: "A", why: "Es externo: es la acción de competidores." },
      { text: "La portabilidad numérica permite a los usuarios cambiar de operador conservando su número.", kind: "O", why: "Es externo: es una regla del mercado que facilita captar clientes de otros operadores." },
      { text: "Nunca ha hecho publicidad en regiones y fuera de Lima casi nadie conoce la marca.", kind: "D", why: "Es interno: construir la marca depende de su propia inversión." },
      { text: "Su aplicación permite comprar y activar una línea en minutos, sin ir a una tienda.", kind: "F", why: "Es interno: la aplicación es un desarrollo propio." },
      { text: "No tiene red propia, por lo que no puede mejorar la cobertura por su cuenta.", kind: "D", why: "Es interno: es una limitación de sus propios recursos." },
      { text: "Aumentan las estafas por internet y muchos usuarios desconfían de contratar servicios en línea.", kind: "A", why: "Es externo: es un problema del entorno que frena las ventas digitales." },
      { text: "Resuelve el 90 % de las consultas con su chat automatizado, a bajo costo.", kind: "F", why: "Es interno: es un proceso eficiente de la empresa." },
    ],
  },
  {
    id: "foda-telecom-3",
    company: "Telecable Altiplano",
    industry: "telecom",
    context:
      "Telecable Altiplano ofrece televisión por cable e internet en Puno y Juliaca desde hace 22 años. Pierde abonados de televisión cada mes y su red necesita una renovación completa. Aún genera utilidades.",
    items: [
      { text: "Tiene postes y ductos instalados que llegan a 45,000 hogares de Puno y Juliaca.", kind: "F", why: "Es interno: la infraestructura es un activo propio." },
      { text: "El precio de los equipos para redes de fibra óptica ha bajado en los últimos años.", kind: "O", why: "Es externo: es un cambio tecnológico y de precios del mercado." },
      { text: "Las plataformas de streaming reemplazan a la televisión por cable en los hogares.", kind: "A", why: "Es externo: es un servicio sustituto." },
      { text: "La empresa genera caja todos los meses y no tiene deudas con bancos.", kind: "F", why: "Es interno: es su propia situación financiera." },
      { text: "Su red es de cable coaxial antiguo y no soporta velocidades altas de internet.", kind: "D", why: "Es interno: el estado de su red depende de sus inversiones." },
      { text: "OSIPTEL multa a las operadoras que no atienden los reclamos dentro del plazo.", kind: "A", why: "Es externo: es la acción de un regulador." },
      { text: "Los comerciantes de Juliaca demandan internet de alta velocidad para vender en línea.", kind: "O", why: "Es externo: es una necesidad del mercado." },
      { text: "Demora en promedio cinco días en reparar una avería.", kind: "D", why: "Es interno: el tiempo de reparación depende de sus procesos." },
    ],
  },

  // ───────── Consultoría ─────────
  {
    id: "foda-consultoria-1",
    company: "Ruta Consultores",
    industry: "consultoria",
    context:
      "Dos exfuncionarios de banca fundaron Ruta Consultores en Trujillo hace diez meses. Asesoran a pequeñas empresas para ordenar sus finanzas y conseguir crédito. Tienen ocho clientes y trabajan desde una oficina compartida.",
    items: [
      { text: "Las cajas municipales piden a las pequeñas empresas estados financieros ordenados para darles crédito.", kind: "O", why: "Es externo: es una exigencia de terceros que genera demanda de asesoría." },
      { text: "La firma no tiene página web ni casos documentados que mostrar.", kind: "D", why: "Es interno: es una carencia de su propia gestión comercial." },
      { text: "Los programas públicos de apoyo a pequeñas empresas cofinancian servicios de asesoría.", kind: "O", why: "Es externo: son fondos del Estado." },
      { text: "Muchos contadores independientes ofrecen asesoría a precios muy bajos.", kind: "A", why: "Es externo: es competencia." },
      { text: "Los socios trabajaron 15 años en banca y saben cómo se evalúa un crédito.", kind: "F", why: "Es interno: es experiencia del propio equipo." },
      { text: "Trabaja sin contratos escritos y varios clientes le pagan con retraso.", kind: "D", why: "Es interno: formalizar sus acuerdos depende de la firma." },
      { text: "Cuando la economía se enfría, las pequeñas empresas recortan primero el gasto en asesoría.", kind: "A", why: "Es externo: depende del ciclo económico." },
      { text: "Sus gastos fijos son bajos porque usa una oficina compartida.", kind: "F", why: "Es interno: es una decisión propia que cuida su caja." },
    ],
  },
  {
    id: "foda-consultoria-2",
    company: "Altavista Consultores",
    industry: "consultoria",
    context:
      "Altavista Consultores es una firma de Lima con 40 consultores que creció asesorando a empresas mineras en mejora de procesos. Factura el triple que hace cinco años. Le cuesta retener a su gente joven.",
    items: [
      { text: "El 70 % de su facturación proviene de clientes de un solo sector.", kind: "D", why: "Es interno: la composición de su cartera es resultado de su estrategia." },
      { text: "Muchas empresas familiares medianas buscan asesoría para ordenar su sucesión.", kind: "O", why: "Es externo: es una necesidad del mercado." },
      { text: "Las grandes firmas internacionales bajaron sus tarifas para captar empresas medianas.", kind: "A", why: "Es externo: es la acción de competidores." },
      { text: "Tiene contratos marco de tres años con cuatro empresas mineras.", kind: "F", why: "Es interno: los contratos son activos de la firma." },
      { text: "Los conflictos sociales paralizan proyectos mineros y congelan sus presupuestos de consultoría.", kind: "A", why: "Es externo: son hechos del entorno social." },
      { text: "Bancos e inversionistas exigen reportes de sostenibilidad y las empresas buscan quién los elabore.", kind: "O", why: "Es externo: es una exigencia del mercado que crea demanda." },
      { text: "No ofrece línea de carrera y sus consultores jóvenes renuncian antes de los dos años.", kind: "D", why: "Es interno: la gestión del talento depende de la firma." },
      { text: "Trabaja con una metodología propia, documentada y probada en más de 100 proyectos.", kind: "F", why: "Es interno: la metodología es conocimiento de la firma." },
    ],
  },
  {
    id: "foda-consultoria-3",
    company: "Asesores del Pacífico",
    industry: "consultoria",
    context:
      "Asesores del Pacífico es una firma de Cali, Colombia, con 30 años de trayectoria en estudios de mercado y estrategia. Sus tres socios fundadores siguen al frente. En los últimos años perdió proyectos frente a firmas más jóvenes.",
    items: [
      { text: "Empresas extranjeras que llegan al país buscan asesores locales que conozcan el mercado.", kind: "O", why: "Es externo: es una demanda del mercado." },
      { text: "Con inteligencia artificial, las empresas hacen por su cuenta análisis que antes encargaban.", kind: "A", why: "Es externo: es un cambio tecnológico que reduce la demanda del servicio." },
      { text: "Conserva un archivo propio de estudios sectoriales acumulado durante 30 años.", kind: "F", why: "Es interno: es información que pertenece a la firma." },
      { text: "El crecimiento de la agroindustria del Valle del Cauca genera demanda de estudios de mercado.", kind: "O", why: "Es externo: es el desarrollo de un sector." },
      { text: "Elabora sus informes a mano en hojas de cálculo y tarda el doble que otras firmas.", kind: "D", why: "Es interno: es una ineficiencia de sus procesos." },
      { text: "Exempleados de la firma abrieron consultoras pequeñas que cobran tarifas menores.", kind: "A", why: "Es externo: son nuevos competidores." },
      { text: "Atiende desde hace más de diez años a 12 de las 50 empresas más grandes de la región.", kind: "F", why: "Es interno: su cartera de clientes es un activo propio." },
      { text: "Los tres socios atienden en persona a todos los clientes y no delegan.", kind: "D", why: "Es interno: es su forma de organizar el trabajo." },
    ],
  },

  // ───────── Agencia ─────────
  {
    id: "foda-agencia-1",
    company: "La Chispa Digital",
    industry: "agencia",
    context:
      "La Chispa Digital es una agencia de tres personas que empezó hace un año en Ica. Maneja las redes sociales y los anuncios de once negocios locales, entre bodegas de pisco, hoteles y restaurantes. Su fundadora quiere dejar de trabajar de madrugada.",
    items: [
      { text: "Cobra precios que apenas cubren las horas que el equipo dedica a cada cliente.", kind: "D", why: "Es interno: sus tarifas las fija la propia agencia." },
      { text: "Trabajadores independientes ofrecen manejo de redes sociales por montos muy bajos.", kind: "A", why: "Es externo: es competencia." },
      { text: "No firma contratos y sus clientes pueden retirarse de un mes a otro sin aviso.", kind: "D", why: "Es interno: formalizar los acuerdos depende de la agencia." },
      { text: "Los cambios frecuentes en los algoritmos de las redes reducen el alcance de las publicaciones.", kind: "A", why: "Es externo: lo deciden las plataformas." },
      { text: "Los hoteles y bodegas de pisco de Ica empiezan a invertir en publicidad digital.", kind: "O", why: "Es externo: es una tendencia entre los negocios de la zona." },
      { text: "La fundadora es especialista certificada en publicidad de Meta y Google.", kind: "F", why: "Es interno: es una capacidad del equipo." },
      { text: "La vendimia y los feriados largos elevan el presupuesto publicitario de los negocios turísticos.", kind: "O", why: "Es externo: es la estacionalidad del mercado." },
      { text: "El equipo graba y edita video corto con equipos propios, sin subcontratar.", kind: "F", why: "Es interno: es una capacidad de producción propia." },
    ],
  },
  {
    id: "foda-agencia-2",
    company: "Agencia Brava",
    industry: "agencia",
    context:
      "Agencia Brava es una agencia de marketing digital de Lima con 35 personas. Duplicó su facturación en dos años gracias a una cadena de tiendas que le confió toda su publicidad. El equipo trabaja al límite y empieza a incumplir plazos.",
    items: [
      { text: "Varias marcas grandes forman equipos internos de marketing y dejan de contratar agencias.", kind: "A", why: "Es externo: es una decisión de los clientes del sector." },
      { text: "Tiene un equipo de analítica que mide cuántas ventas genera cada campaña.", kind: "F", why: "Es interno: es una capacidad propia." },
      { text: "Un solo cliente aporta el 40 % de su facturación.", kind: "D", why: "Es interno: la concentración de su cartera es una fragilidad propia." },
      { text: "Las empresas industriales empiezan a destinar presupuesto a conseguir clientes por medios digitales.", kind: "O", why: "Es externo: es una tendencia del mercado." },
      { text: "Gestiona sus proyectos por chats y correos, sin una herramienta de seguimiento.", kind: "D", why: "Es interno: es una carencia de sus procesos." },
      { text: "Las restricciones de privacidad de los celulares dificultan medir los resultados de los anuncios.", kind: "A", why: "Es externo: son cambios tecnológicos y regulatorios." },
      { text: "El comercio electrónico crece y más marcas necesitan campañas para vender en línea.", kind: "O", why: "Es externo: es el crecimiento de un sector cliente." },
      { text: "Es socio certificado de las principales plataformas publicitarias.", kind: "F", why: "Es interno: la certificación es una credencial obtenida por la agencia." },
    ],
  },
  {
    id: "foda-agencia-3",
    company: "Grupo Creativo Anáhuac",
    industry: "agencia",
    context:
      "Grupo Creativo Anáhuac es una agencia de publicidad de Ciudad de México con 25 años de trayectoria en televisión y prensa. Ganó premios importantes, pero sus ingresos caen desde hace cuatro años. Ocupa un edificio que ya le queda grande.",
    items: [
      { text: "Los anunciantes trasladan cada año más presupuesto de la televisión a los medios digitales.", kind: "A", why: "Es externo: es un cambio en el mercado publicitario que reduce su negocio principal." },
      { text: "Empresas extranjeras que instalan operaciones en México buscan agencias locales.", kind: "O", why: "Es externo: es la llegada de nuevos clientes potenciales al país." },
      { text: "Alquila un edificio de tres pisos del que solo usa la mitad.", kind: "D", why: "Es interno: es un gasto fijo que la propia agencia decide mantener." },
      { text: "Tiene contratos vigentes con cinco marcas de consumo masivo.", kind: "F", why: "Es interno: los contratos son activos propios." },
      { text: "La agencia no tiene especialistas en medios digitales en su planilla.", kind: "D", why: "Es interno: es una carencia de su equipo." },
      { text: "Las marcas buscan agencias que gestionen sus colaboraciones con creadores de contenido.", kind: "O", why: "Es externo: es una necesidad nueva del mercado." },
      { text: "Agencias pequeñas especializadas en redes sociales captan clientes con tarifas menores.", kind: "A", why: "Es externo: es competencia." },
      { text: "Ha ganado premios internacionales y conserva a sus directores creativos más reconocidos.", kind: "F", why: "Es interno: el talento y el prestigio son activos de la agencia." },
    ],
  },

  // ───────── Agroexportación ─────────
  {
    id: "foda-agroexport-1",
    company: "Kion Selva Central",
    industry: "agroexport",
    context:
      "Kion Selva Central es una empresa de Pichanaki, en Junín, que exporta jengibre fresco desde hace dos campañas. Acopia la producción de 30 agricultores asociados. Envía sus contenedores por el puerto del Callao.",
    items: [
      { text: "No tiene planta de empaque propia y alquila el servicio en plena campaña, cuando es más caro.", kind: "D", why: "Es interno: es una carencia de su infraestructura." },
      { text: "El consumo de jengibre y de productos naturales crece en Europa y Estados Unidos.", kind: "O", why: "Es externo: es una tendencia de consumo internacional." },
      { text: "Vende toda su producción a un solo importador de Países Bajos.", kind: "D", why: "Es interno: la concentración en un cliente es resultado de su gestión comercial." },
      { text: "Los bloqueos de la Carretera Central impiden llegar a tiempo al puerto del Callao.", kind: "A", why: "Es externo: los bloqueos no dependen de la empresa." },
      { text: "El gerente vivió en Países Bajos y negocia con los compradores sin intermediarios.", kind: "F", why: "Es interno: es una capacidad del equipo." },
      { text: "China aumentó su oferta de jengibre y el precio internacional cayó.", kind: "A", why: "Es externo: es el mercado internacional." },
      { text: "Tiene certificación orgánica vigente para las 40 hectáreas de sus productores asociados.", kind: "F", why: "Es interno: la certificación es un logro propio." },
      { text: "Los tratados de libre comercio permiten que el producto peruano ingrese sin arancel a sus mercados.", kind: "O", why: "Es externo: son acuerdos entre países." },
    ],
  },
  {
    id: "foda-agroexport-2",
    company: "Agrícola Chao Azul",
    industry: "agroexport",
    context:
      "Agrícola Chao Azul cultiva arándanos y palta en 600 hectáreas del valle de Chao, en La Libertad. En cinco años triplicó sus envíos a Estados Unidos y Europa. Cada campaña contrata a más de 2,000 cosechadores.",
    items: [
      { text: "Su planta de empaque tiene certificación GlobalG.A.P. y aprobó las auditorías de sus clientes.", kind: "F", why: "Es interno: la certificación es un logro propio." },
      { text: "Más países productores entran a la misma ventana comercial y presionan los precios a la baja.", kind: "A", why: "Es externo: es competencia internacional." },
      { text: "El puerto de Chancay acorta el tiempo de viaje de la fruta hacia Asia.", kind: "O", why: "Es externo: es infraestructura del país." },
      { text: "Todas sus hectáreas tienen riego tecnificado por goteo.", kind: "F", why: "Es interno: es una inversión propia." },
      { text: "El Fenómeno del Niño eleva las temperaturas y reduce la floración de los arándanos.", kind: "A", why: "Es externo: es un fenómeno climático." },
      { text: "Se endeuda en dólares a corto plazo y no usa coberturas de tipo de cambio.", kind: "D", why: "Es interno: es una decisión de su gestión financiera." },
      { text: "El consumo de arándanos crece en los países asiáticos.", kind: "O", why: "Es externo: es una tendencia de la demanda." },
      { text: "No ofrece transporte ni alojamiento adecuados y cada campaña le cuesta conseguir cosechadores.", kind: "D", why: "Es interno: las condiciones que ofrece a su personal dependen de la empresa." },
    ],
  },
  {
    id: "foda-agroexport-3",
    company: "Agrícola Huarango",
    industry: "agroexport",
    context:
      "Agrícola Huarango produce uva de mesa y espárrago en Ica desde hace 30 años. Fue una de las primeras exportadoras del valle. Hoy sus precios de venta bajan y arrastra una deuda alta.",
    items: [
      { text: "El nivel del agua subterránea de Ica desciende y se restringe la perforación de nuevos pozos.", kind: "A", why: "Es externo: es un problema ambiental y regulatorio del valle." },
      { text: "Vende directamente a supermercados de Estados Unidos desde hace 20 años.", kind: "F", why: "Es interno: la relación comercial es un activo construido por la empresa." },
      { text: "Arrastra una deuda bancaria alta que ya refinanció dos veces.", kind: "D", why: "Es interno: es su propia situación financiera." },
      { text: "Las protestas que bloquean la Panamericana Sur en época de cosecha impiden sacar la fruta.", kind: "A", why: "Es externo: son conflictos sociales." },
      { text: "Sus parras son de variedades antiguas con semilla.", kind: "D", why: "Es interno: renovar sus cultivos es una decisión que la empresa no tomó." },
      { text: "Los mercados pagan mejores precios por las nuevas variedades de uva sin semilla.", kind: "O", why: "Es externo: es una preferencia de los compradores." },
      { text: "Tiene planta de empaque y cámaras de frío propias junto al fundo.", kind: "F", why: "Es interno: es infraestructura propia." },
      { text: "Varios países asiáticos aumentan sus compras de fruta fresca peruana.", kind: "O", why: "Es externo: es la demanda internacional." },
    ],
  },

  // ───────── Educación ─────────
  {
    id: "foda-educacion-1",
    company: "Academia Cumbe",
    industry: "educacion",
    context:
      "Academia Cumbe prepara postulantes para el examen de admisión de la universidad nacional, en Cajamarca. Abrió hace un año con cinco profesores y 60 alumnos en aulas alquiladas. Su director también dicta clases.",
    items: [
      { text: "Canales gratuitos de video enseñan los mismos temas del examen.", kind: "A", why: "Es externo: es un servicio sustituto." },
      { text: "Cada año egresan más escolares de la región que quieren postular a una universidad pública.", kind: "O", why: "Es externo: es el crecimiento de la demanda." },
      { text: "El director dicta clases, cobra las pensiones y hace la publicidad, sin apoyo administrativo.", kind: "D", why: "Es interno: es una carencia de su organización." },
      { text: "Sus cinco profesores ingresaron en los primeros puestos a la universidad para la que preparan.", kind: "F", why: "Es interno: es una cualidad de su plana docente." },
      { text: "No tiene plataforma virtual: todas sus clases y simulacros son presenciales.", kind: "D", why: "Es interno: es una carencia de su oferta." },
      { text: "Academias de Lima ofrecen cursos virtuales baratos a postulantes de todo el país.", kind: "A", why: "Es externo: es competencia." },
      { text: "Publica sus propios bancos de preguntas, que actualiza después de cada examen de admisión.", kind: "F", why: "Es interno: es material desarrollado por la academia." },
      { text: "Postulantes de provincias alejadas buscan preparación en línea para no mudarse a la ciudad.", kind: "O", why: "Es externo: es una necesidad del mercado." },
    ],
  },
  {
    id: "foda-educacion-2",
    company: "Instituto Novatec",
    industry: "educacion",
    context:
      "Instituto Novatec ofrece carreras técnicas de tres años en Trujillo y tiene 3,000 alumnos. Su matrícula creció 50 % en cuatro años y abrió una segunda sede. Muchos de sus alumnos abandonan en el primer año.",
    items: [
      { text: "Los programas de becas del Estado financian estudios técnicos a jóvenes de bajos recursos.", kind: "O", why: "Es externo: es un programa público." },
      { text: "No tiene área de tutoría ni hace seguimiento a los alumnos que dejan de asistir.", kind: "D", why: "Es interno: es una carencia de su organización." },
      { text: "El aumento del costo de vida obliga a muchos jóvenes a trabajar y postergar sus estudios.", kind: "A", why: "Es externo: es una condición de la economía." },
      { text: "Las computadoras de sus laboratorios tienen ocho años de antigüedad.", kind: "D", why: "Es interno: renovar los equipos depende del instituto." },
      { text: "Tiene convenios de prácticas firmados con 60 empresas de la región.", kind: "F", why: "Es interno: los convenios son acuerdos logrados por el instituto." },
      { text: "Universidades privadas lanzaron carreras cortas para gente que trabaja, con pensiones bajas.", kind: "A", why: "Es externo: es la acción de competidores." },
      { text: "Las agroexportadoras de La Libertad necesitan técnicos en riego, mantenimiento y logística.", kind: "O", why: "Es externo: es una demanda del mercado laboral." },
      { text: "Está licenciado por el Ministerio de Educación.", kind: "F", why: "Es interno: el licenciamiento es una credencial que el instituto obtuvo." },
    ],
  },
  {
    id: "foda-educacion-3",
    company: "Instituto de Idiomas Mitad del Mundo",
    industry: "educacion",
    context:
      "El Instituto de Idiomas Mitad del Mundo enseña inglés en Quito, Ecuador, desde hace 35 años y tiene ocho sedes. Su matrícula presencial cae cada año. La dirección debe decidir qué sedes mantener.",
    items: [
      { text: "Sus profesores tienen certificación internacional y permanecen muchos años en el instituto.", kind: "F", why: "Es interno: es una cualidad de su plana docente." },
      { text: "Los colegios privados reforzaron su enseñanza de inglés y sus alumnos ya no buscan institutos.", kind: "A", why: "Es externo: es un cambio en la oferta de otras instituciones." },
      { text: "Es centro autorizado para tomar exámenes internacionales de inglés.", kind: "F", why: "Es interno: la autorización es una credencial del instituto." },
      { text: "Mantiene ocho sedes cuyas aulas se ocupan a menos de la mitad.", kind: "D", why: "Es interno: es capacidad propia sin usar que le genera gastos." },
      { text: "Empresas de la ciudad contratan cursos de inglés para su personal y piden clases en sus oficinas.", kind: "O", why: "Es externo: es una demanda corporativa." },
      { text: "Plataformas de idiomas ofrecen clases en línea con profesores nativos a bajo precio.", kind: "A", why: "Es externo: es competencia." },
      { text: "Más jóvenes quieren estudiar o trabajar en el extranjero y necesitan certificar su inglés.", kind: "O", why: "Es externo: es una tendencia de la demanda." },
      { text: "Su material de estudio es impreso y no se actualiza desde hace una década.", kind: "D", why: "Es interno: actualizarlo depende del instituto." },
    ],
  },

  // ───────── Gimnasio ─────────
  {
    id: "foda-gimnasio-1",
    company: "Titan Fit",
    industry: "gimnasio",
    context:
      "Titan Fit es un gimnasio de barrio que abrió hace siete meses en Nuevo Chimbote, en Áncash. Tiene 140 socios, un local alquilado de dos ambientes y tres trabajadores. El dueño es entrenador y atiende en el turno de la tarde.",
    items: [
      { text: "Los médicos recomiendan cada vez más el ejercicio de fuerza a los adultos mayores de 40 años.", kind: "O", why: "Es externo: es una tendencia de salud que amplía el público." },
      { text: "No ofrece clases grupales, aunque tiene un salón vacío.", kind: "D", why: "Es interno: su oferta de servicios la decide el gimnasio." },
      { text: "El dueño es entrenador certificado y diseña la rutina de cada socio.", kind: "F", why: "Es interno: es una capacidad del equipo." },
      { text: "Crece la demanda de clases grupales de baile y entrenamiento funcional entre las mujeres de la zona.", kind: "O", why: "Es externo: es una preferencia del mercado." },
      { text: "El propietario del local anunció que subirá el alquiler al renovar el contrato.", kind: "A", why: "Es externo: es la decisión de un tercero." },
      { text: "No tiene un sistema para controlar las membresías vencidas.", kind: "D", why: "Es interno: es una carencia de sus procesos." },
      { text: "Las máquinas son nuevas y se compraron al contado, sin deuda.", kind: "F", why: "Es interno: son activos propios." },
      { text: "Una cadena de gimnasios de bajo costo abrirá en el centro comercial de la ciudad.", kind: "A", why: "Es externo: es la decisión de un competidor." },
    ],
  },
  {
    id: "foda-gimnasio-2",
    company: "Pulso Fitness",
    industry: "gimnasio",
    context:
      "Pulso Fitness tiene cuatro sedes en Los Olivos, Comas y San Martín de Porres, en Lima Norte. Llegó a 9,000 socios en cinco años y quiere abrir dos sedes más. Cobra la mayoría de sus membresías con cargo automático.",
    items: [
      { text: "Las máquinas de su sede más antigua fallan seguido y no hay plan de mantenimiento.", kind: "D", why: "Es interno: el mantenimiento depende de la empresa." },
      { text: "Lima Norte concentra una población joven cuyos ingresos vienen creciendo.", kind: "O", why: "Es externo: es una característica demográfica y económica de la zona." },
      { text: "Los entrenadores cumplen horario fijo, pero la empresa les paga con recibos por honorarios.", kind: "D", why: "Es interno: la forma de contratar la decide la empresa." },
      { text: "Compra equipos para todas sus sedes a la vez y obtiene mejores precios.", kind: "F", why: "Es interno: su poder de compra es resultado de su tamaño." },
      { text: "Aplicaciones de entrenamiento en casa ofrecen rutinas guiadas por una suscripción muy baja.", kind: "A", why: "Es externo: es un servicio sustituto." },
      { text: "Cobra las membresías con cargo automático, lo que le da ingresos previsibles cada mes.", kind: "F", why: "Es interno: es un sistema de cobro propio." },
      { text: "SUNAFIL fiscaliza a las empresas que encubren relaciones laborales con recibos por honorarios.", kind: "A", why: "Es externo: es la acción de un fiscalizador." },
      { text: "Las empresas contratan convenios de bienestar que incluyen membresías para su personal.", kind: "O", why: "Es externo: es una tendencia del mercado corporativo." },
    ],
  },
  {
    id: "foda-gimnasio-3",
    company: "Gimnasios Olimpo",
    industry: "gimnasio",
    context:
      "Gimnasios Olimpo opera seis sedes en Buenos Aires, Argentina, desde hace 30 años. Tres de ellas tienen piscina temperada. Pierde socios jóvenes y varias sedes parecen no ser rentables.",
    items: [
      { text: "Crece el número de adultos mayores que buscan actividad física supervisada.", kind: "O", why: "Es externo: es una tendencia demográfica." },
      { text: "Cadenas internacionales de gimnasios de bajo costo abren sedes en la ciudad.", kind: "A", why: "Es externo: es competencia." },
      { text: "Tiene piscinas temperadas en tres de sus sedes.", kind: "F", why: "Es interno: es infraestructura propia." },
      { text: "La inflación eleva cada mes los alquileres y las tarifas de luz y gas.", kind: "A", why: "Es externo: es una condición de la economía." },
      { text: "Su escuela de natación para niños tiene profesores formados por la propia empresa.", kind: "F", why: "Es interno: es una capacidad desarrollada por la empresa." },
      { text: "Los vestuarios y las duchas de sus sedes no se renuevan desde hace 15 años.", kind: "D", why: "Es interno: el mantenimiento depende de la empresa." },
      { text: "Los grupos de corredores y de pádel están de moda y buscan dónde hacer preparación física.", kind: "O", why: "Es externo: es una moda deportiva." },
      { text: "No calcula la rentabilidad de cada sede y no sabe cuáles pierden dinero.", kind: "D", why: "Es interno: es una carencia de su control de gestión." },
    ],
  },

  // ───────── Turismo ─────────
  {
    id: "foda-turismo-1",
    company: "Kuélap Aventura",
    industry: "turismo",
    context:
      "Kuélap Aventura es una agencia que tres guías de Chachapoyas, en Amazonas, abrieron hace un año. Ofrece excursiones a Kuélap, Gocta y Karajía. Vende en una oficina frente a la plaza.",
    items: [
      { text: "Tiene sus autorizaciones al día y contrata un seguro para cada pasajero.", kind: "F", why: "Es interno: es una práctica propia." },
      { text: "Las aerolíneas aumentaron sus frecuencias de vuelo hacia el nororiente del país.", kind: "O", why: "Es externo: es la decisión de otras empresas." },
      { text: "Las lluvias provocan derrumbes que cierran las carreteras de acceso a los atractivos.", kind: "A", why: "Es externo: es un factor climático." },
      { text: "No recibe reservas en línea: solo vende en su oficina de la plaza.", kind: "D", why: "Es interno: sus canales de venta los decide la agencia." },
      { text: "Los viajeros reservan sus excursiones por internet antes de llegar al destino.", kind: "O", why: "Es externo: es un hábito de compra de los viajeros." },
      { text: "No tiene vehículos propios y los transportistas que contrata le fallan en temporada alta.", kind: "D", why: "Es interno: es una carencia de sus recursos." },
      { text: "Sus guías nacieron en la zona, tienen carné oficial y hablan inglés.", kind: "F", why: "Es interno: es una capacidad del equipo." },
      { text: "Operadores informales ofrecen los mismos recorridos a mitad de precio.", kind: "A", why: "Es externo: es competencia informal." },
    ],
  },
  {
    id: "foda-turismo-2",
    company: "Inka Rutas",
    industry: "turismo",
    context:
      "Inka Rutas es un operador de turismo receptivo de Cusco que atiende a 18,000 pasajeros al año. Trabaja con agencias mayoristas del extranjero y creció 40 % en tres años. Casi todos sus programas terminan en Machu Picchu.",
    items: [
      { text: "Los viajeros pagan más por experiencias que incluyen convivir con comunidades locales.", kind: "O", why: "Es externo: es una preferencia del mercado." },
      { text: "Las protestas en la región han paralizado el servicio de trenes en varias ocasiones.", kind: "A", why: "Es externo: son conflictos sociales." },
      { text: "El 85 % de sus ventas corresponde a programas de un solo destino.", kind: "D", why: "Es interno: la composición de su oferta es decisión de la empresa." },
      { text: "Tiene una flota propia de 12 minivans.", kind: "F", why: "Es interno: la flota es un activo propio." },
      { text: "Los cupos diarios de ingreso a Machu Picchu son limitados y se agotan en temporada alta.", kind: "A", why: "Es externo: los cupos los define el Estado." },
      { text: "No tiene protocolos para reprogramar pasajeros cuando se suspende el tren.", kind: "D", why: "Es interno: es una carencia de sus procesos." },
      { text: "Crece el interés de los viajeros por rutas alternativas como Choquequirao.", kind: "O", why: "Es externo: es una tendencia de la demanda." },
      { text: "Tiene acuerdos con agencias mayoristas de Estados Unidos y Europa que le envían grupos todo el año.", kind: "F", why: "Es interno: los acuerdos son activos comerciales propios." },
    ],
  },
  {
    id: "foda-turismo-3",
    company: "Viajes Costa Azul",
    industry: "turismo",
    context:
      "Viajes Costa Azul es una agencia de viajes de Lima con 35 años en el mercado. Vende pasajes y paquetes al extranjero en cinco oficinas ubicadas en centros comerciales. Sus ingresos caen desde hace varios años.",
    items: [
      { text: "Crece la demanda de viajes de quinceañeras, lunas de miel y grupos familiares.", kind: "O", why: "Es externo: es una tendencia del mercado." },
      { text: "Sus asesores tienen más de 15 años de experiencia armando viajes de grupos.", kind: "F", why: "Es interno: es experiencia del equipo." },
      { text: "Mantiene cinco oficinas alquiladas a las que llega poco público.", kind: "D", why: "Es interno: es un gasto fijo que la empresa decide mantener." },
      { text: "Las plataformas de reserva en línea permiten armar un viaje completo sin intermediarios.", kind: "A", why: "Es externo: es un servicio sustituto." },
      { text: "Los adultos mayores viajan más y prefieren comprar con un asesor en persona.", kind: "O", why: "Es externo: es una preferencia de un segmento del mercado." },
      { text: "La agencia no vende por internet: toda compra exige ir a una de sus oficinas.", kind: "D", why: "Es interno: sus canales de venta los decide la agencia." },
      { text: "Tiene contratos vigentes con empresas que le encargan sus viajes de negocios.", kind: "F", why: "Es interno: los contratos son activos propios." },
      { text: "Las aerolíneas redujeron las comisiones que pagan a las agencias por vender pasajes.", kind: "A", why: "Es externo: es una decisión de sus proveedores." },
    ],
  },

  // ───────── Logística ─────────
  {
    id: "foda-logistica-1",
    company: "Envíos Huamanga",
    industry: "logistica",
    context:
      "Envíos Huamanga es una empresa de encomiendas que dos choferes de Ayacucho fundaron hace un año. Con dos furgonetas lleva paquetes de comerciantes entre Ayacucho y Lima. Todavía registra sus envíos en un cuaderno.",
    items: [
      { text: "Tiene un local propio cerca del terminal terrestre que funciona como punto de recojo.", kind: "F", why: "Es interno: el local es un activo de la empresa." },
      { text: "Los derrumbes en la vía Los Libertadores durante las lluvias cierran el paso por horas o días.", kind: "A", why: "Es externo: es un factor climático." },
      { text: "Los envíos no se pueden rastrear: el cliente solo sabe de su paquete cuando llega.", kind: "D", why: "Es interno: es una carencia de sus sistemas." },
      { text: "El precio del diésel viene subiendo.", kind: "A", why: "Es externo: lo determina el mercado de combustibles." },
      { text: "Las furgonetas no tienen seguro de carga y cada pérdida la paga la empresa.", kind: "D", why: "Es interno: contratar un seguro depende de la empresa." },
      { text: "Artesanos y productores de Ayacucho venden cada vez más por internet a clientes de Lima.", kind: "O", why: "Es externo: es una tendencia que aumenta los envíos." },
      { text: "Los socios fueron choferes de ruta durante años y conocen a los comerciantes de la zona.", kind: "F", why: "Es interno: es experiencia del propio equipo." },
      { text: "Las empresas de courier de Lima buscan socios locales que repartan dentro de Ayacucho.", kind: "O", why: "Es externo: es una necesidad de otras empresas." },
    ],
  },
  {
    id: "foda-logistica-2",
    company: "Andina Cargo Express",
    industry: "logistica",
    context:
      "Andina Cargo Express reparte paquetes de tiendas en línea en Lima y Callao. En cuatro años pasó de 10 a 80 vehículos, la mitad de ellos de terceros. Cobra a sus clientes a 60 días.",
    items: [
      { text: "No capacita a los conductores de terceros que hacen la mitad de sus repartos.", kind: "D", why: "Es interno: capacitar depende de la empresa." },
      { text: "Las municipalidades restringen los horarios de circulación de los vehículos de carga.", kind: "A", why: "Es externo: es una regulación." },
      { text: "Cobra a 60 días, pero paga el combustible y la planilla al contado.", kind: "D", why: "Es interno: sus condiciones de cobro y pago las negocia la empresa." },
      { text: "Su sistema de rastreo en tiempo real se integra con las tiendas en línea de sus clientes.", kind: "F", why: "Es interno: es tecnología propia." },
      { text: "Las ventas por internet crecen y más tiendas encargan sus repartos a terceros.", kind: "O", why: "Es externo: es una tendencia del mercado." },
      { text: "Tiene un centro de distribución propio en Lurín.", kind: "F", why: "Es interno: es infraestructura propia." },
      { text: "Los asaltos a vehículos de reparto aumentan en varias zonas de Lima y Callao.", kind: "A", why: "Es externo: es un problema de seguridad del entorno." },
      { text: "En campañas como Cyber Wow y Navidad, las tiendas buscan couriers de respaldo.", kind: "O", why: "Es externo: es una demanda estacional del mercado." },
    ],
  },
  {
    id: "foda-logistica-3",
    company: "Transportes Pacífico Norte",
    industry: "logistica",
    context:
      "Transportes Pacífico Norte mueve carga entre Lima y la costa norte desde hace 35 años, con sede en Chiclayo. Tiene 120 camiones y clientes industriales de muchos años. Sus costos suben y sus fletes no.",
    items: [
      { text: "Los bancos ofrecen leasing para la renovación de camiones.", kind: "O", why: "Es externo: es una oferta del sistema financiero." },
      { text: "Tiene terminales propios en Chiclayo, Trujillo, Piura y Lima.", kind: "F", why: "Es interno: son activos de la empresa." },
      { text: "Transportistas informales cobran fletes muy bajos porque no pagan impuestos ni seguros.", kind: "A", why: "Es externo: es competencia informal." },
      { text: "La agroexportación del norte necesita más transporte refrigerado hacia los puertos.", kind: "O", why: "Es externo: es la demanda de otro sector." },
      { text: "Aumentan las extorsiones a empresas de transporte en varias ciudades de la costa norte.", kind: "A", why: "Es externo: es un problema de seguridad del entorno." },
      { text: "No mide el consumo de combustible por camión ni por conductor.", kind: "D", why: "Es interno: es una carencia de su control de costos." },
      { text: "Sus conductores tienen en promedio 12 años en la empresa y pocos accidentes.", kind: "F", why: "Es interno: es una cualidad de su equipo." },
      { text: "La edad promedio de su flota supera los 15 años y los camiones pasan mucho tiempo en el taller.", kind: "D", why: "Es interno: renovar la flota depende de la empresa." },
    ],
  },

  // ───────── Limpieza ─────────
  {
    id: "foda-limpieza-1",
    company: "Servicios Caplina",
    industry: "limpieza",
    context:
      "Servicios Caplina es una empresa de limpieza de oficinas y consultorios que empezó hace nueve meses en Tacna. Tiene ocho trabajadores y cinco clientes privados. Su dueña quiere venderle también al Estado.",
    items: [
      { text: "La dueña supervisó durante ocho años la limpieza de una clínica y conoce los protocolos.", kind: "F", why: "Es interno: es experiencia del propio equipo." },
      { text: "No tiene capital para comprar máquinas lavadoras de piso y todo el trabajo es manual.", kind: "D", why: "Es interno: es una limitación de sus recursos." },
      { text: "Las entidades públicas de la región convocan cada año concursos para contratar limpieza.", kind: "O", why: "Es externo: es una demanda del Estado." },
      { text: "El gobierno anunció un aumento de la remuneración mínima, que eleva la planilla de todo el rubro.", kind: "A", why: "Es externo: es una decisión del Estado." },
      { text: "Tiene a sus ocho trabajadores en planilla, con seguro y exámenes médicos al día.", kind: "F", why: "Es interno: la formalidad laboral es una práctica propia que le da respaldo." },
      { text: "Empresas informales no pagan beneficios laborales y cobran mucho menos por el servicio.", kind: "A", why: "Es externo: es competencia informal." },
      { text: "Abren nuevas clínicas y consultorios en la ciudad por la llegada de pacientes chilenos.", kind: "O", why: "Es externo: es el crecimiento de un sector cliente." },
      { text: "Aún no está inscrita en el registro de proveedores del Estado y no puede postular a concursos.", kind: "D", why: "Es interno: la inscripción es un trámite pendiente de la empresa." },
    ],
  },
  {
    id: "foda-limpieza-2",
    company: "Mantenimiento Integral Sur",
    industry: "limpieza",
    context:
      "Mantenimiento Integral Sur da servicios de limpieza y mantenimiento a mineras, clínicas y entidades públicas desde Arequipa. Tiene 600 operarios y duplicó sus contratos en tres años. Varias de sus propuestas ganadoras le dejan poco margen.",
    items: [
      { text: "Calcula mal los costos laborales en sus propuestas y gana contratos con márgenes muy bajos.", kind: "D", why: "Es interno: es una falla de su proceso de costeo." },
      { text: "Las clínicas buscan proveedores especializados en desinfección de ambientes.", kind: "O", why: "Es externo: es una necesidad del mercado." },
      { text: "Las entidades públicas suelen pagar a sus proveedores con meses de retraso.", kind: "A", why: "Es externo: es la conducta de los clientes estatales." },
      { text: "Acredita experiencia en contratos públicos, requisito para postular a licitaciones grandes.", kind: "F", why: "Es interno: la experiencia acreditada es un activo propio." },
      { text: "No tiene programa de inducción y los operarios nuevos empiezan sin conocer los protocolos.", kind: "D", why: "Es interno: la inducción depende de la empresa." },
      { text: "Las mineras del sur amplían operaciones y encargan a terceros la limpieza de sus campamentos.", kind: "O", why: "Es externo: es el crecimiento de un sector cliente." },
      { text: "El gobierno discute cambios a las normas de tercerización que restringirían el servicio.", kind: "A", why: "Es externo: es un posible cambio regulatorio." },
      { text: "Tiene certificación ISO 9001 y está homologada como proveedora de dos mineras.", kind: "F", why: "Es interno: son credenciales obtenidas por la empresa." },
    ],
  },
  {
    id: "foda-limpieza-3",
    company: "Limpiezas Metropolitanas",
    industry: "limpieza",
    context:
      "Limpiezas Metropolitanas atiende centros comerciales, bancos y oficinas en Lima desde hace 25 años, con 1,500 operarios. Sus clientes le renegocian los precios cada año. Paga la planilla con dificultad.",
    items: [
      { text: "Usa sobregiros bancarios para pagar la planilla de cada quincena.", kind: "D", why: "Es interno: es un problema de su gestión de caja." },
      { text: "Competidores nuevos ofrecen precios muy bajos en las licitaciones para ganar experiencia.", kind: "A", why: "Es externo: es competencia." },
      { text: "Se construyen nuevos centros empresariales y almacenes en Lima que requerirán limpieza.", kind: "O", why: "Es externo: es el crecimiento del mercado." },
      { text: "Sus supervisores tienen más de diez años en la empresa y conocen cada local.", kind: "F", why: "Es interno: es experiencia de su equipo." },
      { text: "Los clientes corporativos recortan presupuestos y renegocian los contratos a la baja.", kind: "A", why: "Es externo: es el poder de negociación de los clientes." },
      { text: "Tiene contratos vigentes con tres cadenas de centros comerciales y un banco.", kind: "F", why: "Es interno: los contratos son activos propios." },
      { text: "Existen máquinas automáticas de limpieza que reducen horas de trabajo en áreas grandes.", kind: "O", why: "Es externo: es tecnología disponible en el mercado." },
      { text: "Acumula multas laborales por pagar fuera de plazo las gratificaciones y la CTS.", kind: "D", why: "Es interno: los retrasos son incumplimientos de la propia empresa." },
    ],
  },

  // ───────── Maquinaria ─────────
  {
    id: "foda-maquinaria-1",
    company: "Maqui Norte",
    industry: "maquinaria",
    context:
      "Maqui Norte es una empresa de Piura que dos técnicos fundaron hace un año. Vende y repara bombas y motores para fundos agrícolas. Importa cada equipo cuando el cliente lo pide.",
    items: [
      { text: "No ofrece financiamiento ni tiene convenio de leasing con ningún banco.", kind: "D", why: "Es interno: gestionar esos convenios depende de la empresa." },
      { text: "El alza del dólar encarece los equipos importados.", kind: "A", why: "Es externo: el tipo de cambio no depende de la empresa." },
      { text: "Sus técnicos están certificados por el fabricante de las bombas que vende.", kind: "F", why: "Es interno: es una capacidad del equipo." },
      { text: "El Estado cofinancia sistemas de riego tecnificado para pequeños agricultores organizados.", kind: "O", why: "Es externo: es un programa público." },
      { text: "Importadores de Lima venden por internet equipos de marcas asiáticas con envío a todo el país.", kind: "A", why: "Es externo: es competencia." },
      { text: "Atiende emergencias en el fundo en menos de 24 horas con su camioneta taller.", kind: "F", why: "Es interno: es un servicio y un recurso propios." },
      { text: "Los fundos agroexportadores de Piura amplían sus áreas con riego tecnificado.", kind: "O", why: "Es externo: es el crecimiento de un sector cliente." },
      { text: "No mantiene equipos en stock y el cliente espera 60 días por cada importación.", kind: "D", why: "Es interno: es una limitación de su capital e inventario." },
    ],
  },
  {
    id: "foda-maquinaria-2",
    company: "Equipos Mineros Atacama",
    industry: "maquinaria",
    context:
      "Equipos Mineros Atacama vende y alquila bombas y equipos para minería desde Antofagasta, Chile. Triplicó su flota de alquiler en cuatro años. Depende mucho de una sola compañía minera.",
    items: [
      { text: "El alto precio del cobre impulsa nuevos proyectos y ampliaciones mineras.", kind: "O", why: "Es externo: depende del mercado internacional de metales." },
      { text: "Los paros portuarios retrasan la llegada de repuestos importados.", kind: "A", why: "Es externo: son conflictos ajenos a la empresa." },
      { text: "Su taller de reparación atiende las 24 horas, todos los días del año.", kind: "F", why: "Es interno: es un servicio propio." },
      { text: "Fabricantes asiáticos instalan filiales en el país y venden directamente a las mineras.", kind: "A", why: "Es externo: es la acción de competidores." },
      { text: "Una sola compañía minera concentra la mitad de su facturación.", kind: "D", why: "Es interno: la concentración de su cartera es una fragilidad propia." },
      { text: "Tiene la representación exclusiva de una marca europea de bombas para el norte de Chile.", kind: "F", why: "Es interno: el contrato de representación es un activo propio." },
      { text: "La demanda mundial de litio atrae inversiones a los salares del norte.", kind: "O", why: "Es externo: es una tendencia de la economía mundial." },
      { text: "Controla sus equipos en alquiler con planillas manuales y pierde horas que podría facturar.", kind: "D", why: "Es interno: es una carencia de sus sistemas." },
    ],
  },
  {
    id: "foda-maquinaria-3",
    company: "Tecnimaq Industrial",
    industry: "maquinaria",
    context:
      "Tecnimaq Industrial fabrica calderas y equipos para plantas de alimentos en el Callao desde hace 45 años. Tiene una clientela amplia que le compra repuestos y servicio. Vende cada vez menos equipos nuevos.",
    items: [
      { text: "El Estado ofrece fondos concursables para proyectos de innovación en empresas manufactureras.", kind: "O", why: "Es externo: es un programa público." },
      { text: "Sus diseños no se actualizan desde hace años y consumen más energía que los modelos nuevos.", kind: "D", why: "Es interno: actualizar sus productos depende de la empresa." },
      { text: "Tiene más de 2,000 equipos instalados en el país, a los que vende repuestos y servicio.", kind: "F", why: "Es interno: su base instalada es un activo comercial propio." },
      { text: "El precio internacional del acero viene subiendo.", kind: "A", why: "Es externo: es el mercado de materias primas." },
      { text: "Tiene una planta propia de 5,000 metros cuadrados, totalmente pagada.", kind: "F", why: "Es interno: es un activo de la empresa." },
      { text: "La industria de alimentos y bebidas instala nuevas plantas en el país.", kind: "O", why: "Es externo: es el crecimiento de un sector cliente." },
      { text: "Equipos importados de China llegan con precios menores y plazos de entrega más cortos.", kind: "A", why: "Es externo: es competencia de productos importados." },
      { text: "No tiene planos digitalizados: el diseño lo conocen tres ingenieros próximos a jubilarse.", kind: "D", why: "Es interno: es una fragilidad de su equipo y sus procesos." },
    ],
  },
];

export default data;
