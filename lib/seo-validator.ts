import { getAllBlogPosts, getBlogPostBySlug } from './content';

interface SEOValidationError {
  type: string;
  message: string;
  page?: string;
  severity: 'error' | 'warning';
}

export async function validateBlogSEO(): Promise<{
  errors: SEOValidationError[];
  stats: {
    totalPosts: number;
    postsWithMissingMetadata: number;
    postsWithShortContent: number;
    postsWithoutTags: number;
    postsWithoutImages: number;
  };
}> {
  const errors: SEOValidationError[] = [];
  const allPosts = await getAllBlogPosts();
  
  let postsWithMissingMetadata = 0;
  let postsWithShortContent = 0;
  let postsWithoutTags = 0;
  let postsWithoutImages = 0;
  
  // Validate each post
  for (const post of allPosts) {
    // Check for missing or short title
    if (!post.title || post.title.length < 10) {
      errors.push({
        type: 'title',
        message: `Post "${post.slug}" has a missing or too short title (min 10 chars)`,
        page: `/blog/${post.slug}`,
        severity: 'error'
      });
      postsWithMissingMetadata++;
    }
    
    // Check for missing or short excerpt
    if (!post.excerpt || post.excerpt.length < 50) {
      errors.push({
        type: 'excerpt',
        message: `Post "${post.slug}" has a missing or too short excerpt (min 50 chars)`,
        page: `/blog/${post.slug}`,
        severity: 'warning'
      });
      postsWithMissingMetadata++;
    }
    
    // Check for short content
    if (post.content.length < 500) {
      errors.push({
        type: 'content',
        message: `Post "${post.slug}" has very short content (${post.content.length} chars)`,
        page: `/blog/${post.slug}`,
        severity: 'warning'
      });
      postsWithShortContent++;
    }
    
    // Check for missing tags
    if (!post.tags || post.tags.length === 0) {
      errors.push({
        type: 'tags',
        message: `Post "${post.slug}" has no tags`,
        page: `/blog/${post.slug}`,
        severity: 'warning'
      });
      postsWithoutTags++;
    }
    
    // Check for missing cover image
    if (!post.coverImage || post.coverImage === '/images/blog/default-cover.jpg') {
      errors.push({
        type: 'image',
        message: `Post "${post.slug}" has no custom cover image`,
        page: `/blog/${post.slug}`,
        severity: 'warning'
      });
      postsWithoutImages++;
    }
    
    // Check for missing category
    if (!post.category || post.category === 'Uncategorized') {
      errors.push({
        type: 'category',
        message: `Post "${post.slug}" has no category`,
        page: `/blog/${post.slug}`,
        severity: 'warning'
      });
    }
    
    // Check for missing alt text in images (basic check)
    const imgRegex = /<img.*?alt=["'](?:.*?)["']/g;
    const imgTagRegex = /<img/g;
    
    const imgTags = (post.htmlContent.match(imgTagRegex) || []).length;
    const imgAlts = (post.htmlContent.match(imgRegex) || []).length;
    
    if (imgTags > imgAlts) {
      errors.push({
        type: 'accessibility',
        message: `Post "${post.slug}" has ${imgTags - imgAlts} images without alt text`,
        page: `/blog/${post.slug}`,
        severity: 'warning'
      });
    }
  }
  
  // Check for duplicate titles
  const titles = allPosts.map(post => post.title);
  const titleCounts = titles.reduce((acc, title) => {
    acc[title] = (acc[title] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  for (const [title, count] of Object.entries(titleCounts)) {
    if (count > 1) {
      errors.push({
        type: 'duplicate',
        message: `Duplicate title "${title}" found in ${count} posts`,
        severity: 'error'
      });
    }
  }
  
  return {
    errors,
    stats: {
      totalPosts: allPosts.length,
      postsWithMissingMetadata,
      postsWithShortContent,
      postsWithoutTags,
      postsWithoutImages
    }
  };
}

export async function getReadabilityScore(slug: string): Promise<{
  score: number;
  readingLevel: string;
  suggestions: string[];
}> {
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      score: 0,
      readingLevel: 'Unknown',
      suggestions: ['Post not found']
    };
  }
  
  // Extract plain text from HTML content
  const plainText = post.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Calculate readability metrics (simplified Flesch-Kincaid)
  const words = plainText.split(/\s+/).length;
  const sentences = plainText.split(/[.!?]+/).length;
  const syllables = countSyllables(plainText);
  
  // Flesch Reading Ease score (higher is easier to read)
  const fleschScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
  
  // Determine reading level
  let readingLevel = 'College';
  if (fleschScore > 90) readingLevel = 'Elementary School';
  else if (fleschScore > 80) readingLevel = '6th Grade';
  else if (fleschScore > 70) readingLevel = '7th Grade';
  else if (fleschScore > 60) readingLevel = '8th-9th Grade';
  else if (fleschScore > 50) readingLevel = '10th-12th Grade';
  else if (fleschScore > 30) readingLevel = 'College';
  else readingLevel = 'Advanced Degree';
  
  // Generate suggestions
  const suggestions: string[] = [];
  
  if (words / sentences > 25) {
    suggestions.push('Your sentences are quite long. Consider breaking some into shorter sentences.');
  }
  
  if (syllables / words > 1.6) {
    suggestions.push('You\'re using many complex words. Consider simplifying your language.');
  }
  
  if (fleschScore < 50) {
    suggestions.push('Overall readability is challenging. Try simplifying for a broader audience.');
  }
  
  const paragraphs = post.content.split(/\n\s*\n|\r\n\s*\r\n/);
  if (paragraphs.some(p => p.split(/\s+/).length > 150)) {
    suggestions.push('Some paragraphs are very long. Consider breaking them into smaller chunks.');
  }
  
  return {
    score: Math.round(fleschScore * 10) / 10,
    readingLevel,
    suggestions: suggestions.length ? suggestions : ['No issues detected - content is readable!']
  };
}

// Helper function to roughly count syllables in English text
function countSyllables(text: string): number {
  const plainText = text.toLowerCase().replace(/[^a-z ]/g, '');
  const words = plainText.split(' ');
  
  return words.reduce((count, word) => {
    // Rule-based syllable counting (very simplified)
    if (!word) return count;
    
    // Count vowel groups
    const vowelGroups = word.replace(/[^aeiouy]+/g, ' ').trim().split(' ');
    let syllableCount = vowelGroups.length;
    
    // Adjust for common patterns
    if (word.endsWith('e')) syllableCount--;
    if (word.endsWith('le') && word.length > 2) syllableCount++;
    if (word.endsWith('es') || word.endsWith('ed')) syllableCount--;
    
    // Ensure minimum of 1 syllable per word
    return count + Math.max(1, syllableCount);
  }, 0);
}
