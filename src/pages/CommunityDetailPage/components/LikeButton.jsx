import React, { useState } from 'react';
import { createLikesApi, deleteLikesApi } from '../../../apis/likesApi';
import { getCookie } from '../../../utils/cookie';
import LikeIcon from './icon/LikeIcon';
import { useSelector } from 'react-redux';

const LikeButton = ({
  postId,
  initialLikeCount = 0,
  initialLiked = false,
  initialLikeId = null,
  handlePostLike,
  handleDeleteLike,
}) => {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(initialLiked);
  const [likeId, setLikeId] = useState(initialLikeId);
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.user);
  const token = getCookie('jwt');
  console.log('token:', token);

  const handleLikeToggle = async () => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!token) {
      alert('토큰이 유효하지 않습니다.');
      return;
    }

    setLoading(true);
    try {
      if (!liked) {
        const data = await createLikesApi(postId, token);
        console.log('create like response: ', data);
        setLikeId(data._id);
        setLikeCount(data.likeCount !== undefined ? data.likeCount : likeCount + 1);
        setLiked(true);
        handlePostLike();
      } else {
        console.log('현재 likeId:', likeId);
        const data = await deleteLikesApi(likeId, token);
        console.log('delete like response: ', data);
        setLikeCount(data.likeCount !== undefined ? data.likeCount : Math.max(likeCount - 1, 0));
        setLiked(false);
        setLikeId(null);
        handleDeleteLike();
      }
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      alert('좋아요 처리를 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLikeToggle}
      disabled={loading}
      className="flex items-center space-x-2 cursor-pointer focus:outline-none"
    >
      <LikeIcon active={liked}/>
      <span className={`text-sm ${liked ? 'text-orange-500' : 'text-gray-500'}`}>{likeCount}</span>
    </button>
  );
};

export default LikeButton;
