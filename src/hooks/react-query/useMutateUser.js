import { putUserFullname, putUserPassword, postProfileImage } from '@/apis/userApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import QUERY_KEY from '@/constants/querykey';

export const useMutateUser = userId => {
  const queryClient = useQueryClient();

  const putUserFullNameMutation = useMutation({
    mutationFn: putUserFullname,
    onSuccess: async () => {
      console.log('성공적으로 이름을 변경하였습니다.');
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.user.detail(userId),
      });
    },
  });

  const putUserPasswordMutation = useMutation({
    mutationFn: putUserPassword,
    onSuccess: async () => {
      console.log('성공적으로 비밀번호를 변경하였습니다.');
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.user.detail(userId),
      });
    },
  });

  const putUserImageMutation = useMutation({
    mutationFn: postProfileImage,
    onSuccess: async () => {
      console.log('성공적으로 프로필 사진을 변경하였습니다.');
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.user.detail(userId),
      });
    },
  });
  return { putUserFullNameMutation, putUserPasswordMutation, putUserImageMutation };
};
