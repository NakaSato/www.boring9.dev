'use client';

import { useState } from 'react';
import { Search, Filter, Grid, List, SortAsc, SortDesc } from 'lucide-react';

interface BlogFiltersProps {
  onSearch: (query: string) => void;
  onSort: (sort: 'date' | 'title' | 'category') => void;
  onSortOrder: (order: 'asc' | 'desc') => void;
  onViewChange: (view: 'grid' | 'list') => void;
  currentView: 'grid' | 'list';
  sortOrder: 'asc' | 'desc';
}

export default function BlogFilters({
  onSearch,
  onSort,
  onSortOrder,
  onViewChange,
  currentView,
  sortOrder
}: BlogFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="sticky top-20 z-30 mb-8">
      <div className="flex items-center justify-center">
        <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all duration-200 w-64"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl text-gray-400 hover:text-white transition-all duration-200"
            >
              <Filter className="w-4 h-4" />
            </button>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
              <button
                onClick={() => onViewChange('grid')}
                className={`p-2 transition-all duration-200 ${
                  currentView === 'grid'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewChange('list')}
                className={`p-2 transition-all duration-200 ${
                  currentView === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <div className="flex items-center gap-4">
                {/* Sort Options */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Sort by:</span>
                  <select
                    onChange={(e) =>
                      onSort(e.target.value as 'date' | 'title' | 'category')
                    }
                    className="bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  >
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                    <option value="category">Category</option>
                  </select>
                </div>

                {/* Sort Order */}
                <button
                  onClick={() =>
                    onSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                  }
                  className="p-2 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-lg text-gray-400 hover:text-white transition-all duration-200"
                >
                  {sortOrder === 'asc' ? (
                    <SortAsc className="w-4 h-4" />
                  ) : (
                    <SortDesc className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
