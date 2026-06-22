import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site.config";

export const alt = siteConfig.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Imagen Open Graph generada dinámicamente (sin assets). Usa el rombo de marca
// como cuadrado rotado para no depender de glifos de fuente.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: "linear-gradient(135deg, #5B5BD6 0%, #7A6CE8 100%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
        <div
          style={{
            display: "flex",
            width: "72px",
            height: "72px",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.18)",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              background: "#ffffff",
              borderRadius: "6px",
              transform: "rotate(45deg)",
            }}
          />
        </div>
        <div style={{ fontSize: "40px", fontWeight: 700 }}>{siteConfig.brand.name}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div style={{ fontSize: "66px", fontWeight: 700, lineHeight: 1.08, maxWidth: "960px" }}>
          {siteConfig.seo.title}
        </div>
        <div style={{ fontSize: "30px", opacity: 0.9, maxWidth: "820px" }}>
          {siteConfig.seo.description}
        </div>
      </div>
    </div>,
    { ...size },
  );
}
