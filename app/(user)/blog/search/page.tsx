import { getAllBlogPosts } from '@/lib/content';
import BlogSearch from '@/components/blog/blog-search';
import BlogContainer from '@/components/utils/BlogContainer';
import { Suspense } from 'react';

export const metadata = {
  title: 'Search Blog | Boring9.dev',
  description: 'Search through all blog posts on Boring9.dev',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Search Blog | Boring9.dev',
    description: 'Search through all blog posts on Boring9.dev',
    type: 'website',
  }
};

export default async function SearchPage() {
  const posts = await getAllBlogPosts();
  
  return (
    <BlogContainer>
      <Suspense fallback={<div>Loading search...</div>}>
        <BlogSearch posts={posts} />
      </Suspense>
    </BlogContainer>
  );
}
