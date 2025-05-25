// components/projects/ProjectCategories.tsx
'use client';

import { getProjectCategories } from '@/lib/projects';
import { useState } from 'react';
import clsx from 'clsx';

interface ProjectCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProjectCategories({ 
  activeCategory, 
  onCategoryChange
}: ProjectCategoriesProps) {
  const categories = ['all', ...getProjectCategories()];
  
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={clsx(
            'px-4 py-2 text-sm rounded-full transition-all duration-300',
            activeCategory === category 
              ? 'bg-primary-600 text-white font-medium shadow-md'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          )}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}
