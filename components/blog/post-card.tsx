'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { BlogPostProps } from '@/lib/get-content';

interface PostCardProps {
  post: BlogPostProps;
  featured?: boolean;
  priority?: boolean;
  index?: number;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

// Small meta row: date · reading time.
const Meta = ({ post }: { post: BlogPostProps }) => (
  <div className="flex items-center gap-2 text-xs text-gray-500">
    <time>{formatDate(post.date)}</time>
    <span className="h-1 w-1 rounded-full bg-gray-700" />
    <span>{post.readingTime}</span>
  </div>
);

export default function PostCard({
  post,
  featured = false,
  priority = false,
  index = 0
}: PostCardProps) {
  const href = `/blog/${post.slug}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-colors duration-300 hover:border-primary-500/40 ${
        featured ? 'sm:grid sm:grid-cols-2' : 'flex flex-col'
      }`}
    >
      {/* Cover */}
      <Link href={href} className="relative block overflow-hidden bg-gray-900">
        <div
          className={`relative w-full overflow-hidden ${
            featured ? 'aspect-[16/10] h-full' : 'aspect-[16/9]'
          }`}
        >
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority={priority}
              sizes={featured ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 768px) 100vw, 50vw'}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/40 to-transparent" />
        </div>
      </Link>

      {/* Body */}
      <div
        className={`flex flex-col ${featured ? 'justify-center p-6 sm:p-8' : 'p-5'}`}
      >
        <div className="mb-3 flex items-center gap-3">
          <Link
            href={`/blog/categories/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary-400 transition-colors hover:text-primary-300"
          >
            {post.category}
          </Link>
        </div>

        <Link href={href} className="block">
          <h3
            className={`font-bold leading-snug text-gray-50 transition-colors duration-300 group-hover:text-primary-300 ${
              featured
                ? 'text-xl sm:text-2xl line-clamp-3'
                : 'text-lg line-clamp-2'
            }`}
          >
            {post.title}
          </h3>
        </Link>

        <p
          className={`mt-3 text-sm leading-relaxed text-gray-400 ${
            featured ? 'line-clamp-3' : 'line-clamp-2'
          }`}
        >
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <Meta post={post} />
          <Link
            href={href}
            aria-label={`Read ${post.title}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.07] text-gray-400 transition-all duration-300 group-hover:border-primary-500/40 group-hover:text-primary-400"
          >
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
