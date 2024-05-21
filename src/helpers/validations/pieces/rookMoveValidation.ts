import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';
import { PieceRank, getPieceRank } from '../../generic/pieceLocation';

export function rookMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  const validSquares: number[] = [];
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

  return validSquares;
}

function countBackwardsMoves(board: BoardState, piece: Piece, currentIndex: number) {
  let foundPiece = false;
  let count = 0;

  while (!foundPiece) {
    currentIndex = piece.color === PieceColor.WHITE ? currentIndex - 8 : currentIndex + 8; // move up 1 square
    if (currentIndex < 0 || currentIndex > 63) break;

    if (board[currentIndex].piece !== null) {
      foundPiece = true;
      if (board[currentIndex].piece?.color !== piece.color) count += 1;
    } else {
      count += 1;
    }
  }

  return count;
}

function countForwardMoves(board: BoardState, piece: Piece, currentIndex: number) {
  let foundPiece = false;
  let count = 0;

  while (!foundPiece && currentIndex >= 0 && currentIndex <= 63) {
    currentIndex = piece.color === PieceColor.WHITE ? currentIndex + 8 : currentIndex - 8; // move up 1 square
    if (board[currentIndex].piece !== null) {
      foundPiece = true;
      if (board[currentIndex].piece?.color !== piece.color) count += 1;
    } else {
      count += 1;
    }
  }

  return count;
}

function countLeftMoves(
  board: BoardState,
  piece: Piece,
  currentIndex: number,
  pieceRank: PieceRank
) {
  let foundPiece = false;
  let count = 0;

  while (!foundPiece && currentIndex >= 0 && currentIndex <= 63) {
    currentIndex = currentIndex - 1; // move left 1 square
    if (!isOnStartRank(pieceRank, currentIndex)) break;

    if (board[currentIndex].piece !== null) {
      foundPiece = true;
      if (board[currentIndex].piece?.color !== piece.color) count += 1;
    } else {
      count += 1;
    }
  }

  return count;
}

function countRightMoves(
  board: BoardState,
  piece: Piece,
  currentIndex: number,
  pieceRank: PieceRank
) {
  let foundPiece = false;
  let count = 0;

  while (!foundPiece && currentIndex >= 0 && currentIndex <= 63) {
    currentIndex = currentIndex + 1; // move right 1 square
    if (!isOnStartRank(pieceRank, currentIndex)) break;

    if (board[currentIndex].piece !== null) {
      foundPiece = true;
      if (board[currentIndex].piece?.color !== piece.color) count += 1;
    } else {
      count += 1;
    }
  }

  return count;
}

function isOnStartRank(pieceRank: PieceRank, currentIndex: number) {
  const maxIndex = getMaxIndexOnRank(pieceRank);
  const minIndex = getMinIndexOnRank(pieceRank);

  if (currentIndex > maxIndex || currentIndex < minIndex) return false;
  else return true;
}

function getMinIndexOnRank(pieceRank: PieceRank) {
  if (pieceRank === 1) return 0;
  else if (pieceRank === 2) return 8;
  else if (pieceRank === 3) return 16;
  else if (pieceRank === 4) return 24;
  else if (pieceRank === 5) return 32;
  else if (pieceRank === 6) return 40;
  else if (pieceRank === 7) return 48;
  else if (pieceRank === 8) return 56;
  else return 0;
}

function getMaxIndexOnRank(pieceRank: PieceRank) {
  if (pieceRank === 1) return 7;
  else if (pieceRank === 2) return 15;
  else if (pieceRank === 3) return 23;
  else if (pieceRank === 4) return 31;
  else if (pieceRank === 5) return 39;
  else if (pieceRank === 6) return 47;
  else if (pieceRank === 7) return 55;
  else if (pieceRank === 8) return 63;
  else return 7;
}

type Direction = 'FORWARD' | 'BACKWARDS' | 'LEFT' | 'RIGHT';

function addValidSquares(
  piece: Piece,
  direction: Direction,
  count: number,
  currentIndex: number,
  validSquares: number[]
) {
  if (direction === 'FORWARD') {
    for (let i = 0; i < count; i++) {
      if (piece.color === PieceColor.WHITE) validSquares.push(currentIndex + 8 * (i + 1));
      else validSquares.push(currentIndex - 8 * (i + 1));
    }
  } else if (direction === 'RIGHT') {
    for (let i = 0; i < count; i++) {
      validSquares.push(currentIndex + i + 1);
    }
  } else if (direction === 'BACKWARDS') {
    for (let i = 0; i < count; i++) {
      if (piece.color === PieceColor.WHITE) validSquares.push(currentIndex - 8 * (i + 1));
      else validSquares.push(currentIndex + 8 * (i + 1));
    }
  } else if (direction === 'LEFT') {
    for (let i = 0; i < count; i++) {
      validSquares.push(currentIndex - i - 1);
    }
  }
}
