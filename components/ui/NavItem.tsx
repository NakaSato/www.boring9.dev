'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LinksNav, { navItemsSelected } from './LinksNav';

const NavItem = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();
  const cleanPathname = pathname.includes('/blog/') ? '/blog' : pathname;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Enhanced background indicator with floating particles
  const BackgroundIndicator = ({
    isActive,
    x,
    w
  }: {
    isActive: boolean;
    x: number;
    w: string;
  }) => (
    <motion.div
      layoutId="navbar-indicator"
      style={{
        position: 'absolute',
        height: '40px',
        borderRadius: '12px',
        zIndex: -1
      }}
      initial={{
        opacity: 0,
        x: x,
        y: -3,
        scale: 0.8
      }}
      animate={{
        opacity: 1,
        x: x,
        width: w,
        scale: 1
      }}
      exit={{
        opacity: 0,
        scale: 0.8
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        duration: 0.6
      }}
    >
      {/* Main background */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: isActive
            ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.25), rgba(16, 185, 129, 0.25), rgba(14, 165, 233, 0.25))'
            : 'linear-gradient(135deg, rgba(14, 165, 233, 0.15), rgba(16, 185, 129, 0.15), rgba(14, 165, 233, 0.15))',
          borderRadius: '12px',
          border: `1px solid ${
            isActive ? 'rgba(14, 165, 233, 0.5)' : 'rgba(14, 165, 233, 0.3)'
          }`,
          backdropFilter: 'blur(8px)'
        }}
        animate={{
          boxShadow: isActive
            ? [
                '0 4px 20px rgba(14, 165, 233, 0.3)',
                '0 8px 30px rgba(14, 165, 233, 0.4)',
                '0 4px 20px rgba(14, 165, 233, 0.3)'
              ]
            : '0 2px 10px rgba(14, 165, 233, 0.15)'
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: 'easeInOut'
          }
        }}
      />

      {/* Animated shimmer effect */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          borderRadius: '12px'
        }}
        initial={{ x: '-100%' }}
        animate={{ x: '200%' }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut'
        }}
      />

      {/* Floating particles */}
      {isActive &&
        [1, 2, 3].map((i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              background: 'rgba(14, 165, 233, 0.6)',
              borderRadius: '50%',
              left: `${20 + i * 20}%`,
              top: '50%'
            }}
            animate={{
              y: [-2, -8, -2],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut'
            }}
          />
        ))}
    </motion.div>
  );

  return (
    <div className="relative">
      {/* Enhanced hover effect for non-active items */}
      <AnimatePresence>
        {hoveredPath &&
          hoveredPath !== cleanPathname &&
          navItemsSelected[hoveredPath] && (
            <div className="hidden lg:block absolute inset-0">
              <BackgroundIndicator
                isActive={false}
                x={navItemsSelected[hoveredPath].x}
                w={navItemsSelected[hoveredPath].w}
              />
            </div>
          )}
      </AnimatePresence>

      <div
        onMouseEnter={(e) => {
          const target = e.target as HTMLElement;
          const linkElement = target.closest('a');
          if (linkElement) {
            const href = linkElement.getAttribute('href');
            if (href && navItemsSelected[href]) {
              setHoveredPath(href);
            }
          }
        }}
        onMouseLeave={() => setHoveredPath(null)}
      >
        <LinksNav isMounted={isMounted} />
      </div>
    </div>
  );
};

export default NavItem;
