import PlaceCard from './components/PlaceCard.jsx';
import { getPlaceBySearchApi } from '../../apis/visitJejuApi.js';
import { useState } from 'react';
import RegisterDayAndTime from './components/RegisterDayAndTime.jsx';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getTripApi } from '../../apis/supabaseApi.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Modal, ConfigProvider, Empty, Select, Space } from 'antd';
import PlaceTagButton from './components/PlaceTag.jsx';

const tagData = [
  { title: '#광치기 해변🌊', id: 'beach', contentId: 'CNTS_000000000018413' },
  { title: '#카페코지🍵', id: 'cafe', contentId: 'CNTS_000000000019338' },
  { title: '#카멜리아힐🌺', id: 'hill', contentId: 'CNTS_000000000001195' },
  { title: '#휴즐리 제주🍧', id: 'husley', contentId: 'CNTS_300000000015965' },
  { title: '#제4회 제주비엔날레 : 물과 바람과 별의 길🌟', id: 'vienna', contentId: 'CNTS_300000000013355' },
  { title: '#파더스가든🐰', id: 'garden', contentId: 'CNTS_200000000014189' },
  { title: '#비자림🌳', id: 'beejalim', contentId: 'CONT_000000000500270' },
];

const AddPlanPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = useSelector(state => state.user.userId);
  const [searchData, setSearchData] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [submittedSearchWord, setSubmittedSearchWord] = useState('');
  const [category, setCategory] = useState('all');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isBeforeSearch, setIsBeforeSearch] = useState(true);
  const navigate = useNavigate();

  // tripId와 date 값 가져오기
  const tripId = queryParams.get('trip_id');
  const initialTargetDate = queryParams.get('date'); // 사용자가 새로운 plan을 만드려는 date

  // tripId를 기반으로 현재 여행 시작일, 종료일을 가져오기
  const { data: tripData } = useQuery({
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

  const handleSelectBoxChange = value => {
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
      return;
    }
    setIsBeforeSearch(false);
    const result = await getPlaceBySearchApi(searchWord.trim(), category);
    const data = result.data;
    console.log(data);
    setSearchData(data.items);
    setSubmittedSearchWord(searchWord.trim());
  };

  const handleBackClick = () => {
    navigate(`/trip/my?trip_id=${tripId}`); // TODO 이렇게 하면 다시 돌아갈때마다 API가 호출되는 문제가 존재
  };
  const startDate = '2025-01-20';
  const endDate = '2025-02-12';
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
        <ConfigProvider theme={{ token: { colorPrimary: '#FF7900', colorText: '#8C8C8C' } }}>
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
            <div>{submittedSearchWord}에 대한 검색결과</div>
            <div className="text-sub-accent-1">&nbsp;{searchData.length}</div>
            <div>건</div>
          </div>
        )}
        {isBeforeSearch && (
          <div className="flex">
            <div className="text-primary-0 font-bold">🍊 제주도청</div>
            <div className="text-gray-7 font-semibold">에서 추천하는&nbsp;</div>
            <div className="text-gray-8 font-semibold">관광명소</div>
            <div className="text-gray-7 font-semibold">에요</div>
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
        {isBeforeSearch && (
          <div className="w-560 flex flex-wrap justify-between gap-8">
            {tagData.map(tag => (
              <PlaceTagButton key={tag.id} title={tag.title} contentId={tag.contentId} />
            ))}
          </div>
        )}
        {searchData.length > 0
          ? searchData.map((item, index) => <PlaceCard key={index} item={item} />)
          : submittedSearchWord.length > 0 && <Empty description={<>검색 결과가 없습니다</>} />}
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
      <div className="h-full">
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
    </div>
  );
};

export default AddPlanPage;