'use client';

import { useState, useEffect, useMemo } from 'react';
import BlogCard from '@/components/blog/blog-card';
import { BlogPostProps } from '@/lib/get-content';

interface ResponsiveBlogGridProps {
  posts: BlogPostProps[];
  enableFeatured?: boolean;
  enableCompact?: boolean;
  maxFeaturedPosts?: number;
  enableInfiniteScroll?: boolean;
}

export default function ResponsiveBlogGrid({ 
  posts, 
  enableFeatured = true, 
  enableCompact = false,
  maxFeaturedPosts = 1,
  enableInfiniteScroll = false
}: ResponsiveBlogGridProps) {
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [displayedPosts, setDisplayedPosts] = useState(posts);

  useEffect(() => {
    const updateViewportWidth = () => {
      const width = window.innerWidth;
      setViewportWidth(width);
      setIsMobile(width < 768);
    };

    updateViewportWidth();
    
    // Throttle resize events for better performance
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateViewportWidth, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Memoized layout calculations for better performance
  const layoutConfig = useMemo(() => {
    const getCardVariant = (index: number, totalPosts: number) => {
      // Featured posts logic - only on larger screens
      if (enableFeatured && index < maxFeaturedPosts && totalPosts > 1 && !isMobile) {
        return 'featured';
      }

      // Compact mode for smaller screens with many posts
      if (enableCompact && (isMobile || viewportWidth < 1024) && totalPosts > 6) {
        return 'compact';
      }

      return 'default';
    };

    const getGridColumns = () => {
      if (viewportWidth < 480) return 1;
      if (viewportWidth < 640) return 1;
      if (viewportWidth < 768) return 1;
      if (viewportWidth < 1024) return 2;
      if (viewportWidth < 1280) return 3;
      if (viewportWidth < 1536) return 3;
      if (viewportWidth < 1920) return 4;
      if (viewportWidth < 2560) return 5;
      return 6;
    };

    const getAdaptiveSpacing = () => {
      if (viewportWidth < 480) return 'gap-3';
      if (viewportWidth < 640) return 'gap-4';
      if (viewportWidth < 1024) return 'gap-4 lg:gap-6';
      return 'gap-4 lg:gap-6 xl:gap-8';
    };

    return { getCardVariant, getGridColumns, getAdaptiveSpacing };
  }, [viewportWidth, isMobile, enableFeatured, enableCompact, maxFeaturedPosts]);

  // Intersection Observer for performance monitoring
  useEffect(() => {
    if (!enableInfiniteScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Could implement lazy loading here
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    return () => observer.disconnect();
  }, [enableInfiniteScroll]);

  return (
    <div className={`blog-grid-container w-full`}>
      <div className={`blog-responsive-grid ${layoutConfig.getAdaptiveSpacing()}`}>
        {displayedPosts.map((post, index) => {
          const variant = layoutConfig.getCardVariant(index, posts.length);
          
          return (
            <div
              key={post.slug}
              className={`blog-card-wrapper animate-fade-in-up ${isMobile ? 'blog-card-mobile-optimized' : ''}`}
              style={{
                animationDelay: `${Math.min(index * 0.1, 0.8)}s`,
                animationFillMode: 'both'
              }}
            >
              <BlogCard 
                post={post} 
                variant={variant}
                priority={index < (isMobile ? 1 : 2)}
              />
            </div>
          );
        })}
      </div>
      
      {/* Loading skeleton for infinite scroll */}
      {enableInfiniteScroll && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Skeleton cards would go here */}
        </div>
      )}
    </div>
  );
}
