// components/projects/ProjectCard.tsx
import { ExternalLink, Github, Calendar, Code2, Star } from 'lucide-react';
import { ProjectType } from '@/lib/projects';

interface ProjectCardProps {
  project: ProjectType;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="relative flex flex-col bg-white/[0.02] backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/[0.08] h-full min-h-[320px] max-h-[380px]">
      {/* Header */}
      <div className="relative p-4 pb-3">
        <div className="flex items-start justify-between mb-3">
          {/* Category badge */}
          <div className="flex items-center gap-1.5 bg-gray-900/40 backdrop-blur-md text-gray-100 text-xs font-medium px-2.5 py-1 rounded-full border border-white/10 shadow-lg">
            <div className="w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
            <span className="capitalize font-mono text-xs">
              {project.category}
            </span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="relative">
              <div className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                <Star className="w-2.5 h-2.5 fill-current" />
                <span className="tracking-wide text-xs">FEATURED</span>
              </div>
            </div>
          )}
        </div>

        {/* Tag pills */}
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={tag}
              className="inline-flex items-center bg-white/[0.05] text-gray-300 text-xs font-medium px-2 py-0.5 rounded-full border border-white/[0.06] backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-flex items-center bg-white/[0.03] text-gray-400 text-xs font-medium px-2 py-0.5 rounded-full border border-white/[0.04]">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-4 pb-4 relative z-10">
        {/* Title */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-white leading-tight tracking-tight font-inter line-clamp-2">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-300/90 text-sm leading-relaxed line-clamp-2 flex-grow mb-3 font-light tracking-wide">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="mb-3">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium mb-2">
            <Code2 className="w-3 h-3 text-blue-400" />
            <span className="font-mono uppercase tracking-wider">Stack</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 4).map((tech, index) => (
              <span
                key={tech}
                className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-gray-300 text-xs font-medium px-2 py-1 rounded-md border border-white/[0.05] backdrop-blur-sm shadow-sm"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="inline-flex items-center justify-center bg-white/[0.03] text-gray-500 text-xs font-medium px-2 py-1 rounded-md border border-white/[0.03]">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.05]">
          {/* Date display */}
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
            <div className="p-0.5 bg-white/[0.05] rounded-md backdrop-blur-sm">
              <Calendar className="w-2.5 h-2.5" />
            </div>
            <span className="tracking-wide text-xs">
              {new Date(project.completedAt).toLocaleDateString('en-US', {
                month: 'short',
                year: '2-digit'
              })}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-1.5">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 text-gray-400 bg-white/[0.05] rounded-lg border border-white/[0.08] backdrop-blur-sm"
                title="View source code"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 text-gray-400 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg border border-white/[0.08] backdrop-blur-sm"
                title="View live project"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
