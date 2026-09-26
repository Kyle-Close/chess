// Board index 0 is a8, 63 is h1
export function getSquareName(index: number) {
  return 'abcdefgh'[index % 8] + (8 - Math.floor(index / 8));
}
