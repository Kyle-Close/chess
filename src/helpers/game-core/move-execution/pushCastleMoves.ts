import { PieceColor } from '../../../enums/PieceColor';
import { UsePlayerReturn } from '../../../hooks/usePlayer';
import { ValidMoves } from '../piece-validation/kingMoveValidation';

export function pushCastleMoves(validMoves: ValidMoves[], player: UsePlayerReturn) {
  if (player.color === PieceColor.WHITE) {
    if (player.castleRights.canCastleKingSide) validMoves.push({ index: 6, isCapture: false });
    if (player.castleRights.canCastleQueenSide) validMoves.push({ index: 2, isCapture: false });
  } else {
    if (player.castleRights.canCastleKingSide) validMoves.push({ index: 62, isCapture: false });
    if (player.castleRights.canCastleQueenSide) validMoves.push({ index: 58, isCapture: false });
  }
}
