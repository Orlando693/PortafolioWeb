"use client";

import Container from "../../components/ui/Container";
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative bg-black flex min-h-screen items-center pt-32 pb-24"
    >
      {/* Opaco/aurora SOLO en Hero */}
      <div className="pointer-events-none absolute inset-0">
        
      </div>

      {/* ✅ Degradé que mezcla con el negro del About */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-black/70 to-black" />

      <Container>
        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
            >
              FullStack Developer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mt-5 text-5xl font-extrabold tracking-tight text-white sm:text-6xl"
            >
              Hola, soy <span className="text-white/60">Orlando</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.08 }}
              className="mt-3 min-h-[28px] text-base font-semibold text-white/70 sm:text-lg"
            >
              <TypeAnimation
                sequence={[
                  "Siempre motivado a aprender y mejorar.",
                  1700,
                  "",
                  350,
                  "Construyo interfaces modernas, claras y rápidas.",
                  1700,
                  "",
                  350,
                  "Me enfoco en detalles, consistencia y buena UX.",
                  1700,
                  "",
                  350,
                  "Listo para aportar en proyectos reales y desafiantes.",
                  1700,
                  "",
                  350,
                ]}
                speed={50}
                deletionSpeed={70}
                repeat={Infinity}
                cursor
                wrapper="span"
                className="text-white/80"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mt-5 max-w-xl text-white/70"
            >
              Soy estudiante de Ingeniería en Informática y desarrollador web. Me
              apasiona crear interfaces modernas, aprender tecnologías nuevas y
              convertir ideas en proyectos reales.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-white/25 hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                Contactarme
              </a>

              <a
                href="/CV - Moreno Cors Orlando Sebastian.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Descargar CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-7 flex flex-wrap gap-2"
            >
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                Disponible para prácticas / junior
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
                Santa Cruz, Bolivia
              </span>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mx-auto w-full max-w-md"
          >
            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-black">
                <Image
                  src="/Perfil1.jpg"
                  alt="Foto de Orlando"
                  width={900}
                  height={900}
                  priority
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
