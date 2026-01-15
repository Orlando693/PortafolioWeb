// src/components/sections/Projects.tsx
import { getPublicRepos } from "../../lib/github";
import ProjectsClient from "./ProjectsClient";

const PINNED = ["Marketplace-Work", "Presupuesto-Web", "ProyectoCalculadora-Flutter", "Proyecto-IO1"];

export default async function Projects() {
  const repos = await getPublicRepos("Orlando693");

  return (
    <section id="proyectos" className="scroll-mt-28 py-16">
      <ProjectsClient repos={repos} pinnedNames={PINNED} />
    </section>
  );
}
