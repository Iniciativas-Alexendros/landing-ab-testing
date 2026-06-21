import type { Lead } from "@/lib/db";

import { siteConfig } from "@/config/site.config";

/**
 * Envía el correo de bienvenida a un lead.
 *
 * En desarrollo (sin RESEND_API_KEY) se simula por consola. En producción usa
 * la API REST de Resend (sin SDK, para no añadir dependencias).
 */
export async function sendWelcomeEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? `${siteConfig.brand.name} <onboarding@resend.dev>`;

  if (!apiKey) {
    console.info(`[email simulado] Bienvenida → ${lead.email} (${lead.name})`);
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: lead.email,
        subject: `Bienvenido a ${siteConfig.brand.name}`,
        html: `<p>Hola ${lead.name},</p><p>Gracias por tu interés en ${siteConfig.brand.name}. Te contactaremos muy pronto.</p>`,
      }),
    });
  } catch (error) {
    // El fallo de email no debe romper la captura del lead.
    console.error("Error enviando el email de bienvenida", error);
  }
}
