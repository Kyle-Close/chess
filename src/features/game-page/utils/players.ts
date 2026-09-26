import { Game } from 'base/zod/GameSchema';
import { Color } from 'base/zod/emums/Color';
import { GameType } from 'base/zod/emums/GameType';

export function getPlayerName(game: Game, color: Color) {
  if (game.type === GameType.STOCKFISH && game.stockfishInfo) {
    return game.stockfishInfo.playingAs === color ? 'Stockfish' : 'You';
  }
  const stored = localStorage.getItem(color === Color.WHITE ? 'whiteName' : 'blackName');
  return stored || (color === Color.WHITE ? 'White' : 'Black');
}

export function getStrengthTier(strength: number) {
  if (strength < 4) return { label: 'Beginner', color: '#6fcf97' };
  if (strength < 10) return { label: 'Intermediate', color: '#6aa9ff' };
  if (strength < 17) return { label: 'Advanced', color: '#f2a65a' };
  return { label: 'Master', color: '#ff6b6b' };
}

export const TIME_CONTROLS = [
  { value: '0', minutes: 60, name: 'Classical' },
  { value: '1', minutes: 10, name: 'Rapid' },
  { value: '2', minutes: 3, name: 'Blitz' },
  { value: '3', minutes: 1, name: 'Bullet' },
];
