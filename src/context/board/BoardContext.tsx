import { createContext, useState } from 'react';
import { BoardState, Piece, initialBoardState } from './InitialState';

interface BoardProviderProps {
  children: React.ReactNode;
}

interface BoardContext {
  board: BoardState;
  setBoard: React.Dispatch<React.SetStateAction<BoardState>>;
  getPieceAtPosition: (index: number) => Piece | null;
  initializeBoard: (board: BoardState) => void;
  clearIsValidSquares: () => void;
}

export const BoardContext = createContext<BoardContext>({
  board: initialBoardState,
  setBoard: () => {},
  getPieceAtPosition: () => {
    return undefined as any;
  },
  initializeBoard: () => {},
  clearIsValidSquares: () => {},
});

export function BoardProvider({ children }: BoardProviderProps) {
  const [board, setBoard] = useState<BoardState>(initialBoardState);

  const getPieceAtPosition = (index: number) => {
    return board[index].piece;
  };

  const initializeBoard = (board: BoardState) => {
    setBoard(board);
  };

  const clearIsValidSquares = () => {
    setBoard((prevBoard) => {
      const copy = [...prevBoard];
      copy.forEach((square) => {
        square.isValidMove = false;
        square.isCapture = false;
      });
      return copy;
    });
  };

  return (
    <BoardContext.Provider
      value={{
        board,
        setBoard,
        getPieceAtPosition,
        initializeBoard,
        clearIsValidSquares,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
