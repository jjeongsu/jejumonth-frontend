import { useQuery } from '@tanstack/react-query';
import { getPlaceByExplanationApi } from '@/apis/visitJejuApi';

const useFetchPlace = contentId => {
  const { data: placeData, isLoading } = useQuery({
    queryKey: ['jeju_place', 'detail', contentId],
    queryFn: () => getPlaceByExplanationApi(contentId),
  });
  return { placeData, isLoading };
};

export default useFetchPlace;
