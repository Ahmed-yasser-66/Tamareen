import toast from 'react-hot-toast';
import { usePlan } from '../contexts/PlanContext';
import { Link } from 'react-router-dom';
import arrowDown from '../assets/arrow-down.svg';
import { createPortal } from 'react-dom';

function PlanModal({ exercise, onOpenModal }) {
  const { days, addExercise, exercises } = usePlan();

  function handleAddExercise(index) {
    const day = Number(index + 1);

    const exerciseExists = exercises[day - 1].some(
      (existingExercise) => existingExercise.id === exercise.id
    );

    if (exerciseExists) {
      toast.error(`Exercise already exists in Day ${day}`);
    } else {
      addExercise(day, exercise);
      toast.success('Exercise added successfully');
    }

    onOpenModal(false);
  }

  if (!exercises.length)
    return (
      <div className="absolute flex flex-col items-center w-32 gap-2 px-2 py-4 text-center rounded-lg top-14 right-14 bg-bright-blue">
        <p className="text-lg font-semibold ">
          You need to have a plan to add this exercise to it!
        </p>
        <img src={arrowDown} className="w-7 h-7 animate-bounce " />
        <Link
          to="/plan"
          className="px-2 py-1 text-xl rounded-lg bg-dark-gray text-light-gray"
        >
          Create a plan
        </Link>
      </div>
    );

  return (
    <div className="absolute w-32 py-1 text-center rounded-lg top-14 right-14 bg-bright-blue">
      <p className="p-1 text-xl font-semibold">Add to plan</p>
      <ul className="mt-2 border-t-2 divide-y-2">
        {Array.from({ length: days }).map((_, index) => (
          <li
            key={index}
            className="py-2 text-lg font-semibold cursor-pointer hover:bg-light-blue"
            onClick={() => handleAddExercise(index)}
          >
            Day {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlanModal;
