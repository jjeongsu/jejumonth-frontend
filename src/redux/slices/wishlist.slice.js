import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getUserLikedPlaceApi, 
  postUserLikedPlaceApi, 
  deleteUserLikedPlaceApi 
} from '../../apis/supabaseApi';

const initialState = {
  likedPlaces: [], 
  loading: false,
  error: null,
};

export const fetchUserLikedPlaces = createAsyncThunk(
  'wishlist/fetchUserLikedPlaces',
  async ({ userId, contentId }, thunkAPI) => {
    try {
      const response = await getUserLikedPlaceApi(userId, contentId);
      return response; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addUserLikedPlace = createAsyncThunk(
  'wishlist/addUserLikedPlace',
  async ({ userId, placeInfo }, thunkAPI) => {
    try {
      await postUserLikedPlaceApi(userId, placeInfo);
      return placeInfo;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeUserLikedPlace = createAsyncThunk(
  'wishlist/removeUserLikedPlace',
  async ({ userId, contentId }, thunkAPI) => {
    try {
      await deleteUserLikedPlaceApi(userId, contentId);
      return contentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserLikedPlaces.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserLikedPlaces.fulfilled, (state, action) => {
      state.loading = false;
      state.likedPlaces = action.payload;
    });
    builder.addCase(fetchUserLikedPlaces.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(addUserLikedPlace.fulfilled, (state, action) => {
      state.likedPlaces.push(action.payload);
    });
    builder.addCase(removeUserLikedPlace.fulfilled, (state, action) => {
      state.likedPlaces = state.likedPlaces.filter(
        (id) => id !== action.payload
      );
    });
  },
});

export default wishlistSlice.reducer;
