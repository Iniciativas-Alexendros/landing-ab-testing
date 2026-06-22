import type { SiteConfig } from "./types";

/**
 * Contenido y marca de la landing — ÚNICA fuente de verdad.
 *
 * Para reutilizar la plantilla con otro cliente: edita este objeto y reemplaza
 * los assets en /public. La lógica (A/B, formulario, animaciones) no cambia.
 *
 * Los datos de abajo son un cliente de ejemplo ("Nimbus") para desarrollo.
 */
export const siteConfig: SiteConfig = {
  brand: {
    name: "Nimbus",
    domain: "nimbus.example",
    email: "hola@nimbus.example",
  },

  seo: {
    title: "Nimbus — Automatiza tu negocio sin escribir código",
    description:
      "La plataforma todo-en-uno para automatizar flujos de trabajo, captar clientes y crecer. Empieza gratis en minutos.",
    url: "https://nimbus.example",
    ogImage: "/og.png",
  },

  nav: {
    links: [
      { label: "Características", href: "#features" },
      { label: "Precios", href: "#pricing" },
      { label: "Testimonios", href: "#testimonials" },
      { label: "FAQ", href: "#faq" },
    ],
    ctaLabel: "Empezar gratis",
  },

  hero: {
    badge: "Nuevo · Integración con IA",
    title: "Automatiza tu negocio sin escribir una línea de código",
    subtitle:
      "Conecta tus herramientas, automatiza tareas repetitivas y dedica tu tiempo a lo que de verdad importa. Listo en minutos.",
    ctaVariants: {
      A: "Empieza gratis",
      B: "Pruébalo hoy — es gratis",
    },
    ctaHref: "#lead-form",
    secondaryCtaLabel: "Ver cómo funciona",
    secondaryCtaHref: "#features",
    stats: [
      { value: 12000, suffix: "+", label: "Equipos activos" },
      { value: 4, suffix: "M", label: "Tareas automatizadas" },
      { value: 99, suffix: "%", label: "Tiempo de actividad" },
    ],
  },

  features: {
    title: "Todo lo que necesitas para crecer",
    subtitle: "Una plataforma, infinitas posibilidades. Sin fricción, sin código.",
    items: [
      {
        icon: "Zap",
        title: "Automatizaciones en minutos",
        description:
          "Crea flujos visuales que conectan tus apps favoritas sin depender de desarrolladores.",
      },
      {
        icon: "ShieldCheck",
        title: "Seguridad de nivel empresarial",
        description: "Cifrado de extremo a extremo, SSO y cumplimiento GDPR de serie.",
      },
      {
        icon: "BarChart3",
        title: "Analítica en tiempo real",
        description: "Mide lo que importa con paneles claros y alertas inteligentes.",
      },
      {
        icon: "Plug",
        title: "Más de 200 integraciones",
        description: "Conecta con las herramientas que ya usas en un par de clics.",
      },
      {
        icon: "Users",
        title: "Colaboración en equipo",
        description: "Roles, permisos y espacios compartidos para trabajar sin pisarse.",
      },
      {
        icon: "Sparkles",
        title: "Asistente con IA",
        description: "Sugerencias automáticas que optimizan tus flujos mientras trabajas.",
      },
    ],
  },

  pricing: {
    title: "Precios simples y transparentes",
    subtitle: "Empieza gratis. Escala cuando lo necesites. Sin sorpresas.",
    currency: "€",
    plans: [
      {
        name: "Starter",
        description: "Para empezar a automatizar tu día a día.",
        priceMonthly: 0,
        priceAnnual: 0,
        features: [
          "Hasta 3 flujos",
          "1.000 tareas/mes",
          "Integraciones básicas",
          "Soporte por email",
        ],
        ctaLabel: "Empezar gratis",
        ctaHref: "#lead-form",
      },
      {
        name: "Pro",
        description: "Para equipos que quieren ir en serio.",
        priceMonthly: 29,
        priceAnnual: 24,
        features: [
          "Flujos ilimitados",
          "50.000 tareas/mes",
          "Todas las integraciones",
          "Analítica avanzada",
          "Soporte prioritario",
        ],
        ctaLabel: "Probar Pro",
        ctaHref: "#lead-form",
        highlighted: true,
      },
      {
        name: "Business",
        description: "Para organizaciones con necesidades a medida.",
        priceMonthly: 99,
        priceAnnual: 82,
        features: [
          "Todo lo de Pro",
          "Tareas ilimitadas",
          "SSO y roles avanzados",
          "SLA garantizado",
          "Gestor de cuenta dedicado",
        ],
        ctaLabel: "Hablar con ventas",
        ctaHref: "#lead-form",
      },
    ],
  },

  testimonials: {
    title: "Equipos que ya vuelan con Nimbus",
    subtitle: "Miles de empresas confían en nosotros para automatizar su trabajo.",
    items: [
      {
        quote:
          "Pasamos de perder horas en tareas manuales a automatizarlo todo en una tarde. Un antes y un después.",
        author: "Lucía Fernández",
        role: "COO en Trevor",
      },
      {
        quote:
          "La curva de aprendizaje es prácticamente nula. En un día teníamos flujos en producción.",
        author: "Marc Oliver",
        role: "CTO en Lumen",
      },
      {
        quote:
          "El soporte es excelente y las integraciones cubren absolutamente todo nuestro stack.",
        author: "Sara Ibáñez",
        role: "Head of Ops en Kova",
      },
      {
        quote: "Hemos reducido un 40% el tiempo operativo. El ROI fue inmediato.",
        author: "Diego Romero",
        role: "Founder en Patio",
      },
    ],
  },

  faq: {
    title: "Preguntas frecuentes",
    subtitle: "¿Tienes dudas? Aquí van las respuestas más habituales.",
    items: [
      {
        question: "¿Necesito saber programar?",
        answer:
          "No. Nimbus es 100% visual: arrastra, conecta y listo. Si sabes usar una hoja de cálculo, sabes usar Nimbus.",
      },
      {
        question: "¿Puedo empezar gratis?",
        answer:
          "Sí. El plan Starter es gratuito para siempre, sin tarjeta de crédito. Amplías solo cuando lo necesitas.",
      },
      {
        question: "¿Mis datos están seguros?",
        answer:
          "Ciframos los datos en tránsito y en reposo, cumplimos GDPR y ofrecemos SSO en los planes superiores.",
      },
      {
        question: "¿Puedo cancelar cuando quiera?",
        answer:
          "Por supuesto. Sin permanencia ni penalizaciones. Cancelas con un clic desde tu panel.",
      },
      {
        question: "¿Ofrecéis soporte?",
        answer:
          "Sí, por email en todos los planes y con prioridad en Pro y Business. La media de respuesta es menor a 2 horas.",
      },
    ],
  },

  finalCta: {
    title: "Empieza a automatizar hoy mismo",
    subtitle: "Únete a miles de equipos que ya ahorran horas cada semana. Gratis para empezar.",
    ctaLabel: "Crear cuenta gratis",
  },

  footer: {
    tagline: "La plataforma de automatización sin código para equipos que quieren crecer.",
    copyright: "© 2026 Nimbus. Todos los derechos reservados.",
    links: [
      { label: "Privacidad", href: "/privacidad" },
      { label: "Términos", href: "/terminos" },
      { label: "Contacto", href: "#lead-form" },
    ],
    socials: [
      { label: "X", href: "https://x.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "GitHub", href: "https://github.com" },
    ],
  },
};
