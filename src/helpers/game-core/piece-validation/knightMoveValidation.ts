import { BoardState, Piece } from 'base/context/board/InitialState';
import { getSquareFile } from '../../analysis/board-mapping/getSquareFile';
import { ValidMoves, updateValidSquaresToIncludeCaptures } from './kingMoveValidation';
import { SquareFile } from 'base/features/game-board/hooks/useSquare';

export function knightMoveValidation(board: BoardState, piece: Piece, currentIndex: number) {
  let validSquares: ValidMoves[] = [];
  const pieceFile = getSquareFile(currentIndex);

  validSquares = getAllKnightMoves(currentIndex, pieceFile);
  validSquares = filterOutOfBounds(validSquares);
  validSquares = filterOccupiedSelf(board, piece, validSquares);
  validSquares = updateValidSquaresToIncludeCaptures(board, piece, validSquares);

  return validSquares;
}

function getAllKnightMoves(currentIndex: number, startFile: SquareFile) {
  let leftSideTop = null;
  let leftTop = null;
  let leftBottom = null;
  let leftSideBottom = null;
  let rightSideTop = null;
  let rightTop = null;
  let rightSideBottom = null;
  let rightBottom = null;

  if (startFile !== 'a' && startFile !== 'b') {
    leftSideTop = currentIndex - 10;
    leftTop = currentIndex - 17;
    leftBottom = currentIndex + 15;
    leftSideBottom = currentIndex + 6;
  } else if (startFile === 'b') {
    leftTop = currentIndex - 17;
    leftBottom = currentIndex + 15;
  }
  if (startFile !== 'g' && startFile !== 'h') {
    rightTop = currentIndex - 15;
    rightSideTop = currentIndex - 6;
    rightSideBottom = currentIndex + 10;
    rightBottom = currentIndex + 17;
  } else if (startFile === 'g') {
    rightTop = currentIndex - 15;
    rightBottom = currentIndex + 17;
  }

  const result: ValidMoves[] = [];

  if (leftSideTop) result.push({ index: leftSideTop, isCapture: false });
  if (leftTop) result.push({ index: leftTop, isCapture: false });
  if (leftBottom) result.push({ index: leftBottom, isCapture: false });
  if (leftSideBottom) result.push({ index: leftSideBottom, isCapture: false });
  if (rightTop) result.push({ index: rightTop, isCapture: false });
  if (rightSideTop) result.push({ index: rightSideTop, isCapture: false });
  if (rightSideBottom) result.push({ index: rightSideBottom, isCapture: false });
  if (rightBottom) result.push({ index: rightBottom, isCapture: false });

  return result;
}

export function filterOutOfBounds(validSquares: ValidMoves[]) {
  return validSquares.filter((square) => square.index >= 0 && square.index <= 63);
}

export function filterOccupiedSelf(board: BoardState, piece: Piece, validSquares: ValidMoves[]) {
  return validSquares.filter(
    (square) =>
      board[square.index].piece === null || board[square.index].piece?.color !== piece.color
  );
}
