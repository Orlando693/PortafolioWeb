export type SkillLevel = "Básico" | "Intermedio" | "Avanzado";
export type SkillCategory = "Frontend" | "Backend" | "DB & Tools";

export type Skill = {
  name: string;
  icon: string; // skillicons.dev key (ej: nextjs, react, postgres)
  level: SkillLevel;
  category: SkillCategory;
  evidence?: { label: string; url: string }[]; // links para comprobar en GitHub
};

export const skills: Skill[] = [
  // Frontend
  {
    name: "Next.js",
    icon: "nextjs",
    level: "Intermedio",
    category: "Frontend",
    evidence: [
      { label: "Frontend-Ficct", url: "https://github.com/Orlando693/Frontend-Ficct" },
      { label: "Frontend-Netcrow", url: "https://github.com/Orlando693/Frontend-Netcrow" },
    ],
  },
  {
    name: "React",
    icon: "react",
    level: "Intermedio",
    category: "Frontend",
    evidence: [{ label: "Frontend-Netcrow", url: "https://github.com/Orlando693/Frontend-Netcrow" }],
  },
  {
    name: "Tailwind CSS",
    icon: "tailwind",
    level: "Intermedio",
    category: "Frontend",
    evidence: [{ label: "Frontend-Ficct", url: "https://github.com/Orlando693/Frontend-Ficct" }],
  },
  { name: "HTML5", icon: "html", level: "Intermedio", category: "Frontend" },
  { name: "CSS3", icon: "css", level: "Intermedio", category: "Frontend" },
  { name: "JavaScript", icon: "js", level: "Intermedio", category: "Frontend" },

  // Backend
  {
    name: "NestJS",
    icon: "nestjs",
    level: "Intermedio",
    category: "Backend",
    evidence: [{ label: "Backend-Netcrow", url: "https://github.com/Orlando693/Backend-Netcrow" }],
  },
  {
    name: "Prisma",
    icon: "prisma",
    level: "Intermedio",
    category: "Backend",
    evidence: [{ label: "Backend-Netcrow", url: "https://github.com/Orlando693/Backend-Netcrow" }],
  },
  {
    name: "Laravel",
    icon: "laravel",
    level: "Básico",
    category: "Backend",
    evidence: [{ label: "Backend-Ficct", url: "https://github.com/Orlando693/Backend-Ficct" }],
  },
  { name: "PHP", icon: "php", level: "Básico", category: "Backend" },

  // DB & Tools
  { name: "PostgreSQL", icon: "postgres", level: "Intermedio", category: "DB & Tools" },
  { name: "MySQL", icon: "mysql", level: "Intermedio", category: "DB & Tools" },
  { name: "Git", icon: "git", level: "Intermedio", category: "DB & Tools" },
  { name: "GitHub", icon: "github", level: "Intermedio", category: "DB & Tools" },
  { name: "C#", icon: "cs", level: "Intermedio", category: "DB & Tools" },
];
