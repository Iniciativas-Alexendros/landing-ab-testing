import { Button } from "@landing/ui";

import { siteConfig } from "@/config/site.config";

export default function HomePage() {
  const { brand, hero } = siteConfig;

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      {hero.badge ? (
        <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
          {hero.badge}
        </span>
      ) : null}
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{hero.title}</h1>
      <p className="max-w-prose text-muted-foreground">{hero.subtitle}</p>
      <Button>{hero.ctaVariants.A}</Button>
      <dl className="mt-4 flex flex-wrap justify-center gap-8">
        {hero.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <dt className="text-2xl font-bold">
              {stat.value.toLocaleString("es-ES")}
              {stat.suffix}
            </dt>
            <dd className="text-sm text-muted-foreground">{stat.label}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8 text-xs text-muted-foreground">
        Contenido de <strong>{brand.name}</strong> · las secciones llegan en el siguiente PR.
      </p>
    </main>
  );
}
