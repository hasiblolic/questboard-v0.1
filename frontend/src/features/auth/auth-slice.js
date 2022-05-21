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

// register user
export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// login user
export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
  try {
    await authService.logout();
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
      .addCase(register.pending, (state) => {
          // decide what to do with state while pending
          state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          // payload gets returned up above in the register function
          state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          // gets returned up above with the thunkAPI.rejectWithValue
          state.message = action.payload;
          // something went wrong so setting user to null
          state.user = null;
      })
      .addCase(login.pending, (state) => {
          // decide what to do with state while pending
          state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          // payload gets returned up above in the login function
          state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          // gets returned up above with the thunkAPI.rejectWithValue
          state.message = action.payload;
          // something went wrong so setting user to null
          state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
          state.user = null;
      })
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;