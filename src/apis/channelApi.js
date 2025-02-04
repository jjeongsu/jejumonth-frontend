import devAPI from '../config/axiosDevConfig';

export const fetchChannels = async () => {
  try {
    const response = await devAPI.get('/channels');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch channels:', error);
    throw new Error('채널 데이터를 불러오는 데 실패했습니다.');
  }
};
