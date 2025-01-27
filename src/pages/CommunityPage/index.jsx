import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchChannels } from '../../apis/channelApi';
import ChannelTabs from './components/ChannelList';
import leftArray from '/icons/left-array.svg';
import SearchBar from './components/SearchBar';
import Dropdown from './components/Dropdown';
import PostForm from './components/PostForm';
import TabPosts from './components/DetailedPosts';
import PostRender from './components/PostRender';


const CommunityPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialTab = searchParams.get('tab') || '베스트';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('전체');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const data = await fetchChannels();
        setChannels(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getChannels();
  }, []);

  const handleTabChange = tab => {
    setActiveTab(tab);
    navigate(`/community?tab=${tab}`);
  };

  const handleSearch = e => {
    e.preventDefault();
    console.log('검색어:', searchQuery);
  };

  return (
    <div className="container mx-auto px-10 py-10">
      <div className="flex items-center mb-4">
        <button className="text-gray-500 hover:text-orange-500 text-lg mr-4">
          <img src={leftArray} alt="뒤로 가기" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">커뮤니티</h2>
      </div>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="mt-20">
          {' '}
          <ChannelTabs channels={channels} activeTab={activeTab} setActiveTab={handleTabChange} />
        </div>
      )}

      <div className="flex items-center justify-end space-x-4 mt-6 mb-8">
        {' '}
        <Dropdown
          options={['작성자', '내용']}
          onSelect={selected => console.log('Selected:', selected)}
        />
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <div className="mb-30 p-4">
        <PostForm />
      </div>

      <div>
        <TabPosts
          activeTab={activeTab}
          channels={channels}
          setPosts={setPosts}
          setError={setError}
        />
        <PostRender posts={posts} className="" />
      </div>
    </div>
  );
};

export default CommunityPage;
