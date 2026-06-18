import { Code2, Star, GitFork } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { GitHubUser } from '@/lib/github-stats';

interface ProjectStatsHeaderProps {
  activeProjects: number;
  totalStars: number;
  totalForks: number;
  userData: GitHubUser | null;
}

interface StatCard {
  icon: LucideIcon;
  label: string;
  value: number;
  fallback: string;
  caption: string;
  iconColor: string;
  iconBg: string;
  cardBg: string;
  border: string;
}

interface StatPill {
  label: string;
  value: number;
}

export default function ProjectStatsHeader({
  activeProjects,
  totalStars,
  totalForks,
  userData
}: ProjectStatsHeaderProps) {
  const cards: StatCard[] = [
    {
      icon: Code2,
      label: 'Active Projects',
      value: activeProjects,
      fallback: '12+',
      caption: 'Last 6 months',
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/20',
      cardBg: 'from-blue-500/10 to-blue-600/5',
      border: 'border-blue-500/20'
    },
    {
      icon: Star,
      label: 'GitHub Stars',
      value: totalStars,
      fallback: '50+',
      caption: 'Across all repos',
      iconColor: 'text-green-400',
      iconBg: 'bg-green-500/20',
      cardBg: 'from-green-500/10 to-green-600/5',
      border: 'border-green-500/20'
    },
    {
      icon: GitFork,
      label: 'Total Forks',
      value: totalForks,
      fallback: '25+',
      caption: 'Community engagement',
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/20',
      cardBg: 'from-purple-500/10 to-purple-600/5',
      border: 'border-purple-500/20'
    }
  ];

  const pills: StatPill[] = userData
    ? [
        { label: 'Public Repos', value: userData.public_repos },
        { label: 'Followers', value: userData.followers },
        { label: 'Following', value: userData.following }
      ]
    : [];

  return (
    <>
      {/* Header Stats - real GitHub data with sensible fallbacks */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map(
          ({
            icon: Icon,
            label,
            value,
            fallback,
            caption,
            iconColor,
            iconBg,
            cardBg,
            border
          }) => (
            <div
              key={label}
              className={`flex items-center gap-3 p-4 bg-gradient-to-br ${cardBg} border ${border} rounded-xl`}
            >
              <div className={`p-2 ${iconBg} rounded-lg`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-xl font-bold text-white">
                  {value > 0 ? value : fallback}
                </p>
                <p className="text-xs text-gray-500">{caption}</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Additional GitHub Stats */}
      {pills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          {pills.map(({ label, value }) => (
            <div
              key={label}
              className="group relative flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-800/40 to-gray-900/60 border border-gray-700/40 rounded-2xl text-sm text-gray-300 backdrop-blur-xl shadow-lg hover:shadow-xl hover:border-gray-600/60 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

              <span className="relative font-bold text-white">{value}</span>
              <span className="relative text-gray-400">{label}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
