#!/usr/bin/env node
/**
 * This script checks affiliate image references in blog posts and ensures SVG files exist.
 * It will create placeholder SVGs for any missing images.
 */
const fs = require('fs');
const path = require('path');

// Paths
const BLOG_DIR = path.join(process.cwd(), 'content/blog');
const AFFILIATES_DIR = path.join(process.cwd(), 'public/images/affiliates');

// Create affiliate directory if it doesn't exist
if (!fs.existsSync(AFFILIATES_DIR)) {
  fs.mkdirSync(AFFILIATES_DIR, { recursive: true });
}

// Function to generate a placeholder SVG
function generatePlaceholderSVG(name) {
  return `<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#1a1a1a"/>
  <rect x="50" y="50" width="300" height="300" rx="20" fill="#222"/>
  <text x="200" y="200" text-anchor="middle" fill="#0ea5e9" font-family="Arial, sans-serif" font-size="28" font-weight="bold">${name}</text>
  <text x="200" y="240" text-anchor="middle" fill="#aaa" font-family="Arial, sans-serif" font-size="14">Affiliate Partner</text>
</svg>`;
}

// Find all markdown files in blog directory
const blogFiles = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));

// Track which affiliate image files we need
const requiredImages = new Set();

// Parse blog files to find affiliate image references
console.log('Scanning blog posts for affiliate image references...');
blogFiles.forEach(blogFile => {
  const filePath = path.join(BLOG_DIR, blogFile);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract affiliate image references from frontmatter
  const imageUrlRegex = /imageUrl:\s*"([^"]+)"/g;
  let match;
  
  while ((match = imageUrlRegex.exec(content)) !== null) {
    const imagePath = match[1];
    if (imagePath.includes('/images/affiliates/')) {
      const filename = path.basename(imagePath);
      const name = path.parse(filename).name;
      requiredImages.add({
        name,
        path: path.basename(imagePath),
        fullPath: path.join(AFFILIATES_DIR, path.basename(imagePath))
      });
    }
  }
});

// Check for existing files and create placeholders for missing ones
console.log(`Found ${requiredImages.size} affiliate image references.`);
let created = 0;
let existing = 0;

requiredImages.forEach(image => {
  // Check if the file exists
  if (!fs.existsSync(image.fullPath)) {
    console.log(`Creating placeholder SVG for ${image.path}...`);
    fs.writeFileSync(image.fullPath, generatePlaceholderSVG(image.name));
    created++;
  } else {
    console.log(`Image already exists: ${image.path}`);
    existing++;
  }
});

console.log(`Done! ${created} placeholder images created. ${existing} images already existed.`);
