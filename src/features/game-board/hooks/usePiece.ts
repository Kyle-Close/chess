import { Piece } from "base/zod/PieceSchema";
import { Color } from "base/zod/emums/Color";

export function usePiece() {

  const isWhite = (piece: Piece) => {
    return piece.color === Color.WHITE;
  };

  return {
    isWhite,
  };
}
