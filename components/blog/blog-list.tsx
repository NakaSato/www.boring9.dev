'use client';

import { useState } from 'react';
import BlogCard from '@/components/blog/blog-card';
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
      <AnimationContainer customClassName="w-full group flex flex-col justify-center items-center mb-6 xs:mb-8 lg:mb-12">
        <div className="flex items-center w-full h-10 xs:h-12 md:h-14 transition-all bg-black border border-gray-800 rounded-lg shadow-lg group-hover:border-gray-500 ease mobile:mx-4" style={{
          // Chrome optimization: Search container
          willChange: "border-color",
          transform: "translateZ(0)"
        }}>
          <div className="grid w-10 xs:w-12 md:w-14 h-full text-gray-500 place-items-center flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 xs:w-5 xs:h-5 md:w-6 md:h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{
                // Chrome optimization: Search icon
                shapeRendering: "geometricPrecision"
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="w-full h-full px-2 xs:px-3 md:px-4 text-xs xs:text-sm md:text-base text-white transition-all bg-black rounded-lg outline-none peer group-hover:border-gray-500 ease placeholder:text-gray-500"
            type="text"
            id="search"
            placeholder="Search posts..."
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              // Chrome optimization: Input field
              willChange: "border-color",
              contain: "layout style"
            }}
          />
          
          {/* Advanced search link - hidden on very small screens */}
          <Link 
            href="/blog/search" 
            className="hidden xs:flex px-2 xs:px-3 md:px-4 py-2 text-xs xs:text-sm text-blue-400 hover:text-blue-300 whitespace-nowrap flex-shrink-0 transition-colors"
            title="Advanced search"
          >
            <span className="hidden sm:inline">Advanced</span>
            <span className="sm:hidden">⚙️</span>
          </Link>
        </div>
      </AnimationContainer>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-8 xs:py-10 md:py-16 mobile:mx-4">
          <h3 className="text-lg xs:text-xl md:text-2xl font-medium text-gray-400 mb-2">No blog posts found</h3>
          <p className="text-sm xs:text-base text-gray-500">Try adjusting your search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 xs:gap-5 md:gap-6 lg:gap-8 mobile:mx-4">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
