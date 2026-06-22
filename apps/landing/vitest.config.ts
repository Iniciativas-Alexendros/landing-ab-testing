import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
  test: {
    coverage: {
      provider: "v8",
      include: ["src/lib/**/*.ts", "src/components/ab/**/*.tsx"],
      exclude: ["**/*.{test,spec}.*", "src/lib/db/types.ts"],
      thresholds: { statements: 85, lines: 85, functions: 90, branches: 75 },
    },
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "node",
          include: ["src/**/*.{test,spec}.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "component",
          environment: "jsdom",
          include: ["src/**/*.{test,spec}.tsx"],
          setupFiles: ["./vitest.setup.ts"],
        },
      },
    ],
  },
});
