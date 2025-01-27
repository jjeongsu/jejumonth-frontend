import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postPlanApi } from '@/apis/supabaseApi.js';

const usePostPlan = tripId => {
  const queryClient = useQueryClient();
  const postPlanMutation = useMutation({
    mutationFn: postPlanApi,
    onSuccess: async () => {
      console.log('성공적으로 plan 데이터를 보냈습니다.');
      await queryClient.invalidateQueries({
        queryKey: ['plans', tripId],
      });
    },
    onError: error => {
      console.log('plan데이터를 보내는데 실패하였습니다.', error);
    },
  });

  return { postPlanMutation };
};

export default usePostPlan;
