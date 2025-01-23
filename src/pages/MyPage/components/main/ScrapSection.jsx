import dummyImg from '../dummy-img.png';

const ScrapSection = () => {
  const categoryData = [
    { title: '관광지' },
    { title: '숙박' },
    { title: '음식점' },
    { title: '쇼핑' },
  ];

  return (
    <>
      <article className="w-full">
        {categoryData.map(category => (
          <div key={category.title} className="mb-40">
            <h2 className="text-16">
              {category.title} <strong className="text-sub-accent-1">3</strong>
            </h2>

            <div className="grid grid-cols-4 gap-10 w-full p-10 mt-16 border border-gray-6 border-dashed">
              <div className="w-150 h-140 bg-blue-50 rounded-8">
                <div className="w-full h-[75%]">
                  <img src={dummyImg} alt="더미이미지" className="rounded-t-8 w-full h-full" />
                </div>
                <div className="h-[25%] p-4 flex flex-col justify-between">
                  <h3 className="text-12">샤려니길</h3>
                  <p className="text-10 text-gray-7">제주시 &gt; 조천</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </article>
    </>
  );
};

export default ScrapSection;
