const DEV_SERVER_URL = import.meta.env.VITE_API_BASE_URL;
import axios from 'axios';
import { getCookie } from '@/utils/cookie';

const devAPI = axios.create({
  baseURL: DEV_SERVER_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onError = (status, message, errorDetail) => {
  const error = { status, message, errorDetail };
  throw error;
};

const onRequest = config => {
  const jwt = getCookie('jwt');
  if (jwt) {
    config.headers.Authorization = `bearer ${jwt}`;
  }
  return config;
};

const onErrorRequest = error => {
  return Promise.reject(error);
};

const onResponse = response => response;

const onErrorResponse = error => {
  if (axios.isAxiosError(error)) {
    const originalRequest = error.config;
    const { method, url } = originalRequest;
    const { data: message, status: statusCode, statusText } = error.response;

    // TODO : 배포 후 DEV상태에서만 로깅되도록 변경
    console.log(
      `[API] ${method.toUpperCase()} ${url} | ERROR ${statusCode} ${statusText} | ${message}`,
    );

    switch (statusCode) {
      case 400: {
        onError(statusCode, '잘못된 요청입니다.', message);
        break;
      }
      case 401: {
        onError(statusCode, '인증에 실패했습니다.', message);
        break;
      }
      case 403: {
        onError(statusCode, '권한이 없습니다.', message);
        break;
      }
      case 404: {
        onError(statusCode, '찾을 수 없는 페이지 입니다.', message);
        break;
      }
      case 500: {
        onError(statusCode, '서버 오류입니다.', message);
        break;
      }
      default: {
        onError(statusCode, '에러가 발생했습니다.', message);
      }
    }
  } else if (error && error.name === 'TimeoutError') {
    console.log(`[API] | Timeout ERROR ${error.toString()}`);
    onError(0, '요청시간이 초과되었습니다.', '');
  } else {
    console.log(`[API] | ERROR ${error.toString()}`);
    onError(0, '에러가 발생했습니다.', '');
  }
  return Promise.reject(error);
};

const setupInterCeptors = axiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onErrorRequest);
  axiosInstance.interceptors.response.use(onResponse, onErrorResponse);

  return axiosInstance;
};

setupInterCeptors(devAPI);

export default devAPI;
