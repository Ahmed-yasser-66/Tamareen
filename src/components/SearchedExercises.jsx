import { Link, useSearchParams } from 'react-router-dom';
import { useExercises } from '../contexts/ExercisesContext';
import { useSearchExercises } from '../hooks/useSearchExercises';
import arrowLeft from '../assets/arrow-left.svg';
import Exercises from './Exercises';

function SearchedExercises() {
  const { offset, limit } = useExercises();
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('query');

  const {
    data: searchExercises,
    isLoading,
    error,
  } = useSearchExercises(searchQuery, offset, limit);

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <Link
        to="/app/init"
        replace
        className="flex items-center gap-2 px-2 py-1 mb-6 text-lg rounded-md sm:text-2xl bg-bright-blue"
      >
        <img src={arrowLeft} className="w-5 h-5" />
        Back to all exercises
      </Link>
      <p className="text-xl font-semibold sm:text-3xl">
        Search results for{' '}
        <span className="underline underline-offset-2 text-gradient decoration-bright-blue">
          {searchQuery}
        </span>{' '}
        :
      </p>

      <Exercises
        error={error}
        isLoading={isLoading}
        exercises={searchExercises}
        offset={offset}
      />
    </div>
  );
}

export default SearchedExercises;
