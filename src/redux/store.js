import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './slices/user.slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // ? 창이 닫힐 때 유저정보가 삭제되길 원한다면 session storage로 변경

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const persistConfig = {
  key: 'root',
  storage, // 기본적으로는 local storage
  whitelist: ['user'], // 'user'리듀서만 persist하게 설정
};
export default store;
