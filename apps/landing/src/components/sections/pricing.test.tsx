import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { siteConfig } from "@/config/site.config";

import { Pricing } from "./pricing";

afterEach(cleanup);

describe("Pricing", () => {
  it("muestra los precios mensuales por defecto", () => {
    render(<Pricing />);
    const pro = siteConfig.pricing.plans.find((p) => p.highlighted)!;
    expect(
      screen.getByText(`${siteConfig.pricing.currency}${pro.priceMonthly}`),
    ).toBeInTheDocument();
  });

  it("al activar 'Anual' actualiza los precios", async () => {
    const user = userEvent.setup();
    render(<Pricing />);
    const pro = siteConfig.pricing.plans.find((p) => p.highlighted)!;

    await user.click(screen.getByRole("button", { name: /anual/i }));

    expect(
      screen.getByText(`${siteConfig.pricing.currency}${pro.priceAnnual}`),
    ).toBeInTheDocument();
    expect(screen.getAllByText("facturado anualmente").length).toBeGreaterThan(0);
  });
});
