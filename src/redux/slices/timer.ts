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
      const { id } = action.payload;
      state.entities[id].isOn = action.payload.isOn;
    },
    setRemainingSeconds(state, action: PayloadAction<{ id: string; remainingSeconds: number }>) {
      state.entities[action.payload.id].remainingSeconds = action.payload.remainingSeconds;
    },
    decrementRemainingSeconds(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      state.entities[id].remainingSeconds = state.entities[id].remainingSeconds - 1;
    },
    addRemainingSeconds(state, action: PayloadAction<{ id: string; secondsToAdd: number }>) {
      const { id, secondsToAdd } = action.payload;
      state.entities[id].remainingSeconds = state.entities[id].remainingSeconds + secondsToAdd;
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
} = timerSlice.actions;

export default timerSlice.reducer;

// Selector
export const { selectById: selectTimerById, selectAll: selectAllTimers } =
  timerAdapter.getSelectors(
    (state: { timer: ReturnType<typeof timerSlice.reducer> }) => state.timer
  );
