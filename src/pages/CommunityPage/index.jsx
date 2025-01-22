import React, { useEffect, useState } from 'react';
import { fetchChannels } from '../../apis/channelApi';
import ChannelTabs from './components/ChannelList';
import leftArr from '/icon/icon/leftArr-icon.png';
import SearchBar from './components/SearchBar';
import Dropdown from './components/Dropdown';



const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('베스트');
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('전체');

  useEffect(() => {
    const getChannels = async () => {
      try {
        const data = await fetchChannels();
        setChannels(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getChannels();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className=" container mx-auto py-200 px-160 left-margin-195">
      <div className="flex items-center mb-6">
        <button className="text-gray-500 hover:text-orange-500 text-lg mr-4 ">
          <img src={leftArr} alt="leftArr" />
        </button>
        <h2 className="text-3xl font-bold text-gray-800">커뮤니티</h2>
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ChannelTabs
          channels={channels}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      <div className="flex items-center justify-end space-x-4 mb-6">
        <Dropdown
          options={['작성자', '내용']}
          onSelect={(selected) => console.log('Selected:', selected)}
        />
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className=" p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">{activeTab} 채널</h3>
        <p className="text-gray-600">이곳에 {activeTab} 채널에 대한 게시물을 표시합니다.</p>
      </div>
    </div>
  );
};

export default CommunityPage;