import { getPieceFile } from '../../generic/pieceLocation';

export function getFileStartIndex(index: number) {
  // The 'start' index refers to the 1st rank indexes.
  // Ex. for any index in file 'c' look to the 1st rank index -> 2

  const file = getPieceFile(index);

  if (file === 'a') return 0;
  else if (file === 'b') return 1;
  else if (file === 'c') return 2;
  else if (file === 'd') return 3;
  else if (file === 'e') return 4;
  else if (file === 'f') return 5;
  else if (file === 'g') return 6;
  else return 7;
}
