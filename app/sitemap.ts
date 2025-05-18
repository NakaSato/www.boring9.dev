// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.boring9.dev';
  
  // Get all blog posts
  const blogPosts = await getAllBlogPosts();
  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  // Blog pagination pages
  const POSTS_PER_PAGE = 9;
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const paginationUrls = Array.from({ length: totalPages }, (_, i) => ({
    url: i === 0 ? `${baseUrl}/blog` : `${baseUrl}/blog/page/${i + 1}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: i === 0 ? 0.9 : 0.7,
  }));
  
  // Get all categories
  const categories = Array.from(
    new Set(blogPosts.map(post => post.category || 'Uncategorized'))
  );
  
  // Category pages
  const categoryUrls = [
    {
      url: `${baseUrl}/blog/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...categories.map(category => ({
      url: `${baseUrl}/blog/categories/${category.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];
  
  return [
    ...staticPages,
    ...paginationUrls,
    ...categoryUrls,
    ...blogUrls,
  ];
}
