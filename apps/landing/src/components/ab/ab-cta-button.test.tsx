import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AbCtaButton } from "./ab-cta-button";

const trackEvent = vi.fn();
vi.mock("@/lib/track", () => ({ trackEvent: (...args: unknown[]) => trackEvent(...args) }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("AbCtaButton", () => {
  it("muestra el texto de la variante activa", () => {
    render(<AbCtaButton abVariant="A" labelA="Empieza" labelB="Pruébalo" />);
    expect(screen.getByRole("button", { name: "Empieza" })).toBeInTheDocument();
  });

  it("registra el clic y se desplaza al destino", async () => {
    const target = document.createElement("div");
    target.id = "lead-form";
    const scrollIntoView = vi.fn();
    target.scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    const user = userEvent.setup();
    render(<AbCtaButton abVariant="B" labelA="A" labelB="B" targetId="lead-form" />);
    await user.click(screen.getByRole("button"));

    expect(trackEvent).toHaveBeenCalledWith("cta_click", "B");
    expect(scrollIntoView).toHaveBeenCalled();

    document.body.removeChild(target);
  });
});
