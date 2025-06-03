'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ExternalLink from '../ui/ExternalLink';
import AnimationContainer from '../utils/AnimationContainer';

interface CardProps {
  image: string;
  title: string;
  category: string;
  repo: string;
  link: string;
}

// Custom hook for media queries
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};

const Card = ({ image, title, category, repo, link }: CardProps) => {
  return (
    <div
      className="h-[350px] flex flex-col justify-between items-start p-4 bg-cover bg-center rounded-xl border border-gray-200/50 shadow-xl relative overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url(${image})` 
      }}
    >
      <div className="z-10">
        <span className="text-white opacity-95 font-bold uppercase bg-primary-600/80 inline-block px-2 py-1 rounded text-xs shadow-sm">
          {category}
        </span>
        <h3 className="text-white text-2xl font-bold mt-2 leading-tight drop-shadow-lg">
          {title}
        </h3>
      </div>

      <div className="flex items-center justify-end gap-3 z-10">
        <ExternalLink
          href={repo}
          customClassName="text-white inline-flex items-center rounded-lg bg-primary-600 p-2 hover:bg-primary-700 transition-all duration-300 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </ExternalLink>

        <ExternalLink
          href={link}
          customClassName="text-white inline-flex items-center rounded-lg bg-accent-600 p-2 hover:bg-accent-700 transition-all duration-300 shadow-lg"
        >
          <svg
            fill="currentColor"
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path
              fill="currentColor"
              d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12m2.557 16h-5.115c.546 2.46 1.441 4.114 2.558 5.744 1.194-1.741 2.041-3.41 2.557-5.744m-7.157 0h-4.567c1.236 2.825 3.704 4.972 6.755 5.716-1.048-1.733-1.783-3.658-2.188-5.716m13.767 0h-4.567c-.391 1.988-1.095 3.887-2.175 5.694 3.012-.763 5.517-2.895 6.742-5.694m-14.005-6h-4.962c-.267 1.313-.267 2.685 0 4h4.915c-.119-1.329-.101-2.672.047-4m7.661 0h-5.647c-.165 1.326-.185 2.672-.053 4h5.753c.133-1.328.111-2.673-.053-4m6.977 0h-4.963c.148 1.328.166 2.671.048 4h4.915c.26-1.285.273-2.648 0-4m-12.156-7.729c-3.077.732-5.567 2.886-6.811 5.729h4.653c.435-2.042 1.178-3.985 2.158-5.729m2.355-.048c-1.089 1.77-1.91 3.453-2.463 5.777h4.927c-.534-2.246-1.337-3.948-2.464-5.777m2.368.069c1.013 1.812 1.733 3.76 2.146 5.708h4.654c-1.232-2.816-3.762-4.958-6.8-5.708"
            />
          </svg>
        </ExternalLink>
      </div>
    </div>
  );
};

const favProjects = [
  {
    image:
      'https://raw.githubusercontent.com/enwuft/boring9-blog/main/public/page.png?token=GHSAT0AAAAAACJWYRGOFNHK4UUEBFBR336YZKR6MGQ',
    title: 'One To Many - A Brief Science',
    category: 'React - Context - TypeScript - CSS',
    repo: 'https://boring9.dev/',
    link: 'https://boring9.dev/'
  }
];

const FavProjects = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center',
    skipSnaps: false,
    dragFree: false
  });
  
  const mobile = useMediaQuery('(max-width: 640px)');

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <AnimationContainer customClassName="w-full">
      <div className="w-full p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-lg">
        <h2 className="font-bold text-2xl md:text-3xl tracking-tight mb-8 text-gray-900 text-start bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {favProjects.map((item, index) => (
                <div 
                  key={item.title} 
                  className={mobile ? "flex-[0_0_100%]" : "flex-[0_0_50%]"}
                >
                  <Card {...item} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-600/70 text-white hover:bg-primary-700/90 transition-all duration-300 flex items-center justify-center ${
              !canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M10 3L5 8l5 5V3z"/>
            </svg>
          </button>

          <button
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-600/70 text-white hover:bg-primary-700/90 transition-all duration-300 flex items-center justify-center ${
              !canScrollNext ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 3l5 5-5 5V3z"/>
            </svg>
          </button>
        </div>
      </div>
    </AnimationContainer>
  );
};

export default FavProjects;
