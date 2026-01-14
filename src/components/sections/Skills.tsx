"use client";

import Container from "../../components/ui/Container";
import { skills } from "../../data/skills";
import { motion } from "framer-motion";

const levelBadge: Record<string, string> = {
  Básico: "bg-zinc-100 text-zinc-700 border border-zinc-200",
  Intermedio: "bg-amber-50 text-amber-700 border border-amber-200",
  Avanzado: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

export default function Skills() {
  return (
    <section id="habilidades" className="py-20 text-zinc-50">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold"
        >
          Habilidades técnicas
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-2 max-w-2xl text-white/70"
        >
          Tecnologías que uso y mi nivel actual (lo podés ir actualizando a medida que avances).
        </motion.p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, idx) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{s.name}</p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${levelBadge[s.level] ?? levelBadge["Básico"]}`}
                >
                  {s.level}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
