This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
aaa



"use client";

import Container from "../../components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Braces, Database, Server, Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";

type Level = "Básico" | "Intermedio" | "Avanzado";

type Skill = {
  name: string;
  level: Level;
  category: "Frontend" | "Backend" | "DB & Tools";
  proof?: string;
  iconKey: string; // 
};

const SKILLS: Skill[] = [
  // Frontend
  { name: "Next.js", level: "Intermedio", category: "Frontend", iconKey: "nextjs" },
  { name: "React", level: "Intermedio", category: "Frontend", iconKey: "react" },
  { name: "Tailwind CSS", level: "Intermedio", category: "Frontend", iconKey: "tailwind" },
  { name: "HTML5", level: "Intermedio", category: "Frontend", iconKey: "html" },
  { name: "CSS3", level: "Intermedio", category: "Frontend", iconKey: "css" },
  { name: "JavaScript", level: "Intermedio", category: "Frontend", iconKey: "js" },

  // Backend
  { name: "NestJS", level: "Intermedio", category: "Backend", iconKey: "nestjs" },
  { name: "Prisma", level: "Intermedio", category: "Backend", iconKey: "prisma" },
  { name: "Laravel", level: "Básico", category: "Backend", iconKey: "laravel" },
  { name: "PHP", level: "Básico", category: "Backend", iconKey: "php" },

  // DB & Tools
  { name: "PostgreSQL", level: "Intermedio", category: "DB & Tools", iconKey: "postgres" },
  { name: "MySQL", level: "Avanzado", category: "DB & Tools", iconKey: "mysql" },
  { name: "Git", level: "Intermedio", category: "DB & Tools", iconKey: "git" },
  { name: "GitHub", level: "Intermedio", category: "DB & Tools", iconKey: "github" },
  { name: "C#", level: "Intermedio", category: "DB & Tools", iconKey: "cs" },
];

const CATEGORIES = [
  { key: "Todos" as const, label: "Todos", icon: Sparkles },
  { key: "Frontend" as const, label: "Frontend", icon: Braces },
  { key: "Backend" as const, label: "Backend", icon: Server },
  { key: "DB & Tools" as const, label: "BD & Herramientas", icon: Database },
];

function levelStyles(level: Level) {
  if (level === "Avanzado") return "border-emerald-300/25 bg-emerald-400/15 text-emerald-200";
  if (level === "Intermedio") return "border-sky-300/25 bg-sky-400/15 text-sky-200";
  return "border-white/10 bg-white/5 text-white/70";
}

function cardGlow(level: Level) {
  if (level === "Avanzado") return "from-emerald-400/25 via-transparent to-transparent";
  if (level === "Intermedio") return "from-sky-400/25 via-transparent to-transparent";
  return "from-white/10 via-transparent to-transparent";
}

function safePlay(audio: HTMLAudioElement | null) {
  if (!audio) return;
  try {
    // evita que se "apile" el sonido
    audio.currentTime = 0;
    void audio.play();
  } catch {
    // si el navegador bloquea autoplay, no rompemos nada
  }
}

export default function TechStack() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]["key"]>("Todos");

  //  audio hover
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);

  const filtered = useMemo(() => {
    if (active === "Todos") return SKILLS;
    return SKILLS.filter((s) => s.category === active);
  }, [active]);

  return (
    <section id="habilidades" className="relative bg-black min-h-[100dvh] snap-start scroll-mt-[120px] pt-24 pb-24">
      {/*  audio (opcional) */}
      <audio ref={hoverAudioRef} src="/sfx/hover.mp3" preload="auto" />

      <Container>
        {/* Header */}
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-white">Habilidades técnicas</h2>
          <p className="max-w-2xl text-white/70">
            Tecnologías que uso y mi nivel actual.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const Icon = c.icon;
            const isActive = active === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={[
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
                  isActive
                    ? "border-white/25 bg-white/10 text-white"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:bg-white/10",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((s) => (
              <motion.article
                key={s.name}
                layout
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -4, scale: 1.01 }}
                onMouseEnter={() => safePlay(hoverAudioRef.current)}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 hover:border-white/20 hover:bg-white/10"
              >
                {/* glow */}
                <div
                  className={[
                    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    "bg-gradient-to-br",
                    cardGlow(s.level),
                  ].join(" ")}
                />

                
                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                      <img
                        alt={s.name}
                        className="h-7 w-7"
                        src={`https://skillicons.dev/icons?i=${s.iconKey}`}
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold text-white">{s.name}</p>
                      <p className="mt-1 text-xs text-white/50">{s.category}</p>
                    </div>
                  </div>

                  <span
                    className={[
                      "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium",
                      levelStyles(s.level),
                    ].join(" ")}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {s.level}
                  </span>
                </div>

                {s.proof ? (
                  <a
                    href={s.proof}
                    target="_blank"
                    rel="noreferrer"
                    className="relative mt-4 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
                  >
                    Ver evidencia <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}

                {/* línea sutil al hover */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* ❌ Se quitó la banda inferior de iconos */}
      </Container>
    </section>
  );
}
