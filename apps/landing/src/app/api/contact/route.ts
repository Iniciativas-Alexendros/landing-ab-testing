import { NextResponse } from "next/server";

import { repo } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, isSameOrigin } from "@/lib/request";
import { leadSchema } from "@/lib/validation";

const LIMIT = 5;
const WINDOW_MS = 60_000;

/** Recibe un lead del formulario: valida, persiste y envía la bienvenida. */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  const limit = rateLimit(`contact:${getClientIp(request)}`, LIMIT, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Demasiadas peticiones" },
      { status: 429, headers: { "retry-after": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  // Honeypot: un bot rellena el campo oculto. Respondemos 200 para no delatarlo.
  if (typeof body === "object" && body !== null && "website" in body && body.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const lead = await repo.leads.create(parsed.data);
  await sendWelcomeEmail(lead);

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}
