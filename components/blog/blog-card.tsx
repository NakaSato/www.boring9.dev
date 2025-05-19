import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { BlogPostProps } from '@/lib/get-content';

interface BlogCardProps {
  post: BlogPostProps;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="flex flex-col bg-gray-900/90 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1 border border-gray-800/50 hover:border-primary-600/70 group">
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={post.coverImage}
              alt={`Cover image for blog post: ${post.title}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAJAHlXiLwAAAABJRU5ErkJggg=="
            />
          </div>
        </Link>
      )}
      <div className="flex flex-col p-5 flex-grow">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Link
            href={`/blog/categories/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-xs font-medium px-3 py-1 rounded-full bg-primary-900/80 text-primary-200 hover:bg-primary-800 transition-all duration-300 hover:text-white"
          >
            {post.category}
          </Link>
          <div className="flex items-center text-xs text-gray-400">
            <Clock className="w-3 h-3 mr-1 text-secondary-400" />
            <span>{post.readingTime}</span>
          </div>
        </div>
        
        <Link href={`/blog/${post.slug}`} className="group">
          <h3 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-all duration-300 line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-300 mb-5 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center mt-auto pt-3 border-t border-gray-800/50">
          <div className="bg-gray-800 rounded-full p-0.5 mr-2 ring-2 ring-primary-600/20">
            <Image
              src={post.authorImage}
              alt={post.author}
              width={24}
              height={24}
              className="rounded-full"
            />
          </div>
          <span className="text-sm text-gray-200 font-medium">{post.author}</span>
          <span className="mx-2 text-gray-500">•</span>
          <time className="text-sm text-gray-400">
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </time>
        </div>
      </div>
    </div>
  );
}
