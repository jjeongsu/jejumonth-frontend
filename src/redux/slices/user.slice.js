import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userEmail: '',
  userId: '',
  userFullName: '',
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, action) => {
      const userData = action.payload;
      state.userEmail = userData.userEmail;
      state.userId = userData.userId;
      state.userFullName = userData.userFullName;
    },
  },
});

export const userReducer = userSlice.reducer;

export const { setUser } = userSlice.actions;
