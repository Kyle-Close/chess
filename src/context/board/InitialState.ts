// Start of the array is equal to rank 1, file a. Goes from left to right up to rank 8 eventually

import { PieceColor } from '../../enums/PieceColor';
import { PieceType } from '../../enums/PieceType';

export interface Piece {
  type: PieceType;
  color: PieceColor;
  hasMoved: boolean;
}

export type BoardState = (Piece | null)[];

export const initialBoardState: BoardState = [
  { type: PieceType.ROOK, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.KNIGHT, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.BISHOP, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.QUEEN, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.KING, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.BISHOP, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.KNIGHT, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.ROOK, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.ROOK, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.KNIGHT, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.BISHOP, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.QUEEN, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.KING, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.BISHOP, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.KNIGHT, color: PieceColor.BLACK, hasMoved: false },
  { type: PieceType.ROOK, color: PieceColor.BLACK, hasMoved: false },
];
