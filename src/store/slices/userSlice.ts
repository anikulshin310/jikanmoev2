import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { RootState } from '../store';

export const userLogin = createAsyncThunk('login', async (query: string, thunkAPI) => {
  const response = await axios.post('https://www.mecallapi.com/api/login', query, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});
export const userRegister = createAsyncThunk('register', async (query: string, thunkAPI) => {
  const response = await axios.post('https://www.mecallapi.com/api/users/create', query, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
});

interface IUser {
  id: number;
  fname: string;
  lname: string;
  username: string;
  email: string;
  avatar: string;
}
interface IInitialState {
  user: IUser | null;
  loading: string;
  error: null | string | undefined;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: 'idle',
    error: null,
  } as IInitialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.loading = 'idle';

        if (action.payload.status === 'error') {
          state.error = 'User with this E-mail adress already exists';
        }
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = 'failed';

        state.error = action.error.message;
      });
  },
});
export const userSelector = (state: RootState) => state.user.user;
export const userErrorSelector = (state: RootState) => state.user.error;
export const { logout } = userSlice.actions;
export default userSlice.reducer;
