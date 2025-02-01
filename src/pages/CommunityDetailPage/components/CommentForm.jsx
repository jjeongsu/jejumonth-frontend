import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { commentCreateApi } from '../../../apis/commentCreateApi';
import { getCookie } from '../../../utils/cookie'; // 쿠키에서 토큰 가져오기

const CommentForm = ({ postId, onCommentCreated }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Redux에서 유저 정보 확인
  const user = useSelector((state) => state.user);
  const userId = user?.userId;

  // 쿠키에서 JWT 토큰 가져오기
  const token = getCookie('jwt');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 로그인 확인
    if (!token || !userId) {
      alert('로그인이 필요합니다.');
      navigate('/auth'); // 로그인 페이지로 이동
      return;
    }

    // 댓글 내용 확인
    if (!comment.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 댓글 생성 API 호출
      const newComment = await commentCreateApi(postId, comment.trim(), token);

      // 부모 컴포넌트로 새 댓글 전달
      if (onCommentCreated) {
        onCommentCreated(newComment);
      }

      setComment(''); // 댓글 작성 후 초기화
    } catch (error) {
      console.error('댓글 생성 실패:', error.response?.data || error.message);
      alert(
        error.response?.data?.message || '댓글 작성에 실패했습니다. 다시 시도해주세요.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col mt-30 mb-[70px]">
      <form onSubmit={handleSubmit} className="flex items-center w-full space-x-70">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="댓글을 입력해주세요..."
          className="w-[639px] h-[44px] p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          disabled={isSubmitting}
        ></textarea>

        <button
          type="submit"
          className={`w-[72px] h-[44px] bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition ml-[50px] ${
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? '작성 중...' : '등록'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
