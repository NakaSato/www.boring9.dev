'use client';

import Link from 'next/link';

const LinksMenu = [
  {
    name: 'Home',
    path: '/',
    delay: '150ms'
  },
  {
    name: 'About',
    path: '/about',
    delay: '175ms'
  },
  {
    name: 'Projects',
    path: '/projects',
    delay: '200ms'
  },
  {
    name: 'Blog',
    path: '/blog',
    delay: '225ms'
  }
];

const LinksMenuNav = () => {
  const handleLinkClick = () => {
    // Close the menu by restoring body scroll
    document.body.style.overflow = '';
  };

  return (
    <>
      {LinksMenu.map(({ name, path, delay }) => (
        <li
          key={name}
          className="w-full"
          style={{ transitionDelay: delay }}
        >
          <Link 
            href={path} 
            onClick={handleLinkClick}
            className="block w-full px-4 py-3 text-gray-100 hover:text-white hover:bg-gray-800/50 rounded-md transition-all duration-200 text-sm font-medium border-b border-gray-700/30 last:border-b-0"
          >
            {name}
          </Link>
        </li>
      ))}
    </>
  );
};

export default LinksMenuNav;
