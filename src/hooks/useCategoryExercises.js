import { useQuery } from '@tanstack/react-query';
import { getExercisesByCategory } from '../services/apiExercises';

export function useCategoryExercises(category, offset, limit) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['CategoryExercises', category, offset, limit],
    queryFn: () => getExercisesByCategory(category, offset, limit),
    keepPreviousData: true,
  });

  return { data, isLoading, error };
}
