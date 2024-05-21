import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceFile, getPieceFile } from '../../generic/pieceLocation';

export function knightMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  const pieceFile = getPieceFile(currentIndex);

  let validSquares = getAllKnightMoves(currentIndex, pieceFile);
  validSquares = filterOutOfBounds(validSquares);
  return filterOccupiedSelf(board, piece, validSquares);
}

function getAllKnightMoves(currentIndex: number, startFile: PieceFile) {
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

  const result: number[] = [];

  if (leftSideTop) result.push(leftSideTop);
  if (leftTop) result.push(leftTop);
  if (leftBottom) result.push(leftBottom);
  if (leftSideBottom) result.push(leftSideBottom);
  if (rightTop) result.push(rightTop);
  if (rightSideTop) result.push(rightSideTop);
  if (rightSideBottom) result.push(rightSideBottom);
  if (rightBottom) result.push(rightBottom);

  return result;
}

function filterOutOfBounds(allSquares: number[]) {
  return allSquares.filter((index) => index >= 0 && index <= 63);
}

function filterOccupiedSelf(board: BoardState, piece: Piece, validSquares: number[]) {
  return validSquares.filter(
    (index) => board[index].piece === null || board[index].piece?.color !== piece.color
  );
}
