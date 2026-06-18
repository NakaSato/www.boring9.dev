import { Code2 } from 'lucide-react';
import type { LanguageStat } from '@/lib/github-stats';

interface TechStackCardProps {
  languageStats: LanguageStat[];
}

const TECHNOLOGIES = [
  'React',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'Docker',
  'AWS',
  'Vercel',
  'Git',
  'Linux'
];

// Shown when the GitHub API returns no language data.
const FALLBACK_LANGUAGES: LanguageStat[] = [
  { name: 'TypeScript', count: 0, percentage: 95, color: 'bg-blue-500' },
  { name: 'JavaScript', count: 0, percentage: 98, color: 'bg-yellow-500' },
  { name: 'Python', count: 0, percentage: 85, color: 'bg-green-500' },
  { name: 'Go', count: 0, percentage: 70, color: 'bg-cyan-500' }
];

function LanguageRow({ name, percentage, color }: LanguageStat) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 flex-1">
        <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
        <span className="text-xs text-gray-300 font-medium">{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${color} transition-all duration-1000 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-500 w-6 text-right">
          {percentage}%
        </span>
      </div>
    </div>
  );
}

export default function TechStackCard({ languageStats }: TechStackCardProps) {
  const languages =
    languageStats.length > 0 ? languageStats : FALLBACK_LANGUAGES;

  return (
    <div className="bg-gray-900/40 border border-gray-800/60 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800/60 bg-gray-900/60">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-200 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-gray-400" />
            Tech Stack
          </h3>
          <span className="text-xs text-gray-500">Languages & Tools</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Languages */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Languages
            </h4>
            <div className="space-y-2">
              {languages.map((lang) => (
                <LanguageRow key={lang.name} {...lang} />
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wide">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {TECHNOLOGIES.map((tech, index) => (
                <span
                  key={tech}
                  className="group relative inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-gray-800/60 to-gray-900/80 border border-gray-700/60 rounded-xl text-xs font-bold text-gray-200 backdrop-blur-xl shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-gray-700/70 hover:to-gray-800/90 hover:border-gray-600/70 hover:text-white hover:scale-105 transition-all duration-300 overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Badge shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>

                  <span className="relative">{tech}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
