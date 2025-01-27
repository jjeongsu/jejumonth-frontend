import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  userEmail: '',
  userFullName: '',
  // isLoggedIn: false, 로그인 테스트용 지우셔도 됩니다.
};

export const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, action) => {
      const userData = action.payload;
      state.userId = userData.userId;
      state.userEmail = userData.userEmail;
      state.userFullName = userData.userFullName;
      // state.isLoggedIn = true; 로그인 테스트용입니다 지우셔도 됩니다.
    },
  },
});

export const userReducer = userSlice.reducer;

export const { setUser } = userSlice.actions;
