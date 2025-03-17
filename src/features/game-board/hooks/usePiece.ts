import { Piece } from "base/data/getInitialBoardState";

export function usePiece() {

  const isWhite = (piece: Piece) => {
    return piece.color === PieceColor.WHITE;
  };

  return {
    isWhite,
  };
}

export enum PieceColor {
  WHITE = 0,
  BLACK,
}

export enum PieceType {
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING,
}
