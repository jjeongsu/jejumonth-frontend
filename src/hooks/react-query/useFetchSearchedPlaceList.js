import { useQuery } from '@tanstack/react-query';
import { getPlaceBySearchApi } from '@/apis/visitJejuApi.js';

const useFetchSearchedPlaceList = (keyword, category) => {
  const { data: placeList, refetch } = useQuery({
    queryKey: ['jeju_place', 'list', { category: category, keyword: keyword }],
    queryFn: () => getPlaceBySearchApi(keyword, category),
  });

  return { placeList, refetch };
};

export default useFetchSearchedPlaceList;
