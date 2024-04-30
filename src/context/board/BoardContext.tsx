import { createContext, useState } from 'react';
import { Pieces } from '../../enums/Pieces';
import { initialBoardState } from './InitialState';

interface BoardProviderProps {
  children: React.ReactNode;
}

interface BoardContext {
  board: Pieces[];
  setBoard: React.Dispatch<React.SetStateAction<Pieces[]>>;
  getPieceAtPosition: (index: number) => Pieces;
}

export const BoardContext = createContext<BoardContext>({
  board: initialBoardState,
  setBoard: () => {},
  getPieceAtPosition: () => {
    return undefined as any;
  },
});

export function BoardProvider({ children }: BoardProviderProps) {
  const [board, setBoard] = useState<Pieces[]>(initialBoardState);

  const getPieceAtPosition = (index: number) => {
    return board[index];
  };

  return (
    <BoardContext.Provider value={{ board, setBoard, getPieceAtPosition }}>
      {children}
    </BoardContext.Provider>
  );
}
