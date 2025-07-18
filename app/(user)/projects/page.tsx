import { Metadata } from 'next';
import SectionContainer from '@/components/utils/SectionContainer';
import TitleSectionPageContainer from '@/components/utils/TitleSectionPageContainer';
import AnimationContainer from '@/components/utils/AnimationContainer';
import FeaturedProjects from '@/components/projects/FeaturedProjects';
import { Github, ExternalLink, Code2, Star, GitFork } from 'lucide-react';

// GitHub API types
interface GitHubRepo {
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

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
}

// Fetch GitHub user data
async function getGitHubUserData(): Promise<GitHubUser | null> {
  try {
    const response = await fetch('https://api.github.com/users/NakaSato', {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'boring9-portfolio'
      }
    });

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
async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      'https://api.github.com/users/NakaSato/repos?per_page=100&sort=updated',
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'boring9-portfolio'
        }
      }
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

// Calculate active projects (updated in last 6 months)
function getActiveProjects(repos: GitHubRepo[]): number {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  return repos.filter((repo) => {
    if (repo.archived) return false;
    const lastUpdate = new Date(repo.pushed_at || repo.updated_at);
    return lastUpdate > sixMonthsAgo;
  }).length;
}

// Calculate total stars
function getTotalStars(repos: GitHubRepo[]): number {
  return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
}

// Calculate total forks
function getTotalForks(repos: GitHubRepo[]): number {
  return repos.reduce((total, repo) => total + repo.forks_count, 0);
}

