import { NavLink, useLocation } from 'react-router';
import PropTypes from 'prop-types';

const Category = ({ title, category, searchTitle }) => {
  //   const location = useLocation();

  //   const isCategoryActive = location.search === category;

  //   /////////////////////////////////////////////////////////////////////

  const location = useLocation();
  const path = location.pathname;
  const queryParams = new URLSearchParams(location.search);

  const isActivePath = path === '/search' && !queryParams.has('category');
  const isCategoryActive = queryParams.has('category') && queryParams.get('category') === category;
  // const isTitle = queryParams.has('title') && queryParams.get('title') === title;
  // const currentTitle = searchTitle;
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!currentTitle', searchTitle);

  const activeStyle = 'text-black';

  const getNavLinkClass = () => {
    if (isActivePath && category === '') {
      return `text-base font-semibold text-left px-7 ${activeStyle}`;
    }
    return `text-base font-semibold text-left px-7  ${isCategoryActive ? activeStyle : 'text-gray-6'}`;
  };

  const url = (category, searchTitle) => {
    let addparams = category === '' ? '' : `?category=${category}`;

    if (searchTitle != null) {
      addparams += addparams ? `&title=${searchTitle}` : `?title=${searchTitle}`;
    }

    // if(page !==null){
    //   addparams += addparams ? `&page=${searchTitle}` : `?title=${searchTitle}`;
    // }

    return addparams;
  };

  return (
    <>
      <div className={getNavLinkClass}>{title}</div>
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
  searchTitle: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
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
