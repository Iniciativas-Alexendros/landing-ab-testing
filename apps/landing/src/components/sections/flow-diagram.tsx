"use client";

import { Bell, Sparkles, Webhook } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const nodes = [
  { icon: Webhook, label: "Disparador", detail: "Nuevo lead recibido" },
  { icon: Sparkles, label: "Acción", detail: "Enriquecer con IA" },
  { icon: Bell, label: "Resultado", detail: "Avisar al equipo" },
];

/**
 * Elemento signature: un flujo de automatización con un pulso que recorre las
 * conexiones, evocando datos moviéndose de un paso al siguiente.
 */
export function FlowDiagram() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-sm rounded-2xl border bg-card/60 p-6 shadow-xl backdrop-blur">
      <p className="eyebrow mb-5">flujo en vivo</p>
      <ol className="flex flex-col gap-0">
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1;
          return (
            <li key={node.label} className="relative">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-accent-foreground">
                  <node.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold">{node.label}</p>
                  <p className="truncate text-xs text-muted-foreground">{node.detail}</p>
                </div>
              </div>

              {!isLast ? (
                <div className="relative ml-[1.375rem] h-8 w-px bg-border" aria-hidden="true">
                  {!reduce ? (
                    <motion.span
                      className="absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_8px_2px] shadow-brand/50"
                      initial={{ top: 0, opacity: 0 }}
                      animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        delay: index * 0.4,
                        ease: "easeInOut",
                      }}
                    />
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
