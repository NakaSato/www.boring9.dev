import CurrentTimeLineExp from '../content/CurrentTimeLineExp';
import AnimationContainer from '../utils/AnimationContainer';
import SectionContainer from '../utils/SectionContainer';
import ShowSkills from '../utils/show-skill';
import TitleSectionPageContainer from '../utils/TitleSectionPageContainer';
import ProcessWork from '../content/ProcessWork';
import { skills } from '../utils/mySkills';

const AboutSection = () => {
  return (
    <SectionContainer>
      <div className="w-full flex flex-col gap-6">
        <TitleSectionPageContainer title="About me" />

        <AnimationContainer customClassName="w-full flex flex-col gap-5 mb-8">
          <div className="p-6 bg-gray-900/50 rounded-xl border border-primary-800/20 shadow-lg">
            <p className="text-base text-gray-300 leading-relaxed">
              I am a passionate 2 years of work experience in Electrical
              Engineering and love learning new technologies since I discovered
              programming, I am currently learning the way to be a Cyber Security
              specialist.
            </p>
          </div>
        </AnimationContainer>

        <CurrentTimeLineExp />

        <AnimationContainer customClassName="w-full flex flex-col gap-5 mb-8">
          <h2 className="font-bold text-2xl md:text-2xl tracking-tight mb-2 text-white text-start bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Skills & Tools
          </h2>

          <div className="flex flex-col items-start p-6 bg-gray-900/50 rounded-xl border border-primary-800/20 shadow-lg">
            {skills.map(({ title, techs }) => (
              <div key={title} className="w-full mb-6 last:mb-0">
                <h3 className="font-bold text-lg md:text-xl tracking-tight mb-4 text-white text-start">
                  {title}
                </h3>

                <AnimationContainer customClassName="flex items-center flex-wrap mb-5">
                  <ShowSkills skills={techs} />
                </AnimationContainer>
              </div>
            ))}
          </div>
        </AnimationContainer>

        <ProcessWork />

        <AnimationContainer customClassName="w-full flex flex-col gap-5">
          <h2 className="font-bold text-2xl md:text-2xl tracking-tight mb-2 text-white text-start bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Interests & Goals
          </h2>

          <div className="p-6 bg-gray-900/50 rounded-xl border border-primary-800/20 shadow-lg">
            <p className="text-base text-gray-300 leading-relaxed">
              I am interested in learning Backend with other language like Rust,
              Go or with Python.
            </p>
          </div>
        </AnimationContainer>
      </div>
    </SectionContainer>
  );
};

export default AboutSection;
