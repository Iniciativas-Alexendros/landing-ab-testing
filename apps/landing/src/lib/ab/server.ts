import { cookies } from "next/headers";

import type { Variant } from "@/lib/db";

import { AB_COOKIE, AB_EDGE_KEY, isVariant } from "./config";

/**
 * Lee el override de Edge Config (prioritario sobre la cookie).
 *
 * Permite forzar una variante para todos los visitantes y cambiar el CTA al
 * instante sin redeploy. Devuelve null si no hay flag, no es válido, o Edge
 * Config no está configurado (desarrollo). Un fallo real se registra (no se
 * traga en silencio) para no confundir un error con "no hay flag".
 */
export async function readEdgeOverride(): Promise<Variant | null> {
  if (!process.env.EDGE_CONFIG) return null;
  try {
    const { get } = await import("@vercel/edge-config");
    const flag = await get(AB_EDGE_KEY);
    return isVariant(flag) ? flag : null;
  } catch (error) {
    console.error("[ab] Error leyendo Edge Config; se ignora el override", error);
    return null;
  }
}

/**
 * Variante efectiva en el servidor: Edge Config override > cookie > "A".
 *
 * La cookie la asigna el middleware en la primera visita, por lo que en una
 * carga normal siempre habrá una variante persistida (sin parpadeo). Si no hay
 * cookie ni override, se avisa: suele indicar que el middleware no se ejecutó.
 */
export async function getServerVariant(): Promise<Variant> {
  const override = await readEdgeOverride();
  if (override) return override;

  const store = await cookies();
  const cookie = store.get(AB_COOKIE)?.value;
  if (isVariant(cookie)) return cookie;

  console.warn(
    "[ab] Sin cookie de variante ni override; se usa 'A' por defecto (¿middleware no ejecutado?).",
  );
  return "A";
}
