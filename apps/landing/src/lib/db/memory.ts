import type { AppRepo, EventRepo, LeadRepo } from "./repo";
import { type Event, type Lead, type Variant, VARIANTS } from "./types";

/**
 * Implementación in-memory de los repositorios.
 *
 * Driver por defecto (DB_DRIVER=memory) hasta cablear Postgres. Los datos viven
 * en el proceso: en serverless cada instancia tiene su propio estado y se pierde
 * al reciclarse. Suficiente para desarrollo, tests y demos; no para producción.
 *
 * Los almacenes están acotados (ring buffer) para que un abuso de los endpoints
 * no agote la memoria. El conteo de eventos por variante se mantiene en un
 * contador acumulado, de modo que las métricas de conversión sobreviven a la
 * evicción de eventos antiguos.
 */
const MAX_ITEMS = 5000;

function createId(): string {
  return globalThis.crypto.randomUUID();
}

class MemoryLeadRepo implements LeadRepo {
  private readonly store: Lead[] = [];

  async create(input: Parameters<LeadRepo["create"]>[0]): Promise<Lead> {
    const lead: Lead = {
      id: createId(),
      name: input.name,
      email: input.email,
      company: input.company ?? null,
      message: input.message ?? null,
      variant: input.variant ?? null,
      createdAt: new Date(),
    };
    this.store.push(lead);
    if (this.store.length > MAX_ITEMS) this.store.shift();
    return lead;
  }

  async list(): Promise<Lead[]> {
    return [...this.store];
  }
}

class MemoryEventRepo implements EventRepo {
  private readonly store: Event[] = [];
  private readonly totals: Record<Variant, number> = Object.fromEntries(
    VARIANTS.map((v) => [v, 0]),
  ) as Record<Variant, number>;

  async record(input: Parameters<EventRepo["record"]>[0]): Promise<Event> {
    const event: Event = {
      id: createId(),
      variant: input.variant,
      action: input.action,
      meta: input.meta ?? null,
      createdAt: new Date(),
    };
    this.store.push(event);
    if (this.store.length > MAX_ITEMS) this.store.shift();
    this.totals[event.variant] += 1;
    return event;
  }

  async list(): Promise<Event[]> {
    return [...this.store];
  }

  async countByVariant(): Promise<Record<Variant, number>> {
    return { ...this.totals };
  }
}

/** Construye un AppRepo in-memory aislado (cada llamada parte de cero). */
export function createMemoryRepo(): AppRepo {
  return {
    leads: new MemoryLeadRepo(),
    events: new MemoryEventRepo(),
  };
}
