import { getBlogPosts, BlogPostProps } from '@/lib/get-content';
import { getLocalBlogPosts } from '@/lib/get-local-content';
import BlogList from '@/components/blog/blog-list';
import AnimationContainer from '@/components/utils/AnimationContainer';
import BlogContainer from '@/components/utils/BlogContainer';
import TitleSectionPageContainer from '@/components/utils/TitleSectionPageContainer';
import SocialShare from '@/components/sections/social-share';

export const metadata = {
  title: 'Blog | Boring9.dev',
  description: 'Read articles about web development, programming, and technology'
};

export default async function Blog() {
  // Try to get posts from GitHub first, then fall back to local content
  let posts: BlogPostProps[] = [];
  
  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error('Error fetching posts from GitHub, falling back to local content:', error);
  }
  
  if (posts.length === 0) {
    try {
      posts = await getLocalBlogPosts();
    } catch (localError) {
      console.error('Error fetching local posts:', localError);
    }
  }

  return (
    <BlogContainer>
      <div className="flex flex-col w-full gap-6">
        <TitleSectionPageContainer title="Blog" />

        <AnimationContainer customClassName="w-full flex flex-col gap-5 mb-8">
          <p className="w-full text-base text-gray-400">
            Welcome to my blog, where I share my thoughts, experiences, and tutorials about
            web development, programming, and everything tech-related. Browse through the articles
            and feel free to share them with others.
          </p>
        </AnimationContainer>

        <SocialShare title="Blog" />

        <BlogList posts={posts} />
      </div>
    </BlogContainer>
  );
}
