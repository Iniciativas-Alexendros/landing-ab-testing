import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ABTestWrapper } from "./ABTestWrapper";

afterEach(cleanup);

describe("ABTestWrapper", () => {
  it("renderiza el contenido A cuando la variante es A", () => {
    render(
      <ABTestWrapper
        variant="A"
        variantA={<span>Variante A</span>}
        variantB={<span>Variante B</span>}
      />,
    );
    expect(screen.getByText("Variante A")).toBeInTheDocument();
    expect(screen.queryByText("Variante B")).not.toBeInTheDocument();
  });

  it("renderiza el contenido B cuando la variante es B", () => {
    render(
      <ABTestWrapper
        variant="B"
        variantA={<span>Variante A</span>}
        variantB={<span>Variante B</span>}
      />,
    );
    expect(screen.getByText("Variante B")).toBeInTheDocument();
    expect(screen.queryByText("Variante A")).not.toBeInTheDocument();
  });
});
