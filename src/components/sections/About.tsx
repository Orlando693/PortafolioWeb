"use client"

import Container from "../ui/Container"
import { motion } from "framer-motion"

export default function About() {
  return (
    <section
      id="acerca"
      className="relative bg-black min-h-[100dvh] snap-start scroll-mt-[120px] pt-16 pb-16 sm:pt-24 sm:pb-24"
    >
      {/* ✅ SOLO degradé negro suave */}
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-28 bg-gradient-to-b from-black/0 to-black" />

      <Container>
        <div className="grid gap-8 sm:gap-12 lg:gap-14 lg:grid-cols-12 lg:items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-4"
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm text-white/80">
              Acerca de mí
            </div>

            <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-white lg:text-[56px]">
              Trabajo en <span className="text-white/55">interfaces</span> que se sienten rápidas y modernas.
            </h2>

            <p className="mt-4 sm:mt-6 max-w-[48ch] text-sm sm:text-base leading-relaxed text-white/70 lg:text-lg">
              Soy Orlando, estudiante de Ingeniería en Informática y desarrollador web. Me enfoco en UI clara,
              consistencia visual y componentes reutilizables. Me gusta aprender tecnologías nuevas y convertir ideas en
              proyectos reales.
            </p>
          </motion.div>

          {/* RIGHT */}
          <div className="lg:col-span-8">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 2xl:grid-cols-2">
              <AboutCardNeutral
                kicker="Enfoque"
                title="Qué hago"
                desc="Construyo interfaces modernas con claridad visual, buena estructura y detalles que elevan la experiencia."
                bullets={["Componentes reutilizables", "UI consistente y limpia", "Animaciones sutiles (sin exceso)"]}
              />

              <AboutCardNeutral
                kicker="Método"
                title="Cómo trabajo"
                desc='Orden y consistencia antes que "efectos por efecto". Micro-interacciones rápidas y coherentes.'
                bullets={["Diseño + implementación", "Performance y accesibilidad", "Git y buenas prácticas"]}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="mt-5 sm:mt-7 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 px-4 py-3 sm:px-6 sm:py-5"
            >
              <p className="text-xs sm:text-sm text-white/70">
                Repos públicos en GitHub para comprobar mi trabajo, con proyectos reales y avances constantes.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ---------- UI (Cards) ---------- */

function AboutCardNeutral({
  kicker,
  title,
  desc,
  bullets,
}: {
  kicker: string
  title: string
  desc: string
  bullets: string[]
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.28 }}
      whileHover={{ y: -6 }}
      className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-5 sm:p-8 lg:p-10 shadow-[0_20px_40px_rgba(0,0,0,0.2)] sm:shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
    >
      <p className="text-xs font-semibold tracking-widest uppercase text-black">{kicker}</p>

      <h3 className="mt-2 sm:mt-3 text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-black">{title}</h3>

      <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-black">{desc}</p>

      <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 sm:gap-3 text-black text-sm sm:text-base">
            <span className="mt-2 h-1.5 w-1.5 sm:mt-[9px] sm:h-2 sm:w-2 shrink-0 rounded-full bg-black" />
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
