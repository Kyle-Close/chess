import { BoardState, Piece } from '../../../context/board/InitialState';
import { getSquareRank } from '../../analysis/board-mapping/getSquareRank';
import { appendDiagonalMoves, getJumpCount, getLastFile } from './bishopMoveValidation';
import { ValidMoves, updateValidSquaresToIncludeCaptures } from './kingMoveValidation';
import { filterOutOfBounds } from './knightMoveValidation';
import {
  addValidSquares,
  countBackwardsMoves,
  countForwardMoves,
  countLeftMoves,
  countRightMoves,
} from './rookMoveValidation';

export function queenMoveValidation(board: BoardState, piece: Piece, currentIndex: number) {
  let validSquares: ValidMoves[] = [];

  const squareRank = getSquareRank(currentIndex);
  const squaresCanMoveForward = countForwardMoves(board, piece, currentIndex);
  const squaresCanMoveRight = countRightMoves(board, piece, currentIndex, squareRank);
  const squaresCanMoveBackwards = countBackwardsMoves(board, piece, currentIndex);
  const squaresCanMoveLeft = countLeftMoves(board, piece, currentIndex, squareRank);

  if (squaresCanMoveForward)
    addValidSquares(piece, 'FORWARD', squaresCanMoveForward, currentIndex, validSquares);
  if (squaresCanMoveRight)
    addValidSquares(piece, 'RIGHT', squaresCanMoveRight, currentIndex, validSquares);
  if (squaresCanMoveBackwards)
    addValidSquares(piece, 'BACKWARDS', squaresCanMoveBackwards, currentIndex, validSquares);
  if (squaresCanMoveLeft)
    addValidSquares(piece, 'LEFT', squaresCanMoveLeft, currentIndex, validSquares);

  // UP and to the LEFT
  appendDiagonalMoves(
    board,
    piece,
    currentIndex,
    validSquares,
    getJumpCount(true, true),
    getLastFile(true)
  );

  // DOWN and to the LEFT
  appendDiagonalMoves(
    board,
    piece,
    currentIndex,
    validSquares,
    getJumpCount(false, true),
    getLastFile(true)
  );

  // UP and to the RIGHT
  appendDiagonalMoves(
    board,
    piece,
    currentIndex,
    validSquares,
    getJumpCount(true, false),
    getLastFile(false)
  );

  // DOWN and to the RIGHT
  appendDiagonalMoves(
    board,
    piece,
    currentIndex,
    validSquares,
    getJumpCount(false, false),
    getLastFile(false)
  );

  validSquares = filterOutOfBounds(validSquares);

  return updateValidSquaresToIncludeCaptures(board, piece, validSquares);
}
