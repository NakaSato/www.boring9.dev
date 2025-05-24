'use client';

import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

export const useChromePerformance = (componentName: string) => {
  const startTimeRef = useRef<number | null>(null);
  const metricsRef = useRef<PerformanceMetrics[]>([]);

  useEffect(() => {
    // Mark the start of component render
    if (typeof window !== 'undefined' && 'performance' in window) {
      startTimeRef.current = performance.now();
      
      return () => {
        // Mark the end and calculate render time
        if (startTimeRef.current) {
          const endTime = performance.now();
          const renderTime = endTime - startTimeRef.current;
          
          const metrics: PerformanceMetrics = {
            renderTime,
            componentName,
            timestamp: Date.now()
          };
          
          metricsRef.current.push(metrics);
          
          // Log performance data in development
          if (process.env.NODE_ENV === 'development') {
            console.log(`Chrome Performance [${componentName}]:`, {
              renderTime: `${renderTime.toFixed(2)}ms`,
              timestamp: new Date(metrics.timestamp).toISOString()
            });
          }
          
          // Store in performance timeline
          if ('mark' in performance && 'measure' in performance) {
            performance.mark(`${componentName}-start`);
            performance.mark(`${componentName}-end`);
            performance.measure(
              `${componentName}-render`,
              `${componentName}-start`,
              `${componentName}-end`
            );
          }
        }
      };
    }
  }, [componentName]);

  // Function to get performance metrics
  const getMetrics = () => metricsRef.current;

  // Function to clear metrics
  const clearMetrics = () => {
    metricsRef.current = [];
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.clearMarks();
      performance.clearMeasures();
    }
  };

  // Function to get Chrome-specific performance entries
  const getChromeEntries = () => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      return performance.getEntriesByType('measure').filter(entry => 
        entry.name.includes(componentName.toLowerCase())
      );
    }
    return [];
  };

  return {
    getMetrics,
    clearMetrics,
    getChromeEntries
  };
};

// Hook for monitoring scroll performance
export const useChromeScrollPerformance = () => {
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let animationFrameId: number;

    const measureScrollPerformance = () => {
      const now = performance.now();
      frameCountRef.current++;

      // Calculate FPS every second
      if (now - lastTimeRef.current >= 1000) {
        const fps = frameCountRef.current;
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`Chrome Scroll FPS: ${fps}`);
        }
        
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      animationFrameId = requestAnimationFrame(measureScrollPerformance);
    };

    const handleScroll = () => {
      measureScrollPerformance();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
};

// Hook for monitoring Chrome paint performance
export const useChromePaintPerformance = (elementRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!elementRef.current || typeof window === 'undefined') return;

    const element = elementRef.current;

    // Use Intersection Observer to monitor when element enters/leaves viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            performance.mark('element-visible-start');
          } else {
            performance.mark('element-visible-end');
            
            try {
              performance.measure(
                'element-visibility-duration',
                'element-visible-start',
                'element-visible-end'
              );
              
              const measure = performance.getEntriesByName('element-visibility-duration')[0];
              if (measure && process.env.NODE_ENV === 'development') {
                console.log(`Chrome Paint Performance: ${measure.duration.toFixed(2)}ms`);
              }
            } catch (error) {
              // Ignore measurement errors
            }
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '50px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      performance.clearMarks();
      performance.clearMeasures();
    };
  }, [elementRef]);
};

export default {
  useChromePerformance,
  useChromeScrollPerformance,
  useChromePaintPerformance
};
