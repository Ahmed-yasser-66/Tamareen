import { Link } from 'react-router-dom';
import arrow from '../assets/arrow-right.svg';
import Loader from './Loader';
import { useState } from 'react';

function ExerciseBox({ exercise }) {
  const [imageIsloading, setImageIsLoading] = useState(true);

  return (
    <div className="px-2 pt-2 rounded-lg bg-gradient-to-b from-light-blue to-bright-blue">
      {imageIsloading && (
        <div className="flex items-center justify-center h-full ">
          <Loader />
        </div>
      )}
      <img
        onLoad={() => setImageIsLoading(false)}
        src={exercise.gifUrl}
        className="w-full rounded-lg"
        loading="lazy"
      />

      <h3 className="my-3 text-xl font-semibold">{exercise.name}</h3>
      <div className="flex justify-between my-4">
        <p className="flex items-center px-4 py-2 text-sm uppercase rounded-full text-light-gray bg-dark-gray">
          {exercise.bodyPart}
        </p>
        <Link
          to="/app/exercise:id"
          className="flex items-center gap-1 text-lg underline transition-all duration-50 underline-offset-2 hover:opacity-90"
        >
          More Details
          <img src={arrow} className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

export default ExerciseBox;
