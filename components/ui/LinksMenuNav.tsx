'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { navLinks } from './LinksNav';

const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 }
};

const LinksMenuNav = ({ onNavigate }: { onNavigate?: () => void }) => {
  const pathname = usePathname();
  const current = pathname.includes('/blog') ? '/blog' : pathname;

  return (
    <ul className="flex flex-col">
      {navLinks.map(({ name, path }, i) => {
        const isActive = path === current;

        return (
          <motion.li
            key={path}
            variants={item}
            className="border-b border-white/[0.08] last:border-0"
          >
            <Link
              href={path}
              onClick={onNavigate}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group flex items-center justify-between py-4 font-mono text-sm uppercase tracking-[0.18em] transition-colors duration-200',
                isActive
                  ? 'text-primary-400'
                  : 'text-gray-200 hover:text-primary-400'
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    'h-px bg-primary-400 transition-all duration-300',
                    isActive ? 'w-6' : 'w-0 group-hover:w-4'
                  )}
                />
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  {name}
                </span>
              </span>
              <span
                aria-hidden
                className={cn(
                  'font-mono text-xs',
                  isActive ? 'text-primary-400/70' : 'text-gray-600'
                )}
              >
                0{i + 1}
              </span>
            </Link>
          </motion.li>
        );
      })}
    </ul>
  );
};

export default LinksMenuNav;
