import { beforeEach, describe, expect, it } from "vitest";

import { __resetRateLimit, rateLimit } from "./rate-limit";

beforeEach(() => __resetRateLimit());

describe("rateLimit", () => {
  it("permite hasta el límite y luego bloquea", () => {
    for (let i = 0; i < 3; i += 1) {
      expect(rateLimit("k", 3, 60_000).ok).toBe(true);
    }
    const blocked = rateLimit("k", 3, 60_000);
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });

  it("aísla por clave", () => {
    expect(rateLimit("a", 1, 60_000).ok).toBe(true);
    expect(rateLimit("a", 1, 60_000).ok).toBe(false);
    expect(rateLimit("b", 1, 60_000).ok).toBe(true);
  });

  it("reabre la ventana cuando expira", () => {
    expect(rateLimit("k", 1, -1).ok).toBe(true);
    // ventana ya expirada (resetAt en el pasado) → nuevo bucket
    expect(rateLimit("k", 1, -1).ok).toBe(true);
  });
});
