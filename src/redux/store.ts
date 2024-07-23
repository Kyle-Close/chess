import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './slices/board';
import { gameInfoSlice } from './slices/gameInfo';
import { playerSlice } from './slices/player';
import { timerSlice } from './slices/timer';

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  reducer: combineSlices(boardSlice, gameInfoSlice, playerSlice, timerSlice),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
