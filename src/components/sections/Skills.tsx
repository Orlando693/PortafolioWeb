"use client";

import Container from "../../components/ui/Container";
import { skills } from "../../data/skills";
import { motion } from "framer-motion";

const levelClass: Record<string, string> = {
  "Básico": "bg-zinc-200",
  "Intermedio": "bg-zinc-300",
  "Avanzado": "bg-zinc-900 text-white",
};

export default function Skills() {
  return (
    <section id="habilidades" className="py-20">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold"
        >
          Habilidades técnicas
        </motion.h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, idx) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{s.name}</p>
                <span className={`rounded-full px-3 py-1 text-xs ${levelClass[s.level]}`}>
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
