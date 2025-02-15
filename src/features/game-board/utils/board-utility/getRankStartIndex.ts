export function getRankStartIndex(index: number) {
  if (index < 8) return 0;
  else if (index >= 8 && index < 16) return 8;
  else if (index >= 16 && index < 24) return 16;
  else if (index >= 24 && index < 32) return 24;
  else if (index >= 32 && index < 40) return 32;
  else if (index >= 40 && index < 48) return 40;
  else if (index >= 48 && index < 56) return 48;
  else return 56;
}
