import { GameState } from '../../../context/game-state/GameState';
import { MoveMetaData } from '../move-execution/buildMoveMetaData';
import { isMoveValid } from '../move-execution/isMoveValid';

export function updateIsValidMove(moveMetaData: MoveMetaData, gameState: GameState) {
  const { startPosition, endPosition, piece } = moveMetaData;

  if (isMoveValid(moveMetaData.updatedBoard, gameState, piece, startPosition, endPosition))
    moveMetaData.isMoveValid = true;
}
