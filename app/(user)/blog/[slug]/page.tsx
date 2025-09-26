import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/content';
import { BlogHeader } from '@/components/blog/blog-header';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
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

      <div className="max-w-7xl mx-auto py-10 px-4 md:px-6">
        <div className="flex flex-col xl:flex-row xl:space-x-10">
          {/* Table of Contents - desktop */}
          <TableOfContents />

          {/* Main article content */}
          <article className="flex-1 max-w-4xl">
            {/* Add JSON-LD structured data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="mb-8">
              <Link
                href="/blog"
                className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
              >
                ← Back to blog
              </Link>

              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

              <BlogHeader
                author={{
                  name: post.author,
                  handle: post.author.toLowerCase().replace(/\s+/g, ''),
                  avatar: post.authorImage
                }}
                date={new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                readingTime={post.readingTime}
              />
            </div>

            {post.coverImage && (
              <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
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

            {/* Social sharing buttons */}
            <SocialSharing
              title={post.title}
              url={`/blog/${post.slug}`}
              summary={post.excerpt}
            />

            <div
              className="prose prose-invert prose-lg max-w-none"
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

            {/* Social sharing buttons at the bottom */}
            <SocialSharing
              title={post.title}
              url={`/blog/${post.slug}`}
              summary={post.excerpt}
            />

            {post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-gray-800">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Affiliate Disclosure Footer */}
            {post.hasAffiliateLinks && <AffiliateDisclosure variant="footer" />}
          </article>
        </div>
      </div>
    </>
  );
}
