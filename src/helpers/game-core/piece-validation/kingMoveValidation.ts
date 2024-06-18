import { BoardState, Piece } from '../../../context/board/InitialState';
import { getPieceFile } from '../../analysis/game-checks/pieceLocation';
import { filterOccupiedSelf, filterOutOfBounds } from './knightMoveValidation';

export interface ValidSquares {
  index: number;
  isCapture: boolean;
}

export function kingMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  let validSquares: ValidSquares[] = [];

  validSquares = appendSurroundingSquares(currentIndex);
  validSquares = filterOutOfBounds(validSquares);
  validSquares = filterOccupiedSelf(board, piece, validSquares);
  validSquares = updateValidSquaresToIncludeCaptures(board, piece, validSquares);

  return validSquares;
}

function appendSurroundingSquares(currentIndex: number) {
  const result: ValidSquares[] = [];
  const file = getPieceFile(currentIndex);

  if (file !== 'a') {
    result.push({ index: currentIndex + 7, isCapture: false });
    result.push({ index: currentIndex - 1, isCapture: false });
    result.push({ index: currentIndex - 9, isCapture: false });
  }
  if (file !== 'h') {
    result.push({ index: currentIndex - 7, isCapture: false });
    result.push({ index: currentIndex + 1, isCapture: false });
    result.push({ index: currentIndex + 9, isCapture: false });
  }

  result.push({ index: currentIndex - 8, isCapture: false });
  result.push({ index: currentIndex + 8, isCapture: false });

  return result;
}

export function updateValidSquaresToIncludeCaptures(
  board: BoardState,
  piece: Piece,
  validSquares: ValidSquares[]
) {
  validSquares.forEach((move, index) => {
    if (
      board[move.index].piece !== null &&
      board[move.index].piece?.color !== piece.color
    ) {
      validSquares[index].isCapture = true;
    }
  });
  return validSquares;
}
