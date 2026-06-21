import { beforeEach, describe, expect, it } from "vitest";

import { createMemoryRepo } from "./memory";
import type { AppRepo } from "./repo";

describe("createMemoryRepo", () => {
  let repo: AppRepo;

  beforeEach(() => {
    repo = createMemoryRepo();
  });

  it("crea un lead con id y createdAt generados y lo lista", async () => {
    const lead = await repo.leads.create({ name: "Ada", email: "ada@example.com" });
    expect(lead.id).toMatch(/[0-9a-f-]{36}/);
    expect(lead.createdAt).toBeInstanceOf(Date);
    expect(lead.company).toBeNull();

    const all = await repo.leads.list();
    expect(all).toHaveLength(1);
    expect(all[0]?.email).toBe("ada@example.com");
  });

  it("aísla el estado entre instancias", async () => {
    await repo.leads.create({ name: "Ada", email: "ada@example.com" });
    const other = createMemoryRepo();
    expect(await other.leads.list()).toHaveLength(0);
  });

  it("registra eventos y los agrega por variante", async () => {
    await repo.events.record({ variant: "A", action: "cta_click" });
    await repo.events.record({ variant: "A", action: "cta_click" });
    await repo.events.record({ variant: "B", action: "cta_click" });

    const counts = await repo.events.countByVariant();
    expect(counts).toEqual({ A: 2, B: 1 });
    expect(await repo.events.list()).toHaveLength(3);
  });
});
