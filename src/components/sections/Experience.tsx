"use client";

import Container from "../../components/ui/Container";
import { experience } from "../../data/experience";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section id="experiencia" className="py-20 text-zinc-50">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold"
        >
          Experiencia
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-2 max-w-3xl text-white/70"
        >
          Experiencia académica y proyectos personales. (Luego podés agregar prácticas,
          freelance o trabajo formal).
        </motion.p>

        <div className="mt-10 grid gap-4">
          {experience.map((e, idx) => (
            <motion.div
              key={`${e.role}-${idx}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-xl border border-zinc-200 bg-zinc-50 p-2">
                    <Briefcase size={18} />
                  </div>

                  <div>
                    <p className="text-lg font-semibold">{e.role}</p>
                    <p className="text-sm text-zinc-700">
                      {e.company}
                      {e.location ? ` • ${e.location}` : ""}
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700">
                  {e.period}
                </span>
              </div>

              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-700">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>

              {e.tech?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
