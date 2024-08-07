import { BoardState, Piece } from '../../../context/board/InitialState';
import { getCapturedPiece } from '../piece-management/getCapturedPiece';
import { CastleMetaData, getCastleMetaData } from './getCastleMetaData';
import { isMoveCapture } from './isMoveCapture';
import { isMoveCastle } from './isMoveCastle';
import { isMoveEnPassant } from './isMoveEnPassant';
import { isMovePawnPromotion } from './isMovePawnPromotion';

export interface MoveMetaData {
  isMoveValid: boolean;
  piece: Piece;
  isCheck: boolean; // Indicates if this move puts opponent in check
  isCheckmate: boolean;
  isEnPassant: boolean;
  enPassantNotation: string;
  isCastle: boolean;
  castleMetaData: CastleMetaData | null;
  isPromotion: boolean;
  isCapture: boolean;
  capturedPiece: Piece | null;
  startPosition: number;
  endPosition: number;
  updatedBoard: BoardState;
  halfMoves: number;
}

export function buildMoveMetaData(
  board: BoardState,
  enPassantSquare: number | null,
  piece: Piece,
  startPosition: number,
  endPosition: number
): MoveMetaData {
  const isEnPassant = isMoveEnPassant(piece, endPosition, enPassantSquare);
  const isCastle = isMoveCastle(piece, startPosition, endPosition);
  const castleMetaData = isCastle ? getCastleMetaData(piece, startPosition, endPosition) : null;
  const isPromotion = isMovePawnPromotion(piece, endPosition);
  const isCapture = isMoveCapture(board, endPosition);
  const capturedPiece = getCapturedPiece(board, endPosition);
  const isMoveValid = false;

  return {
    isMoveValid,
    isCheck: false,
    isCheckmate: false,
    piece,
    isEnPassant,
    enPassantNotation: '-',
    isCastle,
    castleMetaData,
    isPromotion,
    isCapture,
    capturedPiece,
    startPosition,
    endPosition,
    updatedBoard: [...board],
    halfMoves: 0,
  };
}
