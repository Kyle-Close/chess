import { CastleRights } from '../../hooks/useCastleRights';

export function buildFenCastleSegment(
  whiteCastleRights: CastleRights,
  blackCastleRights: CastleRights
) {
  let castleString = '';

  if (whiteCastleRights.kingSideIsAvailable) castleString += 'K';
  if (whiteCastleRights.queenSideIsAvailable) castleString += 'Q';

  if (blackCastleRights.kingSideIsAvailable) castleString += 'k';
  if (blackCastleRights.queenSideIsAvailable) castleString += 'q';

  if (castleString === '') castleString += '-';

  return castleString;
}
