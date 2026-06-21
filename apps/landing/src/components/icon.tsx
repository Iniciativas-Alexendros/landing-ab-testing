import {
  BarChart3,
  CircleDot,
  type LucideIcon,
  Plug,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

/** Iconos lucide referenciables por nombre desde site.config.ts. */
const iconMap: Record<string, LucideIcon> = {
  Zap,
  ShieldCheck,
  BarChart3,
  Plug,
  Users,
  Sparkles,
};

interface IconProps {
  name: string;
  className?: string;
}

/** Renderiza un icono de lucide por nombre; cae a un icono neutro si no existe. */
export function Icon({ name, className }: IconProps) {
  const Component = iconMap[name] ?? CircleDot;
  return <Component className={className} aria-hidden="true" />;
}
