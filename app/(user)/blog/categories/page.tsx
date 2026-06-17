import { getAllBlogPosts } from '@/lib/content';
import Link from 'next/link';
import { Folder, ArrowUpRight } from 'lucide-react';
import BlogContainer from '@/components/utils/BlogContainer';

export const metadata = {
  title: 'Blog Categories | Boring9.dev',
  description: 'Browse articles by category on Boring9.dev',
  keywords: 'blog categories, web development, programming, javascript, react, next.js',
  openGraph: {
    title: 'Blog Categories | Boring9.dev',
    description: 'Browse articles by category on Boring9.dev',
    url: 'https://www.boring9.dev/blog/categories',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.boring9.dev/blog/categories',
  }
};

export default async function CategoriesPage() {
  const posts = await getAllBlogPosts();
  
  // Create a map of categories with post counts
  const categoriesMap = posts.reduce((map, post) => {
    const category = post.category || 'Uncategorized';
    if (!map[category]) {
      map[category] = 0;
    }
    map[category]++;
    return map;
  }, {} as Record<string, number>);
  
  // Convert map to array and sort alphabetically
  const categories = Object.entries(categoriesMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
  
  // Create schema.org structured data for categories page
  const categoriesSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Blog Categories',
    'description': 'Browse blog posts by category on Boring9.dev',
    'url': 'https://www.boring9.dev/blog/categories',
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': categories.map((category, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': category.name,
        'url': `https://www.boring9.dev/blog/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`
      }))
    }
  };
  
  return (
    <BlogContainer>
      <div className="mx-auto flex w-full max-w-5xl flex-col">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categoriesSchema) }}
        />

        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-400">
            <Folder className="h-3.5 w-3.5" />
            <span>Categories</span>
            <span className="h-1 w-1 rounded-full bg-primary-500/60" />
            <span className="text-gray-500">{categories.length} topics</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-50 sm:text-5xl">
            Browse by topic
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
            Pick a category to see every related article.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/blog/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-primary-500/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.02] text-primary-400 transition-colors duration-300 group-hover:border-primary-500/40">
                <Folder size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-gray-100 transition-colors group-hover:text-primary-300">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.count}{' '}
                  {category.count === 1 ? 'article' : 'articles'}
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-600 transition-all duration-300 group-hover:text-primary-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </div>
    </BlogContainer>
  );
}
