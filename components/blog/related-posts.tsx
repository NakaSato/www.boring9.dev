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
    <div className="mt-12 pt-8 border-t border-gray-800">
      <h3 className="text-2xl font-bold mb-6">Related Posts</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden shadow-md transition-all hover:shadow-xl group-hover:transform group-hover:-translate-y-1">
              {post.coverImage && (
                <div className="relative w-full aspect-video">
                  <Image
                    src={post.coverImage}
                    alt={`Cover image for ${post.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-4">
                <h4 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">{post.title}</h4>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">{post.excerpt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
