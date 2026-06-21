import { describe, expect, it } from "vitest";

import { siteConfig } from "./site.config";

describe("siteConfig", () => {
  it("define ambas variantes del CTA del hero y no están vacías", () => {
    expect(siteConfig.hero.ctaVariants.A.trim().length).toBeGreaterThan(0);
    expect(siteConfig.hero.ctaVariants.B.trim().length).toBeGreaterThan(0);
    expect(siteConfig.hero.ctaVariants.A).not.toBe(siteConfig.hero.ctaVariants.B);
  });

  it("tiene al menos un plan y exactamente uno destacado", () => {
    expect(siteConfig.pricing.plans.length).toBeGreaterThan(0);
    const highlighted = siteConfig.pricing.plans.filter((p) => p.highlighted);
    expect(highlighted).toHaveLength(1);
  });

  it("tiene stats, features, testimonios y FAQ no vacíos", () => {
    expect(siteConfig.hero.stats.length).toBeGreaterThan(0);
    expect(siteConfig.features.items.length).toBeGreaterThan(0);
    expect(siteConfig.testimonials.items.length).toBeGreaterThan(0);
    expect(siteConfig.faq.items.length).toBeGreaterThan(0);
  });

  it("usa un email de marca con formato válido", () => {
    expect(siteConfig.brand.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });
});
