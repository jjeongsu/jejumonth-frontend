import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserLikedPlaces,
  addUserLikedPlace,
  removeUserLikedPlace
} from '../../../redux/slices/wishlist.slice'; 
import fullHeart from '/icons/fullHeart.svg';
import emptyHeart from '/icons/emptyHeart.svg';
import { setUser } from '../../../redux/slices/user.slice'

const WishListButton = ({ contentId }) => {
  const dispatch = useDispatch();
  const { likedPlaces } = useSelector((state) => state.wishlist);
  const { isLoggedIn } = useSelector((state) => state.user);
  
  // 로그인 테스트용
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     dispatch(
  //       setUser({
  //         userId: 'testUser123',
  //         userEmail: 'test@example.com',
  //         userFullName: 'Test User',
  //       })
  //     );
  //   }
  // }, [isLoggedIn, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserLikedPlaces());
    }
  }, [isLoggedIn, dispatch]);

  const isLiked = likedPlaces.includes(contentId);

  const handleWishlistClick = () => {
    // 찜한 상태라면
    if (isLiked) {
      dispatch(removeUserLikedPlace(contentId));
    } else {
      dispatch(addUserLikedPlace(contentId));
    }
  };

  return (
    <>
      {isLoggedIn && (
        <button 
          onClick={handleWishlistClick} 
          className='w-[110px] h-[45px] rounded-[25px] bg-neutral-100 flex items-center justify-center gap-2 shadow-md mr-20 mt-30'
          style={{
            boxShadow:
              "0px 35px 10px 0 rgba(97,97,97,0), 0px 22px 9px 0 rgba(97,97,97,0.01), 0px 13px 8px 0 rgba(97,97,97,0.05), 0px 6px 6px 0 rgba(97,97,97,0.09), 0px 1px 3px 0 rgba(97,97,97,0.1)",
          }}
        >
          <img 
            src={isLiked ? fullHeart : emptyHeart} 
            alt={isLiked ? 'Full Heart' : 'Empty Heart'}
            className='w-20 h-20'
          />
          <p className="text-sm text-[#595959]">{isLiked ? 'Added!' : '찜하기'}</p>
        </button>
      )}
    </>
  );
};

export default WishListButton;
