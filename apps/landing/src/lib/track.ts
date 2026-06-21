import type { Variant } from "@/lib/db";

/**
 * Envía un evento de seguimiento A/B a la API (best-effort).
 *
 * Prefiere `navigator.sendBeacon`: garantiza el envío aunque la navegación
 * cambie justo tras el clic (el navegador lo entrega en segundo plano). Si no
 * está disponible, cae a `fetch` con `keepalive`. El tracking nunca rompe la UX.
 */
export function trackEvent(action: string, variant: Variant, meta?: Record<string, unknown>): void {
  const payload = JSON.stringify({ action, variant, meta });

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([payload], { type: "application/json" });
    if (navigator.sendBeacon("/api/track-event", blob)) return;
  }

  void fetch("/api/track-event", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // best-effort: ignoramos fallos de red
  });
}
