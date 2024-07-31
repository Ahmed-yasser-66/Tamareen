import { useQuery } from '@tanstack/react-query';
import { getYtVideos } from '../services/apiExercises';

export function useYoutubeVideos(exerciseName) {
  const {
    data: ytData,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getYtVideos(exerciseName),
    queryKey: ['exerciseYtVideos', exerciseName],
  });

  return { ytData, isLoading, error };
}
