'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setIsClientMounted(true);
  }, []);

  // Use prop or internal state to determine if mounted
  const shouldShowActiveState = isMounted || isClientMounted;

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Prevent hydration mismatch by not showing active state until mounted
  if (!shouldShowActiveState) {
    return (
      <div className="hidden lg:flex items-center space-x-2">
        {Object.entries(navItemsSelected).map(([path, { name }]) => (
          <Link
            key={path}
            href={path}
            className="relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-gray-300"
          >
            <span className="relative z-10">{name}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center space-x-2">
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {Object.entries(navItemsSelected).map(([path, { name }]) => {
          const isActive = path === pathname;

          return (
            <motion.div key={path} variants={itemVariants}>
              <Link
                href={path}
                data-magnetic="true"
                data-magnetic-strength="0.5"
                className={cn(
                  'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group overflow-hidden nav-item',
                  {
                    'text-gray-300': !isActive,
                    'text-primary-400 font-bold': isActive
                  }
                )}
                onMouseEnter={() => setHoveredItem(path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Enhanced Background Animation */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '8px',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.2), rgba(16, 185, 129, 0.2))'
                      : 'linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(16, 185, 129, 0.1))',
                    border: isActive
                      ? '1px solid rgba(14, 165, 233, 0.4)'
                      : '1px solid transparent'
                  }}
                  initial={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.95
                  }}
                  animate={{
                    opacity: hoveredItem === path || isActive ? 1 : 0,
                    scale: hoveredItem === path || isActive ? 1 : 0.95
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />

                {/* Shimmer Effect */}
                {(hoveredItem === path || isActive) && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                      borderRadius: '8px'
                    }}
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 0.8,
                      ease: 'easeInOut',
                      repeat: hoveredItem === path ? Infinity : 0,
                      repeatDelay: 1
                    }}
                  />
                )}

                {/* Text with Enhanced Animation */}
                <motion.span
                  style={{ position: 'relative', zIndex: 10 }}
                  animate={{
                    scale: hoveredItem === path || isActive ? 1.05 : 1,
                    color: isActive ? '#60a5fa' : '#d1d5db'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {name}
                </motion.span>

                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #10b981)',
                      transform: 'translateX(-50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.2,
                      type: 'spring',
                      stiffness: 500,
                      damping: 30
                    }}
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default LinksNav;
