import { ExternalLinkProps } from '@/types';

const ExternalLink = ({
  href,
  customClassName = 'flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-all duration-300 ease-in-out hover:translate-x-1',
  children,
  title
}: ExternalLinkProps) => (
  <a
    className={customClassName}
    target="_blank"
    rel="noreferrer"
    href={href}
    title={title}
  >
    {children}
  </a>
);

export default ExternalLink;
