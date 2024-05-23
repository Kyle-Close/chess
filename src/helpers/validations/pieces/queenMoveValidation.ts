import { BoardState, Piece } from '../../../context/board/InitialState';
import { getPieceRank } from '../../generic/pieceLocation';
import { appendDiagonalMoves, getJumpCount, getLastFile } from './bishopMoveValidation';
import { ValidSquares, updateValidSquaresToIncludeCaptures } from './kingMoveValidation';
import { filterOutOfBounds } from './knightMoveValidation';
import {
  addValidSquares,
  countBackwardsMoves,
  countForwardMoves,
  countLeftMoves,
  countRightMoves,
} from './rookMoveValidation';

export function queenMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  let validSquares: ValidSquares[] = [];

  const pieceRank = getPieceRank(currentIndex);
  const squaresCanMoveForward = countForwardMoves(board, piece, currentIndex);
  const squaresCanMoveRight = countRightMoves(board, piece, currentIndex, pieceRank);
  const squaresCanMoveBackwards = countBackwardsMoves(board, piece, currentIndex);
  const squaresCanMoveLeft = countLeftMoves(board, piece, currentIndex, pieceRank);

  if (squaresCanMoveForward)
    addValidSquares(piece, 'FORWARD', squaresCanMoveForward, currentIndex, validSquares);
  if (squaresCanMoveRight)
    addValidSquares(piece, 'RIGHT', squaresCanMoveRight, currentIndex, validSquares);
  if (squaresCanMoveBackwards)
    addValidSquares(
      piece,
      'BACKWARDS',
      squaresCanMoveBackwards,
      currentIndex,
      validSquares
    );
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
