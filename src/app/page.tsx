import { ArrowRight, BarChart3, BookOpen, CalendarCheck, Compass, Landmark, LineChart, Megaphone, Presentation, Route, Scale, Search, Swords, Trophy, Users, Wallet } from "lucide-react";
import Link from "next/link";
import { Icon, industryColor } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { INDUSTRIES } from "@/engine/industries";

const AREAS = [
  { icon: Wallet, title: "Contabilidad y finanzas", text: "Estado de resultados, situación financiera, flujo de efectivo, ratios, préstamos, sobregiro y dividendos." },
  { icon: Landmark, title: "Tributos del Perú", text: "IGV con crédito fiscal, impuesto a la renta, Régimen MYPE Tributario y cargas sociales de la planilla." },
  { icon: Megaphone, title: "Marketing", text: "Precio, presupuesto, mezcla de canales, marca, satisfacción y reparto por línea y región." },
  { icon: Search, title: "Investigación de mercados", text: "Pronóstico del entorno, inteligencia competitiva y estudio del consumidor." },
  { icon: Compass, title: "Estrategia", text: "FODA y FODA cruzado, matriz BCG, cinco fuerzas de Porter, PESTEL, Ansoff y cuadro de mando integral." },
  { icon: Users, title: "Personas y operaciones", text: "Dotación, sueldos, capacitación, clima laboral, capacidad, inventarios, calidad y eficiencia." },
];

const MODES = [
  { icon: Route, title: "Carrera", time: "10 a 30 min por misión", text: "Dieciséis misiones que entregan la empresa área por área, de una pastelería de barrio a un operador nacional." },
  { icon: Users, title: "Salas", time: "Una clase o varias semanas", text: "Toda la clase en el mismo mercado, individual o en equipos. Con más de seis empresas se forman mercados paralelos." },
  { icon: Trophy, title: "Torneos", time: "20 min, cuando puedas", text: "El mismo escenario para todos. No hace falta coincidir en horario: gana el mejor puntaje." },
  { icon: Swords, title: "Duelos", time: "10 min", text: "Uno contra uno, cuatro trimestres, misma empresa y mismos rivales." },
  { icon: CalendarCheck, title: "Retos del día", time: "5 min", text: "Trivia, un dilema, un FODA y cálculo rápido. Cambian cada día y sostienen la racha." },
  { icon: BookOpen, title: "Academia", time: "Consulta libre", text: "Setenta conceptos explicados en corto, con ejemplo local y su uso en el juego." },
];

const STEPS = [
  { n: "1", title: "Decide", text: "Precio, volumen, publicidad, personal, inversión y financiamiento. La proyección se actualiza mientras mueves cada control." },
  { n: "2", title: "Enfrenta", text: "Cada trimestre trae una noticia del entorno y una situación que ningún manual resuelve." },
  { n: "3", title: "Compara", text: "El mercado reparte la demanda. Recibes estados financieros, tu posición y la lectura de tu coach." },
];

