import devAPI from '../config/axiosDevConfig';

export const getUserPost = async userId => {
  try {
    const response = await devAPI.get(`/posts/author/${userId}`);

    return response.data;
  } catch (error) {
    console.error('유저의 포스트를 불러오지 못했습니다.', error);
    throw new Error('채널 데이터를 불러오는 데 실패했습니다.');
  }
};

export const getUserData = async userId => {
  try {
    const response = await devAPI.get(`/users/${userId}`);

    return response.data;
  } catch (error) {
    console.error('유저의 데이터를 불러오지 못했습니다.', error);
    throw new Error('유저의 데이터를 불러오는 데 실패했습니다.');
  }
};
