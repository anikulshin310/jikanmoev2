import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import typeContentReducer from './slices/typeContentSlice';
import searchReducer from './slices/searchSlice';
import titleContentReducer from './slices/titleContentSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    typeContent: typeContentReducer,
    titleContent: titleContentReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
