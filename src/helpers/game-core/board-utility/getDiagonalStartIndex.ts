import { getSquareFile } from '../../analysis/board-mapping/getSquareFile';

export function getDiagonalStartIndex(index: number, isTopLeftToBottomRight: boolean) {
  let result = index;
  if (isTopLeftToBottomRight) {
    let nextIndex = index;
    let file = getSquareFile(nextIndex);
    if (file === 'a') return result;

    while (true) {
      nextIndex = nextIndex - 9;
      if (nextIndex < 0) break;
      const file = getSquareFile(nextIndex);
      if (file === 'a') {
        result = nextIndex;
        break;
      }
      result = nextIndex;
    }
  } else {
    let nextIndex = index;
    let file = getSquareFile(nextIndex);
    if (file === 'h') return result;

    while (true) {
      nextIndex = nextIndex - 7;
      if (nextIndex < 0) break;
      const file = getSquareFile(nextIndex);
      if (file === 'h') {
        result = nextIndex;
        break;
      }
      result = nextIndex;
    }
  }
  return result;
}
