import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { BlogPostProps } from '@/lib/get-content';

interface BlogCardProps {
  post: BlogPostProps;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl hover:transform hover:-translate-y-1">
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative w-full aspect-video">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
      )}
      <div className="flex flex-col p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800 text-gray-300">
            {post.category}
          </span>
          <div className="flex items-center text-xs text-gray-400">
            <Clock className="w-3 h-3 mr-1" />
            <span>{post.readingTime}</span>
          </div>
        </div>
        
        <Link href={`/blog/${post.slug}`} className="group">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center mt-auto">
          <Image
            src={post.authorImage}
            alt={post.author}
            width={24}
            height={24}
            className="rounded-full mr-2"
          />
          <span className="text-sm text-gray-300">{post.author}</span>
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
