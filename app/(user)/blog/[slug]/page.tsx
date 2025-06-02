import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/content';
import { BlogHeader } from '@/components/blog/blog-header';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReadingProgressBar from '@/components/blog/reading-progress';
import RelatedPosts from '@/components/blog/related-posts';
import TableOfContents from '@/components/blog/table-of-contents';
import SocialSharing from '@/components/blog/social-sharing';
import EnhancedCodeBlock from '@/components/blog/enhanced-code-block';
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

      {/* Code block enhancement for copy functionality */}
      <EnhancedCodeBlock />

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
                  handle: '@' + post.author.toLowerCase().replace(/\s+/g, ''),
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
                    <Link
                      key={tag}
                      href={`/blog/search?tag=${tag}`}
                      className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {post.authorBio && (
              <div className="mt-12 pt-8 border-t border-gray-800/60">
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-2xl p-6 lg:p-8 backdrop-blur-sm border border-gray-700/30">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-full blur opacity-75"></div>
                      <Image
                        src={post.authorImage}
                        alt={post.author}
                        width={80}
                        height={80}
                        className="relative rounded-full border-2 border-gray-700/50"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {post.author}
                        </h3>
                        <div className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full font-medium border border-blue-500/30">
                          Author
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {post.authorBio}
                      </p>
                      <div className="mt-4 flex items-center gap-4">
                        <div className="text-sm text-gray-400">
                          📧 Connect for collaboration
                        </div>
                        <div className="text-sm text-gray-400">
                          🚀 Follow for more tech insights
                        </div>
                      </div>
                    </div>
                  </div>
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
