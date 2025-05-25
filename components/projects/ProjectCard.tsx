// components/projects/ProjectCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { ProjectType } from '@/lib/projects';

interface ProjectCardProps {
  project: ProjectType;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Use a default image if none is provided
  const imagePath = project.image || '/images/projects/placeholder.png';
  
  return (
    <div className="group flex flex-col bg-gray-900/90 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1 border border-gray-800/50 hover:border-primary-600/30 h-full">
      {/* Project Image */}
      <Link href={`/projects/${project.id}`} className="block relative w-full h-48">
        <div className="absolute inset-0 bg-gray-800 animate-pulse"></div>
        <Image 
          src={imagePath}
          alt={`Screenshot of ${project.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {project.featured && (
          <div className="absolute top-3 right-3 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
            Featured
          </div>
        )}
      </Link>
      
      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        <div className="mb-3">
          {project.tags.map(tag => (
            <span 
              key={tag}
              className="inline-block bg-gray-800 text-xs text-gray-300 mr-2 mb-2 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Link href={`/projects/${project.id}`}>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors duration-300">
            {project.title}
          </h3>
        </Link>
        
        <p className="text-gray-300 mb-4 text-sm line-clamp-3 flex-grow">
          {project.description}
        </p>
        
        {/* Tech stack */}
        <div className="flex flex-wrap gap-1 my-3">
          {project.techStack.map(tech => (
            <span 
              key={tech} 
              className="inline-block bg-primary-900/50 text-primary-300 text-xs px-2 py-1 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Links */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
          <span className="text-xs text-gray-400">
            {new Date(project.completedAt).toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'short'
            })}
          </span>
          
          <div className="flex gap-2">
            {project.repo && (
              <a 
                href={project.repo}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-full transition-colors"
                title="View code on GitHub"
              >
                <Github size={16} />
              </a>
            )}
            
            {project.link && (
              <a 
                href={project.link}
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-full transition-colors"
                title="Visit live project"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
