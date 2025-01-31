import { useEffect, useState } from 'react';
import { getAllUserLikedPlacesApi } from '../../../../../apis/supabaseApi';
import ScrapPlaceCard from './ScrapPlaceCard';

const ScrapSection = () => {
  const [scrapsData, setScrapData] = useState([]);

  const categoryData = [
    { title: '관광지' },
    { title: '숙박' },
    { title: '음식점' },
    { title: '쇼핑' },
  ];

  async function getData(userId) {
    const data = await getAllUserLikedPlacesApi(userId);
    setScrapData(data);
    console.log(data);
  }
  useEffect(() => {
    getData('test');
  }, []);

  const handleDeleteScrap = async (userId, contentId) => {
    // const result = await deleteUserLikedPlaceApi(userId, contentId);

    // if (result && !result.error) {
    //   setScrapData(prevData => prevData.filter(scrap => scrap.content_id !== contentId));
    // } else {
    //   console.error('스크렙 삭제 실패', result.error);
    // }
    console.log('삭제 버튼 누름');
  };

  return (
    <>
      {categoryData.map(category => {
        const filteredData = scrapsData.filter(item => item.category === category.title);

        return (
          <div key={category.title} className="mb-40">
            <h2 className="text-16">
              {category.title} <strong className="text-sub-accent-1">{filteredData.length}</strong>
            </h2>

            {filteredData.length > 0 ? (
              <div className="grid grid-cols-4 gap-10 w-full p-10 mt-16 border border-gray-6 border-dashed min-h-80px">
                {filteredData.map(scrapData => (
                  <ScrapPlaceCard
                    key={scrapData.content_id}
                    scrapData={scrapData}
                    onDelete={handleDeleteScrap}
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center w-full p-10 mt-16 border border-gray-6 border-dashed min-h-80px">
                <p className="text-gray-7">아직 스크랩한 컨텐츠가 없습니다!</p>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ScrapSection;
