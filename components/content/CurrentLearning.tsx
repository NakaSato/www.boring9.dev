import AllLearningTechs from '../icons/AllLearnTechs';
import AnimationContainer from '../utils/AnimationContainer';

const CurrentLearning = () => {
  return (
    <AnimationContainer>
      <div className="w-full p-6 bg-gray-900/50 rounded-xl shadow-lg">
        <h2 className="font-bold text-2xl md:text-3xl tracking-tight mb-6 text-white text-center bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
          Currently Learning
        </h2>
        <div className="flex flex-col justify-center items-center lg:items-start mx-auto lg:mx-0">
          <div className="">
            <AllLearningTechs />
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
};

export default CurrentLearning;
