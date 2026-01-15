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
  const [elevated, setElevated] = useState(false)
  
  // Refs para controlar el estado sin re-renderizados innecesarios
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef<number | null>(null)
  const lastScrollTimeRef = useRef(0)

  const ids = useMemo(() => NAV.map((n) => n.id), [])

  // Controlar elevación del navbar (sombra)
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Función para encontrar la sección más visible actualmente
  const getActiveSection = () => {
    let current = ids[0]
    let bestScore = Number.NEGATIVE_INFINITY
    const viewportHeight = window.innerHeight
    const viewportCenter = viewportHeight / 2

    for (const id of ids) {
      const el = document.getElementById(id)
      if (!el) continue

      const rect = el.getBoundingClientRect()
      
      // Calculamos qué tan cerca está el centro del elemento del centro del viewport
      const elementCenter = rect.top + rect.height / 2
      const distanceToCenter = Math.abs(viewportCenter - elementCenter)
      
      // Score: mientras menor distancia, mayor score (usamos negativo para maximizar)
      const score = -distanceToCenter

      if (score > bestScore) {
        bestScore = score
        current = id
      }
    }
    return current
  }

  // Scroll suave a una sección
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return

    // Bloqueamos detección de scroll mientras animamos
    isScrollingRef.current = true
    setActive(id)
    
    el.scrollIntoView({ behavior: "smooth", block: "center" })

    // Desbloquear después de un tiempo prudente
    if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = window.setTimeout(() => {
      isScrollingRef.current = false
    }, 1000)
  }

  // Effect para manejar el scroll manual (barra de scroll)
  useEffect(() => {
    let ticking = false

    const onScroll = () => {
      if (isScrollingRef.current) return
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const current = getActiveSection()
          if (current) setActive(current)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [ids])

  // Effect CRÍTICO para el comportamiento "Snap" con la rueda
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // Ignorar zoom o scroll horizontal
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

      // PREVENIR SIEMPRE el scroll nativo para tener control total
      e.preventDefault()

      // Debounce por tiempo: si acabamos de hacer scroll, ignorar
      const now = Date.now()
      if (now - lastScrollTimeRef.current < 800) return
      if (isScrollingRef.current) return

      // Umbral mínimo de movimiento para evitar disparos accidentales
      if (Math.abs(e.deltaY) < 10) return

      // Determinar dirección
      const direction = e.deltaY > 0 ? 1 : -1
      
      // Calcular dónde estamos basados en lo que SE VE, no en el estado
      const currentVisibleId = getActiveSection()
      const currentIndex = ids.indexOf(currentVisibleId)
      
      if (currentIndex === -1) return

      // Calcular siguiente índice
      const nextIndex = Math.min(Math.max(currentIndex + direction, 0), ids.length - 1)

      // Si hay cambio, movernos
      if (nextIndex !== currentIndex) {
        lastScrollTimeRef.current = now
        scrollToSection(ids[nextIndex])
      }
    }

    // passive: false es obligatorio para e.preventDefault()
    window.addEventListener("wheel", onWheel, { passive: false })
    
    return () => {
      window.removeEventListener("wheel", onWheel as EventListener)
      if (scrollTimeoutRef.current) window.clearTimeout(scrollTimeoutRef.current)
    }
  }, [ids])

  const activeIndex = Math.max(0, ids.indexOf(active))

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
