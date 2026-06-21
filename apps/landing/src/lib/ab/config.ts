import type { Variant } from "@/lib/db";

/** Nombre de la cookie que fija la variante asignada al visitante. */
export const AB_COOKIE = "ab_variant";

/** Clave del flag en Vercel Edge Config que fuerza una variante (override global). */
export const AB_EDGE_KEY = "abVariant";

/** Vida de la cookie de variante: 1 año. */
export const AB_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Type guard de variante válida. */
export function isVariant(value: unknown): value is Variant {
  return value === "A" || value === "B";
}

/** Asignación aleatoria 50/50. */
export function randomVariant(): Variant {
  return Math.random() < 0.5 ? "A" : "B";
}
