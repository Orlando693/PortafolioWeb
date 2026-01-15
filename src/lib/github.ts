// src/lib/github.ts
export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  archived: boolean;
  fork: boolean;
  pushed_at: string;
  updated_at: string;
};

export async function getPublicRepos(username: string): Promise<GithubRepo[]> {
  const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
    },
    // Revalida cada 1 hora (así no te bloqueas por rate limit tan fácil)
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) return [];

  const data = (await res.json()) as GithubRepo[];

  return data
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
}
