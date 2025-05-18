// lib/get-local-content.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from './markdown';
import { getReadingTime } from './read-time';
import { BlogPostProps } from './get-content';

const BLOG_DIRECTORY = path.join(process.cwd(), '.sample-blog-posts');

export async function getLocalBlogPosts(): Promise<BlogPostProps[]> {
  try {
    // Create the directory if it doesn't exist
    if (!fs.existsSync(BLOG_DIRECTORY)) {
      fs.mkdirSync(BLOG_DIRECTORY, { recursive: true });
      
      // Copy the test markdown file if it exists
      const testFilePath = path.join(process.cwd(), 'markdown-test.md');
      if (fs.existsSync(testFilePath)) {
        const content = fs.readFileSync(testFilePath, 'utf8');
        fs.writeFileSync(
          path.join(BLOG_DIRECTORY, 'getting-started-with-markdown.md'),
          content
        );
      }
    }

    // Check if directory is empty
    const files = fs.readdirSync(BLOG_DIRECTORY);
    
    if (files.length === 0) {
      console.log('No blog posts found in local directory');
      return [];
    }

    const mdFiles = files.filter((file) => file.endsWith('.md'));
    console.log(`Found ${mdFiles.length} local Markdown files`);

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
            data.date = data.date || new Date().toISOString();
          }

          // Convert markdown to HTML
          const htmlContent = await markdownToHtml(markdown);

          const post: BlogPostProps = {
            slug: file.replace('.md', ''),
            title: data.title,
            date: new Date(data.date).toISOString(),
            content: markdown,
            htmlContent,
            excerpt: data.excerpt || '',
            category: data.category || 'Uncategorized',
            tags: data.tags || [],
            coverImage: data.coverImage || '/images/default-cover.jpg',
            author: data.author || 'Anonymous',
            authorImage: data.authorImage || '/images/default-avatar.jpg',
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
    console.error('Error in getLocalBlogPosts:', error);
    return [];
  }
}
