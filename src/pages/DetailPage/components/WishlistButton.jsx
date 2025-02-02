import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserLikedPlaces,
  addUserLikedPlace,
  removeUserLikedPlace,
} from '../../../redux/slices/wishlist.slice';
import fullHeart from '/icons/fullHeart.svg';
import emptyHeart from '/icons/emptyHeart.svg';
import { setUser } from '../../../redux/slices/user.slice';

const WishListButton = ({ placeInfo }) => {
  const dispatch = useDispatch();
  const { likedPlaces } = useSelector(state => state.wishlist);
  const { isLoggedIn, userId } = useSelector(state => state.user);

  // 디버깅: Redux 상태 확인
  // console.log('Redux likedPlaces:', likedPlaces);
  // console.log('Redux userId:', userId, 'isLoggedIn:', isLoggedIn);

  const isLiked =
    Array.isArray(likedPlaces) &&
    likedPlaces.some(place => {
      // console.log('Comparing place.content_id:', place.content_id, 'with placeInfo.contentId:', placeInfo.contentsid);
      return place.content_id === placeInfo.contentsid;
    });
  // console.log('Full likedPlaces from Redux:', likedPlaces);
  // console.log('Current placeInfo:', placeInfo);
  // 디버깅: 버튼 상태 확인
  // console.log('PlaceInfo:', placeInfo, 'Is Liked:', isLiked);

  // 로그인 상태 강제 설정 (테스트용)
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     console.log('Setting test user...');
  //     dispatch(
  //       setUser({
  //         isLoggedIn: true,
  //         userId: 'testUser123',
  //         userEmail: 'test@example.com',
  //         userFullName: 'Test User',
  //       })
  //     );
  //   }
  // }, [isLoggedIn, dispatch]);

  // 로그인 후 찜한 장소 데이터 가져오기
  useEffect(() => {
    if (isLoggedIn) {
      // console.log('Fetching liked places for user:', userId);
      dispatch(fetchUserLikedPlaces({ userId }));
    }
  }, [isLoggedIn, userId, dispatch]);

  const handleWishlistClick = () => {
    if (isLiked) {
      // console.log('Removing from wishlist:', placeInfo.contentsid);
      dispatch(removeUserLikedPlace({ userId, contentId: placeInfo.contentsid })).then(() => {
        // console.log('찜 삭제 후 최신 데이터 다시 가져오기');
        dispatch(fetchUserLikedPlaces({ userId }));
      });
    } else {
      // console.log('Adding to wishlist:', placeInfo);
      dispatch(addUserLikedPlace({ userId, placeInfo })).then(() => {
        dispatch(fetchUserLikedPlaces({ userId }));
      });
    }
  };

  return (
    <>
      {isLoggedIn && (
        <button
          onClick={handleWishlistClick}
          className="w-[110px] h-[45px] rounded-[25px] bg-neutral-100 flex items-center justify-center gap-2 shadow-md mr-20 mt-30"
          style={{
            boxShadow:
              '0px 35px 10px 0 rgba(97,97,97,0), 0px 22px 9px 0 rgba(97,97,97,0.01), 0px 13px 8px 0 rgba(97,97,97,0.05), 0px 6px 6px 0 rgba(97,97,97,0.09), 0px 1px 3px 0 rgba(97,97,97,0.1)',
          }}
        >
          <img
            src={isLiked ? fullHeart : emptyHeart}
            alt={isLiked ? 'Full Heart' : 'Empty Heart'}
            className="w-20 h-20"
          />
          <p className="text-sm text-[#595959]">{isLiked ? '찜제거' : '찜하기'}</p>
        </button>
      )}
    </>
  );
};

export default WishListButton;
