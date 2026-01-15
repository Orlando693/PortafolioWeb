"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Home, User, Wrench, FolderGit2, Mail, Briefcase } from "lucide-react"

type NavItem = {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const NAV: NavItem[] = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "acerca", label: "Acerca", icon: User },
  { id: "habilidades", label: "Habilidades", icon: Wrench },
  { id: "experiencia", label: "Experiencia", icon: Briefcase },
  { id: "proyectos", label: "Proyectos", icon: FolderGit2 },
  { id: "contacto", label: "Contacto", icon: Mail },
]

export default function Navbar() {
  const [active, setActive] = useState<string>("inicio")
  const activeRef = useRef(active)
  const [elevated, setElevated] = useState(false)
  const scrollLock = useRef(false)
  const scrollReleaseRef = useRef<number | null>(null)

  useEffect(() => {
    activeRef.current = active
  }, [active])

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

    const setFromHash = () => {
      const raw = window.location.hash.replace("#", "")
      const id = decodeURIComponent(raw)
      if (id && ids.includes(id)) setActive(id)
    }

    let ticking = false
    const updateByScroll = () => {
      ticking = false

      let current = sections[0]?.id ?? "inicio"
      let best = Number.NEGATIVE_INFINITY

      for (const el of sections) {
        const rect = el.getBoundingClientRect()
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
        const score = visibleHeight - Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2)
        if (score > best) {
          best = score
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
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.4, 0.6, 0.8],
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

  useEffect(() => {
    let scrollTimeout: number | null = null

    const onWheel = (e: WheelEvent) => {
      // Bloquear scroll lateral o zoom con Ctrl
      if (e.ctrlKey) return

      // Prevenir el comportamiento por defecto siempre
      // Esto convierte el scroll en un disparador de eventos
      e.preventDefault()

      // Si estamos bloqueados (animando), salimos
      if (scrollLock.current) return

      // Detectar pequeña intención de scroll para evitar disparos accidentales
      // Sensibilidad ajustada
      if (Math.abs(e.deltaY) < 15) return

      // Determinar dirección
      const dir = e.deltaY > 0 ? 1 : -1

      // Calcular la sección activa VISUALMENTE 
      // (no depender del estado React que puede tener lag)
      let currentIndex = 0
      let minDistance = Number.MAX_VALUE
      const viewportCenter = window.innerHeight / 2

      // Buscar qué sección está más cerca del centro de la pantalla
      const currentSections = ids.map(id => document.getElementById(id))
      currentSections.forEach((el, idx) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        // Centro de la sección relativo al viewport
        const elementCenter = rect.top + (rect.height / 2)
        // Distancia absoluta al centro del viewport
        const distance = Math.abs(elementCenter - viewportCenter)
        
        if (distance < minDistance) {
          minDistance = distance
          currentIndex = idx
        }
      })

      // Calcular siguiente índice
      const nextIndex = Math.min(Math.max(currentIndex + dir, 0), ids.length - 1)

      // Si el índice cambia, ejecutamos el scroll
      if (nextIndex !== currentIndex) {
        scrollLock.current = true
        const targetId = ids[nextIndex]
        
        scrollToSection(targetId)

        // Bloqueo temporal para permitir que termine la animación
        if (scrollReleaseRef.current) window.clearTimeout(scrollReleaseRef.current)
        scrollReleaseRef.current = window.setTimeout(() => {
          scrollLock.current = false
        }, 800) // 800ms de espera entre scrolls hace que se sienta responsive pero controlado
      }
    }

    // Usar passive: false es CRÍTICO para poder usar preventDefault
    window.addEventListener("wheel", onWheel, { passive: false })
    
    return () => {
      window.removeEventListener("wheel", onWheel as EventListener)
      if (scrollReleaseRef.current) window.clearTimeout(scrollReleaseRef.current)
      if (scrollTimeout) window.clearTimeout(scrollTimeout)
    }
  }, [ids])

  const activeIndex = Math.max(
    0,
    NAV.findIndex((n) => n.id === active),
  )

  function scrollToSection(id: string) {
    const el = document.getElementById(id)
    if (!el) return

    setActive(id)
    history.replaceState(null, "", `#${id}`)
    el.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <div className="fixed left-0 right-0 top-3 z-50 flex justify-center px-3">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={[
          "relative w-full max-w-4xl overflow-hidden rounded-[18px] border",
          "bg-white transition-all duration-300",
          elevated
            ? "border-black/10 shadow-[0_14px_45px_rgba(0,0,0,0.16)]"
            : "border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute inset-0" />

        <motion.div
          className="absolute top-1.5 h-11 rounded-xl bg-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
          initial={false}
          animate={{
            left: `${(100 / NAV.length) * activeIndex}%`,
            width: `${100 / NAV.length}%`,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
        />

        <nav className="relative flex items-center justify-between gap-1 px-2.5 py-2">
          {NAV.map((item) => {
            const Icon = item.icon
            const isActive = item.id === active

            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={[
                  "relative flex flex-1 items-center justify-center gap-2 rounded-xl px-2.5 py-2",
                  "text-sm font-semibold tracking-tight transition-colors",
                  isActive ? "text-black" : "text-black/50 hover:text-black/80",
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
