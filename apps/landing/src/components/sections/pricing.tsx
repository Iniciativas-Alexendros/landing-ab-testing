"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { Badge, Button, Card, CardContent, CardHeader, cn } from "@landing/ui";

import { FadeInWhenVisible } from "@/components/motion/fade-in-when-visible";
import { siteConfig } from "@/config/site.config";

export function Pricing() {
  const { pricing } = siteConfig;
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="border-t">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">precios</p>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {pricing.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{pricing.subtitle}</p>
        </div>

        {/* Toggle mensual / anual */}
        <div
          className="mx-auto mt-8 inline-flex items-center gap-1 rounded-full border bg-muted/40 p-1"
          role="group"
          aria-label="Periodo de facturación"
        >
          <button
            type="button"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              !annual ? "bg-background shadow-sm" : "text-muted-foreground",
            )}
          >
            Mensual
          </button>
          <button
            type="button"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              annual ? "bg-background shadow-sm" : "text-muted-foreground",
            )}
          >
            Anual
            <Badge variant="peach" className="px-1.5 py-0">
              −20%
            </Badge>
          </button>
        </div>

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {pricing.plans.map((plan, index) => {
            const price = annual ? plan.priceAnnual : plan.priceMonthly;
            return (
              <FadeInWhenVisible key={plan.name} delay={index * 0.06}>
                <Card
                  className={cn(
                    "relative flex h-full flex-col",
                    plan.highlighted && "border-brand shadow-lg ring-1 ring-brand/30",
                  )}
                >
                  {plan.highlighted ? (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Más popular</Badge>
                  ) : null}
                  <CardHeader>
                    <p className="font-display text-lg font-semibold">{plan.name}</p>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="font-display text-4xl font-bold tabular-nums">
                        {price.toLocaleString("es-ES")} {pricing.currency}
                      </span>
                      <span className="text-sm text-muted-foreground">/mes</span>
                    </div>
                    {annual && plan.priceAnnual > 0 ? (
                      <p className="text-xs text-muted-foreground">facturado anualmente</p>
                    ) : null}
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col">
                    <ul className="flex flex-col gap-3 text-sm">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                            aria-hidden="true"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      variant={plan.highlighted ? "default" : "outline"}
                      className="mt-8 w-full"
                    >
                      <a href={plan.ctaHref}>{plan.ctaLabel}</a>
                    </Button>
                  </CardContent>
                </Card>
              </FadeInWhenVisible>
            );
          })}
        </div>
      </div>
    </section>
  );
}
