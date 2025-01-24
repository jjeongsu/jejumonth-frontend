import axios from 'axios';
import { serverURL } from './endpoints';

export const getUserPost = async userId => {
  try {
    const response = await axios.get(`${serverURL}/posts/author/${userId}`);

    const resopnseData = await response.data;
    return resopnseData;
  } catch (error) {
    console.error('유저의 포스트를 불러오지 못했습니다.', error);
    throw new Error('채널 데이터를 불러오는 데 실패했습니다.');
  }
};
