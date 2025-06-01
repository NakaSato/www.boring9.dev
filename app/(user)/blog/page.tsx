import { BlogPostProps } from '@/lib/get-content';
import { getAllBlogPosts } from '@/lib/content';
import BlogList from '@/components/blog/blog-list';
import AnimationContainer from '@/components/utils/AnimationContainer';
import BlogContainer from '@/components/utils/BlogContainer';
import TitleSectionPageContainer from '@/components/utils/TitleSectionPageContainer';
import SocialShare from '@/components/sections/social-share';
import Pagination from '@/components/blog/pagination';
import Link from 'next/link';

// Number of posts per page
const POSTS_PER_PAGE = 9;

export const metadata = {
  title: 'Blog | Boring9.dev',
  description: 'Read articles about web development, programming, and technology from Chanthawat Kiriyadee, covering React, Next.js, JavaScript, and more',
  keywords: 'blog, web development, programming, javascript, react, next.js, typescript',
  openGraph: {
    title: 'Blog | Boring9.dev',
    description: 'Read articles about web development, programming, and technology',
    url: 'https://www.boring9.dev/blog',
    type: 'website',
    images: [
      {
        url: 'https://www.boring9.dev/images/blog/default-cover.png',
        width: 1200,
        height: 630,
        alt: 'Boring9.dev Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Boring9.dev',
    description: 'Read articles about web development, programming, and technology',
    images: ['https://www.boring9.dev/images/blog/default-cover.png'],
    creator: '@boring9dev',
  },
  alternates: {
    canonical: 'https://www.boring9.dev/blog',
  }
};

export default async function Blog() {
  // Get all posts
  const allPosts = await getAllBlogPosts();
  
  // Calculate pagination values
  const totalPosts = allPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  // Get posts for first page
  const posts = allPosts.slice(0, POSTS_PER_PAGE);
  
  // Create schema.org structured data for BlogPosting list
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': posts.map((post, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'item': {
          '@type': 'BlogPosting',
          'headline': post.title,
          'description': post.excerpt,
          'author': {
            '@type': 'Person',
            'name': post.author
          },
          'datePublished': post.date,
          'url': `https://www.boring9.dev/blog/${post.slug}`
        }
      }))
    }
  };
  
  return (
    <BlogContainer>
      <div className="flex flex-col w-full gap-6">
        <TitleSectionPageContainer title="Blog" />

        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
        />

        <AnimationContainer customClassName="w-full flex flex-col gap-5 mb-8">
          <div className="relative p-8 lg:p-12 bg-gradient-to-br from-gray-950/98 via-gray-900/95 to-gray-950/98 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden border border-gray-700/40 hover:border-primary-400/60 transition-all duration-1000 group transform hover:scale-[1.01]">
            {/* Tech-focused IoT/Fintech mesh gradient background */}
            <div className="absolute inset-0 opacity-[0.15]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.4),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.4),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(168,85,247,0.3),transparent_50%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(236,72,153,0.3),transparent_50%)]"></div>
            </div>
            
            {/* Animated tech mesh overlay with circuit-like patterns */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-blue-500/5 to-purple-500/8 opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-pulse"></div>
            
            {/* Circuit board pattern overlay */}
            <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cpath fill=%22none%22 stroke=%22currentColor%22 stroke-width=%220.5%22 d=%22M0 20h20v60h60V40h20M40 0v20h20v20h20v60M20 80h60v20M80 20v60%22%3E%3C/path%3E%3C/svg%3E')] group-hover:opacity-[0.05] transition-opacity duration-1000"></div>
            
            {/* Enhanced IoT/Fintech floating particles with tech-inspired animations */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute top-[15%] left-[20%] w-3 h-3 bg-emerald-400/70 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '2.5s'}}></div>
              <div className="absolute top-[70%] right-[25%] w-2 h-2 bg-blue-400/70 rounded-full animate-bounce" style={{animationDelay: '0.8s', animationDuration: '3s'}}></div>
              <div className="absolute bottom-[20%] left-[35%] w-2.5 h-2.5 bg-purple-400/70 rounded-full animate-bounce" style={{animationDelay: '1.2s', animationDuration: '2.8s'}}></div>
              <div className="absolute top-[45%] right-[15%] w-1.5 h-1.5 bg-cyan-400/70 rounded-full animate-bounce" style={{animationDelay: '1.8s', animationDuration: '2.2s'}}></div>
              <div className="absolute bottom-[60%] left-[70%] w-1 h-1 bg-pink-400/70 rounded-full animate-bounce" style={{animationDelay: '2.2s', animationDuration: '3.5s'}}></div>
              
              {/* Additional tech particles for IoT/Fintech theme */}
              <div className="absolute top-[30%] left-[60%] w-2 h-2 bg-amber-400/60 rounded-full animate-pulse" style={{animationDelay: '0.5s', animationDuration: '2s'}}></div>
              <div className="absolute bottom-[40%] right-[40%] w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-pulse" style={{animationDelay: '1.5s', animationDuration: '2.5s'}}></div>
            </div>
            
            {/* Animated tech border gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 animate-pulse" style={{animationDuration: '4s'}}></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-start gap-6 mb-10">
                <div className="flex-shrink-0 relative">
                  {/* Ultra-modern IoT/Fintech icon with tech layers */}
                  <div className="w-16 h-16 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 rounded-2xl shadow-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl transform -rotate-3 group-hover:rotate-3 transition-transform duration-500"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-emerald-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg z-10 group-hover:scale-110 transition-transform duration-500">
                      {/* IoT/Tech circuit chip icon */}
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 via-blue-200 to-purple-200 mb-6 leading-tight">
                    <span className="inline-block animate-pulse" style={{animationDuration: '3s'}}>Tech</span>{' '}
                    <span className="inline-block animate-pulse" style={{animationDuration: '3s', animationDelay: '0.5s'}}>Blog</span>{' '}
                    <span className="inline-block animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}}>for</span>{' '}
                    <span className="inline-block bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse" style={{animationDuration: '3s', animationDelay: '1.5s'}}>IoT & Fintech</span>
                  </h2>
                  <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                    Explore cutting-edge insights into the future of technology -
                    <span className="inline-block mx-3 px-4 py-2 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-200 rounded-2xl text-lg font-semibold border border-emerald-500/40 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300 cursor-default"> IoT solutions</span>,
                    <span className="inline-block mx-3 px-4 py-2 bg-gradient-to-r from-blue-500/30 to-indigo-500/30 text-blue-200 rounded-2xl text-lg font-semibold border border-blue-500/40 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300 cursor-default"> fintech innovation</span>, and everything
                    <span className="inline-block mx-3 px-4 py-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 rounded-2xl text-lg font-semibold border border-purple-500/40 backdrop-blur-sm shadow-lg transform hover:scale-105 transition-all duration-300 cursor-default"> next-gen tech</span>.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              <Link
                href="/blog/categories"
                className="group relative inline-flex items-center justify-center px-10 py-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-bold rounded-2xl transition-all duration-700 transform hover:scale-110 hover:shadow-2xl hover:shadow-emerald-500/40 overflow-hidden border border-emerald-500/50"
              >
                {/* Tech-focused button effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-110 group-hover:scale-100"></div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated border glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur-lg"></div>
                
                <div className="relative flex items-center gap-4 z-10">
                  <div className="relative">
                    {/* Tech categories icon */}
                    <svg className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <span className="text-lg font-bold">Tech Categories</span>
                  <svg className="w-5 h-5 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              
              <Link
                href="/blog/search"
                className="group relative inline-flex items-center justify-center px-10 py-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white font-bold rounded-2xl transition-all duration-700 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/40 overflow-hidden border border-blue-500/50"
              >
                {/* Tech-focused button effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-all duration-700 transform scale-110 group-hover:scale-100"></div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated border glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur-lg"></div>
                
                <div className="relative flex items-center gap-4 z-10">
                  <div className="relative">
                    {/* Advanced search icon */}
                    <svg className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <span className="text-lg font-bold">Smart Search</span>
                  <svg className="w-5 h-5 transition-all duration-500 group-hover:translate-x-2 group-hover:scale-125" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
            </div>
            
            {/* Enhanced Statistics Section with IoT/Fintech Tech Design */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-10 border-t border-gray-600/50">
              <div className="group/stat relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-500 hover:transform hover:scale-105 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="text-3xl lg:text-4xl xl:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-emerald-600 group-hover/stat:from-emerald-300 group-hover/stat:to-emerald-500 transition-all duration-500 mb-2">
                    {posts.length}
                  </div>
                  <div className="text-sm lg:text-base font-bold text-gray-300 group-hover/stat:text-white transition-colors duration-300 uppercase tracking-wider">Tech Articles</div>
                  <div className="absolute top-3 right-3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-70"></div>
                </div>
              </div>
              
              <div className="group/stat relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:scale-105 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-2xl opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="text-3xl lg:text-4xl xl:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-600 group-hover/stat:from-blue-300 group-hover/stat:to-blue-500 transition-all duration-500 mb-2">
                    {Array.from(new Set(posts.map(p => p.category))).length}
                  </div>
                  <div className="text-sm lg:text-base font-bold text-gray-300 group-hover/stat:text-white transition-colors duration-300 uppercase tracking-wider">IoT/Fintech</div>
                  <div className="absolute top-3 right-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-70" style={{animationDelay: '0.5s'}}></div>
                </div>
              </div>
              
              <div className="group/stat relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="text-3xl lg:text-4xl xl:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-purple-600 group-hover/stat:from-purple-300 group-hover/stat:to-purple-500 transition-all duration-500 mb-2">
                    {Array.from(new Set(posts.flatMap(p => p.tags))).length}
                  </div>
                  <div className="text-sm lg:text-base font-bold text-gray-300 group-hover/stat:text-white transition-colors duration-300 uppercase tracking-wider">Tech Tags</div>
                  <div className="absolute top-3 right-3 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-70" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
              
              <div className="group/stat relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105 cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl opacity-0 group-hover/stat:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 text-center">
                  <div className="text-3xl lg:text-4xl xl:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-cyan-600 group-hover/stat:from-cyan-300 group-hover/stat:to-cyan-500 transition-all duration-500 mb-2">
                    {Math.round(posts.reduce((acc, post) => acc + parseInt(post.readingTime.split(' ')[0]), 0) / posts.length)}
                  </div>
                  <div className="text-sm lg:text-base font-bold text-gray-300 group-hover/stat:text-white transition-colors duration-300 uppercase tracking-wider">Avg. Read</div>
                  <div className="absolute top-3 right-3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-70" style={{animationDelay: '1.5s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </AnimationContainer>

        <SocialShare title="Blog" />

        <BlogList posts={posts} />
        
        {/* Add pagination component when there are multiple pages */}
        {totalPages > 1 && (
          <Pagination 
            currentPage={1} 
            totalPages={totalPages} 
            basePath="/blog/page" 
          />
        )}
      </div>
    </BlogContainer>
  );
}
