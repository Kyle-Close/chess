export function getRookMovementForCastling(kingEndPos: number) {
  switch (kingEndPos) {
    case 6:
      // Black king side
      return { start: 7, end: 5 };
    case 2:
      // Black queen side
      return { start: 0, end: 3 };
    case 62:
      // White king side
      return { start: 63, end: 61 };
    case 58:
      // White queen side
      return { start: 56, end: 59 };
    default:
      break;
  }
}
