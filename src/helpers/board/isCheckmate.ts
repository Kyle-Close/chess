import { BoardState, Piece } from '../../context/board/InitialState';
import { executeMove } from '../move/executeMove';
import { filterCheckMoves } from '../validations/filterCheckMoves';
import { kingMoveValidation } from '../validations/pieces/kingMoveValidation';
import { validatePieceMove } from '../validations/validatePieceMove';
import { copyBoardAndUpdate } from './copyBoardAndUpdate';
import { getKingIndex } from './getKingIndex';
import { isKingInCheck } from './isKingInCheck';

export interface PieceWithIndex extends Piece {
  index: number;
}

export function isCheckmate(
  board: BoardState,
  kingPiece: Piece,
  currentIndex: number,
  remainingPlayerPieces: PieceWithIndex[]
) {
  // This should only be called if the player is already in check
  let isCheckmate = false;

  let kingMoves = kingMoveValidation(board, kingPiece, currentIndex);
  kingMoves = filterCheckMoves(kingMoves, board, kingPiece, currentIndex);
  if (kingMoves.length === 0) isCheckmate = true;

  const canBlock = remainingPlayerPieces.some((piece) => {
    let isInCheck = true;
    const pieceMoves = validatePieceMove(board, piece, piece.index);
    if (!pieceMoves) return;

    pieceMoves.forEach((move) => {
      const newBoard = [...board];
      executeMove(newBoard, piece.index, move.index);
      const kingIndex = getKingIndex(board, piece.color);
      if (!isKingInCheck(newBoard, kingIndex, piece.color)) isInCheck = false;
    });

    return !isInCheck;
  });

  if (canBlock) isCheckmate = false;

  return isCheckmate;
}
