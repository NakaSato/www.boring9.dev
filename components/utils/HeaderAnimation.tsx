'use client';

import useScrollPosition from '@/hooks/useScrollPosition';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMemo, useEffect, useState } from 'react';

const HeaderAnimation = ({ children }: { children: React.ReactNode }) => {
  const scrollPosition = useScrollPosition();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Advanced scroll-based visibility logic
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      }
      // Hide header when scrolling down past threshold
      else if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    const throttledScroll = throttle(handleScroll, 16); // ~60fps
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [lastScrollY, isMounted]);

  // Enhanced scroll thresholds for smoother transitions
  const isScrolled = scrollPosition > 10;
  const isDeepScrolled = scrollPosition > 80;
  const isVeryDeepScrolled = scrollPosition > 200;

  // Motion values for smooth animations
  const headerY = useMotionValue(0);
  const headerOpacity = useMotionValue(1);
  const headerScale = useMotionValue(1);

  // Spring animations for smooth transitions
  const springY = useSpring(headerY, { stiffness: 300, damping: 30 });
  const springOpacity = useSpring(headerOpacity, {
    stiffness: 400,
    damping: 40
  });
  const springScale = useSpring(headerScale, { stiffness: 500, damping: 35 });

  // Update motion values based on visibility
  useEffect(() => {
    headerY.set(isVisible ? 0 : -100);
    headerOpacity.set(isVisible ? 1 : 0);
    headerScale.set(isVisible ? 1 : 0.95);
  }, [isVisible, headerY, headerOpacity, headerScale]);

  // Memoize className computation for performance
  const headerClassName = useMemo(() => {
    const baseClasses =
      'w-full sticky top-0 flex flex-col justify-center items-center z-50 transition-all duration-500 ease-out';

    if (isVeryDeepScrolled) {
      return `${baseClasses} backdrop-blur-xl bg-gradient-to-r from-gray-900/98 via-black/96 to-gray-900/98 border-b border-primary-500/50 shadow-2xl shadow-primary-500/25`;
    } else if (isDeepScrolled) {
      return `${baseClasses} backdrop-blur-xl bg-gradient-to-r from-gray-900/96 via-black/92 to-gray-900/96 border-b border-primary-500/40 shadow-xl shadow-primary-500/20`;
    } else if (isScrolled) {
      return `${baseClasses} backdrop-blur-lg bg-gradient-to-r from-gray-900/94 via-black/88 to-gray-900/94 border-b border-primary-500/30 shadow-lg shadow-primary-500/15`;
    } else {
      return `${baseClasses} bg-gradient-to-r from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md border-b border-gray-800/40`;
    }
  }, [isScrolled, isDeepScrolled, isVeryDeepScrolled]);

  // Throttle function for performance
  const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean;
    return function (this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  if (!isMounted) {
    return (
      <header className="w-full sticky top-0 flex flex-col justify-center items-center z-50 bg-gradient-to-r from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md border-b border-gray-800/40">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ width: '100%' }}
        >
          {children}
        </motion.div>
      </header>
    );
  }

  return (
    <header className={`${headerClassName} group`}>
      <motion.div
        style={{
          y: springY,
          opacity: springOpacity,
          scale: springScale,
          width: '100%',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden'
        }}
        whileHover={{
          filter: 'drop-shadow(0 25px 50px rgba(14, 165, 233, 0.2))',
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            delay: 0.1,
            duration: 0.6
          }}
          style={{ width: '100%', position: 'relative' }}
        >
          {/* Animated background gradient */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.05), transparent)',
              borderRadius: '0 0 16px 16px',
              opacity: 0,
              pointerEvents: 'none'
            }}
            initial={{ x: '-100%' }}
            whileHover={{
              x: '100%',
              opacity: 1
            }}
            transition={{
              x: { duration: 0.8, ease: 'easeInOut' },
              opacity: { duration: 0.5 }
            }}
          />
          {children}
        </motion.div>
      </motion.div>
    </header>
  );
};

export default HeaderAnimation;
