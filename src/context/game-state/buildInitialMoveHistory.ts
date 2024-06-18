import { MoveHistory } from '../types/MoveHistory';

export function buildInitialMoveHistory(): MoveHistory[] {
  return [
    {
      chessNotation: '',
      fenString: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    },
  ];
}
