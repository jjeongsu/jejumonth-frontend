import { serverURL } from './endpoints';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getCookie } from '../utils/cookie';
// TODO : Error message template 생성
// TODO : req 확인 후 console.log 제거
export const postSignupApi = async data => {
  const { email, password, nickname } = data;

  const url = `${serverURL}/signup`;
  try {
    const response = await axios.post(url, {
      email,
      password,
      fullName: nickname,
    });
    console.log('sign up res', response);
    if (!response.ok) {
      console.log('sign up api 문제');
    }
    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const postSigninApi = async data => {
  const { email, password } = data;
  const url = `${serverURL}/login`;

  try {
    const response = await axios.post(url, {
      email,
      password,
    });

    console.log('login res', response);

    const data = response.data;
    const token = data.token;
    const decoded = jwtDecode(token);
    console.log('decoded', decoded);

    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

// TODO jwt의 추가를 axios interceptor로 처리
export const postProfileImage = async data => {
  const url = `${serverURL}/users/upload-photo`;

  const jwt = getCookie('jwt');
  try {
    // 헤더 추가
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putUserPassword = async data => {
  const { password } = data;
  const url = `${serverURL}/settings/update-password`;

  const jwt = getCookie('jwt');

  try {
    const response = await axios.put(
      url,
      {
        password,
      },
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putUserFullname = async data => {
  const { fullName } = data;
  const url = `${serverURL}/settings/update-user`;
  const jwt = getCookie('jwt');
  try {
    const response = await axios.put(
      url,
      {
        fullName,
        userName: fullName,
      },
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserApi = async userId => {
  const url = `${serverURL}/users/delete-user`;
  const jwt = getCookie('jwt');
  try {
    const response = await axios.delete(
      url,
      {
        id: userId,
      },
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postLogoutUserApi = async () => {
  const url = `${serverURL}/logout`;
  const jwt = getCookie('jwt');

  try {
    const response = await axios.post(url, {
      headers: {
        Authorization: `bearer ${jwt}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getUserFullNameApi = async () => {
  try {
    const token = localStorage.getItem('token');

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

const decodeToken = token => {
  try {
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error('JWT 디코딩 실패:', error);
    return null;
  }
};
