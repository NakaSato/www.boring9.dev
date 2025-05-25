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
  return (
    <>
      {LinksMenu.map(({ name, path, delay }) => (
        <li
          key={name}
          className="w-full border-b border-gray-300 py-3 last:border-0"
          style={{ transitionDelay: delay }}
        >
          <Link 
            href={path} 
            className="text-gray-800 hover:text-primary-600 transition-colors text-lg font-medium flex items-center justify-start"
          >
            {name}
          </Link>
        </li>
      ))}
    </>
  );
};

export default LinksMenuNav;
