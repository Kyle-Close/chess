import { Piece } from '../context/board/InitialState';
import { PieceColor } from '../enums/PieceColor';
import { useAppDispatch, useAppSelector } from './useBoard';
import { deepCopyBoard } from '../helpers/utilities/deepCopyBoard';
import { setupBoard } from '../redux/slices/board';

export function usePiece() {
  const board = useAppSelector((state) => state.board);
  const dispatch = useAppDispatch();
  const move = (piece: Piece, startIndex: number, endIndex: number) => {
    piece.hasMoved = true;

    const copy = deepCopyBoard(board);
    copy[startIndex] = { piece: null, isValidMove: false, isCapture: false };
    copy[endIndex] = { piece, isValidMove: false, isCapture: false };

    dispatch(setupBoard(copy));
  };

  const isWhite = (piece: Piece) => {
    return piece.color === PieceColor.WHITE;
  };

  return {
    move,
    isWhite,
  };
}
