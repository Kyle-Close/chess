import { assignPieceToSquare } from '../board-management/assignPieceToSquare';
import { MoveMetaData } from '../move-execution/buildMoveMetaData';

export function handlePawnPromotion(moveMetaData: MoveMetaData) {
  if (!moveMetaData.promotionPiece) return;

  assignPieceToSquare(
    moveMetaData.updatedBoard,
    moveMetaData.promotionPiece,
    moveMetaData.endPosition
  );
}
