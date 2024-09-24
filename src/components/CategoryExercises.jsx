import { useSearchParams } from 'react-router-dom';
import { useExercises } from '../contexts/ExercisesContext';
import { useCategoryExercises } from '../hooks/useCategoryExercises';

import Exercises from './Exercises';

function CategoryExercises() {
  const { offset, limit } = useExercises();
  const [searchParams] = useSearchParams();

  const category = searchParams.get('category');

  const { data, isLoading, error } = useCategoryExercises(
    category,
    offset,
    limit
  );

  return (
    <Exercises
      error={error}
      isLoading={isLoading}
      exercises={data}
      offset={offset}
    />
  );
}

export default CategoryExercises;
