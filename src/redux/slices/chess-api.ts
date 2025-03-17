import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IBoard {
  squares: ISquare[];
}

export interface StartGameResponse {
  gameId: string;
  fen: string;
}

export interface GetValidMovesPayload {
  GameId: string;
  Index: number;
}

export interface GetValidMovesResponse {
  startIndex: number,
  validMoves: ValidMoves[],
  isEnPassantCapture?: boolean,
  isCastle?: boolean,
  isCapture?: boolean,
  endIndex?: number,
  notation?: string,
  newFen?: string
}

interface ValidMoves {
  index: number,
  isCapture: boolean
}

export interface ISquare {
  piece: IPiece;
  file: BoardFile;
  rank: BoardRank;
}

export interface IPiece {
  pieceType: PieceType;
  color: Color;
  hasMoved: boolean;
}

export enum PieceType {
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING
}

export enum Color {
  WHITE,
  BLACK
}

export enum BoardFile {
  A = 1,
  B,
  C,
  D,
  E,
  F,
  G,
  H
}

export enum BoardRank {
  ONE = 1,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT
}

// Define a service using a base URL and expected endpoints
export const chessApi = createApi({
  reducerPath: 'start-game',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5165/chess-api' }),
  endpoints: (build) => ({
    startGame: build.query<StartGameResponse, string | void>({
      query: (fen) => ({
        url: "start-game",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { fen }
      })
    }),
    getValidMoves: build.query<GetValidMovesResponse, GetValidMovesPayload>({
      query: (payload) => ({
        url: "get-valid-moves",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload
      })
    })
  }),
},)

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useStartGameQuery, useGetValidMovesQuery } = chessApi;
