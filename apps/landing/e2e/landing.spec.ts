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

    // El CTA del hero es la primera llamada a la acción de la página.
    await page.locator("main button").first().click();

    // Formulario de leads (en la sección final).
    await page.locator("#lead-form").scrollIntoViewIfNeeded();
    await page.getByLabel("Nombre").fill("Ada Lovelace");
    await page.getByLabel("Email").fill("ada@example.com");
    await page.getByRole("button", { name: /crear cuenta gratis/i }).click();

    // Toast de confirmación.
    await expect(page.getByText(/te hemos enviado un email/i)).toBeVisible();
  });
});
