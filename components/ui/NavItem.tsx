'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LinksNav, { navItemsSelected } from './LinksNav';

const NavItem = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const cleanPathname = pathname.includes('/blog/') ? '/blog' : pathname;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && navItemsSelected[cleanPathname] ? (
        <>
          <div className="hidden lg:block">
            <div className="absolute z-[-1]">
              <motion.div
                layoutId="id_1"
                initial={{
                  opacity: 0,
                  x: navItemsSelected[cleanPathname].x,
                  y: navItemsSelected[cleanPathname].y
                }}
                animate={{
                  opacity: 1,
                  x: navItemsSelected[cleanPathname].x,
                  width: navItemsSelected[cleanPathname].w
                }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 30
                }}
              />
            </div>
          </div>
        </>
      ) : null}

      <LinksNav isMounted={isMounted} />
    </>
  );
};

export default NavItem;
