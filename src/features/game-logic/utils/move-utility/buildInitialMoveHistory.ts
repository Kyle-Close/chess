import { DEFAULT_FEN_STRING } from '../../../../data/defaultFen';

export interface MoveHistory {
  chessNotation: string;
  fenString: string;
}

export function buildInitialMoveHistory(): MoveHistory[] {
  return [
    {
      chessNotation: '',
      fenString: DEFAULT_FEN_STRING,
    },
  ];
}
