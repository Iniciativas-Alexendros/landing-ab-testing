import { Button } from "@landing/ui";

import { siteConfig } from "@/config/site.config";

/**
 * Bloque de CTA final. El formulario de leads se inserta aquí en la Fase 5
 * (mantiene el ancla #lead-form que usan los CTAs de toda la página).
 */
export function FinalCta() {
  const { finalCta } = siteConfig;

  return (
    <section id="lead-form" className="border-t">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl border bg-brand-soft/40 px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
          />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {finalCta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              {finalCta.subtitle}
            </p>
            <Button size="lg" className="mt-8">
              {finalCta.ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
