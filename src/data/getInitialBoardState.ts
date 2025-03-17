import { PieceColor, PieceType } from "base/features/game-board/hooks/usePiece";

export interface Piece {
  pieceType: PieceType;
  color: PieceColor;
  hasMoved: boolean;
}

export interface Square {
  piece: Piece | null;
  index: number;
}

export type BoardState = Square[];
