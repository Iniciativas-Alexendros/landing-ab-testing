import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@landing/ui";

import { siteConfig } from "@/config/site.config";

export const metadata = {
  title: `Gracias · ${siteConfig.brand.name}`,
};

export default function GraciasPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <CheckCircle2 className="h-14 w-14 text-brand" aria-hidden="true" />
      <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        ¡Gracias por registrarte!
      </h1>
      <p className="text-muted-foreground">
        Hemos recibido tus datos y te hemos enviado un email de bienvenida. Nuestro equipo te
        contactará muy pronto.
      </p>
      <Button asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </main>
  );
}
