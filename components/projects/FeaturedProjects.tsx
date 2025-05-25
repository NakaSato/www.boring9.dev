// components/projects/FeaturedProjects.tsx
import { getFeaturedProjects } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import AnimationContainer from '../utils/AnimationContainer';

export default function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects();
  
  if (featuredProjects.length === 0) {
    return null;
  }
  
  return (
    <section className="mb-12">
      <AnimationContainer>
        <h2 className="text-2xl font-bold mb-6 text-gradient-primary">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </AnimationContainer>
    </section>
  );
}
