import { BlogPostProps } from '@/lib/get-content';
import { getAllBlogPosts } from '@/lib/content';
import BlogList from '@/components/blog/blog-list';
import AnimationContainer from '@/components/utils/AnimationContainer';
import BlogContainer from '@/components/utils/BlogContainer';
import TitleSectionPageContainer from '@/components/utils/TitleSectionPageContainer';
import SocialShare from '@/components/sections/social-share';
import Pagination from '@/components/blog/pagination';

// Number of posts per page
const POSTS_PER_PAGE = 9;

export const metadata = {
  title: 'Blog | Boring9.dev',
  description: 'Read articles about web development, programming, and technology from Chanthawat Kiriyadee, covering React, Next.js, JavaScript, and more',
  keywords: 'blog, web development, programming, javascript, react, next.js, typescript',
  openGraph: {
    title: 'Blog | Boring9.dev',
    description: 'Read articles about web development, programming, and technology',
    url: 'https://www.boring9.dev/blog',
    type: 'website',
    images: [
      {
        url: 'https://www.boring9.dev/images/blog/default-cover.png',
        width: 1200,
        height: 630,
        alt: 'Boring9.dev Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Boring9.dev',
    description: 'Read articles about web development, programming, and technology',
    images: ['https://www.boring9.dev/images/blog/default-cover.png'],
    creator: '@boring9dev',
  },
  alternates: {
    canonical: 'https://www.boring9.dev/blog',
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
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': posts.map((post, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'BlogPosting',
          'headline': post.title,
          'description': post.excerpt,
          'author': {
            '@type': 'Person',
            'name': post.author
          },
          'datePublished': post.date,
          'url': `https://www.boring9.dev/blog/${post.slug}`
        }
      }))
    }
  };
  
  return (
    <BlogContainer>
      <div className="flex flex-col w-full gap-6">
        <TitleSectionPageContainer title="Blog" />

        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
        />

        <AnimationContainer customClassName="w-full flex flex-col gap-5 mb-8">
          <p className="w-full text-base text-gray-400">
            Welcome to my blog, where I share my thoughts, experiences, and tutorials about
            web development, programming, and everything tech-related. Browse through the articles
            and feel free to share them with others.
          </p>
          <div className="flex gap-4">
            <a
              href="/blog/categories"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Browse by Category</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
            <a
              href="/blog/search"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Advanced Search</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </AnimationContainer>

        <SocialShare title="Blog" />

        <BlogList posts={posts} />
        
        {/* Add pagination component when there are multiple pages */}
        {totalPages > 1 && (
          <Pagination 
            currentPage={1} 
            totalPages={totalPages} 
            basePath="/blog/page" 
          />
        )}
      </div>
    </BlogContainer>
  );
}
