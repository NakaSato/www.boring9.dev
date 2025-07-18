import AboutMe from '../content/AboutMe';
import CurrentLearning from '../content/CurrentLearning';
import CurrentTimeLineExp from '../content/CurrentTimeLineExp';
import FavProjects from '../content/FavProjects';
import Hero from '../content/Hero';
import SectionContainer from '../utils/SectionContainer';

const HomeSection = () => {
  return (
    <SectionContainer>
      <Hero />

      <div className="mb-12 md:mb-16">
        <CurrentLearning />
      </div>

      <div className="w-full flex flex-col items-start space-y-16">
        <AboutMe />

        <CurrentTimeLineExp />

        {/* <FavProjects /> */}

        {/* <ContactMe /> */}
      </div>
    </SectionContainer>
  );
};

export default HomeSection;
