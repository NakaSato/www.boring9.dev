import { getAllBlogPosts } from '@/lib/content';
import { notFound } from 'next/navigation';
import BlogList from '@/components/blog/blog-list';
import Pagination from '@/components/blog/pagination';
import BlogContainer from '@/components/utils/BlogContainer';
import SocialShare from '@/components/sections/social-share';
import BackToCategoriesButton from '@/components/blog/back-to-categories-button';

// Number of posts per page
const POSTS_PER_PAGE = 9;

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

// Generate static params for common categories
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  
  // Get unique categories from posts
  const categories = Array.from(
    new Set(posts.map(post => post.category || 'Uncategorized'))
  );
  
  // Convert category names to URL-friendly format
  return categories.map(category => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
  
  return {
    title: `${categoryName} Articles | Boring9.dev Blog`,
    description: `Read articles about ${categoryName.toLowerCase()} on Boring9.dev`,
    keywords: `${categoryName.toLowerCase()}, blog, web development, programming`,
    openGraph: {
      title: `${categoryName} Articles | Boring9.dev Blog`,
      description: `Read articles about ${categoryName.toLowerCase()} on Boring9.dev`,
      url: `https://www.boring9.dev/blog/categories/${categorySlug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://www.boring9.dev/blog/categories/${categorySlug}`,
    }
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const { page = '1' } = await searchParams;
  const pageNumber = parseInt(page);
  
  // Convert slug to proper category name (replace hyphens with spaces and capitalize)
  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
  
  // Get all posts
  const allPosts = await getAllBlogPosts();
  
  // Filter posts by category using slug comparison instead of name comparison
  const categoryPosts = allPosts.filter(post => {
    const postCategorySlug = (post.category || 'Uncategorized')
      .toLowerCase()
      .replace(/\s+/g, '-');
    return postCategorySlug === categorySlug.toLowerCase();
  });
  
  // If no posts found for this category, return 404
  if (categoryPosts.length === 0) {
    notFound();
  }
  
  // Calculate pagination values
  const totalPosts = categoryPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  // Ensure page number is valid
  const validatedPageNumber = Math.max(1, Math.min(pageNumber, totalPages));
  
  // Get posts for current page
  const startIndex = (validatedPageNumber - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const paginatedPosts = categoryPosts.slice(startIndex, endIndex);
  
  // Create schema.org structured data
  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': `${categoryName} Articles`,
    'description': `Articles about ${categoryName} on Boring9.dev`,
    'url': `https://www.boring9.dev/blog/categories/${categorySlug}`,
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': paginatedPosts.map((post, index) => ({
        '@type': 'ListItem',
        'position': startIndex + index + 1,
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
      <div className="mx-auto flex w-full max-w-5xl flex-col">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
        />

        {/* Header */}
        <header className="mb-12">
          <BackToCategoriesButton />
          <div className="mt-6 mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-400">
            Category
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-50 sm:text-5xl">
            {categoryName}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-400">
            {totalPosts} {totalPosts === 1 ? 'article' : 'articles'}
            {totalPages > 1 &&
              ` · page ${validatedPageNumber} of ${totalPages}`}
          </p>
        </header>

        <BlogList posts={paginatedPosts} showHeader={false} showSearch={false} />

        {/* Add pagination when there are multiple pages */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={validatedPageNumber}
              totalPages={totalPages}
              basePath={`/blog/categories/${categorySlug}`}
            />
          </div>
        )}

        {/* Share */}
        <div className="mt-12 border-t border-white/[0.07] pt-8">
          <SocialShare title={`${categoryName} Articles`} />
        </div>
      </div>
    </BlogContainer>
  );
}
