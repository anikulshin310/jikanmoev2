import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ITitleContentRecommendations } from '../../entities/TitleContent/TitleContentRecommendations';
import type { RootState } from '../store';
import type { IItem } from './searchSlice';

export const searchTitle = createAsyncThunk('searchTitle', async (query: string, thunkAPI) => {
  const response = await axios.get(query);

  return response.data;
});
export const searchRecommendations = createAsyncThunk(
  'titleRecommendations',
  async (query: string, thunkAPI) => {
    const response = await axios.get(query);

    return response.data;
  }
);

interface IInitialState {
  loading: string;
  error: null | string | undefined;
  result: IItem | null;
  recommendations: ITitleContentRecommendations | null;
}

export const titleContentSlice = createSlice({
  name: 'typeContent',
  initialState: {
    loading: 'loading',
    error: null,
    result: null,
    recommendations: null,
  } as IInitialState,
  reducers: {
    clear: (state) => {
      state.result = null;
      state.recommendations = null;
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
      })
      .addCase(searchRecommendations.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(searchRecommendations.fulfilled, (state, action) => {
        state.recommendations = action.payload.data;

        state.loading = 'idle';
        state.error = null;
      })
      .addCase(searchRecommendations.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectTitleResult = (state: RootState) => state.titleContent.result;
export const selectTitleRecommendations = (state: RootState) => state.titleContent.recommendations;
export const selectTitleLoading = (state: RootState) => state.titleContent.loading;
export const { clear } = titleContentSlice.actions;

export default titleContentSlice.reducer;
