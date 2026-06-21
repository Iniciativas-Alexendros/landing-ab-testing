import { siteConfig } from "@/config/site.config";

export function Footer() {
  const { brand, footer } = siteConfig;

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <p className="flex items-center gap-2 font-display text-lg font-bold">
            <span
              aria-hidden="true"
              className="grid h-7 w-7 place-items-center rounded-md bg-brand text-brand-foreground"
            >
              ◇
            </span>
            {brand.name}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">{footer.tagline}</p>
        </div>

        <div className="flex gap-12">
          <nav aria-label="Enlaces" className="flex flex-col gap-2">
            {footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <nav aria-label="Redes sociales" className="flex flex-col gap-2">
            {footer.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-muted-foreground">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
