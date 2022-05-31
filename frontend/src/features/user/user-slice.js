import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './user-service';

const initialState = {
    user: null,
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: '',
}

export const getUserProfile = createAsyncThunk(
  // action type string
  'user/profile',
  // callback function
  async (thunkAPI) => {
    try {
      // getting user from authtoken
      return await userService.getUserProfile();
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
});

export const updateUserPhotoURL = createAsyncThunk(
  'user/update/photo',
  async (imageUpload, thunkAPI) => {
    try {
      return await userService.updateUserPhotoURL(imageUpload);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
}); 

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isSuccess = false;
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        // decide what to do with state while pending
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // gets returned up above with the thunkAPI.rejectWithValue
        state.message = action.payload;
        // something went wrong so setting user to null
        state.user = null;
      })
      .addCase(updateUserPhotoURL.pending, (state) => {
        // decide what to do with state while pending
        state.isLoading = true;
      })
      .addCase(updateUserPhotoURL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(updateUserPhotoURL.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // gets returned up above with the thunkAPI.rejectWithValue
        state.message = action.payload;
        // something went wrong so setting user to null
        state.user = null;
      })
  }
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;