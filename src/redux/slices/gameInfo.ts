import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoveHistory } from '../../context/types/MoveHistory';

export enum MatchResult {
  ONGOING,
  DRAW,
  WHITE_WIN,
  BLACK_WIN,
}

export enum MatchResultSubType {
  ONGOING,
  CHECKMATE,
  TIME,
  RESIGNATION,
  STALEMATE,
  THREE_FOLD_REPITITION,
  FIFTY_MOVE_RULE,
  INSUFFICIENT_MATERIAL,
  MUTUAL_AGREEMENT,
}

export interface GameInfo {
  matchResult: MatchResult;
  matchResultSubType: MatchResultSubType;
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
  matchResultSubType: MatchResultSubType.ONGOING,
  halfMoves: 0,
  fullMoves: 1,
  moveHistory: [] as MoveHistory[],
  moveHistoryRedo: [] as MoveHistory[],
  enPassantSquare: null as number | null,
  whitePlayerId: '',
  blackPlayerId: '',
};

export const gameInfoSlice = createSlice({
  name: 'gameInfo',
  initialState: initialGameInfo,
  reducers: {
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
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
    setMatchResultSubType(state, action: PayloadAction<MatchResultSubType>) {
      state.matchResultSubType = action.payload;
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
    resetGameInfo() {
      return { ...initialGameInfo };
    },
  },
});

export const {
  setIsPlaying,
  setEnPassantSquare,
  clearEnPassantSquare,
  setMatchResult,
  setMatchResultSubType,
  pushToMoveHistory,
  popMoveHistory,
  pushToMoveHistoryRedo,
  popMoveHistoryRedo,
  clearMoveHistoryRedo,
  setHalfMoves,
  setFullMoves,
  setPlayerIds,
  resetGameInfo,
} = gameInfoSlice.actions;
