"use client";

import Container from "../../components/ui/Container";
import { motion } from "framer-motion";
import { Copy, Mail, MapPin, Phone, Github, Linkedin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const email = "tuemail@gmail.com";
  const phone = "+591 00000000";
  const location = "Santa Cruz, Bolivia";

  const github = "https://github.com/tuusuario";
  const linkedin = "https://www.linkedin.com/in/tuusuario/";

  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // si falla clipboard, igual no rompemos nada
      setCopied(false);
    }
  }

  return (
    <section id="contacto" className="py-20 text-zinc-50">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold"
        >
          Contacto
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-2 max-w-3xl text-white/70"
        >
          Podés contactarme por correo o redes. (Esto funciona sin backend).
        </motion.p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {/* Card Email */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2">
                <Mail size={18} />
              </div>
              <p className="font-semibold">Email</p>
            </div>

            <p className="mt-3 text-sm text-zinc-700">{email}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`mailto:${email}?subject=Contacto%20desde%20tu%20portafolio&body=Hola%20Orlando,%20me%20gustar%C3%ADa%20contactarte...`}
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Enviar correo
              </a>

              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
              >
                <Copy size={16} />
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>
          </motion.div>

          {/* Card Teléfono */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2">
                <Phone size={18} />
              </div>
              <p className="font-semibold">Teléfono</p>
            </div>

            <p className="mt-3 text-sm text-zinc-700">{phone}</p>

            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="mt-4 inline-flex w-fit rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
            >
              Llamar
            </a>
          </motion.div>

          {/* Card Ubicación / Redes */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-2">
                <MapPin size={18} />
              </div>
              <p className="font-semibold">Ubicación</p>
            </div>

            <p className="mt-3 text-sm text-zinc-700">{location}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
              >
                <Github size={16} />
                GitHub
              </a>

              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-100"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
