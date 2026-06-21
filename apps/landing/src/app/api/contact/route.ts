import { NextResponse } from "next/server";

import { repo } from "@/lib/db";
import { sendWelcomeEmail } from "@/lib/email";
import { leadSchema } from "@/lib/validation";

/** Recibe un lead del formulario: valida, persiste y envía la bienvenida. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
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
