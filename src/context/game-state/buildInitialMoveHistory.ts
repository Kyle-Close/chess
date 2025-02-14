import { DEFAULT_FEN_STRING } from '../../data/defaultFen';
import { MoveHistory } from '../types/MoveHistory';

export function buildInitialMoveHistory(): MoveHistory[] {
  return [
    {
      chessNotation: '',
      fenString: DEFAULT_FEN_STRING,
    },
  ];
}
