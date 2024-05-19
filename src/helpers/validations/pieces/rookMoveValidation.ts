import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';
import {
  PieceFile,
  convertFileToIndex,
  getPieceFile,
} from '../../generic/pieceLocation';

export function rookMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  const validSquares: number[] = [];
  const pieceFile = getPieceFile(currentIndex);
  const squaresCanMoveForward = countFileForwardMoves(
    board,
    piece,
    currentIndex,
    pieceFile
  );
  if (squaresCanMoveForward)
    addValidSquares(
      'FORWARD',
      squaresCanMoveForward,
      currentIndex,
      validSquares
    );

  return validSquares;
}

function countFileForwardMoves(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  let foundPiece = false;
  let count = 0;

  while (!foundPiece && currentIndex >= 0 && currentIndex <= 63) {
    currentIndex =
      piece.color === PieceColor.WHITE ? currentIndex + 8 : currentIndex - 8; // move up 1 square
    if (board[currentIndex].piece !== null) {
      foundPiece = true;
      if (board[currentIndex].piece?.color !== piece.color) count += 1;
    } else {
      count += 1;
    }
  }

  return count;
}

type Direction = 'FORWARD' | 'BACKWARDS' | 'LEFT' | 'RIGHT';

function addValidSquares(
  direction: Direction,
  count: number,
  currentIndex: number,
  validSquares: number[]
) {
  if (direction === 'FORWARD') {
    for (let i = 0; i < count; i++) {
      validSquares.push(currentIndex + 8 * (i + 1));
    }
  }
}
