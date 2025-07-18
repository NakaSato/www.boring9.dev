'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath
}: PaginationProps) {
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
    <nav className="flex items-center justify-center" aria-label="Pagination">
      <div className="flex items-center gap-2">
        {/* Previous Page */}
        {currentPage > 1 ? (
          <Link
            href={
              currentPage === 2 ? '/blog' : `${basePath}/${currentPage - 1}`
            }
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700/50 hover:border-gray-600/50 rounded-lg text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-105"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </Link>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/30 border border-gray-700/30 rounded-lg text-gray-500 cursor-not-allowed">
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </div>
        )}

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageRange.map((page, index) => (
            <div key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-gray-500">…</span>
              ) : page === currentPage ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg blur opacity-75" />
                  <span className="relative px-4 py-2 bg-primary-600 text-white font-medium rounded-lg shadow-lg">
                    {page}
                  </span>
                </div>
              ) : (
                <Link
                  href={page === 1 ? '/blog' : `${basePath}/${page}`}
                  className="px-4 py-2 bg-gray-900/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-gray-600/50 rounded-lg text-gray-400 hover:text-white transition-all duration-200 transform hover:scale-105"
                >
                  {page}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Next Page */}
        {currentPage < totalPages ? (
          <Link
            href={`${basePath}/${currentPage + 1}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 hover:bg-gray-800/70 border border-gray-700/50 hover:border-gray-600/50 rounded-lg text-gray-300 hover:text-white transition-all duration-200 transform hover:scale-105"
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/30 border border-gray-700/30 rounded-lg text-gray-500 cursor-not-allowed">
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </nav>
  );
}
