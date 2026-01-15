"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function ProCard({
  kicker,
  title,
  desc,
  bullets,
  accent,
}: {
  kicker: string
  title: string
  desc: string
  bullets: string[]
  accent: "sky" | "violet" | "slate"
}) {
  const accentConfig = {
    sky: {
      badgeBg: "bg-sky-100",
      badgeDot: "bg-sky-500",
      badgeText: "text-sky-700",
      checkBg: "bg-sky-50",
      checkBorder: "border-sky-200",
      checkIcon: "text-sky-600",
      topAccent: "bg-sky-500",
    },
    violet: {
      badgeBg: "bg-violet-100",
      badgeDot: "bg-violet-500",
      badgeText: "text-violet-700",
      checkBg: "bg-violet-50",
      checkBorder: "border-violet-200",
      checkIcon: "text-violet-600",
      topAccent: "bg-violet-500",
    },
    slate: {
      badgeBg: "bg-slate-100",
      badgeDot: "bg-slate-500",
      badgeText: "text-slate-700",
      checkBg: "bg-slate-50",
      checkBorder: "border-slate-200",
      checkIcon: "text-slate-600",
      topAccent: "bg-slate-400",
    },
  }

  const config = accentConfig[accent]

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl bg-white border border-gray-200 p-8 transition-all duration-300 hover:border-gray-300 hover:shadow-xl shadow-sm"
    >
      <div
        className={`absolute top-0 left-0 right-0 h-1 ${config.topAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="relative">
        <div className={`inline-flex items-center gap-2 rounded-full ${config.badgeBg} px-3 py-1 text-xs`}>
          <span className={`h-2 w-2 rounded-full ${config.badgeDot}`} />
          <span className={config.badgeText}>{kicker}</span>
        </div>

        <h3 className="mt-5 text-xl font-extrabold tracking-tight text-gray-900">{title}</h3>

        <p className="mt-3 text-sm leading-relaxed text-gray-600">{desc}</p>

        <div className="mt-6 space-y-3">
          {bullets.map((b) => (
            <div key={b} className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${config.checkBorder} ${config.checkBg} shadow-sm`}
              >
                <Check className={`h-4 w-4 ${config.checkIcon}`} />
              </div>
              <p className="text-sm leading-relaxed text-gray-700">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  )
}
