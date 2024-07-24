import { CastleRights } from '../../../redux/slices/castleRights';
import { Player } from '../../../redux/slices/player';
import { getKingIndex } from '../../analysis/game-checks/getKingIndex';
import { isCheckmate } from '../../analysis/game-checks/isCheckmate';
import { isKingInCheck } from '../../analysis/game-checks/isKingInCheck';
import { MoveMetaData } from '../move-execution/buildMoveMetaData';
import { getRemainingPiecesByColor } from '../piece-management/getRemainingPiecesByColor';

export function handleOpponentCheckState(
  moveMetaData: MoveMetaData,
  waitingPlayer: Player,
  castleRights: CastleRights,
  enPassantSquare: number | null
) {
  // See if move put opponent in check and/or checkmate
  const oppKingIndex = getKingIndex(moveMetaData.updatedBoard, waitingPlayer.color);
  if (!isKingInCheck(moveMetaData.updatedBoard, oppKingIndex, waitingPlayer.color)) return;

  moveMetaData.isCheck = true;
  const oppKing = moveMetaData.updatedBoard[oppKingIndex].piece;
  if (!oppKing) return;

  const oppRemainingPlayerPieces = getRemainingPiecesByColor(
    moveMetaData.updatedBoard,
    oppKing.color,
    true
  );

  if (
    isCheckmate(
      moveMetaData.updatedBoard,
      oppKing,
      oppKingIndex,
      oppRemainingPlayerPieces,
      castleRights,
      enPassantSquare
    )
  )
    moveMetaData.isCheckmate = true;
}
