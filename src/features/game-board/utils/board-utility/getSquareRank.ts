import { BoardRank } from "../../../../zod/emums/BoardRank";

export function getSquareRank(index: number): BoardRank {
  if (index < 8) return BoardRank.EIGHT;
  else if (index >= 8 && index < 16) return BoardRank.SEVEN;
  else if (index >= 16 && index < 24) return BoardRank.SIX;
  else if (index >= 24 && index < 32) return BoardRank.FIVE;
  else if (index >= 32 && index < 40) return BoardRank.FOUR;
  else if (index >= 40 && index < 48) return BoardRank.THREE;
  else if (index >= 48 && index < 56) return BoardRank.TWO;
  else if (index >= 56 && index < 64) return BoardRank.ONE;

  throw new Error("Invalid index passed to getSquareRank: " + index);
}
