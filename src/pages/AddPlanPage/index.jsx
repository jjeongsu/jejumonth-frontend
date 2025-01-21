import { Input } from 'antd';
import PlaceCard from './components/PlaceCard.jsx';
import { getPlaceBySearchApi } from '../../apis/visitJejuApi.js';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const AddPlanPage = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tripId = queryParams.get('trip_id');
  const navigate = useNavigate();

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
  const handleSearchClick = async () => {
    const result = await getPlaceBySearchApi(searchWord);
    const data = result.data;
    console.log(data);
    setSearchData(data.items);
  };

  const handleBackClick = () => {
    navigate(`/trip/my?trip_id=${tripId}`); // TODO 이렇게 하면 다시 돌아갈때마다 API가 호출되는 문제가 존재
  };

  return (
    <div>
      <button onClick={handleBackClick}>
        <img src="/icons/back-icon.svg" alt="back-icon" className="h-36 w-36" />
      </button>
      <div className="bg-primary-3 w-560 h-48">
        <input type="text" onChange={event => handleChange(event)} className="border-0" />
        <button className="bg-primary-0 w-17 h-17" onClick={handleSearchClick}>
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
      </div>
    </div>
  );
};

export default AddPlanPage;
