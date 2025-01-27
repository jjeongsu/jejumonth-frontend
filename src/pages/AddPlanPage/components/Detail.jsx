import makePlaceObject from '../utils/makePlaceObject';
import { useFetchPlace } from '@/hooks/react-query';

const Detail = ({ onNext, contentId }) => {
  // 컨텐츠 id로 데이터 가져오기
  const { placeData, isLoading } = useFetchPlace(contentId);

  if (isLoading) {
    return <div>여행지 상세정보 로딩중</div>;
  }

  //  TODO 디테일 페이지
  return (
    <div>
      Detail
      <button className="text-gray-8 text-14" onClick={() => onNext(makePlaceObject(data))}>
        일정 추가
      </button>
      <div>{placeData.title}</div>
    </div>
  );
};

export default Detail;
