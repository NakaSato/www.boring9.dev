import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/content';
import { BlogHeader } from '@/components/blog/blog-header';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import RelatedPosts from '@/components/blog/related-posts';
import ReadingProgressBar from '@/components/blog/reading-progress';
import TableOfContents from '@/components/blog/table-of-contents';
import SocialSharing from '@/components/blog/social-sharing';
import CodeBlock from '@/components/blog/code-block';
import AffiliateLinksSection from '@/components/blog/affiliate-links-section';
import AffiliateDisclosure from '@/components/blog/affiliate-disclosure';

export const generateStaticParams = async () => {
  const posts = await getAllBlogPosts();

  return posts.map((post) => ({
    slug: post.slug
  }));
};

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ slug: string }>;
}) => {
  // Await the params object before accessing its properties
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist'
    };
  }

  return {
    title: `${post.title} | Boring9.dev`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://www.boring9.dev/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      creator: '@boring9dev'
    },
    alternates: {
      canonical: `https://www.boring9.dev/blog/${post.slug}`
    }
  };
};

export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params object before accessing its properties
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const allPosts = await getAllBlogPosts();

  if (!post) {
    notFound();
  }

  // Generate JSON-LD structured data for the blog post
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Boring9.dev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.boring9.dev/favicon.ico'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.boring9.dev/blog/${post.slug}`
    },
    keywords: post.tags.join(',')
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Code block for copy functionality */}
      <CodeBlock />

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-12 xl:flex-row xl:items-start">
          {/* Table of Contents - desktop */}
          <TableOfContents />

          {/* Main article content */}
          <article className="mx-auto w-full min-w-0 max-w-3xl xl:mx-0 xl:flex-1">
            {/* Add JSON-LD structured data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="mb-8">
              <Link
                href="/blog"
                className="group mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-200 hover:text-primary-400"
              >
                <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                Back to blog
              </Link>

              {post.category && (
                <Link
                  href={`/blog/categories/${post.category
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                  className="mb-4 block font-mono text-xs uppercase tracking-[0.2em] text-primary-400 transition-colors hover:text-primary-300"
                >
                  {post.category}
                </Link>
              )}

              <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-gray-50 sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <BlogHeader
                author={{
                  name: post.author,
                  handle: post.author.toLowerCase().replace(/\s+/g, ''),
                  avatar: post.authorImage
                }}
                date={post.date}
                readingTime={post.readingTime}
              />
            </div>

            {post.coverImage && (
              <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.07]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
            )}

            <div
              className="prose prose-invert prose-base sm:prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />

            {/* Affiliate Links Section */}
            {post.hasAffiliateLinks && post.affiliateLinks && (
              <AffiliateLinksSection
                links={post.affiliateLinks}
                title="Recommended Products & Services"
                showDisclosure={false} // We'll show disclosure separately
              />
            )}

            {/* Footer: tags + share */}
            <div className="mt-12 flex flex-col gap-6 border-t border-white/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">
              {post.tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1 font-mono text-xs text-gray-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : (
                <span />
              )}

              <SocialSharing
                title={post.title}
                url={`/blog/${post.slug}`}
                summary={post.excerpt}
              />
            </div>

            {/* Affiliate Disclosure Footer */}
            {post.hasAffiliateLinks && <AffiliateDisclosure variant="footer" />}

            {/* Related posts */}
            <RelatedPosts currentPost={post} allPosts={allPosts} />
          </article>
        </div>
      </div>
    </>
  );
}
