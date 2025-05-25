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
      <div className="hidden lg:flex items-center space-x-1">
        {Object.entries(navItemsSelected).map(([path, { name }]) => (
          <Link
            key={path}
            href={path}
            className="relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 text-white hover:text-primary-400"
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
              'relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
              {
                'text-gray-300 hover:text-primary-400': !isActive,
                'text-primary-400 font-bold': isActive
              }
            )}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
};

export default LinksNav;
