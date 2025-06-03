'use client';

import { useState, useRef, useEffect } from 'react';

interface CarouselProps {
  children: React.ReactNode[];
  slideSize?: string;
  slideGap?: string;
  slidesToScroll?: number;
  withControls?: boolean;
  loop?: boolean;
  breakpoints?: Array<{
    maxWidth: string;
    slideSize: string;
    slideGap?: number;
  }>;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

interface CarouselSlideProps {
  children: React.ReactNode;
}

export const CarouselSlide = ({ children }: CarouselSlideProps) => {
  return <div className="carousel-slide flex-shrink-0">{children}</div>;
};

const Carousel = ({
  children,
  slideSize = '50%',
  slideGap = '1rem',
  slidesToScroll = 1,
  withControls = true,
  loop = false,
  breakpoints = [],
  align = 'center',
  className = ''
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const totalSlides = children.length;
  const effectiveSlideSize = isMobile ? '100%' : slideSize;
  const effectiveSlidesToScroll = isMobile ? 1 : slidesToScroll;

  const nextSlide = () => {
    if (loop) {
      setCurrentIndex((prev) => (prev + effectiveSlidesToScroll) % totalSlides);
    } else {
      setCurrentIndex((prev) =>
        Math.min(prev + effectiveSlidesToScroll, totalSlides - 1)
      );
    }
  };

  const prevSlide = () => {
    if (loop) {
      setCurrentIndex((prev) =>
        prev === 0
          ? totalSlides - effectiveSlidesToScroll
          : prev - effectiveSlidesToScroll
      );
    } else {
      setCurrentIndex((prev) => Math.max(prev - effectiveSlidesToScroll, 0));
    }
  };

  const translateX = isMobile
    ? `translateX(-${currentIndex * 100}%)`
    : `translateX(-${currentIndex * (100 / (100 / parseFloat(slideSize.replace('%', ''))))}%)`;

  return (
    <div className={`relative w-full ${className}`}>
      <div className="overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: translateX,
            gap: isMobile ? '0.5rem' : slideGap
          }}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{
                width: effectiveSlideSize,
                paddingRight: isMobile ? '0.5rem' : slideGap
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {withControls && (
        <>
          <button
            onClick={prevSlide}
            disabled={!loop && currentIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-600/70 text-white border-none hover:bg-primary-700/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center z-10"
            aria-label="Previous slide"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>

          <button
            onClick={nextSlide}
            disabled={
              !loop && currentIndex >= totalSlides - effectiveSlidesToScroll
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-600/70 text-white border-none hover:bg-primary-700/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center z-10"
            aria-label="Next slide"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

Carousel.Slide = CarouselSlide;

export default Carousel;
