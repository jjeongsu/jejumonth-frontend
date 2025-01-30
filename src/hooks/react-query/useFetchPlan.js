import { getPlanApi } from '../../apis/supabaseApi';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

const useFetchPlan = tripId => {
  const userId = useSelector(state => state.user.userId);
  const { data: plans, isLoading: isLoadingPlan } = useQuery({
    queryKey: ['plan', 'list', { userId: userId, tripId: tripId }],
    queryFn: () => getPlanApi(userId, tripId),
  });

  return { plans, isLoadingPlan };
};
export default useFetchPlan;
