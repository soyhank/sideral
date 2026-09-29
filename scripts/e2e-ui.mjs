/**
 * Recorrido visual con un navegador real (Edge). Registra un usuario por la interfaz,
 * juega un trimestre y toma capturas de cada pantalla en escritorio y celular.
 *
 * Uso: node scripts/e2e-ui.mjs [http://localhost:3217] [carpeta de capturas]
 */
import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const BASE = process.argv[2] ?? "http://localhost:3217";
const OUT = process.argv[3] ?? join(process.env.TEMP ?? ".", "sideral-capturas");
mkdirSync(OUT, { recursive: true });

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .map((l) => l.match(/^([A-Z_]+)=(.*)$/))
    .filter(Boolean)
    .map((m) => [m[1], m[2]]),
);

const stamp = Date.now().toString(36);
const email = `prueba.visual.${stamp}@sideral.test`;
const password = "Sideral-Prueba-2026";
const problems = [];
let step = 0;

async function shot(page, name, full = false) {
  step++;
  const file = join(OUT, `${String(step).padStart(2, "0")}-${name}.png`);
  await page.screenshot({ path: file, fullPage: full });
  console.log(`  captura ${file}`);
}

function watch(page, label) {
  page.on("console", (m) => {
    if (m.type() === "error" && !m.text().includes("Failed to load resource")) problems.push(`[${label}] consola: ${m.text().slice(0, 300)}`);
  });
  page.on("pageerror", (e) => problems.push(`[${label}] error: ${String(e).slice(0, 300)}`));
  page.on("response", (r) => {
    if (r.status() >= 400) problems.push(`[${label}] ${r.status()} en ${r.url()}`);
  });
}

