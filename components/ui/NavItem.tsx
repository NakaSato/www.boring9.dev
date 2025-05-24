'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import LinksNav, { navItemsSelected } from './LinksNav';

const NavItem = () => {
  const [isMounted, setIsMounted] = useState(false);
  let pathname = usePathname() as string;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (pathname.includes('/blog/')) pathname = '/blog';

  return (
    <>
      {isMounted && navItemsSelected[pathname] ? (
        <div className="hidden lg:block" style={{
          // Chrome optimization: Navigation container
          contain: "layout style",
          transform: "translateZ(0)"
        }}>
          <div className="absolute z-[-1]">
            <motion.div
              layoutId="id_1"
              initial={{
                opacity: 0,
                x: navItemsSelected[pathname].x,
                y: navItemsSelected[pathname].y
              }}
              animate={{
                opacity: 1,
                x: navItemsSelected[pathname].x,
                width: navItemsSelected[pathname].w
              }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 30
              }}
              style={{
                // Chrome optimization: Motion element
                willChange: "transform, opacity, width",
                transform: "translateZ(0)"
              }}
            />
          </div>
        </div>
      ) : null}

      <LinksNav isMounted={isMounted} />
    </>
  );
};

export default NavItem;
