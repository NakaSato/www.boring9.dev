import Link from 'next/link';
import HeaderAnimation from '../utils/HeaderAnimation';
import MobileMenuNav from './MobileMenuNav';
import NavItem from './NavItem';

const Header = () => {
  return (
    <HeaderAnimation>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between relative py-6 sm:py-8">
        <div className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            <Link href="/" className="hover:text-primary-300 transition-all duration-300 hover:scale-105 inline-block group">
              <strong className="text-gradient-primary group-hover:filter group-hover:drop-shadow-lg">Chanthawat</strong>
              <span className="text-primary-400 ml-1 group-hover:text-primary-300 transition-colors duration-300">();</span>
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
