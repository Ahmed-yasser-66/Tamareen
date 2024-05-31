import { useExercises } from '../contexts/ExercisesContext';
import ExerciseBox from './ExerciseBox';
import Loader from './Loader';

function Exercises() {
  const { isLoading, exercises } = useExercises();

  if (isLoading) return <Loader />;

  if (!exercises.length)
    return (
      <p className="mt-10 text-2xl font-semibold text-center">
        No results found 🙃
      </p>
    );

  return (
    <div className="w-[90%] grid place-content-center mx-auto my-10">
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 ">
        {exercises.map((ex) => (
          <ExerciseBox key={ex.id} exercise={ex} />
        ))}
      </ul>
    </div>
  );
}

export default Exercises;
