import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("la home no tiene violaciones graves de accesibilidad", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();
  const serious = results.violations.filter((v) =>
    ["serious", "critical"].includes(v.impact ?? ""),
  );
  expect(serious, JSON.stringify(serious.map((v) => v.id))).toEqual([]);
});
