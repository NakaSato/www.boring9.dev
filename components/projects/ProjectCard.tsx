// components/projects/ProjectCard.tsx
import {
  ExternalLink,
  Github,
  Calendar,
  Code2,
  Star,
  ArrowUpRight
} from 'lucide-react';
import { ProjectType } from '@/lib/projects';

interface ProjectCardProps {
  project: ProjectType;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'web':
        return 'from-blue-500 to-cyan-500';
      case 'backend':
        return 'from-green-500 to-emerald-500';
      case 'blockchain':
        return 'from-purple-500 to-violet-500';
      case 'mobile':
        return 'from-pink-500 to-rose-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="group relative flex flex-col bg-gradient-to-br from-white/[0.03] to-white/[0.01] backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/[0.1] h-full min-h-[350px] max-h-[420px] hover:shadow-[0_20px_40px_0_rgba(0,0,0,0.4)] hover:border-white/[0.15] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getCategoryGradient(project.category)} opacity-[0.02] group-hover:opacity-[0.04] transition-opacity duration-500`}
      ></div>

      {/* Header */}
      <div className="relative p-5 pb-4">
        <div className="flex items-start justify-between mb-4">
          {/* Modern Category badge */}
          <div
            className={`group/badge relative flex items-center gap-2.5 bg-gradient-to-r ${getCategoryGradient(project.category)} bg-opacity-15 backdrop-blur-xl text-white text-xs font-bold px-4 py-2 rounded-2xl border border-white/10 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden`}
          >
            {/* Animated background overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient(project.category)} opacity-0 group-hover/badge:opacity-20 transition-opacity duration-300`}
            ></div>

            {/* Glowing dot */}
            <div className="relative flex items-center justify-center">
              <div
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${getCategoryGradient(project.category)} shadow-lg`}
              ></div>
              <div
                className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${getCategoryGradient(project.category)} animate-ping opacity-75`}
              ></div>
            </div>

            <span className="relative capitalize font-mono text-xs tracking-wider font-bold">
              {project.category}
            </span>
          </div>

          {/* Modern Featured badge */}
          {project.featured && (
            <div className="relative group/featured">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 rounded-2xl blur-sm opacity-75 group-hover/featured:opacity-100 transition duration-300"></div>

              <div className="relative flex items-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-xs font-black px-4 py-2 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <Star className="w-3.5 h-3.5 fill-current animate-pulse" />
                <span className="tracking-wider text-xs font-black">
                  FEATURED
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modern Tag pills */}
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag, index) => (
            <span
              key={tag}
              className="group/tag relative inline-flex items-center bg-gradient-to-r from-white/[0.08] to-white/[0.04] text-gray-200 text-xs font-semibold px-3 py-1.5 rounded-xl border border-white/[0.08] backdrop-blur-xl hover:bg-gradient-to-r hover:from-white/[0.15] hover:to-white/[0.08] hover:border-white/[0.15] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Subtle shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover/tag:translate-x-[100%] transition-transform duration-700"></div>

              <span className="relative">#{tag}</span>
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-flex items-center bg-gradient-to-r from-white/[0.04] to-white/[0.02] text-gray-400 text-xs font-medium px-3 py-1.5 rounded-xl border border-white/[0.04] backdrop-blur-xl hover:bg-white/[0.08] hover:text-gray-300 transition-all duration-300">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="flex flex-col flex-grow px-5 pb-5 relative z-10">
        {/* Enhanced Title */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white leading-tight tracking-tight font-inter line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {project.title}
          </h3>
        </div>

        {/* Enhanced Description */}
        <p className="text-gray-300/95 text-sm leading-relaxed line-clamp-3 flex-grow mb-4 font-light tracking-wide group-hover:text-gray-200 transition-colors duration-300">
          {project.description}
        </p>

        {/* Modern Tech stack */}
        <div className="mb-4">
          <div className="flex items-center gap-2.5 text-gray-400 text-xs font-medium mb-3">
            <div className="relative p-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg shadow-lg">
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg animate-pulse"></div>
            </div>
            <span className="font-mono uppercase tracking-wider font-bold text-gray-300">
              Tech Stack
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech, index) => (
              <span
                key={tech}
                className="group/tech relative inline-flex items-center justify-center bg-gradient-to-r from-blue-500/12 via-purple-500/12 to-pink-500/12 text-gray-200 text-xs font-bold px-3 py-2 rounded-xl border border-white/[0.06] backdrop-blur-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-blue-500/20 hover:via-purple-500/20 hover:to-pink-500/20 hover:border-white/[0.12] transition-all duration-300 overflow-hidden"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Tech badge shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover/tech:translate-x-[100%] transition-transform duration-500"></div>

                <span className="relative">{tech}</span>
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="inline-flex items-center justify-center bg-gradient-to-r from-white/[0.04] to-white/[0.02] text-gray-400 text-xs font-medium px-3 py-2 rounded-xl border border-white/[0.04] hover:bg-white/[0.08] hover:text-gray-300 transition-all duration-300">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.08]">
          {/* Enhanced Date display */}
          <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
            <div className="p-1 bg-white/[0.08] rounded-lg backdrop-blur-sm">
              <Calendar className="w-3 h-3" />
            </div>
            <span className="tracking-wide text-xs font-medium">
              {new Date(project.completedAt).toLocaleDateString('en-US', {
                month: 'short',
                year: '2-digit'
              })}
            </span>
          </div>

          {/* Enhanced Action buttons */}
          <div className="flex gap-2">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 text-gray-400 bg-white/[0.08] rounded-xl border border-white/[0.1] backdrop-blur-sm hover:bg-white/[0.15] hover:text-white hover:border-white/[0.2] transition-all duration-300 hover:scale-110"
                title="View source code"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 text-gray-400 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 rounded-xl border border-white/[0.1] backdrop-blur-sm hover:from-blue-500/25 hover:via-purple-500/25 hover:to-pink-500/25 hover:text-white hover:border-white/[0.2] transition-all duration-300 hover:scale-110 group/btn"
                title="View live project"
              >
                <ArrowUpRight className="w-4 h-4 group-hover/btn:rotate-45 transition-transform duration-300" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
