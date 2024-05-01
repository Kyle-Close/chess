import { createContext, useState } from 'react';
import { BoardState, Piece, initialBoardState } from './InitialState';

interface BoardProviderProps {
  children: React.ReactNode;
}

interface BoardContext {
  board: BoardState;
  setBoard: React.Dispatch<React.SetStateAction<BoardState>>;
  getPieceAtPosition: (index: number) => Piece | null;
}

export const BoardContext = createContext<BoardContext>({
  board: initialBoardState,
  setBoard: () => {},
  getPieceAtPosition: () => {
    return undefined as any;
  },
});

export function BoardProvider({ children }: BoardProviderProps) {
  const [board, setBoard] = useState<BoardState>(initialBoardState);

  const getPieceAtPosition = (index: number) => {
    return board[index];
  };

  return (
    <BoardContext.Provider value={{ board, setBoard, getPieceAtPosition }}>
      {children}
    </BoardContext.Provider>
  );
}
