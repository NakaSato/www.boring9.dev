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
          className="w-full border-b border-gray-600/30 py-3 last:border-0"
          style={{ transitionDelay: delay }}
        >
          <Link 
            href={path} 
            className="text-white hover:text-primary-400 transition-all duration-300 text-lg font-medium flex items-center justify-start group"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-300">{name}</span>
          </Link>
        </li>
      ))}
    </>
  );
};

export default LinksMenuNav;
