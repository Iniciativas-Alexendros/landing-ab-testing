"use client";

import { Button, type ButtonProps } from "@landing/ui";

import type { Variant } from "@/lib/db";
import { trackEvent } from "@/lib/track";

import { ABTestWrapper } from "./ABTestWrapper";

interface AbCtaButtonProps extends ButtonProps {
  /** Variante A/B activa (no confundir con `variant`, que es el estilo del botón). */
  abVariant: Variant;
  labelA: string;
  labelB: string;
  /** Nombre de la acción registrada al hacer clic. */
  action?: string;
}

/**
 * CTA con test A/B: muestra el texto de la variante activa y registra el clic.
 */
export function AbCtaButton({
  abVariant,
  labelA,
  labelB,
  action = "cta_click",
  onClick,
  ...props
}: AbCtaButtonProps) {
  return (
    <Button
      onClick={(event) => {
        void trackEvent(action, abVariant);
        onClick?.(event);
      }}
      {...props}
    >
      <ABTestWrapper variant={abVariant} a={labelA} b={labelB} />
    </Button>
  );
}
