import type { Lead } from "@/lib/db";

import { siteConfig } from "@/config/site.config";

import { escapeHtml } from "./html";

const EMAIL_TIMEOUT_MS = 8000;

/**
 * Envía el correo de bienvenida a un lead.
 *
 * En desarrollo (sin RESEND_API_KEY) se simula por consola. En producción usa
 * la API REST de Resend. Devuelve `true` si el correo se aceptó.
 *
 * Seguridad: los datos del lead son entrada de usuario y se escapan antes de
 * interpolarlos en el HTML (evita inyección HTML / phishing en el correo).
 */
export async function sendWelcomeEmail(lead: Lead): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey) {
    // Sin PII en logs: solo el id del lead.
    console.info(`[email simulado] bienvenida enviada (lead ${lead.id})`);
    return true;
  }

  if (!from) {
    console.error("RESEND_FROM no está configurado; no se envía el correo de bienvenida.");
    return false;
  }

  const name = escapeHtml(lead.name);
  const brand = escapeHtml(siteConfig.brand.name);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), EMAIL_TIMEOUT_MS);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: lead.email,
        subject: `Bienvenido a ${siteConfig.brand.name}`,
        html: `<p>Hola ${name},</p><p>Gracias por tu interés en ${brand}. Te contactaremos muy pronto.</p>`,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error(`Resend devolvió ${res.status} al enviar la bienvenida (lead ${lead.id})`);
      return false;
    }
    return true;
  } catch (error) {
    // El fallo de email no debe romper la captura del lead.
    console.error("Error enviando el email de bienvenida", error);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}
