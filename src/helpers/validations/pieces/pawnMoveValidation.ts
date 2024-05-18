import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceColor } from '../../../enums/PieceColor';
import {
  PieceRank,
  getPieceFile,
  getPieceRank,
} from '../../generic/pieceLocation';

export function pawnMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  const validSquares: number[] = [];
  const pieceRank = getPieceRank(currentIndex);
  const isBlockedOneSquareAhead = isPawnBlocked(
    board,
    currentIndex,
    piece,
    1,
    pieceRank
  );
  const isBlockedTwoSquaresAhead = isPawnBlocked(
    board,
    currentIndex,
    piece,
    2,
    pieceRank
  );
  const captureLeft = captureAvailable(
    board,
    currentIndex,
    piece,
    true,
    pieceRank
  );
  const captureRight = captureAvailable(
    board,
    currentIndex,
    piece,
    false,
    pieceRank
  );

  if (
    !piece.hasMoved &&
    !isBlockedOneSquareAhead &&
    !isBlockedTwoSquaresAhead
  ) {
    if (piece.color === PieceColor.WHITE) validSquares.push(currentIndex + 16);
    else validSquares.push(currentIndex - 16);
  }

  if (!isBlockedOneSquareAhead) {
    if (piece.color === PieceColor.WHITE) validSquares.push(currentIndex + 8);
    else validSquares.push(currentIndex - 8);
  }

  if (captureLeft) validSquares.push(captureLeft.index);
  if (captureRight) validSquares.push(captureRight.index);

  return validSquares;
}

function isPawnBlocked(
  board: BoardState,
  currentIndex: number,
  piece: Piece,
  squaresAhead: number,
  pieceRank: PieceRank
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
  pieceRank: PieceRank
) {
  if (!pieceRank) return;
  if (pieceRank === 1 && piece.color === PieceColor.BLACK) return;
  if (pieceRank === 8 && piece.color === PieceColor.WHITE) return;
  const pieceFile = getPieceFile(currentIndex);

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
