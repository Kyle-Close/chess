import { PieceColor, PieceType } from "base/features/game-board/hooks/usePiece";

export interface Piece {
  type: PieceType;
  color: PieceColor;
  hasMoved: boolean;
}

export interface Square {
  piece: Piece | null;
  file: number;
  rank: number;
}

export type BoardState = Square[];
