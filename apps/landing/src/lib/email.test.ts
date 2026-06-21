import { afterEach, describe, expect, it, vi } from "vitest";

import type { Lead } from "@/lib/db";

import { sendWelcomeEmail } from "./email";

const lead: Lead = {
  id: "lead-1",
  name: "<script>alert(1)</script>",
  email: "ada@example.com",
  company: null,
  message: null,
  variant: null,
  createdAt: new Date(0),
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("sendWelcomeEmail", () => {
  it("se simula (true) sin RESEND_API_KEY", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    expect(await sendWelcomeEmail(lead)).toBe(true);
  });

  it("escapa el nombre del lead en el HTML (no inyección)", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("RESEND_FROM", "Test <test@example.com>");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);

    await sendWelcomeEmail(lead);

    const body = JSON.parse(fetchMock.mock.calls[0]![1].body as string) as { html: string };
    expect(body.html).not.toContain("<script>");
    expect(body.html).toContain("&lt;script&gt;");
  });

  it("devuelve false si falta RESEND_FROM en producción", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("RESEND_FROM", "");
    expect(await sendWelcomeEmail(lead)).toBe(false);
  });

  it("devuelve false si Resend responde con error", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("RESEND_FROM", "Test <test@example.com>");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 422 }));
    expect(await sendWelcomeEmail(lead)).toBe(false);
  });
});
