'use client';

import { BlogPostProps } from '@/lib/get-content';
import BlogCard from './blog-card';
import { useState, useEffect } from 'react';

interface SmartBlogGridProps {
  posts: BlogPostProps[];
  layout?: 'adaptive' | 'fixed' | 'masonry' | 'stacked';
  minCardWidth?: number;
  maxColumns?: number;
  gap?: number;
  showStats?: boolean;
  showActions?: boolean;
  className?: string;
  enableInfiniteScroll?: boolean;
  postsPerPage?: number;
}

export default function SmartBlogGrid({
  posts,
  layout = 'adaptive',
  minCardWidth = 320,
  maxColumns = 4,
  gap = 24,
  showStats = true,
  showActions = true,
  className = '',
  enableInfiniteScroll = false,
  postsPerPage = 12
}: SmartBlogGridProps) {
  const [displayedPosts, setDisplayedPosts] = useState<BlogPostProps[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  // Initialize displayed posts
  useEffect(() => {
    const initialPosts = enableInfiniteScroll
      ? posts.slice(0, postsPerPage)
      : posts;
    setDisplayedPosts(initialPosts);
    setCurrentPage(1);
  }, [posts, enableInfiniteScroll, postsPerPage]);

  // Responsive container width detection
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('blog-grid-container');
      if (container) {
        setContainerWidth(container.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate optimal columns based on container width
  const calculateColumns = () => {
    if (containerWidth <= 0) return 1;

    const totalGap = gap * (maxColumns - 1);
    const availableWidth = containerWidth - totalGap;
    const possibleColumns = Math.floor(availableWidth / minCardWidth);

    return Math.min(Math.max(possibleColumns, 1), maxColumns);
  };

  const optimalColumns = calculateColumns();

  const hasMorePosts = displayedPosts.length < posts.length;

  // Load more posts for infinite scroll
  const loadMorePosts = () => {
    if (isLoading) return;

    setIsLoading(true);
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const newPosts = posts.slice(startIndex, endIndex);

    setTimeout(() => {
      setDisplayedPosts((prev) => [...prev, ...newPosts]);
      setCurrentPage(nextPage);
      setIsLoading(false);
    }, 500);
  };

  // Infinite scroll observer
  useEffect(() => {
    if (!enableInfiniteScroll || !hasMorePosts) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    const sentinel = document.getElementById('scroll-sentinel');
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableInfiniteScroll, hasMorePosts, isLoading]);

  // Smart layout selection based on content and screen size
  const getSmartLayout = () => {
    if (displayedPosts.length === 1) return 'single';
    if (displayedPosts.length <= 3) return 'small-grid';
    if (optimalColumns >= 3) return 'grid-with-featured';
    return 'simple-grid';
  };

  const smartLayout = layout === 'adaptive' ? getSmartLayout() : layout;

  if (displayedPosts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-32 h-32 mb-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center backdrop-blur-sm border border-gray-700/30">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-700/50 to-gray-800/50" />
        </div>
        <h3 className="text-2xl font-bold text-gray-300 mb-4">
          No Blog Posts Yet
        </h3>
        <p className="text-gray-500 max-w-md text-lg">
          We're working on creating amazing content for you. Check back soon for
          insightful articles and tutorials.
        </p>
      </div>
    );
  }

  return (
    <div id="blog-grid-container" className={className}>
      {/* Single post layout */}
      {smartLayout === 'single' && (
        <div className="max-w-4xl mx-auto">
          <BlogCard
            post={displayedPosts[0]}
            variant="hero"
            priority
            showStats={showStats}
            showActions={showActions}
            index={0}
          />
        </div>
      )}

      {/* Small grid layout (2-3 posts) */}
      {smartLayout === 'small-grid' && (
        <div className="grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayedPosts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              variant={index === 0 ? 'featured' : 'default'}
              priority={index === 0}
              showStats={showStats}
              showActions={showActions}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Grid with featured first post */}
      {smartLayout === 'grid-with-featured' && (
        <div className="space-y-8">
          <BlogCard
            post={displayedPosts[0]}
            variant="featured"
            priority
            showStats={showStats}
            showActions={showActions}
            index={0}
          />

          {displayedPosts.length > 1 && (
            <div
              className="grid gap-6 lg:gap-8"
              style={{
                gridTemplateColumns: `repeat(${optimalColumns}, 1fr)`
              }}
            >
              {displayedPosts.slice(1).map((post, index) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  variant="default"
                  showStats={showStats}
                  showActions={showActions}
                  index={index + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Simple grid layout */}
      {smartLayout === 'simple-grid' && (
        <div
          className="grid gap-6 lg:gap-8"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}px, 1fr))`
          }}
        >
          {displayedPosts.map((post, index) => (
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
      )}

      {/* Masonry layout */}
      {smartLayout === 'masonry' && (
        <div
          className="columns-1 md:columns-2 lg:columns-3 xl:columns-4"
          style={{ columnGap: `${gap}px` }}
        >
          {displayedPosts.map((post, index) => (
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
      )}

      {/* Stacked layout */}
      {smartLayout === 'stacked' && (
        <div className="flex flex-col gap-6 lg:gap-8">
          {displayedPosts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              variant="horizontal"
              priority={index === 0}
              showStats={showStats}
              showActions={showActions}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Fixed grid layout */}
      {smartLayout === 'fixed' && (
        <div className="grid gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedPosts.map((post, index) => (
            <BlogCard
              key={post.slug}
              post={post}
              variant="grid"
              priority={index === 0}
              showStats={showStats}
              showActions={showActions}
              index={index}
            />
          ))}
        </div>
      )}

      {/* Infinite scroll controls */}
      {enableInfiniteScroll && (
        <>
          {hasMorePosts && (
            <div
              id="scroll-sentinel"
              className="flex items-center justify-center py-12"
            >
              {isLoading ? (
                <div className="flex items-center gap-3 text-gray-400">
                  <div className="w-6 h-6 border-2 border-gray-600 border-t-primary-500 rounded-full animate-spin" />
                  <span className="text-sm font-medium">
                    Loading more posts...
                  </span>
                </div>
              ) : (
                <button
                  onClick={loadMorePosts}
                  className="px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-medium hover:from-primary-500 hover:to-purple-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/25"
                >
                  Load More Posts
                </button>
              )}
            </div>
          )}

          {!hasMorePosts && displayedPosts.length > postsPerPage && (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/50">
                <div className="w-2 h-2 bg-primary-500 rounded-full" />
                <p className="text-gray-400 text-sm font-medium">
                  All {posts.length} posts loaded
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Export utility hook for responsive calculations
export function useResponsiveColumns(
  containerWidth: number,
  minCardWidth: number = 320,
  maxColumns: number = 4,
  gap: number = 24
) {
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    if (containerWidth <= 0) return;

    const totalGap = gap * (maxColumns - 1);
    const availableWidth = containerWidth - totalGap;
    const possibleColumns = Math.floor(availableWidth / minCardWidth);
    const actualColumns = Math.min(Math.max(possibleColumns, 1), maxColumns);

    setColumns(actualColumns);
  }, [containerWidth, minCardWidth, maxColumns, gap]);

  return columns;
}
