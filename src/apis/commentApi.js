import devAPI from '../config/axiosDevConfig';
import { COMMENT } from './endpoints';

export const commentCreateApi = async (postId, comment) => {
  try {
    const response = await devAPI.post(COMMENT.create, {
      postId,
      comment,
    });
    return response.data;
  } catch (error) {
    console.error('댓글 생성 실패:', error.response?.data || error.message);
    throw new Error('댓글 생성 중 문제가 발생했습니다.');
  }
};

export const deleteCommentApi = async commentId => {
  try {
    const response = await devAPI.delete(COMMENT.delete, {
      data: { id: commentId },
    });
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 실패:', error.response?.data || error.message);
  }
};

// TODO (동현) : commentDeleteApi함수는 삭제해주세요. 기존 사용처에서는 deleteCommentApi를 사용해주세요
export const commentDeleteApi = async commentID => {
  try {
    const response = await devAPI.delete(`/comments/delete`, { id: commentID });

    return response.data;
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};
