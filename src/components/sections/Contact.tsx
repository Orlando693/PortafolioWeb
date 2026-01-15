// src/components/sections/Contact.tsx
"use client";

import Container from "../../components/ui/Container";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const CONTACT = {
  email: "Orlandosebastian693@gmail.com",
  github: "https://github.com/Orlando693",
  linkedin: "https://www.linkedin.com/in/orlando693",
};

export default function Contact() {
  return (
    <section id="contacto" className="scroll-mt-28 py-16">
      <Container>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-white">Contacto</h2>
            <p className="max-w-2xl text-white/70">
              Si quieres contactarme por prácticas/junior o colaborar en un proyecto, aquí está todo.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card
              icon={<Mail className="h-5 w-5" />}
              title="Email"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}?subject=Contacto%20desde%20tu%20Portafolio`}
            />
            <Card icon={<Github className="h-5 w-5" />} title="GitHub" value="@Orlando693" href={CONTACT.github} />
            <Card
              icon={<Linkedin className="h-5 w-5" />}
              title="LinkedIn"
              value="in/orlando693"
              href={CONTACT.linkedin}
            />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-white/80">
              Tip: si no quieres formulario (porque no hay backend), lo más pro es usar email + links.
              Luego, si quieres formulario real, podemos conectar Formspree/Resend.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Card({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35 }}
      className="group rounded-3xl border border-white/10 bg-white/5 p-6 hover:border-white/25 hover:bg-white/10"
    >
      <div className="flex items-center gap-3 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-2">{icon}</div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white/90">{title}</p>
          <p className="truncate text-sm text-white/70">{value}</p>
        </div>
        <ExternalLink className="ml-auto h-4 w-4 text-white/50 group-hover:text-white/80" />
      </div>
    </motion.a>
  );
}
