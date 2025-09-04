import { Piece } from "../../../zod/PieceSchema";
import { Color } from "../../../zod/emums/Color";

export function usePiece() {

  const isWhite = (piece: Piece) => {
    return piece.color === Color.WHITE;
  };

  return {
    isWhite,
  };
}
