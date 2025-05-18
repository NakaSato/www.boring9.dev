import { getBlogPosts, BlogPostProps } from '@/lib/get-content';
import { getLocalBlogPosts } from '@/lib/get-local-content';
import { BlogHeader } from '@/components/blog/blog-header';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export const generateStaticParams = async () => {
  let posts: BlogPostProps[] = [];
  
  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error('Error fetching posts from GitHub, falling back to local content:', error);
    try {
      posts = await getLocalBlogPosts();
    } catch (localError) {
      console.error('Error fetching local posts:', localError);
    }
  }
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
};

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
  let posts: BlogPostProps[] = [];
  
  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error('Error fetching posts from GitHub, falling back to local content:', error);
    try {
      posts = await getLocalBlogPosts();
    } catch (localError) {
      console.error('Error fetching local posts:', localError);
    }
  }
  
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The blog post you are looking for does not exist',
    };
  }

  return {
    title: `${post.title} | Boring9.dev`,
    description: post.excerpt,
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
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
};

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let posts: BlogPostProps[] = [];
  
  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error('Error fetching posts from GitHub, falling back to local content:', error);
    try {
      posts = await getLocalBlogPosts();
    } catch (localError) {
      console.error('Error fetching local posts:', localError);
    }
  }
  
  const post = posts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-10 px-4 md:px-6">
      <div className="mb-8">
        <Link href="/blog" className="text-blue-400 hover:text-blue-300 mb-4 inline-block">
          ← Back to blog
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <BlogHeader
          author={{
            name: post.author,
            handle: '@' + post.author.toLowerCase().replace(/\s+/g, ''),
            avatar: post.authorImage,
          }}
          date={new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
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

      <div
        className="prose prose-invert prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      />
      
      {post.tags.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-800">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {post.authorBio && (
        <div className="mt-10 pt-6 border-t border-gray-800">
          <div className="flex items-center gap-4">
            <Image
              src={post.authorImage}
              alt={post.author}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <h3 className="text-xl font-semibold">{post.author}</h3>
              <p className="text-gray-400">{post.authorBio}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
