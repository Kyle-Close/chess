// Start of the array is equal to rank 1, file a. Goes from left to right up to rank 8 eventually

import { PieceColor } from '../../enums/PieceColor';
import { PieceType } from '../../enums/PieceType';

export interface Piece {
  type: PieceType;
  color: PieceColor;
  hasMoved: boolean;
}

export interface Square {
  piece: Piece | null;
  isValidMove: boolean;
  isCapture: boolean;
}

export type BoardState = Square[];

export const getInitialBoardState = () => {
  return [
    {
      piece: { type: PieceType.ROOK, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.KNIGHT, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.BISHOP, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.QUEEN, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.KING, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.BISHOP, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.KNIGHT, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.ROOK, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.WHITE, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },

    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },
    { piece: null, isValidMove: false, isCapture: false },

    {
      piece: { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.PAWN, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.ROOK, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.KNIGHT, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.BISHOP, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.QUEEN, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.KING, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.BISHOP, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.KNIGHT, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
    {
      piece: { type: PieceType.ROOK, color: PieceColor.BLACK, hasMoved: false },
      isValidMove: false,
      isCapture: false,
    },
  ];
};
