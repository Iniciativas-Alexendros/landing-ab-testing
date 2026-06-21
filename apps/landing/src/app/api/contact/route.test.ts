import { describe, expect, it } from "vitest";

import { POST } from "./route";

function postRequest(body: unknown): Request {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("devuelve 422 con datos inválidos", async () => {
    const res = await POST(postRequest({ name: "A", email: "no-es-email" }));
    expect(res.status).toBe(422);
  });

  it("devuelve 400 con JSON inválido", async () => {
    const res = await POST(
      new Request("http://localhost/api/contact", { method: "POST", body: "{" }),
    );
    expect(res.status).toBe(400);
  });

  it("crea el lead y devuelve 201 con datos válidos", async () => {
    const res = await POST(postRequest({ name: "Ada Lovelace", email: "ada@example.com" }));
    expect(res.status).toBe(201);
    const json = (await res.json()) as { ok: boolean; id: string };
    expect(json.ok).toBe(true);
    expect(json.id).toBeTruthy();
  });
});
