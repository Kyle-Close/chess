import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MoveMetaData } from 'base/features/game-logic/utils/move-execution/buildMoveMetaData';

type MoveState = MoveMetaData | null;

export const moveSlice = createSlice({
  name: 'move',
  initialState: null as MoveState,
  reducers: {
    setMoveMetaData(_state, action: PayloadAction<MoveState>) {
      return action.payload;
    },
  },
});

export const { setMoveMetaData } = moveSlice.actions;
