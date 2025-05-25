// components/projects/ProjectSearch.tsx
'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import AnimationContainer from '../utils/AnimationContainer';

interface ProjectSearchProps {
  onSearch: (query: string) => void;
}

export default function ProjectSearch({ onSearch }: ProjectSearchProps) {
  const [query, setQuery] = useState('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };
  
  return (
    <AnimationContainer customClassName="w-full mb-8">
      <div className="relative">
        <div className="flex items-center w-full h-14 transition-all bg-gray-900/70 border border-primary-800/20 rounded-lg shadow-lg hover:border-primary-700/50 ease-in-out duration-300">
          <div className="grid w-14 h-full text-primary-400 place-items-center">
            <Search className="w-5 h-5" />
          </div>
          
          <input
            className="w-full h-full px-2 text-white transition-all bg-transparent rounded outline-none focus:border-primary-500 ease placeholder-gray-400"
            type="text"
            id="search"
            value={query}
            placeholder="Search by name, technology, or tag..."
            onChange={handleSearch}
          />
          
          {query && (
            <button
              onClick={() => {
                setQuery('');
                onSearch('');
              }}
              className="h-full px-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </AnimationContainer>
  );
}
