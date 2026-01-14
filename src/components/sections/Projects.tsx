"use client";

import Container from "../../components/ui/Container";
import { projects } from "../../data/projects";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section id="proyectos" className="py-20 text-zinc-50">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold"
        >
          Proyectos
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-2 max-w-3xl text-white/70"
        >
          Una selección de proyectos. Agregá links a GitHub y demo cuando tengas.
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {projects.map((p, idx) => (
            <motion.article
              key={`${p.title}-${idx}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-zinc-700">{p.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-zinc-700 transition hover:bg-zinc-100"
                      aria-label="GitHub"
                      title="GitHub"
                    >
                      <Github size={18} />
                    </a>
                  ) : null}

                  {p.demo ? (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-zinc-700 transition hover:bg-zinc-100"
                      aria-label="Demo"
                      title="Demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
