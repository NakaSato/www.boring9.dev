'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NavItemHeaderAnimation } from '@/types';

export const navItemsSelected: { [key: string]: NavItemHeaderAnimation } = {
  '/': {
    name: 'home',
    x: 1,
    y: -3,
    w: '60px'
  },
  '/about': {
    name: 'about',
    x: 65,
    y: -3,
    w: '60px'
  },
  '/projects': {
    name: 'projects',
    x: 130,
    y: -3,
    w: '75px'
  },
  '/blog': {
    name: 'blog',
    x: 209,
    y: -3,
    w: '50px'
  }
};

const LinksNav = ({ isMounted = true }: { isMounted?: boolean }) => {
  let pathname = usePathname() as string;
  
  // Handle blog subpaths
  if (pathname.includes('/blog/')) pathname = '/blog';

  // Don't render active styles until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="hidden lg:flex items-center space-x-1">
        {Object.entries(navItemsSelected).map(([path, { name }]) => (
          <Link
            key={path}
            href={path}
            className="relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-white hover:bg-gray-800/30 text-gray-400"
          >
            {name}
          </Link>
        ))}
      </div>
    );
  }
  
  return (
    <div className="hidden lg:flex items-center space-x-1">
      {Object.entries(navItemsSelected).map(([path, { name }]) => {
        const isActive = path === pathname;

        return (
          <Link
            key={path}
            href={path}
            className={cn(
              'relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:text-white hover:bg-gray-800/30',
              {
                'text-gray-400': !isActive,
                'text-white bg-gray-800/20': isActive
              }
            )}
          >
            {name}
            {isActive && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default LinksNav;
