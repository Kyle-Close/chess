import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoveHistory } from '../../context/types/MoveHistory';

enum MatchResult {
  ONGOING,
  DRAW,
  WHITE_WIN,
  BLACK_WIN,
}

const initialGameInfo = {
  isPlaying: false,
  matchResult: MatchResult.ONGOING,
  moveHistory: [] as MoveHistory[],
  moveHistoryRedo: [] as MoveHistory[],
  enPassantSquare: null as number | null,
  whitePlayerId: 'player1',
  blackPlayerId: 'player2',
};

export const gameInfoSlice = createSlice({
  name: 'gameInfo',
  initialState: initialGameInfo,
  reducers: {
    toggleIsPlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    setEnPassantSquare(state, action: PayloadAction<number>) {
      state.enPassantSquare = action.payload;
    },
    clearEnPassantSquare(state) {
      state.enPassantSquare = null;
    },
    setMatchResult(state, action: PayloadAction<MatchResult>) {
      state.matchResult = action.payload;
    },
    pushToMoveHistory(state, action: PayloadAction<MoveHistory>) {
      state.moveHistory.push(action.payload);
    },
    popMoveHistory(state) {
      const poppedMove = state.moveHistory.pop();
      return { ...state, poppedMove };
    },
    pushToMoveHistoryRedo(state, action: PayloadAction<MoveHistory>) {
      state.moveHistoryRedo.push(action.payload);
    },
    popMoveHistoryRedo(state) {
      const poppedMove = state.moveHistoryRedo.pop();
      return { ...state, poppedMove };
    },
    clearMoveHistoryRedo(state) {
      state.moveHistoryRedo = [];
    },
    setPlayerIds(state, action: PayloadAction<{ whitePlayerId: string; blackPlayerId: string }>) {
      state.whitePlayerId = action.payload.whitePlayerId;
      state.blackPlayerId = action.payload.blackPlayerId;
    },
  },
});

export const {
  toggleIsPlaying,
  setEnPassantSquare,
  clearEnPassantSquare,
  setMatchResult,
  pushToMoveHistory,
  popMoveHistory,
  pushToMoveHistoryRedo,
  popMoveHistoryRedo,
  clearMoveHistoryRedo,
  setPlayerIds,
} = gameInfoSlice.actions;
