import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon: rombo blanco sobre cuadrado iris (la marca de <Logo/>).
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#5B5BD6",
        borderRadius: "7px",
      }}
    >
      <div
        style={{
          width: "13px",
          height: "13px",
          background: "#ffffff",
          borderRadius: "2px",
          transform: "rotate(45deg)",
        }}
      />
    </div>,
    { ...size },
  );
}
