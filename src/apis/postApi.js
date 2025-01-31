import axios from 'axios';
import { serverURL } from './endpoints';

export const getPostByChannelApi = async channelId => {
  try {
    const response = await axios.get(`${serverURL}/posts/channel/${channelId}`, {
      headers: { Accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('채널 게시글 가져오기 실패:', error);
    throw new Error('채널 게시글을 가져오는 데 실패했습니다.');
  }
};

export const getChannelNameByIdApi = async channelId => {
  try {
    const response = await axios.get(`${serverURL}/posts/channel/${channelId}`, {
      headers: { Accept: 'application/json' },
    });

    if (response.data.name) {
      return response.data.name;
    } else {
      throw new Error('채널 이름이 응답에 포함되어 있지 않습니다.');
    }
  } catch (error) {
    console.error('채널 이름 가져오기 실패:', error);
    throw new Error('채널 이름을 가져오는 데 실패했습니다.');
  }
};

export const deletePostApi = async contentID => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
  try {
    const response = await axios.delete(`${serverURL}/posts/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: { contentID },
    });

    return response.data;
  } catch (error) {
    console.error('게시글 삭제에 실패했습니다.', error);
    throw new Error('게시글 삭제에 실패했습니다');
  }
};
