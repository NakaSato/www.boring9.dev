'use client';

import Link from 'next/link';
import NavItem from './NavItem';

// Shared header row: brand wordmark + navigation.
// Single source used by the static and animated headers.
const HeaderBar = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 flex items-center justify-between py-5">
      <Link
        href="/"
        data-magnetic="true"
        data-magnetic-strength="0.3"
        className="flex-shrink-0 font-bold text-lg sm:text-xl uppercase tracking-tight text-gray-50 hover:text-primary-400 transition-colors duration-200"
      >
        Chanthawat<span className="text-primary-400">.</span>
      </Link>
      <NavItem />
    </div>
  );
};

export default HeaderBar;
