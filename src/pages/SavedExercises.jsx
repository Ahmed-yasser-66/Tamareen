import { Link } from 'react-router-dom';
import { useExercises } from '../contexts/ExercisesContext';
import { useSavedExercises } from '../hooks/useSavedExercises';
import Loader from '../components/Loader';
import arrowLeft from '../assets/arrow-left.svg';
import ExerciseBox from '../components/ExerciseBox';

function SavedExercises() {
  const { savedExercises } = useExercises();
  const {
    data: myExercises,
    isLoading,
    error,
  } = useSavedExercises(savedExercises);

  if (isLoading) return <Loader />;

  if (error)
    return (
      <p className="mt-10 text-2xl font-semibold text-center">
        {error.message} 😥
      </p>
    );

  return (
    <div>
      <button className="px-2 py-1 mt-4 ml-4 rounded-md text-md sm:mt-6 sm:ml-6 bg-bright-blue sm:text-xl">
        <Link to="/app" className="flex items-center gap-2">
          <img
            src={arrowLeft}
            alt="left arrow icon for returning back "
            className="w-4 h-4"
          />
          Back to All Exercises
        </Link>
      </button>
      <h1 className="mt-6 text-3xl font-bold tracking-wide text-center underline uppercase sm:text-5xl underline-offset-2 decoration-4 decoration-light-gray">
        <span className="text-gradient">Saved Exercises</span> 💪
      </h1>
      {!myExercises.length ? (
        <p className="px-2 mt-16 text-2xl font-semibold text-center sm:text-3xl">
          No Saved exercises yet...Go add some 🔥
        </p>
      ) : (
        <ul className="w-[90%] sm:w-[80%] mx-auto grid gap-4 my-12 sm:grid-cols-2 md:grid-cols-3">
          {myExercises.map((ex) => (
            <ExerciseBox key={ex.id} exercise={ex} isInSavedPage={true} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default SavedExercises;
