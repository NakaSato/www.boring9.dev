import { getAllBlogPosts } from '@/lib/content';
import Link from 'next/link';
import { Folder } from 'lucide-react';
import BlogContainer from '@/components/utils/BlogContainer';
import TitleSectionPageContainer from '@/components/utils/TitleSectionPageContainer';
import AnimationContainer from '@/components/utils/AnimationContainer';

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
      <div className="flex flex-col w-full gap-6">
        <TitleSectionPageContainer title="Blog Categories" />

        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categoriesSchema) }}
        />

        <AnimationContainer customClassName="w-full flex flex-col gap-5 mb-8">
          <p className="w-full text-base text-gray-400">
            Browse all blog posts by category. Select a category to see all related articles.
          </p>
        </AnimationContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/blog/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition-all"
            >
              <div className="mr-3 p-2 bg-gray-800 rounded-lg">
                <Folder size={20} className="text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-lg text-white">{category.name}</h3>
                <p className="text-sm text-gray-400">
                  {category.count} {category.count === 1 ? 'article' : 'articles'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BlogContainer>
  );
}
