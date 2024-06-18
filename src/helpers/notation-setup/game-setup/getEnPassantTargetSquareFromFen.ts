import { translatePositionToIndex } from '../../game-core/board-utility/translatePositionToIndex';
import { SquareRank } from '../../../enums/SquareRank';
import { SquareFile } from '../../../enums/SquareFile';

export function getEnPassantTargetSquareFromFen(fenEnPassantValue: string) {
  if (fenEnPassantValue === '-') return null;
  const file = fenEnPassantValue[0] as SquareFile;
  const rank = Number(fenEnPassantValue[1]) as SquareRank;
  return translatePositionToIndex(rank, file);
}
