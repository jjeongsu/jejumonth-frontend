// import React from 'react';

import { Link } from 'react-router';
import DetailCard from './components/index';
import { ConfigProvider, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useState } from 'react';

// export async function getPlaceBySearchApi(targetWord, category) {
//   const updatedCategory = category === 'all' ? '' : category;
//   const result = await axios.get('https://api.visitjeju.net/vsjApi/contents/searchList', {
//     params: {
//       apiKey: import.meta.env.VITE_VISITJEJU_KEY,
//       locale: 'kr',
//       title: targetWord,
//       category: updatedCategory,
//     },
//   });
//   return result;
// }

// src="/icons/search-icon.svg"  //이미지들만 이렇게 써도된다 . 왜냐면 자동으로 컴파일로 해서 찾아가준다 (폴더를 안에다 안넣어도됨)
// 테스트 절대 필요!!
const SearchPage = () => {
  const URL = 'https://api.visitjeju.net/vsjApi/contents/searchlist';

  // const [detailList, setDetailList] = useState([
  const detailList = [
    {
      id: 1,
      category: 'c1',
      title: '성산일출봉',
      area: '제주 시> 조천',
      description:
        '사려니숲은 제주 숨은 비경 31곳 중 하나로, 비자림로를 시작으로 물찻오름과 사려니 오름을 거쳐가는 삼나무가 우거진 숲길이다.',
      img: '../../../public/images/test.jpg',
    },
    {
      id: 2,
      title: '성산일출봉',
      category: 'c2',
      area: '제주 시> 조천',
      description:
        '사려니숲은 제주 숨은 비경 31곳 중 하나로, 비자림로를 시작으로 물찻오름과 사려니 오름을 거쳐가는 삼나무가 우거진 숲길이다.',
      img: '../../../public/images/test.jpg',
    },
    {
      id: 3,
      title: '성산일출봉',
      category: 'c1',
      area: '제주 시> 조천',
      description:
        '사려니숲은 제주 숨은 비경 31곳 중 하나로, 비자림로를 시작으로 물찻오름과 사려니 오름을 거쳐가는 삼나무가 우거진 숲길이다.',
      img: '../../../public/images/test.jpg',
    },
    {
      id: 4,
      title: '성산일출봉',
      category: 'c3',
      area: '제주 시> 조천',
      description:
        '사려니숲은 제주 숨은 비경 31곳 중 하나로, 비자림로를 시작으로 물찻오름과 사려니 오름을 거쳐가는 삼나무가 우거진 숲길이다.',
      img: '../../../public/images/test.jpg',
    },
  ];

  // 카테고리를 배열로 빼야할지... api 할때 고민해봐야할것같다.... 페이지 네이션도 같이해야할듯
  // 1. api 가지고오기
  // 2. 다 가져오면 페이지네이션 하기
  // 3. click 버튼 만들기 (클릭에 따라 아이콘 바뀌기)
  // 4. 검색 결과 만들기
  // 5. 레이아웃 에 따라 정보 바뀌기

  /// APi 불러와보기

  const [detailData, setDetailData] = useState();

  // const apiKey = '16c8cf73146b4019b20575829761d771';

  useEffect(() => {
    (async () => {
      try {
        // const response = await axios.get('https://api.visitjeju.net/vsjApi/contents/searchlist', {
        const response = await axios.get(URL, {
          params: {
            apikey: import.meta.env.VITE_SUPABASE_SERVICE_KEY,
            local: 'kr',
          },
        });
        const result = response.json();
        setDetailData(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // console.log(setDetailData);

  return (
    <div>
      <div className="w-512 h-52 rounded-20  shadow-2md p-16 box-border flex mx-auto mb-50">
        <input type="text" className="w-full w-full inline-block focus:outline-none" />
        <button>
          <img src="/icons/search.svg" alt="search-icon" />
        </button>
      </div>
      <nav className="flex justify-between">
        <ul className="flex">
          <li>
            <Link href="/detail" className="text-base font-semibold text-left text-black px-13">
              전체
            </Link>
            <div className="w-50 h-4 bg-primary-0"></div>
          </li>
          <li>
            <Link href="/c1" className="text-base font-semibold text-left text-gray-6 px-13">
              관광지
            </Link>
          </li>
          <li>
            <Link href="/c2" className="text-base font-semibold text-left text-gray-6 px-13">
              쇼핑
            </Link>
          </li>
          <li>
            <Link href="/c3" className="text-base font-semibold text-left text-gray-6 px-13">
              숙박
            </Link>
          </li>
          <li>
            <Link href="/c4" className="text-base font-semibold text-left text-gray-6 px-13">
              음식점
            </Link>
          </li>
          <li>
            <Link href="/c5" className="text-base font-semibold text-left text-gray-6 px-13">
              축제
            </Link>
          </li>
          <li>
            <Link href="/" className="text-base font-semibold text-left text-gray-6 px-13">
              행사
            </Link>
          </li>
          <li>
            <Link href="/c6" className="text-base font-semibold text-left text-gray-6 px-13">
              테마 여행
            </Link>
          </li>
        </ul>
        <div className="flex align-middle ">
          <button className="mx-5">
            <img src="/icons/grid_option1-icon.svg" alt="그리드 레이아웃" />
          </button>
          <button className="mx-5">
            <img src="/icons/grid_option2-icon.svg" alt="그리드 레이아웃" />
          </button>
          <button className="mx-5">
            <img src="/icons/grid_option3-icon.svg" alt="그리드 레이아웃" />
          </button>
        </div>
      </nav>
      <main className="mt-22">
        {detailList &&
          detailList.map(item => (
            <DetailCard
              key={item.id}
              title={item.title}
              area={item.area}
              description={item.description}
              img={item.img}
            />
          ))}{' '}
        <ConfigProvider
          theme={{
            token: {
              borderRadiusSM: 6,
              borderRadius: 30,
              fontSize: 12,
              fontFamily:
                'Pretendard Variable, Pretendard ,-apple-system,BlinkMacSystemFont, system-ui, sans-serif',
              fontWeightStrong: 600,
              colorPrimary: '#FFFFFF',
            },
            components: {
              Pagination: {
                itemActiveBg: '#FF7900',
                itemSize: 39,
              },
            },
          }}
        >
          <Pagination total={5} pageSize={2} className="justify-center mt-55" />
        </ConfigProvider>
      </main>
      {detailData && detailData}
    </div>
  );
};

export default SearchPage;
