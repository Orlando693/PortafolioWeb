export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
  tech?: string[];
};

export type AchievementItem = {
  title: string;
  issuer?: string;
  date?: string;
  image?: string; // ruta en /public, ej: "/certs/react.png"
  href?: string;  // link al certificado (opcional)
};

export const experience: ExperienceItem[] = [
  {
    role: "Estudiante / Desarrollador Web",
    company: "Proyectos académicos y personales",
    period: "2024 - Actualidad",
    location: "Santa Cruz, Bolivia",
    bullets: [
      "Desarrollo de interfaces con React / Next.js.",
      "Maquetación responsiva con Tailwind CSS.",
      "Buenas prácticas: componentes reutilizables, estructura limpia.",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
];

// ✅ Certificados / logros (ejemplos). Cambialos por los tuyos.
export const achievements: AchievementItem[] = [
  {
    title: "Certificado React",
    issuer: "Plataforma / Academia",
    date: "2025",
    image: "/certs/react.png", // pon esta imagen en /public/certs/react.png
    href: "https://tulink.com", // opcional
  },
  {
    title: "Certificado JavaScript",
    issuer: "Plataforma / Academia",
    date: "2025",
    image: "/certs/javascript.png",
  },
  {
    title: "Certificado CSS",
    issuer: "Plataforma / Academia",
    date: "2024",
    image: "/certs/css.png",
  },
];
