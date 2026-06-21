"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FadeInWhenVisibleProps {
  children: ReactNode;
  /** Retardo en segundos antes de la animación (para escalonar entradas). */
  delay?: number;
  className?: string;
}

/**
 * Revela su contenido con un fundido + desplazamiento al entrar en el viewport.
 * Si el usuario prefiere reducir movimiento, aparece sin animación.
 */
export function FadeInWhenVisible({ children, delay = 0, className }: FadeInWhenVisibleProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
