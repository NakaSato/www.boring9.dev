'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import NavItem from './NavItem';

// Dynamically import animated header animation wrapper with a smooth transition
const AnimatedHeader = dynamic(() => import('../utils/HeaderAnimation'), {
  ssr: false,
  loading: () => null
});

// Simple static header component for initial render
const StaticHeader = () => (
  <header className="w-full sticky top-0 z-50 bg-black border-b border-gray-800/40">
    <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between py-6 sm:py-8">
      <div className="flex-shrink-0">
        <h1 className="text-xl md:text-2xl font-bold text-white">
          <a href="/" className="hover:text-primary-300">
            <strong className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
              Chanthawat
            </strong>
            <span className="text-blue-400">();</span>
          </a>
        </h1>
      </div>
      <NavItem />
    </nav>
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
