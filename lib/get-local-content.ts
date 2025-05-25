// lib/get-local-content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from './markdown';
import { getReadingTime } from './read-time';
import { BlogPostProps } from './get-content';

const BLOG_DIRECTORY = path.join(process.cwd(), 'content/blog');

export async function getLocalBlogPosts(): Promise<BlogPostProps[]> {
  try {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(BLOG_DIRECTORY)) {
      fs.mkdirSync(BLOG_DIRECTORY, { recursive: true });
    }

    // Check if directory is empty
    const files = fs.readdirSync(BLOG_DIRECTORY);
    
    if (files.length === 0) {
      console.log('No blog posts found in content/blog directory');
      return [];
    }

    const mdFiles = files.filter((file) => file.endsWith('.md'));
    console.log(`Found ${mdFiles.length} local Markdown files in content/blog`);

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
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
            coverImage: data.coverImage || '/images/blog/default-cover.jpg',
            author: data.author || 'Anonymous',
            authorImage: data.authorImage || '/profile.jpeg',
            authorBio: data.authorBio || '',
            readingTime: getReadingTime(markdown),
            affiliateLinks: data.affiliateLinks || [],
            hasAffiliateLinks: !!(data.affiliateLinks && data.affiliateLinks.length > 0)
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
    console.error('Error in getLocalBlogPosts:', error);
    return [];
  }
}
