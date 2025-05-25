'use client';

import styles from '../../styles/mobileMenu.module.css';
import { JSX, useEffect, useState } from 'react';
import cn from 'classnames';
import useMenuNav from '@/hooks/useMenuNav';
import LinksMenuNav from './LinksMenuNav';

const MenuIcon = (props: JSX.IntrinsicElements['svg']) => {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-200"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CrossIcon = (props: JSX.IntrinsicElements['svg']) => {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-200"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

const MobileMenuNav = () => {
  const { isMenuOpen, toggleMenu, isMenuMounted, isMenuRendered } =
    useMenuNav();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return function cleanup() {
      document.body.style.overflow = '';
    };
  }, []);

  // Prevent hydration mismatch by not rendering dynamic parts until mounted
  if (!isMounted) {
    return (
      <button
        className="flex lg:hidden items-center justify-center w-10 h-10 rounded-md opacity-50"
        aria-label="Toggle menu"
        type="button"
        disabled={true}
      >
        <MenuIcon data-hide={false} />
      </button>
    );
  }

  return (
    <>
      <button
        className={cn(styles.burger, 'visible lg:hidden')}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />

        <CrossIcon data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <ul
          className={cn(
            styles.menu,
            'flex flex-col items-start justify-center absolute right-0 backdrop-blur-lg bg-white/90 text-end p-6 rounded-lg shadow-xl border border-gray-200 z-50',
            isMenuRendered && styles.menuRendered
          )}
        >
          <LinksMenuNav />
        </ul>
      )}
    </>
  );
};

export default MobileMenuNav;
