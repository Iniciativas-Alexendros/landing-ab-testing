import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Icono para iOS: rombo blanco sobre cuadrado iris.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#5B5BD6",
        borderRadius: "40px",
      }}
    >
      <div
        style={{
          width: "74px",
          height: "74px",
          background: "#ffffff",
          borderRadius: "14px",
          transform: "rotate(45deg)",
        }}
      />
    </div>,
    { ...size },
  );
}
