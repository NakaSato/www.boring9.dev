'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import HeaderAnimation from '../utils/HeaderAnimation';
import MobileMenuNav from './MobileMenuNav';
import NavItem from './NavItem';

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <HeaderAnimation>
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between relative py-6 sm:py-8">
          {/* Brand Logo with Enhanced Animation */}
          <div className="flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
            >
              <h1 className="text-xl md:text-2xl font-bold text-white">
                <Link
                  href="/"
                  data-magnetic="true"
                  data-magnetic-strength="0.4"
                  className="hover:text-primary-300 transition-all duration-300 hover:scale-105 inline-block group relative overflow-hidden"
                >
                  {/* Animated background for brand */}
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to right, rgba(14, 165, 233, 0), rgba(14, 165, 233, 0.1), rgba(14, 165, 233, 0))',
                      borderRadius: '8px'
                    }}
                    initial={{ x: '-100%', opacity: 0 }}
                    whileHover={{ x: '100%', opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />

                  <motion.strong
                    style={{
                      position: 'relative',
                      zIndex: 10,
                      background:
                        'linear-gradient(135deg, #3b82f6, #06b6d4, #10b981)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                    whileHover={{
                      scale: 1.05,
                      filter: 'drop-shadow(0 0 20px rgba(14, 165, 233, 0.5))'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Chanthawat
                  </motion.strong>

                  <motion.span
                    style={{
                      position: 'relative',
                      zIndex: 10,
                      color: '#60a5fa',
                      marginLeft: '4px'
                    }}
                    initial={{ rotate: 0 }}
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      color: '#3b82f6'
                    }}
                    transition={{
                      rotate: { duration: 0.5, ease: 'easeInOut' },
                      color: { duration: 0.3 }
                    }}
                  >
                    ();
                  </motion.span>
                </Link>
              </h1>
            </motion.div>
          </div>

          {/* Navigation with Staggered Animation */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
              whileHover={{ scale: 1.02 }}
            >
              <MobileMenuNav />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
              whileHover={{ scale: 1.02 }}
            >
              <NavItem />
            </motion.div>
          </div>
        </nav>
      </HeaderAnimation>
    </motion.div>
  );
};

export default Header;
