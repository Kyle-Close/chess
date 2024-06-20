import { SquareFile } from '../../../enums/SquareFile';
import { SquareRank } from '../../../enums/SquareRank';

export function translatePositionToIndex(rank: SquareRank, file: SquareFile) {
  const rankMultiplier = rank - 1;
  console.log(file);
  const fileAdder = getFileAdder(file);

  return rankMultiplier * 8 + fileAdder;
}

function getFileAdder(file: SquareFile) {
  switch (file) {
    case 'a':
      return 0;
    case 'b':
      return 1;
    case 'c':
      return 2;
    case 'd':
      return 3;
    case 'e':
      return 4;
    case 'f':
      return 5;
    case 'g':
      return 6;
    case 'h':
      return 7;
    default:
      throw Error('Invalid File');
  }
}
