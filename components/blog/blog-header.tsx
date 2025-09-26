'use client';

import { Clock, Calendar, Check } from 'lucide-react';

interface BlogHeaderProps {
  author: {
    name: string;
    handle: string;
    avatar?: string;
    bio?: string;
  };
  date: string;
  updatedDate?: string;
  readingTime: string;
  title?: string;
  url?: string;
  category?: string;
  tags?: string[];
}

export function BlogHeader({
  author,
  date,
  updatedDate,
  readingTime,
  title,
  url,
  category,
  tags
}: BlogHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative">
      {/* Enhanced Header with gradient background */}
      <div className="bg-gradient-to-br from-gray-950/95 via-gray-900/90 to-gray-950/95 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-4 sm:p-2 mb-4">
        {/* Category Badge */}
        {category && (
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 text-primary-300 border border-primary-500/30 rounded-xl text-sm font-semibold backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-purple-400" />
              {category}
            </span>
          </div>
        )}

        {/* Author and Meta Information */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Author Section */}
          <div className="flex items-start gap-4">
            {/* Author Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500/20 to-purple-500/20 border-2 border-primary-500/30 flex items-center justify-center">
                <span className="text-primary-300 font-bold text-xl">
                  {author.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-1 space-y-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-lg text-white hover:text-primary-300 transition-colors cursor-pointer">
                    {author.name}
                  </h4>
                  <span className="text-gray-400 text-sm font-medium">
                    @{author.handle}
                  </span>
                  {/* Verified badge */}
                  <div className="inline-flex items-center justify-center w-5 h-5 bg-blue-500 rounded-full">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>

                {author.bio && (
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                    {author.bio}
                  </p>
                )}
              </div>

              {/* Author meta */}
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Available for work
                </span>
                <span>•</span>
                <span>Tech enthusiast</span>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <time dateTime={new Date(date).toISOString()}>
                  {formatDate(date)}
                </time>
              </div>

              {updatedDate && (
                <>
                  <span className="text-gray-600">•</span>
                  <span>Updated {formatDate(updatedDate)}</span>
                </>
              )}

              <span className="text-gray-600">•</span>
              <div className="flex items-center gap-2 pr-4">
                <span className="font-medium">{readingTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Meta Information */}
        <div className="sm:hidden mt-6 pt-4 border-t border-gray-800/50">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-400" />
              <time dateTime={new Date(date).toISOString()}>
                {formatDate(date)}
              </time>
            </div>

            {updatedDate && (
              <div className="flex items-center gap-2">
                <span>Updated {formatDate(updatedDate)}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="font-medium">{readingTime}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-800/50">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 text-gray-300 text-xs font-medium rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Gradient overlay effects */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5 rounded-2xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.05),transparent_60%)] rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
