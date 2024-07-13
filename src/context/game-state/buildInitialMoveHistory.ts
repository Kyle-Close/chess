import { DEFAULT_FEN_STRING } from '../../constants/defaultFen';
import { MoveHistory } from '../types/MoveHistory';

export function buildInitialMoveHistory(): MoveHistory[] {
  return [
    {
      chessNotation: '',
      fenString: DEFAULT_FEN_STRING,
    },
  ];
}
