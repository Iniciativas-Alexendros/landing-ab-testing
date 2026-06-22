import type { ReactNode } from "react";

import type { Variant } from "@/lib/db";

interface ABTestWrapperProps {
  variant: Variant;
  /** Contenido a renderizar para la variante A. */
  variantA: ReactNode;
  /** Contenido a renderizar para la variante B. */
  variantB: ReactNode;
}

/**
 * Renderiza el contenido correspondiente a la variante A/B activa.
 *
 * Presentacional y puro: la variante se resuelve en el servidor (middleware +
 * cookie/Edge Config) y se pasa como prop, evitando parpadeo en el cliente.
 */
export function ABTestWrapper({ variant, variantA, variantB }: ABTestWrapperProps) {
  return <>{variant === "A" ? variantA : variantB}</>;
}