// Calculate language statistics from repositories
function getLanguageStats(
  repos: GitHubRepo[]
): Array<{ name: string; count: number; percentage: number; color: string }> {
  const languageCounts: Record<string, number> = {};
  const languageColors: Record<string, string> = {
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

  // Count languages from repositories
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
      color: languageColors[name] || 'bg-gray-500'
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // Top 6 languages
}

// Get recent activity from repositories
function getRecentActivity(
  repos: GitHubRepo[]
): Array<{ date: string; contributions: number }> {
  const activities: Record<string, number> = {};
  const now = new Date();

  // Generate last 365 days
  for (let i = 364; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    activities[dateStr] = 0;
  }

  // Add contributions based on repository updates
  repos.forEach((repo) => {
    if (!repo.archived && repo.pushed_at) {
      const pushDate = new Date(repo.pushed_at).toISOString().split('T')[0];
      if (activities[pushDate] !== undefined) {
        activities[pushDate] += 1;
      }
    }
  });

  return Object.entries(activities).map(([date, contributions]) => ({
    date,
    contributions
  }));
}

export const metadata: Metadata = {
  title: 'Projects | Boring9 Developer',
  description:
    'View my portfolio of web development and programming projects, including full-stack applications, APIs, and more.',
  openGraph: {
    title: 'Projects | Boring9 Developer',
    description:
      'View my portfolio of web development and programming projects, including full-stack applications, APIs, and more.',
    url: 'https://www.boring9.dev/projects',
    type: 'website',
    images: [
      {
        url: 'https://www.boring9.dev/images/projects/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Projects | Boring9 Developer'
      }
    ]
  }
};

export default async function Projects() {
  const myGithub = 'https://github.com/NakaSato';

  // Fetch GitHub data
  const [userData, repos] = await Promise.all([
    getGitHubUserData(),
    getGitHubRepos()
  ]);

  // Calculate stats
  const activeProjects = getActiveProjects(repos);
  const totalStars = getTotalStars(repos);
  const totalForks = getTotalForks(repos);
  const languageStats = getLanguageStats(repos);
  const recentActivity = getRecentActivity(repos);

  return (
    <SectionContainer>
      <div className="flex flex-col w-full gap-8">
        {/* Enhanced Header Section */}
        <div className="relative">
          <TitleSectionPageContainer title="Projects" />

          {/* Header Stats - Now with real GitHub data */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Code2 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Projects</p>
                <p className="text-xl font-bold text-white">
                  {activeProjects > 0 ? activeProjects : '12+'}
                </p>
                <p className="text-xs text-gray-500">Last 6 months</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Star className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">GitHub Stars</p>
                <p className="text-xl font-bold text-white">
                  {totalStars > 0 ? totalStars : '50+'}
                </p>
                <p className="text-xs text-gray-500">Across all repos</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-xl">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <GitFork className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Forks</p>
                <p className="text-xl font-bold text-white">
                  {totalForks > 0 ? totalForks : '25+'}
                </p>
                <p className="text-xs text-gray-500">Community engagement</p>
              </div>
            </div>
          </div>

          {/* Additional GitHub Stats */}
          {userData && (
            <div className="mt-4 flex flex-wrap gap-3 justify-center">
              <div className="group relative flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-800/40 to-gray-900/60 border border-gray-700/40 rounded-2xl text-sm text-gray-300 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-gray-600/60 hover:scale-105 transition-all duration-300 overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                <span className="relative font-bold text-white">{userData.public_repos}</span>
                <span className="relative text-gray-400">Public Repos</span>
              </div>
              <div className="group relative flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-800/40 to-gray-900/60 border border-gray-700/40 rounded-2xl text-sm text-gray-300 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-gray-600/60 hover:scale-105 transition-all duration-300 overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                <span className="relative font-bold text-white">{userData.followers}</span>
                <span className="relative text-gray-400">Followers</span>
              </div>
              <div className="group relative flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-800/40 to-gray-900/60 border border-gray-700/40 rounded-2xl text-sm text-gray-300 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-gray-600/60 hover:scale-105 transition-all duration-300 overflow-hidden">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                
                <span className="relative font-bold text-white">{userData.following}</span>
                <span className="relative text-gray-400">Following</span>
              </div>
            </div>
          )}
        </div>

        {/* GitHub-style Tech Stack Section */}
        <AnimationContainer customClassName="w-full">
          <div className="bg-gray-900/40 border border-gray-800/60 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-800/60 bg-gray-900/60">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-200 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-gray-400" />
                  Tech Stack
                </h3>
                <span className="text-xs text-gray-500">Languages & Tools</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Languages from GitHub API */}
                <div className="space-y-3">
                  <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Languages
                  </h4>
                  {languageStats.length > 0 ? (
                    <div className="space-y-2">
                      {languageStats.map((lang) => (
                        <div
                          key={lang.name}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <div
                              className={`w-2.5 h-2.5 rounded-full ${lang.color}`}
                            ></div>
                            <span className="text-xs text-gray-300 font-medium">
                              {lang.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${lang.color} transition-all duration-1000 ease-out`}
                                style={{ width: `${lang.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 w-6 text-right">
                              {lang.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {[
                        { name: 'TypeScript', level: 95, color: 'bg-blue-500' },
                        {
                          name: 'JavaScript',
                          level: 98,
                          color: 'bg-yellow-500'
                        },
                        { name: 'Python', level: 85, color: 'bg-green-500' },
                        { name: 'Go', level: 70, color: 'bg-cyan-500' }
                      ].map((lang) => (
                        <div
                          key={lang.name}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <div
                              className={`w-2.5 h-2.5 rounded-full ${lang.color}`}
                            ></div>
                            <span className="text-xs text-gray-300 font-medium">
                              {lang.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${lang.color} transition-all duration-1000 ease-out`}
                                style={{ width: `${lang.level}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 w-6 text-right">
                              {lang.level}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Technologies */}
                <div className="space-y-3">
                  <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'React',
                      'Next.js',
                      'Node.js',
                      'Express',
                      'PostgreSQL',
                      'MongoDB',
                      'Redis',
                      'Docker',
                      'AWS',
                      'Vercel',
                      'Git',
                      'Linux'
                    ].map((tech, index) => (
                      <span
                        key={tech}
                        className="group relative inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-gray-800/60 to-gray-900/80 border border-gray-700/60 rounded-xl text-xs font-bold text-gray-200 backdrop-blur-xl shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-gray-700/70 hover:to-gray-800/90 hover:border-gray-600/70 hover:text-white hover:scale-105 transition-all duration-300 overflow-hidden"
                        style={{
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        {/* Badge shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                        
                        <span className="relative">{tech}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimationContainer>

        {/* Enhanced Projects Section */}
        <div className="space-y-16">
          <FeaturedProjects />
        </div>

        {/* Enhanced GitHub Repository Link */}
        <AnimationContainer customClassName="w-full">
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-3">
                Explore More Projects
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Discover additional projects and contributions on my GitHub
                profile
              </p>
              <a
                href={myGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900/60 to-gray-800/60 border border-gray-700/50 rounded-xl hover:from-gray-800/70 hover:to-gray-700/70 hover:border-gray-600/50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm"
              >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium">
                  View All Repositories
                </span>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-colors duration-300" />
              </a>
            </div>
          </div>
        </AnimationContainer>
      </div>
    </SectionContainer>
  );
}
