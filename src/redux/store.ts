import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { boardSlice } from './slices/board';
import { gameInfoSlice } from './slices/gameInfo';
import { playerSlice } from './slices/player';
import { timerSlice } from './slices/timer';
import { castleRightsSlice } from './slices/castleRights';
import { gameSettingsSlice } from './slices/gameSettings';
import { saveStateToLS } from './saveStateToLS';
import { getStateFromLS } from './getStateFromLS';
import { moveSlice } from './slices/move';

// Automatically adds the thunk middleware and the Redux DevTools extension
const store = configureStore({
  reducer: combineSlices(
    boardSlice,
    gameInfoSlice,
    playerSlice,
    timerSlice,
    castleRightsSlice,
    gameSettingsSlice,
    moveSlice
  ),
  preloadedState: getStateFromLS(),
});

store.subscribe(() => {
  const state = store.getState();

  saveStateToLS(state);
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
