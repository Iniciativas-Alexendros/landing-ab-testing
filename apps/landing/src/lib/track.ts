import type { Variant } from "@/lib/db";

/**
 * Envía un evento de seguimiento A/B a la API (best-effort).
 *
 * Usa `keepalive` para no perder el evento si la navegación cambia justo
 * después del clic. Los errores se ignoran: el tracking nunca debe romper la UX.
 */
export async function trackEvent(
  action: string,
  variant: Variant,
  meta?: Record<string, unknown>,
): Promise<void> {
  try {
    await fetch("/api/track-event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action, variant, meta }),
      keepalive: true,
    });
  } catch {
    // best-effort: ignoramos fallos de red
  }
}
