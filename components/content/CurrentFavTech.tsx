import AllFavTechs from '../icons/AllFavTechs';
import AnimationContainer from '../utils/AnimationContainer';

const CurrentFavTech = () => {
  return (
    <AnimationContainer>
      <div className="w-full p-6 bg-gray-900/50 rounded-xl border border-primary-800/20 shadow-lg mb-8">
        <h2 className="font-bold text-2xl md:text-3xl tracking-tight mb-6 text-white text-start bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
          Favorite Technologies
        </h2>
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col gap-4">
            <AllFavTechs />
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
};

export default CurrentFavTech;
