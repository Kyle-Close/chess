import { PieceFile, PieceRank } from '../../analysis/game-checks/pieceLocation';

export function translatePositionToIndex(rank: PieceRank, file: PieceFile) {
  const rankMultiplier = rank - 1;
  const fileAdder = getFileAdder(file);

  return rankMultiplier * 8 + fileAdder;
}

function getFileAdder(file: PieceFile) {
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
  }
}
