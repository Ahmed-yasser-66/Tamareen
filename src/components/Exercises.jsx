import { useExercises } from '../contexts/ExercisesContext';
import arrowLeft from '../assets/arrow-left.svg';

import ExerciseBox from './ExerciseBox';
import Loader from './Loader';
import Pagination from './Pagination';

function Exercises() {
  const { isLoading, exercises, backToAll, offset } = useExercises();

  if (isLoading) return <Loader />;

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
            className="flex items-center gap-2 p-2 mb-6 mr-auto text-sm font-semibold rounded-lg bg-bright-blue"
            onClick={backToAll}
          >
            <img src={arrowLeft} className="w-4 h-4" />
            Back To All Exercises
          </button>
        )}
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 ">
          {exercises.map((ex) => (
            <ExerciseBox key={ex.id} exercise={ex} />
          ))}
        </ul>

        <Pagination />
      </div>
    </>
  );
}

export default Exercises;
