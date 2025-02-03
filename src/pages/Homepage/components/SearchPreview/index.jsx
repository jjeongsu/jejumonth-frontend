import { tourPlaces, shoppingPlaces } from '../../../../constants/mainExamplePlaces.js';
import MainCard from './MainCard.jsx';
import catetoryCode from '../../../../constants/category.js';
import { useState } from 'react';
import CategoryButton from './CategoryButton.jsx';
import { useNavigate } from 'react-router-dom';

const SearchPreview = () => {
  const [category, setCategory] = useState();
  const [places, setPlaces] = useState(tourPlaces);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    setCategory(categoryName);
    if (categoryName === '쇼핑') {
      setPlaces(shoppingPlaces);
    } else {
      setPlaces(tourPlaces);
    }
  }

  const handleCardClick = (contentId) => {
    navigate(`/detail/${contentId}`); // 상세 페이지로 이동
  };

  const handleSearchClick = () => {
    navigate('/search');
  }

  return (
    <div className="h-903 w-full bg-gray-2 flex flex-col justify-center items-center gap-20">
      <div className="flex w-945 justify-between">
        <div className="flex text-40 font-extrabold">
          <div>⛰️&nbsp;</div>
          <div className="text-sub-accent-1">LOOKING&nbsp;</div>
          <div className="text-gray-12">for&nbsp;</div>
          <div className="text-primary-0">Jeju</div>
        </div>
        <button
          className="w-521 h-52 bg-white rounded-40 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.25)] text-gray-6"
          onClick={handleSearchClick}
        >
          여기를 클릭해 제주도 장소를 검색해보세요!
        </button>
      </div>
      <div className="flex w-582 justify-between">
        {catetoryCode.map((item, index) => (
          <CategoryButton key={index} category={item.label} isClicked={category === item.label} onClick={() => handleCategoryClick(item.label)} />
        ))}
      </div>
      <div className="flex w-940 justify-between mx-13">
        <div className="text-gray-8 font-semibold">📍 제주도 추천 명소</div>
        <button
          onClick={handleSearchClick}
          className="text-sub-accent-1 font-bold"
        >
          더보기
        </button>
      </div>
      <div className="grid grid-cols-3 grid-rows-2 place-items-center gap-15">
        {places.map((item, index) => (
          <MainCard
            key={index}
            onClick={() => handleCardClick(item.contentsid)}
            title={item.title}
            city={item.city}
            street={item.street}
            img={item.img}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPreview;