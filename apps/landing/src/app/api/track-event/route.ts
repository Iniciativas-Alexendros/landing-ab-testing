import { NextResponse } from "next/server";

import { getRepo } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, isSameOrigin } from "@/lib/request";
import { trackEventSchema } from "@/lib/validation";

const LIMIT = 30;
const WINDOW_MS = 60_000;

/** Registra un evento de seguimiento del test A/B (variante + acción). */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Origen no permitido" }, { status: 403 });
  }

  const limit = rateLimit(`track:${getClientIp(request)}`, LIMIT, WINDOW_MS);
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

  const parsed = trackEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const event = await getRepo().events.record(parsed.data);
  return NextResponse.json({ ok: true, id: event.id }, { status: 200 });
}
