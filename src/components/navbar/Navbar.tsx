"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Wrench, FolderGit2, Mail } from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV: NavItem[] = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "acerca", label: "Acerca", icon: User },
  { id: "habilidades", label: "Habilidades", icon: Wrench },
  { id: "proyectos", label: "Proyectos", icon: FolderGit2 },
  { id: "contacto", label: "Contacto", icon: Mail },
];

export default function Navbar() {
  const [active, setActive] = useState<string>("inicio");
  const [elevated, setElevated] = useState(false);

  const ids = useMemo(() => NAV.map((n) => n.id), []);

  // sombra del navbar
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ ScrollSpy robusto: hash + IO + fallback por scroll
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const NAV_OFFSET = 140; // ajusta si tu navbar tapa mucho (120-160 suele estar bien)

    // 1) Si la URL viene con #acerca, #habilidades, etc.
    const setFromHash = () => {
      const raw = window.location.hash.replace("#", "");
      const id = decodeURIComponent(raw);
      if (id && ids.includes(id)) setActive(id);
    };

    // 2) Fallback por scroll (no falla con snap)
    let ticking = false;
    const updateByScroll = () => {
      ticking = false;

      let current = sections[0]?.id ?? "inicio";
      let best = Number.POSITIVE_INFINITY;

      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - NAV_OFFSET);
        if (dist < best) {
          best = dist;
          current = el.id;
        }
      }

      setActive(current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateByScroll);
      }
    };

    // 3) IntersectionObserver (suave, pero no dependemos solo de esto)
    const io = new IntersectionObserver(
      (entries) => {
        // elegimos la sección más visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        root: null,
        // mueve "la zona activa" hacia el centro de pantalla
        rootMargin: `-${NAV_OFFSET}px 0px -55% 0px`,
        threshold: [0.15, 0.3, 0.5],
      }
    );

    sections.forEach((el) => io.observe(el));

    // inicial
    setFromHash();
    updateByScroll();

    // listeners
    window.addEventListener("hashchange", setFromHash);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("hashchange", setFromHash);
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  const activeIndex = Math.max(0, NAV.findIndex((n) => n.id === active));

  function goTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    // set activo inmediatamente para que no se “quede” en otro
    setActive(id);

    // actualiza hash sin “brincos”
    history.replaceState(null, "", `#${id}`);

    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4">
      <div
        className={[
          "relative w-full max-w-3xl rounded-3xl border",
          "bg-white/10 backdrop-blur-xl",
          elevated
            ? "border-white/20 shadow-[0_18px_60px_rgba(0,0,0,0.55)]"
            : "border-white/10",
        ].join(" ")}
      >
        {/* highlight del item activo */}
        <motion.div
          className="absolute top-2 h-12 rounded-2xl bg-white/10"
          initial={false}
          animate={{
            left: `${(100 / NAV.length) * activeIndex}%`,
            width: `${100 / NAV.length}%`,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        />

        <nav className="relative flex items-center justify-between px-2 py-2">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === active;

            return (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className={[
                  "relative flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-3",
                  "text-sm transition",
                  isActive ? "text-white" : "text-white/70 hover:text-white",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
