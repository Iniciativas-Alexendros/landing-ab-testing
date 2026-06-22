import { Button } from "@landing/ui";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site.config";

import { MobileNav } from "./mobile-nav";

/** Cabecera fija con navegación (de escritorio y móvil), tema y CTA. */
export function Header() {
  const { nav } = siteConfig;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" aria-label="Inicio">
          <Logo />
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
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="#lead-form">{nav.ctaLabel}</a>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
