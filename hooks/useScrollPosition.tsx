'use client';

import { useEffect, useState, useCallback } from 'react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Throttle scroll events for better performance
  const throttle = useCallback((func: Function, limit: number) => {
    let inThrottle: boolean;
    return function (this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updatePosition = throttle(() => {
      setScrollPosition(window.pageYOffset);
    }, 16); // ~60fps

    // Set initial position
    setScrollPosition(window.pageYOffset);

    window.addEventListener('scroll', updatePosition, { passive: true });

    return () => window.removeEventListener('scroll', updatePosition);
  }, [throttle]);

  return scrollPosition;
};

export default useScrollPosition;
