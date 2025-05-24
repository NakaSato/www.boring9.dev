const { spacing, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.tsx', 
    './components/**/*.tsx', 
    './layouts/**/*.tsx', 
    './app/**/*.tsx'
  ],
  theme: {
    // Define custom responsive breakpoints for better mobile-first design
    screens: {
      'xs': '475px',    // Extra small devices (large phones)
      'sm': '640px',    // Small devices (tablets)
      'md': '768px',    // Medium devices (small laptops)
      'lg': '1024px',   // Large devices (desktops)
      'xl': '1280px',   // Extra large devices (large desktops)
      '2xl': '1536px',  // 2X Extra large devices (larger desktops)
      '3xl': '1920px',  // 3X Extra large devices (ultra-wide)
      
      // Custom responsive utilities
      'mobile': {'max': '767px'},        // Mobile-only styles
      'tablet': {'min': '768px', 'max': '1023px'}, // Tablet-only styles
      'desktop': {'min': '1024px'},      // Desktop and above
      'touch': {'raw': '(hover: none)'},  // Touch devices
      'mouse': {'raw': '(hover: hover)'}, // Devices with mouse
      'print': {'raw': 'print'},         // Print styles
      'dark': {'raw': '(prefers-color-scheme: dark)'}, // Dark mode
      'light': {'raw': '(prefers-color-scheme: light)'}, // Light mode
      'reduced-motion': {'raw': '(prefers-reduced-motion: reduce)'}, // Reduced motion
      'high-contrast': {'raw': '(prefers-contrast: high)'}, // High contrast
    },
    extend: {
      colors: {
        'blue-opaque': 'rgb(13 42 148 / 18%)',
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        accent: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        gray: {
          0: '#fff',
          100: '#fafafa',
          200: '#eaeaea',
          300: '#999999',
          400: '#d4d4d4',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111010',
          950: '#080809'
        }
      },
      fontFamily: {
        sans: ['var(--font-graphik)']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: {
              color: theme('colors.blue.500'),
              '&:hover': {
                color: theme('colors.blue.700')
              },
              code: { color: theme('colors.blue.400') }
            },
            'h2,h3,h4': {
              'scroll-margin-top': spacing[32]
            },
            thead: {
              borderBottomColor: theme('colors.gray.200')
            },
            code: { color: theme('colors.pink.500') },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false
          }
        },
        invert: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.blue.400'),
              '&:hover': {
                color: theme('colors.blue.300')
              },
              code: { color: theme('colors.blue.300') }
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300')
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100')
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') }
              }
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') }
              }
            },
            strong: { color: theme('colors.gray.100') },
            thead: {
              color: theme('colors.gray.100'),
              borderBottomColor: theme('colors.gray.600')
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700')
              }
            }
          }
        }
      }),
      // Custom keyframes for complex animations
      keyframes: {
        floatComplex: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) scale(1) rotate(0deg)',
            filter: 'blur(3rem) brightness(1)'
          },
          '25%': { 
            transform: 'translateY(-15px) translateX(5px) scale(1.03) rotate(1deg)',
            filter: 'blur(2.8rem) brightness(1.1)'
          },
          '50%': { 
            transform: 'translateY(-30px) translateX(-8px) scale(1.08) rotate(-0.5deg)',
            filter: 'blur(2.5rem) brightness(1.2)'
          },
          '75%': { 
            transform: 'translateY(-20px) translateX(10px) scale(1.05) rotate(0.8deg)',
            filter: 'blur(2.7rem) brightness(1.15)'
          }
        },
        particleFloat: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) scale(1)',
            opacity: '0.4'
          },
          '33%': { 
            transform: 'translateY(-20px) translateX(15px) scale(1.1)',
            opacity: '0.7'
          },
          '66%': { 
            transform: 'translateY(-10px) translateX(-10px) scale(0.9)',
            opacity: '0.5'
          }
        },
        gridComplexShift: {
          '0%': { 
            backgroundPosition: '0 0',
            opacity: '1'
          },
          '25%': { 
            backgroundPosition: '1.5rem 0.75rem',
            opacity: '0.8'
          },
          '50%': { 
            backgroundPosition: '3rem 1.5rem',
            opacity: '0.6'
          },
          '75%': { 
            backgroundPosition: '1.5rem 2.25rem',
            opacity: '0.8'
          },
          '100%': { 
            backgroundPosition: '0 3rem',
            opacity: '1'
          }
        },
        noiseShift: {
          '0%, 100%': { 
            transform: 'translateX(0) translateY(0) scale(1)',
            opacity: '0.025'
          },
          '25%': { 
            transform: 'translateX(2px) translateY(-1px) scale(1.01)',
            opacity: '0.035'
          },
          '50%': { 
            transform: 'translateX(-1px) translateY(2px) scale(0.99)',
            opacity: '0.02'
          },
          '75%': { 
            transform: 'translateX(1px) translateY(1px) scale(1.005)',
            opacity: '0.03'
          }
        },
        borderPulse: {
          '0%, 100%': { 
            opacity: '0.4',
            transform: 'scaleX(1)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scaleX(1.02)'
          }
        },
        glowAdvanced: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1), inset 0 0 20px rgba(59, 130, 246, 0.05)'
          },
          '25%': { 
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.4), 0 0 60px rgba(168, 85, 247, 0.15), inset 0 0 30px rgba(168, 85, 247, 0.08)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.5), 0 0 80px rgba(16, 185, 129, 0.2), inset 0 0 40px rgba(16, 185, 129, 0.1)'
          },
          '75%': { 
            boxShadow: '0 0 35px rgba(236, 72, 153, 0.45), 0 0 70px rgba(236, 72, 153, 0.18), inset 0 0 35px rgba(236, 72, 153, 0.09)'
          }
        },
        textShimmer: {
          '0%, 100%': { 
            backgroundPosition: '-200% 0'
          },
          '50%': { 
            backgroundPosition: '200% 0'
          }
        }
      },
      // Custom animations
      animation: {
        'float-complex': 'floatComplex 12s ease-in-out infinite',
        'float-complex-reverse': 'floatComplex 15s ease-in-out infinite reverse',
        'float-complex-slow': 'floatComplex 18s ease-in-out infinite',
        'particle-float': 'particleFloat 8s ease-in-out infinite',
        'particle-float-reverse': 'particleFloat 10s ease-in-out infinite reverse',
        'particle-float-fast': 'particleFloat 6s ease-in-out infinite',
        'grid-shift': 'gridComplexShift 25s linear infinite',
        'noise-shift': 'noiseShift 30s linear infinite',
        'border-pulse': 'borderPulse 4s ease-in-out infinite',
        'border-pulse-slow': 'borderPulse 5s ease-in-out infinite',
        'glow-advanced': 'glowAdvanced 8s ease-in-out infinite',
        'glow-advanced-reverse': 'glowAdvanced 6s ease-in-out infinite reverse',
        'text-shimmer': 'textShimmer 8s ease-in-out infinite',
        'text-shimmer-fast': 'textShimmer 5s ease-in-out infinite',
        'text-shimmer-slow': 'textShimmer 3s ease-in-out infinite'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
