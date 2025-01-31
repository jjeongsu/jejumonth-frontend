import { NavLink, useLocation } from 'react-router';
import PropTypes from 'prop-types';

const Category = ({ title, category }) => {
  //   const location = useLocation();

  //   const isCategoryActive = location.search === category;

  //   /////////////////////////////////////////////////////////////////////

  const location = useLocation();
  const path = location.pathname;
  const queryParams = new URLSearchParams(location.search);

  const isActivePath = path === '/search' && !queryParams.has('category');
  const isCategoryActive = queryParams.has('category') && queryParams.get('category') === category;
  console.log('isCategoryActive', isActivePath);

  const activeStyle = 'text-black';
  // const defaultStayle =

  // const getNavLinkClass = ()=>{
  //   if(isActivePath && category === ""){
  //     return `text-base font-semibold text-left px-13  ${activeStyle}`
  //   }

  //   return `text-base font-semibold text-left px-13  ${isCategoryActive ? activeStyle : 'text=gray-6' }
  // }

  const getNavLinkClass = () => {
    if (isActivePath && category === '') {
      return `text-base font-semibold text-left px-13  ${activeStyle}`; // "전체" 카테고리 활성화 스타일
    }
    return `text-base font-semibold text-left px-13  ${isCategoryActive ? activeStyle : 'text-gray-6'}`;
  };

  console.log('콘솔isActivePath', isActivePath);

  return (
    <>
      <NavLink
        // to={category}
        to={category == '' ? '' : `?category=${category}`}
        className={getNavLinkClass}
      >
        {title}
      </NavLink>
      {/* isCategoryActive && <div className="w-full h-4 bg-primary-0"></div> */}
      {isActivePath && category === '' ? (
        <div className="w-full h-4 bg-primary-0"></div>
      ) : (
        isCategoryActive && <div className="w-full h-4 bg-primary-0"></div>
      )}
    </>
  );
};

export default Category;

Category.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

// const Category = ({ title, category }) => {
//     const location = useLocation();
//     //   console.log('locationSEARc');
//     //   const isActive = location.search === category;
//     const queryParams = new URLSearchParams(location.search);

//     // 'category' 키가 쿼리 파라미터에 포함되어 있는지 확인
//     const isCategoryActive = queryParams.has('category') && queryParams.get('category') === category;
//     console.log('aaaaaaaaaaaaaaaaa', queryParams.get('category') === category);
//     const activeStyle = 'text-black';

//     return (
//       <>
//         <NavLink
//           to={`?category=${category}`}
//           className={({ isActive }) =>
//             `text-base font-semibold text-left px-13 ${isCategoryActive ? activeStyle : 'text-gray-6'}`
//           }
//         >
//           {title}
//         </NavLink>
//         {isCategoryActive && <div className="w-full h-4 bg-primary-0"></div>}
//       </>
//     );
//   };
