"use client"

import Container from "../../components/ui/Container"
import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useRef, useState } from "react"
import { Braces, Database, Server, Sparkles, CheckCircle2 } from "lucide-react"

type Level = "Básico" | "Intermedio" | "Avanzado"

type Skill = {
  name: string
  level: Level
  category: "Frontend" | "Backend" | "DB & Tools"
  proof?: string
  iconKey: string
}

const SKILLS: Skill[] = [
  // Frontend
  { name: "Next.js", level: "Intermedio", category: "Frontend", iconKey: "nextjs" },
  { name: "React", level: "Intermedio", category: "Frontend", iconKey: "react" },
  { name: "Tailwind CSS", level: "Intermedio", category: "Frontend", iconKey: "tailwind" },
  { name: "HTML5", level: "Intermedio", category: "Frontend", iconKey: "html" },
  { name: "CSS3", level: "Intermedio", category: "Frontend", iconKey: "css" },
  { name: "JavaScript", level: "Intermedio", category: "Frontend", iconKey: "js" },

  // Backend
  { name: "NestJS", level: "Intermedio", category: "Backend", iconKey: "nestjs" },
  { name: "Prisma", level: "Intermedio", category: "Backend", iconKey: "prisma" },
  { name: "Laravel", level: "Básico", category: "Backend", iconKey: "laravel" },
  { name: "PHP", level: "Básico", category: "Backend", iconKey: "php" },

  // DB & Tools
  { name: "PostgreSQL", level: "Intermedio", category: "DB & Tools", iconKey: "postgres" },
  { name: "MySQL", level: "Avanzado", category: "DB & Tools", iconKey: "mysql" },
  { name: "Git", level: "Intermedio", category: "DB & Tools", iconKey: "git" },
  { name: "GitHub", level: "Intermedio", category: "DB & Tools", iconKey: "github" },
  { name: "C#", level: "Intermedio", category: "DB & Tools", iconKey: "cs" },
]

const CATEGORIES = [
  { key: "Todos" as const, label: "Todos", icon: null },
  { key: "Frontend" as const, label: "Frontend", icon: Braces },
  { key: "Backend" as const, label: "Backend", icon: Server },
  { key: "DB & Tools" as const, label: "BD & Herramientas", icon: Database },
]

function levelStyles(level: Level) {
  // ✅ neutro (sin verde/azul)
  if (level === "Avanzado") return "border-black/20 bg-black/10 text-black"
  if (level === "Intermedio") return "border-black/15 bg-black/5 text-black/80"
  return "border-black/10 bg-black/3 text-black/70"
}

function safePlay(audio: HTMLAudioElement | null) {
  if (!audio) return
  try {
    audio.currentTime = 0
    void audio.play()
  } catch {
    // autoplay restrictions
  }
}

export default function TechStack() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]["key"]>("Todos")
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null)

  const filtered = useMemo(() => {
    if (active === "Todos") return SKILLS
    return SKILLS.filter((s) => s.category === active)
  }, [active])

  const stats = useMemo(() => {
    return {
      total: SKILLS.length,
      avanzadas: SKILLS.filter((s) => s.level === "Avanzado").length,
      intermedias: SKILLS.filter((s) => s.level === "Intermedio").length,
      basicas: SKILLS.filter((s) => s.level === "Básico").length,
    }
  }, [])

  return (
    <section id="habilidades" className="relative bg-black min-h-[100dvh] snap-start scroll-mt-[120px] pt-24 pb-24">
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-28 bg-gradient-to-b from-black/0 to-black" />

      <audio ref={hoverAudioRef} src="/sfx/hover.mp3" preload="auto" />

      <Container>
        {/* ✅ grid mejor repartido para que NO se encime */}
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              Habilidades técnicas
            </div>

            <h2 className="mt-6 max-w-[18ch] text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
              Herramientas que <span className="text-white/55">domino</span>
            </h2>

            <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-white/70 sm:text-lg">
              Tecnologías y lenguajes que uso regularmente para construir aplicaciones robustas, desde frontend moderno
              hasta backend escalable.
            </p>

            {/* ✅ stats siempre en 2 columnas desde sm para que se vea ordenado */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <div className="lg:col-span-7 lg:col-start-6">
            
            <div className="lg:sticky lg:top-28">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => {
                  const Icon = c.icon
                  const isActive = active === c.key
                  return (
                    <motion.button
                      key={c.key}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActive(c.key)}
                      className={[
                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
                        isActive
                          ? "border-white/25 bg-white/10 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10",
                      ].join(" ")}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      {c.label}
                    </motion.button>
                  )
                })}
              </div>

              {/* Panel */}
              <div className="mt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
                  >
                    {/* Header del panel */}
                    <div className="border-b border-black/10 px-8 py-7 sm:px-10">
                      <p className="text-xs font-semibold tracking-widest uppercase text-black">
                        {active === "Todos" ? "Todas mis habilidades" : active}
                      </p>

                      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <h3 className="text-2xl font-extrabold tracking-tight text-black sm:text-3xl">
                          {active === "Todos" ? "Stack completo" : `Dominio ${active}`}
                        </h3>

                        <span className="w-fit rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-black/70">
                          {filtered.length} {filtered.length === 1 ? "item" : "items"}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-black/70">
                        {active === "Todos"
                          ? "Tecnologías organizadas por categoría. Los niveles representan experiencia práctica."
                          : "Herramientas dentro de esta categoría. El nivel refleja experiencia práctica."}
                      </p>
                    </div>

                   
                    <div className="max-h-[56vh] overflow-auto px-6 py-6 sm:px-8">
                      <div className="grid gap-3 sm:gap-4">
                        {filtered.map((skill) => (
                          <motion.div
                            key={skill.name}
                            layout
                            onMouseEnter={() => safePlay(hoverAudioRef.current)}
                            whileHover={{ x: 4 }}
                            className="group flex items-center justify-between gap-4 rounded-2xl border border-black/5 bg-black/[0.03] p-4 transition-colors hover:bg-black/[0.06]"
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-black/5">
                                <img
                                  alt={skill.name}
                                  className="h-6 w-6"
                                  src={`https://skillicons.dev/icons?i=${skill.iconKey}`}
                                />
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-base font-semibold text-black">{skill.name}</p>
                                <p className="text-xs text-black/50">{skill.category}</p>
                              </div>
                            </div>

                            <span
                              className={[
                                "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium shrink-0",
                                levelStyles(skill.level),
                              ].join(" ")}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {skill.level}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Footer mini (opcional) */}
                    <div className="border-t border-black/10 bg-black/[0.02] px-8 py-4 text-xs text-black/60 sm:px-10">
                      
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ---------- UI Components ---------- */

function StatsCard({ label, value }: { label: string; value: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.28 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:p-7"
    >
      <p className="text-xs font-semibold tracking-widest uppercase text-black/60">{label}</p>
      <p className="mt-2 text-3xl font-extrabold text-black">{value}</p>
    </motion.div>
  )
}
