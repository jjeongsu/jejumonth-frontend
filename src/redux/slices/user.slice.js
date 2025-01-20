import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  userEmail: '',
  userFullName: '',
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
    },
  },
});

export const userReducer = userSlice.reducer;

export const { setUser } = userSlice.actions;
