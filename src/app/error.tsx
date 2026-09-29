"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="grid min-h-dvh place-items-center px-5">
      <div className="glass max-w-md rounded-3xl p-8 text-center">
        <h1 className="display text-4xl">Algo se interrumpió</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-2">Tu avance está guardado. Vuelve a intentarlo y, si continúa, recarga la página.</p>
        <div className="mt-7 flex justify-center gap-2">
          <button className="btn btn-primary" onClick={reset}>
            Reintentar
          </button>
          <Link href="/inicio" className="btn btn-ghost">
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
