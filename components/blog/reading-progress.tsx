'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    // Add event listener for scroll
    window.addEventListener('scroll', updateReadingProgress);
    
    // Initial calculation
    updateReadingProgress();
    
    // Clean up
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-800" style={{
      willChange: "transform",
      transform: "translateZ(0)"
    }}>
      <div
        className="h-full bg-blue-500 transition-all duration-150 ease-out"
        style={{ 
          width: `${readingProgress}%`,
          willChange: "width, transform",
          transform: "translateZ(0)"
        }}
      ></div>
    </div>
  );
}
