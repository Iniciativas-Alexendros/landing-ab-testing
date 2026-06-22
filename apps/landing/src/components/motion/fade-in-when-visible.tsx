"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "@landing/ui";

interface FadeInWhenVisibleProps {
  children: ReactNode;
  /** Retardo en segundos antes de la animación (para escalonar entradas). */
  delay?: number;
  className?: string;
}

/**
 * Revela su contenido con un fundido + desplazamiento al entrar en el viewport,
 * usando IntersectionObserver + transiciones CSS (sin dependencias de animación).
 * Con `prefers-reduced-motion` el contenido aparece sin animación (vía
 * `motion-safe:`), por lo que nunca queda oculto.
 */
export function FadeInWhenVisible({ children, delay = 0, className }: FadeInWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "motion-safe:translate-y-6 motion-safe:opacity-0 motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out",
        visible && "motion-safe:translate-y-0 motion-safe:opacity-100",
        className,
      )}
      style={visible ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
