// components/projects/ProjectList.tsx
'use client';

import { useState } from 'react';
import { projects, searchProjects, getProjectsByCategory, getProjectsByTag } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import ProjectSearch from './ProjectSearch';
import ProjectCategories from './ProjectCategories';
import ProjectTags from './ProjectTags';
import AnimationContainer from '../utils/AnimationContainer';

export default function ProjectList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Filter projects based on search query, category and tag
  let filteredProjects = projects;
  
  // Apply search filter
  if (searchQuery) {
    filteredProjects = searchProjects(searchQuery);
  } 
  // Apply category filter
  else if (activeCategory !== 'all') {
    filteredProjects = getProjectsByCategory(activeCategory);
  }
  
  // Apply tag filter (can be combined with other filters)
  if (activeTag) {
    filteredProjects = filteredProjects.filter(project => 
      project.tags.includes(activeTag)
    );
  }
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Reset category filter when searching
    if (query) {
      setActiveCategory('all');
    }
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Clear search when changing category
    setSearchQuery('');
  };
  
  const handleTagChange = (tag: string | null) => {
    setActiveTag(tag);
  };
  
  return (
    <section>
      <AnimationContainer>
        <h2 className="text-2xl font-bold mb-6 text-gradient-primary">All Projects</h2>
        
        <ProjectSearch onSearch={handleSearch} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-1 space-y-6">
            <ProjectCategories 
              activeCategory={activeCategory} 
              onCategoryChange={handleCategoryChange} 
            />
            
            <ProjectTags
              activeTag={activeTag}
              onTagChange={handleTagChange}
            />
          </div>
          
          <div className="lg:col-span-3">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-gray-900/50 rounded-xl p-12 text-center border border-primary-800/20">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-16 w-16 text-gray-600 mb-4"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects found</h3>
                <p className="text-gray-400">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </AnimationContainer>
    </section>
  );
}
