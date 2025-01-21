import PlaceCard from './components/PlaceCard.jsx';
import { getPlaceBySearchApi } from '../../apis/visitJejuApi.js';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal, ConfigProvider, Empty, Select, Space } from 'antd';

const AddPlanPage = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [tag, setTag] = useState('');
  const [category, setCategory] = useState('all');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tripId = queryParams.get('trip_id');
  const navigate = useNavigate();

  const handleSelectBoxChange = (value) => {
    setCategory(value);
  };

  const handleAlertModalOk = () => {
    setIsAlertModalOpen(false);
  };

  const handleAlertModalCancel = () => {
    setIsAlertModalOpen(false);
  };

  const handleInputChange = event => {
    const newValue = event.target.value;
    setSearchWord(newValue);
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
    if (searchWord.length < 1) {
      setIsAlertModalOpen(true);
      return
    }
    const result = await getPlaceBySearchApi(searchWord.trim(),category);
    setSearchData([]);
    const data = result.data;
    console.log(data);
    setSearchData(data.items);
    setTag(searchWord.trim());
  };

  const handleBackClick = () => {
    navigate(`/trip/my?trip_id=${tripId}`); // TODO 이렇게 하면 다시 돌아갈때마다 API가 호출되는 문제가 존재
  };

  return (
    <div>
      <button onClick={handleBackClick}>
        <img
          src="/icons/back-icon.svg"
          alt="back-icon"
          width="36"
          height="36"
          className="h-36 w-36"
        />
      </button>
      <div className="w-560 h-48 flex justify-center items-center border-[1px] border-gray-4 border-solid bg-white rounded-40 shadow-[0px_1px_2px_0px_rgba(199,198,198,0.10)]">
        <ConfigProvider theme={{ token: { colorPrimary: '#FF7900' , colorText : '#8C8C8C' , } }}>
          <Select
            className="border-0 outline-none bg-transparent"
            defaultValue="전체"
            variant="borderless"
            style={{
              width: 95,
            }}
            onChange={handleSelectBoxChange}
            options={[
              {
                value: 'all',
                label: '전체',
              },
              {
                value: 'c1',
                label: '관광지',
              },
              {
                value: 'c2',
                label: '쇼핑',
              },
              {
                value: 'c3',
                label: '숙박',
              },
              {
                value: 'c4',
                label: '음식',
              },
              {
                value: 'c5',
                label: '축제/행사',
              },
              {
                value: 'c6',
                label: '테마여행',
              },
            ]}
          />
        </ConfigProvider>
        <input
          type="text"
          placeholder="일정에 추가할 장소를 검색해보세요!"
          className="border-0 outline-none p-0 m-0 bg-transparent h-46 w-400 font-medium text-gray-7"
          onChange={event => handleInputChange(event)}
        />
        <button className="w-16 h-16 z-10" onClick={handleSearchClick}>
          <img src="/icons/search-icon.svg" alt="search-icon" className="h-16 w-16" />
        </button>
      </div>
      <div className="m-15 h-16 w-auto flex">
        {searchData.length > 0 && (
          <div className="font-semibold flex">
            <div>{tag}에 대한 검색결과</div>
            <div className='text-sub-accent-1'>&nbsp;{searchData.length}</div>
            <div>건</div>
          </div>
        )}
      </div>
      <div
        className="overflow-auto h-400"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {searchData.length > 0 ?
          searchData.map((item, index) => <PlaceCard key={index} item={item} />)
        : tag.length > 0 && <Empty description={<>검색 결과가 없습니다</>} />}
      </div>
      <ConfigProvider theme={{ token: { colorPrimary: '#FF7900' } }}>
        <Modal
          title="검색어는 한 자 이상 입력해 주세요."
          open={isAlertModalOpen}
          onOk={handleAlertModalOk}
          onCancel={handleAlertModalCancel}
          width={400}
          footer={[
            <Button key="submit" type="primary" onClick={handleAlertModalCancel}>
              확인
            </Button>,
          ]}
        />
      </ConfigProvider>
    </div>
  );
};

export default AddPlanPage;
