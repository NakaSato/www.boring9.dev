import AnimationContainer from '../utils/AnimationContainer';

const AboutMe = () => {
  return (
    <AnimationContainer customClassName="w-full">
      <div className="w-full p-6 bg-gray-900/50 rounded-xl border border-primary-800/20 shadow-lg">
        <h2 className="font-bold text-2xl md:text-3xl tracking-tight mb-8 text-white text-start bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          About me
        </h2>

        <p className="text-base text-gray-300 leading-relaxed">
          I specialize in photovoltaic plant projects and electrical design,
          bringing expertise in cloud security and cybersecurity infrastructure
          for the gas industry. My technical background combines renewable
          energy systems with modern security practices to deliver robust
          solutions.
        </p>
      </div>
    </AnimationContainer>
  );
};

export default AboutMe;
