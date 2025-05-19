import AboutMe from '../content/AboutMe';
import ContactMe from '../content/ContactMe';
import CurrentFavTech from '../content/CurrentFavTech';
import CurrentLearning from '../content/CurrentLearning';
import CurrentTimeLineExp from '../content/CurrentTimeLineExp';
import FavProjects from '../content/FavProjects';
import Hero from '../content/Hero';
import AnimationContainer from '../utils/AnimationContainer';
import { skills } from '../utils/mySkills';
import SectionContainer from '../utils/SectionContainer';
import ShowSkills from '../utils/show-skill';

const HomeSection = () => {
  return (
    <SectionContainer>
      <Hero />

      <div className="mb-12 md:mb-16">
        <CurrentFavTech />
        <CurrentLearning />
      </div>

      <div className="w-full flex flex-col items-start space-y-16">
        <AboutMe />

        <CurrentTimeLineExp />

        <FavProjects />

        <AnimationContainer>
          <div className="w-full flex flex-col gap-6 mb-12 bg-gray-900/50 p-6 rounded-xl border border-primary-800/20 shadow-lg">
            <h2 className="font-bold text-2xl md:text-3xl tracking-tight mb-2 text-white text-start bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Skills & Tools
            </h2>

            <p className="text-base text-gray-300">
              A look at all the programming languages, libraries, and tools I've
              worked with, I started programming about 4 years ago. I have tried
              a few programming languages and technology stack, both Backend and
              Frontend.
            </p>

            <p className="text-base text-gray-300">
              Event though the scope of web development is wide, I was very
              interested and focused on Frontend development.
            </p>

            <div className="flex flex-col items-start gap-8 mt-4 divide-y divide-primary-800/20">
              {skills.map(({ title, techs }) => (
                <div key={title} className="pt-6 first:pt-0 w-full">
                  <h3 className="font-bold text-xl tracking-tight mb-5 text-white text-start">
                    {title}
                  </h3>

                  <AnimationContainer>
                    <div className="flex items-center flex-wrap gap-3 mb-5">
                      <ShowSkills skills={techs} />
                    </div>
                  </AnimationContainer>
                </div>
              ))}
            </div>
          </div>
        </AnimationContainer>

        {/* <ContactMe /> */}
      </div>
    </SectionContainer>
  );
};

export default HomeSection;
