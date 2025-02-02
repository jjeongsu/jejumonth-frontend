const VISIT_JEJU_BASE_URL = import.meta.env.VITE_VISIT_JEJU_BASE_URL;
const VISIT_JEJU_API_KEY = import.meta.env.VITE_VISITJEJU_KEY;
import axios from 'axios';

const jejuAPI = axios.create({
  baseURL: VISIT_JEJU_BASE_URL,
  timeout: 3000,
  params: {
    apiKey: VISIT_JEJU_API_KEY,
    locale: 'kr',
  },
});

// api 요청시 새로운 params를 추가하려면
// params: {
//   ...jejuAPI.defaults.params, // ✅ 기존 params를 복사
//   title: targetWord,
//   category: updatedCategory,
// },
export default jejuAPI;
