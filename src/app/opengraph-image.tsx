import { ImageResponse } from "next/og";

export const alt = "Sideral, simulador de negocios";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#f5f5f7",
          background:
            "radial-gradient(900px 500px at 12% 0%, rgba(148,163,255,0.28), transparent 60%), radial-gradient(800px 500px at 100% 100%, rgba(120,200,255,0.16), transparent 60%), #060608",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 34, letterSpacing: 10, fontWeight: 600 }}>
          <svg width="54" height="54" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="5.2" fill="#f5f5f7" />
            <ellipse cx="16" cy="16" rx="14" ry="6.2" transform="rotate(-28 16 16)" stroke="#f5f5f7" strokeOpacity="0.55" strokeWidth="1.5" fill="none" />
            <circle cx="27.6" cy="9.4" r="2" fill="#f5f5f7" />
          </svg>
          SIDERAL
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 86, lineHeight: 1.04, letterSpacing: -2, fontWeight: 600 }}>Se aprende a dirigir dirigiendo</div>
          <div style={{ marginTop: 26, fontSize: 32, color: "rgba(245,245,247,0.7)" }}>Simulador de negocios para estudiantes de Perú y Latinoamérica</div>
        </div>
      </div>
    ),
    size,
  );
}
