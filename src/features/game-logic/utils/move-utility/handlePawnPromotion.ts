import { assignPieceToSquare } from 'base/features/game-board/utils/board-management/assignPieceToSquare';
import { MoveMetaData } from '../move-execution/buildMoveMetaData';

export function handlePawnPromotion(moveMetaData: MoveMetaData) {
  if (!moveMetaData.promotionPiece) return;

  assignPieceToSquare(
    moveMetaData.updatedBoard,
    moveMetaData.promotionPiece,
    moveMetaData.endPosition
  );
}
