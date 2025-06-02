import Link from 'next/link';

const StaticHeader = () => {
  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-lg border-b border-gray-800/50 animate-in slide-in-from-top duration-500">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between relative py-6 sm:py-8">
        {/* Brand Logo */}
        <div className="flex-shrink-0 animate-in fade-in-0 slide-in-from-left duration-700">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            <Link
              href="/"
              className="hover:text-primary-300 transition-all duration-300 hover:scale-105 inline-block group relative overflow-hidden"
            >
              <strong className="relative z-10 bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                Chanthawat();
              </strong>
            </Link>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 animate-in fade-in-0 slide-in-from-right duration-700 delay-200">
          <div className="flex space-x-1">
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-800/50 hover:text-white relative group animate-in fade-in-0 delay-300"
            >
              Home
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-800/50 hover:text-white relative group animate-in fade-in-0 delay-500"
            >
              About
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/projects"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-800/50 hover:text-white relative group animate-in fade-in-0 delay-700"
            >
              Projects
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-800/50 hover:text-white relative group animate-in fade-in-0 delay-1000"
            >
              Contact
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden animate-in fade-in-0 slide-in-from-right duration-700 delay-200">
          <button className="p-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200 hover:scale-110 group">
            <svg
              className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default StaticHeader;
