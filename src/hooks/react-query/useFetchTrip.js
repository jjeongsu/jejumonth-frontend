import { useQuery } from '@tanstack/react-query';
import { getTripApi } from '@/apis/supabaseApi.js';
import { useSelector } from 'react-redux';

const useFetchTrip = tripId => {
  const userId = useSelector(state => state.user.userId);
  const { data: trip, isLoading } = useQuery({
    queryKey: ['trip', 'detail', tripId],
    queryFn: () => getTripApi(userId, tripId),
  });

  return { trip, isLoading };
};

export default useFetchTrip;
