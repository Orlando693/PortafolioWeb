"use client";

import Container from "../../components/ui/Container";
import { motion } from "framer-motion";
import { GraduationCap, Target, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="acerca" className="py-20 text-zinc-50">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold"
        >
          Acerca de mí
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-2 max-w-3xl text-white/70"
        >
          Soy Orlando, estudiante de Ingeniería en Sistemas y desarrollador web. Me
          enfoco en construir interfaces modernas, claras y rápidas. Me gusta
          aprender tecnologías nuevas y convertir ideas en proyectos reales con buena
          estructura y buenas prácticas.
        </motion.p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-zinc-200 bg-white p-5 text-zinc-900 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2">
                <GraduationCap size={18} />
              </div>
              <p className="font-semibold">Formación</p>
            </div>
            <p className="mt-3 text-sm text-zinc-700">
              Ingeniería en Sistemas (en curso). Me interesa el desarrollo frontend,
              UI/UX y proyectos fullstack (cuando sea necesario).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-zinc-200 bg-white p-5 text-zinc-900 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2">
                <Target size={18} />
              </div>
              <p className="font-semibold">Enfoque</p>
            </div>
            <p className="mt-3 text-sm text-zinc-700">
              Interfaces limpias, componentes reutilizables y experiencia de usuario
              clara. Priorizo responsividad y performance.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-zinc-200 bg-white p-5 text-zinc-900 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2">
                <Sparkles size={18} />
              </div>
              <p className="font-semibold">Fortalezas</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Responsable", "Ordenado", "Aprendizaje continuo", "Trabajo en equipo"].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-700"
                  >
                    {t}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
