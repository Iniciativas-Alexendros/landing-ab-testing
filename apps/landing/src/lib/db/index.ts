import { createMemoryRepo } from "./memory";
import type { AppRepo } from "./repo";

export type { AppRepo, EventRepo, LeadRepo } from "./repo";
export type { Event, EventInput, Lead, LeadInput, Variant } from "./types";
export { VARIANTS } from "./types";

type DbDriver = "memory" | "postgres";

function resolveDriver(): DbDriver {
  const raw = (process.env.DB_DRIVER ?? "memory").toLowerCase();
  if (raw === "postgres" || raw === "memory") return raw;
  throw new Error(`DB_DRIVER no válido: "${raw}" (usa "memory" o "postgres")`);
}

function createRepo(): AppRepo {
  const driver = resolveDriver();

  if (driver === "memory") {
    if (process.env.NODE_ENV === "production") {
      // El driver in-memory no persiste en serverless: aviso ruidoso, sin romper.
      console.warn(
        "[db] DB_DRIVER=memory en producción: los datos NO persisten entre instancias. Cablea Postgres.",
      );
    }
    return createMemoryRepo();
  }

  // El driver Postgres (Prisma + adapter-pg) se cablea cuando el Supabase
  // autoalojado esté desplegado. Ver docs/DESPLIEGUE.md.
  throw new Error(
    "DB_DRIVER=postgres aún no está cableado. Usa DB_DRIVER=memory hasta que el servicio Postgres esté disponible.",
  );
}

// Singleton perezoso: NO se instancia al importar el módulo (un DB_DRIVER mal
// configurado ya no revienta la carga). Se crea en el primer acceso y se cachea
// en globalThis para sobrevivir a recargas de módulo dentro de la misma instancia.
const globalForRepo = globalThis as unknown as { __appRepo?: AppRepo };

/** Devuelve el repositorio de la aplicación (memoria por defecto). */
export function getRepo(): AppRepo {
  if (!globalForRepo.__appRepo) {
    globalForRepo.__appRepo = createRepo();
  }
  return globalForRepo.__appRepo;
}
