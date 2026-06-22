import { cn } from "@landing/ui";

import { siteConfig } from "@/config/site.config";

/** Marca de la landing (glifo + nombre). Fuente única usada en cabecera y pie. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2 font-display text-lg font-bold", className)}>
      <span
        aria-hidden="true"
        className="grid h-7 w-7 place-items-center rounded-md bg-brand text-brand-foreground"
      >
        ◇
      </span>
      {siteConfig.brand.name}
    </span>
  );
}
