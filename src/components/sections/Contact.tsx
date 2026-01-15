"use client"

import type React from "react"

import Container from "../../components/ui/Container"
import { Mail, Github, Linkedin, ExternalLink, Clock, Zap } from "lucide-react"
import { motion } from "framer-motion"

const CONTACT = {
  email: "Orlandosebastian693@gmail.com",
  github: "https://github.com/Orlando693",
  linkedin: "https://www.linkedin.com/in/orlando693",
}

export default function Contact() {
  return (
    <section id="contacto" className="relative bg-black min-h-[100dvh] snap-start scroll-mt-[120px] pt-24 pb-24">
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-28 bg-gradient-to-b from-black/0 to-black" />

      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
          {/* LEFT - Contact intro */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-4"
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              Contacto
            </div>

            <h2 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[56px]">
              Hablemos sobre tu próximo <span className="text-white/55">proyecto</span>.
            </h2>

            <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-white/70 sm:text-lg">
              Estoy disponible para prácticas, trabajos junior o colaboraciones. Respondo rápido y con disposición a
              aprender.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="mt-8 rounded-3xl border border-white/10 bg-white/5 px-6 py-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-white/60" />
                  <span className="text-sm text-white/70">Respuesta en máx 24 horas</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 text-white/60" />
                  <span className="text-sm text-white/70">Flexible con horarios y ubicación</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT - Contact cards */}
          <div className="lg:col-span-8">
            <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
              <ContactCard
                icon={<Mail className="h-5 w-5" />}
                title="Email"
                value={CONTACT.email}
                href={`mailto:${CONTACT.email}?subject=Contacto%20desde%20tu%20Portafolio`}
              />
              <ContactCard
                icon={<Github className="h-5 w-5" />}
                title="GitHub"
                value="@Orlando693"
                href={CONTACT.github}
              />
              <ContactCard
                icon={<Linkedin className="h-5 w-5" />}
                title="LinkedIn"
                value="in/orlando693"
                href={CONTACT.linkedin}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h3 className="text-lg font-bold text-white mb-3">Preferencias de contacto</h3>
              <p className="text-white/70 leading-relaxed">
                Prefiero email o LinkedIn para consultas formales. Para chats rápidos sobre proyectos, GitHub también
                funciona. Si necesitas un formulario específico, avísame.
              </p>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ContactCard({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode
  title: string
  value: string
  href: string
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6 }}
      className="group rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/25 hover:bg-white/10 transition-all"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">{icon}</div>
          <ExternalLink className="ml-auto h-4 w-4 text-white/30 group-hover:text-white/60 transition-colors" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white/90">{title}</p>
          <p className="truncate text-sm text-white/70 mt-1">{value}</p>
        </div>
      </div>
    </motion.a>
  )
}
