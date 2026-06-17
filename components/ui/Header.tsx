'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import HeaderBar from './HeaderBar';

// Dynamically import animated header animation wrapper with a smooth transition
const AnimatedHeader = dynamic(() => import('../utils/HeaderAnimation'), {
  ssr: false,
  loading: () => null
});

// Simple static header component for initial render
const StaticHeader = () => (
  <header className="w-full sticky top-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-white/10">
    <HeaderBar />
  </header>
);

const Header = () => {
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
  // @ts-ignore - React type conflict with react-syntax-highlighter types
  return <AnimatedHeader />;
};

export default Header;