export default function Landing() {
  const b2c = INDUSTRIES.filter((i) => i.kind === "B2C").length;
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 px-4 pt-3 sm:px-6">
        <div className="glass mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-4 sm:px-5">
          <Link href="/" aria-label="Sideral, inicio">
            <Logo />
          </Link>
          <nav className="flex items-center gap-1.5">
            <Link href="/login" className="btn btn-quiet btn-sm">
              Ingresar
            </Link>
            <Link href="/registro" className="btn btn-primary btn-sm">
              Crear cuenta
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Presentación */}
        <section className="mx-auto max-w-6xl px-5 pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
          <div className="chip mx-auto animate-rise">Simulador de negocios para Perú y Latinoamérica</div>
          <h1 className="display text-gradient mx-auto mt-6 max-w-4xl animate-rise text-[3.3rem] sm:text-7xl lg:text-[5.5rem]" style={{ animationDelay: "60ms" }}>
            Se aprende a dirigir <em>dirigiendo</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-rise text-base leading-relaxed text-ink-2 sm:text-lg" style={{ animationDelay: "120ms" }}>
            Toma el mando de una empresa, compite contra tus compañeros y descubre qué pasa con la caja, los clientes y el equipo cuando decides de verdad.
          </p>
          <div className="mt-9 flex animate-rise flex-col items-center justify-center gap-3 sm:flex-row" style={{ animationDelay: "180ms" }}>
            <Link href="/registro" className="btn btn-primary btn-lg w-full sm:w-auto">
              Empezar gratis
              <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="btn btn-ghost btn-lg w-full sm:w-auto">
              Ya tengo cuenta
            </Link>
          </div>
          <dl className="mx-auto mt-14 grid max-w-3xl animate-rise grid-cols-2 gap-3 sm:grid-cols-4" style={{ animationDelay: "240ms" }}>
            {[
              { v: String(INDUSTRIES.length), l: "industrias" },
              { v: "338", l: "situaciones reales" },
              { v: "84", l: "noticias del entorno" },
              { v: "300", l: "preguntas de trivia" },
            ].map((s) => (
              <div key={s.l} className="panel rounded-2xl px-4 py-4">
                <dt className="sr-only">{s.l}</dt>
                <dd className="num display text-4xl">{s.v}</dd>
                <dd className="mt-1 text-xs text-ink-3">{s.l}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Cómo funciona */}
        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="eyebrow text-center">Cada trimestre</div>
          <h2 className="display mt-3 text-center text-4xl sm:text-5xl">Tres pasos, consecuencias reales</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="glass rounded-3xl p-7">
                <span className="display grid h-12 w-12 place-items-center rounded-full bg-white text-2xl text-black">{s.n}</span>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Áreas */}
        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="eyebrow text-center">Todo lo que lleva una empresa</div>
          <h2 className="display mt-3 text-center text-4xl sm:text-5xl">Un solo juego, todas las áreas</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a) => (
              <div key={a.title} className="panel rounded-3xl p-6">
                <a.icon size={22} className="text-ink-2" />
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{a.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Industrias */}
        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="eyebrow text-center">
            {b2c} rubros al consumidor y {INDUSTRIES.length - b2c} a empresas
          </div>
          <h2 className="display mt-3 text-center text-4xl sm:text-5xl">Elige tu industria</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-ink-3">
            Cada rubro tiene su propia estacionalidad, estructura de costos, canales que funcionan y situaciones propias del mercado peruano.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
            {INDUSTRIES.map((i) => (
              <li key={i.id} className="panel flex items-center gap-3 rounded-2xl px-4 py-3.5">
                <Icon name={i.icon} size={19} className="shrink-0" style={{ color: industryColor(i.id) }} />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{i.name}</span>
                  <span className="block text-[11px] text-ink-3">{i.kind === "B2C" ? "Al consumidor" : "A empresas"}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Modos */}
        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="eyebrow text-center">Solo o contra otros</div>
          <h2 className="display mt-3 text-center text-4xl sm:text-5xl">Seis formas de jugar</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODES.map((m) => (
              <div key={m.title} className="panel rounded-3xl p-6">
                <div className="flex items-center justify-between gap-3">
                  <m.icon size={22} className="text-ink-2" />
                  <span className="chip">{m.time}</span>
                </div>
                <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{m.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-3">{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Docentes */}
        <section className="mx-auto max-w-6xl px-5 py-14">
          <div className="glass grid gap-8 rounded-[2rem] p-7 sm:p-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="eyebrow flex items-center gap-2">
                <Presentation size={14} />
                Para docentes
              </div>
              <h2 className="display mt-3 text-4xl sm:text-5xl">Tu clase, en un mercado vivo</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-2">
                Crea una sala en un minuto, comparte el código y observa a cada empresa mientras decide. Tú marcas el ritmo: cierras cada trimestre cuando termines de explicar o dejas un plazo para que avance sola.
              </p>
              <Link href="/registro" className="btn btn-primary mt-7">
                Crear cuenta docente
                <ArrowRight size={17} />
              </Link>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: Users, t: "Individual o en equipos", d: "Los equipos editan las decisiones en vivo" },
                { icon: BarChart3, t: "Seguimiento por estudiante", d: "Nivel, misiones, partidas y actividad" },
                { icon: Scale, t: "Mismas condiciones", d: "Todos enfrentan las mismas noticias y situaciones" },
                { icon: LineChart, t: "Reporte descargable", d: "Avance del aula en una hoja de cálculo" },
              ].map((x) => (
                <li key={x.t} className="well rounded-2xl p-4">
                  <x.icon size={18} className="text-ink-2" />
                  <div className="mt-2.5 text-sm font-medium">{x.t}</div>
                  <div className="mt-0.5 text-xs leading-relaxed text-ink-3">{x.d}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 pt-14 pb-24 text-center">
          <h2 className="display text-5xl sm:text-6xl">Tu primera empresa te espera</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-2">Crear la cuenta toma menos de un minuto. La primera misión, diez.</p>
          <Link href="/registro" className="btn btn-primary btn-lg mt-8">
            Empezar ahora
            <ArrowRight size={18} />
          </Link>
        </section>
      </main>

      <footer className="border-t border-line px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-ink-3 sm:flex-row">
          <Logo size={20} className="opacity-70" />
          <p>Las empresas, personas y cifras de los casos son ficticias y tienen fines educativos.</p>
        </div>
      </footer>
    </div>
  );
}
