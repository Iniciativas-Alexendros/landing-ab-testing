import type { Event, EventInput, Lead, LeadInput, Variant } from "./types";

/** Persistencia de leads. */
export interface LeadRepo {
  create(input: LeadInput): Promise<Lead>;
  list(): Promise<Lead[]>;
}

/** Persistencia y agregación de eventos de tracking A/B. */
export interface EventRepo {
  record(input: EventInput): Promise<Event>;
  list(): Promise<Event[]>;
  /** Conteo de eventos agrupado por variante (para medir conversión). */
  countByVariant(): Promise<Record<Variant, number>>;
}

/** Punto de acceso único a los repositorios de la aplicación. */
export interface AppRepo {
  leads: LeadRepo;
  events: EventRepo;
}
