import Link from 'next/link';
import HeaderAnimation from '../utils/HeaderAnimation';
import MobileMenuNav from './MobileMenuNav';
import NavItem from './NavItem';

const Header = () => {
  return (
    <HeaderAnimation>
      <nav className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row items-center justify-between relative py-6 sm:py-8 text-gray-100" style={{
        // Chrome optimization: Enable hardware acceleration for navigation
        willChange: "transform",
        transform: "translateZ(0)",
        contain: "layout style"
      }}>
        <div className="flex-shrink-0" style={{
          // Chrome optimization: Optimize logo container
          transform: "translateZ(0)"
        }}>
          <h1 className="text-lg sm:text-xl font-bold">
            <Link 
              href="/" 
              className="hover:text-gray-300 transition-colors duration-200"
              style={{
                // Chrome optimization: Better link performance
                willChange: "color",
                transform: "translateZ(0)"
              }}
            >
              <strong>Chanthawat</strong>();
            </Link>
          </h1>
        </div>

        <div className="flex items-center space-x-4" style={{
          // Chrome optimization: Optimize navigation container
          transform: "translateZ(0)",
          contain: "layout"
        }}>
          <MobileMenuNav />
          <NavItem />
        </div>
      </nav>
    </HeaderAnimation>
  );
};

export default Header;
