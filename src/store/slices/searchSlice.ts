import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const searchByName = createAsyncThunk('searchByName', async (query: string, thunkAPI) => {
  const response = await axios.get(query);
  return response.data;
});

interface IInitialState {
  loading: string;
  error: null | string | undefined;
  results: [];
  visible: boolean;
}

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    loading: 'idle',
    error: null,
    results: [],
  } as IInitialState,
  reducers: {
    changeVisible: (state, action) => {
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

export const selectResults = (state: any) => state.search.results;
export const selectType = (state: any) => state.search.type;

export default searchSlice.reducer;
