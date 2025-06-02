'use client';

import ResponsiveBlogGrid from '@/components/blog/responsive-blog-grid';
import { BlogPostProps } from '@/lib/get-content';
import Link from 'next/link';

interface BlogListProps {
  posts: BlogPostProps[];
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Content Section */}
      {posts.length === 0 ? (
        <div className="text-center py-16 px-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Articles Found
            </h3>

            <p className="text-gray-600 mb-8">
              No blog articles are available at the moment. Check back soon for
              new content!
            </p>

            <div className="flex justify-center">
              <Link
                href="/blog/categories"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <ResponsiveBlogGrid
          posts={posts}
          enableFeatured={true}
          enableCompact={false}
          maxFeaturedPosts={1}
        />
      )}
    </div>
  );
}
