import { BlogPostProps } from '@/lib/get-content';
import Link from 'next/link';
import Image from 'next/image';

interface RelatedPostsProps {
  currentPost: BlogPostProps;
  allPosts: BlogPostProps[];
  maxPosts?: number;
}

export default function RelatedPosts({ 
  currentPost, 
  allPosts, 
  maxPosts = 3 
}: RelatedPostsProps) {
  // Simple algorithm to find related posts based on tags
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug) // Exclude current post
    .filter((post) => {
      // Check if posts share at least one tag
      return currentPost.tags.some((tag) => post.tags.includes(tag));
    })
    .slice(0, maxPosts);

  // If we don't have enough related posts by tags, add some recent posts
  if (relatedPosts.length < maxPosts) {
    const recentPosts = allPosts
      .filter((post) => post.slug !== currentPost.slug)
      .filter((post) => !relatedPosts.some((rp) => rp.slug === post.slug))
      .slice(0, maxPosts - relatedPosts.length);
    
    relatedPosts.push(...recentPosts);
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 xs:mt-10 md:mt-12 pt-6 xs:pt-8 border-t border-gray-800 mobile:mx-4">
      <h3 className="text-lg xs:text-xl md:text-2xl font-bold mb-4 xs:mb-6">Related Posts</h3>
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 md:gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="flex flex-col bg-gray-900 rounded-lg xs:rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl group-hover:transform group-hover:-translate-y-1 mobile:hover:-translate-y-0.5 h-full">
              {post.coverImage && (
                <div className="relative w-full aspect-video">
                  <Image
                    src={post.coverImage}
                    alt={`Cover image for ${post.title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 475px) 100vw, (max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-3 xs:p-4 md:p-5 flex-grow">
                <h4 className="text-base xs:text-lg font-semibold group-hover:text-blue-400 transition-colors leading-tight mb-2">{post.title}</h4>
                <p className="text-xs xs:text-sm text-gray-400 line-clamp-2 xs:line-clamp-3 leading-relaxed">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
