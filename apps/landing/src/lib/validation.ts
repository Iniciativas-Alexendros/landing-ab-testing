import { z } from "zod";

import { VARIANTS } from "./db/types";

/** Esquema del formulario de captura de leads. */
export const leadSchema = z.object({
  name: z
    .string({ required_error: "El nombre es obligatorio" })
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(80, "El nombre es demasiado largo"),
  email: z
    .string({ required_error: "El email es obligatorio" })
    .trim()
    .toLowerCase()
    .email("Introduce un email válido"),
  company: z.string().trim().max(120, "El nombre de empresa es demasiado largo").optional(),
  message: z.string().trim().max(1000, "El mensaje es demasiado largo").optional(),
  variant: z.enum(VARIANTS).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

/** Esquema del payload de seguimiento de eventos A/B. */
export const trackEventSchema = z.object({
  variant: z.enum(VARIANTS),
  action: z
    .string()
    .trim()
    .min(1, "La acción es obligatoria")
    .max(64, "La acción es demasiado larga"),
  meta: z.record(z.unknown()).optional(),
});

export type TrackEventValues = z.infer<typeof trackEventSchema>;
