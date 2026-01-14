export type ProjectItem = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
};

export const projects: ProjectItem[] = [
  {
    title: "Portafolio Web",
    description:
      "Portafolio profesional con animaciones, secciones y diseño responsive.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    github: "https://github.com/tuusuario/tu-repo",
    demo: "https://tu-demo.vercel.app",
  },
  {
    title: "Proyecto académico",
    description:
      "Sistema/APP de ejemplo con estructura modular, CRUD y buenas prácticas.",
    tech: ["React", "Tailwind"],
    github: "https://github.com/tuusuario/otro-repo",
  },
];
