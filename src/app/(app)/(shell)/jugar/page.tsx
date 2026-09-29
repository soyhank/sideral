"use client";

import { ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useApp } from "@/components/app/AppProvider";
import { DEFAULT_SETUP, IndustryPicker, SetupForm, estimateMinutes, type SetupValue } from "@/components/app/GameSetup";
import { PageHeader, Spinner } from "@/components/ui/display";
import { useToast } from "@/components/ui/Toast";
import { INDUSTRIES } from "@/engine/industries";
import type { IndustryId } from "@/engine/types";
import { act, ApiError } from "@/lib/api";

function Play() {
  const router = useRouter();
  const params = useSearchParams();
  const { profile } = useApp();
  const { toast } = useToast();
  const [industry, setIndustry] = useState<IndustryId | null>(null);
  const [setup, setSetup] = useState<SetupValue>(DEFAULT_SETUP);
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const id = params.get("industria");
    if (id && INDUSTRIES.some((i) => i.id === id)) setIndustry(id as IndustryId);
  }, [params]);

  const start = async () => {
    if (!industry || busy) return;
    setBusy(true);
    try {
      const res = await act<{ id: string }>("game.create", { mode: "libre", industry, ...setup, company: company.trim() || undefined });
      router.push(`/partida/${res.id}`);
    } catch (e) {
      toast(e instanceof ApiError ? e.message : "No se pudo crear la partida.", "error");
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader eyebrow="Modo individual" title="Simulación libre" text="Elige el rubro, la dificultad y cuánto quieres decidir. Compites contra rivales automáticos, cada uno con su propia estrategia." />

      <section>
        <h2 className="mb-3 flex items-center gap-2.5 text-sm font-semibold text-ink-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-bold text-black">1</span>
          Elige tu industria
        </h2>
        <IndustryPicker value={industry} onChange={setIndustry} />
      </section>

      <section className="mt-9">
        <h2 className="mb-3 flex items-center gap-2.5 text-sm font-semibold text-ink-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-bold text-black">2</span>
          Configura la partida
        </h2>
        <div className="panel rounded-3xl p-5 sm:p-6">
          <SetupForm value={setup} onChange={setSetup} />
        </div>
      </section>

      <section className="mt-9">
        <h2 className="mb-3 flex items-center gap-2.5 text-sm font-semibold text-ink-2">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-bold text-black">3</span>
          Ponle nombre a tu empresa
        </h2>
        <div className="panel flex flex-col gap-3 rounded-3xl p-5 sm:flex-row sm:items-center sm:p-6">
          <input
            className="field flex-1"
            value={company}
            maxLength={32}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={`Empresa de ${profile?.display_name.split(" ")[0] ?? "gerente"}`}
            aria-label="Nombre de tu empresa"
            onKeyDown={(e) => e.key === "Enter" && start()}
          />
          <button className="btn btn-primary btn-lg" disabled={!industry || busy} onClick={start}>
            {busy ? <Spinner /> : null}
            {busy ? "Preparando el mercado" : industry ? `Empezar (${estimateMinutes(setup)} min)` : "Elige una industria"}
            {!busy && industry && <ArrowRight size={18} />}
          </button>
        </div>
      </section>
    </div>
  );
}

export default function PlayPage() {
  return (
    <Suspense fallback={null}>
      <Play />
    </Suspense>
  );
}
