'use client';

import { useState } from 'react';
import BlogCard from '@/components/blog/blog-card';
import ResponsiveBlogGrid from '@/components/blog/responsive-blog-grid';
import AnimationContainer from '@/components/utils/AnimationContainer';
import { BlogPostProps } from '@/lib/get-content';
import Link from 'next/link';

interface BlogListProps {
  posts: BlogPostProps[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <AnimationContainer customClassName="w-full group flex flex-col justify-center items-center mb-12">
        <div className="relative flex items-center w-full h-16 transition-all bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 border border-gray-700/40 rounded-2xl shadow-2xl backdrop-blur-md lg:w-full group-hover:border-primary-500/50 group-hover:shadow-2xl group-hover:shadow-primary-500/20 ease-in-out duration-700 overflow-hidden">
          {/* Enhanced multi-layer glow effects */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-600/30 via-purple-600/20 to-secondary-600/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-lg -z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 via-transparent to-secondary-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Animated search icon */}
          <div className="grid w-16 h-full text-primary-400 place-items-center group-hover:text-primary-300 transition-all duration-500">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <div className="absolute inset-0 bg-primary-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          <input
            className="w-full h-full px-6 text-lg text-white placeholder-gray-400 transition-all bg-transparent rounded outline-none peer focus:placeholder-gray-500 ease duration-500 font-medium"
            type="text"
            id="search"
            placeholder="Search articles by title, category, or tags..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* Enhanced advanced search link with modern glassmorphism */}
          <Link 
            href="/blog/search" 
            className="flex items-center gap-3 px-8 py-4 text-sm font-semibold text-primary-300 hover:text-white whitespace-nowrap transition-all duration-500 hover:bg-gradient-to-r hover:from-primary-500/20 hover:to-purple-500/20 rounded-r-2xl border-l border-gray-600/50 group/advanced backdrop-blur-sm"
            title="Advanced search with filters"
          >
            <span className="hidden sm:inline">Advanced</span>
            <svg className="w-5 h-5 transform group-hover/advanced:translate-x-1 group-hover/advanced:scale-110 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
        
        {/* Enhanced search results indicator with modern styling */}
        {searchQuery && (
          <div className="mt-6 p-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/30 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-300">
                  {filteredPosts.length === 0 ? (
                    <span className="text-red-400">No results found for "{searchQuery}"</span>
                  ) : (
                    <span className="text-green-400">
                      {filteredPosts.length} result{filteredPosts.length === 1 ? '' : 's'} found for "{searchQuery}"
                    </span>
                  )}
                </span>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-all duration-300"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            </div>
          </div>
        )}
      </AnimationContainer>

      {filteredPosts.length === 0 ? (
        <div className="relative text-center py-24 px-10 bg-gradient-to-br from-gray-950/98 via-gray-900/95 to-gray-950/98 rounded-3xl border border-gray-700/40 shadow-2xl backdrop-blur-2xl overflow-hidden">
          {/* Ultra-modern background effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.1),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,107,204,0.08),transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.06),transparent_70%)]"></div>
          </div>
          
          {/* Animated border gradients */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/60 to-transparent animate-pulse" style={{animationDuration: '3s'}} />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-500/60 to-transparent animate-pulse" style={{animationDuration: '3s', animationDelay: '1.5s'}} />
          
          {/* Enhanced floating elements */}
          <div className="absolute top-10 right-10 w-4 h-4 bg-gradient-to-br from-primary-400 to-purple-400 rounded-full animate-pulse opacity-60" style={{animationDelay: '0.5s'}} />
          <div className="absolute bottom-10 left-10 w-3 h-3 bg-gradient-to-br from-secondary-400 to-accent-400 rounded-full animate-pulse opacity-60" style={{animationDelay: '1s'}} />
          <div className="absolute top-1/3 left-8 w-2 h-2 bg-gradient-to-br from-accent-400 to-cyan-400 rounded-full animate-pulse opacity-60" style={{animationDelay: '1.5s'}} />
          
          {/* Premium empty state icon */}
          <div className="relative mb-10 flex justify-center">
            <div className="w-28 h-28 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-3xl flex items-center justify-center border border-gray-600/40 shadow-2xl backdrop-blur-xl transform hover:scale-105 transition-transform duration-500">
              <div className="relative">
                <svg className="w-14 h-14 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-purple-400/20 rounded-2xl blur-lg opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-primary-200 via-purple-200 to-secondary-200 mb-6 leading-tight tracking-tight">
              No Articles Found
            </h3>
            <p className="text-gray-300 text-xl lg:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
              {searchQuery 
                ? `We couldn't find any articles matching "${searchQuery}". Try adjusting your search terms or explore our categories below.`
                : "No blog articles are available at the moment. Check back soon for exciting new content!"
              }
            </p>
            
            {searchQuery && (
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button
                  onClick={() => setSearchQuery('')}
                  className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-primary-600 via-purple-600 to-primary-700 text-white font-bold rounded-2xl hover:from-primary-500 hover:to-purple-500 transition-all duration-700 shadow-2xl hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.6)] transform hover:-translate-y-2 hover:scale-105 border border-primary-500/50"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 via-purple-500 to-secondary-500 rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur-lg" />
                  <div className="relative flex items-center gap-4">
                    <svg className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span className="text-lg">Clear Search</span>
                  </div>
                </button>
                <Link
                  href="/blog/categories"
                  className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-secondary-600/90 to-accent-600/90 hover:from-secondary-500 hover:to-accent-500 text-white font-bold rounded-2xl transition-all duration-700 shadow-xl hover:shadow-2xl hover:shadow-secondary-500/30 transform hover:-translate-y-2 hover:scale-105 border border-secondary-500/40"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-secondary-500 via-accent-500 to-primary-500 rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur-lg" />
                  <div className="relative flex items-center gap-4">
                    <svg className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="text-lg">Browse Categories</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ResponsiveBlogGrid 
          posts={filteredPosts}
          enableFeatured={true}
          enableCompact={false}
          maxFeaturedPosts={1}
        />
      )}
    </>
  );
}
