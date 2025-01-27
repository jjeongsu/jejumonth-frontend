// import React from 'react';
// import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
// import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router';
import DetailCard from './components/index';
import { ConfigProvider, Pagination } from 'antd';
// import { useEffect, useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import { getList } from '../../apis/searchApi';
import { Dummy } from './dummy';
import { calcPage } from '../../utils/pagination';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
// import { calcPage } from '../../utils/pagination';
// import axios from 'axios';
// import { useState } from 'react';

const SearchPage = () => {
  // 카테고리를 배열로 빼야할지... api 할때 고민해봐야할것같다.... 페이지 네이션도 같이해야할듯
  // 1. api 가지고오기
  // 2. 다 가져오면 페이지네이션 하기
  // 3. click 버튼 만들기 (클릭에 따라 아이콘 바뀌기)
  // 4. 검색 결과 만들기
  // 5. 레이아웃 에 따라 정보 바뀌기

  // document.addEventListener('keydown', function (e) {
  //   if (e.key == 'F5') {
  //     e.preventDefault();
  //     navigate('/search');
  //   }
  // });

  /// APi 불러와보기

  const [searchData, setSearchData] = useState(Dummy.items);
  // // const [message, setMessage] = useState();
  const [searchTitle, setSearchTitle] = useState();
  const [isFirstLaod, setIsFirshLoad] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState({});
  const itemListLength = 5;
  const pagesLength = 5;
  const [inputQuery, setInputQuery] = useState({}); // 검색할때 나오는 거
  const [searchText, setSearchText] = useState('');
  // const [Loading, setLoding] = useState();

  const { data, isLoading, error } = useQuery({
    queryKey: ['search1', query],
    queryFn: () => getList(query),
  });

  if (isLoading) {
    console.log('데이터 로딩 중...');
  } else if (error) {
    console.log('데이터 요청 오류:', error);
  }

  useEffect(() => {
    if (data && data.items) {
      console.log(data.items);
      setSearchData(data.items);
    } else {
      console.log('data 또는 items가 존재하지 않습니다.');
    }
  }, [data]);

  const updatePageInfo = calcPage(query.page || 0, searchData.length, itemListLength, pagesLength);
  const currentPageList = searchData.slice(
    updatePageInfo.startItemIndex,
    updatePageInfo.endItemIndex,
  );

  useEffect(() => {
    const updatedQuery = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: itemListLength,
      title: searchParams.get('title') || '',
    };
    setQuery(updatedQuery);
    setSearchText(updatedQuery.title);
  }, [searchParams]);

  const handleChange = e => {
    const { value, type } = e.target;
    let nextInputQuery = { ...inputQuery };

    if (type === 'text') {
      setSearchText(value);
      nextInputQuery = { ...inputQuery, title: value };
    }
    setInputQuery(nextInputQuery);
  };

  const handleChangeBtnClick = page => {
    console.log('searchData', searchData);
    // console.log('Dummy.items', Dummy.items);
    const nextInputQuery = { ...inputQuery, page };
    console.log('nextInputQuery', nextInputQuery);
    setInputQuery(nextInputQuery);
    setQuery(nextInputQuery);
    let params = '?';
    Object.entries(nextInputQuery).forEach(([key, value]) => {
      if (value) {
        params += `${key}=${value}&`;
      }
    });

    params = params.slice(0, -1);
    navigate(`${location.pathname}` + params);
  };

  // useEffect(() => {
  //   // 데이터가 로딩 중일 때 searchData가 변경되면 추가적인 작업을 할 수 있음
  //   if (searchData.length > 0) {
  //     console.log('데이터가 업데이트되었습니다:', searchData);
  //   }
  // }, [searchData]); // searchData가 변경될 때마다 실행

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const data = await getList();
  //       if (data !== null) {
  //         setSearchData(data);
  //         setMessage('데이터가 들어왔습진다');
  //       } else {
  //         setMessage('실패');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);

  return (
    <div>
      <div className="w-512 h-52 rounded-20  shadow-2md p-16 box-border flex mx-auto mb-50">
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={e => {
            if (e.key == 'Enter') {
              e.preventDefault();
              handleChangeBtnClick(query.page || 1);
            }
          }}
          className="w-full w-full inline-block focus:outline-none"
        />
        <button>
          <img
            src="/icons/search.svg"
            alt="search-icon"
            onClick={() => {
              handleChangeBtnClick(query.page || 1);
            }}
          />
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
        {currentPageList &&
          Object.entries(currentPageList).map(([key, value]) => (
            <DetailCard
              key={key}
              title={value?.title || '타이틀이 없습니다'}
              city={value?.region1cd?.label || '지역'}
              street={value?.region2cd?.label || '동'}
              description={value?.introduction || '소개 글이 없습니다'}
              img={value?.repPhoto?.photoid?.thumbnailpath || '/images/no_image.svg'}
            />
          ))}
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
          <Pagination
            total={searchData.length}
            pageSize={itemListLength}
            className="justify-center mt-55"
            current={query.page}
            // onChange={() => {
            //   handleChangeBtnClick(query.page || 1);
            // }}
            onChange={value => {
              handleChangeBtnClick(value);
            }}
          />
        </ConfigProvider>
      </main>
      {/* {searchData &&
        Object.entries(searchData).map(([key, value]) => (
          <li key={key}>
            <b>{key}</b> : {value}
          </li>
        ))}
      {message && message} */}
      {/* {searchData && } */}
      {/* {searchData && (
        <>
          <div>result : {searchData.result}</div>
          <div>resultMessage : {searchData.resultMessage}</div>
          <div>totalCount : {searchData.totalCount}</div>
          <div>resultCount : {searchData.resultCount}</div>
          <div>pageSize : {searchData.pageSize}</div>
          <div>pageCount : {searchData.pageCount}</div>
          <div>currentPage : {searchData.currentPage}</div>
          <div>title : {searchData.title}</div>
        </>
      )} */}
      {/* <div>
        {searchData &&
          Object.entries(searchData).map(([key, value]) => (
            <div key={key}>
              <strong>{key}:</strong> {JSON.stringify(value)}
            </div>
          ))}
      </div> */}
      {/* {searchData &&
        Object.entries(searchData.items).map(([key, value]) => (
          <div key={key}>
            <div>
              <strong>contentsid:</strong> {value?.contentsid}
            </div>
            <div>
              <strong>label:</strong> {value?.contentscd.label}
            </div>
            <div>
              <strong>title:</strong> {value?.title}
            </div>
            <div>
              <strong>region2cd:</strong> {value?.region2cd.label}
            </div>
            <div>
              <strong>region1cd:</strong> {value?.region1cd.label}
            </div>
            <div>
              <strong>roadaddress:</strong> {value?.roadaddress}
            </div>
            <div>
              <strong>introduction:</strong> {value?.introduction}
            </div>
            <div>
              <strong>thumbnailpath:</strong> {value?.repPhoto.photoid.thumbnailpath}
            </div>
          </div>
        ))} */}
    </div>
  );
};

export default SearchPage;
