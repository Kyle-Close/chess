import { PieceColor } from '../../../enums/PieceColor';
import { CastleRights } from '../../../redux/slices/castleRights';

export function getPlayerCastleRightsFromFen(
  castleRights: string,
  color: PieceColor
): Omit<CastleRights, 'id'> {
  const KING_CHAR = color === PieceColor.WHITE ? 'K' : 'k';
  const QUEEN_CHAR = color === PieceColor.WHITE ? 'Q' : 'q';

  let canCastleKingSide = false;
  let canCastleQueenSide = false;
  let kingSideIsAvailable = false;
  let queenSideIsAvailable = false;

  if (castleRights.includes(KING_CHAR)) {
    canCastleKingSide = true;
    kingSideIsAvailable = true;
  }

  if (castleRights.includes(QUEEN_CHAR)) {
    canCastleQueenSide = true;
    queenSideIsAvailable = true;
  }

  return {
    canCastleKingSide,
    canCastleQueenSide,
    kingSideIsAvailable,
    queenSideIsAvailable,
  };
}
