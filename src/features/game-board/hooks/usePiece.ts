import { Color, IPiece } from "base/redux/slices/chess-api";

export function usePiece() {

  const isWhite = (piece: IPiece) => {
    return piece.color === Color.WHITE;
  };

  return {
    isWhite,
  };
}

export enum PieceType {
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING,
}
