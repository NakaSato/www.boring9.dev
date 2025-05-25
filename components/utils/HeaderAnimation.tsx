'use client';

import useScrollPosition from '@/hooks/useScrollPosition';
import { motion } from 'framer-motion';
import { useMemo, useEffect, useState } from 'react';

const HeaderAnimation = ({ children }: { children: React.ReactNode }) => {
  const scrollPosition = useScrollPosition();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Enhanced scroll thresholds for smoother transitions
  const isScrolled = scrollPosition > 10;
  const isDeepScrolled = scrollPosition > 80;
  const isVeryDeepScrolled = scrollPosition > 200;
  
  // Memoize className computation for performance
  const headerClassName = useMemo(() => {
    const baseClasses = 'w-full sticky top-0 flex flex-col justify-center items-center z-50 transition-all duration-300 ease-out';
    
    if (isVeryDeepScrolled) {
      return `${baseClasses} backdrop-blur-xl bg-gradient-to-r from-gray-900/98 via-black/96 to-gray-900/98 border-b border-primary-500/40 shadow-2xl shadow-primary-500/20`;
    } else if (isDeepScrolled) {
      return `${baseClasses} backdrop-blur-xl bg-gradient-to-r from-gray-900/96 via-black/92 to-gray-900/96 border-b border-primary-500/30 shadow-xl shadow-primary-500/15`;
    } else if (isScrolled) {
      return `${baseClasses} backdrop-blur-lg bg-gradient-to-r from-gray-900/94 via-black/88 to-gray-900/94 border-b border-primary-500/20 shadow-lg shadow-primary-500/10`;
    } else {
      return `${baseClasses} bg-gradient-to-r from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md border-b border-gray-800/40`;
    }
  }, [isScrolled, isDeepScrolled, isVeryDeepScrolled]);

  if (!isMounted) {
    return (
      <header className="w-full sticky top-0 flex flex-col justify-center items-center z-50 bg-gradient-to-r from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md border-b border-gray-800/40">
        <div style={{ width: '100%' }}>
          {children}
        </div>
      </header>
    );
  }

  return (
    <header 
      className={`${headerClassName} group hover:shadow-2xl hover:shadow-primary-500/25 transition-all duration-300`}
      style={{
        willChange: 'transform, opacity, background-color',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.995 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          type: 'spring',
          stiffness: 500,
          damping: 30,
          delay: 0.05,
          duration: 0.4
        }}
        style={{ width: '100%' }}
      >
        {children}
      </motion.div>
    </header>
  );
};

export default HeaderAnimation;
