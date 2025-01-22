import axios from 'axios';

export async function getPlaceBySearchApi(targetWord) {
  const result = await axios.get('/api/vsjApi/contents/searchList', {
    params: {
      apiKey: import.meta.env.VITE_VISITJEJU_KEY,
      locale: 'kr',
      title: targetWord,
    },
  });
  return result;
}

export async function getPlaceByExplanationApi(targetWord) {
  if (!import.meta.env.VITE_VISITJEJU_KEY) {
    throw new Error('API 키가 설정되어 있지 않습니다.');
  }

  try {
    const response = await axios.get('/api/vsjApi/contents/searchList', {
      params: {
        apiKey: import.meta.env.VITE_VISITJEJU_KEY,
        locale: 'kr',
        cid: targetWord,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('API 호출 중 오류가 발생했습니다:', error);
    throw error;
  }
}
