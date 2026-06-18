import { Metadata } from 'next';
import SectionContainer from '@/components/utils/SectionContainer';
import TitleSectionPageContainer from '@/components/utils/TitleSectionPageContainer';
import AnimationContainer from '@/components/utils/AnimationContainer';
import FeaturedProjects from '@/components/projects/FeaturedProjects';
import ProjectStatsHeader from '@/components/projects/ProjectStatsHeader';
import ActivityCard from '@/components/projects/ActivityCard';
import ContributionsGraph from '@/components/projects/ContributionsGraph';
import TechStackCard from '@/components/projects/TechStackCard';
import { Github, ExternalLink } from 'lucide-react';
import {
  GITHUB_USER_URL,
  getGitHubUserData,
  getGitHubRepos,
  getActiveProjects,
  getTotalStars,
  getTotalForks,
  getLanguageStats,
  getRecentRepos,
  getContributions
} from '@/lib/github-stats';

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
  const [userData, repos, contributions] = await Promise.all([
    getGitHubUserData(),
    getGitHubRepos(),
    getContributions()
  ]);

  const activeProjects = getActiveProjects(repos);
  const totalStars = getTotalStars(repos);
  const totalForks = getTotalForks(repos);
  const languageStats = getLanguageStats(repos);
  const recentRepos = getRecentRepos(repos);

  return (
    <SectionContainer>
      <div className="flex flex-col w-full gap-8">
        {/* Header Section */}
        <div className="relative">
          <TitleSectionPageContainer title="Projects" />
          <ProjectStatsHeader
            activeProjects={activeProjects}
            totalStars={totalStars}
            totalForks={totalForks}
            userData={userData}
          />
        </div>

        {/* Contribution Graph */}
        {contributions && (
          <AnimationContainer customClassName="w-full">
            <ContributionsGraph data={contributions} />
          </AnimationContainer>
        )}

        {/* Recent Activity */}
        {recentRepos.length > 0 && (
          <AnimationContainer customClassName="w-full">
            <ActivityCard repos={recentRepos} />
          </AnimationContainer>
        )}

        {/* GitHub-style Tech Stack Section */}
        <AnimationContainer customClassName="w-full">
          <TechStackCard languageStats={languageStats} />
        </AnimationContainer>

        {/* Projects Section */}
        <div className="space-y-16">
          <FeaturedProjects />
        </div>

        {/* GitHub Repository Link */}
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
                href={GITHUB_USER_URL}
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
