import { CastleRights } from '../../../redux/slices/castleRights';
import { MoveMetaData } from '../move-execution/buildMoveMetaData';
import { isMoveValid } from '../move-execution/isMoveValid';

export function updateIsValidMove(
  moveMetaData: MoveMetaData,
  castleRights: CastleRights,
  enPassantSquare: number | null
) {
  const { startPosition, endPosition, piece } = moveMetaData;

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
