"use client";

import Container from "../../components/ui/Container";
import { skills } from "../../data/skills";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Search, Volume2, VolumeX } from "lucide-react";
import { useMemo, useRef, useState } from "react";

type Category = "Todas" | "Frontend" | "Backend" | "DB & Tools";

const categories: { key: Category; label: string }[] = [
  { key: "Todas", label: "Todas" },
  { key: "Frontend", label: "Frontend" },
  { key: "Backend", label: "Backend" },
  { key: "DB & Tools", label: "BD & Herramientas" },
];

function levelClass(level: string) {
  if (level === "Avanzado") return "border-emerald-300/25 bg-emerald-400/15 text-emerald-200";
  if (level === "Intermedio") return "border-sky-300/25 bg-sky-400/15 text-sky-200";
  return "border-white/10 bg-white/5 text-white/70";
}

function safePlay(audio: HTMLAudioElement | null) {
  if (!audio) return;
  // reinicia y reproduce sin romper si el navegador bloquea
  try {
    audio.currentTime = 0;
    void audio.play();
  } catch {
    // ignoramos
  }
}

export default function Skills() {
  const [active, setActive] = useState<Category>("Todas");
  const [query, setQuery] = useState("");
  const [soundOn, setSoundOn] = useState(false);

  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);
  const clickAudioRef = useRef<HTMLAudioElement | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return skills.filter((s) => {
      const matchCategory = active === "Todas" ? true : s.category === active;
      const matchQuery =
        q.length === 0 ||
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.level.toLowerCase().includes(q);

      return matchCategory && matchQuery;
    });
  }, [active, query]);

  return (
    <section id="habilidades" className="scroll-mt-28 py-16 text-zinc-50">
      {/* audios (opcionales) */}
      <audio ref={hoverAudioRef} src="/sfx/hover.mp3" preload="auto" />
      <audio ref={clickAudioRef} src="/sfx/click.mp3" preload="auto" />

      <Container>
        {/* Header + spotlight */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_45%)]" />
          <div className="relative flex flex-col gap-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  Tecnologías y herramientas
                </h2>
                <p className="mt-2 max-w-2xl text-white/70">
                  Para que sea comprobable, algunas tarjetas incluyen enlaces de evidencia a repos en GitHub.
                  (Además: animaciones + micro-interacciones para presentación.)
                </p>
              </div>

              {/* Toggle sonido */}
              <button
                onClick={() => {
                  setSoundOn((v) => !v);
                  // pequeño feedback
                  if (!soundOn) safePlay(clickAudioRef.current);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:border-white/25 hover:bg-white/10"
                title="Activar/desactivar sonidos"
              >
                {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                Sonido {soundOn ? "ON" : "OFF"}
              </button>
            </div>

            {/* Controls */}
            <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Search */}
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar (Next, Prisma, Git...)"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white outline-none placeholder:text-white/35 focus:border-white/25"
                />
              </div>

              {/* Segmented control */}
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => {
                  const isActive = active === c.key;
                  return (
                    <button
                      key={c.key}
                      onClick={() => {
                        setActive(c.key);
                        if (soundOn) safePlay(clickAudioRef.current);
                      }}
                      className={[
                        "rounded-full border px-4 py-2 text-sm transition",
                        isActive
                          ? "border-white/25 bg-white/10 text-white"
                          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10",
                      ].join(" ")}
                    >
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.06, delayChildren: 0.05 },
            },
          }}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((s) => (
              <SkillCard
                key={`${s.category}-${s.name}`}
                name={s.name}
                icon={s.icon}
                category={s.category}
                level={s.level}
                evidence={s.evidence}
                soundOn={soundOn}
                onHoverSound={() => safePlay(hoverAudioRef.current)}
                onClickSound={() => safePlay(clickAudioRef.current)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer elegante, no repetitivo */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-sm text-white/60">
            Ver mi GitHub:
            <a
              className="ml-2 text-white/80 underline underline-offset-4 hover:text-white"
              href="https://github.com/Orlando693"
              target="_blank"
              rel="noreferrer"
            >
              github.com/Orlando693
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

function SkillCard(props: {
  name: string;
  icon: string;
  category: string;
  level: string;
  evidence?: { label: string; url: string }[];
  soundOn: boolean;
  onHoverSound: () => void;
  onClickSound: () => void;
}) {
  const { name, icon, category, level, evidence, soundOn, onHoverSound, onClickSound } = props;

  // Tilt simple (sin libs)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const ry = (px - 0.5) * 10; // -5..5
    const rx = (0.5 - py) * 10; // -5..5
    setTilt({ rx, ry });
  }

  function onLeave() {
    setTilt({ rx: 0, ry: 0 });
  }

  return (
    <motion.article
      layout
      variants={{
        hidden: { opacity: 0, y: 14, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1 },
      }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.22 }}
      whileHover={{ y: -4, scale: 1.01 }}
      onMouseEnter={() => soundOn && onHoverSound()}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 hover:border-white/20 hover:bg-white/10"
    >
      {/* Shine / brillo dinámico */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <img alt={name} className="h-7 w-7" src={`https://skillicons.dev/icons?i=${icon}`} />
          </div>

          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-white">{name}</p>
            <p className="text-xs text-white/50">{category}</p>
          </div>
        </div>

        <span
          className={[
            "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
            levelClass(level),
          ].join(" ")}
        >
          {level}
        </span>
      </div>

      {/* Evidencia: aparece más en hover (dinámico) */}
      <div className="relative mt-4">
        {evidence?.length ? (
          <>
            <p className="text-xs text-white/50">Evidencia</p>

            <div className="mt-2 flex flex-wrap gap-2">
              {evidence.slice(0, 3).map((ev) => (
                <a
                  key={ev.url}
                  href={ev.url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundOn && onClickSound()}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:border-white/25 hover:bg-white/10"
                >
                  <Github className="h-4 w-4" />
                  {ev.label}
                  <ExternalLink className="h-3.5 w-3.5 text-white/60" />
                </a>
              ))}
            </div>
          </>
        ) : (
          <p className="text-xs text-white/45">
            (Podemos agregar evidencia específica a repos reales)
          </p>
        )}
      </div>

      {/* Línea inferior sutil */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.article>
  );
}
