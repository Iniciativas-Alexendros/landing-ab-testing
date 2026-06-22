import { afterEach, describe, expect, it, vi } from "vitest";

let cookieValue: string | undefined;
let edgeFlag: unknown;

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (_name: string) => (cookieValue ? { value: cookieValue } : undefined),
  }),
}));

vi.mock("@vercel/edge-config", () => ({ get: async (_key: string) => edgeFlag }));

import { getServerVariant } from "./server";

afterEach(() => {
  cookieValue = undefined;
  edgeFlag = undefined;
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("getServerVariant", () => {
  it("usa la cookie cuando no hay Edge Config", async () => {
    vi.stubEnv("EDGE_CONFIG", "");
    cookieValue = "B";
    expect(await getServerVariant()).toBe("B");
  });

  it("cae a 'A' sin cookie ni override", async () => {
    vi.stubEnv("EDGE_CONFIG", "");
    cookieValue = undefined;
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(await getServerVariant()).toBe("A");
    expect(warn).toHaveBeenCalled();
  });

  it("el override de Edge Config tiene prioridad sobre la cookie", async () => {
    vi.stubEnv("EDGE_CONFIG", "https://edge-config.example/ecfg?token=x");
    cookieValue = "A";
    edgeFlag = "B";
    expect(await getServerVariant()).toBe("B");
  });

  it("ignora un override inválido de Edge Config y usa la cookie", async () => {
    vi.stubEnv("EDGE_CONFIG", "https://edge-config.example/ecfg?token=x");
    cookieValue = "A";
    edgeFlag = "Z";
    expect(await getServerVariant()).toBe("A");
  });
});
