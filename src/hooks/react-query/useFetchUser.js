import { useQuery } from '@tanstack/react-query';
import { getUserApi } from '@/apis/userApi';

const useFetchUser = userId => {
  return useQuery({
    //* user 정보 수정하는 곳에서도 같은 쿼리키로 관리되어야 함
    queryKey: ['user', 'detail', { userId }],
    queryFn: () => getUserApi(userId),
  });
};
export default useFetchUser;
