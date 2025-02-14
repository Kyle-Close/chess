import { Piece } from "base/context/board/InitialState";
import { useAppDispatch, useAppSelector } from "./useBoard";
import { deepCopyBoard } from "base/helpers/utilities/deepCopyBoard";
import { setupBoard } from "base/redux/slices/board";

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

export enum PieceColor {
  WHITE = 0,
  BLACK,
}

export enum PieceType {
  PAWN,
  KNIGHT,
  BISHOP,
  ROOK,
  QUEEN,
  KING,
}
