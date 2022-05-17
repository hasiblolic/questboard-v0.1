import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fieldService from './field-service';

const initialState = {
    fields: [],
    isSuccess: false,
    isLoading: false,
    isError: false,
    message: '',
}

// create new field
export const createField = createAsyncThunk('fields/create', async(field, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await fieldService.createField(field, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getFields = createAsyncThunk('fields/get', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await fieldService.getFields(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateField = createAsyncThunk('fields/update', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await fieldService.updateField(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteField = createAsyncThunk('fields/delete', async(id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await fieldService.deleteField(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const fieldSlice = createSlice({
    name: 'fields',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createField.pending, (state) => {
                // decide what to do with state while pending
                state.isLoading = true;
            })
            .addCase(createField.fulfilled, (state, action) => {
                state.isLoading = false;
                // payload gets returned up above in the register function
                state.fields.push(action.payload);
                state.isSuccess = true;
            })
            .addCase(createField.rejected, (state, action) => {
                state.isLoading = false;
                // gets returned up above with the thunkAPI.rejectWithValue
                state.message = action.payload;
                state.isError = true;
            })
            .addCase(getFields.pending, (state) => {
                // decide what to do with state while pending
                state.isLoading = true;
            })
            .addCase(getFields.fulfilled, (state, action) => {
                state.isLoading = false;
                // payload gets returned up above in the register function
                state.fields = action.payload;
                state.isSuccess = true;
            })
            .addCase(getFields.rejected, (state, action) => {
                state.isLoading = false;
                // gets returned up above with the thunkAPI.rejectWithValue
                state.message = action.payload;
                state.isError = true;
            })
            .addCase(updateField.pending, (state) => {
                // decide what to do with state while pending
                state.isLoading = true;
            })
            .addCase(updateField.fulfilled, (state, action) => {
                state.isLoading = false;
                // payload gets returned up above in the register function
                state.fields = action.payload;
                state.isSuccess = true;
            })
            .addCase(updateField.rejected, (state, action) => {
                state.isLoading = false;
                // gets returned up above with the thunkAPI.rejectWithValue
                state.message = action.payload;
                state.isError = true;
            })
            .addCase(deleteField.pending, (state) => {
                // decide what to do with state while pending
                state.isLoading = true;
            })
            .addCase(deleteField.fulfilled, (state, action) => {
                state.isLoading = false;
                // payload gets returned up above in the register function
                state.fields = state.goals.filter((goal) => goal._id !== action.payload.id);
                state.isSuccess = true;
            })
            .addCase(deleteField.rejected, (state, action) => {
                state.isLoading = false;
                // gets returned up above with the thunkAPI.rejectWithValue
                state.message = action.payload;
                state.isError = true;
            })
    }
});

export const { reset } = fieldSlice.actions;
export default fieldSlice.reducer;