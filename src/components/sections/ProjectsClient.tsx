// src/components/sections/ProjectsClient.tsx
"use client";

import type { GithubRepo } from "../../lib/github";
import { motion } from "framer-motion";
import { ExternalLink, Github, GitFork, Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import Container from "../../components/ui/Container";

type Props = {
  repos: GithubRepo[];
  pinnedNames: string[];
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("es-BO", { year: "numeric", month: "short", day: "2-digit" });
}

export default function ProjectsClient({ repos, pinnedNames }: Props) {
  const [q, setQ] = useState("");
  const [lang, setLang] = useState<string>("Todos");

  const languages = useMemo(() => {
    const set = new Set<string>();
    repos.forEach((r) => r.language && set.add(r.language));
    return ["Todos", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [repos]);

  const pinned = useMemo(() => {
    const pinnedSet = new Set(pinnedNames);
    return repos.filter((r) => pinnedSet.has(r.name));
  }, [repos, pinnedNames]);

  const rest = useMemo(() => {
    const pinnedSet = new Set(pinnedNames);

    return repos
      .filter((r) => !pinnedSet.has(r.name))
      .filter((r) => {
        const matchesQ =
          q.trim().length === 0 ||
          r.name.toLowerCase().includes(q.toLowerCase()) ||
          (r.description ?? "").toLowerCase().includes(q.toLowerCase());

        const matchesLang = lang === "Todos" || r.language === lang;

        return matchesQ && matchesLang;
      });
  }, [repos, pinnedNames, q, lang]);

  return (
    <Container>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold tracking-tight text-white">Proyectos</h2>
          <p className="max-w-2xl text-white/70">
            Estos proyectos se cargan automáticamente desde mi GitHub (código, lenguajes, updates y stats).
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre o descripción..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-white outline-none placeholder:text-white/40 focus:border-white/25"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-white/70">Lenguaje:</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-white/25"
            >
              {languages.map((l) => (
                <option key={l} value={l} className="bg-zinc-900">
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pinned */}
        {pinned.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-white">Destacados</h3>

            <div className="grid gap-4 md:grid-cols-2">
              {pinned.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} featured />
              ))}
            </div>
          </div>
        )}

        {/* All / filtered */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white">Todos</h3>

          {rest.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
              No hay resultados con esos filtros.
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {rest.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
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
  );
}
