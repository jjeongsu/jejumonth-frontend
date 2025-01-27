import { useQuery } from '@tanstack/react-query';
import { getTripApi } from '@/apis/supabaseApi.js';

const useFetchTrip = tripId => {
  const { data: trip, isLoading } = useQuery({
    queryKey: ['trip', tripId],
    //queryFn: () => getTripApi(userId, tripId), 실제로 동작해야하는 코드
    queryFn: () => getTripApi('test', 30), // 테스트용
  });

  return { trip, isLoading };
};

export default useFetchTrip;
