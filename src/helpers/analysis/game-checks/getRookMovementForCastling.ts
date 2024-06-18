export function getRookMovementForCastling(kingEndPos: number) {
  switch (kingEndPos) {
    case 6:
      return { start: 7, end: 5 };
    case 2:
      return { start: 0, end: 3 };
    case 62:
      return { start: 63, end: 61 };
    case 58:
      return { start: 56, end: 59 };
    default:
      break;
  }
}
