import { expect, test } from "@playwright/test";

const viewports = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPad", width: 768, height: 1024 },
  { name: "Desktop 1440", width: 1440, height: 900 },
];

for (const vp of viewports) {
  test(`sin desbordamiento horizontal en ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });
}
