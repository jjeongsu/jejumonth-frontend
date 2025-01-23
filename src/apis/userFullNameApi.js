import axios from 'axios';
import { serverURL } from './endpoints';

export const fetchFullName = async () => {
  try {
    const token =
      localStorage.getItem('token') ||
      // 커뮤니티 글 업로드시 유저 닉네임을 표시하는 테스트를 위해 임시로 토큰 설정 추후 삭제 후 아래 코드로 테스트 필요 !
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3OTA4ZGFlZThhMWU0MzQ5ZWQ3NmVjMiIsImVtYWlsIjoidGVzdCJ9LCJpYXQiOjE3Mzc1MjY3MDJ9.Zm8x7v2ZWGrWRwnBAimkPf4Nq88Sww0SIWxVBvBkWTU';

    if (!token) {
      throw new Error('토큰이 없습니다. 로그인이 필요합니다.');
    }


    const decodedToken = decodeToken(token);
    const userId = decodedToken?.user?._id;
    if (!userId) {
      throw new Error('토큰에 사용자 ID가 포함되어 있지 않습니다.');
    }


    const response = await axios.get(`${serverURL}/users/${userId}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.fullName || 'Guest'; 
  } catch (error) {
    console.error('사용자 이름 가져오기 실패:', error);
    throw new Error('사용자 이름을 가져오는 데 실패했습니다.');
  }
};


const decodeToken = (token) => {
  try {
    const payloadBase64 = token.split('.')[1]; 
    const decodedPayload = atob(payloadBase64); 
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('JWT 디코딩 실패:', error);
    return null; 
  }
};
