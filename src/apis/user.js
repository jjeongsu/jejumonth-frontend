import { serverURL } from './endpoints';
import axios from 'axios';

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

    return response.data;
  } catch (error) {
    console.log('error', error);
  }
};

