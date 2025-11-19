'use client';

import useScrollPosition from '@/hooks/useScrollPosition';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMemo, useEffect, useState } from 'react';
import NavItem from '@/components/ui/NavItem';

const HeaderAnimation = ({ children }: { children?: React.ReactNode } = {}) => {
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
      return `${baseClasses} backdrop-blur-xl border-b border-primary-500/50 shadow-2xl shadow-primary-500/25`;
    } else if (isDeepScrolled) {
      return `${baseClasses} backdrop-blur-xl border-b border-primary-500/40 shadow-xl shadow-primary-500/20`;
    } else if (isScrolled) {
      return `${baseClasses} backdrop-blur-lg border-b border-primary-500/30 shadow-lg shadow-primary-500/15`;
    } else {
      return `${baseClasses} backdrop-blur-md border-b border-gray-800/40`;
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
      <header className="w-full sticky top-0 flex flex-col justify-center items-center z-50 backdrop-blur-md border-b border-gray-800/40">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ width: '100%' }}
        >
          {children || (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between py-6 sm:py-8">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                <a href="/" className="hover:text-primary-300">
                  <strong className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
                    Chanthawat
                  </strong>
                  <span className="text-blue-400">();</span>
                </a>
              </h1>
              <NavItem />
            </div>
          )}
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
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between py-6 sm:py-8">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            <a href="/" className="hover:text-primary-300">
              <strong className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
                Chanthawat
              </strong>
              <span className="text-blue-400">();</span>
            </a>
          </h1>
          <NavItem />
        </div>
      </motion.div>
    </header>
  );
};

export default HeaderAnimation;
