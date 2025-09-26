import { BlogPostProps } from '@/lib/get-content';
import { getAllBlogPosts } from '@/lib/content';
import BlogList from '@/components/blog/blog-list';
import BlogContainer from '@/components/utils/BlogContainer';
import SocialShare from '@/components/sections/social-share';
import Pagination from '@/components/blog/pagination';

// Number of posts per page
const POSTS_PER_PAGE = 9;

export const metadata = {
  title: 'Blog',
  description:
    'Read articles about web development, programming, and technology from Chanthawat Kiriyadee, covering React, Next.js, JavaScript, and more',
  keywords:
    'blog, web development, programming, javascript, react, next.js, typescript',
  openGraph: {
    title: 'Blog',
    description:
      'Read articles about web development, programming, and technology',
    url: 'https://www.boring9.dev/blog',
    type: 'website',
    images: [
      {
        url: 'https://www.boring9.dev/images/blog/default-cover.png',
        width: 1200,
        height: 630,
        alt: 'Boring9.dev Blog'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Boring9.dev',
    description:
      'Read articles about web development, programming, and technology',
    images: ['https://www.boring9.dev/images/blog/default-cover.png'],
    creator: '@boring9dev'
  },
  alternates: {
    canonical: 'https://www.boring9.dev/blog'
  }
};

export default async function Blog() {
  // Get all posts
  const allPosts = await getAllBlogPosts();

  // Calculate pagination values
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Get posts for first page
  const posts = allPosts.slice(0, POSTS_PER_PAGE);

  // Create schema.org structured data for BlogPosting list
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          author: {
            '@type': 'Person',
            name: post.author
          },
          datePublished: post.date,
          url: `https://www.boring9.dev/blog/${post.slug}`
        }
      }))
    }
  };

  return (
    <BlogContainer>
      <div className="flex flex-col w-full">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
        />

        <BlogList posts={posts} />

        {totalPages > 1 && (
          <div className="mt-16 flex justify-center">
            <Pagination
              currentPage={1}
              totalPages={totalPages}
              basePath="/blog/page"
            />
          </div>
        )}

        {/* Social Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-800/50">
          <SocialShare title="Blog" />
        </div>
      </div>
    </BlogContainer>
  );
}
