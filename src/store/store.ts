import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import typeContentReducer from './slices/typeContentSlice';
import searchReducer from './slices/searchSlice';
import titleContentReducer from './slices/titleContentSlice';
import userReducer from './slices/userSlice';
import registrationReducer from './slices/registrationSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    typeContent: typeContentReducer,
    titleContent: titleContentReducer,
    user: userReducer,
    registration: registrationReducer,
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
