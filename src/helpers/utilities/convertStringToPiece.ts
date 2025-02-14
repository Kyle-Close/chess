import { PieceColor, PieceType } from "base/features/game-board/hooks/usePiece";

export function convertStringToPiece(input: string, color: PieceColor) {
  switch (input.toLowerCase()) {
    case 'r':
      return { type: PieceType.ROOK, color, hasMoved: false };
    case 'n':
      return { type: PieceType.KNIGHT, color, hasMoved: false };
    case 'b':
      return { type: PieceType.BISHOP, color, hasMoved: false };
    case 'q':
      return { type: PieceType.QUEEN, color, hasMoved: false };
    default:
      throw Error('Valid Pawn Promotion values: r, n, b, q');
  }
}
