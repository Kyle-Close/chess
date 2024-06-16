import { GameState } from '../../../context/GameState';
import { BoardState, Piece } from '../../../context/board/InitialState';
import { getCapturedPiece } from '../validation/util/getCapturedPiece';
import { isMoveCapture } from '../validation/util/isMoveCapture';
import { isMoveCastle } from '../validation/util/isMoveCastle';
import { isMoveEnPassant } from '../validation/util/isMoveEnPassant';
import { CastleMetaData, buildCastleMetaData } from './buildCastleMetaData';

export interface MoveMetaData {
  isMoveValid: boolean;
  piece: Piece;
  isCheck: boolean; // Indicates if this move puts opponent in check
  isCheckmate: boolean;
  isEnPassant: boolean;
  isCastle: boolean;
  castleMetaData: CastleMetaData | null;
  isPromotion: boolean;
  promotionPiece: Piece | null;
  isCapture: boolean;
  capturedPiece: Piece | null;
  startPosition: number;
  endPosition: number;
  updatedBoard: BoardState;
}

export function buildMoveMetaData(
  board: BoardState,
  gameState: GameState,
  piece: Piece,
  startPosition: number,
  endPosition: number
): MoveMetaData {
  const isEnPassant = isMoveEnPassant(piece, endPosition, gameState.enPassantSquare);
  const isCastle = isMoveCastle(piece, startPosition, endPosition);
  const castleMetaData = isCastle
    ? buildCastleMetaData(piece, startPosition, endPosition)
    : null;
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
    isCastle,
    castleMetaData,
    isPromotion,
    promotionPiece: null,
    isCapture,
    capturedPiece,
    startPosition,
    endPosition,
    updatedBoard: [...board],
  };
}
