import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { RootState } from '../store';

export const userRegistration = createAsyncThunk('registration', async (query: string) => {
  const response = await axios.post('https://www.mecallapi.com/api/users/create', query, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
});

interface IInitialState {
  loading: string;
  error: null | string | undefined;
  message: null | string;
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    loading: 'idle',
    error: null,
    message: null,
  } as IInitialState,
  reducers: {
    clear: (state) => {
      state.loading = 'idle';
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.loading = 'idle';

        if (action.payload.status === 'error') {
          state.message = 'User with this E-mail adress already exists';
        } else {
          state.message = 'New account was successfully registered.';
        }
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.loading = 'failed';

        state.error = action.error.message;
      });
  },
});

export const registrationErrorSelector = (state: RootState) => state.registration.error;
export const registrationMessageSelector = (state: RootState) => state.registration.message;
export const { clear } = registrationSlice.actions;

export default registrationSlice.reducer;
