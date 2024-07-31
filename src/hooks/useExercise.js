import { useQuery } from '@tanstack/react-query';
import { getExercise } from '../services/apiExercises';
import { useParams } from 'react-router-dom';

export function useExercise() {
  const { exerciseId } = useParams();
  const {
    data: exercise,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getExercise(exerciseId),
    queryKey: ['exerciseDetails', exerciseId],
  });

  return { exercise, isLoading, error };
}
