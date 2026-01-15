"use client"

import type React from "react"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Home, User, Wrench, FolderGit2, Mail } from "lucide-react"

type NavItem = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const NAV: NavItem[] = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "acerca", label: "Acerca", icon: User },
  { id: "habilidades", label: "Habilidades", icon: Wrench },
  { id: "proyectos", label: "Proyectos", icon: FolderGit2 },
  { id: "contacto", label: "Contacto", icon: Mail },
]

export default function Navbar() {
  const [active, setActive] = useState<string>("inicio")
  const [elevated, setElevated] = useState(false)

  const ids = useMemo(() => NAV.map((n) => n.id), [])

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    if (!sections.length) return

    const NAV_OFFSET = 140

    const setFromHash = () => {
      const raw = window.location.hash.replace("#", "")
      const id = decodeURIComponent(raw)
      if (id && ids.includes(id)) setActive(id)
    }

    let ticking = false
    const updateByScroll = () => {
      ticking = false

      let current = sections[0]?.id ?? "inicio"
      let best = Number.POSITIVE_INFINITY

      for (const el of sections) {
        const rect = el.getBoundingClientRect()
        const dist = Math.abs(rect.top - NAV_OFFSET)
        if (dist < best) {
          best = dist
          current = el.id
        }
      }

      setActive(current)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateByScroll)
      }
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]

        if (visible?.target?.id) setActive(visible.target.id)
      },
      {
        root: null,
        rootMargin: `-${NAV_OFFSET}px 0px -55% 0px`,
        threshold: [0.15, 0.3, 0.5],
      },
    )

    sections.forEach((el) => io.observe(el))

    setFromHash()
    updateByScroll()

    window.addEventListener("hashchange", setFromHash)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      io.disconnect()
      window.removeEventListener("hashchange", setFromHash)
      window.removeEventListener("scroll", onScroll)
    }
  }, [ids])

  const activeIndex = Math.max(
    0,
    NAV.findIndex((n) => n.id === active),
  )

  function goTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return

    setActive(id)
    history.replaceState(null, "", `#${id}`)
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={[
          "relative w-full max-w-3xl rounded-3xl border",
          "bg-black/40 backdrop-blur-xl transition-all duration-300",
          elevated
            ? "border-white/20 shadow-[0_20px_70px_rgba(0,0,0,0.6)]"
            : "border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)]",
        ].join(" ")}
      >
        <motion.div
          className="absolute top-2 h-12 rounded-2xl bg-white/15"
          initial={false}
          animate={{
            left: `${(100 / NAV.length) * activeIndex}%`,
            width: `${100 / NAV.length}%`,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        />

        <nav className="relative flex items-center justify-between px-2 py-2">
          {NAV.map((item) => {
            const Icon = item.icon
            const isActive = item.id === active

            return (
              <motion.button
                key={item.id}
                onClick={() => goTo(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={[
                  "relative flex flex-1 items-center justify-center gap-2 rounded-2xl px-3 py-3",
                  "text-sm transition-colors",
                  isActive ? "text-white" : "text-white/60 hover:text-white/90",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </motion.button>
            )
          })}
        </nav>
      </motion.div>
    </div>
  )
}
