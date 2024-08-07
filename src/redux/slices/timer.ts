import { PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

interface Timer {
  id: string;
  isOn: boolean;
  remainingSeconds: number;
}

const timerAdapter = createEntityAdapter<Timer>();

export const timerSlice = createSlice({
  name: 'timer',
  initialState: timerAdapter.getInitialState(),
  reducers: {
    removeAllTimers: timerAdapter.removeAll,
    createTimer: {
      reducer: (state, action: PayloadAction<Timer>) => {
        timerAdapter.addOne(state, action.payload);
      },
      prepare: (remainingSeconds: number) => ({
        payload: { remainingSeconds, id: nanoid(), isOn: false },
      }),
    },
    setIsOn(state, action: PayloadAction<{ id: string; isOn: boolean }>) {
      const { id, isOn } = action.payload;
      const entity = state.entities[id];
      if (entity) {
        entity.isOn = isOn;
      }
    },
    setRemainingSeconds(state, action: PayloadAction<{ id: string; remainingSeconds: number }>) {
      const { id, remainingSeconds } = action.payload;
      const entity = state.entities[id];
      if (entity) {
        entity.remainingSeconds = remainingSeconds;
      }
    },
    decrementRemainingSeconds(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      const entity = state.entities[id];
      if (entity && entity.remainingSeconds !== 0) {
        entity.remainingSeconds -= 1;
      }
    },
    addRemainingSeconds(state, action: PayloadAction<{ id: string; secondsToAdd: number }>) {
      const { id, secondsToAdd } = action.payload;
      const entity = state.entities[id];
      if (entity) {
        entity.remainingSeconds += secondsToAdd;
      }
    },
    pauseAllTimers(state) {
      const updated = state.ids.map((id) => ({
        id,
        changes: { isOn: false },
      }));

      timerAdapter.updateMany(state, updated);
    },
  },
});

export const {
  createTimer,
  removeAllTimers,
  setIsOn,
  setRemainingSeconds,
  decrementRemainingSeconds,
  addRemainingSeconds,
  pauseAllTimers,
} = timerSlice.actions;

export default timerSlice.reducer;

// Selectors
export const { selectById: selectTimerById, selectAll: selectAllTimers } =
  timerAdapter.getSelectors(
    (state: { timer: ReturnType<typeof timerSlice.reducer> }) => state.timer
  );
