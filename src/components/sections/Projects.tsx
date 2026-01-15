// src/components/sections/Projects.tsx
import { getPublicRepos } from "../../lib/github"
import ProjectsClient from "./ProjectsClient"

const PINNED = ["Marketplace-Work", "Presupuesto-Web", "ProyectoCalculadora-Flutter", "Proyecto-IO1"]

export default async function Projects() {
  const repos = await getPublicRepos("Orlando693")

  return (
    <section id="proyectos" className="relative bg-black min-h-[100dvh] snap-start scroll-mt-[120px] pt-24 pb-24">
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-28 bg-gradient-to-b from-black/0 to-black" />

      <ProjectsClient repos={repos} pinnedNames={PINNED} />
    </section>
  )
}
