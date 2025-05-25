/**
 * Utility functions for handling affiliate image paths
 */

import fs from 'fs';
import path from 'path';

/**
 * Checks if an affiliate image exists and returns the most appropriate path
 * @param imagePath Original image path from affiliate metadata
 * @returns The correct image path to use, defaulting to a placeholder if needed
 */
export const getAffiliateImagePath = (imagePath: string): string => {
  if (!imagePath) return '/images/affiliates/product.svg';
  
  try {
    // Try the specified path first
    const publicDir = path.join(process.cwd(), 'public');
    const fullPath = path.join(publicDir, imagePath);
    
    // Check if the original path exists
    if (fs.existsSync(fullPath)) return imagePath;
    
    // Try alternative extensions
    const basename = path.basename(imagePath, path.extname(imagePath));
    const dir = path.dirname(imagePath);
    
    const alternatives = ['.svg', '.png', '.jpg', '.webp'];
    for (const ext of alternatives) {
      const altPath = path.join(dir, basename + ext);
      const fullAltPath = path.join(publicDir, altPath);
      if (fs.existsSync(fullAltPath)) return altPath;
    }
    
    // Default to placeholder if no alternatives found
    return '/images/affiliates/product.svg';
  } catch (error) {
    console.error('Error checking affiliate image path:', error);
    return '/images/affiliates/product.svg';
  }
};
