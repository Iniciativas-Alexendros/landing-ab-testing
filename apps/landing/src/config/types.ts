/**
 * Tipos del contenido configurable de la landing.
 *
 * `site.config.ts` es la ÚNICA fuente de marca y contenido: cambiando ese fichero
 * (y los assets) se obtiene una landing nueva para otro cliente sin tocar lógica.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface BrandConfig {
  /** Nombre corto de la marca (logo textual). */
  name: string;
  /** Dominio sin protocolo (p. ej. "cliente.com"). */
  domain: string;
  /** Email de contacto público. */
  email: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  /** URL canónica absoluta. */
  url: string;
}

export interface HeroStat {
  /** Valor numérico final del contador animado. */
  value: number;
  /** Sufijo opcional (p. ej. "%", "k", "+"). */
  suffix?: string;
  label: string;
}

export interface HeroConfig {
  badge?: string;
  title: string;
  subtitle: string;
  /** Texto del CTA por variante A/B (lo selecciona el motor de test). */
  ctaVariants: { A: string; B: string };
  /** href del CTA principal (ancla a sección o ruta). */
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  stats: HeroStat[];
}

export interface FeatureItem {
  /** Nombre del icono de lucide-react (p. ej. "Zap"). */
  icon: string;
  title: string;
  description: string;
}

export interface FeaturesConfig {
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export interface PricingPlan {
  name: string;
  description: string;
  /** Precio mensual en la moneda de `currency`. */
  priceMonthly: number;
  /** Precio mensual facturado anualmente. */
  priceAnnual: number;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
}

export interface PricingConfig {
  title: string;
  subtitle: string;
  currency: string;
  plans: PricingPlan[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface TestimonialsConfig {
  title: string;
  subtitle: string;
  items: Testimonial[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqConfig {
  title: string;
  subtitle: string;
  items: FaqItem[];
}

export interface FinalCtaConfig {
  title: string;
  subtitle: string;
  ctaLabel: string;
}

export interface FooterConfig {
  tagline: string;
  copyright: string;
  links: NavLink[];
  socials: NavLink[];
}

export interface SiteConfig {
  brand: BrandConfig;
  seo: SeoConfig;
  nav: {
    links: NavLink[];
    ctaLabel: string;
  };
  hero: HeroConfig;
  features: FeaturesConfig;
  pricing: PricingConfig;
  testimonials: TestimonialsConfig;
  faq: FaqConfig;
  finalCta: FinalCtaConfig;
  footer: FooterConfig;
}
