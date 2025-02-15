export function getSquareFile(currentIndex: number) {
  if (currentIndex % 8 === 0 || currentIndex === 0) return 'a';
  else if ((currentIndex - 1) % 8 === 0 || currentIndex === 1) return 'b';
  else if ((currentIndex - 2) % 8 === 0 || currentIndex === 2) return 'c';
  else if ((currentIndex - 3) % 8 === 0 || currentIndex === 3) return 'd';
  else if ((currentIndex - 4) % 8 === 0 || currentIndex === 4) return 'e';
  else if ((currentIndex - 5) % 8 === 0 || currentIndex === 5) return 'f';
  else if ((currentIndex - 6) % 8 === 0 || currentIndex === 6) return 'g';
  else if ((currentIndex - 7) % 8 === 0 || currentIndex === 7) return 'h';
  else throw Error('Index out of bounds');
}
