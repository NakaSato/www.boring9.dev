'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const pathname = usePathname();

  useEffect(() => {
    // Extract headings from the post content
    const elements = Array.from(document.querySelectorAll('h2, h3'));
    const headingItems = elements
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.substring(1)) // H2 -> 2, H3 -> 3
      }));

    setHeadings(headingItems);
    
    // Reset active heading when navigating to a new blog post
    setActiveId('');
  }, [pathname]);

  useEffect(() => {
    if (headings.length === 0) return;

    // Handle scroll to update active heading
    const handleScroll = () => {
      // Find all headings that are in viewport
      const headingElements = headings.map(({ id }) => 
        document.getElementById(id)
      );
      
      // Find the last heading that's above the middle of the viewport
      const scrollPosition = window.scrollY + 150;
      
      const currentHeading = headingElements
        .filter((heading): heading is HTMLElement => heading !== null)
        .findLast((heading) => heading.offsetTop <= scrollPosition);
      
      if (currentHeading) {
        setActiveId(currentHeading.id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check on mount
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <div className="hidden xl:block sticky top-32 max-h-[calc(100vh-9rem)] overflow-auto">
      <div className="w-64 bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-lg font-bold mb-4">Table of Contents</h2>
        <nav>
          <ul className="flex flex-col space-y-1">
            {headings.map((heading) => (
              <li 
                key={heading.id}
                className={`${
                  heading.level === 3 ? 'ml-4' : ''
                }`}
              >
                <a
                  href={`#${heading.id}`}
                  className={`text-sm hover:text-blue-400 block py-1 transition-colors ${
                    activeId === heading.id
                      ? 'text-blue-400 font-medium'
                      : 'text-gray-400'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(heading.id)?.scrollIntoView({
                      behavior: 'smooth'
                    });
                    setActiveId(heading.id);
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
