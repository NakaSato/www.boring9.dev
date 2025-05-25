import Link from 'next/link';
import Image from 'next/image';
import { ProjectType } from '@/lib/projects';
import AnimationContainer from '../utils/AnimationContainer';

interface RelatedProjectsProps {
  currentProjectId: string;
  projects: ProjectType[];
}

export default function RelatedProjects({ currentProjectId, projects }: RelatedProjectsProps) {
  // Filter out current project and limit to 3 related projects
  const relatedProjects = projects
    .filter(project => project.id !== currentProjectId)
    .slice(0, 3);
  
  if (relatedProjects.length === 0) {
    return null;
  }
  
  return (
    <AnimationContainer customClassName="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-gradient-primary">Related Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProjects.map(project => (
          <Link 
            key={project.id} 
            href={`/projects/${project.id}`}
            className="group block bg-gray-900/80 border border-gray-800/50 rounded-lg overflow-hidden hover:border-primary-600/30 transition-all duration-300"
          >
            <div className="relative h-40 w-full">
              <Image
                src={project.image || '/images/projects/placeholder.png'}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-400 text-sm line-clamp-2">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </AnimationContainer>
  );
}
