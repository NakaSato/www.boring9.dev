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

  // Ultra-modern responsive variants with premium design
  const cardVariants = {
    default: "group relative flex flex-col bg-gradient-to-br from-gray-950/98 via-gray-900/95 to-gray-950/98 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out border border-gray-700/30 hover:border-primary-400/70 backdrop-blur-2xl transform hover:-translate-y-6 hover:scale-[1.04] hover:rotate-1 will-change-transform h-full blog-card-mobile-optimized",
    featured: "group relative flex flex-col lg:flex-row bg-gradient-to-br from-gray-950/98 via-gray-900/95 to-gray-950/98 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.9)] transition-all duration-700 ease-out border border-gray-700/30 hover:border-primary-400/70 backdrop-blur-2xl transform hover:-translate-y-4 hover:scale-[1.02] hover:rotate-0.5 will-change-transform col-span-full lg:min-h-[380px] blog-card-mobile-optimized",
    compact: "group relative flex flex-row bg-gradient-to-br from-gray-950/98 via-gray-900/95 to-gray-950/98 rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out border border-gray-700/30 hover:border-primary-400/70 backdrop-blur-2xl transform hover:-translate-y-3 hover:scale-[1.03] will-change-transform h-full blog-card-mobile-optimized"
  };

  const imageVariants = {
    default: "relative w-full aspect-[16/10] sm:aspect-video overflow-hidden bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm",
    featured: "relative w-full lg:w-2/5 xl:w-1/2 aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm shrink-0",
    compact: "relative w-28 sm:w-36 md:w-44 aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm shrink-0"
  };

  const contentVariants = {
    default: "relative flex flex-col p-5 sm:p-6 lg:p-8 flex-grow min-h-0",
    featured: "relative flex flex-col p-7 lg:p-10 xl:p-12 flex-grow lg:w-3/5 xl:w-1/2 min-h-0",
    compact: "relative flex flex-col p-4 sm:p-5 flex-grow justify-between min-h-0"
  };

  return (
    <article className={cardVariants[variant]} data-variant={variant}>
      {/* IoT/Fintech tech mesh gradient background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.12),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_70%)]"></div>
      </div>
      
      {/* Tech circuit pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Cpath fill=%27none%27 stroke=%27currentColor%27 stroke-width=%270.5%27 d=%27M0 20h20v60h60V40h20M40 0v20h20v20h20v60M20 80h60v20M80 20v60%27%3E%3C/path%3E%3C/svg%3E')] group-hover:opacity-[0.05] transition-opacity duration-1000"></div>
      
      {/* Dynamic premium glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-blue-500/25 to-purple-500/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl -z-10 animate-pulse" style={{animationDuration: '3s'}} />
      
      {/* Enhanced IoT/Fintech floating particles with tech animations */}
      <div className="hidden lg:block absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-1000 pointer-events-none">
        <div className="absolute top-6 left-6 w-2 h-2 bg-emerald-400/80 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '2.5s' }} />
        <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-blue-400/80 rounded-full animate-bounce" style={{ animationDelay: '0.7s', animationDuration: '3s' }} />
        <div className="absolute bottom-12 left-8 w-1 h-1 bg-purple-400/80 rounded-full animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '2.8s' }} />
        <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-cyan-400/80 rounded-full animate-bounce" style={{ animationDelay: '1.8s', animationDuration: '2.2s' }} />
      </div>
      
      {/* Magnetic tech hover border effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/40 via-blue-500/40 to-purple-500/40 animate-pulse" style={{animationDuration: '4s'}}></div>
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
            
            {/* Premium Reading Time Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-2 bg-black/80 backdrop-blur-xl rounded-2xl text-xs text-white/95 border border-white/20 font-bold shadow-xl">
              <Clock className="w-3.5 h-3.5 text-primary-400" />
              <span className="tracking-wide">{post.readingTime}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            className="group/category relative inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-2xl bg-gradient-to-r from-primary-600/30 via-purple-500/25 to-primary-600/30 text-primary-200 border border-primary-500/40 hover:border-primary-400/60 transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/30 backdrop-blur-md transform hover:scale-105"
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-400 to-purple-400 animate-pulse" />
            <span className="relative z-10 tracking-wide">{post.category}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400/40 via-purple-400/40 to-secondary-400/40 rounded-2xl opacity-0 group-hover/category:opacity-100 transition-all duration-500 blur-sm -z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover/category:opacity-100 transition-opacity duration-300" />
          </Link>
          
          {(!post.coverImage && variant !== 'compact') && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3 text-secondary-400" />
              <span className="font-medium">{post.readingTime}</span>
            </div>
          )}
        </div>
        
        {/* Enhanced Title */}
        <Link href={`/blog/${post.slug}`} className="group/title mb-4 block">
          <h3 className={`font-black text-white leading-tight group-hover/title:text-transparent group-hover/title:bg-clip-text group-hover/title:bg-gradient-to-r group-hover/title:from-primary-300 group-hover/title:via-purple-300 group-hover/title:to-secondary-300 transition-all duration-700 tracking-tight ${
            variant === 'featured' 
              ? 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl line-clamp-2 lg:line-clamp-3' 
              : variant === 'compact'
                ? 'text-sm sm:text-base lg:text-lg line-clamp-2'
                : 'text-lg sm:text-xl lg:text-2xl line-clamp-2'
          } group-hover/title:line-clamp-none group-hover/title:drop-shadow-lg`}>
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
        
        {/* Premium Author Section */}
        <div className={`flex items-center justify-between mt-auto ${variant === 'compact' ? 'pt-3' : 'pt-5'} border-t border-gradient-to-r from-transparent via-gray-600/40 to-transparent`}>
          <div className="flex items-center gap-3">
            <div className="relative group/avatar">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 via-purple-400 to-secondary-400 rounded-full opacity-75 group-hover/avatar:opacity-100 group-hover:scale-110 transition-all duration-500 blur-sm" />
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-full p-1 backdrop-blur-sm">
                <Image
                  src={post.authorImage}
                  alt={post.author}
                  width={variant === 'compact' ? 28 : 36}
                  height={variant === 'compact' ? 28 : 36}
                  className="rounded-full object-cover border border-gray-600/50"
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <User className="w-3.5 h-3.5 text-primary-400" />
                <span className="text-gray-100 font-bold tracking-wide">{post.author}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                <Calendar className="w-3.5 h-3.5 text-secondary-400" />
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
          
          {/* Enhanced Read More Indicator */}
          <div className="flex items-center gap-2 text-xs text-primary-300 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-3 group-hover:translate-x-0">
            <span className="font-bold hidden sm:inline tracking-wide">Read Article</span>
            <div className="relative">
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:scale-110 transition-all duration-500" />
              <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
