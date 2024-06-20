import { translatePositionToIndex } from '../../game-core/board-utility/translatePositionToIndex';
import { SquareRank } from '../../../enums/SquareRank';
import { SquareFile } from '../../../enums/SquareFile';

export function getEnPassantTargetSquareFromFen(fenEnPassantValue: string) {
  if (fenEnPassantValue === '-') return null;
  console.log('here', fenEnPassantValue);
  const file = fenEnPassantValue[0] as SquareFile;
  const rank = Number(fenEnPassantValue[1]) as SquareRank;
  console.log('calling translatePositionToIndex() from getEnPassantTargetSquareFromFen()');
  return translatePositionToIndex(rank, file);
}
