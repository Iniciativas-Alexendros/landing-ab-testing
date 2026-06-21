import path from "node:path";
import type { NextConfig } from "next";

// CSP pragmática: next/font auto-aloja las fuentes (font-src 'self'); next-themes
// inyecta un script inline para fijar el tema antes del paint, de ahí 'unsafe-inline'
// en script-src. En desarrollo, el fast-refresh de Next necesita 'unsafe-eval'.
// Endurecer con nonces si se requiere CSP estricta.
const scriptSrc =
  process.env.NODE_ENV === "production"
    ? "script-src 'self' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";

const csp = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fija la raíz del monorepo (evita que Next infiera mal por lockfiles externos).
  outputFileTracingRoot: path.join(import.meta.dirname, "../.."),
  // Transpila el paquete de UI del monorepo (just-in-time, sin build previo).
  transpilePackages: ["@landing/ui"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
