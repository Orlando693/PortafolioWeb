export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
  tech?: string[];
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
