import { useQuery } from '@tanstack/react-query';
import { getAllTripsApi } from '@/apis/supabaseApi';

const useFetchAllTrips = userId => {
  const { data: trips, isLoading: isLoadingTrips } = useQuery({
    queryKey: ['trip', 'list', { userId: userId }],
    queryFn: () => getAllTripsApi(userId),
  });

  return { trips, isLoadingTrips };
};

export default useFetchAllTrips;
