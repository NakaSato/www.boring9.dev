'use client';

import LinksNav from './LinksNav';
import MobileMenuNav from './MobileMenuNav';

const NavItem = () => {
  return (
    <div className="flex items-center">
      <LinksNav />
      <MobileMenuNav />
    </div>
  );
};

export default NavItem;
