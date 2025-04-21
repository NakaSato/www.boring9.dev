import AllFavTechs from '../icons/AllFavTechs';
import AnimationContainer from '../utils/AnimationContainer';

const CurrentFavTech = () => {
  return (
    <AnimationContainer>
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="flex flex-col gap-4">
          <AllFavTechs />
        </div>
      </div>
    </AnimationContainer>
  );
};

export default CurrentFavTech;
