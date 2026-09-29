import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="grid min-h-dvh place-items-center px-5">
      <div className="max-w-md text-center">
        <Logo className="justify-center" />
        <h1 className="display mt-10 text-6xl">Aquí no hay nada</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-2">La página que buscas no existe o cambió de lugar.</p>
        <Link href="/inicio" className="btn btn-primary mt-8">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
