import devAPI from '../config/axiosDevConfig';
import { POST } from './endpoints';
// TODO(동현) : 해당 파일은 삭제되어야 합니다.
// TODO(동현) : 해당 함수를 postAPI로 옮겨주세요.
export const getUserPost = async userId => {
  try {
    const response = await devAPI.get(POST.getAuthorPost(userId));

    return response.data;
  } catch (error) {
    console.error('유저의 포스트를 불러오지 못했습니다.', error);
    throw new Error('채널 데이터를 불러오는 데 실패했습니다.');
  }
};

// TODO(동현) : 해당 함수는 삭제해주세요. 대신 userApi.js에 있는 getUserApi함수를 사용해주세요.
export const getUserData = async userId => {
  try {
    const response = await devAPI.get(`/users/${userId}`);

    return response.data;
  } catch (error) {
    console.error('유저의 데이터를 불러오지 못했습니다.', error);
    throw new Error('유저의 데이터를 불러오는 데 실패했습니다.');
  }
};
