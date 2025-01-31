import { useEffect, useState } from 'react';
import { deleteUserLikedPlaceApi, getAllUserLikedPlacesApi } from '../../../../../apis/supabaseApi';
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
    console.log(`ID: ${contentId._id}의 스크랩 취소 버튼을 눌렀습니다.`);

    const isChecked = window.confirm('정말로 스크랩을 취소하시겠습니까?');

    if (isChecked) {
      try {
        await deleteUserLikedPlaceApi(userId, contentId);

        setScrapData(prevData => prevData.filter(scrapData => scrapData.content_id !== contentId));

        console.log(`스크랩 삭제 성공: userId=${userId}, contentId=${contentId}`);
      } catch (error) {
        console.error('스크렙 취소하기를 실패했습니다.');
        throw new Error(error);
      }
    }
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
