"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  /** Valor final al que cuenta. */
  value: number;
  /** Duración de la animación en milisegundos. */
  durationMs?: number;
  className?: string;
}

/** Cuenta de 0 al valor final cuando entra en el viewport (una vez). */
export function AnimatedCounter({ value, durationMs = 1400, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const step = (timestamp: number) => {
      start ??= timestamp;
      const progress = Math.min((timestamp - start) / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("es-ES")}
    </span>
  );
}
