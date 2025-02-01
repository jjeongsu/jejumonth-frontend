import axios from 'axios';
import { serverURL } from './endpoints';

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
