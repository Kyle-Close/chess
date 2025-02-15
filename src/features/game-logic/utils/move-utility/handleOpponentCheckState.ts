import { CastleRights } from 'base/redux/slices/castleRights';
import { MoveMetaData } from '../move-execution/buildMoveMetaData';
import { getRemainingPiecesByColor } from '../piece-management/getRemainingPiecesByColor';
import { Player } from 'base/redux/slices/player';
import { getKingIndex } from '../game-checks/getKingIndex';
import { isKingInCheck } from '../game-checks/isKingInCheck';
import { isCheckmate } from '../game-checks/isCheckmate';

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
