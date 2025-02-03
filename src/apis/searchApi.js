import axios from 'axios';

const visitApi = axios.create({
  baseURL: 'https://api.visitjeju.net/vsjApi/contents/searchList',
  params: {
    apiKey: import.meta.env.VITE_VISITJEJU_KEY,
    locale: 'kr',
    // title: '섭지코지',
    // category: updatedCategory,
  },
});

// api 정보를 가져오기

export async function getList(query) {
  console.log('query', query);
  try {
    const response = await visitApi.get('', {
      params: query,
    });
    if (response.status !== 200) {
      throw 'state' + response.status;
    }
    return response.data;
  } catch (error) {
    console.log('search Error' + error);
  }
  return null;
}
