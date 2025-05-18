import { getAllBlogPosts } from '@/lib/content';
import BlogList from '@/components/blog/blog-list';
import AnimationContainer from '@/components/utils/AnimationContainer';
import BlogContainer from '@/components/utils/BlogContainer';
import TitleSectionPageContainer from '@/components/utils/TitleSectionPageContainer';
import SocialShare from '@/components/sections/social-share';
import LocalPagination from '@/components/blog/local-pagination';
import EnhancedCodeBlock from '@/components/blog/enhanced-code-block';
import { redirect } from 'next/navigation';

// Number of posts per page
const POSTS_PER_PAGE = 9;

// Generate static params for the first 5 pages
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  
  // Generate pages up to a reasonable limit (e.g., first 5 pages)
  const pagesToGenerate = Math.min(totalPages, 5);
  
  return Array.from({ length: pagesToGenerate }, (_, i) => ({
    page: String(i + 1),
  }));
}

export async function generateMetadata({ params }: { params: { page: string }}) {
  const pageNumber = parseInt(params.page);
  
  return {
    title: `Blog Page ${pageNumber} | Boring9.dev`,
    description: `Browse page ${pageNumber} of our web development articles covering React, Next.js, JavaScript, and more`,
    openGraph: {
      title: `Blog Page ${pageNumber} | Boring9.dev`,
      description: `Browse page ${pageNumber} of our web development articles`,
      url: `https://www.boring9.dev/blog/page/${pageNumber}`,
    },
    alternates: {
      canonical: `https://www.boring9.dev/blog/page/${pageNumber}`,
    }
  };
}

export default async function BlogPage({ params }: { params: { page: string }}) {
  const pageNumber = parseInt(params.page);
  
  // If page number is invalid, redirect to the first page
  if (isNaN(pageNumber) || pageNumber < 1) {
    redirect('/blog');
  }
  
  // Get all posts
  const allPosts = await getAllBlogPosts();
  
  // Calculate pagination values
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  // If page number is greater than total pages, redirect to the last page
  if (pageNumber > totalPages) {
    redirect(`/blog/page/${totalPages}`);
  }
  
  // Get posts for current page
  const startIndex = (pageNumber - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const posts = allPosts.slice(startIndex, endIndex);
  
  // Create schema.org structured data for BlogPosting list
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': posts.map((post, index) => ({
        '@type': 'ListItem',
        'position': startIndex + index + 1, // Maintain global position across pages
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
      {/* Code block enhancement for copy functionality */}
      <EnhancedCodeBlock />
      
      <div className="flex flex-col w-full gap-8 pb-12">
        <TitleSectionPageContainer title={`Blog - Page ${pageNumber}`} />

        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
        />

        <AnimationContainer customClassName="w-full flex flex-col gap-6 mb-8">
          <p className="w-full text-base text-gray-400 leading-relaxed max-w-3xl mx-auto text-center md:text-lg">
            Browse through my articles about web development, programming, and technology.
            <span className="inline-block mt-2 font-medium">
              Page {pageNumber} of {totalPages}.
            </span>
          </p>
        </AnimationContainer>

        <div className="mb-8">
          <SocialShare title={`Blog - Page ${pageNumber}`} />
        </div>

        <div className="relative w-full">
          <BlogList posts={posts} />
        </div>
        
        {/* Add pagination component with improved styling */}
        <div className="mt-12">
          <LocalPagination 
            currentPage={pageNumber} 
            totalPages={totalPages} 
            basePath="/blog/page" 
          />
        </div>
      </div>
    </BlogContainer>
  );
}
