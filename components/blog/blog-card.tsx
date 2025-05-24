import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { BlogPostProps } from '@/lib/get-content';

interface BlogCardProps {
  post: BlogPostProps;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="flex flex-col bg-gray-900 rounded-lg xs:rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1 mobile:hover:-translate-y-0.5 h-full" style={{
      willChange: "transform, box-shadow",
      transform: "translateZ(0)",
      contain: "layout style paint"
    }}>
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative w-full aspect-video" style={{
            willChange: "transform",
            transform: "translateZ(0)"
          }}>
            <Image
              src={post.coverImage}
              alt={`Cover image for blog post: ${post.title}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 475px) 100vw, (max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAJAHlXiLwAAAABJRU5ErkJggg=="
              style={{
                willChange: "transform",
                transform: "translateZ(0)"
              }}
            />
          </div>
        </Link>
      )}
      <div className="flex flex-col p-3 xs:p-4 md:p-5 lg:p-6 flex-grow">
        <div className="flex items-center gap-2 mb-2 xs:mb-3">
          <Link
            href={`/blog/categories/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-xs font-medium px-2 py-1 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors flex-shrink-0"
          >
            {post.category}
          </Link>
          <div className="flex items-center text-xs text-gray-400 flex-shrink-0">
            <Clock className="w-3 h-3 mr-1" />
            <span>{post.readingTime}</span>
          </div>
        </div>
        
        <Link href={`/blog/${post.slug}`} className="group flex-grow">
          <h3 className="text-base xs:text-lg md:text-xl font-bold mb-2 xs:mb-3 group-hover:text-blue-400 transition-colors leading-tight">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-xs xs:text-sm md:text-base text-gray-400 mb-3 xs:mb-4 line-clamp-2 xs:line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex items-center mt-auto text-xs xs:text-sm">
          <Image
            src={post.authorImage}
            alt={post.author}
            width={20}
            height={20}
            className="rounded-full mr-2 xs:w-6 xs:h-6 flex-shrink-0"
          />
          <span className="text-gray-300 truncate flex-shrink min-w-0">{post.author}</span>
          <span className="mx-2 text-gray-500 flex-shrink-0">•</span>
          <time className="text-gray-400 flex-shrink-0">
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
