import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';
import { IItem } from './searchSlice';

export const userLogin = createAsyncThunk('login', async (query: string, thunkAPI) => {
  const response = await axios.post('https://www.mecallapi.com/api/login', query, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

export interface IUser {
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
  favorites: {
    [anime: string]: IItem[];
    manga: IItem[];
  };
  type: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: 'idle',
    error: null,
    favorites: {
      anime: [],
      manga: [],
    },
    type: 'anime',
  } as IInitialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.favorites.manga = [];
      state.favorites.anime = [];
    },
    changeType: (state, action) => {
      state.type = action.payload;
    },
    addToFavorites: (state, action) => {
      if (state.user) {
        state.favorites[state.type].push(action.payload);
      }
    },
    deleteFromFavorites: (state, action) => {
      if (state.user) {
        const itemToDelete = state.favorites[state.type].findIndex(
          (item) => item.mal_id === action.payload.mal_id
        );
        state.favorites[state.type].splice(itemToDelete, 1);
      }
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
      .addCase(userLogin.rejected, (state) => {
        state.loading = 'failed';
        state.error = 'Invalid login or password';
      });
  },
});
export const userSelector = (state: RootState) => state.user.user;
export const userErrorSelector = (state: RootState) => state.user.error;
export const userFavoritesSelector = (state: RootState) => state.user.favorites;
export const { logout, changeType, addToFavorites, deleteFromFavorites } = userSlice.actions;
export default userSlice.reducer;
