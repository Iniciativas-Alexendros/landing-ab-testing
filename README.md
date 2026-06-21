# landing-ab-testing

Landing page de alto impacto con **A/B testing sobre el CTA**, captura de leads, animaciones, tema claro/oscuro y despliegue en Vercel. **PortfolioSaaS reutilizable**: toda la marca y el contenido se centralizan en `apps/landing/src/config/site.config.ts` — cambiando ese fichero y los assets de `/public` se obtiene una landing nueva para otro cliente sin tocar la lógica.

## Stack

| Capa       | Tecnología                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------- |
| Monorepo   | pnpm workspaces + Turborepo                                                                 |
| App        | Next.js 15 (App Router, RSC), TypeScript estricto                                           |
| Estilos    | Tailwind CSS v4 (CSS-first) · shadcn/ui · Framer Motion                                     |
| Tipografía | Space Grotesk · Plus Jakarta Sans · JetBrains Mono                                          |
| Datos      | Repository pattern — mock in-memory por defecto; Prisma + Postgres tras la flag `DB_DRIVER` |
| A/B        | Vercel Edge Config (override) + cookie `ab_variant` (middleware)                            |
| Email      | Resend (simulado por consola en desarrollo)                                                 |
| Tests      | Vitest + Testing Library · Playwright + axe-core                                            |
| Deploy     | Vercel + GitHub Actions (CI con runners self-hosted)                                        |

## Estructura

```
apps/landing      # aplicación Next.js
  src/config/site.config.ts   # ← ÚNICA fuente de marca y contenido
  src/lib/db/                 # repository pattern (driver memory|postgres)
  src/lib/ab/                 # motor de test A/B
  src/middleware.ts           # asignación de variante A/B
packages/ui       # componentes reutilizables (shadcn + animaciones)
```

## Desarrollo

```bash
pnpm install
pnpm dev            # apps/landing en http://localhost:3000
pnpm lint
pnpm typecheck
pnpm test           # unitarios e integración (Vitest)
pnpm --filter @landing/web test:e2e   # end-to-end (Playwright)
pnpm build
```

Copia `apps/landing/.env.example` a `apps/landing/.env.local` y ajusta lo necesario. Sin variables, la app funciona con el driver de datos in-memory y el email simulado por consola.

## Reutilizar para otro cliente

Ver **[docs/REUTILIZACION.md](docs/REUTILIZACION.md)**. En resumen: edita `apps/landing/src/config/site.config.ts`, reemplaza los assets de `/public` y ajusta los tokens de marca en `apps/landing/src/app/globals.css`. La lógica de A/B, formulario y animaciones no cambia.

## Despliegue y base de datos

Ver **[docs/DESPLIEGUE.md](docs/DESPLIEGUE.md)** para el despliegue en Vercel (Edge Config, variables) y para **activar Postgres** cuando el Supabase autoalojado esté disponible. Hasta entonces, la persistencia usa el driver in-memory (`DB_DRIVER=memory`).

## Flujo de trabajo

`main` protegida (PR obligatorio, CI verde, historia lineal). Cada fase entró por un PR (`feat/faseN-*`). El histórico de PRs documenta la construcción fase a fase.
