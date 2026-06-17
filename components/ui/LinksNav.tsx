'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' }
];

const LinksNav = () => {
  const pathname = usePathname();
  const current = pathname.includes('/blog') ? '/blog' : pathname;

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navLinks.map(({ name, path }) => {
        const isActive = path === current;

        return (
          <Link
            key={path}
            href={path}
            data-magnetic="true"
            data-magnetic-strength="0.4"
            className={cn(
              'relative px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-200',
              isActive ? 'text-primary-400' : 'text-gray-400 hover:text-gray-100'
            )}
          >
            {name}
            {isActive && (
              <motion.span
                layoutId="nav-underline"
                className="absolute left-4 right-4 -bottom-px h-px bg-primary-400"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default LinksNav;
