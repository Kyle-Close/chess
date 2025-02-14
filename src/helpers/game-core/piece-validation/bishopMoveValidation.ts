import { BoardState, Piece } from 'base/context/board/InitialState';
import { ValidMoves, updateValidSquaresToIncludeCaptures } from './kingMoveValidation';
import { getSquareFile } from 'base/helpers/analysis/board-mapping/getSquareFile';
import { SquareFile } from 'base/features/game-board/hooks/useSquare';

export function bishopMoveValidation(board: BoardState, piece: Piece, currentIndex: number) {
  const validMoves: ValidMoves[] = [];

  // UP and to the LEFT
  appendDiagonalMoves(
    board,
    piece,
    currentIndex,
    validMoves,
    getJumpCount(true, true),
    getLastFile(true)
  );

  // DOWN and to the LEFT
  appendDiagonalMoves(
    board,
    piece,
    currentIndex,
    validMoves,
    getJumpCount(false, true),
    getLastFile(true)
  );

  // UP and to the RIGHT
  appendDiagonalMoves(
    board,
    piece,
    currentIndex,
    validMoves,
    getJumpCount(true, false),
    getLastFile(false)
  );

  // DOWN and to the RIGHT
  appendDiagonalMoves(
    board,
    piece,
    currentIndex,
    validMoves,
    getJumpCount(false, false),
    getLastFile(false)
  );

  return updateValidSquaresToIncludeCaptures(board, piece, validMoves);
}

export function appendDiagonalMoves(
  board: BoardState,
  piece: Piece,
  currentIndex: number,
  validSquares: ValidMoves[],
  jumpCount: number,
  lastFile: SquareFile
) {
  let newIndex = currentIndex;
  let pieceFile = getSquareFile(newIndex);

  while (pieceFile !== lastFile) {
    newIndex = newIndex + jumpCount;
    if (newIndex < 0 || newIndex > 63) break;

    pieceFile = getSquareFile(newIndex);
    const currentPiece = board[newIndex].piece;

    if (pieceFile === lastFile) {
      if (currentPiece && currentPiece.color === piece.color) break;
      validSquares.push({ index: newIndex, isCapture: false });
      break;
    }

    if (currentPiece !== null) {
      if (currentPiece.color === piece.color) break;
      else {
        validSquares.push({ index: newIndex, isCapture: false });
        break;
      }
    } else {
      validSquares.push({ index: newIndex, isCapture: false });
    }
  }
}

export function getJumpCount(isTop: boolean, isLeft: boolean) {
  if (isLeft) {
    if (isTop) return -9;
    else return 7;
  } else {
    if (isTop) return -7;
    else return 9;
  }
}

export function getLastFile(isLeft: boolean) {
  if (isLeft) return 'a';
  else return 'h';
}
