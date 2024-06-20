import { BoardState, Piece } from '../../../context/board/InitialState';
import { GameState } from '../../../context/game-state/GameState';
import { executeMove } from '../../game-core/move-execution/executeMove';
import { getValidMoves } from '../../game-core/move-execution/getValidMoves';
import { filterCheckMoves } from '../../game-core/piece-validation/filterCheckMoves';
import { kingMoveValidation } from '../../game-core/piece-validation/kingMoveValidation';
import { validatePieceMove } from '../../game-core/piece-validation/validatePieceMove';
import { deepCopyBoard } from '../../utilities/deepCopyBoard';
import { getKingIndex } from './getKingIndex';
import { isKingInCheck } from './isKingInCheck';

export interface PieceWithIndex extends Piece {
  index: number;
}

export function isCheckmate(
  board: BoardState,
  gameState: GameState,
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
    const pieceMoves = getValidMoves(board, piece, piece.index, gameState);
    if (!pieceMoves) return;

    pieceMoves.forEach((move) => {
      const newBoard = deepCopyBoard(board);
      executeMove(newBoard, piece.index, move.index);
      const kingIndex = getKingIndex(board, piece.color);
      if (!isKingInCheck(newBoard, kingIndex, piece.color)) isInCheck = false;
    });

    return !isInCheck;
  });

  if (canBlock) isCheckmate = false;

  return isCheckmate;
}
