/**
 * Prueba de una sala en vivo con tres navegadores a la vez: un docente que dirige
 * y dos estudiantes que compiten. Verifica que los avisos en tiempo real funcionen.
 *
 * Uso: node scripts/e2e-room.mjs [http://localhost:3217] [carpeta de capturas]
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
const password = "Sideral-Prueba-2026";
const problems = [];
const checks = [];
const ok = (name, pass, detail = "") => {
  checks.push({ name, pass });
  console.log(`  ${pass ? "✓" : "✗"} ${name}${detail ? `  ${detail}` : ""}`);
};

async function person(browser, name, role, extra = "") {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 860 }, locale: "es-PE", timezoneId: "America/Lima" });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => problems.push(`[${name}] ${String(e).slice(0, 300)}`));
  page.on("console", (m) => {
    if (m.type() === "error" && !m.text().includes("Failed to load resource")) problems.push(`[${name}] consola: ${m.text().slice(0, 300)}`);
  });
  page.on("response", (r) => {
    if (r.status() >= 400 && !r.url().includes("/auth/v1/")) problems.push(`[${name}] ${r.status()} ${r.url().slice(0, 140)}`);
  });
  await page.goto(`${BASE}/registro${extra}`, { waitUntil: "networkidle" });
  if (role === "docente") await page.getByRole("radio", { name: "Soy docente" }).click();
  await page.getByLabel("Nombre y apellido").fill(name);
  await page.getByLabel("Correo").fill(`prueba.${name.toLowerCase().replace(/\s+/g, "")}.${stamp}@sideral.test`);
  await page.getByRole("textbox", { name: "Contraseña" }).fill(password);
  await page.getByRole("button", { name: "Crear cuenta" }).click();
  return { ctx, page, name };
}

async function skipWelcome(page) {
  const b = page.getByRole("button", { name: "Explorar por mi cuenta" });
  try {
    await b.waitFor({ timeout: 8000 });
    await b.click();
  } catch {}
}

const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  console.log("Docente crea la sala");
  const profe = await person(browser, "Docente Rojas", "docente");
  await profe.page.waitForURL("**/inicio", { timeout: 20000 });
  await skipWelcome(profe.page);
  await profe.page.goto(`${BASE}/salas`, { waitUntil: "networkidle" });
  await profe.page.getByRole("button", { name: "Crear sala" }).click();
  await profe.page.getByLabel("Nombre de la sala").fill("Gestión III sección B");
  await profe.page.getByRole("radio", { name: /Bebidas naturales/ }).click();
  await profe.page.getByRole("tab", { name: "4 trim." }).click();
  await profe.page.getByRole("dialog").getByRole("button", { name: "Crear sala" }).click();
  await profe.page.waitForURL("**/sala/**", { timeout: 20000 });
  const code = profe.page.url().split("/sala/")[1];
  ok("la sala tiene código", /^[A-Z0-9]{6}$/.test(code), code);
  await profe.page.getByText("Esperando a los primeros participantes").waitFor({ timeout: 15000 });
  ok("el docente no ocupa una empresa", true);

  console.log("Estudiantes entran con el enlace de invitación");
  const ana = await person(browser, "Ana Torres", "estudiante", `?sala=${code}`);
  await ana.page.waitForURL(`**/sala/${code}`, { timeout: 25000 });
  await ana.page.getByText("Estás dentro").waitFor({ timeout: 15000 });
  ok("Ana llega al vestíbulo desde el registro", true);
  const beto = await person(browser, "Beto Salas", "estudiante", `?sala=${code}`);
  await beto.page.waitForURL(`**/sala/${code}`, { timeout: 25000 });
  await beto.page.getByText("Estás dentro").waitFor({ timeout: 15000 });

  await profe.page.getByText("Ana Torres").waitFor({ timeout: 12000 });
  await profe.page.getByText("Beto Salas").waitFor({ timeout: 12000 });
  ok("el docente ve llegar a los dos en vivo", true);
  await ana.page.getByText("Beto Salas").waitFor({ timeout: 12000 });
  ok("los estudiantes se ven entre sí", true);
  await profe.page.screenshot({ path: join(OUT, "sala-01-vestibulo-docente.png") });

  console.log("Inicio de la competencia");
  await profe.page.getByRole("button", { name: "Iniciar la competencia" }).click();
  await Promise.all([
    profe.page.waitForURL("**/partida/**", { timeout: 25000 }),
    ana.page.waitForURL("**/partida/**", { timeout: 25000 }),
    beto.page.waitForURL("**/partida/**", { timeout: 25000 }),
  ]);
  ok("todos pasan a la partida sin recargar", true);
  await profe.page.getByText("Observas como docente").waitFor({ timeout: 15000 });
  ok("el docente entra como observador", true);

  for (let round = 1; round <= 2; round++) {
    console.log(`Trimestre ${round}`);
    for (const p of [ana, beto]) {
      await p.page.getByRole("tab", { name: "Decisiones" }).click();
      await p.page.getByRole("radio").first().waitFor({ timeout: 15000 });
      await p.page.getByRole("radio").nth(p === ana ? 0 : 1).click();
    }
    const price = ana.page.getByRole("textbox", { name: /Precio de Jugo natural/ });
    await price.click();
    await price.fill(round === 1 ? "5.2" : "5.4");
    await price.press("Enter");
    await ana.page.waitForTimeout(1200);
    await ana.page.getByRole("button", { name: "Enviar decisiones" }).first().click();
    await ana.page.getByRole("dialog").getByRole("button", { name: "Enviar" }).click();
    await ana.page.getByText("Enviado").first().waitFor({ timeout: 15000 });
    if (round === 1) {
      ok("Ana envía y queda en espera", true);
      await ana.page.screenshot({ path: join(OUT, "sala-02-enviado.png") });
    }
    await beto.page.getByRole("button", { name: "Enviar decisiones" }).first().click();
    await beto.page.getByRole("dialog").getByRole("button", { name: "Enviar" }).click();
    await Promise.all([
      ana.page.getByText(/Cerraste con|Esto pasó en el entorno|Tu decisión tuvo consecuencias/).waitFor({ timeout: 30000 }),
      beto.page.getByText(/Cerraste con|Esto pasó en el entorno|Tu decisión tuvo consecuencias/).waitFor({ timeout: 30000 }),
    ]);
    ok(`trimestre ${round}: al enviar el último, ambos ven el resultado`, true);
    if (round === 1) await ana.page.screenshot({ path: join(OUT, "sala-03-resultado.png") });
    for (const p of [ana, beto]) {
      await p.page.getByRole("button", { name: "Saltar" }).click();
      await p.page.waitForTimeout(400);
    }
  }

  await profe.page.getByRole("tab", { name: "Posiciones" }).click();
  await profe.page.getByText("Ana Torres").first().waitFor({ timeout: 20000 });
  await profe.page.screenshot({ path: join(OUT, "sala-04-docente-posiciones.png"), fullPage: true });
  ok("el docente sigue las posiciones", true);

  console.log("El docente fuerza el cierre");
  await profe.page.getByRole("button", { name: "Cerrar trimestre ahora" }).click();
  await ana.page.getByText(/Cerraste con|Esto pasó en el entorno|Tu decisión tuvo consecuencias/).waitFor({ timeout: 30000 });
  ok("el cierre forzado llega a los estudiantes", true);
} catch (e) {
  problems.push(`La prueba se detuvo: ${String(e).slice(0, 700)}`);
} finally {
  await browser.close();
  const admin = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SECRET_KEY, { auth: { persistSession: false } });
  const { data } = await admin.auth.admin.listUsers({ perPage: 500 });
  for (const u of data?.users ?? []) if (u.email?.endsWith("@sideral.test")) await admin.auth.admin.deleteUser(u.id);
}
const failed = checks.filter((c) => !c.pass).length;
console.log(problems.length ? `\nProblemas (${problems.length}):\n${problems.join("\n")}` : "\nSin errores de consola ni de red");
process.exit(problems.length || failed ? 1 : 0);
