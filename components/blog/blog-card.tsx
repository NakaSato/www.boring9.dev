'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  User,
  ArrowRight,
  Eye,
  Heart,
  Bookmark,
  Share2,
  ExternalLink,
  Tag
} from 'lucide-react';
import { BlogPostProps } from '@/lib/get-content';
import { useState } from 'react';

interface BlogCardProps {
  post: BlogPostProps;
  priority?: boolean;
  variant?:
    | 'default'
    | 'featured'
    | 'compact'
    | 'minimal'
    | 'hero'
    | 'horizontal'
    | 'grid'
    | 'masonry';
  showStats?: boolean;
  showActions?: boolean;
  className?: string;
  index?: number; // For staggered animations
  animateOnHover?: boolean;
}

export default function BlogCard({
  post,
  priority = false,
  variant = 'default',
  showStats = true,
  showActions = true,
  className = '',
  index = 0,
  animateOnHover = true
}: BlogCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Handle bookmark action
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    // TODO: Add actual bookmark logic
  };

  // Handle like action
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    // TODO: Add actual like logic
  };

  // Handle share action
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `/blog/${post.slug}`
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(
        `${window.location.origin}/blog/${post.slug}`
      );
    }
  };

  // Enhanced card variants with better multiple card support
  const cardVariants = {
    default:
      'group relative flex flex-col bg-gradient-to-br from-gray-950/95 via-gray-900/90 to-gray-950/95 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out border border-gray-800/50 hover:border-primary-500/50 backdrop-blur-xl transform hover:-translate-y-2 hover:scale-[1.02] will-change-transform h-full',
    featured:
      'group relative flex flex-col lg:flex-row bg-gradient-to-br from-gray-950/95 via-gray-900/90 to-gray-950/95 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_35px_70px_-15px_rgba(0,0,0,0.8)] transition-all duration-600 ease-out border border-gray-800/50 hover:border-primary-500/50 backdrop-blur-xl transform hover:-translate-y-4 hover:scale-[1.01] will-change-transform col-span-full lg:min-h-[450px]',
    compact:
      'group relative flex flex-row bg-gradient-to-br from-gray-950/95 via-gray-900/90 to-gray-950/95 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-400 ease-out border border-gray-800/50 hover:border-primary-500/50 backdrop-blur-xl transform hover:-translate-y-1 hover:scale-[1.01] will-change-transform h-full',
    minimal:
      'group relative flex flex-col bg-gray-900/50 border border-gray-800/30 rounded-xl overflow-hidden hover:bg-gray-900/70 hover:border-gray-700/50 transition-all duration-300 ease-out h-full',
    hero: 'group relative flex flex-col bg-gradient-to-br from-gray-950/98 via-gray-900/95 to-gray-950/98 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] transition-all duration-700 ease-out border border-gray-800/50 hover:border-primary-500/70 backdrop-blur-xl transform hover:-translate-y-6 hover:scale-[1.03] will-change-transform min-h-[500px]',
    horizontal:
      'group relative flex flex-row bg-gradient-to-r from-gray-950/95 via-gray-900/90 to-gray-950/95 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out border border-gray-800/50 hover:border-primary-500/50 backdrop-blur-xl transform hover:-translate-y-2 hover:scale-[1.01] will-change-transform h-full',
    grid: 'group relative flex flex-col bg-gradient-to-br from-gray-950/95 via-gray-900/90 to-gray-950/95 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.7)] transition-all duration-400 ease-out border border-gray-800/50 hover:border-primary-500/40 backdrop-blur-xl transform hover:-translate-y-1 hover:scale-[1.005] will-change-transform h-full',
    masonry:
      'group relative flex flex-col bg-gradient-to-br from-gray-950/95 via-gray-900/90 to-gray-950/95 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out border border-gray-800/50 hover:border-primary-500/50 backdrop-blur-xl transform hover:-translate-y-2 hover:scale-[1.02] will-change-transform break-inside-avoid mb-6'
  };

  const imageVariants = {
    default:
      'relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80',
    featured:
      'relative w-full lg:w-2/5 xl:w-1/2 aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 shrink-0',
    compact:
      'relative w-32 sm:w-40 aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 shrink-0',
    minimal: 'relative w-full aspect-[16/9] overflow-hidden bg-gray-800/50',
    hero: 'relative w-full aspect-[21/9] sm:aspect-[2/1] overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80',
    horizontal:
      'relative w-2/5 sm:w-1/3 aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80 shrink-0',
    grid: 'relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80',
    masonry:
      'relative w-full overflow-hidden bg-gradient-to-br from-gray-800/80 to-gray-900/80'
  };

  const contentVariants = {
    default: 'flex flex-col flex-1 p-6 sm:p-8',
    featured: 'flex flex-col flex-1 p-6 sm:p-8 lg:p-10 xl:p-12 justify-center',
    compact: 'flex flex-col flex-1 p-4 sm:p-6 justify-center min-w-0',
    minimal: 'flex flex-col flex-1 p-4 sm:p-6',
    hero: 'flex flex-col flex-1 p-8 sm:p-10 lg:p-12 justify-end',
    horizontal: 'flex flex-col flex-1 p-4 sm:p-6 lg:p-8 justify-center min-w-0',
    grid: 'flex flex-col flex-1 p-4 sm:p-6',
    masonry: 'flex flex-col flex-1 p-6 sm:p-8'
  };

  // Dynamic aspect ratio for masonry layout
  const masonryAspectRatio =
    variant === 'masonry'
      ? `aspect-[${Math.floor(Math.random() * 3) + 3}/${Math.floor(Math.random() * 2) + 2}]`
      : '';

  // Animation delay for staggered entrance
  const animationDelay = `${index * 100}ms`;
  const cardStyle = {
    animationDelay,
    animationFillMode: 'both' as const
  };

  return (
    <article
      className={`${cardVariants[variant]} ${className} ${!animateOnHover ? 'hover:transform-none hover:scale-100' : ''}`}
      data-variant={variant}
      style={cardStyle}
    >
      {/* Enhanced gradient background overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-purple-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_60%)]"></div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500/20 via-purple-500/10 to-primary-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm -z-10" />

      {/* Cover Image with enhanced interactions */}
      {post.coverImage && (
        <Link
          href={`/blog/${post.slug}`}
          className="relative block group/image"
        >
          <div
            className={`${imageVariants[variant]} ${variant === 'masonry' ? masonryAspectRatio : ''}`}
          >
            {/* Loading skeleton with gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 h-full w-full" />
            </div>

            <Image
              src={post.coverImage}
              alt={`Cover image for blog post: ${post.title}`}
              fill
              className={`object-cover transition-all duration-500 ease-out group-hover/image:scale-105 group-hover/image:brightness-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes={
                variant === 'compact'
                  ? '(max-width: 640px) 128px, (max-width: 768px) 160px, 192px'
                  : variant === 'featured'
                    ? '(max-width: 1024px) 100vw, 40vw'
                    : variant === 'grid' || variant === 'masonry'
                      ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      : '(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
              }
              loading={priority ? 'eager' : 'lazy'}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAJAHlXiLwAAAABJRU5ErkJggg=="
              onLoad={() => setImageLoaded(true)}
            />

            {/* Enhanced image overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />

            {/* Action buttons overlay */}
            {showActions && (
              <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover/image:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/image:translate-y-0">
                <button
                  onClick={handleBookmark}
                  className="p-2 bg-black/70 backdrop-blur-md rounded-xl text-white/80 hover:text-white border border-white/10 transition-all duration-200 hover:scale-110"
                  aria-label="Bookmark article"
                >
                  <Bookmark
                    className={`w-4 h-4 transition-colors ${isBookmarked ? 'fill-primary-400 text-primary-400' : ''}`}
                  />
                </button>

                <button
                  onClick={handleShare}
                  className="p-2 bg-black/70 backdrop-blur-md rounded-xl text-white/80 hover:text-white border border-white/10 transition-all duration-200 hover:scale-110"
                  aria-label="Share article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Reading time badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-xl text-xs text-white font-medium border border-white/10 shadow-lg">
              <Clock className="w-3 h-3 text-primary-400" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </Link>
      )}

      {/* Enhanced Content Section */}
      <div className={contentVariants[variant]}>
        {/* Category and metadata with improved styling */}
        <div
          className={`flex flex-wrap items-center ${variant === 'compact' ? 'justify-between gap-2 mb-3' : 'justify-between gap-3 mb-4'}`}
        >
          <Link
            href={`/blog/categories/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="group/category relative inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary-500/20 to-purple-500/20 text-primary-300 border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 backdrop-blur-sm transform hover:scale-105"
          >
            <Tag className="w-3 h-3" />
            <span className="relative z-10">{post.category}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-purple-400/20 rounded-lg opacity-0 group-hover/category:opacity-100 transition-opacity duration-300" />
          </Link>

          {!post.coverImage && variant !== 'compact' && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Clock className="w-3 h-3 text-primary-400" />
              <span className="font-medium">{post.readingTime}</span>
            </div>
          )}
        </div>

        {/* Enhanced Title with better typography */}
        <Link href={`/blog/${post.slug}`} className="group/title mb-4 block">
          <h3
            className={`font-bold text-white leading-tight group-hover/title:text-transparent group-hover/title:bg-clip-text group-hover/title:bg-gradient-to-r group-hover/title:from-primary-300 group-hover/title:via-purple-300 group-hover/title:to-primary-300 transition-all duration-500 ${
              variant === 'featured' || variant === 'hero'
                ? 'text-xl sm:text-2xl lg:text-3xl line-clamp-2'
                : variant === 'compact' || variant === 'grid'
                  ? 'text-sm sm:text-base line-clamp-2'
                  : 'text-lg sm:text-xl line-clamp-2'
            }`}
          >
            {post.title}
          </h3>
        </Link>

        {/* Excerpt with better line clamping */}
        {variant !== 'compact' && (
          <p
            className={`text-gray-300 leading-relaxed mb-5 group-hover:text-gray-200 transition-colors duration-300 ${
              variant === 'featured' || variant === 'hero'
                ? 'text-base lg:text-lg line-clamp-3'
                : variant === 'grid'
                  ? 'text-sm line-clamp-2'
                  : 'text-sm sm:text-base line-clamp-2'
            }`}
          >
            {post.excerpt}
          </p>
        )}

        {/* Enhanced Author Section with stats */}
        <div
          className={`flex items-center justify-between mt-auto ${variant === 'compact' ? 'pt-3' : 'pt-4'} border-t border-gray-800/50`}
        >
          <div className="flex items-center gap-3">
            <div className="relative group/avatar">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity duration-300 blur-sm" />
              <div className="relative bg-gray-900 rounded-full p-0.5">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={variant === 'compact' || variant === 'grid' ? 24 : 32}
                  height={variant === 'compact' || variant === 'grid' ? 24 : 32}
                  className="rounded-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs">
                <User className="w-3 h-3 text-primary-400" />
                <span className="text-gray-100 font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                <Calendar className="w-3 h-3 text-purple-400" />
                <time className="font-medium">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Stats and interactive buttons */}
            {showStats && showActions && variant !== 'compact' && (
              <div className="hidden sm:flex items-center gap-2 text-xs mr-2">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-all duration-200 hover:scale-105 ${
                    isLiked
                      ? 'text-red-400 bg-red-500/10 border border-red-500/20'
                      : 'text-gray-500 hover:text-red-400 hover:bg-red-500/10'
                  }`}
                >
                  <Heart
                    className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`}
                  />
                  <span>24</span>
                </button>

                <div className="flex items-center gap-1 text-gray-500">
                  <Eye className="w-3 h-3" />
                  <span>1.2k</span>
                </div>
              </div>
            )}

            {/* Read more indicator */}
            <div className="flex items-center gap-1.5 text-xs text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <span className="font-medium hidden sm:inline">Read</span>
              <div className="relative">
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
