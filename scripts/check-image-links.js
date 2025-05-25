#!/usr/bin/env node
/**
 * This script checks for broken image links specifically in the public directory
 */
const fs = require('fs');
const path = require('path');

// Function to recursively get all files with a specific extension
function findFilesWithExt(startPath, extension) {
  let results = [];

  if (!fs.existsSync(startPath)) {
    return results;
  }

  const files = fs.readdirSync(startPath);
  for (let file of files) {
    const filepath = path.join(startPath, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      results = results.concat(findFilesWithExt(filepath, extension));
    } else if (filepath.endsWith(extension)) {
      results.push(filepath);
    }
  }
  return results;
}

// Get all markdown files
const blogFiles = findFilesWithExt('content/blog', '.md');
const publicDir = path.resolve('public');

// Track image references and their existence
const imageReferences = new Map();
const missingImages = [];

// Find all image references in markdown files
console.log('Checking image references in markdown files...');
blogFiles.forEach(blogFile => {
  const content = fs.readFileSync(blogFile, 'utf8');
  
  // Extract image URLs from markdown and frontmatter
  const mdImageRegex = /!\[.*?\]\(([^)]+)\)/g;
  const frontmatterImageRegex = /imageUrl:\s*"([^"]+)"/g;
  let match;
  
  // Check markdown image links
  while ((match = mdImageRegex.exec(content)) !== null) {
    checkImagePath(match[1], blogFile);
  }
  
  // Check frontmatter image links
  while ((match = frontmatterImageRegex.exec(content)) !== null) {
    checkImagePath(match[1], blogFile);
  }
});

function checkImagePath(imagePath, sourceFile) {
  // Skip external images
  if (imagePath.startsWith('http')) return;
  
  const fullPath = path.join(publicDir, imagePath);
  imageReferences.set(imagePath, {
    sourceFile,
    exists: fs.existsSync(fullPath)
  });
  
  if (!fs.existsSync(fullPath)) {
    missingImages.push({ imagePath, sourceFile, fullPath });
  }
}

// Report results
console.log(`\nFound ${imageReferences.size} image references in markdown files`);

if (missingImages.length > 0) {
  console.log(`\n❌ Missing ${missingImages.length} images:`);
  missingImages.forEach(({ imagePath, sourceFile, fullPath }) => {
    console.log(`\n- Image: ${imagePath}`);
    console.log(`  Referenced in: ${sourceFile}`);
    console.log(`  Expected at: ${fullPath}`);
  });
} else {
  console.log('\n✅ All referenced images exist!');
}
