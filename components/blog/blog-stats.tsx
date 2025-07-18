'use client';

import { BookOpen, Clock, Calendar, TrendingUp } from 'lucide-react';

interface BlogStatsProps {
  totalPosts: number;
  totalReadingTime: string;
  lastUpdated: string;
  categories: number;
}

export default function BlogStats({
  totalPosts,
  totalReadingTime,
  lastUpdated,
  categories
}: BlogStatsProps) {
  const stats = [
    {
      icon: BookOpen,
      label: 'Articles',
      value: totalPosts.toString(),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Clock,
      label: 'Reading Time',
      value: totalReadingTime,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Calendar,
      label: 'Last Updated',
      value: lastUpdated,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      label: 'Categories',
      value: categories.toString(),
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;

        return (
          <div
            key={index}
            className="relative group bg-gray-900/30 border border-gray-700/30 rounded-xl p-4 backdrop-blur-sm hover:bg-gray-900/50 transition-all duration-300"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
            />

            <div className="relative">
              <div
                className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r ${stat.gradient} rounded-lg mb-3`}
              >
                <IconComponent className="w-5 h-5 text-white" />
              </div>

              <div className="text-xl font-bold text-white mb-1">
                {stat.value}
              </div>

              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
