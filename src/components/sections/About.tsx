"use client"

import Container from "../../components/ui/Container"
import { motion } from "framer-motion"

export default function About() {
  return (
    <section
      id="acerca"
      className="relative bg-black min-h-[100dvh] snap-start scroll-mt-[120px] pt-24 pb-24"
    >
      {/* ✅ SOLO degradé negro suave */}
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-28 bg-gradient-to-b from-black/0 to-black" />

      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-4"
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              Acerca de mí
            </div>

            <h2 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
              Trabajo en <span className="text-white/55">interfaces</span> que se sienten rápidas y modernas.
            </h2>

            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-white/70 sm:text-lg">
              Soy Orlando, estudiante de Ingeniería en Informática y desarrollador web. Me enfoco en UI clara, consistencia
              visual y componentes reutilizables. Me gusta aprender tecnologías nuevas y convertir ideas en proyectos
              reales.
            </p>
          </motion.div>

          {/* RIGHT */}
          <div className="lg:col-span-7">
            {/* ✅ grandes: se apilan y recién en 2xl se ponen 2 columnas */}
            <div className="grid gap-8 2xl:grid-cols-2">
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
              className="mt-7 rounded-3xl border border-white/10 bg-white/5 px-6 py-5"
            >
              <p className="text-sm text-white/70">
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
      className="rounded-3xl border border-black/10 bg-white p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10"
    >
      <p className="text-xs font-semibold tracking-widest uppercase text-black">{kicker}</p>

      <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-black sm:text-3xl">{title}</h3>

      <p className="mt-4 text-base leading-relaxed text-black sm:text-lg">{desc}</p>

      <ul className="mt-6 space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-black">
            <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-black" />
            <span className="text-[15px] leading-relaxed sm:text-base">{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
