import { Piece } from "base/data/getInitialBoardState";
import { useAppDispatch, useAppSelector } from "./useBoard";
import { setupBoard } from "base/redux/slices/board";
import { deepCopyBoard } from "../utils/board-utility/deepCopyBoard";

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
