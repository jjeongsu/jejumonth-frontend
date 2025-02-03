// import React from 'react';
// import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
// import { Link, useLocation, useNavigate, useSearchParams } from 'react-router';
import { useSearchParams, useNavigate, useLocation } from 'react-router';
import DetailCard from './components/DetailCard';
import { ConfigProvider, Pagination } from 'antd';
// import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { getList } from '../../apis/searchApi';
import { calcPage } from '../../utils/pagination';
import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
import Category from './components/Category';
import DetailMediumCard from './components/DetailMediumCard';
import DetailSmallCard from './components/DetailSmallCard';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/slices/user.slice';
import SkeletonLayout from './components/skeletonLayout';
// import Loading from './components/Loading';
// import { calcPage } from '../../utils/pagination';
// import axios from 'axios';
// import { useState } from 'react';

//TODO : F5를 눌렀을시 초기 렌더링 값으로 돌아옴.
const SearchPage = () => {
  // document.addEventListener('keydown', function (e) {
  //   if (e.key == 'F5') {
  //     e.preventDefault();
  //     navigate('/search');
  //   }
  // });

  /// APi 불러와보기

  // // const [message, setMessage] = useState();
  const [searchData, setSearchData] = useState([]);
  // const [searchTitle, setSearchTitle] = useState();
  // const [isFirstLaod, setIsFirshLoad] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  // const [searchCategory, setSearchCategory] = useState();
  const [prevInput, setPrevInput] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const [query, setQuery] = useState({});
  const [itemListLength, setItemListLength] = useState(5);
  const [pagesLength, setPagesLength] = useState(5);
  const [inputQuery, setInputQuery] = useState({}); // 검색할때 나오는 거
  const [searchText, setSearchText] = useState('');
  const [layout, setLayout] = useState('large-layout');
  // const [Loading, setLoding] = useState();

  // const itemListLength = 5;
  // const pagesLength = 5;
  const dispatch = useDispatch();
  const { likesPlaces } = useSelector(state => state.wishlist);
  const { isLoggedIn, userId } = useSelector(state => state.user);
  console.log('로그인을 했냐?', isLoggedIn, 'userId', userId);
  console.log('좋아하는 장소', likesPlaces);

  // const isliked = Array.isArray(likesPlaces) && likesPlaces.some(place=>{
  //   return place.content_id === placeInfo.contentsid
  // })

  // const handleWishListClick = ()=>{
  //   if()
  // }

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('Setting test user...');
      dispatch(
        setUser({
          isLoggedIn: true,
          userId: 'testUser123',
          userEmail: 'test@example.com',
          userFullName: 'Test User',
        }),
      );
    }
  }, [isLoggedIn, dispatch]);

  const categoryType = [
    { id: 1, title: '전체', category: '' },
    { id: 2, title: '관광지', category: 'c1' },
    { id: 3, title: '쇼핑', category: 'c2' },
    { id: 4, title: '숙박', category: 'c3' },
    { id: 5, title: '음식점', category: 'c4' },
    { id: 6, title: '축제와 행사', category: 'c5' },
    { id: 7, title: '테마 여행', category: 'c6' },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ['search1', query],
    queryFn: () => getList(query),
    staleTime: 2 * 60 * 1000, // 2분 동안 데이터가 신선한 상태로 유지
    refetchInterval: 2 * 60 * 1000, // 2분마다 데이터 갱신
    refetchOnWindowFocus: true, // 창이 포커스될 때 자동 갱신
    keepPreviousData: true,
  });

  console.log('쿼리', query);

  if (isLoading) {
    console.log('데이터 로딩 중...');
    // return Loading...
  } else if (error) {
    console.log('데이터 요청 오류:', error);
  }

  const updatePageInfo = calcPage(query.page || 0, searchData.length, itemListLength, pagesLength);

  console.log('살려주세요', updatePageInfo);

  const currentPageList = searchData.slice(
    updatePageInfo.startItemIndex,
    updatePageInfo.endItemIndex,
  );

  console.log('살려주세요2222222222222222', searchData);

  useEffect(() => {
    const updatedQuery = {
      page: parseInt(searchParams.get('page') || '1'),
      limit: itemListLength,
      title: searchParams.get('title') || '',
      category: searchParams.get('category') || '', // 모든 정보를 뽑아 오려면 여기에다가 설정해두면 안될듯
      cid: searchParams.get('cid') || '',
    };
    setQuery(updatedQuery);
    setSearchText(updatedQuery.title);
    console.log('updatedQuery', updatedQuery); //c1 나옴
  }, [searchParams]);

  useEffect(() => {
    if (!isLoading && data && data?.items) {
      console.log(data.items);
      console.log('data', data.items.length);
      // console.log(
      //   '카테고리... 나와야합니다',
      //   data.items.forEach(item => console.log(item.contentscd.value.length)),
      // );

      const putdata = data.items.slice(0, 100);

      console.log('아 힘듭니다', data.items.slice(0, 10));

      // let ddd = [];
      // if (data.items.length >= 100) {
      //   ddd = data.items.slice(0, 100);
      // }
      setSearchData(putdata);
    } else {
      console.log('data 또는 items가 존재하지 않습니다.');
    }
  }, [data, isLoading]);

  const handleChange = e => {
    const { value, type } = e.target;
    let nextInputQuery = { ...inputQuery };

    if (type === 'text') {
      setSearchText(value);
      nextInputQuery = { ...inputQuery, title: value };
    }
    setInputQuery(nextInputQuery);
  };

  // const handleChange = e => {
  //   const { value, type } = e.target;
  //   let nextInputQuery = { ...inputQuery };

  //   if (type === 'text') {
  //     setSearchText(value);
  //     nextInputQuery = { ...inputQuery, title: value };
  //   }
  //   setInputQuery(nextInputQuery);
  // };

  // const handleCategoryClick = category => {};

  const handleChangeBtnClick = (page, category) => {
    // if(...inputQuery.title == inputQuery){}
    // console.log(prevInput);
    setPrevInput(inputQuery.title);
    console.log('PrevinputQuery.title', prevInput, 'inputQuery.title', inputQuery.title);

    if (prevInput !== inputQuery.title) {
      page = 1;
    }
    const nextInputQuery = { ...inputQuery, page, category };
    console.log('nextInputQuery', nextInputQuery);
    setInputQuery(nextInputQuery);
    setQuery(nextInputQuery);
    console.log('QQUERy', nextInputQuery);
    let params = '?';
    Object.entries(nextInputQuery).forEach(([key, value]) => {
      if (value) {
        params += `${key}=${value}&`;
      }
    });

    params = params.slice(0, -1);
    navigate(`${location.pathname}` + params);
  };

  useEffect(() => {
    if (layout === 'large-layout') {
      setItemListLength(5);
      setPagesLength(5);
    } else if (layout === 'medium-layout') {
      setItemListLength(6);
      setPagesLength(6);
    } else if (layout === 'small-layout') {
      setItemListLength(12);
      setPagesLength(12);
    }

    const totalItems = searchData.length;
    const totalPages = Math.ceil(totalItems / itemListLength);
    if (query.page > totalPages) {
      setQuery(prevQuery => ({
        ...prevQuery,
        page: totalPages,
      }));
    }

    const nextInputQuery = { ...query };

    const filteredQuery = {};
    ['page', 'category', 'title'].forEach(key => {
      if (nextInputQuery[key]) {
        filteredQuery[key] = nextInputQuery[key];
      }
    });

    let params = '?';
    Object.entries(filteredQuery).forEach(([key, value]) => {
      if (value) {
        params += `${key}=${value}&`;
      }
    });

    params = params.slice(0, -1);

    navigate(`${location.pathname}` + params);
  }, [layout, searchData, itemListLength]); // it

  useEffect(() => {
    console.log('ItemListLength 변경됨:', itemListLength);
    console.log('PagesLength 변경됨:', pagesLength);

    console.log('페이지 입니다~~~~~~~~~~~~', searchData.length / itemListLength);
  }, [itemListLength, pagesLength]); // itemListLength, pagesLength가 바뀔 때마다 실행

  const handleLayoutChange = e => {
    console.log('레이아웃 안돌아간다.. ,', itemListLength, pagesLength);

    //TODO 조건 처리
    const { layoutIcon } = e.currentTarget.dataset;
    console.log(layoutIcon);

    const svgs = document.querySelectorAll('[data-layoutIcon]');
    svgs.forEach(item => {
      item.classList.remove('fill-gray-8');
    });

    e.currentTarget.classList.add('fill-gray-8');

    setLayout(layoutIcon);
  };

  console.log(layout);

  // console.log('!!!!!!!!!!!!!!!!!!!!!!!!', inputQuery.title);

  const renderCard = item => {
    switch (layout) {
      case 'large-layout':
        return (
          <DetailCard
            key={item.id}
            title={item.title || 'No title'}
            city={item.region1cd?.label || 'No city'}
            street={item.region2cd?.label || 'No street'}
            description={item.introduction || 'No description'}
            img={item.repPhoto?.photoid?.thumbnailpath || '/images/no_image.svg'}
            category={item.contentscd?.value}
            contentid={item}
          />
        );
      case 'medium-layout':
        return (
          // <div className="flex">
          <DetailMediumCard
            key={item.id}
            title={item.title || 'No title'}
            city={item.region1cd?.label || 'No city'}
            street={item.region2cd?.label || 'No street'}
            img={item.repPhoto?.photoid?.thumbnailpath || '/images/no_image.svg'}
            category={item.contentscd?.value}
            contentid={item}
          />
          // </div>
        );
      case 'small-layout':
        return (
          <DetailSmallCard
            key={item.id}
            title={item.title || 'No title'}
            city={item.region1cd?.label || 'No city'}
            street={item.region2cd?.label || 'No street'}
            description={item.introduction || 'No description'}
            img={item.repPhoto?.photoid?.thumbnailpath || '/images/no_image.svg'}
            category={item.contentscd?.value}
            contentid={item}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="w-512 h-52 rounded-20  shadow-2md p-16 box-border flex mx-auto mb-50">
        <input
          type="text"
          onChange={handleChange}
          onKeyDown={e => {
            if (e.key == 'Enter') {
              e.preventDefault();
              handleChangeBtnClick(query.page || 1, query.category || 0);
            }
          }}
          className="w-full  inline-block focus:outline-none"
        />
        <button>
          <img
            src="/icons/search.svg"
            alt="search-icon"
            onClick={() => {
              handleChangeBtnClick(query.page || 1, query.category || 0);
            }}
          />
        </button>
      </div>
      <nav className="flex justify-between">
        <ul className="flex">
          {categoryType.map(item => (
            <li key={item.id} className="mx-6">
              <Category
                title={item.title}
                category={item.category}
                searchTitle={inputQuery.title}
                // onClick={() => handleChangeBtnClick(query.category || '')}
              />
            </li>
          ))}
        </ul>
        <div className="flex align-middle ">
          <button className="mx-5">
            {/* <img src="/icons/grid_option1-icon.svg" alt="large-layout" className="stroke-red-400" /> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              data-layoutIcon="large-layout"
              className="fill-gray-6  fill-gray-8"
              onClick={event => {
                handleLayoutChange(event, query.page);
              }}
            >
              <path d="M15.8333 10.833H4.16667C3.25 10.833 2.5 11.583 2.5 12.4997V15.833C2.5 16.7497 3.25 17.4997 4.16667 17.4997H15.8333C16.75 17.4997 17.5 16.7497 17.5 15.833V12.4997C17.5 11.583 16.75 10.833 15.8333 10.833ZM15.8333 15.833H4.16667V12.4997H15.8333V15.833Z" />
              <path d="M15.8333 2.5H4.16667C3.25 2.5 2.5 3.25 2.5 4.16667V7.5C2.5 8.41667 3.25 9.16667 4.16667 9.16667H15.8333C16.75 9.16667 17.5 8.41667 17.5 7.5V4.16667C17.5 3.25 16.75 2.5 15.8333 2.5ZM15.8333 7.5H4.16667V4.16667H15.8333V7.5Z" />
            </svg>
          </button>
          <button className="mx-5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-layoutIcon="medium-layout"
              className="fill-gray-6"
              onClick={event => {
                handleLayoutChange(event, query.page);
              }}
            >
              <path
                d="M2.5 2.5V9.16667H9.16667V2.5H2.5ZM7.5 7.5H4.16667V4.16667H7.5V7.5ZM2.5 10.8333V17.5H9.16667V10.8333H2.5ZM7.5 15.8333H4.16667V12.5H7.5V15.8333ZM10.8333 2.5V9.16667H17.5V2.5H10.8333ZM15.8333 7.5H12.5V4.16667H15.8333V7.5ZM10.8333 10.8333V17.5H17.5V10.8333H10.8333ZM15.8333 15.8333H12.5V12.5H15.8333V15.8333Z"
                // fill="#BFBFBF"
              />
            </svg>
          </button>
          <button className="mx-5">
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-layoutIcon="small-layout"
              className="fill-gray-6"
              onClick={event => {
                handleLayoutChange(event, query.page);
              }}
            >
              <path d="M15 0H0V1.6667H15V0Z" />
              <path d="M15 13.333H0V14.9997H15V13.333Z" />
              <path d="M15 6.66699H0V8.3337H15V6.66699Z" />
            </svg>
          </button>
        </div>
      </nav>
      <main className="mt-22 ">
        <div className="min-h-658">
          {data == undefined && <SkeletonLayout layout={layout} itemList={itemListLength} />}
          {
            <div className={layout == 'medium-layout' ? 'flex flex-wrap' : ''}>
              {!isLoading && searchData.length === 0 ? (
                //  !isLoading &&currentPageList.map(item => renderCard(item))
                <div className="w-full h-500 flex justify-center">
                  <img src="/icons/no_search_results.svg" className="w-200" />
                </div>
              ) : (
                // <div className="w-full h-500 flex justify-center">
                //   <img src="/icons/no_search_results.svg" className="w-200" />
                // </div>
                !isLoading && currentPageList.map(item => renderCard(item))
              )}
            </div>
          }
        </div>
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
              handleChangeBtnClick(value, query.category || 0);
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
