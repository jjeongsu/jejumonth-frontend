import { Button, Modal, ConfigProvider, Empty, Select } from 'antd';
import PlaceTagButton from './PlaceTag.jsx';
import PlaceCard from './PlaceCard.jsx';
import { useState, useRef, useEffect } from 'react';
import categoryCode from '@/constants/category.js'; //TODO 절대경로로 변경
import tagData from '@/constants/tagData.js';
import useFetchSearchedPlaceList from '@/hooks/react-query/useFetchSearchedPlaceList.js';

const Search = ({ onBackClick, onNext, onSkipDetail, search, setSearch }) => {
  const searchInputRef = useRef('');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const { placeList, refetch } = useFetchSearchedPlaceList(search.submitKeyword, search.category);

  const handleSearchClick = async () => {
    if (searchInputRef.current.value.length < 1) {
      setIsAlertModalOpen(true);
      return;
    }
    setSearch(prev => ({ ...prev, submitKeyword: searchInputRef.current.value.trim() }));
    refetch();
  };

  const handleSelectBoxChange = value => {
    setSearch(prev => ({ ...prev, category: value }));
  };

  const handleAlertModalOk = () => {
    setIsAlertModalOpen(false);
  };

  const handleAlertModalCancel = () => {
    setIsAlertModalOpen(false);
  };

  console.log('현재 검색어, 카테고리 상태', search.submitKeyword, search.category);

  useEffect(() => {
    // 다시 마운트 될때, searchKeyword를 가지고 있다면
    if (search.submitKeyword !== '') {
      searchInputRef.current.value = search.submitKeyword;
    }
  }, []);
  return (
    <div>
      {/* 뒤로가기버튼 */}
      <button onClick={onBackClick}>
        <img
          src="/icons/back-icon.svg"
          alt="back-icon"
          width="36"
          height="36"
          className="h-36 w-36"
        />
      </button>
      {/* selctor와 검색창 */}
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
            options={categoryCode}
          />
        </ConfigProvider>
        <input
          type="text"
          placeholder="일정에 추가할 장소를 검색해보세요!"
          className="border-0 outline-none p-0 m-0 bg-transparent h-46 w-400 font-medium text-gray-7"
          ref={searchInputRef}
        />
        <button className="w-16 h-16 z-10" onClick={handleSearchClick}>
          <img src="/icons/search-icon.svg" alt="search-icon" className="h-16 w-16" />
        </button>
      </div>

      {/* 추천 명소 태그 */}
      <div className="m-15 h-16 w-auto flex">
        {placeList && placeList.data.items.length < 0 && (
          <div className="font-semibold flex">
            <div>{search.submitKeyword}에 대한 검색결과</div>
            <div className="text-sub-accent-1">&nbsp;{placeList && placeList.length}</div>
            <div>건</div>
          </div>
        )}
        {!search.submitKeyword && (
          <div className="flex">
            <div className="text-primary-0 font-bold">🍊 제주도청</div>
            <div className="text-gray-7 font-semibold">에서 추천하는&nbsp;</div>
            <div className="text-gray-8 font-semibold">관광명소</div>
            <div className="text-gray-7 font-semibold">에요</div>
          </div>
        )}
      </div>
      <div
        className="overflow-auto max-h-600"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {!search.submitKeyword && (
          <div className="w-560 flex flex-wrap justify-between gap-8">
            {tagData.map(tag => (
              <PlaceTagButton key={tag.id} title={tag.title} contentId={tag.contentId} />
            ))}
          </div>
        )}
        {search.submitKeyword !== '' &&
          placeList &&
          (placeList.data.items.length > 0
            ? placeList.data.items.map((item, index) => (
                <PlaceCard key={index} item={item} onNext={onNext} onSkipDetail={onSkipDetail} />
              ))
            : search.submitKeyword && <Empty description={<>검색 결과가 없습니다</>} />)}
      </div>

      {/* 검색어 길이 경고모달 */}
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

export default Search;
