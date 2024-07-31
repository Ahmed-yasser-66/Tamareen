import { useQuery } from '@tanstack/react-query';
import { getSavedExercises } from '../services/apiExercises';

export function useSavedExercises(savedExercises) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['savedExercises', savedExercises],
    queryFn: () => getSavedExercises(savedExercises),
  });

  return { data, isLoading, error };
}
