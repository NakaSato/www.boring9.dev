'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import StaticHeader from './StaticHeader';

// Dynamically import the animated header with no SSR
const AnimatedHeader = dynamic(() => import('./Header'), {
  ssr: false
});

const ClientHeader = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show static header on server and during hydration, then animated header on client
  if (!isClient) {
    return <StaticHeader />;
  }

  return <AnimatedHeader />;
};

export default ClientHeader;
