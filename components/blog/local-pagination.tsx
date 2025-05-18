'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function LocalPagination({ currentPage, totalPages, basePath }: PaginationProps) {
  // Generate pagination numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <nav className="flex justify-center items-center mt-8 mb-4">
      <ul className="flex space-x-2">
        {/* Previous page button */}
        <li>
          <PaginationLink
            href={currentPage > 1 ? `${basePath}/${currentPage - 1}` : '#'}
            disabled={currentPage <= 1}
          >
            &laquo; Prev
          </PaginationLink>
        </li>
        
        {/* Page numbers */}
        {pages.map(page => (
          <li key={page}>
            <PaginationLink
              href={`${basePath}/${page}`}
              active={page === currentPage}
            >
              {page}
            </PaginationLink>
          </li>
        ))}
        
        {/* Next page button */}
        <li>
          <PaginationLink
            href={currentPage < totalPages ? `${basePath}/${currentPage + 1}` : '#'}
            disabled={currentPage >= totalPages}
          >
            Next &raquo;
          </PaginationLink>
        </li>
      </ul>
    </nav>
  );
}

interface PaginationLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

function PaginationLink({ href, children, active = false, disabled = false }: PaginationLinkProps) {
  const className = cn(
    'px-3 py-2 border rounded-md text-sm',
    {
      'bg-blue-600 text-white border-blue-600': active,
      'bg-white text-gray-500 border-gray-300 hover:bg-gray-50': !active && !disabled,
      'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200': disabled
    }
  );
  
  if (disabled) {
    return <span className={className}>{children}</span>;
  }
  
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
