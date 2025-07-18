'use client';

import { BlogPostProps } from '@/lib/get-content';
import BlogCard from './blog-card';
import { ReactNode } from 'react';

interface BlogCardContainerProps {
  posts: BlogPostProps[];
  layout?: 'grid' | 'masonry' | 'list' | 'featured-grid' | 'mixed';
  columns?: 1 | 2 | 3 | 4;
  showStats?: boolean;
  showActions?: boolean;
  className?: string;
  emptyState?: ReactNode;
  maxPosts?: number;
  staggerAnimation?: boolean;
}

export default function BlogCardContainer({
  posts,
  layout = 'grid',
  columns = 3,
  showStats = true,
  showActions = true,
  className = '',
  emptyState,
  maxPosts,
  staggerAnimation = true
}: BlogCardContainerProps) {
  const displayPosts = maxPosts ? posts.slice(0, maxPosts) : posts;

  if (displayPosts.length === 0) {
    return (
      emptyState || (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            No posts found
          </h3>
          <p className="text-gray-500 max-w-md">
            There are no blog posts to display at the moment. Check back later
            for new content.
          </p>
        </div>
      )
    );
  }

  // Layout configurations
  const layoutConfigs = {
    grid: {
      container: `grid gap-6 lg:gap-8 ${
        columns === 1
          ? 'grid-cols-1'
          : columns === 2
            ? 'grid-cols-1 md:grid-cols-2'
            : columns === 3
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`,
      cardVariant: 'default' as const
    },
    masonry: {
      container: `columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8 space-y-0`,
      cardVariant: 'masonry' as const
    },
    list: {
      container: 'flex flex-col gap-6 lg:gap-8',
      cardVariant: 'horizontal' as const
    },
    'featured-grid': {
      container:
        'grid gap-6 lg:gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3',
      cardVariant: 'default' as const
    },
    mixed: {
      container:
        'grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      cardVariant: 'default' as const
    }
  };

  const config = layoutConfigs[layout];

  // Mixed layout: First post featured, rest in grid
  if (layout === 'mixed' && displayPosts.length > 0) {
    return (
      <div className={`space-y-8 ${className}`}>
        {/* Featured first post */}
        <BlogCard
          post={displayPosts[0]}
          variant="featured"
          priority
          showStats={showStats}
          showActions={showActions}
          index={0}
          animateOnHover={staggerAnimation}
        />

        {/* Rest of posts in grid */}
        {displayPosts.length > 1 && (
          <div className="grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {displayPosts.slice(1).map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                variant="default"
                showStats={showStats}
                showActions={showActions}
                index={staggerAnimation ? index + 1 : 0}
                animateOnHover={staggerAnimation}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Featured grid layout: First post takes 2 columns
  if (layout === 'featured-grid' && displayPosts.length > 0) {
    return (
      <div className={`${config.container} ${className}`}>
        {/* Featured first post */}
        <div className="lg:col-span-2">
          <BlogCard
            post={displayPosts[0]}
            variant="featured"
            priority
            showStats={showStats}
            showActions={showActions}
            index={0}
            animateOnHover={staggerAnimation}
          />
        </div>

        {/* Rest of posts */}
        {displayPosts.slice(1).map((post, index) => (
          <BlogCard
            key={post.slug}
            post={post}
            variant="default"
            showStats={showStats}
            showActions={showActions}
            index={staggerAnimation ? index + 1 : 0}
            animateOnHover={staggerAnimation}
          />
        ))}
      </div>
    );
  }

  // Standard layouts
  return (
    <div className={`${config.container} ${className}`}>
      {displayPosts.map((post, index) => (
        <BlogCard
          key={post.slug}
          post={post}
          variant={config.cardVariant}
          priority={index === 0}
          showStats={showStats}
          showActions={showActions}
          index={staggerAnimation ? index : 0}
          animateOnHover={staggerAnimation}
        />
      ))}
    </div>
  );
}

// Helper component for responsive masonry grid
export function BlogMasonryGrid({
  posts,
  showStats = true,
  showActions = true,
  className = ''
}: {
  posts: BlogPostProps[];
  showStats?: boolean;
  showActions?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-0 ${className}`}
    >
      {posts.map((post, index) => (
        <div key={post.slug} className="break-inside-avoid mb-6">
          <BlogCard
            post={post}
            variant="masonry"
            showStats={showStats}
            showActions={showActions}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}

// Helper component for responsive card grid with auto-fit
export function BlogAutoGrid({
  posts,
  minCardWidth = '320px',
  showStats = true,
  showActions = true,
  className = ''
}: {
  posts: BlogPostProps[];
  minCardWidth?: string;
  showStats?: boolean;
  showActions?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`grid gap-6 lg:gap-8 ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}, 1fr))`
      }}
    >
      {posts.map((post, index) => (
        <BlogCard
          key={post.slug}
          post={post}
          variant="default"
          priority={index === 0}
          showStats={showStats}
          showActions={showActions}
          index={index}
        />
      ))}
    </div>
  );
}
