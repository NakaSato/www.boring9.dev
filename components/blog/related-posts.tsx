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
  // Match on shared tags first, then backfill with recent posts.
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .filter((post) => currentPost.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, maxPosts);

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
    <div className="mt-16 border-t border-white/[0.07] pt-10">
      <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-400">
        <span className="h-1 w-1 rounded-full bg-primary-500/60" />
        <span>Keep reading</span>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] transition-colors duration-300 hover:border-primary-500/40"
          >
            {post.coverImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-900">
                <Image
                  src={post.coverImage}
                  alt={`Cover image for ${post.title}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex flex-col p-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary-400/80">
                {post.category}
              </span>
              <h4 className="mt-2 font-semibold leading-snug text-gray-100 transition-colors line-clamp-2 group-hover:text-primary-300">
                {post.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-gray-400 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
