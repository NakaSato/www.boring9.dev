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
      <AnimationContainer customClassName="w-full group flex flex-col justify-center items-center mb-8">
        <div className="flex items-center w-full h-12 transition-all bg-gray-900/70 border border-primary-800/20 rounded-lg shadow-lg lg:w-full group-hover:border-primary-700/50 ease-in-out duration-300">
          <div className="grid w-12 h-full text-primary-400 place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
            className="w-full h-full px-2 text-sm text-white transition-all bg-transparent rounded outline-none peer focus:border-primary-500 ease"
            type="text"
            id="search"
            placeholder="Search by title, category, or tags..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {/* Add advanced search link */}
          <Link 
            href="/blog/search" 
            className="px-4 py-2 text-sm text-primary-400 hover:text-primary-300 whitespace-nowrap transition-colors duration-300"
            title="Advanced search"
          >
            Advanced
          </Link>
        </div>
      </AnimationContainer>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-10 p-6 bg-gray-900/50 rounded-xl border border-primary-800/20 shadow-lg">
          <h3 className="text-xl font-medium text-gray-300">No blog posts found</h3>
          <p className="text-gray-400 mt-2">Try adjusting your search query</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </>
  );
}
