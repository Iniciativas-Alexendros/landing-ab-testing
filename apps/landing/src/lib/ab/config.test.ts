import { describe, expect, it } from "vitest";

import { isVariant, randomVariant } from "./config";

describe("isVariant", () => {
  it("acepta A y B", () => {
    expect(isVariant("A")).toBe(true);
    expect(isVariant("B")).toBe(true);
  });

  it("rechaza cualquier otro valor", () => {
    expect(isVariant("C")).toBe(false);
    expect(isVariant(undefined)).toBe(false);
    expect(isVariant("")).toBe(false);
    expect(isVariant(1)).toBe(false);
  });
});

describe("randomVariant", () => {
  it("solo devuelve A o B", () => {
    for (let i = 0; i < 100; i += 1) {
      expect(["A", "B"]).toContain(randomVariant());
    }
  });

  it("produce ambas variantes sobre muchas muestras", () => {
    const seen = new Set<string>();
    for (let i = 0; i < 200; i += 1) seen.add(randomVariant());
    expect(seen.has("A")).toBe(true);
    expect(seen.has("B")).toBe(true);
  });
});
