'use client';

import { useState } from 'react';
import BlogCard from '@/components/blog/blog-card';
import AnimationContainer from '@/components/utils/AnimationContainer';
import { BlogPostProps } from '@/lib/get-content';

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
        <div className="flex items-center w-full h-12 transition-all bg-black border border-gray-800 rounded shadow-lg lg:w-full group-hover:border-gray-500 ease">
          <div className="grid w-12 h-full text-gray-500 place-items-center">
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
            className="w-full h-full px-2 text-sm text-white transition-all bg-black rounded outline-none peer group-hover:border-gray-500 ease"
            type="text"
            id="search"
            placeholder="Search by title, category, or tags..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </AnimationContainer>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-400">No blog posts found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search query</p>
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
