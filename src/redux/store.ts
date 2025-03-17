import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { timerSlice } from './slices/timer';
import { saveStateToLS } from './saveStateToLS';
import { getStateFromLS } from './getStateFromLS';
import { socketSlice } from './slices/socket';
import { chessApi } from './slices/chess-api';

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  reducer: combineSlices(
    timerSlice,
    socketSlice,
    chessApi
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chessApi.middleware),
  preloadedState: getStateFromLS(),
});

store.subscribe(() => {
  const state = store.getState();
  saveStateToLS(state);
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
