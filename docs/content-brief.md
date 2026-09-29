# Guía para escribir contenido de Sideral

Sideral es un simulador de negocios para estudiantes de institutos y universidades de Perú y Latinoamérica. El jugador dirige una empresa por trimestres y compite contra otras empresas (rivales automáticos u otros estudiantes).

## Cómo funciona el juego (para que el contenido sea coherente)

Cada trimestre el jugador decide:

- Precio y producción (o compras, o capacidad de atención si es un servicio).
- Marketing: presupuesto y mezcla de canales (digital, medios masivos, activaciones BTL, venta directa).
- Personas: cantidad de personal, nivel de sueldos, capacitación.
- Finanzas: préstamos, amortizaciones, dividendos. Si la caja queda negativa entra un sobregiro caro.
- Calidad e innovación: inversión en calidad del producto y en eficiencia de procesos.
- Expansión: regiones (Lima, Norte, Sur, Centro, Oriente) y nuevas líneas de producto.
- Investigación de mercados: pronóstico de demanda, inteligencia competitiva, estudio del consumidor.

Indicadores de la empresa: caja, ventas, utilidad, cuota de mercado, marca (0 a 100), calidad (0 a 100), clima laboral (0 a 100), satisfacción del cliente (0 a 100), reputación (ética y cumplimiento, 0 a 100), precio de la acción.

El juego calcula estado de resultados, estado de situación financiera, flujo de efectivo, IGV (18 %), impuesto a la renta, ratios, punto de equilibrio, matriz BCG de las líneas de producto, FODA automático, cinco fuerzas de Porter, PESTEL con las noticias del trimestre y cuadro de mando integral.

En cada trimestre aparece una **noticia del entorno** (afecta a todo el mercado) y una **situación** (dilema con 2 a 4 opciones que afecta solo a la empresa que decide).

## Industrias disponibles (ids)

pasteleria (tortas y pastelería), bebidas (bebidas naturales), restaurante (pollería y restaurante), cafeteria (café de especialidad), moda (confecciones, Gamarra), minimarket (bodega y minimarket), farmacia (botica), ecommerce (tienda en línea), inmobiliaria (venta de departamentos), lotes (venta de lotes y terrenos), autos (concesionaria de autos), software (licencias de software, SaaS B2B), telecom (planes móviles e internet), consultoria (asesoría empresarial B2B), agencia (agencia de marketing digital B2B), agroexport (agroexportación), educacion (instituto o academia), gimnasio (gimnasio por membresía), turismo (agencia de turismo), logistica (courier y logística B2B), limpieza (limpieza y mantenimiento B2B, licitaciones), maquinaria (equipos industriales B2B).

## Reglas de redacción (obligatorias)

1. Español de Perú, natural, como lo escribiría un profesor de negocios con experiencia. Trato de "tú".
2. Prohibido usar rayas largas (— y –). Usa comas, puntos o paréntesis.
3. Sin emojis. No usar la palabra "render".
4. Contexto real de Perú y Latinoamérica: SUNAT, SUNAFIL, Indecopi, OSIPTEL, BCRP, SBS, OSCE, Digemid, Senasa, municipalidades, cajas municipales, Yape y Plin, Gamarra, Fenómeno del Niño, bloqueos de carreteras, informalidad, campañas (Día de la Madre, Fiestas Patrias, Navidad, campaña escolar, Cyber Wow), tipo de cambio, etc. Varía ciudades: Lima, Trujillo, Chiclayo, Piura, Arequipa, Cusco, Tacna, Huancayo, Ayacucho, Iquitos, Pucallpa, Tarapoto, y también casos de Colombia, México, Chile, Argentina, Ecuador y Bolivia cuando aporte.
5. Las empresas y personas de los casos son ficticias. No atribuyas faltas ni delitos a empresas o personas reales. En `basedOn` solo menciona hechos ampliamente conocidos (por ejemplo "Fenómeno del Niño costero de 2017" o "Paralización por la pandemia de 2020") sin inventar cifras.
6. Exactitud: solo afirma cifras legales o tributarias de las que tengas certeza (IGV 18 %, impuesto a la renta del régimen general 29.5 %, Régimen MYPE Tributario con 10 % hasta 15 UIT de renta neta, EsSalud 9 %, gratificaciones en julio y diciembre, CTS en mayo y noviembre, libro de reclamaciones obligatorio). Si dudas de una cifra, descríbela de forma cualitativa.
7. Nada de relleno. Cada caso debe enseñar un concepto concreto de negocios.

## Reglas de equilibrio para los dilemas

- Las opciones deben plantear una disyuntiva real. La mejor opción no debe delatarse por su texto.
- El atajo tentador (evadir, informalidad, engañar al cliente, coima) da un beneficio inmediato y lleva un `risk` con probabilidad de una sanción fuerte, además de pérdida de reputación.
- Magnitudes típicas: gastos o ingresos únicos entre 1 y 8 % (`cashPct`), casos graves hasta 15 o 20 %. Puntos de marca, clima, calidad, satisfacción y reputación entre 2 y 10, casos graves hasta 15.
- "No hacer nada" puede ser una opción válida y a veces es la correcta.
- `verdict`: "optima" la mejor decisión de gestión, "buena" aceptable, "riesgosa" puede salir bien o mal, "mala" destruye valor.
- Reparte los niveles (`tier`): aproximadamente 40 % nivel 1, 40 % nivel 2 y 20 % nivel 3.

## Entrega

- Lee `src/content/types.ts` y `scripts/validate-content.ts` antes de escribir.
- Escribe solo los archivos que se te asignan. No modifiques otros archivos, no instales paquetes, no uses git.
- Cada archivo: `import type { ... } from "../types";` y `const data: Tipo[] = [ ... ]; export default data;`
- Valida con `npx tsx scripts/validate-content.ts <ruta del archivo>` desde `C:\Users\hank\sideral` y corrige hasta que no haya errores.
- Usa el prefijo de id que se te indique para evitar ids repetidos entre archivos.
