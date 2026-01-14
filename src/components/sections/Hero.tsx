"use client";

import Container from "../../components/ui/Container";
import Image from "next/image";
import { motion } from "framer-motion";

function Typewriter({ text }: { text: string }) {
  const letters = Array.from(text);

  return (
    <span>
      {letters.map((ch, idx) => (
        <motion.span
          key={`${ch}-${idx}`}
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
  const nombre = "Orlando";
  const titulo = "FullStack Developer";
  const descripcion =
    "Soy estudiante de Ingeniería en Informática y desarrollador web. Me apasiona crear interfaces modernas, aprender tecnologías nuevas y convertir ideas en proyectos reales.";

  return (
    <section id="inicio" className="relative pt-28 text-zinc-50">
      {/* Fondo suave */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),transparent_55%)]" />

      <Container className="grid items-center gap-10 lg:grid-cols-2">
        {/* Texto */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white shadow-sm backdrop-blur"
          >
            {titulo}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Hola, soy{" "}
            <span className="text-white/70">
              <Typewriter text={nombre} />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 max-w-xl text-white/70"
          >
            {descripcion}
          </motion.p>

          {/* Botones (arreglados para que se vean en fondo oscuro) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <a
              href="#contacto"
              className="rounded-full border border-white/25 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Contactarme
            </a>

            <a
              href="/cv.pdf"
              download
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Descargar CV
            </a>
          </motion.div>

          {/* Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-8 flex flex-wrap gap-2 text-sm"
          >
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/80">
              Disponible para prácticas / junior
            </span>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/80">
              Santa Cruz, Bolivia
            </span>
          </motion.div>
        </div>

        {/* Foto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="rounded-3xl border border-white/15 bg-white p-4 shadow-xl">
            <div className="relative aspect-square overflow-hidden rounded-2xl">
              <Image
                src="/Perfil.jpg"
                alt="Foto de perfil"
                fill
                className="object-cover"
                priority
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>
          </div>

          <div className="mx-auto mt-4 h-6 w-3/4 rounded-full bg-black/40 blur-xl" />
        </motion.div>
      </Container>
    </section>
  );
}
