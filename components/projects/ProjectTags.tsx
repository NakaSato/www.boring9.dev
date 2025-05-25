'use client';

import { useState } from 'react';
import { Tag } from 'lucide-react';
import { getProjectTags } from '@/lib/projects';
import clsx from 'clsx';
import AnimationContainer from '../utils/AnimationContainer';

interface ProjectTagsProps {
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
}

export default function ProjectTags({ activeTag, onTagChange }: ProjectTagsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const allTags = getProjectTags();
  
  // Display 10 tags or all if expanded
  const visibleTags = isExpanded ? allTags : allTags.slice(0, 10);
  const hasMoreTags = allTags.length > 10;
  
  return (
    <AnimationContainer customClassName="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Tag size={16} className="text-primary-400" />
        <h3 className="text-white font-medium">Filter by Tag</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTagChange(null)}
          className={clsx(
            'px-3 py-1 text-xs rounded-full transition-all',
            activeTag === null
              ? 'bg-primary-600/80 text-white font-medium'
              : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
          )}
        >
          All Tags
        </button>
        
        {visibleTags.map(tag => (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
            className={clsx(
              'px-3 py-1 text-xs rounded-full transition-all',
              activeTag === tag
                ? 'bg-primary-600/80 text-white font-medium'
                : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80'
            )}
          >
            {tag}
          </button>
        ))}
        
        {hasMoreTags && !isExpanded && (
          <button 
            onClick={() => setIsExpanded(true)}
            className="px-3 py-1 text-xs rounded-full bg-gray-900/60 text-gray-400 hover:text-white transition-colors"
          >
            +{allTags.length - 10} more
          </button>
        )}
        
        {isExpanded && (
          <button
            onClick={() => setIsExpanded(false)}
            className="px-3 py-1 text-xs rounded-full bg-gray-900/60 text-gray-400 hover:text-white transition-colors"
          >
            Show less
          </button>
        )}
      </div>
    </AnimationContainer>
  );
}
