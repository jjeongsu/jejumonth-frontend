import axios from 'axios';
import { POST } from './endpoints';
import { getCookie } from '../utils/cookie';

// TODO(수관) : 해당 파일 없애고 createPostApi로 이름 변경 후 postApi.js파일로 옮기기
export const createPost = async formData => {
  const token = getCookie('jwt');

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  try {
    const response = await axios.post(POST.create, formData, {
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
