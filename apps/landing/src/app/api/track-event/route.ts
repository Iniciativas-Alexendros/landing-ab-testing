import { NextResponse } from "next/server";

import { repo } from "@/lib/db";
import { trackEventSchema } from "@/lib/validation";

/** Registra un evento de seguimiento del test A/B (variante + acción). */
export async function POST(request: Request) {
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

  const event = await repo.events.record(parsed.data);
  return NextResponse.json({ ok: true, id: event.id }, { status: 200 });
}
