import { Input } from 'antd';
import PlaceCard from '../../components/planpage/PlaceCard.jsx';
import { getPlaceBySearchApi } from '../../apis/visitJejuApi.js';
import { useState } from 'react';
import RegisterDayAndTime from './components/RegisterDayAndTime.jsx';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getTripApi } from '../../apis/supabaseApi.js';

// ! testuurl : /plan?trip_id=30&date=2025-01-20

const AddPlanPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = useSelector(state => state.user.userId);

  // tripId와 date 값 가져오기
  const tripId = queryParams.get('trip_id');
  const initialTargetDate = queryParams.get('date'); // 사용자가 새로운 plan을 만드려는 date

  // tripId를 기반으로 현재 여행 시작일, 종료일을 가져오기
  const { data: tripData, isLoading } = useQuery({
    queryKey: ['trip', tripId],
    //queryFn: () => getTripApi(userId, tripId), 실제로 동작해야하는 코드
    queryFn: () => getTripApi('test', 30), // 테스트용
  });

  // 시간 등록 컴포넌트에게 줘야 할 정보 : startDate, endDate, targetDate, 📌사용자가 등록할 장소 정보

  // 최종 일정 생성 "확인"버튼을 눌렀을 때 작동하는 핸들러
  const onRegister = data => {
    console.log('시간등록 컴포넌트에서 전달받는 데이터', data);
    alert(`일정이 등록되었습니다. ${data.time}`);
  };

  const [searchData, setSearchData] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const handleChange = event => {
    const newValue = event.target.value;
    setSearchWord(newValue);
    console.log(newValue); // 업데이트된 값 출력
  };

  // TODO 여기를 이제 멀티 폼 스텝으로 만들어야 한다.
  // place_name : placeInfo.name,
  //   description: placeInfo.description,
  //   category : placeInfo.category,
  //   time : placeInfo.time,
  //   road_address : placeInfo.address,
  //   lat : placeInfo.latitude,
  //   lng : placeInfo.longitude,
  const handleClick = async () => {
    const result = await getPlaceBySearchApi(searchWord);
    const data = result.data;
    console.log(data);
    setSearchData(data.items);
  };

  if (isLoading) {
    return <>trip 정보를 불러오는 중입니다..!</>;
  }
  const { start_date: startDate, end_date: endDate } = tripData[0];
  return (
    <div className="h-full">
      {/* <div className="bg-primary-3 w-560 h-48">
        <input type="text" onChange={event => handleChange(event)} className="border-0" />
        <button className="bg-primary-0 w-17 h-17" onClick={handleClick}>
          O
        </button>
      </div>
      <div
        className="overflow-auto h-400"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {searchData.length > 0 &&
          searchData.map((item, index) => <PlaceCard key={index} item={item} />)}
      </div> */}
      <div className=" h-full">
        {/* TODO : Prop객체로 묶기 */}
        <RegisterDayAndTime
          startDate={startDate}
          endDate={endDate}
          initialTargetDate={initialTargetDate}
          place="미띠뽀 티하우스"
          onRegister={onRegister}
        />
      </div>
    </div>
  );
};

export default AddPlanPage;
