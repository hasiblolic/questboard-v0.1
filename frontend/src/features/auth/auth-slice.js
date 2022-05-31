import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './auth-service';

// get user from local storage
const userToken = JSON.parse(localStorage.getItem('user'));

const initialState = {
  userToken: userToken ? userToken : null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: '',
}

// signup or signin user
export const authUser = createAsyncThunk('auth/user', async (userData, thunkAPI) => {
  try {
    return await authService.authUser(userData);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const signout = createAsyncThunk('auth/signout', async (thunkAPI) => {
  try {
    await authService.signout();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
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
      .addCase(authUser.pending, (state) => {
          // decide what to do with state while pending
          state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          // payload gets returned up above in the signup function
          state.userToken = action.payload;
      })
      .addCase(authUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          // gets returned up above with the thunkAPI.rejectWithValue
          state.message = action.payload;
          // something went wrong so setting user to null
          state.userToken = null;
      })
      .addCase(signout.fulfilled, (state) => {
          state.userToken = null;
      })
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;