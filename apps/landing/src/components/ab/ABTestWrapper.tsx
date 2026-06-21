import type { ReactNode } from "react";

import type { Variant } from "@/lib/db";

interface ABTestWrapperProps {
  variant: Variant;
  /** Contenido a renderizar para la variante A. */
  a: ReactNode;
  /** Contenido a renderizar para la variante B. */
  b: ReactNode;
}

/**
 * Renderiza el contenido correspondiente a la variante A/B activa.
 *
 * Presentacional y puro: la variante se resuelve en el servidor (middleware +
 * cookie/Edge Config) y se pasa como prop, evitando parpadeo en el cliente.
 */
export function ABTestWrapper({ variant, a, b }: ABTestWrapperProps) {
  return <>{variant === "A" ? a : b}</>;
}
