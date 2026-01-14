"use client";

import Container from "../../components/ui/Container";
import { cn } from "../../lib/cn";
import { Home, User, Briefcase, Wrench, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "acerca", label: "Acerca", icon: User },
  { id: "habilidades", label: "Habilidades", icon: Wrench },
  { id: "proyectos", label: "Proyectos", icon: Briefcase },
  { id: "contacto", label: "Contacto", icon: Mail },
];

export default function Navbar() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.1, 0.2, 0.3] }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="fixed inset-x-0 top-4 z-50">
      <Container className="flex justify-center">
        <nav className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white/70 px-2 py-2 shadow-lg backdrop-blur">
          {items.map((i) => {
            const Icon = i.icon;
            const isActive = active === i.id;
            return (
              <a
                key={i.id}
                href={`#${i.id}`}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-700 hover:bg-zinc-100"
                )}
              >
                <Icon size={16} />
                {i.label}
              </a>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
