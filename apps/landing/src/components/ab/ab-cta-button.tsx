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
  /** Id del elemento destino al que desplazarse al hacer clic (p. ej. "lead-form"). */
  targetId?: string;
}

/**
 * CTA con test A/B: muestra el texto de la variante activa, registra el clic y
 * lleva al usuario a la sección destino (el formulario), cerrando el embudo.
 */
export function AbCtaButton({
  abVariant,
  labelA,
  labelB,
  action = "cta_click",
  targetId,
  onClick,
  type = "button",
  ...props
}: AbCtaButtonProps) {
  return (
    <Button
      type={type}
      onClick={(event) => {
        trackEvent(action, abVariant);
        if (targetId) {
          document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
        }
        onClick?.(event);
      }}
      {...props}
    >
      <ABTestWrapper variant={abVariant} variantA={labelA} variantB={labelB} />
    </Button>
  );
}
