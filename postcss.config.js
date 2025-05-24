module.exports = {
  plugins: [
    "postcss-import",
    "postcss-flexbugs-fixes",
    "tailwindcss",
    [
      "autoprefixer",
      {
        // Enable flexbox prefixes for older browsers
        flexbox: "no-2009",
        // Add support for grid layout prefixes
        grid: "autoplace",
        // Enable additional vendor prefixes
        supports: true,
        // Override browserslist for maximum compatibility
        overrideBrowserslist: [
          "> 0.2%",
          "last 3 versions",
          "Firefox ESR",
          "Chrome >= 60",
          "Firefox >= 60",
          "Safari >= 12",
          "Edge >= 79",
          "Samsung >= 8",
          "Android >= 81",
          "iOS >= 12",
          "not dead",
          "not ie <= 11"
        ]
      }
    ],
    [
      "postcss-preset-env",
      {
        // Use stage 2 features for broader compatibility
        stage: 2,
        // Enable autoprefixer integration
        autoprefixer: false, // We're handling this separately above
        // Enable specific features for better browser support
        features: {
          "custom-properties": true, // Enable CSS custom properties polyfill
          "nesting-rules": true,
          "custom-media-queries": true,
          "media-query-ranges": true,
          "logical-properties-and-values": true,
          "dir-pseudo-class": true,
          "focus-within-pseudo-class": true,
          "focus-visible-pseudo-class": true,
          "any-link-pseudo-class": true,
          "place-properties": true,
          "gap-properties": true,
          "overflow-property": true
        },
        // Browser support configuration
        browsers: [
          "> 0.2%",
          "last 3 versions",
          "Firefox ESR",
          "Chrome >= 60",
          "Firefox >= 60",
          "Safari >= 12",
          "not dead"
        ]
      }
    ]
  ]
}