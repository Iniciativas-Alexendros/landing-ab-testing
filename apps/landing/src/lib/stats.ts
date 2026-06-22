import { getRepo } from "@/lib/db";
import { type Variant, VARIANTS } from "@/lib/db";

export interface VariantStat {
  variant: Variant;
  /** Clics en el CTA registrados para esta variante. */
  clicks: number;
  /** Leads capturados con esta variante. */
  leads: number;
  /** Conversión leads/clics (0 si no hay clics). */
  conversion: number;
}

/**
 * Estadísticas del test A/B: clics de CTA y leads por variante, con conversión.
 *
 * Lee del repositorio activo. Con el driver in-memory los datos son por instancia
 * y efímeros (no agregados entre lambdas); para resultados reales y persistentes
 * hace falta el driver Postgres.
 */
export async function getAbStats(): Promise<VariantStat[]> {
  const repo = getRepo();
  const [events, leads] = await Promise.all([repo.events.list(), repo.leads.list()]);

  return VARIANTS.map((variant) => {
    const clicks = events.filter((e) => e.variant === variant && e.action === "cta_click").length;
    const leadCount = leads.filter((l) => l.variant === variant).length;
    return {
      variant,
      clicks,
      leads: leadCount,
      conversion: clicks > 0 ? leadCount / clicks : 0,
    };
  });
}
