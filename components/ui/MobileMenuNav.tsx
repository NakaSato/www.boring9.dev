'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import useMenuNav from '@/hooks/useMenuNav';
import LinksMenuNav from './LinksMenuNav';

// Stagger the link reveal once the sheet has slid in.
const list = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.12 }
  }
};

const Burger = ({ isOpen }: { isOpen: boolean }) => {
  const bar = 'absolute left-0 block h-0.5 w-5 rounded-full bg-current';
  return (
    <span className="relative block h-3.5 w-5">
      <motion.span
        className={`${bar} top-0`}
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
      <motion.span
        className={`${bar} bottom-0`}
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      />
    </span>
  );
};

const MobileMenuNav = () => {
  const { isMenuOpen, toggleMenu, closeMenu } = useMenuNav();
  const pathname = usePathname();

  // Close when the route changes.
  useEffect(() => {
    closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll + close on Escape while open.
  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen]);

  return (
    <div className="flex lg:hidden">
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        data-magnetic="true"
        data-magnetic-strength="0.5"
        className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:bg-white/10 hover:text-primary-400"
      >
        <Burger isOpen={isMenuOpen} />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            />

            {/* Top sheet */}
            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed inset-x-0 top-0 z-50 origin-top border-b border-white/10 bg-gray-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
            >
              <div className="w-full max-w-4xl mx-auto px-5 sm:px-8">
                <div className="flex items-center justify-between py-5">
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className="font-bold text-lg uppercase tracking-tight text-gray-50 transition-colors duration-200 hover:text-primary-400"
                  >
                    Chanthawat<span className="text-primary-400">.</span>
                  </Link>
                  <button
                    type="button"
                    onClick={closeMenu}
                    aria-label="Close menu"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-300 transition-colors duration-200 hover:bg-white/5 hover:text-primary-400"
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>

                <motion.div
                  variants={list}
                  initial="hidden"
                  animate="show"
                  className="pb-8"
                >
                  <LinksMenuNav onNavigate={closeMenu} />
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenuNav;
