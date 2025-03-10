import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardState } from '../../data/getInitialBoardState';

export type SetupBoardPayload = BoardState;

const initialState: BoardState[] = [];

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setupBoard(state, action: PayloadAction<SetupBoardPayload>) {
      return action.payload;
    }
  },
});

export const { setupBoard } = boardSlice.actions;

