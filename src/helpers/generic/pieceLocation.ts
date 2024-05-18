export function getPieceFile(currentIndex: number) {
  if (currentIndex % 8 === 0 || currentIndex === 0) return 'a';
  else if ((currentIndex - 1) % 8 === 0 || currentIndex === 1) return 'b';
  else if ((currentIndex - 2) % 8 === 0 || currentIndex === 2) return 'c';
  else if ((currentIndex - 3) % 8 === 0 || currentIndex === 3) return 'd';
  else if ((currentIndex - 4) % 8 === 0 || currentIndex === 4) return 'e';
  else if ((currentIndex - 5) % 8 === 0 || currentIndex === 5) return 'f';
  else if ((currentIndex - 6) % 8 === 0 || currentIndex === 6) return 'g';
  else if ((currentIndex - 7) % 8 === 0 || currentIndex === 7) return 'h';
}

export function getPieceRank(currentIndex: number) {
  if (currentIndex < 8) return 1;
  else if (currentIndex >= 8 && currentIndex < 16) return 2;
  else if (currentIndex >= 16 && currentIndex < 24) return 3;
  else if (currentIndex >= 24 && currentIndex < 32) return 4;
  else if (currentIndex >= 32 && currentIndex < 40) return 5;
  else if (currentIndex >= 40 && currentIndex < 48) return 6;
  else if (currentIndex >= 48 && currentIndex < 56) return 7;
  else if (currentIndex >= 56 && currentIndex < 64) return 8;
  else return null;
}

export type PieceRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | null;
