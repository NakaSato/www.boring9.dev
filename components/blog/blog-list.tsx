'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen } from 'lucide-react';
import { BlogPostProps } from '@/lib/get-content';
import PostCard from '@/components/blog/post-card';

interface BlogListProps {
  posts: BlogPostProps[];
  showSearch?: boolean;
  showHeader?: boolean;
}

export default function BlogList({
  posts,
  showSearch = true,
  showHeader = true
}: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [posts, searchTerm]);

  const isSearching = searchTerm.trim().length > 0;
  const [featured, ...rest] = filtered;

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Header */}
      {showHeader && (
      <header className="mb-12">
        <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-400">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Writing</span>
          <span className="h-1 w-1 rounded-full bg-primary-500/60" />
          <span className="text-gray-500">{posts.length} posts</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-50 sm:text-5xl">
          Tech insights &amp; tutorials
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-400">
          Notes on web development, programming, and fintech — learned through
          building real things.
        </p>
      </header>
      )}

      {/* Search */}
      {showSearch && (
        <div className="relative mb-10">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search articles, tags, categories…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-white/[0.07] bg-white/[0.02] py-3.5 pl-11 pr-4 text-sm text-gray-100 placeholder-gray-500 transition-colors duration-200 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
          />
          {isSearching && (
            <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
              <span>
                {filtered.length} of {posts.length} articles
              </span>
              <button
                onClick={() => setSearchTerm('')}
                className="font-medium text-primary-400 transition-colors hover:text-primary-300"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-20 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            <Search className="h-7 w-7 text-gray-500" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-100">
            {isSearching ? 'No results found' : 'No articles yet'}
          </h3>
          <p className="mx-auto mb-8 max-w-sm text-gray-400">
            {isSearching
              ? 'Try a different search term.'
              : 'New content is on the way — check back soon.'}
          </p>
          {isSearching ? (
            <button
              onClick={() => setSearchTerm('')}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-500"
            >
              <BookOpen className="h-4 w-4" />
              View all articles
            </button>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-500"
            >
              Back to home
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          {/* Featured (hidden while searching for a flat result list) */}
          {!isSearching && featured && (
            <PostCard post={featured} featured priority index={0} />
          )}

          {/* Grid */}
          {(isSearching ? filtered : rest).length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {(isSearching ? filtered : rest).map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
