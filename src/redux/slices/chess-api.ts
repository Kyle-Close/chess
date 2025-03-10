import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IBoard {
  squares: ISquare[];
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
export const chessAPI = createApi({
  reducerPath: 'chess-api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5165/chess-api' }),
  endpoints: (build) => ({
    buildBoardFromFen: build.query<IBoard, string>({
      query: (fen) => ({
        url: "build-board",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: fen
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useBuildBoardFromFenQuery } = chessAPI;
