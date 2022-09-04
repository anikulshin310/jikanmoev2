import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

export const searchTypeTop = createAsyncThunk('searchTop', async (query: string, thunkAPI) => {
  const response = await axios.get(query);

  return response.data;
});

interface IInitialState {
  loading: string;
  error: null | string | undefined;
  resultsTop: any;
  type: string;
  page: number;
  hasNextPage: boolean;
}

export const typeContentSlice = createSlice({
  name: 'typeContent',
  initialState: {
    loading: 'loading',
    error: null,
    resultsTop: [],
    page: 1,
    hasNextPage: true,
  } as IInitialState,
  reducers: {
    loadMore: (state) => {
      if (state.hasNextPage) {
        state.page += 1;
      }
    },
    clear: (state) => {
      state.page = 1;
      state.resultsTop = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchTypeTop.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(searchTypeTop.fulfilled, (state, action) => {
        if (state.page === 1) {
          state.resultsTop = action.payload.data;
        } else {
          state.resultsTop.push(...action.payload.data);
        }
        state.hasNextPage = action.payload.pagination.has_next_page;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(searchTypeTop.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectTopResults = (state: RootState) => state.typeContent.resultsTop;
export const selectTopType = (state: RootState) => state.typeContent.type;
export const selectHasNextPage = (state: RootState) => state.typeContent.hasNextPage;
export const selectPage = (state: RootState) => state.typeContent.page;
export const selectLoading = (state: RootState) => state.typeContent.loading;
export const { loadMore, clear } = typeContentSlice.actions;

export default typeContentSlice.reducer;
