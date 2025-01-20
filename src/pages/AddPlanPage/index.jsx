import { Input } from 'antd';
import PlaceCard from '../../components/planpage/PlaceCard.jsx';
import { getPlaceBySearchApi } from '../../apis/visitJejuApi.js';
import { useState } from 'react';
const AddPlanPage = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSearchWord(newValue);
    console.log(newValue); // 업데이트된 값 출력
  }

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
    console.log(data)
    setSearchData(data.items);
  }

  return (
    <div>
      <div className="bg-primary-3 w-560 h-48">
        <input
          type="text"
          onChange={(event) => handleChange(event)}
          className="border-0"
        />
        <button className="bg-primary-0 w-17 h-17" onClick={handleClick}>O</button>
      </div>
      <div
        className="overflow-auto h-400"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {searchData.length > 0 && searchData.map((item, index) => (
          <PlaceCard
            key={index}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}

export default AddPlanPage;