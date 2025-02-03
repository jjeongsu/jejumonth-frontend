import axios from 'axios';
import { serverURL } from './endpoints';
import { getCookie } from '../utils/cookie';

export const createLikesApi = async (postId) => {
  const token = getCookie('jwt');
  const response = await axios.post(`${serverURL}/likes/create`, { postId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteLikesApi = async (likeId, token) => {
  console.log('likeId: ', likeId);
  const response = await axios.delete(`${serverURL}/likes/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: { id: likeId },
  });
  return response.data;
};