import { BoardState, Piece } from '../../../context/board/InitialState';
import { getPieceFile } from '../../generic/pieceLocation';

export function bishopMoveValidation(
  board: BoardState,
  piece: Piece,
  currentIndex: number
) {
  const validMoves: number[] = [];
  // Check the 4 directions
  appendTopLeftDiagonalMoves(board, piece, currentIndex, validMoves);

  return validMoves;
}

function appendTopLeftDiagonalMoves(
  board: BoardState,
  piece: Piece,
  currentIndex: number,
  validMoves: number[]
) {
  let newIndex = currentIndex;
  let pieceFile = getPieceFile(newIndex);

  while (pieceFile !== 'a') {
    newIndex = newIndex - 9;
    pieceFile = getPieceFile(newIndex);

    if (newIndex < 0 || newIndex > 63) break;
    if (pieceFile === 'a') {
      validMoves.push(newIndex);
      break;
    }

    const currentPiece = board[newIndex].piece;

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
