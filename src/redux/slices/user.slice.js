import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  userEmail: null,
  userFullName: null,
  isLoggedIn: false,
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
      state.isLoggedIn = true;
    },
  },
});

export const userReducer = userSlice.reducer;

export const { setUser } = userSlice.actions;
