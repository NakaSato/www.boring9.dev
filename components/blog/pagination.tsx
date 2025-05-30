'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }
  
  // Calculate the range of page numbers to display
  const getPageRange = () => {
    const range = [];
    
    // Always include first page
    range.push(1);
    
    // Calculate start and end of page range
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);
    
    // Adjust range to always show 3 pages if possible
    if (end - start < 2 && totalPages > 3) {
      if (start === 2) {
        end = Math.min(totalPages - 1, start + 2);
      } else if (end === totalPages - 1) {
        start = Math.max(2, end - 2);
      }
    }
    
    // Add ellipsis after first page if needed
    if (start > 2) {
      range.push('...');
    }
    
    // Add middle pages
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      range.push('...');
    }
    
    // Always include last page if more than one page
    if (totalPages > 1) {
      range.push(totalPages);
    }
    
    return range;
  };
  
  const pageRange = getPageRange();
  
  // Get URL for a page number
  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath; // First page is at base path (e.g., /blog)
    }
    return `${basePath}/${page}`;
  };
  
  return (
    <nav className="flex justify-center my-8" aria-label="Pagination">
      <ul className="flex items-center space-x-2">
        {/* Previous page button */}
        <li>
          {currentPage > 1 ? (
            <Link 
              href={getPageUrl(currentPage - 1)}
              className="flex items-center justify-center w-10 h-10 border border-primary-800/30 rounded-lg bg-gray-900/50 hover:bg-primary-900/30 hover:border-primary-700/50 transition-all duration-300 shadow-sm" 
              aria-label="Previous page"
            >
              <ChevronLeft size={18} className="text-gray-300" />
            </Link>
          ) : (
            <span className="flex items-center justify-center w-10 h-10 border border-gray-800/20 rounded-lg text-gray-700 bg-gray-900/30 cursor-not-allowed">
              <ChevronLeft size={18} />
            </span>
          )}
        </li>
        
        {/* Page numbers */}
        {pageRange.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="flex items-center justify-center w-10 h-10 text-gray-400">
                …
              </span>
            ) : (
              <Link
                href={getPageUrl(page as number)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-primary-700 text-white font-medium border border-primary-600 shadow-md'
                    : 'border border-primary-800/30 bg-gray-900/50 hover:bg-primary-900/30 hover:border-primary-700/50 text-gray-300 shadow-sm'
                }`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </Link>
            )}
          </li>
        ))}
        
        {/* Next page button */}
        <li>
          {currentPage < totalPages ? (
            <Link 
              href={getPageUrl(currentPage + 1)}
              className="flex items-center justify-center w-10 h-10 border border-primary-800/30 rounded-lg bg-gray-900/50 hover:bg-primary-900/30 hover:border-primary-700/50 transition-all duration-300 shadow-sm" 
              aria-label="Next page"
            >
              <ChevronRight size={18} className="text-gray-300" />
            </Link>
          ) : (
            <span className="flex items-center justify-center w-10 h-10 border border-gray-800/20 rounded-lg text-gray-700 bg-gray-900/30 cursor-not-allowed">
              <ChevronRight size={18} />
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
