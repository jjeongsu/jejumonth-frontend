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
                  <ScrapPlaceCard key={scrapData.content_id} scrapData={scrapData} />
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

    // <div key={scrapData.title} className="mb-40">
    //   <h2 className="text-16">
    //     {scrapData.title} <strong className="text-sub-accent-1">3</strong>
    //   </h2>

    //   <div className="grid grid-cols-4 gap-10 w-full p-10 mt-16 border border-gray-6 border-dashed">
    //     <div className="w-150 h-140 bg-blue-50 rounded-8">
    //       <div className="w-full h-[75%]">
    //         <img src={dummyImg} alt="더미이미지" className="rounded-t-8 w-full h-full" />
    //       </div>
    //       <div className="h-[25%] p-4 flex flex-col justify-between">
    //         <h3 className="text-12">샤려니길</h3>
    //         <p className="text-10 text-gray-7">제주시 &gt; 조천</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ScrapSection;
