// components/projects/FeaturedProjects.tsx
import { FolderOpen } from 'lucide-react';
import { getFeaturedProjects } from '@/lib/projects';
import { getGitHubRepos, getRepoStats } from '@/lib/github-stats';
import ProjectCard from './ProjectCard';
import AnimationContainer from '../utils/AnimationContainer';

export default async function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects();

  if (featuredProjects.length === 0) {
    return (
      <AnimationContainer>
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 rounded-full mb-4">
            <FolderOpen className="w-8 h-8 text-gray-500" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            No Featured Projects
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Featured projects will appear here once they are added to the
            portfolio.
          </p>
        </div>
      </AnimationContainer>
    );
  }

  const count = featuredProjects.length;
  const repos = await getGitHubRepos();

  return (
    <section className="mb-12">
      <AnimationContainer>
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg">
            Showcasing my best work and latest innovations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 auto-rows-fr">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              liveStats={
                project.repo ? getRepoStats(repos, project.repo) : null
              }
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {count} featured project{count !== 1 ? 's' : ''} showcased
          </p>
        </div>
      </AnimationContainer>
    </section>
  );
}
