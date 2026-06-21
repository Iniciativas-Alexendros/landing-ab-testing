import { type NextRequest, NextResponse } from "next/server";

import { AB_COOKIE, AB_COOKIE_MAX_AGE, isVariant, randomVariant } from "@/lib/ab/config";

/**
 * Asigna la cookie de variante A/B en la primera visita.
 *
 * Si ya existe una cookie válida, no se toca (persistencia entre visitas). La
 * asignación ocurre antes del render, de modo que el servidor lee la variante
 * sin parpadeo en el cliente.
 */
export function middleware(request: NextRequest) {
  const existing = request.cookies.get(AB_COOKIE)?.value;
  const response = NextResponse.next();

  if (!isVariant(existing)) {
    response.cookies.set(AB_COOKIE, randomVariant(), {
      path: "/",
      maxAge: AB_COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export const config = {
  // Excluye API, assets estáticos e imágenes del middleware.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
