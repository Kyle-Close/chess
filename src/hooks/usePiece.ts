import { useContext } from 'react';
import { BoardContext } from '../context/board/BoardContext';
import { Piece } from '../context/board/InitialState';
import { PieceColor } from '../enums/PieceColor';

export function usePiece() {
  const { setBoard } = useContext(BoardContext);
  const move = (piece: Piece, startIndex: number, endIndex: number) => {
    piece.hasMoved = true;
    setBoard((prevBoard) => {
      const copy = [...prevBoard];
      copy[startIndex] = { piece: null, isValidMove: false, isCapture: false };
      copy[endIndex] = { piece, isValidMove: false, isCapture: false };
      return copy;
    });
  };

  const isWhite = (piece: Piece) => {
    return piece.color === PieceColor.WHITE;
  };

  return {
    move,
    isWhite,
  };
}
