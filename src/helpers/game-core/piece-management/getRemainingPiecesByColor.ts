import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';
import { PieceWithIndex } from '../../analysis/isCheckmate';

// Overload signatures
export function getRemainingPiecesByColor(
  board: BoardState,
  color: PieceColor,
  withIndex: true
): PieceWithIndex[];

export function getRemainingPiecesByColor(
  board: BoardState,
  color: PieceColor,
  withIndex?: false
): Piece[];

export function getRemainingPiecesByColor(
  board: BoardState,
  color: PieceColor,
  withIndex?: boolean
): Piece[] | PieceWithIndex[] {
  const pieces: (Piece | PieceWithIndex)[] = [];

  board.forEach((square, index) => {
    const piece = square.piece;
    if (!piece) return;

    if (piece.color === color) {
      if (withIndex) {
        const pieceWithIndex: PieceWithIndex = { ...piece, index };
        pieces.push(pieceWithIndex);
      } else {
        pieces.push(piece);
      }
    }
  });

  return pieces as any;
}
