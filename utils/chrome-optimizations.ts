// Chrome Performance Optimization Utilities for React Components
export interface ChromeOptimizationStyle {
  willChange?: string;
  transform?: string;
  contain?: string;
  backfaceVisibility?: string;
  WebkitBackfaceVisibility?: string;
  shapeRendering?: string;
  imageRendering?: string;
  textRendering?: string;
  WebkitFontSmoothing?: string;
  MozOsxFontSmoothing?: string;
  backdropFilter?: string;
  WebkitBackdropFilter?: string;
}

// Hardware acceleration optimization
export const chromeHardwareAcceleration: ChromeOptimizationStyle = {
  willChange: "transform",
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden"
};

// Text rendering optimization
export const chromeTextOptimization: ChromeOptimizationStyle = {
  textRendering: "optimizeLegibility",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale"
};

// SVG rendering optimization
export const chromeSvgOptimization: ChromeOptimizationStyle = {
  shapeRendering: "geometricPrecision",
  imageRendering: "optimizeQuality",
  transform: "translateZ(0)"
};

// Animation and transition optimization
export const chromeAnimationOptimization: ChromeOptimizationStyle = {
  willChange: "transform, opacity",
  transform: "translateZ(0)",
  contain: "layout style paint"
};

// Interactive element optimization (buttons, links)
export const chromeInteractiveOptimization: ChromeOptimizationStyle = {
  willChange: "transform, background-color, color",
  transform: "translateZ(0)",
  contain: "layout style"
};

// Layout container optimization (flex, grid)
export const chromeLayoutOptimization: ChromeOptimizationStyle = {
  contain: "layout style",
  transform: "translateZ(0)"
};

// Image optimization
export const chromeImageOptimization: ChromeOptimizationStyle = {
  willChange: "transform",
  transform: "translateZ(0)",
  imageRendering: "optimizeQuality"
};

// Backdrop filter optimization
export const chromeBackdropOptimization: ChromeOptimizationStyle = {
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  transform: "translateZ(0)"
};

// Scroll performance optimization
export const chromeScrollOptimization: ChromeOptimizationStyle = {
  contain: "layout style paint",
  willChange: "scroll-position",
  transform: "translateZ(0)"
};

// Complete optimization for high-performance components
export const chromeHighPerformance: ChromeOptimizationStyle = {
  ...chromeHardwareAcceleration,
  ...chromeTextOptimization,
  contain: "layout style paint"
};

// Utility function to combine optimizations
export const combineChrome = (...optimizations: ChromeOptimizationStyle[]): ChromeOptimizationStyle => {
  return Object.assign({}, ...optimizations);
};

// CSS class names for utility classes (matches chrome-optimizations.css)
export const chromeClasses = {
  optimized: 'chrome-optimized',
  text: 'chrome-text',
  svg: 'chrome-svg',
  transition: 'chrome-transition',
  animation: 'chrome-animate',
  layout: 'chrome-flex chrome-grid',
  hardware: 'chrome-optimized',
  backdrop: 'chrome-backdrop',
  scroll: 'chrome-scroll',
  border: 'chrome-border',
  shadow: 'chrome-shadow'
} as const;

// Responsive optimization for different screen sizes
export const chromeResponsiveOptimization = (isMobile: boolean): ChromeOptimizationStyle => {
  const base = chromeHardwareAcceleration;
  
  if (isMobile) {
    return {
      ...base,
      // More aggressive optimizations for mobile Chrome
      contain: "strict",
      willChange: "transform, scroll-position"
    };
  }
  
  return base;
};

// Performance monitoring utility
export const logChromePerformance = (componentName: string) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const entries = performance.getEntriesByType('measure');
    const componentEntries = entries.filter(entry => 
      entry.name.includes(componentName.toLowerCase())
    );
    
    if (componentEntries.length > 0) {
      console.log(`Chrome Performance for ${componentName}:`, componentEntries);
    }
  }
};

export default {
  chromeHardwareAcceleration,
  chromeTextOptimization,
  chromeSvgOptimization,
  chromeAnimationOptimization,
  chromeInteractiveOptimization,
  chromeLayoutOptimization,
  chromeImageOptimization,
  chromeBackdropOptimization,
  chromeScrollOptimization,
  chromeHighPerformance,
  combineChrome,
  chromeClasses,
  chromeResponsiveOptimization,
  logChromePerformance
};
