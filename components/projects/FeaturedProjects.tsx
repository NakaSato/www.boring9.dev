// components/projects/FeaturedProjects.tsx
import { getFeaturedProjects } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import AnimationContainer from '../utils/AnimationContainer';

export default function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects();

  if (featuredProjects.length === 0) {
    return (
      <AnimationContainer>
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800/50 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
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
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="opacity-0"
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.1}s forwards`
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {featuredProjects.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              {featuredProjects.length} featured project
              {featuredProjects.length !== 1 ? 's' : ''} showcased
            </p>
          </div>
        )}
      </AnimationContainer>
    </section>
  );
}
