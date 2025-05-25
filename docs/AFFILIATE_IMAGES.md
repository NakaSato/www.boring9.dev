# Affiliate Image System Documentation

This document explains how the affiliate image system works in our blog platform.

## Overview

The affiliate image system displays product images for affiliate links in blog posts. We use SVG files as the preferred format for these images.

## Image Location

All affiliate images should be placed in:
```
/public/images/affiliates/
```

## Preferred Format

- **SVG** is the preferred format for affiliate images
- Fall back to PNG, JPG, or WebP if SVG is not available
- Use the generic placeholder as a last resort

## Automatic Fallbacks

The system includes multiple fallback mechanisms:

1. First tries to load the exact image path specified in the blog post
2. Then tries alternative file extensions in this order: .svg, .png, .jpg, .webp
3. Falls back to a default placeholder image if all else fails

## Error Handling

The `AffiliateLinkComponent` implements error handling that will:
- Log information about each affiliate link in the browser console
- Display a placeholder image if the specified image cannot be loaded
- Show a blur placeholder while images are loading

## Utility Scripts

The following scripts can help manage affiliate images:

```bash
# Check for missing image references
npm run check-images

# Generate placeholder SVGs for any missing affiliate images
npm run fix-affiliates
```

## Troubleshooting

If affiliate images aren't appearing:

1. Check the browser console for detailed logging on each affiliate link
2. Verify that the image paths in blog posts match the actual file paths
3. Run `npm run fix-affiliates` to generate placeholder SVGs for missing images
4. Make sure all references use the `.svg` extension for consistency
