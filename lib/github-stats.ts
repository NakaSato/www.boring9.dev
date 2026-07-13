// GitHub stats data layer for the projects page.

const GITHUB_USER = 'NakaSato';
const GITHUB_USER_URL = `https://github.com/${GITHUB_USER}`;

export interface GitHubRepo {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  language: string | null;
  size: number;
  default_branch: string;
}

export interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

export interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

const GITHUB_HEADERS: Record<string, string> = {
  Accept: 'application/vnd.github.v3+json',
  'User-Agent': 'boring9-portfolio'
};
if (process.env.GITHUB_TOKEN) {
  GITHUB_HEADERS.Authorization = `token ${process.env.GITHUB_TOKEN}`;
}

const FETCH_OPTS = {
  next: { revalidate: 3600 }, // Cache for 1 hour
  headers: GITHUB_HEADERS
} as const;

export { GITHUB_USER_URL };

// Fetch GitHub user data
export async function getGitHubUserData(): Promise<GitHubUser | null> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}`,
      FETCH_OPTS
    );

    if (!response.ok) {
      console.warn(
        `GitHub API returned ${response.status}: ${response.statusText}`
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub user data:', error);
    return null;
  }
}

// Fetch GitHub repositories
export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      FETCH_OPTS
    );

    if (!response.ok) {
      console.warn(
        `GitHub API returned ${response.status}: ${response.statusText}`
      );
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

// Active projects (non-archived, pushed in last 6 months)
export function getActiveProjects(repos: GitHubRepo[]): number {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  return repos.filter((repo) => {
    if (repo.archived) return false;
    const lastUpdate = new Date(repo.pushed_at || repo.updated_at);
    return lastUpdate > sixMonthsAgo;
  }).length;
}

export function getTotalStars(repos: GitHubRepo[]): number {
  return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
}

export function getTotalForks(repos: GitHubRepo[]): number {
  return repos.reduce((total, repo) => total + repo.forks_count, 0);
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-500',
  Python: 'bg-green-500',
  Go: 'bg-cyan-500',
  Java: 'bg-red-500',
  Rust: 'bg-orange-500',
  'C++': 'bg-purple-500',
  Shell: 'bg-gray-500',
  HTML: 'bg-orange-400',
  CSS: 'bg-blue-400',
  PHP: 'bg-indigo-500',
  Ruby: 'bg-red-600',
  Swift: 'bg-orange-600',
  Kotlin: 'bg-purple-600',
  Dart: 'bg-blue-600'
};

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4 intensity
}

export interface ContributionData {
  total: number;
  days: ContributionDay[];
}

// Contribution calendar (last year). GitHub REST has no calendar endpoint —
// uses the free, no-auth jogruber contributions API. Returns null on failure
// so the UI can hide the graph gracefully.
export async function getContributions(): Promise<ContributionData | null> {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`,
      { next: { revalidate: 86400 } } // Cache for 1 day
    );

    if (!response.ok) {
      console.warn(
        `Contributions API returned ${response.status}: ${response.statusText}`
      );
      return null;
    }

    const json: { contributions?: ContributionDay[] } = await response.json();
    const days = json.contributions ?? [];
    if (days.length === 0) return null;

    const total = days.reduce((sum, day) => sum + day.count, 0);
    return { total, days };
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return null;
  }
}

export interface RecentRepo {
  name: string;
  pushedAt: string;
  language: string | null;
  stars: number;
  color: string;
}

// Most recently pushed non-archived repos.
export function getRecentRepos(
  repos: GitHubRepo[],
  limit = 5
): RecentRepo[] {
  return repos
    .filter((repo) => !repo.archived && repo.pushed_at)
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    )
    .slice(0, limit)
    .map((repo) => ({
      name: repo.name,
      pushedAt: repo.pushed_at,
      language: repo.language,
      stars: repo.stargazers_count,
      color: (repo.language && LANGUAGE_COLORS[repo.language]) || 'bg-gray-500'
    }));
}

