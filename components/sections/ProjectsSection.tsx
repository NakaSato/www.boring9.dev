import SearchAllProjects from '../content/SearchAllProjects';
import AnimationContainer from '../utils/AnimationContainer';
import SectionContainer from '../utils/SectionContainer';
import TitleSectionPageContainer from '../utils/TitleSectionPageContainer';

const myGithub = 'https://github.com/enwuft';

const ProjectsSection = () => {
  return (
    <SectionContainer>
      <div className="flex flex-col w-full gap-6">
        <TitleSectionPageContainer title="Projects" />

        <AnimationContainer customClassName="w-full flex flex-col gap-5 mb-8">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-primary-800/20 shadow-lg">
            <p className="w-full text-base text-gray-300 leading-relaxed">
              These are most of the projects I've done since I started
              programming, some of them are personal projects, freelance, work,
              practice or for other situation. If you want to see absolutely all
              my projects go to my{' '}
              <a
                href={myGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 transition-all hover:text-primary-300 hover:underline ease"
              >
                github.com/enwuft
              </a>
              .
            </p>
          </div>
        </AnimationContainer>

        <SearchAllProjects />
      </div>
    </SectionContainer>
  );
};

export default ProjectsSection;
