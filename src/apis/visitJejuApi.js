import axios from 'axios';

export async function getPlaceBySearchApi(targetWord) {
  const result = await axios.get('https://api.visitjeju.net/vsjApi/contents/searchList', {
    params: {
      apiKey: import.meta.env.VITE_VISITJEJU_KEY,
      locale: 'kr',
      title: targetWord,
    },
  });
  return result;
}
