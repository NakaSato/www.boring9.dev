import Link from 'next/link';
import HeaderAnimation from '../utils/HeaderAnimation';
import MobileMenuNav from './MobileMenuNav';
import NavItem from './NavItem';

const Header = () => {
  return (
    <HeaderAnimation>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between relative border-gray-800/20 py-6 sm:py-8 bg-gray-900/80 backdrop-blur-sm">
        <div className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            <Link href="/" className="hover:text-primary-400 transition-colors">
              <strong className="text-primary-400">Chanthawat</strong>();
            </Link>
          </h1>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <MobileMenuNav />
          <NavItem />
        </div>
      </nav>
    </HeaderAnimation>
  );
};

export default Header;
