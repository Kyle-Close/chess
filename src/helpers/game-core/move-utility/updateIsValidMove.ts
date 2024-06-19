import { GameState } from '../../../context/game-state/GameState';
import { UsePlayerReturn } from '../../../hooks/usePlayer';
import { MoveMetaData } from '../move-execution/buildMoveMetaData';
import { isMoveValid } from '../move-execution/isMoveValid';

export function updateIsValidMove(
  moveMetaData: MoveMetaData,
  currentPlayer: UsePlayerReturn,
  gameState: GameState
) {
  const { startPosition, endPosition, piece } = moveMetaData;
  const { castleRights } = currentPlayer;
  const { enPassantSquare } = gameState;

  if (
    isMoveValid(
      moveMetaData.updatedBoard,
      piece,
      startPosition,
      endPosition,
      castleRights,
      enPassantSquare
    )
  )
    moveMetaData.isMoveValid = true;
}
