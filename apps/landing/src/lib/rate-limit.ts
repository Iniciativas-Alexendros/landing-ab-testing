/**
 * Rate-limiter de ventana fija en memoria.
 *
 * Defensa de primera línea contra abuso/DoS de los endpoints públicos. Es
 * por-instancia (no compartido entre lambdas); para producción seria,
 * sustituir por un store distribuido (Upstash/Redis). Mejor esto que nada.
 */
type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count, retryAfterSeconds: 0 };
}

/** Vacía el estado (solo para tests). */
export function __resetRateLimit(): void {
  buckets.clear();
}
