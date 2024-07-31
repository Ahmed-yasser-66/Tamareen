import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllExercises } from '../services/apiExercises';

export function useAllExercises(offset, limit) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['AllExercises', offset, limit],
    queryFn: () => getAllExercises(offset, limit),
    keepPreviousData: true,
  });

  //prefetching
  const nextOffset = offset + limit;

  queryClient.prefetchQuery({
    queryKey: ['AllExercises', nextOffset, limit],
    queryFn: () => getAllExercises(nextOffset, limit),
  });

  return { data, isLoading, error };
}
