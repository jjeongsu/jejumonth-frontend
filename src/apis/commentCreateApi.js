import devAPI from '../config/axiosDevConfig';

export const commentCreateApi = async (postId, comment, token) => {
  try {
    const response = await devAPI.post(`/comments/create`, {
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
    const response = await devAPI.delete(`/comments/delete`, { id: commentId });
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 실패:', error.response?.data || error.message);
  }
};

export const commentDeleteApi = async commentID => {
  try {
    const response = await devAPI.delete(`/comments/delete`, { id: commentID });

    return response.data;
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};
