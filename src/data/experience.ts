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
    tech: ["Next.js", "TypeScript", "Tailwind", "Git", "Nest.js", "PostgreSQL"],
  },
];

// ✅ Certificados / logros (ejemplos). Cambialos por los tuyos.
export const achievements: AchievementItem[] = [
  {
    title: "Certificado HTML5",
    issuer: "Plataforma / Academia",
    date: "2025",
    image: "/certs/Html.png", // pon esta imagen en /public/certs/html5.png, // opcional
  },
  {
    title: "Certificado Java",
    issuer: "Plataforma / Academia",
    date: "2024",
    image: "/certs/Java.png",
  },
  {
    title: "Certificado CSharp",
    issuer: "Plataforma / Academia",
    date: "2024",
    image: "/certs/CSharp.png",
  },
];
