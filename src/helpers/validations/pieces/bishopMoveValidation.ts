import { BoardState, Piece } from '../../../context/board/InitialState';
import { PieceFile, getPieceFile } from '../../generic/pieceLocation';

export function bishopMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  const validMoves: number[] = [];

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

  return validMoves;
}

export function appendDiagonalMoves(
  board: BoardState,
  piece: Piece,
  currentIndex: number,
  validMoves: number[],
  jumpCount: number,
  lastFile: PieceFile
) {
  let newIndex = currentIndex;
  let pieceFile = getPieceFile(newIndex);

  while (pieceFile !== lastFile) {
    newIndex = newIndex + jumpCount;
    if (newIndex < 0 || newIndex > 63) break;

    pieceFile = getPieceFile(newIndex);
    const currentPiece = board[newIndex].piece;

    if (pieceFile === lastFile) {
      if (currentPiece && currentPiece.color === piece.color) break;
      validMoves.push(newIndex);
      break;
    }

    if (currentPiece !== null) {
      if (currentPiece.color === piece.color) break;
      else {
        validMoves.push(newIndex);
        break;
      }
    } else {
      validMoves.push(newIndex);
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
