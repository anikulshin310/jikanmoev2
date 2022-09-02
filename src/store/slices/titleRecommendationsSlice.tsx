import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
  result: Record<string, unknown> | null;
}

export const titleRecommendationsSlice = createSlice({
  name: 'titleRecommendations',
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
      .addCase(searchRecommendations.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(searchRecommendations.fulfilled, (state, action) => {
        state.result = action.payload.data;

        state.loading = 'idle';
        state.error = null;
      })
      .addCase(searchRecommendations.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectRecommendationResult = (state: any) => state.titleRecommendations.result;
export const selectRecommendationLoading = (state: any) => state.titleRecommendations.loading;
export const { clear } = titleRecommendationsSlice.actions;

export default titleRecommendationsSlice.reducer;
