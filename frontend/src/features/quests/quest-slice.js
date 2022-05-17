import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import questService from './quest-service';

const initialState = {
  quests: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: '',
}

// create new quest
export const createQuest = createAsyncThunk('quests/create', async(quest, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await questService.createQuest(quest, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getQuests = createAsyncThunk('quests/get', async(_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await questService.getQuests(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateQuest = createAsyncThunk('quests/update', async(updatedQuest, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await questService.updateQuest(updatedQuest, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteQuest = createAsyncThunk('quests/delete', async(id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await questService.deleteQuest(id, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
})

export const questSlice = createSlice({
  name: 'quests',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      /*
        CREATE QUESTS
      */
      .addCase(createQuest.pending, (state) => {
        // decide what to do with state while pending
        state.isLoading = true;
      })
      .addCase(createQuest.fulfilled, (state, action) => {
        state.isLoading = false;
        // payload gets returned up above in the register function
        state.quests.push(action.payload);
        state.isSuccess = true;
      })
      .addCase(createQuest.rejected, (state, action) => {
        state.isLoading = false;
        // gets returned up above with the thunkAPI.rejectWithValue
        state.message = action.payload;
        state.isError = true;
      })
      /* 
        UPDATE QUESTS
      */
      .addCase(updateQuest.pending, (state) => {
        // decide what to do with state while pending
        state.isLoading = true;
      })
      .addCase(updateQuest.fulfilled, (state, action) => {
        state.quests = state.quests.map(quest => 
          quest._id === action.payload._id ? action.payload : quest
        )
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateQuest.rejected, (state, action) => {
        state.isLoading = false;
        // gets returned up above with the thunkAPI.rejectWithValue
        state.message = action.payload;
        state.isError = true;
      })
      /* 
        DELETE QUESTS
      */
      .addCase(deleteQuest.pending, (state) => {
        // decide what to do with state while pending
        state.isLoading = true;
      })
      .addCase(deleteQuest.fulfilled, (state, action) => {
        // filtering out quest that was deleted
        state.quests = state.quests.filter((quest) => quest._id !== action.payload._id);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteQuest.rejected, (state, action) => {
        state.isLoading = false;
        // gets returned up above with the thunkAPI.rejectWithValue
        state.message = action.payload;
        state.isError = true;
      })
      /* 
        GET QUESTS
      */
      .addCase(getQuests.pending, (state) => {
        // decide what to do with state while pending
        state.isLoading = true;
      })
      .addCase(getQuests.fulfilled, (state, action) => {
        state.isLoading = false;
        // payload gets returned up above in the register function
        state.quests = action.payload;
        state.isSuccess = true;
      })
      .addCase(getQuests.rejected, (state, action) => {
        state.isLoading = false;
        // gets returned up above with the thunkAPI.rejectWithValue
        state.message = action.payload;
        state.isError = true;
      })
    }
});

export const { reset } = questSlice.actions;
export default questSlice.reducer;