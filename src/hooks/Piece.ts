import { useContext } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { Piece } from '../context/board/InitialState';

export function usePiece() {
  const { setBoard } = useContext(BoardContext);
  const move = (piece: Piece, startIndex: number, endIndex: number) => {
    piece.hasMoved = true;
    setBoard((prevBoard) => {
      const copy = [...prevBoard];
      copy[startIndex] = { piece: null, isValidMove: false };
      copy[endIndex] = { piece, isValidMove: false };
      return copy;
    });
  };

  const isWhite = (piece: Piece) => {
    return piece.type < 7;
  };

  const isEmpty = (piece: Piece) => {
    return piece === null;
  };

  return {
    move,
    isWhite,
    isEmpty,
  };
}
