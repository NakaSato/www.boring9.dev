import CurrentLearning from '../content/CurrentLearning';
import Hero from '../content/Hero';
import SectionContainer from '../utils/SectionContainer';

const HomeSection = () => {
  return (
    <>
      <SectionContainer>
        <Hero />
        <CurrentLearning />
      </SectionContainer>
    </>
  );
};

export default HomeSection;
