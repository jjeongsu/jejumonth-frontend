import React, { useState } from 'react';
import Tabs from '../../components/common/Tabs';
import Dropdown from '../../components/common/Dropdown';
import SearchBar from '../../components/common/SearchBar';
import leftArrIcon from '../../../public/icon/leftArr.svg';


const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('베스트');
  const [filter, setFilter] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['베스트', '전체', '관광', '숙박', '음식', '축제', '행사', '테마'];
  const dropdownOptions = ['작성자', '내용'];

  return (
    <div className="container mx-auto py-8 mt-196" style={{ paddingLeft: '159px', paddingRight: '159px' }}>
      <div className="flex items-center mb-8">
        <button className="text-gray-500 hover:text-orange-500 text-lg mr-4">
          <img src={leftArrIcon} alt="leftArrow" className="" />
        </button>
        <h2 className="text-3xl font-bold">커뮤니티</h2>
      </div>

      <div className="my-4">
      </div>

      <div className="flex justify-between items-center mt-6">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="flex items-center flex-shrink-0">
          <Dropdown options={dropdownOptions} onSelect={setFilter} />
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
