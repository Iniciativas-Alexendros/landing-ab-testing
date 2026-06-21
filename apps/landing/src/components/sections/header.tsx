import { Button } from "@landing/ui";

import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site.config";

/** Cabecera fija con navegación, conmutador de tema y CTA. */
export function Header() {
  const { brand, nav } = siteConfig;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-md bg-brand text-brand-foreground"
          >
            ◇
          </span>
          {brand.name}
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Principal">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild size="sm">
            <a href="#lead-form">{nav.ctaLabel}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
