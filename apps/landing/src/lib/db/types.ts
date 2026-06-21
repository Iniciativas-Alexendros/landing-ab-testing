/** Variantes del test A/B. */
export const VARIANTS = ["A", "B"] as const;
export type Variant = (typeof VARIANTS)[number];

/** Lead capturado por el formulario de contacto. */
export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  /** Variante A/B activa cuando se envió el formulario (si se conoce). */
  variant: Variant | null;
  createdAt: Date;
}

/** Evento de seguimiento del test A/B (p. ej. clic en el CTA). */
export interface Event {
  id: string;
  variant: Variant;
  action: string;
  /** Metadatos arbitrarios serializables (ruta, referrer, etc.). */
  meta: Record<string, unknown> | null;
  createdAt: Date;
}

/** Datos de entrada para crear un Lead (sin campos generados). */
export type LeadInput = {
  name: string;
  email: string;
  company?: string | null;
  message?: string | null;
  variant?: Variant | null;
};

/** Datos de entrada para registrar un Event. */
export type EventInput = {
  variant: Variant;
  action: string;
  meta?: Record<string, unknown> | null;
};
