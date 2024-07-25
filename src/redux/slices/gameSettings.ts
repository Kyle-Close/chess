import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum GameType {
  LOCAL = 'LOCAL',
  COMPUTER = 'COMPUTER',
  ONLINE = 'ONLINE',
}

export enum TimeControl {
  FREE_PLAY = 'FREE PLAY',
  BLITZ = 'BLITZ',
  RAPID = 'RAPID',
  CLASSICAL = 'CLASSICAL',
}

export interface GameSettings {
  gameType: GameType;
  timeControl: TimeControl;
  isIncrement: boolean;
  isUndoRedo: boolean;
  isFiftyMoveRule: boolean;
}

const initialState = {
  gameType: GameType.LOCAL,
  timeControl: TimeControl.BLITZ,
  isIncrement: false,
  isUndoRedo: false,
  isFiftyMoveRule: true,
};

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState,
  reducers: {
    setGameType(state, action: PayloadAction<GameType>) {
      state.gameType = action.payload;
    },
    setTimeControl(state, action: PayloadAction<TimeControl>) {
      state.timeControl = action.payload;
    },
    setIsIncrement(state, action: PayloadAction<boolean>) {
      state.isIncrement = action.payload;
    },
    setIsUndoRedo(state, action: PayloadAction<boolean>) {
      state.isUndoRedo = action.payload;
    },
    setIsFiftyMoveRule(state, action: PayloadAction<boolean>) {
      state.isFiftyMoveRule = action.payload;
    },
  },
});

export const { setGameType, setTimeControl, setIsIncrement, setIsUndoRedo, setIsFiftyMoveRule } =
  gameSettingsSlice.actions;
