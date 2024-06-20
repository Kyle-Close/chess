import { BoardState, Piece } from '../../../context/board/InitialState';
import { GameState } from '../../../context/game-state/GameState';
import { PieceType } from '../../../enums/PieceType';
import { UsePlayerReturn } from '../../../hooks/usePlayer';
import { validatePieceMove } from '../piece-validation/validatePieceMove';
import { pushCastleMoves } from './pushCastleMoves';

export function getValidMoves(
  currentPlayer: UsePlayerReturn,
  piece: Piece,
  startPos: number,
  board: BoardState,
  gameState: GameState
) {
  console.log('Calling validatePieceMove() from getValidMoves()');
  const validMoves = validatePieceMove(
    board,
    piece,
    startPos,
    undefined,
    gameState.enPassantSquare
  );
  if (piece.type === PieceType.KING && validMoves) pushCastleMoves(validMoves, currentPlayer);
  return validMoves;
}
