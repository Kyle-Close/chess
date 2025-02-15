import { getRookMovementForCastling } from '../game-checks/getRookMovementForCastling';
import { MoveMetaData } from '../move-execution/buildMoveMetaData';
import { executeMove } from '../move-execution/executeMove';

export function handleCastle(moveMetaData: MoveMetaData) {
  const rookStartEnd = getRookMovementForCastling(moveMetaData.endPosition);
  if (!rookStartEnd) return;

  const rook = moveMetaData.updatedBoard[rookStartEnd.start].piece;
  if (rook) {
    executeMove(moveMetaData.updatedBoard, rookStartEnd.start, rookStartEnd.end);
  }
}
