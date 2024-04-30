import { useContext } from 'react';
import { Pieces } from '../enums/Pieces';
import { BoardContext } from '../context/board/BoardContext';

export function usePiece() {
  const { setBoard } = useContext(BoardContext);
  const move = (piece: Pieces, startIndex: number, endIndex: number) => {
    setBoard((prevBoard) => {
      const copy = [...prevBoard];
      copy[startIndex] = Pieces.EMPTY;
      copy[endIndex] = piece;
      return copy;
    });
  };

  const isWhite = (piece: Pieces) => {
    return piece < 7;
  };

  const isEmpty = (piece: Pieces) => {
    return piece === Pieces.EMPTY;
  };

  return {
    move,
    isWhite,
    isEmpty,
  };
}
