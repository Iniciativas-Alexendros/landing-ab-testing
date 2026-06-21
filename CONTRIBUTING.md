# Guía de contribución · landing-ab-testing

## Flujo de trabajo

- `main` está protegida: PR obligatorio, CI verde requerido, historia lineal, sin force-push.
- Trabaja en una rama por cambio: `feat/…`, `fix/…`, `docs/…`, `chore/…`, `test/…`, `ci/…`.
- Abre un PR contra `main`. Mergea con **squash** cuando el CI esté verde.

## Convenciones de commits y PRs

- Título en **Conventional Commits**: `tipo(alcance): descripción`.
  - Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `ci`, `chore`, `build`.
  - Ejemplo: `fix(seguridad): escapa el nombre del lead en el email`.
- Tamaño objetivo del PR: ≤ ~500 líneas. Si una unidad de trabajo excede, pártela.
- Actualiza `CHANGELOG.md` (`[Sin publicar]`) cuando el cambio sea relevante.

## Calidad (antes de abrir el PR)

```bash
pnpm install
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @landing/web test:e2e
```

Recomendado: instala los hooks de pre-commit (`pip install pre-commit && pre-commit install`).
Incluyen `gitleaks` (escaneo de secretos), Prettier y ESLint.

## Reglas

- Nada de secretos en el repo. Se gestionan vía variables de entorno / `pass-cli`.
- Toda corrección de bug debe llegar con un test que reproduzca el defecto (rojo → verde).
- Cambios de contenido/marca: solo `apps/landing/src/config/site.config.ts`, tokens de
  `globals.css` y assets de `/public` (ver `docs/REUTILIZACION.md`).
