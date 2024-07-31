import { usePlan } from '../contexts/PlanContext';
import { Link, useParams } from 'react-router-dom';
import arrowUp from '../assets/arrow-up.svg';
import arrowLeft from '../assets/arrow-left.svg';
import ExerciseBox from './ExerciseBox';

function PlanDay() {
  const { planId } = useParams();
  const { exercises } = usePlan();

  if (!planId)
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 my-12">
        <img
          src={arrowUp}
          className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce-fast"
        />
        <p className="text-3xl font-semibold text-center sm:text-4xl text-gradient ">
          Click on a day to show exercises
        </p>
      </div>
    );

  return (
    <>
      <div className="mx-auto w-full max-w-[80%] text-center mt-12">
        <h2 className="text-4xl font-semibold underline underline-offset-2 decoration-bright-blue">
          Day {planId}
        </h2>
        <div className="grid items-center mx-auto my-10 place-content-center ">
          {exercises.at(planId - 1).length ? (
            <ul className="grid gap-4 mx-auto my-12 sm:grid-cols-2 md:grid-cols-3">
              {exercises.at(planId - 1)?.map((ex, index) => (
                <ExerciseBox key={index} exercise={ex} isInPlanPage={true} />
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center gap-6">
              <p className="text-3xl font-medium ">
                This Day has no exercises yet, Go to exercises page and add some
                🔥
              </p>
              <Link
                to="/app/init"
                replace
                className="flex items-center gap-2 px-2 py-1 text-xl font-semibold rounded-lg bg-bright-blue"
              >
                <img src={arrowLeft} className="w-4 h-4" />
                Exercises Page
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PlanDay;
