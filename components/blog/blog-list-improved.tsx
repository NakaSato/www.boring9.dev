'use client';

import ResponsiveBlogGrid from '@/components/blog/responsive-blog-grid';
import { BlogPostProps } from '@/lib/get-content';
import Link from 'next/link';
import { Search, BookOpen, TrendingUp } from 'lucide-react';

interface BlogListProps {
  posts: BlogPostProps[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="w-full">
      {/* Blog Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-medium mb-6">
          <BookOpen className="w-4 h-4" />
          <span>Latest Articles</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4">
          Tech Insights & Tutorials
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Exploring the latest in web development, IoT solutions, and fintech
          innovations. Learn through practical examples and real-world
          applications.
        </p>
      </div>

      {/* Content Section */}
      {posts.length === 0 ? (
        <div className="text-center py-20 px-6">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700/50">
              <Search className="w-10 h-10 text-gray-500" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              No Articles Found
            </h3>

            <p className="text-gray-400 mb-8 leading-relaxed">
              No blog articles are available at the moment. Check back soon for
              new content, or explore our categories for related topics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog/categories"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
              >
                <TrendingUp className="w-4 h-4" />
                Browse Categories
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg border border-gray-700 transition-all duration-200 hover:scale-105"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <ResponsiveBlogGrid posts={posts} />
      )}
    </div>
  );
}
