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
  switch (driver) {
    case "memory":
      return createMemoryRepo();
    case "postgres":
      // El driver Postgres (Prisma + adapter-pg) se cablea en el PR final,
      // cuando el Supabase autoalojado esté desplegado en Coolify.
      throw new Error(
        "DB_DRIVER=postgres aún no está cableado. Usa DB_DRIVER=memory hasta que el servicio Postgres esté disponible.",
      );
  }
}

// Singleton: en dev preserva el estado in-memory entre recargas de módulo (HMR).
const globalForRepo = globalThis as unknown as { __appRepo?: AppRepo };

export const repo: AppRepo = globalForRepo.__appRepo ?? createRepo();

if (process.env.NODE_ENV !== "production") {
  globalForRepo.__appRepo = repo;
}
