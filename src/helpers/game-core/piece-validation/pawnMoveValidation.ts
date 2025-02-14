import { getPawnAttackingIndexes } from 'base/helpers/analysis/game-checks/getPawnAttackingIndexes';
import { ValidMoves } from './kingMoveValidation';
import { PieceColor } from 'base/features/game-board/hooks/usePiece';
import { SquareRank } from 'base/features/game-board/hooks/useSquare';
import { BoardState, Piece } from 'base/context/board/InitialState';
import { getSquareFile } from 'base/helpers/analysis/board-mapping/getSquareFile';
import { getSquareRank } from 'base/helpers/analysis/board-mapping/getSquareRank';

export function pawnMoveValidation(board: BoardState, piece: Piece, currentIndex: number) {
  const validSquares: ValidMoves[] = [];
  const pieceRank = getSquareRank(currentIndex);

  if (isOnLastRank(piece, pieceRank)) return [];

  const isBlockedOneSquareAhead = isPawnBlocked(board, currentIndex, piece, 1, pieceRank);
  const isBlockedTwoSquaresAhead = isPawnBlocked(board, currentIndex, piece, 2, pieceRank);
  const captureLeft = captureAvailable(board, currentIndex, piece, true, pieceRank);
  const captureRight = captureAvailable(board, currentIndex, piece, false, pieceRank);

  if (!piece.hasMoved && !isBlockedOneSquareAhead && !isBlockedTwoSquaresAhead) {
    if (piece.color === PieceColor.WHITE)
      validSquares.push({ index: currentIndex - 16, isCapture: false });
    else validSquares.push({ index: currentIndex + 16, isCapture: false });
  }

  if (!isBlockedOneSquareAhead) {
    if (piece.color === PieceColor.WHITE)
      validSquares.push({ index: currentIndex - 8, isCapture: false });
    else validSquares.push({ index: currentIndex + 8, isCapture: false });
  }

  if (captureLeft) validSquares.push({ index: captureLeft.index, isCapture: true });
  if (captureRight) validSquares.push({ index: captureRight.index, isCapture: true });

  return validSquares;
}

function isPawnBlocked(
  board: BoardState,
  currentIndex: number,
  piece: Piece,
  squaresAhead: number,
  pieceRank: SquareRank
) {
  if (!pieceRank) return;

  if (piece.color === PieceColor.WHITE && pieceRank + squaresAhead <= 8) {
    if (board[currentIndex - 8 * squaresAhead].piece !== null) return true;
    else return false;
  } else if (piece.color === PieceColor.BLACK && pieceRank - squaresAhead > 0) {
    if (board[currentIndex + 8 * squaresAhead].piece !== null) return true;
    else return false;
  }
}

function captureAvailable(
  board: BoardState,
  currentIndex: number,
  piece: Piece,
  isLeft: boolean,
  pieceRank: SquareRank
) {
  if (!pieceRank) return;
  if (pieceRank === 1 && piece.color === PieceColor.BLACK) return;
  if (pieceRank === 8 && piece.color === PieceColor.WHITE) return;
  const pieceFile = getSquareFile(currentIndex);

  if (piece.color === PieceColor.WHITE) {
    if (
      isLeft &&
      pieceFile !== 'h' &&
      board[currentIndex - 7].piece !== null &&
      board[currentIndex - 7].piece?.color !== PieceColor.WHITE
    ) {
      return { index: currentIndex - 7, piece: board[currentIndex - 7].piece };
    } else if (
      !isLeft &&
      pieceFile !== 'a' &&
      board[currentIndex - 9].piece !== null &&
      board[currentIndex - 9].piece?.color !== PieceColor.WHITE
    ) {
      return { index: currentIndex - 9, piece: board[currentIndex - 9].piece };
    }
  } else {
    if (
      isLeft &&
      pieceFile !== 'h' &&
      board[currentIndex + 9].piece !== null &&
      board[currentIndex + 9].piece?.color !== PieceColor.BLACK
    ) {
      return { index: currentIndex + 9, piece: board[currentIndex + 9].piece };
    } else if (
      !isLeft &&
      pieceFile !== 'a' &&
      board[currentIndex + 7].piece &&
      board[currentIndex + 7].piece?.color !== PieceColor.BLACK
    ) {
      return { index: currentIndex + 7, piece: board[currentIndex + 7].piece };
    }
  }
}

function isOnLastRank(piece: Piece, pieceRank: SquareRank) {
  if (piece.color === PieceColor.WHITE && pieceRank === 8) return true;
  else if (piece.color === PieceColor.BLACK && pieceRank === 1) return true;
  else return false;
}

export function isEnpassantCapturePossible(color: PieceColor, currentPos: number, target: number) {
  const attackingSquares = getPawnAttackingIndexes(currentPos, color);
  if (attackingSquares.includes(target)) return true;
  else return false;
}
