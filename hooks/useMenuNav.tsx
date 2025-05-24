'use client';

import { useState, useEffect } from 'react';
import useDelayedRender from 'use-delayed-render';

const useMenuNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300
    }
  );

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      // Re-enable body scroll
      document.body.style.overflow = '';
    } else {
      setIsMenuOpen(true);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }
  }

  // Close menu and restore scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    if (isMounted) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMenuOpen, isMounted]);

  return {
    isMenuOpen,
    toggleMenu,
    isMenuMounted: isMounted && isMenuMounted,
    isMenuRendered: isMounted && isMenuRendered,
    isMounted
  }
}

export default useMenuNav;