'use client';

import { BookOpen, TrendingUp, Clock, Users } from 'lucide-react';
import Link from 'next/link';

interface BlogHeroProps {
  featuredPost?: {
    title: string;
    excerpt: string;
    slug: string;
    category: string;
    date: string;
    readingTime: string;
    coverImage: string;
  };
  stats: {
    totalPosts: number;
    totalCategories: number;
    totalReadTime: string;
    monthlyReaders: string;
  };
}

export default function BlogHero({ featuredPost, stats }: BlogHeroProps) {
  return (
    <div className="relative overflow-hidden mb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-transparent to-purple-900/20 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-6 backdrop-blur-sm">
            <BookOpen className="w-4 h-4" />
            <span>Developer Blog</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-6">
            Code, Learn, Build
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Deep dives into web development.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center group">
            <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stats.totalPosts}
              </div>
              <div className="text-sm text-gray-400">Articles</div>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stats.totalCategories}
              </div>
              <div className="text-sm text-gray-400">Categories</div>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stats.totalReadTime}
              </div>
              <div className="text-sm text-gray-400">Read Time</div>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stats.monthlyReaders}
              </div>
              <div className="text-sm text-gray-400">Monthly Readers</div>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Featured Article
              </h2>
              <p className="text-gray-400">Don't miss our latest deep dive</p>
            </div>

            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block bg-gradient-to-br from-gray-950/95 via-gray-900/90 to-gray-950/95 rounded-2xl overflow-hidden border border-gray-800/50 hover:border-primary-500/50 backdrop-blur-xl transform hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500 shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-lg text-primary-300 text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {featuredPost.date}
                  </span>
                  <span className="text-gray-400 text-sm">
                    • {featuredPost.readingTime}
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary-300 group-hover:to-purple-300 transition-all duration-500">
                  {featuredPost.title}
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 text-primary-400 font-medium group-hover:gap-3 transition-all duration-300">
                    Read Full Article
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
