import React, { useState } from 'react';
import deleteIcon from '../../../../public/icons/delete.svg';
import { deleteCommentApi } from '../../../apis/commentCreateApi';

const CommentDelete = ({ commentId, userId, authorId, isLoggedIn, onDelete }) => {
  const [loading, setLoading] = useState(false);
  console.log("CommentDelete - props:", { commentId, userId, authorId, isLoggedIn });
  
  const isAuthor = isLoggedIn && String(userId) === String(authorId);

  if (!isAuthor) return null;

  const handleDeleteComment = async () => {
    console.log("삭제 요청 - commentId:", commentId);
    if (!window.confirm('정말 이 댓글을 삭제하시겠습니까?')) return;
    try {
      setLoading(true);
      await deleteCommentApi(commentId);
      onDelete(commentId);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      alert('댓글 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleDeleteComment} disabled={loading} className="hover:opacity-75">
      <img src={deleteIcon} alt="댓글 삭제" className="w-[20px] h-[20px] mr-500" />
    </button>
  );
};

export default CommentDelete;
