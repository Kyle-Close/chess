export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

/** Returns true for a usable FEN (or an empty value), otherwise a human-readable problem */
export function validateFen(value?: string): true | string {
  const fen = value?.trim();
  if (!fen) return true;

  const [placement, turn] = fen.split(/\s+/);
  const ranks = placement.split('/');
  if (ranks.length !== 8) return `Expected 8 ranks separated by "/", found ${ranks.length}.`;

  for (let i = 0; i < 8; i++) {
    let squares = 0;
    for (const char of ranks[i]) {
      if (/[1-8]/.test(char)) squares += Number(char);
      else if (/[pnbrqkPNBRQK]/.test(char)) squares += 1;
      else return `Unexpected character "${char}" on rank ${8 - i}.`;
    }
    if (squares !== 8) return `Rank ${8 - i} describes ${squares} squares instead of 8.`;
  }

  if ((placement.match(/K/g) ?? []).length !== 1 || (placement.match(/k/g) ?? []).length !== 1) {
    return 'Each side needs exactly one king.';
  }
  if (turn && turn !== 'w' && turn !== 'b') return 'Side to move must be "w" or "b".';

  return true;
}

export function getFenPlacement(value?: string) {
  const fen = value?.trim();
  if (!fen || validateFen(fen) !== true) return START_FEN.split(' ')[0];
  return fen.split(/\s+/)[0];
}

export function getFenError(value?: string) {
  const result = validateFen(value);
  return result === true ? undefined : result;
}
