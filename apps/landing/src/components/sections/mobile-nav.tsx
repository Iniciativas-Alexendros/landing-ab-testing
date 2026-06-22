"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@landing/ui";

import { siteConfig } from "@/config/site.config";

/** Navegación móvil: hamburguesa + panel desplegable accesible (solo < md). */
export function MobileNav() {
  const { nav } = siteConfig;
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAndFocus();
    };
    document.addEventListener("keydown", onKeyDown);

    // Foco al primer enlace al abrir.
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function closeAndFocus() {
    setOpen(false);
    buttonRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className="md:hidden">
      <Button
        ref={buttonRef}
        variant="ghost"
        size="icon"
        className="h-11 w-11"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40">
          <button
            type="button"
            aria-label="Cerrar menú"
            className="absolute inset-0 h-full w-full bg-background/60 backdrop-blur-sm"
            onClick={closeAndFocus}
            tabIndex={-1}
          />
          <div
            ref={panelRef}
            id="mobile-menu-panel"
            className="absolute inset-x-0 top-0 border-b bg-background p-6 shadow-lg"
          >
            <nav className="flex flex-col gap-1" aria-label="Principal">
              {nav.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <Button asChild className="mt-4 w-full" onClick={() => setOpen(false)}>
              <a href="#lead-form">{nav.ctaLabel}</a>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
