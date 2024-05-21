import { BoardState, Piece } from '../../../context/board/InitialState';
import { filterOccupiedSelf, filterOutOfBounds } from './knightMoveValidation';

export function kingMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  let validSquares: number[] = [];

  validSquares = appendSurroundingSquares(currentIndex);
  validSquares = filterOutOfBounds(validSquares);
  validSquares = filterOccupiedSelf(board, piece, validSquares);

  return validSquares;
}

function appendSurroundingSquares(currentIndex: number) {
  const result: number[] = [];

  result.push(currentIndex - 8);
  result.push(currentIndex - 7);
  result.push(currentIndex + 1);
  result.push(currentIndex + 9);
  result.push(currentIndex + 8);
  result.push(currentIndex + 7);
  result.push(currentIndex - 1);
  result.push(currentIndex - 9);

  return result;
}
