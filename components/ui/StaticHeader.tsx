'use client';

import Link from 'next/link';

const StaticHeader = () => {
  return (
    <header className="w-full sticky top-0 z-50 bg-black border-b border-gray-800/40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between py-6 sm:py-8">
        <div className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            <Link href="/" className="hover:text-primary-300">
              <strong className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500">
                Chanthawat
              </strong>
              <span className="text-blue-400">();</span>
            </Link>
          </h1>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="hidden lg:flex items-center space-x-2">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300"
            >
              home
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300"
            >
              about
            </Link>
            <Link
              href="/projects"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300"
            >
              projects
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300"
            >
              blog
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default StaticHeader;
