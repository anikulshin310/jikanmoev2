import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchTitle = createAsyncThunk('searchTitle', async (query: string, thunkAPI) => {
  const response = await axios.get(query);

  return response.data;
});

interface IInitialState {
  loading: string;
  error: null | string | undefined;
  result: Record<string, unknown> | null;
}

export const titleContentSlice = createSlice({
  name: 'typeContent',
  initialState: {
    loading: 'loading',
    error: null,
    result: null,
  } as IInitialState,
  reducers: {
    clear: (state) => {
      state.result = null;
      state.loading = 'loading';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTitle.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(searchTitle.fulfilled, (state, action) => {
        state.result = action.payload.data;

        state.loading = 'idle';
        state.error = null;
      })
      .addCase(searchTitle.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectTitleResult = (state: any) => state.titleContent.result;
export const selectTitleLoading = (state: any) => state.titleContent.loading;
export const { clear } = titleContentSlice.actions;

export default titleContentSlice.reducer;
