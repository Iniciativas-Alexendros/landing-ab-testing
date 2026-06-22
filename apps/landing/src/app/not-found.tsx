import Link from "next/link";

import { Button } from "@landing/ui";

export const metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-display text-6xl font-bold text-brand">404</p>
      <h1 className="font-display text-2xl font-bold tracking-tight">Página no encontrada</h1>
      <p className="text-muted-foreground">La página que buscas no existe o se ha movido.</p>
      <Button asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </main>
  );
}
