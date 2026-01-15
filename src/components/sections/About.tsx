"use client";

import Container from "../../components/ui/Container";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Briefcase } from "lucide-react";

export default function About() {
  return (
    <section
      id="acerca"
      className="relative bg-black min-h-[100dvh] snap-start scroll-mt-[120px] pt-24 pb-16"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
              Acerca de mí
            </div>

            <h2 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Trabajo en{" "}
              <span className="text-white/60">interfaces</span> que se sienten{" "}
              rápidas y modernas.
            </h2>

            <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">
              Soy Orlando, estudiante de Ingeniería en Sistemas y desarrollador web.
              Me enfoco en UI clara, consistencia visual y componentes reutilizables.
              Me gusta aprender tecnologías nuevas y convertir ideas en proyectos reales.
            </p>

            {/* ✅ Antes estaban en columna (y cortaba). Ahora en GRID horizontal */}
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <FactPill
                icon={GraduationCap}
                title="8vo semestre"
                subtitle="En curso"
              />
              <FactPill
                icon={Briefcase}
                title="Prácticas / Jr"
                subtitle="Disponible"
              />
              <FactPill icon={MapPin} title="Santa Cruz" subtitle="Bolivia" />
            </div>
          </motion.div>

          {/* RIGHT */}
          <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2">
            <BentoCard
              className="sm:col-span-2"
              title="Qué hago"
              text="Construyo interfaces modernas con foco en claridad visual, buena estructura y detalles que elevan la experiencia."
              bullets={[
                "Componentes reutilizables",
                "UI consistente y limpia",
                "Animaciones sutiles (sin exceso)",
              ]}
            />

            <BentoCard
              title="Cómo trabajo"
              text='Orden y consistencia antes que “efectos por efecto”. Micro-interacciones rápidas y coherentes.'
              bullets={[
                "Diseño + implementación",
                "Performance y accesibilidad",
                "Git y buenas prácticas",
              ]}
            />

            <BentoCard
              title="En qué estoy hoy"
              text="Proyectos reales con repos públicos para demostrar tecnologías y progreso."
              bullets={[
                "Portafolio (Next + Tailwind)",
                "Repos públicos en GitHub",
                "Mejora continua",
              ]}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- UI ---------- */

function FactPill({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/30">
          <Icon className="h-5 w-5 text-white/80" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-sm text-white/60">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function BentoCard({
  title,
  text,
  bullets,
  className = "",
}: {
  title: string;
  text: string;
  bullets: string[];
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      className={[
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7",
        "hover:border-white/20 hover:bg-white/10 transition",
        className,
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      </div>

      <div className="relative">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{text}</p>

        <ul className="mt-5 space-y-2 text-sm text-white/75">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/60" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
