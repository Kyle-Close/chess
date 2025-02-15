import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardState, getInitialBoardState } from '../../data/getInitialBoardState';

export type SetupBoardPayload = BoardState;

const initialState = getInitialBoardState();

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setupBoard(state, action: PayloadAction<SetupBoardPayload>) {
      return action.payload;
    },
    clearIsValidSquares(state) {
      state.forEach((square) => {
        square.isValidMove = false;
      });
    },
  },
});

export const { setupBoard, clearIsValidSquares } = boardSlice.actions;
