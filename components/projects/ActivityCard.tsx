import { Activity, Star } from 'lucide-react';
import { formatRelativeTime, type RecentRepo } from '@/lib/github-stats';

interface ActivityCardProps {
  repos: RecentRepo[];
}

export default function ActivityCard({ repos }: ActivityCardProps) {
  if (repos.length === 0) return null;

  return (
    <div className="bg-gray-900/40 border border-gray-800/60 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800/60 bg-gray-900/60">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-200 flex items-center gap-2">
            <Activity className="w-4 h-4 text-gray-400" />
            Recent Activity
          </h3>
          <span className="text-xs text-gray-500">Latest pushes</span>
        </div>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-800/40">
        {repos.map((repo) => (
          <div
            key={repo.name}
            className="flex items-center justify-between gap-3 px-4 py-2.5"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${repo.color}`}
              ></span>
              <span className="truncate text-sm font-medium text-gray-300">
                {repo.name}
              </span>
              {repo.language && (
                <span className="hidden flex-shrink-0 font-mono text-xs text-gray-500 sm:inline">
                  {repo.language}
                </span>
              )}
            </div>

            <div className="flex flex-shrink-0 items-center gap-3">
              {repo.stars > 0 && (
                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                  <Star className="h-3 w-3" />
                  {repo.stars}
                </span>
              )}
              <span className="font-mono text-xs text-gray-500">
                {formatRelativeTime(repo.pushedAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
