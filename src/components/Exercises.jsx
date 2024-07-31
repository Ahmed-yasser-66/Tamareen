import { useExercises } from '../contexts/ExercisesContext';
import ExerciseBox from './ExerciseBox';
import Loader from './Loader';
import Pagination from './Pagination';
import arrowLeft from '../assets/arrow-left.svg';

function Exercises({ error, isLoading, exercises }) {
  const { offset, resetExercises } = useExercises();

  if (isLoading) return <Loader type="search" />;

  if (error)
    return (
      <p className="mt-10 text-2xl font-semibold text-center">
        {error.message} 😥
      </p>
    );

  if (!exercises.length)
    return (
      <p className="mt-10 text-2xl font-semibold text-center">
        No results found 🙃
      </p>
    );

  return (
    <>
      <div className="w-[90%] grid place-content-center mx-auto my-10">
        {offset > 0 && (
          <button
            className="flex items-center gap-2 px-2 py-1 mb-6 mr-auto text-xl rounded-md bg-bright-blue"
            onClick={resetExercises}
          >
            <img src={arrowLeft} className="w-5 h-5" />
            Back to first page
          </button>
        )}
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 ">
          {exercises.map((ex) => (
            <ExerciseBox key={ex.id} exercise={ex} />
          ))}
        </ul>

        <Pagination exercisesCount={exercises.length} />
      </div>
    </>
  );
}

export default Exercises;
