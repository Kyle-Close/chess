import { Pieces } from '../enums/Pieces';

export function usePiece() {
  const move = (
    setGameBoard: React.Dispatch<React.SetStateAction<Pieces[]>>,
    piece: Pieces,
    startIndex: number,
    endIndex: number
  ) => {
    setGameBoard((prevGameBoard) => {
      const copy = [...prevGameBoard];
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
