'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import FlareCursor with no SSR
const FlareCursor = dynamic(() => import('./FlareCursor'), {
  ssr: false,
  loading: () => null
});

const ClientOnlyFlareCursor = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if it's a mobile device
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Only render on client side after hydration and not on mobile
  if (!isMounted || isMobile) {
    return null;
  }

  return <FlareCursor />;
};

export default ClientOnlyFlareCursor;
