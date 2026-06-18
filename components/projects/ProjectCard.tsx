// components/projects/ProjectCard.tsx
import {
  ExternalLink,
  Github,
  Calendar,
  Star,
  ArrowUpRight
} from 'lucide-react';
import { ProjectType } from '@/lib/projects';

interface ProjectCardProps {
  project: ProjectType;
}

// One accent hue per category — used for the badge dot + label.
const CATEGORY_ACCENT: Record<string, { dot: string; text: string }> = {
  web: { dot: 'bg-blue-400', text: 'text-blue-300' },
  backend: { dot: 'bg-emerald-400', text: 'text-emerald-300' },
  blockchain: { dot: 'bg-violet-400', text: 'text-violet-300' },
  mobile: { dot: 'bg-pink-400', text: 'text-pink-300' }
};

const getAccent = (category: string) =>
  CATEGORY_ACCENT[category] || { dot: 'bg-slate-400', text: 'text-slate-300' };

export default function ProjectCard({ project }: ProjectCardProps) {
  const accent = getAccent(project.category);
  const extraTags = project.tags.length - 3;
  const extraTech = project.techStack.length - 4;

  return (
    <div className="group flex h-full min-h-[380px] flex-col rounded-2xl border border-white/[0.08] bg-gray-900/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-gray-900/70">
      {/* Header: category + featured */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.04] px-3 py-1">
          <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`}></span>
          <span
            className={`font-mono text-xs font-medium capitalize tracking-wide ${accent.text}`}
          >
            {project.category}
          </span>
        </span>

        {project.featured && (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-amber-300">
            <Star className="h-3 w-3 fill-current" />
            Featured
          </span>
        )}
      </div>

      {/* Tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/[0.03] px-2 py-0.5 font-mono text-xs text-gray-400"
          >
            #{tag}
          </span>
        ))}
        {extraTags > 0 && (
          <span className="rounded-md px-2 py-0.5 font-mono text-xs text-gray-600">
            +{extraTags}
          </span>
        )}
      </div>

      {/* Title + description */}
      <h3 className="mb-2 text-lg font-semibold leading-tight text-gray-50 line-clamp-2 transition-colors group-hover:text-white">
        {project.title}
      </h3>
      <p className="mb-5 flex-grow text-sm leading-relaxed text-gray-400 line-clamp-3">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="mb-5">
        <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-gray-500">
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-xs text-gray-300"
            >
              {tech}
            </span>
          ))}
          {extraTech > 0 && (
            <span className="rounded-md px-2 py-1 text-xs text-gray-600">
              +{extraTech} more
            </span>
          )}
        </div>
      </div>

      {/* Footer: date + actions */}
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-gray-500">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(project.completedAt).toLocaleDateString('en-US', {
            month: 'short',
            year: '2-digit'
          })}
        </span>

        <div className="flex gap-2">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              <Github className="h-3.5 w-3.5" />
              Code
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group/live inline-flex items-center gap-1.5 rounded-lg border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-200 transition-colors hover:bg-blue-400/20 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
