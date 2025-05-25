'use client';

import { ReactNode } from 'react';

interface ResponsiveBlogLayoutProps {
  children: ReactNode;
  variant?: 'default' | 'wide' | 'compact';
  enableContainer?: boolean;
}

export default function ResponsiveBlogLayout({ 
  children, 
  variant = 'default',
  enableContainer = true 
}: ResponsiveBlogLayoutProps) {
  const getLayoutClasses = () => {
    const baseClasses = 'w-full';
    
    if (!enableContainer) return baseClasses;
    
    switch (variant) {
      case 'wide':
        return `${baseClasses} max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12`;
      case 'compact':
        return `${baseClasses} max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`;
      default:
        return `${baseClasses} blog-grid-container px-4 sm:px-6 lg:px-8`;
    }
  };

  return (
    <div className={getLayoutClasses()}>
      {children}
    </div>
  );
}
