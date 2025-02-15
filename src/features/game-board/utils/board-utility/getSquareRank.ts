export function getSquareRank(currentIndex: number) {
  if (currentIndex < 8) return 8;
  else if (currentIndex >= 8 && currentIndex < 16) return 7;
  else if (currentIndex >= 16 && currentIndex < 24) return 6;
  else if (currentIndex >= 24 && currentIndex < 32) return 5;
  else if (currentIndex >= 32 && currentIndex < 40) return 4;
  else if (currentIndex >= 40 && currentIndex < 48) return 3;
  else if (currentIndex >= 48 && currentIndex < 56) return 2;
  else if (currentIndex >= 56 && currentIndex < 64) return 1;
  else throw Error('Invalid index passed to getSquareRank: ' + currentIndex);
}
