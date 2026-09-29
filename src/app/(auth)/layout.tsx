import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center px-4 py-8 sm:py-12">
      <Link href="/" className="mb-8 sm:mb-10" aria-label="Sideral, inicio">
        <Logo />
      </Link>
      <main className="w-full max-w-[440px] flex-1">{children}</main>
      <p className="mt-10 text-center text-xs text-ink-4">Simulador de negocios para estudiantes de Perú y Latinoamérica</p>
    </div>
  );
}
