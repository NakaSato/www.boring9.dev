'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
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

interface LinksNavProps {
  isMounted?: boolean;
}

const LinksNav = ({ isMounted = false }: LinksNavProps) => {
  const [isClientMounted, setIsClientMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClientMounted(true);
  }, []);

  // Use prop or internal state to determine if mounted
  const shouldShowActiveState = isMounted || isClientMounted;

  // Prevent hydration mismatch by not showing active state until mounted
  if (!shouldShowActiveState) {
    return (
      <div className="hidden lg:flex items-center space-x-2">
        {Object.entries(navItemsSelected).map(([path, { name }]) => (
          <Link
            key={path}
            href={path}
            className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-300 hover:text-primary-300 hover:bg-primary-500/10"
          >
            <span className="relative z-10">{name}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center space-x-2">
      {Object.entries(navItemsSelected).map(([path, { name }]) => {
        const isActive = path === pathname;

        return (
          <Link
            key={path}
            href={path}
            className={cn(
              'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group',
              {
                'text-gray-300 hover:text-primary-300 hover:bg-primary-500/10 hover:shadow-lg hover:shadow-primary-500/20': !isActive,
                'text-primary-400 bg-primary-500/20 shadow-md shadow-primary-500/30 font-bold': isActive
              }
            )}
          >
            <span className="relative z-10">{name}</span>
            {!isActive && (
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-500/0 via-primary-500/5 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default LinksNav;
