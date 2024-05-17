import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';

export function pawnMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  const validSquares: number[] = [];
  const isBlockedOneSquareAhead = isPawnBlocked(board, currentIndex, piece, 1);
  const isBlockedTwoSquaresAhead = isPawnBlocked(board, currentIndex, piece, 2);
  console.log(isBlockedOneSquareAhead, isBlockedTwoSquaresAhead);

  if (
    !piece.hasMoved &&
    !isBlockedOneSquareAhead &&
    !isBlockedTwoSquaresAhead
  ) {
    if (piece.color === PieceColor.WHITE) validSquares.push(currentIndex + 16);
    else validSquares.push(currentIndex - 16);
  }

  if (!isBlockedOneSquareAhead) {
    if (piece.color === PieceColor.WHITE) validSquares.push(currentIndex + 8);
    else validSquares.push(currentIndex - 8);
  }

  return validSquares;
}

function isPawnBlocked(
  board: BoardState,
  currentIndex: number,
  piece: Piece,
  squaresAhead: number
) {
  if (piece.color === PieceColor.WHITE) {
    if (board[currentIndex + 8 * squaresAhead].piece !== null) return true;
    else return false;
  } else {
    if (board[currentIndex - 8 * squaresAhead].piece !== null) return true;
    else return false;
  }
}
