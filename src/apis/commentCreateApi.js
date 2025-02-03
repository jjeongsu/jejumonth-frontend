import axios from 'axios';
import { serverURL } from './endpoints';
import { getCookie } from '../utils/cookie';

export const commentCreateApi = async (postId, comment, token) => {
  try {
    const response = await axios.post(
      `${serverURL}/comments/create`,
      {
        postId,
        comment,
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('댓글 생성 실패:', error.response?.data || error.message);
    throw new Error('댓글 생성 중 문제가 발생했습니다.');
  }
};

export const deleteCommentApi = async (commentId) => {
  try {
    const token = getCookie('jwt');
    const response = await axios.delete(`${serverURL}/comments/delete`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        id: commentId
      }
    });
    return response.data;
  } catch (error) {
    console.error('댓글 삭제 실패:', error.response?.data || error.message);
  }
}

export const commentDeleteApi = async commentID => {
  const token = getCookie('jwt');

  try {
    const response = await axios.delete(`${serverURL}/comments/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id: commentID },
    });

    return response.data;
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error.response?.data || error.message);
    throw error;
  }
};