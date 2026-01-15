"use client";

import Container from "../../components/ui/Container";
import { experience, achievements, type AchievementItem } from "../../data/experience";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Briefcase, ExternalLink, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function Experience() {
  const [active, setActive] = useState<AchievementItem | null>(null);

  // Cierra modal con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const hasAchievements = useMemo(() => achievements?.length > 0, []);

  return (
    <section id="experiencia" className="relative py-24 text-zinc-50">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.35 }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Experiencia & Logros
          </h2>

          <p className="mt-3 text-white/70">
            Experiencia académica y proyectos personales. (Luego podés agregar prácticas, freelance o trabajo formal).
          </p>
        </motion.div>

        {/* Layout */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* LEFT: Timeline */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Briefcase size={16} />
              <span>Trayectoria</span>
            </div>

            <div className="mt-6 relative pl-8">
              {/* Línea vertical */}
              <div className="absolute left-3 top-2 h-full w-px bg-white/10" />

              <div className="grid gap-6">
                {experience.map((e, idx) => (
                  <motion.div
                    key={`${e.role}-${idx}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="relative"
                  >
                    {/* Punto timeline */}
                    <div className="absolute -left-[2px] top-6 h-6 w-6 rounded-full border border-white/15 bg-black">
                      <div className="absolute inset-0 m-auto h-2.5 w-2.5 rounded-full bg-white/80" />
                    </div>

                    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-lg font-semibold text-white">{e.role}</p>
                          <p className="mt-1 text-sm text-white/65">
                            {e.company}
                            {e.location ? ` • ${e.location}` : ""}
                          </p>
                        </div>

                        <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                          {e.period}
                        </span>
                      </div>

                      <ul className="mt-4 space-y-2 text-sm text-white/70">
                        {e.bullets.map((b, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>

                      {e.tech?.length ? (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {e.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Achievements / Certs */}
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Award size={16} />
                <span>Certificados / Logros</span>
              </div>

              <span className="text-xs text-white/50">
                {hasAchievements ? `${achievements.length} items` : "Aún sin items"}
              </span>
            </div>

            <div className="mt-6">
              {hasAchievements ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {achievements.map((a, idx) => (
                    <motion.button
                      key={`${a.title}-${idx}`}
                      type="button"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.28, delay: idx * 0.03 }}
                      whileHover={{ y: -4 }}
                      onClick={() => setActive(a)}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-[0_18px_55px_rgba(0,0,0,0.35)]"
                    >
                      {/* Imagen o placeholder */}
                      <div className="aspect-[4/3] w-full bg-black/40">
                        {a.image ? (
                          // Para imágenes locales: ponlas en /public/certs/...
                          <img
                            src={a.image}
                            alt={a.title}
                            className="h-full w-full object-cover opacity-95 transition group-hover:opacity-100"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/70">
                              Sin imagen (placeholder)
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="p-3">
                        <p className="line-clamp-1 text-sm font-semibold text-white">{a.title}</p>
                        <p className="mt-1 line-clamp-1 text-xs text-white/60">
                          {a.issuer ? a.issuer : "Certificado"} {a.date ? `• ${a.date}` : ""}
                        </p>
                      </div>

                      {/* overlay */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
                        <div className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/40 p-2 backdrop-blur">
                          <ExternalLink size={14} className="text-white/80" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
                  <p className="font-semibold text-white">Aquí van tus certificados 👇</p>
                  <p className="mt-2 text-sm text-white/70">
                    Cuando los tengas, agregás items en <span className="text-white">data/experience.ts</span> con
                    <span className="text-white"> title, issuer, date, image</span> (y opcional <span className="text-white">href</span>).
                  </p>
                  <p className="mt-3 text-xs text-white/50">
                    Tip: guardá imágenes en <span className="text-white">/public/certs/</span> y usá rutas tipo{" "}
                    <span className="text-white">/certs/react.png</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Modal preview */}
      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
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
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{active.title}</p>
                  <p className="truncate text-xs text-white/60">
                    {active.issuer ? active.issuer : "Certificado"} {active.date ? `• ${active.date}` : ""}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="bg-black">
                {active.image ? (
                  <img
                    src={active.image}
                    alt={active.title}
                    className="max-h-[75vh] w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-[50vh] items-center justify-center text-white/70">
                    No hay imagen cargada todavía.
                  </div>
                )}
              </div>

              {active.href ? (
                <div className="flex items-center justify-end gap-2 border-t border-white/10 bg-white/5 px-5 py-3">
                  <a
                    href={active.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80 hover:bg-white/10"
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
  );
}
