import { getPieceFile } from '../generic/pieceLocation';

export function getDiagonalStartIndex(index: number, isTopLeftToBottomRight: boolean) {
  let result = index;
  if (isTopLeftToBottomRight) {
    let nextIndex = index;
    while (true) {
      nextIndex = nextIndex - 9;
      if (nextIndex < 0) break;
      const file = getPieceFile(nextIndex);
      if (file === 'a') {
        result = nextIndex;
        break;
      }
      result = nextIndex;
    }
  }
  return result;
}
