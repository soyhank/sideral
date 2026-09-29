# Sideral

Simulador de negocios para estudiantes de Perú y Latinoamérica. Cada persona dirige una empresa por trimestres, compite contra rivales automáticos o contra sus compañeros y recibe estados financieros, análisis estratégico y una lectura de su gestión.

## Qué incluye

- **22 industrias** al consumidor y a empresas: pastelería, bebidas, restaurante, moda, inmobiliaria, lotes, autos, software, telecomunicaciones, consultoría, agroexportación y más.
- **Decisiones por área**: precio y volumen, marketing y canales, personas, finanzas, calidad e innovación, líneas de producto, expansión regional, crédito a clientes e investigación de mercados.
- **Contabilidad completa**: estado de resultados, situación financiera, flujo de efectivo, ratios, IGV con crédito fiscal, impuesto a la renta y cargas sociales.
- **Estrategia**: FODA y FODA cruzado automáticos, matriz BCG, cinco fuerzas de Porter, PESTEL, Ansoff y cuadro de mando integral.
- **Contenido**: 338 situaciones, 84 noticias del entorno, 300 preguntas de trivia, 66 casos FODA y 70 conceptos.
- **Modos**: carrera de 16 misiones, simulación libre, salas en vivo (individual o por equipos, con mercados paralelos), torneos, duelos y retos del día.
- **Progreso**: experiencia, niveles, racha, ligas semanales, insignias y estrellas.
- **Docentes**: aulas, seguimiento por estudiante y reporte descargable.

## Arquitectura

| Capa | Tecnología |
|---|---|
| Interfaz | Next.js 16 (App Router), React 19, Tailwind 4 |
| Motor | TypeScript puro en `src/engine`, determinista por semilla |
| Datos | Supabase: Postgres con seguridad por fila, Auth y avisos en vivo |
| Alojamiento | Vercel, funciones en São Paulo junto a la base de datos |

El motor corre en el servidor para el resultado oficial y en el navegador para la proyección. Las lecturas van directo del navegador a Supabase con seguridad por fila. Toda escritura pasa por `/api/act`. El guion de cada partida (noticias, situaciones y sus efectos) nunca llega al navegador.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # completa las claves de Supabase
npm run dev
```

| Comando | Qué hace |
|---|---|
| `npm test` | Pruebas del motor: contabilidad, equilibrio y determinismo en las 22 industrias |
| `npm run content` | Valida todo el contenido |
| `npm run e2e` | Recorre registro, partidas, salas, retos, torneos, duelos y aulas contra un servidor en marcha |
| `npm run e2e:ui` | Recorrido visual con navegador real y capturas |
| `npm run e2e:room` | Sala en vivo con tres navegadores a la vez |
| `npm run calibrate` | Mide la dificultad de cada misión con un jugador pasivo y uno aplicado |

Las migraciones están en `supabase/migrations` y se aplican en orden con `node scripts/db-apply.mjs <archivo>`.

## Nota

Las empresas, personas y cifras de los casos son ficticias y tienen fines educativos. Los parámetros tributarios y laborales son referenciales.