const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  // ---------------- Escritorio ----------------
  const desk = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "es-PE", timezoneId: "America/Lima", deviceScaleFactor: 1 });
  const page = await desk.newPage();
  watch(page, "escritorio");

  console.log("Presentación");
  await page.goto(BASE, { waitUntil: "networkidle" });
  await shot(page, "presentacion");
  await shot(page, "presentacion-completa", true);

  console.log("Registro");
  await page.goto(`${BASE}/registro`, { waitUntil: "networkidle" });
  await page.getByLabel("Nombre y apellido").fill("Valeria Quispe");
  await page.getByLabel("Correo").fill(email);
  await page.getByRole("textbox", { name: "Contraseña" }).fill(password);
  await page.getByLabel(/Institución/).fill("Instituto de Prueba");
  await shot(page, "registro");
  await page.getByRole("button", { name: "Crear cuenta" }).click();
  await page.waitForURL("**/inicio", { timeout: 20000 });
  await page.getByText("Diriges una empresa").waitFor({ timeout: 15000 });
  await shot(page, "bienvenida");
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.getByRole("button", { name: "Explorar por mi cuenta" }).click();
  await page.waitForTimeout(800);
  await shot(page, "inicio", true);

  console.log("Carrera y misión 1");
  await page.goto(`${BASE}/carrera`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await shot(page, "carrera", true);
  await page.getByRole("button", { name: /Tu primera torta/ }).click();
  await page.getByLabel(/Nombre de tu empresa/).fill("Dulce Valeria");
  await shot(page, "mision-detalle");
  await page.getByRole("button", { name: /Empezar la misión/ }).click();
  await page.waitForURL("**/partida/**", { timeout: 20000 });
  await page.getByText("Recibes Dulce Valeria en marcha").waitFor({ timeout: 20000 });
  await shot(page, "partida-resumen", true);

  await page.getByRole("tab", { name: "Decisiones" }).click();
  await page.waitForTimeout(500);
  await shot(page, "partida-decisiones", true);
  const price = page.getByRole("textbox", { name: /Precio de Tortas clásicas/ });
  await price.click();
  await price.fill("70");
  await price.press("Enter");
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: "Igualar a la demanda proyectada" }).click();
  await page.waitForTimeout(400);
  await shot(page, "partida-decisiones-ajustadas");
  await page.getByRole("button", { name: "Cerrar trimestre" }).first().click();
  await page.waitForTimeout(300);
  await shot(page, "confirmar-cierre");
  await page.getByRole("dialog").getByRole("button", { name: "Cerrar trimestre" }).click();
  await page.getByText(/Cerraste con/).waitFor({ timeout: 20000 });
  await page.waitForTimeout(1200);
  await shot(page, "cierre-resultados");
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.waitForTimeout(900);
  await shot(page, "cierre-posicion");
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.waitForTimeout(1500);
  await shot(page, "cierre-recompensas");
  await page.getByRole("button", { name: "Siguiente trimestre" }).click();
  await page.waitForTimeout(800);
  await shot(page, "partida-resumen-t2", true);
  for (const tab of ["Mercado", "Finanzas", "Estrategia", "Posiciones"]) {
    await page.getByRole("tab", { name: tab }).click();
    await page.waitForTimeout(700);
    await shot(page, `partida-${tab.toLowerCase()}`, true);
  }
  await page.getByRole("tab", { name: "Estrategia" }).click();
  await page.getByRole("tab", { name: "Matriz BCG" }).click();
  await page.waitForTimeout(500);
  await shot(page, "estrategia-bcg", true);
  await page.getByRole("tab", { name: "Porter" }).click();
  await page.waitForTimeout(400);
  await shot(page, "estrategia-porter", true);
  await page.getByRole("tab", { name: "Cuadro de mando" }).click();
  await page.waitForTimeout(400);
  await shot(page, "estrategia-cuadro", true);
  await page.getByRole("tab", { name: "Finanzas" }).click();
  await page.getByRole("tab", { name: "Tributos" }).click();
  await page.waitForTimeout(400);
  await shot(page, "finanzas-tributos", true);

  console.log("Simulación libre con todas las áreas");
  await page.goto(`${BASE}/jugar`, { waitUntil: "networkidle" });
  await page.getByRole("radio", { name: /Licencias de software/ }).click();
  await page.waitForTimeout(500);
  await shot(page, "jugar", true);
  await page.getByRole("button", { name: /Empezar \(/ }).click();
  await page.waitForURL("**/partida/**", { timeout: 20000 });
  await page.getByText(/en marcha/).waitFor({ timeout: 20000 });
  await shot(page, "libre-resumen", true);
  await page.getByRole("tab", { name: "Decisiones" }).click();
  await page.waitForTimeout(500);
  for (const name of ["Líneas de producto", "Personas", "Calidad e innovación", "Expansión regional", "Crédito a clientes", "Finanzas", "Investigación de mercados"])
    await page.getByRole("button", { name: new RegExp(`^${name}`) }).click();
  await page.waitForTimeout(500);
  await shot(page, "libre-decisiones-completas", true);

  console.log("Otras pantallas");
  for (const [path, name] of [
    ["/retos", "retos"],
    ["/salas", "salas"],
    ["/torneos", "torneos"],
    ["/duelos", "duelos"],
    ["/ranking", "ranking"],
    ["/aulas", "aulas"],
    ["/academia", "academia"],
    ["/perfil", "perfil"],
  ]) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);
    await shot(page, name, true);
  }

  console.log("Reto de trivia");
  await page.goto(`${BASE}/retos`, { waitUntil: "networkidle" });
  await page.getByRole("radio").first().waitFor({ timeout: 15000 });
  for (let i = 0; i < 5; i++) {
    await page.getByRole("radio").nth(i % 4).click();
    await page.getByRole("button", { name: i < 4 ? "Siguiente" : "Terminar" }).click();
    await page.waitForTimeout(250);
  }
  await page.getByText(/Mañana hay un reto nuevo/).waitFor({ timeout: 15000 });
  await shot(page, "retos-resultado", true);

  console.log("Sala");
  await page.goto(`${BASE}/salas`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Crear sala" }).click();
  await page.getByRole("radio", { name: /Concesionaria de autos/ }).click();
  await page.waitForTimeout(400);
  await shot(page, "sala-crear");
  await page.getByRole("dialog").getByRole("button", { name: "Crear sala" }).click();
  await page.waitForURL("**/sala/**", { timeout: 20000 });
  await page.getByText("Código de la sala").waitFor({ timeout: 15000 });
  await page.waitForTimeout(1500);
  await shot(page, "sala-vestibulo");
  await desk.close();

  // ---------------- Celular ----------------
  console.log("Celular");
  const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: "es-PE", timezoneId: "America/Lima" });
  const m = await phone.newPage();
  watch(m, "celular");
  await m.goto(BASE, { waitUntil: "networkidle" });
  await shot(m, "cel-presentacion");
  await m.goto(`${BASE}/login`, { waitUntil: "networkidle" });
  await m.getByLabel("Correo").fill(email);
  await m.getByRole("textbox", { name: "Contraseña" }).fill(password);
  await shot(m, "cel-login");
  await m.getByRole("button", { name: "Ingresar" }).click();
  await m.waitForURL("**/inicio", { timeout: 20000 });
  await m.waitForTimeout(1500);
  await shot(m, "cel-inicio", true);
  await m.getByRole("link", { name: /Dulce Valeria/ }).first().click();
  await m.waitForURL("**/partida/**", { timeout: 20000 });
  await m.waitForTimeout(1500);
  await shot(m, "cel-partida");
  await m.getByRole("tab", { name: "Decisiones" }).click();
  await m.waitForTimeout(600);
  await shot(m, "cel-decisiones");
  await shot(m, "cel-decisiones-completa", true);
  await m.getByRole("button", { name: "Ver proyección completa" }).click();
  await m.waitForTimeout(500);
  await shot(m, "cel-proyeccion");
  await m.keyboard.press("Escape");
  await m.getByRole("tab", { name: "Finanzas" }).click();
  await m.waitForTimeout(600);
  await shot(m, "cel-finanzas", true);
  await m.goto(`${BASE}/carrera`, { waitUntil: "networkidle" });
  await m.waitForTimeout(800);
  await shot(m, "cel-carrera");
  await m.goto(`${BASE}/retos`, { waitUntil: "networkidle" });
  await m.waitForTimeout(800);
  await shot(m, "cel-retos");
  await phone.close();
} catch (e) {
  problems.push(`El recorrido se detuvo: ${String(e).slice(0, 600)}`);
} finally {
  await browser.close();
  const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } });
  const { data } = await admin.auth.admin.listUsers({ perPage: 200 });
  for (const u of data?.users ?? []) if (u.email === email) await admin.auth.admin.deleteUser(u.id);
}

console.log(problems.length ? `\nProblemas (${problems.length}):\n${problems.join("\n")}` : "\nSin errores de consola ni de red");
console.log(`Capturas en ${OUT}`);
process.exit(problems.length ? 1 : 0);
