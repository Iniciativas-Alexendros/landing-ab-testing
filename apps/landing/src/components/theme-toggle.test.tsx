import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import { afterEach, describe, expect, it } from "vitest";

import { ThemeToggle } from "./theme-toggle";

afterEach(cleanup);

describe("ThemeToggle", () => {
  it("renderiza un botón accesible para cambiar el tema", () => {
    render(
      <ThemeProvider attribute="class">
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByRole("button", { name: /cambiar tema/i })).toBeInTheDocument();
  });
});
