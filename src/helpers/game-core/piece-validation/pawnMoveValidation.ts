import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';
import { SquareRank } from '../../../enums/SquareRank';
import { getSquareFile } from '../../analysis/board-mapping/getSquareFile';
import { getSquareRank } from '../../analysis/board-mapping/getSquareRank';
import { getPawnAttackingIndexes } from '../../analysis/game-checks/getPawnAttackingIndexes';
import { ValidSquares } from './kingMoveValidation';

export function pawnMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number,
  enPassantTargetSquare?: number | null
) {
  const validSquares: ValidSquares[] = [];
  const pieceRank = getSquareRank(currentIndex);

  if (isOnLastRank(piece, pieceRank)) return [];

  const isBlockedOneSquareAhead = isPawnBlocked(board, currentIndex, piece, 1, pieceRank);
  const isBlockedTwoSquaresAhead = isPawnBlocked(
    board,
    currentIndex,
    piece,
    2,
    pieceRank
  );
  const captureLeft = captureAvailable(board, currentIndex, piece, true, pieceRank);
  const captureRight = captureAvailable(board, currentIndex, piece, false, pieceRank);

  if (!piece.hasMoved && !isBlockedOneSquareAhead && !isBlockedTwoSquaresAhead) {
    if (piece.color === PieceColor.WHITE)
      validSquares.push({ index: currentIndex + 16, isCapture: false });
    else validSquares.push({ index: currentIndex - 16, isCapture: false });
  }

  if (!isBlockedOneSquareAhead) {
    if (piece.color === PieceColor.WHITE)
      validSquares.push({ index: currentIndex + 8, isCapture: false });
    else validSquares.push({ index: currentIndex - 8, isCapture: false });
  }

  if (captureLeft) validSquares.push({ index: captureLeft.index, isCapture: true });
  if (captureRight) validSquares.push({ index: captureRight.index, isCapture: true });

  if (
    enPassantTargetSquare &&
    piece.color !== null &&
    isEnpassantCapturePossible(piece.color, currentIndex, enPassantTargetSquare)
  ) {
    validSquares.push({ index: enPassantTargetSquare, isCapture: true });
  }

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
    if (board[currentIndex + 8 * squaresAhead].piece !== null) return true;
    else return false;
  } else if (piece.color === PieceColor.BLACK && pieceRank - squaresAhead > 0) {
    if (board[currentIndex - 8 * squaresAhead].piece !== null) return true;
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
      pieceFile !== 'a' &&
      board[currentIndex + 7].piece !== null &&
      board[currentIndex + 7].piece?.color !== PieceColor.WHITE
    ) {
      return { index: currentIndex + 7, piece: board[currentIndex + 7].piece };
    } else if (
      !isLeft &&
      pieceFile !== 'h' &&
      board[currentIndex + 9].piece !== null &&
      board[currentIndex + 9].piece?.color !== PieceColor.WHITE
    ) {
      return { index: currentIndex + 9, piece: board[currentIndex + 9].piece };
    }
  } else {
    if (
      isLeft &&
      pieceFile !== 'a' &&
      board[currentIndex - 9].piece !== null &&
      board[currentIndex - 9].piece?.color !== PieceColor.BLACK
    ) {
      return { index: currentIndex - 9, piece: board[currentIndex - 9].piece };
    } else if (
      !isLeft &&
      pieceFile !== 'h' &&
      board[currentIndex - 7].piece &&
      board[currentIndex - 7].piece?.color !== PieceColor.BLACK
    ) {
      return { index: currentIndex - 7, piece: board[currentIndex - 7].piece };
    }
  }
}

function isOnLastRank(piece: Piece, pieceRank: SquareRank) {
  if (piece.color === PieceColor.WHITE && pieceRank === 8) return true;
  else if (piece.color === PieceColor.BLACK && pieceRank === 1) return true;
  else return false;
}

export function isEnpassantCapturePossible(
  color: PieceColor,
  currentPos: number,
  target: number
) {
  const attackingSquares = getPawnAttackingIndexes(currentPos, color);
  if (attackingSquares.includes(target)) return true;
  else return false;
}
