import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@landing/ui";

import { getAbStats } from "@/lib/stats";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Resultados A/B",
  robots: { index: false, follow: false },
};

const percent = (value: number) =>
  value.toLocaleString("es-ES", { style: "percent", minimumFractionDigits: 1 });

export default async function ResultadosPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const requiredKey = process.env.STATS_KEY;
  const { key } = await searchParams;
  // Si STATS_KEY está definido, exige la clave; si no, el panel es abierto (demo).
  if (requiredKey && key !== requiredKey) notFound();

  const stats = await getAbStats();
  const best = [...stats].sort((a, b) => b.conversion - a.conversion)[0];

  return (
    <main id="contenido" className="mx-auto max-w-2xl px-6 py-16">
      <p className="eyebrow mb-3">resultados</p>
      <h1 className="font-display text-3xl font-bold tracking-tight">Test A/B del CTA</h1>
      <p className="mt-3 text-muted-foreground">
        Clics en el CTA y leads por variante, con su tasa de conversión.
      </p>

      <div className="mt-8 overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Variante</th>
              <th className="px-4 py-3 text-right font-medium">Clics CTA</th>
              <th className="px-4 py-3 text-right font-medium">Leads</th>
              <th className="px-4 py-3 text-right font-medium">Conversión</th>
            </tr>
          </thead>
          <tbody>
            {stats.map((stat) => (
              <tr key={stat.variant} className="border-t">
                <td className="px-4 py-3 font-display font-semibold">
                  {stat.variant}
                  {best && stat.variant === best.variant && best.conversion > 0 ? (
                    <span className="ml-2 rounded-full bg-brand-soft px-2 py-0.5 text-xs text-accent-foreground">
                      mejor
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-3 text-right tabular-nums">{stat.clicks}</td>
                <td className="px-4 py-3 text-right tabular-nums">{stat.leads}</td>
                <td className="px-4 py-3 text-right tabular-nums">{percent(stat.conversion)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 rounded-lg border border-dashed bg-muted/30 p-4 text-xs text-muted-foreground">
        Datos del driver <strong>in-memory</strong>: por instancia y efímeros (en serverless no se
        agregan entre invocaciones). Para resultados reales y persistentes, cablear Postgres.
        {requiredKey ? null : " Panel sin protección: define STATS_KEY para exigir clave."}
      </p>

      <Button asChild variant="outline" className="mt-8">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </main>
  );
}
