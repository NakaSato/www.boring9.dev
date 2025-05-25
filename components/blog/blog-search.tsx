'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BlogPostProps } from '@/lib/get-content';
import BlogCard from '@/components/blog/blog-card';
import ResponsiveBlogGrid from '@/components/blog/responsive-blog-grid';
import ResponsiveBlogLayout from '@/components/blog/responsive-blog-layout';
import AnimationContainer from '@/components/utils/AnimationContainer';
import { SearchIcon, FilterIcon } from 'lucide-react';

interface BlogSearchProps {
  posts: BlogPostProps[];
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialTag = searchParams.get('tag') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [filteredPosts, setFilteredPosts] = useState<BlogPostProps[]>(posts);
  
  // Extract all unique tags from posts
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort();
  
  // Update filtered posts when search query or tag changes
  useEffect(() => {
    const filtered = posts.filter(post => {
      const matchesSearch = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag === '' || 
        post.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
    
    setFilteredPosts(filtered);
    
    // Update URL with search parameters
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedTag) params.set('tag', selectedTag);
    
    const newUrl = `/blog/search${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl, { scroll: false });
  }, [searchQuery, selectedTag, posts, router]);
  
  const handleTagClick = (tag: string) => {
    setSelectedTag(prevTag => prevTag === tag ? '' : tag);
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Search Blog Posts</h1>
      
      <div className="mb-8">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="search"
            placeholder="Search by title, content, or keywords..."
            className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search blog posts"
          />
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <FilterIcon size={16} className="mr-2 text-gray-400" />
            <span className="text-sm text-gray-400">Filter by tag:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                aria-pressed={selectedTag === tag}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-400">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} found
        </p>
      </div>
      
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <AnimationContainer key={post.slug} customClassName="">
              <BlogCard post={post} />
            </AnimationContainer>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400 mb-4">No posts found matching your criteria</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTag('');
            }}
            className="text-blue-400 hover:text-blue-300"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
