import AllFavTechs from '../icons/AllFavTechs';
import AnimationContainer from '../utils/AnimationContainer';

const CurrentFavTech = () => {
  return (
    <AnimationContainer>
      <div className="flex flex-col gap-4">
        <AllFavTechs />
      </div>
    </AnimationContainer>
  );
};

export default CurrentFavTech;
