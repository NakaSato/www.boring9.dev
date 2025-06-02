'use client';

import styles from '../../styles/mobileMenu.module.css';
import { JSX, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import useMenuNav from '@/hooks/useMenuNav';
import LinksMenuNav from './LinksMenuNav';

const MenuIcon = (
  props: JSX.IntrinsicElements['svg'] & { isOpen?: boolean }
) => {
  return (
    <motion.div
      animate={{
        rotate: props.isOpen ? 180 : 0,
        opacity: props.isOpen ? 0 : 1,
        scale: props.isOpen ? 0.8 : 1
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ position: 'absolute' }}
    >
      <svg
        className="h-5 w-5 text-gray-300 hover:text-primary-400 transition-colors"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M2.5 7.5H17.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 12.5H17.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
};

const CrossIcon = (
  props: JSX.IntrinsicElements['svg'] & { isOpen?: boolean }
) => {
  return (
    <motion.div
      animate={{
        rotate: props.isOpen ? 0 : -180,
        opacity: props.isOpen ? 1 : 0,
        scale: props.isOpen ? 1 : 0.8
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ position: 'absolute' }}
    >
      <svg
        className="h-5 w-5 text-gray-300 hover:text-primary-400 transition-colors"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
      >
        <path d="M18 6L6 18" />
        <path d="M6 6l12 12" />
      </svg>
    </motion.div>
  );
};

const MobileMenuNav = () => {
  const { isMenuOpen, toggleMenu, isMenuMounted, isMenuRendered } =
    useMenuNav();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return function cleanup() {
      document.body.style.overflow = '';
    };
  }, []);

  // Prevent hydration mismatch by not rendering dynamic parts until mounted
  if (!isMounted) {
    return (
      <button
        className="flex lg:hidden items-center justify-center w-10 h-10 rounded-md opacity-50"
        aria-label="Toggle menu"
        type="button"
        disabled={true}
      >
        <div style={{ position: 'relative' }}>
          <MenuIcon isOpen={false} />
        </div>
      </button>
    );
  }

  return (
    <>
      <motion.button
        {...({
          className: cn(
            styles.burger,
            'visible lg:hidden hover:bg-primary-500/10 rounded-lg p-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/20 relative overflow-hidden'
          ),
          'aria-label': 'Toggle menu',
          'data-magnetic': 'true',
          'data-magnetic-strength': '0.6',
          type: 'button',
          onClick: toggleMenu
        } as any)}
        whileHover={{
          scale: 1.05,
          backgroundColor: 'rgba(14, 165, 233, 0.1)'
        }}
        whileTap={{
          scale: 0.95
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Ripple effect */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '8px',
            background:
              'radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)',
            opacity: 0
          }}
          animate={{
            scale: isMenuOpen ? [1, 1.5] : 1,
            opacity: isMenuOpen ? [0.5, 0] : 0
          }}
          transition={{ duration: 0.3 }}
        />

        <div style={{ position: 'relative', width: '20px', height: '20px' }}>
          <MenuIcon isOpen={isMenuOpen} />
          <CrossIcon isOpen={isMenuOpen} />
        </div>
      </motion.button>

      <AnimatePresence mode="wait">
        {isMenuMounted && (
          <motion.ul
            {...({
              className: cn(
                styles.menu,
                'flex flex-col items-start justify-center absolute right-0 backdrop-blur-xl bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 text-end p-6 rounded-xl shadow-2xl border border-primary-500/30 z-50 overflow-hidden',
                isMenuRendered && styles.menuRendered
              )
            } as any)}
            initial={{
              opacity: 0,
              scale: 0.95,
              y: -20,
              rotateX: -15
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              rotateX: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -20,
              rotateX: -15
            }}
            transition={{
              duration: 0.4,
              type: 'spring',
              stiffness: 300,
              damping: 30
            }}
          >
            {/* Animated background pattern */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(45deg, transparent, rgba(14, 165, 233, 0.05), transparent)',
                borderRadius: '12px'
              }}
              animate={{
                rotate: [0, 360]
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear'
              }}
            />

            {/* Content */}
            <motion.div
              style={{ position: 'relative', zIndex: 10 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <LinksMenuNav />
            </motion.div>
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenuNav;
