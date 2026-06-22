import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { LeadForm } from "./lead-form";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("LeadForm", () => {
  it("muestra error de validación con un email inválido", async () => {
    const user = userEvent.setup();
    render(<LeadForm variant="A" />);

    await user.type(screen.getByLabelText("Nombre"), "Ada");
    await user.type(screen.getByLabelText("Email"), "no-es-email");
    await user.click(screen.getByRole("button", { name: /crear cuenta/i }));

    expect(await screen.findByText(/email válido/i)).toBeInTheDocument();
  });

  it("envía el lead y redirige a /gracias con datos válidos", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    render(<LeadForm variant="B" />);
    await user.type(screen.getByLabelText("Nombre"), "Ada Lovelace");
    await user.type(screen.getByLabelText("Email"), "ada@example.com");
    await user.click(screen.getByRole("button", { name: /crear cuenta/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe("/api/contact");
    const payload = JSON.parse((init as RequestInit).body as string);
    expect(payload).toMatchObject({ email: "ada@example.com", variant: "B" });

    // Camino de éxito: navega a la página de agradecimiento.
    await waitFor(() => expect(push).toHaveBeenCalledWith("/gracias"));
  });
});
