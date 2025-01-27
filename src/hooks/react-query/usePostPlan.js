import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPlanApi } from '@/apis/supabaseApi.js';
import { useNavigate } from 'react-router';

const usePostPlan = tripId => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const postPlanMutation = useMutation({
    mutationFn: postPlanApi,
    onSuccess: async () => {
      console.log('성공적으로 plan 데이터를 보냈습니다.');
      await queryClient.invalidateQueries({
        queryKey: ['plan', 'detail', tripId],
      });
      // mytrip으로 이동
      navigate(`/trip/my?trip_id=${tripId}`);
    },
    onError: error => {
      console.log('plan데이터를 보내는데 실패하였습니다.', error);
    },
  });

  return { postPlanMutation };
};

export default usePostPlan;
