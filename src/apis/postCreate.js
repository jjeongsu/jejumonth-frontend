import axios from 'axios';
import { serverURL } from './endpoints';

export const createPost = async formData => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  try {
    const response = await axios.post(`${serverURL}/posts/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};
