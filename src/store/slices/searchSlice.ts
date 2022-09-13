import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

export const searchByName = createAsyncThunk('searchByName', async (query: string) => {
  const response = await axios.get(query);
  return response.data as IResponseData;
});

interface IResponseData {
  data: IItem[];
}
interface IInitialState {
  loading: string;
  error: null | string | undefined;
  results: IItem[] | null;
  visible: boolean;
}
export interface IItem {
  url: string;
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
    };
  };
  type: string;
  year: number;
  status: string;
  genres: [];
  synopsis: string;
  score: number;
}

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    loading: 'idle',
    error: null,
    results: null,
  } as IInitialState,
  reducers: {
    changeVisible: (state, action: PayloadAction<boolean>) => {
      state.visible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchByName.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(searchByName.fulfilled, (state, action) => {
        state.results = action.payload.data;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(searchByName.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectResults = (state: RootState) => state.search.results;

export default searchSlice.reducer;
