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

    // Chrome-optimized scroll handler with better viewport detection
    const handleScroll = () => {
      // Chrome-specific viewport calculations
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const headerOffset = 120; // Account for fixed header

      // Find all heading elements
      const headingElements = headings
        .map(({ id }) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);

      if (headingElements.length === 0) return;

      // Chrome-optimized intersection detection
      let activeHeading: HTMLElement | null = null;

      // Check for heading in the upper third of viewport (better for Chrome)
      const targetPosition =
        scrollPosition + viewportHeight * 0.3 + headerOffset;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        const elementTop = element.offsetTop;

        if (elementTop <= targetPosition) {
          activeHeading = element;
          break;
        }
      }

      // Fallback: if no heading found, use the first one if we're at the top
      if (!activeHeading && scrollPosition < 200) {
        activeHeading = headingElements[0];
      }

      if (activeHeading && activeHeading.id !== activeId) {
        setActiveId(activeHeading.id);
      }
    };

    // Chrome-optimized event listener with passive option
    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Initial check on mount
    setTimeout(handleScroll, 100); // Delay to ensure DOM is ready

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [headings, activeId]);

  // Simple throttle function for Chrome optimization
  function throttle(func: Function, limit: number) {
    let inThrottle: boolean;
    return function (this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  if (headings.length < 2) return null;

  return (
    <div className="hidden xl:block toc-container">
      <div className="toc-wrapper">
        <h2 className="text-lg font-bold mb-4 text-white">Table of Contents</h2>
        <nav className="toc-nav">
          <ul className="flex flex-col space-y-1">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={`${heading.level === 3 ? 'ml-4' : ''}`}
              >
                <a
                  href={`#${heading.id}`}
                  className={`toc-link ${
                    activeId === heading.id
                      ? 'toc-link-active'
                      : 'toc-link-inactive'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById(heading.id);
                    if (element) {
                      const headerHeight = 120; // Account for fixed header
                      const elementPosition = element.offsetTop - headerHeight;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
                      setActiveId(heading.id);
                    }
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
