'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence
} from 'framer-motion';

interface CursorTrail {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  opacity: number;
}

interface MagneticElement {
  element: HTMLElement;
  rect: DOMRect;
  magneticStrength: number;
}

interface CursorModeProps {
  onModeChange: (mode: string) => void;
  currentMode: string;
}

// Simple Cursor Mode Selector Component
const CursorModeSelector = ({ onModeChange, currentMode }: CursorModeProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const modes = [
    { id: 'default', name: 'Classic', icon: '🎯' },
    { id: 'neon', name: 'Neon', icon: '✨' },
    { id: 'particle', name: 'Particles', icon: '💫' },
    { id: 'minimal', name: 'Minimal', icon: '⚪' },
    { id: 'rainbow', name: 'Rainbow', icon: '🌈' }
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 999999,
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(16px)',
        borderRadius: 16,
        padding: 16,
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div
        style={{
          color: 'white',
          fontSize: 14,
          marginBottom: 12,
          fontWeight: 500
        }}
      >
        Cursor Mode
        <div
          style={{
            fontSize: 12,
            color: 'rgba(156, 163, 175, 1)',
            display: 'block'
          }}
        >
          Ctrl+C to toggle
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 8
        }}
      >
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            data-magnetic="true"
            data-magnetic-strength="0.3"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              paddingLeft: 12,
              paddingRight: 12,
              paddingTop: 8,
              paddingBottom: 8,
              borderRadius: 8,
              transition: 'all 0.2s',
              background:
                currentMode === mode.id
                  ? 'rgba(59, 130, 246, 0.3)'
                  : 'rgba(255, 255, 255, 0.05)',
              border:
                currentMode === mode.id
                  ? '1px solid rgba(59, 130, 246, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
              color:
                currentMode === mode.id
                  ? 'rgba(147, 197, 253, 1)'
                  : 'rgba(209, 213, 219, 1)',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: 18 }}>{mode.icon}</span>
            <span style={{ fontSize: 14, fontWeight: 500 }}>{mode.name}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => setIsVisible(false)}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 24,
          height: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          transition: 'background 0.2s',
          cursor: 'pointer',
          border: 'none'
        }}
      >
        <span style={{ color: 'white', fontSize: 12 }}>×</span>
      </button>
    </div>
  );
};

const AdvancedFlareCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const [cursorVariant, setCursorVariant] = useState<
    'default' | 'hover' | 'click' | 'magnetic' | 'text'
  >('default');
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [cursorSize, setCursorSize] = useState(32);
  const [cursorMode, setCursorMode] = useState('default');

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Enhanced spring animations with different configs for different states
  const springConfig = {
    default: { stiffness: 500, damping: 28, mass: 0.5 },
    magnetic: { stiffness: 200, damping: 15, mass: 0.3 },
    text: { stiffness: 400, damping: 25, mass: 0.4 },
    click: { stiffness: 800, damping: 35, mass: 0.2 }
  };

  const currentConfig = isClicking
    ? springConfig.click
    : isHoveringText
    ? springConfig.text
    : magneticTarget
    ? springConfig.magnetic
    : springConfig.default;

  const springX = useSpring(cursorX, currentConfig);
  const springY = useSpring(cursorY, currentConfig);

  const trailIdRef = useRef(0);
  const lastTrailTime = useRef(0);
  const velocityRef = useRef({ x: 0, y: 0 });

  // Enhanced trail creation with variable opacity
  const addTrail = useCallback(
    (x: number, y: number, opacity: number = 0.6) => {
      const now = Date.now();
      if (now - lastTrailTime.current < 16) return; // Limit to 60fps

      lastTrailTime.current = now;

      const newTrail: CursorTrail = {
        id: trailIdRef.current++,
        x,
        y,
        timestamp: now,
        opacity
      };

      setTrails((prev) => {
        const filtered = prev.filter(
          (trail) => Date.now() - trail.timestamp < 500
        );
        return [...filtered, newTrail].slice(-15); // Keep last 15 trails
      });
    },
    []
  );

  // Enhanced magnetic detection
  const findMagneticElement = useCallback(
    (x: number, y: number): MagneticElement | null => {
      const magneticSelectors = [
        'button',
        'a',
        '[data-magnetic]',
        '.nav-item',
        '.btn',
        '[role="button"]'
      ];

      for (const selector of magneticSelectors) {
        const elements = document.querySelectorAll(selector);
        for (let i = 0; i < elements.length; i++) {
          const element = elements[i] as HTMLElement;
          const rect = element.getBoundingClientRect();
          const magneticRange = 60;

          if (
            x >= rect.left - magneticRange &&
            x <= rect.right + magneticRange &&
            y >= rect.top - magneticRange &&
            y <= rect.bottom + magneticRange
          ) {
            return {
              element: element,
              rect,
              magneticStrength: element.dataset.magneticStrength
                ? parseFloat(element.dataset.magneticStrength)
                : 0.4
            };
          }
        }
      }
      return null;
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;

      velocityRef.current = {
        x: newX - position.x,
        y: newY - position.y
      };

      setPosition({ x: newX, y: newY });

      // Magnetic interaction
      const magneticElement = findMagneticElement(newX, newY);

      if (magneticElement) {
        const rect = magneticElement.rect;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(newX - centerX, 2) + Math.pow(newY - centerY, 2)
        );
        const magneticStrength = magneticElement.magneticStrength;
        const maxDistance = 60;

        if (distance < maxDistance) {
          const pullStrength = (1 - distance / maxDistance) * magneticStrength;
          const magneticX = newX + (centerX - newX) * pullStrength;
          const magneticY = newY + (centerY - newY) * pullStrength;

          cursorX.set(magneticX);
          cursorY.set(magneticY);
          setMagneticTarget({ x: magneticX, y: magneticY });
          setCursorVariant('magnetic');
          setCursorSize(44);
        } else {
          setMagneticTarget(null);
          cursorX.set(newX);
          cursorY.set(newY);
        }
      } else {
        setMagneticTarget(null);
        cursorX.set(newX);
        cursorY.set(newY);
      }

      // Enhanced trail creation
      const velocity = Math.sqrt(
        Math.pow(velocityRef.current.x, 2) + Math.pow(velocityRef.current.y, 2)
      );
      const trailOpacity = Math.min(0.9, velocity / 8);

      // Different trail behavior based on cursor mode
      const shouldAddTrail =
        cursorMode === 'particle'
          ? Math.random() > 0.3
          : cursorMode === 'neon'
          ? Math.random() > 0.6
          : cursorMode === 'rainbow'
          ? Math.random() > 0.4
          : Math.random() > 0.7;

      if (shouldAddTrail && velocity > 1) {
        addTrail(newX, newY, trailOpacity);
      }

      const target = e.target as Element;

      if (target && typeof window !== 'undefined') {
        const computedStyle = window.getComputedStyle(target);
        const cursor = computedStyle.getPropertyValue('cursor');
        const isPointerCursor = cursor === 'pointer';

        const isTextElement = [
          'P',
          'H1',
          'H2',
          'H3',
          'H4',
          'H5',
          'H6',
          'SPAN',
          'DIV',
          'A'
        ].includes(target.tagName);
        const hasTextContent = Boolean(
          target.textContent && target.textContent.trim().length > 0
        );

        setIsHoveringText(isTextElement && hasTextContent);
        setIsPointer(isPointerCursor);

        if (!magneticTarget) {
          if (isPointerCursor) {
            setCursorVariant('hover');
            setCursorSize(52);
          } else if (isTextElement && hasTextContent) {
            setCursorVariant('text');
            setCursorSize(28);
          } else {
            setCursorVariant('default');
            setCursorSize(32);
          }
        }
      }
    },
    [
      cursorX,
      cursorY,
      addTrail,
      position,
      magneticTarget,
      findMagneticElement,
      cursorMode
    ]
  );

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
    setCursorVariant('click');
    setCursorSize(20);

    // Enhanced click effects based on mode
    const explosionCount =
      cursorMode === 'particle'
        ? 12
        : cursorMode === 'neon'
        ? 8
        : cursorMode === 'rainbow'
        ? 10
        : 6;

    for (let i = 0; i < explosionCount; i++) {
      setTimeout(() => {
        addTrail(
          position.x + (Math.random() - 0.5) * 30,
          position.y + (Math.random() - 0.5) * 30,
          1
        );
      }, i * 20);
    }
  }, [addTrail, position, cursorMode]);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
    if (magneticTarget) {
      setCursorVariant('magnetic');
      setCursorSize(44);
    } else if (isPointer) {
      setCursorVariant('hover');
      setCursorSize(52);
    } else if (isHoveringText) {
      setCursorVariant('text');
      setCursorSize(28);
    } else {
      setCursorVariant('default');
      setCursorSize(32);
    }
  }, [isPointer, isHoveringText, magneticTarget]);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  // Clean up old trails periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) =>
        prev.filter((trail) => Date.now() - trail.timestamp < 500)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Hide cursor on mobile devices
  useEffect(() => {
    const checkIsMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    };

    if (checkIsMobile()) {
      setIsClient(false);
    }
  }, []);

  if (!isClient) {
    return null;
  }

  // Get cursor styles based on mode
  const getCursorStyles = () => {
    const baseStyle = {
      position: 'fixed' as const,
      pointerEvents: 'none' as const,
      zIndex: 999999,
      borderRadius: '50%',
      mixBlendMode: 'screen' as const,
      left: springX,
      top: springY,
      x: '-50%',
      y: '-50%',
      width: cursorSize,
      height: cursorSize
    };

    switch (cursorMode) {
      case 'neon':
        return {
          ...baseStyle,
          background:
            'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, rgba(255, 0, 255, 0.2) 50%, transparent 80%)',
          border: '2px solid rgba(0, 255, 255, 0.6)',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)'
        };
      case 'rainbow':
        return {
          ...baseStyle,
          background:
            'conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)',
          border: '2px solid rgba(255, 255, 255, 0.5)',
          opacity: 0.7
        };
      case 'minimal':
        return {
          ...baseStyle,
          background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          opacity: 0.6
        };
      case 'particle':
        return {
          ...baseStyle,
          background:
            'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 80%)',
          border: '2px solid rgba(147, 51, 234, 0.5)'
        };
      default:
        return {
          ...baseStyle,
          background:
            'radial-gradient(circle, rgba(14, 165, 233, 0.2) 0%, rgba(14, 165, 233, 0.1) 50%, transparent 80%)',
          border: '2px solid rgba(14, 165, 233, 0.4)'
        };
    }
  };

  const cursorStyle = getCursorStyles();

  return (
    <>
      <CursorModeSelector
        onModeChange={setCursorMode}
        currentMode={cursorMode}
      />

      {/* Main Cursor */}
      <motion.div
        style={cursorStyle}
        animate={{
          scale:
            cursorVariant === 'hover'
              ? 1.2
              : cursorVariant === 'click'
              ? 0.6
              : cursorVariant === 'magnetic'
              ? 1.3
              : cursorVariant === 'text'
              ? 0.8
              : 1,
          opacity:
            cursorVariant === 'hover'
              ? 1
              : cursorVariant === 'click'
              ? 1
              : cursorVariant === 'magnetic'
              ? 0.9
              : cursorVariant === 'text'
              ? 0.7
              : 0.8,
          rotate:
            cursorVariant === 'hover'
              ? 90
              : cursorVariant === 'click'
              ? 360
              : cursorVariant === 'magnetic'
              ? 180
              : cursorVariant === 'text'
              ? 45
              : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.4
        }}
      >
        {/* Inner core with mode-specific effects */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              cursorMode === 'neon'
                ? 'radial-gradient(circle, rgba(0, 255, 255, 0.4) 0%, rgba(255, 0, 255, 0.2) 50%, transparent 80%)'
                : cursorMode === 'rainbow'
                ? 'conic-gradient(from 0deg, rgba(255, 0, 0, 0.3), rgba(255, 128, 0, 0.3), rgba(255, 255, 0, 0.3), rgba(128, 255, 0, 0.3), rgba(0, 255, 0, 0.3), rgba(0, 255, 128, 0.3), rgba(0, 255, 255, 0.3), rgba(0, 128, 255, 0.3), rgba(0, 0, 255, 0.3), rgba(128, 0, 255, 0.3), rgba(255, 0, 255, 0.3), rgba(255, 0, 128, 0.3), rgba(255, 0, 0, 0.3))'
                : 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%)'
          }}
          animate={{
            scale: cursorVariant === 'click' ? [1, 1.8, 1] : [1, 1.1, 1],
            opacity:
              cursorVariant === 'click' ? [0.3, 0.8, 0.3] : [0.2, 0.4, 0.2],
            rotate: cursorMode === 'rainbow' ? [0, 360] : 0
          }}
          transition={{
            duration:
              cursorVariant === 'click'
                ? 0.4
                : cursorMode === 'rainbow'
                ? 3
                : 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'loop'
          }}
        />

        {/* Enhanced click pulse effect */}
        <AnimatePresence>
          {isClicking && (
            <>
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor:
                    cursorMode === 'neon'
                      ? 'rgba(0, 255, 255, 0.8)'
                      : cursorMode === 'rainbow'
                      ? 'rgba(255, 255, 255, 0.8)'
                      : 'rgba(236, 72, 153, 0.6)'
                }}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ scale: 5, opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
              {cursorMode === 'particle' && (
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '1px solid rgba(147, 51, 234, 0.5)'
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 6, opacity: 0 }}
                  exit={{ scale: 7, opacity: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
                />
              )}
            </>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Cursor Trails with mode-specific styling */}
      <AnimatePresence>
        {trails.map((trail, index) => {
          const size = Math.max(8, 20 - index * 1.2);
          const delay = index * 0.01;

          return (
            <motion.div
              key={trail.id}
              style={{
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 999998,
                borderRadius: '50%',
                mixBlendMode: 'screen',
                left: trail.x,
                top: trail.y,
                x: '-50%',
                y: '-50%',
                width: size,
                height: size
              }}
              initial={{
                scale: 0.8,
                opacity: trail.opacity,
                background:
                  cursorMode === 'neon'
                    ? `radial-gradient(circle, rgba(0, 255, 255, ${
                        trail.opacity * 0.4
                      }) 0%, rgba(255, 0, 255, ${
                        trail.opacity * 0.2
                      }) 50%, transparent 80%)`
                    : cursorMode === 'rainbow'
                    ? `radial-gradient(circle, hsl(${
                        (index * 30) % 360
                      }, 100%, 60%) 0%, transparent 80%)`
                    : cursorMode === 'particle'
                    ? `radial-gradient(circle, rgba(147, 51, 234, ${
                        trail.opacity * 0.4
                      }) 0%, rgba(236, 72, 153, ${
                        trail.opacity * 0.3
                      }) 50%, transparent 80%)`
                    : `radial-gradient(circle, rgba(14, 165, 233, ${
                        trail.opacity * 0.3
                      }) 0%, rgba(52, 211, 153, ${
                        trail.opacity * 0.2
                      }) 50%, transparent 80%)`,
                border:
                  cursorMode === 'minimal'
                    ? `1px solid rgba(255, 255, 255, ${trail.opacity * 0.3})`
                    : `1px solid rgba(14, 165, 233, ${trail.opacity * 0.4})`
              }}
              animate={{
                scale: 0.1,
                opacity: 0
              }}
              exit={{
                scale: 0,
                opacity: 0
              }}
              transition={{
                duration: cursorMode === 'particle' ? 0.6 : 0.4,
                ease: 'easeOut',
                delay
              }}
            />
          );
        })}
      </AnimatePresence>

      {/* Enhanced ambient glow with mode-specific effects */}
      <motion.div
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 999996,
          borderRadius: '50%',
          left: springX,
          top: springY,
          x: '-50%',
          y: '-50%',
          width: 150,
          height: 150,
          background:
            cursorMode === 'neon'
              ? 'radial-gradient(circle, rgba(0, 255, 255, 0.12) 0%, rgba(255, 0, 255, 0.08) 40%, transparent 80%)'
              : cursorMode === 'rainbow'
              ? 'conic-gradient(from 0deg, rgba(255, 0, 0, 0.1), rgba(255, 128, 0, 0.08), rgba(255, 255, 0, 0.06), rgba(0, 255, 0, 0.08), rgba(0, 255, 255, 0.1), rgba(0, 0, 255, 0.08), rgba(255, 0, 255, 0.06), transparent)'
              : 'radial-gradient(circle, rgba(14, 165, 233, 0.08) 0%, rgba(52, 211, 153, 0.05) 40%, transparent 80%)',
          filter: 'blur(25px)'
        }}
        animate={{
          scale:
            cursorVariant === 'hover'
              ? 1.4
              : cursorVariant === 'magnetic'
              ? 1.6
              : cursorVariant === 'click'
              ? 0.6
              : 1,
          opacity:
            cursorVariant === 'hover'
              ? 0.9
              : cursorVariant === 'magnetic'
              ? 1
              : cursorVariant === 'click'
              ? 1.2
              : 0.5,
          rotate: cursorMode === 'rainbow' ? 360 : 0
        }}
        transition={
          cursorMode === 'rainbow'
            ? {
                scale: { type: 'spring', stiffness: 200, damping: 25 },
                opacity: { type: 'spring', stiffness: 200, damping: 25 },
                rotate: { duration: 4, repeat: Infinity, ease: 'linear' }
              }
            : {
                type: 'spring',
                stiffness: 200,
                damping: 25
              }
        }
      />
    </>
  );
};

export default AdvancedFlareCursor;
