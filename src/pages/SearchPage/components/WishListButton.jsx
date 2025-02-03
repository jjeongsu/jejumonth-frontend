import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addUserLikedPlace,
  fetchUserLikedPlaces,
  removeUserLikedPlace,
} from '../../../redux/slices/wishlist.slice';
import { setUser } from '../../../redux/slices/user.slice';

const WishListButton = ({ placeInfo }) => {
  const dispatch = useDispatch();
  const { likedPlaces } = useSelector(state => state.wishlist);
  const { isLoggedIn, userId } = useSelector(state => state.user);

  console.log('placeInfo!!!!!!!!!!!!!!!!!!!!!!!!', placeInfo);

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

  const isLiked =
    Array.isArray(likedPlaces) &&
    likedPlaces.some(place => {
      return place.content_id === placeInfo.contentsid;
    });

  console.log(
    '이게 뭐지?!?!?!?!?',
    likedPlaces.some(place => {
      place.content_id;
    }),
  );

  console.log('실화입니까?!?!!?!', placeInfo);

  console.log('isLiked ', isLiked);
  console.log('이즈로그인', likedPlaces);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserLikedPlaces({ userId }));
    }
  }, [isLoggedIn, userId, dispatch]);

  const handleWishlistClick = e => {
    e.stopPropagation();
    console.log('안녕하세요');
    if (isLiked) {
      dispatch(removeUserLikedPlace({ userId, contentId: placeInfo.contentsid })).then(() => {
        dispatch(fetchUserLikedPlaces({ userId }));
      });
    } else {
      dispatch(addUserLikedPlace({ userId, placeInfo })).then(() => {
        dispatch(fetchUserLikedPlaces({ userId }));
      });
    }
  };
  return (
    <>
      {isLoggedIn && (
        <button onClick={handleWishlistClick}>
          <img
            src={isLiked ? '/icons/fullHeart.svg' : '/icons/emptyHeart.svg'}
            className="w-21 h-19"
            alt="스크랩 아이콘"
          />
        </button>
      )}
    </>
  );
};

export default WishListButton;

WishListButton.prototype = {
  placeInfo: PropTypes.string.isRequired,
};
