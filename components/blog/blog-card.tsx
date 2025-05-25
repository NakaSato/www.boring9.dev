'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, User, ArrowRight } from 'lucide-react';
import { BlogPostProps } from '@/lib/get-content';
import { useState } from 'react';

interface BlogCardProps {
  post: BlogPostProps;
  priority?: boolean;
  variant?: 'default' | 'featured' | 'compact';
}

export default function BlogCard({ post, priority = false, variant = 'default' }: BlogCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Responsive variants with improved adaptive design
  const cardVariants = {
    default: "group relative flex flex-col bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out border border-gray-800/50 hover:border-primary-500/50 backdrop-blur-sm transform hover:-translate-y-3 hover:scale-[1.02] will-change-transform h-full blog-card-mobile-optimized",
    featured: "group relative flex flex-col lg:flex-row bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-gray-800/95 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 ease-out border border-gray-800/50 hover:border-primary-500/50 backdrop-blur-sm transform hover:-translate-y-2 hover:scale-[1.01] will-change-transform col-span-full lg:min-h-[300px] blog-card-mobile-optimized",
    compact: "group relative flex flex-row bg-gradient-to-r from-gray-900/95 via-gray-900/90 to-gray-800/95 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-out border border-gray-800/50 hover:border-primary-500/50 backdrop-blur-sm transform hover:-translate-y-1 will-change-transform h-full blog-card-mobile-optimized"
  };

  const imageVariants = {
    default: "relative w-full aspect-[16/10] sm:aspect-video overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900",
    featured: "relative w-full lg:w-2/5 xl:w-1/2 aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shrink-0",
    compact: "relative w-24 sm:w-32 md:w-40 aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shrink-0"
  };

  const contentVariants = {
    default: "relative flex flex-col p-4 sm:p-5 lg:p-6 flex-grow min-h-0",
    featured: "relative flex flex-col p-6 lg:p-8 xl:p-10 flex-grow lg:w-3/5 xl:w-1/2 min-h-0",
    compact: "relative flex flex-col p-3 sm:p-4 flex-grow justify-between min-h-0"
  };

  return (
    <article className={cardVariants[variant]} data-variant={variant}>
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-secondary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Dynamic glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600/20 via-purple-600/20 to-secondary-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
      
      {/* Floating particles - only on desktop for performance */}
      <div className="hidden lg:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        <div className="absolute top-4 left-4 w-1 h-1 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-8 left-6 w-0.5 h-0.5 bg-secondary-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`} className="relative block">
          <div className={imageVariants[variant]}>
            {/* Loading skeleton */}
            <div className={`absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
              <div className="animate-pulse bg-gray-700 h-full w-full" />
            </div>
            
            <Image
              src={post.coverImage}
              alt={`Cover image for blog post: ${post.title}`}
              fill
              className={`object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes={variant === 'compact' 
                ? "(max-width: 640px) 96px, (max-width: 768px) 128px, 160px"
                : variant === 'featured'
                  ? "(max-width: 1024px) 100vw, 40vw"
                  : "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              }
              loading={priority ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAJAHlXiLwAAAABJRU5ErkJggg=="
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Reading time badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 bg-black/70 backdrop-blur-md rounded-full text-xs text-white/90 border border-white/10 font-medium">
              <Clock className="w-3 h-3" />
              <span>{post.readingTime}</span>
            </div>
          </div>
        </Link>
      )}

      {/* Content */}
      <div className={contentVariants[variant]}>
        {/* Category and metadata */}
        <div className={`flex flex-wrap items-center ${variant === 'compact' ? 'justify-between gap-2 mb-2' : 'justify-between gap-3 mb-4'}`}>
          <Link
            href={`/blog/categories/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="group/category relative inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-gradient-to-r from-primary-600/20 via-primary-500/15 to-purple-600/20 text-primary-300 border border-primary-500/30 hover:border-primary-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span className="relative z-10">{post.category}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-purple-500/30 rounded-full opacity-0 group-hover/category:opacity-100 transition-opacity duration-300" />
          </Link>
          
          {(!post.coverImage && variant !== 'compact') && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3 text-secondary-400" />
              <span className="font-medium">{post.readingTime}</span>
            </div>
          )}
        </div>
        
        {/* Title */}
        <Link href={`/blog/${post.slug}`} className="group/title mb-3 block">
          <h3 className={`font-bold text-white leading-tight group-hover/title:text-transparent group-hover/title:bg-clip-text group-hover/title:bg-gradient-to-r group-hover/title:from-primary-400 group-hover/title:via-purple-400 group-hover/title:to-secondary-400 transition-all duration-500 ${
            variant === 'featured' 
              ? 'blog-card-responsive-title-featured line-clamp-2 lg:line-clamp-3' 
              : variant === 'compact'
                ? 'text-sm sm:text-base lg:text-lg line-clamp-2'
                : 'blog-card-responsive-title line-clamp-2'
          } group-hover/title:line-clamp-none`}>
            {post.title}
          </h3>
        </Link>
        
        {/* Excerpt - hidden on compact variant */}
        {variant !== 'compact' && (
          <p className={`text-gray-300 leading-relaxed mb-4 lg:mb-6 line-clamp-2 group-hover:line-clamp-3 transition-all duration-300 ${
            variant === 'featured' 
              ? 'text-sm sm:text-base lg:text-lg xl:text-xl' 
              : 'blog-card-responsive-text'
          }`}>
            {post.excerpt}
          </p>
        )}
        
        {/* Enhanced author section */}
        <div className={`flex items-center justify-between mt-auto ${variant === 'compact' ? 'pt-2' : 'pt-4'} border-t border-gray-700/50`}>
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-gray-800 rounded-full p-0.5">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={variant === 'compact' ? 24 : 32}
                  height={variant === 'compact' ? 24 : 32}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <User className="w-3 h-3 text-primary-400" />
                <span className="text-gray-200 font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                <Calendar className="w-3 h-3 text-secondary-400" />
                <time>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </div>
          
          {/* Read more indicator */}
          <div className="flex items-center gap-1 text-xs text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <span className="font-medium hidden sm:inline">Read more</span>
            <ArrowRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </article>
  );
}
