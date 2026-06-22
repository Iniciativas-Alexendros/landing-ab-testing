import { describe, expect, it } from "vitest";

import { getRepo } from "@/lib/db";

import { getAbStats } from "./stats";

describe("getAbStats", () => {
  it("calcula clics, leads y conversión por variante", async () => {
    const repo = getRepo();
    await repo.events.record({ variant: "A", action: "cta_click" });
    await repo.events.record({ variant: "A", action: "cta_click" });
    await repo.events.record({ variant: "A", action: "otra_accion" }); // no cuenta como clic
    await repo.events.record({ variant: "B", action: "cta_click" });
    await repo.leads.create({ name: "Ada", email: "a@b.com", variant: "A" });

    const stats = await getAbStats();
    const a = stats.find((s) => s.variant === "A")!;
    const b = stats.find((s) => s.variant === "B")!;

    expect(a.clicks).toBe(2);
    expect(a.leads).toBe(1);
    expect(a.conversion).toBeCloseTo(0.5);
    expect(b.clicks).toBe(1);
    expect(b.leads).toBe(0);
    expect(b.conversion).toBe(0);
  });
});
