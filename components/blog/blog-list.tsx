'use client';

import BlogCard from '@/components/blog/blog-card';
import { BlogPostProps } from '@/lib/get-content';
import Link from 'next/link';
import {
  Search,
  BookOpen,
  TrendingUp,
  Grid3X3,
  List,
  LayoutGrid,
  Columns
} from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';

type CardVariant = 'horizontal' | 'grid' | 'compact' | 'masonry';

interface BlogListProps {
  posts: BlogPostProps[];
  showSearch?: boolean;
}

export default function BlogList({ posts, showSearch = true }: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cardVariant, setCardVariant] = useState<CardVariant>('horizontal');

  // Load saved layout preference
  useEffect(() => {
    // Load saved card variant from localStorage
    const savedVariant = localStorage.getItem(
      'blog-card-variant'
    ) as CardVariant;
    if (
      savedVariant &&
      ['horizontal', 'grid', 'compact', 'masonry'].includes(savedVariant)
    ) {
      setCardVariant(savedVariant);
    }
  }, []);

  // Save card variant preference to localStorage
  useEffect(() => {
    localStorage.setItem('blog-card-variant', cardVariant);
  }, [cardVariant]);

  // Keyboard navigation for card variants
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey || e.metaKey) {
        const variants: CardVariant[] = [
          'horizontal',
          'grid',
          'compact',
          'masonry'
        ];
        const currentIndex = variants.indexOf(cardVariant);

        switch (e.key) {
          case '1':
            e.preventDefault();
            setCardVariant('horizontal');
            break;
          case '2':
            e.preventDefault();
            setCardVariant('grid');
            break;
          case '3':
            e.preventDefault();
            setCardVariant('compact');
            break;
          case '4':
            e.preventDefault();
            setCardVariant('masonry');
            break;
          case 'ArrowLeft':
            e.preventDefault();
            const prevIndex =
              currentIndex > 0 ? currentIndex - 1 : variants.length - 1;
            setCardVariant(variants[prevIndex]);
            break;
          case 'ArrowRight':
            e.preventDefault();
            const nextIndex =
              currentIndex < variants.length - 1 ? currentIndex + 1 : 0;
            setCardVariant(variants[nextIndex]);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cardVariant]);

  // Filter posts based on search
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      return matchesSearch;
    });
  }, [posts, searchTerm]);

  // Function to render cards based on variant
  const renderCards = (posts: BlogPostProps[], startIndex: number = 0) => {
    switch (cardVariant) {
      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <div key={post.slug}>
                <BlogCard
                  post={post}
                  variant="default"
                  showStats={true}
                  showActions={true}
                  index={startIndex + index}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        );

      case 'compact':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {posts.map((post, index) => (
              <div key={post.slug}>
                <BlogCard
                  post={post}
                  variant="compact"
                  showStats={false}
                  showActions={true}
                  index={startIndex + index}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        );

      case 'masonry':
        return (
          <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
            {posts.map((post, index) => (
              <div key={post.slug} className="break-inside-avoid mb-6">
                <BlogCard
                  post={post}
                  variant={
                    index % 3 === 0
                      ? 'featured'
                      : index % 2 === 0
                        ? 'default'
                        : 'compact'
                  }
                  showStats={true}
                  showActions={true}
                  index={startIndex + index}
                  className="w-full"
                />
              </div>
            ))}
          </div>
        );

      case 'horizontal':
      default:
        return (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <div key={post.slug}>
                <BlogCard
                  post={post}
                  variant="horizontal"
                  showStats={true}
                  showActions={true}
                  index={startIndex + index}
                  className="max-w-none"
                />
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Clean Blog Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 border border-primary-500/30 rounded-full text-primary-300 text-sm font-medium mb-6 backdrop-blur-sm">
          <BookOpen className="w-4 h-4" />
          <span>Latest Articles</span>
          <div className="w-1 h-1 rounded-full bg-primary-400" />
          <span>{posts.length} Posts</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Tech Insights &
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary-300 via-purple-300 to-primary-300 bg-clip-text text-transparent">
            Tutorials
          </span>
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Exploring the latest in web development, and fintech innovations.
          Learn through practical applications.
        </p>
      </div>

      {/* Search and Card Variant Controls */}
      {showSearch && (
        <div className="mb-12 max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700/50 hover:border-gray-600/50 focus:border-primary-500/50 rounded-2xl text-white placeholder-gray-400 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-lg"
            />
          </div>

          {/* Card Variant Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 font-medium">
                View as:
              </span>
              <div className="flex items-center bg-gray-900/50 border border-gray-700/50 rounded-xl p-1 backdrop-blur-sm">
                {[
                  {
                    id: 'horizontal',
                    icon: List,
                    label: 'List',
                    description: 'Detailed horizontal cards'
                  },
                  {
                    id: 'grid',
                    icon: Grid3X3,
                    label: 'Grid',
                    description: 'Clean grid layout'
                  },
                  {
                    id: 'compact',
                    icon: Columns,
                    label: 'Compact',
                    description: 'Space-efficient cards'
                  },
                  {
                    id: 'masonry',
                    icon: LayoutGrid,
                    label: 'Masonry',
                    description: 'Pinterest-style layout'
                  }
                ].map(({ id, icon: Icon, label, description }) => (
                  <button
                    key={id}
                    onClick={() => setCardVariant(id as CardVariant)}
                    className={`group relative inline-flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      cardVariant === id
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                    }`}
                    title={description}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{label}</span>

                    {/* Active indicator */}
                    {cardVariant === id && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              {/* Card count for current layout */}
              <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
                <div className="w-1 h-1 rounded-full bg-gray-600" />
                <span>
                  {filteredPosts.length}{' '}
                  {filteredPosts.length === 1 ? 'post' : 'posts'}
                </span>
              </div>
            </div>

            {/* Search Results Info and Quick Actions */}
            <div className="flex items-center gap-4">
              {searchTerm && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">
                    {filteredPosts.length} of {posts.length} articles
                  </span>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
                  >
                    Clear search
                  </button>
                </div>
              )}

              {/* Layout info badge */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-800/30 border border-gray-700/30 rounded-lg text-xs text-gray-400">
                <div
                  className={`w-2 h-2 rounded-full ${
                    cardVariant === 'horizontal'
                      ? 'bg-blue-500'
                      : cardVariant === 'grid'
                        ? 'bg-green-500'
                        : cardVariant === 'compact'
                          ? 'bg-yellow-500'
                          : 'bg-purple-500'
                  }`}
                />
                <span className="capitalize">{cardVariant} Layout</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Smart List Content */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 px-6">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl flex items-center justify-center border border-gray-700/30 backdrop-blur-sm">
              <Search className="w-12 h-12 text-gray-500" />
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">
              {searchTerm ? 'No Results Found' : 'No Articles Yet'}
            </h3>

            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              {searchTerm
                ? "Try adjusting your search terms to find what you're looking for."
                : 'No blog articles are available at the moment. Check back soon for new content.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl"
                >
                  <BookOpen className="w-4 h-4" />
                  View All Articles
                </button>
              ) : (
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl"
                >
                  <TrendingUp className="w-4 h-4" />
                  Back to Home
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`max-w-7xl mx-auto ${cardVariant === 'masonry' ? 'max-w-6xl' : ''}`}
        >
          {/* Featured First Post - Only show in certain layouts */}
          {filteredPosts.length > 0 &&
            ['horizontal', 'grid'].includes(cardVariant) && (
              <div className="mb-16">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-yellow-300 text-sm font-medium backdrop-blur-sm">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span>Featured Article</span>
                  </div>
                </div>

                <BlogCard
                  post={filteredPosts[0]}
                  variant="featured"
                  showStats={true}
                  showActions={true}
                  index={0}
                  priority
                  className="mb-8"
                />

                {filteredPosts.length > 1 && (
                  <div className="relative mt-12">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent" />
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-gray-950 px-6 py-2 rounded-full border border-gray-700/50">
                        <span className="text-sm text-gray-400 font-medium">
                          {cardVariant === 'horizontal'
                            ? 'More Articles Below'
                            : 'Explore More Articles'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          {/* Dynamic Card Layout Section */}
          {(() => {
            const shouldShowFeatured = ['horizontal', 'grid'].includes(
              cardVariant
            );
            const postsToShow =
              shouldShowFeatured && filteredPosts.length > 1
                ? filteredPosts.slice(1)
                : filteredPosts;
            const startIndex =
              shouldShowFeatured && filteredPosts.length > 1 ? 1 : 0;

            if (postsToShow.length === 0) return null;

            return (
              <div>
                {/* Section Header - Only show when there are remaining posts */}
                {shouldShowFeatured && filteredPosts.length > 1 && (
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-primary-500 to-purple-500 rounded-full shadow-lg shadow-primary-500/20" />
                      <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        More Articles
                      </span>
                      <span className="text-base font-normal text-gray-400 ml-2">
                        ({postsToShow.length}{' '}
                        {postsToShow.length === 1 ? 'article' : 'articles'})
                      </span>
                    </h2>

                    {/* Layout info */}
                    <div className="hidden sm:flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                        <span className="capitalize">{cardVariant} Layout</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Render Cards */}
                {renderCards(postsToShow, startIndex)}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
