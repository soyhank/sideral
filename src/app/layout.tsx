import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const display = Instrument_Serif({ variable: "--font-display", subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap" });

const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sideral.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "Sideral · Simulador de negocios", template: "%s · Sideral" },
  description:
    "Dirige una empresa peruana, compite contra tus compañeros y aprende finanzas, marketing, tributos y estrategia tomando decisiones de verdad.",
  applicationName: "Sideral",
  keywords: ["simulador de negocios", "simulador empresarial", "Perú", "gestión", "estrategia", "finanzas", "marketing"],
  openGraph: {
    title: "Sideral · Simulador de negocios",
    description: "Dirige una empresa, compite y aprende a gestionar tomando decisiones de verdad.",
    type: "website",
    locale: "es_PE",
    siteName: "Sideral",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060608",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full`}>
      <body className="min-h-full">
        <div className="backdrop" aria-hidden />
        {children}
      </body>
    </html>
  );
}
