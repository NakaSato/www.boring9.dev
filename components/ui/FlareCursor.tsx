'use client';

import React, { useState, useEffect } from 'react';

const FlareCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [flareSize, setFlareSize] = useState(30);
  const [cursorStyle, setCursorStyle] = useState({});
  const [isClient, setIsClient] = useState(false);

  const handleMouseMove = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });

    const target = e.target as Element;

    // Check cursor type safely
    if (target && typeof window !== 'undefined') {
      const isPointerCursor =
        window.getComputedStyle(target).getPropertyValue('cursor') ===
        'pointer';
      setIsPointer(isPointerCursor);

      // Update flare size and style based on pointer type
      setFlareSize(isPointerCursor ? 0 : 30);
      setCursorStyle(isPointerCursor ? { left: '-100px', top: '-100px' } : {});
    }
  };

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Don't render anything until we're on the client
  if (!isClient) {
    return null;
  }

  return (
    <div
      className={`flare ${isPointer ? 'pointer' : ''}`}
      style={{
        ...cursorStyle,
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${flareSize}px`,
        height: `${flareSize}px`
      }}
    ></div>
  );
};

export default FlareCursor;
