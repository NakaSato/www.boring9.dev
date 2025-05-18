// lib/content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from './markdown';
import { getReadingTime } from './read-time';
import { BlogPostProps } from './get-content';

const BLOG_DIRECTORY = path.join(process.cwd(), 'content/blog');

export async function getAllBlogPosts(): Promise<BlogPostProps[]> {
  try {
    // Check if directory exists
    if (!fs.existsSync(BLOG_DIRECTORY)) {
      console.error('Blog content directory not found:', BLOG_DIRECTORY);
      return [];
    }

    // Get all files in the directory
    const files = fs.readdirSync(BLOG_DIRECTORY)
      .filter(filename => filename.endsWith('.md') && !filename.includes('README'));
    
    if (files.length === 0) {
      console.log('No blog posts found in content directory');
      return [];
    }

    console.log(`Found ${files.length} Markdown files in content/blog`);

    const posts = await Promise.all(
      files.map(async (file) => {
        try {
          const fullPath = path.join(BLOG_DIRECTORY, file);
          const content = fs.readFileSync(fullPath, 'utf8');
          const { data, content: markdown } = matter(content);

          // Validate required fields
          if (!data.title || !data.date) {
            console.warn(`Warning: Required fields missing in ${file}`);
            data.title = data.title || 'Untitled';
            data.date = data.date || new Date().toISOString().split('T')[0];
          }

          // Convert markdown to HTML
          const htmlContent = await markdownToHtml(markdown);

          // Safely parse the date
          let postDate: string;
          try {
            // Try to create a valid date from the frontmatter date
            const dateObj = new Date(data.date);
            if (isNaN(dateObj.getTime())) {
              // If date is invalid, use current date
              postDate = new Date().toISOString();
              console.warn(`Warning: Invalid date in ${file}, using current date instead`);
            } else {
              postDate = dateObj.toISOString();
            }
          } catch (error) {
            // Fallback to current date if there's any error
            postDate = new Date().toISOString();
            console.warn(`Warning: Error parsing date in ${file}, using current date instead`);
          }

          const post: BlogPostProps = {
            slug: file.replace('.md', ''),
            title: data.title,
            date: postDate,
            content: markdown,
            htmlContent,
            excerpt: data.excerpt || '',
            category: data.category || 'Uncategorized',
            tags: data.tags || [],
            coverImage: data.coverImage || '/images/default-cover.jpg',
            author: data.author || 'Anonymous',
            authorImage: data.authorImage || '/profile.jpeg',
            authorBio: data.authorBio || '',
            readingTime: getReadingTime(markdown)
          };

          return post;
        } catch (error) {
          console.error(`Error processing file ${file}:`, error);
          return null;
        }
      })
    );

    // Filter out any null posts and sort by date
    const validPosts = posts.filter(
      (post): post is BlogPostProps => post !== null
    );
    const sortedPosts = validPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return sortedPosts;
  } catch (error) {
    console.error('Error in getAllBlogPosts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostProps | null> {
  const posts = await getAllBlogPosts();
  const post = posts.find(post => post.slug === slug);
  return post || null;
}
