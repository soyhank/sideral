"use client";

import { ArrowRight, Eye, EyeOff, GraduationCap, Presentation } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/display";
import { act } from "@/lib/api";
import { cx } from "@/lib/format";
import { supabase } from "@/lib/supabase/client";

const ERRORS: [RegExp, string][] = [
  [/invalid login credentials/i, "El correo o la contraseña no coinciden."],
  [/already registered|already been registered|user already/i, "Ya existe una cuenta con ese correo. Ingresa con tu contraseña."],
  [/password should be at least/i, "La contraseña debe tener al menos 6 caracteres."],
  [/rate limit|too many/i, "Hay muchos intentos desde esta red. Espera un minuto y vuelve a probar."],
  [/invalid.*email|unable to validate email/i, "Revisa el correo: no parece válido."],
  [/network|fetch/i, "Sin conexión. Revisa tu internet e inténtalo otra vez."],
];

function explain(message: string): string {
  for (const [re, text] of ERRORS) if (re.test(message)) return text;
  return "No pudimos completar la operación. Inténtalo otra vez.";
}

function safeReturn(v: string | null): string {
  return v && v.startsWith("/") && !v.startsWith("//") ? v : "/inicio";
}

export function AuthForm({ mode }: { mode: "login" | "registro" }) {
  const router = useRouter();
  const params = useSearchParams();
  const back = safeReturn(params.get("volver"));
  const code = params.get("sala");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [role, setRole] = useState<"estudiante" | "docente">("estudiante");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signup = mode === "registro";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    if (signup && name.trim().length < 2) return setError("Escribe tu nombre.");
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    setBusy(true);
    try {
      const auth = supabase().auth;
      if (signup) {
        const { data, error: err } = await auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: { data: { app: "sideral", display_name: name.trim(), role, institution: institution.trim() } },
        });
        if (err) throw err;
        if (!data.session) {
          const { error: e2 } = await auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
          if (e2) throw e2;
        }
        await act("profile.ensure", { display_name: name.trim(), role, institution: institution.trim() }).catch(() => {});
      } else {
        const { error: err } = await auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
        if (err) throw err;
      }
      router.replace(code ? `/salas?codigo=${encodeURIComponent(code)}` : back);
    } catch (err) {
      setError(explain(err instanceof Error ? err.message : String(err)));
      setBusy(false);
    }
  };

  const query = params.toString() ? `?${params.toString()}` : "";

  return (
    <div className="glass animate-rise rounded-[2rem] p-7 sm:p-9">
      <h1 className="display text-4xl">{signup ? "Crea tu cuenta" : "Bienvenido de vuelta"}</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-2">
        {signup ? "Toma menos de un minuto. No pedimos confirmar el correo." : "Ingresa para continuar donde te quedaste."}
      </p>
      {code && <div className="chip chip-info mt-4">Después entrarás a la sala {code}</div>}

      <form onSubmit={submit} className="mt-7 space-y-4" noValidate>
        {signup && (
          <>
            <div role="radiogroup" aria-label="Tipo de cuenta" className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: "estudiante", label: "Soy estudiante", icon: GraduationCap },
                  { id: "docente", label: "Soy docente", icon: Presentation },
                ] as const
              ).map((r) => (
                <button
                  key={r.id}
                  type="button"
                  role="radio"
                  aria-checked={role === r.id}
                  onClick={() => setRole(r.id)}
                  className={cx("panel flex h-12 items-center justify-center gap-2 rounded-2xl text-sm font-medium transition", role === r.id ? "!border-white/50 !bg-white/12 text-white" : "text-ink-2")}
                >
                  <r.icon size={16} />
                  {r.label}
                </button>
              ))}
            </div>
            <div>
              <label className="label" htmlFor="name">
                Nombre y apellido
              </label>
              <input id="name" className="field" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Como quieres que te vean" maxLength={40} required />
            </div>
          </>
        )}
        <div>
          <label className="label" htmlFor="email">
            Correo
          </label>
          <input id="email" type="email" inputMode="email" className="field" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" required />
        </div>
        <div>
          <label className="label" htmlFor="password">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="password"
              type={show ? "text" : "password"}
              className="field pr-12"
              autoComplete={signup ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={signup ? "Mínimo 6 caracteres" : "Tu contraseña"}
              minLength={6}
              required
            />
            <button type="button" className="absolute top-1/2 right-1.5 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-xl text-ink-3 hover:text-ink" onClick={() => setShow((s) => !s)} aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}>
              {show ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </div>
        {signup && (
          <div>
            <label className="label" htmlFor="institution">
              Institución <span className="text-ink-4">(opcional)</span>
            </label>
            <input id="institution" className="field" autoComplete="organization" value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="Instituto o universidad" maxLength={80} />
          </div>
        )}

        {error && (
          <div role="alert" className="rounded-2xl border border-bad/30 bg-bad/10 px-4 py-3 text-sm text-[#ff9a93]">
            {error}
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-lg w-full" disabled={busy}>
          {busy ? <Spinner /> : null}
          {busy ? "Un momento" : signup ? "Crear cuenta" : "Ingresar"}
          {!busy && <ArrowRight size={18} />}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-2">
        {signup ? "¿Ya tienes cuenta?" : "¿Primera vez aquí?"}{" "}
        <Link href={`${signup ? "/login" : "/registro"}${query}`} className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
          {signup ? "Ingresa" : "Crea tu cuenta"}
        </Link>
      </p>
    </div>
  );
}
