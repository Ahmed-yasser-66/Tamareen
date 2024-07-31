import { useExercises } from '../contexts/ExercisesContext';
import { useAllExercises } from '../hooks/useAllExercises';

import Exercises from './Exercises';

function InitExercises() {
  const { offset, limit } = useExercises();

  const {
    data: allExersices,
    isLoading,
    error,
  } = useAllExercises(offset, limit);

  return (
    <Exercises
      error={error}
      isLoading={isLoading}
      exercises={allExersices}
      offset={offset}
    />
  );
}

export default InitExercises;
