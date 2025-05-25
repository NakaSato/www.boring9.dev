'use client';

import { useState, useEffect } from 'react';
import FlareCursor from './FlareCursor';

const ClientOnlyFlareCursor = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only render on client side after hydration
  if (!isMounted) {
    return null;
  }

  return <FlareCursor />;
};

export default ClientOnlyFlareCursor;
