import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';

export function pawnMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  const validSquares: number[] = [];

  if (!piece.hasMoved) {
    if (piece.color === PieceColor.WHITE) validSquares.push(currentIndex + 16);
    else validSquares.push(currentIndex - 16);
  }

  if (piece.color === PieceColor.WHITE) validSquares.push(currentIndex + 8);
  else validSquares.push(currentIndex - 8);

  return removeBlockedMoves(board, validSquares);
}

function removeBlockedMoves(board: BoardState, validSquares: number[]) {
  return validSquares.filter((index) => board[index].piece === null);
}

function isOtherPieceDirectlyInFront(
  board: BoardState,
  currentIndex: number,
  piece: Piece
) {}
