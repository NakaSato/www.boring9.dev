'use client';

import useScrollPosition from '@/hooks/useScrollPosition';
import { useMemo } from 'react';
import HeaderBar from '@/components/ui/HeaderBar';

const HeaderAnimation = ({ children }: { children?: React.ReactNode } = {}) => {
  const scrollPosition = useScrollPosition();

  // Enhanced scroll thresholds for smoother transitions
  const isScrolled = scrollPosition > 10;
  const isDeepScrolled = scrollPosition > 80;

  // Memoize className computation for performance
  const headerClassName = useMemo(() => {
    const baseClasses =
      'w-full sticky top-0 flex flex-col justify-center items-center z-50 transition-all duration-500 ease-out';

    if (isDeepScrolled) {
      return `${baseClasses} bg-gray-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40`;
    } else if (isScrolled) {
      return `${baseClasses} bg-gray-950/80 backdrop-blur-md border-b border-white/10`;
    } else {
      return `${baseClasses} bg-gray-950/60 backdrop-blur-md border-b border-white/5`;
    }
  }, [isScrolled, isDeepScrolled]);

  return (
    <header className={`${headerClassName} group`}>
      <div className="w-full">{children || <HeaderBar />}</div>
    </header>
  );
};

export default HeaderAnimation;
