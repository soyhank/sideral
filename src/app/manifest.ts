import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sideral · Simulador de negocios",
    short_name: "Sideral",
    description: "Dirige una empresa, compite y aprende gestión tomando decisiones.",
    start_url: "/inicio",
    display: "standalone",
    background_color: "#060608",
    theme_color: "#060608",
    lang: "es-PE",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
