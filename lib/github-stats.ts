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

const FETCH_OPTS = {
  next: { revalidate: 3600 }, // Cache for 1 hour
  headers: {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'boring9-portfolio'
  }
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

// Top 6 languages by repo count, with display percentage + color
export function getLanguageStats(repos: GitHubRepo[]): LanguageStat[] {
  const languageCounts: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language && !repo.archived) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const totalRepos = Object.values(languageCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  return Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalRepos) * 100),
      color: LANGUAGE_COLORS[name] || 'bg-gray-500'
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}
