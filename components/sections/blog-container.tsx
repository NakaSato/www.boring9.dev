import AnimationContainer from '../utils/AnimationContainer';
import BlogContainer from '../utils/BlogContainer';
import TitleSectionPageContainer from '../utils/TitleSectionPageContainer';
import SocialShare from './social-share';

const myGithub = 'https://github.com/kiriyadee';

const BlogSection = () => {
  return (
    <BlogContainer>
      <div className="flex flex-col w-full gap-6">
        <TitleSectionPageContainer title="Blog" />

        <AnimationContainer customClassName="w-full flex flex-col gap-5 mb-8">
          <p className="w-full text-base text-gray-400">
            These are most of the projects I've done since I started
            programming, some of them are personal projects, freelance, work,
            practice or for other situation. If you want to see absolutely all
            my projects go to my{' '}
            <a
              href={myGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:text-white hover:underline ease"
            >
              github.com/enwuft
            </a>
            .
          </p>
        </AnimationContainer>

        <SocialShare title="Blog" />
      </div>
    </BlogContainer>
  );
};

export default BlogSection;
