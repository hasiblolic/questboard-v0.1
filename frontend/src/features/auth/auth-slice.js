import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './auth-service';

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: '',
}

// signup user
export const signup = createAsyncThunk('auth/signup', async(user, thunkAPI) => {
  try {
    return await authService.signup(user);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// signin user
export const signin = createAsyncThunk('auth/signin', async(user, thunkAPI) => {
  try {
    return await authService.signin(user);
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
      .addCase(signup.pending, (state) => {
          // decide what to do with state while pending
          state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          // payload gets returned up above in the signup function
          state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          // gets returned up above with the thunkAPI.rejectWithValue
          state.message = action.payload;
          // something went wrong so setting user to null
          state.user = null;
      })
      .addCase(signin.pending, (state) => {
          // decide what to do with state while pending
          state.isLoading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          // payload gets returned up above in the signin function
          state.user = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          // gets returned up above with the thunkAPI.rejectWithValue
          state.message = action.payload;
          // something went wrong so setting user to null
          state.user = null;
      })
      .addCase(signout.fulfilled, (state) => {
          state.user = null;
      })
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;