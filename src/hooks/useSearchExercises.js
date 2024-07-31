import { useQuery } from '@tanstack/react-query';
import { getExercisesByName } from '../services/apiExercises';

export function useSearchExercises(name, offset, limit) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['searchedQuery', name, offset, limit],
    queryFn: () => getExercisesByName(name, offset, limit),
    keepPreviousData: true,
  });

  return { data, isLoading, error };
}
