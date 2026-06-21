import { Button } from "@landing/ui";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
        Fase 0 · Scaffolding
      </span>
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">landing-ab-testing</h1>
      <p className="max-w-prose text-muted-foreground">
        Monorepo operativo: Next.js + Tailwind v4 + paquete de UI compartido. Las secciones, el
        motor A/B y el formulario de leads llegan en los siguientes PRs.
      </p>
      <Button>Call to action</Button>
    </main>
  );
}
