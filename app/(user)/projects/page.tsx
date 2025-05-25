import { Metadata } from 'next';
import SectionContainer from '@/components/utils/SectionContainer';
import TitleSectionPageContainer from '@/components/utils/TitleSectionPageContainer';
import AnimationContainer from '@/components/utils/AnimationContainer';
import FeaturedProjects from '@/components/projects/FeaturedProjects';
import ProjectList from '@/components/projects/ProjectList';

export const metadata: Metadata = {
  title: 'Projects | Boring9 Developer',
  description: 'View my portfolio of web development and programming projects, including full-stack applications, APIs, and more.',
  openGraph: {
    title: 'Projects | Boring9 Developer',
    description: 'View my portfolio of web development and programming projects, including full-stack applications, APIs, and more.',
    url: 'https://www.boring9.dev/projects',
    type: 'website',
    images: [
      {
        url: 'https://www.boring9.dev/images/projects/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Projects | Boring9 Developer'
      }
    ]
  }
};

export default function Projects() {
  const myGithub = 'https://github.com/enwuft';

  return (
    <SectionContainer>
      <div className="flex flex-col w-full gap-6">
        <TitleSectionPageContainer title="Projects" />

        <AnimationContainer customClassName="w-full flex flex-col gap-5 mb-8">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800/50 shadow-lg">
            <p className="w-full text-base text-gray-300 leading-relaxed">
              These are some of the projects I've worked on as a developer, including personal projects, 
              client work, and open-source contributions. For a complete view of my coding activity, check out my{' '}
              <a
                href={myGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 transition-all hover:text-primary-300 hover:underline ease"
              >
                GitHub profile
              </a>
              .
            </p>
          </div>
        </AnimationContainer>
        
        <FeaturedProjects />
        <ProjectList />
      </div>
    </SectionContainer>
  );
}