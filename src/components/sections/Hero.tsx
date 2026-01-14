"use client";

import Container from "../../components/ui/Container";
import Image from "next/image";
import { motion } from "framer-motion";

function Typewriter({ text }: { text: string }) {
  // simple typewriter sin libs
  const letters = Array.from(text);
  return (
    <span>
      {letters.map((ch, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.03 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="pt-28">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Hola, soy{" "}
            <span className="text-zinc-400">
              <Typewriter text="Tu Nombre" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 max-w-xl text-zinc-600"
          >
            Breve reseña profesional: qué hacés, qué te apasiona y qué tipo de proyectos te gusta construir.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <a
              href="#contacto"
              className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium hover:bg-zinc-100 transition"
            >
              Contactarme
            </a>

            <a
              href="/cv.pdf"
              download
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition"
            >
              Descargar CV
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex gap-3 text-sm text-zinc-500"
          >
            <span>Disponible para prácticas / junior</span>
            <span>•</span>
            <span>Santa Cruz, Bolivia</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="rounded-3xl border border-zinc-200 bg-white shadow-xl p-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/profile.jpg"
                alt="Foto de perfil"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
