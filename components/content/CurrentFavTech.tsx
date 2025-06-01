import AllFavTechs from '../icons/AllFavTechs';
import AnimationContainer from '../utils/AnimationContainer';

const CurrentFavTech = () => {
  return (
    <AnimationContainer>
      <div className="w-full p-6 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 rounded-xl shadow-2xl backdrop-blur-sm mb-8">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-transparent to-secondary-600/10 rounded-xl pointer-events-none" />
        
        <div className="relative">
          <h2 className="font-bold text-2xl md:text-3xl tracking-tight mb-6 text-white text-start bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Favorite Technologies
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col gap-4">
              <AllFavTechs />
            </div>
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
};

export default CurrentFavTech;
