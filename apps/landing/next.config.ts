import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Fija la raíz del monorepo (evita que Next infiera mal por lockfiles externos).
  outputFileTracingRoot: path.join(import.meta.dirname, "../.."),
  // Transpila el paquete de UI del monorepo (just-in-time, sin build previo).
  transpilePackages: ["@landing/ui"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
