"use client"

import type { GithubRepo } from "../../lib/github"
import Container from "../../components/ui/Container"
import { motion } from "framer-motion"
import { ExternalLink, Github, GitFork, Search, Star, X, ChevronDown, ChevronUp } from "lucide-react"
import { useDeferredValue, useEffect, useMemo, useState } from "react"

type Props = {
  repos: GithubRepo[]
  pinnedNames: string[]
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("es-BO", { year: "numeric", month: "short", day: "2-digit" })
}

export default function ProjectsClient({ repos, pinnedNames }: Props) {
  const [q, setQ] = useState("")
  const deferredQ = useDeferredValue(q)
  const [lang, setLang] = useState<string>("Todos")

  // ✅ para no renderizar una lista gigante
  const PAGE_SIZE = 10
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // ✅ colapsar destacados para ahorrar altura
  const [showPinned, setShowPinned] = useState(true)

  const languages = useMemo(() => {
    const set = new Set<string>()
    repos.forEach((r) => r.language && set.add(r.language))
    return ["Todos", ...Array.from(set).sort((a, b) => a.localeCompare(b))]
  }, [repos])

  const pinned = useMemo(() => {
    const pinnedSet = new Set(pinnedNames)
    return repos.filter((r) => pinnedSet.has(r.name))
  }, [repos, pinnedNames])

  const filteredRest = useMemo(() => {
    const pinnedSet = new Set(pinnedNames)
    const needle = deferredQ.trim().toLowerCase()

    return repos
      .filter((r) => !pinnedSet.has(r.name))
      .filter((r) => {
        const matchesQ =
          needle.length === 0 ||
          r.name.toLowerCase().includes(needle) ||
          (r.description ?? "").toLowerCase().includes(needle)

        const matchesLang = lang === "Todos" || r.language === lang
        return matchesQ && matchesLang
      })
  }, [repos, pinnedNames, deferredQ, lang])

  // ✅ cuando cambias filtro/búsqueda, resetea el paginado
  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [deferredQ, lang])

  const visibleRest = useMemo(() => filteredRest.slice(0, visibleCount), [filteredRest, visibleCount])
  const canLoadMore = filteredRest.length > visibleCount

  return (
    <Container>
      <div className="grid gap-8 sm:gap-14 lg:grid-cols-12 lg:items-start">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.35 }}
          className="lg:col-span-4"
        >
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            Mis proyectos
          </div>

          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-white lg:text-[56px]">
            Proyectos en <span className="text-white/55">código abierto</span>
          </h2>

          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-white/70 sm:text-lg">
            Estos proyectos se cargan automáticamente desde mi GitHub. Código, lenguajes, updates y estadísticas.
          </p>

          
           
        </motion.div>

        {/* RIGHT */}
        <div className="lg:col-span-8">
          {/* ✅ Panel compacto (evita que la página crezca infinito) */}
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
            {/* Header (filtros) */}
            <div className="border-b border-white/10 bg-black/20 p-4 sm:px-7 sm:py-5">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                {/* Search */}
                <div className="relative w-full lg:max-w-md">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Buscar..."
                    autoComplete="off"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-10 text-sm sm:text-base text-white outline-none placeholder:text-white/40 focus:border-white/25"
                  />

                  {q.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={() => setQ("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 p-1 text-white/70 hover:bg-white/10"
                      aria-label="Limpiar búsqueda"
                      title="Limpiar"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Language */}
                <div className="flex items-center justify-between gap-3 lg:justify-start">
                  <span className="text-sm text-white/70 whitespace-nowrap">Lenguaje:</span>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    className="w-full lg:w-auto rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/25"
                  >
                    {languages.map((l) => (
                      <option key={l} value={l} className="bg-zinc-900">
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* contador + reset */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-white/55">
                <span>
                  Mostrando <span className="text-white/80">{Math.min(visibleCount, filteredRest.length)}</span> de{" "}
                  <span className="text-white/80">{filteredRest.length}</span> resultados
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setQ("")
                    setLang("Todos")
                  }}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                >
                  Reset filtros
                </button>
              </div>
            </div>

            {/* ✅ Scroll interno (aquí adentro va TODO: destacados + lista) */}
            <div className="max-h-[72vh] overflow-auto px-5 py-6 sm:px-7">
              {/* Pinned */}
              {pinned.length > 0 && (
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={() => setShowPinned((s) => !s)}
                    className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                  >
                    Destacados ({pinned.length}) {showPinned ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {showPinned && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {pinned.map((repo) => (
                        <ProjectCard key={repo.id} repo={repo} featured />
                      ))}
                    </div>
                  )}

                  <div className="mt-6 h-px w-full bg-white/10" />
                </div>
              )}

              {/* Todos */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Todos</h3>
                {canLoadMore && (
                  <span className="text-xs text-white/55">
                    (Cargados {visibleRest.length} / {filteredRest.length})
                  </span>
                )}
              </div>

              {filteredRest.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35 }}
                  className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70"
                >
                  No hay resultados con esos filtros.
                </motion.div>
              ) : (
                <div className="mt-4 grid gap-4">
                  {visibleRest.map((repo) => (
                    <ProjectCard key={repo.id} repo={repo} />
                  ))}
                </div>
              )}
            </div>

            {/* Footer (Load more) */}
            <div className="border-t border-white/10 bg-black/20 px-5 py-4 sm:px-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-3">
                  {filteredRest.length > 0 && canLoadMore ? (
                    <button
                      type="button"
                      onClick={() => setVisibleCount((v) => Math.min(v + PAGE_SIZE, filteredRest.length))}
                      className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:border-white/30 hover:bg-white/10"
                    >
                      Cargar más
                    </button>
                  ) : (
                    <span className="text-xs text-white/55">
                      {filteredRest.length === 0 ? "—" : ""}
                    </span>
                  )}

                  {filteredRest.length > PAGE_SIZE && (
                    <button
                      type="button"
                      onClick={() => setVisibleCount(filteredRest.length)}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
                    >
                      Mostrar todo
                    </button>
                  )}
                </div>

              
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

function ProjectCard({ repo, featured = false }: { repo: GithubRepo; featured?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35 }}
      className={[
        "rounded-3xl border p-6",
        featured ? "border-white/20 bg-white/10" : "border-white/10 bg-white/5",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className="truncate text-lg font-semibold text-white">{repo.name}</h4>
          <p className="mt-2 line-clamp-2 text-sm text-white/70">{repo.description ?? "—"}</p>
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-white/10 bg-white/5 p-2 text-white/80 hover:border-white/25 hover:bg-white/10"
          aria-label="Ver repositorio en GitHub"
          title="Ver en GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>

      {/* meta */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
        {repo.language && (
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
            {repo.language}
          </span>
        )}

        <span className="flex items-center gap-1">
          <Star className="h-4 w-4" /> {repo.stargazers_count}
        </span>

        <span className="flex items-center gap-1">
          <GitFork className="h-4 w-4" /> {repo.forks_count}
        </span>

        <span className="text-white/50">Último push: {formatDate(repo.pushed_at)}</span>
      </div>

      {/* actions */}
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:border-white/30 hover:bg-white/10"
        >
          Ver código <ExternalLink className="h-4 w-4" />
        </a>

        {repo.homepage && repo.homepage.trim().length > 0 && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
          >
            Demo <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </motion.article>
  )
}
