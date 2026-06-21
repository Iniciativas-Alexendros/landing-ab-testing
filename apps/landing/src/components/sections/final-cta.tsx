import { siteConfig } from "@/config/site.config";
import type { Variant } from "@/lib/db";

import { LeadForm } from "./lead-form";

interface FinalCtaProps {
  variant: Variant;
}

/** Bloque de CTA final con el formulario de captura de leads. */
export function FinalCta({ variant }: FinalCtaProps) {
  const { finalCta } = siteConfig;

  return (
    <section id="lead-form" className="border-t">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="relative overflow-hidden rounded-3xl border bg-brand-soft/40 px-6 py-14 sm:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
          />
          <div className="relative">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                {finalCta.title}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                {finalCta.subtitle}
              </p>
            </div>
            <div className="mt-10">
              <LeadForm variant={variant} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
