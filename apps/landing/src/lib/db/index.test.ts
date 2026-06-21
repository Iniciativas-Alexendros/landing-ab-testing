import { describe, expect, it } from "vitest";

import { getRepo } from "./index";

describe("getRepo", () => {
  it("devuelve un repositorio funcional (driver memory por defecto)", async () => {
    const repo = getRepo();
    const lead = await repo.leads.create({ name: "Ada", email: "ada@example.com" });
    expect(lead.id).toBeTruthy();
  });

  it("es un singleton (misma instancia entre llamadas)", () => {
    expect(getRepo()).toBe(getRepo());
  });
});
