import { expect, test } from "@playwright/test";

test.describe("Landing A/B", () => {
  async function readVariant(context: import("@playwright/test").BrowserContext) {
    const cookies = await context.cookies();
    return cookies.find((c) => c.name === "ab_variant")?.value;
  }

  test("asigna la cookie de variante en la primera visita", async ({ page, context }) => {
    await page.goto("/");
    await expect.poll(() => readVariant(context)).toMatch(/^[AB]$/);
  });

  test("la variante persiste entre recargas", async ({ page, context }) => {
    await page.goto("/");
    await expect.poll(() => readVariant(context)).toMatch(/^[AB]$/);
    const first = await readVariant(context);
    await page.reload();
    expect(await readVariant(context)).toBe(first);
  });

  test("flujo completo: interactúa con el CTA, rellena el formulario y confirma", async ({
    page,
  }) => {
    await page.goto("/");

    // El CTA del hero debe llevar al formulario (cierra el embudo de conversión).
    await page.locator("main button").first().click();
    await expect(page.locator("#lead-form")).toBeInViewport({ timeout: 5000 });

    // Formulario de leads (en la sección final).
    await page.getByLabel("Nombre").fill("Ada Lovelace");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByRole("button", { name: /crear cuenta gratis/i }).click();

    // Toast de confirmación.
    await expect(page.getByText(/te hemos enviado un email/i)).toBeVisible();
    // El formulario se limpia tras el envío (DEFECTO-036).
    await expect(page.getByLabel("Nombre")).toHaveValue("");
  });

  test("el carrusel de testimonios se puede pausar (WCAG 2.2.2)", async ({ page }) => {
    await page.goto("/");
    const pause = page.getByRole("button", { name: /pausar testimonios/i });
    await pause.scrollIntoViewIfNeeded();
    await expect(pause).toBeVisible();
    await pause.click();
    await expect(page.getByRole("button", { name: /reanudar testimonios/i })).toBeVisible();
  });
});
