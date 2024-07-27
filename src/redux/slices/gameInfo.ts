import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoveHistory } from '../../context/types/MoveHistory';
import { DEFAULT_FEN_STRING } from '../../constants/defaultFen';

export enum MatchResult {
  ONGOING,
  DRAW,
  WHITE_WIN,
  BLACK_WIN,
}

export interface GameInfo {
  matchResult: MatchResult;
  halfMoves: number;
  fullMoves: number;
  moveHistory: MoveHistory[];
  moveHistoryRedo: MoveHistory[];
  enPassantSquare: number | null;
  whitePlayerId: string;
  blackPlayerId: string;
}

const initialGameInfo = {
  isPlaying: false,
  matchResult: MatchResult.ONGOING,
  halfMoves: 0,
  fullMoves: 0,
  moveHistory: [{ fenString: DEFAULT_FEN_STRING, chessNotation: '' }] as MoveHistory[],
  moveHistoryRedo: [] as MoveHistory[],
  enPassantSquare: null as number | null,
  whitePlayerId: '',
  blackPlayerId: '',
};

export const gameInfoSlice = createSlice({
  name: 'gameInfo',
  initialState: initialGameInfo,
  reducers: {
    toggleIsPlaying(state) {
      state.isPlaying = !state.isPlaying;
    },
    setEnPassantSquare(state, action: PayloadAction<number | null>) {
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
      state.moveHistory.pop();
    },
    pushToMoveHistoryRedo(state, action: PayloadAction<MoveHistory>) {
      state.moveHistoryRedo.push(action.payload);
    },
    popMoveHistoryRedo(state) {
      state.moveHistoryRedo.pop();
    },
    clearMoveHistoryRedo(state) {
      state.moveHistoryRedo = [];
    },
    setHalfMoves(state, action: PayloadAction<number>) {
      state.halfMoves = action.payload;
    },
    setFullMoves(state, action: PayloadAction<number>) {
      state.fullMoves = action.payload;
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
  setHalfMoves,
  setFullMoves,
  setPlayerIds,
} = gameInfoSlice.actions;
