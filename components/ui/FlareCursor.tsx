'use client';

import React, { useState, useEffect } from 'react';

const FlareCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  const handleMouseMove = (e: any) => {
    setPosition({ x: e.clientX, y: e.clientY });

    const target = e.target;

    setIsPointer(
      window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
    );
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const flareSize = isPointer ? 0 : 30;

  const cursorStyle = isPointer ? { left: '-100px', top: '-100px' } : {};

  return (
    <div
      className={`flare ${isPointer ? 'pointer' : ''}`}
      style={{
        ...cursorStyle,
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${flareSize}px`,
        height: `${flareSize}px`,
        border: '2px solid rgba(var(--color-primary-500), 0.3)',
        background: 'radial-gradient(circle, rgba(var(--color-primary-500), 0.15) 0%, rgba(var(--color-secondary-500), 0.1) 70%, rgba(var(--color-accent-500), 0.05) 100%)',
        boxShadow: '0 0 10px rgba(var(--color-primary-500), 0.2)'
      }}
    ></div>
  );
};

export default FlareCursor;
