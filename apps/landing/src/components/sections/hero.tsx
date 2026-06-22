import { Badge, Button } from "@landing/ui";

import { AbCtaButton } from "@/components/ab/ab-cta-button";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { FadeInWhenVisible } from "@/components/motion/fade-in-when-visible";
import { siteConfig } from "@/config/site.config";
import type { Variant } from "@/lib/db";

import { FlowDiagram } from "./flow-diagram";

interface HeroProps {
  variant: Variant;
}

export function Hero({ variant }: HeroProps) {
  const { hero } = siteConfig;

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Resplandor iris sutil tras el contenido. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-brand-soft/60 blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
        <div className="flex flex-col items-start">
          {hero.badge ? (
            <Badge variant="brand" className="mb-5">
              {hero.badge}
            </Badge>
          ) : null}

          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">{hero.subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AbCtaButton
              abVariant={variant}
              labelA={hero.ctaVariants.A}
              labelB={hero.ctaVariants.B}
              targetId="lead-form"
              size="lg"
            />
            {hero.secondaryCtaLabel ? (
              <Button asChild variant="outline" size="lg">
                <a href={hero.secondaryCtaHref ?? "#features"}>{hero.secondaryCtaLabel}</a>
              </Button>
            ) : null}
          </div>

          <dl className="mt-12 grid w-full max-w-md grid-cols-3 gap-6 border-t pt-6">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="font-display text-2xl font-bold sm:text-3xl">
                  <AnimatedCounter value={stat.value} />
                  {stat.suffix}
                </dt>
                <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <FadeInWhenVisible delay={0.1}>
          <FlowDiagram />
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
