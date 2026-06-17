'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, List } from 'lucide-react';

type Heading = {
  id: string;
  text: string;
  level: number;
};

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'));
    const headingItems = elements
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.substring(1))
      }));

    setHeadings(headingItems);
    setActiveId('');
    setOpen(false);
  }, [pathname]);

  // Mobile dropdown: close on outside click + Escape.
  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const headerOffset = 120;

      const headingElements = headings
        .map(({ id }) => document.getElementById(id))
        .filter((element): element is HTMLElement => element !== null);

      if (headingElements.length === 0) return;

      let activeHeading: HTMLElement | null = null;
      const targetPosition =
        scrollPosition + viewportHeight * 0.3 + headerOffset;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element.offsetTop <= targetPosition) {
          activeHeading = element;
          break;
        }
      }

      if (!activeHeading && scrollPosition < 200) {
        activeHeading = headingElements[0];
      }

      if (activeHeading && activeHeading.id !== activeId) {
        setActiveId(activeHeading.id);
      }
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener('scroll', throttledScroll, { passive: true });
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [headings, activeId]);

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

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 120, behavior: 'smooth' });
      setActiveId(id);
      setOpen(false);
    }
  };

  if (headings.length < 2) return null;

  const activeText =
    headings.find((h) => h.id === activeId)?.text || headings[0].text;

  return (
    <>
      {/* Mobile dropdown */}
      <div
        ref={mobileRef}
        className="sticky top-16 z-30 xl:hidden"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="toc-mobile-list"
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-gray-950/90 px-4 py-3 text-left backdrop-blur-md"
        >
          <span className="flex min-w-0 items-center gap-2">
            <List className="h-4 w-4 shrink-0 text-primary-400" />
            <span className="truncate text-sm text-gray-300">{activeText}</span>
          </span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-gray-500 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {open && (
          <nav
            id="toc-mobile-list"
            className="absolute inset-x-0 top-full mt-2 max-h-[60vh] overflow-y-auto rounded-xl border border-white/[0.08] bg-gray-950/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl"
          >
            <ul className="flex flex-col gap-0.5">
              {headings.map((heading) => {
                const isActive = activeId === heading.id;
                return (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      onClick={(e) => handleClick(e, heading.id)}
                      className={`block rounded-lg py-2 text-sm leading-snug transition-colors duration-200 ${
                        heading.level === 3 ? 'pl-7' : 'pl-3'
                      } pr-3 ${
                        isActive
                          ? 'bg-primary-500/10 text-primary-300'
                          : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                      }`}
                    >
                      {heading.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden xl:block w-60 shrink-0">
      <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto">
        <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-400">
          <span className="h-1 w-1 rounded-full bg-primary-500/60" />
          <span>On this page</span>
        </div>
        <nav>
          <ul className="flex flex-col gap-0.5 border-l border-white/[0.08]">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              return (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => handleClick(e, heading.id)}
                    className={`-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors duration-200 ${
                      heading.level === 3 ? 'pl-6' : 'pl-4'
                    } ${
                      isActive
                        ? 'border-primary-400 text-primary-300'
                        : 'border-transparent text-gray-500 hover:border-white/20 hover:text-gray-300'
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      </aside>
    </>
  );
}
