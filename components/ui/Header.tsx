'use client';

import Link from 'next/link';
import MobileMenuNav from './MobileMenuNav';
import NavItem from './NavItem';

const Header = () => {
  return (
    <div>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between relative py-6 sm:py-8">
        {/* Brand Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            <Link href="/" className="inline-block relative">
              <strong
                className="relative z-10"
                style={{
                  background:
                    'linear-gradient(135deg, #3b82f6, #06b6d4, #10b981)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Chanthawat
              </strong>
              <span className="relative z-10 ml-1" style={{ color: '#60a5fa' }}>
                ();
              </span>
            </Link>
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <MobileMenuNav />
          <NavItem />
        </div>
      </nav>
    </div>
  );
};

export default Header;
