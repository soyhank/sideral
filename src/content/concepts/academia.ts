import type { Concept } from "../types";

const data: Concept[] = [
  // ===== Finanzas =====
  {
    id: "con-flujo-de-caja",
    title: "Flujo de caja",
    area: "finanzas",
    summary:
      "Es el registro del dinero que realmente entra y sale de la empresa en un período, y muestra si podrás pagar tus obligaciones.",
    body: "El flujo de caja ordena los cobros y pagos en efectivo de cada período. No es lo mismo que la utilidad: puedes vender mucho al crédito, mostrar ganancia en el estado de resultados y aun así quedarte sin dinero para pagar la planilla.\n\nFórmula básica: saldo final de caja = saldo inicial + ingresos de efectivo - egresos de efectivo. Se proyecta hacia adelante para anticipar los meses en que faltará dinero y conseguir financiamiento con tiempo y a mejor tasa.\n\nUna empresa rentable puede quebrar por falta de caja. Por eso se dice que la utilidad es una opinión y la caja es un hecho.",
    example:
      "Confecciones Kallpa, un taller de Gamarra, vende S/ 120,000 en la campaña escolar, pero cobra a 60 días. En el trimestre solo ingresan S/ 70,000 y debe pagar S/ 95,000 entre telas, planilla y alquiler. Aunque su estado de resultados muestra utilidad, le faltan S/ 25,000 de caja y debe cubrirlos con un préstamo de una caja municipal.",
    inGame:
      "Antes de cerrar tus decisiones del trimestre, suma lo que gastarás en producción, marketing, planilla y cuotas de préstamos y compáralo con tu caja. Si la caja queda negativa entra un sobregiro caro, así que conviene pedir un préstamo a tiempo. Revisa el flujo de efectivo después de cada trimestre.",
  },
  {
    id: "con-capital-de-trabajo",
    title: "Capital de trabajo",
    area: "finanzas",
    summary:
      "Es el dinero que la empresa necesita para operar día a día mientras espera cobrar lo que vende.",
    body: "El capital de trabajo financia el ciclo del negocio: compras insumos, produces, vendes y recién después cobras. Mientras ese dinero da la vuelta, igual debes pagar sueldos, alquiler y proveedores.\n\nFórmula: capital de trabajo = activo corriente - pasivo corriente. El activo corriente incluye caja, cuentas por cobrar e inventarios. El pasivo corriente son las deudas que vencen en menos de un año.\n\nSi crece la venta, también crece la necesidad de capital de trabajo, porque hay más inventario y más cuentas por cobrar. Muchas empresas que crecen rápido se ahogan por no prever esto.",
    example:
      "Distribuidora Tumi, de Chiclayo, tiene S/ 40,000 en caja, S/ 90,000 por cobrar y S/ 70,000 en inventario: su activo corriente es S/ 200,000. Debe S/ 130,000 a proveedores y bancos en el corto plazo. Su capital de trabajo es S/ 70,000. Si sus clientes pasan de pagar a 30 días a pagar a 60, necesitará más financiamiento aunque venda lo mismo.",
    inGame:
      "Cuando subas la producción o abras una región, reserva caja para el mayor inventario y los gastos que llegan antes que las ventas. En el estado de situación financiera compara tu activo corriente con tu pasivo corriente para saber si tienes holgura.",
  },
  {
    id: "con-apalancamiento-financiero",
    title: "Apalancamiento financiero",
    area: "finanzas",
    summary:
      "Es usar deuda para financiar el negocio y así aumentar la rentabilidad de los dueños, a cambio de asumir más riesgo.",
    body: "Una empresa se financia con dinero de los socios (patrimonio) o con dinero prestado (deuda). Si el negocio rinde más que lo que cuesta la deuda, endeudarse eleva la ganancia de los socios. Si rinde menos, la deuda la reduce.\n\nIndicador común: grado de endeudamiento = pasivo total / patrimonio. Mientras más alto, más depende la empresa de terceros y más pesan los intereses.\n\nLa deuda es una obligación fija: los intereses se pagan vendas mucho o poco. Por eso un apalancamiento alto multiplica las ganancias en los buenos trimestres y las pérdidas en los malos.",
    example:
      "Una cafetería de Cusco tiene activos por S/ 200,000 que generan S/ 30,000 al año antes de impuestos (15 %). Sin deuda, los socios ganan 15 % sobre su aporte. Si financia la mitad con un préstamo al 10 %, paga S/ 10,000 de intereses, le quedan S/ 20,000 y los socios ganan 20 % sobre los S/ 100,000 que pusieron. Pero si el negocio solo rinde S/ 12,000, tras los intereses quedan S/ 2,000, apenas 2 %.",
    inGame:
      "Pide préstamos para inversiones que rindan más que la tasa de interés, como capacidad o una región con demanda comprobada. Vigila tu nivel de endeudamiento en los ratios y recuerda que las noticias pueden subir la tasa. Evita el sobregiro, que es la deuda más cara.",
  },
  {
    id: "con-van-y-tir",
    title: "VAN y TIR",
    area: "finanzas",
    summary:
      "Son dos indicadores para decidir si una inversión vale la pena, comparando lo que pones hoy con lo que recibirás en el futuro.",
    body: "Un sol de hoy vale más que un sol del próximo año, porque hoy puedes invertirlo. El valor actual neto (VAN) trae los flujos futuros a valor de hoy con una tasa de descuento y les resta la inversión.\n\nFórmula: VAN = - inversión inicial + suma de [flujo del período / (1 + tasa) elevado al número del período]. Si el VAN es mayor que cero, el proyecto crea valor. Si es negativo, lo destruye.\n\nLa tasa interna de retorno (TIR) es la tasa que hace que el VAN sea cero, es decir, la rentabilidad propia del proyecto. Se acepta cuando la TIR supera el costo del dinero (la tasa que te cobra el banco o la que exigen los socios).",
    example:
      "Una pollería de Huancayo evalúa un segundo local: invierte S/ 100,000 y espera S/ 40,000 de flujo anual durante 4 años. Con una tasa de 12 %, el valor actual de los flujos es cerca de S/ 121,500 y el VAN es de unos S/ 21,500 positivos. La TIR es cercana a 22 %, mayor que el 12 % exigido, así que el proyecto conviene. Si los flujos duraran solo 3 años, el VAN sería negativo.",
    inGame:
      "Úsalo antes de abrir una región, lanzar una línea de producto o ampliar capacidad: estima cuánta caja adicional te dará por trimestre y compárala con la inversión y con la tasa de tus préstamos. Si tarda demasiado en recuperarse, espera.",
  },
  {
    id: "con-liquidez",
    title: "Liquidez",
    area: "finanzas",
    summary:
      "Es la capacidad de la empresa para pagar sus deudas de corto plazo con los recursos que puede convertir pronto en efectivo.",
    body: "Una empresa es líquida cuando tiene o puede conseguir rápido el dinero para cumplir con proveedores, planilla, impuestos y cuotas de préstamos. No es lo mismo que ser rentable.\n\nRatios más usados: razón corriente = activo corriente / pasivo corriente. Prueba ácida = (activo corriente - inventarios) / pasivo corriente. La prueba ácida es más exigente porque el inventario puede demorar en venderse.\n\nComo referencia general, una razón corriente menor que 1 indica que las deudas de corto plazo superan a los recursos de corto plazo. Un valor muy alto tampoco es ideal: puede significar dinero ocioso o inventario inmovilizado.",
    example:
      "Botica San Blas, de Ayacucho, tiene activo corriente de S/ 150,000, de los cuales S/ 90,000 son medicinas en inventario, y pasivo corriente de S/ 100,000. Su razón corriente es 1.5, pero su prueba ácida es 0.6. Si los proveedores exigen el pago hoy, no le alcanza sin liquidar mercadería.",
    inGame:
      "Revisa los ratios de liquidez en tus reportes después de cada trimestre. Si bajan, reduce la producción que no vas a vender o toma un préstamo planificado antes de caer en sobregiro. No repartas dividendos con la caja justa.",
  },
  {
    id: "con-roe-y-roa",
    title: "ROE y ROA",
    area: "finanzas",
    summary:
      "Miden qué tan rentable es la empresa: el ROE respecto al dinero de los socios y el ROA respecto a todos los activos.",
    body: "ROE (rentabilidad sobre el patrimonio) = utilidad neta / patrimonio. Indica cuánto ganan los dueños por cada sol invertido. ROA (rentabilidad sobre los activos) = utilidad neta / activo total. Indica qué tan bien se usan todos los recursos, sin importar quién los financió.\n\nSi el ROE es mucho mayor que el ROA, la empresa usa bastante deuda. Eso no es malo por sí solo, pero aumenta el riesgo.\n\nAmbos ratios se comparan contra períodos anteriores, contra los competidores y contra otras alternativas de inversión. Un ROE menor que lo que paga un depósito a plazo indica que el negocio no compensa el riesgo que asumen los socios.",
    example:
      "Agroexportadora Valle Chira, de Piura, obtuvo una utilidad neta de S/ 240,000 con activos por S/ 2,000,000 y patrimonio de S/ 1,200,000. Su ROA es 12 % y su ROE es 20 %. La diferencia se explica porque S/ 800,000 de sus activos están financiados con deuda.",
    inGame:
      "Mira el ROE y el ROA en la sección de ratios y sigue su evolución de un trimestre a otro. Una rentabilidad sostenida suele reflejarse en el precio de la acción. Si tu ROA cae, tienes activos o inventario que no están generando ventas.",
  },
  {
    id: "con-ebitda",
    title: "EBITDA",
    area: "finanzas",
    summary:
      "Es la utilidad operativa antes de restar intereses, impuestos, depreciación y amortización, y aproxima la caja que genera la operación.",
    body: "EBITDA viene del inglés: ganancias antes de intereses, impuestos, depreciación y amortización. Fórmula práctica: EBITDA = utilidad operativa + depreciación + amortización de intangibles.\n\nSirve para comparar empresas con distinto nivel de deuda, distinta carga tributaria o distinta antigüedad de activos, porque se concentra en el desempeño del negocio principal. Margen EBITDA = EBITDA / ventas.\n\nTiene límites: no es flujo de caja. No considera las inversiones en equipos, los cambios en el capital de trabajo ni el pago de deudas. Una empresa con buen EBITDA puede tener problemas de caja si cobra tarde o invierte mucho.",
    example:
      "Gimnasio Fuerza Andina, de Arequipa, vende S/ 500,000 al año. Su utilidad operativa es S/ 60,000 después de restar S/ 40,000 de depreciación de máquinas. Su EBITDA es S/ 100,000 y su margen EBITDA es 20 %. Un banco suele comparar ese EBITDA con la deuda total para decidir cuánto prestarle.",
    inGame:
      "Calcula tu EBITDA con el estado de resultados: utilidad operativa más depreciación. Úsalo para comparar trimestres sin que te distorsionen los intereses de préstamos o las inversiones recientes, y contrástalo siempre con tu caja real.",
  },

  // ===== Contabilidad =====
  {
    id: "con-estado-de-resultados",
    title: "Estado de resultados",
    area: "contabilidad",
    summary:
      "Es el reporte que muestra cuánto vendió, cuánto gastó y cuánto ganó o perdió la empresa en un período.",
    body: "El estado de resultados se lee de arriba hacia abajo. Ventas - costo de ventas = utilidad bruta. Utilidad bruta - gastos de administración y de ventas = utilidad operativa. Utilidad operativa - gastos financieros = utilidad antes de impuestos. Luego se resta el impuesto a la renta y queda la utilidad neta.\n\nLas ventas se registran sin IGV, porque ese impuesto no es ingreso de la empresa: se cobra por encargo del Estado.\n\nSe elabora con el criterio del devengado: los ingresos y gastos se anotan cuando ocurren, no cuando se cobran o pagan. Por eso la utilidad no coincide con la caja.",
    example:
      "Bebidas Selva Viva, de Tarapoto, vendió S/ 300,000 en el trimestre. Su costo de ventas fue S/ 165,000 (utilidad bruta S/ 135,000), sus gastos operativos S/ 90,000 (utilidad operativa S/ 45,000) y pagó S/ 5,000 de intereses. Su utilidad antes de impuestos es S/ 40,000. Con la tasa de 29.5 % le corresponden S/ 11,800 de impuesto a la renta y su utilidad neta es S/ 28,200.",
    inGame:
      "Es el primer reporte que debes leer tras cada trimestre. Identifica en qué línea se te va el margen: costo de ventas (precio o costo unitario), gastos operativos (marketing, planilla) o gastos financieros (deuda). Ajusta la decisión que corresponda.",
  },
  {
    id: "con-estado-de-situacion-financiera",
    title: "Estado de situación financiera",
    area: "contabilidad",
    summary:
      "Es la foto de la empresa en una fecha: lo que tiene, lo que debe y lo que pertenece a los socios.",
    body: "Antes se le llamaba balance general. Se basa en la ecuación contable: activo = pasivo + patrimonio. Todo lo que la empresa posee fue financiado por terceros o por los dueños.\n\nEl activo se ordena de lo más líquido a lo menos líquido: corriente (caja, cuentas por cobrar, inventarios) y no corriente (maquinaria, locales, vehículos). El pasivo se separa en corriente (vence en menos de un año) y no corriente.\n\nEl patrimonio incluye el capital aportado y los resultados acumulados. Si la empresa pierde dinero varios períodos seguidos, el patrimonio se reduce y puede volverse negativo.",
    example:
      "Courier Rápido Sur, de Tacna, tiene S/ 50,000 en caja, S/ 80,000 por cobrar y S/ 270,000 en motos y furgonetas: activo total de S/ 400,000. Debe S/ 60,000 a proveedores y S/ 140,000 a un banco. Su patrimonio es S/ 200,000, así que la mitad de la empresa está financiada con deuda.",
    inGame:
      "Consulta el estado de situación financiera para ver cuánta deuda cargas y cuánto inventario tienes sin vender. Si el pasivo crece más rápido que el activo, frena los préstamos y los dividendos hasta recuperar patrimonio.",
  },
  {
    id: "con-estado-de-flujos-de-efectivo",
    title: "Estado de flujos de efectivo",
    area: "contabilidad",
    summary:
      "Es el reporte que explica de dónde vino y en qué se usó el efectivo, separado en operación, inversión y financiamiento.",
    body: "Este estado responde una pregunta simple: por qué cambió la caja entre el inicio y el final del período. Agrupa los movimientos en tres actividades.\n\nOperación: cobros a clientes y pagos a proveedores, personal e impuestos. Inversión: compra o venta de maquinaria, locales y otros activos de largo plazo. Financiamiento: préstamos recibidos, amortizaciones, aportes de socios y dividendos.\n\nLo sano es que la operación genere efectivo de forma constante. Si la caja solo crece por préstamos mientras la operación la consume, el negocio se sostiene con deuda y tarde o temprano tendrá problemas.",
    example:
      "Instituto Nuevo Horizonte, de Trujillo, empezó el año con S/ 30,000 en caja. Su operación generó S/ 120,000, invirtió S/ 150,000 en un laboratorio de cómputo y recibió un préstamo de S/ 60,000. El cambio neto fue de S/ 30,000 positivos y terminó el año con S/ 60,000 en caja.",
    inGame:
      "Revisa el flujo de efectivo para saber si tu caja viene de vender o de endeudarte. Si el flujo de operación es negativo dos trimestres seguidos, corrige precio, costos o gastos antes de pedir más préstamos.",
  },
  {
    id: "con-depreciacion",
    title: "Depreciación",
    area: "contabilidad",
    summary:
      "Es el reparto del costo de un activo fijo a lo largo de los años en que se usa, y se registra como gasto sin salida de dinero.",
    body: "Las máquinas, vehículos y equipos pierden valor por el uso, el paso del tiempo y la obsolescencia. En vez de cargar todo el costo al período de compra, se distribuye en su vida útil.\n\nMétodo de línea recta: depreciación anual = (costo del activo - valor residual) / años de vida útil. Es el método más usado por su sencillez.\n\nLa depreciación reduce la utilidad, pero no la caja, porque el dinero salió cuando se compró el activo. Para fines tributarios, la norma fija porcentajes máximos de depreciación según el tipo de bien.",
    example:
      "Panificadora El Trigal, de Huancayo, compra un horno industrial en S/ 60,000, estima que lo usará 10 años y que al final valdrá S/ 6,000. La depreciación anual es (60,000 - 6,000) / 10 = S/ 5,400, es decir S/ 1,350 por trimestre que aparecen como gasto aunque no se pague nada en ese momento.",
    inGame:
      "Cuando inviertes en capacidad o equipos, la caja baja de inmediato y el gasto aparece poco a poco como depreciación en el estado de resultados. Por eso tu utilidad y tu caja no coinciden. Tenlo presente al comparar ambos reportes.",
  },
  {
    id: "con-costo-de-ventas",
    title: "Costo de ventas",
    area: "contabilidad",
    summary:
      "Es lo que le costó a la empresa producir o comprar los productos que efectivamente vendió en el período.",
    body: "El costo de ventas solo incluye las unidades vendidas. Lo que se produjo o compró y no se vendió queda como inventario en el activo, no como gasto.\n\nEn una empresa comercial: costo de ventas = inventario inicial + compras - inventario final. En una empresa industrial las compras se reemplazan por el costo de producción (materiales, mano de obra directa y costos indirectos de fabricación).\n\nVentas - costo de ventas = utilidad bruta. El margen bruto = utilidad bruta / ventas indica cuánto queda de cada sol vendido para cubrir los gastos operativos, los intereses y los impuestos.",
    example:
      "Minimarket La Esquina, de Pucallpa, empezó el mes con S/ 25,000 en mercadería, compró S/ 60,000 y terminó con S/ 20,000 en inventario. Su costo de ventas fue S/ 65,000. Como vendió S/ 86,000, su utilidad bruta fue S/ 21,000 y su margen bruto 24.4 %.",
    inGame:
      "Si produces más de lo que vendes, el costo de esas unidades se queda en inventario y no en el costo de ventas, pero sí consume tu caja. Compara el margen bruto de cada trimestre: si cae, revisa tu precio, tu costo unitario y la inversión en eficiencia.",
  },
  {
    id: "con-margen-de-contribucion",
    title: "Margen de contribución",
    area: "contabilidad",
    summary:
      "Es lo que queda del precio de venta después de restar el costo variable, y sirve para cubrir los costos fijos y generar utilidad.",
    body: "Los costos variables cambian con el volumen (insumos, empaques, comisiones). Los costos fijos se pagan aunque no vendas (alquiler, sueldos administrativos).\n\nFórmulas: margen de contribución unitario = precio de venta - costo variable unitario. Razón de margen de contribución = margen de contribución unitario / precio de venta.\n\nCada unidad vendida aporta su margen de contribución. Primero ese aporte paga los costos fijos. Cuando ya están cubiertos, cada unidad adicional es utilidad. Por eso un pedido especial con precio menor solo conviene si el precio supera el costo variable y no daña las ventas normales.",
    example:
      "Jugos Andinos, de Cusco, vende cada botella a S/ 5.00 (sin IGV) y su costo variable es S/ 3.00. El margen de contribución es S/ 2.00 por botella, o 40 % del precio. Si sus costos fijos son S/ 16,000 al mes y vende 10,000 botellas, aporta S/ 20,000 y gana S/ 4,000.",
    inGame:
      "Antes de bajar el precio, calcula cuánto margen de contribución pierdes por unidad y cuántas unidades adicionales necesitas vender para compensarlo. Una rebaja de 10 % en el precio puede recortar tu margen por unidad en 25 % o más.",
  },
  {
    id: "con-punto-de-equilibrio",
    title: "Punto de equilibrio",
    area: "contabilidad",
    summary:
      "Es el nivel de ventas en el que los ingresos cubren exactamente todos los costos, sin ganar ni perder.",
    body: "Por debajo del punto de equilibrio la empresa pierde dinero. Por encima, gana. Conocerlo permite fijar metas mínimas de venta y evaluar si un precio es viable.\n\nFórmulas: punto de equilibrio en unidades = costos fijos / (precio de venta - costo variable unitario). Punto de equilibrio en soles = costos fijos / razón de margen de contribución.\n\nEl punto de equilibrio sube si aumentan los costos fijos (más personal, más alquiler, más publicidad) o si baja el margen por unidad (menor precio o mayor costo variable). El margen de seguridad es la diferencia entre lo que vendes y tu punto de equilibrio.",
    example:
      "Dulce Misti, una pastelería de Arequipa, tiene costos fijos de S/ 18,000 al mes. Vende cada torta a S/ 60 y su costo variable es S/ 24, así que su margen de contribución es S/ 36. Su punto de equilibrio es 18,000 / 36 = 500 tortas al mes. Si vende 650, su margen de seguridad es de 150 tortas y su utilidad es 150 x 36 = S/ 5,400.",
    inGame:
      "El juego calcula tu punto de equilibrio cada trimestre. Compáralo con tu pronóstico de demanda antes de contratar personal o subir el presupuesto de marketing, porque ambos elevan los costos fijos y alejan el equilibrio.",
  },

  // ===== Tributos =====
  {
    id: "con-igv-y-credito-fiscal",
    title: "IGV y crédito fiscal",
    area: "tributos",
    summary:
      "El IGV es un impuesto de 18 % que grava las ventas, y el crédito fiscal es el IGV de tus compras que puedes descontar.",
    body: "El impuesto general a las ventas (IGV) grava la venta de bienes, los servicios y las importaciones. Lo paga el consumidor final, pero las empresas lo recaudan y lo entregan a la SUNAT cada mes.\n\nCálculo: IGV por pagar = IGV de las ventas (débito fiscal) - IGV de las compras (crédito fiscal). Para usar el crédito fiscal, la compra debe estar relacionada con el negocio, sustentada con un comprobante que lo permita (como la factura) y anotada en el registro de compras.\n\nSi compras sin factura pierdes el crédito fiscal y pagas más impuesto. Si en un mes tu crédito supera a tu débito, el saldo a favor se arrastra a los meses siguientes.",
    example:
      "Muebles Villa Sur, de Lima, vende en el mes S/ 100,000 más IGV, por lo que cobra S/ 18,000 de IGV. Compró madera e insumos por S/ 60,000 más IGV, con S/ 10,800 de crédito fiscal. Debe pagar a la SUNAT S/ 7,200. Si hubiera comprado la madera sin factura, pagaría los S/ 18,000 completos.",
    inGame:
      "El simulador calcula el IGV de 18 % cada trimestre. Recuerda que el IGV cobrado no es tu dinero: reserva caja para pagarlo. En las situaciones, comprar sin comprobante parece más barato, pero te deja sin crédito fiscal y con riesgo de sanción.",
  },
  {
    id: "con-impuesto-a-la-renta",
    title: "Impuesto a la renta empresarial",
    area: "tributos",
    summary:
      "Es el impuesto que grava las ganancias de la empresa, y en el régimen general equivale a 29.5 % de la renta neta.",
    body: "El impuesto a la renta de tercera categoría grava la utilidad de los negocios. No se calcula sobre las ventas sino sobre la renta neta: ingresos menos costos y gastos aceptados por la norma tributaria.\n\nEn el régimen general la tasa es 29.5 % de la renta neta anual. En el Régimen MYPE Tributario la tasa es 10 % hasta 15 UIT de renta neta y 29.5 % por el exceso.\n\nDurante el año se hacen pagos a cuenta mensuales y al cierre se presenta la declaración anual, donde se regulariza la diferencia. La utilidad contable y la renta neta tributaria pueden diferir, porque algunos gastos no son deducibles o tienen límites.",
    example:
      "Consultora Andes Gestión, de Lima, está en el régimen general. En el año tuvo ingresos por S/ 900,000 y costos y gastos deducibles por S/ 700,000. Su renta neta es S/ 200,000 y su impuesto anual es S/ 59,000. Como ya adelantó S/ 40,000 en pagos a cuenta, en la declaración anual regulariza S/ 19,000.",
    inGame:
      "El juego calcula el impuesto a la renta sobre tu utilidad. Al proyectar cuánta caja te quedará, trabaja con la utilidad después de impuestos. Si tienes pérdidas no pagas renta, pero eso no es una estrategia: es una señal de alerta.",
  },
  {
    id: "con-regimenes-tributarios",
    title: "Regímenes tributarios del Perú",
    area: "tributos",
    summary:
      "Son las modalidades en las que un negocio puede tributar en el Perú, con reglas distintas según su tamaño y actividad.",
    body: "Un negocio peruano puede tributar en cuatro regímenes: Nuevo Régimen Único Simplificado (Nuevo RUS), Régimen Especial de Renta (RER), Régimen MYPE Tributario (RMT) y Régimen General.\n\nEl Nuevo RUS es para personas naturales con negocios muy pequeños: pagan una cuota fija mensual y emiten boletas, no facturas. El RER paga un porcentaje fijo de los ingresos de cada mes. El RMT y el Régimen General pagan sobre la utilidad. En el RMT la tasa es 10 % hasta 15 UIT de renta neta y 29.5 % por el exceso. En el Régimen General es 29.5 %.\n\nElegir bien importa: un régimen simple reduce trámites, pero puede limitar a tus clientes (una empresa necesita factura para sustentar su gasto) o hacerte pagar aunque tengas pérdidas.",
    example:
      "Rosa vende almuerzos en Piura desde el Nuevo RUS. Una constructora quiere contratarla para 80 menús diarios, pero le exige factura. Para aceptar, Rosa debe pasar a un régimen que permita emitir facturas, como el RER o el RMT, y llevar más control de sus ingresos y compras. El contrato duplica sus ventas, así que el cambio le conviene.",
    inGame:
      "En el simulador tu empresa paga IGV de 18 % e impuesto a la renta sobre su utilidad. En las situaciones tributarias, evalúa las opciones pensando en la formalidad: lo que parece un ahorro inmediato puede traer una sanción y pérdida de reputación.",
  },
  {
    id: "con-comprobantes-electronicos",
    title: "Comprobantes de pago electrónicos",
    area: "tributos",
    summary:
      "Son las facturas, boletas y otros documentos que se emiten en formato digital y sustentan las ventas y compras ante la SUNAT.",
    body: "Un comprobante de pago acredita la venta de un bien o la prestación de un servicio. Los principales son la factura (para empresas, permite sustentar gasto y crédito fiscal), la boleta de venta (para consumidores finales), las notas de crédito y débito (para corregir o anular operaciones) y la guía de remisión (para trasladar mercadería).\n\nHoy se emiten de forma electrónica mediante los sistemas autorizados por la SUNAT, lo que le permite a la administración tributaria cruzar la información de ventas y compras.\n\nNo entregar comprobante es una infracción que puede terminar en multa o cierre temporal del local. Además, vender sin comprobante distorsiona tu propia información: no sabrás cuánto vendes en realidad.",
    example:
      "Una ferretería de Juliaca vende S/ 1,180 en cemento a un contratista y emite una factura electrónica: S/ 1,000 de valor de venta y S/ 180 de IGV. El contratista usa esa factura para sustentar su gasto y su crédito fiscal. Una semana después devuelve 5 bolsas y la ferretería emite una nota de crédito para reducir la operación.",
    inGame:
      "En las situaciones del juego pueden aparecer tentaciones como vender sin comprobante o aceptar compras sin factura. Dan un beneficio inmediato, pero llevan riesgo de sanción y dañan el indicador de reputación.",
  },
  {
    id: "con-detracciones",
    title: "Detracciones",
    area: "tributos",
    summary:
      "Es un sistema en el que el comprador separa una parte del pago y la deposita en una cuenta del vendedor destinada a pagar tributos.",
    body: "El sistema de detracciones se aplica a la venta de ciertos bienes y a varios servicios gravados con IGV. El cliente no te paga el total: descuenta un porcentaje y lo deposita en tu cuenta de detracciones en el Banco de la Nación.\n\nEse dinero sigue siendo tuyo, pero está destinado a pagar tributos y aportes, como IGV, impuesto a la renta o EsSalud. El porcentaje depende del tipo de bien o servicio.\n\nEl efecto principal es de caja: recibes menos efectivo de libre uso por cada factura. El comprador que no hace el depósito a tiempo no puede usar el crédito fiscal de esa compra hasta regularizarlo y se expone a una multa, por lo que las empresas formales lo cumplen con cuidado.",
    example:
      "Limpieza Total Norte, de Trujillo, factura S/ 11,800 (incluido IGV) a una clínica. Si la tasa que corresponde a su servicio fuera 12 %, la clínica deposita S/ 1,416 en la cuenta de detracciones y le paga S/ 10,384. La empresa usa esos S/ 1,416 para pagar su IGV del mes, pero no puede usarlos para pagar sueldos.",
    inGame:
      "Si diriges una empresa de servicios B2B, recuerda que en la vida real no todo lo facturado llega a tu caja libre. En el juego, mantén un colchón de caja para impuestos y no comprometas todo el efectivo en producción o marketing.",
  },
  {
    id: "con-gastos-deducibles",
    title: "Gastos deducibles",
    area: "tributos",
    summary:
      "Son los gastos que la norma tributaria permite restar de los ingresos para calcular el impuesto a la renta.",
    body: "No todo lo que la empresa gasta reduce su impuesto. Para ser deducible, un gasto debe cumplir el principio de causalidad: ser necesario para generar ingresos o mantener la fuente que los produce.\n\nAdemás debe estar sustentado con un comprobante de pago válido y, cuando el monto lo exige, pagado a través del sistema financiero (bancarización). Algunos gastos tienen límites, como los de representación, y otros no se aceptan, como los gastos personales de los dueños o las multas.\n\nUn gasto rechazado se llama reparo tributario: se suma a la utilidad y aumenta el impuesto. Por eso la utilidad contable y la renta neta tributaria no siempre coinciden.",
    example:
      "Agencia Pixel Sur, de Arequipa, tuvo una utilidad contable de S/ 100,000. Entre sus gastos figuran S/ 8,000 de un viaje familiar del gerente y S/ 2,000 en compras sin comprobante. Esos S/ 10,000 no son deducibles, así que la renta neta sube a S/ 110,000 y el impuesto con la tasa de 29.5 % pasa de S/ 29,500 a S/ 32,450.",
    inGame:
      "Cuando una situación te ofrezca ahorrar comprando sin factura o mezclando gastos personales con los de la empresa, recuerda que ese gasto no reduce tu impuesto y puede traer una sanción. La opción formal protege tu reputación y tu caja futura.",
  },
  {
    id: "con-pagos-a-cuenta",
    title: "Pagos a cuenta y declaración anual",
    area: "tributos",
    summary:
      "Son los adelantos mensuales del impuesto a la renta que luego se descuentan del impuesto calculado al cierre del año.",
    body: "El impuesto a la renta es anual, pero el Estado no espera hasta el final para cobrarlo. Cada mes la empresa declara y paga un adelanto calculado sobre sus ingresos netos del mes, junto con el IGV, según el cronograma de vencimientos de la SUNAT, que depende del último dígito del RUC.\n\nAl cierre del año se presenta la declaración jurada anual. Allí se calcula el impuesto definitivo y se restan los pagos a cuenta. Si lo adelantado fue menor, se paga la diferencia. Si fue mayor, queda un saldo a favor.\n\nDeclarar o pagar fuera de fecha genera multas e intereses. Por eso los impuestos deben estar en el presupuesto de caja como cualquier otro pago fijo.",
    example:
      "Turismo Apu Travel, de Cusco, adelantó S/ 18,000 en pagos a cuenta durante el año. Al cierre, su impuesto a la renta anual resultó S/ 26,000, por lo que debe regularizar S/ 8,000 con la declaración anual. Como en los primeros meses del año vende menos por las lluvias, separó ese dinero en diciembre para no quedarse sin caja.",
    inGame:
      "Considera los impuestos como una salida de caja segura de cada trimestre. Si gastas toda tu caja en marketing o producción y luego llega el pago de IGV y renta, puedes caer en sobregiro. Mira las líneas de impuestos en tus reportes.",
  },

  // ===== Marketing =====
  {
    id: "con-elasticidad-precio",
    title: "Elasticidad precio de la demanda",
    area: "marketing",
    summary: "Mide cuánto cambia la cantidad vendida cuando cambia el precio.",
    body: "Fórmula: elasticidad = cambio porcentual en la cantidad demandada / cambio porcentual en el precio. El resultado suele ser negativo, porque al subir el precio baja la cantidad, y se interpreta en valor absoluto.\n\nSi el valor es mayor que 1, la demanda es elástica: los clientes reaccionan mucho al precio y una rebaja puede aumentar el ingreso total. Si es menor que 1, es inelástica: los clientes reaccionan poco y un aumento de precio eleva el ingreso.\n\nLa demanda es más elástica cuando hay muchos sustitutos, cuando el producto no es indispensable o cuando pesa mucho en el bolsillo. Una marca fuerte y una calidad diferenciada la vuelven menos elástica.",
    example:
      "Una cafetería de Miraflores, en Lima, sube el capuchino de S/ 10 a S/ 11 (10 % más) y sus ventas bajan de 1,000 a 950 tazas al mes (5 % menos). La elasticidad es 0.5, inelástica. Su ingreso sube de S/ 10,000 a S/ 10,450. En cambio, una bodega que sube 10 % el precio de una gaseosa pierde 20 % de las ventas, porque el cliente la compra en la tienda de al lado.",
    inGame:
      "Prueba cambios de precio moderados y observa cómo responden tus unidades vendidas y tu cuota de mercado. Con marca y calidad altas soportas mejor un precio mayor. El estudio del consumidor te ayuda a conocer la sensibilidad al precio.",
  },
  {
    id: "con-cuota-de-mercado",
    title: "Cuota de mercado",
    area: "marketing",
    summary:
      "Es el porcentaje de las ventas totales de un mercado que corresponde a tu empresa.",
    body: "Fórmula: cuota de mercado = ventas de la empresa / ventas totales del mercado x 100. Puede medirse en unidades o en dinero, y los resultados pueden ser distintos si tu precio es mayor o menor que el promedio.\n\nLa cuota muestra tu posición frente a los competidores. Si tus ventas suben 5 % pero el mercado crece 15 %, en realidad estás perdiendo terreno.\n\nGanar cuota no siempre es bueno. Si la consigues con precios muy bajos o con publicidad excesiva, puedes crecer en participación mientras destruyes utilidad. Lo que se busca es una cuota rentable.",
    example:
      "En una zona de Chiclayo se venden 40,000 pollos a la brasa al mes entre todas las pollerías. Pollería El Leñador vende 6,000, así que su cuota es 15 %. Al año siguiente el mercado crece a 50,000 y El Leñador vende 6,500: vendió más, pero su cuota bajó a 13 %.",
    inGame:
      "La cuota de mercado es uno de tus indicadores principales. Compárala siempre con tu utilidad: si sube la cuota y baja la utilidad, estás comprando ventas con precio o publicidad. Usa la inteligencia competitiva para entender qué hacen los rivales que te quitan participación.",
  },
  {
    id: "con-segmentacion",
    title: "Segmentación de mercado",
    area: "marketing",
    summary:
      "Es dividir el mercado en grupos de clientes con necesidades parecidas para atender mejor a los que más te convienen.",
    body: "Ninguna empresa puede satisfacer a todos. Segmentar permite concentrar los recursos en los grupos donde tienes más posibilidades de ganar.\n\nCriterios comunes: geográficos (ciudad, región, zona), demográficos (edad, ingreso, etapa de vida), psicográficos (estilo de vida, valores) y de conducta (frecuencia de compra, beneficio buscado). En mercados B2B se segmenta por sector, tamaño de empresa y forma de compra.\n\nUn buen segmento es medible, suficientemente grande, accesible con tus canales y distinto de los demás. Después de segmentar se elige el público objetivo y se define el posicionamiento.",
    example:
      "Gimnasio Vital, de Trujillo, descubre que sus socios no son un solo grupo: jóvenes que buscan precio bajo, oficinistas que entrenan a las 6 a. m. o después de las 7 p. m. y adultos mayores que llegan por recomendación médica. Decide enfocarse en los oficinistas con un plan corporativo y clases de 45 minutos, y sus membresías anuales crecen 30 %.",
    inGame:
      "Al elegir tu mezcla de canales y tus regiones, piensa en qué segmento quieres atender. Los medios masivos llegan a todos, mientras que lo digital y la venta directa permiten enfocarte. El estudio del consumidor te muestra qué valora tu cliente.",
  },
  {
    id: "con-posicionamiento",
    title: "Posicionamiento",
    area: "marketing",
    summary:
      "Es el lugar que ocupa tu marca en la mente del cliente en comparación con los competidores.",
    body: "Posicionar es lograr que el público objetivo asocie tu marca con un beneficio claro: la más rápida, la más confiable, la más económica, la más saludable. Una marca que quiere ser todo a la vez no queda en la mente de nadie.\n\nUna declaración de posicionamiento responde cuatro preguntas: para quién es, en qué categoría compite, qué beneficio principal ofrece y por qué el cliente debe creerlo.\n\nEl posicionamiento se construye con hechos coherentes: producto, precio, canales y comunicación deben decir lo mismo. Si prometes calidad superior y cobras lo más bajo del mercado, el mensaje pierde credibilidad.",
    example:
      "En Bogotá, la marca ficticia Café Páramo compite contra cadenas grandes. En lugar de pelear por precio, se posiciona como el café de origen único que paga mejor al caficultor. Vende la taza 25 % más cara, muestra la finca de origen en cada empaque y mantiene locales pequeños. Sus clientes la eligen por esa historia, no por descuentos.",
    inGame:
      "Decide qué quieres ser: líder en precio o líder en calidad y marca. Tus decisiones de precio, inversión en calidad y marketing deben apuntar en la misma dirección. Cambiar de rumbo cada trimestre confunde al mercado y desperdicia presupuesto.",
  },
  {
    id: "con-valor-de-marca",
    title: "Valor de marca",
    area: "marketing",
    summary:
      "Es el valor adicional que un producto tiene por llevar una marca conocida y apreciada por los clientes.",
    body: "El valor de marca (brand equity) explica por qué un cliente paga más por un producto que por otro casi idéntico. Se forma con el tiempo a partir de cuatro elementos: notoriedad (me conocen), asociaciones (qué piensan de mí), calidad percibida y lealtad.\n\nUna marca fuerte permite cobrar un precio mayor, reduce la sensibilidad al precio, facilita lanzar productos nuevos y abarata la captación de clientes.\n\nSe construye con inversión constante en comunicación y, sobre todo, cumpliendo lo prometido. Se destruye rápido con una mala experiencia masiva, un escándalo o publicidad engañosa.",
    example:
      "Dos marcas de Gamarra venden polos de algodón pima de calidad similar. Una marca poco conocida los vende a S/ 35. La marca ficticia Urpi, recordada por sus campañas de Fiestas Patrias y su política de cambios sin trabas, los vende a S/ 55 y agota su stock. Esos S/ 20 de diferencia son el valor de su marca.",
    inGame:
      "El indicador de marca va de 0 a 100 y se construye con inversión constante en marketing. Una marca alta te ayuda a sostener precios mayores. Cuida también la reputación y la satisfacción, porque manejar mal una situación puede dañar lo que construiste.",
  },
  {
    id: "con-cac-y-ltv",
    title: "CAC y LTV",
    area: "marketing",
    summary:
      "El CAC es lo que cuesta conseguir un cliente nuevo y el LTV es el margen que ese cliente deja durante toda su relación contigo.",
    body: "Costo de adquisición de clientes: CAC = gasto total en marketing y ventas / número de clientes nuevos conseguidos en el mismo período.\n\nValor de vida del cliente: LTV = margen promedio por compra x número de compras por período x tiempo promedio que el cliente permanece. En negocios de suscripción se simplifica así: LTV = margen mensual por cliente / tasa de abandono mensual.\n\nEl negocio es sano cuando el LTV supera con holgura al CAC. Una referencia muy usada es que el LTV sea al menos 3 veces el CAC. También importa el tiempo en que recuperas el CAC: si tarda demasiado, necesitas mucha caja para crecer.",
    example:
      "La plataforma ficticia Contaplus, un software de facturación de Lima, gasta S/ 60,000 al mes en publicidad y vendedores y consigue 200 clientes: su CAC es S/ 300. Cada cliente deja S/ 50 de margen al mes y el 5 % se va cada mes, así que el LTV es 50 / 0.05 = S/ 1,000. La relación entre LTV y CAC es 3.3 y recupera el CAC en 6 meses.",
    inGame:
      "Relaciona tu presupuesto de marketing con las ventas nuevas que genera. Si duplicas el gasto y las ventas casi no suben, tu costo de adquisición se disparó. Cuidar la satisfacción alarga la vida del cliente y mejora el retorno de cada sol invertido.",
  },
  {
    id: "con-embudo-de-conversion",
    title: "Embudo de conversión",
    area: "marketing",
    summary:
      "Es el recorrido por etapas que sigue una persona desde que conoce tu marca hasta que compra.",
    body: "El embudo se llama así porque en cada etapa quedan menos personas. Las etapas típicas son: conocimiento (te ven), interés (visitan o preguntan), consideración (comparan, agregan al carrito, piden cotización) y compra.\n\nTasa de conversión de una etapa = personas que pasan a la etapa siguiente / personas que llegaron a la etapa x 100. Medir cada paso muestra dónde se pierde más gente y dónde conviene actuar.\n\nNo siempre hay que invertir más en publicidad. A veces es más rentable mejorar una etapa intermedia: una página más clara, respuesta rápida por WhatsApp o más medios de pago, como Yape y Plin.",
    example:
      "Una tienda en línea de Lima recibe 20,000 visitas durante el Cyber Wow. De ellas, 1,600 agregan productos al carrito (8 %) y 400 pagan (25 % de los carritos). La conversión total es 2 %. Al habilitar el pago con billetera digital, la conversión del carrito sube a 35 %: 560 compras con la misma publicidad.",
    inGame:
      "Los canales cumplen funciones distintas: los medios masivos dan conocimiento, lo digital y las activaciones BTL generan interés, y la venta directa cierra. Si tienes marca alta y pocas ventas, refuerza los canales de cierre. Si nadie te conoce, empieza por arriba.",
  },

  // ===== Investigación =====
  {
    id: "con-investigacion-de-mercados",
    title: "Investigación de mercados",
    area: "investigacion",
    summary:
      "Es el proceso de reunir y analizar información sobre clientes, competidores y entorno para decidir con menos incertidumbre.",
    body: "Investigar no elimina el riesgo, pero lo reduce. El proceso tiene cinco pasos: definir el problema, diseñar el estudio, recoger los datos, analizarlos y tomar la decisión.\n\nLas fuentes pueden ser secundarias (datos que ya existen, como estadísticas del INEI, reportes del BCRP o estudios de gremios) o primarias (datos que tú recoges). Las técnicas pueden ser cualitativas, como entrevistas y grupos focales, que explican el porqué, o cuantitativas, como encuestas, que miden cuánto.\n\nLa investigación tiene un costo, así que debe ser proporcional a la decisión. Vale la pena cuando equivocarse sería más caro que el estudio.",
    example:
      "Antes de abrir una juguería en Iquitos, Mariana revisa datos de población de la zona, observa durante una semana cuánta gente pasa por el local y encuesta a 150 personas. Descubre que el 60 % compraría jugos para llevar antes de las 8 a. m. Decide abrir a las 6:30 a. m. y ofrecer envases con tapa, algo que no había considerado.",
    inGame:
      "Cada trimestre puedes invertir en pronóstico de demanda, inteligencia competitiva y estudio del consumidor. Hazlo cuando vayas a tomar una decisión grande, como expandirte o cambiar de precio. Quien investiga recibe señales tempranas de las noticias del entorno.",
  },
  {
    id: "con-tamano-de-mercado",
    title: "Tamaño de mercado (TAM, SAM, SOM)",
    area: "investigacion",
    summary:
      "Son tres medidas que estiman cuánto se puede vender: el mercado total, el que puedes atender y el que puedes ganar de forma realista.",
    body: "TAM (mercado total) es toda la demanda que existe para un tipo de producto. SAM (mercado disponible) es la parte del TAM que puedes atender con tu producto, tus canales y tu zona. SOM (mercado obtenible) es la parte del SAM que puedes captar en un plazo dado, considerando a la competencia y tus recursos.\n\nSe calcula de dos formas. De arriba hacia abajo: partes de una cifra grande y aplicas porcentajes. De abajo hacia arriba: multiplicas clientes posibles x frecuencia de compra x precio. La segunda suele ser más creíble.\n\nEl error más común es presentar el TAM como si fuera la venta esperada.",
    example:
      "Una academia preuniversitaria de Huancayo trabaja con estos supuestos: 500,000 jóvenes se preparan cada año para postular en todo el país (TAM) y 20,000 lo hacen en Huancayo y alrededores (SAM). Con 2 locales, capacidad para 1,200 alumnos y 8 academias competidoras, su meta realista es 1,000 alumnos (SOM). A S/ 1,500 por ciclo, eso equivale a S/ 1,500,000.",
    inGame:
      "Antes de entrar a una región, estima cuánta demanda hay y qué parte puedes ganar frente a los rivales que ya están allí. El pronóstico de demanda te orienta sobre el tamaño y la inteligencia competitiva sobre quiénes se lo reparten. No produzcas para todo el mercado.",
  },
  {
    id: "con-pronostico-de-demanda",
    title: "Pronóstico de demanda",
    area: "investigacion",
    summary:
      "Es la estimación de cuánto comprarán los clientes en un período futuro, y es la base para planificar producción, compras y personal.",
    body: "Todo plan empieza con un pronóstico de ventas. Si te quedas corto, pierdes ventas y clientes. Si te pasas, inmovilizas dinero en inventario.\n\nMétodos sencillos: promedio móvil (promedio de los últimos períodos), tendencia (cuánto crece de un período a otro) y ajuste por estacionalidad (meses o campañas que venden más, como Día de la Madre, Fiestas Patrias o Navidad). También se ajusta por precio, publicidad y noticias del entorno.\n\nNingún pronóstico es exacto. Lo profesional es medir el error (venta real - pronóstico), corregir el método y trabajar con escenarios: pesimista, esperado y optimista.",
    example:
      "Chocolates Wayra, de Cusco, vendió 4,000, 4,400 y 4,800 cajas en los últimos tres trimestres. La tendencia indica 5,200 para el siguiente, pero ese trimestre incluye Navidad, que en su historial vende 30 % más. Su pronóstico es 5,200 x 1.30 = 6,760 cajas, y prepara insumos para un rango de 6,200 a 7,300.",
    inGame:
      "Invierte en el pronóstico de demanda antes de fijar tu producción, sobre todo si hubo una noticia del entorno o cambiaste el precio. Compara luego lo que pronosticaste con lo que vendiste y ajusta el siguiente trimestre.",
  },
  {
    id: "con-nps",
    title: "NPS (Net Promoter Score)",
    area: "investigacion",
    summary:
      "Es un indicador de lealtad que mide qué tan dispuestos están tus clientes a recomendarte.",
    body: "Se pregunta al cliente: del 0 al 10, qué tan probable es que recomiendes esta empresa a un amigo o colega. Según la respuesta se clasifica en promotor (9 o 10), pasivo (7 u 8) o detractor (0 a 6).\n\nFórmula: NPS = porcentaje de promotores - porcentaje de detractores. El resultado va de -100 a 100. Los pasivos cuentan en el total, pero no suman ni restan.\n\nEl número por sí solo dice poco. Lo valioso es preguntar el motivo de la nota, contactar a los detractores para resolver su problema y seguir la evolución del indicador en el tiempo.",
    example:
      "Una operadora de internet ficticia de Arequipa encuesta a 400 clientes: 180 son promotores (45 %), 120 pasivos (30 %) y 100 detractores (25 %). Su NPS es 45 - 25 = 20. Al leer los comentarios, descubre que 70 de los detractores se quejan de la demora del servicio técnico, y fija como meta atender las averías en 24 horas.",
    inGame:
      "El indicador más parecido en el juego es la satisfacción del cliente (0 a 100). Cuídala con calidad y con un manejo correcto de las situaciones con clientes. Una satisfacción alta favorece la recompra y protege tu cuota de mercado.",
  },
  {
    id: "con-pestel",
    title: "Análisis PESTEL",
    area: "investigacion",
    summary:
      "Es una herramienta para ordenar los factores del entorno que afectan a la empresa y que ella no controla.",
    body: "PESTEL agrupa el entorno en seis tipos de factores: políticos (estabilidad, políticas de gobierno), económicos (inflación, tipo de cambio, tasas de interés, empleo), sociales (hábitos, demografía), tecnológicos (nuevas herramientas, comercio electrónico), ambientales (clima, fenómenos naturales) y legales (normas laborales, tributarias y de protección al consumidor).\n\nPor cada factor se pregunta: cómo afecta a mi negocio, con qué probabilidad y qué puedo hacer. El resultado alimenta las oportunidades y amenazas del FODA.\n\nUn mismo hecho afecta distinto a cada industria. Una subida del dólar encarece los insumos importados, pero favorece al exportador.",
    example:
      "Una agroexportadora de mango de Piura hace su PESTEL. Económico: el dólar sube y mejora sus ingresos en soles. Ambiental: se anuncia un Fenómeno del Niño con lluvias fuertes que pueden dañar la cosecha. Legal: su mercado de destino exige un nuevo control fitosanitario. Decide contratar un seguro agrícola, adelantar parte de los envíos y preparar la certificación con tiempo.",
    inGame:
      "El juego arma un PESTEL con las noticias de cada trimestre. Léelo antes de decidir: una noticia económica puede cambiar la tasa de tus préstamos y una ambiental puede golpear la demanda de una región. Si investigas el mercado, recibes la señal un trimestre antes.",
  },
  {
    id: "con-inteligencia-competitiva",
    title: "Inteligencia competitiva",
    area: "investigacion",
    summary:
      "Es reunir y analizar de forma legal y ética la información sobre los competidores para anticipar sus movimientos.",
    body: "No se trata de espiar. Se trabaja con información pública u observable: precios, promociones, locales nuevos, publicidad, ofertas de empleo, opiniones de clientes y resultados que las empresas publican.\n\nLas preguntas clave son: quiénes son mis competidores directos, qué estrategia sigue cada uno, cuáles son sus fortalezas y debilidades y cómo reaccionarán ante mis decisiones.\n\nUna técnica relacionada es el benchmarking: comparar tus indicadores con los del mejor del sector para identificar qué prácticas puedes adaptar. Conocer al rival evita errores comunes, como iniciar una guerra de precios contra alguien con costos más bajos.",
    example:
      "Una concesionaria de autos de Santa Cruz, en Bolivia, revisa cada semana los precios publicados de sus 3 competidores, visita sus locales como cliente y registra sus promociones. Detecta que el rival principal liquida un modelo con 8 % de descuento porque llegará una versión nueva. En vez de igualar el descuento, ofrece mantenimiento gratis por un año y conserva su margen.",
    inGame:
      "La inteligencia competitiva es una de las investigaciones que puedes pagar cada trimestre. Úsala antes de cambiar tu precio o entrar a una región, para conocer mejor a tus rivales. Competir a ciegas suele terminar en guerras de precios.",
  },
  {
    id: "con-encuestas-y-muestreo",
    title: "Encuestas y muestreo",
    area: "investigacion",
    summary:
      "Es la técnica de preguntar a una parte de la población, elegida con cuidado, para conocer lo que piensa el conjunto.",
    body: "Encuestar a todos los clientes es caro y lento. Por eso se trabaja con una muestra. Para que sus resultados se puedan generalizar, la muestra debe ser representativa: parecida a la población en sus características principales y, de preferencia, elegida al azar.\n\nEl tamaño de la muestra define el margen de error. Para poblaciones grandes, una muestra de cerca de 385 personas da un margen de error aproximado de 5 % con 95 % de confianza. Con 100 personas el margen sube a cerca de 10 %.\n\nLa calidad de las preguntas importa tanto como el tamaño. Deben ser claras, neutrales y tratar un solo tema a la vez. Una pregunta que sugiere la respuesta arruina el estudio.",
    example:
      "Una botica de Tarapoto quiere saber si sus clientes usarían reparto a domicilio. Encuesta solo a quienes la siguen en redes sociales y el 80 % dice que sí. El resultado está sesgado, porque esos clientes ya compran por internet. Al repetir la encuesta en el mostrador, a 1 de cada 5 clientes que entran, el interés real resulta 35 %.",
    inGame:
      "Trata los estudios que pagas en el juego como estimaciones con margen de error: planifica con un rango y no con una cifra exacta, y contrasta cada estudio con tus propios resultados del trimestre anterior.",
  },

  // ===== Estrategia =====
  {
    id: "con-foda",
    title: "Análisis FODA",
    area: "estrategia",
    summary:
      "Es un diagnóstico que resume las fortalezas y debilidades internas de la empresa y las oportunidades y amenazas de su entorno.",
    body: "Las fortalezas y debilidades son internas: dependen de la empresa (marca, costos, personal, caja, calidad). Las oportunidades y amenazas son externas: vienen del mercado y del entorno, y ocurren hagas lo que hagas.\n\nUn error frecuente es confundir los cuadrantes. Una oportunidad no es algo que quieres hacer, sino un hecho externo favorable. 'Abrir un local en Piura' es una estrategia. 'Crece el consumo en Piura' es la oportunidad.\n\nUn buen FODA es específico y se apoya en datos. 'Buena atención' no dice nada. 'Satisfacción de 85 sobre 100, la más alta del sector' sí. El FODA es un diagnóstico: el paso siguiente es cruzarlo para obtener estrategias.",
    example:
      "Textil Mantaro, de Huancayo. Fortaleza: taller propio con costos 12 % menores que el promedio. Debilidad: no vende por internet. Oportunidad: crece la compra de ropa en línea en provincias. Amenaza: aumenta el ingreso de prendas importadas de bajo precio. Con ese diagnóstico decide priorizar una tienda virtual.",
    inGame:
      "El juego genera un FODA automático de tu empresa. Revísalo cada trimestre para saber en qué estás débil y qué hecho del entorno puedes aprovechar. Luego convierte ese diagnóstico en decisiones concretas.",
  },
  {
    id: "con-foda-cruzado",
    title: "FODA cruzado",
    area: "estrategia",
    summary:
      "Es la técnica que combina los cuadrantes del FODA para convertir el diagnóstico en estrategias concretas.",
    body: "El FODA por sí solo describe. El FODA cruzado (o matriz de estrategias) propone qué hacer, combinando los factores internos con los externos.\n\nResultan cuatro tipos de estrategia. FO (ofensivas): usar fortalezas para aprovechar oportunidades. DO (de reorientación): superar debilidades para aprovechar oportunidades. FA (defensivas): usar fortalezas para reducir amenazas. DA (de supervivencia): reducir debilidades y evitar amenazas.\n\nCada estrategia debe nombrar el cruce que la origina y ser una acción verificable. Al final se priorizan pocas, según su impacto y los recursos disponibles.",
    example:
      "Helados Qori, de Arequipa, tiene una marca fuerte (F), poca caja (D), turismo en crecimiento (O) y el ingreso de una cadena grande (A). Estrategia FO: abrir un punto de venta en la zona turística apoyada en su marca. Estrategia DA: no entrar en una guerra de precios que su caja no puede sostener y concentrarse en sabores regionales que la cadena no ofrece.",
    inGame:
      "Toma el FODA automático del juego y cruza dos cuadrantes antes de decidir. Por ejemplo, si tu fortaleza es la calidad y la oportunidad es una región en crecimiento, expándete allí. Si tu debilidad es la caja y hay amenaza de tasas altas, reduce deuda.",
  },
  {
    id: "con-matriz-bcg",
    title: "Matriz BCG",
    area: "estrategia",
    summary:
      "Es una herramienta que clasifica los productos o negocios de una empresa según el crecimiento de su mercado y su participación relativa.",
    body: "La matriz tiene dos ejes: crecimiento del mercado (alto o bajo) y participación relativa de mercado (alta o baja, comparada con el competidor principal). De ahí salen cuatro tipos de producto.\n\nEstrella: mercado que crece y participación alta. Necesita inversión para mantener el liderazgo. Vaca lechera: mercado maduro y participación alta. Genera más caja de la que necesita. Interrogante: mercado que crece y participación baja. Hay que decidir si invertir fuerte o salir. Perro: mercado de bajo crecimiento y participación baja. Aporta poco.\n\nLa idea central es equilibrar el portafolio: usar la caja de las vacas lecheras para financiar estrellas e interrogantes con futuro.",
    example:
      "Lácteos Colca, de Arequipa, tiene cuatro líneas. El queso fresco es su vaca lechera: mercado estable y liderazgo local. El yogur griego es estrella: crece 20 % al año y lidera. La bebida de avena es interrogante: el mercado crece, pero su cuota es 4 %. La mantequilla en lata es perro. Decide retirar la mantequilla y usar la caja del queso para publicitar la bebida de avena.",
    inGame:
      "El juego ubica tus líneas de producto en la matriz BCG. No repartas el presupuesto por igual: financia las estrellas y las interrogantes prometedoras con la caja de tus vacas lecheras, y evalúa retirar recursos de los perros.",
  },
  {
    id: "con-cinco-fuerzas-de-porter",
    title: "Cinco fuerzas de Porter",
    area: "estrategia",
    summary:
      "Es un modelo para analizar qué tan atractiva y rentable es una industria según la presión de cinco fuerzas competitivas.",
    body: "Las cinco fuerzas son: rivalidad entre los competidores actuales, amenaza de nuevos competidores, amenaza de productos sustitutos, poder de negociación de los clientes y poder de negociación de los proveedores.\n\nMientras más intensas son las fuerzas, menor es la rentabilidad promedio del sector. Una industria con muchos rivales parecidos, clientes que cambian con facilidad y pocas barreras de entrada tiende a competir por precio.\n\nEl análisis sirve para encontrar una posición defendible: diferenciarte para reducir la rivalidad, fidelizar para bajar el poder del cliente o diversificar proveedores para no depender de uno solo.",
    example:
      "Una bodega de Villa El Salvador, en Lima, analiza su sector. Rivalidad alta: hay 6 bodegas en 3 cuadras. Nuevos competidores: llega una cadena de tiendas de conveniencia. Sustitutos: aplicaciones de reparto. Clientes: cambian de tienda sin costo. Proveedores: los distribuidores grandes fijan precios. Concluye que no puede ganar por precio y apuesta por pago con Yape y reparto en el barrio.",
    inGame:
      "El juego muestra las cinco fuerzas de tu industria. Si la rivalidad es alta, evita competir solo por precio e invierte en marca y calidad. Si una noticia encarece los insumos, tus proveedores ganaron poder: protege tu margen.",
  },
  {
    id: "con-matriz-de-ansoff",
    title: "Matriz de Ansoff",
    area: "estrategia",
    summary:
      "Es una herramienta que muestra cuatro caminos para crecer, según combines productos y mercados actuales o nuevos.",
    body: "Penetración de mercado: vender más de los productos actuales en los mercados actuales. Es la opción de menor riesgo. Desarrollo de mercados: llevar los productos actuales a mercados nuevos, como otra región u otro segmento.\n\nDesarrollo de productos: ofrecer productos nuevos a los clientes actuales. Diversificación: productos nuevos en mercados nuevos. Es la de mayor riesgo, porque la empresa no conoce ni el producto ni al cliente.\n\nEl riesgo crece conforme te alejas de lo que dominas. Lo habitual es agotar primero la penetración y luego avanzar hacia mercados o productos nuevos, con una sola novedad a la vez.",
    example:
      "Panadería La Espiga, de Tacna, evalúa cómo crecer. Penetración: promociones para que sus clientes compren también en la tarde. Desarrollo de mercados: abrir un local en Moquegua. Desarrollo de productos: lanzar una línea de panes sin gluten. Diversificación: abrir una escuela de panadería en Arica, Chile. Elige el local en Moquegua, porque su producto ya está probado.",
    inGame:
      "Las decisiones de expansión del juego son la matriz de Ansoff en acción: abrir regiones es desarrollo de mercados y lanzar líneas es desarrollo de productos. Hacer ambas cosas a la vez consume mucha caja y multiplica el riesgo. Avanza un paso a la vez.",
  },
  {
    id: "con-estrategias-genericas",
    title: "Estrategias genéricas de Porter",
    area: "estrategia",
    summary:
      "Son las tres formas básicas de lograr ventaja competitiva: liderazgo en costos, diferenciación y enfoque.",
    body: "Liderazgo en costos: ser el productor con los costos más bajos del sector, lo que permite ofrecer precios bajos y aun así ganar. Exige volumen, eficiencia y control estricto de gastos.\n\nDiferenciación: ofrecer algo que el cliente percibe como único (calidad, diseño, servicio, marca) y por lo que acepta pagar más. Exige invertir en calidad, innovación y marketing.\n\nEnfoque: concentrarse en un segmento o nicho y atenderlo mejor que nadie, sea con costos bajos o con diferenciación. El riesgo mayor es quedarse atrapado en el medio: ni el más barato ni el mejor, sin una razón clara para que te elijan.",
    example:
      "Tres hoteles ficticios de Cusco. Hospedaje Inti compite por costos: habitaciones simples a S/ 80 con 90 % de ocupación. Casona Real se diferencia: S/ 600 la noche con spa y guía privado. Refugio Ciclista se enfoca en un nicho: turistas que viajan en bicicleta, con taller y rutas. Un cuarto hotel cobra S/ 300 sin ofrecer nada especial y es el que tiene más habitaciones vacías.",
    inGame:
      "Define tu estrategia desde el primer trimestre. Si vas por costos, invierte en eficiencia de procesos y volumen, con precio bajo. Si vas por diferenciación, invierte en calidad y marca, con precio alto. Mezclar precio bajo con gasto alto en todo destruye tu utilidad.",
  },
  {
    id: "con-cuadro-de-mando-integral",
    title: "Cuadro de mando integral",
    area: "estrategia",
    summary:
      "Es un sistema de gestión que mide el desempeño de la empresa desde cuatro perspectivas, no solo desde la financiera.",
    body: "El cuadro de mando integral (balanced scorecard) parte de una idea: los resultados financieros son la consecuencia de hacer bien otras cosas antes. Por eso combina indicadores de cuatro perspectivas.\n\nFinanciera: utilidad, rentabilidad, caja. Clientes: satisfacción, cuota de mercado, recompra. Procesos internos: calidad, productividad, tiempos de entrega. Aprendizaje y crecimiento: capacitación, clima laboral, innovación.\n\nLas perspectivas se conectan en cadena: personal capacitado y motivado mejora los procesos, los buenos procesos satisfacen al cliente y el cliente satisfecho genera resultados financieros. Cada objetivo lleva un indicador, una meta y un responsable.",
    example:
      "Logística Cóndor, de Lima, define su cuadro de mando. Aprendizaje: 20 horas de capacitación por chofer al año. Procesos: 95 % de entregas a tiempo. Clientes: satisfacción de 85 sobre 100. Finanzas: margen operativo de 12 %. Cuando las entregas a tiempo bajan a 88 %, actúa de inmediato, antes de que el problema llegue a las ventas.",
    inGame:
      "El cuadro de mando integral del juego reúne tus indicadores en una sola vista. Úsalo para detectar problemas antes de que lleguen a la utilidad: una caída del clima laboral o de la calidad hoy puede ser una caída de ventas mañana.",
  },

  // ===== Operaciones =====
  {
    id: "con-cadena-de-valor",
    title: "Cadena de valor",
    area: "operaciones",
    summary:
      "Es un modelo que descompone la empresa en actividades para identificar cuáles crean valor para el cliente y cuáles solo generan costo.",
    body: "El modelo distingue dos grupos. Actividades primarias: logística de entrada, operaciones, logística de salida, marketing y ventas, y servicio posventa. Actividades de apoyo: infraestructura, gestión de personas, tecnología y compras.\n\nEl margen es la diferencia entre el valor que el cliente paga y el costo de realizar todas las actividades. La ventaja competitiva aparece cuando haces alguna actividad mejor o más barato que tus rivales.\n\nEl análisis ayuda a decidir dónde invertir, qué mejorar y qué encargar a terceros. Lo que no es clave para tu ventaja se puede tercerizar. Lo que te diferencia conviene mantenerlo dentro.",
    example:
      "Una empresa ficticia de Medellín que vende flores por internet revisa su cadena de valor. Descubre que el cliente valora sobre todo la entrega puntual y la frescura. Decide tercerizar la contabilidad y el diseño web, y en cambio invertir en cámaras de frío y en repartidores propios. Sus reclamos por flores marchitas bajan de 9 % a 2 %.",
    inGame:
      "Piensa cada decisión como un eslabón: producción, calidad, marketing, personal y expansión. Invierte más en el eslabón que sostiene tu estrategia. Si compites por calidad, prioriza la inversión en calidad y capacitación antes que los medios masivos.",
  },
  {
    id: "con-capacidad-instalada",
    title: "Capacidad instalada",
    area: "operaciones",
    summary:
      "Es la cantidad máxima que la empresa puede producir o atender en un período con sus instalaciones, equipos y personal.",
    body: "La capacidad pone un techo a tus ventas: no puedes vender lo que no puedes producir o atender. En servicios, la capacidad se mide en clientes atendidos, horas disponibles o mesas.\n\nFórmula: utilización de la capacidad = producción real / capacidad instalada x 100. Una utilización muy baja significa capacidad ociosa: pagas costos fijos por algo que no usas. Una utilización cercana al 100 % deja sin margen para picos de demanda, mantenimiento o imprevistos.\n\nAmpliar capacidad es una decisión de largo plazo, cara y difícil de revertir. Antes conviene evaluar turnos adicionales, horas extra, mejoras de proceso o tercerización.",
    example:
      "Una planta de néctares de Chincha puede envasar 100,000 botellas al mes y produce 70,000: usa 70 % de su capacidad. Un supermercado le pide 40,000 botellas mensuales adicionales. El total sería 110,000, más que su capacidad. Evalúa un segundo turno (S/ 25,000 mensuales) frente a una línea nueva (S/ 400,000 de inversión) y empieza por el turno.",
    inGame:
      "Revisa tu capacidad antes de fijar la producción o la atención. Si la demanda supera lo que puedes atender, pierdes ventas frente a tus rivales. Invierte en capacidad cuando la demanda alta sea sostenida, no por un solo trimestre bueno.",
  },
  {
    id: "con-inventarios-y-quiebre-de-stock",
    title: "Inventarios y quiebre de stock",
    area: "operaciones",
    summary:
      "El inventario es la mercadería que guardas para vender, y el quiebre de stock ocurre cuando un cliente quiere comprar y no tienes el producto.",
    body: "Gestionar inventarios es buscar un equilibrio. Mucho inventario inmoviliza caja, ocupa espacio y puede vencerse, dañarse o pasar de moda. Poco inventario provoca quiebres de stock: pierdes la venta y a veces al cliente, que se va con la competencia.\n\nIndicadores: rotación de inventario = costo de ventas / inventario promedio. Días de inventario = 365 / rotación. El stock de seguridad es una cantidad adicional que cubre imprevistos de demanda o demoras del proveedor.\n\nEl punto de reposición indica cuándo pedir: demanda diaria x días que tarda el proveedor + stock de seguridad.",
    example:
      "Una botica de Piura vende 40 cajas diarias de un antigripal. Su proveedor tarda 5 días en entregar y ella mantiene 80 cajas de seguridad. Su punto de reposición es 40 x 5 + 80 = 280 cajas. En un invierno con más resfríos la venta sube a 60 cajas diarias: si no ajusta el cálculo, se quedará sin stock antes de que llegue el pedido.",
    inGame:
      "Produce o compra según tu pronóstico de demanda, con un margen pequeño de seguridad. Si te sobra mucho inventario, tu caja queda atrapada. Si te falta, pierdes ventas. Revisa el inventario en el estado de situación financiera cada trimestre.",
  },
  {
    id: "con-economias-de-escala",
    title: "Economías de escala",
    area: "operaciones",
    summary:
      "Es la reducción del costo por unidad que se logra cuando la empresa produce más cantidad.",
    body: "Al producir más, los costos fijos (alquiler, maquinaria, sueldos administrativos) se reparten entre más unidades. Fórmula: costo unitario total = costo variable unitario + (costos fijos / unidades producidas).\n\nTambién hay otras fuentes: descuentos por comprar insumos en volumen, mayor especialización del personal y mejor uso de la maquinaria.\n\nLas economías de escala tienen un límite. Si la empresa crece demasiado, aparecen deseconomías: coordinación más difícil, más burocracia y mayores costos de supervisión y transporte. Además, producir mucho solo sirve si lo vendes. De lo contrario, el ahorro se convierte en inventario.",
    example:
      "Galletas Sumaq, de Ayacucho, tiene costos fijos de S/ 30,000 al mes y un costo variable de S/ 1.20 por paquete. Si produce 20,000 paquetes, el costo unitario es 1.20 + 1.50 = S/ 2.70. Si produce 50,000, baja a 1.20 + 0.60 = S/ 1.80. Con el mismo precio de S/ 3.00, su ganancia por paquete pasa de S/ 0.30 a S/ 1.20.",
    inGame:
      "A mayor volumen vendido, menor costo fijo por unidad. Por eso crecer en ventas puede mejorar tu margen. Pero produce solo lo que tu pronóstico indica que venderás, porque el exceso se queda en inventario y consume caja.",
  },
  {
    id: "con-calidad-total",
    title: "Calidad total",
    area: "operaciones",
    summary:
      "Es una forma de gestión en la que toda la empresa trabaja para cumplir las expectativas del cliente y mejorar de forma continua.",
    body: "La calidad total sostiene que la calidad no se inspecciona al final, se construye en cada etapa. Sus principios son: enfoque en el cliente, participación de todo el personal, decisiones basadas en datos, prevención antes que corrección y mejora continua.\n\nLa herramienta básica es el ciclo PHVA: planificar, hacer, verificar y actuar. Se repite una y otra vez para resolver los problemas desde la causa.\n\nLa calidad tiene costos (capacitación, controles, mantenimiento), pero la mala calidad cuesta más: reprocesos, desperdicios, devoluciones, garantías, reclamos y clientes perdidos.",
    example:
      "Calzados Moche, de Trujillo, recibía devoluciones del 6 % de sus pares por suelas despegadas, lo que le costaba S/ 18,000 al mes. En vez de revisar más al final, buscó la causa: el pegamento se aplicaba con el cuero húmedo. Capacitó al personal y añadió un control de secado que cuesta S/ 4,000 al mes. Las devoluciones bajaron a 1 %.",
    inGame:
      "La inversión en calidad mejora tu indicador de calidad (0 a 100), que ayuda a la satisfacción del cliente y a sostener un precio más alto. Combínala con capacitación del personal. Recortar calidad para ahorrar suele costar más en ventas perdidas.",
  },
  {
    id: "con-productividad",
    title: "Productividad",
    area: "operaciones",
    summary:
      "Es la relación entre lo que la empresa produce y los recursos que utiliza para lograrlo.",
    body: "Fórmula: productividad = producción obtenida / recursos utilizados. Puede medirse por trabajador, por hora, por máquina o por sol invertido. Ser más productivo es producir más con lo mismo o lo mismo con menos.\n\nNo es lo mismo que trabajar más horas. La productividad mejora con capacitación, mejores herramientas, procesos ordenados, menos desperdicio y un buen clima laboral.\n\nConviene distinguir tres ideas. Eficacia es lograr el objetivo. Eficiencia es usar bien los recursos. Productividad es la medida que relaciona lo producido con lo usado. Un aumento de sueldos es sostenible cuando va acompañado de mayor productividad.",
    example:
      "Un taller de confecciones de Gamarra produce 2,400 polos al mes con 8 operarios y una planilla de S/ 12,000: 300 polos por operario. Tras reordenar las máquinas en línea y capacitar al equipo, produce 3,000 polos con los mismos 8 operarios: 375 por operario, una mejora de 25 %. Su costo de mano de obra por polo baja de S/ 5.00 a S/ 4.00.",
    inGame:
      "La productividad de tu personal se relaciona con la capacitación, el clima laboral y la inversión en eficiencia de procesos. Antes de contratar más gente, revisa si puedes producir más con el equipo actual. Un equipo desmotivado produce menos con la misma planilla.",
  },
  {
    id: "con-cuello-de-botella",
    title: "Cuello de botella",
    area: "operaciones",
    summary: "Es la etapa más lenta de un proceso, que limita la producción de todo el sistema.",
    body: "Un proceso avanza al ritmo de su etapa más lenta. Si una etapa atiende 50 unidades por hora y las demás 80, el sistema completo entrega 50. Mejorar cualquier otra etapa no aumenta la producción total: solo acumula trabajo en espera.\n\nPasos para gestionarlo: identificar el cuello de botella (donde se forman colas), aprovecharlo al máximo (que nunca se detenga), subordinar el resto del proceso a su ritmo y recién después ampliar su capacidad.\n\nCuando resuelves un cuello de botella, aparece otro en una etapa distinta. La mejora es un ciclo que se repite.",
    example:
      "Una pollería de Chiclayo tiene 40 mesas y 2 hornos. Cada horno entrega 30 pollos por hora y en hora punta recibe pedidos equivalentes a 80 pollos por hora. El cuello de botella son los hornos, no los mozos ni las mesas. Contratar más mozos no ayudaría. Comprar un tercer horno sube la capacidad a 90 pollos por hora y reduce la espera.",
    inGame:
      "Si vendes menos de lo que el mercado te pide, busca qué te limita: capacidad, cantidad de personal o caja. Invertir en marketing cuando tu límite es la capacidad solo genera clientes que no puedes atender y que quedan insatisfechos.",
  },

  // ===== Personas =====
  {
    id: "con-clima-laboral",
    title: "Clima laboral",
    area: "personas",
    summary:
      "Es la percepción que tienen los trabajadores sobre su ambiente de trabajo, y afecta su desempeño y permanencia.",
    body: "El clima laboral resume cómo se sienten las personas respecto a su trabajo: el trato de los jefes, la comunicación, el reconocimiento, la carga de trabajo, el sueldo y las oportunidades de crecer.\n\nSe mide con encuestas anónimas y con señales indirectas, como ausentismo, tardanzas, renuncias y conflictos. Un buen clima eleva la productividad y la calidad del servicio. Un mal clima genera errores, rotación y maltrato al cliente.\n\nEl sueldo importa, pero no es lo único. Un jefe respetuoso, reglas claras, horarios razonables y capacitación pesan mucho. Medir el clima y no hacer nada con los resultados lo empeora.",
    example:
      "Un centro de atención telefónica de Lima tenía un clima de 52 sobre 100 y perdía 12 asesores al mes. La encuesta reveló que el problema principal no era el sueldo, sino los cambios de turno avisados con un día de anticipación. Al fijar los horarios con 2 semanas de aviso y reconocer a los mejores asesores, el clima subió a 68 y las renuncias bajaron a 5 al mes.",
    inGame:
      "El clima laboral (0 a 100) se cuida con el nivel de sueldos, la capacitación y tus decisiones en las situaciones laborales. Un clima bajo afecta la productividad de tu equipo. No lo sacrifiques para ahorrar en un solo trimestre.",
  },
  {
    id: "con-rotacion-de-personal",
    title: "Rotación de personal",
    area: "personas",
    summary:
      "Es la proporción de trabajadores que dejan la empresa en un período y deben ser reemplazados.",
    body: "Fórmula: rotación = número de salidas en el período / promedio de trabajadores del período x 100. Conviene separar la rotación voluntaria (renuncias) de la involuntaria (despidos y fin de contrato).\n\nCada salida tiene costos visibles, como la liquidación, la convocatoria y la capacitación del reemplazo, y costos ocultos: menor productividad mientras el nuevo aprende, errores, sobrecarga para el equipo y clientes mal atendidos.\n\nAlgo de rotación es normal e incluso saludable. El problema es la rotación alta o la pérdida de los mejores. Las entrevistas de salida ayudan a conocer las causas reales.",
    example:
      "Una cadena de minimarkets de Arequipa tiene 50 trabajadores en promedio y 15 salidas al año: su rotación anual es 30 %. Reemplazar a cada persona le cuesta cerca de S/ 3,000 entre selección, capacitación y menor rendimiento inicial, es decir S/ 45,000 al año. Un programa de inducción y horarios estables le cuesta S/ 12,000 y reduce las salidas a 8: ahorra S/ 21,000 en reemplazos.",
    inGame:
      "Si pagas sueldos bajos o descuidas el clima laboral, te arriesgas a perder gente y productividad. Compara el ahorro en planilla con el costo de perder personal capacitado. La capacitación rinde más cuando el equipo se queda.",
  },
  {
    id: "con-beneficios-sociales",
    title: "Beneficios sociales",
    area: "personas",
    summary:
      "Son los pagos y aportes que la ley peruana establece a favor del trabajador en planilla, adicionales a su sueldo mensual.",
    body: "En el régimen laboral general, el trabajador recibe gratificaciones en julio y diciembre, cada una equivalente a un sueldo. Además, el empleador deposita la compensación por tiempo de servicios (CTS) en mayo y noviembre, y otorga 30 días de vacaciones pagadas por cada año de trabajo.\n\nEl empleador también aporta a EsSalud el 9 % de la remuneración, para el seguro de salud del trabajador. Ese aporte no se descuenta del sueldo.\n\nPor todo esto, el costo real de un trabajador es bastante mayor que su sueldo bruto. Las micro y pequeñas empresas inscritas en el régimen laboral MYPE tienen beneficios reducidos. No pagarlos expone a multas de la SUNAFIL y a demandas laborales.",
    example:
      "Una empresa de Lima del régimen general contrata a un asistente con sueldo de S/ 2,000. Al año paga S/ 24,000 en sueldos (incluido el mes de vacaciones), S/ 4,000 en dos gratificaciones, cerca de S/ 2,333 de CTS y S/ 2,160 de EsSalud. Sin contar otros conceptos, el costo anual supera los S/ 32,000, alrededor de 35 % más que los 12 sueldos.",
    inGame:
      "Cuando fijes la cantidad de personal y el nivel de sueldos, recuerda que una planilla formal cuesta más que la suma de sueldos. En las situaciones laborales, tener gente fuera de planilla ahorra hoy, pero trae riesgo de multa y daña tu reputación y tu clima laboral.",
  },
  {
    id: "con-capacitacion-y-desarrollo",
    title: "Capacitación y desarrollo",
    area: "personas",
    summary:
      "Es la inversión en conocimientos y habilidades del personal para que haga mejor su trabajo actual y pueda asumir nuevas responsabilidades.",
    body: "La capacitación cierra la brecha entre lo que la persona sabe hacer y lo que el puesto necesita. El desarrollo mira más lejos: prepara a la persona para puestos futuros.\n\nEl proceso tiene cuatro pasos: detectar necesidades (qué falta y a quién), diseñar el programa, ejecutarlo y evaluar resultados. La evaluación no debe quedarse en si el curso gustó, sino medir si cambió el desempeño: menos errores, más ventas, menos reclamos.\n\nEs una inversión y no un gasto, siempre que responda a una necesidad real del negocio. Su retorno se pierde si la persona capacitada renuncia pronto, por eso debe ir junto con un buen clima y sueldos competitivos.",
    example:
      "Una concesionaria de autos de Trujillo capacita a sus 10 vendedores en técnicas de cierre y financiamiento vehicular. El programa cuesta S/ 15,000. En el trimestre siguiente, la conversión de cotizaciones a ventas sube de 10 % a 13 % y se venden 9 autos más, con un margen de S/ 4,000 cada uno: S/ 36,000 adicionales.",
    inGame:
      "La capacitación es una de tus decisiones de personas en cada trimestre. Apoya la productividad, la calidad y el clima laboral. Mantén una inversión constante en vez de gastar mucho un trimestre y nada el siguiente.",
  },
  {
    id: "con-politica-de-sueldos",
    title: "Política de sueldos",
    area: "personas",
    summary:
      "Es el conjunto de criterios con los que la empresa decide cuánto pagar a cada puesto de forma justa y sostenible.",
    body: "Una buena política busca dos equilibrios. Equidad interna: puestos de responsabilidad parecida reciben pagos parecidos dentro de la empresa. Competitividad externa: los sueldos son comparables con los que paga el mercado por puestos similares.\n\nLa empresa puede pagar por debajo, igual o por encima del mercado. Pagar menos ahorra hoy, pero dificulta atraer y retener talento. Pagar más eleva los costos fijos y solo se justifica si trae mayor productividad.\n\nLa remuneración tiene una parte fija y puede tener una parte variable (comisiones, bonos por metas), que alinea el esfuerzo con los resultados. En el Perú, un trabajador de jornada completa no puede ganar menos que la remuneración mínima vital.",
    example:
      "Una empresa de software de Guadalajara, en México, pagaba a sus programadores 15 % por debajo del mercado y perdió a 6 de 20 en un año. Cada reemplazo tardaba 3 meses y atrasaba proyectos. Igualó los sueldos al promedio del mercado y añadió un bono por entregas a tiempo. La planilla subió 12 %, pero las renuncias bajaron a 1 al año y los proyectos dejaron de atrasarse.",
    inGame:
      "El nivel de sueldos es una decisión de cada trimestre. Sueldos bajos mejoran la utilidad inmediata, pero afectan el clima laboral. Sueldos altos elevan tus costos fijos y tu punto de equilibrio. Busca el nivel que tu margen pueda sostener.",
  },
  {
    id: "con-dotacion-de-personal",
    title: "Dotación de personal",
    area: "personas",
    summary:
      "Es calcular cuántas personas necesita la empresa para atender su carga de trabajo sin que sobre ni falte gente.",
    body: "Fórmula básica: personal necesario = carga de trabajo del período / productividad por persona. La carga de trabajo sale del pronóstico de ventas o de producción.\n\nSi falta personal, hay horas extra, cansancio, errores, clientes mal atendidos y ventas perdidas. Si sobra, pagas sueldos por tiempo ocioso y tu costo fijo sube sin necesidad.\n\nContratar y despedir tiene costos y efectos en el clima laboral, así que la dotación no debe cambiar con cada variación pequeña de la demanda. Para los picos de campaña se usan alternativas como contratos temporales, horas extra, turnos parciales o tercerización.",
    example:
      "Una empresa de limpieza de Lima gana un contrato para mantener 12,000 metros cuadrados de oficinas cada día. Cada operario limpia 800 metros cuadrados por turno, así que necesita 12,000 / 800 = 15 operarios. Agrega 2 más para cubrir descansos, vacaciones y faltas. Con 17 personas cumple el contrato sin recurrir a horas extra.",
    inGame:
      "Antes de decidir la cantidad de personal, mira tu producción planeada y la productividad de tu equipo. Si subes la producción sin personal suficiente, no llegarás a la meta. Si contratas de más, inflas la planilla. Ajusta de forma gradual.",
  },
  {
    id: "con-reclutamiento-y-seleccion",
    title: "Reclutamiento y selección",
    area: "personas",
    summary:
      "Es el proceso de atraer candidatos y elegir a la persona que mejor se ajusta al puesto y a la cultura de la empresa.",
    body: "Todo empieza con el perfil del puesto: qué funciones cumplirá la persona, qué conocimientos y habilidades necesita y a quién reporta. Sin un perfil claro se contrata por intuición.\n\nEl reclutamiento busca candidatos, dentro de la empresa (ascensos) o fuera (bolsas de trabajo, redes, referidos). La selección los evalúa con revisión de hoja de vida, entrevistas, pruebas prácticas y verificación de referencias.\n\nUna mala contratación cuesta caro: sueldo pagado sin resultados, tiempo del jefe, errores con clientes y un nuevo proceso. La selección termina con una buena inducción, que explica al nuevo trabajador sus funciones, las reglas y la cultura de la empresa.",
    example:
      "Una agencia de marketing digital de Quito contrataba diseñadores solo por entrevista y 4 de cada 10 no pasaban el periodo de prueba. Añadió una prueba práctica de 2 horas con un encargo real y pidió referencias de trabajos anteriores. El proceso ahora toma 5 días más, pero 9 de cada 10 contratados superan el periodo de prueba y los clientes reclaman menos.",
    inGame:
      "Cuando aumentes tu personal en el juego, hazlo de forma planificada y acompáñalo con capacitación. Crecer en gente de golpe eleva tu planilla antes que tus ventas, así que verifica primero que la demanda lo justifica.",
  },

  // ===== Ventas =====
  {
    id: "con-embudo-de-ventas",
    title: "Embudo de ventas",
    area: "ventas",
    summary:
      "Es el conjunto de etapas por las que avanza una oportunidad comercial, desde el primer contacto hasta el cierre.",
    body: "A diferencia del embudo de conversión de marketing, que mide público, el embudo de ventas sigue oportunidades concretas que gestiona un vendedor. Etapas típicas: prospecto, contacto calificado, presentación o cotización, negociación y cierre.\n\nTres números lo resumen: cantidad de oportunidades en cada etapa, tasa de conversión entre etapas y tiempo promedio del ciclo de venta. Valor esperado del embudo = suma de (monto de cada oportunidad x probabilidad de cierre de su etapa).\n\nEl embudo permite proyectar ventas y descubrir dónde se traban los negocios. Si sabes que cierras 1 de cada 5 cotizaciones, sabes cuántas cotizaciones necesitas para llegar a tu meta.",
    example:
      "Maquinarias del Sur, de Arequipa, vende compresoras industriales con un precio promedio de S/ 50,000. Su meta trimestral es S/ 500,000, es decir 10 ventas. Como cierra el 20 % de sus cotizaciones y cotiza a la mitad de los prospectos calificados, necesita 50 cotizaciones y 100 prospectos calificados. Hoy solo tiene 60 prospectos, así que debe prospectar más.",
    inGame:
      "En industrias B2B, el canal de venta directa es clave en tu mezcla de marketing. Si tus ventas no alcanzan la meta, revisa si el problema es que llegan pocos interesados (marketing) o que cierras pocos (precio o calidad frente a los rivales).",
  },
  {
    id: "con-venta-consultiva-b2b",
    title: "Venta consultiva B2B",
    area: "ventas",
    summary:
      "Es un método de venta entre empresas en el que el vendedor primero entiende el problema del cliente y luego propone una solución.",
    body: "En la venta entre empresas (B2B) los montos son mayores, el ciclo es más largo y deciden varias personas: el usuario, el área técnica, compras y gerencia. El cliente no compra un producto, compra un resultado para su negocio.\n\nEl vendedor consultivo pregunta antes de ofrecer. Investiga la situación del cliente, el problema que tiene, cuánto le cuesta ese problema y qué ganaría al resolverlo. Después presenta una propuesta que muestra el retorno de la inversión.\n\nLa relación no termina con la firma. El seguimiento, el cumplimiento de lo prometido y el servicio posventa generan renovaciones, ventas adicionales y recomendaciones.",
    example:
      "Un vendedor de un software de almacenes visita a una distribuidora de Lima. En lugar de mostrar funciones, pregunta cuánto pierden por errores de despacho: S/ 15,000 al mes. Propone una licencia de S/ 4,000 mensuales que reduciría esos errores a la mitad, con un ahorro de S/ 7,500. El cliente ve una ganancia neta de S/ 3,500 al mes y firma por un año.",
    inGame:
      "Si tu industria es B2B (software, consultoría, agencia, logística, limpieza, maquinaria), apóyate en la venta directa y en la calidad más que en los medios masivos. Cuida la satisfacción del cliente, porque perder una cuenta grande pesa mucho en tus ventas.",
  },
  {
    id: "con-churn",
    title: "Churn (tasa de abandono)",
    area: "ventas",
    summary:
      "Es el porcentaje de clientes que dejan de comprarte o cancelan su servicio en un período.",
    body: "Fórmula: churn = clientes perdidos en el período / clientes al inicio del período x 100. Su complemento es la tasa de retención. Es clave en negocios de ingreso recurrente: telefonía, gimnasios, software, educación.\n\nCon el churn se estima la vida promedio del cliente: vida promedio = 1 / churn. Un churn mensual de 5 % significa que un cliente se queda, en promedio, 20 meses.\n\nRetener suele costar menos que captar. Un churn alto obliga a gastar en publicidad solo para reponer clientes, como llenar un balde con huecos. Las causas comunes son mala atención, precio que ya no se justifica, mejor oferta de un rival o un producto que no se usa.",
    example:
      "Un gimnasio de Santiago de Chile empieza el mes con 1,000 socios y pierde 60: su churn mensual es 6 % y la vida promedio de un socio es cerca de 17 meses. Si baja el churn a 4 % con clases grupales y seguimiento a quienes dejan de asistir, la vida promedio sube a 25 meses. Con una cuota de 30 dólares, cada socio pasa de dejar unos 500 dólares a dejar 750.",
    inGame:
      "En industrias de membresía o suscripción (gimnasio, telecom, software, educación), la satisfacción del cliente es tu defensa contra el abandono. Antes de subir el presupuesto de marketing para captar, revisa si estás perdiendo clientes por calidad o servicio.",
  },
  {
    id: "con-ticket-promedio",
    title: "Ticket promedio y venta cruzada",
    area: "ventas",
    summary:
      "El ticket promedio es el monto que gasta un cliente en cada compra, y la venta cruzada lo aumenta ofreciendo productos complementarios.",
    body: "Fórmula: ticket promedio = ventas totales / número de transacciones. Las ventas pueden crecer de tres maneras: más clientes, más frecuencia de compra o mayor ticket. Subir el ticket suele ser lo más barato, porque el cliente ya está contigo.\n\nVenta cruzada: ofrecer un complemento del producto elegido, como papas y gaseosa con el pollo. Venta ascendente: ofrecer una versión mejor o más grande del mismo producto.\n\nFunciona cuando la sugerencia es útil para el cliente. Si se le presiona o se le cargan productos que no pidió, se pierde su confianza y puede terminar en un reclamo.",
    example:
      "Una cafetería de Barranco, en Lima, atiende 6,000 transacciones al mes con ventas de S/ 84,000: su ticket promedio es S/ 14. Capacita a su personal para ofrecer un postre con cada café y arma un combo de café más empanada. El ticket sube a S/ 16.50 y, con los mismos clientes, las ventas llegan a S/ 99,000.",
    inGame:
      "Lanzar nuevas líneas de producto te permite vender más a los mismos clientes. Evalúa si la nueva línea complementa a la actual antes de invertir. Con varias líneas, revisa la matriz BCG para ver cuáles aportan más.",
  },
  {
    id: "con-descuentos-y-margen",
    title: "Descuentos y margen",
    area: "ventas",
    summary:
      "Un descuento reduce la ganancia mucho más que el precio, por lo que debe darse con reglas claras y a cambio de algo.",
    body: "Como los costos no bajan cuando rebajas el precio, todo el descuento sale de tu margen. Si tu margen es 30 % del precio y das 10 % de descuento, renuncias a un tercio de tu ganancia por unidad.\n\nPara saber cuánto más debes vender y ganar lo mismo: aumento de volumen necesario = descuento / (margen - descuento). Con margen de 30 % y descuento de 10 %, necesitas vender 50 % más unidades.\n\nUna buena política define quién autoriza los descuentos, hasta qué tope y a cambio de qué: mayor volumen, pago al contado, contrato más largo. Los descuentos permanentes acostumbran al cliente a no pagar el precio completo.",
    example:
      "Una tienda de colchones de Huancayo vende a S/ 1,000 con un costo de S/ 700. Para Fiestas Patrias ofrece 10 % de descuento: el precio baja a S/ 900 y la ganancia por colchón cae de S/ 300 a S/ 200. Antes vendía 100 al mes y ganaba S/ 30,000. Ahora necesita vender 150 para ganar lo mismo. Vende 130 y gana S/ 26,000: vendió más y ganó menos.",
    inGame:
      "Bajar el precio es la decisión más fácil y la más peligrosa. Antes de hacerlo, calcula cuántas unidades adicionales necesitas para mantener tu utilidad y si tienes capacidad para producirlas. Si un rival baja precios, responder con calidad o marca puede ser mejor.",
  },
  {
    id: "con-credito-y-cobranza",
    title: "Crédito y cobranza",
    area: "ventas",
    summary:
      "Es la gestión de las ventas al crédito: a quién se le da plazo, por cuánto monto y cómo se asegura el cobro.",
    body: "Vender al crédito ayuda a ganar clientes, sobre todo entre empresas, pero convierte tu caja en cuentas por cobrar. Una venta no está completa hasta que se cobra.\n\nIndicador: período promedio de cobro = cuentas por cobrar / ventas al crédito x días del período. Si tus condiciones son 30 días y cobras en 55, tienes un problema de cobranza.\n\nUna política de crédito define la evaluación del cliente (historial, referencias, centrales de riesgo), la línea máxima, el plazo y las acciones ante un atraso. Hay herramientas para cobrar antes, como el descuento por pronto pago o el factoring, que permite adelantar el cobro de facturas a cambio de una comisión.",
    example:
      "Distribuidora Santa Rosa, de Chiclayo, vende S/ 360,000 al crédito por trimestre y tiene S/ 200,000 por cobrar. Su período promedio de cobro es 200,000 / 360,000 x 90 = 50 días, aunque su plazo oficial es 30. Esos 20 días extra equivalen a S/ 80,000 atrapados, justo el monto que pidió prestado al banco para pagar a proveedores.",
    inGame:
      "Vender mucho no garantiza tener caja. Compara tus ventas del estado de resultados con el efectivo que realmente ingresó según el flujo de efectivo. Si la caja no acompaña a las ventas, planifica el financiamiento con tiempo para evitar el sobregiro.",
  },
  {
    id: "con-servicio-posventa",
    title: "Servicio posventa y reclamos",
    area: "ventas",
    summary:
      "Es la atención que recibe el cliente después de comprar, incluida la solución de sus reclamos.",
    body: "La posventa abarca la entrega, la instalación, la garantía, el soporte, los cambios y devoluciones y la atención de quejas. Es el momento en que el cliente comprueba si la promesa de venta era cierta.\n\nUn reclamo bien resuelto puede dejar a un cliente más leal que antes del problema. Un reclamo ignorado se multiplica en redes sociales. Las claves son responder rápido, escuchar, asumir la responsabilidad y ofrecer una solución concreta.\n\nEn el Perú, los negocios que atienden a consumidores deben contar con un libro de reclamaciones, físico o virtual, y responder los reclamos dentro del plazo legal. El Indecopi puede sancionar a quien no lo tiene o no responde.",
    example:
      "Una tienda de electrodomésticos de Piura entrega una refrigeradora que falla a los 10 días. El cliente registra su reclamo en el libro de reclamaciones. La tienda lo llama el mismo día, cambia el equipo en 48 horas y le da un año adicional de garantía. El cambio le costó S/ 250 de transporte, pero el cliente la recomendó a dos familiares que compraron S/ 4,800.",
    inGame:
      "Las situaciones con clientes ponen a prueba tu posventa. Las opciones que resuelven el problema suelen costar caja hoy, pero protegen tu satisfacción del cliente y tu reputación. Ignorar un reclamo puede terminar en sanción y en pérdida de demanda.",
  },

  // ===== Emprendimiento =====
  {
    id: "con-modelo-canvas",
    title: "Modelo de negocio Canvas",
    area: "emprendimiento",
    summary:
      "Es un lienzo de nueve bloques que describe en una sola hoja cómo una empresa crea, entrega y captura valor.",
    body: "Los nueve bloques son: segmentos de clientes, propuesta de valor, canales, relación con los clientes, fuentes de ingresos, recursos clave, actividades clave, socios clave y estructura de costos.\n\nEl lado derecho del lienzo trata del cliente y de los ingresos. El lado izquierdo trata de lo que la empresa necesita para cumplir y de cuánto cuesta. Al centro está la propuesta de valor, que conecta ambos lados.\n\nSu ventaja es la rapidez: permite ver el negocio completo, detectar incoherencias y probar alternativas sin escribir un plan largo. Cada bloque es una hipótesis que debe validarse con clientes reales.",
    example:
      "Lucía, de Tarapoto, diseña el Canvas de su marca de chocolate con cacao local. Segmento: turistas y tiendas de regalos. Propuesta de valor: chocolate de origen con la historia del productor. Canales: ferias y tienda en línea. Ingresos: venta por unidad y cajas corporativas. Al llenar los costos, nota que el envío refrigerado a Lima consume 25 % del precio y decide vender allá solo en invierno.",
    inGame:
      "Antes del primer trimestre, arma un Canvas simple de tu empresa: a qué cliente apuntas, qué ofreces distinto, por qué canales llegas y cuáles son tus costos principales. Te servirá de guía para que tus decisiones de precio, marketing y calidad sean coherentes.",
  },
  {
    id: "con-propuesta-de-valor",
    title: "Propuesta de valor",
    area: "emprendimiento",
    summary:
      "Es la razón concreta por la que un cliente debería elegirte a ti y no a la competencia.",
    body: "La propuesta de valor describe qué problema resuelves, para quién y qué beneficio entregas mejor que las alternativas. No es un lema publicitario ni una lista de características.\n\nUna forma de construirla es partir del cliente: qué tareas quiere resolver, qué le molesta (dolores) y qué resultados espera (ganancias). Luego defines cómo tu producto alivia esos dolores y crea esas ganancias.\n\nUna buena propuesta es específica, relevante y difícil de copiar. 'Calidad y buen servicio' no diferencia a nadie, porque todos lo dicen. 'Entrega en 24 horas o tu pedido es gratis' sí se puede comprobar.",
    example:
      "Dos lavanderías de Surco, en Lima, cobran lo mismo por kilo. La primera anuncia 'ropa limpia y buen trato'. La segunda, Lava Express, promete recoger y devolver la ropa en casa en 24 horas, con pago por Yape y aviso por WhatsApp. Apunta a parejas jóvenes que trabajan todo el día. En 6 meses duplica sus clientes y logra cobrar S/ 1 más por kilo.",
    inGame:
      "Define en una frase por qué el cliente debería comprarte y haz que tus decisiones la respalden. Si tu propuesta es calidad, invierte en calidad. Si es precio, invierte en eficiencia. Una propuesta que tus indicadores no sostienen se cae sola.",
  },
  {
    id: "con-producto-minimo-viable",
    title: "Producto mínimo viable (PMV)",
    area: "emprendimiento",
    summary:
      "Es la versión más sencilla de un producto que permite probar con clientes reales si la idea funciona, antes de invertir en grande.",
    body: "El producto mínimo viable no es un producto malo ni incompleto: es el experimento más barato que permite aprender. Su objetivo es validar una hipótesis, como que el cliente tiene el problema, que pagaría por la solución o que aceptaría cierto precio.\n\nForma parte del ciclo crear, medir y aprender. Construyes algo pequeño, mides la respuesta real (compras, no opiniones) y decides si perseveras, ajustas o cambias de rumbo.\n\nLa mayor pérdida de un emprendedor es construir durante meses algo que nadie quiere. El PMV reduce ese riesgo. Lo que diga una encuesta vale menos que un cliente que paga.",
    example:
      "Diego quiere lanzar en Arequipa una aplicación de menús saludables por suscripción. Antes de gastar S/ 40,000 en desarrollarla, crea un catálogo en WhatsApp, cocina en su casa y ofrece el plan semanal a 30 oficinistas por S/ 90. Se suscriben 12 y 9 renuevan. Invirtió S/ 1,500, confirmó que hay demanda y descubrió que piden la entrega antes de la 1 p. m.",
    inGame:
      "Aplica la misma lógica al expandirte: prueba una región o una línea nueva con una inversión moderada, mide los resultados del trimestre y recién entonces aumenta la apuesta. Evita abrir todo al mismo tiempo con la caja justa.",
  },
  {
    id: "con-presupuesto-y-control",
    title: "Presupuesto y control presupuestal",
    area: "emprendimiento",
    summary:
      "El presupuesto es el plan de ingresos y gastos expresado en dinero, y el control presupuestal compara ese plan con lo que realmente ocurrió.",
    body: "El presupuesto traduce los objetivos en números. Parte del presupuesto de ventas y de él se derivan los demás: producción o compras, gastos de marketing, planilla, inversiones y, al final, el presupuesto de caja.\n\nEl control presupuestal compara lo real con lo planeado. Fórmula: variación = monto real - monto presupuestado. Se analizan las variaciones importantes, se busca su causa (precio, volumen o eficiencia) y se toman medidas.\n\nUn presupuesto no es una camisa de fuerza. Si el entorno cambia, se ajusta. Lo que no debe pasar es gastar sin plan y descubrir al final del período que el dinero no alcanzó.",
    example:
      "Una academia de inglés de Cusco presupuestó para el trimestre ingresos de S/ 150,000 y gastos de S/ 120,000. El resultado real fue S/ 138,000 de ingresos y S/ 126,000 de gastos. Esperaba una utilidad de S/ 30,000 y obtuvo S/ 12,000. Al analizar, ve que la variación de ingresos se debe a 40 alumnos menos por un bloqueo de carreteras y la de gastos a publicidad no planificada.",
    inGame:
      "Antes de confirmar tus decisiones, arma un presupuesto rápido del trimestre: ventas esperadas, costo de producción, marketing, planilla, intereses e impuestos. Al recibir los resultados, compara lo real con tu plan y busca la causa de cada diferencia.",
  },
  {
    id: "con-validacion-y-pivote",
    title: "Validación y pivote",
    area: "emprendimiento",
    summary:
      "Validar es comprobar con hechos que tu idea de negocio funciona, y pivotar es cambiar una parte del modelo cuando los datos dicen que no.",
    body: "Todo negocio nuevo se basa en supuestos: quién es el cliente, qué problema tiene, cuánto pagaría y cómo llegarás a él. Validar es poner esos supuestos a prueba, empezando por el más riesgoso.\n\nSi los resultados confirman el supuesto, perseveras. Si lo contradicen, pivotas: mantienes lo aprendido y cambias un elemento, como el segmento de clientes, el canal, el precio o el producto. Pivotar no es fracasar ni empezar de cero.\n\nPara decidir se usan métricas que reflejan conducta real, como compras, recompra y recomendación. Las métricas de vanidad, como seguidores o visitas, se ven bien, pero no pagan las cuentas.",
    example:
      "Una emprendedora de Bogotá vendía loncheras saludables para niños a través de colegios. Tras 4 meses, solo 2 de 15 colegios aceptaron. Pero notó que 40 madres le compraban directo por WhatsApp para llevar a sus oficinas. Pivotó de segmento: ahora vende almuerzos a oficinistas, con la misma cocina y las mismas recetas, y pasó de 30 a 120 pedidos diarios.",
    inGame:
      "Si una estrategia no da resultados después de dos o tres trimestres, revisa tus indicadores y cambia un elemento a la vez (precio, canal o región). Cambiar todo junto te impide saber qué funcionó. Persistir sin datos también es un error.",
  },
  {
    id: "con-formalizacion",
    title: "Formalización del negocio",
    area: "emprendimiento",
    summary:
      "Es cumplir los registros y obligaciones legales para operar, lo que tiene costos pero abre puertas a clientes, crédito y crecimiento.",
    body: "En el Perú, formalizar un negocio implica varios pasos: decidir si operarás como persona natural o como empresa (por ejemplo una SAC o una EIRL inscrita en Registros Públicos), obtener el RUC en la SUNAT, elegir un régimen tributario, tramitar la licencia de funcionamiento en la municipalidad y registrar a los trabajadores en planilla.\n\nSegún el rubro hay permisos adicionales, como el registro sanitario para alimentos o la autorización sanitaria para boticas.\n\nLa formalidad cuesta tiempo y dinero, pero permite emitir facturas, vender a empresas grandes y al Estado, acceder a crédito más barato, registrar tu marca en Indecopi y operar sin riesgo de multas o cierre.",
    example:
      "Un taller de carpintería de Villa María del Triunfo, en Lima, operaba sin RUC y vendía S/ 8,000 al mes a vecinos. Una cadena de restaurantes le ofreció un pedido de S/ 60,000 en muebles, pero exigía factura y contrato. El dueño constituyó una empresa y obtuvo su RUC y su licencia. Con las facturas del pedido, una caja municipal le aprobó su primer préstamo para maquinaria.",
    inGame:
      "En el juego tu empresa es formal: paga IGV, impuesto a la renta y planilla. Las situaciones pueden ofrecerte atajos informales con beneficio inmediato. Recuerda que llevan riesgo de sanción y dañan tu indicador de reputación.",
  },
  {
    id: "con-fuentes-de-financiamiento",
    title: "Fuentes de financiamiento",
    area: "emprendimiento",
    summary:
      "Son las distintas formas de conseguir dinero para iniciar o hacer crecer un negocio, cada una con su costo y su riesgo.",
    body: "Hay dos grandes grupos. Capital propio: ahorros, aportes de socios, utilidades reinvertidas e inversionistas que reciben una parte de la empresa. No genera cuotas, pero se comparte la propiedad y las ganancias. Deuda: préstamos de bancos, cajas municipales, cooperativas o proveedores. Se mantiene la propiedad, pero hay que pagar cuotas e intereses pase lo que pase.\n\nPara comparar préstamos se mira la tasa de costo efectivo anual (TCEA), que incluye intereses, comisiones y seguros, y no solo la tasa de interés.\n\nRegla práctica: financia activos de largo plazo con deuda de largo plazo, y necesidades temporales con deuda de corto plazo. El crédito informal y el sobregiro suelen ser las fuentes más caras.",
    example:
      "Una emprendedora de Chiclayo necesita S/ 50,000 para equipar su panadería. Compara tres opciones: un prestamista informal que cobra 10 % mensual, una caja municipal con una TCEA de 35 % y un socio que aporta el dinero a cambio del 30 % de la empresa. Elige la caja, porque su negocio proyecta ganar lo suficiente para pagar las cuotas y así conserva toda la propiedad.",
    inGame:
      "En finanzas decides préstamos, amortizaciones y dividendos. Pide préstamos con anticipación para inversiones que generen ventas y evita el sobregiro, que entra cuando tu caja queda negativa y es caro. Repartir dividendos con deuda alta debilita tu caja.",
  },
];

export default data;