// "3d ago" / "5mo ago" style relative time from an ISO date.
export function formatRelativeTime(iso: string): string {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  const units: Array<[string, number]> = [
    ['y', 31536000],
    ['mo', 2592000],
    ['w', 604800],
    ['d', 86400],
    ['h', 3600],
    ['m', 60]
  ];
  for (const [label, secs] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value}${label} ago`;
  }
  return 'just now';
}

export interface RepoStats {
  stars: number;
  forks: number;
  language: string | null;
  pushedAt: string;
}

// Match a project's repo URL (e.g. github.com/NakaSato/netool) against the
// fetched repo list by name, for live stars/forks/language on project cards.
export function getRepoStats(
  repos: GitHubRepo[],
  repoUrl: string
): RepoStats | null {
  const name = repoUrl.split('/').filter(Boolean).pop();
  if (!name) return null;

  const repo = repos.find((r) => r.name === name);
  if (!repo) return null;

  return {
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    pushedAt: repo.pushed_at
  };
}

// Bytes-per-language for a single repo, e.g. { TypeScript: 48213, CSS: 1022 }.
async function getRepoLanguages(
  repoName: string
): Promise<Record<string, number>> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${repoName}/languages`,
      FETCH_OPTS
    );
    if (!response.ok) return {};
    return await response.json();
  } catch (error) {
    console.error(`Error fetching languages for ${repoName}:`, error);
    return {};
  }
}

