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
        <div className="relative flex items-center w-full h-14 transition-all bg-gradient-to-r from-gray-900/80 via-gray-800/90 to-gray-900/80 border border-primary-800/30 rounded-2xl shadow-xl backdrop-blur-sm lg:w-full group-hover:border-primary-600/50 group-hover:shadow-2xl group-hover:shadow-primary-500/10 ease-in-out duration-500">
          {/* Enhanced glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600/20 via-purple-600/20 to-secondary-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
          
          <div className="grid w-14 h-full text-primary-400 place-items-center group-hover:text-primary-300 transition-colors duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="w-full h-full px-4 text-base text-white placeholder-gray-400 transition-all bg-transparent rounded outline-none peer focus:placeholder-gray-500 ease duration-300"
            type="text"
            id="search"
            placeholder="Search by title, category, or tags..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* Enhanced advanced search link */}
          <Link 
            href="/blog/search" 
            className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-primary-400 hover:text-primary-300 whitespace-nowrap transition-all duration-300 hover:bg-primary-500/10 rounded-r-2xl border-l border-gray-700/50 group/advanced"
            title="Advanced search"
          >
            <span>Advanced</span>
            <svg className="w-4 h-4 transform group-hover/advanced:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {/* Search results indicator */}
        {searchQuery && (
          <div className="mt-4 text-sm text-gray-400">
            {filteredPosts.length === 0 ? (
              <span>No results found for "{searchQuery}"</span>
            ) : (
              <span>{filteredPosts.length} result{filteredPosts.length === 1 ? '' : 's'} found for "{searchQuery}"</span>
            )}
          </div>
        )}
      </AnimationContainer>

      {filteredPosts.length === 0 ? (
        <div className="relative text-center py-16 px-8 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 rounded-2xl border border-primary-800/30 shadow-2xl backdrop-blur-sm">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-secondary-600/5 rounded-2xl" />
          
          {/* Empty state icon */}
          <div className="relative mb-6 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center border border-gray-600/50">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3">No blog posts found</h3>
          <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto leading-relaxed">
            {searchQuery 
              ? `We couldn't find any posts matching "${searchQuery}". Try adjusting your search terms.`
              : "No blog posts are available at the moment."
            }
          </p>
          
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-medium rounded-xl hover:from-primary-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary-500/25 transform hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear search
            </button>
          )}
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
