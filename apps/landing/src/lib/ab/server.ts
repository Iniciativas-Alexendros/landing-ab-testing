import { cookies } from "next/headers";

import type { Variant } from "@/lib/db";

import { AB_COOKIE, AB_EDGE_KEY, isVariant } from "./config";

/**
 * Lee el override de Edge Config (prioritario sobre la cookie).
 *
 * Permite forzar una variante para todos los visitantes y cambiar el CTA al
 * instante sin redeploy. Devuelve null si no hay flag, no es válido, o Edge
 * Config no está configurado (desarrollo).
 */
export async function readEdgeOverride(): Promise<Variant | null> {
  if (!process.env.EDGE_CONFIG) return null;
  try {
    const { get } = await import("@vercel/edge-config");
    const flag = await get(AB_EDGE_KEY);
    return isVariant(flag) ? flag : null;
  } catch {
    return null;
  }
}

/**
 * Variante efectiva en el servidor: Edge Config override > cookie > "A".
 *
 * La cookie la asigna el middleware en la primera visita, por lo que en una
 * carga normal siempre habrá una variante persistida (sin parpadeo).
 */
export async function getServerVariant(): Promise<Variant> {
  const override = await readEdgeOverride();
  if (override) return override;

  const store = await cookies();
  const cookie = store.get(AB_COOKIE)?.value;
  return isVariant(cookie) ? cookie : "A";
}
