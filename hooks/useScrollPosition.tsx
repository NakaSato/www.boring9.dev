'use client';

import { useEffect, useState } from 'react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    let ticking = false;
    
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
      ticking = false;
    };

    // Chrome optimization: Use requestAnimationFrame for smooth scrolling
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updatePosition);
        ticking = true;
      }
    };

    // Set initial position
    updatePosition();
    
    // Chrome optimization: Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Return 0 until mounted to prevent hydration mismatch
  return isMounted ? scrollPosition : 0;
}

export default useScrollPosition;