// Top 6 languages by total bytes across non-archived repos, with display
// percentage + color. One API call per repo — batched to stay well under
// GitHub's rate limits (5000/hr authenticated via GITHUB_TOKEN, 60/hr not).
export async function getLanguageStats(
  repos: GitHubRepo[]
): Promise<LanguageStat[]> {
  const activeRepos = repos.filter((repo) => !repo.archived && repo.size > 0);

  const BATCH_SIZE = 10;
  const perRepoLanguages: Record<string, number>[] = [];
  for (let i = 0; i < activeRepos.length; i += BATCH_SIZE) {
    const batch = activeRepos.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map((repo) => getRepoLanguages(repo.name))
    );
    perRepoLanguages.push(...results);
  }

  const languageBytes: Record<string, number> = {};
  perRepoLanguages.forEach((languages) => {
    Object.entries(languages).forEach(([name, bytes]) => {
      languageBytes[name] = (languageBytes[name] || 0) + bytes;
    });
  });

  const totalBytes = Object.values(languageBytes).reduce(
    (sum, bytes) => sum + bytes,
    0
  );
  if (totalBytes === 0) return [];

  return Object.entries(languageBytes)
    .map(([name, bytes]) => ({
      name,
      count: bytes,
      percentage: Math.round((bytes / totalBytes) * 100),
      color: LANGUAGE_COLORS[name] || 'bg-gray-500'
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

// Known npm / cargo / nuget dependency names -> display label. Only
// dependencies present in this map surface as a Technology tag — keeps
// lockfile noise (eslint, @types/*, test runners) out of the UI.
const TECH_ALIAS: Record<string, string> = {
  react: 'React',
  'react-dom': 'React',
  next: 'Next.js',
  '@next/third-parties': 'Next.js',
  vite: 'Vite',
  tailwindcss: 'Tailwind CSS',
  '@mui/material': 'Material UI',
  '@radix-ui/react-dialog': 'Radix UI',
  '@radix-ui/react-dropdown-menu': 'Radix UI',
  'chart.js': 'Chart.js',
  'react-chartjs-2': 'Chart.js',
  d3: 'D3.js',
  'framer-motion': 'Framer Motion',
  zustand: 'Zustand',
  redux: 'Redux',
  '@reduxjs/toolkit': 'Redux Toolkit',
  'react-router-dom': 'React Router',
  'react-router': 'React Router',
  'socket.io-client': 'Socket.IO',
  i18next: 'i18next',
  leaflet: 'Leaflet',
  'react-leaflet': 'Leaflet',
  axios: 'Axios',
  // cargo
  'anchor-lang': 'Anchor',
  'anchor-spl': 'Anchor',
  'solana-program': 'Solana',
  'solana-sdk': 'Solana',
  'spl-token': 'SPL Token',
  // nuget (matched by prefix, see matchNugetAlias)
  'microsoft.entityframeworkcore': 'Entity Framework Core',
  'microsoft.aspnetcore.signalr': 'SignalR',
  npgsql: 'PostgreSQL (Npgsql)',
  'system.identitymodel.tokens.jwt': 'JWT'
};

function matchNugetAlias(packageName: string): string | null {
  const lower = packageName.toLowerCase();
  const prefixMatch = Object.keys(TECH_ALIAS).find((key) =>
    lower.startsWith(key)
  );
  return prefixMatch ? TECH_ALIAS[prefixMatch] : null;
}

async function fetchRawFile(
  repoPath: string,
  branch: string,
  path: string
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/${repoPath}/${branch}/${path}`,
      { next: { revalidate: 86400 } } // raw CDN, not subject to api.github.com rate limits
    );
    if (!response.ok) return null;
    return await response.text();
  } catch {
    return null;
  }
}

function parsePackageJsonDeps(text: string): string[] {
  try {
    const json = JSON.parse(text);
    return [
      ...Object.keys(json.dependencies ?? {}),
      ...Object.keys(json.devDependencies ?? {})
    ];
  } catch {
    return [];
  }
}

function parseCargoTomlDeps(text: string): string[] {
  const names: string[] = [];
  let inDepsSection = false;
  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim();
    if (/^\[(dev-|build-)?dependencies/.test(line)) {
      inDepsSection = true;
      continue;
    }
    if (line.startsWith('[')) {
      inDepsSection = false;
      continue;
    }
    if (inDepsSection) {
      const match = line.match(/^([a-zA-Z0-9_-]+)\s*=/);
      if (match) names.push(match[1]);
    }
  }
  return names;
}

function parseCsprojDeps(text: string): string[] {
  const names: string[] = [];
  const regex = /<PackageReference\s+Include="([^"]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text))) names.push(match[1]);
  return names;
}

// Find manifest files (package.json / Cargo.toml / *.csproj) anywhere in the
// repo via a single recursive tree listing. Only called when a root-level
// probe finds nothing — one api.github.com call per repo, worst case.
async function findManifestPaths(
  repoName: string,
  branch: string
): Promise<string[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${repoName}/git/trees/${branch}?recursive=1`,
      FETCH_OPTS
    );
    if (!response.ok) return [];
    const json: { tree?: Array<{ path: string; type: string }> } =
      await response.json();
    return (json.tree ?? [])
      .filter(
        (item) =>
          item.type === 'blob' &&
          !item.path.includes('node_modules') &&
          (item.path.endsWith('package.json') ||
            item.path.endsWith('Cargo.toml') ||
            item.path.endsWith('.csproj'))
      )
      .map((item) => item.path);
  } catch {
    return [];
  }
}

// Detects real frameworks/libs for one repo by reading its package.json,
// Cargo.toml, and/or *.csproj — falls back to a full tree search only when
// root-level files aren't found.
export async function getDetectedTechnologies(
  repo: GitHubRepo
): Promise<string[]> {
  const branch = repo.default_branch || 'main';
  const found = new Set<string>();

  const rootPkg = await fetchRawFile(repo.name, branch, 'package.json');
  const rootCargo = await fetchRawFile(repo.name, branch, 'Cargo.toml');

  if (rootPkg || rootCargo) {
    parsePackageJsonDeps(rootPkg ?? '').forEach((dep) => {
      const label = TECH_ALIAS[dep.toLowerCase()];
      if (label) found.add(label);
    });
    parseCargoTomlDeps(rootCargo ?? '').forEach((dep) => {
      const label = TECH_ALIAS[dep.toLowerCase()];
      if (label) found.add(label);
    });
    return Array.from(found);
  }

  const paths = await findManifestPaths(repo.name, branch);
  for (const path of paths) {
    const text = await fetchRawFile(repo.name, branch, path);
    if (!text) continue;
    if (path.endsWith('package.json')) {
      parsePackageJsonDeps(text).forEach((dep) => {
        const label = TECH_ALIAS[dep.toLowerCase()];
        if (label) found.add(label);
      });
    } else if (path.endsWith('Cargo.toml')) {
      parseCargoTomlDeps(text).forEach((dep) => {
        const label = TECH_ALIAS[dep.toLowerCase()];
        if (label) found.add(label);
      });
    } else if (path.endsWith('.csproj')) {
      parseCsprojDeps(text).forEach((dep) => {
        const label = matchNugetAlias(dep);
        if (label) found.add(label);
      });
    }
  }

  return Array.from(found);
}

// Union of detected technologies across all featured repos, real-data
// replacement for the old hand-curated TECHNOLOGIES list. Matches project
// repo URLs against the fetched repo list by name (same approach as
// getRepoStats) to get each repo's default_branch.
export async function getAllDetectedTechnologies(
  repos: GitHubRepo[],
  projectRepoUrls: string[]
): Promise<string[]> {
  const matched = projectRepoUrls
    .filter(Boolean)
    .map((url) => {
      const name = url.split('/').filter(Boolean).pop();
      return repos.find((r) => r.name === name);
    })
    .filter((repo): repo is GitHubRepo => Boolean(repo));

  const perRepo = await Promise.all(
    matched.map((repo) => getDetectedTechnologies(repo))
  );
  return Array.from(new Set(perRepo.flat()));
}
