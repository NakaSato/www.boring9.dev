import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github, Calendar, ArrowLeft } from 'lucide-react';
import { getProjectById } from '@/lib/projects';
import SectionContainer from '@/components/utils/SectionContainer';
import AnimationContainer from '@/components/utils/AnimationContainer';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectById(params.id);
  
  if (!project) {
    return {
      title: 'Project Not Found'
    };
  }
  
  return {
    title: `${project.title} | Projects | Boring9 Developer`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Boring9 Developer`,
      description: project.description,
      url: `https://www.boring9.dev/projects/${project.id}`,
      type: 'website',
      images: [
        {
          url: project.image || 'https://www.boring9.dev/images/projects/placeholder.png',
          width: 1200,
          height: 630,
          alt: project.title
        }
      ]
    }
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.id);
  
  if (!project) {
    notFound();
  }
  
  const imagePath = project.image || '/images/projects/placeholder.png';
  
  return (
    <SectionContainer>
      <div className="flex flex-col w-full gap-8">
        <div className="flex items-center justify-between">
          <Link href="/projects" className="flex items-center text-gray-400 hover:text-primary-400 transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            <span>Back to Projects</span>
          </Link>
          
          {project.featured && (
            <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Featured Project
            </span>
          )}
        </div>
        
        <AnimationContainer>
          <h1 className="text-3xl md:text-4xl font-bold text-gradient-primary mb-4">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="flex items-center text-gray-400 text-sm">
              <Calendar size={16} className="mr-1" />
              <span>
                {new Date(project.completedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long'
                })}
              </span>
            </div>
            
            {project.category && (
              <span className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                {project.category}
              </span>
            )}
          </div>
          
          {/* Project Image */}
          <div className="relative w-full h-80 md:h-96 mb-8 rounded-xl overflow-hidden shadow-xl">
            <Image 
              src={imagePath}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3">
              <AnimationContainer customClassName="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Project Overview</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </AnimationContainer>
            </div>
            
            <div className="w-full md:w-1/3">
              <AnimationContainer customClassName="bg-gray-900/70 border border-gray-800/50 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold mb-4 text-white">Project Details</h3>
                
                <div className="space-y-4">
                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span 
                          key={tech} 
                          className="inline-block bg-primary-900/50 text-primary-300 text-xs px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span 
                          key={tag} 
                          className="inline-block bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Links */}
                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex flex-col gap-3">
                      {project.repo && (
                        <a 
                          href={project.repo}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-300 hover:text-white transition-colors"
                        >
                          <Github size={18} className="mr-2" />
                          <span>View Source Code</span>
                        </a>
                      )}
                      
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-300 hover:text-white transition-colors"
                        >
                          <ExternalLink size={18} className="mr-2" />
                          <span>Visit Live Project</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </AnimationContainer>
            </div>
          </div>
        </AnimationContainer>
      </div>
    </SectionContainer>
  );
}
