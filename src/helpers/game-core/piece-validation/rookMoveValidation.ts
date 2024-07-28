import { BoardState, Piece, Square } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';
import { SquareRank } from '../../../enums/SquareRank';
import { getSquareRank } from '../../analysis/board-mapping/getSquareRank';
import { ValidMoves, updateValidSquaresToIncludeCaptures } from './kingMoveValidation';

export function rookMoveValidation(board: BoardState, piece: Piece, currentIndex: number) {
  const validSquares: ValidMoves[] = [];
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

  return updateValidSquaresToIncludeCaptures(board, piece, validSquares);
}

export function countBackwardsMoves(board: BoardState, piece: Piece, currentIndex: number) {
  let foundPiece = false;
  let isCapture = false;
  let count = 0;

  while (!foundPiece) {
    currentIndex = piece.color === PieceColor.WHITE ? currentIndex + 8 : currentIndex - 8; // move up 1 square
    if (currentIndex < 0 || currentIndex > 63) break;

    if (board[currentIndex].piece !== null) {
      foundPiece = true;
      if (board[currentIndex].piece?.color !== piece.color) {
        count += 1;
        isCapture = true;
      }
    } else {
      count += 1;
    }
  }

  return { count, isCapture };
}

export function countForwardMoves(board: BoardState, piece: Piece, currentIndex: number) {
  let foundPiece = false;
  let isCapture = false;
  let count = 0;

  while (!foundPiece) {
    currentIndex = piece.color === PieceColor.WHITE ? currentIndex - 8 : currentIndex + 8; // move up 1 square
    if (currentIndex < 0 || currentIndex > 63) break;

    if (board[currentIndex].piece !== null) {
      foundPiece = true;
      if (board[currentIndex].piece?.color !== piece.color) {
        count += 1;
        isCapture = true;
      }
    } else {
      count += 1;
    }
  }

  return { count, isCapture };
}

export function countLeftMoves(
  board: BoardState,
  piece: Piece,
  currentIndex: number,
  squareRank: SquareRank
) {
  let foundPiece = false;
  let isCapture = false;
  let count = 0;

  while (!foundPiece && currentIndex >= 0 && currentIndex <= 63) {
    currentIndex = currentIndex - 1; // move left 1 square
    if (!isOnStartRank(squareRank, currentIndex)) break;

    if (board[currentIndex].piece !== null) {
      foundPiece = true;
      if (board[currentIndex].piece?.color !== piece.color) {
        count += 1;
        isCapture = true;
      }
    } else {
      count += 1;
    }
  }

  return { count, isCapture };
}

export function countRightMoves(
  board: BoardState,
  piece: Piece,
  currentIndex: number,
  squareRank: SquareRank
) {
  let foundPiece = false;
  let isCapture = false;
  let count = 0;

  while (!foundPiece && currentIndex >= 0 && currentIndex <= 63) {
    currentIndex = currentIndex + 1; // move right 1 square
    if (!isOnStartRank(squareRank, currentIndex)) break;

    if (board[currentIndex].piece !== null) {
      foundPiece = true;
      if (board[currentIndex].piece?.color !== piece.color) {
        count += 1;
        isCapture = true;
      }
    } else {
      count += 1;
    }
  }

  return { count, isCapture };
}

function isOnStartRank(squareRank: SquareRank, currentIndex: number) {
  const maxIndex = getMaxIndexOnRank(squareRank);
  const minIndex = getMinIndexOnRank(squareRank);

  if (currentIndex > maxIndex || currentIndex < minIndex) return false;
  else return true;
}

function getMinIndexOnRank(squareRank: SquareRank) {
  if (squareRank === 8) return 0;
  else if (squareRank === 7) return 8;
  else if (squareRank === 6) return 16;
  else if (squareRank === 5) return 24;
  else if (squareRank === 4) return 32;
  else if (squareRank === 3) return 40;
  else if (squareRank === 2) return 48;
  else if (squareRank === 1) return 56;
  else return 0;
}

function getMaxIndexOnRank(squareRank: SquareRank) {
  if (squareRank === 8) return 7;
  else if (squareRank === 7) return 15;
  else if (squareRank === 6) return 23;
  else if (squareRank === 5) return 31;
  else if (squareRank === 4) return 39;
  else if (squareRank === 3) return 47;
  else if (squareRank === 2) return 55;
  else if (squareRank === 1) return 63;
  else return 0;
}

type Direction = 'FORWARD' | 'BACKWARDS' | 'LEFT' | 'RIGHT';

export function addValidSquares(
  piece: Piece,
  direction: Direction,
  canSlide: { count: number; isCapture: boolean },
  currentIndex: number,
  validSquares: ValidMoves[]
) {
  if (direction === 'FORWARD') {
    for (let i = 0; i < canSlide.count; i++) {
      if (piece.color === PieceColor.WHITE)
        validSquares.push({ index: currentIndex - 8 * (i + 1), isCapture: false });
      else validSquares.push({ index: currentIndex + 8 * (i + 1), isCapture: false });
    }
  } else if (direction === 'RIGHT') {
    for (let i = 0; i < canSlide.count; i++) {
      validSquares.push({ index: currentIndex + i + 1, isCapture: false });
    }
  } else if (direction === 'BACKWARDS') {
    for (let i = 0; i < canSlide.count; i++) {
      if (piece.color === PieceColor.WHITE)
        validSquares.push({ index: currentIndex + 8 * (i + 1), isCapture: false });
      else validSquares.push({ index: currentIndex - 8 * (i + 1), isCapture: false });
    }
  } else if (direction === 'LEFT') {
    for (let i = 0; i < canSlide.count; i++) {
      validSquares.push({ index: currentIndex - i - 1, isCapture: false });
    }
  }
}
