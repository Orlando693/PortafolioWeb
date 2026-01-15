"use client"

import Container from "../ui/Container"
import { experience, achievements, type AchievementItem } from "../../data/experience"
import { AnimatePresence, motion } from "framer-motion"
import { Award, Briefcase, ExternalLink, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

export default function Experience() {
  const [active, setActive] = useState<AchievementItem | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const hasAchievements = useMemo(() => achievements?.length > 0, [])

  return (
    <section
      id="experiencia"
      className="relative bg-black min-h-[100dvh] snap-start scroll-mt-[120px] pt-16 pb-16 sm:pt-24 sm:pb-24"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-28 bg-gradient-to-b from-black/0 to-black" />

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.35 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm text-white/80">
            Experiencia & Logros
          </div>

          <h2 className="mt-4 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-white lg:text-[56px]">
            Trayectoria académica y <span className="text-white/55">proyectos personales</span>
          </h2>

          <p className="mt-4 sm:mt-6 max-w-[48ch] text-sm sm:text-base lg:text-lg leading-relaxed text-white/70">
            Experiencia académica y proyectos personales donde he aprendido y crecido como desarrollador.
          </p>
        </motion.div>

        {/* Layout */}
        <div className="mt-12 sm:mt-16 grid gap-8 sm:gap-12 lg:gap-14 lg:grid-cols-12 lg:items-start">
          {/* LEFT: Timeline */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
              <Briefcase size={16} />
              <span>Trayectoria</span>
            </div>

            <div className="mt-6 relative pl-6 sm:pl-8">
              {/* Línea vertical */}
              <div className="absolute left-2.5 sm:left-3 top-2 bottom-6 w-px bg-white/10" />

              <div className="grid gap-6 sm:gap-6">
                {experience.map((e, idx) => (
                  <motion.div
                    key={`${e.role}-${idx}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="relative"
                  >
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-4 sm:p-6 lg:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
                    >
                      <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-base sm:text-lg font-semibold text-black">{e.role}</p>
                          <p className="mt-1 text-xs sm:text-sm text-black/65">
                            {e.company}
                            {e.location ? ` • ${e.location}` : ""}
                          </p>
                        </div>

                        <span className="w-fit rounded-full border border-black/10 bg-black/5 px-2.5 sm:px-3 py-1 text-xs text-black/70 shrink-0">
                          {e.period}
                        </span>
                      </div>

                      <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-black/70">
                        {e.bullets.map((b, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-1.5 h-1 w-1 sm:mt-2 sm:h-1.5 sm:w-1.5 shrink-0 rounded-full bg-black" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {e.tech?.length ? (
                        <div className="mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2">
                          {e.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-black/10 bg-black/5 px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs text-black/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Achievements */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                <Award size={16} />
                <span>Certificados / Logros</span>
              </div>

              <span className="text-xs text-white/50">
                {hasAchievements ? `${achievements.length} items` : "Aún sin items"}
              </span>
            </div>

            <div className="mt-6">
              {hasAchievements ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {achievements.map((a, idx) => (
                    <motion.button
                      key={`${a.title}-${idx}`}
                      type="button"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.22, delay: idx * 0.02 }}
                      whileHover={{ y: -3 }}
                      onClick={() => setActive(a)}
                      className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-black/10 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.22)] text-left"
                    >
                      <div className="aspect-[16/11] w-full bg-black/10">
                        {a.image ? (
                          <img
                            src={a.image || "/placeholder.svg"}
                            alt={a.title}
                            className="h-full w-full object-cover opacity-95 transition group-hover:opacity-100"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <div className="rounded-lg border border-black/10 bg-black/5 px-2 py-1 text-[10px] sm:text-[11px] text-black/70">
                              Sin imagen
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="p-3 sm:p-4">
                        <p className="line-clamp-1 text-[12px] sm:text-[13px] font-semibold text-black">{a.title}</p>
                        <p className="mt-0.5 line-clamp-1 text-[10px] sm:text-[11px] text-black/60">
                          {a.issuer ? a.issuer : "Certificado"} {a.date ? `• ${a.date}` : ""}
                        </p>
                      </div>

                      {/* overlay */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
                        <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 rounded-full border border-black/15 bg-white/90 p-1.5 sm:p-2 backdrop-blur">
                          <ExternalLink size={12} className="text-black/80 sm:w-3.5 sm:h-3.5" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 px-4 sm:px-6 py-6 sm:py-8"
                >
                  <p className="text-xs sm:text-sm text-white/70">Aquí van tus certificados 👇</p>
                  <p className="mt-2 text-xs sm:text-sm text-white/70">
                    Cuando los tengas, agregás items en <span className="text-white">data/experience.ts</span> con
                    <span className="text-white"> title, issuer, date, image</span> (y opcional{" "}
                    <span className="text-white">href</span>).
                  </p>
                  <p className="mt-3 text-xs text-white/50">
                    Tip: guardá imágenes en <span className="text-white">/public/certs/</span> y usá rutas tipo{" "}
                    <span className="text-white">/certs/react.png</span>
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Modal */}
      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <motion.div
              initial={{ y: 14, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-2xl sm:max-w-4xl overflow-hidden rounded-2xl sm:rounded-3xl border border-black/10 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 border-b border-black/10 bg-white px-4 sm:px-5 py-3 sm:py-4">
                <div className="min-w-0">
                  <p className="truncate text-xs sm:text-sm font-semibold text-black">{active.title}</p>
                  <p className="truncate text-xs text-black/60">
                    {active.issuer ? active.issuer : "Certificado"} {active.date ? `• ${active.date}` : ""}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full border border-black/10 bg-black/5 p-1.5 sm:p-2 text-black/80 hover:bg-black/10 shrink-0"
                >
                  <X size={16} className="sm:w-5 sm:h-5" />
                </button>
              </div>

              <div className="bg-white">
                {active.image ? (
                  <img
                    src={active.image || "/placeholder.svg"}
                    alt={active.title}
                    className="max-h-[60vh] sm:max-h-[75vh] w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-[40vh] sm:h-[50vh] items-center justify-center text-black/70 text-sm">
                    No hay imagen cargada todavía.
                  </div>
                )}
              </div>

              {active.href ? (
                <div className="flex items-center justify-end gap-2 border-t border-black/10 bg-white/50 px-4 sm:px-5 py-2 sm:py-3">
                  <a
                    href={active.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-black/10 bg-black/5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-black/80 hover:bg-black/10"
                  >
                    Ver enlace <ExternalLink size={14} />
                  </a>
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}
