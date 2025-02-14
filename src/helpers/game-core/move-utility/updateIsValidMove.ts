import { CastleRights } from 'base/redux/slices/castleRights';
import { isMoveValid } from '../move-execution/isMoveValid';
import { MoveMetaData } from '../move-execution/buildMoveMetaData';

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
