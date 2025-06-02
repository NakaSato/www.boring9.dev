'use client';

import { useState, useEffect } from 'react';
import StaticHeader from './StaticHeader';
import dynamic from 'next/dynamic';

// Dynamically import animated components with a smooth transition
const AnimatedHeader = dynamic(() => import('./Header'), {
  ssr: false,
  loading: () => null // Don't show loading component to avoid layout shift
});

const EnhancedHeader = () => {
  const [mounted, setMounted] = useState(false);
  const [showAnimated, setShowAnimated] = useState(false);

  useEffect(() => {
    // Set mounted to true after component mounts
    setMounted(true);

    // Add a small delay before showing animated header to ensure smooth transition
    const timer = setTimeout(() => {
      setShowAnimated(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // During server-side rendering and initial client render, show static header
  if (!mounted || !showAnimated) {
    return <StaticHeader />;
  }

  // After hydration and delay, show animated header
  return <AnimatedHeader />;
};

export default EnhancedHeader;
