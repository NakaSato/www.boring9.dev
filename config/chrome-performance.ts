/**
 * Chrome Performance Configuration
 * Comprehensive settings for optimizing React applications in Chrome
 */

// Chrome DevTools Performance Configuration
export const chromeDevToolsConfig = {
  // Enable performance monitoring in development
  enablePerformanceMonitoring: process.env.NODE_ENV === 'development',
  
  // Performance budget thresholds (in milliseconds)
  performanceBudget: {
    firstContentfulPaint: 1800,
    largestContentfulPaint: 2500,
    firstInputDelay: 100,
    cumulativeLayoutShift: 0.1,
    totalBlockingTime: 200
  },
  
  // Chrome flags for optimal performance
  chromeFlags: [
    '--enable-features=VaapiVideoDecoder',
    '--enable-gpu-rasterization',
    '--enable-zero-copy',
    '--enable-hardware-overlays',
    '--force-gpu-rasterization',
    '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows'
  ]
};

// Chrome memory optimization settings
export const chromeMemoryConfig = {
  // Enable memory optimization
  enableMemoryOptimization: true,
  
  // Memory thresholds
  memoryThresholds: {
    warning: 50 * 1024 * 1024, // 50MB
    critical: 100 * 1024 * 1024 // 100MB
  },
  
  // Garbage collection settings
  garbageCollection: {
    // Force GC after these thresholds
    forceGCThreshold: 75 * 1024 * 1024, // 75MB
    // Monitor memory usage interval
    monitorInterval: 30000 // 30 seconds
  }
};

// Chrome rendering optimization
export const chromeRenderingConfig = {
  // Enable hardware acceleration
  hardwareAcceleration: true,
  
  // Rendering settings
  rendering: {
    // Use GPU for 2D canvas
    enableGPU2D: true,
    // Enable WebGL
    enableWebGL: true,
    // Composite layers
    enableCompositing: true,
    // Use paint worklets
    enablePaintWorklets: true
  },
  
  // CSS containment strategy
  containment: {
    // Default containment for components
    default: 'layout style',
    // Strict containment for isolated components
    strict: 'strict',
    // Layout containment for flex/grid containers
    layout: 'layout',
    // Style containment for styled components
    style: 'style',
    // Paint containment for visual components
    paint: 'paint'
  }
};

// Chrome network optimization
export const chromeNetworkConfig = {
  // Enable network optimization
  enableNetworkOptimization: true,
  
  // Resource loading priorities
  resourcePriorities: {
    critical: ['fonts', 'css'],
    high: ['images', 'scripts'],
    low: ['analytics', 'social']
  },
  
  // Caching strategies
  caching: {
    // Service worker cache duration
    swCacheDuration: 24 * 60 * 60 * 1000, // 24 hours
    // Browser cache settings
    browserCache: {
      static: 'max-age=31536000', // 1 year
      dynamic: 'max-age=0, must-revalidate'
    }
  }
};

// Chrome accessibility optimization
export const chromeA11yConfig = {
  // Enable accessibility features
  enableA11y: true,
  
  // Accessibility settings
  accessibility: {
    // Respect user preferences
    respectMotionPreference: true,
    respectContrastPreference: true,
    respectTransparencyPreference: true,
    
    // Focus management
    focusManagement: {
      // Visible focus indicators
      visibleFocus: true,
      // Focus trapping for modals
      focusTrapping: true,
      // Skip links
      skipLinks: true
    }
  }
};

// Chrome security configuration
export const chromeSecurityConfig = {
  // Content Security Policy
  csp: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'font-src': ["'self'", 'https:'],
    'connect-src': ["'self'", 'https:']
  },
  
  // Feature Policy
  featurePolicy: {
    'autoplay': ["'none'"],
    'camera': ["'none'"],
    'microphone': ["'none'"],
    'geolocation': ["'self'"]
  }
};

// Performance monitoring utilities
export const performanceMonitoring = {
  // Start performance measurement
  startMeasurement: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-start`);
    }
  },
  
  // End performance measurement
  endMeasurement: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      
      const measure = performance.getEntriesByName(name)[0];
      if (measure && chromeDevToolsConfig.enablePerformanceMonitoring) {
        console.log(`Performance [${name}]: ${measure.duration.toFixed(2)}ms`);
      }
    }
  },
  
  // Get Core Web Vitals
  getCoreWebVitals: () => {
    if (typeof window === 'undefined') return null;
    
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const vitals = {
          FCP: 0,
          LCP: 0,
          FID: 0,
          CLS: 0
        };
        
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint' && entry.name === 'first-contentful-paint') {
            vitals.FCP = entry.startTime;
          }
          if (entry.entryType === 'largest-contentful-paint') {
            vitals.LCP = entry.startTime;
          }
          if (entry.entryType === 'first-input') {
            // Type assertion for first-input specific properties
            const firstInputEntry = entry as any;
            if (firstInputEntry.processingStart) {
              vitals.FID = firstInputEntry.processingStart - entry.startTime;
            }
          }
          if (entry.entryType === 'layout-shift') {
            // Type assertion for layout-shift specific properties
            const layoutShiftEntry = entry as any;
            if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
              vitals.CLS += layoutShiftEntry.value;
            }
          }
        }
        
        resolve(vitals);
      });
      
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
    });
  }
};

// Export all configurations
export default {
  chromeDevToolsConfig,
  chromeMemoryConfig,
  chromeRenderingConfig,
  chromeNetworkConfig,
  chromeA11yConfig,
  chromeSecurityConfig,
  performanceMonitoring
};
